import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import {
  fetchMetadata,
  metadataToMetaTags,
} from "frames.js/next/pages-router/client";

export const getServerSideProps = async function getServerSideProps() {
  const url = new URL(
    "/api/frames",
    " https://543f-103-59-75-181.ngrok-free.app"
  );

  return {
    props: {
      url: url.toString(),
      metadata: await fetchMetadata(url),
    },
  };
} satisfies GetServerSideProps<{
  metadata: Awaited<ReturnType<typeof fetchMetadata>>;
  url: string;
}>;

export default function Page({
  metadata,
  url,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Frames.js app</title>
        {metadataToMetaTags(metadata)}
      </Head>
    </>
  );
}
