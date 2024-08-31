import { init, useQuery } from "@airstack/airstack-react";
import axios from "axios";

const fetchStorageDetails = async (fid: Number) => {
  const options = {
    method: "GET",
    params: { fid },
    headers: {
      accept: "application/json",
      api_key: "4F532532-1BE6-4A5C-9C83-C6B793F4FA02",
    },
  };

  const { data } = await axios.get(
    "https://api.neynar.com/v2/farcaster/storage/usage",

    options
  );

  console.log({ data });

  const casts = data.casts.used;
  const reactions = data.reactions.used;
  const links = data.links.used;

  return {
    casts,
    reactions,
    links,
  };
};

export default fetchStorageDetails;
