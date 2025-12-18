import { google } from "googleapis";
import { authorize } from "./oauth.js";
//import { resolveChannelId } from "./channelResolver.js"; getting from direct url but not efficient
//import { fetchTranscript } from "./transcriptFetcher.js"; getting from youtube captions but not reliable
import { fetchAllVideos } from "./videoFetcher.js";
import {resolveChannelIdFromUrl } from "./resolveChannelIdFromUrl.js";
import { exportToCSV } from "./csvExporter.js";
import { generateTranscript } from "./generateTranscript.js";

const channelUrl = process.argv[2];

(async () => {
  const auth = await authorize();
  const youtube = google.youtube({ version: "v3", auth });

  const channelId = resolveChannelIdFromUrl(channelUrl);
  const videos = await fetchAllVideos(youtube, channelId);

  // Generating transcripts using AI for all videos
  // for (const video of videos) {
  //   video.transcript = await generateTranscript(video.videoId);
  // }

  const videoId = "DlJ8yUKLk_k"; // test video short
  const transcript = await generateTranscript(videoId);

  console.log(transcript);



  await exportToCSV(videos);
})();
