import { k as getMiGlobal, a3 as getMonsterInsightsUrl, m as computed, X as reactive, l as defineStore, a2 as isNetworkAdmin, p as getUrl, a6 as _export_sfc, o as openBlock, D as createBlock, b as createVNode, C as withCtx, T as Transition, U as Teleport, c as createElementBlock, A as withModifiers, a as createBaseVNode, t as toDisplayString, q as createCommentVNode, u as unref, _ as __$2, i as normalizeClass, F as Fragment, f as renderList, n as normalizeStyle, aG as getUpgradeUrl, a5 as sprintf$1, j as ref } from "./_plugin-vue_export-helper-Cga6DwZW.js";
import { I as Icon } from "./Icon-DyR-ePz9.js";
import { e as useErrorHandling } from "./TheAppHeader-DnsM3Eft.js";
import { k as getSampleData } from "./useFeatureGate-DCZMml8b.js";
const { __: __$1, sprintf } = wp.i18n;
const fetchLicense = () => new Promise((resolve, reject) => {
  const action = "monsterinsights_vue_get_license";
  const ajaxData = {
    nonce: getMiGlobal("nonce")
  };
  wp.ajax.post(action, ajaxData).done((response) => {
    resolve(response);
  }).fail((response) => {
    let message = "";
    const support_url = getMonsterInsightsUrl(
      "admin-notices",
      "error-loading-license",
      "https://www.monsterinsights.com/my-account/support/"
    );
    const title = sprintf(
      // Translators: %1$s: Support Link tag start with URL, %2$s: Support link tag ends.
      __$1(
        "Oops! There was an issue fetching your license details, please try again. If the issue persists, please %1$scontact our support team%2$s.",
        "google-analytics-for-wordpress"
      ),
      `<a target="_blank" href="${support_url}">`,
      `</a>`
    );
    if (response?.error) {
      message = response.error;
    } else if (typeof response === "string" && response.length > 0) {
      message = response;
    } else {
      message = __$1(
        "An unknown error occurred while fetching license.",
        "google-analytics-for-wordpress"
      );
    }
    reject({ title, message, support_url });
  });
});
const verifyLicense = (license_key, isNetwork = false) => {
  return new Promise((resolve, reject) => {
    const action = "monsterinsights_verify_license";
    const ajaxData = {
      nonce: getMiGlobal("nonce"),
      license: license_key,
      network: isNetwork ? true : void 0
    };
    wp.ajax.post(action, ajaxData).done((response) => {
      resolve(response);
    }).fail((response) => {
      let message = "";
      const support_url = getMonsterInsightsUrl(
        "admin-notices",
        "error-verifying-license",
        "https://www.monsterinsights.com/my-account/support/"
      );
      const title = sprintf(
        // Translators: %1$s: Support Link tag start with URL, %2$s: Support link tag ends.
        __$1(
          "Oops! There was an issue verifying your license, please try again. If the issue persists, please %1$scontact our support team%2$s.",
          "google-analytics-for-wordpress"
        ),
        `<a target="_blank" href="${support_url}">`,
        `</a>`
      );
      if (response?.error) {
        message = response.error;
      } else if (typeof response === "string" && response.length > 0) {
        message = response;
      } else {
        message = __$1(
          "An unknown error occurred during license verification.",
          "google-analytics-for-wordpress"
        );
      }
      reject({ title, message, support_url });
    });
  });
};
const validateLicense = (isNetwork = false) => {
  return new Promise((resolve, reject) => {
    const action = "monsterinsights_validate_license";
    const ajaxData = {
      nonce: getMiGlobal("nonce"),
      network: isNetwork ? true : void 0
    };
    wp.ajax.post(action, ajaxData).done((response) => {
      resolve(response);
    }).fail((response) => {
      let message = "";
      const support_url = getMonsterInsightsUrl(
        "admin-notices",
        "error-validating-license",
        "https://www.monsterinsights.com/my-account/support/"
      );
      const title = sprintf(
        // Translators: %1$s: Support Link tag start with URL, %2$s: Support link tag ends.
        __$1(
          "Oops! There was an issue validating your license, please try again. If the issue persists, please %1$scontact our support team%2$s.",
          "google-analytics-for-wordpress"
        ),
        `<a target="_blank" href="${support_url}">`,
        `</a>`
      );
      if (response?.error) {
        message = response.error;
      } else if (typeof response === "string" && response.length > 0) {
        message = response;
      } else {
        message = __$1(
          "An unknown error occurred while validating license.",
          "google-analytics-for-wordpress"
        );
      }
      reject({ title, message, support_url });
    });
  });
};
const deactivateLicense = (license_key, isNetwork = false) => {
  return new Promise((resolve, reject) => {
    const action = "monsterinsights_deactivate_license";
    const ajaxData = {
      nonce: getMiGlobal("nonce"),
      license: license_key,
      network: isNetwork ? true : void 0
    };
    wp.ajax.post(action, ajaxData).done((response) => {
      resolve(response);
    }).fail((response) => {
      let message = "";
      const support_url = getMonsterInsightsUrl(
        "admin-notices",
        "error-deactivating-license",
        "https://www.monsterinsights.com/my-account/support/"
      );
      const title = sprintf(
        // Translators: %1$s: Support Link tag start with URL, %2$s: Support link tag ends.
        __$1(
          "Oops! There was an issue deactivating your license, please try again. If the issue persists, please %1$scontact our support team%2$s.",
          "google-analytics-for-wordpress"
        ),
        `<a target="_blank" href="${support_url}">`,
        `</a>`
      );
      if (response?.error) {
        message = response.error;
      } else if (typeof response === "string" && response.length > 0) {
        message = response;
      } else {
        message = __$1(
          "An unknown error occurred while deactivating license.",
          "google-analytics-for-wordpress"
        );
      }
      reject({ title, message, support_url });
    });
  });
};
const deactivateExpiredLicense = (license_key, isNetwork = false) => {
  return new Promise((resolve, reject) => {
    const action = "monsterinsights_deactivate_expired_license";
    const ajaxData = {
      nonce: getMiGlobal("nonce"),
      license: license_key,
      network: isNetwork ? true : void 0
    };
    wp.ajax.post(action, ajaxData).done((response) => {
      resolve(response);
    }).fail((response) => {
      let message = "";
      const support_url = getMonsterInsightsUrl(
        "admin-notices",
        "error-deactivating-expired-license",
        "https://www.monsterinsights.com/my-account/support/"
      );
      const title = sprintf(
        // Translators: %1$s: Support Link tag start with URL, %2$s: Support link tag ends.
        __$1(
          "Oops! There was an issue deactivating your expired license, please try again. If the issue persists, please %1$scontact our support team%2$s.",
          "google-analytics-for-wordpress"
        ),
        `<a target="_blank" href="${support_url}">`,
        `</a>`
      );
      if (response?.error) {
        message = response.error;
      } else if (typeof response === "string" && response.length > 0) {
        message = response;
      } else {
        message = __$1(
          "An unknown error occurred while deactivating your expired license.",
          "google-analytics-for-wordpress"
        );
      }
      reject({ title, message, support_url });
    });
  });
};
const getUpgradeLink = (key) => {
  return new Promise((resolve, reject) => {
    const actionValue = "monsterinsights_connect_url";
    const ajaxData = {
      nonce: getMiGlobal("nonce"),
      network: getMiGlobal("network"),
      // Use global data for network flag
      key
    };
    wp.ajax.post(actionValue, ajaxData).done((response) => {
      if (response) {
        resolve(response);
      } else {
        reject({
          title: __$1(
            "Error Getting Upgrade Link",
            "google-analytics-for-wordpress"
          ),
          message: __$1(
            "Empty response from server when trying to get upgrade link.",
            "google-analytics-for-wordpress"
          ),
          support_url: getMonsterInsightsUrl(
            "admin-notices",
            "error-upgrading-license",
            "https://www.monsterinsights.com/my-account/support/"
          )
        });
      }
    }).fail((response) => {
      let message = "";
      const support_url = getMonsterInsightsUrl(
        "admin-notices",
        "error-upgrading-license",
        "https://www.monsterinsights.com/my-account/support/"
      );
      const title = sprintf(
        // Translators: %1$s: Support Link tag start with URL, %2$s: Support link tag ends.
        __$1(
          "Oops! There was an issue getting your upgrade link, please try again. If the issue persists, please %1$scontact our support team%2$s.",
          "google-analytics-for-wordpress"
        ),
        `<a target="_blank" href="${support_url}">`,
        `</a>`
      );
      if (response?.error) {
        message = response.error;
      } else if (typeof response === "string" && response.length > 0) {
        message = response;
      } else {
        message = __$1(
          "An unknown error occurred while getting your upgrade link.",
          "google-analytics-for-wordpress"
        );
      }
      reject({ title, message, support_url });
    });
  });
};
const api = {
  fetchLicense,
  verifyLicense,
  validateLicense,
  deactivateLicense,
  deactivateExpiredLicense,
  getUpgradeLink
};
function useNotices() {
  const state = reactive({
    notices: {}
  });
  const allNotices = computed(() => state.notices);
  const hasNotices = computed(() => Object.keys(state.notices).length > 0);
  const addNotice = (noticeObject) => {
    state.notices = { ...state.notices, [noticeObject.id]: noticeObject };
  };
  const removeNotice = (noticeId) => {
    const { [noticeId]: _, ...rest } = state.notices;
    state.notices = rest;
  };
  const resetNotices = () => {
    state.notices = {};
  };
  const getNotice = (noticeId) => {
    return state.notices[noticeId] || null;
  };
  return {
    allNotices,
    hasNotices,
    addNotice,
    removeNotice,
    resetNotices,
    getNotice
  };
}
const { __ } = wp.i18n;
function getLicenseFromGlobals() {
  const license = getMiGlobal("license", {});
  return {
    key: license.key || "",
    type: license.type || "",
    is_expired: license.is_expired || false,
    is_disabled: license.is_disabled || false,
    is_invalid: license.is_invalid !== false,
    // Default to true if not explicitly false
    expiry_date: license.expiry_date || ""
  };
}
function getNetworkLicenseFromGlobals() {
  const license = getMiGlobal("license_network", {});
  return {
    key: license.key || "",
    type: license.type || "",
    is_expired: license.is_expired || false,
    is_disabled: license.is_disabled || false,
    is_invalid: license.is_invalid !== false,
    // Default to true if not explicitly false
    expiry_date: license.expiry_date || ""
  };
}
const useLicenseStore = defineStore("license", {
  state: () => ({
    license: getLicenseFromGlobals(),
    license_network: getNetworkLicenseFromGlobals(),
    isLoading: false
    // For UI feedback during API calls
  }),
  getters: {
    // Direct state access is common in Pinia, but getters can be defined for computed/derived state
    // Or to maintain a similar interface to the old Vuex getters if preferred by components
    getLicenseDetails: (state) => state.license,
    getLicenseNetworkDetails: (state) => state.license_network,
    activeLicense(state) {
      return isNetworkAdmin() ? state.license_network : state.license;
    },
    activeLicenseType() {
      return this.activeLicense ? this.activeLicense.type : "";
    },
    isCurrentLicenseActive() {
      const license = this.activeLicense;
      return license?.type && !license.is_expired && !license.is_disabled && !license.is_invalid;
    },
    // Example of a more specific getter if needed
    isLicenseActive: (state) => state.license.type && !state.license.is_expired && !state.license.is_disabled && !state.license.is_invalid,
    isNetworkLicenseActive: (state) => state.license_network.type && !state.license_network.is_expired && !state.license_network.is_disabled && !state.license_network.is_invalid,
    isLicenseExpired: (state) => {
      const siteLicenseIsExpired = state.license?.is_expired;
      const networkLicenseIsExpired = state.license_network?.is_expired;
      return !!(siteLicenseIsExpired || networkLicenseIsExpired);
    },
    activeLicenseExpiryDate: (state) => {
      const licenseToUse = isNetworkAdmin() ? state.license_network : state.license;
      return licenseToUse?.expiry_date ? licenseToUse.expiry_date : "";
    },
    // Feature Access Getters for Upsell System
    /**
     * Check if user has Pro or higher license
     * @returns {boolean}
     */
    hasProAccess() {
      const licenseType = this.activeLicenseType;
      return ["Pro", "Elite"].includes(licenseType);
    },
    /**
     * Check if user has Plus or higher license
     * @returns {boolean}
     */
    hasPlusAccess() {
      const licenseType = this.activeLicenseType;
      return ["Plus", "Pro", "Elite"].includes(licenseType);
    },
    /**
     * Check if user is on Lite license
     * @returns {boolean}
     */
    isLiteLicense() {
      const licenseType = this.activeLicenseType;
      return licenseType === "Lite" || !licenseType;
    },
    /**
     * Check if specific feature is available for current license
     * @returns {function(string): boolean}
     */
    hasFeatureAccess() {
      return (feature) => {
        const licenseType = this.activeLicenseType;
        const featureMap = {
          "custom-dashboard": ["Pro", "Elite"],
          ecommerce: ["Plus", "Pro", "Elite"],
          forms: ["Plus", "Pro", "Elite"],
          "search-console": ["Plus", "Pro", "Elite"],
          "real-time": ["Plus", "Pro", "Elite"],
          publishers: ["Pro", "Elite"],
          media: ["Plus", "Pro", "Elite"],
          dimensions: ["Plus", "Pro", "Elite"],
          "popular-products": ["Plus", "Pro", "Elite"]
        };
        return featureMap[feature]?.includes(licenseType) || false;
      };
    },
    /**
     * Get minimum required license for a feature
     * @returns {function(string): string}
     */
    getMinimumLicenseForFeature() {
      return (feature) => {
        const featureMap = {
          "custom-dashboard": "Pro",
          ecommerce: "Plus",
          forms: "Plus",
          "search-console": "Plus",
          "real-time": "Plus",
          publishers: "Pro",
          media: "Plus",
          dimensions: "Plus",
          "popular-products": "Plus"
        };
        return featureMap[feature] || "Plus";
      };
    }
  },
  actions: {
    // Mutations from Vuex are converted into direct state modifications here
    updateLicenseKey(key) {
      this.license.key = key;
    },
    updateLicenseData(licenseData) {
      this.license = { ...this.license, ...licenseData };
    },
    updateNetworkLicenseKey(key) {
      this.license_network.key = key;
    },
    updateNetworkLicenseData(licenseData) {
      this.license_network = { ...this.license_network, ...licenseData };
    },
    // Initial actions based on Vuex store
    async fetchLicenseData() {
      const { setActionError } = useErrorHandling();
      this.isLoading = true;
      try {
        const response = await api.fetchLicense();
        if (response.network) {
          this.updateNetworkLicenseData(response.network);
        }
        if (response.site) {
          this.updateLicenseData(response.site);
        }
        this.addLicenseNotices();
      } catch (errorDetails) {
        setActionError({
          title: errorDetails.title || __("Error Fetching License", "google-analytics-for-wordpress"),
          message: errorDetails.message,
          support_url: errorDetails.support_url
        });
      } finally {
        this.isLoading = false;
      }
    },
    async verifyLicense(licenseKey, isNetwork = false) {
      const { setActionError } = useErrorHandling();
      this.isLoading = true;
      try {
        const response = await api.verifyLicense(licenseKey, isNetwork);
        const licenseData = {
          key: licenseKey,
          type: response.license_type || "",
          is_expired: false,
          is_disabled: false,
          is_invalid: false
        };
        if (isNetwork) {
          this.updateNetworkLicenseData(licenseData);
        } else {
          this.updateLicenseData(licenseData);
        }
        this.addLicenseNotices();
        return response;
      } catch (errorDetails) {
        setActionError({
          title: errorDetails.title || __("Error Verifying License", "google-analytics-for-wordpress"),
          message: errorDetails.message,
          support_url: errorDetails.support_url
        });
        throw errorDetails;
      } finally {
        this.isLoading = false;
      }
    },
    // Debounced version - apiVerifyLicense in Vuex
    // We can define it within the store or call a debounced api function directly.
    // For simplicity, let's assume api.verifyLicense can be called directly and components can debounce if needed,
    // or we create a debounced version of the above action if used frequently from multiple places.
    async updateLicense(newLicenseKey) {
      return this.verifyLicense(newLicenseKey, false);
    },
    async updateNetworkLicense(newLicenseKey) {
      this.updateNetworkLicenseKey(newLicenseKey);
      return this.verifyLicense(newLicenseKey, true);
    },
    async validateLicense(isNetwork = false) {
      const { setActionError } = useErrorHandling();
      this.isLoading = true;
      try {
        const response = await api.validateLicense(isNetwork);
        if (response?.data?.success) {
          if (isNetwork) {
            if (response.data.license) {
              this.updateNetworkLicenseData(response.data.license);
            }
          } else {
            if (response.data.license) {
              this.updateLicenseData(response.data.license);
            }
          }
          this.addLicenseNotices();
        }
        return response;
      } catch (errorDetails) {
        setActionError({
          title: errorDetails.title || __("Error Validating License", "google-analytics-for-wordpress"),
          message: errorDetails.message,
          support_url: errorDetails.support_url
        });
        throw errorDetails;
      } finally {
        this.isLoading = false;
      }
    },
    async deactivateLicense(isNetwork = false) {
      const { setActionError } = useErrorHandling();
      this.isLoading = true;
      try {
        const licenseKeyToDeactivate = isNetwork ? this.license_network.key : this.license.key;
        const response = await api.deactivateLicense(
          licenseKeyToDeactivate,
          isNetwork
        );
        const clearedLicense = {
          key: "",
          type: "",
          is_expired: false,
          is_disabled: false,
          is_invalid: true
        };
        if (isNetwork) {
          this.updateNetworkLicenseData(clearedLicense);
        } else {
          this.updateLicenseData(clearedLicense);
        }
        this.addLicenseNotices();
        return response;
      } catch (errorDetails) {
        setActionError({
          title: errorDetails.title || __("Error Deactivating License", "google-analytics-for-wordpress"),
          message: errorDetails.message,
          support_url: errorDetails.support_url
        });
        throw errorDetails;
      } finally {
        this.isLoading = false;
      }
    },
    async deactivateExpiredLicense(isNetwork = false) {
      const { setActionError } = useErrorHandling();
      this.isLoading = true;
      try {
        const licenseKeyToDeactivate = isNetwork ? this.license_network.key : this.license.key;
        const response = await api.deactivateExpiredLicense(
          licenseKeyToDeactivate,
          isNetwork
        );
        const clearedLicense = {
          key: "",
          type: "",
          is_expired: false,
          is_disabled: false,
          is_invalid: true
        };
        if (isNetwork) {
          this.updateNetworkLicenseData(clearedLicense);
        } else {
          this.updateLicenseData(clearedLicense);
        }
        this.addLicenseNotices();
        return response;
      } catch (errorDetails) {
        setActionError({
          title: errorDetails.title || __(
            "Error Deactivating Expired License",
            "google-analytics-for-wordpress"
          ),
          message: errorDetails.message,
          support_url: errorDetails.support_url
        });
        throw errorDetails;
      } finally {
        this.isLoading = false;
      }
    },
    removeLicenseNotices() {
      const { removeNotice } = useNotices();
      removeNotice("license_expired");
      removeNotice("license_disabled");
      removeNotice("license_invalid");
    },
    addLicenseNotices() {
      const { addNotice } = useNotices();
      this.removeLicenseNotices();
      const licenseToUse = isNetworkAdmin() ? this.license_network : this.license;
      licenseToUse.type;
      getUrl("pricing", "license-notice");
      __("Upgrade Now", "google-analytics-dashboard-for-wp");
      if (licenseToUse.is_expired) {
        addNotice({
          id: "license_expired",
          title: __(
            "Your license has expired.",
            "google-analytics-for-wordpress"
          ),
          content: __(
            "To ensure tracking works properly, reactivate your license",
            "google-analytics-for-wordpress"
          ),
          button: {
            enabled: true,
            text: __("Reactivate License", "google-analytics-for-wordpress"),
            link: getUrl(
              "admin-notices",
              "expired-license",
              "https://www.monsterinsights.com/login/"
            )
          },
          icon: '<svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.5742 19.6992L15.2617 1.78125C14.4883 0.449219 12.4688 0.40625 11.6953 1.78125L1.38281 19.6992C0.609375 21.0312 1.59766 22.75 3.1875 22.75H23.7695C25.3594 22.75 26.3477 21.0742 25.5742 19.6992ZM13.5 15.9609C14.5742 15.9609 15.4766 16.8633 15.4766 17.9375C15.4766 19.0547 14.5742 19.9141 13.5 19.9141C12.3828 19.9141 11.5234 19.0547 11.5234 17.9375C11.5234 16.8633 12.3828 15.9609 13.5 15.9609ZM11.6094 8.87109C11.5664 8.57031 11.8242 8.3125 12.125 8.3125H14.832C15.1328 8.3125 15.3906 8.57031 15.3477 8.87109L15.0469 14.7148C15.0039 15.0156 14.7891 15.1875 14.5312 15.1875H12.4258C12.168 15.1875 11.9531 15.0156 11.9102 14.7148L11.6094 8.87109Z" fill="#E64949"/></svg>',
          type: "error"
        });
        return;
      }
      if (licenseToUse.is_disabled) {
        addNotice({
          id: "license_disabled",
          content: __(
            "Your license key for MonsterInsights has been disabled. Please use a different key.",
            "google-analytics-for-wordpress"
          ),
          type: "error"
        });
        return;
      }
      if (licenseToUse.is_invalid) {
        addNotice({
          id: "license_invalid",
          content: __(
            "Your license key for MonsterInsights is invalid. The key no longer exists or the user associated with the key has been deleted. Please use a different key.",
            "google-analytics-for-wordpress"
          ),
          type: "error"
        });
      }
    }
  }
});
const _hoisted_1 = { class: "monsterinsights-upsell-modal" };
const _hoisted_2 = { class: "monsterinsights-upsell-top" };
const _hoisted_3 = ["textContent"];
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = { class: "monsterinsights-upsell-content" };
const _hoisted_6 = { class: "monsterinsights-upsell-content__features" };
const _hoisted_7 = ["textContent"];
const _hoisted_8 = ["textContent"];
const _hoisted_9 = ["textContent"];
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = { class: "monsterinsights-upsell-content-buttons" };
const _sfc_main = {
  __name: "UpsellModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    dismissible: {
      type: Boolean,
      default: true
    },
    feature: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    customSubheading: {
      type: String,
      default: null
    },
    showSampleButton: {
      type: Boolean,
      default: true
    },
    noImage: {
      type: Boolean,
      default: false
    },
    forceTwoColumns: {
      type: Boolean,
      default: false
    },
    customImage: {
      type: String,
      default: null
    }
  },
  emits: ["close", "upgrade", "see-sample", "learn-more"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const licenseStore = useLicenseStore();
    const currentLicense = computed(() => {
      return licenseStore.activeLicenseType || "Lite";
    });
    const minimumLicense = computed(() => {
      return licenseStore.getMinimumLicenseForFeature(props.feature);
    });
    const buttonText = computed(() => {
      if (!props.content.buttonText) {
        return `Upgrade to ${minimumLicense.value}`;
      }
      if (typeof props.content.buttonText === "object") {
        return props.content.buttonText[currentLicense.value] || `Upgrade to ${minimumLicense.value}`;
      }
      return props.content.buttonText;
    });
    const subheading = computed(() => {
      if (props.customSubheading) {
        return props.customSubheading;
      }
      if (props.content.mainHeading) {
        return sprintf$1(
          __$2("What's in the %s?", "google-analytics-for-wordpress"),
          props.content.mainHeading
        );
      }
      return "";
    });
    const footerNotice = computed(() => {
      const upgradeLevel = minimumLicense.value;
      return sprintf$1(
        __$2("Upgrade to %1$s to unlock deeper insights, advanced tracking, and powerful integrations so you never miss what's driving results. %2$sLearn more about %1$s%3$s", "google-analytics-for-wordpress"),
        upgradeLevel,
        `<a target="_blank" href="${getUpgradeLink2()}" class="monsterinsights-upsell-learn-more">`,
        "</a>"
      );
    });
    const featuresClass = computed(() => {
      const featureCount = props.content.features?.length || 0;
      return featureCount > 4 || props.forceTwoColumns ? "columns-2" : "columns-1";
    });
    const hasSampleData = computed(() => {
      return props.content.sampleDataAvailable !== false;
    });
    const imageClass = computed(() => {
      return `upsell-${props.feature}`;
    });
    const imageStyle = computed(() => {
      if (props.customImage) {
        {
          const assetsUrl = getMiGlobal("assets_url", "");
          return {
            "--upsell-image": `url(${assetsUrl}/assets/${props.customImage})`
          };
        }
      }
      return {};
    });
    function getUpgradeLink2() {
      return getUpgradeUrl(
        "custom-dashboard-upsell",
        `upgrade-${props.feature}`,
        props.content.learnMoreUrl || `https://www.${"monsterinsights"}.com/pricing/`
      );
    }
    function handleClose() {
      emit("close");
    }
    function handleUpgrade() {
      const upgradeUrl = getUpgradeLink2();
      window.open(upgradeUrl, "_blank");
      emit("upgrade", upgradeUrl);
    }
    function handleSeeSample() {
      emit("see-sample");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, { name: "upsell-fade" }, {
          default: withCtx(() => [
            __props.isOpen ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "monsterinsights-upsell-overlay",
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => __props.dismissible ? handleClose() : null, ["self"]))
            }, [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", _hoisted_2, [
                  __props.content.mainHeading ? (openBlock(), createElementBlock("h3", {
                    key: 0,
                    textContent: toDisplayString(__props.content.mainHeading)
                  }, null, 8, _hoisted_3)) : createCommentVNode("", true),
                  __props.dismissible ? (openBlock(), createElementBlock("button", {
                    key: 1,
                    class: "monsterinsights-upsell-close",
                    onClick: handleClose,
                    "aria-label": unref(__$2)("Close", "google-analytics-for-wordpress")
                  }, [
                    createVNode(Icon, {
                      name: "dashicons-no-alt",
                      size: 24
                    })
                  ], 8, _hoisted_4)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", _hoisted_6, [
                    __props.content.title ? (openBlock(), createElementBlock("h3", {
                      key: 0,
                      textContent: toDisplayString(__props.content.title)
                    }, null, 8, _hoisted_7)) : createCommentVNode("", true),
                    subheading.value ? (openBlock(), createElementBlock("h4", {
                      key: 1,
                      textContent: toDisplayString(subheading.value)
                    }, null, 8, _hoisted_8)) : createCommentVNode("", true),
                    __props.content.features && __props.content.features.length ? (openBlock(), createElementBlock("ul", {
                      key: 2,
                      class: normalizeClass(featuresClass.value)
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.content.features, (feature, index) => {
                        return openBlock(), createElementBlock("li", { key: index }, [
                          createVNode(Icon, {
                            name: "dashicons-plus-alt2",
                            size: 16,
                            color: "inherit",
                            class: "feature-checkmark"
                          }),
                          createBaseVNode("span", {
                            textContent: toDisplayString(feature)
                          }, null, 8, _hoisted_9)
                        ]);
                      }), 128))
                    ], 2)) : createCommentVNode("", true),
                    createBaseVNode("p", {
                      class: "monsterinsights-upsell-footer-notice",
                      innerHTML: footerNotice.value
                    }, null, 8, _hoisted_10),
                    createBaseVNode("div", _hoisted_11, [
                      createBaseVNode("button", {
                        class: "monsterinsights-button monsterinsights-button-upgrade",
                        onClick: handleUpgrade
                      }, toDisplayString(buttonText.value), 1),
                      __props.showSampleButton && hasSampleData.value ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "monsterinsights-upsell-content-button-sample-report",
                        onClick: handleSeeSample
                      }, toDisplayString(unref(__$2)("See a Demo", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  !__props.noImage ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass([imageClass.value, "monsterinsights-upsell-content__img"]),
                    style: normalizeStyle(imageStyle.value)
                  }, null, 6)) : createCommentVNode("", true)
                ])
              ])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
};
const UpsellModal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e701ae67"]]);
function useSampleData(feature, dataType = "overview") {
  const sampleData = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const loadSampleData = async () => {
    if (sampleData.value) {
      return;
    }
    isLoading.value = true;
    error.value = null;
    try {
      const path = `${feature}/${dataType}`;
      const data = await getSampleData(path);
      if (!data) {
        throw new Error(`Sample data not found for ${path}`);
      }
      if (data.widgets) {
        Object.values(data.widgets).forEach((widget) => {
          if (!widget.chart) {
            widget.chart = {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  label: "Sample Data",
                  data: [12, 19, 3, 5, 2, 3],
                  fill: true,
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                  borderColor: "rgb(54, 162, 235)",
                  borderWidth: 1
                }
              ]
            };
          }
        });
      }
      sampleData.value = data;
    } catch (err) {
      error.value = err.message;
      console.error("[useSampleData] Error loading sample data:", err);
    } finally {
      isLoading.value = false;
    }
  };
  const clearSampleData = () => {
    sampleData.value = null;
    error.value = null;
  };
  return {
    sampleData,
    isLoading,
    error,
    loadSampleData,
    clearSampleData
  };
}
export {
  UpsellModal as U,
  useLicenseStore as a,
  useSampleData as u
};
