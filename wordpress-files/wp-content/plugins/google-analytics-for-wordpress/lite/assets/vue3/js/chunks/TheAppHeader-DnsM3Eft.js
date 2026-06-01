import { u as unref, Z as shallowReactive, a7 as shallowRef, L as defineComponent, s as nextTick, W as inject, X as reactive, a8 as h, m as computed, B as watch, j as ref, a1 as provide, G as createPinia, o as openBlock, c as createElementBlock, a as createBaseVNode, i as normalizeClass, a9 as isPro, k as getMiGlobal, p as getUrl, aa as logoStandard, ab as logoStandard2x, l as defineStore, x as onMounted, ac as onUpdated, t as toDisplayString, q as createCommentVNode, F as Fragment, f as renderList, A as withModifiers, ad as storeToRefs, D as createBlock, a6 as _export_sfc, b as createVNode, Q as renderSlot } from "./_plugin-vue_export-helper-Cga6DwZW.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (!!importerUrl) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
        const link$1 = links[i$1];
        if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
      }
      else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const isBrowser = typeof document !== "undefined";
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module" || obj.default && isRouteComponent(obj.default);
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  return options;
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return text == null ? "" : encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  if (text == null) return null;
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery$1, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  searchPos = hashPos >= 0 && searchPos > hashPos ? -1 : searchPos;
  if (searchPos >= 0) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos, hashPos > 0 ? hashPos : location2.length);
    query = parseQuery$1(searchString.slice(1));
  }
  if (hashPos >= 0) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
function stringifyURL(stringifyQuery$1, location2) {
  const query = location2.query ? stringifyQuery$1(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base) {
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || "/";
}
function isSameRouteLocation(stringifyQuery$1, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery$1(a.query) === stringifyQuery$1(b.query) && a.hash === b.hash;
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (var key in a) if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a?.valueOf() === b?.valueOf();
}
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/")) return to;
  if (!to) return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") toSegments.push("");
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".") continue;
    if (segment === "..") {
      if (position > 1) position--;
    } else break;
  }
  return fromSegments.slice(0, position).join("/") + "/" + toSegments.slice(toPosition).join("/");
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
let NavigationType = /* @__PURE__ */ (function(NavigationType$1) {
  NavigationType$1["pop"] = "pop";
  NavigationType$1["push"] = "push";
  return NavigationType$1;
})({});
let NavigationDirection = /* @__PURE__ */ (function(NavigationDirection$1) {
  NavigationDirection$1["back"] = "back";
  NavigationDirection$1["forward"] = "forward";
  NavigationDirection$1["unknown"] = "";
  return NavigationDirection$1;
})({});
function normalizeBase(base) {
  if (!base) if (isBrowser) {
    const baseEl = document.querySelector("base");
    base = baseEl && baseEl.getAttribute("href") || "/";
    base = base.replace(/^\w+:\/\/[^\/]+/, "");
  } else base = "/";
  if (base[0] !== "/" && base[0] !== "#") base = "/" + base;
  return removeTrailingSlash(base);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location2) {
  return base.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ("el" in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else scrollToOptions = position;
  if ("scrollBehavior" in document.documentElement.style) window.scrollTo(scrollToOptions);
  else window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
}
function getScrollKey(path, delta) {
  return (history.state ? history.state.position - delta : -1) + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
function isRouteLocation(route) {
  return typeof route === "string" || route && typeof route === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
let ErrorTypes = /* @__PURE__ */ (function(ErrorTypes$1) {
  ErrorTypes$1[ErrorTypes$1["MATCHER_NOT_FOUND"] = 1] = "MATCHER_NOT_FOUND";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_GUARD_REDIRECT"] = 2] = "NAVIGATION_GUARD_REDIRECT";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_ABORTED"] = 4] = "NAVIGATION_ABORTED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_CANCELLED"] = 8] = "NAVIGATION_CANCELLED";
  ErrorTypes$1[ErrorTypes$1["NAVIGATION_DUPLICATED"] = 16] = "NAVIGATION_DUPLICATED";
  return ErrorTypes$1;
})({});
const NavigationFailureSymbol = /* @__PURE__ */ Symbol("");
({
  [ErrorTypes.MATCHER_NOT_FOUND]({ location: location2, currentLocation }) {
    return `No match for
 ${JSON.stringify(location2)}${currentLocation ? "\nwhile being at\n" + JSON.stringify(currentLocation) : ""}`;
  },
  [ErrorTypes.NAVIGATION_GUARD_REDIRECT]({ from, to }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_ABORTED]({ from, to }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [ErrorTypes.NAVIGATION_CANCELLED]({ from, to }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [ErrorTypes.NAVIGATION_DUPLICATED]({ from, to }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
});
function createRouterError(type, params) {
  return assign(/* @__PURE__ */ new Error(), {
    type,
    [NavigationFailureSymbol]: true
  }, params);
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = [
  "params",
  "query",
  "hash"
];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if (to.path != null) return to.path;
  const location2 = {};
  for (const key of propertiesToLog) if (key in to) location2[key] = to[key];
  return JSON.stringify(location2, null, 2);
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?") return query;
  const searchParams = (search[0] === "?" ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) currentValue = query[key] = [currentValue];
      currentValue.push(value);
    } else query[key] = value;
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) search += (search.length ? "&" : "") + key;
      continue;
    }
    (isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)]).forEach((value$1) => {
      if (value$1 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value$1 != null) search += "=" + value$1;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
  }
  return normalizedQuery;
}
const matchedRouteKey = /* @__PURE__ */ Symbol("");
const viewDepthKey = /* @__PURE__ */ Symbol("");
const routerKey = /* @__PURE__ */ Symbol("");
const routeLocationKey = /* @__PURE__ */ Symbol("");
const routerViewLocationKey = /* @__PURE__ */ Symbol("");
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = (fn) => fn()) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = (valid) => {
      if (valid === false) reject(createRouterError(ErrorTypes.NAVIGATION_ABORTED, {
        from,
        to
      }));
      else if (valid instanceof Error) reject(valid);
      else if (isRouteLocation(valid)) reject(createRouterError(ErrorTypes.NAVIGATION_GUARD_REDIRECT, {
        from: to,
        to: valid
      }));
      else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") enterCallbackArray.push(valid);
        resolve();
      }
    };
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from, next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = (fn) => fn()) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        const guard = (rawComponent.__vccOpts || rawComponent)[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.mods[name] = resolved;
          record.components[name] = resolvedComponent;
          const guard = (resolvedComponent.__vccOpts || resolvedComponent)[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) if (to.matched.find((record) => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);
    else leavingRecords.push(recordFrom);
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord(record, recordTo))) enteringRecords.push(recordTo);
    }
  }
  return [
    leavingRecords,
    updatingRecords,
    enteringRecords
  ];
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base, location$1) {
  const { pathname, search, hash } = location$1;
  const hashPos = base.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/") pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  return stripBase(pathname, base) + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else replace(to);
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    if (document.visibilityState === "hidden") {
      const { history: history$1 } = window;
      if (!history$1.state) return;
      history$1.replaceState(assign({}, history$1.state, { scroll: computeScrollPosition() }), "");
    }
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("pagehide", beforeUnloadListener);
    document.removeEventListener("visibilitychange", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("pagehide", beforeUnloadListener);
  document.addEventListener("visibilitychange", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const { history: history$1, location: location$1 } = window;
  const currentLocation = { value: createCurrentLocation(base, location$1) };
  const historyState = { value: history$1.state };
  if (!historyState.value) changeLocation(currentLocation.value, {
    back: null,
    current: currentLocation.value,
    forward: null,
    position: history$1.length - 1,
    replaced: true,
    scroll: null
  }, true);
  function changeLocation(to, state, replace$1) {
    const hashIndex = base.indexOf("#");
    const url = hashIndex > -1 ? (location$1.host && document.querySelector("base") ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      history$1[replace$1 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      console.error(err);
      location$1[replace$1 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    changeLocation(to, assign({}, history$1.state, buildState(historyState.value.back, to, historyState.value.forward, true), data, { position: historyState.value.position }), true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history$1.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    changeLocation(currentState.current, currentState, true);
    changeLocation(to, assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data), false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base) {
  base = location.host ? base || location.pathname + location.search : "";
  if (!base.includes("#")) base += "#";
  return createWebHistory(base);
}
let TokenType = /* @__PURE__ */ (function(TokenType$1) {
  TokenType$1[TokenType$1["Static"] = 0] = "Static";
  TokenType$1[TokenType$1["Param"] = 1] = "Param";
  TokenType$1[TokenType$1["Group"] = 2] = "Group";
  return TokenType$1;
})({});
var TokenizerState = /* @__PURE__ */ (function(TokenizerState$1) {
  TokenizerState$1[TokenizerState$1["Static"] = 0] = "Static";
  TokenizerState$1[TokenizerState$1["Param"] = 1] = "Param";
  TokenizerState$1[TokenizerState$1["ParamRegExp"] = 2] = "ParamRegExp";
  TokenizerState$1[TokenizerState$1["ParamRegExpEnd"] = 3] = "ParamRegExpEnd";
  TokenizerState$1[TokenizerState$1["EscapeNext"] = 4] = "EscapeNext";
  return TokenizerState$1;
})(TokenizerState || {});
const ROOT_TOKEN = {
  type: TokenType.Static,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) throw new Error(`Invalid path "${path}"`);
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = TokenizerState.Static;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === TokenizerState.Static) segment.push({
      type: TokenType.Static,
      value: buffer
    });
    else if (state === TokenizerState.Param || state === TokenizerState.ParamRegExp || state === TokenizerState.ParamRegExpEnd) {
      if (segment.length > 1 && (char === "*" || char === "+")) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: TokenType.Param,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else crash("Invalid state to consume buffer");
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== TokenizerState.ParamRegExp) {
      previousState = state;
      state = TokenizerState.EscapeNext;
      continue;
    }
    switch (state) {
      case TokenizerState.Static:
        if (char === "/") {
          if (buffer) consumeBuffer();
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = TokenizerState.Param;
        } else addCharToBuffer();
        break;
      case TokenizerState.EscapeNext:
        addCharToBuffer();
        state = previousState;
        break;
      case TokenizerState.Param:
        if (char === "(") state = TokenizerState.ParamRegExp;
        else if (VALID_PARAM_RE.test(char)) addCharToBuffer();
        else {
          consumeBuffer();
          state = TokenizerState.Static;
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case TokenizerState.ParamRegExp:
        if (char === ")") if (customRe[customRe.length - 1] == "\\") customRe = customRe.slice(0, -1) + char;
        else state = TokenizerState.ParamRegExpEnd;
        else customRe += char;
        break;
      case TokenizerState.ParamRegExpEnd:
        consumeBuffer();
        state = TokenizerState.Static;
        if (char !== "*" && char !== "?" && char !== "+") i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === TokenizerState.ParamRegExp) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
var PathScore = /* @__PURE__ */ (function(PathScore$1) {
  PathScore$1[PathScore$1["_multiplier"] = 10] = "_multiplier";
  PathScore$1[PathScore$1["Root"] = 90] = "Root";
  PathScore$1[PathScore$1["Segment"] = 40] = "Segment";
  PathScore$1[PathScore$1["SubSegment"] = 30] = "SubSegment";
  PathScore$1[PathScore$1["Static"] = 40] = "Static";
  PathScore$1[PathScore$1["Dynamic"] = 20] = "Dynamic";
  PathScore$1[PathScore$1["BonusCustomRegExp"] = 10] = "BonusCustomRegExp";
  PathScore$1[PathScore$1["BonusWildcard"] = -50] = "BonusWildcard";
  PathScore$1[PathScore$1["BonusRepeatable"] = -20] = "BonusRepeatable";
  PathScore$1[PathScore$1["BonusOptional"] = -8] = "BonusOptional";
  PathScore$1[PathScore$1["BonusStrict"] = 0.7000000000000001] = "BonusStrict";
  PathScore$1[PathScore$1["BonusCaseSensitive"] = 0.25] = "BonusCaseSensitive";
  return PathScore$1;
})(PathScore || {});
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [PathScore.Root];
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = PathScore.Segment + (options.sensitive ? PathScore.BonusCaseSensitive : 0);
      if (token.type === TokenType.Static) {
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += PathScore.Static;
      } else if (token.type === TokenType.Param) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re$1 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re$1 !== BASE_PARAM_PATTERN) {
          subSegmentScore += PathScore.BonusCustomRegExp;
          try {
            `${re$1}`;
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re$1}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re$1})(?:/(?:${re$1}))*)` : `(${re$1})`;
        if (!tokenIndex) subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += PathScore.Dynamic;
        if (optional) subSegmentScore += PathScore.BonusOptional;
        if (repeatable) subSegmentScore += PathScore.BonusRepeatable;
        if (re$1 === ".*") subSegmentScore += PathScore.BonusWildcard;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += PathScore.BonusStrict;
  }
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  else if (options.strict && !pattern.endsWith("/")) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/")) path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) if (token.type === TokenType.Static) path += token.value;
      else if (token.type === TokenType.Param) {
        const { value, repeatable, optional } = token;
        const param = value in params ? params[value] : "";
        if (isArray(param) && !repeatable) throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
        const text = isArray(param) ? param.join("/") : param;
        if (!text) if (optional) {
          if (segment.length < 2) if (path.endsWith("/")) path = path.slice(0, -1);
          else avoidDuplicatedSlash = true;
        } else throw new Error(`Missing required param "${value}"`);
        path += text;
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff) return diff;
    i++;
  }
  if (a.length < b.length) return a.length === 1 && a[0] === PathScore.Static + PathScore.Segment ? -1 : 1;
  else if (a.length > b.length) return b.length === 1 && b[0] === PathScore.Static + PathScore.Segment ? 1 : -1;
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const PATH_PARSER_OPTIONS_DEFAULTS = {
  strict: false,
  end: true,
  sensitive: false
};
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions(PATH_PARSER_OPTIONS_DEFAULTS, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) normalizedRecords.push(normalizeRouteRecord(assign({}, mainNormalizedRecord, {
        components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
        path: alias,
        aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
      })));
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          removeRoute(record.name);
        }
      }
      if (isMatchable(matcher)) insertMatcher(matcher);
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
      }
      originalRecord = originalRecord || matcher;
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location$1, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location$1 && location$1.name) {
      matcher = matcherMap.get(location$1.name);
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, { location: location$1 });
      name = matcher.record.name;
      params = assign(pickParams(currentLocation.params, matcher.keys.filter((k) => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter((k) => k.optional) : []).map((k) => k.name)), location$1.params && pickParams(location$1.params, matcher.keys.map((k) => k.name)));
      path = matcher.stringify(params);
    } else if (location$1.path != null) {
      path = location$1.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(ErrorTypes.MATCHER_NOT_FOUND, {
        location: location$1,
        currentLocation
      });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location$1.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes.forEach((route) => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function pickParams(params, keys) {
  const newParams = {};
  for (const key of keys) if (key in params) newParams[key] = params[key];
  return newParams;
}
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
  Object.defineProperty(normalized, "mods", { value: {} });
  return normalized;
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props = record.props || false;
  if ("component" in record) propsObject.default = props;
  else for (const name in record.components) propsObject[name] = typeof props === "object" ? props[name] : props;
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function findInsertionIndex(matcher, matchers) {
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    if (comparePathParserScore(matcher, matchers[mid]) < 0) upper = mid;
    else lower = mid + 1;
  }
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) return ancestor;
}
function isMatchable({ record }) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}
function useLink(props) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route = computed(() => {
    const to = unref(props.to);
    return router.resolve(to);
  });
  const activeRecordIndex = computed(() => {
    const { matched } = route.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[unref(props.replace) ? "replace" : "push"](unref(props.to)).catch(noop);
      if (props.viewTransition && typeof document !== "undefined" && "startViewTransition" in document) document.startViewTransition(() => p);
      return p;
    }
    return Promise.resolve();
  }
  return {
    route,
    href: computed(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    viewTransition: Boolean
  },
  useLink,
  setup(props, { slots }) {
    const link = reactive(useLink(props));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  if (e.defaultPrevented) return;
  if (e.button !== void 0 && e.button !== 0) return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) return false;
    } else if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value.valueOf() !== outerValue[i].valueOf())) return false;
  }
  return true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) initialDepth++;
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [
      viewRef.value,
      matchedRouteRef.value,
      props.name
    ], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) to.leaveGuards = from.leaveGuards;
          if (!to.updateGuards.size) to.updateGuards = from.updateGuards;
        }
      }
      if (instance && to && (!from || !isSameRouteRecord(to, from) || !oldInstance)) (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
    }, { flush: "post" });
    return () => {
      const route = routeToDisplay.value;
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) return normalizeSlot(slots.default, {
        Component: ViewComponent,
        route
      });
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === "function" ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) matchedRoute.instances[currentName] = null;
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, {
        Component: component,
        route
      }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) history.scrollRestoration = "manual";
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else record = parentOrRoute;
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) matcher.removeRoute(recordMatcher);
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute$1 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href$1 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute$1, {
        params: decodeParams(matchedRoute$1.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href$1
      });
    }
    let matcherLocation;
    if (rawLocation.path != null) {
      matcherLocation = assign({}, rawLocation, { path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) if (targetParams[key] == null) delete targetParams[key];
      matcherLocation = assign({}, rawLocation, { params: encodeParams(targetParams) });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) return createRouterError(ErrorTypes.NAVIGATION_CANCELLED, {
      from,
      to
    });
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to, from) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to, from) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace$1 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation, from);
    if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
      force,
      replace: replace$1
    }), redirectedFrom || targetLocation);
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(ErrorTypes.NAVIGATION_DUPLICATED, {
        to: toLocation,
        from
      });
      handleScroll(from, from, true, false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure$1) => {
      if (failure$1) {
        if (isNavigationFailure(failure$1, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          return pushWithRedirect(assign({ replace: replace$1 }, locationAsObject(failure$1.to), {
            state: typeof failure$1.to === "object" ? assign({}, data, failure$1.to.state) : data,
            force
          }), redirectedFrom || toLocation);
        }
      } else failure$1 = finalizeNavigation(toLocation, from, true, replace$1, data);
      triggerAfterEach(toLocation, from, failure$1);
      return failure$1;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    return app && typeof app.runWithContext === "function" ? app.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) record.updateGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of enteringRecords) if (record.beforeEnter) if (isArray(record.beforeEnter)) for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
      else guards.push(guardToPromiseFn(record.beforeEnter, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) guards.push(guardToPromiseFn(guard, to, from));
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, ErrorTypes.NAVIGATION_CANCELLED) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    afterGuards.list().forEach((guard) => runWithContext(() => guard(to, from, failure)));
  }
  function finalizeNavigation(toLocation, from, isPush, replace$1, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) if (replace$1 || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({ scroll: isFirstNavigation && state && state.scroll }, data));
    else routerHistory.push(toLocation.fullPath, data);
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      const toLocation = resolve(to);
      const shouldRedirect = handleRedirectRecord(toLocation, router.currentRoute.value);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_CANCELLED)) return error;
        if (isNavigationFailure(error, ErrorTypes.NAVIGATION_GUARD_REDIRECT)) {
          pushWithRedirect(assign(locationAsObject(error.to), { force: true }), toLocation).then((failure) => {
            if (isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED) && !info.delta && info.type === NavigationType.pop) routerHistory.go(-1, false);
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) routerHistory.go(-info.delta, false);
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(toLocation, from, false);
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, ErrorTypes.NAVIGATION_CANCELLED)) routerHistory.go(-info.delta, false);
          else if (info.type === NavigationType.pop && isNavigationFailure(failure, ErrorTypes.NAVIGATION_ABORTED | ErrorTypes.NAVIGATION_DUPLICATED)) routerHistory.go(-1, false);
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) list.forEach((handler) => handler(error, to, from));
    else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve$1, reject) => {
      readyHandlers.add([resolve$1, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve$1, reject]) => err ? reject(err) : resolve$1());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position) => position && scrollToPosition(position)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      app.component("RouterLink", RouterLink);
      app.component("RouterView", RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) Object.defineProperty(reactiveRoute, key, {
        get: () => currentRoute.value[key],
        enumerable: true
      });
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function() {
        installedApps.delete(app);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function useRouter() {
  return inject(routerKey);
}
function useRoute(_name) {
  return inject(routeLocationKey);
}
function setupPinia(app) {
  const pinia = createPinia();
  app.use(pinia);
  return pinia;
}
const _hoisted_1$5 = ["href", "target"];
const _hoisted_2$5 = ["src", "srcset"];
const _sfc_main$5 = {
  __name: "HeaderLogo",
  setup(__props) {
    const isPremium = computed(() => isPro());
    const isProLicensed = computed(() => {
      {
        return false;
      }
    });
    const link = computed(() => {
      if (isProLicensed.value) {
        return getMiGlobal("custom_dashboard_url", "#");
      }
      return getUrl("logo", "header", "https://www.monsterinsights.com/lite/");
    });
    const linkTarget = computed(() => isProLicensed.value ? "_self" : "_blank");
    const logo = computed(() => {
      const license = getMiGlobal("license", {});
      if (license.type && isPro()) ;
      return logoStandard;
    });
    const logo2x = computed(() => {
      const license = getMiGlobal("license", {});
      if (license.type && isPro()) ;
      return logoStandard2x + " 2x";
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["monsterinsights-logo-area", isPremium.value ? "monsterinsights-logo-area-premium" : ""])
      }, [
        createBaseVNode("a", {
          href: link.value,
          target: linkTarget.value,
          rel: "noopener"
        }, [
          createBaseVNode("img", {
            src: logo.value,
            srcset: logo2x.value
          }, null, 8, _hoisted_2$5)
        ], 8, _hoisted_1$5)
      ], 2);
    };
  }
};
const { __ } = wp.i18n;
const fetchNotifications = () => new Promise((resolve, reject) => {
  const action = "monsterinsights_vue_get_notifications";
  const ajaxData = {
    nonce: getMiGlobal("nonce", "")
    // Use centralized helper
  };
  wp.ajax.post(action, ajaxData).done((response) => {
    resolve(response);
  }).fail((jqXHR, _textStatus, errorThrown) => {
    let message = errorThrown || __("An error occurred while fetching notifications.", "monsterinsights");
    if (jqXHR?.responseJSON?.message) {
      message = jqXHR.responseJSON.message;
    } else if (jqXHR?.responseText) {
      try {
        const parsedError = JSON.parse(jqXHR.responseText);
        if (parsedError?.message) {
          message = parsedError.message;
        }
      } catch (_e) {
      }
    }
    reject({
      title: __("Fetch Notifications Network Error", "monsterinsights"),
      message
    });
  });
});
const dismissNotification = (id) => new Promise((resolve, reject) => {
  const action = "monsterinsights_notification_dismiss";
  const ajaxData = {
    nonce: getMiGlobal("nonce", ""),
    // Use centralized helper
    id
  };
  wp.ajax.post(action, ajaxData).done((response) => {
    resolve(response);
  }).fail((jqXHR, _textStatus, errorThrown) => {
    let message = errorThrown || __(
      "An error occurred while dismissing the notification.",
      "monsterinsights"
    );
    if (jqXHR?.responseJSON?.message) {
      message = jqXHR.responseJSON.message;
    } else if (jqXHR?.responseText) {
      try {
        const parsedError = JSON.parse(jqXHR.responseText);
        if (parsedError?.message) {
          message = parsedError.message;
        }
      } catch (_e) {
      }
    }
    reject({
      title: __("Dismiss Notification Network Error", "monsterinsights"),
      message
    });
  });
});
const markReadNotification = (id) => new Promise((resolve) => {
  const action = "monsterinsights_notification_mark_read";
  const ajaxData = {
    nonce: getMiGlobal("nonce", ""),
    id
  };
  wp.ajax.post(action, ajaxData).done((response) => {
    resolve(response);
  }).fail(() => {
    resolve(false);
  });
});
const saveNotification = (id) => new Promise((resolve, reject) => {
  const action = "monsterinsights_notification_save";
  const ajaxData = {
    nonce: getMiGlobal("nonce", ""),
    id
  };
  wp.ajax.post(action, ajaxData).done((response) => {
    resolve(response);
  }).fail((jqXHR, _textStatus, errorThrown) => {
    let message = errorThrown || __("An error occurred while saving the notification.", "monsterinsights");
    if (jqXHR?.responseJSON?.message) {
      message = jqXHR.responseJSON.message;
    }
    reject({
      title: __("Save Notification Network Error", "monsterinsights"),
      message
    });
  });
});
const remindMeNotification = (id) => new Promise((resolve, reject) => {
  const action = "monsterinsights_notification_remind_me";
  const ajaxData = {
    nonce: getMiGlobal("nonce", ""),
    id
  };
  wp.ajax.post(action, ajaxData).done((response) => {
    resolve(response);
  }).fail((jqXHR, _textStatus, errorThrown) => {
    let message = errorThrown || __("An error occurred while snoozing the notification.", "monsterinsights");
    if (jqXHR?.responseJSON?.message) {
      message = jqXHR.responseJSON.message;
    }
    reject({
      title: __("Remind Me Network Error", "monsterinsights"),
      message
    });
  });
});
const api = {
  fetchNotifications,
  dismissNotification,
  markReadNotification,
  saveNotification,
  remindMeNotification
};
function useErrorHandling() {
  const state = reactive({
    actionError: null,
    // { title: '', message: '', support_url: '' }
    successMessage: null
    // { title: '', message: '' }
  });
  const hasError = computed(() => !!state.actionError);
  const hasSuccess = computed(() => !!state.successMessage);
  const setActionError = (errorDetails) => {
    state.actionError = errorDetails;
  };
  const clearActionError = () => {
    state.actionError = null;
  };
  const setSuccessMessage = (successDetails) => {
    state.successMessage = successDetails;
  };
  const clearSuccessMessage = () => {
    state.successMessage = null;
  };
  const clearAllMessages = () => {
    state.actionError = null;
    state.successMessage = null;
  };
  const getActionError = () => state.actionError;
  const getSuccessMessage = () => state.successMessage;
  return {
    // Getters
    hasError,
    hasSuccess,
    getActionError,
    getSuccessMessage,
    // Actions
    setActionError,
    clearActionError,
    setSuccessMessage,
    clearSuccessMessage,
    clearAllMessages
  };
}
const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    activeNotifications: [],
    dismissedNotifications: [],
    isLoading: false,
    error: null
  }),
  getters: {
    notifications: (state) => state.activeNotifications,
    hasNotifications: (state) => {
      return state.activeNotifications && state.activeNotifications.length > 0;
    },
    unreadCount: (state) => {
      return state.activeNotifications.filter((n) => n.read === false).length;
    },
    savedNotifications: (state) => {
      const savedActive = state.activeNotifications.filter((n) => n.saved === true);
      const savedDismissed = state.dismissedNotifications.filter((n) => n.saved === true);
      return savedActive.concat(savedDismissed);
    }
  },
  actions: {
    async fetchNotificationsAction() {
      const { setActionError } = useErrorHandling();
      this.isLoading = true;
      this.error = null;
      try {
        const data = await api.fetchNotifications();
        this.activeNotifications = data.notifications || [];
        this.dismissedNotifications = data.dismissed || [];
      } catch (errorDetails) {
        this.error = errorDetails;
        this.activeNotifications = [];
        this.dismissedNotifications = [];
        setActionError(errorDetails);
      } finally {
        this.isLoading = false;
      }
    },
    async dismissNotificationAction(notificationId) {
      const { setActionError } = useErrorHandling();
      try {
        if (notificationId === "all") {
          this.dismissedNotifications.unshift(...this.activeNotifications);
          this.activeNotifications = [];
          await api.dismissNotification("all");
        } else {
          const notificationToDismiss = this.activeNotifications.find(
            (n) => n.id === notificationId
          );
          if (notificationToDismiss) {
            this.activeNotifications = this.activeNotifications.filter(
              (n) => n.id !== notificationId
            );
            this.dismissedNotifications.unshift(notificationToDismiss);
          }
          await api.dismissNotification(notificationId);
        }
      } catch (errorDetails) {
        setActionError(errorDetails);
      }
    },
    async markReadAction(id) {
      const notification = this.activeNotifications.find((n) => n.id === id);
      if (notification) {
        notification.read = true;
      }
      return api.markReadNotification(id).catch(() => {
      });
    },
    async markAllReadAction() {
      this.activeNotifications.forEach((n) => {
        n.read = true;
      });
      api.markReadNotification("all").catch(() => {
      });
    },
    async saveNotificationAction(id) {
      let notification = this.activeNotifications.find((n) => n.id === id);
      if (!notification) {
        notification = this.dismissedNotifications.find((n) => n.id === id);
      }
      if (notification) {
        notification.saved = !notification.saved;
      }
      api.saveNotification(id).catch(() => {
        if (notification) {
          notification.saved = !notification.saved;
        }
      });
    },
    async remindMeAction(id) {
      const removedIndex = this.activeNotifications.findIndex((n) => n.id === id);
      const removed = removedIndex !== -1 ? this.activeNotifications[removedIndex] : null;
      this.activeNotifications = this.activeNotifications.filter((n) => n.id !== id);
      api.remindMeNotification(id).catch(() => {
        if (removed) {
          this.activeNotifications.splice(removedIndex, 0, removed);
        }
      });
    }
  }
});
const _hoisted_1$4 = ["innerHTML"];
const _hoisted_2$4 = { class: "monsterinsights-notificationsv3-notification-details" };
const _hoisted_3$3 = { class: "monsterinsights-notificationsv3-notification-title" };
const _hoisted_4$2 = ["innerHTML"];
const _hoisted_5$1 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  width: "15",
  height: "14",
  viewBox: "0 0 15 14",
  fill: "none"
};
const _hoisted_6$1 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none"
};
const _hoisted_7$1 = ["innerHTML"];
const _hoisted_8$1 = ["textContent"];
const _hoisted_9$1 = { class: "monsterinsights-notificationsv3-notification-actions" };
const _hoisted_10$1 = ["textContent"];
const _hoisted_11$1 = ["onClick", "textContent"];
const _hoisted_12$1 = ["innerHTML"];
const _sfc_main$4 = {
  __name: "NotificationItem",
  props: {
    notification: {
      type: Object,
      required: true
    },
    dismissable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close-sidebar"],
  setup(__props, { emit: __emit }) {
    const { __: __2 } = wp.i18n;
    const props = __props;
    const emit = __emit;
    const notificationsStore = useNotificationsStore();
    const text_remind_me = __2("Remind Me", "google-analytics-for-wordpress");
    const text_dismiss = __2("Dismiss", "google-analytics-for-wordpress");
    const text_read_more = __2("Read More", "google-analytics-for-wordpress");
    const text_install_activated = __2("Installed & Active", "google-analytics-for-wordpress");
    const text_install_processing = __2(
      "Installing & Activating",
      "google-analytics-for-wordpress"
    );
    const contentEl = ref(null);
    const isExpanded = ref(false);
    const isOverflowing = ref(false);
    const checkOverflow = () => {
      if (isExpanded.value) {
        return;
      }
      nextTick(() => {
        const el = contentEl.value;
        if (!el) {
          return;
        }
        isOverflowing.value = el.scrollHeight - el.clientHeight > 1;
      });
    };
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value;
    };
    onMounted(checkOverflow);
    onUpdated(checkOverflow);
    const installedAndActivated = ref(false);
    const processing = ref(false);
    const icon = computed(() => {
      const aiIconForMI = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_26_4726)"><circle cx="16" cy="16" r="16" fill="#D4E7F7"/><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1968 8.80096C19.4039 7.8549 20.7517 7.84925 20.9678 8.79417L20.9768 8.83831L20.9972 8.92657C21.2462 9.98353 22.1017 10.7904 23.1722 10.9771C24.159 11.1491 24.159 12.566 23.1722 12.738C22.6458 12.8296 22.1582 13.0747 21.7706 13.4426C21.3831 13.8104 21.1128 14.2846 20.9938 14.8055L20.9667 14.9209C20.7517 15.8658 19.405 15.8602 19.1968 14.9141L19.1753 14.8145C19.061 14.2916 18.7935 13.8145 18.4069 13.4442C18.0203 13.0739 17.5322 12.8273 17.0048 12.7357C16.0202 12.5648 16.0202 11.1503 17.0048 10.9794C17.5303 10.8882 18.0169 10.643 18.4029 10.2749C18.7889 9.90685 19.0569 9.43245 19.173 8.91186L19.1888 8.83717L19.1968 8.80096ZM20.0195 16.856C19.4803 16.8455 18.9649 16.6317 18.5766 16.2574C18.4913 16.3137 18.4169 16.385 18.3571 16.4679C17.8478 17.1423 17.2515 17.8315 16.577 18.5048C16.0655 19.0163 15.5472 19.4814 15.0357 19.8968C14.5242 19.4814 14.0059 19.0163 13.4944 18.5048C13.0043 18.0157 12.5397 17.5016 12.1025 16.9647C12.5178 16.452 12.984 15.9349 13.4944 15.4234C14.1317 14.7839 14.8123 14.1891 15.5314 13.6433C15.6065 13.5895 15.6722 13.5237 15.726 13.4486C15.5109 13.2525 15.3385 13.0141 15.2198 12.7483C15.101 12.4825 15.0383 12.195 15.0357 11.9039C13.9256 11.1265 12.8279 10.5505 11.8479 10.2506C10.7864 9.92582 9.54156 9.83868 8.72564 10.6535C8.19716 11.1831 8.05344 11.9028 8.09418 12.5875C8.13492 13.2732 8.36464 14.0269 8.71206 14.7919C9.06646 15.5531 9.48957 16.2804 9.97611 16.9647C9.48968 17.6483 9.06658 18.3748 8.71206 19.1352C8.36464 19.9002 8.13492 20.6538 8.09418 21.3396C8.05344 22.0243 8.19603 22.744 8.72564 23.2736C9.25525 23.8021 9.97498 23.9458 10.6596 23.9051C11.3443 23.8632 12.0991 23.6346 12.8641 23.2872C13.5544 22.9737 14.2888 22.5459 15.0368 22.0231C15.7837 22.5459 16.517 22.9737 17.2085 23.2872C17.9723 23.6346 18.7271 23.8643 19.4129 23.9051C20.0976 23.9458 20.8162 23.8021 21.3458 23.2725C22.1617 22.4577 22.0745 21.2129 21.7498 20.1514C21.4397 19.1397 20.8365 18.0024 20.0195 16.856ZM11.3511 11.8734C12.0029 12.0726 12.7803 12.4505 13.6223 12.9982C12.703 13.7782 11.8492 14.632 11.0693 15.5512C10.7628 15.0846 10.4912 14.5959 10.2568 14.0891C9.95913 13.4328 9.81315 12.8896 9.78826 12.4856C9.76449 12.0793 9.86408 11.9164 9.92632 11.8541C10.0282 11.7523 10.4039 11.5848 11.3511 11.8734ZM10.2568 19.839C10.465 19.3807 10.7377 18.8885 11.0693 18.377C11.8496 19.2962 12.7038 20.1501 13.6234 20.93C13.1571 21.2368 12.6688 21.5087 12.1625 21.7436C11.5061 22.0412 10.9629 22.1872 10.5589 22.2121C10.1515 22.2359 9.98969 22.1363 9.92745 22.0741C9.86521 22.0118 9.76562 21.8477 9.78939 21.4426C9.81428 21.0386 9.95913 20.4954 10.2579 19.839H10.2568ZM17.9101 21.7436C17.4039 21.509 16.916 21.2371 16.4503 20.93C17.3687 20.1499 18.2218 19.2961 19.001 18.377C19.5476 19.22 19.9255 19.9975 20.1247 20.6493C20.4144 21.5954 20.2469 21.9722 20.1451 22.0741C20.0817 22.1363 19.9188 22.2359 19.5136 22.211C19.1085 22.1883 18.5664 22.0412 17.9101 21.7436ZM13.9041 16.9647C13.9041 16.6645 14.0233 16.3767 14.2355 16.1645C14.4477 15.9522 14.7356 15.833 15.0357 15.833C15.3358 15.833 15.6237 15.9522 15.8359 16.1645C16.0481 16.3767 16.1673 16.6645 16.1673 16.9647C16.1673 17.2648 16.0481 17.5526 15.8359 17.7649C15.6237 17.9771 15.3358 18.0963 15.0357 18.0963C14.7356 18.0963 14.4477 17.9771 14.2355 17.7649C14.0233 17.5526 13.9041 17.2648 13.9041 16.9647Z" fill="#489BE8"/></g><defs><clipPath id="clip0_26_4726"><rect width="32" height="32" fill="white"/></clipPath></defs></svg>';
      const miIcons = {
        default: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#DBDFE4"/><path d="M23.2001 16.5539H25.8093C25.8549 16.5551 25.9003 16.5471 25.9427 16.5302C25.9851 16.5133 26.0236 16.488 26.0558 16.4558C26.0881 16.4235 26.1134 16.385 26.1303 16.3426C26.1472 16.3002 26.1552 16.2548 26.1539 16.2092C26.1569 16.1635 26.1496 16.1176 26.1326 16.075C26.1155 16.0324 26.0892 15.9942 26.0555 15.9631L22.8062 12.7139C22.7751 12.6801 22.7369 12.6538 22.6943 12.6368C22.6517 12.6197 22.6059 12.6124 22.5601 12.6154C22.5145 12.6141 22.4691 12.6222 22.4267 12.639C22.3843 12.6559 22.3458 12.6812 22.3136 12.7135C22.2813 12.7458 22.256 12.7843 22.2391 12.8266C22.2222 12.869 22.2142 12.9144 22.2155 12.96V15.5692C22.2163 15.8301 22.3203 16.0801 22.5047 16.2646C22.6892 16.449 22.9392 16.553 23.2001 16.5539Z" fill="#64748B"/><path d="M25.6616 18.031H22.2154C21.824 18.0302 21.4488 17.8743 21.172 17.5975C20.8952 17.3207 20.7393 16.9455 20.7385 16.5541V13.1079C20.7385 12.9773 20.6866 12.8521 20.5943 12.7598C20.502 12.6675 20.3768 12.6156 20.2462 12.6156H15.3231C14.9317 12.6164 14.5565 12.7723 14.2797 13.0491C14.0029 13.3259 13.847 13.7011 13.8462 14.0925V25.9079C13.847 26.2994 14.0029 26.6746 14.2797 26.9514C14.5565 27.2282 14.9317 27.384 15.3231 27.3848H24.677C25.0684 27.384 25.4436 27.2282 25.7204 26.9514C25.9972 26.6746 26.1531 26.2994 26.1539 25.9079V18.5233C26.1539 18.4586 26.1411 18.3946 26.1164 18.3349C26.0917 18.2752 26.0554 18.2209 26.0097 18.1752C25.964 18.1295 25.9097 18.0932 25.85 18.0685C25.7902 18.0437 25.7262 18.031 25.6616 18.031ZM15.8154 17.5387C15.8209 17.4113 15.875 17.2909 15.9666 17.2022C16.0582 17.1135 16.1802 17.0632 16.3077 17.0618H18.3231C18.3861 17.0613 18.4486 17.0734 18.507 17.0971C18.5654 17.1209 18.6186 17.1559 18.6634 17.2002C18.7083 17.2445 18.744 17.2971 18.7685 17.3552C18.793 17.4133 18.8058 17.4756 18.8062 17.5387V18.0279C18.8023 18.1561 18.7494 18.278 18.6584 18.3684C18.5674 18.4589 18.4452 18.511 18.317 18.5141H16.3077C16.2435 18.5153 16.1798 18.5036 16.1202 18.4796C16.0607 18.4556 16.0066 18.4199 15.9612 18.3745C15.9158 18.3291 15.88 18.275 15.856 18.2154C15.832 18.1559 15.8203 18.0921 15.8216 18.0279L15.8154 17.5387ZM23.2 23.9294C23.2 24.06 23.1482 24.1852 23.0558 24.2776C22.9635 24.3699 22.8383 24.4218 22.7077 24.4218H16.3077C16.1772 24.4218 16.0519 24.3699 15.9596 24.2776C15.8673 24.1852 15.8154 24.06 15.8154 23.9294V23.4464C15.8154 23.3158 15.8673 23.1906 15.9596 23.0983C16.0519 23.0059 16.1772 22.9541 16.3077 22.9541H22.7077C22.8383 22.9541 22.9635 23.0059 23.0558 23.0983C23.1482 23.1906 23.2 23.3158 23.2 23.4464V23.9294ZM24.1847 20.9756C24.1859 21.041 24.1741 21.106 24.1499 21.1668C24.1257 21.2276 24.0896 21.283 24.0438 21.3297C23.9979 21.3764 23.9432 21.4135 23.8829 21.4388C23.8226 21.4641 23.7578 21.4772 23.6923 21.4771H16.3077C16.1772 21.4771 16.0519 21.4253 15.9596 21.3329C15.8673 21.2406 15.8154 21.1154 15.8154 20.9848V20.4925C15.8154 20.362 15.8673 20.2367 15.9596 20.1444C16.0519 20.0521 16.1772 20.0002 16.3077 20.0002H23.6923C23.8229 20.0002 23.9481 20.0521 24.0405 20.1444C24.1328 20.2367 24.1847 20.362 24.1847 20.4925V20.9756Z" fill="#64748B"/></svg>',
        star: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#D4E7F7"/><path d="M15.0867 9.48214C15.2474 9.16071 15.5063 9 15.8634 9C16.2206 9 16.4795 9.16071 16.6402 9.48214L18.3813 13.0179L22.292 13.6071C22.6492 13.6429 22.8813 13.8304 22.9884 14.1696C23.0956 14.5089 23.0242 14.8036 22.7742 15.0536L19.9349 17.8125L20.6045 21.7232C20.6581 22.0625 20.542 22.3304 20.2563 22.5268C19.9706 22.7411 19.6759 22.7679 19.3724 22.6071L15.8634 20.7857L12.3545 22.6071C12.0509 22.7857 11.7563 22.7679 11.4706 22.5536C11.1849 22.3393 11.0688 22.0625 11.1224 21.7232L11.792 17.8125L8.95274 15.0536C8.70274 14.8036 8.63131 14.5089 8.73845 14.1696C8.84559 13.8304 9.07774 13.6429 9.43488 13.6071L13.3456 13.0179L15.0867 9.48214Z" fill="#2679C1"/></svg>',
        warning: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#FAD1D1"/><path d="M17.3634 19.0714C17.792 19.4821 18.0063 19.9821 18.0063 20.5714C18.0063 21.1607 17.792 21.6607 17.3634 22.0714C16.9527 22.5 16.4527 22.7143 15.8634 22.7143C15.2742 22.7143 14.7652 22.5 14.3367 22.0714C13.9259 21.6607 13.7206 21.1607 13.7206 20.5714C13.7206 19.9821 13.9259 19.4821 14.3367 19.0714C14.7652 18.6429 15.2742 18.4286 15.8634 18.4286C16.4527 18.4286 16.9527 18.6429 17.3634 19.0714ZM13.9617 9.66964C13.9617 9.49107 14.0242 9.33929 14.1492 9.21429C14.2742 9.07143 14.4259 9 14.6045 9H17.1224C17.3009 9 17.4527 9.07143 17.5777 9.21429C17.7027 9.33929 17.7652 9.49107 17.7652 9.66964L17.3902 16.9554C17.3902 17.1339 17.3277 17.2857 17.2027 17.4107C17.0777 17.5179 16.9259 17.5714 16.7474 17.5714H14.9795C14.8009 17.5714 14.6492 17.5179 14.5242 17.4107C14.3992 17.2857 14.3367 17.1339 14.3367 16.9554L13.9617 9.66964Z" fill="#EB5757"/></svg>',
        lightning: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#E1DAF1"/><path d="M20.0331 13.2857C20.2831 13.2857 20.4706 13.3929 20.5956 13.6071C20.7206 13.8214 20.7206 14.0357 20.5956 14.25L15.8813 22.3929C15.7563 22.6071 15.5688 22.7143 15.3188 22.7143C15.1045 22.7143 14.9349 22.6339 14.8099 22.4732C14.6849 22.3125 14.6492 22.125 14.7027 21.9107L15.9349 16.7143H12.7474C12.6224 16.7143 12.5063 16.6786 12.3992 16.6071C12.292 16.5357 12.2117 16.4464 12.1581 16.3393C12.1045 16.2321 12.0867 16.1161 12.1045 15.9911L12.9617 9.5625C12.9795 9.45536 13.0152 9.35714 13.0688 9.26786C13.1402 9.17857 13.2206 9.11607 13.3099 9.08036C13.3992 9.02679 13.4974 9 13.6045 9H17.4617C17.6759 9 17.8456 9.08929 17.9706 9.26786C18.0956 9.42857 18.1313 9.60714 18.0777 9.80357L16.9527 13.2857H20.0331Z" fill="#6F4BBB"/></svg>',
        exception: '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.1" cx="14" cy="14" r="14" fill="#C84B29" /><path d="M12.4422 19.6174H16.3814C16.3026 20.1192 16.0617 20.5748 15.7011 20.9033C15.3406 21.2319 14.8838 21.4121 14.4118 21.4121C13.9398 21.4121 13.483 21.2319 13.1224 20.9033C12.7619 20.5748 12.5209 20.1192 12.4422 19.6174ZM14.4118 7.41211C15.7362 7.41211 17.0064 7.97942 17.943 8.98925C18.8795 9.99907 19.4056 11.3687 19.4056 12.7968V15.6686L20.3498 17.9374C20.3927 18.0411 20.4109 18.1548 20.4028 18.2681C20.3946 18.3814 20.3603 18.4906 20.303 18.586C20.2457 18.6814 20.1673 18.7598 20.0747 18.8142C19.9822 18.8685 19.8785 18.8971 19.7732 18.8973H9.05306C8.94755 18.8973 8.84371 18.8688 8.75101 18.8144C8.65831 18.7601 8.5797 18.6816 8.52232 18.5861C8.46494 18.4906 8.43062 18.3812 8.42249 18.2678C8.41436 18.1543 8.43268 18.0405 8.47578 17.9366L9.41795 15.6679V12.7875L9.42128 12.608C9.46682 11.2136 10.0125 9.89271 10.9435 8.92362C11.8744 7.95453 13.1178 7.41217 14.4118 7.41211ZM21.7361 11.8972C21.8626 11.8972 21.9844 11.9491 22.0769 12.0422C22.1693 12.1353 22.2255 12.2628 22.2342 12.399C22.2428 12.5351 22.2032 12.6696 22.1233 12.7755C22.0435 12.8813 21.9293 12.9505 21.804 12.9691L21.7361 12.9741H20.4044C20.2779 12.9741 20.1561 12.9223 20.0636 12.8291C19.9712 12.736 19.9149 12.6085 19.9063 12.4724C19.8977 12.3362 19.9373 12.2017 20.0172 12.0958C20.097 11.99 20.2111 11.9208 20.3365 11.9022L20.4044 11.8972H21.7361ZM8.41918 11.8972C8.54571 11.8972 8.6675 11.9491 8.75995 12.0422C8.85241 12.1353 8.90862 12.2628 8.91725 12.399C8.92587 12.5351 8.88626 12.6696 8.80641 12.7755C8.72657 12.8813 8.61244 12.9505 8.4871 12.9691L8.41918 12.9741H7.08749C6.96096 12.9741 6.83917 12.9223 6.74671 12.8291C6.65426 12.736 6.59804 12.6085 6.58942 12.4724C6.58079 12.3362 6.62041 12.2017 6.70025 12.0958C6.7801 11.99 6.89423 11.9208 7.01957 11.9022L7.08749 11.8972H8.41918ZM21.4697 7.80483C21.5416 7.90803 21.5767 8.03561 21.5686 8.16435C21.5605 8.29309 21.5099 8.41443 21.4258 8.50628L21.3699 8.55869L20.0382 9.63562C19.9374 9.71755 19.8115 9.75527 19.686 9.74119C19.5604 9.72712 19.4445 9.66229 19.3614 9.55976C19.2784 9.45723 19.2345 9.3246 19.2385 9.18855C19.2425 9.05251 19.2941 8.92314 19.383 8.82649L19.4389 8.77407L20.7706 7.69714C20.8766 7.61145 21.0097 7.57466 21.1409 7.59486C21.272 7.61505 21.3903 7.69058 21.4697 7.80483ZM8.05296 7.69714L9.38465 8.77407C9.43712 8.8165 9.48132 8.86966 9.51473 8.9305C9.54814 8.99135 9.57011 9.0587 9.57939 9.1287C9.58866 9.1987 9.58506 9.26999 9.56878 9.33849C9.55251 9.40699 9.52388 9.47136 9.48453 9.52793C9.44518 9.5845 9.39589 9.63216 9.33946 9.66819C9.28303 9.70421 9.22057 9.72791 9.15565 9.73791C9.09073 9.74791 9.02461 9.74402 8.96109 9.72647C8.89756 9.70892 8.83786 9.67805 8.78539 9.63562L7.4537 8.55869C7.40124 8.51626 7.35704 8.46311 7.32363 8.40226C7.29021 8.34141 7.26824 8.27407 7.25897 8.20406C7.24969 8.13406 7.2533 8.06278 7.26957 7.99428C7.28585 7.92578 7.31448 7.8614 7.35383 7.80483C7.39317 7.74826 7.44247 7.7006 7.4989 7.66457C7.55533 7.62855 7.61779 7.60486 7.68271 7.59486C7.74763 7.58486 7.81374 7.58874 7.87727 7.60629C7.9408 7.62384 8.0005 7.65471 8.05296 7.69714Z" fill="#C84B29" /></svg>',
        "ai-insight": aiIconForMI,
        addon: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#ddebf7"/><g clip-path="url(#a)"><path d="m24.714 20 2.946-2.946a.834.834 0 0 0-1.178-1.179l-2.947 2.947-2.357-2.357 2.947-2.947a.834.834 0 0 0-1.179-1.178L20 15.286l-1.768-1.768-2.357 2.357a5.83 5.83 0 0 0-1.365 6.08l-2.17 2.17 3.535 3.535 2.17-2.17a5.83 5.83 0 0 0 6.08-1.365l2.357-2.357z" fill="#7ab0db"/></g><defs><clipPath id="a"><path fill="#fff" d="M10 10h20v20H10z"/></clipPath></defs></svg>',
        analytics: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#e3fff0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.625 10h-1.25c-.69 0-1.25.56-1.25 1.25v17.5c0 .69.56 1.25 1.25 1.25h1.25c.69 0 1.25-.56 1.25-1.25v-17.5c0-.69-.56-1.25-1.25-1.25m6.25 10h-1.25c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25h1.25c.69 0 1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25m-12.5-4.375h-1.25c-.69 0-1.25.56-1.25 1.25V28.75c0 .69.56 1.25 1.25 1.25h1.25c.69 0 1.25-.56 1.25-1.25V16.875c0-.69-.56-1.25-1.25-1.25" fill="#8dceab"/></svg>'
      };
      const icons = miIcons;
      return icons[props.notification.icon] || icons.default;
    });
    const userFeedbackInstalled = computed(() => false);
    const userFeedbackActive = computed(() => false);
    const userFeedbackInstalledAndActivated = computed(
      () => installedAndActivated.value || userFeedbackInstalled.value && userFeedbackActive.value
    );
    const buttonClass = (type, index) => {
      return index === 0 ? "monsterinsights-notificationsv3-btn-primary" : "monsterinsights-notificationsv3-btn-secondary";
    };
    const dismiss = (notificationId) => {
      notificationsStore.dismissNotificationAction(notificationId);
    };
    const handleDismiss = (notificationId) => {
      if (props.notification.read === false) {
        notificationsStore.markReadAction(props.notification.id);
      }
      dismiss(notificationId);
    };
    const remindMe = () => {
      notificationsStore.remindMeAction(props.notification.id);
      emit("close-sidebar");
    };
    const toggleSave = () => {
      if (props.notification.read === false) {
        notificationsStore.markReadAction(props.notification.id);
      }
      notificationsStore.saveNotificationAction(props.notification.id);
    };
    const handleButtonClick = (button_type, button) => {
      if (button_type === "cta_install_user_feedback") {
        if (userFeedbackInstalledAndActivated.value) {
          return false;
        }
        processing.value = true;
        setTimeout(() => {
          processing.value = false;
          installedAndActivated.value = true;
          window.location.href = button.url;
        }, 3e3);
        return;
      }
      const navigate = () => {
        if (button.is_external) {
          window.open(button.url, "_blank");
        } else {
          window.location.href = button.url;
        }
      };
      if (props.notification.read === false) {
        notificationsStore.markReadAction(props.notification.id).then(navigate);
      } else {
        navigate();
      }
    };
    const triggerButtonText = (button_type, text) => {
      if (button_type === "cta_install_user_feedback") {
        if (userFeedbackInstalledAndActivated.value) {
          return text_install_activated;
        }
        if (processing.value) {
          return text_install_processing;
        }
      }
      return text;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["monsterinsights-notificationsv3-single-notification", props.notification.read === false ? "monsterinsights-notificationsv3-single-notification-unread" : "monsterinsights-notificationsv3-single-notification-read"])
      }, [
        createBaseVNode("div", {
          class: "monsterinsights-notificationsv3-notification-icon",
          innerHTML: icon.value
        }, null, 8, _hoisted_1$4),
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("h5", {
              innerHTML: __props.notification.title
            }, null, 8, _hoisted_4$2),
            createBaseVNode("button", {
              class: normalizeClass(["monsterinsights-notificationsv3-notification-save", __props.notification.saved ? "monsterinsights-notificationsv3-notification-save-active" : ""]),
              onClick: toggleSave
            }, [
              __props.notification.saved ? (openBlock(), createElementBlock("svg", _hoisted_5$1, [..._cache[1] || (_cache[1] = [
                createBaseVNode("path", {
                  d: "M13.36 1.575a3.667 3.667 0 0 0-5.186 0l-.706.706-.707-.706A3.668 3.668 0 1 0 1.574 6.76l.707.707 5.187 5.187 5.186-5.187.707-.707a3.666 3.666 0 0 0 0-5.186",
                  fill: "#393f4c",
                  stroke: "#475569",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])])) : (openBlock(), createElementBlock("svg", _hoisted_6$1, [..._cache[2] || (_cache[2] = [
                createBaseVNode("path", {
                  d: "M13.8936 3.07333C13.5531 2.73267 13.1488 2.46243 12.7038 2.27805C12.2588 2.09368 11.7819 1.99878 11.3002 1.99878C10.8186 1.99878 10.3416 2.09368 9.89667 2.27805C9.4517 2.46243 9.04741 2.73267 8.70691 3.07333L8.00024 3.78L7.29357 3.07333C6.60578 2.38553 5.67293 1.99914 4.70024 1.99914C3.72755 1.99914 2.7947 2.38553 2.10691 3.07333C1.41911 3.76112 1.03271 4.69397 1.03271 5.66666C1.03271 6.63935 1.41911 7.5722 2.10691 8.26L2.81358 8.96666L8.00024 14.1533L13.1869 8.96666L13.8936 8.26C14.2342 7.91949 14.5045 7.51521 14.6889 7.07023C14.8732 6.62526 14.9681 6.14832 14.9681 5.66666C14.9681 5.185 14.8732 4.70807 14.6889 4.26309C14.5045 3.81812 14.2342 3.41383 13.8936 3.07333Z",
                  stroke: "#475569",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, null, -1)
              ])]))
            ], 2)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["monsterinsights-notificationsv3-notification-content", isExpanded.value ? "is-expanded" : ""])
          }, [
            createBaseVNode("div", {
              ref_key: "contentEl",
              ref: contentEl,
              class: "monsterinsights-notificationsv3-notification-content-text",
              innerHTML: __props.notification.content
            }, null, 8, _hoisted_7$1),
            isOverflowing.value && !isExpanded.value ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "monsterinsights-notificationsv3-notification-read-more",
              onClick: toggleExpand,
              textContent: toDisplayString(unref(text_read_more))
            }, null, 8, _hoisted_8$1)) : createCommentVNode("", true)
          ], 2),
          createBaseVNode("div", _hoisted_9$1, [
            __props.notification.has_remind_me ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "monsterinsights-button monsterinsights-notificationsv3-btn-primary monsterinsights-notificationsv3-btn-remind-me",
              onClick: remindMe
            }, [
              _cache[3] || (_cache[3] = createBaseVNode("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 16 16",
                fill: "none"
              }, [
                createBaseVNode("path", {
                  d: "M8 2.66663C6.81331 2.66663 5.65328 3.01852 4.66658 3.67781C3.67989 4.3371 2.91085 5.27417 2.45673 6.37053C2.0026 7.46688 1.88378 8.67328 2.11529 9.83717C2.3468 11.0011 2.91825 12.0702 3.75736 12.9093C4.59648 13.7484 5.66558 14.3198 6.82946 14.5513C7.99335 14.7829 9.19975 14.664 10.2961 14.2099C11.3925 13.7558 12.3295 12.9867 12.9888 12C13.6481 11.0134 14 9.85331 14 8.66663C14 7.07533 13.3679 5.5492 12.2426 4.42399C11.1174 3.29877 9.5913 2.66663 8 2.66663ZM9.80667 10.4733C9.74469 10.5358 9.67096 10.5854 9.58972 10.6192C9.50848 10.6531 9.42134 10.6705 9.33334 10.6705C9.24533 10.6705 9.15819 10.6531 9.07695 10.6192C8.99571 10.5854 8.92198 10.5358 8.86 10.4733L7.52667 9.13996C7.46488 9.07767 7.416 9.00379 7.38282 8.92256C7.34965 8.84134 7.33283 8.75436 7.33334 8.66663V5.99996C7.33334 5.82315 7.40357 5.65358 7.5286 5.52855C7.65362 5.40353 7.82319 5.33329 8 5.33329C8.17681 5.33329 8.34638 5.40353 8.47141 5.52855C8.59643 5.65358 8.66667 5.82315 8.66667 5.99996V8.39329L9.80667 9.52663C9.86915 9.5886 9.91875 9.66234 9.9526 9.74358C9.98644 9.82481 10.0039 9.91195 10.0039 9.99996C10.0039 10.088 9.98644 10.1751 9.9526 10.2563C9.91875 10.3376 9.86915 10.4113 9.80667 10.4733Z",
                  fill: "white"
                }),
                createBaseVNode("path", {
                  d: "M12.6664 4.00001C12.5354 4.00151 12.4071 3.96187 12.2998 3.88668L10.2998 2.55334C10.218 2.5095 10.1463 2.44907 10.0893 2.37594C10.0322 2.3028 9.99106 2.21856 9.96841 2.12861C9.94577 2.03866 9.94214 1.94497 9.95777 1.85353C9.9734 1.7621 10.0079 1.67493 10.0592 1.59761C10.1104 1.52028 10.1772 1.4545 10.2553 1.40447C10.3335 1.35444 10.4211 1.32126 10.5128 1.30706C10.6045 1.29285 10.6981 1.29793 10.7877 1.32197C10.8773 1.34602 10.9609 1.38849 11.0331 1.44668L13.0331 2.78001C13.1513 2.85945 13.241 2.97467 13.289 3.10878C13.337 3.24289 13.3408 3.38884 13.2998 3.52525C13.2588 3.66166 13.1751 3.78135 13.0612 3.86679C12.9472 3.95222 12.8089 3.99891 12.6664 4.00001Z",
                  fill: "white"
                }),
                createBaseVNode("path", {
                  d: "M3.3334 4.00001C3.19096 3.99891 3.05263 3.95222 2.93866 3.86679C2.82469 3.78135 2.74108 3.66166 2.70009 3.52525C2.65909 3.38884 2.66286 3.24289 2.71084 3.10878C2.75883 2.97467 2.8485 2.85945 2.96673 2.78001L4.96673 1.44668C5.03897 1.38849 5.12256 1.34602 5.21215 1.32197C5.30174 1.29793 5.39536 1.29285 5.48703 1.30706C5.57869 1.32126 5.66639 1.35444 5.7445 1.40447C5.82261 1.4545 5.88942 1.52028 5.94066 1.59761C5.9919 1.67493 6.02644 1.7621 6.04207 1.85353C6.0577 1.94497 6.05407 2.03866 6.03143 2.12861C6.00878 2.21856 5.96761 2.3028 5.91056 2.37594C5.8535 2.44907 5.78181 2.5095 5.70006 2.55334L3.70006 3.88668C3.5927 3.96187 3.46446 4.00151 3.3334 4.00001Z",
                  fill: "white"
                })
              ], -1)),
              createBaseVNode("span", {
                textContent: toDisplayString(unref(text_remind_me))
              }, null, 8, _hoisted_10$1)
            ])) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.notification.btns, (button, button_type, index) => {
              return openBlock(), createElementBlock("a", {
                key: button_type,
                href: "#",
                class: normalizeClass(["monsterinsights-button", buttonClass(button_type, __props.notification.has_remind_me ? index + 1 : index)]),
                onClick: withModifiers(($event) => handleButtonClick(button_type, button), ["prevent"]),
                textContent: toDisplayString(triggerButtonText(button_type, button.text))
              }, null, 10, _hoisted_11$1);
            }), 128)),
            __props.dismissable ? (openBlock(), createElementBlock("span", {
              key: 1,
              onClick: _cache[0] || (_cache[0] = ($event) => handleDismiss(__props.notification.id)),
              innerHTML: unref(text_dismiss)
            }, null, 8, _hoisted_12$1)) : createCommentVNode("", true)
          ])
        ])
      ], 2);
    };
  }
};
const _hoisted_1$3 = { class: "monsterinsights-notificationsv3-no-notifications" };
const _hoisted_2$3 = ["textContent"];
const _sfc_main$3 = {
  __name: "NoNotifications",
  setup(__props) {
    const { __: __2 } = wp.i18n;
    const text_no_notifications = __2("No Notifications", "google-analytics-for-wordpress");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        _cache[0] || (_cache[0] = createBaseVNode("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          width: "42",
          height: "32",
          viewBox: "0 0 42 32",
          fill: "none"
        }, [
          createBaseVNode("path", {
            d: "M41.8201 15.7422C41.9372 15.91 42 16.1097 42 16.3144V29C42 29.5523 41.5523 30 41 30H1C0.447716 30 0 29.5523 0 29V17.3212C0 17.1123 0.0654041 16.9087 0.187033 16.7389L10.445 2.41769C10.6327 2.15552 10.9354 2 11.2579 2H31.7108C32.0376 2 32.3439 2.15974 32.5309 2.42781L41.8201 15.7422ZM5.83245 15.4721C5.41842 16.1382 5.89745 17 6.68177 17H14.1433C14.462 17 14.7617 17.152 14.95 17.4091L17.2804 20.5909C17.4688 20.848 17.7684 21 18.0872 21H23.9109C24.2296 21 24.5293 20.848 24.7176 20.5909L27.048 17.4091C27.2364 17.152 27.536 17 27.8548 17H36.1549C36.967 17 37.4405 16.083 36.9701 15.4209L30.5773 6.42091C30.3897 6.15686 30.0859 6 29.762 6H12.2756C11.9299 6 11.6088 6.17853 11.4263 6.47212L5.83245 15.4721Z",
            fill: "#DDEBF7"
          })
        ], -1)),
        createBaseVNode("h4", {
          textContent: toDisplayString(unref(text_no_notifications))
        }, null, 8, _hoisted_2$3)
      ]);
    };
  }
};
const _hoisted_1$2 = { class: "monsterinsights-notificationsv3-container" };
const _hoisted_2$2 = { class: "monsterinsights-notificationsv3-sidebar-header" };
const _hoisted_3$2 = { class: "monsterinsights-notificationsv3-sidebar-header-title" };
const _hoisted_4$1 = ["textContent"];
const _hoisted_5 = {
  key: 0,
  class: "monsterinsights-notificationsv3-sidebar-header-count"
};
const _hoisted_6 = { class: "monsterinsights-notificationsv3-sidebar-header-actions" };
const _hoisted_7 = ["textContent"];
const _hoisted_8 = { class: "monsterinsights-notificationsv3-tabs" };
const _hoisted_9 = ["textContent"];
const _hoisted_10 = ["textContent"];
const _hoisted_11 = ["textContent"];
const _hoisted_12 = ["textContent"];
const _hoisted_13 = {
  key: 0,
  class: "monsterinsights-notificationsv3-sidebar-notifications monsterinsights-notificationsv3-notifications-active"
};
const _hoisted_14 = {
  key: 1,
  class: "monsterinsights-notificationsv3-sidebar-notifications monsterinsights-notificationsv3-notifications-dismissed"
};
const _hoisted_15 = {
  key: 2,
  class: "monsterinsights-notificationsv3-sidebar-notifications monsterinsights-notificationsv3-notifications-saved"
};
const _sfc_main$2 = {
  __name: "NotificationsDrawer",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { __: __2 } = wp.i18n;
    const emit = __emit;
    const notificationsStore = useNotificationsStore();
    const { activeNotifications, dismissedNotifications } = storeToRefs(notificationsStore);
    const activeTab = ref("all");
    const text_notifications = __2("Notifications", "google-analytics-for-wordpress");
    const text_mark_all_read = __2("Mark All Read", "google-analytics-for-wordpress");
    const text_all = __2("All", "google-analytics-for-wordpress");
    const text_archived = __2("Archived", "google-analytics-for-wordpress");
    const text_saved = __2("Saved", "google-analytics-for-wordpress");
    const activeNotificationsNumber = computed(() => activeNotifications.value.length);
    const dismissedNotificationsNumber = computed(() => dismissedNotifications.value.length);
    const unreadCount = computed(() => notificationsStore.unreadCount);
    const savedNotifications = computed(() => notificationsStore.savedNotifications);
    const savedNotificationsCount = computed(() => savedNotifications.value.length);
    const closeSidebar = () => {
      activeTab.value = "all";
      emit("close");
    };
    const markAllRead = () => {
      notificationsStore.markAllReadAction();
    };
    watch(
      unreadCount,
      (count) => {
        const menu_indicator = document.querySelector(".monsterinsights-menu-notification-indicator");
        if (!menu_indicator) {
          return;
        }
        if (count > 0) {
          menu_indicator.innerText = count;
          menu_indicator.style.display = "";
        } else {
          menu_indicator.style.display = "none";
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      const queryString = window.location.search;
      if (typeof queryString !== "undefined") {
        const urlParams = new URLSearchParams(queryString);
        urlParams.get("open");
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        __props.isOpen ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([
            "monsterinsights-notificationsv3-sidebar",
            __props.isOpen ? "monsterinsights-notificationsv3-sidebar-in" : "monsterinsights-notificationsv3-sidebar-out"
          ])
        }, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("div", _hoisted_3$2, [
              createBaseVNode("h3", null, [
                createBaseVNode("span", {
                  textContent: toDisplayString(unref(text_notifications))
                }, null, 8, _hoisted_4$1),
                unreadCount.value > 0 ? (openBlock(), createElementBlock("span", _hoisted_5, "(" + toDisplayString(unreadCount.value) + ")", 1)) : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("div", _hoisted_6, [
              unreadCount.value > 0 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "monsterinsights-notificationsv3-mark-all-read",
                onClick: markAllRead,
                textContent: toDisplayString(unref(text_mark_all_read))
              }, null, 8, _hoisted_7)) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "monsterinsights-button monsterinsights-notificationsv3-sidebar-close",
                onClick: closeSidebar
              }, [..._cache[3] || (_cache[3] = [
                createBaseVNode("svg", {
                  width: "12",
                  height: "12",
                  viewBox: "0 0 12 12",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg"
                }, [
                  createBaseVNode("path", {
                    d: "M8.28409 6L11.6932 9.40909C11.8977 9.61364 12 9.86364 12 10.1591C12 10.4545 11.8977 10.7159 11.6932 10.9432L10.9432 11.6932C10.7159 11.8977 10.4545 12 10.1591 12C9.86364 12 9.61364 11.8977 9.40909 11.6932L6 8.28409L2.59091 11.6932C2.38636 11.8977 2.13636 12 1.84091 12C1.54545 12 1.28409 11.8977 1.05682 11.6932L0.306818 10.9432C0.102273 10.7159 0 10.4545 0 10.1591C0 9.86364 0.102273 9.61364 0.306818 9.40909L3.71591 6L0.306818 2.59091C0.102273 2.38636 0 2.13636 0 1.84091C0 1.54545 0.102273 1.28409 0.306818 1.05682L1.05682 0.306818C1.28409 0.102273 1.54545 0 1.84091 0C2.13636 0 2.38636 0.102273 2.59091 0.306818L6 3.71591L9.40909 0.306818C9.61364 0.102273 9.86364 0 10.1591 0C10.4545 0 10.7159 0.102273 10.9432 0.306818L11.6932 1.05682C11.8977 1.28409 12 1.54545 12 1.84091C12 2.13636 11.8977 2.38636 11.6932 2.59091L8.28409 6Z",
                    fill: "currentColor"
                  })
                ], -1)
              ])])
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("button", {
              class: normalizeClass(["monsterinsights-notificationsv3-tab", activeTab.value === "all" ? "monsterinsights-notificationsv3-tab-active" : ""]),
              onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "all")
            }, [
              createBaseVNode("span", {
                textContent: toDisplayString(unref(text_all))
              }, null, 8, _hoisted_9),
              unreadCount.value > 0 ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "monsterinsights-notificationsv3-tab-badge",
                textContent: toDisplayString(unreadCount.value)
              }, null, 8, _hoisted_10)) : createCommentVNode("", true)
            ], 2),
            createBaseVNode("button", {
              class: normalizeClass(["monsterinsights-notificationsv3-tab", activeTab.value === "archived" ? "monsterinsights-notificationsv3-tab-active" : ""]),
              onClick: _cache[1] || (_cache[1] = ($event) => activeTab.value = "archived")
            }, [
              createBaseVNode("span", {
                textContent: toDisplayString(unref(text_archived))
              }, null, 8, _hoisted_11)
            ], 2),
            createBaseVNode("button", {
              class: normalizeClass(["monsterinsights-notificationsv3-tab", activeTab.value === "saved" ? "monsterinsights-notificationsv3-tab-active" : ""]),
              onClick: _cache[2] || (_cache[2] = ($event) => activeTab.value = "saved")
            }, [
              createBaseVNode("span", {
                textContent: toDisplayString(unref(text_saved))
              }, null, 8, _hoisted_12)
            ], 2)
          ]),
          activeTab.value === "all" ? (openBlock(), createElementBlock("div", _hoisted_13, [
            activeNotificationsNumber.value < 1 ? (openBlock(), createBlock(_sfc_main$3, { key: 0 })) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(activeNotifications), (notification) => {
              return openBlock(), createBlock(_sfc_main$4, {
                key: notification.id,
                notification,
                onCloseSidebar: closeSidebar
              }, null, 8, ["notification"]);
            }), 128))
          ])) : createCommentVNode("", true),
          activeTab.value === "archived" ? (openBlock(), createElementBlock("div", _hoisted_14, [
            dismissedNotificationsNumber.value < 1 ? (openBlock(), createBlock(_sfc_main$3, { key: 0 })) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(dismissedNotifications), (dismissNotification2) => {
              return openBlock(), createBlock(_sfc_main$4, {
                key: dismissNotification2.id,
                notification: dismissNotification2,
                dismissable: false
              }, null, 8, ["notification"]);
            }), 128))
          ])) : createCommentVNode("", true),
          activeTab.value === "saved" ? (openBlock(), createElementBlock("div", _hoisted_15, [
            savedNotificationsCount.value < 1 ? (openBlock(), createBlock(_sfc_main$3, { key: 0 })) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(savedNotifications.value, (notification) => {
              return openBlock(), createBlock(_sfc_main$4, {
                key: notification.id,
                notification,
                dismissable: false
              }, null, 8, ["notification"]);
            }), 128))
          ])) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$1 = { class: "mi-header-notifications" };
const _hoisted_2$1 = { class: "monsterinsights-notificationsv3-inbox-button" };
const _hoisted_3$1 = ["textContent"];
const _sfc_main$1 = {
  __name: "HeaderNotifications",
  setup(__props) {
    const notificationsStore = useNotificationsStore();
    const { activeNotifications } = storeToRefs(notificationsStore);
    const isOpen = ref(false);
    const unreadCount = computed(() => notificationsStore.unreadCount);
    function toggleNotifications() {
      isOpen.value = !isOpen.value;
    }
    function closeNotifications() {
      isOpen.value = false;
    }
    onMounted(async () => {
      await notificationsStore.fetchNotificationsAction();
      const queryString = window.location.search;
      if (typeof queryString !== "undefined") {
        const urlParams = new URLSearchParams(queryString);
        const open = urlParams.get("open");
        if (typeof open !== "undefined" && open === "monsterinsights_notification_sidebar") {
          isOpen.value = true;
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("button", {
            class: "monsterinsights-button",
            onClick: toggleNotifications
          }, [..._cache[0] || (_cache[0] = [
            createBaseVNode("svg", {
              width: "22",
              height: "14",
              viewBox: "0 0 22 14",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createBaseVNode("path", {
                d: "M21.6944 6.5625C21.8981 6.85417 22 7.18229 22 7.54687V12.25C22 12.7361 21.8218 13.1493 21.4653 13.4896C21.1088 13.8299 20.6759 14 20.1667 14H1.83333C1.32407 14 0.891204 13.8299 0.534722 13.4896C0.178241 13.1493 0 12.7361 0 12.25V7.54687C0 7.18229 0.101852 6.85417 0.305556 6.5625L4.35417 0.765625C4.45602 0.644097 4.58333 0.522569 4.73611 0.401042C4.91435 0.279514 5.10532 0.182292 5.30903 0.109375C5.51273 0.0364583 5.7037 0 5.88194 0H16.1181C16.3981 0 16.6782 0.0850694 16.9583 0.255208C17.2639 0.401042 17.4931 0.571181 17.6458 0.765625L21.6944 6.5625ZM6.1875 2.33333L2.94097 7H7.63889L8.86111 9.33333H13.1389L14.3611 7H19.059L15.8125 2.33333H6.1875Z",
                fill: "#2679C1"
              })
            ], -1)
          ])]),
          unreadCount.value > 0 ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass([
              "monsterinsights-notificationsv3-inbox-number",
              unreadCount.value > 9 ? "number-greater-than-10" : "number-less-than-10"
            ]),
            onClick: toggleNotifications,
            textContent: toDisplayString(unreadCount.value)
          }, null, 10, _hoisted_3$1)) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$2, {
          isOpen: isOpen.value,
          onClose: closeNotifications
        }, null, 8, ["isOpen"])
      ]);
    };
  }
};
const HeaderNotifications = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1215b39d"]]);
const _hoisted_1 = { class: "monsterinsights-header" };
const _hoisted_2 = { class: "monsterinsights-container monsterinsights-header-container" };
const _hoisted_3 = { class: "monsterinsights-header-left" };
const _hoisted_4 = { class: "monsterinsights-header-right monsterinsights-float-right" };
const _sfc_main = {
  __name: "TheAppHeader",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            renderSlot(_ctx.$slots, "header-left", {}, () => [
              createVNode(_sfc_main$5)
            ])
          ]),
          createBaseVNode("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "header-right", {}, () => [
              createVNode(HeaderNotifications)
            ])
          ])
        ]),
        renderSlot(_ctx.$slots, "header-navigation")
      ]);
    };
  }
};
export {
  _sfc_main as _,
  __vitePreload as a,
  createWebHashHistory as b,
  createRouter as c,
  useRoute as d,
  useErrorHandling as e,
  setupPinia as s,
  useRouter as u
};
