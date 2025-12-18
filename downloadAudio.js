import { exec } from "child_process";
import path from "path";
import fs from "fs";

export function downloadAudio(videoId) {
  return new Promise((resolve, reject) => {
    const output = path.resolve("audio", `${videoId}.mp3`);
    fs.mkdirSync("audio", { recursive: true });

    const cmd = `yt-dlp -f bestaudio -x --audio-format mp3 -o "${output}" https://www.youtube.com/watch?v=${videoId}`;

    exec(cmd, (err) => {
      if (err) return reject(err);
      resolve(output);
    });
  });
}
