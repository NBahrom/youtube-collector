import { createObjectCsvWriter } from "csv-writer";

export async function exportToCSV(rows) {
  const writer = createObjectCsvWriter({
    path: "youtube_data.csv",
    header: [
      { id: "videoUrl", title: "Video URL" },
      { id: "title", title: "Title" },
      { id: "thumbnail", title: "Thumbnail URL" },
      { id: "views", title: "Views" },
      { id: "postedDate", title: "Posted Date" },
      { id: "transcript", title: "Transcript" }
    ]
  });

  await writer.writeRecords(rows);
}
