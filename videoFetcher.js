import pLimit from "p-limit";

const limit = pLimit(5);

export async function fetchAllVideos(youtube, channelId) {
  let videos = [];
  let nextPageToken = null;

  do {
    const res = await youtube.search.list({
      part: ["id"],
      channelId,
      maxResults: 50,
      pageToken: nextPageToken,
      order: "date",
      type: ["video"]
    });

    const videoIds = res.data.items.map(i => i.id.videoId);

    const details = await youtube.videos.list({
      part: ["snippet", "statistics"],
      id: videoIds
    });

    videos.push(
      ...details.data.items.map(v => ({
        videoUrl: `https://www.youtube.com/watch?v=${v.id}`,
        title: v.snippet.title,
        thumbnail: v.snippet.thumbnails.high.url,
        views: v.statistics.viewCount,
        postedDate: v.snippet.publishedAt,
        videoId: v.id
      }))
    );

    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);

  return videos;
}
