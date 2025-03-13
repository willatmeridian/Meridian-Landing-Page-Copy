import { users, type User, type InsertUser } from "@shared/schema";

// Simple address type for the CSV data
export interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // Address-related methods
  getAddresses(): Promise<Address[]>;
  addAddress(address: Address): Promise<void>;
}

// Simple in-memory storage for addresses
class Storage implements IStorage {
  private addresses: Address[] = [];
  private users: Map<number, User> = new Map();
  private currentId: number = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAddresses(): Promise<Address[]> {
    return this.addresses;
  }

  async addAddress(address: Address): Promise<void> {
    this.addresses.push(address);
  }
}

export const storage = new Storage();