export function resolveChannelIdFromUrl(channelUrl) {
  const url = new URL(channelUrl);
  const path = url.pathname;

  if (!path.startsWith("/channel/")) {
    throw new Error(
      "Please provide a channel URL in the form: https://www.youtube.com/channel/UCxxxx"
    );
  }

  return path.split("/channel/")[1];
}
