# Pipedrive Data Synchronization Assignment

This project is an implementation of a **data synchronization script** that maps local JSON data to a **Pipedrive Person** object using field mappings, then **creates or updates** that person in Pipedrive via its API.

---

## Objective
- Map local person data from `inputData.json` to Pipedrive fields using `mappings.json`.
- Check if the person already exists in Pipedrive (by name).
- If found → **Update** the person.  
  If not found → **Create** a new person.
- Handle edge cases and ensure clean, maintainable TypeScript code.

---

## Tech Stack
- **Node.js** (JavaScript runtime)
- **TypeScript** (type safety)
- **Pipedrive API** (CRM system integration)
- **dotenv** (environment variable management)
- **fetch API** (HTTP requests)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/dev-amanydv/cloudify-assignment.git
cd pd-sync-assignment
```
### 2. Install Dependencies
```bash
npm install
```
(You may also use pnpm install if preferred)

### 3.  Create a .env File in root folder

Copy contents of .env.example to .env 
( API Key is available in .env.example for ease)


### 3. build the script
```bash
npm run build
```

### 4. Run the script
```bash
npm start
```
