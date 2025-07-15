import dotenv from "dotenv";
import type { PipedrivePerson } from "./types/pipedrive";
import inputData from "./mappings/inputData.json";
import mappings from "./mappings/mappings.json";

// Load environment variables from .env file
dotenv.config();

// Get API key and company domain from environment variables
const apiKey = process.env.PIPEDRIVE_API_KEY;
const companyDomain = process.env.PIPEDRIVE_COMPANY_DOMAIN;

// Write your code here
const syncPdPerson = async (): Promise<PipedrivePerson> => {
  try {
    // Write your code here
  } catch (error) {
    // Handle error
  }
};

const pipedrivePerson = syncPdPerson();
console.log(pipedrivePerson);
