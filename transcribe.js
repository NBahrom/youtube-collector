import { exec } from "child_process";
import path from "path";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const cmd = `whisper "${audioPath}" --model small --language en --output_format txt --fp16 False`;

    exec(cmd, (err) => {
      if (err) return reject(err);

      const txtPath = audioPath.replace(".mp3", ".txt");
      resolve(txtPath);
    });
  });
}
