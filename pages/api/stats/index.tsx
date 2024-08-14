/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next/pages-router/server";
import { frames } from "../frames/frames";
import fetchBalance from "../../../utils/fetchBalance";

const handleRequest = frames(async (ctx) => {
  const fid = ctx?.message?.requesterVerifiedAddresses || "";
  console.log({ fid });
  if (!fid)
    return {
      image: "https://i.postimg.cc/Rhsk3zPB/moxie.png",

      buttons: [<Button action="post">Error</Button>],
    };

  const balance = (await fetchBalance(fid)) || "";
  console.log(balance);

  return {
    image: "https://i.postimg.cc/Rhsk3zPB/moxie.png",
  };
});

export default handleRequest;
