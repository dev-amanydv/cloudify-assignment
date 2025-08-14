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
    if (!apiKey) {
      throw new Error("Missing API key or company domain in environment variables");
    }

    const payload: any = {};
    for (const mapping of mappings) {
      const { pipedriveKey, inputKey } = mapping;
      const value = inputKey.split('.').reduce((obj: any, key: string) => (obj ? obj[key] : undefined), inputData);
      if (value !== undefined) {
        payload[pipedriveKey] = value;
      }
    }

    if (!payload.name) {
      throw new Error("Missing required field 'name' in mapped data");
    }
console.log("Payload: ", payload)
    // Search for existing person by name
    const searchUrl = `https://api.pipedrive.com/v1/persons/search?term=${encodeURIComponent(payload.name)}&exact_match=true&api_token=${process.env.PIPEDRIVE_API_KEY}`;
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
console.log("Searched data: ", searchData.data.items)
    if (searchData.success && searchData.data && searchData.data.items && searchData.data.items.length > 0) {
      // Person found, update it
      const personId = searchData.data.items[0].item.id;
      console.log("Already exists, Updating")
      const updateUrl = `https://api.pipedrive.com/api/v1/persons/${personId}?api_token=${process.env.PIPEDRIVE_API_KEY}`;
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
        console.log("Updated phone: ", updateData.data.phone);
        console.log("Updated email: ", updateData.data.email)

        console.log("Update completed: ", updateData)
        return updateData.data as PipedrivePerson;
      } else {
        throw new Error("Update API response unsuccessful");
      }
    } else {
      // Person not found, create new
      console.log("Not found, creating new")
      const createUrl = `https://api.pipedrive.com/api/v1/persons?api_token=${process.env.PIPEDRIVE_API_KEY}`;
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
        console.log("Created: ", createData)
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
