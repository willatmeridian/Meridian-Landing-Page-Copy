import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, type Address } from "./storage";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

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
  app.post("/api/addresses/import", async (req, res) => {
    try {
      // If a CSV file was uploaded in the request
      if (req.body.csvData) {
        const records = parse(req.body.csvData, {
          columns: true,
          skip_empty_lines: true
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
