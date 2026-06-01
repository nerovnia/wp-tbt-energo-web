import { a as __vitePreload } from "./TheAppHeader-DnsM3Eft.js";
import { _ as __, j as ref, aG as getUpgradeUrl$1, m as computed, k as getMiGlobal$1 } from "./_plugin-vue_export-helper-Cga6DwZW.js";
const getMiGlobal = (key, defaultValue = null) => {
  return typeof window !== "undefined" && window.monsterinsights && typeof window.monsterinsights === "object" && Object.hasOwn(window.monsterinsights, key) ? window.monsterinsights[key] : defaultValue;
};
async function ensureBearerToken(minValidityMs = 5 * 60 * 1e3) {
  if (typeof window === "undefined") {
    return false;
  }
  const bearerToken = getMiGlobal("bearer_token");
  const bearerExpires = getMiGlobal("bearer_expires");
  if (bearerToken && bearerExpires) {
    const expiresAtMs = bearerExpires * 1e3;
    const now = Date.now();
    const remainingMs = expiresAtMs - now;
    if (remainingMs > minValidityMs) {
      return true;
    }
  }
  if (!window.wp || !window.wp.ajax) {
    return false;
  }
  const nonce = getMiGlobal("nonce");
  try {
    const response = await window.wp.ajax.post("monsterinsights_get_bearer_token", {
      nonce
    });
    const body = response?.data && typeof response.data === "object" ? response.data : response;
    const inner = body?.data && typeof body.data === "object" ? body.data : body;
    const token = inner?.token ?? body?.token;
    const expiresAt = inner?.expires_at ?? body?.expires_at;
    if (token && typeof token === "string") {
      if (window.monsterinsights && typeof window.monsterinsights === "object") {
        window.monsterinsights.bearer_token = token;
        window.monsterinsights.bearer_expires = expiresAt ?? 0;
      }
      return true;
    }
  } catch (_e) {
  }
  return false;
}
const isPro = () => {
  return false;
};
const isAddonActive = (addon) => {
  const addons = getMiGlobal("addons", {});
  return !!addons[addon];
};
const isAddonInstalled = (addon) => {
  const info = getMiGlobal("addons_info", {});
  return !!info[addon]?.installed;
};
const getAddonBasename = (addon) => {
  const info = getMiGlobal("addons_info", {});
  return info[addon]?.basename || "";
};
const getAddonsPageUrl = () => {
  return getMiGlobal("addons_page_url", "/wp-admin/admin.php?page=monsterinsights_settings#/addons");
};
const isAuthed = () => {
  return getMiGlobal("authed", false);
};
const sampleDataModules = /* @__PURE__ */ Object.assign({ "../stores/sample-data/custom-dashboard/sample-view.json": () => __vitePreload(() => import("./sample-view-DCgpbF5N.js"), true ? [] : void 0, import.meta.url), "../stores/sample-data/custom-dashboard/widgets-data.json": () => __vitePreload(() => import("./widgets-data-TjimP1Ju.js"), true ? [] : void 0, import.meta.url) });
const getSampleData = async (type) => {
  if (!type) {
    return null;
  }
  const path = `../stores/sample-data/${type}.json`;
  if (sampleDataModules[path]) {
    try {
      const module = await sampleDataModules[path]();
      return module.default?.data || module.default;
    } catch (error) {
      console.error(`Error loading sample data for '${type}':`, error);
      return null;
    }
  }
  return null;
};
function addQueryArg(uri, key, value) {
  let hash = "";
  const re = new RegExp(`([?&])${key}=.*?(&|#|$)`, "i");
  const separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  } else {
    if (uri.indexOf("#") !== -1) {
      hash = uri.replace(/.*#/, "#");
      uri = uri.replace(/#.*/, "");
    }
    return `${uri + separator + key}=${value}${hash}`;
  }
}
function getUrl(medium, campaign, url) {
  const source = "liteplugin", default_url = "lite/", content = getMiGlobal("plugin_version", "1.0.0");
  medium = medium ? medium : "defaultmedium";
  campaign = campaign ? campaign : "defaultcampaign";
  url = url ? url : `https://www.monsterinsights.com/${default_url}`;
  url = addQueryArg(url, "utm_source", source);
  url = addQueryArg(url, "utm_medium", medium);
  url = addQueryArg(url, "utm_campaign", campaign);
  url = addQueryArg(url, "utm_content", content);
  return url;
}
function getUpgradeUrl(medium, campaign, url) {
  const upgrade_url = getUrl(medium, campaign, url);
  const shareasale_id = getMiGlobal("shareasale_id", 0);
  const shareasale_url = getMiGlobal("shareasale_url", "");
  if (shareasale_id && "0" !== shareasale_id && shareasale_url) {
    return addQueryArg(shareasale_url, "urllink", upgrade_url);
  }
  return upgrade_url;
}
function useUpsellContent() {
  function getUpsellContent(feature) {
    const upsellTexts = {
      "custom-dashboard": {
        mainHeading: __("Analytics Dashboard", "google-analytics-for-wordpress"),
        title: __(
          "Create custom analytics dashboards with drag and drop simplicity.",
          "google-analytics-for-wordpress"
        ),
        features: [
          __(
            "Highlight your businesses most important metrics",
            "google-analytics-for-wordpress"
          ),
          __(
            "Create multiple views to group insights together",
            "google-analytics-for-wordpress"
          ),
          __(
            "Easily view historical data and discover trends",
            "google-analytics-for-wordpress"
          ),
          __(
            "Use bar charts, line graphs, and scorecards",
            "google-analytics-for-wordpress"
          ),
          __(
            "Works automatically with all eCommerce, forms, and custom dimensions",
            "google-analytics-for-wordpress"
          ),
          __(
            "Share with your team or export as beautiful PDFs",
            "google-analytics-for-wordpress"
          )
        ],
        buttonText: {
          Lite: __("Upgrade to Pro", "google-analytics-for-wordpress"),
          Plus: __("Upgrade to Pro", "google-analytics-for-wordpress")
        },
        learnMoreUrl: "https://www.monsterinsights.com/features/custom-dashboard/",
        sampleDataAvailable: true,
        requiredLicense: "Pro"
      },
      ecommerce: {
        mainHeading: __("eCommerce Report", "google-analytics-for-wordpress"),
        title: __(
          "Increase Sales and Make More Money With Enhanced eCommerce Insights",
          "google-analytics-for-wordpress"
        ),
        features: [
          __("10+ eCommerce Integrations", "google-analytics-for-wordpress"),
          __("Average Order Value", "google-analytics-for-wordpress"),
          __("Total Revenue", "google-analytics-for-wordpress"),
          __("Sessions to Purchase", "google-analytics-for-wordpress"),
          __("Top Conversion Sources", "google-analytics-for-wordpress"),
          __("Top Products", "google-analytics-for-wordpress"),
          __("Number of Transactions", "google-analytics-for-wordpress"),
          __("Time to Purchase", "google-analytics-for-wordpress")
        ],
        buttonText: {
          Lite: __("Upgrade to Plus", "google-analytics-for-wordpress")
        },
        learnMoreUrl: "https://www.monsterinsights.com/addon/ecommerce/",
        sampleDataAvailable: true,
        requiredLicense: "Plus"
      },
      forms: {
        mainHeading: __("Forms Report", "google-analytics-for-wordpress"),
        title: __(
          "Track Every Type of Web Form and Gain Visibility Into Your Customer Journey",
          "google-analytics-for-wordpress"
        ),
        features: [
          __("Conversion Counts", "google-analytics-for-wordpress"),
          __("Impression Counts", "google-analytics-for-wordpress"),
          __("Conversion Rates", "google-analytics-for-wordpress")
        ],
        buttonText: {
          Lite: __("Upgrade to Plus", "google-analytics-for-wordpress")
        },
        learnMoreUrl: "https://www.monsterinsights.com/addon/forms/",
        sampleDataAvailable: true,
        requiredLicense: "Plus"
      },
      publisher: {
        mainHeading: __("Publishers Report", "google-analytics-for-wordpress"),
        title: __(
          "Improve Your Conversion Rate With Insights Into Which Content Works Best",
          "google-analytics-for-wordpress"
        ),
        features: [
          __("Top Landing Pages", "google-analytics-for-wordpress"),
          __("Top Affilliate Links", "google-analytics-for-wordpress"),
          __("Top Exit Pages", "google-analytics-for-wordpress"),
          __("Top Download Links", "google-analytics-for-wordpress"),
          __("Top Outbound Links", "google-analytics-for-wordpress"),
          __("Scroll Depth", "google-analytics-for-wordpress")
        ],
        buttonText: {
          Lite: __("Upgrade to Pro", "google-analytics-for-wordpress"),
          Plus: __("Upgrade to Pro", "google-analytics-for-wordpress")
        },
        learnMoreUrl: "https://www.monsterinsights.com/addon/publisher/",
        sampleDataAvailable: true,
        requiredLicense: "Pro"
      },
      dimensions: {
        mainHeading: __("Dimensions Report", "google-analytics-for-wordpress"),
        title: __(
          "Increase Engagement and Unlock New Insights About Your Site",
          "google-analytics-for-wordpress"
        ),
        features: [
          __("Author Tracking", "google-analytics-for-wordpress"),
          __("User ID Tracking", "google-analytics-for-wordpress"),
          __("Post Types", "google-analytics-for-wordpress"),
          __("Tag Tracking", "google-analytics-for-wordpress"),
          __("Categories", "google-analytics-for-wordpress"),
          __("SEO Scores", "google-analytics-for-wordpress"),
          __("Publish Times", "google-analytics-for-wordpress"),
          __("Focus Keywords", "google-analytics-for-wordpress")
        ],
        buttonText: {
          Lite: __("Upgrade to Plus", "google-analytics-for-wordpress")
        },
        learnMoreUrl: "https://www.monsterinsights.com/addon/dimensions/",
        sampleDataAvailable: true,
        requiredLicense: "Plus"
      }
    };
    return upsellTexts[feature] || null;
  }
  return {
    getUpsellContent
  };
}
const sharedState = {};
function getSharedState(feature) {
  if (!sharedState[feature]) {
    sharedState[feature] = {
      isUpsellModalOpen: ref(false),
      isSampleMode: ref(false)
    };
  }
  return sharedState[feature];
}
function useFeatureGate(feature) {
  const { getUpsellContent } = useUpsellContent();
  const { isUpsellModalOpen, isSampleMode } = getSharedState(feature);
  const hasAccess = computed(() => {
    const license = getMiGlobal$1("license", {});
    const licenseType = (license.type || "").toLowerCase();
    return licenseType === "pro" || licenseType === "elite";
  });
  const upsellContent = computed(() => {
    return getUpsellContent(feature);
  });
  const minimumLicense = computed(() => {
    return __("Pro", "google-analytics-for-wordpress");
  });
  const currentLicense = computed(() => {
    const license = getMiGlobal$1("license", {});
    const type = license.type || "";
    return type.charAt(0).toUpperCase() + type.slice(1) || __("Lite", "google-analytics-for-wordpress");
  });
  const upgradeButtonText = computed(() => {
    if (!upsellContent.value) {
      return __("Upgrade Now", "google-analytics-for-wordpress");
    }
    const buttonTextConfig = upsellContent.value.buttonText;
    if (typeof buttonTextConfig === "object") {
      return buttonTextConfig[currentLicense.value] || // translators: %s is the license level (e.g., "Pro", "Plus")
      __("Upgrade to %s", "google-analytics-for-wordpress").replace(
        "%s",
        minimumLicense.value
      );
    }
    return buttonTextConfig || __("Upgrade to %s", "google-analytics-for-wordpress").replace(
      "%s",
      minimumLicense.value
    );
  });
  const hasSampleData = computed(() => {
    return upsellContent.value?.sampleDataAvailable || false;
  });
  const openUpsellModal = () => {
    isUpsellModalOpen.value = true;
    isSampleMode.value = false;
  };
  const closeUpsellModal = () => {
    isUpsellModalOpen.value = false;
  };
  const enableSampleMode = () => {
    isSampleMode.value = true;
    closeUpsellModal();
  };
  const disableSampleMode = () => {
    isSampleMode.value = false;
  };
  const handleUpgrade = () => {
    const learnMoreUrl = upsellContent.value?.learnMoreUrl || "https://www.monsterinsights.com/pricing/";
    const upgradeUrl = getUpgradeUrl$1(
      "custom-dashboard-upsell",
      `upgrade-${feature}`,
      learnMoreUrl
    );
    window.open(upgradeUrl, "_blank");
  };
  const handleLearnMore = () => {
    const learnMoreUrl = upsellContent.value?.learnMoreUrl || "https://www.monsterinsights.com/";
    window.open(learnMoreUrl, "_blank");
  };
  const shouldBlurContent = computed(() => {
    return !hasAccess.value && !isSampleMode.value;
  });
  const shouldShowUpsell = computed(() => {
    return !hasAccess.value && isUpsellModalOpen.value && !isSampleMode.value;
  });
  return {
    // Access control
    hasAccess,
    minimumLicense,
    currentLicense,
    // Upsell content
    upsellContent,
    upgradeButtonText,
    hasSampleData,
    // Modal state
    isUpsellModalOpen,
    isSampleMode,
    shouldBlurContent,
    shouldShowUpsell,
    // Actions
    openUpsellModal,
    closeUpsellModal,
    enableSampleMode,
    disableSampleMode,
    handleUpgrade,
    handleLearnMore
  };
}
export {
  isAuthed as a,
  getMiGlobal as b,
  isPro as c,
  isAddonInstalled as d,
  ensureBearerToken as e,
  getAddonsPageUrl as f,
  getAddonBasename as g,
  getUpgradeUrl as h,
  isAddonActive as i,
  getUrl as j,
  getSampleData as k,
  useFeatureGate as u
};
