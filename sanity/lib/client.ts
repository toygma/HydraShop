import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

// Okuma işlemleri için (client-side güvenli)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Okuma için CDN kullanılabilir
});

// Yazma işlemleri için (SADECE server-side)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token, // Token sadece burada
});