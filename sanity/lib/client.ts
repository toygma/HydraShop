import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

// Okuma işlemleri için (client-side güvenli)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production" ? false : true,
});

// Yazma işlemleri için (SADECE server-side)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production" ? false : true,
  token: token, // Token sadece burada
});
