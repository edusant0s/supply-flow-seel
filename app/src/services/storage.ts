import { requireSupabase } from "./supabase";

const BUCKET = "supply-flow-anexos";

export type AttachmentMeta = {
  nome: string;
  tamanho: number;
  tipo: string;
  path: string;
};

export async function uploadAttachments(folder: string, files: File[]): Promise<AttachmentMeta[]> {
  if (!files.length) return [];
  const client = requireSupabase();
  const {
    data: { user },
  } = await client.auth.getUser();
  const userId = user?.id || "anon";

  const uploaded: AttachmentMeta[] = [];
  for (const file of files) {
    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${folder}/${userId}/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
    const { error } = await client.storage.from(BUCKET).upload(path, file, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    if (error) throw error;
    uploaded.push({ nome: file.name, tamanho: file.size, tipo: file.type || "Arquivo", path });
  }
  return uploaded;
}

export async function signedAttachmentUrl(path: string) {
  const client = requireSupabase();
  const { data, error } = await client.storage.from(BUCKET).createSignedUrl(path, 60 * 60);
  if (error) throw error;
  return data.signedUrl;
}
