"use server"
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const read_token = process.env.SANITY_API_READ_TOKEN; 

if (!read_token) {
  throw new Error("Missing SANITY_API_READ_TOKEN. Please check your .env.local file.");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: read_token,
  browserToken: false,
  fetchOptions: {
    revalidate: 0,
  },
});