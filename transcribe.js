import { exec } from "child_process";

export function transcribeAudio(audioPath) {
  return new Promise((resolve, reject) => {
    const cmd = `python -m whisper "${audioPath}" --model small --language en --output_format txt --fp16 False`;

    exec(cmd, (err) => {
      if (err) return reject(err);

      const txtPath = audioPath.replace(".mp3", ".txt");
      resolve(txtPath);
    });
  });
}
