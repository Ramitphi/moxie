/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next/pages-router/server";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: "https://i.postimg.cc/Rhsk3zPB/moxie.png",

    buttons: [
      <Button action="post" target={"https://moxie-five.vercel.app/api/stats"}>
        Value of my locked Moxie
      </Button>,
    ],
  };
});

export default handleRequest;
