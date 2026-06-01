import { d as useRoute, u as useRouter } from "./TheAppHeader-DnsM3Eft.js";
import { af as onErrorCaptured, X as reactive, x as onMounted, B as watch, _ as __, o as openBlock, c as createElementBlock, u as unref, D as createBlock, q as createCommentVNode, b as createVNode, a as createBaseVNode, i as normalizeClass, t as toDisplayString, m as computed } from "./_plugin-vue_export-helper-Cga6DwZW.js";
import { u as useCustomViewsStore, c as customDashboardAPI, V as ViewNavigation, _ as _sfc_main$1, a as _sfc_main$3, E as ErrorModal, b as useAuthGate, e as _sfc_main$4 } from "./useAuthGate-C50LdIfx.js";
import { _ as _sfc_main$2 } from "./html2pdf-B9tALhFa.js";
import { U as UpsellModal, u as useSampleData } from "./useSampleData-eMG0Vx13.js";
import { A as AuthModal, R as ReAuthModal } from "./ReAuthModal-CypDEN8K.js";
import { u as useFeatureGate } from "./useFeatureGate-DCZMml8b.js";
import "./Icon-DyR-ePz9.js";
const _hoisted_1 = {
  class: "monsterinsights-dashboard-view",
  "data-html2canvas-ignore": "true"
};
const _hoisted_2 = { class: "monsterinsights-dashboard-main-content" };
const _hoisted_3 = { class: "monsterinsights-page-header" };
const _hoisted_4 = ["title"];
const _sfc_main = {
  __name: "DashboardView",
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const store = useCustomViewsStore();
    const {
      hasAccess,
      isSampleMode,
      shouldBlurContent,
      shouldShowUpsell,
      upsellContent,
      hasSampleData,
      openUpsellModal,
      enableSampleMode
    } = useFeatureGate("custom-dashboard");
    const {
      isAuthenticated,
      showAuthModal,
      showReAuthModal,
      shouldBlurContent: shouldBlurForAuth,
      openAuthModal,
      closeAuthModal
    } = useAuthGate();
    onErrorCaptured((error, _instance, info) => {
      console.error("[DashboardView] Widget render error:", error, info);
      return false;
    });
    const { sampleData, loadSampleData } = useSampleData("custom-dashboard", "widgets-data");
    const { sampleData: sampleViewData, loadSampleData: loadSampleView } = useSampleData("custom-dashboard", "sample-view");
    const widgets = reactive([]);
    const widgetData = reactive({});
    const widgetLoadingStates = reactive({});
    const dateRange = reactive(getDefaultDateRange());
    const currentView = computed(() => {
      if (isSampleMode.value && sampleViewData.value?.[0]) {
        return sampleViewData.value[0];
      }
      return store.currentView;
    });
    const allViews = computed(() => {
      if (isSampleMode.value && sampleViewData.value) {
        return sampleViewData.value;
      }
      return store.allViews;
    });
    const dateRangeModel = computed({
      get() {
        return dateRange;
      },
      set(value) {
        Object.assign(dateRange, value);
      }
    });
    const displayWidgetData = computed(() => {
      if ((isSampleMode.value || !hasAccess.value) && sampleData.value?.widgets) {
        return sampleData.value.widgets;
      }
      return widgetData;
    });
    const isAnyWidgetLoading = computed(() => store.isLoading);
    async function loadSampleDataForBackground() {
      await Promise.all([loadSampleData(), loadSampleView()]);
      if (sampleViewData.value?.[0]?.layout) {
        widgets.length = 0;
        const sortedLayout = [...sampleViewData.value[0].layout].sort(
          (a, b) => a.position.y * 3 + a.position.x - (b.position.y * 3 + b.position.x)
        );
        widgets.push(...sortedLayout);
      }
    }
    onMounted(async () => {
      if (!hasAccess.value) {
        await loadSampleDataForBackground();
        if (route.params.id == "sample") {
          enableSampleMode();
        }
      }
      if (!isAuthenticated.value) {
        openAuthModal();
        return;
      }
      if (!hasAccess.value) {
        openUpsellModal();
        return;
      }
      store.setLoading(true);
      try {
        await store.loadViews();
        await loadDashboard(route.params.id);
      } catch (err) {
        console.error("Error during initial load:", err);
        store.setLoading(false);
      }
    });
    async function handleSeeSample() {
      enableSampleMode();
      if (sampleViewData.value?.[0]?.layout) {
        widgets.length = 0;
        const sortedLayout = [...sampleViewData.value[0].layout].sort(
          (a, b) => a.position.y * 3 + a.position.x - (b.position.y * 3 + b.position.x)
        );
        widgets.push(...sortedLayout);
      }
    }
    watch(() => route.params.id, (newId, oldId) => {
      if (newId !== oldId) {
        loadDashboard(newId);
      }
    });
    async function loadDashboard(viewId) {
      if (!viewId) return;
      store.setLoading(true);
      try {
        widgets.length = 0;
        Object.keys(widgetData).forEach((key) => delete widgetData[key]);
        Object.keys(widgetLoadingStates).forEach((key) => delete widgetLoadingStates[key]);
        await store.loadViewForViewing(viewId);
        if (!store.currentView?.layout?.length) {
          store.setLoading(false);
          router.push({ name: "dashboard-edit", params: { id: viewId } });
          return;
        }
        const sortedLayout = [...store.currentView.layout].sort(
          (a, b) => a.position.y * 3 + a.position.x - (b.position.y * 3 + b.position.x)
        );
        widgets.push(...sortedLayout);
        await fetchAllWidgetsData();
      } catch (err) {
        console.error("Error loading dashboard:", err);
        store.setLoading(false);
      }
    }
    async function fetchAllWidgetsData() {
      if (!widgets.length) return;
      const BATCH_SIZE = 5;
      const batches = [];
      for (let i = 0; i < widgets.length; i += BATCH_SIZE) {
        batches.push(widgets.slice(i, i + BATCH_SIZE));
      }
      store.clearError();
      store.setLoading(true);
      widgets.forEach((widget) => {
        if (widget && widget.id) {
          widgetLoadingStates[widget.id] = true;
        }
      });
      for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        try {
          const response = await customDashboardAPI.getDashboardData(batch, dateRange);
          const widgetsData = response?.data?.widgets || response?.widgets;
          const responseDateRange = response?.data?.date_range || response?.date_range;
          if (widgetsData) {
            Object.keys(widgetsData).forEach((widgetId) => {
              widgetData[widgetId] = {
                ...widgetsData[widgetId],
                dateRange: responseDateRange ? {
                  current: {
                    start: responseDateRange.start,
                    end: responseDateRange.end
                  },
                  previous: {
                    start: responseDateRange.compareStart || "",
                    end: responseDateRange.compareEnd || ""
                  }
                } : null
              };
            });
          }
          batch.forEach((widget) => {
            if (widget && widget.id) {
              widgetLoadingStates[widget.id] = false;
            }
          });
        } catch (error) {
          console.error(`Error fetching batch ${batchIndex + 1}:`, error);
          store.setError({
            title: __("Error Loading Data", "google-analytics-for-wordpress"),
            message: error.message || __("Failed to load dashboard data", "google-analytics-for-wordpress")
          });
          const remainingWidgets = batches.slice(batchIndex).flat();
          remainingWidgets.forEach((widget) => {
            if (widget && widget.id) {
              widgetData[widget.id] = { error: true, message: error.message };
              widgetLoadingStates[widget.id] = false;
            }
          });
          break;
        }
        if (batchIndex < batches.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      }
      store.setLoading(false);
    }
    function getDefaultDateRange() {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setDate(start.getDate() - 30);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
        compareStart: "",
        compareEnd: "",
        interval: "last30days",
        compareReport: false,
        text: "",
        compareText: "",
        intervalText: "",
        intervalCompareText: ""
      };
    }
    async function handleDateChanged() {
      await fetchAllWidgetsData();
    }
    function selectView(viewId) {
      if (viewId === "new") {
        router.push({ name: "dashboard-create" });
      } else {
        router.push({ name: "dashboard-view", params: { id: viewId } });
      }
    }
    function addNewView() {
      if (!hasAccess.value) {
        openUpsellModal();
        return;
      }
      router.push({ name: "dashboard-add" });
    }
    async function handleDeleteView(id) {
      if (!hasAccess.value) {
        openUpsellModal();
        return;
      }
      try {
        await store.deleteView(id);
        if (store.allViews.length > 0) {
          router.push({ name: "dashboard-view", params: { id: store.allViews[0].id } });
        } else {
          router.push({ name: "dashboard-list" });
        }
      } catch (err) {
        console.error("Error deleting view:", err);
      }
    }
    function handleRenameView({ id }) {
      if (!hasAccess.value) {
        openUpsellModal();
        return;
      }
      router.push({ name: "dashboard-edit", params: { id } });
    }
    function handleEditView(viewId) {
      if (!hasAccess.value) {
        openUpsellModal();
        return;
      }
      router.push({ name: "dashboard-edit", params: { id: viewId } });
    }
    function handleCloseError() {
      store.clearError();
    }
    async function handleRetryLoad() {
      store.clearError();
      await fetchAllWidgetsData();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(isSampleMode) ? (openBlock(), createBlock(_sfc_main$4, {
          key: 0,
          feature: "custom-dashboard"
        })) : createCommentVNode("", true),
        createVNode(ViewNavigation, {
          "all-views": allViews.value,
          "current-view": currentView.value,
          "auto-save-status": "saved",
          "is-new-view": false,
          onSelect: selectView,
          onRename: handleRenameView,
          onDelete: handleDeleteView,
          onAddNew: addNewView,
          onEdit: handleEditView
        }, null, 8, ["all-views", "current-view"]),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", {
            class: normalizeClass(["monsterinsights-dashboard-main", { "monsterinsights-content-blurred": unref(shouldBlurContent) || unref(shouldBlurForAuth) }])
          }, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("h1", null, toDisplayString(currentView.value?.title || unref(__)("Dashboard", "google-analytics-for-wordpress")), 1),
              createBaseVNode("div", {
                class: normalizeClass(["monsterinsights-page-header__actions", { "monsterinsights-page-header__actions--disabled": isAnyWidgetLoading.value }]),
                title: isAnyWidgetLoading.value ? unref(__)("Please wait while data is loading...", "google-analytics-for-wordpress") : ""
              }, [
                createVNode(_sfc_main$1, {
                  "report-title": currentView.value?.title,
                  disabled: isAnyWidgetLoading.value
                }, null, 8, ["report-title", "disabled"]),
                createVNode(unref(_sfc_main$2), {
                  modelValue: dateRangeModel.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dateRangeModel.value = $event),
                  disabled: isAnyWidgetLoading.value,
                  onDateChanged: handleDateChanged
                }, null, 8, ["modelValue", "disabled"])
              ], 10, _hoisted_4)
            ]),
            createVNode(_sfc_main$3, {
              widgets,
              "widget-data": displayWidgetData.value,
              "widget-loading-states": widgetLoadingStates,
              "is-draggable": false,
              "is-editable": false
            }, null, 8, ["widgets", "widget-data", "widget-loading-states"])
          ], 2)
        ]),
        createVNode(AuthModal, {
          isOpen: unref(showAuthModal),
          onClose: unref(closeAuthModal)
        }, null, 8, ["isOpen", "onClose"]),
        createVNode(ReAuthModal, {
          isOpen: unref(showReAuthModal),
          onClose: unref(closeAuthModal)
        }, null, 8, ["isOpen", "onClose"]),
        createVNode(UpsellModal, {
          isOpen: unref(shouldShowUpsell),
          feature: "custom-dashboard",
          content: unref(upsellContent),
          showSampleButton: unref(hasSampleData),
          customImage: "sample-image-monsterinsights.png",
          onClose: handleSeeSample,
          onSeeSample: handleSeeSample
        }, null, 8, ["isOpen", "content", "showSampleButton"]),
        createVNode(ErrorModal, {
          isOpen: !!unref(store).error,
          title: unref(store).error?.title || unref(__)("Error", "google-analytics-for-wordpress"),
          message: unref(store).error?.message || unref(__)("An error occurred", "google-analytics-for-wordpress"),
          onClose: handleCloseError,
          onRetry: handleRetryLoad
        }, null, 8, ["isOpen", "title", "message"])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
