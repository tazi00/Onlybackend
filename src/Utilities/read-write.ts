import fs from "fs/promises";
import path from "path";
import { delay } from "./delay";
// Generic function to read data from a JSON file
export async function readDataFromFile(filePath: string): Promise<any | null> {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "..", "db", filePath + ".json"),
      "utf8"
    );

    await delay(2000);
    return JSON.parse(data);
  } catch (error: any) {
    console.error(`Error reading data from ${filePath}: ${error.message}`);
    return null;
  }
}

// Function to write data to a JSON file
export async function writeDataToFile(
  filePath: string,
  data: {}
): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    console.log(jsonData);
    await delay(2000);
    await fs.writeFile( path.join(__dirname, "..", "db", filePath + ".json"), jsonData, "utf8");
    console.log(`Data written to ${filePath}`);
  } catch (error: any) {
    console.error(`Error writing data to ${filePath}: ${error.message}`);
  }
}
