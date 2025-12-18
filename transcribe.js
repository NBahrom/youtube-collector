import { exec } from "child_process";
import fs from "fs";
import path from "path";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const transcriptsDir = path.resolve("transcripts");
    fs.mkdirSync(transcriptsDir, { recursive: true });

    const cmd = `python -m whisper "${audioPath}" --model small --language en --output_format txt --fp16 False --output_dir "${transcriptsDir}"`;

    exec(cmd, (err) => {
      if (err) return reject(err);

      const baseName = path.basename(audioPath, ".mp3");
      const txtPath = path.join(transcriptsDir, `${baseName}.txt`);

      resolve(txtPath);
    });
  });
}
