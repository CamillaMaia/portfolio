// ============================================================
// Chat Widget — reusable component
// Injects floating chat UI on every page.
// Reads localStorage 'siteLang' for EN/PT translations.
// ============================================================
(function () {
  const WEBHOOK_URL = 'https://camillaportfolio.app.n8n.cloud/webhook/8cc84383-bf88-4e33-a0f6-cf118c0c8520';

  const T = {
    en: {
      header: 'Ask about Camilla',
      placeholder: 'Ask a question...',
      trigger: 'Ask me anything',
      error: 'Something went wrong. Please try again.'
    },
    pt: {
      header: 'Pergunte sobre a Camilla',
      placeholder: 'Faça uma pergunta...',
      trigger: 'Pergunte qualquer coisa',
      error: 'Algo deu errado. Por favor, tente novamente.'
    }
  };

  function currentLang() {
    const stored = localStorage.getItem('siteLang');
    return stored === 'pt' ? 'pt' : 'en';
  }

  function injectWidget() {
    if (document.getElementById('chat-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'chat-widget';
    widget.className = 'fixed bottom-8 right-8 z-[1000] font-mono';

    widget.innerHTML = `
      <div id="chat-box" style="display:none;" class="w-[340px] bg-bg2 border border-border rounded-lg mb-4 overflow-hidden flex-col">
        <div class="p-4 border-b border-border flex justify-between items-center">
          <span id="chat-header" class="text-[0.65rem] tracking-[0.15em] uppercase text-accent"></span>
          <button id="chat-close" class="bg-transparent border-0 text-divider cursor-pointer text-base leading-none">✕</button>
        </div>
        <div id="chat-messages" class="h-[280px] overflow-y-auto p-4 flex flex-col gap-3"></div>
        <div class="p-3 border-t border-border flex gap-2">
          <input id="chat-input" type="text" class="flex-1 bg-bg border border-border text-primary py-2 px-3 font-mono text-[0.65rem] tracking-[0.05em] outline-none rounded">
          <button id="chat-send" class="bg-accent border-0 text-bg py-2 px-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase cursor-pointer rounded">→</button>
        </div>
      </div>
      <button id="chat-trigger" class="bg-bg2 border border-accent text-accent py-[0.65rem] px-4 font-mono text-[0.6rem] tracking-[0.12em] uppercase cursor-pointer rounded block ml-auto transition-colors duration-200 hover:border-accent/50 hover:bg-bg3"></button>
    `;
    document.body.appendChild(widget);

    applyLang();

    document.getElementById('chat-trigger').addEventListener('click', toggleChat);
    document.getElementById('chat-close').addEventListener('click', toggleChat);
    document.getElementById('chat-send').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
  }

  function applyLang() {
    const lang = currentLang();
    const t = T[lang];
    const header = document.getElementById('chat-header');
    const input = document.getElementById('chat-input');
    const trigger = document.getElementById('chat-trigger');
    if (header) header.textContent = t.header;
    if (input) input.placeholder = t.placeholder;
    if (trigger) trigger.textContent = t.trigger;
  }

  function toggleChat() {
    const box = document.getElementById('chat-box');
    box.style.display = box.style.display === 'none' ? 'flex' : 'none';
  }

  function addMessage(text, isUser) {
    const messages = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    const base = 'max-w-[85%] py-[0.6rem] px-[0.85rem] text-[0.7rem] leading-[1.5] rounded-md tracking-[0.02em]';
    const userClasses = 'bg-accent text-bg self-end';
    const botClasses = 'bg-bg3 text-primary self-start border border-white/[0.08]';
    msg.className = `${base} ${isUser ? userClasses : botClasses}`;
    msg.innerText = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    return msg;
  }

  async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    addMessage(message, true);
    input.value = '';
    const loading = addMessage('...', false);
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-widget-key': 'c764b10c65f07f898e6a030e98e7748e5de6da99' },
        body: JSON.stringify({ message, lang: currentLang() })
      });
      const raw = await res.text();
      loading.remove();

      const reply = extractReply(raw);
      addMessage(reply || T[currentLang()].error, false);
    } catch (e) {
      loading.remove();
      addMessage(T[currentLang()].error, false);
    }
  }

  // Forgiving extractor — tries JSON shapes, then falls back to raw text.
  function extractReply(raw) {
    if (!raw) return '';
    let data;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      // Not JSON — assume the webhook responded with plain text
      return raw.trim();
    }
    return pickString(data) || raw.trim();
  }

  // Walks common shapes: strings, arrays, n8n output wrappers, Anthropic content blocks.
  function pickString(d) {
    if (d == null) return '';
    if (typeof d === 'string') return d;
    if (Array.isArray(d)) {
      for (const item of d) {
        const s = pickString(item);
        if (s) return s;
      }
      return '';
    }
    if (typeof d === 'object') {
      // Common keys, in priority order
      const keys = ['output', 'text', 'message', 'reply', 'response', 'answer', 'content', 'data', 'body', 'result'];
      for (const k of keys) {
        if (k in d) {
          const s = pickString(d[k]);
          if (s) return s;
        }
      }
    }
    return '';
  }

  // Expose so the page's setLang() can call it after switching language
  window.chatWidgetSetLang = applyLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectWidget);
  } else {
    injectWidget();
  }
})();
