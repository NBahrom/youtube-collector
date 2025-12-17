import { google } from "googleapis";

export async function fetchTranscript(youtube, videoId) {
  try {
    const captions = await youtube.captions.list({
      part: ["id", "snippet"],
      videoId
    });

    const caption = captions.data.items.find(
      c => c.snippet.language === "en"
    );

    if (!caption) return null;

    const res = await youtube.captions.download({
      id: caption.id,
      tfmt: "srt"
    });

    return res.data;
  } catch {
    return null;
  }
}
