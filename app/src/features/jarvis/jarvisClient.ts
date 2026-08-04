import { requireSupabase, supabaseAnonKey, supabaseUrl } from "../../services/supabase";

export type JarvisContentBlock =
  | { type: "text"; text: string; thoughtSignature?: string }
  | { type: "tool_use"; id: string; name: string; input: Record<string, unknown>; thoughtSignature?: string }
  | { type: "tool_result"; tool_use_id: string; name: string; content: string };

export type JarvisMessage = { role: "user" | "assistant"; content: string | JarvisContentBlock[] };

export type JarvisChatResponse = {
  content: JarvisContentBlock[];
  stop_reason: string;
  usage?: { input_tokens: number; output_tokens: number };
};

export async function sendJarvisMessages(messages: JarvisMessage[], moduleKey: string): Promise<JarvisChatResponse> {
  const client = requireSupabase();
  if (!supabaseUrl || !supabaseAnonKey) throw new Error("Supabase nao configurado.");

  const {
    data: { session },
    error: sessionError,
  } = await client.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session?.access_token) throw new Error("Sessao expirada. Faca login novamente.");

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/jarvis-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${session.access_token}`,
        "x-client-info": "supply-flow-seel",
      },
      body: JSON.stringify({ messages, moduleKey }),
    });

    const payload = await parseFunctionResponse(response);
    if (!response.ok) throw new Error(getPayloadError(payload, "Falha ao consultar o JARVIS."));
    return payload as JarvisChatResponse;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Nao foi possivel conectar ao JARVIS. Verifique sua conexao e tente novamente.");
    }
    throw error;
  }
}

async function parseFunctionResponse(response: Response) {
  try {
    return await response.clone().json();
  } catch {
    return { error: await response.text() };
  }
}

function getPayloadError(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object") {
    const body = payload as { error?: unknown };
    return String(body.error || fallback);
  }
  return fallback;
}
