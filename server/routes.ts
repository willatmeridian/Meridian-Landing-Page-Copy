import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, type Address } from "./storage";
import fs from "fs";
import path from "path";
import csvParser from 'csv-parser';

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all addresses
  app.get("/api/addresses", async (req, res) => {
    try {
      const addresses = await storage.getAddresses();
      res.json(addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      res.status(500).json({ error: "Failed to fetch addresses" });
    }
  });

  // API route to import addresses from CSV
  // API route to get all locations
  app.get("/api/locations", async (req, res) => {
    try {
      const csvPath = path.join(process.cwd(), 'attached_assets', 'Pallet Leads USA All - enhanced (1).csv');
      console.log('Looking for CSV file at:', csvPath);
      
      if (!fs.existsSync(csvPath)) {
        throw new Error(`CSV file not found at ${csvPath}`);
      }

      const locations: any[] = [];
      const fileContent = fs.readFileSync(csvPath, 'utf-8');
      console.log('CSV file loaded, size:', fileContent.length, 'bytes');

      // Split into lines and remove empty ones
      const lines = fileContent.split('\n').filter(line => line.trim());
      console.log('Total lines (including header):', lines.length);

      // Process each line after the header
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        let currentField = '';
        let fields = [];
        let inQuotes = false;

        // Parse CSV manually to handle quoted fields properly
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            fields.push(currentField.replace(/^"|"$/g, ''));
            currentField = '';
          } else {
            currentField += char;
          }
        }
        fields.push(currentField.replace(/^"|"$/g, '')); // Add the last field

        // Extract location data
        const latitude = parseFloat(fields[15]);
        const longitude = parseFloat(fields[16]);
        const name = fields[2];
        const city = fields[10];
        const state = fields[12];

        if (!isNaN(latitude) && !isNaN(longitude) && 
            latitude !== 0 && longitude !== 0 && 
            latitude >= 25 && latitude <= 50 && // Continental US bounds
            longitude >= -125 && longitude <= -65) {
          const matchStatus = (fields[27] || '').trim();
          const verified = String(fields[28] || '').toLowerCase() === 'true';
          const rating = parseFloat(fields[21]) || null;
          const reviewCount = parseInt(fields[22]) || null;
          const website = fields[20] || null;
          const address = fields[9] || null;
          const zip = fields[13] || null;

          // Debug logging to see what's happening with matchStatus
          if (i < 10 || i % 1000 === 0) {
            console.log(`Row ${i}: matchStatus='${matchStatus}', responsive=${req.query.responsive}`);
          }

          // Added responsive filter: if the 'responsive' query parameter is 'true' and matchStatus is NOT 'No Company Match', keep the row
          if (req.query.responsive === 'true') {
            if (matchStatus !== "No Company Match") {
              locations.push({
                latitude,
                longitude,
                name: name || 'Unknown',
                city: city || 'Unknown',
                state: state || 'Unknown',
                address,
                zip,
                rating,
                reviewCount,
                website,
                matchStatus,
                verified
              });
            }
          } else {
            // If responsive filter is not enabled, include all rows
            locations.push({
              latitude,
              longitude,
              name: name || 'Unknown',
              city: city || 'Unknown',
              state: state || 'Unknown',
              address,
              zip,
              rating,
              reviewCount,
              website,
              matchStatus,
              verified
            });
          }
        }
      }

      console.log(`Successfully loaded ${locations.length} valid locations`);
      if (locations.length > 0) {
        console.log('Sample location:', locations[0]);
      }

      res.json(locations);
    } catch (error) {
      console.error("Error reading locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  });

  app.post("/api/addresses/import", async (req, res) => {
    try {
      // If a CSV file was uploaded in the request
      if (req.body.csvData) {
        const records: any[] = [];
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.body.csvData);

        await new Promise((resolve, reject) => {
          bufferStream
            .pipe(csvParser())
            .on('data', (data: any) => records.push(data))
            .on('end', resolve)
            .on('error', reject);
        });
        
        for (const record of records) {
          await storage.addAddress({
            name: record.name || "",
            address: record.address || "",
            city: record.city || "",
            state: record.state || "",
            zip: record.zip || "",
            lat: parseFloat(record.lat) || 0,
            lng: parseFloat(record.lng) || 0
          });
        }
        
        res.json({ message: "CSV data imported successfully" });
      } else {
        res.status(400).json({ error: "No CSV data provided" });
      }
    } catch (error) {
      console.error("Error importing CSV:", error);
      res.status(500).json({ error: "Failed to import CSV data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
