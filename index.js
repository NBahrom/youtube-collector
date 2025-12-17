import { google } from "googleapis";
import { authorize } from "./oauth.js";
import { resolveChannelId } from "./channelResolver.js";
import { fetchAllVideos } from "./videoFetcher.js";
import { fetchTranscript } from "./transcriptFetcher.js";
import { exportToCSV } from "./csvExporter.js";

const channelUrl = process.argv[2];

(async () => {
  const auth = await authorize();
  const youtube = google.youtube({ version: "v3", auth });

  const channelId = await resolveChannelId(youtube, channelUrl);
  const videos = await fetchAllVideos(youtube, channelId);

  for (const video of videos) {
    video.transcript = await fetchTranscript(
      youtube,
      video.videoId
    );
  }

  await exportToCSV(videos);
})();
