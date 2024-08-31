/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  return {
    image:
      "https://i.postimg.cc/m2mZ5NLY/64fbfb5e0a3ae149534cf011-Farcaster-Explained-1.webp",

    buttons: [
      <Button
        action="post"
        target="https://farcasterstoragestats-ramitphis-projects.vercel.app/api/stats"
      >
        Check my Farcaster Storage
      </Button>,
    ],
  };
});

export default handleRequest;
