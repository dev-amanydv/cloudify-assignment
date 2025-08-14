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
const syncPdPerson = async (): Promise<PipedrivePerson | null> => {
  try {
    //check for API Keys
    if (!apiKey) {
      throw new Error("Missing API key or company domain in environment variables");
    }
    //Map the data according to mappings.ts
    const payload: any = {};
    for (const mapping of mappings) {
      const { pipedriveKey, inputKey } = mapping;
      const value = inputKey.split('.').reduce((obj: any, key: string) => (obj ? obj[key] : undefined), inputData);
      //takes a string like "phone.home", splits it into ["phone", "home"], and then gets the nested property value.
      if (value !== undefined) {
        payload[pipedriveKey] = value;
      }
    }
    console.log('Payload: ', payload)
    

    //Check name as it is required for searching and updating or creating
    if (!payload.name) {
      throw new Error("Missing required field 'name' in mapped data");
    }
    // Search for existing person by name (name is encoded for security)
    const searchUrl = `https://${companyDomain}/v1/persons/search?term=${encodeURIComponent(payload.name)}&exact_match=true&api_token=${apiKey}`;
    const searchResponse = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Search API request failed with status ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    if (searchData.success && searchData.data && searchData.data.items && searchData.data.items.length > 0) {
      // If person found, update it
      const personId = searchData.data.items[0].item.id;
      console.log("Already exists, Updating")
      const updateUrl = `https://${companyDomain}/api/v1/persons/${personId}?api_token=${process.env.PIPEDRIVE_API_KEY}`;
      const updateResponse = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!updateResponse.ok) {
        throw new Error(`Update API request failed with status ${updateResponse.status}`);
      }

      const updateData = await updateResponse.json();
      
      if (updateData.success) {
        console.log("User updated: ", [ updateData.data.name, updateData.data.phone, updateData.data.email])
        return updateData.data as PipedrivePerson;
      } else {
        throw new Error("Update API response unsuccessful");
      }
    } else {
      // If person not found, create new
      const createUrl = `https://${companyDomain}/api/v1/persons?api_token=${process.env.PIPEDRIVE_API_KEY}`;
      const createResponse = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!createResponse.ok) {
        throw new Error(`Create API request failed with status ${createResponse.status}`);
      }

      const createData = await createResponse.json();
      if (createData.success) {
        console.log("User created: ", [ createData.data.name, createData.data.phone, createData.data.email])
        return createData.data as PipedrivePerson;
      } else {
        throw new Error("Create API response unsuccessful");
      }
    }
  } catch (error) {
    // Handle error
    console.error("Error in syncPdPerson:", error);
    return null;
  }
};

const pipedrivePerson = syncPdPerson();
console.log(pipedrivePerson);
