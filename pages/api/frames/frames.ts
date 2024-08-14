import { farcasterHubContext } from "frames.js/middleware";
import { createFrames } from "frames.js/next/pages-router/server";

export const frames = createFrames({
  basePath: "/api/frames",
  middleware: [
    farcasterHubContext({
      hubHttpUrl: "https://hubs.airstack.xyz",
      hubRequestOptions: {
        headers: {
          "x-airstack-hubs": "1108ca72f6a414da788a0bd485866ca62" as string,
        },
      },
    }),
  ],
});
