/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: "https://i.postimg.cc/Rhsk3zPB/moxie.png",

    buttons: [
      <Button action="post" target={`${process.env.APP_URL}/api/stats`}>
        Value of my locked Moxie
      </Button>,
    ],
  };
});

export default handleRequest;
