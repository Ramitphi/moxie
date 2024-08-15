import { init, useQuery } from "@airstack/airstack-react";
import axios from "axios";

const fetchuserDetails = async (fid: Number) => {
  const options = {
    headers: {
      accept: "application/json",
      api_key: "4F532532-1BE6-4A5C-9C83-C6B793F4FA02",
    },
  };

  const { data } = await axios.get(
    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
    options
  );
  console.log({ g: data.users[0].verifications[0] });
  return {
    username: data.users[0].username,
    display_name: data.users[0].display_name,
    pfp_url: data.users[0].pfp_url,
  };
};

export default fetchuserDetails;
