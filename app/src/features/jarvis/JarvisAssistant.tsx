import { useEffect, useRef, useState } from "react";
import type React from "react";
import { Bot, RotateCcw, Send } from "lucide-react";
import { useLocation } from "react-router-dom";
import { DetailDrawer } from "../../components/DetailDrawer";
import { useAuth } from "../../contexts/AuthContext";
import { moduleLabel, resolveModuleFromPath } from "../../lib/moduleRoutes";
import { useJarvisChat } from "./useJarvisChat";

export function JarvisAssistant() {
  const { profile } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const moduleKey = resolveModuleFromPath(location.pathname);
  const { chatMessages, sendMessage, sending, error, resetConversation } = useJarvisChat(moduleKey || "");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [chatMessages, sending]);

  if (!profile) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const text = input;
    setInput("");
    void sendMessage(text);
  }

  return (
    <>
      <button className="jarvis-fab" type="button" onClick={() => setOpen(true)} aria-label="Abrir JARVIS Supply">
        <Bot size={22} />
        <span>JARVIS</span>
      </button>

      {open ? (
        <DetailDrawer eyebrow={`Contexto: ${moduleLabel(moduleKey)}`} title="JARVIS SUPPLY" onClose={() => setOpen(false)} className="jarvis-drawer">
          <div className="jarvis-chat">
            <div className="jarvis-chat-messages" ref={listRef}>
              {chatMessages.length === 0 ? (
                <div className="jarvis-chat-empty">
                  <p>
                    Sou o JARVIS, copiloto operacional de Supply Chain do Supply Flow. Pergunte sobre {moduleLabel(moduleKey).toLowerCase()} ou sobre a
                    operacao como um todo — respondo com base nos dados reais do sistema.
                  </p>
                  <ul>
                    <li>&ldquo;Quais orcamentos estao atrasados?&rdquo;</li>
                    <li>&ldquo;Existe algum gargalo na operacao?&rdquo;</li>
                    <li>&ldquo;Faca um resumo executivo.&rdquo;</li>
                  </ul>
                </div>
              ) : (
                chatMessages.map((message) => (
                  <div key={message.id} className={`jarvis-message jarvis-message--${message.role}`}>
                    <p>{message.text}</p>
                  </div>
                ))
              )}
              {sending ? (
                <div className="jarvis-message jarvis-message--assistant jarvis-message--typing">
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
            </div>

            {error ? <div className="form-error jarvis-chat-error">{error}</div> : null}

            <form className="jarvis-chat-form" onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Pergunte ao JARVIS..."
                disabled={sending}
                aria-label="Mensagem para o JARVIS"
              />
              <button type="submit" className="primary-button" disabled={sending || !input.trim()} aria-label="Enviar">
                <Send size={16} />
              </button>
            </form>

            {chatMessages.length ? (
              <button type="button" className="secondary-button jarvis-reset" onClick={resetConversation}>
                <RotateCcw size={14} />
                Nova conversa
              </button>
            ) : null}
          </div>
        </DetailDrawer>
      ) : null}
    </>
  );
}
