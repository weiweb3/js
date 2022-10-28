import {
  MockUploader,
  MockDownloader,
  Weiweb3Storage,
} from "@weiweb3/storage";

export function MockStorage(): Weiweb3Storage {
  // Store mapping of URIs to files/objects
  const storage = {};

  const uploader = new MockUploader(storage);
  const downloader = new MockDownloader(storage);
  return new Weiweb3Storage({ uploader, downloader });
}
