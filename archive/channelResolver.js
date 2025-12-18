
export async function resolveChannelId(youtube, channelUrl) {
  const url = new URL(channelUrl);
  const path = url.pathname;

  if (path.startsWith("/channel/")) {
    return path.split("/channel/")[1];
  }

  if (path.startsWith("/user/")) {
    const username = path.split("/user/")[1];
    const res = await youtube.channels.list({
      part: ["id"],
      forUsername: username
    });
    if (res.data.items?.length) return res.data.items[0].id;
  }

  const handle = path.replace("/", "").replace("@", "");

  const res = await youtube.search.list({
    part: ["snippet"],
    q: handle,
    type: ["channel"],
    maxResults: 1
  });

  if (!res.data.items?.length) {
    throw new Error("Channel not found");
  }

  return res.data.items[0].snippet.channelId;
}

