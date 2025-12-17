import { google } from "googleapis";

export async function resolveChannelId(youtube, channelUrl) {
  // Clean URL
  const url = new URL(channelUrl);
  const path = url.pathname;

  // If direct /channel/ID
  if (path.startsWith("/channel/")) {
    return path.split("/channel/")[1];
  }

  // If handle /@handle or /c/customname
  let handleOrCustom = path.split("/").pop();

  // Use search.list to find channel
  const res = await youtube.search.list({
    part: ["snippet"],
    q: handleOrCustom,
    type: ["channel"],
    maxResults: 1
  });

  if (!res.data.items || res.data.items.length === 0) {
    throw new Error(`Channel not found for ${channelUrl}`);
  }

  return res.data.items[0].snippet.channelId;
}
