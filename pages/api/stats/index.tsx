/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next/pages-router/server";
import { frames } from "../frames/frames";
import fetchBalance from "../../../utils/fetchBalance";
import fetchuserDetails from "../../../utils/fetchuserDeatils";

const handleRequest = frames(async (ctx) => {
  const addresses = ctx?.message?.requesterVerifiedAddresses || "";
  const fid = ctx?.message?.requesterFid;

  if (!addresses || !fid)
    return {
      image: "https://i.postimg.cc/Rhsk3zPB/moxie.png",

      buttons: [<Button action="post">Error</Button>],
    };

  const balance = (await fetchBalance(addresses)) || "";
  console.log(balance);

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
        <span tw="mt-5 font-bold text-5xl">Total Value: ${balance}</span>
      </div>
    </div>
  );

  return {
    image: <ValueScreen />,
    buttons: [
      <Button
        action="link"
        target={`https://warpcast.com/~/compose?text=Check value of your locked Moxie here &embeds[]=${process.env.APP_URL}`}
      >
        Share
      </Button>,
    ],
  };
});

export default handleRequest;
