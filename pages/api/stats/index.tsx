/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next/pages-router/server";
import * as Progress from "@radix-ui/react-progress";

import { frames } from "../frames/frames";

import fetchuserDetails from "../../../utils/fetchuserDeatils";
import fetchStorageDetails from "../../../utils/fetchStorageDetails";

const handleRequest = frames(async (ctx) => {
  const addresses = ctx?.message?.requesterVerifiedAddresses || "";
  const fid = ctx?.message?.requesterFid;

  if (!addresses || !fid) {
    return {
      image: "https://i.postimg.cc/43h0pZ2K/504708-200.png",

      buttons: [<Button action="post">Error</Button>],
    };
  }

  const storageDeatils = await fetchStorageDetails(fid);

  console.log({ storageDeatils });

  const userDetails = await fetchuserDetails(fid);

  const ValueScreen = () => (
    <div tw="flex bg-pink-50 w-screen h-screen justify-center items-center">
      <div tw="flex flex-col items-center px-8 pt-4 gap-3 h-fit  rounded-md justify-between mr-4">
        <div tw="flex items-center">
          <img
            src={userDetails.pfp_url}
            alt="Profile"
            tw="w-20 h-20 rounded-full mr-4"
          />
          <div tw="flex flex-col">
            <span tw="flex text-4xl">{userDetails.display_name}</span>
            <span tw="flex text-2xl">@{userDetails.username}</span>
          </div>
        </div>

        <div tw=" flex flex-col gap-1 mt-4">
          <progress value="32" max="100" tw="mt-2">
            Casts: {storageDeatils.casts} units out of 10000 (
            {Math.trunc((storageDeatils.casts / 10000) * 100)}%)
          </progress>
          <progress value="32" max="100" tw="mt-2">
            Reactions: {storageDeatils.reactions} units out of 5000 (
            {(storageDeatils.reactions / 5000) * 100}%)
          </progress>
          <progress value="32" max="100" tw=" mt-2">
            Links: {storageDeatils.links} units out of 5000 (
            {(storageDeatils.links / 5000) * 100}%)
          </progress>
        </div>
      </div>
    </div>
  );

  return {
    image: <ValueScreen />,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=Check stats of your farcaster storage here &embeds[]=${process.env.APP_URL}`}
      >
        Share
      </Button>,
    ],
  };
});

export default handleRequest;
