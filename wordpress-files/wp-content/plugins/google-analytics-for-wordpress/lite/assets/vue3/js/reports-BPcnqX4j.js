const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./chunks/OverviewReport-pdTGwtj1.js","./chunks/_plugin-vue_export-helper-Cga6DwZW.js","./chunks/ReAuthModal-CypDEN8K.js","../css/main-monsterinsights-Du5DxmSn.css","./chunks/Icon-DyR-ePz9.js","../css/main-monsterinsights-DdCOUrGJ.css","./chunks/html2pdf-B9tALhFa.js","./chunks/useFeatureGate-DCZMml8b.js","./chunks/TheAppHeader-DnsM3Eft.js","../css/main-monsterinsights-BlALUF99.css","../css/main-monsterinsights-DWkQp-s6.css","../css/main-monsterinsights-BQa1p6TF.css","../css/main-monsterinsights-DUs36LOc.css"])))=>i.map(i=>d[i]);
import { a as __vitePreload, _ as _sfc_main$d, c as createRouter, b as createWebHashHistory, s as setupPinia } from "./chunks/TheAppHeader-DnsM3Eft.js";
import { H as getCurrentScope, I as onScopeDispose, J as onUnmounted, K as getCurrentInstance, u as unref, B as watch, j as ref, L as defineComponent, M as useAttrs, x as onMounted, y as onBeforeUnmount, s as nextTick, o as openBlock, D as createBlock, w as withDirectives, N as vShow, c as createElementBlock, q as createCommentVNode, T as Transition, O as mergeProps, P as toHandlers, C as withCtx, n as normalizeStyle, i as normalizeClass, b as createVNode, Q as renderSlot, R as normalizeProps, S as guardReactiveProps, a as createBaseVNode, A as withModifiers, E as withKeys, U as Teleport, V as toRef, m as computed, W as inject, X as reactive, Y as markRaw, Z as shallowReactive, f as renderList, $ as createSlots, a0 as resolveDynamicComponent, F as Fragment, t as toDisplayString, z as createTextVNode, a1 as provide, k as getMiGlobal, a2 as isNetworkAdmin, v as vModelText, _ as __$2, l as defineStore, a3 as getMonsterInsightsUrl, a4 as vModelSelect, a5 as sprintf, a6 as _export_sfc, r as resolveComponent, d as createApp } from "./chunks/_plugin-vue_export-helper-Cga6DwZW.js";
import { I as Icon } from "./chunks/Icon-DyR-ePz9.js";
import { d as dateIntervals, h as hooks, _ as _sfc_main$c, a as html2pdf } from "./chunks/html2pdf-B9tALhFa.js";
import { i as isAddonActive, e as ensureBearerToken, a as isAuthed, g as getAddonBasename, b as getMiGlobal$1, c as isPro, d as isAddonInstalled, f as getAddonsPageUrl, h as getUpgradeUrl, j as getUrl } from "./chunks/useFeatureGate-DCZMml8b.js";
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function getLifeCycleTarget(target) {
  return getCurrentInstance();
}
function tryOnUnmounted(fn, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    onUnmounted(fn, target);
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = isClient ? window : void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
var candidateSelectors = ["input:not([inert]):not([inert] *)", "select:not([inert]):not([inert] *)", "textarea:not([inert]):not([inert] *)", "a[href]:not([inert]):not([inert] *)", "button:not([inert]):not([inert] *)", "[tabindex]:not(slot):not([inert]):not([inert] *)", "audio[controls]:not([inert]):not([inert] *)", "video[controls]:not([inert]):not([inert] *)", '[contenteditable]:not([contenteditable="false"]):not([inert]):not([inert] *)', "details>summary:first-of-type:not([inert]):not([inert] *)", "details:not([inert]):not([inert] *)"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var _isInert = function isInert(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && // closest does not exist on shadow roots, so we fall back to a manual
  // lookup upward, in case it is not defined.
  (typeof node.closest === "function" ? node.closest("[inert]") : _isInert(node.parentNode));
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (_isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var _getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (_isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = _getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !_isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = _getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (displayCheck === "full-native") {
    if ("checkVisibility" in node) {
      var visible = node.checkVisibility({
        // Checking opacity might be desirable for some use cases, but natively,
        // opacity zero elements _are_ focusable and tabbable.
        checkOpacity: false,
        opacityProperty: false,
        contentVisibilityAuto: true,
        visibilityProperty: true,
        // This is an alias for `visibilityProperty`. Contemporary browsers
        // support both. However, this alias has wider browser support (Chrome
        // >= 105 and Firefox >= 106, vs. Chrome >= 121 and Firefox >= 122), so
        // we include it anyway.
        checkVisibilityCSS: true
      });
      return !visible;
    }
  }
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || // full-native can run this branch when it falls through in case
  // Element#checkVisibility is unsupported
  displayCheck === "full-native" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isShadowRootTabbable = function isShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var _sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? _sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = _getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return _sortByOrder(candidates);
};
var focusable = function focusable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = _getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe:not([inert]):not([inert] *)").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0, F = function() {
      };
      return {
        s: F,
        n: function() {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function(r2) {
          throw r2;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return {
    s: function() {
      t = t.call(r);
    },
    n: function() {
      var r2 = t.next();
      return a = r2.done, r2;
    },
    e: function(r2) {
      u = true, o = r2;
    },
    f: function() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
var activeFocusTraps = {
  // Returns the trap from the top of the stack.
  getActiveTrap: function getActiveTrap(trapStack) {
    if ((trapStack === null || trapStack === void 0 ? void 0 : trapStack.length) > 0) {
      return trapStack[trapStack.length - 1];
    }
    return null;
  },
  // Pauses the currently active trap, then adds a new trap to the stack.
  activateTrap: function activateTrap(trapStack, trap) {
    var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
    if (trap !== activeTrap) {
      activeFocusTraps.pauseTrap(trapStack);
    }
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex === -1) {
      trapStack.push(trap);
    } else {
      trapStack.splice(trapIndex, 1);
      trapStack.push(trap);
    }
  },
  // Removes the trap from the top of the stack, then unpauses the next trap down.
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    var trapIndex = trapStack.indexOf(trap);
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1);
    }
    activeFocusTraps.unpauseTrap(trapStack);
  },
  // Pauses the trap at the top of the stack.
  pauseTrap: function pauseTrap(trapStack) {
    var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
    activeTrap === null || activeTrap === void 0 || activeTrap._setPausedState(true);
  },
  // Unpauses the trap at the top of the stack.
  unpauseTrap: function unpauseTrap(trapStack) {
    var activeTrap = activeFocusTraps.getActiveTrap(trapStack);
    if (activeTrap && !activeTrap._isManuallyPaused()) {
      activeTrap._setPausedState(false);
    }
  }
};
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
};
var isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey;
};
var isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
};
var internalTrapStack = [];
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
  var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isolateSubtrees: false,
    isKeyForward,
    isKeyBackward
  }, userOptions);
  var state = {
    // containers given to createFocusTrap()
    /** @type {Array<HTMLElement>} */
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    /** @type {Array<{
     *    container: HTMLElement,
     *    tabbableNodes: Array<HTMLElement>, // empty if none
     *    focusableNodes: Array<HTMLElement>, // empty if none
     *    posTabIndexesFound: boolean,
     *    firstTabbableNode: HTMLElement|undefined,
     *    lastTabbableNode: HTMLElement|undefined,
     *    firstDomTabbableNode: HTMLElement|undefined,
     *    lastDomTabbableNode: HTMLElement|undefined,
     *    nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
     *  }>}
     */
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    // references to nodes that are siblings to the ancestors of this trap's containers.
    /** @type {Set<HTMLElement>} */
    adjacentElements: /* @__PURE__ */ new Set(),
    // references to nodes that were inert or aria-hidden before the trap was activated.
    /** @type {Set<HTMLElement>} */
    alreadySilent: /* @__PURE__ */ new Set(),
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    manuallyPaused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var findContainerIndex = function findContainerIndex2(element, event) {
    var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
    return state.containerGroups.findIndex(function(_ref) {
      var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
        return node === element;
      });
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
    var optionValue = config[optionName];
    if (typeof optionValue === "function") {
      optionValue = optionValue.apply(void 0, _toConsumableArray(params));
    }
    if (optionValue === true) {
      optionValue = void 0;
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue;
      }
      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      try {
        node = doc.querySelector(optionValue);
      } catch (err) {
        throw new Error("`".concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
      }
      if (!node) {
        if (!hasFallback) {
          throw new Error("`".concat(optionName, "` as selector refers to no known node"));
        }
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node = getNodeForOption("initialFocus", {
      hasFallback: true
    });
    if (node === false) {
      return false;
    }
    if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
        node = firstTabbableNode || getNodeForOption("fallbackFocus");
      }
    } else if (node === null) {
      node = getNodeForOption("fallbackFocus");
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions);
      var focusableNodes = focusable(container, config.tabbableOptions);
      var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
      var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
      var firstDomTabbableNode = focusableNodes.find(function(node) {
        return isTabbable(node);
      });
      var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
        return isTabbable(node);
      });
      var posTabIndexesFound = !!tabbableNodes.find(function(node) {
        return getTabIndex(node) > 0;
      });
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var nodeIdx = tabbableNodes.indexOf(node);
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                return isTabbable(el);
              });
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
              return isTabbable(el);
            });
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function(group) {
      return group.tabbableNodes.length > 0;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
    if (state.containerGroups.find(function(g) {
      return g.posTabIndexesFound;
    }) && state.containerGroups.length > 1) {
      throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
    }
  };
  var _getActiveElement = function getActiveElement(el) {
    var activeElement = el.activeElement;
    if (!activeElement) {
      return;
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return _getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  };
  var _tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }
    if (node === _getActiveElement(document)) {
      return;
    }
    if (!node || !node.focus) {
      _tryFocus(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus", {
      params: [previousActiveElement]
    });
    return node ? node : node === false ? false : previousActiveElement;
  };
  var findNextNavNode = function findNextNavNode2(_ref3) {
    var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
    target = target || getActualTarget(event);
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findContainerIndex(target, event);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (isBackward) {
        var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
          var firstTabbableNode = _ref4.firstTabbableNode;
          return target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false);
        }
      } else {
        var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
          var lastTabbableNode = _ref5.lastTabbableNode;
          return target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
        } else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target);
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    return destinationNode;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(event) {
    var target = getActualTarget(event);
    var targetContained = findContainerIndex(target, event) >= 0;
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      event.stopImmediatePropagation();
      var nextNode;
      var navAcrossContainers = true;
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
          var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
          if (tabbableNodes.length > 0) {
            var mruTabIdx = tabbableNodes.findIndex(function(node) {
              return node === state.mostRecentlyFocusedNode;
            });
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1];
                  navAcrossContainers = false;
                }
              } else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1];
                  navAcrossContainers = false;
                }
              }
            }
          }
        } else {
          if (!state.containerGroups.some(function(g) {
            return g.tabbableNodes.some(function(n) {
              return getTabIndex(n) > 0;
            });
          })) {
            navAcrossContainers = false;
          }
        }
      } else {
        navAcrossContainers = false;
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent)
        });
      }
      if (nextNode) {
        _tryFocus(nextNode);
      } else {
        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
      }
    }
    state.recentNavEvent = void 0;
  };
  var checkKeyNav = function checkKeyNav2(event) {
    var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    state.recentNavEvent = event;
    var destinationNode = findNextNavNode({
      event,
      isBackward
    });
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault();
      }
      _tryFocus(destinationNode);
    }
  };
  var checkTabKey = function checkTabKey2(event) {
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event));
    }
  };
  var checkEscapeKey = function checkEscapeKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault();
      trap.deactivate();
    }
  };
  var checkClick = function checkClick2(e) {
    var target = getActualTarget(e);
    if (findContainerIndex(target, e) >= 0) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trapStack, trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      _tryFocus(getInitialFocusNode());
    }) : _tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkTabKey, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var collectAdjacentElements = function collectAdjacentElements2(containers) {
    if (state.active && !state.paused) {
      trap._setSubtreeIsolation(false);
    }
    state.adjacentElements.clear();
    state.alreadySilent.clear();
    var containerAncestors = /* @__PURE__ */ new Set();
    var adjacentElements = /* @__PURE__ */ new Set();
    var _iterator = _createForOfIteratorHelper(containers), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var container = _step.value;
        containerAncestors.add(container);
        var insideShadowRoot = typeof ShadowRoot !== "undefined" && container.getRootNode() instanceof ShadowRoot;
        var current = container;
        while (current) {
          containerAncestors.add(current);
          var parent = current.parentElement;
          var siblings = [];
          if (parent) {
            siblings = parent.children;
          } else if (!parent && insideShadowRoot) {
            siblings = current.getRootNode().children;
            parent = current.getRootNode().host;
            insideShadowRoot = typeof ShadowRoot !== "undefined" && parent.getRootNode() instanceof ShadowRoot;
          }
          var _iterator2 = _createForOfIteratorHelper(siblings), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var child = _step2.value;
              adjacentElements.add(child);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          current = parent;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    containerAncestors.forEach(function(el) {
      adjacentElements["delete"](el);
    });
    state.adjacentElements = adjacentElements;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkTabKey, true);
    doc.removeEventListener("keydown", checkEscapeKey);
    return trap;
  };
  var checkDomRemoval = function checkDomRemoval2(mutations) {
    var isFocusedNodeRemoved = mutations.some(function(mutation) {
      var removedNodes = Array.from(mutation.removedNodes);
      return removedNodes.some(function(node) {
        return node === state.mostRecentlyFocusedNode;
      });
    });
    if (isFocusedNodeRemoved) {
      _tryFocus(getInitialFocusNode());
    }
  };
  var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
  var updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return;
    }
    mutationObserver.disconnect();
    if (state.active && !state.paused) {
      state.containers.map(function(container) {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true
        });
      });
    }
  };
  trap = {
    get active() {
      return state.active;
    },
    get paused() {
      return state.paused;
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      var preexistingTrap = activeFocusTraps.getActiveTrap(trapStack);
      var revertState = false;
      if (preexistingTrap && !preexistingTrap.paused) {
        var _preexistingTrap$_set;
        (_preexistingTrap$_set = preexistingTrap._setSubtreeIsolation) === null || _preexistingTrap$_set === void 0 || _preexistingTrap$_set.call(preexistingTrap, false);
        revertState = true;
      }
      try {
        if (!checkCanFocusTrap) {
          updateTabbableNodes();
        }
        state.active = true;
        state.paused = false;
        state.nodeFocusedBeforeActivation = _getActiveElement(doc);
        onActivate === null || onActivate === void 0 || onActivate();
        var finishActivation = function finishActivation2() {
          if (checkCanFocusTrap) {
            updateTabbableNodes();
          }
          addListeners();
          updateObservedNodes();
          if (config.isolateSubtrees) {
            trap._setSubtreeIsolation(true);
          }
          onPostActivate === null || onPostActivate === void 0 || onPostActivate();
        };
        if (checkCanFocusTrap) {
          checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
          return this;
        }
        finishActivation();
      } catch (error) {
        if (preexistingTrap === activeFocusTraps.getActiveTrap(trapStack) && revertState) {
          var _preexistingTrap$_set2;
          (_preexistingTrap$_set2 = preexistingTrap._setSubtreeIsolation) === null || _preexistingTrap$_set2 === void 0 || _preexistingTrap$_set2.call(preexistingTrap, true);
        }
        throw error;
      }
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      if (!state.paused) {
        trap._setSubtreeIsolation(false);
      }
      state.alreadySilent.clear();
      removeListeners();
      state.active = false;
      state.paused = false;
      updateObservedNodes();
      activeFocusTraps.deactivateTrap(trapStack, trap);
      var onDeactivate = getOption(options, "onDeactivate");
      var onPostDeactivate = getOption(options, "onPostDeactivate");
      var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
      var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
      onDeactivate === null || onDeactivate === void 0 || onDeactivate();
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause(pauseOptions) {
      if (!state.active) {
        return this;
      }
      state.manuallyPaused = true;
      return this._setPausedState(true, pauseOptions);
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.active) {
        return this;
      }
      state.manuallyPaused = false;
      if (trapStack[trapStack.length - 1] !== this) {
        return this;
      }
      return this._setPausedState(false, unpauseOptions);
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element) {
        return typeof element === "string" ? doc.querySelector(element) : element;
      });
      if (config.isolateSubtrees) {
        collectAdjacentElements(state.containers);
      }
      if (state.active) {
        updateTabbableNodes();
        if (config.isolateSubtrees && !state.paused) {
          trap._setSubtreeIsolation(true);
        }
      }
      updateObservedNodes();
      return this;
    }
  };
  Object.defineProperties(trap, {
    _isManuallyPaused: {
      value: function value() {
        return state.manuallyPaused;
      }
    },
    _setPausedState: {
      value: function value(paused, options) {
        if (state.paused === paused) {
          return this;
        }
        state.paused = paused;
        if (paused) {
          var onPause = getOption(options, "onPause");
          var onPostPause = getOption(options, "onPostPause");
          onPause === null || onPause === void 0 || onPause();
          removeListeners();
          updateObservedNodes();
          trap._setSubtreeIsolation(false);
          onPostPause === null || onPostPause === void 0 || onPostPause();
        } else {
          var onUnpause = getOption(options, "onUnpause");
          var onPostUnpause = getOption(options, "onPostUnpause");
          onUnpause === null || onUnpause === void 0 || onUnpause();
          trap._setSubtreeIsolation(true);
          updateTabbableNodes();
          addListeners();
          updateObservedNodes();
          onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
        }
        return this;
      }
    },
    _setSubtreeIsolation: {
      value: function value(isEnabled) {
        if (config.isolateSubtrees) {
          state.adjacentElements.forEach(function(el) {
            var _el$getAttribute;
            if (isEnabled) {
              switch (config.isolateSubtrees) {
                case "aria-hidden":
                  if (el.ariaHidden === "true" || ((_el$getAttribute = el.getAttribute("aria-hidden")) === null || _el$getAttribute === void 0 ? void 0 : _el$getAttribute.toLowerCase()) === "true") {
                    state.alreadySilent.add(el);
                  }
                  el.setAttribute("aria-hidden", "true");
                  break;
                default:
                  if (el.inert || el.hasAttribute("inert")) {
                    state.alreadySilent.add(el);
                  }
                  el.setAttribute("inert", true);
                  break;
              }
            } else {
              if (state.alreadySilent.has(el)) ;
              else {
                switch (config.isolateSubtrees) {
                  case "aria-hidden":
                    el.removeAttribute("aria-hidden");
                    break;
                  default:
                    el.removeAttribute("inert");
                    break;
                }
              }
            }
          });
        }
      }
    }
  });
  trap.updateContainerElements(elements);
  return trap;
};
function useFocusTrap(target, options = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = options;
  const hasFocus = ref(false);
  const isPaused = ref(false);
  const activate = (opts) => trap && trap.activate(opts);
  const deactivate = (opts) => trap && trap.deactivate(opts);
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.value = true;
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.value = false;
    }
  };
  watch(
    () => unrefElement(target),
    (el) => {
      if (!el)
        return;
      trap = createFocusTrap(el, {
        ...focusTrapOptions,
        onActivate() {
          hasFocus.value = true;
          if (options.onActivate)
            options.onActivate();
        },
        onDeactivate() {
          hasFocus.value = false;
          if (options.onDeactivate)
            options.onDeactivate();
        }
      });
      if (immediate)
        activate();
    },
    { flush: "post" }
  );
  tryOnScopeDispose(() => deactivate());
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause
  };
}
const uo = (e) => (...o) => {
  e && (e == null || e(...o), e = null);
}, q = () => {
};
function oe(e, o, l) {
  return e > l ? l : e < o ? o : e;
}
const we = (e) => typeof e == "string";
function fe(e, o) {
  var s;
  const l = ((s = $(e, o)) == null ? void 0 : s[0]) || o;
  e.push(l);
}
function $(e, o) {
  const l = e.indexOf(o);
  if (l !== -1)
    return e.splice(l, 1);
}
function Fe(e) {
  return Object.entries(e);
}
const co = {
  /**
   * @description Set `null | false` to disable teleport.
   * @default `'body'`
   * @example
   * ```js
   * teleportTo: '#modals'
   * ```
   */
  teleportTo: {
    type: [String, null, Boolean, Object],
    default: "body"
  },
  /**
   * @description An uniq name for the open/close a modal via vfm.open/vfm.close APIs.
   * @default `undefined`
   * @example Symbol: `Symbol('MyModal')`
   * @example String: `'AUniqString'`
   * @example Number: `300`
   */
  modalId: {
    type: [String, Number, Symbol],
    default: void 0
  },
  /**
   * @description Display the modal or not.
   * @default `undefined`
   * @example
   * ```js
   * const showModal = ref(false)
   * v-model="showModal"
   * ```
   */
  modelValue: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description Render the modal via `if` or `show`.
   * @default `'if'`
   * @example
   * ```js
   * displayDirective: 'if'
   * ```
   * @example
   * ```js
   * displayDirective: 'show'
   * ```
   */
  displayDirective: {
    type: String,
    default: "if",
    validator: (e) => ["if", "show", "visible"].includes(e)
  },
  /**
   * @description Hide the overlay or not.
   * @default `undefined`
   * @example
   * ```js
   * hideOverlay="true"
   * ```
   */
  hideOverlay: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description Customize the overlay behavior.
   */
  overlayBehavior: {
    type: String,
    default: "auto",
    validator: (e) => ["auto", "persist"].includes(e)
  },
  /**
   * @description Customize the overlay transition.
   * @default `undefined`
   */
  overlayTransition: {
    type: [String, Object],
    default: void 0
  },
  /**
   * @description Customize the content transition.
   * @default `undefined`
   */
  contentTransition: {
    type: [String, Object],
    default: void 0
  },
  /**
   * @description Bind class to vfm__overlay.
   * @default `undefined`
   */
  overlayClass: {
    type: void 0,
    default: void 0
  },
  /**
   * @description Bind class to vfm__content.
   * @default `undefined`
   */
  contentClass: {
    type: void 0,
    default: void 0
  },
  /**
   * @description Bind style to vfm__overlay.
   * @default `undefined`
   */
  overlayStyle: {
    type: [String, Object, Array],
    default: void 0
  },
  /**
   * @description Bind style to vfm__content.
   * @default `undefined`
   */
  contentStyle: {
    type: [String, Object, Array],
    default: void 0
  },
  /**
   * @description Is it allow to close the modal by clicking the overlay.
   * @default `true`
   */
  clickToClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description Is it allow to close the modal by keypress `esc`.
   * @default `true`
   */
  escToClose: {
    type: Boolean,
    default: true
  },
  /**
   * @description Is it allow to click outside of the vfm__content when the modal is opened
   * @default `'non-interactive'`
   */
  background: {
    type: String,
    default: "non-interactive",
    validator: (e) => ["interactive", "non-interactive"].includes(e)
  },
  /**
   * @description
   * * Use `{ disabled: true }` to disable the focusTrap.
   * * Checkout the createOptions type here https://github.com/focus-trap/focus-trap for more.
   * @default `{ allowOutsideClick: true }`
   */
  focusTrap: {
    type: [Boolean, Object],
    default: () => ({
      allowOutsideClick: true
    })
  },
  /**
   * @description Lock body scroll or not when the modal is opened.
   * @default `true`
   */
  lockScroll: {
    type: Boolean,
    default: true
  },
  /**
   * @description Creates a padding-right when scroll is locked to prevent the page from jumping
   * @default `true`
   */
  reserveScrollBarGap: {
    type: Boolean,
    default: true
  },
  /**
   * @description Define how to increase the zIndex when there are nested modals
   * @default `({ index }) => 1000 + 2 * index`
   */
  zIndexFn: {
    type: Function,
    default: ({ index: e }) => 1e3 + 2 * e
  },
  /**
   * @description The direction of swiping to close the modal
   * @default `none`
   * @example
   * Set swipeToClose="none" to disable swiping to close
   * ```js
   * swipeToClose="none"
   * ```
   */
  swipeToClose: {
    type: String,
    default: "none",
    validator: (e) => ["none", "up", "right", "down", "left"].includes(e)
  },
  /**
   * @description Threshold for swipe to close
   * @default `0`
   */
  threshold: {
    type: Number,
    default: 0
  },
  /**
   * @description If set `:showSwipeBanner="true"`, only allow clicking `swipe-banner` slot to swipe to close
   * @default `undefined`
   * @example
   * ```js
   * swipeToClose="right"
   * :showSwipeBanner="true"
   * ```
   * ```html
   * <VueFinalModal
   *   ...
   *   swipeToClose="right"
   *   :showSwipeBanner="true"
   * >
   *   <template #swipe-banner>
   *     <div style="position: absolute; height: 100%; top: 0; left: 0; width: 10px;" />
   *   </template>
   *   ...modal content
   * </VueFinalModal>
   * ```
   */
  showSwipeBanner: {
    type: Boolean,
    default: void 0
  },
  /**
   * @description When set `:preventNavigationGestures="true"`, there will be two invisible bars for prevent navigation gestures including swiping back/forward on mobile webkit. For example: Safari mobile.
   * @default `undefined`
   * @example
   * Set preventNavigationGestures="true" to prevent Safari navigation gestures including swiping back/forward.
   * ```js
   * :preventNavigationGestures="true"
   * ```
   */
  preventNavigationGestures: {
    type: Boolean,
    default: void 0
  }
};
function Oe(e = false) {
  const o = ref(e), l = ref(o.value ? 0 : void 0);
  return [o, l, {
    beforeEnter() {
      l.value = 1;
    },
    afterEnter() {
      l.value = 0;
    },
    beforeLeave() {
      l.value = 3;
    },
    afterLeave() {
      l.value = 2;
    }
  }];
}
function fo(e, o) {
  const { modelValueLocal: l, onEntering: s, onEnter: u, onLeaving: c, onLeave: a } = o, n = ref(l.value), [t, r, m] = Oe(n.value), [f, M, S] = Oe(n.value), V = computed(() => typeof e.contentTransition == "string" ? { name: e.contentTransition, appear: true } : { appear: true, ...e.contentTransition }), O = computed(() => typeof e.overlayTransition == "string" ? { name: e.overlayTransition, appear: true } : { appear: true, ...e.overlayTransition }), E = computed(
    () => (e.hideOverlay || M.value === 2) && r.value === 2
    /* Leave */
  );
  watch(
    E,
    (k) => {
      k && (n.value = false);
    }
  ), watch(r, (k) => {
    if (k === 1) {
      if (!n.value)
        return;
      s == null || s();
    } else if (k === 0) {
      if (!n.value)
        return;
      u == null || u();
    } else
      k === 3 ? c == null || c() : k === 2 && (a == null || a());
  });
  async function w() {
    n.value = true, await nextTick(), t.value = true, f.value = true;
  }
  function D() {
    t.value = false, f.value = false;
  }
  return {
    visible: n,
    contentVisible: t,
    contentListeners: m,
    contentTransition: V,
    overlayVisible: f,
    overlayListeners: S,
    overlayTransition: O,
    enterTransition: w,
    leaveTransition: D
  };
}
function vo(e, o, l) {
  const { vfmRootEl: s, vfmContentEl: u, visible: c, modelValueLocal: a } = l, n = ref();
  function t() {
    c.value && e.escToClose && (a.value = false);
  }
  function r(f) {
    n.value = f == null ? void 0 : f.target;
  }
  function m() {
    var f;
    n.value === s.value && (e.clickToClose ? a.value = false : ((f = u.value) == null || f.focus(), o("clickOutside")));
  }
  return {
    onEsc: t,
    onMouseupRoot: m,
    onMousedown: r
  };
}
function po(e, o, l) {
  let s = false;
  const { open: u, close: c } = l, a = ref(false), n = {
    get value() {
      return a.value;
    },
    set value(r) {
      t(r);
    }
  };
  function t(r) {
    (r ? u() : c()) ? (a.value = r, r !== e.modelValue && o("update:modelValue", r)) : (s = true, o("update:modelValue", !r), nextTick(() => {
      s = false;
    }));
  }
  return watch(() => e.modelValue, (r) => {
    s || (n.value = !!r);
  }), {
    modelValueLocal: n
  };
}
function yo(e, o) {
  if (e.focusTrap === false)
    return {
      focus() {
      },
      blur() {
      }
    };
  const { focusEl: l } = o, { hasFocus: s, activate: u, deactivate: c } = useFocusTrap(l, e.focusTrap);
  function a() {
    requestAnimationFrame(() => {
      u();
    });
  }
  function n() {
    s.value && c();
  }
  return { focus: a, blur: n };
}
let be = false;
if (typeof window < "u") {
  const e = {
    get passive() {
      be = true;
    }
  };
  window.addEventListener("testPassive", null, e), window.removeEventListener("testPassive", null, e);
}
const He = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
let j = [], le = false, ne = 0, je = -1, W, X;
const ho = (e) => {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return false;
  const o = window.getComputedStyle(e);
  return ["auto", "scroll"].includes(o.overflowY) && e.scrollHeight > e.clientHeight;
}, mo = (e, o) => !(e.scrollTop === 0 && o < 0 || e.scrollTop + e.clientHeight + o >= e.scrollHeight && o > 0), wo = (e) => {
  const o = [];
  for (; e; ) {
    if (o.push(e), e.classList.contains("vfm"))
      return o;
    e = e.parentElement;
  }
  return o;
}, bo = (e, o) => {
  let l = false;
  return wo(e).forEach((u) => {
    ho(u) && mo(u, o) && (l = true);
  }), l;
}, Ne = (e) => j.some(() => bo(e, -ne)), se = (e) => {
  const o = e || window.event;
  return Ne(o.target) || o.touches.length > 1 ? true : (o.preventDefault && o.preventDefault(), false);
}, To = (e) => {
  if (X === void 0) {
    const o = !!e && e.reserveScrollBarGap === true, l = window.innerWidth - document.documentElement.clientWidth;
    if (o && l > 0) {
      const s = parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"), 10);
      X = document.body.style.paddingRight, document.body.style.paddingRight = `${s + l}px`;
    }
  }
  W === void 0 && (W = document.body.style.overflow, document.body.style.overflow = "hidden");
}, So = () => {
  X !== void 0 && (document.body.style.paddingRight = X, X = void 0), W !== void 0 && (document.body.style.overflow = W, W = void 0);
}, Mo = (e) => e ? e.scrollHeight - e.scrollTop <= e.clientHeight : false, go = (e, o) => (ne = e.targetTouches[0].clientY - je, Ne(e.target) ? false : o && o.scrollTop === 0 && ne > 0 || Mo(o) && ne < 0 ? se(e) : (e.stopPropagation(), true)), Co = (e, o) => {
  if (!e) {
    console.error(
      "disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices."
    );
    return;
  }
  if (j.some((s) => s.targetElement === e))
    return;
  const l = {
    targetElement: e,
    options: o || {}
  };
  j = [...j, l], He ? (e.ontouchstart = (s) => {
    s.targetTouches.length === 1 && (je = s.targetTouches[0].clientY);
  }, e.ontouchmove = (s) => {
    s.targetTouches.length === 1 && go(s, e);
  }, le || (document.addEventListener("touchmove", se, be ? { passive: false } : void 0), le = true)) : To(o);
}, ko = (e) => {
  if (!e) {
    console.error(
      "enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices."
    );
    return;
  }
  j = j.filter((o) => o.targetElement !== e), He ? (e.ontouchstart = null, e.ontouchmove = null, le && j.length === 0 && (document.removeEventListener("touchmove", se, be ? { passive: false } : void 0), le = false)) : j.length || So();
};
function Vo(e, o) {
  const { lockScrollEl: l, modelValueLocal: s } = o;
  let u;
  watch(l, (n) => {
    n && (u = n);
  }, { immediate: true }), watch(() => e.lockScroll, (n) => {
    n ? a() : c();
  }), onBeforeUnmount(() => {
    c();
  });
  function c() {
    u && ko(u);
  }
  function a() {
    s.value && e.lockScroll && u && Co(u, {
      reserveScrollBarGap: e.reserveScrollBarGap,
      allowTouchMove: (n) => {
        for (; n && n !== document.body; ) {
          if (n.getAttribute("vfm-scroll-lock-ignore") !== null)
            return true;
          n = n.parentElement;
        }
        return false;
      }
    });
  }
  return {
    enableBodyScroll: c,
    disableBodyScroll: a
  };
}
function Eo(e) {
  const o = ref();
  function l(u) {
    var c;
    o.value = (c = e.zIndexFn) == null ? void 0 : c.call(e, { index: u <= -1 ? 0 : u });
  }
  function s() {
    o.value = void 0;
  }
  return {
    zIndex: o,
    refreshZIndex: l,
    resetZIndex: s
  };
}
const ve = {
  beforeMount(e, { value: o }, { transition: l }) {
    e._vov = e.style.visibility === "hidden" ? "" : e.style.visibility, l && o ? l.beforeEnter(e) : G(e, o);
  },
  mounted(e, { value: o }, { transition: l }) {
    l && o && l.enter(e);
  },
  updated(e, { value: o, oldValue: l }, { transition: s }) {
    !o != !l && (s ? o ? (s.beforeEnter(e), G(e, true), s.enter(e)) : s.leave(e, () => {
      G(e, false);
    }) : G(e, o));
  },
  beforeUnmount(e, { value: o }) {
    G(e, o);
  }
};
function G(e, o) {
  e.style.visibility = o ? e._vov : "hidden";
}
const De = (e) => {
  if (e instanceof MouseEvent) {
    const { clientX: o, clientY: l } = e;
    return { x: o, y: l };
  } else {
    const { clientX: o, clientY: l } = e.targetTouches[0];
    return { x: o, y: l };
  }
};
function Bo(e) {
  if (!e)
    return false;
  let o = false;
  const l = {
    get passive() {
      return o = true, false;
    }
  };
  return e.addEventListener("x", q, l), e.removeEventListener("x", q), o;
}
function Oo(e, {
  threshold: o = 0,
  onSwipeStart: l,
  onSwipe: s,
  onSwipeEnd: u,
  passive: c = true
}) {
  const a = reactive({ x: 0, y: 0 }), n = reactive({ x: 0, y: 0 }), t = computed(() => a.x - n.x), r = computed(() => a.y - n.y), { max: m, abs: f } = Math, M = computed(
    () => m(f(t.value), f(r.value)) >= o
  ), S = ref(false), V = computed(() => M.value ? f(t.value) > f(r.value) ? t.value > 0 ? "left" : "right" : r.value > 0 ? "up" : "down" : "none"), O = (p, h) => {
    a.x = p, a.y = h;
  }, E = (p, h) => {
    n.x = p, n.y = h;
  };
  let w, D;
  function k(p) {
    w.capture && !w.passive && p.preventDefault();
    const { x: h, y: R } = De(p);
    O(h, R), E(h, R), l == null || l(p), D = [
      useEventListener(e, "mousemove", P, w),
      useEventListener(e, "touchmove", P, w),
      useEventListener(e, "mouseup", i, w),
      useEventListener(e, "touchend", i, w),
      useEventListener(e, "touchcancel", i, w)
    ];
  }
  function P(p) {
    const { x: h, y: R } = De(p);
    E(h, R), !S.value && M.value && (S.value = true), S.value && (s == null || s(p));
  }
  function i(p) {
    S.value && (u == null || u(p, V.value)), S.value = false, D.forEach((h) => h());
  }
  let b = [];
  return onMounted(() => {
    const p = Bo(window == null ? void 0 : window.document);
    c ? w = p ? { passive: true } : { capture: false } : w = p ? { passive: false, capture: true } : { capture: true }, b = [
      useEventListener(e, "mousedown", k, w),
      useEventListener(e, "touchstart", k, w)
    ];
  }), {
    isSwiping: S,
    direction: V,
    coordsStart: a,
    coordsEnd: n,
    lengthX: t,
    lengthY: r,
    stop: () => {
      b.forEach((p) => p()), D.forEach((p) => p());
    }
  };
}
function Do(e, o) {
  const { vfmContentEl: l, modelValueLocal: s } = o, u = 0.1, c = 300, a = ref(), n = computed(() => {
    if (!(e.swipeToClose === void 0 || e.swipeToClose === "none"))
      return e.showSwipeBanner ? a.value : l.value;
  }), t = ref(0), r = ref(true);
  let m = q, f = true, M, S = false;
  const { lengthX: V, lengthY: O, direction: E, isSwiping: w } = Oo(n, {
    threshold: e.threshold,
    onSwipeStart(i) {
      m = useEventListener(document, "selectionchange", () => {
        var b;
        r.value = (b = window.getSelection()) == null ? void 0 : b.isCollapsed;
      }), M = (/* @__PURE__ */ new Date()).getTime(), S = P(i == null ? void 0 : i.target);
    },
    onSwipe() {
      var i, b, L, p;
      if (S && r.value && E.value === e.swipeToClose) {
        if (E.value === "up") {
          const h = oe(Math.abs(O.value || 0), 0, ((i = n.value) == null ? void 0 : i.offsetHeight) || 0) - (e.threshold || 0);
          t.value = h;
        } else if (E.value === "down") {
          const h = oe(Math.abs(O.value || 0), 0, ((b = n.value) == null ? void 0 : b.offsetHeight) || 0) - (e.threshold || 0);
          t.value = -h;
        } else if (E.value === "right") {
          const h = oe(Math.abs(V.value || 0), 0, ((L = n.value) == null ? void 0 : L.offsetWidth) || 0) - (e.threshold || 0);
          t.value = -h;
        } else if (E.value === "left") {
          const h = oe(Math.abs(V.value || 0), 0, ((p = n.value) == null ? void 0 : p.offsetWidth) || 0) - (e.threshold || 0);
          t.value = h;
        }
      }
    },
    onSwipeEnd(i, b) {
      if (m(), !r.value) {
        r.value = true;
        return;
      }
      const L = (/* @__PURE__ */ new Date()).getTime(), p = b === e.swipeToClose, h = (() => {
        var J, Q;
        if (b === "up" || b === "down")
          return Math.abs((O == null ? void 0 : O.value) || 0) > u * (((J = n.value) == null ? void 0 : J.offsetHeight) || 0);
        if (b === "left" || b === "right")
          return Math.abs((V == null ? void 0 : V.value) || 0) > u * (((Q = n.value) == null ? void 0 : Q.offsetWidth) || 0);
      })(), R = L - M <= c;
      if (f && S && p && (h || R)) {
        s.value = false;
        return;
      }
      t.value = 0;
    }
  }), D = computed(() => {
    if (e.swipeToClose === "none")
      return;
    const i = (() => {
      switch (e.swipeToClose) {
        case "up":
        case "down":
          return "translateY";
        case "left":
        case "right":
          return "translateX";
      }
    })();
    return {
      class: { "vfm-bounce-back": !w.value },
      style: { transform: `${i}(${-t.value}px)` }
    };
  });
  watch(
    () => r.value,
    (i) => {
      i || (t.value = 0);
    }
  ), watch(
    () => s.value,
    (i) => {
      i && (t.value = 0);
    }
  ), watch(
    () => t.value,
    (i, b) => {
      switch (e.swipeToClose) {
        case "down":
        case "right":
          f = i < b;
          break;
        case "up":
        case "left":
          f = i > b;
          break;
      }
    }
  );
  function k(i) {
    e.preventNavigationGestures && i.preventDefault();
  }
  function P(i) {
    const b = i == null ? void 0 : i.tagName;
    if (!b || ["INPUT", "TEXTAREA"].includes(b))
      return false;
    const L = (() => {
      switch (e.swipeToClose) {
        case "up":
          return (i == null ? void 0 : i.scrollTop) + (i == null ? void 0 : i.clientHeight) === (i == null ? void 0 : i.scrollHeight);
        case "left":
          return (i == null ? void 0 : i.scrollLeft) + (i == null ? void 0 : i.clientWidth) === (i == null ? void 0 : i.scrollWidth);
        case "down":
          return (i == null ? void 0 : i.scrollTop) === 0;
        case "right":
          return (i == null ? void 0 : i.scrollLeft) === 0;
        default:
          return false;
      }
    })();
    return i === n.value ? L : L && P(i == null ? void 0 : i.parentElement);
  }
  return {
    vfmContentEl: l,
    swipeBannerEl: a,
    bindSwipe: D,
    onTouchStartSwipeBanner: k
  };
}
const Ye = /* @__PURE__ */ Symbol("vfm");
let H;
const Lo = (e) => H = e, Po = {
  install: q,
  modals: [],
  openedModals: [],
  openedModalOverlays: [],
  dynamicModals: [],
  modalsContainers: ref([]),
  get: () => {
  },
  toggle: () => {
  },
  open: () => {
  },
  close: () => {
  },
  closeAll: () => Promise.allSettled([])
}, Ao = () => getCurrentInstance() && inject(Ye, Po) || H;
function zo() {
  const e = shallowReactive([]), o = shallowReactive([]), l = shallowReactive([]), s = shallowReactive([]), u = ref([]), c = markRaw({
    install(a) {
      a.provide(Ye, c), a.config.globalProperties.$vfm = c;
    },
    modals: e,
    openedModals: o,
    openedModalOverlays: l,
    dynamicModals: s,
    modalsContainers: u,
    get(a) {
      return e.find((n) => {
        var t, r;
        return ((r = (t = Z(n)) == null ? void 0 : t.value.modalId) == null ? void 0 : r.value) === a;
      });
    },
    toggle(a, n) {
      var r;
      const t = c.get(a);
      return (r = Z(t)) == null ? void 0 : r.value.toggle(n);
    },
    open(a) {
      return c.toggle(a, true);
    },
    close(a) {
      return c.toggle(a, false);
    },
    closeAll() {
      return Promise.allSettled(
        o.reduce((a, n) => {
          const t = Z(n), r = t == null ? void 0 : t.value.toggle(false);
          return r && a.push(r), a;
        }, [])
      );
    }
  });
  return Lo(c), c;
}
function Z(e) {
  var o;
  return (o = e == null ? void 0 : e.exposed) == null ? void 0 : o.modalExposed;
}
const Io = defineComponent({ inheritAttrs: false }), Ro = /* @__PURE__ */ defineComponent({
  ...Io,
  __name: "VueFinalModal",
  props: co,
  emits: ["update:modelValue", "beforeOpen", "opened", "beforeClose", "closed", "clickOutside"],
  setup(e, { expose: o, emit: l }) {
    const s = e, u = l, c = useAttrs(), a = getCurrentInstance(), { modals: n, openedModals: t, openedModalOverlays: r } = K(), m = ref(), f = ref(), { focus: M, blur: S } = yo(s, { focusEl: m }), { zIndex: V, refreshZIndex: O, resetZIndex: E } = Eo(s), { modelValueLocal: w } = po(s, u, { open: We, close: Xe }), { enableBodyScroll: D, disableBodyScroll: k } = Vo(s, {
      lockScrollEl: m,
      modelValueLocal: w
    });
    let P = q;
    const {
      visible: i,
      contentVisible: b,
      contentListeners: L,
      contentTransition: p,
      overlayVisible: h,
      overlayListeners: R,
      overlayTransition: J,
      enterTransition: Q,
      leaveTransition: xe
    } = fo(s, {
      modelValueLocal: w,
      onEntering() {
        nextTick(() => {
          k(), M();
        });
      },
      onEnter() {
        u("opened"), P("opened");
      },
      onLeave() {
        $(t, a), E(), D(), u("closed"), P("closed");
      }
    }), { onEsc: ze, onMouseupRoot: Ge, onMousedown: Te } = vo(s, u, { vfmRootEl: m, vfmContentEl: f, visible: i, modelValueLocal: w }), {
      swipeBannerEl: $e,
      bindSwipe: Ue,
      onTouchStartSwipeBanner: Se
    } = Do(s, { vfmContentEl: f, modelValueLocal: w }), Me = computed(() => a ? t.indexOf(a) : -1);
    watch([() => s.zIndexFn, Me], () => {
      i.value && O(Me.value);
    }), onMounted(() => {
      fe(n, a);
    }), s.modelValue && (w.value = true);
    function We() {
      let d = false;
      return u("beforeOpen", { stop: () => d = true }), d ? false : (fe(t, a), fe(r, a), ie(), Q(), true);
    }
    function Xe() {
      let d = false;
      return u("beforeClose", { stop: () => d = true }), d ? false : ($(r, a), ie(), S(), xe(), true);
    }
    function Ze() {
      w.value = false;
    }
    onBeforeUnmount(() => {
      D(), $(n, a), $(t, a), S(), ie();
    });
    async function ie() {
      await nextTick();
      const d = r.filter((y) => {
        var A;
        const T = Z(y);
        return (T == null ? void 0 : T.value.overlayBehavior.value) === "auto" && !((A = T == null ? void 0 : T.value.hideOverlay) != null && A.value);
      });
      d.forEach((y, T) => {
        const A = Z(y);
        A != null && A.value && (A.value.overlayVisible.value = T === d.length - 1);
      });
    }
    const Ke = toRef(() => s.modalId), ge = toRef(() => s.hideOverlay), qe = toRef(() => s.overlayBehavior), Je = computed(() => ({
      modalId: Ke,
      hideOverlay: ge,
      overlayBehavior: qe,
      overlayVisible: h,
      toggle(d) {
        return new Promise((y) => {
          P = uo((A) => y(A));
          const T = typeof d == "boolean" ? d : !w.value;
          w.value = T;
        });
      }
    }));
    return o({
      modalExposed: Je
    }), (d, y) => (openBlock(), createBlock(Teleport, {
      to: d.teleportTo ? d.teleportTo : void 0,
      disabled: !d.teleportTo
    }, [
      d.displayDirective !== "if" || unref(i) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({ key: 0 }, unref(c), {
        ref_key: "vfmRootEl",
        ref: m,
        class: ["vfm vfm--fixed vfm--inset", { "vfm--prevent-none": d.background === "interactive" }],
        style: { zIndex: unref(V) },
        role: "dialog",
        "aria-modal": "true",
        onKeydown: y[7] || (y[7] = withKeys(() => unref(ze)(), ["esc"])),
        onMouseup: y[8] || (y[8] = withModifiers(() => unref(Ge)(), ["self"])),
        onMousedown: y[9] || (y[9] = withModifiers((T) => unref(Te)(T), ["self"]))
      }), [
        ge.value ? createCommentVNode("", true) : (openBlock(), createBlock(Transition, mergeProps({ key: 0 }, unref(J), toHandlers(unref(R))), {
          default: withCtx(() => [
            d.displayDirective !== "if" || unref(h) ? withDirectives((openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none", d.overlayClass]),
              style: normalizeStyle(d.overlayStyle),
              "aria-hidden": "true"
            }, null, 6)), [
              [vShow, d.displayDirective !== "show" || unref(h)],
              [unref(ve), d.displayDirective !== "visible" || unref(h)]
            ]) : createCommentVNode("", true)
          ]),
          _: 1
        }, 16)),
        createVNode(Transition, mergeProps(unref(p), toHandlers(unref(L))), {
          default: withCtx(() => [
            d.displayDirective !== "if" || unref(b) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              ref_key: "vfmContentEl",
              ref: f,
              class: ["vfm__content vfm--outline-none", [d.contentClass, { "vfm--prevent-auto": d.background === "interactive" }]],
              style: d.contentStyle,
              tabindex: "0"
            }, unref(Ue), {
              onMousedown: y[6] || (y[6] = () => unref(Te)())
            }), [
              renderSlot(d.$slots, "default", normalizeProps(guardReactiveProps({ close: Ze }))),
              d.showSwipeBanner ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "swipeBannerEl",
                ref: $e,
                class: "vfm-swipe-banner-container",
                onTouchstart: y[2] || (y[2] = (T) => unref(Se)(T))
              }, [
                renderSlot(d.$slots, "swipe-banner", {}, () => [
                  createBaseVNode("div", {
                    class: "vfm-swipe-banner-back",
                    onTouchstart: y[0] || (y[0] = (T) => d.swipeToClose === "left" && T.preventDefault())
                  }, null, 32),
                  createBaseVNode("div", {
                    class: "vfm-swipe-banner-forward",
                    onTouchstart: y[1] || (y[1] = (T) => d.swipeToClose === "right" && T.preventDefault())
                  }, null, 32)
                ])
              ], 544)) : !d.showSwipeBanner && d.preventNavigationGestures ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "vfm-swipe-banner-container",
                onTouchstart: y[5] || (y[5] = (T) => unref(Se)(T))
              }, [
                createBaseVNode("div", {
                  class: "vfm-swipe-banner-back",
                  onTouchstart: y[3] || (y[3] = (T) => d.swipeToClose === "left" && T.preventDefault())
                }, null, 32),
                createBaseVNode("div", {
                  class: "vfm-swipe-banner-forward",
                  onTouchstart: y[4] || (y[4] = (T) => d.swipeToClose === "right" && T.preventDefault())
                }, null, 32)
              ], 32)) : createCommentVNode("", true)
            ], 16)), [
              [vShow, d.displayDirective !== "show" || unref(b)],
              [unref(ve), d.displayDirective !== "visible" || unref(b)]
            ]) : createCommentVNode("", true)
          ]),
          _: 3
        }, 16)
      ], 16)), [
        [vShow, d.displayDirective !== "show" || unref(i)],
        [unref(ve), d.displayDirective !== "visible" || unref(i)]
      ]) : createCommentVNode("", true)
    ], 8, ["to", "disabled"]));
  }
});
function K() {
  const e = Ao();
  if (!e)
    throw new Error(
      `[Vue Final Modal]: getActiveVfm was called with no active Vfm. Did you forget to install vfm?
	const vfm = createVfm()
	app.use(vfm)
This will fail in production.`
    );
  return e;
}
function Le(e, o = Ro) {
  const { component: l, slots: s, ...u } = e, c = typeof s > "u" ? {} : Object.fromEntries(Fe(s).map(([a, n]) => we(n) ? [a, n] : re(n) ? [a, {
    ...n,
    component: markRaw(n.component)
  }] : [a, markRaw(n)]));
  return {
    ...u,
    component: markRaw(l || o),
    slots: c
  };
}
function Go(e) {
  const o = reactive({
    id: /* @__PURE__ */ Symbol("useModal"),
    modelValue: !!(e != null && e.defaultModelValue),
    resolveOpened: () => {
    },
    resolveClosed: () => {
    },
    attrs: {},
    ...Le(e)
  });
  tryOnUnmounted(() => {
    o != null && o.keepAlive || n();
  }), o.modelValue === true && (H ? H == null || H.dynamicModals.push(o) : nextTick(() => {
    const t = K();
    t == null || t.dynamicModals.push(o);
  }));
  async function l() {
    let t;
    return H ? t = H : (await nextTick(), t = K()), o.modelValue ? Promise.resolve("[Vue Final Modal] modal is already opened.") : (n(), o.modelValue = true, t.dynamicModals.push(o), new Promise((r) => {
      o.resolveOpened = () => r("opened");
    }));
  }
  function s() {
    return o.modelValue ? (o.modelValue = false, new Promise((t) => {
      o.resolveClosed = () => t("closed");
    })) : Promise.resolve("[Vue Final Modal] modal is already closed.");
  }
  function u(t) {
    const { slots: r, ...m } = Le(t, o.component);
    t.defaultModelValue !== void 0 && (o.defaultModelValue = t.defaultModelValue), (t == null ? void 0 : t.keepAlive) !== void 0 && (o.keepAlive = t == null ? void 0 : t.keepAlive), c(o, m), r && Fe(r).forEach(([f, M]) => {
      const S = o.slots[f];
      we(S) ? o.slots[f] = M : re(S) && re(M) ? c(S, M) : o.slots[f] = M;
    });
  }
  function c(t, r) {
    r.component && (t.component = r.component), r.attrs && a(t.attrs, r.attrs);
  }
  function a(t, r) {
    return Object.entries(r).forEach(([m, f]) => {
      t[m] = f;
    }), t;
  }
  function n() {
    const t = K(), r = t.dynamicModals.indexOf(o);
    r !== -1 && t.dynamicModals.splice(r, 1);
  }
  return {
    options: o,
    open: l,
    close: s,
    patchOptions: u,
    destroy: n
  };
}
function re(e) {
  return typeof e == "object" && e !== null ? "component" in e : false;
}
const jo = ["innerHTML"], Wo = /* @__PURE__ */ defineComponent({
  __name: "ModalsContainer",
  setup(e) {
    const { modalsContainers: o, dynamicModals: l } = K(), s = /* @__PURE__ */ Symbol("ModalsContainer"), u = computed(() => {
      var n;
      return s === ((n = o.value) == null ? void 0 : n[0]);
    });
    o.value.push(s), onBeforeUnmount(() => {
      o.value = o.value.filter((n) => n !== s);
    });
    function c(n) {
      var t, r, m;
      (r = (t = l[n]) == null ? void 0 : t.resolveClosed) == null || r.call(t), (m = l[n]) != null && m.keepAlive || l.splice(n, 1);
    }
    function a(n) {
      var t, r;
      (r = (t = l[n]) == null ? void 0 : t.resolveOpened) == null || r.call(t);
    }
    return (n, t) => u.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(unref(l), (r, m) => (openBlock(), createBlock(resolveDynamicComponent(r.component), mergeProps({
      key: r.id
    }, {
      displayDirective: r != null && r.keepAlive ? "show" : void 0,
      ...typeof r.attrs == "object" ? r.attrs : {}
    }, {
      modelValue: r.modelValue,
      "onUpdate:modelValue": (f) => r.modelValue = f,
      onClosed: () => c(m),
      onOpened: () => a(m)
    }), createSlots({ _: 2 }, [
      renderList(r.slots, (f, M) => ({
        name: M,
        fn: withCtx(() => [
          unref(we)(f) ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: f
          }, null, 8, jo)) : unref(re)(f) ? (openBlock(), createBlock(resolveDynamicComponent(f.component), normalizeProps(mergeProps({ key: 1 }, f.attrs)), null, 16)) : (openBlock(), createBlock(resolveDynamicComponent(f), { key: 2 }))
        ])
      }))
    ]), 1040, ["modelValue", "onUpdate:modelValue", "onClosed", "onOpened"]))), 128)) : createCommentVNode("", true);
  }
});
const OverviewReport = () => __vitePreload(() => import("./chunks/OverviewReport-pdTGwtj1.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11]) : void 0, import.meta.url);
const routes = [
  {
    path: "/",
    name: "overview-report",
    component: OverviewReport,
    meta: {
      title: "Overview Report",
      requiresAuth: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];
const _hoisted_1$a = {
  key: 0,
  class: "submenu"
};
const _hoisted_2$a = ["href"];
const _hoisted_3$8 = { class: "submenu_title" };
const _hoisted_4$4 = { class: "submenu_text" };
const reportsBaseUrl$1 = "admin.php?page=monsterinsights_reports#";
const _sfc_main$b = {
  __name: "ReportNavigationSubmenu",
  props: {
    menuId: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    submenuIndex: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const sharedState = inject("sharedState");
    const isActive = computed(() => {
      return sharedState.active === props.submenuIndex;
    });
    function getFullUrl(path) {
      return reportsBaseUrl$1 + path;
    }
    return (_ctx, _cache) => {
      return isActive.value ? (openBlock(), createElementBlock("ul", _hoisted_1$a, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, itemIndex) => {
          return openBlock(), createElementBlock("li", {
            key: __props.menuId + itemIndex
          }, [
            createBaseVNode("a", {
              href: getFullUrl(item.to)
            }, [
              createBaseVNode("span", _hoisted_3$8, toDisplayString(item.label), 1),
              createBaseVNode("span", _hoisted_4$4, toDisplayString(item.description), 1)
            ], 8, _hoisted_2$a)
          ]);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$9 = ["href"];
const _hoisted_2$9 = ["onClick"];
const reportsBaseUrl = "admin.php?page=monsterinsights_reports#";
const _sfc_main$a = {
  __name: "ReportNavigationMenu",
  props: {
    menuId: {
      type: String,
      required: true
    },
    menuData: {
      type: Array,
      required: true
    },
    navClass: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const menuRef = ref(null);
    const sharedState = reactive({
      active: null
    });
    provide("sharedState", sharedState);
    function getFullUrl(path) {
      return reportsBaseUrl + path;
    }
    function hasActiveChild(children) {
      if (children.length === 0) {
        return false;
      }
      const currentHash = window.location.hash.replace("#", "");
      return children.find((child) => child.to === currentHash);
    }
    function itemClasses(item) {
      if (hasActiveChild(item.children)) {
        return "active";
      }
      return "";
    }
    function menuToggle(index) {
      if (sharedState.active !== index) {
        sharedState.active = index;
      } else {
        sharedState.active = null;
      }
    }
    function closeMenu() {
      sharedState.active = null;
    }
    function handleClickOutside(event) {
      if (menuRef.value && !menuRef.value.contains(event.target)) {
        closeMenu();
      }
    }
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "menuRef",
        ref: menuRef
      }, [
        createBaseVNode("ul", {
          class: normalizeClass(__props.navClass)
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.menuData, (item, index) => {
            return openBlock(), createElementBlock("li", {
              key: __props.menuId + index
            }, [
              item.children.length === 0 ? (openBlock(), createElementBlock("a", {
                key: 0,
                href: getFullUrl(item.to),
                class: normalizeClass(item.class)
              }, toDisplayString(item.label), 11, _hoisted_1$9)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass(itemClasses(item)),
                onClick: ($event) => menuToggle(index)
              }, [
                renderSlot(_ctx.$slots, "menuToggler", {}, () => [
                  createBaseVNode("button", null, [
                    createTextVNode(toDisplayString(item.label) + " ", 1),
                    _cache[0] || (_cache[0] = createBaseVNode("span", { class: "caret" }, [
                      createBaseVNode("svg", {
                        width: "10",
                        height: "6",
                        viewBox: "0 0 10 6",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createBaseVNode("path", {
                          d: "M9 1L5 5L1 1",
                          stroke: "#8EA4B4",
                          "stroke-width": "2",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round"
                        })
                      ])
                    ], -1))
                  ])
                ]),
                createVNode(_sfc_main$b, {
                  items: item.children,
                  "menu-id": __props.menuId,
                  "submenu-index": index
                }, null, 8, ["items", "menu-id", "submenu-index"])
              ], 10, _hoisted_2$9))
            ]);
          }), 128))
        ], 2)
      ], 512);
    };
  }
};
const { __: __$1 } = wp.i18n;
function getMenuData() {
  const baseMenu = [
    {
      id: "overview",
      label: __$1("Overview", "google-analytics-for-wordpress"),
      to: "/monsterinsights_overview_report",
      children: [],
      class: "monsterinsights-navigation-tab-link router-link-exact-active"
    },
    {
      id: "traffic",
      label: __$1("Traffic", "google-analytics-for-wordpress"),
      children: [
        {
          label: __$1("Overview", "google-analytics-for-wordpress"),
          to: "/traffic-overview",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See how customers find your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Technology", "google-analytics-for-wordpress"),
          to: "/traffic-technology",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("Uncover the devices and browsers your visitors are utilizing.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Landing Page Details", "google-analytics-for-wordpress"),
          to: "/traffic-landing-pages",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See the first page visitors land when visiting your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Campaigns", "google-analytics-for-wordpress"),
          to: "/traffic-campaign",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("Easily measure the effectiveness of your marketing efforts.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Source / Medium", "google-analytics-for-wordpress"),
          to: "/traffic-source-medium",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("Details about referring traffic to your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Social", "google-analytics-for-wordpress"),
          to: "/traffic-social",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("Details about social traffic to your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("AI Traffic", "google-analytics-for-wordpress"),
          to: "/traffic-ai",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See AI Tool Traffic Stats.", "google-analytics-for-wordpress")
        }
      ],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "Publishers",
      label: __$1("Publishers", "google-analytics-for-wordpress"),
      children: [
        {
          label: __$1("Overview", "google-analytics-for-wordpress"),
          to: "/publishers",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See how visitors interact with your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Pages Report", "google-analytics-for-wordpress"),
          to: "/publishers-pages",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("The most popular pages on your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Country Report", "google-analytics-for-wordpress"),
          to: "/countries",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which countries your visitors come from.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Events", "google-analytics-for-wordpress"),
          to: "/custom-events",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See your custom events and performance", "google-analytics-for-wordpress")
        }
      ],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "search-console",
      label: __$1("Search Console", "google-analytics-for-wordpress"),
      to: "/search-console",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "ecommerce",
      label: __$1("eCommerce", "google-analytics-for-wordpress"),
      children: [
        {
          label: __$1("Overview", "google-analytics-for-wordpress"),
          to: "/ecommerce",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See how your store is performing.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Coupons", "google-analytics-for-wordpress"),
          to: "/ecommerce-coupons",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See the coupons and discounts being used on your website.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Cart Abandonment", "google-analytics-for-wordpress"),
          to: "/cart-abandonment",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which products are abandoned the most.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Funnel", "google-analytics-for-wordpress"),
          to: "/ecommerce-funnel",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("Visually measure how customers convert in your store.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Orders by Location", "google-analytics-for-wordpress"),
          to: "/ecommerce-purchases-by-location",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which cities and countries make up your store's sales.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("User Journeys", "google-analytics-for-wordpress"),
          to: "/user-journey-report",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See every step your visitors take with User Journeys.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Spend by Day", "google-analytics-for-wordpress"),
          to: "/ecommerce-spend-by-day",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which days are most profitable for your store.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Spend by Hour", "google-analytics-for-wordpress"),
          to: "/ecommerce-spend-by-hour",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which hours are most profitable for your store.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Refunds", "google-analytics-for-wordpress"),
          to: "/ecommerce-refunds",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which products are most frequently refunded.", "google-analytics-for-wordpress")
        },
        {
          label: __$1("Refunds by Geo", "google-analytics-for-wordpress"),
          to: "/ecommerce-refunds-by-geo",
          children: [],
          class: "monsterinsights-navigation-submenu-link",
          description: __$1("See which cities and countries make up your store's refunds.", "google-analytics-for-wordpress")
        }
      ],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "dimensions",
      label: __$1("Dimensions", "google-analytics-for-wordpress"),
      to: "/dimensions",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "forms",
      label: __$1("Forms", "google-analytics-for-wordpress"),
      to: "/forms",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "realtime",
      label: __$1("Realtime", "google-analytics-for-wordpress"),
      to: "/real-time",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "site-speed",
      label: __$1("Site Speed", "google-analytics-for-wordpress"),
      to: "/site-speed",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "media",
      label: __$1("Media", "google-analytics-for-wordpress"),
      to: "/media",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    },
    {
      id: "exceptions",
      label: __$1("Exceptions", "google-analytics-for-wordpress"),
      to: "/exceptions",
      children: [],
      class: "monsterinsights-navigation-tab-link"
    }
  ];
  getMiGlobal("addons_pre_check", {}).woo_product_feed_pro;
  isNetworkAdmin() ? getMiGlobal("license_network", {}).type : getMiGlobal("license", {}).type;
  return baseMenu;
}
const _hoisted_1$8 = { class: "monsterinsights-navigation-bar" };
const _hoisted_2$8 = { class: "monsterinsights-container" };
const _hoisted_3$7 = {
  key: 0,
  class: "monsterinsights-route-title"
};
const _sfc_main$9 = {
  __name: "ReportsNavigation",
  setup(__props) {
    const menuData = getMenuData();
    const navOpen = ref(false);
    const routeTitle = computed(() => {
      return "";
    });
    const navClass = computed(() => {
      let cls = "monsterinsights-main-navigation monsterinsights-reports-navigation";
      if (navOpen.value) {
        cls += " monsterinsights-main-navigation-open";
      }
      return cls;
    });
    const buttonIconClass = computed(() => {
      let cls = "monstericon-arrow";
      if (navOpen.value) {
        cls += " monstericon-down";
      }
      return cls;
    });
    const triggerClass = computed(() => {
      let cls = "monsterinsights-mobile-nav-trigger";
      if (navOpen.value) {
        cls += " monsterinsights-mobile-nav-trigger-open";
      }
      return cls;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("nav", null, [
            createBaseVNode("button", {
              class: normalizeClass(triggerClass.value),
              onClick: _cache[0] || (_cache[0] = ($event) => navOpen.value = !navOpen.value)
            }, [
              routeTitle.value ? (openBlock(), createElementBlock("span", _hoisted_3$7, toDisplayString(routeTitle.value), 1)) : createCommentVNode("", true),
              createBaseVNode("i", {
                class: normalizeClass(buttonIconClass.value)
              }, null, 2)
            ], 2),
            createVNode(_sfc_main$a, {
              "menu-id": "monsterinsights-top-menu",
              "menu-data": unref(menuData),
              "nav-class": navClass.value
            }, null, 8, ["menu-data", "nav-class"])
          ])
        ])
      ]);
    };
  }
};
const _hoisted_1$7 = ["disabled", "aria-expanded"];
const _hoisted_2$7 = {
  key: 0,
  class: "monsterinsights-searchable-select__dropdown",
  role: "listbox"
};
const _hoisted_3$6 = { class: "monsterinsights-searchable-select__search-wrapper" };
const _hoisted_4$3 = ["placeholder"];
const _hoisted_5$3 = ["aria-selected", "onClick", "onMouseenter"];
const _hoisted_6$2 = {
  key: 0,
  class: "monsterinsights-searchable-select__no-results"
};
const _sfc_main$8 = {
  __name: "SearchableSelect",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    searchPlaceholder: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const containerRef = ref(null);
    const searchInputRef = ref(null);
    const optionsRef = ref(null);
    const isOpen = ref(false);
    const searchQuery = ref("");
    const highlightedIndex = ref(0);
    const displayLabel = computed(() => {
      if (!props.modelValue) {
        return props.placeholder || __$2("Select...", "google-analytics-for-wordpress");
      }
      const found = props.options.find((opt) => opt.value === props.modelValue);
      return found ? found.label : props.modelValue;
    });
    const filteredOptions = computed(() => {
      if (!searchQuery.value) return props.options;
      const query = searchQuery.value.toLowerCase();
      return props.options.filter(
        (opt) => opt.label.toLowerCase().includes(query) || opt.value.toLowerCase().includes(query)
      );
    });
    watch(searchQuery, () => {
      highlightedIndex.value = 0;
    });
    function toggleDropdown() {
      if (props.disabled) return;
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        searchQuery.value = "";
        highlightedIndex.value = 0;
        nextTick(() => {
          searchInputRef.value?.focus();
        });
      }
    }
    function closeDropdown() {
      isOpen.value = false;
      searchQuery.value = "";
    }
    function selectOption(opt) {
      emit("update:modelValue", opt.value);
      closeDropdown();
    }
    function handleSearchKeydown(event) {
      const opts = filteredOptions.value;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          highlightedIndex.value = Math.min(highlightedIndex.value + 1, opts.length - 1);
          scrollHighlightedIntoView();
          break;
        case "ArrowUp":
          event.preventDefault();
          highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0);
          scrollHighlightedIntoView();
          break;
        case "Enter":
          event.preventDefault();
          if (opts[highlightedIndex.value]) {
            selectOption(opts[highlightedIndex.value]);
          }
          break;
        case "Escape":
          event.preventDefault();
          event.stopPropagation();
          closeDropdown();
          break;
      }
    }
    function scrollHighlightedIntoView() {
      nextTick(() => {
        const container = optionsRef.value;
        if (!container) return;
        const highlighted = container.children[highlightedIndex.value];
        if (highlighted) {
          highlighted.scrollIntoView({ block: "nearest" });
        }
      });
    }
    function handleClickOutside(event) {
      if (containerRef.value && !containerRef.value.contains(event.target)) {
        closeDropdown();
      }
    }
    onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("mousedown", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "containerRef",
        ref: containerRef,
        class: normalizeClass(["monsterinsights-searchable-select", {
          "monsterinsights-searchable-select--open": isOpen.value,
          "monsterinsights-searchable-select--disabled": __props.disabled
        }])
      }, [
        createBaseVNode("button", {
          type: "button",
          class: "monsterinsights-searchable-select__trigger",
          disabled: __props.disabled,
          "aria-expanded": isOpen.value,
          "aria-haspopup": "listbox",
          onClick: toggleDropdown
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["monsterinsights-searchable-select__value", { "monsterinsights-searchable-select__value--placeholder": !__props.modelValue }])
          }, toDisplayString(displayLabel.value), 3),
          createVNode(Icon, {
            name: "chevron-down",
            size: 16
          })
        ], 8, _hoisted_1$7),
        isOpen.value ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
          createBaseVNode("div", _hoisted_3$6, [
            createVNode(Icon, {
              name: "search",
              size: 16
            }),
            withDirectives(createBaseVNode("input", {
              ref_key: "searchInputRef",
              ref: searchInputRef,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
              type: "text",
              class: "monsterinsights-searchable-select__search",
              placeholder: __props.searchPlaceholder || unref(__$2)("Search...", "google-analytics-for-wordpress"),
              onKeydown: handleSearchKeydown
            }, null, 40, _hoisted_4$3), [
              [vModelText, searchQuery.value]
            ])
          ]),
          createBaseVNode("div", {
            class: "monsterinsights-searchable-select__options",
            ref_key: "optionsRef",
            ref: optionsRef
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredOptions.value, (opt, idx) => {
              return openBlock(), createElementBlock("button", {
                key: opt.value,
                type: "button",
                class: normalizeClass(["monsterinsights-searchable-select__option", {
                  "monsterinsights-searchable-select__option--highlighted": idx === highlightedIndex.value,
                  "monsterinsights-searchable-select__option--selected": opt.value === __props.modelValue
                }]),
                role: "option",
                "aria-selected": opt.value === __props.modelValue,
                onClick: ($event) => selectOption(opt),
                onMouseenter: ($event) => highlightedIndex.value = idx
              }, toDisplayString(opt.label), 43, _hoisted_5$3);
            }), 128)),
            filteredOptions.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_6$2, toDisplayString(unref(__$2)("No results found", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true)
          ], 512)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const DEFAULT_ECOMMERCE_FUNNEL = {
  id: "default-ecommerce",
  name: "eCommerce",
  steps: [
    { type: "event", value: "view_item" },
    { type: "event", value: "add_to_cart" },
    { type: "event", value: "purchase" }
  ]
};
function computePreviousPeriod(start, end) {
  if (!start || !end) {
    return { compareStart: "", compareEnd: "" };
  }
  const startM = hooks(start);
  const endM = hooks(end);
  const days = endM.diff(startM, "days") + 1;
  const compareEndM = startM.clone().subtract(1, "days");
  const compareStartM = compareEndM.clone().subtract(days - 1, "days");
  return {
    compareStart: compareStartM.format("YYYY-MM-DD"),
    compareEnd: compareEndM.format("YYYY-MM-DD")
  };
}
const useOverviewReportStore = defineStore("overviewReport", {
  state: () => {
    const last30 = dateIntervals.last30days;
    return {
      // Shared date range state
      dateRange: {
        interval: "last30days",
        start: last30.start.format("YYYY-MM-DD"),
        end: last30.end.format("YYYY-MM-DD"),
        compareStart: last30.compareStart?.format("YYYY-MM-DD") ?? "",
        compareEnd: last30.compareEnd?.format("YYYY-MM-DD") ?? "",
        compareReport: false
      },
      // Pro feature modal
      showProModal: false,
      // Raw API data from each data source
      marketingCampaigns: null,
      // { campaign, source, medium, term, content }
      pages: null,
      // { landingPage, pageLocation, pageTitle, queryString }
      customDimensions: null,
      // { loggedIn, postType, author, category, tags, focusKeyword, dayOfWeek, seoScore, focusKeyphrase }
      formSubmissions: null,
      // raw form submissions API response
      demographics: null,
      // { country, state, newVsReturning }
      devices: null,
      // { browser, os, size }
      ecommerceOverview: null,
      // { log: { date, sourceMedium, campaign }, data: ecommerce_data }
      // Active filters applied by the user
      activeFilters: [],
      // Array of { type, condition, value }
      activeDevice: "",
      // Device filter (desktop, mobile, tablet)
      chartActiveTab: "traffic",
      // Tab above the chart
      // Funnel data
      funnels: [],
      // Array of saved funnels from DB { id, name, steps: [{ type, value }] }
      activeFunnelId: null
      // Currently selected/applied funnel ID
    };
  },
  getters: {
    /**
     * Whether any filters are currently active.
     */
    hasActiveFilters: (state) => {
      return state.activeFilters.length > 0 || state.activeDevice !== "";
    },
    getChartActiveTab: (state) => {
      return state.chartActiveTab;
    },
    /**
     * Get the currently active funnel object.
     */
    activeFunnel: (state) => {
      if (!state.activeFunnelId) {
        return null;
      }
      return state.funnels.find((f) => f.id === state.activeFunnelId) || null;
    }
  },
  actions: {
    setMarketingCampaigns(data) {
      this.marketingCampaigns = data;
    },
    setPages(data) {
      this.pages = data;
    },
    setCustomDimensions(data) {
      this.customDimensions = data;
    },
    setFormSubmissions(data) {
      this.formSubmissions = data;
    },
    setDemographics(data) {
      this.demographics = data;
    },
    setDevices(data) {
      this.devices = data;
    },
    setEcommerceOverview(data) {
      this.ecommerceOverview = data;
    },
    setActiveFilters(filters, device = "") {
      this.activeFilters = filters;
      this.activeDevice = device;
    },
    clearFilters() {
      this.activeFilters = [];
      this.activeDevice = "";
    },
    setChartActiveTab(tab) {
      this.chartActiveTab = tab;
    },
    setFunnels(funnels) {
      const saved = Array.isArray(funnels) ? funnels.filter((f) => f.id !== DEFAULT_ECOMMERCE_FUNNEL.id) : [];
      this.funnels = [DEFAULT_ECOMMERCE_FUNNEL, ...saved];
      const storedId = localStorage.getItem("mi_active_funnel_id");
      if (storedId && this.funnels.some((f) => String(f.id) === storedId)) {
        this.activeFunnelId = storedId === DEFAULT_ECOMMERCE_FUNNEL.id ? storedId : Number(storedId) || storedId;
      } else if (!this.activeFunnelId || !this.funnels.some((f) => f.id === this.activeFunnelId)) {
        this.activeFunnelId = this.funnels[0].id;
      }
    },
    setActiveFunnelId(id) {
      this.activeFunnelId = id;
      if (id) {
        localStorage.setItem("mi_active_funnel_id", String(id));
      } else {
        localStorage.removeItem("mi_active_funnel_id");
      }
    },
    addFunnel(funnel) {
      this.funnels.push(funnel);
    },
    updateFunnel(funnel) {
      const index = this.funnels.findIndex((f) => f.id === funnel.id);
      if (index !== -1) {
        this.funnels[index] = funnel;
      }
    },
    removeFunnel(funnelId) {
      this.funnels = this.funnels.filter((f) => f.id !== funnelId);
      if (this.activeFunnelId === funnelId) {
        this.setActiveFunnelId(this.funnels.length > 0 ? this.funnels[0].id : null);
      }
    },
    clearAllFunnels() {
      this.funnels = [DEFAULT_ECOMMERCE_FUNNEL];
      this.setActiveFunnelId(DEFAULT_ECOMMERCE_FUNNEL.id);
    },
    /**
     * Update the shared date range.
     * Handles interval presets, compare toggles, and custom ranges.
     */
    updateDateRange(updates) {
      Object.assign(this.dateRange, updates);
      const intervalKey = updates?.interval;
      if (updates?.compareReport !== void 0) {
        this.dateRange.compareReport = !!updates.compareReport;
        if (this.dateRange.compareReport && this.dateRange.start && this.dateRange.end) {
          if (!updates?.compareStart && !updates?.compareEnd) {
            const prev = computePreviousPeriod(this.dateRange.start, this.dateRange.end);
            this.dateRange.compareStart = prev.compareStart;
            this.dateRange.compareEnd = prev.compareEnd;
          }
        } else {
          this.dateRange.compareStart = "";
          this.dateRange.compareEnd = "";
        }
        return;
      }
      if (intervalKey && typeof intervalKey === "string" && dateIntervals[intervalKey]) {
        const interval = dateIntervals[intervalKey];
        if (this.dateRange.compareReport) {
          this.dateRange.compareStart = interval.compareStart?.format("YYYY-MM-DD") ?? "";
          this.dateRange.compareEnd = interval.compareEnd?.format("YYYY-MM-DD") ?? "";
        }
      } else if (intervalKey === false) {
        if (updates?.compareStart === void 0 && updates?.compareEnd === void 0) {
          this.dateRange.compareStart = "";
          this.dateRange.compareEnd = "";
          this.dateRange.compareReport = false;
        }
      } else if (this.dateRange.compareReport && this.dateRange.start && this.dateRange.end && (updates?.start !== void 0 || updates?.end !== void 0) && typeof intervalKey === "string") {
        const prev = computePreviousPeriod(this.dateRange.start, this.dateRange.end);
        this.dateRange.compareStart = prev.compareStart;
        this.dateRange.compareEnd = prev.compareEnd;
      }
    },
    openProModal() {
      this.showProModal = true;
    },
    closeProModal() {
      this.showProModal = false;
    }
  }
});
function getAjaxUrl() {
  return getMiGlobal("ajax") || window.ajaxurl;
}
function getNonce() {
  return getMiGlobal("nonce");
}
async function ajaxPost(formData) {
  const response = await fetch(getAjaxUrl(), {
    method: "POST",
    body: formData
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}
const REGISTRY_KEY = "mi_cache_registry";
const CACHE_TTL = 3600;
function hashString(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
function buildCacheKey(cacheKeyPrefix, cacheKeyFrom, ...args) {
  const keyData = cacheKeyFrom(...args);
  const prefix = cacheKeyPrefix ? `${cacheKeyPrefix}_` : "";
  return prefix + hashString(JSON.stringify(keyData));
}
async function getBackfillCache(cacheKey, cacheGroup, extraParams = {}) {
  const formData = new FormData();
  formData.set("action", "monsterinsights_get_backfill_cache");
  formData.set("nonce", getNonce());
  formData.set("cache_key", cacheKey);
  formData.set("cache_group", cacheGroup);
  if (extraParams && typeof extraParams === "object") {
    for (const [key, value] of Object.entries(extraParams)) {
      if (value !== null && value !== void 0) {
        formData.set(key, typeof value === "object" ? JSON.stringify(value) : String(value));
      }
    }
  }
  const res = await ajaxPost(formData);
  if (res.success && res.data) {
    return res.data;
  }
  throw new Error(res.data?.message || "Cache miss");
}
async function backfillToWp(cacheGroup, cacheKey, data) {
  const formData = new FormData();
  formData.set("action", "monsterinsights_backfill_cache");
  formData.set("nonce", getNonce());
  formData.set("cache_group", cacheGroup);
  formData.set("cache_key", cacheKey);
  formData.set("data", JSON.stringify(data));
  await ajaxPost(formData);
}
function getRegistry() {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function setRegistry(registry) {
  try {
    localStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  } catch {
  }
}
function cleanExpired(registry) {
  const now = Math.floor(Date.now() / 1e3);
  const cleaned = {};
  for (const key in registry) {
    if (registry[key].expires > now) {
      cleaned[key] = registry[key];
    }
  }
  return cleaned;
}
function isCached(cacheKey) {
  const registry = cleanExpired(getRegistry());
  setRegistry(registry);
  return !!registry[cacheKey];
}
function registerCache(cacheKey, ttl = CACHE_TTL) {
  const registry = cleanExpired(getRegistry());
  registry[cacheKey] = {
    expires: Math.floor(Date.now() / 1e3) + ttl
  };
  setRegistry(registry);
}
function invalidateCache(cacheKey) {
  const registry = getRegistry();
  if (registry[cacheKey]) {
    delete registry[cacheKey];
    setRegistry(registry);
  }
}
function clearCache() {
  try {
    localStorage.removeItem(REGISTRY_KEY);
  } catch {
  }
}
function useCachedFetch({
  cacheKeyPrefix = "",
  wpFetch,
  directFetch = null,
  canDirectFetch = () => false,
  backfill = null,
  cacheKeyFrom = (...args) => args,
  formatResponse = (rawData) => rawData
}) {
  function generateCacheKey(...args) {
    const keyData = cacheKeyFrom(...args);
    const prefix = cacheKeyPrefix ? `${cacheKeyPrefix}_` : "";
    return prefix + hashString(JSON.stringify(keyData));
  }
  async function fetchWithCache(...args) {
    const cacheKey = generateCacheKey(...args);
    if (isCached(cacheKey)) {
      try {
        return await wpFetch(cacheKey, ...args);
      } catch (err) {
        invalidateCache(cacheKey);
        if (typeof console !== "undefined" && console.debug) {
          console.debug("[useCachedFetch] Registry hit but wpFetch failed (invalidated registry):", err?.message || err, err);
        }
      }
    }
    if (directFetch && canDirectFetch()) {
      try {
        const rawData = await directFetch(...args);
        if (backfill) {
          Promise.resolve(backfill(...args, rawData)).then(() => {
            registerCache(cacheKey);
          }).catch((backfillErr) => {
            if (typeof console !== "undefined" && console.debug) {
              console.debug("[useCachedFetch] Backfill to WP failed (cache not stored); next load will retry direct fetch:", backfillErr?.message || backfillErr, backfillErr);
            }
            registerCache(cacheKey);
          });
        } else {
          registerCache(cacheKey);
        }
        return formatResponse(rawData, ...args);
      } catch (directError) {
        if (typeof console !== "undefined" && console.debug) {
          console.debug("[useCachedFetch] Direct fetch failed, falling back to wpFetch:", directError?.message || directError, directError);
        }
      }
    }
    const response = await wpFetch(cacheKey, ...args);
    registerCache(cacheKey);
    return response;
  }
  return {
    fetchWithCache,
    clearCache,
    generateCacheKey
  };
}
function createRequestQueue({ concurrency = 2, delayMs = 300 } = {}) {
  let running = 0;
  let lastStartTime = 0;
  const queue = [];
  function processNext() {
    if (running >= concurrency || queue.length === 0) {
      return;
    }
    const { fn, resolve, reject } = queue.shift();
    running++;
    const now = Date.now();
    const elapsed = now - lastStartTime;
    const wait = elapsed < delayMs ? delayMs - elapsed : 0;
    const run = () => {
      lastStartTime = Date.now();
      fn().then(resolve, reject).finally(() => {
        running--;
        processNext();
      });
    };
    if (wait > 0) {
      setTimeout(run, wait);
    } else {
      run();
    }
  }
  function enqueue(fn) {
    return new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      processNext();
    });
  }
  return { enqueue };
}
const OVERVIEW_METRICS = [
  "totalUsers",
  "screenPageViews",
  "sessions",
  "bounceRate",
  "ecommercePurchases",
  "averagePurchaseRevenue",
  "newUsers",
  "engagementRate",
  "totalRevenue",
  "averageSessionDuration",
  "addToCarts",
  "engagedSessions",
  "sessionKeyEventRate"
];
const DEFAULT_OVERVIEW_METRICS = [
  "sessions",
  "engagedSessions",
  "sessionKeyEventRate"
];
const DEFAULT_ROW_LIMIT = 1e3;
const TAB_METRICS = {
  traffic: ["totalUsers", "newUsers", "sessions", "engagementRate"],
  engagement: ["sessions", "screenPageViews", "bounceRate", "averageSessionDuration", "engagementRate", "newUsers", "totalUsers"],
  referrals: ["sessions", "engagedSessions", "sessionKeyEventRate", "totalUsers"],
  ecommerce: ["sessions", "totalRevenue", "ecommercePurchases", "averagePurchaseRevenue", "addToCarts"]
};
const CHART_METRICS = [
  "sessions",
  "engagedSessions",
  "totalUsers",
  "newUsers",
  "engagementRate",
  "screenPageViews",
  "bounceRate",
  "averageSessionDuration",
  "sessionKeyEventRate",
  "totalRevenue",
  "ecommercePurchases",
  "averagePurchaseRevenue"
];
const CHANNEL_GROUPS = ["Organic Search", "Direct", "Referral", "Paid Search", "Organic Social"];
const DIMENSION_SCALES = {
  deviceCategory: {
    desktop: 0.55,
    mobile: 0.35,
    tablet: 0.1
  },
  country: {
    "United States": 0.4,
    "United Kingdom": 0.15,
    Germany: 0.12,
    Canada: 0.08,
    Australia: 0.07,
    France: 0.06,
    Japan: 0.05,
    Mexico: 0.04,
    Brazil: 0.03
  },
  sessionDefaultChannelGroup: {
    "Organic Search": 0.45,
    Direct: 0.25,
    Referral: 0.15,
    "Paid Search": 0.1,
    "Organic Social": 0.05
  }
};
function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const x = Math.sin(hash) * 1e4;
  return x - Math.floor(x);
}
function generateDateRange(start, end) {
  const dates = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  while (startDate <= endDate) {
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const day = String(startDate.getDate()).padStart(2, "0");
    dates.push(`${year}${month}${day}`);
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
}
function getFilterScale(apiFilters) {
  if (!apiFilters?.conditions?.length) {
    return 1;
  }
  let scale = 1;
  for (const condition of apiFilters.conditions) {
    const field = condition.field;
    const value = condition.value;
    const fieldScales = DIMENSION_SCALES[field];
    if (fieldScales && fieldScales[value] !== void 0) {
      scale *= fieldScales[value] / Math.max(...Object.values(fieldScales));
    }
  }
  return Math.max(0.1, Math.min(1, scale));
}
function isRateMetric(name) {
  return ["bounceRate", "engagementRate", "sessionKeyEventRate"].includes(name);
}
function isAvgMetric(name) {
  return ["averageSessionDuration", "averagePurchaseRevenue"].includes(name);
}
function generateMetricValue(metric, seed, scale = 1) {
  const rand = seededRandom(seed);
  const baseVariance = 0.7 + rand * 0.6;
  const baseValues = {
    totalUsers: 80,
    newUsers: 55,
    sessions: 95,
    screenPageViews: 220,
    bounceRate: 0.45,
    engagementRate: 0.55,
    engagedSessions: 52,
    averageSessionDuration: 135,
    sessionKeyEventRate: 0.035,
    totalRevenue: 1200,
    ecommercePurchases: 12,
    averagePurchaseRevenue: 100,
    purchaseRevenue: 1200,
    eventCount: 45,
    addToCarts: 28
  };
  const base = baseValues[metric] ?? 50;
  if (isRateMetric(metric)) {
    const rateBase = base * baseVariance;
    return Math.max(0.2, Math.min(0.8, rateBase));
  }
  if (isAvgMetric(metric)) {
    return Math.max(1, Math.round(base * baseVariance));
  }
  return Math.round(base * baseVariance * scale);
}
function formatMetricValue(value, metric) {
  const num = Number(value);
  if (Number.isNaN(num) || num < 0) {
    return isRateMetric(metric) ? "0.000000" : metric === "averagePurchaseRevenue" || metric === "totalRevenue" || metric === "purchaseRevenue" ? "0.00" : "0";
  }
  if (isRateMetric(metric)) {
    return num.toFixed(14);
  }
  if (metric === "averageSessionDuration") {
    return num.toFixed(1);
  }
  if (metric === "averagePurchaseRevenue" || metric === "totalRevenue" || metric === "purchaseRevenue") {
    return num.toFixed(2);
  }
  return String(Math.round(num));
}
function generateOverviewRows({ dates, selectedMetrics, overviewMetricsToRequest, scale, useCompare, compareDates }) {
  const requested = overviewMetricsToRequest ?? selectedMetrics;
  const filtered = requested?.length ? requested.filter((m) => OVERVIEW_METRICS.includes(m)) : [];
  const list = filtered.length ? filtered : DEFAULT_OVERVIEW_METRICS;
  const rows = [];
  for (const date of dates) {
    const m = [];
    for (const metric of list) {
      const seed = `${date}-${metric}`;
      const currentVal = generateMetricValue(metric, seed, scale);
      if (useCompare) {
        const prevSeed = `${date}-${metric}-prev`;
        const previousVal = generateMetricValue(metric, prevSeed, scale * 0.9);
        m.push([formatMetricValue(previousVal, metric), formatMetricValue(currentVal, metric)]);
      } else {
        m.push(formatMetricValue(currentVal, metric));
      }
    }
    if (useCompare) {
      rows.push({ d: [date], m });
    } else {
      rows.push({ d: [date], m: [m] });
    }
  }
  return { rows };
}
function generateTabMetrics({ dates, activeTab, scale, useCompare }) {
  const metrics = TAB_METRICS[activeTab] || TAB_METRICS.traffic;
  const rows = [];
  for (const date of dates) {
    const m = [];
    for (const metric of metrics) {
      const seed = `${date}-tab-${activeTab}-${metric}`;
      const currentVal = generateMetricValue(metric, seed, scale);
      if (useCompare) {
        const prevSeed = `${date}-tab-${activeTab}-${metric}-prev`;
        const previousVal = generateMetricValue(metric, prevSeed, scale * 0.9);
        m.push([formatMetricValue(previousVal, metric), formatMetricValue(currentVal, metric)]);
      } else {
        m.push(formatMetricValue(currentVal, metric));
      }
    }
    if (useCompare) {
      rows.push({ d: [date], m });
    } else {
      rows.push({ d: [date], m: [m] });
    }
  }
  return { rows };
}
const ORDER_COUPON_VALUES = [
  { value: "(not set)", share: 0.55 },
  { value: "SAVE10", share: 0.2 },
  { value: "FREESHIP", share: 0.15 },
  { value: "WELCOME15", share: 0.1 }
];
function generateFormulaCouponRows({ dates, scale }) {
  const rows = [];
  for (const date of dates) {
    const baseTotal = Math.max(10, Math.round(generateMetricValue("ecommercePurchases", `${date}-coupon-total`, scale) * 3));
    for (const { value: orderCoupon, share } of ORDER_COUPON_VALUES) {
      const raw = Math.round(baseTotal * share * (0.8 + seededRandom(`${date}-${orderCoupon}`) * 0.4));
      const purchases = Math.max(1, raw);
      rows.push({
        d: [date, orderCoupon],
        m: [[purchases]]
      });
    }
  }
  return { rows };
}
function generateChartMetrics({ dates, scale }) {
  const rows = [];
  for (const date of dates) {
    const m = [];
    for (const metric of CHART_METRICS) {
      const seed = `${date}-chart-${metric}`;
      const val = generateMetricValue(metric, seed, scale);
      m.push(formatMetricValue(val, metric));
    }
    rows.push({ d: [date], m: [m] });
  }
  return { rows };
}
function generateChartBySource({ dates, scale }) {
  const rows = [];
  for (const date of dates) {
    for (const channel of CHANNEL_GROUPS) {
      const seed = `${date}-${channel}`;
      const channelScale = (DIMENSION_SCALES.sessionDefaultChannelGroup[channel] || 0.1) * scale;
      const users = Math.round(generateMetricValue("totalUsers", seed, channelScale));
      const newUsers = Math.round(users * (0.6 + seededRandom(`${seed}-new`) * 0.3));
      rows.push({
        d: [date, channel],
        m: [[String(users), String(newUsers)]]
      });
    }
  }
  return { rows };
}
function generateKeyMetrics({ scale, useCompare }) {
  const baseTotalSessions = 2e3 * scale;
  const CHANNEL_WEIGHTS = [
    { name: "Organic Search", weight: 0.4 },
    // → organic
    { name: "Social", weight: 0.12 },
    // → social
    { name: "Paid Search", weight: 0.2 },
    // → paid
    { name: "Email", weight: 0.08 },
    // → email
    { name: "Referral", weight: 0.1 },
    // → referral
    { name: "Direct", weight: 0.1 }
    // → direct
  ];
  const rows = [];
  const date = "20260101";
  for (const { name, weight } of CHANNEL_WEIGHTS) {
    const seed = `key-${name}`;
    const currentSessions = Math.max(1, Math.round(baseTotalSessions * weight * (0.9 + seededRandom(seed) * 0.2)));
    if (useCompare) {
      const prevSeed = `key-${name}-prev`;
      const previousSessions = Math.max(
        1,
        Math.round(currentSessions * (0.8 + seededRandom(prevSeed) * 0.15))
      );
      rows.push({
        d: [date, name],
        m: [[
          formatMetricValue(currentSessions, "sessions"),
          formatMetricValue(previousSessions, "sessions")
        ]]
      });
    } else {
      rows.push({
        d: [date, name],
        m: [[formatMetricValue(currentSessions, "sessions")]]
      });
    }
  }
  return { rows };
}
function generateMarketingCampaigns({ scale }) {
  const campaigns = ["spring_sale_2026", "newsletter_feb", "google_ads_brand", "facebook_retargeting", "organic"];
  const sources = ["google", "facebook", "direct", "newsletter", "bing"];
  const mediums = ["organic", "cpc", "email", "referral", "social"];
  const terms = ["analytics", "wordpress", "seo", "marketing", "(not set)"];
  const contents = ["banner_a", "sidebar_b", "header_c", "(not set)", "footer_d"];
  const generateRows = (values, prefix) => ({
    rows: values.map((val, idx) => {
      const seed = `${prefix}-${val}`;
      const rowScale = scale * (1 - idx * 0.15);
      return {
        d: [val],
        m: [[
          formatMetricValue(generateMetricValue("sessions", seed, rowScale), "sessions"),
          formatMetricValue(generateMetricValue("totalUsers", seed, rowScale), "totalUsers"),
          formatMetricValue(generateMetricValue("engagementRate", seed, rowScale), "engagementRate"),
          formatMetricValue(generateMetricValue("totalRevenue", seed, rowScale), "totalRevenue"),
          formatMetricValue(generateMetricValue("ecommercePurchases", seed, rowScale), "ecommercePurchases"),
          formatMetricValue(generateMetricValue("averagePurchaseRevenue", seed, rowScale), "averagePurchaseRevenue")
        ]]
      };
    })
  });
  return {
    campaign: generateRows(campaigns, "mc-campaign"),
    source: generateRows(sources, "mc-source"),
    medium: generateRows(mediums, "mc-medium"),
    term: generateRows(terms, "mc-term"),
    content: generateRows(contents, "mc-content")
  };
}
function generatePages({ scale }) {
  const landingPages = ["/", "/blog/", "/products/", "/about/", "/contact/"];
  const pageLocations = ["/blog/post-1/", "/products/item-a/", "/services/", "/pricing/", "/faq/"];
  const pageTitles = ["Home", "Blog", "Products", "About Us", "Contact"];
  const queryStrings = ["?utm_source=google", "?ref=newsletter", "?campaign=spring", "(not set)", "?source=twitter"];
  const generateRows = (values, prefix) => ({
    rows: values.map((val, idx) => {
      const seed = `${prefix}-${val}`;
      const rowScale = scale * (1 - idx * 0.12);
      return {
        d: [val],
        m: [[
          formatMetricValue(generateMetricValue("sessions", seed, rowScale), "sessions"),
          formatMetricValue(generateMetricValue("totalUsers", seed, rowScale), "totalUsers"),
          formatMetricValue(generateMetricValue("engagementRate", seed, rowScale), "engagementRate"),
          formatMetricValue(generateMetricValue("totalRevenue", seed, rowScale), "totalRevenue"),
          formatMetricValue(generateMetricValue("ecommercePurchases", seed, rowScale), "ecommercePurchases"),
          formatMetricValue(generateMetricValue("averagePurchaseRevenue", seed, rowScale), "averagePurchaseRevenue")
        ]]
      };
    })
  });
  return {
    landingPage: generateRows(landingPages, "pages-landing"),
    pageLocation: generateRows(pageLocations, "pages-location"),
    pageTitle: generateRows(pageTitles, "pages-title"),
    queryString: generateRows(queryStrings, "pages-qs")
  };
}
function generateDemographics({ scale, apiFilters = null }) {
  const countries = ["United States", "United Kingdom", "Germany", "Canada", "Australia", "France", "Japan"];
  const userTypes = ["new", "returning"];
  const COUNTRY_STATES = {
    "United States": ["California", "Texas", "New York", "Florida", "Illinois", "Washington"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    "Australia": ["New South Wales", "Victoria", "Queensland"],
    "United Kingdom": ["England", "Scotland", "Wales"],
    Germany: ["Bavaria", "Berlin", "Hamburg"],
    France: ["Île-de-France", "Provence-Alpes-Côte d’Azur"],
    Japan: ["Tokyo", "Osaka", "Hokkaido"]
  };
  let filteredCountries = countries;
  const countryConditions = apiFilters?.conditions?.filter((c) => c.field === "country" && c.value && typeof c.value === "string") || [];
  if (countryConditions.length > 0) {
    const wanted = new Set(countryConditions.map((c) => c.value));
    const subset = countries.filter((c) => wanted.has(c));
    if (subset.length > 0) {
      filteredCountries = subset;
    }
  }
  const generateRows = (values, prefix, metrics = ["sessions", "totalRevenue", "engagementRate"]) => ({
    rows: values.map((val, idx) => {
      const seed = `${prefix}-${val}`;
      const rowScale = scale * (1 - idx * 0.1);
      return {
        d: [val],
        m: [metrics.map((m) => formatMetricValue(generateMetricValue(m, seed, rowScale), m))]
      };
    })
  });
  const country = generateRows(filteredCountries, "demo-country");
  const stateRows = [];
  filteredCountries.forEach((countryName, countryIndex) => {
    const statesForCountry = COUNTRY_STATES[countryName] || ["Region A", "Region B"];
    statesForCountry.forEach((stateName, stateIndex) => {
      const seed = `demo-state-${countryName}-${stateName}`;
      const rowScale = scale * (1 - (countryIndex * 0.1 + stateIndex * 0.05));
      stateRows.push({
        d: [stateName],
        m: [["sessions", "totalRevenue", "engagementRate"].map((m) => formatMetricValue(generateMetricValue(m, seed, rowScale), m))]
      });
    });
  });
  const state = { rows: stateRows };
  const newVsReturning = generateRows(userTypes, "demo-nvr");
  return {
    country,
    state,
    newVsReturning
  };
}
function generateDevices({ scale }) {
  const browsers = ["Chrome", "Safari", "Firefox", "Edge", "Samsung Internet", "Opera"];
  const operatingSystems = ["Windows", "macOS", "iOS", "Android", "Linux"];
  const sizes = ["desktop", "mobile", "tablet"];
  const generateRows = (values, prefix) => ({
    rows: values.map((val, idx) => {
      const seed = `${prefix}-${val}`;
      const rowScale = scale * (1 - idx * 0.12);
      return {
        d: [val],
        m: [[
          formatMetricValue(generateMetricValue("sessions", seed, rowScale), "sessions"),
          formatMetricValue(generateMetricValue("totalRevenue", seed, rowScale), "totalRevenue"),
          formatMetricValue(generateMetricValue("engagementRate", seed, rowScale), "engagementRate")
        ]]
      };
    })
  });
  return {
    browser: generateRows(browsers, "devices-browser"),
    os: generateRows(operatingSystems, "devices-os"),
    size: generateRows(sizes, "devices-size")
  };
}
function generateEcommerceOverview({ dates, scale, apiFilters = null }) {
  const hasFilters = !!apiFilters?.conditions?.length;
  const transactionIds = ["TXN-001", "TXN-002", "TXN-003", "TXN-004", "TXN-005"];
  const sources = ["google", "facebook", "direct", "newsletter"];
  const mediums = ["cpc", "organic", "email", "referral"];
  const campaigns = ["spring_sale", "brand_2026", "(not set)", "newsletter_feb"];
  function buildLogRow(date, txn, source, medium, campaign, seed) {
    const dateHour = `${date}12`;
    const revenue = generateMetricValue("purchaseRevenue", seed, scale);
    return {
      d: [dateHour, campaign, medium, source, txn],
      m: [[formatMetricValue(revenue, "purchaseRevenue")]]
    };
  }
  const maxLogRows = hasFilters ? 6 : 12;
  const allLogRows = [];
  for (let i = 0; i < Math.min(dates.length, maxLogRows); i++) {
    const date = dates[i];
    const txn = transactionIds[i % transactionIds.length];
    const source = sources[i % sources.length];
    const medium = mediums[i % mediums.length];
    const campaign = campaigns[i % campaigns.length];
    const seed = `ecom-log-${date}-${txn}`;
    allLogRows.push(buildLogRow(date, txn, source, medium, campaign, seed));
  }
  const ecommerce_log_date = {
    rows: [...allLogRows].sort((a, b) => (b.d[0] || "").localeCompare(a.d[0] || ""))
  };
  const ecommerce_log_source_medium = {
    rows: [...allLogRows].sort((a, b) => {
      const cmp = (a.d[3] || "").localeCompare(b.d[3] || "");
      return cmp !== 0 ? cmp : (a.d[2] || "").localeCompare(b.d[2] || "");
    })
  };
  const ecommerce_log_campaign = {
    rows: [...allLogRows].sort((a, b) => (a.d[1] || "").localeCompare(b.d[1] || ""))
  };
  const products = ["Premium Plan", "Starter Kit", "Add-on License", "Pro Bundle", "Annual Subscription", "Starter Pack"];
  const coupons = ["SAVE10", "WELCOME", "(not set)", "BLACKFRIDAY", "NEWYEAR"];
  const maxDataRows = hasFilters ? 3 : products.length;
  const ecommerce_data_rows = [];
  for (let i = 0; i < maxDataRows; i++) {
    const product = products[i];
    const coupon = coupons[i % coupons.length];
    const seed = `ecom-data-${product}-${coupon}`;
    const itemRevenue = generateMetricValue("totalRevenue", seed, scale) * (0.8 + seededRandom(seed) * 0.4);
    const itemsPurchased = Math.max(1, Math.round(generateMetricValue("ecommercePurchases", seed, scale)));
    ecommerce_data_rows.push({
      d: [product, coupon],
      m: [[formatMetricValue(itemRevenue, "totalRevenue"), formatMetricValue(itemsPurchased, "ecommercePurchases")]]
    });
  }
  const ecommerce_data = { rows: ecommerce_data_rows };
  return {
    ecommerce_log_date,
    ecommerce_log_source_medium,
    ecommerce_log_campaign,
    ecommerce_data
  };
}
function generateFormSubmissions({ dates, scale, apiFilters = null }) {
  const formIds = ["contact-form", "newsletter-signup", "checkout-form", "feedback-form"];
  const allCountries = ["United States", "United Kingdom", "Germany"];
  const campaigns = ["spring_sale", "newsletter", "(not set)", "brand_awareness"];
  const countryConditions = apiFilters?.conditions?.filter((c) => c.field === "country" && c.value) || [];
  const filterCountries = countryConditions.length ? countryConditions.map((c) => c.value).filter((v) => allCountries.includes(v)) : null;
  const countries = filterCountries?.length ? filterCountries : allCountries;
  const maxRows = apiFilters?.conditions?.length ? 10 : 20;
  const sourceMediumRows = [];
  for (let i = 0; i < Math.min(dates.length * 2, maxRows); i++) {
    const date = dates[i % dates.length];
    const formId = formIds[i % formIds.length];
    const country = countries[i % countries.length];
    const seed = `form-sm-${date}-${formId}-${country}`;
    sourceMediumRows.push({
      d: [country, formId, `${date}14`, "cpc", "google"],
      m: [[formatMetricValue(generateMetricValue("eventCount", seed, scale), "eventCount")]]
    });
  }
  const campaignRows = [];
  for (let i = 0; i < Math.min(dates.length * 2, maxRows); i++) {
    const date = dates[i % dates.length];
    const formId = formIds[i % formIds.length];
    const country = countries[i % countries.length];
    const campaign = campaigns[i % campaigns.length];
    const seed = `form-camp-${date}-${formId}-${country}`;
    campaignRows.push({
      d: [country, formId, campaign, "cpc", "google"],
      m: [[formatMetricValue(generateMetricValue("eventCount", seed, scale), "eventCount")]]
    });
  }
  return {
    sourceMedium: { rows: sourceMediumRows },
    campaign: { rows: campaignRows }
  };
}
function isSampleDataEnabled$1() {
  return !!getMiGlobal("sample_data_enabled", false);
}
function generateSampleOverviewData({ dateRange, apiFilters = null, selectedMetrics = null, overviewMetricsToRequest = null, activeTab = "traffic" }) {
  const start = dateRange?.start || "2026-01-19";
  const end = dateRange?.end || "2026-02-17";
  const useCompare = !!(dateRange?.compareReport && dateRange?.compareStart && dateRange?.compareEnd);
  const dates = generateDateRange(start, end);
  const scale = getFilterScale(apiFilters);
  const compareDates = useCompare ? generateDateRange(dateRange.compareStart, dateRange.compareEnd) : [];
  const overview = generateOverviewRows({
    dates,
    selectedMetrics,
    overviewMetricsToRequest,
    scale,
    useCompare,
    compareDates
  });
  const result = {
    date_range: { start, end },
    overview,
    key_metrics: generateKeyMetrics({ scale, useCompare }),
    key_metrics_compare: useCompare ? generateKeyMetrics({ scale: scale * 0.9, useCompare: false }) : null,
    chart_metrics: generateChartMetrics({ dates, scale }),
    tab_metrics: generateTabMetrics({ dates, activeTab, scale, useCompare }),
    chart_by_source: generateChartBySource({ dates, scale })
  };
  if (Array.isArray(selectedMetrics) && selectedMetrics.includes("couponUsedPercent")) {
    result.overview_formula_couponUsedPercent = generateFormulaCouponRows({ dates, scale });
  }
  return result;
}
function generateSampleBundleData({ dateRange, apiFilters = null }) {
  const start = dateRange?.start || "2026-01-19";
  const end = dateRange?.end || "2026-02-17";
  const dates = generateDateRange(start, end);
  const scale = getFilterScale(apiFilters);
  return {
    marketing_campaigns: generateMarketingCampaigns({ scale }),
    pages: generatePages({ scale }),
    demographics: generateDemographics({ scale, apiFilters }),
    devices: generateDevices({ scale }),
    form_submissions: generateFormSubmissions({ dates, scale, apiFilters }),
    ecommerce_overview: generateEcommerceOverview({ dates, scale, apiFilters })
  };
}
function generateSampleFunnelData({ apiFilters = null }) {
  const scale = getFilterScale(apiFilters);
  const steps = ["1. view_item", "2. add_to_cart", "3. purchase"];
  const baseUsers = [450, 57, 2];
  const tableRows = steps.map((step, idx) => {
    const users = Math.round(baseUsers[idx] * scale);
    const completionRate = idx < steps.length - 1 ? baseUsers[idx + 1] / baseUsers[idx] : 1;
    const abandonments = idx < steps.length - 1 ? users - Math.round(baseUsers[idx + 1] * scale) : 0;
    const abandonmentRate = 1 - completionRate;
    return {
      d: [step, "RESERVED_TOTAL"],
      m: [[
        String(users),
        completionRate.toFixed(6),
        String(abandonments),
        abandonmentRate.toFixed(6)
      ]]
    };
  });
  const vizRows = steps.map((step, idx) => ({
    d: [step],
    m: [[String(Math.round(baseUsers[idx] * scale))]]
  }));
  return {
    funnelTable: {
      dimensionHeaders: [
        { name: "funnelStepName" },
        { name: "deviceCategory" }
      ],
      metricHeaders: [
        { name: "activeUsers", type: "TYPE_INTEGER" },
        { name: "funnelStepCompletionRate", type: "TYPE_FLOAT" },
        { name: "funnelStepAbandonments", type: "TYPE_INTEGER" },
        { name: "funnelStepAbandonmentRate", type: "TYPE_FLOAT" }
      ],
      rows: tableRows,
      metadata: {}
    },
    funnelVisualization: {
      dimensionHeaders: [{ name: "funnelStepName" }],
      metricHeaders: [
        { name: "activeUsers", type: "TYPE_INTEGER" },
        { name: "activeUsers", type: "TYPE_INTEGER" }
      ],
      rows: vizRows,
      metadata: {}
    },
    kind: "analyticsData#runFunnelReport"
  };
}
function generateSampleCustomDimensionsData({ apiFilters = null }) {
  const scale = getFilterScale(apiFilters);
  const generateRows = (values, prefix) => ({
    rows: values.map((val, idx) => {
      const seed = `${prefix}-${val}`;
      const rowScale = scale * (1 - idx * 0.1);
      return {
        d: [val],
        m: [[
          formatMetricValue(generateMetricValue("sessions", seed, rowScale), "sessions"),
          formatMetricValue(generateMetricValue("totalUsers", seed, rowScale), "totalUsers"),
          formatMetricValue(generateMetricValue("engagementRate", seed, rowScale), "engagementRate"),
          formatMetricValue(generateMetricValue("totalRevenue", seed, rowScale), "totalRevenue"),
          formatMetricValue(generateMetricValue("ecommercePurchases", seed, rowScale), "ecommercePurchases"),
          formatMetricValue(generateMetricValue("averagePurchaseRevenue", seed, rowScale), "averagePurchaseRevenue")
        ]]
      };
    })
  });
  return {
    loggedIn: generateRows(["yes", "no"], "cd-logged"),
    postType: generateRows(["post", "page", "product"], "cd-posttype"),
    author: generateRows(["John Smith", "Jane Doe", "Mike Johnson", "Sarah Wilson"], "cd-author"),
    category: generateRows(["Tutorials", "News", "Tips & Tricks", "Reviews"], "cd-category"),
    tags: generateRows(["analytics", "wordpress", "google-analytics", "seo"], "cd-tags"),
    focusKeyword: generateRows(["wordpress seo", "analytics plugin", "google analytics", "site optimization", "(not set)"], "cd-focus-keyword"),
    dayOfWeek: generateRows(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "cd-dow"),
    seoScore: generateRows(["76-100", "51-75", "26-50", "0-25", "(not set)"], "cd-seo-score"),
    focusKeyphrase: generateRows(["best seo plugin", "how to install analytics", "track website traffic", "conversion tracking", "(not set)"], "cd-focus-keyphrase")
  };
}
const { __ } = wp.i18n;
function isSampleDataEnabled() {
  return isSampleDataEnabled$1();
}
function getRelayRequestOptions(apiPath, body) {
  const relayApiUrl = (getMiGlobal("relay_api_url") || "").replace(/\/$/, "");
  const bearerToken = getMiGlobal("bearer_token");
  const pluginVersion = getMiGlobal("plugin_version", "1.0.0");
  const url = relayApiUrl ? `${relayApiUrl}/${apiPath}` : "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken || ""}`
  };
  const bodyWithVersion = { ...body, plugin_version: pluginVersion };
  return { url, headers, body: bodyWithVersion };
}
async function getRelayRequestOptionsWithFreshToken(apiPath, body) {
  const hasToken = await ensureBearerToken();
  const tokenNow = getMiGlobal("bearer_token");
  if (!hasToken || !tokenNow || typeof tokenNow !== "string") {
    throw new Error("Bearer token unavailable or expired");
  }
  return getRelayRequestOptions(apiPath, body);
}
const relayQueue = createRequestQueue({ concurrency: 2, delayMs: 300 });
async function _relayReportingQueryRaw(body) {
  const relay = await getRelayRequestOptionsWithFreshToken("api/v3/reporting/query", body);
  if (!relay.url) {
    throw new Error("Relay URL not configured");
  }
  const response = await fetch(relay.url, {
    method: "POST",
    headers: relay.headers,
    body: JSON.stringify(relay.body)
  });
  const decodedBody = await response.json();
  if (!response.ok || decodedBody?.success === false && decodedBody?.error) {
    const msg = decodedBody?.error?.message ?? decodedBody?.error ?? decodedBody?.message ?? "Request failed";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return decodedBody;
}
function relayReportingQuery(body) {
  return relayQueue.enqueue(() => _relayReportingQueryRaw(body));
}
async function _relayFunnelRaw(body) {
  const relay = await getRelayRequestOptionsWithFreshToken("api/v3/reporting/funnel", body);
  if (!relay.url) {
    throw new Error("Relay URL not configured");
  }
  const response = await fetch(relay.url, {
    method: "POST",
    headers: relay.headers,
    body: JSON.stringify(relay.body)
  });
  const decodedBody = await response.json();
  if (!response.ok || decodedBody?.success === false && decodedBody?.error) {
    const msg = decodedBody?.error?.message ?? decodedBody?.error ?? decodedBody?.message ?? "Request failed";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return decodedBody;
}
function relayFunnel(body) {
  return relayQueue.enqueue(() => _relayFunnelRaw(body));
}
function rejectReport(title, message) {
  return Promise.reject({
    title,
    message: message || __("An unknown error occurred.", "google-analytics-for-wordpress"),
    support_url: getMonsterInsightsUrl(
      "admin-notices",
      "error-overview-api",
      "https://www.monsterinsights.com/my-account/support"
    ),
    isAjaxError: true
  });
}
function relayFallbackFetch(apiPath, body, formatFn, errorLabel) {
  const reportingApi = getMiGlobal("reporting_api", {});
  const apiUrl = `${(reportingApi.url || "").replace(/\/$/, "")}/${apiPath.replace(/^\//, "")}`;
  const bodyToSend = { ...body, plugin_version: getMiGlobal("plugin_version", "1.0.0") };
  const headers = {
    "Content-Type": "application/json",
    "X-Relay-Site-Key": reportingApi.key || "",
    "X-Relay-Token": reportingApi.token || "",
    "X-Relay-Site-URL": reportingApi.site_url || ""
  };
  if (reportingApi.license) {
    headers["X-Relay-License"] = reportingApi.license;
  }
  return fetch(apiUrl, { method: "POST", headers, body: JSON.stringify(bodyToSend) }).then((response) => response.json().then((decodedBody) => ({ ok: response.ok, status: response.status, body: decodedBody }))).then(({ ok, status, body: decodedBody }) => {
    if (ok && status >= 200 && status < 300) {
      try {
        return formatFn(decodedBody);
      } catch (err) {
        return rejectReport(errorLabel, err?.message);
      }
    }
    const message = decodedBody?.error?.message ?? (typeof decodedBody?.error === "string" ? decodedBody.error : null) ?? decodedBody?.message ?? __("An unknown error occurred.", "google-analytics-for-wordpress");
    return rejectReport(errorLabel, message);
  });
}
const OVERVIEW_CACHE_GROUP = "overview";
function overviewCacheKeyFrom(dateRange, apiFilters, selectedMetrics, activeTab) {
  return {
    start: dateRange?.start,
    end: dateRange?.end,
    compare: dateRange?.compareReport,
    compareStart: dateRange?.compareStart,
    compareEnd: dateRange?.compareEnd,
    filters: apiFilters,
    selectedMetrics: selectedMetrics ?? null,
    activeTab: activeTab ?? null
  };
}
function injectFormulaResultsIntoOverviewRows(overviewData, selectedMetrics, formulaQueryResults, dateRange) {
  const rows = overviewData?.rows ?? [];
  const requestedMetrics = getOverviewMetricsToRequest(selectedMetrics);
  if (!Array.isArray(rows) || rows.length === 0) {
    return overviewData;
  }
  const isCompare = !!(dateRange?.compareReport && dateRange?.compareStart && dateRange?.compareEnd);
  const formulaRowsByDate = {};
  for (const key of selectedMetrics) {
    const formula = FORMULA_METRICS[key];
    if (!formula?.computeFromDimensionRows) {
      continue;
    }
    const raw = formulaQueryResults[`overview_formula_${key}`] ?? formulaQueryResults[key];
    const formulaRows = Array.isArray(raw) ? raw : Array.isArray(raw?.rows) ? raw.rows : [];
    const byDate = {};
    for (const row of formulaRows) {
      const date = row?.d?.[0];
      if (!date) {
        continue;
      }
      if (!byDate[date]) {
        byDate[date] = [];
      }
      byDate[date].push(row);
    }
    formulaRowsByDate[key] = byDate;
  }
  const newRows = rows.map((row) => {
    const date = row?.d?.[0];
    const rowM = row?.m ?? [];
    const requestedValues = isCompare ? requestedMetrics.map((_, idx) => {
      const cell = rowM[idx];
      return Array.isArray(cell) && cell.length >= 2 ? cell[1] : cell;
    }) : Array.isArray(rowM[0]) ? rowM[0] : [];
    const previousValues = isCompare ? requestedMetrics.map((_, idx) => {
      const cell = rowM[idx];
      return Array.isArray(cell) && cell.length >= 2 ? cell[0] : cell;
    }) : [];
    const metricsByKey = {};
    requestedMetrics.forEach((name, idx) => {
      metricsByKey[name] = requestedValues[idx] != null ? Number(requestedValues[idx]) : 0;
    });
    const prevMetricsByKey = {};
    if (isCompare) {
      requestedMetrics.forEach((name, idx) => {
        prevMetricsByKey[name] = previousValues[idx] != null ? Number(previousValues[idx]) : 0;
      });
    }
    const outValues = [];
    for (const key of selectedMetrics) {
      const formula = FORMULA_METRICS[key];
      if (formula) {
        if (formula.compute) {
          const currVal = formula.compute(metricsByKey);
          if (isCompare) {
            const prevVal = formula.compute(prevMetricsByKey);
            outValues.push([prevVal, currVal]);
          } else {
            outValues.push(currVal);
          }
        } else if (formula.computeFromDimensionRows) {
          const rowsForDate = formulaRowsByDate[key]?.[date] ?? [];
          const val = formula.computeFromDimensionRows(rowsForDate);
          outValues.push(isCompare ? [val, val] : val);
        } else {
          outValues.push(isCompare ? [0, 0] : 0);
        }
        continue;
      }
      if (DERIVED_CHART_KEYS[key]) {
        for (const baseKey of DERIVED_CHART_KEYS[key]) {
          const baseIdx = requestedMetrics.indexOf(baseKey);
          if (isCompare && baseIdx >= 0 && Array.isArray(rowM[baseIdx])) {
            outValues.push(rowM[baseIdx]);
          } else {
            const raw = baseIdx >= 0 ? requestedValues[baseIdx] : void 0;
            outValues.push(raw != null ? raw : isCompare ? [0, 0] : 0);
          }
        }
        continue;
      }
      const apiName = CHART_KEY_TO_OVERVIEW_METRIC[key] || key;
      const metricIdx = requestedMetrics.indexOf(apiName);
      if (isCompare && metricIdx >= 0 && Array.isArray(rowM[metricIdx])) {
        outValues.push(rowM[metricIdx]);
      } else {
        const raw = metricIdx >= 0 ? requestedValues[metricIdx] : void 0;
        outValues.push(raw != null ? raw : isCompare ? [0, 0] : 0);
      }
    }
    return {
      ...row,
      m: isCompare ? outValues : [outValues]
    };
  });
  return {
    ...overviewData,
    rows: newRows
  };
}
function formatOverviewResponse(decodedBody, dateRange, selectedMetrics) {
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  let data = null;
  if (decodedBody?.success && decodedBody?.data) {
    data = decodedBody.data?.data ?? decodedBody.data;
  } else if (decodedBody?.data) {
    data = decodedBody.data?.data ?? decodedBody.data;
  }
  if (!data) {
    throw new Error("Invalid overview response");
  }
  let overviewData = data?.overview ?? data;
  const formulaQueryResults = {};
  for (const key of Object.keys(FORMULA_METRICS)) {
    const formula = FORMULA_METRICS[key];
    if (formula?.dimensions?.length) {
      const id = `overview_formula_${key}`;
      if (data[id]) {
        formulaQueryResults[id] = data[id];
      }
    }
  }
  if (Array.isArray(selectedMetrics) && selectedMetrics.length > 0) {
    overviewData = injectFormulaResultsIntoOverviewRows(overviewData, selectedMetrics, formulaQueryResults, dateRange);
  }
  return {
    date_range: { start, end },
    overview: overviewData,
    key_metrics: data?.key_metrics ?? null,
    key_metrics_compare: data?.key_metrics_compare ?? null,
    chart_metrics: data?.chart_metrics ?? null,
    tab_metrics: data?.tab_metrics ?? null
  };
}
async function directFetchOverviewFromRelay(dateRange, apiFilters, selectedMetrics, activeTab) {
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  const useCompare = !!(dateRange?.compareReport && dateRange?.compareStart && dateRange?.compareEnd);
  let keyMetricsQuery = { ...KEY_METRICS_QUERY, compare: useCompare };
  if (keyMetricsQuery.compare) {
    keyMetricsQuery.compare_start = dateRange.compareStart;
    keyMetricsQuery.compare_end = dateRange.compareEnd;
  }
  const overviewMetrics = getOverviewMetricsToRequest(selectedMetrics);
  const overviewQuery = applyFiltersToQuery(
    {
      ...OVERVIEW_QUERY,
      metrics: overviewMetrics,
      compare: useCompare,
      ...useCompare && { compare_start: dateRange.compareStart, compare_end: dateRange.compareEnd }
    },
    apiFilters
  );
  keyMetricsQuery = applyFiltersToQuery(keyMetricsQuery, apiFilters);
  let chartMetricsQuery = { ...CHART_METRICS_QUERY, compare: useCompare };
  if (chartMetricsQuery.compare) {
    chartMetricsQuery.compare_start = dateRange.compareStart;
    chartMetricsQuery.compare_end = dateRange.compareEnd;
  }
  chartMetricsQuery = applyFiltersToQuery(chartMetricsQuery, apiFilters);
  const tabMetricsNames = getTabMetricsForQuery(activeTab);
  const tabMetricsQuery = applyFiltersToQuery(
    {
      id: "tab_metrics",
      dimensions: ["date"],
      metrics: tabMetricsNames,
      compare: useCompare,
      limit: DEFAULT_ROW_LIMIT,
      groupBy: "date",
      ...useCompare && { compare_start: dateRange.compareStart, compare_end: dateRange.compareEnd }
    },
    apiFilters
  );
  const formulaQueries = getFormulaQueries(selectedMetrics, dateRange, apiFilters);
  const allQueries = [overviewQuery, keyMetricsQuery, chartMetricsQuery, tabMetricsQuery, ...formulaQueries];
  const body = {
    start,
    end,
    ...useCompare && { compareStart: dateRange.compareStart, compareEnd: dateRange.compareEnd },
    queries: allQueries
  };
  const relay = await getRelayRequestOptionsWithFreshToken("api/v3/reporting/query", body);
  if (!relay.url) {
    throw new Error("Relay URL not configured");
  }
  const response = await fetch(relay.url, {
    method: "POST",
    headers: relay.headers,
    body: JSON.stringify(relay.body)
  });
  const decodedBody = await response.json();
  if (!response.ok || decodedBody?.success === false && decodedBody?.error) {
    const msg = decodedBody?.error?.message ?? decodedBody?.error ?? decodedBody?.message ?? "Request failed";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return decodedBody;
}
const overviewCachedFetch = useCachedFetch({
  cacheKeyPrefix: "overview",
  cacheKeyFrom: (...args) => overviewCacheKeyFrom(...args),
  wpFetch: async (cacheKey, dateRange, apiFilters, selectedMetrics, activeTab) => {
    const useCompare = !!(dateRange?.compareReport && dateRange?.compareStart && dateRange?.compareEnd);
    return getBackfillCache(cacheKey, OVERVIEW_CACHE_GROUP, {
      selected_metrics: selectedMetrics,
      active_tab: activeTab,
      compare: useCompare,
      api_filters: apiFilters ?? null
    });
  },
  directFetch: directFetchOverviewFromRelay,
  canDirectFetch: () => !isSampleDataEnabled() && !!getMiGlobal("bearer_token"),
  backfill: async (dateRange, apiFilters, selectedMetrics, activeTab, rawData) => {
    const cacheKey = buildCacheKey("overview", overviewCacheKeyFrom, dateRange, apiFilters, selectedMetrics, activeTab);
    const formatted = formatOverviewResponse(rawData, dateRange, selectedMetrics);
    await backfillToWp(OVERVIEW_CACHE_GROUP, cacheKey, formatted);
  },
  formatResponse: (rawData, ...args) => formatOverviewResponse(rawData, args[0], args[2])
});
const CUSTOM_DIMENSIONS_CACHE_GROUP = "custom_dimensions";
function customDimensionsCacheKeyFrom(dateRange, apiFilters, includeEcommerceMetrics = true) {
  return { start: dateRange?.start, end: dateRange?.end, filters: apiFilters, includeEcommerceMetrics };
}
function formatCustomDimensionsResponse(decodedBody) {
  let data = null;
  if (decodedBody?.success && decodedBody?.data) {
    data = decodedBody.data?.data ?? decodedBody.data;
  } else if (decodedBody && typeof decodedBody === "object" && !decodedBody.error && Object.keys(decodedBody).some((k) => String(k).startsWith("custom_dimensions_"))) {
    data = decodedBody;
  }
  if (!data) {
    throw new Error("Invalid custom dimensions response");
  }
  return {
    loggedIn: data.custom_dimensions_logged_in ?? null,
    postType: data.custom_dimensions_post_type ?? null,
    author: data.custom_dimensions_author ?? null,
    category: data.custom_dimensions_category ?? null,
    tags: data.custom_dimensions_tags ?? null,
    focusKeyword: data.custom_dimensions_focus_keyword ?? null,
    dayOfWeek: data.custom_dimensions_day_of_week ?? null,
    seoScore: data.custom_dimensions_seo_score ?? null,
    focusKeyphrase: data.custom_dimensions_focus_keyphrase ?? null
  };
}
async function directFetchCustomDimensionsFromRelay(dateRange, apiFilters, includeEcommerceMetrics = true) {
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  const customDimensionsQueries = getCustomDimensionsQueries(includeEcommerceMetrics).map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const body = { start, end, queries: customDimensionsQueries };
  const relay = await getRelayRequestOptionsWithFreshToken("api/v3/reporting/query", body);
  if (!relay.url) {
    throw new Error("Relay URL not configured");
  }
  const response = await fetch(relay.url, { method: "POST", headers: relay.headers, body: JSON.stringify(relay.body) });
  const decodedBody = await response.json();
  if (!response.ok || decodedBody?.success === false && decodedBody?.error) {
    const msg = decodedBody?.error?.message ?? decodedBody?.error ?? decodedBody?.message ?? "Request failed";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return decodedBody;
}
const customDimensionsCachedFetch = useCachedFetch({
  cacheKeyPrefix: "custom_dimensions",
  cacheKeyFrom: (...args) => customDimensionsCacheKeyFrom(...args),
  wpFetch: async (cacheKey, _dateRange, apiFilters) => getBackfillCache(cacheKey, CUSTOM_DIMENSIONS_CACHE_GROUP, {
    api_filters: apiFilters ?? null
  }),
  directFetch: directFetchCustomDimensionsFromRelay,
  canDirectFetch: () => !isSampleDataEnabled() && !!getMiGlobal("bearer_token"),
  backfill: async (dateRange, apiFilters, includeEcommerceMetrics, rawData) => {
    const cacheKey = buildCacheKey("custom_dimensions", customDimensionsCacheKeyFrom, dateRange, apiFilters, includeEcommerceMetrics);
    const formatted = formatCustomDimensionsResponse(rawData);
    await backfillToWp(CUSTOM_DIMENSIONS_CACHE_GROUP, cacheKey, formatted);
  },
  formatResponse: (rawData) => formatCustomDimensionsResponse(rawData)
});
function formatCustomDimensionsDeferredResponse(decodedBody) {
  let data = null;
  if (decodedBody?.success && decodedBody?.data) {
    data = decodedBody.data?.data ?? decodedBody.data;
  } else if (decodedBody && typeof decodedBody === "object" && !decodedBody.error && Object.keys(decodedBody).some((k) => String(k).startsWith("custom_dimensions_"))) {
    data = decodedBody;
  }
  if (!data) {
    throw new Error("Invalid custom dimensions deferred response");
  }
  return {
    focusKeyword: data.custom_dimensions_focus_keyword ?? null,
    dayOfWeek: data.custom_dimensions_day_of_week ?? null,
    seoScore: data.custom_dimensions_seo_score ?? null,
    focusKeyphrase: data.custom_dimensions_focus_keyphrase ?? null
  };
}
async function directFetchCustomDimensionsDeferredFromRelay(dateRange, apiFilters, includeEcommerceMetrics = true) {
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  const queries = getCustomDimensionsDeferredQueries(includeEcommerceMetrics).map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const body = { start, end, queries };
  const relay = await getRelayRequestOptionsWithFreshToken("api/v3/reporting/query", body);
  if (!relay.url) {
    throw new Error("Relay URL not configured");
  }
  const response = await fetch(relay.url, { method: "POST", headers: relay.headers, body: JSON.stringify(relay.body) });
  const decodedBody = await response.json();
  if (!response.ok || decodedBody?.success === false && decodedBody?.error) {
    const msg = decodedBody?.error?.message ?? decodedBody?.error ?? decodedBody?.message ?? "Request failed";
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return decodedBody;
}
const customDimensionsDeferredCachedFetch = useCachedFetch({
  cacheKeyPrefix: "custom_dimensions_deferred",
  cacheKeyFrom: (...args) => customDimensionsCacheKeyFrom(...args),
  wpFetch: async (cacheKey, _dateRange, apiFilters) => getBackfillCache(cacheKey, CUSTOM_DIMENSIONS_CACHE_GROUP, {
    api_filters: apiFilters ?? null
  }),
  directFetch: directFetchCustomDimensionsDeferredFromRelay,
  canDirectFetch: () => !isSampleDataEnabled() && !!getMiGlobal("bearer_token"),
  backfill: async (dateRange, apiFilters, includeEcommerceMetrics, rawData) => {
    const cacheKey = buildCacheKey("custom_dimensions_deferred", customDimensionsCacheKeyFrom, dateRange, apiFilters, includeEcommerceMetrics);
    const formatted = formatCustomDimensionsDeferredResponse(rawData);
    await backfillToWp(CUSTOM_DIMENSIONS_CACHE_GROUP, cacheKey, formatted);
  },
  formatResponse: (rawData) => formatCustomDimensionsDeferredResponse(rawData)
});
const FORMULA_METRICS = {
  cartAbandonRatePercent: {
    metrics: ["addToCarts", "ecommercePurchases"],
    dimensions: [],
    compute(metrics) {
      const addToCarts = Number(metrics.addToCarts ?? 0) || 0;
      const purchases = Number(metrics.ecommercePurchases ?? 0) || 0;
      if (!addToCarts) {
        return 0;
      }
      return (addToCarts - purchases) / addToCarts;
    }
  },
  couponUsedPercent: {
    metrics: ["ecommercePurchases"],
    dimensions: ["orderCoupon"],
    computeFromDimensionRows(rows) {
      let totalPurchases = 0;
      let couponPurchases = 0;
      for (const row of rows) {
        const val = Number(row?.m?.[0]?.[0] ?? row?.m?.[0] ?? 0) || 0;
        totalPurchases += val;
        const dimCoupon = row?.d?.[1];
        if (dimCoupon != null && String(dimCoupon).trim() !== "" && String(dimCoupon) !== "(not set)") {
          couponPurchases += val;
        }
      }
      return totalPurchases ? couponPurchases / totalPurchases : 0;
    }
  }
};
const CHART_KEY_TO_OVERVIEW_METRIC = {
  itemsPurchased: "ecommercePurchases",
  totalUsers: "totalUsers",
  newUsers: "newUsers",
  engagementRate: "engagementRate",
  bounceRate: "bounceRate",
  ecommercePurchases: "ecommercePurchases",
  totalRevenue: "totalRevenue",
  averagePurchaseRevenue: "averagePurchaseRevenue",
  sessionDuration: "averageSessionDuration",
  averageSessionDuration: "averageSessionDuration",
  sessions: "sessions",
  screenPageViews: "screenPageViews",
  engagedSessions: "engagedSessions",
  sessionKeyEventRate: "sessionKeyEventRate"
};
const DERIVED_CHART_KEYS = {
  returningUsers: ["totalUsers", "newUsers"],
  pageViewsPerUser: ["screenPageViews", "totalUsers"]
};
const OVERVIEW_QUERY = {
  id: "overview",
  dimensions: [
    "date"
  ],
  metrics: OVERVIEW_METRICS,
  compare: true,
  limit: DEFAULT_ROW_LIMIT,
  groupBy: "date"
};
function getOverviewMetricsToRequest(selectedMetrics) {
  if (!Array.isArray(selectedMetrics) || selectedMetrics.length === 0) {
    return DEFAULT_OVERVIEW_METRICS;
  }
  const allowed = new Set(OVERVIEW_METRICS);
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  function addMetric(name) {
    if (!allowed.has(name) || seen.has(name)) {
      return;
    }
    seen.add(name);
    result.push(name);
  }
  for (const key of selectedMetrics) {
    const formula = FORMULA_METRICS[key];
    if (formula) {
      for (const m of formula.metrics) {
        addMetric(m);
      }
      continue;
    }
    const derived = DERIVED_CHART_KEYS[key];
    if (derived) {
      for (const m of derived) {
        addMetric(m);
      }
      continue;
    }
    const apiName = CHART_KEY_TO_OVERVIEW_METRIC[key] || key;
    addMetric(apiName);
  }
  return result.length > 0 ? result : DEFAULT_OVERVIEW_METRICS;
}
function getInjectedMetricNames(selectedMetrics) {
  if (!Array.isArray(selectedMetrics) || selectedMetrics.length === 0) {
    return DEFAULT_OVERVIEW_METRICS;
  }
  const result = [];
  for (const key of selectedMetrics) {
    if (FORMULA_METRICS[key]) {
      result.push(key);
      continue;
    }
    const derived = DERIVED_CHART_KEYS[key];
    if (derived) {
      for (const m of derived) {
        result.push(m);
      }
      continue;
    }
    const apiName = CHART_KEY_TO_OVERVIEW_METRIC[key] || key;
    result.push(apiName);
  }
  return result.length > 0 ? result : DEFAULT_OVERVIEW_METRICS;
}
function getFormulaQueries(selectedMetrics, dateRange, apiFilters) {
  if (!Array.isArray(selectedMetrics)) {
    return [];
  }
  const useCompare = !!(dateRange?.compareReport && dateRange?.compareStart && dateRange?.compareEnd);
  const queries = [];
  for (const key of selectedMetrics) {
    const formula = FORMULA_METRICS[key];
    if (!formula || !formula.dimensions || formula.dimensions.length === 0) {
      continue;
    }
    const dimensions = ["date", ...formula.dimensions];
    const metrics = [...formula.metrics];
    const q2 = applyFiltersToQuery(
      {
        id: `overview_formula_${key}`,
        dimensions,
        metrics,
        compare: useCompare,
        limit: DEFAULT_ROW_LIMIT,
        ...useCompare && {
          compare_start: dateRange.compareStart,
          compare_end: dateRange.compareEnd
        }
      },
      apiFilters
    );
    queries.push(q2);
  }
  return queries;
}
const KEY_METRICS_QUERY = {
  id: "key_metrics",
  dimensions: ["date", "sessionDefaultChannelGroup"],
  metrics: ["sessions", "engagedSessions"],
  compare: true,
  limit: DEFAULT_ROW_LIMIT
};
const CHART_METRICS_QUERY = {
  id: "chart_metrics",
  dimensions: ["date"],
  metrics: ["sessions", "engagedSessions", "totalUsers", "newUsers", "engagementRate"],
  compare: false,
  limit: DEFAULT_ROW_LIMIT
};
const TAB_METRICS_FOR_QUERY = {
  traffic: ["totalUsers", "newUsers", "sessions", "engagementRate"],
  engagement: ["sessions", "screenPageViews", "bounceRate", "averageSessionDuration", "engagementRate", "newUsers", "totalUsers"],
  referrals: ["sessions", "engagedSessions", "sessionKeyEventRate", "totalUsers"],
  ecommerce: ["sessions", "totalRevenue", "ecommercePurchases", "averagePurchaseRevenue", "addToCarts"]
};
function getTabMetricsForQuery(activeTab) {
  const tab = activeTab && TAB_METRICS_FOR_QUERY[activeTab] ? activeTab : "traffic";
  return TAB_METRICS_FOR_QUERY[tab] || TAB_METRICS_FOR_QUERY.traffic;
}
const MARKETING_CAMPAIGNS_METRICS_FULL = ["sessions", "totalUsers", "engagementRate", "totalRevenue", "ecommercePurchases", "averagePurchaseRevenue"];
const MARKETING_CAMPAIGNS_METRICS_LITE = ["sessions", "totalUsers", "engagementRate", "totalRevenue"];
const MARKETING_CAMPAIGNS_QUERIES = [
  { id: "marketing_campaigns_campaign", dimensions: ["sessionCampaignName"], metrics: MARKETING_CAMPAIGNS_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "marketing_campaigns_source", dimensions: ["sessionSource"], metrics: MARKETING_CAMPAIGNS_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "marketing_campaigns_medium", dimensions: ["sessionMedium"], metrics: MARKETING_CAMPAIGNS_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "marketing_campaigns_term", dimensions: ["sessionManualTerm"], metrics: MARKETING_CAMPAIGNS_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "marketing_campaigns_content", dimensions: ["sessionManualAdContent"], metrics: MARKETING_CAMPAIGNS_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT }
];
function getMarketingCampaignsQueries(includeEcommerceMetrics) {
  const metrics = includeEcommerceMetrics ? MARKETING_CAMPAIGNS_METRICS_FULL : MARKETING_CAMPAIGNS_METRICS_LITE;
  return [
    { id: "marketing_campaigns_campaign", dimensions: ["sessionCampaignName"], metrics, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "marketing_campaigns_source", dimensions: ["sessionSource"], metrics, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "marketing_campaigns_medium", dimensions: ["sessionMedium"], metrics, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "marketing_campaigns_term", dimensions: ["sessionManualTerm"], metrics, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "marketing_campaigns_content", dimensions: ["sessionManualAdContent"], metrics, compare: false, limit: DEFAULT_ROW_LIMIT }
  ];
}
const PAGES_METRICS_FULL = ["sessions", "totalUsers", "engagementRate", "totalRevenue", "ecommercePurchases", "averagePurchaseRevenue"];
const PAGES_METRICS_LITE = ["sessions", "totalUsers", "engagementRate", "totalRevenue"];
const PAGES_METRICS_PAGE_LOCATION = ["sessions", "totalUsers", "engagementRate", "purchaseRevenue"];
const PAGES_METRICS_PAGE_LOCATION_LITE = ["sessions", "totalUsers", "engagementRate"];
const PAGES_QUERIES = [
  { id: "pages_landing_page", dimensions: ["landingPagePlusQueryString"], metrics: PAGES_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "pages_page_location", dimensions: ["pageLocation"], metrics: PAGES_METRICS_PAGE_LOCATION, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "pages_page_title", dimensions: ["pageTitle"], metrics: PAGES_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "pages_query_string", dimensions: ["pagePathPlusQueryString"], metrics: PAGES_METRICS_FULL, compare: false, limit: DEFAULT_ROW_LIMIT }
];
function getPagesQueries(includeEcommerceMetrics) {
  if (includeEcommerceMetrics) {
    return PAGES_QUERIES;
  }
  return [
    { id: "pages_landing_page", dimensions: ["landingPagePlusQueryString"], metrics: PAGES_METRICS_LITE, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "pages_page_location", dimensions: ["pageLocation"], metrics: PAGES_METRICS_PAGE_LOCATION_LITE, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "pages_page_title", dimensions: ["pageTitle"], metrics: PAGES_METRICS_LITE, compare: false, limit: DEFAULT_ROW_LIMIT },
    { id: "pages_query_string", dimensions: ["pagePathPlusQueryString"], metrics: PAGES_METRICS_LITE, compare: false, limit: DEFAULT_ROW_LIMIT }
  ];
}
const CUSTOM_DIMENSIONS_METRICS = ["sessions", "totalUsers", "engagementRate", "totalRevenue", "ecommercePurchases", "averagePurchaseRevenue"];
const CUSTOM_DIMENSIONS_METRICS_LITE = ["sessions", "totalUsers", "engagementRate", "totalRevenue"];
const CUSTOM_DIMENSIONS_QUERIES = [
  { id: "custom_dimensions_logged_in", dimensions: ["customEvent:logged_in"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_post_type", dimensions: ["customEvent:post_type"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_author", dimensions: ["customEvent:author"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_category", dimensions: ["customEvent:category"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_tags", dimensions: ["customEvent:tags"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_focus_keyword", dimensions: ["customEvent:focus_keyword"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_day_of_week", dimensions: ["dayOfWeek"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "custom_dimensions_seo_score", dimensions: ["customEvent:seo_score"], metrics: CUSTOM_DIMENSIONS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT }
];
const CUSTOM_DIMENSIONS_QUERIES_PRIMARY = CUSTOM_DIMENSIONS_QUERIES.slice(0, 5);
const CUSTOM_DIMENSIONS_QUERIES_DEFERRED = CUSTOM_DIMENSIONS_QUERIES.slice(5, 9);
function getCustomDimensionsQueries(includeEcommerceMetrics) {
  const metrics = includeEcommerceMetrics ? CUSTOM_DIMENSIONS_METRICS : CUSTOM_DIMENSIONS_METRICS_LITE;
  return CUSTOM_DIMENSIONS_QUERIES_PRIMARY.map((q2) => ({ ...q2, metrics }));
}
function getCustomDimensionsDeferredQueries(includeEcommerceMetrics) {
  const metrics = includeEcommerceMetrics ? CUSTOM_DIMENSIONS_METRICS : CUSTOM_DIMENSIONS_METRICS_LITE;
  return CUSTOM_DIMENSIONS_QUERIES_DEFERRED.map((q2) => ({
    ...q2,
    metrics: (includeEcommerceMetrics ? q2.metricsOverride : q2.metricsOverrideLite) ?? metrics
  }));
}
const DEMOGRAPHICS_METRICS = ["sessions", "totalRevenue", "engagementRate"];
const DEMOGRAPHICS_QUERIES = [
  { id: "demographics_country", dimensions: ["country"], metrics: DEMOGRAPHICS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "demographics_state", dimensions: ["region"], metrics: DEMOGRAPHICS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "demographics_new_vs_returning", dimensions: ["newVsReturning"], metrics: DEMOGRAPHICS_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT }
];
const DEVICES_METRICS = ["sessions", "totalRevenue", "engagementRate"];
const DEVICES_QUERIES = [
  { id: "devices_browser", dimensions: ["browser"], metrics: DEVICES_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "devices_os", dimensions: ["operatingSystem"], metrics: DEVICES_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT },
  { id: "devices_size", dimensions: ["deviceCategory"], metrics: DEVICES_METRICS, compare: false, limit: DEFAULT_ROW_LIMIT }
];
const FORM_SUBMISSIONS_FILTERS = {
  conditions: [{ field: "customEvent:form_id", match: "notEmpty" }]
};
const FORM_SUBMISSIONS_QUERY_SOURCE_MEDIUM = {
  id: "form_submissions_source_medium",
  dimensions: ["dateHour", "country", "sessionSource", "sessionMedium", "customEvent:form_id"],
  metrics: ["eventCount"],
  compare: false,
  orderBy: [{ field: "dateHour" }],
  limit: DEFAULT_ROW_LIMIT,
  filters: FORM_SUBMISSIONS_FILTERS
};
const FORM_SUBMISSIONS_QUERY_CAMPAIGN = {
  id: "form_submissions_campaign",
  dimensions: ["sessionCampaignName", "country", "sessionSource", "sessionMedium", "customEvent:form_id"],
  metrics: ["eventCount"],
  compare: false,
  orderBy: [{ field: "sessionCampaignName" }],
  limit: DEFAULT_ROW_LIMIT,
  filters: FORM_SUBMISSIONS_FILTERS
};
const FORM_SUBMISSIONS_QUERIES = [
  FORM_SUBMISSIONS_QUERY_SOURCE_MEDIUM,
  FORM_SUBMISSIONS_QUERY_CAMPAIGN
];
const ECOMMERCE_LOG_DIMENSIONS = [
  "dateHour",
  "transactionId",
  "sessionSource",
  "sessionMedium",
  "sessionCampaignName"
];
const ECOMMERCE_LOG_METRICS = ["purchaseRevenue"];
const ECOMMERCE_LOG_QUERY_DATE = {
  id: "ecommerce_log_date",
  dimensions: ECOMMERCE_LOG_DIMENSIONS,
  metrics: ECOMMERCE_LOG_METRICS,
  compare: false,
  orderBy: [{ field: "dateHour", desc: true }],
  limit: DEFAULT_ROW_LIMIT
};
const ECOMMERCE_LOG_QUERY_SOURCE_MEDIUM = {
  id: "ecommerce_log_source_medium",
  dimensions: ECOMMERCE_LOG_DIMENSIONS,
  metrics: ECOMMERCE_LOG_METRICS,
  compare: false,
  orderBy: [{ field: "sessionSource" }, { field: "sessionMedium" }],
  limit: DEFAULT_ROW_LIMIT
};
const ECOMMERCE_LOG_QUERY_CAMPAIGN = {
  id: "ecommerce_log_campaign",
  dimensions: ECOMMERCE_LOG_DIMENSIONS,
  metrics: ECOMMERCE_LOG_METRICS,
  compare: false,
  orderBy: [{ field: "sessionCampaignName" }],
  limit: DEFAULT_ROW_LIMIT
};
const ECOMMERCE_DATA_QUERY = {
  id: "ecommerce_data",
  dimensions: ["itemName", "orderCoupon"],
  metrics: ["itemRevenue", "itemsPurchased"],
  compare: false,
  limit: DEFAULT_ROW_LIMIT
};
const QUERY_DIMENSIONS = Object.fromEntries(
  [
    ...MARKETING_CAMPAIGNS_QUERIES,
    ...PAGES_QUERIES,
    ...CUSTOM_DIMENSIONS_QUERIES,
    ...DEMOGRAPHICS_QUERIES,
    ...DEVICES_QUERIES,
    ...FORM_SUBMISSIONS_QUERIES,
    ECOMMERCE_LOG_QUERY_DATE,
    ECOMMERCE_LOG_QUERY_SOURCE_MEDIUM,
    ECOMMERCE_LOG_QUERY_CAMPAIGN,
    ECOMMERCE_DATA_QUERY
  ].map((q2) => [q2.id, q2.dimensions])
);
function buildApiFilters(filterRows, device = "") {
  const conditions = [];
  if (Array.isArray(filterRows)) {
    for (const row of filterRows) {
      if (!row.type || row.value == null || String(row.value).trim() === "") {
        continue;
      }
      conditions.push({
        field: row.type,
        type: "dimension",
        match: row.condition === "is_not" ? "not_equal" : "exact",
        value: String(row.value).trim(),
        caseSensitive: false
      });
    }
  }
  if (device && ["desktop", "mobile", "tablet"].includes(device)) {
    conditions.push({
      field: "deviceCategory",
      type: "dimension",
      match: "exact",
      value: device,
      caseSensitive: false
    });
  }
  if (conditions.length === 0) {
    return null;
  }
  return { operator: "and", conditions };
}
function mapFunnelStepsToApi(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    return [];
  }
  return steps.filter((s) => s && String(s.value || "").trim()).map((s) => {
    const value = String(s.value).trim();
    if (s.type === "event") {
      return { name: value, eventName: value };
    }
    return { name: value, eventName: "page_view" };
  });
}
function buildFunnelRequestBody(dateRange, activeFunnel, apiFilters = null) {
  const apiSteps = mapFunnelStepsToApi(activeFunnel?.steps || []);
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  const hasFilters = apiFilters && Array.isArray(apiFilters.conditions) && apiFilters.conditions.length > 0;
  const body = {
    start,
    end,
    funnel: {
      isOpenFunnel: false,
      steps: apiSteps
    },
    funnelBreakdown: { dimension: "deviceCategory", limit: 5 },
    funnelVisualizationType: "STANDARD_FUNNEL",
    limit: 100,
    returnPropertyQuota: false
  };
  if (hasFilters) {
    body.filters = apiFilters;
  }
  return body;
}
function funnelCacheKeyFrom(dateRange, activeFunnel, apiFilters) {
  return {
    start: dateRange?.start,
    end: dateRange?.end,
    funnel: activeFunnel ?? null,
    filters: apiFilters ?? null
  };
}
function formatFunnelResponse(decodedBody) {
  if (decodedBody?.success && decodedBody?.data) {
    return decodedBody.data;
  }
  if (decodedBody?.data) {
    return decodedBody.data;
  }
  return decodedBody ?? null;
}
async function directFetchFunnelFromRelay(dateRange, activeFunnel, apiFilters) {
  const body = buildFunnelRequestBody(dateRange, activeFunnel, apiFilters);
  return relayFunnel(body);
}
const funnelCachedFetch = useCachedFetch({
  cacheKeyPrefix: "overview_funnel",
  cacheKeyFrom: (...args) => funnelCacheKeyFrom(...args),
  wpFetch: async (cacheKey, _dateRange, _activeFunnel, apiFilters) => getBackfillCache(cacheKey, OVERVIEW_CACHE_GROUP, {
    api_filters: apiFilters ?? null
  }),
  directFetch: directFetchFunnelFromRelay,
  canDirectFetch: () => !isSampleDataEnabled() && !!getMiGlobal("bearer_token"),
  backfill: async (dateRange, activeFunnel, apiFilters, rawData) => {
    const cacheKey = buildCacheKey("overview_funnel", funnelCacheKeyFrom, dateRange, activeFunnel, apiFilters);
    const formatted = formatFunnelResponse(rawData);
    await backfillToWp(OVERVIEW_CACHE_GROUP, cacheKey, formatted);
  },
  formatResponse: (rawData) => formatFunnelResponse(rawData)
});
const fetchFunnelData = async (dateRange, activeFunnel, apiFilters = null) => {
  if (!isAddonActive("ecommerce")) {
    return null;
  }
  if (isSampleDataEnabled()) {
    return generateSampleFunnelData({ apiFilters });
  }
  const reportingApi = getMiGlobal("reporting_api", {});
  const canUseBearer = await ensureBearerToken();
  if (!canUseBearer && (!reportingApi.url || !reportingApi.key || !reportingApi.token)) {
    return Promise.reject({
      title: __("Error loading funnel data", "google-analytics-for-wordpress"),
      message: __("Reporting API credentials are not available.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  if (!start || !end) {
    return Promise.reject({
      title: __("Error loading funnel data", "google-analytics-for-wordpress"),
      message: __("Start and end dates are required.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  if (!activeFunnel || !Array.isArray(activeFunnel.steps) || activeFunnel.steps.length < 2) {
    return Promise.reject({
      title: __("Error loading funnel data", "google-analytics-for-wordpress"),
      message: __("A funnel with at least two steps is required.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  try {
    return await funnelCachedFetch.fetchWithCache(dateRange, activeFunnel, apiFilters);
  } catch (err) {
    return rejectReport(__("Error loading funnel data", "google-analytics-for-wordpress"), err?.message);
  }
};
function applyFiltersToQuery(query, apiFilters) {
  if (!apiFilters || !apiFilters.conditions?.length) {
    return query;
  }
  const hasExisting = query.filters && Array.isArray(query.filters.conditions);
  const filters = hasExisting ? { operator: "and", conditions: [...query.filters.conditions, ...apiFilters.conditions] } : apiFilters;
  return { ...query, filters };
}
function formatMarketingResponse(decodedBody) {
  if (!decodedBody?.success || !decodedBody?.data) {
    throw new Error("Invalid marketing response");
  }
  const data = decodedBody.data?.data ?? decodedBody.data;
  return {
    campaign: data?.marketing_campaigns_campaign ?? null,
    source: data?.marketing_campaigns_source ?? null,
    medium: data?.marketing_campaigns_medium ?? null,
    term: data?.marketing_campaigns_term ?? null,
    content: data?.marketing_campaigns_content ?? null
  };
}
function formatPagesResponse(decodedBody) {
  if (!decodedBody?.success || !decodedBody?.data) {
    throw new Error("Invalid pages response");
  }
  const data = decodedBody.data?.data ?? decodedBody.data;
  return {
    landingPage: data?.pages_landing_page ?? null,
    pageLocation: data?.pages_page_location ?? null,
    pageTitle: data?.pages_page_title ?? null,
    queryString: data?.pages_query_string ?? null
  };
}
function formatFormSubmissionsResponse(decodedBody) {
  if (!decodedBody?.success || !decodedBody?.data) {
    throw new Error("Invalid form submissions response");
  }
  const data = decodedBody.data?.data ?? decodedBody.data;
  return {
    sourceMedium: data?.form_submissions_source_medium ?? null,
    campaign: data?.form_submissions_campaign ?? null
  };
}
function formatEcommerceOverviewResponse(decodedBody) {
  if (!decodedBody?.success || !decodedBody?.data) {
    throw new Error("Invalid ecommerce response");
  }
  const data = decodedBody.data?.data ?? decodedBody.data;
  return {
    ecommerce_log_date: data?.ecommerce_log_date ?? null,
    ecommerce_log_source_medium: data?.ecommerce_log_source_medium ?? null,
    ecommerce_log_campaign: data?.ecommerce_log_campaign ?? null,
    ecommerce_data: data?.ecommerce_data ?? null
  };
}
function formatDemographicsResponse(decodedBody) {
  if (!decodedBody?.success || !decodedBody?.data) {
    throw new Error("Invalid demographics response");
  }
  const data = decodedBody.data?.data ?? decodedBody.data;
  return {
    country: data?.demographics_country ?? null,
    state: data?.demographics_state ?? null,
    newVsReturning: data?.demographics_new_vs_returning ?? null
  };
}
function formatDevicesResponse(decodedBody) {
  if (!decodedBody?.success || !decodedBody?.data) {
    throw new Error("Invalid devices response");
  }
  const data = decodedBody.data?.data ?? decodedBody.data;
  return {
    browser: data?.devices_browser ?? null,
    os: data?.devices_os ?? null,
    size: data?.devices_size ?? null
  };
}
function overviewBundleCacheKeyFrom(dateRange, apiFilters) {
  return { start: dateRange?.start, end: dateRange?.end, filters: apiFilters };
}
async function directFetchOverviewBundle(dateRange, apiFilters) {
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  const hasFormsAddon = isAddonActive("forms");
  const hasEcommerceAddon = isAddonActive("ecommerce");
  const hasPageInsightsAddon = isAddonActive("page_insights");
  const marketingQueries = MARKETING_CAMPAIGNS_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const demographicsQueries = DEMOGRAPHICS_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const devicesQueries = DEVICES_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const requests = [];
  const requestKeys = [];
  requests.push(relayReportingQuery({ start, end, queries: marketingQueries }));
  requestKeys.push("marketing");
  if (hasPageInsightsAddon) {
    const pagesQueries = PAGES_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
    requests.push(relayReportingQuery({ start, end, queries: pagesQueries }));
    requestKeys.push("pages");
  }
  if (hasFormsAddon) {
    const formQueries = FORM_SUBMISSIONS_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
    requests.push(relayReportingQuery({ start, end, queries: formQueries }));
    requestKeys.push("forms");
  }
  if (hasEcommerceAddon) {
    const logDateQuery = applyFiltersToQuery({ ...ECOMMERCE_LOG_QUERY_DATE }, apiFilters);
    const logSourceMediumQuery = applyFiltersToQuery({ ...ECOMMERCE_LOG_QUERY_SOURCE_MEDIUM }, apiFilters);
    const logCampaignQuery = applyFiltersToQuery({ ...ECOMMERCE_LOG_QUERY_CAMPAIGN }, apiFilters);
    const dataQuery = applyFiltersToQuery({ ...ECOMMERCE_DATA_QUERY }, apiFilters);
    requests.push(relayReportingQuery({
      start,
      end,
      queries: [logDateQuery, logSourceMediumQuery, logCampaignQuery, dataQuery]
    }));
    requestKeys.push("ecommerce");
  }
  requests.push(relayReportingQuery({ start, end, queries: demographicsQueries }));
  requestKeys.push("demographics");
  requests.push(relayReportingQuery({ start, end, queries: devicesQueries }));
  requestKeys.push("devices");
  const results = await Promise.all(requests);
  const resultMap = {};
  requestKeys.forEach((key, idx) => {
    resultMap[key] = results[idx];
  });
  return {
    marketing_campaigns: formatMarketingResponse(resultMap.marketing),
    pages: resultMap.pages ? formatPagesResponse(resultMap.pages) : null,
    form_submissions: resultMap.forms ? formatFormSubmissionsResponse(resultMap.forms) : null,
    ecommerce_overview: resultMap.ecommerce ? formatEcommerceOverviewResponse(resultMap.ecommerce) : null,
    demographics: formatDemographicsResponse(resultMap.demographics),
    devices: formatDevicesResponse(resultMap.devices)
  };
}
const overviewBundleCachedFetch = useCachedFetch({
  cacheKeyPrefix: "overview_bundle",
  cacheKeyFrom: (...args) => overviewBundleCacheKeyFrom(...args),
  wpFetch: async (cacheKey, _dateRange, apiFilters) => getBackfillCache(cacheKey, OVERVIEW_CACHE_GROUP, {
    api_filters: apiFilters ?? null
  }),
  directFetch: directFetchOverviewBundle,
  canDirectFetch: () => !isSampleDataEnabled() && !!getMiGlobal("bearer_token"),
  backfill: async (dateRange, apiFilters, rawData) => {
    const cacheKey = buildCacheKey("overview_bundle", overviewBundleCacheKeyFrom, dateRange, apiFilters);
    await backfillToWp(OVERVIEW_CACHE_GROUP, cacheKey, rawData);
  },
  formatResponse: (raw) => raw
});
const overviewBundleInFlight = /* @__PURE__ */ new Map();
async function getOverviewBundle(dateRange, apiFilters) {
  if (isSampleDataEnabled()) {
    return generateSampleBundleData({ dateRange, apiFilters });
  }
  const key = overviewBundleCachedFetch.generateCacheKey(dateRange, apiFilters);
  if (overviewBundleInFlight.has(key)) {
    return overviewBundleInFlight.get(key);
  }
  const p = overviewBundleCachedFetch.fetchWithCache(dateRange, apiFilters).finally(() => overviewBundleInFlight.delete(key));
  overviewBundleInFlight.set(key, p);
  return p;
}
const fetchOverviewData = async (dateRange, apiFilters = null, selectedMetrics = null, activeTab = null) => {
  if (isSampleDataEnabled()) {
    const overviewMetricsToRequest = getOverviewMetricsToRequest(selectedMetrics);
    const raw = generateSampleOverviewData({
      dateRange,
      apiFilters,
      selectedMetrics,
      activeTab,
      overviewMetricsToRequest
    });
    return formatOverviewResponse({ success: true, data: raw }, dateRange, selectedMetrics);
  }
  const canUseBearer = await ensureBearerToken() || !!getMiGlobal("bearer_token");
  if (!canUseBearer) {
    return Promise.reject({
      title: __("Error loading overview data", "google-analytics-for-wordpress"),
      message: __("Unable to get authentication token. Please refresh the page.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  if (!start || !end) {
    return Promise.reject({
      title: __("Error loading overview data", "google-analytics-for-wordpress"),
      message: __("Start and end dates are required.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  try {
    return await overviewCachedFetch.fetchWithCache(dateRange, apiFilters, selectedMetrics, activeTab);
  } catch (err) {
    const supportUrl = getMonsterInsightsUrl(
      "admin-notices",
      "error-overview-api",
      "https://www.monsterinsights.com/my-account/support"
    );
    const message = err?.message || __("An unknown error occurred.", "google-analytics-for-wordpress");
    return Promise.reject({
      title: __("Error loading overview data", "google-analytics-for-wordpress"),
      message,
      support_url: supportUrl,
      isAjaxError: true
    });
  }
};
async function fetchOverviewSection({ dateRange, apiFilters, errorLabel, onBearer, onFallback }) {
  const reportingApi = getMiGlobal("reporting_api", {});
  const canUseBearer = await ensureBearerToken();
  if (!canUseBearer && (!reportingApi.url || !reportingApi.key || !reportingApi.token)) {
    return Promise.reject({
      title: errorLabel,
      message: __("Reporting API credentials are not available.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  if (!start || !end) {
    return Promise.reject({
      title: errorLabel,
      message: __("Start and end dates are required.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  if (canUseBearer) {
    try {
      return await onBearer({ start, end, reportingApi });
    } catch (err) {
      return rejectReport(errorLabel, err?.message);
    }
  }
  return onFallback({ start, end, reportingApi });
}
const fetchMarketingCampaignsData = async (dateRange, apiFilters = null, includeEcommerceMetrics = true) => {
  const marketingQueries = getMarketingCampaignsQueries(includeEcommerceMetrics).map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const errorLabel = __("Error loading marketing campaigns data", "google-analytics-for-wordpress");
  return fetchOverviewSection({
    dateRange,
    apiFilters,
    errorLabel,
    onBearer: async ({ start, end }) => {
      if (includeEcommerceMetrics) {
        const bundle = await getOverviewBundle(dateRange, apiFilters);
        return bundle?.marketing_campaigns ?? null;
      }
      const marketingBody = await relayReportingQuery({ start, end, queries: marketingQueries });
      return formatMarketingResponse(marketingBody);
    },
    onFallback: ({ start, end }) => relayFallbackFetch(
      "api/v3/reporting/query",
      { start, end, queries: marketingQueries },
      formatMarketingResponse,
      errorLabel
    )
  });
};
const fetchPagesData = async (dateRange, apiFilters = null, includeEcommerceMetrics = true) => {
  if (!isAddonActive("page_insights")) {
    return null;
  }
  const pagesQueries = getPagesQueries(includeEcommerceMetrics).map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const errorLabel = __("Error loading pages data", "google-analytics-for-wordpress");
  return fetchOverviewSection({
    dateRange,
    apiFilters,
    errorLabel,
    onBearer: async ({ start, end }) => {
      if (includeEcommerceMetrics) {
        const bundle = await getOverviewBundle(dateRange, apiFilters);
        return bundle?.pages ?? null;
      }
      const pagesBody = await relayReportingQuery({ start, end, queries: pagesQueries });
      return formatPagesResponse(pagesBody);
    },
    onFallback: ({ start, end }) => relayFallbackFetch(
      "api/v3/reporting/query",
      { start, end, queries: pagesQueries },
      formatPagesResponse,
      errorLabel
    )
  });
};
const fetchCustomDimensionsData = async (dateRange, apiFilters = null, includeEcommerceMetrics = true) => {
  if (!isAddonActive("dimensions")) {
    return null;
  }
  if (isSampleDataEnabled()) {
    return generateSampleCustomDimensionsData({ apiFilters });
  }
  const canUseBearer = await ensureBearerToken() || !!getMiGlobal("bearer_token");
  if (!canUseBearer) {
    return Promise.reject({
      title: __("Error loading custom dimensions data", "google-analytics-for-wordpress"),
      message: __("Unable to get authentication token. Please refresh the page.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  if (!start || !end) {
    return Promise.reject({
      title: __("Error loading custom dimensions data", "google-analytics-for-wordpress"),
      message: __("Start and end dates are required.", "google-analytics-for-wordpress"),
      support_url: getMonsterInsightsUrl(
        "admin-notices",
        "error-overview-api",
        "https://www.monsterinsights.com/my-account/support"
      ),
      isAjaxError: true
    });
  }
  try {
    return await customDimensionsCachedFetch.fetchWithCache(dateRange, apiFilters, includeEcommerceMetrics);
  } catch (err) {
    const supportUrl = getMonsterInsightsUrl(
      "admin-notices",
      "error-overview-api",
      "https://www.monsterinsights.com/my-account/support"
    );
    return Promise.reject({
      title: __("Error loading custom dimensions data", "google-analytics-for-wordpress"),
      message: err?.message || __("An unknown error occurred.", "google-analytics-for-wordpress"),
      support_url: supportUrl,
      isAjaxError: true
    });
  }
};
const fetchCustomDimensionsDeferredData = async (dateRange, apiFilters = null, includeEcommerceMetrics = true) => {
  if (!isAddonActive("dimensions")) {
    return { focusKeyword: null, dayOfWeek: null, seoScore: null, focusKeyphrase: null };
  }
  if (isSampleDataEnabled()) {
    const full = generateSampleCustomDimensionsData({ apiFilters });
    return {
      focusKeyword: full?.focusKeyword ?? null,
      dayOfWeek: full?.dayOfWeek ?? null,
      seoScore: full?.seoScore ?? null,
      focusKeyphrase: full?.focusKeyphrase ?? null
    };
  }
  const start = dateRange?.start || "";
  const end = dateRange?.end || "";
  if (!start || !end) {
    return { focusKeyword: null, dayOfWeek: null, seoScore: null, focusKeyphrase: null };
  }
  try {
    return await customDimensionsDeferredCachedFetch.fetchWithCache(dateRange, apiFilters, includeEcommerceMetrics);
  } catch (_err) {
    return { focusKeyword: null, dayOfWeek: null, seoScore: null, focusKeyphrase: null };
  }
};
const fetchFormSubmissionsData = async (dateRange, apiFilters = null) => {
  if (!isAddonActive("forms")) {
    return null;
  }
  const errorLabel = __("Error loading form submissions data", "google-analytics-for-wordpress");
  return fetchOverviewSection({
    dateRange,
    apiFilters,
    errorLabel,
    onBearer: async () => {
      const bundle = await getOverviewBundle(dateRange, apiFilters);
      return bundle?.form_submissions ?? null;
    },
    onFallback: ({ start, end }) => relayFallbackFetch(
      "api/v3/reporting/query",
      {
        start,
        end,
        queries: FORM_SUBMISSIONS_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters))
      },
      formatFormSubmissionsResponse,
      errorLabel
    )
  });
};
const fetchEcommerceOverviewData = async (dateRange, apiFilters = null) => {
  if (!isAddonActive("ecommerce")) {
    return null;
  }
  const logDateQuery = applyFiltersToQuery({ ...ECOMMERCE_LOG_QUERY_DATE }, apiFilters);
  const logSourceMediumQuery = applyFiltersToQuery({ ...ECOMMERCE_LOG_QUERY_SOURCE_MEDIUM }, apiFilters);
  const logCampaignQuery = applyFiltersToQuery({ ...ECOMMERCE_LOG_QUERY_CAMPAIGN }, apiFilters);
  const dataQuery = applyFiltersToQuery({ ...ECOMMERCE_DATA_QUERY }, apiFilters);
  const errorLabel = __("Error loading eCommerce data", "google-analytics-for-wordpress");
  return fetchOverviewSection({
    dateRange,
    apiFilters,
    errorLabel,
    onBearer: async () => {
      const bundle = await getOverviewBundle(dateRange, apiFilters);
      return bundle?.ecommerce_overview ?? null;
    },
    onFallback: ({ start, end }) => relayFallbackFetch(
      "api/v3/reporting/query",
      { start, end, queries: [logDateQuery, logSourceMediumQuery, logCampaignQuery, dataQuery] },
      formatEcommerceOverviewResponse,
      errorLabel
    )
  });
};
const fetchDemographicsData = async (dateRange, apiFilters = null) => {
  const demographicsQueries = DEMOGRAPHICS_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const errorLabel = __("Error loading demographics data", "google-analytics-for-wordpress");
  return fetchOverviewSection({
    dateRange,
    apiFilters,
    errorLabel,
    onBearer: async () => {
      const bundle = await getOverviewBundle(dateRange, apiFilters);
      return bundle?.demographics ?? null;
    },
    onFallback: ({ start, end }) => relayFallbackFetch(
      "api/v3/reporting/query",
      { start, end, queries: demographicsQueries },
      formatDemographicsResponse,
      errorLabel
    )
  });
};
const fetchDevicesData = async (dateRange, apiFilters = null) => {
  const devicesQueries = DEVICES_QUERIES.map((q2) => applyFiltersToQuery({ ...q2 }, apiFilters));
  const errorLabel = __("Error loading devices data", "google-analytics-for-wordpress");
  return fetchOverviewSection({
    dateRange,
    apiFilters,
    errorLabel,
    onBearer: async () => {
      const bundle = await getOverviewBundle(dateRange, apiFilters);
      return bundle?.devices ?? null;
    },
    onFallback: ({ start, end }) => relayFallbackFetch(
      "api/v3/reporting/query",
      { start, end, queries: devicesQueries },
      formatDevicesResponse,
      errorLabel
    )
  });
};
const dimensionValuesCache = /* @__PURE__ */ new Map();
async function fetchDimensionValues(dimension, dateRange, apiFilters = null) {
  if (!dimension || !dateRange?.start || !dateRange?.end) {
    return [];
  }
  const cacheKey = `${dimension}|${dateRange.start}|${dateRange.end}|${JSON.stringify(apiFilters ?? "")}`;
  if (dimensionValuesCache.has(cacheKey)) {
    return dimensionValuesCache.get(cacheKey);
  }
  if (isSampleDataEnabled()) {
    return [];
  }
  const sanitizedDimension = dimension.replace(/[^a-zA-Z0-9_-]/g, "_");
  const queryId = `dimension_values_${sanitizedDimension}`;
  const query = {
    id: queryId,
    dimensions: [dimension],
    metrics: ["sessions"],
    compare: false,
    limit: DEFAULT_ROW_LIMIT
  };
  const queryWithFilters = applyFiltersToQuery(query, apiFilters);
  try {
    const canUseBearer = await ensureBearerToken() || !!getMiGlobal("bearer_token");
    if (!canUseBearer) {
      return [];
    }
    const body = {
      start: dateRange.start,
      end: dateRange.end,
      queries: [queryWithFilters]
    };
    const decodedBody = await relayReportingQuery(body);
    let data = null;
    if (decodedBody?.success && decodedBody?.data) {
      data = decodedBody.data?.data ?? decodedBody.data;
    } else if (decodedBody?.data) {
      data = decodedBody.data?.data ?? decodedBody.data;
    }
    const queryResult = data?.[queryId];
    const rows = queryResult?.rows ?? [];
    const seen = /* @__PURE__ */ new Set();
    const values = [];
    for (const row of rows) {
      const val = row?.d?.[0];
      if (val != null && String(val).trim() !== "" && !seen.has(String(val))) {
        seen.add(String(val));
        values.push({ value: String(val), label: String(val) });
      }
    }
    values.sort((a, b) => a.label.localeCompare(b.label));
    dimensionValuesCache.set(cacheKey, values);
    return values;
  } catch {
    return [];
  }
}
const DIMENSION_STORE_MAP = {
  // Marketing Campaigns
  sessionCampaignName: { storeKey: "marketingCampaigns", tabKey: "campaign" },
  sessionSource: { storeKey: "marketingCampaigns", tabKey: "source" },
  sessionMedium: { storeKey: "marketingCampaigns", tabKey: "medium" },
  sessionManualTerm: { storeKey: "marketingCampaigns", tabKey: "term" },
  sessionManualAdContent: { storeKey: "marketingCampaigns", tabKey: "content" },
  // Pages
  landingPagePlusQueryString: { storeKey: "pages", tabKey: "landingPage" },
  pageTitle: { storeKey: "pages", tabKey: "pageTitle" },
  // Custom Dimensions
  "customUser:logged_in": { storeKey: "customDimensions", tabKey: "loggedIn" },
  "customEvent:post_type": { storeKey: "customDimensions", tabKey: "postType" },
  "customEvent:author": { storeKey: "customDimensions", tabKey: "author" },
  "customEvent:category": { storeKey: "customDimensions", tabKey: "category" },
  "customEvent:tags": { storeKey: "customDimensions", tabKey: "tags" },
  "customEvent:focus_keyword": { storeKey: "customDimensions", tabKey: "focusKeyword" },
  dayOfWeek: { storeKey: "customDimensions", tabKey: "dayOfWeek" },
  "customEvent:seo_score": { storeKey: "customDimensions", tabKey: "seoScore" },
  "customEvent:focus_keyphrase": { storeKey: "customDimensions", tabKey: "focusKeyphrase" },
  // Demographics
  country: { storeKey: "demographics", tabKey: "country" },
  region: { storeKey: "demographics", tabKey: "state" },
  // Devices
  browser: { storeKey: "devices", tabKey: "browser" },
  operatingSystem: { storeKey: "devices", tabKey: "os" },
  deviceCategory: { storeKey: "devices", tabKey: "size" }
};
const FORM_SUBMISSIONS_DIMENSION_TAB = {
  dateHour: "sourceMedium",
  sessionCampaignName: "campaign"
};
function getValuesForDimension(dimensionKey, storeData) {
  if (!dimensionKey || !storeData) {
    return [];
  }
  const mapping = DIMENSION_STORE_MAP[dimensionKey];
  if (!mapping) {
    return [];
  }
  const sourceData = storeData[mapping.storeKey];
  if (!sourceData) {
    return [];
  }
  const tabData = sourceData[mapping.tabKey];
  if (!tabData) {
    return [];
  }
  const rows = Array.isArray(tabData?.rows) ? tabData.rows : Array.isArray(tabData) ? tabData : [];
  if (rows.length === 0) {
    return [];
  }
  const tabToQueryId = STORE_TAB_TO_QUERY_ID[mapping.storeKey];
  const queryId = tabToQueryId?.[mapping.tabKey];
  const dimensionsOrder = queryId ? QUERY_DIMENSIONS[queryId] : null;
  const responseOrder = dimensionsOrder ? getResponseDimensionOrder(dimensionsOrder) : [];
  const dimIndex = responseOrder.length ? responseOrder.indexOf(dimensionKey) : 0;
  const useIndex = dimIndex >= 0 ? dimIndex : 0;
  const uniqueValues = /* @__PURE__ */ new Set();
  rows.forEach((row) => {
    const val = row?.d?.[useIndex];
    if (val !== void 0 && val !== null && String(val).trim() !== "") {
      uniqueValues.add(String(val));
    }
  });
  return Array.from(uniqueValues).sort((a, b) => a.localeCompare(b)).map((val) => ({ value: val, label: val }));
}
const MC_DIMENSION_TAB = {
  sessionCampaignName: "campaign",
  sessionSource: "source",
  sessionMedium: "medium",
  sessionManualTerm: "term",
  sessionManualAdContent: "content"
};
const PAGES_DIMENSION_TAB = {
  landingPagePlusQueryString: "landingPage",
  pageLocation: "pageLocation",
  pageTitle: "pageTitle",
  pagePathPlusQueryString: "queryString"
};
const CUSTOM_DIMENSIONS_DIMENSION_TAB = {
  "customUser:logged_in": "loggedIn",
  "customEvent:post_type": "postType",
  "customEvent:author": "author",
  "customEvent:category": "category",
  "customEvent:tags": "tags",
  "customEvent:focus_keyword": "focusKeyword",
  dayOfWeek: "dayOfWeek",
  "customEvent:seo_score": "seoScore",
  "customEvent:focus_keyphrase": "focusKeyphrase"
};
const DEMOGRAPHICS_DIMENSION_TAB = {
  country: "country",
  region: "state",
  newVsReturning: "newVsReturning"
};
const DEVICES_DIMENSION_TAB = {
  browser: "browser",
  operatingSystem: "os",
  deviceCategory: "size"
};
function getResponseDimensionOrder(dimensionsOrder) {
  if (!dimensionsOrder || dimensionsOrder.length === 0) {
    return [];
  }
  return [...dimensionsOrder].sort();
}
function aggregateRowsByPrimaryDimension(rows, primaryIndexInResponse) {
  if (!rows || rows.length === 0) {
    return rows;
  }
  const byPrimary = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const d = row?.d ?? [];
    const primaryValue = d[primaryIndexInResponse];
    const primaryKey = primaryValue !== void 0 && primaryValue !== null ? String(primaryValue) : "";
    const m0 = row?.m?.[0];
    const metrics = Array.isArray(m0) ? m0.map((v) => parseFloat(v) || 0) : [];
    if (!byPrimary.has(primaryKey)) {
      byPrimary.set(primaryKey, { d: [primaryValue], m: [metrics] });
    } else {
      const existing = byPrimary.get(primaryKey);
      const existingMetrics = existing.m[0];
      for (let i = 0; i < metrics.length; i++) {
        existingMetrics[i] = (existingMetrics[i] || 0) + (metrics[i] || 0);
      }
    }
  }
  return Array.from(byPrimary.values());
}
function filterByDimensionsOrder(rawTabData, dimensionsOrder, activeFilters, primaryDimensionKey) {
  if (!rawTabData) {
    return rawTabData;
  }
  if (!dimensionsOrder || dimensionsOrder.length === 0) {
    return rawTabData;
  }
  const rows = Array.isArray(rawTabData?.rows) ? rawTabData.rows : Array.isArray(rawTabData) ? rawTabData : [];
  if (rows.length === 0) {
    return rawTabData;
  }
  const responseOrder = getResponseDimensionOrder(dimensionsOrder);
  let resultRows = rows;
  if (activeFilters && activeFilters.length > 0) {
    const applicableFilters = activeFilters.filter((f) => responseOrder.includes(f.type)).map((f) => ({
      ...f,
      dIndex: responseOrder.indexOf(f.type)
    }));
    if (applicableFilters.length > 0) {
      resultRows = rows.filter((row) => {
        const d = row?.d ?? [];
        return applicableFilters.every((filter) => {
          const dimVal = String(d[filter.dIndex] ?? "");
          if (filter.condition === "is") {
            return dimVal === filter.value;
          }
          if (filter.condition === "is_not") {
            return dimVal !== filter.value;
          }
          return true;
        });
      });
    }
  }
  if (dimensionsOrder.length > 1 && primaryDimensionKey && responseOrder.includes(primaryDimensionKey)) {
    const primaryIndexInResponse = responseOrder.indexOf(primaryDimensionKey);
    resultRows = aggregateRowsByPrimaryDimension(resultRows, primaryIndexInResponse);
  }
  if (rawTabData?.rows) {
    return { ...rawTabData, rows: resultRows };
  }
  return resultRows;
}
const MC_TAB_TO_QUERY_ID = {
  campaign: "marketing_campaigns_campaign",
  source: "marketing_campaigns_source",
  medium: "marketing_campaigns_medium",
  term: "marketing_campaigns_term",
  content: "marketing_campaigns_content"
};
const PAGES_TAB_TO_QUERY_ID = {
  landingPage: "pages_landing_page",
  pageLocation: "pages_page_location",
  pageTitle: "pages_page_title",
  queryString: "pages_query_string"
};
const CUSTOM_DIMENSIONS_TAB_TO_QUERY_ID = {
  loggedIn: "custom_dimensions_logged_in",
  postType: "custom_dimensions_post_type",
  author: "custom_dimensions_author",
  category: "custom_dimensions_category",
  tags: "custom_dimensions_tags",
  focusKeyword: "custom_dimensions_focus_keyword",
  dayOfWeek: "custom_dimensions_day_of_week",
  seoScore: "custom_dimensions_seo_score",
  focusKeyphrase: "custom_dimensions_focus_keyphrase"
};
const DEMOGRAPHICS_TAB_TO_QUERY_ID = {
  country: "demographics_country",
  state: "demographics_state",
  newVsReturning: "demographics_new_vs_returning"
};
const DEVICES_TAB_TO_QUERY_ID = {
  browser: "devices_browser",
  os: "devices_os",
  size: "devices_size"
};
const FORM_SUBMISSIONS_TAB_TO_QUERY_ID = {
  sourceMedium: "form_submissions_source_medium",
  campaign: "form_submissions_campaign"
};
const STORE_TAB_TO_QUERY_ID = {
  marketingCampaigns: MC_TAB_TO_QUERY_ID,
  pages: PAGES_TAB_TO_QUERY_ID,
  customDimensions: CUSTOM_DIMENSIONS_TAB_TO_QUERY_ID,
  demographics: DEMOGRAPHICS_TAB_TO_QUERY_ID,
  devices: DEVICES_TAB_TO_QUERY_ID,
  formSubmissions: FORM_SUBMISSIONS_TAB_TO_QUERY_ID
};
function filterFormSubmissionsData(rawTabbedData, activeFilters) {
  if (!rawTabbedData || !activeFilters || activeFilters.length === 0) {
    return rawTabbedData;
  }
  const result = { ...rawTabbedData };
  for (const tabKey of Object.values(FORM_SUBMISSIONS_DIMENSION_TAB)) {
    if (!result[tabKey]) {
      continue;
    }
    const queryId = FORM_SUBMISSIONS_TAB_TO_QUERY_ID[tabKey];
    const dimensionsOrder = queryId ? QUERY_DIMENSIONS[queryId] : null;
    if (!dimensionsOrder) {
      continue;
    }
    const responseOrder = getResponseDimensionOrder(dimensionsOrder);
    const rows = Array.isArray(result[tabKey]?.rows) ? result[tabKey].rows : [];
    if (rows.length === 0) {
      continue;
    }
    const applicableFilters = activeFilters.filter((f) => responseOrder.includes(f.type)).map((f) => ({ ...f, dIndex: responseOrder.indexOf(f.type) }));
    if (applicableFilters.length === 0) {
      continue;
    }
    const filteredRows = rows.filter((row) => {
      const d = row?.d ?? [];
      return applicableFilters.every((filter) => {
        const dimVal = String(d[filter.dIndex] ?? "");
        if (filter.condition === "is") {
          return dimVal === filter.value;
        }
        if (filter.condition === "is_not") {
          return dimVal !== filter.value;
        }
        return true;
      });
    });
    result[tabKey] = { ...result[tabKey], rows: filteredRows };
  }
  return result;
}
function filterTabbedData(rawTabbedData, dimensionTabMap, activeFilters, tabToQueryId) {
  if (!rawTabbedData) {
    return rawTabbedData;
  }
  const result = { ...rawTabbedData };
  for (const [primaryDimensionKey, tabKey] of Object.entries(dimensionTabMap)) {
    if (!result[tabKey]) {
      continue;
    }
    const queryId = tabToQueryId[tabKey];
    const dimensionsOrder = queryId ? QUERY_DIMENSIONS[queryId] : null;
    if (dimensionsOrder) {
      result[tabKey] = filterByDimensionsOrder(
        result[tabKey],
        dimensionsOrder,
        activeFilters,
        primaryDimensionKey
      );
    }
  }
  return result;
}
function dimensionToLabel(dim) {
  if (dim.startsWith("customEvent:")) {
    const suffix = dim.slice("customEvent:".length);
    const label = suffix.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `Custom Event: ${label}`;
  }
  if (dim.includes("CustomChannelGroup:")) {
    const parts = dim.split(":");
    const prefix = camelToWords(parts[0]);
    return `${prefix}: ${parts[1]}`;
  }
  return camelToWords(dim);
}
function camelToWords(str) {
  const abbreviations = {
    cm360: "CM360",
    dv360: "DV360",
    sa360: "SA360",
    id: "ID",
    url: "URL",
    os: "OS",
    ip: "IP",
    api: "API",
    aioseo: "AIOSEO",
    seo: "SEO",
    utm: "UTM",
    wp: "WP"
  };
  let result = str.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
  result = result.split(" ").map((word) => {
    const lower = word.toLowerCase();
    if (abbreviations[lower]) {
      return abbreviations[lower];
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
  return result;
}
const ALL_DIMENSIONS = [
  "achievementId",
  "adFormat",
  "adSourceName",
  "adUnitName",
  "appVersion",
  "audienceId",
  "audienceName",
  "audienceResourceName",
  "brandingInterest",
  "browser",
  "character",
  "city",
  "cityId",
  "cohort",
  "comparison",
  "contentGroup",
  "contentId",
  "contentType",
  "continent",
  "continentId",
  "country",
  "countryId",
  "currencyCode",
  "customEvent:action",
  "customEvent:affiliate_label",
  "customEvent:aioseo_focus_keyphrase",
  "customEvent:aioseo_truseo_score",
  "customEvent:author",
  "customEvent:category",
  "customEvent:email_address",
  "customEvent:event_label",
  "customEvent:focus_keyword",
  "customEvent:form_id",
  "customEvent:is_affiliate_link",
  "customEvent:link_action",
  "customEvent:link_label",
  "customEvent:link_text",
  "customEvent:link_type",
  "customEvent:logged_in",
  "customEvent:modified_at",
  "customEvent:outbound",
  "customEvent:percentage",
  "customEvent:post_type",
  "customEvent:publish_day_of_week",
  "customEvent:published_at",
  "customEvent:rankmath_focus_keyword",
  "customEvent:rankmath_seo_score",
  "customEvent:scroll_depth",
  "customEvent:scroll_timing",
  "customEvent:search_term",
  "customEvent:seo_score",
  "customEvent:seopress_keywords",
  "customEvent:seopress_seo_score",
  "customEvent:tags",
  "customEvent:tel_number",
  "customEvent:video_provider",
  "customEvent:video_title",
  "customEvent:video_url",
  "customEvent:wp_user_id",
  "date",
  "dateHour",
  "dateHourMinute",
  "day",
  "dayOfWeek",
  "dayOfWeekName",
  "deviceCategory",
  "deviceModel",
  "eventName",
  "fileExtension",
  "fileName",
  "firstSessionDate",
  "firstUserCampaignId",
  "firstUserCampaignName",
  "firstUserCm360AccountId",
  "firstUserCm360AccountName",
  "firstUserCm360AdvertiserId",
  "firstUserCm360AdvertiserName",
  "firstUserCm360CampaignId",
  "firstUserCm360CampaignName",
  "firstUserCm360CreativeFormat",
  "firstUserCm360CreativeId",
  "firstUserCm360CreativeName",
  "firstUserCm360CreativeType",
  "firstUserCm360CreativeTypeId",
  "firstUserCm360CreativeVersion",
  "firstUserCm360Medium",
  "firstUserCm360PlacementCostStructure",
  "firstUserCm360PlacementId",
  "firstUserCm360PlacementName",
  "firstUserCm360RenderingId",
  "firstUserCm360SiteId",
  "firstUserCm360SiteName",
  "firstUserCm360Source",
  "firstUserCm360SourceMedium",
  "firstUserCustomChannelGroup:5074227271",
  "firstUserDefaultChannelGroup",
  "firstUserDv360AdvertiserId",
  "firstUserDv360AdvertiserName",
  "firstUserDv360CampaignId",
  "firstUserDv360CampaignName",
  "firstUserDv360CreativeFormat",
  "firstUserDv360CreativeId",
  "firstUserDv360CreativeName",
  "firstUserDv360ExchangeId",
  "firstUserDv360ExchangeName",
  "firstUserDv360InsertionOrderId",
  "firstUserDv360InsertionOrderName",
  "firstUserDv360LineItemId",
  "firstUserDv360LineItemName",
  "firstUserDv360Medium",
  "firstUserDv360PartnerId",
  "firstUserDv360PartnerName",
  "firstUserDv360Source",
  "firstUserDv360SourceMedium",
  "firstUserGoogleAdsAccountName",
  "firstUserGoogleAdsAdGroupId",
  "firstUserGoogleAdsAdGroupName",
  "firstUserGoogleAdsAdNetworkType",
  "firstUserGoogleAdsCampaignId",
  "firstUserGoogleAdsCampaignName",
  "firstUserGoogleAdsCampaignType",
  "firstUserGoogleAdsCreativeId",
  "firstUserGoogleAdsCustomerId",
  "firstUserGoogleAdsKeyword",
  "firstUserGoogleAdsQuery",
  "firstUserManualAdContent",
  "firstUserManualCampaignId",
  "firstUserManualCampaignName",
  "firstUserManualCreativeFormat",
  "firstUserManualMarketingTactic",
  "firstUserManualMedium",
  "firstUserManualSource",
  "firstUserManualSourceMedium",
  "firstUserManualSourcePlatform",
  "firstUserManualTerm",
  "firstUserMedium",
  "firstUserPrimaryChannelGroup",
  "firstUserSa360AdGroupId",
  "firstUserSa360AdGroupName",
  "firstUserSa360CampaignId",
  "firstUserSa360CampaignName",
  "firstUserSa360CreativeFormat",
  "firstUserSa360EngineAccountId",
  "firstUserSa360EngineAccountName",
  "firstUserSa360EngineAccountType",
  "firstUserSa360KeywordText",
  "firstUserSa360ManagerAccountId",
  "firstUserSa360ManagerAccountName",
  "firstUserSa360Medium",
  "firstUserSa360Query",
  "firstUserSa360Source",
  "firstUserSa360SourceMedium",
  "firstUserSource",
  "firstUserSourceMedium",
  "firstUserSourcePlatform",
  "fullPageUrl",
  "groupId",
  "hostName",
  "hour",
  "isKeyEvent",
  "isoWeek",
  "isoYear",
  "isoYearIsoWeek",
  "landingPage",
  "landingPagePlusQueryString",
  "language",
  "languageCode",
  "level",
  "linkClasses",
  "linkDomain",
  "linkId",
  "linkText",
  "linkUrl",
  "method",
  "minute",
  "mobileDeviceBranding",
  "mobileDeviceMarketingName",
  "mobileDeviceModel",
  "month",
  "newVsReturning",
  "nthDay",
  "nthHour",
  "nthMinute",
  "nthMonth",
  "nthWeek",
  "nthYear",
  "operatingSystem",
  "operatingSystemVersion",
  "operatingSystemWithVersion",
  "orderCoupon",
  "outbound",
  "pageLocation",
  "pagePath",
  "pagePathPlusQueryString",
  "pageReferrer",
  "pageTitle",
  "percentScrolled",
  "platform",
  "platformDeviceCategory",
  "region",
  "screenResolution",
  "searchTerm",
  "sessionCampaignId",
  "sessionCampaignName",
  "sessionCm360AccountId",
  "sessionCm360AccountName",
  "sessionCm360AdvertiserId",
  "sessionCm360AdvertiserName",
  "sessionCm360CampaignId",
  "sessionCm360CampaignName",
  "sessionCm360CreativeFormat",
  "sessionCm360CreativeId",
  "sessionCm360CreativeName",
  "sessionCm360CreativeType",
  "sessionCm360CreativeTypeId",
  "sessionCm360CreativeVersion",
  "sessionCm360Medium",
  "sessionCm360PlacementCostStructure",
  "sessionCm360PlacementId",
  "sessionCm360PlacementName",
  "sessionCm360RenderingId",
  "sessionCm360SiteId",
  "sessionCm360SiteName",
  "sessionCm360Source",
  "sessionCm360SourceMedium",
  "sessionCustomChannelGroup:5074227271",
  "sessionDefaultChannelGroup",
  "sessionDv360AdvertiserId",
  "sessionDv360AdvertiserName",
  "sessionDv360CampaignId",
  "sessionDv360CampaignName",
  "sessionDv360CreativeFormat",
  "sessionDv360CreativeId",
  "sessionDv360CreativeName",
  "sessionDv360ExchangeId",
  "sessionDv360ExchangeName",
  "sessionDv360InsertionOrderId",
  "sessionDv360InsertionOrderName",
  "sessionDv360LineItemId",
  "sessionDv360LineItemName",
  "sessionDv360Medium",
  "sessionDv360PartnerId",
  "sessionDv360PartnerName",
  "sessionDv360Source",
  "sessionDv360SourceMedium",
  "sessionGoogleAdsAccountName",
  "sessionGoogleAdsAdGroupId",
  "sessionGoogleAdsAdGroupName",
  "sessionGoogleAdsAdNetworkType",
  "sessionGoogleAdsCampaignId",
  "sessionGoogleAdsCampaignName",
  "sessionGoogleAdsCampaignType",
  "sessionGoogleAdsCreativeId",
  "sessionGoogleAdsCustomerId",
  "sessionGoogleAdsKeyword",
  "sessionGoogleAdsQuery",
  "sessionManualAdContent",
  "sessionManualCampaignId",
  "sessionManualCampaignName",
  "sessionManualCreativeFormat",
  "sessionManualMarketingTactic",
  "sessionManualMedium",
  "sessionManualSource",
  "sessionManualSourceMedium",
  "sessionManualSourcePlatform",
  "sessionManualTerm",
  "sessionMedium",
  "sessionPrimaryChannelGroup",
  "sessionSa360AdGroupId",
  "sessionSa360AdGroupName",
  "sessionSa360CampaignId",
  "sessionSa360CampaignName",
  "sessionSa360CreativeFormat",
  "sessionSa360EngineAccountId",
  "sessionSa360EngineAccountName",
  "sessionSa360EngineAccountType",
  "sessionSa360Keyword",
  "sessionSa360ManagerAccountId",
  "sessionSa360ManagerAccountName",
  "sessionSa360Medium",
  "sessionSa360Query",
  "sessionSa360Source",
  "sessionSa360SourceMedium",
  "sessionSource",
  "sessionSourceMedium",
  "sessionSourcePlatform",
  "shippingTier",
  "signedInWithUserId",
  "streamId",
  "streamName",
  "testDataFilterId",
  "testDataFilterName",
  "transactionId",
  "unifiedPagePathScreen",
  "unifiedPageScreen",
  "unifiedScreenClass",
  "unifiedScreenName",
  "userAgeBracket",
  "userGender",
  "videoProvider",
  "videoTitle",
  "videoUrl",
  "virtualCurrencyName",
  "visible",
  "week",
  "year",
  "yearMonth",
  "yearWeek"
];
const GA4_DIMENSION_OPTIONS = ALL_DIMENSIONS.map((dim) => ({ value: dim, label: dimensionToLabel(dim) })).sort((a, b) => a.label.localeCompare(b.label));
const _hoisted_1$6 = ["aria-label"];
const _hoisted_2$6 = { class: "monsterinsights-filter-modal__header" };
const _hoisted_3$5 = {
  id: "filter-modal-title",
  class: "monsterinsights-filter-modal__title"
};
const _hoisted_4$2 = { class: "monsterinsights-filter-modal__body" };
const _hoisted_5$2 = { class: "monsterinsights-filter-modal__rows" };
const _hoisted_6$1 = { class: "monsterinsights-filter-modal__rows-list" };
const _hoisted_7$1 = { class: "monsterinsights-filter-modal__select-group" };
const _hoisted_8$1 = { class: "monsterinsights-filter-modal__field" };
const _hoisted_9$1 = { class: "monsterinsights-filter-modal__field-label" };
const _hoisted_10$1 = { class: "monsterinsights-filter-modal__field" };
const _hoisted_11$2 = { class: "monsterinsights-filter-modal__field-label" };
const _hoisted_12$2 = { class: "monsterinsights-filter-modal__select-wrapper" };
const _hoisted_13$2 = ["onUpdate:modelValue"];
const _hoisted_14$2 = ["value"];
const _hoisted_15$2 = { class: "monsterinsights-filter-modal__field monsterinsights-filter-modal__field--value" };
const _hoisted_16$1 = { class: "monsterinsights-filter-modal__field-label" };
const _hoisted_17$1 = ["onClick"];
const _hoisted_18$1 = ["disabled"];
const _hoisted_19$1 = { class: "monsterinsights-filter-modal__device-section" };
const _hoisted_20 = { class: "monsterinsights-filter-modal__section-title" };
const _hoisted_21 = { class: "monsterinsights-filter-modal__device-options" };
const _hoisted_22 = ["onClick"];
const _hoisted_23 = { class: "monsterinsights-filter-modal__actions" };
const _hoisted_24 = {
  key: 1,
  class: "monsterinsights-filter-modal__save-as"
};
const _hoisted_25 = { class: "monsterinsights-filter-modal__section-title" };
const _hoisted_26 = { class: "monsterinsights-filter-modal__save-as-form" };
const _hoisted_27 = ["placeholder"];
const _hoisted_28 = { class: "monsterinsights-filter-modal__save-as-actions" };
const _hoisted_29 = ["disabled"];
const _hoisted_30 = { class: "monsterinsights-filter-modal__saved-filters" };
const _hoisted_31 = { class: "monsterinsights-filter-modal__section-title" };
const _hoisted_32 = {
  key: 0,
  class: "monsterinsights-filter-modal__empty-state"
};
const _hoisted_33 = {
  key: 1,
  class: "monsterinsights-filter-modal__saved-list"
};
const _hoisted_34 = ["onMouseenter"];
const _hoisted_35 = { class: "monsterinsights-filter-modal__saved-item-header" };
const _hoisted_36 = { class: "monsterinsights-filter-modal__saved-item-info" };
const _hoisted_37 = { class: "monsterinsights-filter-modal__saved-item-name" };
const _hoisted_38 = {
  key: 0,
  class: "monsterinsights-filter-modal__saved-item-status monsterinsights-filter-modal__saved-item-status--applied"
};
const _hoisted_39 = ["onClick"];
const _hoisted_40 = { class: "monsterinsights-filter-modal__saved-item-actions" };
const _hoisted_41 = ["onClick"];
const _hoisted_42 = ["onClick"];
const _hoisted_43 = {
  key: 0,
  class: "monsterinsights-filter-modal__saved-item-edit"
};
const _hoisted_44 = { class: "monsterinsights-filter-modal__select-group" };
const _hoisted_45 = { class: "monsterinsights-filter-modal__field" };
const _hoisted_46 = { class: "monsterinsights-filter-modal__field" };
const _hoisted_47 = { class: "monsterinsights-filter-modal__select-wrapper" };
const _hoisted_48 = ["onUpdate:modelValue"];
const _hoisted_49 = ["value"];
const _hoisted_50 = { class: "monsterinsights-filter-modal__field monsterinsights-filter-modal__field--value" };
const _hoisted_51 = ["onClick"];
const _hoisted_52 = { class: "monsterinsights-filter-modal__device-section monsterinsights-filter-modal__device-section--compact" };
const _hoisted_53 = { class: "monsterinsights-filter-modal__section-title" };
const _hoisted_54 = { class: "monsterinsights-filter-modal__device-options" };
const _hoisted_55 = ["onClick"];
const _hoisted_56 = { class: "monsterinsights-filter-modal__edit-actions" };
const _hoisted_57 = ["disabled", "onClick"];
const _hoisted_58 = ["disabled"];
const MAX_FILTER_ROWS = 3;
const _sfc_main$7 = {
  __name: "FilterModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "apply-filter"],
  setup(__props, { emit: __emit }) {
    const overviewStore = useOverviewReportStore();
    const props = __props;
    const emit = __emit;
    const filterModalDialogRef = ref(null);
    function handleEscapeKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    }
    watch(
      () => props.isOpen,
      (isOpen) => {
        if (isOpen) {
          document.addEventListener("keydown", handleEscapeKeydown);
          syncFromStore();
          setTimeout(() => {
            const focusable3 = filterModalDialogRef.value?.querySelector?.('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable3?.focus?.();
          }, 0);
        } else {
          document.removeEventListener("keydown", handleEscapeKeydown);
        }
      },
      { immediate: true }
    );
    function syncFromStore() {
      const storeFilters = overviewStore.activeFilters;
      const storeDevice = overviewStore.activeDevice;
      if (Array.isArray(storeFilters) && storeFilters.length > 0) {
        filterRows.value = storeFilters.map((f) => ({ ...f }));
        storeFilters.forEach((f) => {
          if (f.type) loadDimensionValues(f.type);
        });
      } else {
        filterRows.value = [{ type: "", condition: "is", value: "" }];
      }
      selectedDevice.value = storeDevice || "";
      if (appliedFilterId.value) {
        const appliedSaved = savedFilters.value.find((f) => f.id === appliedFilterId.value);
        if (appliedSaved) {
          const savedFilterStr = JSON.stringify(
            (appliedSaved.filters || []).map((f) => ({ type: f.type, condition: f.condition, value: f.value }))
          );
          const currentFilterStr = JSON.stringify(
            storeFilters.map((f) => ({ type: f.type, condition: f.condition, value: f.value }))
          );
          if (savedFilterStr !== currentFilterStr || (appliedSaved.device || "") !== (storeDevice || "")) {
            appliedFilterId.value = null;
          }
        }
      }
    }
    onUnmounted(() => {
      document.removeEventListener("keydown", handleEscapeKeydown);
    });
    const toast = ref({ visible: false, message: "", type: "success" });
    let toastTimer = null;
    const showSuccessToast = ({ message }) => {
      if (toastTimer) clearTimeout(toastTimer);
      toast.value = { visible: true, message, type: "success" };
      toastTimer = setTimeout(() => {
        toast.value = { visible: false, message: "", type: "success" };
      }, 3e3);
    };
    const showErrorToast = ({ message }) => {
      if (toastTimer) clearTimeout(toastTimer);
      toast.value = { visible: true, message, type: "error" };
      toastTimer = setTimeout(() => {
        toast.value = { visible: false, message: "", type: "success" };
      }, 3e3);
    };
    const CHANNEL_GROUP_OPTIONS = [
      "Organic Search",
      "Direct",
      "Referral",
      "Paid Search",
      "Organic Social",
      "Paid Social",
      "Email",
      "Display",
      "Organic Shopping",
      "Paid Shopping",
      "Unassigned"
    ].map((v) => ({ value: v, label: v }));
    const filterTypeOptions = ref(GA4_DIMENSION_OPTIONS);
    const valueOptionsCache = /* @__PURE__ */ Object.create(null);
    const dimensionValuesLoading = ref({});
    const fetchedDimensionValues = ref({});
    async function loadDimensionValues(dimensionKey) {
      if (!dimensionKey) return;
      if (fetchedDimensionValues.value[dimensionKey]) return;
      dimensionValuesLoading.value[dimensionKey] = true;
      try {
        const dateRange = overviewStore.dateRange;
        const values = await fetchDimensionValues(dimensionKey, dateRange);
        if (values && values.length > 0) {
          fetchedDimensionValues.value[dimensionKey] = values;
        }
      } finally {
        dimensionValuesLoading.value[dimensionKey] = false;
      }
    }
    const getValueOptions = (dimensionKey) => {
      if (!dimensionKey) return [];
      let fromStore = [];
      if (dimensionKey === "sessionDefaultChannelGroup") {
        fromStore = getValuesForDimension(dimensionKey, overviewStore.$state);
        if (!fromStore.length) fromStore = CHANNEL_GROUP_OPTIONS;
      } else {
        fromStore = getValuesForDimension(dimensionKey, overviewStore.$state);
      }
      const fromApi = fetchedDimensionValues.value[dimensionKey] || [];
      const selectedValues = /* @__PURE__ */ new Set();
      filterRows.value.forEach((r) => {
        if (r.type === dimensionKey && r.value) selectedValues.add(r.value);
      });
      editFilterRows.value.forEach((r) => {
        if (r.type === dimensionKey && r.value) selectedValues.add(r.value);
      });
      const combined = /* @__PURE__ */ new Map();
      const cached = valueOptionsCache[dimensionKey] || [];
      [...cached, ...fromApi, ...fromStore].forEach((opt) => {
        const v = opt.value ?? opt;
        const label = opt.label ?? opt;
        if (v) combined.set(String(v), { value: String(v), label: label || String(v) });
      });
      selectedValues.forEach((v) => {
        if (v && !combined.has(v)) combined.set(v, { value: v, label: v });
      });
      const result = Array.from(combined.values()).sort((a, b) => (a.label || a.value).localeCompare(b.label || b.value));
      valueOptionsCache[dimensionKey] = result;
      return result;
    };
    const conditionOptions = [
      { value: "is", label: __$2("Is", "google-analytics-for-wordpress") },
      { value: "is_not", label: __$2("Is Not", "google-analytics-for-wordpress") }
    ];
    const filterRows = ref([
      { type: "", condition: "is", value: "" }
    ]);
    const getFilterTypeOptionsForRow = (rowIndex) => {
      const currentType = filterRows.value[rowIndex]?.type || "";
      const usedTypes = new Set(
        filterRows.value.map((r, idx) => idx === rowIndex ? null : r.type).filter((t) => !!t)
      );
      return filterTypeOptions.value.filter(
        (opt) => opt.value === currentType || !usedTypes.has(opt.value)
      );
    };
    function onFilterTypeChange(index) {
      const row = filterRows.value[index];
      if (!row) {
        return;
      }
      row.value = "";
      if (row.type) {
        loadDimensionValues(row.type);
      }
    }
    const deviceOptions = [
      { value: "desktop", label: __$2("Desktop", "google-analytics-for-wordpress"), icon: "desktop" },
      { value: "mobile", label: __$2("Mobile", "google-analytics-for-wordpress"), icon: "smartphone" },
      { value: "tablet", label: __$2("Tablet", "google-analytics-for-wordpress"), icon: "tablet" }
    ];
    const selectedDevice = ref("");
    const showSaveAs = ref(false);
    const saveFilterName = ref("");
    const isSaving = ref(false);
    const savedFilters = ref([]);
    const appliedFilterId = ref(null);
    const hoveredFilterId = ref(null);
    const editingFilterId = ref(null);
    const editFilterRows = ref([]);
    const editSelectedDevice = ref("");
    const getEditFilterTypeOptionsForRow = (rowIndex) => {
      const currentType = editFilterRows.value[rowIndex]?.type || "";
      const usedTypes = new Set(
        editFilterRows.value.map((r, idx) => idx === rowIndex ? null : r.type).filter((t) => !!t)
      );
      return filterTypeOptions.value.filter(
        (opt) => opt.value === currentType || !usedTypes.has(opt.value)
      );
    };
    function onEditFilterTypeChange(index) {
      const row = editFilterRows.value[index];
      if (!row) {
        return;
      }
      row.value = "";
      if (row.type) {
        loadDimensionValues(row.type);
      }
    }
    const closeModal = () => {
      showSaveAs.value = false;
      saveFilterName.value = "";
      emit("close");
    };
    const canAddMoreFilterRows = () => {
      if (filterRows.value.length >= MAX_FILTER_ROWS) {
        return false;
      }
      const usedTypes = new Set(filterRows.value.map((r) => r.type).filter((t) => !!t));
      return filterTypeOptions.value.some((opt) => !usedTypes.has(opt.value));
    };
    const addFilterRow = () => {
      if (!canAddMoreFilterRows()) {
        return;
      }
      filterRows.value.push({ type: "", condition: "is", value: "" });
    };
    const removeFilterRow = (index) => {
      if (filterRows.value.length > 1) {
        filterRows.value.splice(index, 1);
      } else {
        filterRows.value[0] = { type: "", condition: "is", value: "" };
      }
    };
    const selectDevice = (device) => {
      selectedDevice.value = selectedDevice.value === device ? "" : device;
    };
    const clearAllFilters = () => {
      filterRows.value = [{ type: "", condition: "is", value: "" }];
      selectedDevice.value = "";
      showSaveAs.value = false;
      saveFilterName.value = "";
      appliedFilterId.value = null;
      editingFilterId.value = null;
      editFilterRows.value = [];
      editSelectedDevice.value = "";
      emit("apply-filter", {
        filters: [],
        device: ""
      });
      closeModal();
    };
    const applyFilter = () => {
      const activeFilters = filterRows.value.filter((row) => row.type && row.value).map((row) => ({ ...row }));
      if (activeFilters.length === 0 && !selectedDevice.value) {
        showErrorToast({
          message: __$2("Please select at least one dimension with a value.", "google-analytics-for-wordpress")
        });
        return;
      }
      appliedFilterId.value = null;
      emit("apply-filter", {
        filters: activeFilters,
        device: selectedDevice.value
      });
      closeModal();
    };
    const onSaveFilterClick = () => {
      showSaveAs.value = true;
      saveFilterName.value = "";
    };
    const cancelSaveAs = () => {
      showSaveAs.value = false;
      saveFilterName.value = "";
    };
    const saveFilter = () => {
      if (isSaving.value) return;
      if (!saveFilterName.value.trim()) {
        showErrorToast({
          message: __$2("Please enter a name for this filter.", "google-analytics-for-wordpress")
        });
        return;
      }
      const validFilters = filterRows.value.filter((row) => row.type && row.value);
      if (validFilters.length === 0 && !selectedDevice.value) {
        showErrorToast({
          message: __$2("Please select at least one dimension with a value.", "google-analytics-for-wordpress")
        });
        return;
      }
      const filterData = {
        name: saveFilterName.value.trim(),
        filters: validFilters,
        device: selectedDevice.value
      };
      const ajaxData = {
        action: "monsterinsights_save_report_filter",
        nonce: getMiGlobal("nonce", ""),
        filter: JSON.stringify(filterData)
      };
      isSaving.value = true;
      wp.ajax.post(ajaxData).done((response) => {
        if (response && response.id) {
          savedFilters.value.push({
            id: response.id,
            ...filterData
          });
          showSaveAs.value = false;
          saveFilterName.value = "";
          showSuccessToast({
            message: sprintf(
              /* translators: %s - filter name */
              __$2('Filter "%s" has been saved successfully.', "google-analytics-for-wordpress"),
              filterData.name
            )
          });
        }
      }).fail(() => {
        showErrorToast({
          message: __$2("Failed to save filter. Please try again.", "google-analytics-for-wordpress")
        });
      }).always(() => {
        isSaving.value = false;
      });
    };
    const applySavedFilter = (savedFilter) => {
      appliedFilterId.value = savedFilter.id;
      if (savedFilter.filters && savedFilter.filters.length > 0) {
        filterRows.value = savedFilter.filters.map((f) => ({ ...f }));
      }
      if (savedFilter.device) {
        selectedDevice.value = savedFilter.device;
      }
      emit("apply-filter", {
        filters: (savedFilter.filters || []).map((f) => ({ ...f })),
        device: savedFilter.device || ""
      });
      closeModal();
    };
    const toggleEditFilter = (savedFilter) => {
      if (editingFilterId.value === savedFilter.id) {
        editingFilterId.value = null;
        editFilterRows.value = [];
        editSelectedDevice.value = "";
      } else {
        editingFilterId.value = savedFilter.id;
        editFilterRows.value = savedFilter.filters ? savedFilter.filters.map((f) => ({ ...f })) : [{ type: "", condition: "is", value: "" }];
        editSelectedDevice.value = savedFilter.device || "";
        editFilterRows.value.forEach((f) => {
          if (f.type) loadDimensionValues(f.type);
        });
      }
    };
    const addEditFilterRow = () => {
      if (!canAddMoreEditFilterRows()) {
        return;
      }
      editFilterRows.value.push({ type: "", condition: "is", value: "" });
    };
    const removeEditFilterRow = (index) => {
      if (editFilterRows.value.length > 1) {
        editFilterRows.value.splice(index, 1);
      } else {
        editFilterRows.value[0] = { type: "", condition: "is", value: "" };
      }
    };
    const selectEditDevice = (device) => {
      editSelectedDevice.value = editSelectedDevice.value === device ? "" : device;
    };
    const canAddMoreEditFilterRows = () => {
      if (editFilterRows.value.length >= MAX_FILTER_ROWS) {
        return false;
      }
      const usedTypes = new Set(editFilterRows.value.map((r) => r.type).filter((t) => !!t));
      return filterTypeOptions.value.some((opt) => !usedTypes.has(opt.value));
    };
    const saveEditFilter = (filterId) => {
      if (isSaving.value) return;
      const filterIndex = savedFilters.value.findIndex((f) => f.id === filterId);
      if (filterIndex === -1) return;
      const validEditFilters = editFilterRows.value.filter((row) => row.type && row.value);
      if (validEditFilters.length === 0) {
        showErrorToast({
          message: __$2("Please select at least one dimension with a value.", "google-analytics-for-wordpress")
        });
        return;
      }
      const updatedFilter = {
        ...savedFilters.value[filterIndex],
        filters: validEditFilters,
        device: editSelectedDevice.value
      };
      const ajaxData = {
        action: "monsterinsights_update_report_filter",
        nonce: getMiGlobal("nonce", ""),
        filter_id: filterId,
        filter: JSON.stringify(updatedFilter)
      };
      isSaving.value = true;
      wp.ajax.post(ajaxData).done(() => {
        savedFilters.value[filterIndex] = updatedFilter;
        editingFilterId.value = null;
        editFilterRows.value = [];
        editSelectedDevice.value = "";
        if (appliedFilterId.value === filterId) {
          emit("apply-filter", {
            filters: (updatedFilter.filters || []).map((f) => ({ ...f })),
            device: updatedFilter.device || ""
          });
          filterRows.value = updatedFilter.filters ? updatedFilter.filters.map((f) => ({ ...f })) : [{ type: "", condition: "is", value: "" }];
          selectedDevice.value = updatedFilter.device || "";
        }
        showSuccessToast({
          message: sprintf(
            /* translators: %s - filter name */
            __$2('Filter "%s" has been updated successfully.', "google-analytics-for-wordpress"),
            updatedFilter.name
          )
        });
      }).fail(() => {
        showErrorToast({
          message: __$2("Failed to update filter. Please try again.", "google-analytics-for-wordpress")
        });
      }).always(() => {
        isSaving.value = false;
      });
    };
    const deleteSavedFilter = (filterId) => {
      const ajaxData = {
        action: "monsterinsights_delete_report_filter",
        nonce: getMiGlobal("nonce", ""),
        filter_id: filterId
      };
      wp.ajax.post(ajaxData).done(() => {
        savedFilters.value = savedFilters.value.filter((f) => f.id !== filterId);
        if (appliedFilterId.value === filterId) {
          clearAllFilters();
        }
        if (editingFilterId.value === filterId) {
          editingFilterId.value = null;
          editFilterRows.value = [];
          editSelectedDevice.value = "";
        }
        showSuccessToast({
          message: __$2("Filter deleted successfully.", "google-analytics-for-wordpress")
        });
      }).fail(() => {
        showErrorToast({
          message: __$2("Failed to delete filter. Please try again.", "google-analytics-for-wordpress")
        });
      });
    };
    const fetchSavedFilters = () => {
      const ajaxData = {
        action: "monsterinsights_get_report_filters",
        nonce: getMiGlobal("nonce", "")
      };
      wp.ajax.post(ajaxData).done((response) => {
        if (response && response.filters) {
          savedFilters.value = response.filters;
        }
      }).fail(() => {
        savedFilters.value = [];
      });
    };
    onMounted(() => {
      fetchSavedFilters();
    });
    return (_ctx, _cache) => {
      return __props.isOpen ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "monsterinsights-filter-modal-overlay",
        onClick: withModifiers(closeModal, ["self"])
      }, [
        createBaseVNode("div", {
          ref_key: "filterModalDialogRef",
          ref: filterModalDialogRef,
          class: "monsterinsights-filter-modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "filter-modal-title"
        }, [
          toast.value.visible ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["monsterinsights-filter-modal__toast", { "monsterinsights-filter-modal__toast--error": toast.value.type === "error" }])
          }, [
            createVNode(Icon, {
              name: toast.value.type === "error" ? "warning" : "check",
              size: 16
            }, null, 8, ["name"]),
            createBaseVNode("span", null, toDisplayString(toast.value.message), 1)
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("button", {
            type: "button",
            class: "monsterinsights-filter-modal__close",
            "aria-label": unref(__$2)("Close filter panel", "google-analytics-for-wordpress"),
            onClick: closeModal
          }, [
            createVNode(Icon, {
              name: "close",
              size: 16
            })
          ], 8, _hoisted_1$6),
          createBaseVNode("div", _hoisted_2$6, [
            createBaseVNode("h2", _hoisted_3$5, toDisplayString(unref(__$2)("Filter", "google-analytics-for-wordpress")), 1),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-filter-modal__clear-all",
              onClick: clearAllFilters
            }, toDisplayString(unref(__$2)("Clear All", "google-analytics-for-wordpress")), 1)
          ]),
          createBaseVNode("div", _hoisted_4$2, [
            createBaseVNode("div", _hoisted_5$2, [
              createBaseVNode("div", _hoisted_6$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(filterRows.value, (row, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: "monsterinsights-filter-modal__row"
                  }, [
                    createBaseVNode("div", _hoisted_7$1, [
                      createBaseVNode("div", _hoisted_8$1, [
                        createBaseVNode("label", _hoisted_9$1, toDisplayString(unref(__$2)("Choose Type", "google-analytics-for-wordpress")), 1),
                        createVNode(_sfc_main$8, {
                          modelValue: row.type,
                          "onUpdate:modelValue": (val) => {
                            row.type = val;
                            onFilterTypeChange(index);
                          },
                          options: getFilterTypeOptionsForRow(index),
                          placeholder: unref(__$2)("Choose Type", "google-analytics-for-wordpress"),
                          searchPlaceholder: unref(__$2)("Search dimensions...", "google-analytics-for-wordpress")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "searchPlaceholder"])
                      ]),
                      createBaseVNode("div", _hoisted_10$1, [
                        createBaseVNode("label", _hoisted_11$2, toDisplayString(unref(__$2)("Condition", "google-analytics-for-wordpress")), 1),
                        createBaseVNode("div", _hoisted_12$2, [
                          withDirectives(createBaseVNode("select", {
                            "onUpdate:modelValue": ($event) => row.condition = $event,
                            class: "monsterinsights-filter-modal__select"
                          }, [
                            (openBlock(), createElementBlock(Fragment, null, renderList(conditionOptions, (opt) => {
                              return createBaseVNode("option", {
                                key: opt.value,
                                value: opt.value
                              }, toDisplayString(opt.label), 9, _hoisted_14$2);
                            }), 64))
                          ], 8, _hoisted_13$2), [
                            [vModelSelect, row.condition]
                          ]),
                          createVNode(Icon, {
                            name: "chevron-down",
                            size: 16
                          })
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_15$2, [
                        createBaseVNode("label", _hoisted_16$1, toDisplayString(unref(__$2)("Value", "google-analytics-for-wordpress")), 1),
                        createVNode(_sfc_main$8, {
                          modelValue: row.value,
                          "onUpdate:modelValue": ($event) => row.value = $event,
                          options: getValueOptions(row.type),
                          disabled: !row.type,
                          placeholder: dimensionValuesLoading.value[row.type] ? unref(__$2)("Loading...", "google-analytics-for-wordpress") : unref(__$2)("Select value", "google-analytics-for-wordpress"),
                          searchPlaceholder: unref(__$2)("Search values...", "google-analytics-for-wordpress")
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled", "placeholder", "searchPlaceholder"])
                      ])
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      class: "monsterinsights-filter-modal__row-delete",
                      onClick: ($event) => removeFilterRow(index)
                    }, [
                      createVNode(Icon, {
                        name: "trash",
                        size: 16
                      })
                    ], 8, _hoisted_17$1)
                  ]);
                }), 128))
              ]),
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["monsterinsights-filter-modal__add-btn", { "monsterinsights-filter-modal__add-btn--disabled": !canAddMoreFilterRows() }]),
                disabled: !canAddMoreFilterRows(),
                onClick: addFilterRow
              }, [
                createVNode(Icon, {
                  name: "plus",
                  size: 16
                }),
                createBaseVNode("span", null, toDisplayString(unref(__$2)("Add New Filter", "google-analytics-for-wordpress")), 1)
              ], 10, _hoisted_18$1)
            ]),
            createBaseVNode("div", _hoisted_19$1, [
              createBaseVNode("h3", _hoisted_20, toDisplayString(unref(__$2)("Device", "google-analytics-for-wordpress")), 1),
              createBaseVNode("div", _hoisted_21, [
                (openBlock(), createElementBlock(Fragment, null, renderList(deviceOptions, (device) => {
                  return createBaseVNode("button", {
                    key: device.value,
                    type: "button",
                    class: normalizeClass(["monsterinsights-filter-modal__device-btn", { "monsterinsights-filter-modal__device-btn--active": selectedDevice.value === device.value }]),
                    onClick: ($event) => selectDevice(device.value)
                  }, [
                    createVNode(Icon, {
                      name: device.icon,
                      size: 20
                    }, null, 8, ["name"]),
                    createBaseVNode("span", null, toDisplayString(device.label), 1)
                  ], 10, _hoisted_22);
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_23, [
              createBaseVNode("button", {
                type: "button",
                class: "monsterinsights-filter-modal__btn monsterinsights-filter-modal__btn--outline",
                onClick: applyFilter
              }, toDisplayString(unref(__$2)("Apply Filter", "google-analytics-for-wordpress")), 1),
              createBaseVNode("button", {
                type: "button",
                class: "monsterinsights-filter-modal__btn monsterinsights-filter-modal__btn--primary",
                onClick: onSaveFilterClick
              }, toDisplayString(unref(__$2)("Save Filter", "google-analytics-for-wordpress")), 1)
            ])
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "monsterinsights-filter-modal__divider" }, null, -1)),
          showSaveAs.value ? (openBlock(), createElementBlock("div", _hoisted_24, [
            createBaseVNode("h3", _hoisted_25, toDisplayString(unref(__$2)("Save Filter As", "google-analytics-for-wordpress")), 1),
            createBaseVNode("div", _hoisted_26, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => saveFilterName.value = $event),
                type: "text",
                class: "monsterinsights-filter-modal__save-as-input",
                placeholder: unref(__$2)("Name this filter", "google-analytics-for-wordpress")
              }, null, 8, _hoisted_27), [
                [vModelText, saveFilterName.value]
              ]),
              createBaseVNode("div", _hoisted_28, [
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-filter-modal__btn monsterinsights-filter-modal__btn--primary",
                  disabled: isSaving.value,
                  onClick: saveFilter
                }, toDisplayString(isSaving.value ? unref(__$2)("Saving...", "google-analytics-for-wordpress") : unref(__$2)("Save Filter", "google-analytics-for-wordpress")), 9, _hoisted_29),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-filter-modal__btn monsterinsights-filter-modal__btn--cancel",
                  onClick: cancelSaveAs
                }, toDisplayString(unref(__$2)("Cancel", "google-analytics-for-wordpress")), 1)
              ])
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_30, [
            createBaseVNode("h3", _hoisted_31, toDisplayString(savedFilters.value.length > 0 ? unref(__$2)("Your Saved Filters", "google-analytics-for-wordpress") : unref(__$2)("Saved Filters", "google-analytics-for-wordpress")), 1),
            savedFilters.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_32, [
              createVNode(Icon, {
                name: "no-saved-filters",
                size: 64
              }),
              createBaseVNode("p", null, toDisplayString(unref(__$2)("No saved filters found", "google-analytics-for-wordpress")), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_33, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(savedFilters.value, (savedFilter, index) => {
                return openBlock(), createElementBlock("div", {
                  key: savedFilter.id,
                  class: normalizeClass(["monsterinsights-filter-modal__saved-item", {
                    "monsterinsights-filter-modal__saved-item--applied": savedFilter.id === appliedFilterId.value,
                    "monsterinsights-filter-modal__saved-item--editing": editingFilterId.value === savedFilter.id
                  }]),
                  onMouseenter: ($event) => hoveredFilterId.value = savedFilter.id,
                  onMouseleave: _cache[1] || (_cache[1] = ($event) => hoveredFilterId.value = null)
                }, [
                  createBaseVNode("div", _hoisted_35, [
                    createBaseVNode("div", _hoisted_36, [
                      createBaseVNode("span", _hoisted_37, toDisplayString(savedFilter.name), 1),
                      savedFilter.id === appliedFilterId.value ? (openBlock(), createElementBlock("span", _hoisted_38, toDisplayString(unref(__$2)("Applied", "google-analytics-for-wordpress")), 1)) : hoveredFilterId.value === savedFilter.id && editingFilterId.value !== savedFilter.id ? (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: "monsterinsights-filter-modal__saved-item-status monsterinsights-filter-modal__saved-item-status--apply",
                        onClick: ($event) => applySavedFilter(savedFilter)
                      }, toDisplayString(unref(__$2)("Apply", "google-analytics-for-wordpress")), 9, _hoisted_39)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_40, [
                      createBaseVNode("button", {
                        type: "button",
                        class: "monsterinsights-filter-modal__saved-item-btn",
                        onClick: ($event) => toggleEditFilter(savedFilter)
                      }, [
                        createVNode(Icon, {
                          name: "pencil",
                          size: 16
                        })
                      ], 8, _hoisted_41),
                      createBaseVNode("button", {
                        type: "button",
                        class: "monsterinsights-filter-modal__saved-item-btn",
                        onClick: ($event) => deleteSavedFilter(savedFilter.id)
                      }, [
                        createVNode(Icon, {
                          name: "trash",
                          size: 16
                        })
                      ], 8, _hoisted_42)
                    ])
                  ]),
                  editingFilterId.value === savedFilter.id ? (openBlock(), createElementBlock("div", _hoisted_43, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(editFilterRows.value, (editRow, editIndex) => {
                      return openBlock(), createElementBlock("div", {
                        key: editIndex,
                        class: "monsterinsights-filter-modal__row monsterinsights-filter-modal__row--compact"
                      }, [
                        createBaseVNode("div", _hoisted_44, [
                          createBaseVNode("div", _hoisted_45, [
                            createVNode(_sfc_main$8, {
                              modelValue: editRow.type,
                              "onUpdate:modelValue": (val) => {
                                editRow.type = val;
                                onEditFilterTypeChange(editIndex);
                              },
                              options: getEditFilterTypeOptionsForRow(editIndex),
                              placeholder: unref(__$2)("Choose Type", "google-analytics-for-wordpress"),
                              searchPlaceholder: unref(__$2)("Search dimensions...", "google-analytics-for-wordpress")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder", "searchPlaceholder"])
                          ]),
                          createBaseVNode("div", _hoisted_46, [
                            createBaseVNode("div", _hoisted_47, [
                              withDirectives(createBaseVNode("select", {
                                "onUpdate:modelValue": ($event) => editRow.condition = $event,
                                class: "monsterinsights-filter-modal__select"
                              }, [
                                (openBlock(), createElementBlock(Fragment, null, renderList(conditionOptions, (opt) => {
                                  return createBaseVNode("option", {
                                    key: opt.value,
                                    value: opt.value
                                  }, toDisplayString(opt.label), 9, _hoisted_49);
                                }), 64))
                              ], 8, _hoisted_48), [
                                [vModelSelect, editRow.condition]
                              ]),
                              createVNode(Icon, {
                                name: "chevron-down",
                                size: 16
                              })
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_50, [
                            createVNode(_sfc_main$8, {
                              modelValue: editRow.value,
                              "onUpdate:modelValue": ($event) => editRow.value = $event,
                              options: getValueOptions(editRow.type),
                              disabled: !editRow.type,
                              placeholder: dimensionValuesLoading.value[editRow.type] ? unref(__$2)("Loading...", "google-analytics-for-wordpress") : unref(__$2)("Select value", "google-analytics-for-wordpress"),
                              searchPlaceholder: unref(__$2)("Search values...", "google-analytics-for-wordpress")
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled", "placeholder", "searchPlaceholder"])
                          ])
                        ]),
                        createBaseVNode("button", {
                          type: "button",
                          class: "monsterinsights-filter-modal__row-delete",
                          onClick: ($event) => removeEditFilterRow(editIndex)
                        }, [
                          createVNode(Icon, {
                            name: "trash",
                            size: 16
                          })
                        ], 8, _hoisted_51)
                      ]);
                    }), 128)),
                    createBaseVNode("div", _hoisted_52, [
                      createBaseVNode("h3", _hoisted_53, toDisplayString(unref(__$2)("Device", "google-analytics-for-wordpress")), 1),
                      createBaseVNode("div", _hoisted_54, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(deviceOptions, (device) => {
                          return createBaseVNode("button", {
                            key: device.value,
                            type: "button",
                            class: normalizeClass(["monsterinsights-filter-modal__device-btn", { "monsterinsights-filter-modal__device-btn--active": editSelectedDevice.value === device.value }]),
                            onClick: ($event) => selectEditDevice(device.value)
                          }, [
                            createVNode(Icon, {
                              name: device.icon,
                              size: 20
                            }, null, 8, ["name"]),
                            createBaseVNode("span", null, toDisplayString(device.label), 1)
                          ], 10, _hoisted_55);
                        }), 64))
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_56, [
                      createBaseVNode("button", {
                        type: "button",
                        class: "monsterinsights-filter-modal__btn monsterinsights-filter-modal__btn--primary monsterinsights-filter-modal__btn--sm",
                        disabled: isSaving.value,
                        onClick: ($event) => saveEditFilter(savedFilter.id)
                      }, toDisplayString(isSaving.value ? unref(__$2)("Saving...", "google-analytics-for-wordpress") : unref(__$2)("Save", "google-analytics-for-wordpress")), 9, _hoisted_57),
                      createBaseVNode("button", {
                        type: "button",
                        class: normalizeClass(["monsterinsights-filter-modal__add-btn monsterinsights-filter-modal__add-btn--sm", { "monsterinsights-filter-modal__add-btn--disabled": !canAddMoreEditFilterRows() }]),
                        disabled: !canAddMoreEditFilterRows(),
                        onClick: addEditFilterRow
                      }, [
                        createVNode(Icon, {
                          name: "plus",
                          size: 16
                        }),
                        createBaseVNode("span", null, toDisplayString(unref(__$2)("Add Step", "google-analytics-for-wordpress")), 1)
                      ], 10, _hoisted_58)
                    ])
                  ])) : createCommentVNode("", true)
                ], 42, _hoisted_34);
              }), 128))
            ]))
          ])
        ], 512)
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$5 = { class: "monsterinsights-confirm-modal__title" };
const _hoisted_2$5 = {
  key: 0,
  class: "monsterinsights-confirm-modal__message"
};
const _hoisted_3$4 = { class: "monsterinsights-confirm-modal__actions" };
const _sfc_main$6 = {
  __name: "ConfirmModal",
  props: {
    title: {
      type: String,
      default: __$2("Are you sure?", "google-analytics-for-wordpress")
    },
    message: {
      type: String,
      default: ""
    },
    confirmButtonText: {
      type: String,
      default: __$2("Confirm", "google-analytics-for-wordpress")
    },
    cancelButtonText: {
      type: String,
      default: __$2("Cancel", "google-analytics-for-wordpress")
    },
    clickToClose: {
      type: Boolean,
      default: false
    },
    escToClose: {
      type: Boolean,
      default: false
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onCancel: {
      type: Function,
      default: null
    },
    onClosed: {
      type: Function,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function closeModal() {
      emit("update:modelValue", false);
      if (typeof props.onClosed === "function") {
        props.onClosed();
      }
    }
    function handleConfirm() {
      if (typeof props.onConfirm === "function") {
        props.onConfirm();
      }
      closeModal();
    }
    function handleCancel() {
      if (typeof props.onCancel === "function") {
        props.onCancel();
      }
      closeModal();
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Ro), {
        class: "monsterinsights-confirm-modal-overlay",
        "content-class": "monsterinsights-confirm-modal",
        "overlay-transition": "vfm-fade",
        "content-transition": "vfm-fade",
        "click-to-close": __props.clickToClose,
        "esc-to-close": __props.escToClose
      }, {
        default: withCtx(() => [
          createBaseVNode("h3", _hoisted_1$5, toDisplayString(__props.title), 1),
          __props.message ? (openBlock(), createElementBlock("p", _hoisted_2$5, toDisplayString(__props.message), 1)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-confirm-modal__button monsterinsights-confirm-modal__button--secondary",
              onClick: handleCancel
            }, toDisplayString(__props.cancelButtonText), 1),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-confirm-modal__button monsterinsights-confirm-modal__button--primary",
              onClick: handleConfirm
            }, toDisplayString(__props.confirmButtonText), 1)
          ])
        ]),
        _: 1
      }, 8, ["click-to-close", "esc-to-close"]);
    };
  }
};
const _hoisted_1$4 = { class: "monsterinsights-error-modal__title" };
const _hoisted_2$4 = {
  key: 0,
  class: "monsterinsights-error-modal__message"
};
const _hoisted_3$3 = { class: "monsterinsights-error-modal__actions" };
const _sfc_main$5 = {
  __name: "ErrorModal",
  props: {
    title: {
      type: String,
      default: __$2("Something went wrong", "google-analytics-for-wordpress")
    },
    message: {
      type: String,
      default: ""
    },
    confirmButtonText: {
      type: String,
      default: __$2("Ok", "google-analytics-for-wordpress")
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    escToClose: {
      type: Boolean,
      default: true
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onClosed: {
      type: Function,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function handleConfirm() {
      if (typeof props.onConfirm === "function") {
        props.onConfirm();
      }
      emit("update:modelValue", false);
      if (typeof props.onClosed === "function") {
        props.onClosed();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Ro), {
        class: "monsterinsights-error-modal-overlay",
        "content-class": "monsterinsights-error-modal",
        "overlay-transition": "vfm-fade",
        "content-transition": "vfm-fade",
        "click-to-close": __props.clickToClose,
        "esc-to-close": __props.escToClose
      }, {
        default: withCtx(() => [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "monsterinsights-error-modal__icon" }, [
            createBaseVNode("svg", {
              width: "80",
              height: "80",
              viewBox: "0 0 80 80",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createBaseVNode("circle", {
                cx: "40",
                cy: "40",
                r: "36",
                stroke: "#F97373",
                "stroke-width": "4",
                fill: "none"
              }),
              createBaseVNode("path", {
                d: "M28 28L52 52",
                stroke: "#F97373",
                "stroke-width": "4",
                "stroke-linecap": "round"
              }),
              createBaseVNode("path", {
                d: "M52 28L28 52",
                stroke: "#F97373",
                "stroke-width": "4",
                "stroke-linecap": "round"
              })
            ])
          ], -1)),
          createBaseVNode("h3", _hoisted_1$4, toDisplayString(__props.title), 1),
          __props.message ? (openBlock(), createElementBlock("p", _hoisted_2$4, toDisplayString(__props.message), 1)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3$3, [
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-error-modal__button",
              onClick: handleConfirm
            }, toDisplayString(__props.confirmButtonText), 1)
          ])
        ]),
        _: 1
      }, 8, ["click-to-close", "esc-to-close"]);
    };
  }
};
const _hoisted_1$3 = { class: "monsterinsights-loading-modal__title" };
const _hoisted_2$3 = {
  key: 0,
  class: "monsterinsights-loading-modal__message"
};
const _sfc_main$4 = {
  __name: "LoadingModal",
  props: {
    title: {
      type: String,
      default: __$2("Please wait…", "google-analytics-for-wordpress")
    },
    message: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Ro), {
        class: "monsterinsights-loading-modal-overlay",
        "content-class": "monsterinsights-loading-modal",
        "overlay-transition": "vfm-fade",
        "content-transition": "vfm-fade",
        "click-to-close": false,
        "esc-to-close": false
      }, {
        default: withCtx(() => [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "monsterinsights-loading-modal__spinner" }, [
            createBaseVNode("div", { class: "monsterinsights-loading-modal__spinner-circle" })
          ], -1)),
          createBaseVNode("h3", _hoisted_1$3, toDisplayString(__props.title), 1),
          __props.message ? (openBlock(), createElementBlock("p", _hoisted_2$3, toDisplayString(__props.message), 1)) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
};
const _hoisted_1$2 = { class: "monsterinsights-success-modal__title" };
const _hoisted_2$2 = {
  key: 0,
  class: "monsterinsights-success-modal__message"
};
const _hoisted_3$2 = { class: "monsterinsights-success-modal__actions" };
const _sfc_main$3 = {
  __name: "SuccessModal",
  props: {
    title: {
      type: String,
      default: __$2("Success!", "google-analytics-for-wordpress")
    },
    message: {
      type: String,
      default: ""
    },
    confirmButtonText: {
      type: String,
      default: __$2("Ok", "google-analytics-for-wordpress")
    },
    clickToClose: {
      type: Boolean,
      default: true
    },
    escToClose: {
      type: Boolean,
      default: true
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onClosed: {
      type: Function,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function handleConfirm() {
      if (typeof props.onConfirm === "function") {
        props.onConfirm();
      }
      emit("update:modelValue", false);
    }
    function handleClosed() {
      if (typeof props.onClosed === "function") {
        props.onClosed();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Ro), {
        class: "monsterinsights-success-modal-overlay",
        "content-class": "monsterinsights-success-modal",
        "overlay-transition": "vfm-fade",
        "content-transition": "vfm-fade",
        "click-to-close": __props.clickToClose,
        "esc-to-close": __props.escToClose,
        onClosed: handleClosed
      }, {
        default: withCtx(() => [
          _cache[0] || (_cache[0] = createBaseVNode("div", { class: "monsterinsights-success-modal__icon" }, [
            createBaseVNode("svg", {
              width: "80",
              height: "80",
              viewBox: "0 0 80 80",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              createBaseVNode("circle", {
                cx: "40",
                cy: "40",
                r: "36",
                stroke: "#D0D5DD",
                "stroke-width": "4",
                fill: "none"
              }),
              createBaseVNode("path", {
                d: "M26 40L35 49L54 30",
                stroke: "#5CB85C",
                "stroke-width": "4",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                fill: "none"
              })
            ])
          ], -1)),
          createBaseVNode("h3", _hoisted_1$2, toDisplayString(__props.title), 1),
          __props.message ? (openBlock(), createElementBlock("p", _hoisted_2$2, toDisplayString(__props.message), 1)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-success-modal__button",
              onClick: handleConfirm
            }, toDisplayString(__props.confirmButtonText), 1)
          ])
        ]),
        _: 1
      }, 8, ["click-to-close", "esc-to-close"]);
    };
  }
};
const currentModalVModel = ref(null);
const currentModalController = ref(null);
function useModal() {
  const openModal = (options = {}) => {
    if (currentModalVModel.value?.value) {
      currentModalVModel.value.value = false;
    }
    let component;
    switch (options.type) {
      case "success":
        component = _sfc_main$3;
        break;
      case "error":
        component = _sfc_main$5;
        break;
      case "loading":
        component = _sfc_main$4;
        break;
      case "confirm":
        component = _sfc_main$6;
        break;
      default:
        component = options.component || _sfc_main$3;
    }
    const modalProps = {
      title: options.title || "",
      message: options.message || "",
      icon: options.icon,
      confirmButtonText: options.confirmButtonText,
      cancelButtonText: options.cancelButtonText,
      customClass: options.customClass || {},
      onConfirm: options.onConfirm,
      onCancel: options.onCancel,
      onClosed: options.onClosed,
      ...options
      // Pass through any additional options
    };
    try {
      const {
        open,
        close,
        options: modalVm
      } = Go({
        component,
        attrs: {
          ...modalProps,
          modelValue: true
        }
      });
      currentModalVModel.value = modalVm.modelValue;
      currentModalController.value = { close, options: modalVm };
      open();
      return {
        close,
        options: modalVm
      };
    } catch (error) {
      console.error("Error in useVueFinalModal:", error);
      throw error;
    }
  };
  const closeModal = (options = {}) => {
    if (options.controller) {
      options.controller.close();
      return;
    }
    if (currentModalVModel.value?.value) {
      currentModalVModel.value.value = false;
    }
    if (currentModalController.value) {
      currentModalController.value.close();
      currentModalController.value = null;
    }
  };
  const showLoadingModal = (titleOrOptions = "Loading...", options = {}) => {
    let config;
    if (typeof titleOrOptions === "string") {
      config = { title: titleOrOptions, ...options };
    } else {
      config = { title: "Loading...", ...titleOrOptions };
    }
    return openModal({
      type: "loading",
      ...config
    });
  };
  const showSuccessModal = (titleOrOptions, messageOrOptions, options = {}) => {
    let config;
    if (typeof titleOrOptions === "object" && titleOrOptions !== null) {
      config = titleOrOptions;
    } else if (typeof titleOrOptions === "string" && typeof messageOrOptions === "object") {
      config = { title: titleOrOptions, ...messageOrOptions };
    } else {
      config = {
        title: titleOrOptions || "Success",
        message: messageOrOptions || "",
        ...options
      };
    }
    return openModal({
      type: "success",
      confirmButtonText: "OK",
      clickToClose: true,
      escToClose: true,
      ...config
    });
  };
  const showErrorModal = (titleOrOptions, messageOrOptions, options = {}) => {
    let config;
    if (typeof titleOrOptions === "object" && titleOrOptions !== null) {
      config = titleOrOptions;
    } else if (typeof titleOrOptions === "string" && typeof messageOrOptions === "object") {
      config = { title: titleOrOptions, ...messageOrOptions };
    } else {
      config = {
        title: titleOrOptions || "Error",
        message: messageOrOptions || "",
        ...options
      };
    }
    return openModal({
      type: "error",
      confirmButtonText: "OK",
      clickToClose: true,
      escToClose: true,
      ...config
    });
  };
  const showConfirmModal = (titleOrOptions, messageOrOnConfirm, onConfirm, onCancel, options = {}) => {
    let config;
    if (typeof titleOrOptions === "object" && titleOrOptions !== null) {
      config = titleOrOptions;
    } else if (typeof messageOrOnConfirm === "function") {
      config = {
        title: titleOrOptions || "Confirm",
        message: options.message || "Are you sure?",
        onConfirm: messageOrOnConfirm,
        onCancel: onConfirm,
        // shifted parameter
        ...onCancel
        // shifted parameter (options)
      };
    } else {
      config = {
        title: titleOrOptions || "Confirm",
        message: messageOrOnConfirm || "Are you sure?",
        onConfirm,
        onCancel,
        ...options
      };
    }
    return openModal({
      type: "confirm",
      confirmButtonText: config.confirmButtonText || "Confirm",
      cancelButtonText: config.cancelButtonText || "Cancel",
      clickToClose: false,
      escToClose: false,
      ...config
    });
  };
  const isModalVisible = () => {
    return currentModalVModel.value && currentModalVModel.value.value === true;
  };
  const { __: __2 } = wp.i18n;
  const showAddonInstallModal = (slug, status, error = null) => {
    const addonName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    switch (status) {
      case "installing":
        return showLoadingModal({
          title: __2("Installing Addon", "google-analytics-for-wordpress"),
          message: __2("Installing", "google-analytics-for-wordpress") + ` ${addonName}...`,
          clickToClose: false,
          escToClose: false
        });
      case "activating":
        return showLoadingModal({
          title: __2("Activating Addon", "google-analytics-for-wordpress"),
          message: __2("Activating", "google-analytics-for-wordpress") + ` ${addonName}...`,
          clickToClose: false,
          escToClose: false
        });
      case "errorInstall":
        return showErrorModal({
          title: __2("Installation Failed", "google-analytics-for-wordpress"),
          message: error?.message || __2("Failed to install", "google-analytics-for-wordpress") + ` ${addonName}. ` + __2("Please try again.", "google-analytics-for-wordpress"),
          confirmButtonText: __2("OK", "google-analytics-for-wordpress")
        });
      default:
        console.warn(`Unknown addon install status: ${status}`);
        return null;
    }
  };
  const showAddonActivateModal = (addonName, status, error = null) => {
    switch (status) {
      case "activating":
        return showLoadingModal({
          title: __2("Activating Addon", "google-analytics-for-wordpress"),
          message: __2("Activating", "google-analytics-for-wordpress") + ` ${addonName}...`,
          clickToClose: false,
          escToClose: false
        });
      case "successReload":
        return showSuccessModal({
          title: __2("Addon Activated", "google-analytics-for-wordpress"),
          message: `${addonName} ` + __2(
            "has been successfully activated. The page will reload in a moment to complete the setup.",
            "google-analytics-for-wordpress"
          ),
          confirmButtonText: __2("OK", "google-analytics-for-wordpress"),
          onConfirm: () => {
            setTimeout(() => {
              window.location.reload();
            }, 1e3);
          }
        });
      case "errorActivate":
        return showErrorModal({
          title: __2("Activation Failed", "google-analytics-for-wordpress"),
          message: error?.message || __2("Failed to activate", "google-analytics-for-wordpress") + ` ${addonName}. ` + __2("Please try again.", "google-analytics-for-wordpress"),
          confirmButtonText: __2("OK", "google-analytics-for-wordpress")
        });
      default:
        console.warn(`Unknown addon activate status: ${status}`);
        return null;
    }
  };
  const setModalState = (state) => {
    const { type, status, slug, addonName, error } = state;
    switch (type) {
      case "addonInstall":
        return showAddonInstallModal(slug, status, error);
      case "addonActivate":
        return showAddonActivateModal(addonName, status, error);
      default:
        console.warn(`Unknown modal type: ${type}`);
        return null;
    }
  };
  return {
    // Core modal methods
    openModal,
    closeModal,
    isModalVisible,
    // Specific modal types
    showLoadingModal,
    showSuccessModal,
    showErrorModal,
    showConfirmModal,
    // Addon-specific modals (replaces appStore.setModalState)
    showAddonInstallModal,
    showAddonActivateModal,
    setModalState
    // Legacy compatibility
  };
}
const _hoisted_1$1 = { class: "monsterinsights-report-header-applied-filters" };
const _hoisted_2$1 = { class: "monsterinsights-report-header-applied-filters__container" };
const _hoisted_3$1 = {
  key: 0,
  class: "monsterinsights-report-header-applied-filters__label"
};
const _hoisted_4$1 = { class: "monsterinsights-filter-tag__text" };
const _hoisted_5$1 = { class: "monsterinsights-filter-tag__name" };
const _hoisted_6 = { class: "monsterinsights-filter-tag__value" };
const _hoisted_7 = ["aria-label", "onClick"];
const _hoisted_8 = { class: "monsterinsights-overview-report-header-right" };
const _hoisted_9 = { class: "monsterinsights-header-btn__text" };
const _hoisted_10 = {
  key: 0,
  class: "monsterinsights-header-btn__indicator"
};
const _hoisted_11$1 = {
  class: "monsterinsights-download-dropdown",
  "data-html2canvas-ignore": "true"
};
const _hoisted_12$1 = {
  key: 0,
  class: "monsterinsights-download-dropdown__menu"
};
const _hoisted_13$1 = ["disabled"];
const _hoisted_14$1 = ["disabled"];
const _hoisted_15$1 = ["disabled"];
const MAX_VISIBLE_FILTERS = 3;
const _sfc_main$2 = {
  __name: "OverviewHeader",
  setup(__props) {
    const shouldBlur = computed(() => !isAuthed());
    const overviewStore = useOverviewReportStore();
    const { showSuccessModal, showErrorModal, showLoadingModal, closeModal } = useModal();
    const dateRangeModelValue = computed(() => ({
      interval: overviewStore.dateRange.interval ?? "last30days",
      start: overviewStore.dateRange.start ?? "",
      end: overviewStore.dateRange.end ?? "",
      compareReport: overviewStore.dateRange.compareReport ?? false,
      compareStart: overviewStore.dateRange.compareStart ?? "",
      compareEnd: overviewStore.dateRange.compareEnd ?? ""
    }));
    function onDateChange(updates) {
      if (updates?.compareReport === true && true) {
        overviewStore.openProModal();
        return;
      }
      overviewStore.updateDateRange(updates);
    }
    const isFilterModalOpen = ref(false);
    const filterTypeLabels = {
      sessionDefaultChannelGroup: __$2("Channel Group", "google-analytics-for-wordpress"),
      sessionCampaignName: __$2("Campaign - Name", "google-analytics-for-wordpress"),
      sessionSource: __$2("Campaign - Source", "google-analytics-for-wordpress"),
      sessionMedium: __$2("Campaign - Medium", "google-analytics-for-wordpress"),
      sessionManualTerm: __$2("Campaign - Term", "google-analytics-for-wordpress"),
      sessionManualAdContent: __$2("Campaign - Content", "google-analytics-for-wordpress"),
      landingPagePlusQueryString: __$2("Page - Landing Page", "google-analytics-for-wordpress"),
      pageTitle: __$2("Page - Title", "google-analytics-for-wordpress"),
      country: __$2("Country", "google-analytics-for-wordpress"),
      region: __$2("State / Region", "google-analytics-for-wordpress"),
      browser: __$2("Browser", "google-analytics-for-wordpress"),
      operatingSystem: __$2("Operating System", "google-analytics-for-wordpress"),
      deviceCategory: __$2("Device Category", "google-analytics-for-wordpress")
    };
    const appliedFilters = computed(() => {
      const displayFilters = overviewStore.activeFilters.map((f) => ({
        name: filterTypeLabels[f.type] || f.type,
        value: f.value,
        _raw: f
      }));
      if (overviewStore.activeDevice) {
        displayFilters.push({
          name: __$2("Device", "google-analytics-for-wordpress"),
          value: overviewStore.activeDevice.charAt(0).toUpperCase() + overviewStore.activeDevice.slice(1),
          _raw: { type: "__device__", value: overviewStore.activeDevice }
        });
      }
      return displayFilters;
    });
    const filtersExpanded = ref(false);
    const displayedFilters = computed(() => {
      if (filtersExpanded.value) return appliedFilters.value;
      return appliedFilters.value.slice(0, MAX_VISIBLE_FILTERS);
    });
    const additionalFiltersCount = computed(() => {
      return Math.max(0, appliedFilters.value.length - MAX_VISIBLE_FILTERS);
    });
    const hasActiveFilters = computed(() => overviewStore.hasActiveFilters);
    const removeFilter = (index) => {
      const removed = displayedFilters.value[index];
      if (!removed) return;
      if (removed._raw.type === "__device__") {
        overviewStore.setActiveFilters(overviewStore.activeFilters, "");
      } else {
        const raw = removed._raw;
        const newFilters = overviewStore.activeFilters.filter((f) => f !== raw);
        overviewStore.setActiveFilters(newFilters, overviewStore.activeDevice);
      }
      if (appliedFilters.value.length <= MAX_VISIBLE_FILTERS) {
        filtersExpanded.value = false;
      }
    };
    const clearAllFilters = () => {
      overviewStore.setActiveFilters([], "");
      filtersExpanded.value = false;
    };
    const openFilterPanel = () => {
      {
        overviewStore.openProModal();
        return;
      }
    };
    const closeFilterPanel = () => {
      isFilterModalOpen.value = false;
    };
    const onApplyFilter = (filterData) => {
      overviewStore.setActiveFilters(
        filterData.filters || [],
        filterData.device || ""
      );
    };
    const isDownloadMenuOpen = ref(false);
    const isExportingPdf = ref(false);
    const isExportingSpreadsheet = ref(false);
    const onDownloadClick = () => {
      {
        overviewStore.openProModal();
        return;
      }
    };
    const closeDownloadMenu = () => {
      isDownloadMenuOpen.value = false;
    };
    const vClickOutside = {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    };
    async function exportPDFReport() {
      if (isExportingPdf.value) return;
      const reportContainer = ".monsterinsights-overview-report";
      const report = document.querySelector(reportContainer);
      if (!report) {
        showErrorModal({
          title: __$2("Export failed", "google-analytics-for-wordpress"),
          message: __$2("Error: Report container not found.", "google-analytics-for-wordpress")
        });
        return;
      }
      isExportingPdf.value = true;
      isDownloadMenuOpen.value = false;
      document.body.classList.add("monsterinsights-downloading-pdf-report");
      await new Promise((resolve) => setTimeout(resolve, 500));
      const PDF_CONTENT_WIDTH = 1e3;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: "monsterinsights-overview-report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        enableLinks: false,
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
          onclone: (_clonedDoc, clonedElement) => {
            clonedElement.style.width = `${PDF_CONTENT_WIDTH}px`;
            clonedElement.style.maxWidth = `${PDF_CONTENT_WIDTH}px`;
            clonedElement.style.minWidth = `${PDF_CONTENT_WIDTH}px`;
            clonedElement.style.overflow = "visible";
            const elementsToHide = clonedElement.querySelectorAll(
              '[data-html2canvas-ignore="true"]'
            );
            elementsToHide.forEach((el) => {
              el.style.display = "none";
            });
            const widgets = clonedElement.querySelectorAll(
              ".monsterinsights-widget, .monsterinsights-widget-display"
            );
            widgets.forEach((widget) => {
              widget.style.maxWidth = "100%";
              widget.style.overflow = "hidden";
            });
            const charts = clonedElement.querySelectorAll(
              "canvas, svg, .chart-container, .chartjs-render-monitor"
            );
            charts.forEach((chart) => {
              chart.style.maxWidth = "100%";
            });
          }
        },
        jsPDF: {
          unit: "mm",
          format: [210, 297],
          // A4
          orientation: "portrait"
        }
      };
      try {
        const worker = html2pdf().set(opt).from(report);
        const pdf = await worker.toPdf().get("pdf");
        const pageWidth = 210;
        const pageHeight = 297;
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.text(
            sprintf(
              __$2("Page %1$d of %2$d", "google-analytics-for-wordpress"),
              i,
              totalPages
            ),
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" }
          );
        }
        pdf.save("monsterinsights-overview-report.pdf");
        showSuccessModal({
          title: __$2("Downloaded PDF report successfully!", "google-analytics-for-wordpress"),
          confirmButtonText: __$2("Ok", "google-analytics-for-wordpress")
        });
      } catch (error) {
        console.error("Failed to generate PDF:", error);
        showErrorModal({
          title: __$2("Export failed", "google-analytics-for-wordpress"),
          message: __$2(
            "Failed to generate PDF. See console for details.",
            "google-analytics-for-wordpress"
          )
        });
      } finally {
        document.body.classList.remove("monsterinsights-downloading-pdf-report");
        isExportingPdf.value = false;
      }
    }
    function buildExportFilters() {
      const conditions = [];
      for (const filter of overviewStore.activeFilters) {
        if (!filter.type || !filter.value) continue;
        conditions.push({
          field: filter.type,
          type: "dimension",
          match: filter.condition === "is_not" ? "not_equal" : "exact",
          value: String(filter.value).trim(),
          caseSensitive: false
        });
      }
      if (overviewStore.activeDevice) {
        conditions.push({
          field: "deviceCategory",
          type: "dimension",
          match: "exact",
          value: overviewStore.activeDevice,
          caseSensitive: false
        });
      }
      if (conditions.length === 0) return null;
      return { operator: "and", conditions };
    }
    async function exportSpreadsheetReport(format) {
      if (isExportingSpreadsheet.value) return;
      isExportingSpreadsheet.value = true;
      isDownloadMenuOpen.value = false;
      showLoadingModal({
        title: __$2("Creating export...", "google-analytics-for-wordpress")
      });
      try {
        const formData = new FormData();
        formData.set("action", "monsterinsights_export_report");
        formData.set("nonce", getNonce());
        formData.set("report_type", "overview");
        formData.set("start_date", overviewStore.dateRange.start);
        formData.set("end_date", overviewStore.dateRange.end);
        formData.set("format", format);
        const filters = buildExportFilters();
        if (filters) {
          formData.set("filters", JSON.stringify(filters));
        }
        const response = await ajaxPost(formData);
        closeModal();
        if (response.success) {
          showSuccessModal({
            title: __$2("Export Started", "google-analytics-for-wordpress"),
            message: response.data?.message || __$2(
              "Your export is being processed. You will receive a notification when it is ready.",
              "google-analytics-for-wordpress"
            )
          });
        } else {
          throw new Error(response.data?.message || "Export failed");
        }
      } catch (error) {
        closeModal();
        showErrorModal({
          title: __$2("Export Failed", "google-analytics-for-wordpress"),
          message: error.message || __$2(
            "Failed to create export. Please try again.",
            "google-analytics-for-wordpress"
          )
        });
      } finally {
        isExportingSpreadsheet.value = false;
      }
    }
    const openUpsellModal = () => {
      overviewStore.openProModal();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["monsterinsights-overview-report-header", { "monsterinsights-blur": shouldBlur.value }])
        }, [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              appliedFilters.value.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_3$1, toDisplayString(unref(__$2)("Filters Applied:", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(displayedFilters.value, (filter, index) => {
                return openBlock(), createElementBlock("div", {
                  key: index,
                  class: "monsterinsights-filter-tag"
                }, [
                  createBaseVNode("span", _hoisted_4$1, [
                    createBaseVNode("span", _hoisted_5$1, toDisplayString(filter.name) + ": ", 1),
                    createBaseVNode("span", _hoisted_6, toDisplayString(filter.value), 1)
                  ]),
                  createBaseVNode("button", {
                    type: "button",
                    class: "monsterinsights-filter-tag__remove",
                    "aria-label": `Remove ${filter.name} filter`,
                    onClick: ($event) => removeFilter(index)
                  }, [
                    createVNode(Icon, {
                      name: "close",
                      size: 12
                    })
                  ], 8, _hoisted_7)
                ]);
              }), 128)),
              additionalFiltersCount.value > 0 && !filtersExpanded.value ? (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                class: "monsterinsights-filter-count",
                onClick: _cache[0] || (_cache[0] = ($event) => filtersExpanded.value = true)
              }, toDisplayString(additionalFiltersCount.value) + "+ ", 1)) : createCommentVNode("", true),
              filtersExpanded.value && appliedFilters.value.length > MAX_VISIBLE_FILTERS ? (openBlock(), createElementBlock("button", {
                key: 2,
                type: "button",
                class: "monsterinsights-filter-collapse",
                onClick: _cache[1] || (_cache[1] = ($event) => filtersExpanded.value = false)
              }, toDisplayString(unref(__$2)("Collapse", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true),
              filtersExpanded.value && appliedFilters.value.length > MAX_VISIBLE_FILTERS ? (openBlock(), createElementBlock("button", {
                key: 3,
                type: "button",
                class: "monsterinsights-filter-clear-all",
                onClick: clearAllFilters
              }, toDisplayString(unref(__$2)("Clear All Filters", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createVNode(unref(_sfc_main$c), {
              "model-value": dateRangeModelValue.value,
              "onUpdate:modelValue": onDateChange,
              onOpenUpsellModal: openUpsellModal
            }, null, 8, ["model-value"]),
            createBaseVNode("button", {
              type: "button",
              class: normalizeClass(["monsterinsights-header-btn", { "monsterinsights-header-btn--has-indicator": hasActiveFilters.value }]),
              onClick: openFilterPanel
            }, [
              createVNode(Icon, {
                name: "filter",
                size: 20
              }),
              createBaseVNode("span", _hoisted_9, toDisplayString(unref(__$2)("Filter", "google-analytics-for-wordpress")), 1),
              hasActiveFilters.value ? (openBlock(), createElementBlock("span", _hoisted_10)) : createCommentVNode("", true)
            ], 2),
            withDirectives((openBlock(), createElementBlock("div", _hoisted_11$1, [
              createBaseVNode("button", {
                type: "button",
                class: "monsterinsights-header-btn monsterinsights-header-btn--download",
                onClick: onDownloadClick
              }, [
                createVNode(Icon, {
                  name: "download",
                  size: 20
                }),
                createVNode(Icon, {
                  name: "chevron-down",
                  size: 16
                })
              ]),
              isDownloadMenuOpen.value ? (openBlock(), createElementBlock("div", _hoisted_12$1, [
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-download-dropdown__item",
                  disabled: isExportingPdf.value,
                  onClick: exportPDFReport
                }, [
                  createVNode(Icon, {
                    name: "download",
                    size: 16
                  }),
                  createBaseVNode("span", null, toDisplayString(isExportingPdf.value ? unref(__$2)("Exporting...", "google-analytics-for-wordpress") : unref(__$2)("Export PDF Report", "google-analytics-for-wordpress")), 1)
                ], 8, _hoisted_13$1),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-download-dropdown__item",
                  disabled: isExportingSpreadsheet.value,
                  onClick: _cache[2] || (_cache[2] = ($event) => exportSpreadsheetReport("csv"))
                }, [
                  createVNode(Icon, {
                    name: "download",
                    size: 16
                  }),
                  createBaseVNode("span", null, toDisplayString(unref(__$2)("Export CSV", "google-analytics-for-wordpress")), 1)
                ], 8, _hoisted_14$1),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-download-dropdown__item",
                  disabled: isExportingSpreadsheet.value,
                  onClick: _cache[3] || (_cache[3] = ($event) => exportSpreadsheetReport("excel"))
                }, [
                  createVNode(Icon, {
                    name: "download",
                    size: 16
                  }),
                  createBaseVNode("span", null, toDisplayString(unref(__$2)("Export Excel", "google-analytics-for-wordpress")), 1)
                ], 8, _hoisted_15$1)
              ])) : createCommentVNode("", true)
            ])), [
              [vClickOutside, closeDownloadMenu]
            ])
          ])
        ], 2),
        createVNode(_sfc_main$7, {
          "is-open": isFilterModalOpen.value,
          onClose: closeFilterPanel,
          onApplyFilter
        }, null, 8, ["is-open"])
      ], 64);
    };
  }
};
const _hoisted_11 = {
  id: "overview-pro-feature-modal-title",
  class: "overview-pro-feature-modal__title"
};
const _hoisted_12 = { class: "overview-pro-feature-modal__description" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = ["href"];
const _hoisted_15 = {
  key: 2,
  class: "overview-pro-feature-modal__error"
};
const _hoisted_16 = ["href"];
const _hoisted_17 = { class: "overview-pro-feature-modal__bonus" };
const _hoisted_18 = { class: "overview-pro-feature-modal__bonus-text" };
const _hoisted_19 = { class: "overview-pro-feature-modal__bonus-highlight" };
const settingsScreenUrl = "/wp-admin/admin.php?page=monsterinsights_settings";
const _sfc_main$1 = {
  __name: "OverviewProFeatureModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    /** Addon slug (e.g. 'page_insights', 'forms', 'ecommerce', 'dimensions'). When set for Pro users, shows addon install/activate UI instead of upgrade. */
    addonSlug: {
      type: String,
      default: ""
    },
    /** Display name for the addon (e.g. 'Page Insights'). */
    addonName: {
      type: String,
      default: ""
    }
  },
  emits: ["update:modelValue", "close", "upgrade", "already-purchased"],
  setup(__props, { emit: __emit }) {
    const dialogRef = ref(null);
    const props = __props;
    const emit = __emit;
    const isExactMetrics = false;
    new URL("" + new URL("../assets/em-arrows-Dq2c4rA5.jpg", import.meta.url).href, import.meta.url).href;
    const isProAddonMode = computed(() => isPro());
    const addonIsInstalled = computed(() => props.addonSlug ? isAddonInstalled(props.addonSlug) : false);
    const addonsPageUrl = computed(() => getAddonsPageUrl());
    const ADDON_DISPLAY_NAMES = {
      page_insights: __$2("Page Insights", "google-analytics-for-wordpress"),
      forms: __$2("Forms", "google-analytics-for-wordpress"),
      ecommerce: __$2("eCommerce", "google-analytics-for-wordpress"),
      dimensions: __$2("Dimensions", "google-analytics-for-wordpress")
    };
    const addonDisplayName = computed(
      () => props.addonName || ADDON_DISPLAY_NAMES[props.addonSlug] || props.addonSlug
    );
    const addonTitle = computed(() => {
      if (addonIsInstalled.value) {
        return __$2("Activate the %s Addon", "google-analytics-for-wordpress").replace("%s", addonDisplayName.value);
      }
      return __$2("Install the %s Addon", "google-analytics-for-wordpress").replace("%s", addonDisplayName.value);
    });
    const addonDescription = computed(() => {
      if (addonIsInstalled.value) {
        return __$2("The %s addon is installed but not active. Activate it to unlock these insights with your real data.", "google-analytics-for-wordpress").replace("%s", addonDisplayName.value);
      }
      return __$2("The %s addon is required to view this data. Install and activate it from the Addons page to unlock these insights.", "google-analytics-for-wordpress").replace("%s", addonDisplayName.value);
    });
    const isActivating = ref(false);
    const activationError = ref("");
    async function onActivateAddon() {
      if (!props.addonSlug || isActivating.value) return;
      const basename = getAddonBasename(props.addonSlug);
      if (!basename) {
        activationError.value = __$2("Could not find addon to activate.", "google-analytics-for-wordpress");
        return;
      }
      isActivating.value = true;
      activationError.value = "";
      try {
        const nonce = getMiGlobal$1("activate_nonce", "");
        const ajax = getMiGlobal$1("ajax", "");
        const isNetwork = getMiGlobal$1("network", false);
        const formData = new FormData();
        formData.append("action", "monsterinsights_activate_addon");
        formData.append("nonce", nonce);
        formData.append("plugin", basename);
        if (isNetwork) {
          formData.append("isnetwork", "true");
        }
        const response = await fetch(ajax, {
          method: "POST",
          credentials: "same-origin",
          body: formData
        });
        const result = await response.json();
        if (result === true || result?.success) {
          try {
            localStorage.removeItem("mi_cache_registry");
          } catch (e) {
          }
          window.location.reload();
        } else {
          activationError.value = result?.error || result?.data || __$2("Failed to activate addon. Please try from the Addons page.", "google-analytics-for-wordpress");
          isActivating.value = false;
        }
      } catch {
        activationError.value = __$2("Failed to activate addon. Please try from the Addons page.", "google-analytics-for-wordpress");
        isActivating.value = false;
      }
    }
    function onInstallAddon() {
      close();
    }
    const title = computed(
      () => __$2("This is a Pro Feature", "google-analytics-for-wordpress")
    );
    const description = computed(
      () => __$2(
        "We're sorry, this feature is not available on your plan. Please upgrade to the Pro plan to unlock all these awesome features.",
        "google-analytics-for-wordpress"
      )
    );
    const ctaText = computed(
      () => __$2("Upgrade to Pro", "google-analytics-for-wordpress")
    );
    const bonusLabel = computed(() => __$2("Bonus:", "google-analytics-for-wordpress"));
    const bonusText = computed(
      () => __$2("MonsterInsights Lite users get ", "google-analytics-for-wordpress")
    );
    const bonusHighlight = computed(() => __$2("50% off", "google-analytics-for-wordpress"));
    const bonusSuffix = computed(
      () => __$2("regular price, automatically applied at checkout.", "google-analytics-for-wordpress")
    );
    const alreadyPurchasedText = computed(() => __$2("Already purchased?", "google-analytics-for-wordpress"));
    const upgradeUrl = computed(
      () => getUpgradeUrl(
        "overview-pro-feature-modal",
        "overview-report",
        "https://www.monsterinsights.com/lite/"
      )
    );
    function close() {
      activationError.value = "";
      emit("update:modelValue", false);
      emit("close");
    }
    function handleKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }
    watch(
      () => props.modelValue,
      (isOpen) => {
        if (isOpen) {
          document.addEventListener("keydown", handleKeydown);
          setTimeout(() => {
            const focusable3 = dialogRef.value?.querySelector?.('a[href], button, [tabindex]:not([tabindex="-1"])');
            focusable3?.focus?.();
          }, 0);
        } else {
          document.removeEventListener("keydown", handleKeydown);
        }
      },
      { immediate: true }
    );
    onUnmounted(() => {
      document.removeEventListener("keydown", handleKeydown);
    });
    function onUpgradeClick() {
      emit("upgrade", upgradeUrl.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        __props.modelValue ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "overview-pro-feature-modal-overlay",
          onClick: withModifiers(close, ["self"])
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["overview-pro-feature-modal", { "overview-pro-feature-modal--exactmetrics": isExactMetrics }]),
            ref_key: "dialogRef",
            ref: dialogRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "overview-pro-feature-modal-title"
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "overview-pro-feature-modal__close",
              "aria-label": "Close",
              onClick: close
            }, [..._cache[0] || (_cache[0] = [
              createBaseVNode("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 20 20",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true"
              }, [
                createBaseVNode("path", {
                  d: "M16.3333 4.34286L14.9905 3L9.66667 8.32381L4.34286 3L3 4.34286L8.32381 9.66667L3 14.9905L4.34286 16.3333L9.66667 11.0095L14.9905 16.3333L16.3333 14.9905L11.0095 9.66667L16.3333 4.34286Z",
                  fill: "#BDBDBD"
                })
              ], -1)
            ])]),
            (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "overview-pro-feature-modal__lock" }, [
                createBaseVNode("svg", {
                  width: "40",
                  height: "40",
                  viewBox: "0 0 40 40",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": "true"
                }, [
                  createBaseVNode("path", {
                    d: "M30.0269 15.7465V11.0267C30.0269 5.50008 25.5336 1 20.0002 1C14.4735 1 9.97344 5.50008 9.97344 11.0267V15.7465C7.66009 15.9399 5.84009 17.8932 5.84009 20.253V25.8799C5.84009 33.1132 11.72 39 18.9533 39H21.0467C28.28 39 34.1599 33.1132 34.1599 25.8799V20.253C34.1599 17.893 32.3402 15.9398 30.0269 15.7465ZM14.3135 11.0267C14.6252 3.49175 25.3753 3.49345 25.6868 11.0267V15.7269H14.3135L14.3135 11.0267ZM18.4136 27.887C16.0735 26.3603 17.2152 22.6287 20.0003 22.6535C22.7853 22.6301 23.9286 26.3585 21.587 27.887C21.4069 28.007 21.2936 28.2203 21.2936 28.4403V30.7803C21.2503 32.4837 18.7519 32.487 18.7069 30.7803V28.4403C18.7069 28.2203 18.5936 28.007 18.4136 27.887Z",
                    fill: "#777777"
                  })
                ])
              ], -1)),
              createBaseVNode("h2", _hoisted_11, toDisplayString(isProAddonMode.value ? addonTitle.value : title.value), 1),
              createBaseVNode("p", _hoisted_12, toDisplayString(isProAddonMode.value ? addonDescription.value : description.value), 1),
              isProAddonMode.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                addonIsInstalled.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "overview-pro-feature-modal__cta overview-pro-feature-modal__cta--btn",
                  disabled: isActivating.value,
                  onClick: onActivateAddon
                }, [
                  createBaseVNode("span", null, toDisplayString(isActivating.value ? unref(__$2)("Activating…", "google-analytics-for-wordpress") : unref(__$2)("Activate Addon", "google-analytics-for-wordpress")), 1)
                ], 8, _hoisted_13)) : (openBlock(), createElementBlock("a", {
                  key: 1,
                  href: addonsPageUrl.value,
                  class: "overview-pro-feature-modal__cta",
                  onClick: onInstallAddon
                }, [
                  createBaseVNode("span", null, toDisplayString(unref(__$2)("Go to Addons Page", "google-analytics-for-wordpress")), 1),
                  _cache[3] || (_cache[3] = createBaseVNode("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "overview-pro-feature-modal__cta-arrow",
                    "aria-hidden": "true"
                  }, [
                    createBaseVNode("path", {
                      d: "M4.16675 10H15.8334",
                      stroke: "white",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createBaseVNode("path", {
                      d: "M10 4.16663L15.8333 9.99996L10 15.8333",
                      stroke: "white",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ], -1))
                ], 8, _hoisted_14)),
                activationError.value ? (openBlock(), createElementBlock("p", _hoisted_15, toDisplayString(activationError.value), 1)) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("a", {
                  href: upgradeUrl.value,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "overview-pro-feature-modal__cta",
                  onClick: onUpgradeClick
                }, [
                  createBaseVNode("span", null, toDisplayString(ctaText.value), 1),
                  _cache[4] || (_cache[4] = createBaseVNode("svg", {
                    width: "20",
                    height: "20",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "overview-pro-feature-modal__cta-arrow",
                    "aria-hidden": "true"
                  }, [
                    createBaseVNode("path", {
                      d: "M4.16675 10H15.8334",
                      stroke: "white",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }),
                    createBaseVNode("path", {
                      d: "M10 4.16663L15.8333 9.99996L10 15.8333",
                      stroke: "white",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    })
                  ], -1))
                ], 8, _hoisted_16),
                createBaseVNode("div", _hoisted_17, [
                  _cache[5] || (_cache[5] = createBaseVNode("span", {
                    class: "overview-pro-feature-modal__bonus-check",
                    "aria-hidden": "true"
                  }, [
                    createBaseVNode("svg", {
                      width: "29",
                      height: "31",
                      viewBox: "0 0 29 31",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg"
                    }, [
                      createBaseVNode("g", { "clip-path": "url(#clip0_bonus_check_modal)" }, [
                        createBaseVNode("path", {
                          d: "M14.4595 1.96826C14.6331 1.96837 14.8972 2.09466 15.4517 2.54443C15.6798 2.72949 15.9791 2.98518 16.2671 3.19287C16.5246 3.37856 16.8399 3.57738 17.2026 3.70654L17.3608 3.75732C17.7954 3.88135 18.2296 3.88536 18.5952 3.86084C18.9522 3.8369 19.3343 3.77666 19.6206 3.73877C20.3144 3.64697 20.5774 3.67853 20.7124 3.76221C20.8769 3.86412 21.053 4.13848 21.3247 4.82959C21.4382 5.11834 21.5762 5.49494 21.73 5.82959C21.8864 6.16984 22.0968 6.55449 22.4019 6.88135C22.7095 7.2109 23.0751 7.44094 23.4009 7.61279C23.7175 7.77984 24.0752 7.93063 24.3403 8.05029C24.9694 8.33418 25.2187 8.51344 25.3208 8.70264C25.4276 8.90041 25.4459 9.25006 25.3608 9.98779C25.2932 10.5742 25.1363 11.5163 25.3384 12.3296V12.3306C25.4464 12.764 25.6514 13.1457 25.8491 13.4604C26.0415 13.7666 26.2776 14.0843 26.4517 14.3306C26.8589 14.9068 27.015 15.2297 27.0151 15.4917C27.0151 15.7537 26.859 16.0764 26.4517 16.6528C26.2776 16.8992 26.0416 17.2176 25.8491 17.5239C25.6761 17.7994 25.4975 18.1258 25.3833 18.4937L25.3384 18.6538C25.1362 19.4671 25.2932 20.4091 25.3608 20.9956C25.4459 21.7332 25.4274 22.0829 25.3208 22.2808C25.2187 22.47 24.9694 22.6492 24.3403 22.9331C24.0751 23.0528 23.7176 23.2045 23.4009 23.3716C23.0753 23.5434 22.7094 23.7727 22.4019 24.1021C22.0967 24.429 21.8864 24.8145 21.73 25.1548C21.5763 25.4893 21.4382 25.8651 21.3247 26.1538C21.0869 26.7588 20.9225 27.045 20.7749 27.1753L20.7124 27.2222C20.5773 27.3058 20.3142 27.3364 19.6206 27.2446C19.3343 27.2067 18.9521 27.1475 18.5952 27.1235C18.2296 27.099 17.7954 27.1021 17.3608 27.2261V27.2271C16.9311 27.35 16.5613 27.5793 16.2671 27.7915C15.9791 27.9992 15.6797 28.2549 15.4517 28.4399C14.8972 28.8897 14.6331 29.016 14.4595 29.0161C14.2859 29.0161 14.0218 28.8897 13.4673 28.4399C13.2391 28.2549 12.939 27.9993 12.6509 27.7915C12.3568 27.5794 11.9876 27.35 11.5581 27.2271L11.5571 27.2261C11.1228 27.1021 10.6893 27.099 10.3237 27.1235C9.96688 27.1475 9.58462 27.2067 9.29834 27.2446C8.6051 27.3364 8.34171 27.3056 8.20654 27.2222H8.20557C8.04114 27.1202 7.86588 26.8448 7.59424 26.1538C7.48073 25.8651 7.34176 25.4894 7.18799 25.1548C7.0316 24.8145 6.82222 24.429 6.51709 24.1021C6.20948 23.7725 5.84282 23.5434 5.51709 23.3716C5.20033 23.2045 4.84279 23.0528 4.57764 22.9331C3.94874 22.6493 3.70026 22.4699 3.59814 22.2808C3.49144 22.0829 3.47305 21.7334 3.55811 20.9956C3.62573 20.4091 3.7818 19.4671 3.57959 18.6538L3.53467 18.4937C3.42049 18.1259 3.24283 17.7993 3.06982 17.5239C2.87732 17.2175 2.64044 16.8993 2.46631 16.6528C2.05906 16.0765 1.90381 15.7537 1.90381 15.4917C1.90391 15.2297 2.05911 14.9068 2.46631 14.3306C2.64038 14.0842 2.87739 13.7667 3.06982 13.4604C3.26751 13.1458 3.47155 12.764 3.57959 12.3306V12.3296C3.78175 11.5163 3.62572 10.5743 3.55811 9.98779C3.47308 9.25003 3.49137 8.90041 3.59814 8.70264C3.70031 8.51349 3.94873 8.33411 4.57764 8.05029C4.84274 7.93066 5.20038 7.77984 5.51709 7.61279C5.84287 7.44092 6.20945 7.21097 6.51709 6.88135C6.82205 6.55457 7.03164 6.16975 7.18799 5.82959C7.34178 5.49494 7.48072 5.11834 7.59424 4.82959C7.8657 4.13912 8.04122 3.8643 8.20557 3.76221H8.20654C8.34164 3.67864 8.60474 3.64698 9.29834 3.73877C9.58463 3.77666 9.96685 3.83691 10.3237 3.86084C10.6893 3.88533 11.1228 3.88128 11.5571 3.75732H11.5581C11.9875 3.63444 12.3568 3.40494 12.6509 3.19287C12.939 2.98511 13.2391 2.72952 13.4673 2.54443C14.022 2.09449 14.2859 1.96826 14.4595 1.96826Z",
                          fill: "#219653",
                          stroke: "white",
                          "stroke-width": "2"
                        }),
                        createBaseVNode("path", {
                          d: "M18.3768 11.1638L13.2167 16.6925L10.5418 13.8289C9.96113 13.2068 9.01902 13.2068 8.4384 13.8289C7.85777 14.451 7.85777 15.4604 8.4384 16.0825L12.191 20.1032C12.7558 20.7083 13.6731 20.7083 14.2379 20.1032L20.4779 13.4174C21.0585 12.7953 21.0585 11.7859 20.4779 11.1638C19.8973 10.5417 18.9574 10.5417 18.3768 11.1638Z",
                          fill: "#FFFCEE"
                        })
                      ]),
                      createBaseVNode("defs", null, [
                        createBaseVNode("clipPath", { id: "clip0_bonus_check_modal" }, [
                          createBaseVNode("rect", {
                            width: "28.9183",
                            height: "30.9839",
                            fill: "white"
                          })
                        ])
                      ])
                    ])
                  ], -1)),
                  createBaseVNode("p", _hoisted_18, [
                    createBaseVNode("strong", null, toDisplayString(bonusLabel.value), 1),
                    createTextVNode(" " + toDisplayString(bonusText.value) + " ", 1),
                    createBaseVNode("strong", _hoisted_19, toDisplayString(bonusHighlight.value), 1),
                    createTextVNode(" " + toDisplayString(bonusSuffix.value), 1)
                  ])
                ]),
                createBaseVNode("a", {
                  href: settingsScreenUrl,
                  class: "overview-pro-feature-modal__already-purchased"
                }, toDisplayString(alreadyPurchasedText.value), 1)
              ], 64))
            ], 64))
          ], 2)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const OverviewProFeatureModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-11f99562"]]);
const _hoisted_1 = { class: "monsterinsights-admin-page monsterinsights-reports-page monsterinsights-overview-report-app" };
const _hoisted_2 = { class: "monsterinsights-report-content" };
const _hoisted_3 = {
  key: 0,
  class: "monsterinsights-license-notice"
};
const _hoisted_4 = ["href"];
const _hoisted_5 = { class: "monsterinsights-container" };
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const overviewStore = useOverviewReportStore();
    const isLicenseExpired = computed(() => getMiGlobal$1("license_expired", false));
    const licenseRenewalUrl = computed(() => getUrl("admin-notices", "license-expired", "https://www.monsterinsights.com/my-account/"));
    const isScrolled = ref(false);
    function onScroll() {
      isScrolled.value = window.scrollY > 0;
    }
    onMounted(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", onScroll);
    });
    return (_ctx, _cache) => {
      const _component_RouterView = resolveComponent("RouterView");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$d),
          isLicenseExpired.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createBaseVNode("p", null, [
              createTextVNode(toDisplayString(unref(__$2)("Your MonsterInsights license has expired or has an error. Some reports may not load correctly.", "google-analytics-for-wordpress")) + " ", 1),
              createBaseVNode("a", {
                href: licenseRenewalUrl.value,
                target: "_blank"
              }, toDisplayString(unref(__$2)("Renew your license", "google-analytics-for-wordpress")), 9, _hoisted_4)
            ])
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["monsterinsights-sticky-bar", { "is-scrolled": isScrolled.value }])
          }, [
            createVNode(_sfc_main$9),
            createVNode(_sfc_main$2)
          ], 2),
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_RouterView)
          ])
        ]),
        createVNode(OverviewProFeatureModal, {
          modelValue: unref(overviewStore).showProModal,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(overviewStore).showProModal = $event)
        }, null, 8, ["modelValue"]),
        createVNode(unref(Wo))
      ]);
    };
  }
};
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
const vfm = zo();
const app = createApp(_sfc_main);
setupPinia(app);
app.use(router);
app.use(vfm);
const stylePromise = __vitePreload(() => Promise.resolve({}), true ? __vite__mapDeps([12]) : void 0, import.meta.url);
stylePromise.then(() => {
  app.mount("#monsterinsights-overview-report-app");
});
export {
  DEVICES_TAB_TO_QUERY_ID as A,
  DEVICES_DIMENSION_TAB as B,
  CUSTOM_DIMENSIONS_DIMENSION_TAB as C,
  DEFAULT_ECOMMERCE_FUNNEL as D,
  MC_TAB_TO_QUERY_ID as M,
  OverviewProFeatureModal as O,
  PAGES_TAB_TO_QUERY_ID as P,
  QUERY_DIMENSIONS as Q,
  ajaxPost as a,
  buildApiFilters as b,
  getInjectedMetricNames as c,
  getTabMetricsForQuery as d,
  generateSampleCustomDimensionsData as e,
  fetchOverviewData as f,
  getNonce as g,
  fetchCustomDimensionsData as h,
  fetchCustomDimensionsDeferredData as i,
  filterTabbedData as j,
  CUSTOM_DIMENSIONS_TAB_TO_QUERY_ID as k,
  fetchFunnelData as l,
  getResponseDimensionOrder as m,
  generateSampleBundleData as n,
  fetchFormSubmissionsData as o,
  filterFormSubmissionsData as p,
  fetchEcommerceOverviewData as q,
  fetchMarketingCampaignsData as r,
  fetchPagesData as s,
  fetchDemographicsData as t,
  useOverviewReportStore as u,
  fetchDevicesData as v,
  MC_DIMENSION_TAB as w,
  PAGES_DIMENSION_TAB as x,
  DEMOGRAPHICS_TAB_TO_QUERY_ID as y,
  DEMOGRAPHICS_DIMENSION_TAB as z
};
