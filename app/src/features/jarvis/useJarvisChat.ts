import { useCallback, useRef, useState } from "react";
import { requireSupabase } from "../../services/supabase";
import { sendJarvisMessages, type JarvisContentBlock, type JarvisMessage } from "./jarvisClient";
import { runJarvisTool, type JarvisToolName } from "./tools";

export type JarvisChatMessage = { id: string; role: "user" | "assistant"; text: string };

const MAX_TOOL_ROUNDS = 4;

export function useJarvisChat(moduleKey: string) {
  const [chatMessages, setChatMessages] = useState<JarvisChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const historyRef = useRef<JarvisMessage[]>([]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      setError("");
      setSending(true);
      setChatMessages((current) => [...current, { id: `u-${Date.now()}-${current.length}`, role: "user", text: trimmed }]);
      historyRef.current = [...historyRef.current, { role: "user", content: trimmed }];

      const usedTools: string[] = [];

      try {
        let round = 0;
        let finalText = "";

        while (round < MAX_TOOL_ROUNDS) {
          round += 1;
          const response = await sendJarvisMessages(historyRef.current, moduleKey);
          historyRef.current = [...historyRef.current, { role: "assistant", content: response.content }];

          if (response.stop_reason !== "tool_use") {
            finalText = extractText(response.content);
            break;
          }

          const toolResults: JarvisContentBlock[] = [];
          for (const block of response.content) {
            if (block.type !== "tool_use") continue;
            usedTools.push(block.name);
            const result = await runJarvisTool(block.name as JarvisToolName, block.input);
            toolResults.push({ type: "tool_result", tool_use_id: block.id, name: block.name, content: JSON.stringify(result) });
          }
          historyRef.current = [...historyRef.current, { role: "user", content: toolResults }];
        }

        const answer = finalText || "Nao consegui concluir a analise apos varias consultas. Tente reformular a pergunta.";
        setChatMessages((current) => [...current, { id: `a-${Date.now()}-${current.length}`, role: "assistant", text: answer }]);
        void logInteraction(moduleKey, trimmed, usedTools);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Falha ao conversar com o JARVIS.");
      } finally {
        setSending(false);
      }
    },
    [moduleKey, sending]
  );

  const resetConversation = useCallback(() => {
    historyRef.current = [];
    setChatMessages([]);
    setError("");
  }, []);

  return { chatMessages, sendMessage, sending, error, resetConversation };
}

function extractText(content: JarvisContentBlock[]) {
  return content
    .filter((block): block is { type: "text"; text: string } => block.type === "text")
    .map((block) => block.text)
    .join("\n\n");
}

async function logInteraction(moduleKey: string, question: string, toolsUsed: string[]) {
  try {
    const client = requireSupabase();
    const {
      data: { user },
    } = await client.auth.getUser();
    if (!user) return;
    await client.from("jarvis_interactions").insert({
      user_id: user.id,
      module_key: moduleKey || null,
      question: question.slice(0, 2000),
      tools_used: toolsUsed,
    });
  } catch {
    // Auditoria e best-effort: nunca deve interromper a conversa do usuario.
  }
}
