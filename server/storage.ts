import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

// Simple address type for the CSV data
export type Address = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
};

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Address-related methods
  getAddresses(): Promise<Address[]>;
  addAddress(address: Omit<Address, "id">): Promise<Address>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private addresses: Map<number, Address>;
  currentId: number;
  currentAddressId: number;

  constructor() {
    this.users = new Map();
    this.addresses = new Map();
    this.currentId = 1;
    this.currentAddressId = 1;
  }

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
    return Array.from(this.addresses.values());
  }

  async addAddress(address: Omit<Address, "id">): Promise<Address> {
    const id = this.currentAddressId++;
    const newAddress: Address = { ...address, id };
    this.addresses.set(id, newAddress);
    return newAddress;
  }
}

export const storage = new MemStorage();
