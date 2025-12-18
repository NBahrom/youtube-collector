import fs from "fs";

export function readTranscript(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}
