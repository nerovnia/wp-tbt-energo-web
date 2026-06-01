import { g as getImageUrl, e as getTheme, o as openBlock, c as createElementBlock, F as Fragment, f as renderList, a as createBaseVNode, h as createStaticVNode, n as normalizeStyle, i as normalizeClass, u as unref, j as ref, k as getMiGlobal, l as defineStore, m as computed, t as toDisplayString, p as getUrl, q as createCommentVNode, _ as __, w as withDirectives, v as vModelText, s as nextTick, x as onMounted, y as onBeforeUnmount, z as createTextVNode, A as withModifiers, b as createVNode, B as watch, C as withCtx, T as Transition, D as createBlock, E as withKeys, d as createApp, G as createPinia } from "./chunks/_plugin-vue_export-helper-Cga6DwZW.js";
import { I as Icon } from "./chunks/Icon-DyR-ePz9.js";
const _hoisted_1$6 = ["src"];
const _sfc_main$6 = {
  __name: "ChatToggle",
  emits: ["toggle"],
  setup(__props) {
    const toggleImage = getImageUrl(`ai-charlie/popup-button-charlie-${getTheme()}.png`);
    const isHovered = ref(false);
    const stars = [
      { id: 1, delay: 0, x: -30, y: -40 },
      { id: 2, delay: 0.1, x: 30, y: -30 },
      { id: 3, delay: 0.2, x: -40, y: 10 },
      { id: 4, delay: 0.15, x: 40, y: 5 },
      { id: 5, delay: 0.25, x: 0, y: -50 }
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: "monsterinsights-ai-charlie__toggle",
        title: "AI Charlie",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle")),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => isHovered.value = true),
        onMouseleave: _cache[2] || (_cache[2] = ($event) => isHovered.value = false)
      }, [
        (openBlock(), createElementBlock(Fragment, null, renderList(stars, (star) => {
          return createBaseVNode("span", {
            key: star.id,
            class: normalizeClass(["monsterinsights-ai-charlie__toggle-star", { "is-active": isHovered.value }]),
            style: normalizeStyle({
              "--star-x": star.x + "px",
              "--star-y": star.y + "px",
              "--star-delay": star.delay + "s"
            })
          }, [..._cache[3] || (_cache[3] = [
            createStaticVNode('<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.09 8.26L20 10.27L14.77 13.97L16.18 20.02L12 16.77L7.82 20.02L9.23 13.97L4 10.27L9.91 8.26L12 2Z" fill="url(#mi-charlie-star-grad)" stroke="url(#mi-charlie-star-grad)" stroke-width="0.5"></path><defs><linearGradient id="mi-charlie-star-grad" x1="4" y1="2" x2="20" y2="20"><stop offset="0%" stop-color="#FFD700"></stop><stop offset="100%" stop-color="#FFA500"></stop></linearGradient></defs></svg>', 1)
          ])], 6);
        }), 64)),
        _cache[4] || (_cache[4] = createBaseVNode("span", { class: "monsterinsights-ai-charlie__toggle-glow" }, null, -1)),
        createBaseVNode("img", {
          src: unref(toggleImage),
          alt: "AI Charlie",
          class: "monsterinsights-ai-charlie__toggle-img"
        }, null, 8, _hoisted_1$6)
      ], 32);
    };
  }
};
function ajaxRequest(action, data = {}) {
  return new Promise((resolve, reject) => {
    if (!window.wp || !window.wp.ajax) {
      reject(new Error("WordPress AJAX is not available"));
      return;
    }
    wp.ajax.post(action, { ...data, nonce: getMiGlobal("nonce") }).done((response) => resolve(response)).fail((error) => reject(error));
  });
}
async function saveChat(chat) {
  return ajaxRequest("monsterinsights_ai_charlie_save_chat", {
    chat: JSON.stringify(chat)
  });
}
async function getChats(page = 1) {
  return ajaxRequest("monsterinsights_ai_charlie_get_chats", { page });
}
async function getSavedChats() {
  const response = await ajaxRequest("monsterinsights_ai_charlie_get_saved_chats");
  return response.chats || [];
}
async function loadChat(chatId) {
  const response = await ajaxRequest("monsterinsights_ai_charlie_load_chat", {
    chat_id: chatId
  });
  return response.chat || null;
}
async function deleteChat(chatId) {
  return ajaxRequest("monsterinsights_ai_charlie_delete_chat", {
    chat_id: chatId
  });
}
async function pinChat(chatId, pinned) {
  return ajaxRequest("monsterinsights_ai_charlie_pin_chat", {
    chat_id: chatId,
    pinned: pinned ? 1 : 0
  });
}
function detectScreen() {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page") || "";
  const hash = window.location.hash.replace(/^#\/?/, "") || "";
  if (page === "monsterinsights_reports") {
    return hash || "overview";
  }
  if (page === "monsterinsights_custom_dashboard") {
    return hash ? `dashboard/${hash}` : "dashboard";
  }
  if (page.startsWith("monsterinsights_")) {
    const section = page.replace(/^monsterinsights_?/, "");
    return hash ? `${section}/${hash}` : section;
  }
  return "wp-admin";
}
function detectLocale() {
  if (typeof document === "undefined") {
    return "";
  }
  return (document.documentElement.lang || "").trim();
}
function getContext() {
  return {
    plugin_version: getMiGlobal("plugin_version", "unknown"),
    screen: detectScreen(),
    locale: detectLocale()
  };
}
const STORAGE_KEY = "monsterinsights_ai_charlie_active";
function saveActiveChat(conversation) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(conversation));
  } catch {
  }
}
function loadActiveChat() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function clearActiveChat() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
  }
}
let cachedToken = null;
let cachedTokenExpires = 0;
async function getValidBearerToken() {
  const bufferSeconds = 60;
  const now = Date.now() / 1e3;
  if (cachedToken && cachedTokenExpires > now + bufferSeconds) {
    return cachedToken;
  }
  const pageToken = getMiGlobal("bearer_token", "");
  const pageExpires = getMiGlobal("bearer_expires", 0);
  if (pageToken && pageExpires > now + bufferSeconds) {
    return pageToken;
  }
  return new Promise((resolve) => {
    wp.ajax.post("monsterinsights_get_bearer_token", { nonce: getMiGlobal("nonce") }).done((data) => {
      if (data.token) {
        cachedToken = data.token;
        cachedTokenExpires = data.expires_at;
      }
      resolve(data.token || pageToken);
    }).fail(() => resolve(pageToken));
  });
}
function buildRequestConfig(bearerToken) {
  const apiUrl = getMiGlobal("ai_chat_api_url", "http://localhost:8282/");
  const headers = { "Content-Type": "application/json" };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }
  return {
    url: `${apiUrl.replace(/\/+$/, "")}/api/v1/chat/completions`,
    headers
  };
}
async function getRequestConfig() {
  const token = await getValidBearerToken();
  return buildRequestConfig(token);
}
function handleSSEData(dataStr, currentEvent, handlers) {
  if (dataStr === "[DONE]") {
    return;
  }
  if (currentEvent === "credit_update") {
    return;
  }
  const data = JSON.parse(dataStr);
  if (data.type === "status") {
    if (handlers.onStatus) {
      handlers.onStatus(data.content);
    }
    return;
  }
  if (data.type === "turn_break") {
    if (handlers.onTurnBreak) {
      handlers.onTurnBreak();
    }
    return;
  }
  if (data.type === "insights") {
    if (handlers.onInsights) {
      handlers.onInsights(data.content);
    }
    return;
  }
  if (data.type === "message_id") {
    if (handlers.onMessageId) {
      handlers.onMessageId(data.id);
    }
    return;
  }
  if (data.type === "out_of_credits") {
    if (handlers.onOutOfCredits) {
      handlers.onOutOfCredits(data.plan);
    }
    return;
  }
  if (data.type === "chunk") {
    handlers.onChunk(data.content);
  }
}
async function streamChatResponse(messages, handlers, signal, contextOverrides = {}) {
  const bearerToken = await getValidBearerToken();
  const { url, headers } = buildRequestConfig(bearerToken);
  const body = JSON.stringify({
    messages: messages.filter((m2) => m2.text).map((m2) => ({
      role: m2.type === "user" ? "user" : "assistant",
      content: m2.text
    })),
    stream: true,
    context: { ...getContext(), ...contextOverrides }
  });
  let response = await fetch(url, { method: "POST", headers, signal, body });
  if (response.status === 401) {
    cachedToken = null;
    cachedTokenExpires = 0;
    const freshToken = await getValidBearerToken();
    const retryConfig = buildRequestConfig(freshToken);
    response = await fetch(retryConfig.url, {
      method: "POST",
      headers: retryConfig.headers,
      signal,
      body
    });
  }
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let currentEvent = null;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        currentEvent = null;
        continue;
      }
      if (trimmedLine.startsWith("event: ")) {
        currentEvent = trimmedLine.slice(7).trim();
      } else if (trimmedLine.startsWith("data: ")) {
        try {
          handleSSEData(trimmedLine.slice(6), currentEvent, handlers);
        } catch (e) {
          console.warn("Failed to parse SSE JSON:", e);
        }
      }
    }
  }
}
const INSIGHTS_MARKER_RE = /\s*<!--\s*INSIGHT[\s\S]*$/;
const useChatStore = defineStore("aiCharlie", () => {
  const messages = ref([]);
  const suggestedQuestions = ref([]);
  const isSending = ref(false);
  const statusText = ref("");
  const outOfCredits = ref({ active: false, plan: null });
  const activeView = ref("chat");
  let abortController = null;
  let nextId = 1;
  const currentChatId = ref(null);
  let createdAt = null;
  const isLoadingChats = ref(false);
  const pinningIds = ref([]);
  const allConversations = ref([]);
  const pinnedConversations = ref([]);
  const hasMoreChats = ref(false);
  let currentChatsPage = 1;
  const hasMessages = computed(() => messages.value.length > 0);
  const isListView = computed(
    () => activeView.value === "saved" || activeView.value === "history"
  );
  const savedConversations = computed(() => pinnedConversations.value);
  const historyConversations = computed(() => allConversations.value);
  const isCurrentChatPinned = computed(() => {
    if (!currentChatId.value) {
      return false;
    }
    if (pinnedConversations.value.some((c) => c.id === currentChatId.value)) {
      return true;
    }
    const chat = allConversations.value.find((c) => c.id === currentChatId.value);
    return chat ? chat.pinned : false;
  });
  function pushUserMessage(text2) {
    messages.value.push({ id: nextId++, type: "user", text: text2 });
  }
  function pushAiMessage() {
    messages.value.push({
      id: nextId++,
      type: "ai",
      text: "",
      format: "markdown",
      feedback: null,
      insights: null,
      runId: null
    });
    return messages.value[messages.value.length - 1];
  }
  async function streamToMessage(initialAiMessage, contextOverrides = {}) {
    let aiMessage = initialAiMessage;
    abortController = new AbortController();
    isSending.value = true;
    try {
      await streamChatResponse(
        messages.value,
        {
          onChunk: (content) => {
            statusText.value = "";
            aiMessage.text += content;
          },
          onStatus: (text2) => {
            statusText.value = text2;
          },
          onTurnBreak: () => {
            aiMessage = pushAiMessage();
          },
          onInsights: (insights) => {
            aiMessage.insights = insights;
            aiMessage.text = aiMessage.text.replace(
              INSIGHTS_MARKER_RE,
              ""
            );
          },
          onMessageId: (id) => {
            aiMessage.runId = id;
          },
          onOutOfCredits: (plan) => {
            const idx = messages.value.indexOf(aiMessage);
            if (idx !== -1) {
              messages.value.splice(idx, 1);
            }
            outOfCredits.value = { active: true, plan };
          }
        },
        abortController.signal,
        contextOverrides
      );
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Chat error:", error);
        aiMessage.text = "Sorry, I was unable to connect to the AI assistant. Please try again.";
      }
    } finally {
      abortController = null;
      isSending.value = false;
      statusText.value = "";
      aiMessage.text = aiMessage.text.replace(INSIGHTS_MARKER_RE, "");
      persistConversation();
    }
  }
  async function sendMessage(text2, { is_insight = false } = {}) {
    if (!text2.trim() || isSending.value) {
      return;
    }
    outOfCredits.value = { active: false, plan: null };
    pushUserMessage(text2.trim());
    if (!currentChatId.value) {
      currentChatId.value = generateId();
    }
    const aiMessage = pushAiMessage();
    await streamToMessage(aiMessage, is_insight ? { is_insight: true } : {});
  }
  async function regenerateMessage(messageId) {
    if (isSending.value) {
      return;
    }
    const aiIdx = messages.value.findIndex((m2) => m2.id === messageId);
    if (aiIdx === -1 || messages.value[aiIdx].type !== "ai") {
      return;
    }
    let userIdx = aiIdx - 1;
    while (userIdx >= 0 && messages.value[userIdx].type !== "user") {
      userIdx--;
    }
    if (userIdx < 0) {
      return;
    }
    const previousRunId = messages.value[aiIdx].runId || null;
    messages.value = messages.value.slice(0, userIdx + 1);
    const aiMessage = pushAiMessage();
    await streamToMessage(aiMessage, {
      is_retry: true,
      previous_run_id: previousRunId
    });
  }
  function cancelRequest() {
    if (abortController) {
      abortController.abort();
    }
  }
  function setFeedback(messageId, value) {
    const message = messages.value.find((m2) => m2.id === messageId);
    if (message && message.type === "ai") {
      message.feedback = message.feedback === value ? null : value;
      if (message.runId && message.feedback) {
        getRequestConfig().then(({ url, headers }) => {
          const feedbackUrl = url.replace(/\/completions$/, "/feedback");
          fetch(feedbackUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
              run_id: message.runId,
              score: message.feedback === "up" ? 1 : 0
            })
          }).catch((err) => {
            console.warn("Failed to submit feedback:", err);
          });
        });
      }
    }
  }
  function submitFeedbackComment(messageId, comment) {
    const message = messages.value.find((m2) => m2.id === messageId);
    if (message?.runId && message.feedback === "down") {
      getRequestConfig().then(({ url, headers }) => {
        const feedbackUrl = url.replace(/\/completions$/, "/feedback");
        fetch(feedbackUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({
            run_id: message.runId,
            score: 0,
            comment
          })
        }).catch((err) => {
          console.warn("Failed to submit feedback comment:", err);
        });
      });
    }
  }
  function clearChat() {
    cancelRequest();
    messages.value = [];
    currentChatId.value = null;
    createdAt = null;
    isSending.value = false;
    outOfCredits.value = { active: false, plan: null };
    clearActiveChat();
  }
  function setActiveView(view) {
    activeView.value = view;
  }
  async function deleteConversation(id) {
    try {
      await deleteChat(id);
      allConversations.value = allConversations.value.filter((c) => c.id !== id);
      pinnedConversations.value = pinnedConversations.value.filter((c) => c.id !== id);
      if (currentChatId.value === id) {
        clearChat();
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  }
  function warmup() {
    getRequestConfig().then(({ url, headers }) => {
      if (!headers.Authorization) {
        return;
      }
      const warmupUrl = url.replace(/\/completions$/, "/warmup");
      fetch(warmupUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ context: getContext() })
      }).then((r) => r.ok ? r.json() : null).then((data) => {
        if (data && Array.isArray(data.questions)) {
          suggestedQuestions.value = data.questions;
        }
      }).catch(() => {
      });
    });
  }
  function generateId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      return (c === "x" ? r : r & 3 | 8).toString(16);
    });
  }
  function buildConversation() {
    const firstUserMsg = messages.value.find((m2) => m2.type === "user");
    const now = Math.floor(Date.now() / 1e3);
    if (!createdAt) {
      createdAt = now;
    }
    const sanitized = messages.value.map(
      (m2) => m2.type === "ai" && typeof m2.text === "string" && INSIGHTS_MARKER_RE.test(m2.text) ? { ...m2, text: m2.text.replace(INSIGHTS_MARKER_RE, "") } : m2
    );
    const lastMsg = sanitized[sanitized.length - 1];
    return {
      id: currentChatId.value,
      title: firstUserMsg ? firstUserMsg.text.slice(0, 60) : "",
      preview: lastMsg ? lastMsg.text.slice(0, 100) : "",
      messages: sanitized,
      created_at: createdAt,
      updated_at: now
    };
  }
  function persistConversation() {
    if (!currentChatId.value || messages.value.length === 0) {
      return;
    }
    const conversation = buildConversation();
    saveActiveChat(conversation);
    saveChat(conversation).catch((err) => {
      console.warn("Failed to auto-save conversation:", err);
    });
  }
  function restoreFromSession() {
    const saved = loadActiveChat();
    if (!saved || !saved.messages || saved.messages.length === 0) {
      return;
    }
    currentChatId.value = saved.id;
    createdAt = saved.created_at || null;
    messages.value = saved.messages;
    const maxId = saved.messages.reduce((max, m2) => Math.max(max, m2.id), 0);
    nextId = maxId + 1;
  }
  function startPinning(id) {
    if (!pinningIds.value.includes(id)) {
      pinningIds.value = [...pinningIds.value, id];
    }
  }
  function stopPinning(id) {
    pinningIds.value = pinningIds.value.filter((x2) => x2 !== id);
  }
  function isPinning(id) {
    return pinningIds.value.includes(id);
  }
  async function togglePinCurrentChat() {
    if (!currentChatId.value || messages.value.length === 0) {
      return null;
    }
    const id = currentChatId.value;
    if (isPinning(id)) {
      return null;
    }
    startPinning(id);
    try {
      const conversation = buildConversation();
      try {
        await saveChat(conversation);
      } catch (error) {
        console.error("Failed to save chat before pinning:", error);
        return null;
      }
      const newPinned = !isCurrentChatPinned.value;
      try {
        await pinChat(id, newPinned);
        const inHistory = allConversations.value.find((c) => c.id === id);
        if (inHistory) {
          inHistory.pinned = newPinned;
        }
        if (newPinned) {
          if (!pinnedConversations.value.some((c) => c.id === id)) {
            pinnedConversations.value.unshift({ ...conversation, pinned: true });
          }
        } else {
          pinnedConversations.value = pinnedConversations.value.filter(
            (c) => c.id !== id
          );
        }
        return newPinned;
      } catch (error) {
        console.error("Failed to toggle pin:", error);
        return null;
      }
    } finally {
      stopPinning(id);
    }
  }
  async function togglePinConversation(id) {
    if (isPinning(id)) {
      return;
    }
    const inPinned = pinnedConversations.value.find((c) => c.id === id);
    const inHistory = allConversations.value.find((c) => c.id === id);
    const chat = inPinned || inHistory;
    if (!chat) {
      return;
    }
    startPinning(id);
    try {
      const newPinned = !chat.pinned;
      await pinChat(id, newPinned);
      if (inHistory) {
        inHistory.pinned = newPinned;
      }
      if (newPinned) {
        if (!inPinned) {
          pinnedConversations.value.unshift({ ...chat, pinned: true });
        }
      } else {
        pinnedConversations.value = pinnedConversations.value.filter((c) => c.id !== id);
      }
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    } finally {
      stopPinning(id);
    }
  }
  async function loadSavedChats() {
    isLoadingChats.value = true;
    try {
      pinnedConversations.value = await getSavedChats();
    } catch (error) {
      console.error("Failed to load saved chats:", error);
    } finally {
      isLoadingChats.value = false;
    }
  }
  async function loadAllChats() {
    isLoadingChats.value = true;
    currentChatsPage = 1;
    try {
      const { chats, has_more } = await getChats(1);
      allConversations.value = chats;
      hasMoreChats.value = has_more;
    } catch (error) {
      console.error("Failed to load chats:", error);
    } finally {
      isLoadingChats.value = false;
    }
  }
  async function loadMoreChats() {
    if (!hasMoreChats.value || isLoadingChats.value) {
      return;
    }
    isLoadingChats.value = true;
    const nextPage = currentChatsPage + 1;
    try {
      const { chats, has_more } = await getChats(nextPage);
      allConversations.value.push(...chats);
      hasMoreChats.value = has_more;
      currentChatsPage = nextPage;
    } catch (error) {
      console.error("Failed to load more chats:", error);
    } finally {
      isLoadingChats.value = false;
    }
  }
  async function loadChat$1(id) {
    try {
      const chat = await loadChat(id);
      if (!chat) {
        return;
      }
      currentChatId.value = chat.id;
      createdAt = chat.created_at || null;
      messages.value = chat.messages || [];
      const maxId = messages.value.reduce((max, m2) => Math.max(max, m2.id), 0);
      nextId = maxId + 1;
      activeView.value = "chat";
      outOfCredits.value = { active: false, plan: null };
      saveActiveChat(buildConversation());
    } catch (error) {
      console.error("Failed to load chat:", error);
    }
  }
  function dismissOutOfCredits() {
    outOfCredits.value = { active: false, plan: null };
  }
  return {
    // State
    messages,
    suggestedQuestions,
    isSending,
    statusText,
    activeView,
    allConversations,
    pinnedConversations,
    currentChatId,
    isLoadingChats,
    hasMoreChats,
    pinningIds,
    isPinning,
    outOfCredits,
    // Getters
    hasMessages,
    isListView,
    savedConversations,
    historyConversations,
    isCurrentChatPinned,
    // Actions
    sendMessage,
    regenerateMessage,
    cancelRequest,
    setFeedback,
    submitFeedbackComment,
    clearChat,
    setActiveView,
    warmup,
    deleteConversation,
    togglePinCurrentChat,
    togglePinConversation,
    persistConversation,
    restoreFromSession,
    loadSavedChats,
    loadAllChats,
    loadMoreChats,
    loadChat: loadChat$1,
    dismissOutOfCredits
  };
});
const _hoisted_1$5 = ["data-message-id"];
const _hoisted_2$4 = { class: "monsterinsights-ai-charlie__msg-user-bubble" };
const _sfc_main$5 = {
  __name: "ChatMessageUser",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "monsterinsights-ai-charlie__msg-user",
        "data-message-id": __props.message.id
      }, [
        createBaseVNode("div", _hoisted_2$4, toDisplayString(__props.message.text), 1)
      ], 8, _hoisted_1$5);
    };
  }
};
const {
  entries,
  setPrototypeOf,
  isFrozen,
  getPrototypeOf,
  getOwnPropertyDescriptor
} = Object;
let {
  freeze,
  seal,
  create
} = Object;
let {
  apply,
  construct
} = typeof Reflect !== "undefined" && Reflect;
if (!freeze) {
  freeze = function freeze2(x2) {
    return x2;
  };
}
if (!seal) {
  seal = function seal2(x2) {
    return x2;
  };
}
if (!apply) {
  apply = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create(null);
  for (const [property, value] of entries(object)) {
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (Array.isArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
const TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ARIA_ATTR,
  ATTR_WHITESPACE,
  CUSTOM_ELEMENT,
  DATA_ATTR,
  DOCTYPE_NAME,
  ERB_EXPR,
  IS_ALLOWED_URI,
  IS_SCRIPT_OR_DATA,
  MUSTACHE_EXPR,
  TMPLIT_EXPR
});
const NODE_TYPE = {
  element: 1,
  text: 3,
  // Deprecated
  progressingInstruction: 7,
  comment: 8,
  document: 9
};
const getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.3.3";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let {
    document: document2
  } = window2;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  const {
    DocumentFragment,
    HTMLTemplateElement,
    Node,
    Element,
    NodeFilter,
    NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
    HTMLFormElement,
    DOMParser,
    trustedTypes
  } = window2;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  const {
    implementation,
    createNodeIterator,
    createDocumentFragment,
    getElementsByTagName
  } = document2;
  const {
    importNode
  } = originalDocument;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const {
    MUSTACHE_EXPR: MUSTACHE_EXPR2,
    ERB_EXPR: ERB_EXPR2,
    TMPLIT_EXPR: TMPLIT_EXPR2,
    DATA_ATTR: DATA_ATTR2,
    ARIA_ATTR: ARIA_ATTR2,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
    ATTR_WHITESPACE: ATTR_WHITESPACE2,
    CUSTOM_ELEMENT: CUSTOM_ELEMENT2
  } = EXPRESSIONS;
  let {
    IS_ALLOWED_URI: IS_ALLOWED_URI$1
  } = EXPRESSIONS;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
    ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
    URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
    FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
    HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
    CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = create(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (!objectHasOwnProperty(cfg, "ADD_TAGS")) {
      EXTRA_ELEMENT_HANDLING.tagCheck = null;
    }
    if (!objectHasOwnProperty(cfg, "ADD_ATTR")) {
      EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    }
    if (cfg.ADD_TAGS) {
      if (typeof cfg.ADD_TAGS === "function") {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (cfg.ADD_ATTR) {
      if (typeof cfg.ADD_ATTR === "function") {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (cfg.ADD_FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      emptyHTML = trustedTypesPolicy.createHTML("");
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      }
      if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
        emptyHTML = trustedTypesPolicy.createHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_2) {
      remove(node);
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_2) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _isClobbered = function _isClobbered2(element) {
    return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
  };
  const _isNode = function _isNode2(value) {
    return typeof Node === "function" && value instanceof Node;
  };
  function _executeHooks(hooks2, currentNode, data) {
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    let content = null;
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
      if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
          return false;
        }
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
          return false;
        }
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        const parentNode = getParentNode(currentNode) || currentNode.parentNode;
        const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          const childCount = childNodes.length;
          for (let i = childCount - 1; i >= 0; --i) {
            const childClone = cloneNode(childNodes[i], true);
            childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
            parentNode.insertBefore(childClone, getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      content = currentNode.textContent;
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        content = stringReplace(content, expr, " ");
      });
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (FORBID_ATTR[lcName]) {
      return false;
    }
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
    else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag)) ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const {
      attributes
    } = currentNode;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l = attributes.length;
    while (l--) {
      const attr = attributes[l];
      const {
        name,
        namespaceURI,
        value: attrValue
      } = attr;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          value = stringReplace(value, expr, " ");
        });
      }
      const lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
        if (namespaceURI) ;
        else {
          switch (trustedTypes.getAttributeType(lcTag, lcName)) {
            case "TrustedHTML": {
              value = trustedTypesPolicy.createHTML(value);
              break;
            }
            case "TrustedScriptURL": {
              value = trustedTypesPolicy.createScriptURL(value);
              break;
            }
          }
        }
      }
      if (value !== initValue) {
        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            currentNode.setAttribute(name, value);
          }
          if (_isClobbered(currentNode)) {
            _forceRemove(currentNode);
          } else {
            arrayPop(DOMPurify.removed);
          }
        } catch (_2) {
          _removeAttribute(name, currentNode);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString === "function") {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      } else {
        throw typeErrorCreate("toString is not a function");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        const tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      _sanitizeElements(currentNode);
      _sanitizeAttributes(currentNode);
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
    }
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
        serializedHTML = stringReplace(serializedHTML, expr, " ");
      });
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();
function M() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var T = M();
function H(u3) {
  T = u3;
}
var _ = { exec: () => null };
function k(u3, e = "") {
  let t = typeof u3 == "string" ? u3 : u3.source, n = { replace: (r, i) => {
    let s = typeof i == "string" ? i : i.source;
    return s = s.replace(m.caret, "$1"), t = t.replace(r, s), n;
  }, getRegex: () => new RegExp(t, e) };
  return n;
}
var Re = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return false;
  }
})(), m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u3) => new RegExp(`^( {0,3}${u3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}#`), htmlBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (u3) => new RegExp(`^ {0,${Math.min(3, u3 - 1)}}>`) }, Te = /^(?:[ \t]*(?:\n|$))+/, Oe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, we = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ye = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, N = / {0,3}(?:[*+-]|\d{1,9}[.)])/, re = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, se = k(re).replace(/bull/g, N).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Pe = k(re).replace(/bull/g, N).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Q = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Se = /^[^\n]+/, F = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, $e = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", F).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), _e = k(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, N).getRegex(), q = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", j = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Le = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", j).replace("tag", q).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ie = k(Q).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), Me = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ie).getRegex(), U = { blockquote: Me, code: Oe, def: $e, fences: we, heading: ye, hr: I, html: Le, lheading: se, list: _e, newline: Te, paragraph: ie, table: _, text: Se }, te = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex(), ze = { ...U, lheading: Pe, table: te, paragraph: k(Q).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", te).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", q).getRegex() }, Ce = { ...U, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", j).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: _, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(Q).replace("hr", I).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", se).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Ae = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Ie = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, oe = /^( {2,}|\\)\n(?!\s*$)/, Ee = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, v = /[\p{P}\p{S}]/u, K = /[\s\p{P}\p{S}]/u, ae = /[^\s\p{P}\p{S}]/u, Be = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, K).getRegex(), le = /(?!~)[\p{P}\p{S}]/u, De = /(?!~)[\s\p{P}\p{S}]/u, qe = /(?:[^\s\p{P}\p{S}]|~)/u, ue = /(?![*_])[\p{P}\p{S}]/u, ve = /(?![*_])[\s\p{P}\p{S}]/u, Ge = /(?:[^\s\p{P}\p{S}]|[*_])/u, He = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Re ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), pe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, Ze = k(pe, "u").replace(/punct/g, v).getRegex(), Ne = k(pe, "u").replace(/punct/g, le).getRegex(), ce = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", Qe = k(ce, "gu").replace(/notPunctSpace/g, ae).replace(/punctSpace/g, K).replace(/punct/g, v).getRegex(), Fe = k(ce, "gu").replace(/notPunctSpace/g, qe).replace(/punctSpace/g, De).replace(/punct/g, le).getRegex(), je = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ae).replace(/punctSpace/g, K).replace(/punct/g, v).getRegex(), Ue = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, ue).getRegex(), Ke = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", We = k(Ke, "gu").replace(/notPunctSpace/g, Ge).replace(/punctSpace/g, ve).replace(/punct/g, ue).getRegex(), Xe = k(/\\(punct)/, "gu").replace(/punct/g, v).getRegex(), Je = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), Ve = k(j).replace("(?:-->|$)", "-->").getRegex(), Ye = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", Ve).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), D = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, et = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", D).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), he = k(/^!?\[(label)\]\[(ref)\]/).replace("label", D).replace("ref", F).getRegex(), ke = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", F).getRegex(), tt = k("reflink|nolink(?!\\()", "g").replace("reflink", he).replace("nolink", ke).getRegex(), ne = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, W = { _backpedal: _, anyPunctuation: Xe, autolink: Je, blockSkip: He, br: oe, code: Ie, del: _, delLDelim: _, delRDelim: _, emStrongLDelim: Ze, emStrongRDelimAst: Qe, emStrongRDelimUnd: je, escape: Ae, link: et, nolink: ke, punctuation: Be, reflink: he, reflinkSearch: tt, tag: Ye, text: Ee, url: _ }, nt = { ...W, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", D).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", D).getRegex() }, Z = { ...W, emStrongRDelimAst: Fe, emStrongLDelim: Ne, delLDelim: Ue, delRDelim: We, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", ne).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", ne).getRegex() }, rt = { ...Z, br: k(oe).replace("{2,}", "*").getRegex(), text: k(Z.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, E = { normal: U, gfm: ze, pedantic: Ce }, z = { normal: W, gfm: Z, breaks: rt, pedantic: nt };
var st = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, de = (u3) => st[u3];
function O(u3, e) {
  if (e) {
    if (m.escapeTest.test(u3)) return u3.replace(m.escapeReplace, de);
  } else if (m.escapeTestNoEncode.test(u3)) return u3.replace(m.escapeReplaceNoEncode, de);
  return u3;
}
function X(u3) {
  try {
    u3 = encodeURI(u3).replace(m.percentDecode, "%");
  } catch {
    return null;
  }
  return u3;
}
function J(u3, e) {
  let t = u3.replace(m.findPipe, (i, s, a) => {
    let o = false, l = s;
    for (; --l >= 0 && a[l] === "\\"; ) o = !o;
    return o ? "|" : " |";
  }), n = t.split(m.splitPipe), r = 0;
  if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
  else for (; n.length < e; ) n.push("");
  for (; r < n.length; r++) n[r] = n[r].trim().replace(m.slashPipe, "|");
  return n;
}
function C(u3, e, t) {
  let n = u3.length;
  if (n === 0) return "";
  let r = 0;
  for (; r < n; ) {
    let i = u3.charAt(n - r - 1);
    if (i === e && true) r++;
    else break;
  }
  return u3.slice(0, n - r);
}
function ge(u3, e) {
  if (u3.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let n = 0; n < u3.length; n++) if (u3[n] === "\\") n++;
  else if (u3[n] === e[0]) t++;
  else if (u3[n] === e[1] && (t--, t < 0)) return n;
  return t > 0 ? -2 : -1;
}
function fe(u3, e = 0) {
  let t = e, n = "";
  for (let r of u3) if (r === "	") {
    let i = 4 - t % 4;
    n += " ".repeat(i), t += i;
  } else n += r, t++;
  return n;
}
function me(u3, e, t, n, r) {
  let i = e.href, s = e.title || null, a = u3[1].replace(r.other.outputLinkReplace, "$1");
  n.state.inLink = true;
  let o = { type: u3[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: s, text: a, tokens: n.inlineTokens(a) };
  return n.state.inLink = false, o;
}
function it(u3, e, t) {
  let n = u3.match(t.other.indentCodeCompensation);
  if (n === null) return e;
  let r = n[1];
  return e.split(`
`).map((i) => {
    let s = i.match(t.other.beginningSpace);
    if (s === null) return i;
    let [a] = s;
    return a.length >= r.length ? i.slice(r.length) : i;
  }).join(`
`);
}
var w = class {
  options;
  rules;
  lexer;
  constructor(e) {
    this.options = e || T;
  }
  space(e) {
    let t = this.rules.block.newline.exec(e);
    if (t && t[0].length > 0) return { type: "space", raw: t[0] };
  }
  code(e) {
    let t = this.rules.block.code.exec(e);
    if (t) {
      let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : C(n, `
`) };
    }
  }
  fences(e) {
    let t = this.rules.block.fences.exec(e);
    if (t) {
      let n = t[0], r = it(n, t[3] || "", this.rules);
      return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
    }
  }
  heading(e) {
    let t = this.rules.block.heading.exec(e);
    if (t) {
      let n = t[2].trim();
      if (this.rules.other.endingHash.test(n)) {
        let r = C(n, "#");
        (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
      }
      return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
    }
  }
  hr(e) {
    let t = this.rules.block.hr.exec(e);
    if (t) return { type: "hr", raw: C(t[0], `
`) };
  }
  blockquote(e) {
    let t = this.rules.block.blockquote.exec(e);
    if (t) {
      let n = C(t[0], `
`).split(`
`), r = "", i = "", s = [];
      for (; n.length > 0; ) {
        let a = false, o = [], l;
        for (l = 0; l < n.length; l++) if (this.rules.other.blockquoteStart.test(n[l])) o.push(n[l]), a = true;
        else if (!a) o.push(n[l]);
        else break;
        n = n.slice(l);
        let p = o.join(`
`), c = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r = r ? `${r}
${p}` : p, i = i ? `${i}
${c}` : c;
        let d = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(c, s, true), this.lexer.state.top = d, n.length === 0) break;
        let h = s.at(-1);
        if (h?.type === "code") break;
        if (h?.type === "blockquote") {
          let R = h, f = R.raw + `
` + n.join(`
`), S = this.blockquote(f);
          s[s.length - 1] = S, r = r.substring(0, r.length - R.raw.length) + S.raw, i = i.substring(0, i.length - R.text.length) + S.text;
          break;
        } else if (h?.type === "list") {
          let R = h, f = R.raw + `
` + n.join(`
`), S = this.list(f);
          s[s.length - 1] = S, r = r.substring(0, r.length - h.raw.length) + S.raw, i = i.substring(0, i.length - R.raw.length) + S.raw, n = f.substring(s.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r, tokens: s, text: i };
    }
  }
  list(e) {
    let t = this.rules.block.list.exec(e);
    if (t) {
      let n = t[1].trim(), r = n.length > 1, i = { type: "list", raw: "", ordered: r, start: r ? +n.slice(0, -1) : "", loose: false, items: [] };
      n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
      let s = this.rules.other.listItemRegex(n), a = false;
      for (; e; ) {
        let l = false, p = "", c = "";
        if (!(t = s.exec(e)) || this.rules.block.hr.test(e)) break;
        p = t[0], e = e.substring(p.length);
        let d = fe(t[2].split(`
`, 1)[0], t[1].length), h = e.split(`
`, 1)[0], R = !d.trim(), f = 0;
        if (this.options.pedantic ? (f = 2, c = d.trimStart()) : R ? f = t[1].length + 1 : (f = d.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = d.slice(f), f += t[1].length), R && this.rules.other.blankLine.test(h) && (p += h + `
`, e = e.substring(h.length + 1), l = true), !l) {
          let S = this.rules.other.nextBulletRegex(f), V = this.rules.other.hrRegex(f), Y = this.rules.other.fencesBeginRegex(f), ee = this.rules.other.headingBeginRegex(f), xe = this.rules.other.htmlBeginRegex(f), be = this.rules.other.blockquoteBeginRegex(f);
          for (; e; ) {
            let G = e.split(`
`, 1)[0], A;
            if (h = G, this.options.pedantic ? (h = h.replace(this.rules.other.listReplaceNesting, "  "), A = h) : A = h.replace(this.rules.other.tabCharGlobal, "    "), Y.test(h) || ee.test(h) || xe.test(h) || be.test(h) || S.test(h) || V.test(h)) break;
            if (A.search(this.rules.other.nonSpaceChar) >= f || !h.trim()) c += `
` + A.slice(f);
            else {
              if (R || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || Y.test(d) || ee.test(d) || V.test(d)) break;
              c += `
` + h;
            }
            R = !h.trim(), p += G + `
`, e = e.substring(G.length + 1), d = A.slice(f);
          }
        }
        i.loose || (a ? i.loose = true : this.rules.other.doubleBlankLine.test(p) && (a = true)), i.items.push({ type: "list_item", raw: p, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), i.raw += p;
      }
      let o = i.items.at(-1);
      if (o) o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let l of i.items) {
        if (this.lexer.state.top = false, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
          if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
            l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
            for (let c = this.lexer.inlineQueue.length - 1; c >= 0; c--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
              this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
              break;
            }
          }
          let p = this.rules.other.listTaskCheckbox.exec(l.raw);
          if (p) {
            let c = { type: "checkbox", raw: p[0] + " ", checked: p[0] !== "[ ]" };
            l.checked = c.checked, i.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
          }
        }
        if (!i.loose) {
          let p = l.tokens.filter((d) => d.type === "space"), c = p.length > 0 && p.some((d) => this.rules.other.anyLine.test(d.raw));
          i.loose = c;
        }
      }
      if (i.loose) for (let l of i.items) {
        l.loose = true;
        for (let p of l.tokens) p.type === "text" && (p.type = "paragraph");
      }
      return i;
    }
  }
  html(e) {
    let t = this.rules.block.html.exec(e);
    if (t) return { type: "html", block: true, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
  }
  def(e) {
    let t = this.rules.block.def.exec(e);
    if (t) {
      let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
      return { type: "def", tag: n, raw: t[0], href: r, title: i };
    }
  }
  table(e) {
    let t = this.rules.block.table.exec(e);
    if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
    let n = J(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
    if (n.length === r.length) {
      for (let a of r) this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
      for (let a = 0; a < n.length; a++) s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: true, align: s.align[a] });
      for (let a of i) s.rows.push(J(a, s.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: false, align: s.align[l] })));
      return s;
    }
  }
  lheading(e) {
    let t = this.rules.block.lheading.exec(e);
    if (t) return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) };
  }
  paragraph(e) {
    let t = this.rules.block.paragraph.exec(e);
    if (t) {
      let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
      return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
    }
  }
  text(e) {
    let t = this.rules.block.text.exec(e);
    if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
  }
  escape(e) {
    let t = this.rules.inline.escape.exec(e);
    if (t) return { type: "escape", raw: t[0], text: t[1] };
  }
  tag(e) {
    let t = this.rules.inline.tag.exec(e);
    if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
  }
  link(e) {
    let t = this.rules.inline.link.exec(e);
    if (t) {
      let n = t[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
        if (!this.rules.other.endAngleBracket.test(n)) return;
        let s = C(n.slice(0, -1), "\\");
        if ((n.length - s.length) % 2 === 0) return;
      } else {
        let s = ge(t[2], "()");
        if (s === -2) return;
        if (s > -1) {
          let o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
          t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, o).trim(), t[3] = "";
        }
      }
      let r = t[2], i = "";
      if (this.options.pedantic) {
        let s = this.rules.other.pedanticHrefTitle.exec(r);
        s && (r = s[1], i = s[3]);
      } else i = t[3] ? t[3].slice(1, -1) : "";
      return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), me(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
    }
  }
  reflink(e, t) {
    let n;
    if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
      let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
      if (!i) {
        let s = n[0].charAt(0);
        return { type: "text", raw: s, text: s };
      }
      return me(n, i, n[0], this.lexer, this.rules);
    }
  }
  emStrong(e, t, n = "") {
    let r = this.rules.inline.emStrongLDelim.exec(e);
    if (!r || r[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r[1] || r[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let s = [...r[0]].length - 1, a, o, l = s, p = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (c.lastIndex = 0, t = t.slice(-1 * e.length + s); (r = c.exec(t)) != null; ) {
        if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a) continue;
        if (o = [...a].length, r[3] || r[4]) {
          l += o;
          continue;
        } else if ((r[5] || r[6]) && s % 3 && !((s + o) % 3)) {
          p += o;
          continue;
        }
        if (l -= o, l > 0) continue;
        o = Math.min(o, o + l + p);
        let d = [...r[0]][0].length, h = e.slice(0, s + r.index + d + o);
        if (Math.min(s, o) % 2) {
          let f = h.slice(1, -1);
          return { type: "em", raw: h, text: f, tokens: this.lexer.inlineTokens(f) };
        }
        let R = h.slice(2, -2);
        return { type: "strong", raw: h, text: R, tokens: this.lexer.inlineTokens(R) };
      }
    }
  }
  codespan(e) {
    let t = this.rules.inline.code.exec(e);
    if (t) {
      let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
      return r && i && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
    }
  }
  br(e) {
    let t = this.rules.inline.br.exec(e);
    if (t) return { type: "br", raw: t[0] };
  }
  del(e, t, n = "") {
    let r = this.rules.inline.delLDelim.exec(e);
    if (!r) return;
    if (!(r[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
      let s = [...r[0]].length - 1, a, o, l = s, p = this.rules.inline.delRDelim;
      for (p.lastIndex = 0, t = t.slice(-1 * e.length + s); (r = p.exec(t)) != null; ) {
        if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a || (o = [...a].length, o !== s)) continue;
        if (r[3] || r[4]) {
          l += o;
          continue;
        }
        if (l -= o, l > 0) continue;
        o = Math.min(o, o + l);
        let c = [...r[0]][0].length, d = e.slice(0, s + r.index + c + o), h = d.slice(s, -s);
        return { type: "del", raw: d, text: h, tokens: this.lexer.inlineTokens(h) };
      }
    }
  }
  autolink(e) {
    let t = this.rules.inline.autolink.exec(e);
    if (t) {
      let n, r;
      return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  url(e) {
    let t;
    if (t = this.rules.inline.url.exec(e)) {
      let n, r;
      if (t[2] === "@") n = t[0], r = "mailto:" + n;
      else {
        let i;
        do
          i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
        while (i !== t[0]);
        n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
      }
      return { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
    }
  }
  inlineText(e) {
    let t = this.rules.inline.text.exec(e);
    if (t) {
      let n = this.lexer.state.inRawBlock;
      return { type: "text", raw: t[0], text: t[0], escaped: n };
    }
  }
};
var x = class u {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || T, this.options.tokenizer = this.options.tokenizer || new w(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    let t = { other: m, block: E.normal, inline: z.normal };
    this.options.pedantic ? (t.block = E.pedantic, t.inline = z.pedantic) : this.options.gfm && (t.block = E.gfm, this.options.breaks ? t.inline = z.breaks : t.inline = z.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: E, inline: z };
  }
  static lex(e, t) {
    return new u(t).lex(e);
  }
  static lexInline(e, t) {
    return new u(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let n = this.inlineQueue[t];
      this.inlineTokens(n.src, n.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], n = false) {
    for (this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e; ) {
      let r;
      if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false)) continue;
      if (r = this.tokenizer.space(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        r.raw.length === 1 && s !== void 0 ? s.raw += `
` : t.push(r);
        continue;
      }
      if (r = this.tokenizer.code(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
        continue;
      }
      if (r = this.tokenizer.fences(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.heading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.hr(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.blockquote(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.list(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.html(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.def(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
        continue;
      }
      if (r = this.tokenizer.table(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      if (r = this.tokenizer.lheading(e)) {
        e = e.substring(r.raw.length), t.push(r);
        continue;
      }
      let i = e;
      if (this.options.extensions?.startBlock) {
        let s = 1 / 0, a = e.slice(1), o;
        this.options.extensions.startBlock.forEach((l) => {
          o = l.call({ lexer: this }, a), typeof o == "number" && o >= 0 && (s = Math.min(s, o));
        }), s < 1 / 0 && s >= 0 && (i = e.substring(0, s + 1));
      }
      if (this.state.top && (r = this.tokenizer.paragraph(i))) {
        let s = t.at(-1);
        n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
        continue;
      }
      if (r = this.tokenizer.text(e)) {
        e = e.substring(r.raw.length);
        let s = t.at(-1);
        s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
        continue;
      }
      if (e) {
        let s = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(s);
          break;
        } else throw new Error(s);
      }
    }
    return this.state.top = true, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  inlineTokens(e, t = []) {
    let n = e, r = null;
    if (this.tokens.links) {
      let o = Object.keys(this.tokens.links);
      if (o.length > 0) for (; (r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) o.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    let i;
    for (; (r = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) i = r[2] ? r[2].length : 0, n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
    let s = false, a = "";
    for (; e; ) {
      s || (a = ""), s = false;
      let o;
      if (this.options.extensions?.inline?.some((p) => (o = p.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), true) : false)) continue;
      if (o = this.tokenizer.escape(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.tag(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.link(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(o.raw.length);
        let p = t.at(-1);
        o.type === "text" && p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : t.push(o);
        continue;
      }
      if (o = this.tokenizer.emStrong(e, n, a)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.codespan(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.br(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.del(e, n, a)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (o = this.tokenizer.autolink(e)) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      if (!this.state.inLink && (o = this.tokenizer.url(e))) {
        e = e.substring(o.raw.length), t.push(o);
        continue;
      }
      let l = e;
      if (this.options.extensions?.startInline) {
        let p = 1 / 0, c = e.slice(1), d;
        this.options.extensions.startInline.forEach((h) => {
          d = h.call({ lexer: this }, c), typeof d == "number" && d >= 0 && (p = Math.min(p, d));
        }), p < 1 / 0 && p >= 0 && (l = e.substring(0, p + 1));
      }
      if (o = this.tokenizer.inlineText(l)) {
        e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (a = o.raw.slice(-1)), s = true;
        let p = t.at(-1);
        p?.type === "text" ? (p.raw += o.raw, p.text += o.text) : t.push(o);
        continue;
      }
      if (e) {
        let p = "Infinite loop on byte: " + e.charCodeAt(0);
        if (this.options.silent) {
          console.error(p);
          break;
        } else throw new Error(p);
      }
    }
    return t;
  }
};
var y = class {
  options;
  parser;
  constructor(e) {
    this.options = e || T;
  }
  space(e) {
    return "";
  }
  code({ text: e, lang: t, escaped: n }) {
    let r = (t || "").match(m.notSpaceStart)?.[0], i = e.replace(m.endingNewline, "") + `
`;
    return r ? '<pre><code class="language-' + O(r) + '">' + (n ? i : O(i, true)) + `</code></pre>
` : "<pre><code>" + (n ? i : O(i, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e }) {
    return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
  }
  html({ text: e }) {
    return e;
  }
  def(e) {
    return "";
  }
  heading({ tokens: e, depth: t }) {
    return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
  }
  hr(e) {
    return `<hr>
`;
  }
  list(e) {
    let t = e.ordered, n = e.start, r = "";
    for (let a = 0; a < e.items.length; a++) {
      let o = e.items[a];
      r += this.listitem(o);
    }
    let i = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
    return "<" + i + s + `>
` + r + "</" + i + `>
`;
  }
  listitem(e) {
    return `<li>${this.parser.parse(e.tokens)}</li>
`;
  }
  checkbox({ checked: e }) {
    return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: e }) {
    return `<p>${this.parser.parseInline(e)}</p>
`;
  }
  table(e) {
    let t = "", n = "";
    for (let i = 0; i < e.header.length; i++) n += this.tablecell(e.header[i]);
    t += this.tablerow({ text: n });
    let r = "";
    for (let i = 0; i < e.rows.length; i++) {
      let s = e.rows[i];
      n = "";
      for (let a = 0; a < s.length; a++) n += this.tablecell(s[a]);
      r += this.tablerow({ text: n });
    }
    return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
  }
  tablerow({ text: e }) {
    return `<tr>
${e}</tr>
`;
  }
  tablecell(e) {
    let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
    return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
  }
  strong({ tokens: e }) {
    return `<strong>${this.parser.parseInline(e)}</strong>`;
  }
  em({ tokens: e }) {
    return `<em>${this.parser.parseInline(e)}</em>`;
  }
  codespan({ text: e }) {
    return `<code>${O(e, true)}</code>`;
  }
  br(e) {
    return "<br>";
  }
  del({ tokens: e }) {
    return `<del>${this.parser.parseInline(e)}</del>`;
  }
  link({ href: e, title: t, tokens: n }) {
    let r = this.parser.parseInline(n), i = X(e);
    if (i === null) return r;
    e = i;
    let s = '<a href="' + e + '"';
    return t && (s += ' title="' + O(t) + '"'), s += ">" + r + "</a>", s;
  }
  image({ href: e, title: t, text: n, tokens: r }) {
    r && (n = this.parser.parseInline(r, this.parser.textRenderer));
    let i = X(e);
    if (i === null) return O(n);
    e = i;
    let s = `<img src="${e}" alt="${O(n)}"`;
    return t && (s += ` title="${O(t)}"`), s += ">", s;
  }
  text(e) {
    return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : O(e.text);
  }
};
var $ = class {
  strong({ text: e }) {
    return e;
  }
  em({ text: e }) {
    return e;
  }
  codespan({ text: e }) {
    return e;
  }
  del({ text: e }) {
    return e;
  }
  html({ text: e }) {
    return e;
  }
  text({ text: e }) {
    return e;
  }
  link({ text: e }) {
    return "" + e;
  }
  image({ text: e }) {
    return "" + e;
  }
  br() {
    return "";
  }
  checkbox({ raw: e }) {
    return e;
  }
};
var b = class u2 {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || T, this.options.renderer = this.options.renderer || new y(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $();
  }
  static parse(e, t) {
    return new u2(t).parse(e);
  }
  static parseInline(e, t) {
    return new u2(t).parseInline(e);
  }
  parse(e) {
    let t = "";
    for (let n = 0; n < e.length; n++) {
      let r = e[n];
      if (this.options.extensions?.renderers?.[r.type]) {
        let s = r, a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
        if (a !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s.type)) {
          t += a || "";
          continue;
        }
      }
      let i = r;
      switch (i.type) {
        case "space": {
          t += this.renderer.space(i);
          break;
        }
        case "hr": {
          t += this.renderer.hr(i);
          break;
        }
        case "heading": {
          t += this.renderer.heading(i);
          break;
        }
        case "code": {
          t += this.renderer.code(i);
          break;
        }
        case "table": {
          t += this.renderer.table(i);
          break;
        }
        case "blockquote": {
          t += this.renderer.blockquote(i);
          break;
        }
        case "list": {
          t += this.renderer.list(i);
          break;
        }
        case "checkbox": {
          t += this.renderer.checkbox(i);
          break;
        }
        case "html": {
          t += this.renderer.html(i);
          break;
        }
        case "def": {
          t += this.renderer.def(i);
          break;
        }
        case "paragraph": {
          t += this.renderer.paragraph(i);
          break;
        }
        case "text": {
          t += this.renderer.text(i);
          break;
        }
        default: {
          let s = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent) return console.error(s), "";
          throw new Error(s);
        }
      }
    }
    return t;
  }
  parseInline(e, t = this.renderer) {
    let n = "";
    for (let r = 0; r < e.length; r++) {
      let i = e[r];
      if (this.options.extensions?.renderers?.[i.type]) {
        let a = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (a !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n += a || "";
          continue;
        }
      }
      let s = i;
      switch (s.type) {
        case "escape": {
          n += t.text(s);
          break;
        }
        case "html": {
          n += t.html(s);
          break;
        }
        case "link": {
          n += t.link(s);
          break;
        }
        case "image": {
          n += t.image(s);
          break;
        }
        case "checkbox": {
          n += t.checkbox(s);
          break;
        }
        case "strong": {
          n += t.strong(s);
          break;
        }
        case "em": {
          n += t.em(s);
          break;
        }
        case "codespan": {
          n += t.codespan(s);
          break;
        }
        case "br": {
          n += t.br(s);
          break;
        }
        case "del": {
          n += t.del(s);
          break;
        }
        case "text": {
          n += t.text(s);
          break;
        }
        default: {
          let a = 'Token with "' + s.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return n;
  }
};
var P = class {
  options;
  block;
  constructor(e) {
    this.options = e || T;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(e) {
    return e;
  }
  postprocess(e) {
    return e;
  }
  processAllTokens(e) {
    return e;
  }
  emStrongMask(e) {
    return e;
  }
  provideLexer() {
    return this.block ? x.lex : x.lexInline;
  }
  provideParser() {
    return this.block ? b.parse : b.parseInline;
  }
};
var B = class {
  defaults = M();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = b;
  Renderer = y;
  TextRenderer = $;
  Lexer = x;
  Tokenizer = w;
  Hooks = P;
  constructor(...e) {
    this.use(...e);
  }
  walkTokens(e, t) {
    let n = [];
    for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
      case "table": {
        let i = r;
        for (let s of i.header) n = n.concat(this.walkTokens(s.tokens, t));
        for (let s of i.rows) for (let a of s) n = n.concat(this.walkTokens(a.tokens, t));
        break;
      }
      case "list": {
        let i = r;
        n = n.concat(this.walkTokens(i.items, t));
        break;
      }
      default: {
        let i = r;
        this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s) => {
          let a = i[s].flat(1 / 0);
          n = n.concat(this.walkTokens(a, t));
        }) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
      }
    }
    return n;
  }
  use(...e) {
    let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e.forEach((n) => {
      let r = { ...n };
      if (r.async = this.defaults.async || r.async || false, n.extensions && (n.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let s = t.renderers[i.name];
          s ? t.renderers[i.name] = function(...a) {
            let o = i.renderer.apply(this, a);
            return o === false && (o = s.apply(this, a)), o;
          } : t.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s = t[i.level];
          s ? s.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
      }), r.extensions = t), n.renderer) {
        let i = this.defaults.renderer || new y(this.defaults);
        for (let s in n.renderer) {
          if (!(s in i)) throw new Error(`renderer '${s}' does not exist`);
          if (["options", "parser"].includes(s)) continue;
          let a = s, o = n.renderer[a], l = i[a];
          i[a] = (...p) => {
            let c = o.apply(i, p);
            return c === false && (c = l.apply(i, p)), c || "";
          };
        }
        r.renderer = i;
      }
      if (n.tokenizer) {
        let i = this.defaults.tokenizer || new w(this.defaults);
        for (let s in n.tokenizer) {
          if (!(s in i)) throw new Error(`tokenizer '${s}' does not exist`);
          if (["options", "rules", "lexer"].includes(s)) continue;
          let a = s, o = n.tokenizer[a], l = i[a];
          i[a] = (...p) => {
            let c = o.apply(i, p);
            return c === false && (c = l.apply(i, p)), c;
          };
        }
        r.tokenizer = i;
      }
      if (n.hooks) {
        let i = this.defaults.hooks || new P();
        for (let s in n.hooks) {
          if (!(s in i)) throw new Error(`hook '${s}' does not exist`);
          if (["options", "block"].includes(s)) continue;
          let a = s, o = n.hooks[a], l = i[a];
          P.passThroughHooks.has(s) ? i[a] = (p) => {
            if (this.defaults.async && P.passThroughHooksRespectAsync.has(s)) return (async () => {
              let d = await o.call(i, p);
              return l.call(i, d);
            })();
            let c = o.call(i, p);
            return l.call(i, c);
          } : i[a] = (...p) => {
            if (this.defaults.async) return (async () => {
              let d = await o.apply(i, p);
              return d === false && (d = await l.apply(i, p)), d;
            })();
            let c = o.apply(i, p);
            return c === false && (c = l.apply(i, p)), c;
          };
        }
        r.hooks = i;
      }
      if (n.walkTokens) {
        let i = this.defaults.walkTokens, s = n.walkTokens;
        r.walkTokens = function(a) {
          let o = [];
          return o.push(s.call(this, a)), i && (o = o.concat(i.call(this, a))), o;
        };
      }
      this.defaults = { ...this.defaults, ...r };
    }), this;
  }
  setOptions(e) {
    return this.defaults = { ...this.defaults, ...e }, this;
  }
  lexer(e, t) {
    return x.lex(e, t ?? this.defaults);
  }
  parser(e, t) {
    return b.parse(e, t ?? this.defaults);
  }
  parseMarkdown(e) {
    return (n, r) => {
      let i = { ...r }, s = { ...this.defaults, ...i }, a = this.onError(!!s.silent, !!s.async);
      if (this.defaults.async === true && i.async === false) return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n > "u" || n === null) return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof n != "string") return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
      if (s.hooks && (s.hooks.options = s, s.hooks.block = e), s.async) return (async () => {
        let o = s.hooks ? await s.hooks.preprocess(n) : n, p = await (s.hooks ? await s.hooks.provideLexer() : e ? x.lex : x.lexInline)(o, s), c = s.hooks ? await s.hooks.processAllTokens(p) : p;
        s.walkTokens && await Promise.all(this.walkTokens(c, s.walkTokens));
        let h = await (s.hooks ? await s.hooks.provideParser() : e ? b.parse : b.parseInline)(c, s);
        return s.hooks ? await s.hooks.postprocess(h) : h;
      })().catch(a);
      try {
        s.hooks && (n = s.hooks.preprocess(n));
        let l = (s.hooks ? s.hooks.provideLexer() : e ? x.lex : x.lexInline)(n, s);
        s.hooks && (l = s.hooks.processAllTokens(l)), s.walkTokens && this.walkTokens(l, s.walkTokens);
        let c = (s.hooks ? s.hooks.provideParser() : e ? b.parse : b.parseInline)(l, s);
        return s.hooks && (c = s.hooks.postprocess(c)), c;
      } catch (o) {
        return a(o);
      }
    };
  }
  onError(e, t) {
    return (n) => {
      if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
        let r = "<p>An error occurred:</p><pre>" + O(n.message + "", true) + "</pre>";
        return t ? Promise.resolve(r) : r;
      }
      if (t) return Promise.reject(n);
      throw n;
    };
  }
};
var L = new B();
function g(u3, e) {
  return L.parse(u3, e);
}
g.options = g.setOptions = function(u3) {
  return L.setOptions(u3), g.defaults = L.defaults, H(g.defaults), g;
};
g.getDefaults = M;
g.defaults = T;
g.use = function(...u3) {
  return L.use(...u3), g.defaults = L.defaults, H(g.defaults), g;
};
g.walkTokens = function(u3, e) {
  return L.walkTokens(u3, e);
};
g.parseInline = L.parseInline;
g.Parser = b;
g.parser = b.parse;
g.Renderer = y;
g.TextRenderer = $;
g.Lexer = x;
g.lexer = x.lex;
g.Tokenizer = w;
g.Hooks = P;
g.parse = g;
g.options;
g.setOptions;
g.use;
g.walkTokens;
g.parseInline;
b.parse;
x.lex;
const marked = new B({
  gfm: true,
  breaks: true
});
const renderer = {
  link({ href, title, text: text2 }) {
    try {
      const url = new URL(href);
      if (url.hostname.endsWith("monsterinsights.com")) {
        href = getUrl("ai-charlie", "chat-response", href);
      }
    } catch {
    }
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text2}</a>`;
  }
};
marked.use({ renderer });
const PURIFY_CONFIG = {
  FORBID_TAGS: ["img", "style", "iframe", "object", "embed", "form", "input"],
  FORBID_ATTR: ["style", "onerror", "onload", "onclick"],
  ADD_ATTR: ["target", "rel"]
};
function wrapTables(html2) {
  return html2.replace(
    /<table\b[^>]*>[\s\S]*?<\/table>/g,
    (match) => `<div class="monsterinsights-ai-charlie__msg-ai-table-wrap">${match}</div>`
  );
}
function parseMarkdown(text2) {
  if (!text2) {
    return "";
  }
  const html2 = wrapTables(marked.parse(text2));
  return purify.sanitize(html2, PURIFY_CONFIG);
}
function sanitizeHtml(html2) {
  if (!html2) {
    return "";
  }
  return purify.sanitize(html2, PURIFY_CONFIG);
}
const _hoisted_1$4 = ["data-message-id"];
const _hoisted_2$3 = ["innerHTML"];
const _hoisted_3$3 = {
  key: 1,
  class: "monsterinsights-ai-charlie__msg-ai-text"
};
const _hoisted_4$3 = {
  key: 2,
  class: "monsterinsights-ai-charlie__msg-ai-actions"
};
const _hoisted_5$3 = ["title", "aria-label"];
const _hoisted_6$3 = ["title", "aria-label"];
const _hoisted_7$3 = ["title", "aria-label"];
const _hoisted_8$2 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none"
};
const _hoisted_9$2 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none"
};
const _hoisted_10$2 = ["disabled", "title", "aria-label"];
const _hoisted_11$1 = {
  key: 3,
  class: "monsterinsights-ai-charlie__msg-ai-feedback-thanks"
};
const _hoisted_12$1 = ["placeholder"];
const _hoisted_13$1 = ["disabled"];
const _hoisted_14$1 = {
  key: 5,
  class: "monsterinsights-ai-charlie__msg-ai-insights"
};
const _hoisted_15$1 = { class: "monsterinsights-ai-charlie__msg-ai-insights-header" };
const _hoisted_16$1 = { class: "monsterinsights-ai-charlie__msg-ai-insights-title" };
const _hoisted_17$1 = { class: "monsterinsights-ai-charlie__msg-ai-insights-list" };
const _hoisted_18$1 = { class: "monsterinsights-ai-charlie__msg-ai-insight-label" };
const _hoisted_19$1 = ["onClick"];
const _sfc_main$4 = {
  __name: "ChatMessageAi",
  props: {
    message: {
      type: Object,
      required: true
    },
    isLast: {
      type: Boolean,
      default: false
    },
    isBusy: {
      type: Boolean,
      default: false
    }
  },
  emits: ["feedback", "feedback-comment", "insight-action", "regenerate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const commentText = ref("");
    const commentSubmitted = ref(false);
    const commentBoxRef = ref(null);
    const commentInputRef = ref(null);
    const copied = ref(false);
    let copyTimeout = null;
    const showCommentBox = computed(
      () => props.message.feedback === "down" && !commentSubmitted.value
    );
    const cleanText = computed(() => {
      if (typeof props.message.text !== "string") return "";
      return props.message.text.replace(/\s*<!--\s*INSIGHT[\s\S]*$/, "");
    });
    const hasCopyableText = computed(() => cleanText.value.trim().length > 0);
    const canRegenerate = computed(
      () => props.isLast && Boolean(props.message.runId)
    );
    const showActions = computed(
      () => Boolean(props.message.runId) || hasCopyableText.value || canRegenerate.value
    );
    function handleRegenerate() {
      if (props.isBusy) return;
      emit("regenerate", props.message.id);
    }
    function handleFeedback(value) {
      commentText.value = "";
      commentSubmitted.value = false;
      emit("feedback", props.message.id, value);
      if (value === "down") {
        nextTick(() => {
          commentBoxRef.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
          commentInputRef.value?.focus({ preventScroll: true });
        });
      }
    }
    function submitComment() {
      if (!commentText.value.trim()) return;
      emit("feedback-comment", props.message.id, commentText.value.trim());
      commentSubmitted.value = true;
    }
    async function copyResponse() {
      if (!hasCopyableText.value) return;
      try {
        await navigator.clipboard.writeText(cleanText.value);
        copied.value = true;
        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
          copied.value = false;
        }, 1500);
      } catch (e) {
      }
    }
    const renderedHtml = computed(() => {
      if (!cleanText.value) {
        return "";
      }
      const format = props.message.format || "markdown";
      if (format === "markdown") {
        return parseMarkdown(cleanText.value);
      }
      if (format === "html") {
        return sanitizeHtml(cleanText.value);
      }
      return "";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "monsterinsights-ai-charlie__msg-ai",
        "data-message-id": __props.message.id
      }, [
        renderedHtml.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "monsterinsights-ai-charlie__msg-ai-text",
          innerHTML: renderedHtml.value
        }, null, 8, _hoisted_2$3)) : cleanText.value && __props.message.format === "plain" ? (openBlock(), createElementBlock("div", _hoisted_3$3, toDisplayString(cleanText.value), 1)) : createCommentVNode("", true),
        showActions.value ? (openBlock(), createElementBlock("div", _hoisted_4$3, [
          __props.message.runId ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            class: normalizeClass(["monsterinsights-ai-charlie__msg-ai-action-btn", { "is-active": __props.message.feedback === "up" }]),
            title: unref(__)("Helpful", "google-analytics-for-wordpress"),
            "aria-label": unref(__)("Helpful", "google-analytics-for-wordpress"),
            onClick: _cache[0] || (_cache[0] = ($event) => handleFeedback("up"))
          }, [..._cache[3] || (_cache[3] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 20 20",
              fill: "none"
            }, [
              createBaseVNode("path", {
                d: "M18.6017 8.72868C18.0557 8.07067 17.2009 7.66192 16.3707 7.66192H14.1746C14.6689 6.87434 15.0408 6.0818 15.2675 5.32711C15.6134 4.17547 15.6013 3.17157 15.2325 2.42391C14.817 1.5818 13.9752 1.11801 12.862 1.11801C12.7382 1.11801 12.6172 1.15478 12.5144 1.22364C12.4115 1.2925 12.3314 1.39036 12.2842 1.50481C11.4175 3.60703 9.1568 6.62852 7.02684 8.61895C6.80949 7.86399 6.11297 7.30993 5.28902 7.30993H2.61324C1.61602 7.30993 0.804688 8.12125 0.804688 9.11844V17.0734C0.804688 18.0706 1.61602 18.8819 2.61324 18.8819H5.28902C5.89906 18.8819 6.43914 18.578 6.76687 18.1139C7.26266 18.5909 7.91992 18.8819 8.64012 18.8819H15.3777C16.1225 18.8819 16.7858 18.5648 17.2959 17.9648C17.7163 17.4701 18.015 16.8019 18.1594 16.0323L19.1525 10.7422C19.2857 10.0324 19.0901 9.31735 18.6017 8.72868ZM5.84754 17.0734C5.84754 17.3814 5.59699 17.632 5.28902 17.632H2.61324C2.30527 17.632 2.05469 17.3814 2.05469 17.0734V9.11848C2.05469 8.81051 2.30527 8.55996 2.61324 8.55996H5.28902C5.59699 8.55996 5.84754 8.81051 5.84754 9.11848V17.0734ZM17.9239 10.5116L16.9309 15.8017C16.7648 16.6865 16.2695 17.632 15.3776 17.632H8.64008C7.78953 17.632 7.09758 16.8627 7.09758 15.917V10.224C9.45348 8.26825 12.0919 4.9093 13.2566 2.39875C13.8781 2.50391 14.0488 2.84989 14.1115 2.97692C14.5171 3.79922 14.1805 5.69262 12.4827 7.90657C12.4117 7.99912 12.368 8.10969 12.3566 8.22578C12.3452 8.34186 12.3665 8.45882 12.4181 8.56343C12.4697 8.66803 12.5496 8.75611 12.6486 8.81769C12.7477 8.87927 12.862 8.91189 12.9787 8.91188H16.3707C16.8317 8.91188 17.3298 9.15325 17.6397 9.5268C17.8142 9.73719 18.0052 10.0788 17.9239 10.5116Z",
                fill: "#454B58"
              })
            ], -1)
          ])], 10, _hoisted_5$3)) : createCommentVNode("", true),
          __props.message.runId ? (openBlock(), createElementBlock("button", {
            key: 1,
            type: "button",
            class: normalizeClass(["monsterinsights-ai-charlie__msg-ai-action-btn", { "is-active": __props.message.feedback === "down" }]),
            title: unref(__)("Not helpful", "google-analytics-for-wordpress"),
            "aria-label": unref(__)("Not helpful", "google-analytics-for-wordpress"),
            onClick: _cache[1] || (_cache[1] = ($event) => handleFeedback("down"))
          }, [..._cache[4] || (_cache[4] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 20 20",
              fill: "none"
            }, [
              createBaseVNode("path", {
                d: "M18.6017 11.2713C18.0557 11.9293 17.2009 12.3381 16.3707 12.3381H14.1746C14.6689 13.1257 15.0408 13.9182 15.2675 14.6729C15.6134 15.8245 15.6013 16.8284 15.2325 17.5761C14.817 18.4182 13.9752 18.882 12.862 18.882C12.7382 18.882 12.6172 18.8452 12.5144 18.7764C12.4115 18.7075 12.3314 18.6096 12.2842 18.4952C11.4175 16.393 9.1568 13.3715 7.02684 11.3811C6.80949 12.136 6.11297 12.6901 5.28902 12.6901H2.61324C1.61602 12.6901 0.804688 11.8787 0.804688 10.8816V2.92664C0.804688 1.92941 1.61602 1.11808 2.61324 1.11808H5.28902C5.89906 1.11808 6.43914 1.42203 6.76687 1.88609C7.26266 1.4091 7.91992 1.11808 8.64012 1.11808H15.3777C16.1225 1.11808 16.7858 1.43523 17.2959 2.03523C17.7163 2.52988 18.015 3.19812 18.1594 3.96769L19.1525 9.25781C19.2857 9.96757 19.0901 10.6827 18.6017 11.2713ZM5.84754 2.9266C5.84754 2.61863 5.59699 2.36804 5.28902 2.36804H2.61324C2.30527 2.36804 2.05469 2.61863 2.05469 2.9266V10.8815C2.05469 11.1895 2.30527 11.44 2.61324 11.44H5.28902C5.59699 11.44 5.84754 11.1895 5.84754 10.8815V2.9266ZM17.9239 9.48843L16.9309 4.19828C16.7648 3.31347 16.2695 2.36804 15.3776 2.36804H8.64008C7.78953 2.36804 7.09758 3.13734 7.09758 4.08296V9.77597C9.45348 11.7318 12.0919 15.0907 13.2566 17.6012C13.8781 17.4961 14.0488 17.1501 14.1115 17.0231C14.5171 16.2008 14.1805 14.3074 12.4827 12.0934C12.4117 12.0009 12.368 11.8903 12.3566 11.7742C12.3452 11.6581 12.3665 11.5412 12.4181 11.4366C12.4697 11.332 12.5496 11.2439 12.6486 11.1823C12.7477 11.1207 12.862 11.0881 12.9787 11.0881H16.3707C16.8317 11.0881 17.3298 10.8468 17.6397 10.4732C17.8142 10.2628 18.0052 9.92125 17.9239 9.48843Z",
                fill: "#454B58"
              })
            ], -1)
          ])], 10, _hoisted_6$3)) : createCommentVNode("", true),
          hasCopyableText.value ? (openBlock(), createElementBlock("button", {
            key: 2,
            type: "button",
            class: normalizeClass(["monsterinsights-ai-charlie__msg-ai-action-btn", { "is-active": copied.value }]),
            title: copied.value ? unref(__)("Copied", "google-analytics-for-wordpress") : unref(__)("Copy response", "google-analytics-for-wordpress"),
            "aria-label": copied.value ? unref(__)("Copied", "google-analytics-for-wordpress") : unref(__)("Copy response", "google-analytics-for-wordpress"),
            onClick: copyResponse
          }, [
            !copied.value ? (openBlock(), createElementBlock("svg", _hoisted_8$2, [..._cache[5] || (_cache[5] = [
              createBaseVNode("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M4.75 3A1.75 1.75 0 0 0 3 4.75v10.5c0 .966.784 1.75 1.75 1.75h2.5a.75.75 0 0 0 0-1.5h-2.5a.25.25 0 0 1-.25-.25V4.75a.25.25 0 0 1 .25-.25h7.5a.25.25 0 0 1 .25.25v2.5a.75.75 0 0 0 1.5 0v-2.5A1.75 1.75 0 0 0 12.25 3h-7.5Zm5 6A1.75 1.75 0 0 0 8 10.75v6.5c0 .966.784 1.75 1.75 1.75h7.5A1.75 1.75 0 0 0 19 17.25v-6.5A1.75 1.75 0 0 0 17.25 9h-7.5ZM9.5 10.75a.25.25 0 0 1 .25-.25h7.5a.25.25 0 0 1 .25.25v6.5a.25.25 0 0 1-.25.25h-7.5a.25.25 0 0 1-.25-.25v-6.5Z",
                fill: "#454B58"
              }, null, -1)
            ])])) : (openBlock(), createElementBlock("svg", _hoisted_9$2, [..._cache[6] || (_cache[6] = [
              createBaseVNode("path", {
                d: "M16.5 5.75 8 14.25 3.5 9.75",
                stroke: "#454B58",
                "stroke-width": "1.75",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, null, -1)
            ])]))
          ], 10, _hoisted_7$3)) : createCommentVNode("", true),
          canRegenerate.value ? (openBlock(), createElementBlock("button", {
            key: 3,
            type: "button",
            class: "monsterinsights-ai-charlie__msg-ai-action-btn",
            disabled: __props.isBusy,
            title: unref(__)("Regenerate response", "google-analytics-for-wordpress"),
            "aria-label": unref(__)("Regenerate response", "google-analytics-for-wordpress"),
            onClick: handleRegenerate
          }, [..._cache[7] || (_cache[7] = [
            createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 20 20",
              fill: "none"
            }, [
              createBaseVNode("path", {
                d: "M3.5 10a6.5 6.5 0 0 1 11.19-4.52M16.5 4v3h-3M16.5 10a6.5 6.5 0 0 1-11.19 4.52M3.5 16v-3h3",
                stroke: "#454B58",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1)
          ])], 8, _hoisted_10$2)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        __props.message.feedback === "up" ? (openBlock(), createElementBlock("div", _hoisted_11$1, toDisplayString(unref(__)("Thanks for your feedback!", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true),
        showCommentBox.value ? (openBlock(), createElementBlock("div", {
          key: 4,
          ref_key: "commentBoxRef",
          ref: commentBoxRef,
          class: "monsterinsights-ai-charlie__msg-ai-feedback-comment"
        }, [
          withDirectives(createBaseVNode("textarea", {
            ref_key: "commentInputRef",
            ref: commentInputRef,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => commentText.value = $event),
            class: "monsterinsights-ai-charlie__msg-ai-feedback-comment-input",
            placeholder: unref(__)("What went wrong? (optional)", "google-analytics-for-wordpress"),
            rows: "2",
            maxlength: "500"
          }, null, 8, _hoisted_12$1), [
            [vModelText, commentText.value]
          ]),
          createBaseVNode("button", {
            type: "button",
            class: "monsterinsights-ai-charlie__msg-ai-feedback-comment-btn",
            disabled: !commentText.value.trim(),
            onClick: submitComment
          }, toDisplayString(unref(__)("Send", "google-analytics-for-wordpress")), 9, _hoisted_13$1)
        ], 512)) : createCommentVNode("", true),
        __props.message.insights && __props.message.insights.length ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
          createBaseVNode("div", _hoisted_15$1, [
            _cache[8] || (_cache[8] = createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none"
            }, [
              createBaseVNode("path", {
                d: "M14.093 7.67934L12.2756 7.16C11.4572 6.92928 10.7117 6.49239 10.1105 5.89114C9.50924 5.28989 9.07235 4.5444 8.84162 3.726L8.32229 1.90867C8.29617 1.84509 8.25174 1.79071 8.19464 1.75243C8.13754 1.71416 8.07036 1.69373 8.00162 1.69373C7.93288 1.69373 7.86569 1.71416 7.8086 1.75243C7.7515 1.79071 7.70707 1.84509 7.68095 1.90867L7.16162 3.726C6.93089 4.5444 6.494 5.28989 5.89275 5.89114C5.2915 6.49239 4.54601 6.92928 3.72762 7.16L1.91029 7.67934C1.84051 7.69914 1.77909 7.74117 1.73536 7.79904C1.69163 7.85691 1.66797 7.92747 1.66797 8C1.66797 8.07254 1.69163 8.1431 1.73536 8.20097C1.77909 8.25884 1.84051 8.30086 1.91029 8.32067L3.72762 8.84C4.54601 9.07073 5.2915 9.50762 5.89275 10.1089C6.494 10.7101 6.93089 11.4556 7.16162 12.274L7.68095 14.0913C7.70076 14.1611 7.74278 14.2225 7.80066 14.2663C7.85853 14.31 7.92908 14.3337 8.00162 14.3337C8.07415 14.3337 8.14471 14.31 8.20258 14.2663C8.26045 14.2225 8.30248 14.1611 8.32229 14.0913L8.84162 12.274C9.07235 11.4556 9.50924 10.7101 10.1105 10.1089C10.7117 9.50762 11.4572 9.07073 12.2756 8.84L14.093 8.32067C14.1627 8.30086 14.2241 8.25884 14.2679 8.20097C14.3116 8.1431 14.3353 8.07254 14.3353 8C14.3353 7.92747 14.3116 7.85691 14.2679 7.79904C14.2241 7.74117 14.1627 7.69914 14.093 7.67934Z",
                fill: "#228BEE"
              })
            ], -1)),
            createBaseVNode("span", _hoisted_16$1, toDisplayString(unref(__)("Quick Key Insights", "google-analytics-for-wordpress")), 1)
          ]),
          createBaseVNode("div", _hoisted_17$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.message.insights, (insight, index) => {
              return openBlock(), createElementBlock("div", {
                key: index,
                class: normalizeClass(["monsterinsights-ai-charlie__msg-ai-insight-item", { "has-border": index < __props.message.insights.length - 1 }])
              }, [
                createBaseVNode("span", _hoisted_18$1, toDisplayString(insight.label), 1),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-ai-charlie__msg-ai-insight-btn",
                  onClick: ($event) => _ctx.$emit("insight-action", insight)
                }, toDisplayString(insight.action), 9, _hoisted_19$1)
              ], 2);
            }), 128))
          ])
        ])) : createCommentVNode("", true)
      ], 8, _hoisted_1$4);
    };
  }
};
const _hoisted_1$3 = { class: "monsterinsights-ai-charlie__conv-list" };
const _hoisted_2$2 = { class: "monsterinsights-ai-charlie__conv-items" };
const _hoisted_3$2 = ["onClick"];
const _hoisted_4$2 = {
  key: 0,
  class: "monsterinsights-ai-charlie__conv-item-pin-icon",
  xmlns: "http://www.w3.org/2000/svg",
  width: "14",
  height: "14",
  viewBox: "0 0 20 20",
  fill: "none"
};
const _hoisted_5$2 = ["onClick"];
const _hoisted_6$2 = {
  key: 0,
  class: "monsterinsights-ai-charlie__conv-item-menu"
};
const _hoisted_7$2 = ["disabled", "onClick"];
const _hoisted_8$1 = ["onClick"];
const _hoisted_9$1 = {
  key: 0,
  class: "monsterinsights-ai-charlie__conv-load-more-wrap"
};
const _hoisted_10$1 = ["disabled"];
const _sfc_main$3 = {
  __name: "ChatConversationList",
  props: {
    /** @type {Array<{id: string, title: string, pinned: boolean}>} Conversation items */
    items: { type: Array, default: () => [] },
    /** Whether more conversations exist beyond the current page */
    hasMore: { type: Boolean, default: false },
    /** Whether a page load is in progress */
    isLoading: { type: Boolean, default: false },
    /** @type {string[]} IDs currently pinning/unpinning */
    pinningIds: { type: Array, default: () => [] }
  },
  emits: ["select", "delete", "pin", "load-more"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isItemPinning = (id) => props.pinningIds.includes(id);
    const emit = __emit;
    const openMenuId = ref(null);
    const toggleItemMenu = (id) => {
      openMenuId.value = openMenuId.value === id ? null : id;
    };
    const handleDelete = (id) => {
      emit("delete", id);
      openMenuId.value = null;
    };
    const handlePin = (id) => {
      if (isItemPinning(id)) return;
      emit("pin", id);
      openMenuId.value = null;
    };
    const handleClickOutside = (event) => {
      if (openMenuId.value === null) return;
      const actionsEls = document.querySelectorAll(".monsterinsights-ai-charlie__conv-item-actions");
      let clickedInside = false;
      actionsEls.forEach((el) => {
        if (el.contains(event.target)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) {
        openMenuId.value = null;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, itemIndex) => {
            return openBlock(), createElementBlock("div", {
              key: item.id,
              class: normalizeClass(["monsterinsights-ai-charlie__conv-item", { "has-border": itemIndex < __props.items.length - 1 }])
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "monsterinsights-ai-charlie__conv-item-text",
                onClick: ($event) => _ctx.$emit("select", item)
              }, [
                item.pinned ? (openBlock(), createElementBlock("svg", _hoisted_4$2, [..._cache[1] || (_cache[1] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    d: "M4 2.85311L4.85714 2H15.1429L16 2.85311V18L10 14.4612L4 18V2.85311Z",
                    fill: "#228bee"
                  }, null, -1)
                ])])) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(item.title || item.text), 1)
              ], 8, _hoisted_3$2),
              createBaseVNode("div", {
                class: "monsterinsights-ai-charlie__conv-item-actions",
                ref_for: true,
                ref: "actionRefs"
              }, [
                createBaseVNode("button", {
                  type: "button",
                  class: normalizeClass(["monsterinsights-ai-charlie__conv-item-more", { "is-active": openMenuId.value === item.id }]),
                  onClick: withModifiers(($event) => toggleItemMenu(item.id), ["stop"])
                }, [
                  createVNode(Icon, {
                    name: "more-vertical-dots",
                    size: 24
                  })
                ], 10, _hoisted_5$2),
                openMenuId.value === item.id ? (openBlock(), createElementBlock("div", _hoisted_6$2, [
                  createBaseVNode("button", {
                    type: "button",
                    disabled: isItemPinning(item.id),
                    onClick: withModifiers(($event) => handlePin(item.id), ["stop"])
                  }, [
                    _cache[2] || (_cache[2] = createBaseVNode("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "12",
                      height: "12",
                      viewBox: "0 0 20 20",
                      fill: "none"
                    }, [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        "clip-rule": "evenodd",
                        d: "M4 2.85311L4.85714 2H15.1429L16 2.85311V18L10 14.4612L4 18V2.85311ZM5.71429 3.70622V15.0057L10 12.4779L14.2857 15.0057V3.70622H5.71429Z",
                        fill: "currentColor"
                      })
                    ], -1)),
                    createBaseVNode("span", null, toDisplayString(item.pinned ? unref(__)("Unpin", "google-analytics-for-wordpress") : unref(__)("Pin", "google-analytics-for-wordpress")), 1)
                  ], 8, _hoisted_7$2),
                  createBaseVNode("button", {
                    type: "button",
                    onClick: withModifiers(($event) => handleDelete(item.id), ["stop"])
                  }, [
                    createVNode(Icon, {
                      name: "trash",
                      size: 12,
                      class: "monsterinsights-ai-charlie__conv-item-trash-icon"
                    }),
                    createBaseVNode("span", null, toDisplayString(unref(__)("Delete", "google-analytics-for-wordpress")), 1)
                  ], 8, _hoisted_8$1)
                ])) : createCommentVNode("", true)
              ], 512)
            ], 2);
          }), 128))
        ]),
        __props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
          createBaseVNode("button", {
            type: "button",
            class: "monsterinsights-ai-charlie__conv-load-more",
            disabled: __props.isLoading,
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("load-more"))
          }, toDisplayString(__props.isLoading ? unref(__)("Loading...", "google-analytics-for-wordpress") : unref(__)("Load more", "google-analytics-for-wordpress")), 9, _hoisted_10$1)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$2 = { class: "monsterinsights-ai-charlie__upsell" };
const _hoisted_2$1 = ["aria-label"];
const _hoisted_3$1 = { class: "monsterinsights-ai-charlie__upsell-title" };
const _hoisted_4$1 = { class: "monsterinsights-ai-charlie__upsell-bullets" };
const _hoisted_5$1 = { class: "monsterinsights-ai-charlie__upsell-cta-group" };
const _hoisted_6$1 = ["href"];
const _hoisted_7$1 = {
  key: 0,
  class: "monsterinsights-ai-charlie__upsell-caption"
};
const _sfc_main$2 = {
  __name: "ChatUpsellBanner",
  props: {
    plan: {
      type: String,
      required: true
    }
  },
  emits: ["dismiss"],
  setup(__props) {
    const props = __props;
    const isLite = computed(() => props.plan === "lite" || props.plan === "lite_disabled");
    const bullets = computed(() => [
      __("Scale smarter with AI analytics", "google-analytics-for-wordpress"),
      __("Reveal high-value growth signals", "google-analytics-for-wordpress"),
      __("Enhance visibility across funnels", "google-analytics-for-wordpress"),
      __("Surface deeper behavioral trends", "google-analytics-for-wordpress")
    ]);
    const ctaLabel = computed(
      () => isLite.value ? __("Upgrade to PRO", "google-analytics-for-wordpress") : __("Buy More Credits", "google-analytics-for-wordpress")
    );
    const ctaUrl = computed(
      () => isLite.value ? "https://www.monsterinsights.com/lite-pricing/?utm_source=ai_chat&utm_medium=upsell&utm_campaign=lite_out_of_credits&utm_content=upgrade_to_pro" : "https://www.monsterinsights.com/my-account/?utm_source=ai_chat&utm_medium=upsell&utm_campaign=pro_out_of_credits&utm_content=buy_more_credits"
    );
    const caption = computed(() => __("Save 50% Now", "google-analytics-for-wordpress"));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("button", {
          type: "button",
          class: "monsterinsights-ai-charlie__upsell-dismiss",
          "aria-label": unref(__)("Dismiss", "google-analytics-for-wordpress"),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("dismiss"))
        }, [..._cache[1] || (_cache[1] = [
          createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            "aria-hidden": "true"
          }, [
            createBaseVNode("path", {
              d: "M10.5 3.5l-7 7M3.5 3.5l7 7",
              stroke: "currentColor",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          ], -1)
        ])], 8, _hoisted_2$1),
        _cache[4] || (_cache[4] = createStaticVNode('<svg class="monsterinsights-ai-charlie__upsell-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><g clip-path="url(#mi-charlie-upsell-coin-clip)"><path d="M47.2969 5.46844C45.1003 5.46844 43.3125 3.33094 43.3125 0.703125C43.3125 0.516645 43.2384 0.337802 43.1066 0.205941C42.9747 0.074079 42.7959 0 42.6094 0C42.4229 0 42.2441 0.074079 42.1122 0.205941C41.9803 0.337802 41.9062 0.516645 41.9062 0.703125C41.9062 3.32812 40.1184 5.46844 37.9219 5.46844C37.7354 5.46844 37.5566 5.54252 37.4247 5.67438C37.2928 5.80624 37.2188 5.98508 37.2188 6.17156C37.2188 6.35804 37.2928 6.53689 37.4247 6.66875C37.5566 6.80061 37.7354 6.87469 37.9219 6.87469C40.1184 6.87469 41.9062 9.01312 41.9062 11.6409C41.9062 11.8274 41.9803 12.0063 42.1122 12.1381C42.2441 12.27 42.4229 12.3441 42.6094 12.3441C42.7959 12.3441 42.9747 12.27 43.1066 12.1381C43.2384 12.0063 43.3125 11.8274 43.3125 11.6409C43.3125 9.01594 45.1003 6.87469 47.2969 6.87469C47.4834 6.87469 47.6622 6.80061 47.7941 6.66875C47.9259 6.53689 48 6.35804 48 6.17156C48 5.98508 47.9259 5.80624 47.7941 5.67438C47.6622 5.54252 47.4834 5.46844 47.2969 5.46844ZM42.6094 8.595C42.1242 7.5957 41.3646 6.75514 40.4194 6.17156C41.3646 5.58881 42.1242 4.74885 42.6094 3.75C43.0944 4.74919 43.854 5.5895 44.7994 6.1725C43.8543 6.75582 43.0947 7.59604 42.6094 8.595Z" fill="#393F4C"></path><path d="M10.0781 41.0934C7.88156 41.0934 6.09375 38.9559 6.09375 36.3281C6.09375 36.1416 6.01967 35.9628 5.88781 35.8309C5.75595 35.6991 5.57711 35.625 5.39062 35.625C5.20414 35.625 5.0253 35.6991 4.89344 35.8309C4.76158 35.9628 4.6875 36.1416 4.6875 36.3281C4.6875 38.9531 2.89969 41.0934 0.703125 41.0934C0.516645 41.0934 0.337802 41.1675 0.205941 41.2994C0.074079 41.4312 0 41.6101 0 41.7966C0 41.983 0.074079 42.1619 0.205941 42.2937C0.337802 42.4256 0.516645 42.4997 0.703125 42.4997C2.89969 42.4997 4.6875 44.6381 4.6875 47.2659C4.6875 47.4524 4.76158 47.6312 4.89344 47.7631C5.0253 47.8949 5.20414 47.969 5.39062 47.969C5.57711 47.969 5.75595 47.8949 5.88781 47.7631C6.01967 47.6312 6.09375 47.4524 6.09375 47.2659C6.09375 44.6409 7.88156 42.4997 10.0781 42.4997C10.2646 42.4997 10.4434 42.4256 10.5753 42.2937C10.7072 42.1619 10.7812 41.983 10.7812 41.7966C10.7812 41.6101 10.7072 41.4312 10.5753 41.2994C10.4434 41.1675 10.2646 41.0934 10.0781 41.0934ZM5.39062 44.22C4.90544 43.2207 4.14585 42.3801 3.20062 41.7966C4.14585 41.2138 4.9055 40.3738 5.39062 39.375C5.87561 40.3742 6.63527 41.2145 7.58063 41.7975C6.63554 42.3808 5.87595 43.221 5.39062 44.22Z" fill="#393F4C"></path><path d="M18.5156 0C8.30625 0 0 8.30625 0 18.5156C0 28.725 8.30625 37.0312 18.5156 37.0312C28.725 37.0312 37.0312 28.725 37.0312 18.5156C37.0312 8.30625 28.725 0 18.5156 0ZM18.5156 35.625C9.08156 35.625 1.40625 27.9497 1.40625 18.5156C1.40625 9.08156 9.08156 1.40625 18.5156 1.40625C27.9497 1.40625 35.625 9.08156 35.625 18.5156C35.625 27.9497 27.9497 35.625 18.5156 35.625Z" fill="#393F4C"></path><path d="M18.5156 3.28125C10.1156 3.28125 3.28125 10.1156 3.28125 18.5156C3.28125 26.9156 10.1156 33.75 18.5156 33.75C26.9156 33.75 33.75 26.9156 33.75 18.5156C33.75 10.1156 26.9156 3.28125 18.5156 3.28125ZM18.5156 32.3438C10.8909 32.3438 4.6875 26.1403 4.6875 18.5156C4.6875 10.8909 10.8909 4.6875 18.5156 4.6875C26.1403 4.6875 32.3438 10.8909 32.3438 18.5156C32.3438 26.1403 26.1403 32.3438 18.5156 32.3438Z" fill="#393F4C"></path><path d="M24.1406 12.1875H12.8906C12.7041 12.1875 12.5253 12.2616 12.3934 12.3934C12.2616 12.5253 12.1875 12.7041 12.1875 12.8906V24.1406C12.1875 24.3271 12.2616 24.5059 12.3934 24.6378C12.5253 24.7697 12.7041 24.8438 12.8906 24.8438H24.1406C24.3271 24.8438 24.5059 24.7697 24.6378 24.6378C24.7697 24.5059 24.8438 24.3271 24.8438 24.1406V12.8906C24.8438 12.7041 24.7697 12.5253 24.6378 12.3934C24.5059 12.2616 24.3271 12.1875 24.1406 12.1875ZM23.4375 23.4375H13.5938V13.5938H23.4375V23.4375Z" fill="#393F4C"></path><path d="M27.1875 16.1719V20.8594C27.1875 21.0459 27.2616 21.2247 27.3934 21.3566C27.5253 21.4884 27.7041 21.5625 27.8906 21.5625C28.0771 21.5625 28.2559 21.4884 28.3878 21.3566C28.5197 21.2247 28.5938 21.0459 28.5938 20.8594V16.1719C28.5938 15.9854 28.5197 15.8066 28.3878 15.6747C28.2559 15.5428 28.0771 15.4688 27.8906 15.4688C27.7041 15.4688 27.5253 15.5428 27.3934 15.6747C27.2616 15.8066 27.1875 15.9854 27.1875 16.1719Z" fill="#393F4C"></path><path d="M9.14062 15.4688C8.95414 15.4688 8.7753 15.5428 8.64344 15.6747C8.51158 15.8066 8.4375 15.9854 8.4375 16.1719V20.8594C8.4375 21.0459 8.51158 21.2247 8.64344 21.3566C8.7753 21.4884 8.95414 21.5625 9.14062 21.5625C9.32711 21.5625 9.50595 21.4884 9.63781 21.3566C9.76967 21.2247 9.84375 21.0459 9.84375 20.8594V16.1719C9.84375 15.9854 9.76967 15.8066 9.63781 15.6747C9.50595 15.5428 9.32711 15.4688 9.14062 15.4688Z" fill="#393F4C"></path><path d="M20.8594 27.1875H16.1719C15.9854 27.1875 15.8066 27.2616 15.6747 27.3934C15.5428 27.5253 15.4688 27.7041 15.4688 27.8906C15.4688 28.0771 15.5428 28.2559 15.6747 28.3878C15.8066 28.5197 15.9854 28.5938 16.1719 28.5938H20.8594C21.0459 28.5938 21.2247 28.5197 21.3566 28.3878C21.4884 28.2559 21.5625 28.0771 21.5625 27.8906C21.5625 27.7041 21.4884 27.5253 21.3566 27.3934C21.2247 27.2616 21.0459 27.1875 20.8594 27.1875Z" fill="#393F4C"></path><path d="M16.1719 9.84375H20.8594C21.0459 9.84375 21.2247 9.76967 21.3566 9.63781C21.4884 9.50595 21.5625 9.32711 21.5625 9.14062C21.5625 8.95414 21.4884 8.7753 21.3566 8.64344C21.2247 8.51158 21.0459 8.4375 20.8594 8.4375H16.1719C15.9854 8.4375 15.8066 8.51158 15.6747 8.64344C15.5428 8.7753 15.4688 8.95414 15.4688 9.14062C15.4688 9.32711 15.5428 9.50595 15.6747 9.63781C15.8066 9.76967 15.9854 9.84375 16.1719 9.84375Z" fill="#393F4C"></path><path d="M32.2969 43.7813C34.8224 43.7816 37.2777 42.9493 39.2824 41.4132C41.2871 39.877 42.7294 37.7228 43.3861 35.2841C44.0427 32.8454 43.877 30.2582 42.9146 27.9232C41.9522 25.5882 40.2468 23.6356 38.0625 22.3678C37.8494 23.454 37.5452 24.5202 37.1531 25.5553L39.0938 27.4903C39.225 27.6224 39.2989 27.8014 39.2987 27.9881C39.2985 28.1748 39.2241 28.3537 39.0925 28.4853C38.9609 28.6169 38.7821 28.6913 38.5953 28.6915C38.4086 28.6917 38.2296 28.6178 38.0975 28.4866L36.5625 26.9494C36.2496 27.6166 35.9 28.2661 35.5153 28.8947L38.4216 31.8009C38.4869 31.8662 38.5387 31.9436 38.574 32.0289C38.6094 32.1141 38.6276 32.2055 38.6276 32.2978C38.6276 32.3901 38.6094 32.4815 38.574 32.5668C38.5387 32.652 38.4869 32.7295 38.4216 32.7947L32.7966 38.4197C32.7314 38.4851 32.654 38.537 32.5687 38.5724C32.4834 38.6079 32.392 38.6261 32.2997 38.6261C32.2074 38.6261 32.1159 38.6079 32.0307 38.5724C31.9454 38.537 31.868 38.4851 31.8028 38.4197L28.8966 35.5134C28.2674 35.8988 27.6173 36.2491 26.9494 36.5625L28.485 38.0981C28.617 38.23 28.6912 38.409 28.6913 38.5956C28.6914 38.7822 28.6174 38.9613 28.4855 39.0933C28.3536 39.2253 28.1746 39.2995 27.988 39.2996C27.8014 39.2997 27.6223 39.2257 27.4903 39.0938L25.5516 37.1531C24.5165 37.5452 23.4502 37.8494 22.3641 38.0625C23.3744 39.8016 24.8235 41.2451 26.5666 42.2487C28.3096 43.2522 30.2856 43.7807 32.2969 43.7813ZM36.1088 38.0972L38.0972 36.1088C38.2291 35.9766 38.4081 35.9023 38.5948 35.9021C38.7815 35.9019 38.9607 35.9759 39.0928 36.1078C39.225 36.2397 39.2993 36.4187 39.2995 36.6054C39.2997 36.7921 39.2257 36.9713 39.0938 37.1034L37.1034 39.0938C36.9715 39.2257 36.7926 39.2998 36.6061 39.2998C36.4196 39.2998 36.2407 39.2257 36.1088 39.0938C35.9768 38.9618 35.9027 38.7829 35.9027 38.5964C35.9027 38.4099 35.9768 38.231 36.1088 38.0991V38.0972Z" fill="#228BEE"></path><path d="M38.4244 17.8388C38.4319 18.0638 38.4375 18.2888 38.4375 18.5156C38.4375 19.3093 38.3899 20.1023 38.295 20.8903C40.3733 21.9841 42.1136 23.6245 43.3282 25.6346C44.5429 27.6448 45.1857 29.9483 45.1875 32.2969C45.1875 39.405 39.405 45.1875 32.2969 45.1875C29.9483 45.1857 27.6448 44.5429 25.6346 43.3282C23.6245 42.1136 21.9841 40.3733 20.8903 38.295C20.1023 38.3899 19.3093 38.4375 18.5156 38.4375C18.2888 38.4375 18.0638 38.4319 17.8388 38.4244C20.2313 44.0494 25.8075 48 32.2969 48C40.9556 48 48 40.9556 48 32.2969C48 25.8113 44.0475 20.2313 38.4244 17.8388Z" fill="#228BEE"></path></g><defs><clipPath id="mi-charlie-upsell-coin-clip"><rect width="48" height="48" fill="white"></rect></clipPath></defs></svg>', 1)),
        createBaseVNode("h3", _hoisted_3$1, toDisplayString(unref(__)("Want More Insights?", "google-analytics-for-wordpress")), 1),
        createBaseVNode("ul", _hoisted_4$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(bullets.value, (bullet) => {
            return openBlock(), createElementBlock("li", { key: bullet }, [
              _cache[2] || (_cache[2] = createStaticVNode('<svg class="monsterinsights-ai-charlie__upsell-bullet-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6.148 0.104a0.16 0.16 0 0 1 0.296 0L6.997 1.64A6.5 6.5 0 0 0 10.36 5.299L11.896 5.852A0.16 0.16 0 0 1 11.896 6.148L10.36 6.701A6.5 6.5 0 0 0 6.997 10.361L6.444 11.896A0.16 0.16 0 0 1 6.148 11.896L5.595 10.361A6.5 6.5 0 0 0 2.235 6.701L0.700 6.148A0.16 0.16 0 0 1 0.700 5.852L2.235 5.299A6.5 6.5 0 0 0 5.595 1.64L6.148 0.104Z" fill="url(#mi-charlie-upsell-bullet-grad)"></path><defs><linearGradient id="mi-charlie-upsell-bullet-grad" x1="6" y1="0" x2="0" y2="10.5" gradientUnits="userSpaceOnUse"><stop stop-color="#693DC9"></stop><stop offset="1" stop-color="#228BEE"></stop></linearGradient></defs></svg>', 1)),
              createBaseVNode("span", null, toDisplayString(bullet), 1)
            ]);
          }), 128))
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          createBaseVNode("a", {
            href: ctaUrl.value,
            class: "monsterinsights-ai-charlie__upsell-cta",
            target: "_blank",
            rel: "noopener noreferrer"
          }, [
            createBaseVNode("span", null, toDisplayString(ctaLabel.value), 1),
            _cache[3] || (_cache[3] = createBaseVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              "aria-hidden": "true"
            }, [
              createBaseVNode("path", {
                d: "M3.333 8h9.334M8 3.333L12.667 8 8 12.667",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              })
            ], -1))
          ], 8, _hoisted_6$1),
          caption.value ? (openBlock(), createElementBlock("p", _hoisted_7$1, toDisplayString(caption.value), 1)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
};
const _hoisted_1$1 = { class: "monsterinsights-ai-charlie__popup-header" };
const _hoisted_2 = { class: "monsterinsights-ai-charlie__popup-header-left" };
const _hoisted_3 = {
  key: 0,
  class: "monsterinsights-ai-charlie__popup-menu"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "monsterinsights-ai-charlie__popup-header-view-title" };
const _hoisted_6 = { class: "monsterinsights-ai-charlie__popup-header-right" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 0,
  class: "monsterinsights-ai-charlie__popup-save-spinner",
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none"
};
const _hoisted_9 = { key: 1 };
const _hoisted_10 = { key: 2 };
const _hoisted_11 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none"
};
const _hoisted_12 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none"
};
const _hoisted_13 = {
  key: 0,
  class: "monsterinsights-ai-charlie__popup-toast"
};
const _hoisted_14 = { class: "monsterinsights-ai-charlie__popup-mascot" };
const _hoisted_15 = ["src"];
const _hoisted_16 = { class: "monsterinsights-ai-charlie__not-connected" };
const _hoisted_17 = { class: "monsterinsights-ai-charlie__not-connected-title" };
const _hoisted_18 = { class: "monsterinsights-ai-charlie__not-connected-text" };
const _hoisted_19 = ["href"];
const _hoisted_20 = ["href"];
const _hoisted_21 = { class: "monsterinsights-ai-charlie__popup-mascot" };
const _hoisted_22 = ["src"];
const _hoisted_23 = { class: "monsterinsights-ai-charlie__popup-title" };
const _hoisted_24 = { class: "monsterinsights-ai-charlie__popup-suggestions" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "monsterinsights-ai-charlie__popup-suggestion-text" };
const _hoisted_27 = {
  key: 4,
  class: "monsterinsights-ai-charlie__chat-messages"
};
const _hoisted_28 = {
  key: 0,
  class: "monsterinsights-ai-charlie__msg-ai-typing"
};
const _hoisted_29 = {
  key: 0,
  class: "monsterinsights-ai-charlie__msg-ai-status"
};
const _hoisted_30 = {
  key: 1,
  class: "monsterinsights-ai-charlie__chat-spacer",
  "aria-hidden": "true"
};
const _hoisted_31 = {
  key: 2,
  class: "monsterinsights-ai-charlie__popup-footer"
};
const _hoisted_32 = ["placeholder", "disabled", "onKeydown"];
const _hoisted_33 = ["disabled"];
const _hoisted_34 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  fill: "none"
};
const _hoisted_35 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "32",
  height: "32",
  viewBox: "0 0 32 32",
  fill: "none"
};
const JUMP_TO_LATEST_THRESHOLD = 60;
const SCROLL_TO_TOP_OFFSET = 25;
const _sfc_main$1 = {
  __name: "ChatPopup",
  emits: ["close"],
  setup(__props) {
    const theme = getTheme();
    const headerLogo = getImageUrl(`ai-charlie/header-bar-charlie-${theme}.png`);
    const mascotImage = getImageUrl(`ai-charlie/overview-charlie-${theme}.png`);
    const isAuthenticated = computed(() => !!getMiGlobal("bearer_token", ""));
    const wizardUrl = getMiGlobal("wizard_url", "");
    const settingsUrl = getMiGlobal("settings_url", "");
    const chatStore = useChatStore();
    const lastAiMessageId = computed(() => {
      for (let i = chatStore.messages.length - 1; i >= 0; i--) {
        const m2 = chatStore.messages[i];
        if (m2.type === "ai") return m2.id;
      }
      return null;
    });
    const chatBody = ref(null);
    const inputField = ref(null);
    const inputText = ref("");
    const showMenu = ref(false);
    const isExpanded = ref(false);
    const menuWrapper = ref(null);
    const toggleMenu = () => {
      showMenu.value = !showMenu.value;
    };
    const closeMenu = () => {
      showMenu.value = false;
    };
    const handleNewChat = () => {
      chatStore.clearChat();
      chatStore.setActiveView("chat");
      closeMenu();
    };
    const handleClickOutside = (event) => {
      if (menuWrapper.value && !menuWrapper.value.contains(event.target)) {
        closeMenu();
      }
    };
    const viewTitle = computed(() => {
      if (chatStore.activeView === "saved") {
        return __("Pinned Conversations", "google-analytics-for-wordpress");
      }
      if (chatStore.activeView === "history") {
        return __("History", "google-analytics-for-wordpress");
      }
      return "";
    });
    const handleBackToChat = () => {
      chatStore.setActiveView("chat");
    };
    const handleOpenSaved = () => {
      chatStore.setActiveView("saved");
      chatStore.loadSavedChats();
      closeMenu();
    };
    const handleOpenHistory = () => {
      chatStore.setActiveView("history");
      chatStore.loadAllChats();
      closeMenu();
    };
    const handleConversationSelect = (item) => {
      chatStore.loadChat(item.id);
    };
    const handleDeleteChat = (id) => {
      chatStore.deleteConversation(id);
    };
    const handleTogglePin = (id) => {
      chatStore.togglePinConversation(id);
    };
    const showJumpToLatest = ref(false);
    const updateJumpToLatest = () => {
      const body = chatBody.value;
      if (!body) {
        showJumpToLatest.value = false;
        return;
      }
      const messages = body.querySelectorAll("[data-message-id]");
      const last = messages[messages.length - 1];
      if (!last) {
        showJumpToLatest.value = false;
        return;
      }
      const lastRect = last.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      showJumpToLatest.value = lastRect.bottom - bodyRect.bottom > JUMP_TO_LATEST_THRESHOLD;
    };
    watch(() => chatStore.messages.length, () => {
      nextTick(updateJumpToLatest);
    });
    watch(() => chatStore.activeView, () => {
      nextTick(updateJumpToLatest);
    });
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
      chatStore.restoreFromSession();
      if (chatBody.value) {
        chatBody.value.addEventListener("scroll", updateJumpToLatest, { passive: true });
      }
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
      if (chatBody.value) {
        chatBody.value.removeEventListener("scroll", updateJumpToLatest);
      }
    });
    const autoResize = () => {
      const el = inputField.value;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    };
    const scrollToBottom = () => {
      nextTick(() => {
        const body = chatBody.value;
        if (!body) return;
        const messages = body.querySelectorAll("[data-message-id]");
        const last = messages[messages.length - 1];
        if (!last) {
          body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
          return;
        }
        const lastRect = last.getBoundingClientRect();
        const bodyRect = body.getBoundingClientRect();
        const target = body.scrollTop + (lastRect.bottom - bodyRect.bottom);
        body.scrollTo({ top: target, behavior: "smooth" });
      });
    };
    const scrollMessageToTop = (messageId) => {
      const body = chatBody.value;
      if (!body) return false;
      const el = body.querySelector(`[data-message-id="${messageId}"]`);
      if (!el) return false;
      const elRect = el.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();
      const target = body.scrollTop + (elRect.top - bodyRect.top - SCROLL_TO_TOP_OFFSET);
      body.scrollTo({ top: target, behavior: "smooth" });
      return true;
    };
    const sendMessage = (text2, options = {}) => {
      const messageText = text2 || inputText.value;
      if (!messageText.trim()) return;
      chatStore.sendMessage(messageText, options);
      inputText.value = "";
      nextTick(() => {
        if (inputField.value) {
          inputField.value.style.height = "auto";
        }
      });
    };
    const handleSend = () => {
      sendMessage(inputText.value);
    };
    const isPinning = ref(false);
    const showPinToast = ref(false);
    const pinToastMessage = ref("");
    let pinToastTimer = null;
    const togglePin = async () => {
      if (isPinning.value || !chatStore.hasMessages) return;
      isPinning.value = true;
      const result = await chatStore.togglePinCurrentChat();
      isPinning.value = false;
      if (result === null) {
        return;
      }
      pinToastMessage.value = result ? __("Chat Pinned", "google-analytics-for-wordpress") : __("Chat Unpinned", "google-analytics-for-wordpress");
      showPinToast.value = true;
      clearTimeout(pinToastTimer);
      pinToastTimer = setTimeout(() => {
        showPinToast.value = false;
      }, 3e3);
    };
    const defaultSuggestions = [
      "How many users visited today?",
      "What's my bounce rate?",
      "How's my traffic doing this month?",
      "What are my top performing pages?",
      "Why are users dropping off my checkout?",
      "Compare my traffic this month vs last month"
    ];
    const suggestions = computed(
      () => chatStore.suggestedQuestions.length > 0 ? chatStore.suggestedQuestions : defaultSuggestions
    );
    watch(
      () => chatStore.messages.length,
      () => {
        if (chatStore.isSending) return;
        scrollToBottom();
      }
    );
    watch(
      () => chatStore.isSending,
      (now, prev) => {
        if (!now || prev) return;
        const messages = chatStore.messages;
        if (!messages.length) return;
        const last = messages[messages.length - 1];
        const previous = messages[messages.length - 2];
        const target = previous && previous.type === "user" ? previous : last;
        if (!scrollMessageToTop(target.id)) {
          scrollToBottom();
        }
      },
      { flush: "post" }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["monsterinsights-ai-charlie__popup", { "is-expanded": isExpanded.value }])
      }, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", {
              class: "monsterinsights-ai-charlie__popup-menu-wrapper",
              ref_key: "menuWrapper",
              ref: menuWrapper
            }, [
              createBaseVNode("button", {
                type: "button",
                class: "monsterinsights-ai-charlie__popup-header-btn",
                onClick: toggleMenu
              }, [..._cache[4] || (_cache[4] = [
                createBaseVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "20",
                  height: "20",
                  viewBox: "0 0 20 20",
                  fill: "none"
                }, [
                  createBaseVNode("path", {
                    d: "M3.33203 10H16.6654",
                    stroke: "#2F363B",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M3.33203 5H16.6654",
                    stroke: "#2F363B",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createBaseVNode("path", {
                    d: "M3.33203 15H16.6654",
                    stroke: "#2F363B",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  })
                ], -1)
              ])]),
              showMenu.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-ai-charlie__popup-menu-item",
                  onClick: handleNewChat
                }, [
                  _cache[5] || (_cache[5] = createBaseVNode("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none"
                  }, [
                    createBaseVNode("path", {
                      d: "M9.05078 3.94945H3.60634C3.19378 3.94945 2.79812 4.11334 2.50639 4.40506C2.21467 4.69678 2.05078 5.09244 2.05078 5.505V16.3939C2.05078 16.8065 2.21467 17.2021 2.50639 17.4938C2.79812 17.7856 3.19378 17.9494 3.60634 17.9494H14.4952C14.9078 17.9494 15.3034 17.7856 15.5952 17.4938C15.8869 17.2021 16.0508 16.8065 16.0508 16.3939V10.9494",
                      stroke: "#2F363B",
                      "stroke-width": "1.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createBaseVNode("path", {
                      d: "M15.2299 2.43343C15.5398 2.12354 15.9601 1.94945 16.3983 1.94945C16.8366 1.94945 17.2569 2.12354 17.5668 2.43343C17.8767 2.74332 18.0508 3.16363 18.0508 3.60188C18.0508 4.04013 17.8767 4.46043 17.5668 4.77033L10.1666 12.1705L7.05078 12.9494L7.82975 9.83359L15.2299 2.43343Z",
                      stroke: "#2F363B",
                      "stroke-width": "1.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(__)("New Chat", "google-analytics-for-wordpress")), 1)
                ]),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-ai-charlie__popup-menu-item",
                  onClick: handleOpenSaved
                }, [
                  _cache[6] || (_cache[6] = createBaseVNode("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none"
                  }, [
                    createBaseVNode("path", {
                      "fill-rule": "evenodd",
                      "clip-rule": "evenodd",
                      d: "M4 2.85311L4.85714 2H15.1429L16 2.85311V18L10 14.4612L4 18V2.85311ZM5.71429 3.70622V15.0057L10 12.4779L14.2857 15.0057V3.70622H5.71429Z",
                      fill: "#2F363B"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(__)("Pinned Conversations", "google-analytics-for-wordpress")), 1)
                ]),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-ai-charlie__popup-menu-item",
                  onClick: handleOpenHistory
                }, [
                  _cache[7] || (_cache[7] = createBaseVNode("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none"
                  }, [
                    createBaseVNode("path", {
                      d: "M10 6.66666V10.8333H14.1667V9.16666H11.6667V6.66666H10Z",
                      fill: "#2F363B"
                    }),
                    createBaseVNode("path", {
                      d: "M17.7446 7.08084C17.3687 6.18921 16.8231 5.37918 16.138 4.69584C15.1009 3.65881 13.7827 2.94842 12.3463 2.6525C11.3493 2.44957 10.3216 2.44957 9.32464 2.6525C7.88686 2.94653 6.56753 3.6575 5.5313 4.69667C4.84788 5.38074 4.30241 6.18988 3.92464 7.08C3.53389 8.00384 3.33324 8.99693 3.33464 10L3.33547 10.0208H1.66797L4.16797 13.3333L6.66797 10.0208H5.00214L5.0013 10C4.9989 8.83781 5.34585 7.70173 5.99714 6.73917C6.41723 6.11807 6.9521 5.58293 7.57297 5.1625C8.20459 4.737 8.91307 4.43867 9.6588 4.28417C11.1742 3.97259 12.7514 4.27553 14.0436 5.12639C15.3357 5.97726 16.2371 7.30641 16.5496 8.82167C16.7068 9.59824 16.7068 10.3984 16.5496 11.175C16.3972 11.9214 16.0987 12.6302 15.6713 13.2608C15.463 13.57 15.2238 13.8608 14.9596 14.1242C14.4273 14.6559 13.7978 15.0805 13.1055 15.375C12.7528 15.5241 12.3863 15.638 12.0113 15.715C11.235 15.8721 10.4351 15.8721 9.6588 15.715C8.91322 15.5621 8.20502 15.264 7.57464 14.8375C7.2646 14.628 6.97523 14.3894 6.71047 14.125L5.53214 15.3033C6.22807 16.0002 7.05466 16.553 7.96455 16.9299C8.87444 17.3069 9.84976 17.5006 10.8346 17.5C11.8372 17.4996 12.8296 17.2993 13.7538 16.9108C15.0935 16.344 16.2397 15.4002 17.053 14.1942C17.89 12.9558 18.3365 11.4948 18.3346 10C18.3367 8.99713 18.136 8.00418 17.7446 7.08084Z",
                      fill: "#2F363B"
                    })
                  ], -1)),
                  createBaseVNode("span", null, toDisplayString(unref(__)("History", "google-analytics-for-wordpress")), 1)
                ])
              ])) : createCommentVNode("", true)
            ], 512),
            !unref(chatStore).isListView ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: unref(headerLogo),
              alt: "",
              class: "monsterinsights-ai-charlie__popup-header-logo"
            }, null, 8, _hoisted_4)) : createCommentVNode("", true),
            unref(chatStore).isListView ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "monsterinsights-ai-charlie__popup-header-back",
              onClick: handleBackToChat
            }, [
              createVNode(Icon, {
                name: "arrow-left",
                size: 20
              }),
              createBaseVNode("span", _hoisted_5, toDisplayString(viewTitle.value), 1)
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_6, [
            !unref(chatStore).isListView && unref(chatStore).hasMessages ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "monsterinsights-ai-charlie__popup-save-btn",
              disabled: isPinning.value,
              onClick: togglePin
            }, [
              isPinning.value ? (openBlock(), createElementBlock("svg", _hoisted_8, [..._cache[8] || (_cache[8] = [
                createBaseVNode("circle", {
                  cx: "8",
                  cy: "8",
                  r: "6.5",
                  stroke: "#2f363b",
                  "stroke-opacity": "0.2",
                  "stroke-width": "3"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M14.5 8A6.5 6.5 0 0 0 8 1.5",
                  stroke: "#2f363b",
                  "stroke-width": "3",
                  "stroke-linecap": "round"
                }, null, -1)
              ])])) : unref(chatStore).isCurrentChatPinned ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString(unref(__)("Unpin", "google-analytics-for-wordpress")), 1)) : (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(unref(__)("Pin", "google-analytics-for-wordpress")), 1))
            ], 8, _hoisted_7)) : createCommentVNode("", true),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-ai-charlie__popup-header-btn",
              onClick: _cache[0] || (_cache[0] = ($event) => isExpanded.value = !isExpanded.value)
            }, [
              !isExpanded.value ? (openBlock(), createElementBlock("svg", _hoisted_11, [..._cache[9] || (_cache[9] = [
                createBaseVNode("path", {
                  d: "M3 3L8 3L8 5L5 5L5 8L3 8L3 3Z",
                  fill: "#2F363B"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M17 3L12 3L12 5L15 5L15 8L17 8L17 3Z",
                  fill: "#2F363B"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M3 17L8 17L8 15L5 15L5 12L3 12L3 17Z",
                  fill: "#2F363B"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M17 17L12 17L12 15L15 15L15 12L17 12L17 17Z",
                  fill: "#2F363B"
                }, null, -1)
              ])])) : (openBlock(), createElementBlock("svg", _hoisted_12, [..._cache[10] || (_cache[10] = [
                createBaseVNode("path", {
                  d: "M8 8L3 8L3 6L6 6L6 3L8 3L8 8Z",
                  fill: "#2F363B"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M12 8L17 8L17 6L14 6L14 3L12 3L12 8Z",
                  fill: "#2F363B"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M8 12L3 12L3 14L6 14L6 17L8 17L8 12Z",
                  fill: "#2F363B"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M12 12L17 12L17 14L14 14L14 17L12 17L12 12Z",
                  fill: "#2F363B"
                }, null, -1)
              ])]))
            ]),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-ai-charlie__popup-header-btn",
              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("close"))
            }, [..._cache[11] || (_cache[11] = [
              createBaseVNode("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 20 20",
                fill: "none"
              }, [
                createBaseVNode("path", {
                  d: "M15 5L5 15",
                  stroke: "#2F363B",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }),
                createBaseVNode("path", {
                  d: "M5 5L15 15",
                  stroke: "#2F363B",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ])])
          ])
        ]),
        createVNode(Transition, { name: "monsterinsights-ai-charlie-toast" }, {
          default: withCtx(() => [
            showPinToast.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
              createBaseVNode("span", null, toDisplayString(pinToastMessage.value), 1),
              _cache[12] || (_cache[12] = createBaseVNode("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none"
              }, [
                createBaseVNode("path", {
                  d: "M13.3337 4L6.00033 11.3333L2.66699 8",
                  stroke: "white",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1))
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createBaseVNode("div", {
          ref_key: "chatBody",
          ref: chatBody,
          class: "monsterinsights-ai-charlie__popup-body"
        }, [
          !isAuthenticated.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("img", {
                src: unref(mascotImage),
                alt: "AI Charlie"
              }, null, 8, _hoisted_15)
            ]),
            createBaseVNode("div", _hoisted_16, [
              createBaseVNode("h3", _hoisted_17, toDisplayString(unref(__)("Connect MonsterInsights to use AI Charlie", "google-analytics-for-wordpress")), 1),
              createBaseVNode("p", _hoisted_18, toDisplayString(unref(__)("AI Charlie requires an active MonsterInsights connection. Please connect your site to get started.", "google-analytics-for-wordpress")), 1),
              unref(wizardUrl) ? (openBlock(), createElementBlock("a", {
                key: 0,
                href: unref(wizardUrl),
                class: "monsterinsights-ai-charlie__not-connected-btn"
              }, toDisplayString(unref(__)("Connect MonsterInsights", "google-analytics-for-wordpress")), 9, _hoisted_19)) : unref(settingsUrl) ? (openBlock(), createElementBlock("a", {
                key: 1,
                href: unref(settingsUrl),
                class: "monsterinsights-ai-charlie__not-connected-btn"
              }, toDisplayString(unref(__)("Go to Settings", "google-analytics-for-wordpress")), 9, _hoisted_20)) : createCommentVNode("", true)
            ])
          ], 64)) : unref(chatStore).activeView === "saved" ? (openBlock(), createBlock(_sfc_main$3, {
            key: 1,
            items: unref(chatStore).savedConversations,
            "is-loading": unref(chatStore).isLoadingChats,
            "pinning-ids": unref(chatStore).pinningIds,
            onSelect: handleConversationSelect,
            onDelete: handleDeleteChat,
            onPin: handleTogglePin
          }, null, 8, ["items", "is-loading", "pinning-ids"])) : unref(chatStore).activeView === "history" ? (openBlock(), createBlock(_sfc_main$3, {
            key: 2,
            items: unref(chatStore).historyConversations,
            "has-more": unref(chatStore).hasMoreChats,
            "is-loading": unref(chatStore).isLoadingChats,
            "pinning-ids": unref(chatStore).pinningIds,
            onSelect: handleConversationSelect,
            onDelete: handleDeleteChat,
            onPin: handleTogglePin,
            onLoadMore: unref(chatStore).loadMoreChats
          }, null, 8, ["items", "has-more", "is-loading", "pinning-ids", "onLoadMore"])) : !unref(chatStore).hasMessages ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("img", {
                src: unref(mascotImage),
                alt: "AI Charlie"
              }, null, 8, _hoisted_22)
            ]),
            createBaseVNode("h3", _hoisted_23, [
              createTextVNode(toDisplayString(unref(__)("Website Insights", "google-analytics-for-wordpress")), 1),
              _cache[13] || (_cache[13] = createBaseVNode("br", null, null, -1)),
              createTextVNode(toDisplayString(unref(__)("Start Here", "google-analytics-for-wordpress")), 1)
            ]),
            createBaseVNode("div", _hoisted_24, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(suggestions.value, (suggestion, index) => {
                return openBlock(), createElementBlock("button", {
                  key: index,
                  type: "button",
                  class: "monsterinsights-ai-charlie__popup-suggestion",
                  onClick: ($event) => sendMessage(suggestion, { is_insight: true })
                }, [
                  _cache[14] || (_cache[14] = createBaseVNode("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    fill: "none"
                  }, [
                    createBaseVNode("path", {
                      d: "M3.28596 7.99999H12.714",
                      stroke: "#2F363B",
                      "stroke-width": "1.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createBaseVNode("path", {
                      d: "M8 3.28595L12.714 7.99999L8 12.714",
                      stroke: "#2F363B",
                      "stroke-width": "1.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ], -1)),
                  createBaseVNode("span", _hoisted_26, toDisplayString(suggestion), 1)
                ], 8, _hoisted_25);
              }), 128))
            ])
          ], 64)) : (openBlock(), createElementBlock("div", _hoisted_27, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(chatStore).messages, (message) => {
              return openBlock(), createElementBlock(Fragment, {
                key: message.id
              }, [
                message.type === "user" ? (openBlock(), createBlock(_sfc_main$5, {
                  key: 0,
                  message
                }, null, 8, ["message"])) : message.type === "ai" ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 1,
                  message,
                  "is-last": message.id === lastAiMessageId.value,
                  "is-busy": unref(chatStore).isSending,
                  onFeedback: unref(chatStore).setFeedback,
                  onFeedbackComment: unref(chatStore).submitFeedbackComment,
                  onRegenerate: unref(chatStore).regenerateMessage,
                  onInsightAction: _cache[2] || (_cache[2] = (insight) => sendMessage(insight.label))
                }, null, 8, ["message", "is-last", "is-busy", "onFeedback", "onFeedbackComment", "onRegenerate"])) : createCommentVNode("", true)
              ], 64);
            }), 128)),
            unref(chatStore).isSending ? (openBlock(), createElementBlock("div", _hoisted_28, [
              _cache[15] || (_cache[15] = createBaseVNode("span", null, null, -1)),
              _cache[16] || (_cache[16] = createBaseVNode("span", null, null, -1)),
              _cache[17] || (_cache[17] = createBaseVNode("span", null, null, -1)),
              unref(chatStore).statusText ? (openBlock(), createElementBlock("span", _hoisted_29, toDisplayString(unref(chatStore).statusText), 1)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            unref(chatStore).isSending ? (openBlock(), createElementBlock("div", _hoisted_30)) : createCommentVNode("", true)
          ]))
        ], 512),
        unref(chatStore).outOfCredits.active ? (openBlock(), createBlock(_sfc_main$2, {
          key: 0,
          plan: unref(chatStore).outOfCredits.plan,
          onDismiss: unref(chatStore).dismissOutOfCredits
        }, null, 8, ["plan", "onDismiss"])) : createCommentVNode("", true),
        showJumpToLatest.value && !unref(chatStore).isListView && unref(chatStore).hasMessages ? (openBlock(), createElementBlock("button", {
          key: 1,
          type: "button",
          class: "monsterinsights-ai-charlie__jump-to-latest",
          onClick: scrollToBottom
        }, [
          createBaseVNode("span", null, toDisplayString(unref(__)("Jump To Latest", "google-analytics-for-wordpress")), 1),
          _cache[18] || (_cache[18] = createBaseVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            "aria-hidden": "true"
          }, [
            createBaseVNode("path", {
              d: "M7 2v9M3 7l4 4 4-4",
              stroke: "currentColor",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          ], -1))
        ])) : createCommentVNode("", true),
        !unref(chatStore).isListView && isAuthenticated.value ? (openBlock(), createElementBlock("div", _hoisted_31, [
          createBaseVNode("div", {
            class: normalizeClass(["monsterinsights-ai-charlie__popup-input", { "is-disabled": unref(chatStore).outOfCredits.active }])
          }, [
            withDirectives(createBaseVNode("textarea", {
              ref_key: "inputField",
              ref: inputField,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => inputText.value = $event),
              class: "monsterinsights-ai-charlie__popup-input-field",
              placeholder: unref(__)("Ask Charlie AI", "google-analytics-for-wordpress"),
              rows: "1",
              disabled: unref(chatStore).outOfCredits.active,
              onInput: autoResize,
              onKeydown: withKeys(withModifiers(handleSend, ["exact", "prevent"]), ["enter"])
            }, null, 40, _hoisted_32), [
              [vModelText, inputText.value]
            ]),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-ai-charlie__popup-input-send",
              disabled: unref(chatStore).outOfCredits.active,
              onClick: handleSend
            }, [
              !inputText.value.trim() ? (openBlock(), createElementBlock("svg", _hoisted_34, [..._cache[19] || (_cache[19] = [
                createBaseVNode("path", {
                  d: "M16.0013 29.3334C23.3651 29.3334 29.3346 23.3638 29.3346 16C29.3346 8.63622 23.3651 2.66669 16.0013 2.66669C8.63751 2.66669 2.66797 8.63622 2.66797 16C2.66797 23.3638 8.63751 29.3334 16.0013 29.3334Z",
                  fill: "#F2F6FF"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M21.3346 16L16.0013 10.6667L10.668 16",
                  stroke: "#B6BDC2",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M16 21.3334V10.6667",
                  stroke: "#B6BDC2",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])])) : (openBlock(), createElementBlock("svg", _hoisted_35, [..._cache[20] || (_cache[20] = [
                createBaseVNode("path", {
                  d: "M16.3333 29.6667C23.6971 29.6667 29.6667 23.6971 29.6667 16.3333C29.6667 8.96954 23.6971 3 16.3333 3C8.96954 3 3 8.96954 3 16.3333C3 23.6971 8.96954 29.6667 16.3333 29.6667Z",
                  fill: "#393F4C"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M21.3346 16L16.0013 10.6667L10.668 16",
                  stroke: "white",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1),
                createBaseVNode("path", {
                  d: "M16 21.3334V10.6667",
                  stroke: "white",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])]))
            ], 8, _hoisted_33)
          ], 2)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const _hoisted_1 = { class: "monsterinsights-ai-charlie" };
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const chatStore = useChatStore();
    const isOpen = ref(false);
    function openChat() {
      isOpen.value = true;
      chatStore.warmup();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        !isOpen.value ? (openBlock(), createBlock(_sfc_main$6, {
          key: 0,
          onToggle: openChat
        })) : createCommentVNode("", true),
        isOpen.value ? (openBlock(), createBlock(_sfc_main$1, {
          key: 1,
          onClose: _cache[0] || (_cache[0] = ($event) => isOpen.value = false)
        })) : createCommentVNode("", true)
      ]);
    };
  }
};
function initAiCharlie() {
  let mountEl = document.getElementById("monsterinsights-ai-charlie");
  if (!mountEl) {
    mountEl = document.createElement("div");
    mountEl.id = "monsterinsights-ai-charlie";
    document.body.appendChild(mountEl);
  }
  const app = createApp(_sfc_main);
  app.use(createPinia());
  app.config.errorHandler = (err, _vm, info) => {
    console.error("[AI Charlie] Error:", err, info);
  };
  app.mount(mountEl);
  return app;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAiCharlie);
} else {
  initAiCharlie();
}
