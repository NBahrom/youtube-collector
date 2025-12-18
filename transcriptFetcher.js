import { google } from "googleapis";

export async function fetchTranscript(youtube, videoId) {
  try {
    const { data } = await youtube.captions.list({
      part: ["id", "snippet"],
      videoId
    });

    if (!data.items || data.items.length === 0) {
      return null;
    }

    // Prefer manual captions, fallback to ASR
    const caption =
      data.items.find(c => c.snippet.language.startsWith("en") && c.snippet.trackKind !== "ASR") ||
      data.items.find(c => c.snippet.language.startsWith("en")) ||
      data.items[0];

    if (!caption) return null;

    const res = await youtube.captions.download(
      {
        id: caption.id,
        tfmt: "srt"
      },
      { responseType: "arraybuffer" }
    );

    return Buffer.from(res.data).toString("utf-8");
  } catch (err) {
    if (err.response?.status === 403) {
      return null; // captions exist but are restricted
    }
    console.error(`Transcript error for ${videoId}`, err.message);
    return null;
  }
}

