import { downloadAudio } from "./downloadAudio.js";
import { transcribeAudio } from "./transcribe.js";
import { readTranscript } from "./readTranscript.js";
import fs from "fs";

export async function generateTranscript(videoId) {
  try {
    const audioPath = await downloadAudio(videoId);
    const transcriptPath = await transcribeAudio(audioPath);
    const text = readTranscript(transcriptPath);

    return text.trim();
  } catch (err) {
    console.error(`STT failed for audio ${videoId}`, err.message);
    return null;
  }
}
