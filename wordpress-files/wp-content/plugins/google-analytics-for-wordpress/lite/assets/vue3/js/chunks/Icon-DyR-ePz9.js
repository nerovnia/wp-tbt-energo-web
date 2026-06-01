import { k as getMiGlobal, a6 as _export_sfc, o as openBlock, c as createElementBlock, n as normalizeStyle, i as normalizeClass, q as createCommentVNode, m as computed } from "./_plugin-vue_export-helper-Cga6DwZW.js";
function useIcon() {
  function getIcon(iconPath) {
    if (!iconPath || typeof iconPath !== "string") {
      console.warn("[useIcon] Invalid iconPath:", iconPath);
      return null;
    }
    {
      const assetsUrl = getMiGlobal("assets_url", "");
      if (!assetsUrl) {
        console.warn("[useIcon] assets_url not found in global config");
        return null;
      }
      return `${assetsUrl}/icons/${iconPath}`;
    }
  }
  function getTemplateIcon(templateName) {
    return getIcon(
      `templates/${"monsterinsights"}/${templateName}.svg`
    );
  }
  return {
    getIcon,
    getTemplateIcon
  };
}
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["src", "alt", "aria-label"];
const _sfc_main = {
  __name: "Icon",
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: 48 },
    width: { type: [Number, String], default: null },
    height: { type: [Number, String], default: null },
    color: { type: String, default: "currentColor" },
    title: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const isDashicon = computed(() => props.name.startsWith("dashicons-"));
    const { getIcon, getTemplateIcon } = useIcon();
    const iconUrl = computed(() => {
      if (isDashicon.value) return null;
      if (!props.name) {
        console.warn("[Icon] name prop is required");
        return null;
      }
      if (props.name.startsWith("templates/")) {
        const parts = props.name.split("/");
        const templateName = parts[parts.length - 1].replace(".svg", "");
        return getTemplateIcon(templateName);
      }
      const iconPath = props.name.endsWith(".svg") ? props.name : `${props.name}.svg`;
      return getIcon(iconPath);
    });
    const styleVars = computed(() => {
      const width = props.width || props.size;
      const height = props.height || props.size;
      return {
        "--mi-icon-width": typeof width === "number" ? `${width}px` : String(width),
        "--mi-icon-height": typeof height === "number" ? `${height}px` : String(height),
        "--mi-icon-color": props.color
      };
    });
    const dashiconStyles = computed(() => {
      const size = props.width || props.height || props.size;
      const sizeValue = typeof size === "number" ? `${size}px` : String(size);
      const styles = {
        fontSize: sizeValue,
        width: sizeValue,
        height: sizeValue,
        lineHeight: sizeValue
      };
      if (props.color !== "inherit") {
        styles.color = props.color;
      }
      return styles;
    });
    return (_ctx, _cache) => {
      return isDashicon.value ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["dashicons", props.name]),
        style: normalizeStyle(dashiconStyles.value),
        role: "img",
        "aria-label": __props.title || void 0
      }, null, 14, _hoisted_1)) : iconUrl.value ? (openBlock(), createElementBlock("img", {
        key: 1,
        src: iconUrl.value,
        style: normalizeStyle(styleVars.value),
        class: "mi-icon",
        role: "img",
        alt: __props.title || props.name,
        "aria-label": __props.title || void 0
      }, null, 12, _hoisted_2)) : createCommentVNode("", true);
    };
  }
};
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a843a786"]]);
export {
  Icon as I
};
