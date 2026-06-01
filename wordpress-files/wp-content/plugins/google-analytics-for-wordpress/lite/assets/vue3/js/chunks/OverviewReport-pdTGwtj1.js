import { a6 as _export_sfc, o as openBlock, c as createElementBlock, D as createBlock, u as unref, t as toDisplayString, _ as __$1, m as computed, l as defineStore, j as ref, B as watch, F as Fragment, a as createBaseVNode, A as withModifiers, i as normalizeClass, b as createVNode, q as createCommentVNode, f as renderList, n as normalizeStyle, w as withDirectives, v as vModelText, a4 as vModelSelect, x as onMounted, J as onUnmounted, z as createTextVNode, ad as storeToRefs, U as Teleport, k as getMiGlobal$1, a5 as sprintf } from "./_plugin-vue_export-helper-Cga6DwZW.js";
import { m, u as useChartColors, L as LoadingSpinnerInline, A as AuthModal, R as ReAuthModal } from "./ReAuthModal-CypDEN8K.js";
import { I as Icon } from "./Icon-DyR-ePz9.js";
import { g as getNonce, a as ajaxPost, u as useOverviewReportStore, b as buildApiFilters, f as fetchOverviewData, c as getInjectedMetricNames, d as getTabMetricsForQuery, O as OverviewProFeatureModal, e as generateSampleCustomDimensionsData, h as fetchCustomDimensionsData, i as fetchCustomDimensionsDeferredData, j as filterTabbedData, C as CUSTOM_DIMENSIONS_DIMENSION_TAB, k as CUSTOM_DIMENSIONS_TAB_TO_QUERY_ID, D as DEFAULT_ECOMMERCE_FUNNEL, l as fetchFunnelData, m as getResponseDimensionOrder, Q as QUERY_DIMENSIONS, n as generateSampleBundleData, o as fetchFormSubmissionsData, p as filterFormSubmissionsData, q as fetchEcommerceOverviewData, r as fetchMarketingCampaignsData, s as fetchPagesData, t as fetchDemographicsData, v as fetchDevicesData, M as MC_TAB_TO_QUERY_ID, w as MC_DIMENSION_TAB, P as PAGES_TAB_TO_QUERY_ID, x as PAGES_DIMENSION_TAB, y as DEMOGRAPHICS_TAB_TO_QUERY_ID, z as DEMOGRAPHICS_DIMENSION_TAB, A as DEVICES_TAB_TO_QUERY_ID, B as DEVICES_DIMENSION_TAB } from "../reports-BPcnqX4j.js";
import { C as Component } from "./html2pdf-B9tALhFa.js";
import { h as getUpgradeUrl, b as getMiGlobal, i as isAddonActive, a as isAuthed, c as isPro } from "./useFeatureGate-DCZMml8b.js";
import "./TheAppHeader-DnsM3Eft.js";
const _hoisted_1$b = { class: "monsterinsights-apex-chart" };
const _hoisted_2$b = {
  key: 1,
  class: "monsterinsights-apex-chart__empty"
};
const _sfc_main$d = {
  __name: "ApexLineChart",
  props: {
    data: {
      type: Object,
      required: true
    },
    height: {
      type: [String, Number],
      default: 300
    },
    colors: {
      type: Array,
      default: () => {
        const { getChartColors } = useChartColors();
        return getChartColors(10);
      }
    },
    strokeDashArray: {
      type: Array,
      default: () => []
    },
    showGrid: {
      type: Boolean,
      default: true
    },
    showLegend: {
      type: Boolean,
      default: true
    },
    yAxisTitle: {
      type: String,
      default: ""
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    chartType: {
      type: String,
      default: "line",
      validator: (v) => ["line", "area"].includes(v)
    }
  },
  setup(__props) {
    const apexchart = m;
    const { colors: brandColors } = useChartColors();
    const props = __props;
    function deepMerge(target, source) {
      if (!source || typeof source !== "object") return target;
      const result = { ...target };
      for (const key of Object.keys(source)) {
        const targetVal = result[key];
        const sourceVal = source[key];
        if (sourceVal && typeof sourceVal === "object" && !Array.isArray(sourceVal) && targetVal && typeof targetVal === "object" && !Array.isArray(targetVal)) {
          result[key] = deepMerge(targetVal, sourceVal);
        } else {
          result[key] = sourceVal;
        }
      }
      return result;
    }
    const hasData = computed(() => {
      return props.data?.series && props.data.series.length > 0;
    });
    const isSinglePoint = computed(() => {
      const categories = props.data?.categories || [];
      return categories.length === 1;
    });
    const series = computed(() => {
      if (!props.data?.series) return [];
      return props.data.series;
    });
    const chartOptions = computed(() => {
      const baseOptions = {
        chart: {
          type: "line",
          fontFamily: "inherit",
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800
          }
        },
        colors: props.colors,
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight",
          width: 2,
          dashArray: props.strokeDashArray
        },
        grid: {
          show: props.showGrid,
          borderColor: brandColors.grid,
          strokeDashArray: 4,
          padding: {
            left: 0,
            right: 0
          }
        },
        xaxis: {
          categories: props.data?.categories || [],
          labels: {
            style: {
              colors: brandColors.text.secondary,
              fontSize: "12px"
            },
            rotate: -45,
            rotateAlways: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          title: {
            text: props.yAxisTitle,
            style: {
              color: brandColors.text.secondary,
              fontSize: "12px",
              fontWeight: 500
            }
          },
          labels: {
            style: {
              colors: brandColors.text.secondary,
              fontSize: "12px"
            },
            formatter: (value) => {
              if (value >= 1e6) {
                return `${(value / 1e6).toFixed(1)}M`;
              }
              if (value >= 1e3) {
                return `${(value / 1e3).toFixed(1)}K`;
              }
              return Math.round(value).toString();
            }
          }
        },
        tooltip: {
          enabled: true,
          theme: "light",
          x: {
            show: true
          },
          y: {
            formatter: (value, { seriesIndex, w }) => {
              const seriesNames = w?.globals?.seriesNames || [];
              const name = seriesNames[seriesIndex] || "";
              const isRate = /rate/i.test(name);
              const base = value.toLocaleString();
              return isRate ? `${base}%` : base;
            }
          }
        },
        legend: {
          show: props.showLegend,
          position: "bottom",
          horizontalAlign: "center",
          fontSize: "12px",
          fontWeight: 500,
          labels: {
            colors: brandColors.text.primary
          },
          markers: {
            width: 12,
            height: 12,
            radius: 12
          },
          itemMargin: {
            horizontal: 12,
            vertical: 8
          }
        },
        markers: {
          size: isSinglePoint.value ? 6 : 0,
          hover: {
            size: isSinglePoint.value ? 8 : 5
          }
        }
      };
      return deepMerge(baseOptions, props.chartOptions);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        hasData.value ? (openBlock(), createBlock(unref(apexchart), {
          key: 0,
          type: __props.chartType,
          height: __props.height,
          options: chartOptions.value,
          series: series.value
        }, null, 8, ["type", "height", "options", "series"])) : (openBlock(), createElementBlock("div", _hoisted_2$b, toDisplayString(unref(__$1)("No data available", "google-analytics-for-wordpress")), 1))
      ]);
    };
  }
};
const ApexLineChart = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-5e189bdf"]]);
const { __ } = wp.i18n;
const getNotes = (params) => {
  const formData = new FormData();
  formData.append("action", "monsterinsights_vue_get_notes");
  formData.append("nonce", getNonce());
  formData.append("params", JSON.stringify(params));
  return ajaxPost(formData).catch((error) => {
    throw {
      title: __("Error Fetching Site Notes", "google-analytics-for-wordpress"),
      message: error?.message || __("Failed to fetch site notes.", "google-analytics-for-wordpress")
    };
  });
};
const saveNote = (note) => {
  const formData = new FormData();
  formData.append("action", "monsterinsights_vue_save_note");
  formData.append("nonce", getNonce());
  formData.append("note", JSON.stringify(note));
  return ajaxPost(formData).then((data) => {
    if (data.published) {
      return data;
    }
    throw {
      title: data.message,
      message: __("Please add some information into your site notes.", "google-analytics-for-wordpress")
    };
  }).catch((error) => {
    if (error?.title) {
      throw error;
    }
    throw {
      title: __("Error Saving Site Note", "google-analytics-for-wordpress"),
      message: error?.message || __("You appear to be offline.", "google-analytics-for-wordpress")
    };
  });
};
const getCategories = (params) => {
  const formData = new FormData();
  formData.append("action", "monsterinsights_vue_get_categories");
  formData.append("nonce", getNonce());
  formData.append("params", JSON.stringify(params));
  return ajaxPost(formData).catch((error) => {
    throw {
      title: __("Error Fetching Categories", "google-analytics-for-wordpress"),
      message: error?.message || __("Failed to fetch categories.", "google-analytics-for-wordpress")
    };
  });
};
const useSiteNotesStore = defineStore("siteNotes", {
  state: () => ({
    // Notes data
    notes: [],
    allCount: 0,
    importantCount: 0,
    // Categories
    categories: [],
    // UI state
    loading: false,
    showSiteNotes: false,
    // Current filter state
    importantFilter: null
    // null = all, true = important only
  }),
  getters: {
    /**
     * Notes filtered by the current importantFilter setting.
     * Used by the SiteNotes list panel for display.
     */
    filteredNotes: (state) => {
      if (state.importantFilter === true) {
        return state.notes.filter((note) => note.important);
      }
      return state.notes;
    },
    /**
     * Group ALL notes by note_date_ymd for chart annotation matching.
     * Returns { "2026-02-02": [note1, note2], ... }
     */
    siteNotesByDate: (state) => {
      const grouped = {};
      for (const note of state.notes) {
        const dateKey = note.note_date_ymd || note.note_date;
        if (!dateKey) {
          continue;
        }
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(note);
      }
      return grouped;
    },
    /**
     * Group ALL notes by YYYYMMDD format for matching against chart row dates.
     * Returns { "20260202": [note1, ...], ... }
     */
    siteNotesByDateCompact: (state) => {
      const grouped = {};
      for (const note of state.notes) {
        const dateKey = note.note_date_ymd || note.note_date;
        if (!dateKey) {
          continue;
        }
        const compactDate = dateKey.replace(/-/g, "");
        if (!grouped[compactDate]) {
          grouped[compactDate] = [];
        }
        grouped[compactDate].push(note);
      }
      return grouped;
    }
  },
  actions: {
    /**
     * Fetch site notes for the given date range and filters.
     *
     * @param {Object} dateRange - { start, end, interval }
     * @param {boolean} disableLoading - If true, don't show loading state.
     */
    async fetchNotes(dateRange, disableLoading = false) {
      if (!disableLoading) {
        this.loading = true;
      }
      const filter = {
        important: null,
        date_range: dateRange || {}
      };
      const params = {
        orderby: "id",
        order: "asc",
        per_page: "-1",
        filter
      };
      try {
        const result = await getNotes(params);
        this.notes = result.items || [];
        this.allCount = result.pagination?.total_published ? parseInt(result.pagination.total_published, 10) : 0;
        this.importantCount = result.pagination?.total_important ? parseInt(result.pagination.total_important, 10) : 0;
      } catch (error) {
        console.error("Error fetching site notes:", error);
        this.notes = [];
        this.allCount = 0;
        this.importantCount = 0;
      } finally {
        if (!disableLoading) {
          this.loading = false;
        }
      }
    },
    /**
     * Fetch site note categories.
     */
    async fetchCategories() {
      const params = {
        page: 1,
        orderby: "name",
        order: "asc",
        select: ["name"]
      };
      try {
        const result = await getCategories(params);
        this.categories = result.items || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.categories = [];
      }
    },
    /**
     * Save (create or update) a site note, then re-fetch the notes list.
     *
     * @param {Object} note - The note to save.
     * @param {Object} dateRange - Current date range for re-fetching.
     * @returns {Promise<Object>} The save response.
     */
    async saveNote(note, dateRange) {
      const result = await saveNote(note);
      await this.fetchNotes(dateRange, true);
      return result;
    },
    /**
     * Toggle a note's important status and re-save.
     *
     * @param {Object} note - The note to toggle.
     * @param {Object} dateRange - Current date range for re-fetching.
     */
    async toggleImportant(note, dateRange) {
      const updatedNote = { ...note, important: !note.important };
      try {
        await saveNote(updatedNote);
        await this.fetchNotes(dateRange, true);
      } catch (error) {
        console.error("Error toggling important:", error);
      }
    },
    /**
     * Toggle site notes panel visibility.
     */
    toggleSiteNotes() {
      this.showSiteNotes = !this.showSiteNotes;
    },
    /**
     * Set the important filter for the list panel.
     * Filtering is done client-side via the filteredNotes getter,
     * so no re-fetch is needed and chart annotations stay stable.
     *
     * @param {boolean|null} important - null for all, true for important only.
     */
    setImportantFilter(important) {
      this.importantFilter = important;
    }
  }
});
const _hoisted_1$a = { class: "monsterinsights-overview-notes" };
const _hoisted_2$a = { class: "monsterinsights-overview-notes__header" };
const _hoisted_3$a = { class: "monsterinsights-overview-notes__header-left" };
const _hoisted_4$8 = { class: "monsterinsights-overview-notes__header-left-links" };
const _hoisted_5$8 = { class: "text" };
const _hoisted_6$8 = { class: "text" };
const _hoisted_7$8 = { class: "monsterinsights-overview-notes__header-right" };
const _hoisted_8$8 = { class: "monsterinsights-overview-notes__body" };
const _hoisted_9$7 = { class: "monsterinsights-overview-notes__body-list" };
const _hoisted_10$6 = {
  key: 0,
  class: "monsterinsights-overview-notes__loading"
};
const _hoisted_11$6 = {
  key: 1,
  class: "monsterinsights-overview-notes__table"
};
const _hoisted_12$6 = { class: "monsterinsights-overview-notes__col-date" };
const _hoisted_13$5 = { class: "monsterinsights-overview-notes__col-date" };
const _hoisted_14$4 = { class: "monsterinsights-overview-notes__date-cell" };
const _hoisted_15$4 = ["onClick"];
const _hoisted_16$4 = {
  key: 0,
  class: "monsterinsights-star-spinner"
};
const _hoisted_17$4 = {
  key: 1,
  class: "star-icon",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "#F2C94C",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_18$4 = {
  key: 2,
  class: "star-icon star-icon--empty",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ccc",
  "stroke-width": "2",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_19$4 = { class: "monsterinsights-overview-notes__col-note" };
const _hoisted_20$4 = { class: "monsterinsights-overview-notes__note-cell" };
const _hoisted_21$3 = ["onClick"];
const _hoisted_22$3 = { class: "monsterinsights-overview-notes__col-category" };
const _hoisted_23$2 = {
  key: 1,
  class: "monsterinsights-category-badge monsterinsights-category-badge--default"
};
const _hoisted_24$2 = {
  key: 0,
  class: "monsterinsights-overview-notes__edit-row"
};
const _hoisted_25$1 = { class: "monsterinsights-overview-notes__col-date" };
const _hoisted_26$1 = { class: "monsterinsights-overview-notes__edit-date-cell" };
const _hoisted_27$1 = {
  key: 0,
  class: "star-icon",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "#F2C94C",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_28$1 = {
  key: 1,
  class: "star-icon star-icon--empty",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ccc",
  "stroke-width": "2",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_29$1 = { class: "monsterinsights-overview-notes__col-note" };
const _hoisted_30$1 = { class: "monsterinsights-overview-notes__edit-note-cell" };
const _hoisted_31$1 = ["disabled"];
const _hoisted_32$1 = { class: "monsterinsights-overview-notes__edit-actions" };
const _hoisted_33$1 = ["disabled"];
const _hoisted_34$1 = { class: "monsterinsights-overview-notes__col-category" };
const _hoisted_35$1 = { class: "monsterinsights-site-note-select" };
const _hoisted_36$1 = ["disabled"];
const _hoisted_37$1 = { value: "0" };
const _hoisted_38$1 = ["value"];
const _hoisted_39$1 = { key: 0 };
const _hoisted_40$1 = { colspan: "3" };
const _hoisted_41$1 = { class: "monsterinsights-overview-notes__empty" };
const _hoisted_42$1 = {
  key: 1,
  class: "monsterinsights-overview-notes__create"
};
const _hoisted_43$1 = { class: "monsterinsights-overview-notes__create-header" };
const _hoisted_44$1 = { class: "monsterinsights-overview-notes__create-title" };
const _hoisted_45$1 = { class: "monsterinsights-overview-notes__create-form" };
const _hoisted_46$1 = { class: "monsterinsights-overview-notes__create-row" };
const _hoisted_47 = {
  key: 0,
  class: "star-icon",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "#F2C94C",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_48 = {
  key: 1,
  class: "star-icon star-icon--empty",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#ccc",
  "stroke-width": "2",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_49 = { class: "monsterinsights-overview-notes__create-field monsterinsights-overview-notes__create-field--date" };
const _hoisted_50 = { class: "monsterinsights-overview-notes__create-field monsterinsights-overview-notes__create-field--name" };
const _hoisted_51 = ["placeholder", "disabled"];
const _hoisted_52 = {
  key: 0,
  class: "monsterinsights-overview-notes__create-error"
};
const _hoisted_53 = { class: "monsterinsights-overview-notes__create-field monsterinsights-overview-notes__create-field--category" };
const _hoisted_54 = { class: "monsterinsights-site-note-select" };
const _hoisted_55 = ["disabled"];
const _hoisted_56 = { value: "0" };
const _hoisted_57 = ["value"];
const _hoisted_58 = { class: "monsterinsights-overview-notes__create-buttons" };
const _hoisted_59 = ["disabled"];
const _hoisted_60 = ["disabled"];
const _sfc_main$c = {
  __name: "SiteNotes",
  props: {
    dateRange: {
      type: Object,
      required: true,
      default: () => ({
        interval: "last30days",
        start: "",
        end: ""
      })
    }
  },
  emits: ["refresh-overview-report"],
  setup(__props, { emit: __emit }) {
    const siteNotesStore = useSiteNotesStore();
    const props = __props;
    const emit = __emit;
    const showList = ref(true);
    const isSaving = ref(false);
    const editingNote = ref(null);
    const togglingNoteId = ref(null);
    const editCategoryId = ref(0);
    const createError = ref("");
    const newNote = ref(getEmptyNote());
    const flatpickrConfig = {
      dateFormat: "Y-m-d",
      maxDate: "today",
      disableMobile: true
    };
    function getEmptyNote() {
      return {
        id: null,
        note_title: "",
        category: { id: 0 },
        note_date: null,
        note_date_ymd: getDefaultDate(),
        important: false,
        medias: {}
      };
    }
    function getDefaultDate() {
      if (props.dateRange?.end) {
        return props.dateRange.end;
      }
      const yesterday = /* @__PURE__ */ new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return formatDateToYmd(yesterday);
    }
    function formatDateToYmd(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    function formatDate(dateStr) {
      if (!dateStr) return "";
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const parts = dateStr.split("-");
      if (parts.length !== 3) return dateStr;
      const day = parseInt(parts[2], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      return `${String(day).padStart(2, "0")} ${months[monthIndex] || ""}`;
    }
    function removeFilters() {
      siteNotesStore.setImportantFilter(null);
    }
    function filterImportant() {
      siteNotesStore.setImportantFilter(true);
    }
    function showCreateView() {
      newNote.value = getEmptyNote();
      createError.value = "";
      showList.value = false;
    }
    function showListView() {
      showList.value = true;
    }
    async function toggleImportant(note) {
      togglingNoteId.value = note.id;
      try {
        await siteNotesStore.toggleImportant(note, props.dateRange);
        emit("refresh-overview-report");
      } finally {
        togglingNoteId.value = null;
      }
    }
    function startEdit(note) {
      editingNote.value = { ...note };
      editCategoryId.value = note.category?.id || 0;
    }
    function cancelEdit() {
      editingNote.value = null;
      editCategoryId.value = 0;
    }
    function toggleEditStar() {
      if (editingNote.value) {
        editingNote.value.important = !editingNote.value.important;
      }
    }
    async function saveEditNote() {
      if (!editingNote.value) return;
      isSaving.value = true;
      const selectedCategory = siteNotesStore.categories.find((c) => c.id === editCategoryId.value);
      editingNote.value.category = selectedCategory || { id: editCategoryId.value };
      try {
        await siteNotesStore.saveNote(editingNote.value, props.dateRange);
        cancelEdit();
        emit("refresh-overview-report");
      } catch (error) {
        console.error("Error saving note:", error);
      } finally {
        isSaving.value = false;
      }
    }
    function toggleCreateStar() {
      newNote.value.important = !newNote.value.important;
    }
    async function createNote() {
      isSaving.value = true;
      createError.value = "";
      try {
        await siteNotesStore.saveNote(newNote.value, props.dateRange);
        newNote.value = getEmptyNote();
        showList.value = true;
        emit("refresh-overview-report");
      } catch (error) {
        createError.value = error?.title || error?.message || __$1("An error occurred.", "google-analytics-for-wordpress");
      } finally {
        isSaving.value = false;
      }
    }
    watch(
      () => [props.dateRange?.start, props.dateRange?.end],
      () => {
        siteNotesStore.fetchNotes(props.dateRange);
      },
      { deep: true }
    );
    watch(
      () => props.dateRange?.end,
      (newEnd) => {
        if (newEnd && !showList.value) {
          newNote.value.note_date_ymd = newEnd;
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        showList.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("div", _hoisted_2$a, [
            createBaseVNode("div", _hoisted_3$a, [
              createBaseVNode("div", _hoisted_4$8, [
                createBaseVNode("span", null, toDisplayString(unref(__$1)("Show:", "google-analytics-for-wordpress")), 1),
                createBaseVNode("a", {
                  href: "#",
                  class: normalizeClass({ selected: unref(siteNotesStore).importantFilter === null }),
                  onClick: withModifiers(removeFilters, ["prevent"])
                }, [
                  createBaseVNode("span", _hoisted_5$8, toDisplayString(unref(__$1)("All", "google-analytics-for-wordpress")), 1),
                  createBaseVNode("span", null, "(" + toDisplayString(unref(siteNotesStore).allCount) + ")", 1)
                ], 2),
                createBaseVNode("a", {
                  href: "#",
                  class: normalizeClass({ selected: unref(siteNotesStore).importantFilter === true }),
                  onClick: withModifiers(filterImportant, ["prevent"])
                }, [
                  _cache[7] || (_cache[7] = createBaseVNode("svg", {
                    class: "star-icon-inline",
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "#F2C94C",
                    xmlns: "http://www.w3.org/2000/svg"
                  }, [
                    createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
                  ], -1)),
                  createBaseVNode("span", _hoisted_6$8, toDisplayString(unref(__$1)("Important", "google-analytics-for-wordpress")), 1),
                  createBaseVNode("span", null, "(" + toDisplayString(unref(siteNotesStore).importantCount) + ")", 1)
                ], 2)
              ])
            ]),
            createBaseVNode("div", _hoisted_7$8, [
              createBaseVNode("button", {
                class: "monsterinsights-button",
                onClick: showCreateView
              }, [
                createVNode(Icon, {
                  name: "plus",
                  size: 11
                }),
                createBaseVNode("span", null, toDisplayString(unref(__$1)("Add New Site Note", "google-analytics-for-wordpress")), 1)
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_8$8, [
            createBaseVNode("div", _hoisted_9$7, [
              unref(siteNotesStore).loading ? (openBlock(), createElementBlock("div", _hoisted_10$6, [
                createVNode(LoadingSpinnerInline)
              ])) : createCommentVNode("", true),
              !unref(siteNotesStore).loading ? (openBlock(), createElementBlock("table", _hoisted_11$6, [
                createBaseVNode("thead", null, [
                  createBaseVNode("tr", null, [
                    createBaseVNode("th", _hoisted_12$6, toDisplayString(unref(__$1)("Date", "google-analytics-for-wordpress")), 1),
                    createBaseVNode("th", null, toDisplayString(unref(__$1)("Site Note", "google-analytics-for-wordpress")), 1),
                    createBaseVNode("th", null, toDisplayString(unref(__$1)("Category", "google-analytics-for-wordpress")), 1)
                  ])
                ]),
                createBaseVNode("tbody", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(siteNotesStore).filteredNotes, (note) => {
                    return openBlock(), createElementBlock(Fragment, {
                      key: note.id
                    }, [
                      createBaseVNode("tr", null, [
                        createBaseVNode("td", _hoisted_13$5, [
                          createBaseVNode("div", _hoisted_14$4, [
                            createBaseVNode("a", {
                              href: "#",
                              class: "monsterinsights-toggle-note-important",
                              onClick: withModifiers(($event) => toggleImportant(note), ["prevent"])
                            }, [
                              togglingNoteId.value === note.id ? (openBlock(), createElementBlock("span", _hoisted_16$4)) : note.important ? (openBlock(), createElementBlock("svg", _hoisted_17$4, [..._cache[8] || (_cache[8] = [
                                createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
                              ])])) : (openBlock(), createElementBlock("svg", _hoisted_18$4, [..._cache[9] || (_cache[9] = [
                                createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
                              ])]))
                            ], 8, _hoisted_15$4),
                            createBaseVNode("span", null, toDisplayString(formatDate(note.note_date)), 1)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_19$4, [
                          createBaseVNode("div", _hoisted_20$4, [
                            createBaseVNode("span", null, toDisplayString(note.note_title), 1),
                            createBaseVNode("a", {
                              href: "#",
                              class: "monsterinsights-overview-notes__edit-link",
                              onClick: withModifiers(($event) => startEdit(note), ["prevent"])
                            }, toDisplayString(unref(__$1)("Edit", "google-analytics-for-wordpress")), 9, _hoisted_21$3)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_22$3, [
                          note.category && note.category.background_color ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: "monsterinsights-category-badge",
                            style: normalizeStyle({ backgroundColor: note.category.background_color })
                          }, toDisplayString(note.category.name || ""), 5)) : note.category && note.category.name ? (openBlock(), createElementBlock("span", _hoisted_23$2, toDisplayString(note.category.name), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      editingNote.value && editingNote.value.id === note.id ? (openBlock(), createElementBlock("tr", _hoisted_24$2, [
                        createBaseVNode("td", _hoisted_25$1, [
                          createBaseVNode("div", _hoisted_26$1, [
                            createBaseVNode("a", {
                              href: "#",
                              onClick: withModifiers(toggleEditStar, ["prevent"])
                            }, [
                              editingNote.value.important ? (openBlock(), createElementBlock("svg", _hoisted_27$1, [..._cache[10] || (_cache[10] = [
                                createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
                              ])])) : (openBlock(), createElementBlock("svg", _hoisted_28$1, [..._cache[11] || (_cache[11] = [
                                createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
                              ])]))
                            ]),
                            createVNode(unref(Component), {
                              modelValue: editingNote.value.note_date_ymd,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editingNote.value.note_date_ymd = $event),
                              config: flatpickrConfig,
                              class: "monsterinsights-site-note-datepicker",
                              disabled: isSaving.value
                            }, null, 8, ["modelValue", "disabled"])
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_29$1, [
                          createBaseVNode("div", _hoisted_30$1, [
                            withDirectives(createBaseVNode("textarea", {
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editingNote.value.note_title = $event),
                              disabled: isSaving.value,
                              rows: "1",
                              class: "monsterinsights-site-note-textarea"
                            }, null, 8, _hoisted_31$1), [
                              [vModelText, editingNote.value.note_title]
                            ])
                          ]),
                          createBaseVNode("div", _hoisted_32$1, [
                            createBaseVNode("button", {
                              class: "monsterinsights-button",
                              disabled: isSaving.value,
                              onClick: saveEditNote
                            }, toDisplayString(unref(__$1)("Save Changes", "google-analytics-for-wordpress")), 9, _hoisted_33$1),
                            createBaseVNode("a", {
                              href: "#",
                              class: "monsterinsights-button-secondary",
                              onClick: withModifiers(cancelEdit, ["prevent"])
                            }, toDisplayString(unref(__$1)("Cancel", "google-analytics-for-wordpress")), 1)
                          ])
                        ]),
                        createBaseVNode("td", _hoisted_34$1, [
                          createBaseVNode("div", _hoisted_35$1, [
                            withDirectives(createBaseVNode("select", {
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editCategoryId.value = $event),
                              disabled: isSaving.value
                            }, [
                              createBaseVNode("option", _hoisted_37$1, toDisplayString(unref(__$1)("Select Category", "google-analytics-for-wordpress")), 1),
                              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(siteNotesStore).categories, (category) => {
                                return openBlock(), createElementBlock("option", {
                                  key: category.id,
                                  value: category.id
                                }, toDisplayString(category.name), 9, _hoisted_38$1);
                              }), 128))
                            ], 8, _hoisted_36$1), [
                              [vModelSelect, editCategoryId.value]
                            ]),
                            createVNode(Icon, {
                              name: "chevron-down",
                              size: 16
                            })
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ], 64);
                  }), 128)),
                  unref(siteNotesStore).filteredNotes.length === 0 && !unref(siteNotesStore).loading ? (openBlock(), createElementBlock("tr", _hoisted_39$1, [
                    createBaseVNode("td", _hoisted_40$1, [
                      createBaseVNode("div", _hoisted_41$1, toDisplayString(unref(__$1)("There aren't any site notes. Go ahead and create one!", "google-analytics-for-wordpress")), 1)
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])) : createCommentVNode("", true)
            ])
          ])
        ], 64)) : (openBlock(), createElementBlock("div", _hoisted_42$1, [
          createBaseVNode("div", _hoisted_43$1, [
            createBaseVNode("span", _hoisted_44$1, toDisplayString(unref(__$1)("Site Notes", "google-analytics-for-wordpress")), 1)
          ]),
          createBaseVNode("div", _hoisted_45$1, [
            createBaseVNode("div", _hoisted_46$1, [
              createBaseVNode("a", {
                href: "#",
                class: "monsterinsights-overview-notes__create-star",
                onClick: withModifiers(toggleCreateStar, ["prevent"])
              }, [
                newNote.value.important ? (openBlock(), createElementBlock("svg", _hoisted_47, [..._cache[12] || (_cache[12] = [
                  createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
                ])])) : (openBlock(), createElementBlock("svg", _hoisted_48, [..._cache[13] || (_cache[13] = [
                  createBaseVNode("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }, null, -1)
                ])]))
              ]),
              createBaseVNode("div", _hoisted_49, [
                createBaseVNode("label", null, toDisplayString(unref(__$1)("Date", "google-analytics-for-wordpress")), 1),
                createVNode(unref(Component), {
                  modelValue: newNote.value.note_date_ymd,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => newNote.value.note_date_ymd = $event),
                  config: flatpickrConfig,
                  class: "monsterinsights-site-note-datepicker",
                  disabled: isSaving.value
                }, null, 8, ["modelValue", "disabled"])
              ]),
              createBaseVNode("div", _hoisted_50, [
                createBaseVNode("label", null, toDisplayString(unref(__$1)("Name", "google-analytics-for-wordpress")), 1),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => newNote.value.note_title = $event),
                  type: "text",
                  class: normalizeClass(["monsterinsights-site-note-input", { "monsterinsights-site-note-input--error": createError.value }]),
                  placeholder: unref(__$1)("e.g. Checkout Funnel", "google-analytics-for-wordpress"),
                  disabled: isSaving.value,
                  onInput: _cache[5] || (_cache[5] = ($event) => createError.value = "")
                }, null, 42, _hoisted_51), [
                  [vModelText, newNote.value.note_title]
                ]),
                createError.value ? (openBlock(), createElementBlock("span", _hoisted_52, toDisplayString(createError.value), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_53, [
                createBaseVNode("label", null, toDisplayString(unref(__$1)("Category", "google-analytics-for-wordpress")), 1),
                createBaseVNode("div", _hoisted_54, [
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => newNote.value.category.id = $event),
                    disabled: isSaving.value
                  }, [
                    createBaseVNode("option", _hoisted_56, toDisplayString(unref(__$1)("Select Category", "google-analytics-for-wordpress")), 1),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(siteNotesStore).categories, (category) => {
                      return openBlock(), createElementBlock("option", {
                        key: category.id,
                        value: category.id
                      }, toDisplayString(category.name), 9, _hoisted_57);
                    }), 128))
                  ], 8, _hoisted_55), [
                    [vModelSelect, newNote.value.category.id]
                  ]),
                  createVNode(Icon, {
                    name: "chevron-down",
                    size: 16
                  })
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_58, [
              createBaseVNode("button", {
                class: "monsterinsights-button-secondary",
                disabled: isSaving.value,
                onClick: showListView
              }, toDisplayString(unref(__$1)("Cancel", "google-analytics-for-wordpress")), 9, _hoisted_59),
              createBaseVNode("button", {
                class: "monsterinsights-button",
                disabled: isSaving.value,
                onClick: createNote
              }, toDisplayString(unref(__$1)("Create Note", "google-analytics-for-wordpress")), 9, _hoisted_60)
            ])
          ])
        ]))
      ]);
    };
  }
};
const _hoisted_1$9 = { class: "monsterinsights-traffic-chart-metrics-dropdown__grid" };
const _hoisted_2$9 = ["onClick"];
const _hoisted_3$9 = { class: "monsterinsights-traffic-chart-metrics-dropdown__checkbox" };
const _sfc_main$b = {
  __name: "MetricsDropdown",
  props: {
    open: {
      type: Boolean,
      default: false
    },
    metricsOptions: {
      type: Array,
      default: () => []
    },
    selectedMetrics: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:open", "update:selectedMetrics", "apply", "reset", "pro-upsell"],
  setup(__props, { emit: __emit }) {
    const PRO_ONLY_METRICS = ["totalRevenue", "ecommercePurchases", "averagePurchaseRevenue"];
    const props = __props;
    const emit = __emit;
    const dropdownRef = ref(null);
    const pendingSelection = ref([]);
    watch(
      () => props.open,
      (isOpen) => {
        if (isOpen) {
          pendingSelection.value = [...props.selectedMetrics || []];
        }
      },
      { immediate: true }
    );
    function toggleOpen() {
      emit("update:open", !props.open);
    }
    function togglePendingMetric(metricId) {
      if (PRO_ONLY_METRICS.includes(metricId)) {
        emit("pro-upsell");
        return;
      }
      const current = pendingSelection.value;
      const index = current.indexOf(metricId);
      if (index === -1) {
        pendingSelection.value = [...current, metricId];
      } else {
        if (current.length > 1) {
          pendingSelection.value = current.filter((id) => id !== metricId);
        }
      }
    }
    function onReset() {
      emit("reset");
    }
    function onApply() {
      emit("update:selectedMetrics", [...pendingSelection.value]);
      emit("apply");
    }
    function isProOnlyMetric(metricId) {
      return PRO_ONLY_METRICS.includes(metricId);
    }
    function handleClickOutside(event) {
      if (!dropdownRef.value || !props.open) return;
      if (dropdownRef.value.contains(event.target)) return;
      emit("update:open", false);
    }
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "monsterinsights-traffic-chart-metrics-dropdown",
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, [
        createBaseVNode("button", {
          type: "button",
          class: "monsterinsights-traffic-chart-metrics-dropdown__trigger",
          onClick: toggleOpen
        }, [
          _cache[1] || (_cache[1] = createBaseVNode("span", null, "Metrics", -1)),
          createVNode(Icon, {
            name: "chevron-down",
            size: 16
          })
        ]),
        __props.open ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "monsterinsights-traffic-chart-metrics-dropdown__menu",
          onClick: _cache[0] || (_cache[0] = withModifiers(() => {
          }, ["stop"]))
        }, [
          createBaseVNode("div", _hoisted_1$9, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.metricsOptions, (option) => {
              return openBlock(), createElementBlock("button", {
                key: option.id,
                type: "button",
                class: normalizeClass(["monsterinsights-traffic-chart-metrics-dropdown__item", {
                  "monsterinsights-traffic-chart-metrics-dropdown__item--selected": pendingSelection.value.includes(option.id),
                  "monsterinsights-traffic-chart-metrics-dropdown__item--pro-only": isProOnlyMetric(option.id)
                }]),
                onClick: ($event) => togglePendingMetric(option.id)
              }, [
                createBaseVNode("span", _hoisted_3$9, [
                  pendingSelection.value.includes(option.id) ? (openBlock(), createBlock(Icon, {
                    key: 0,
                    name: "check",
                    size: 10
                  })) : createCommentVNode("", true)
                ]),
                createBaseVNode("span", null, toDisplayString(option.label), 1)
              ], 10, _hoisted_2$9);
            }), 128))
          ]),
          createBaseVNode("div", { class: "monsterinsights-traffic-chart-metrics-dropdown__footer" }, [
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-traffic-chart-metrics-dropdown__btn monsterinsights-traffic-chart-metrics-dropdown__btn--reset",
              onClick: onReset
            }, " Reset Filters "),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-traffic-chart-metrics-dropdown__btn monsterinsights-traffic-chart-metrics-dropdown__btn--apply",
              onClick: onApply
            }, " Apply Filters ")
          ])
        ])) : createCommentVNode("", true)
      ], 512);
    };
  }
};
const _hoisted_1$8 = {
  key: 0,
  class: "monsterinsights-ecommerce-upsell-overlay"
};
const _hoisted_2$8 = { class: "monsterinsights-ecommerce-upsell-overlay__content" };
const _hoisted_3$8 = { class: "monsterinsights-ecommerce-upsell-overlay__text-section" };
const _hoisted_4$7 = { class: "monsterinsights-ecommerce-upsell-overlay__title" };
const _hoisted_5$7 = { class: "monsterinsights-ecommerce-upsell-overlay__integrations" };
const _hoisted_6$7 = ["src", "alt"];
const _hoisted_7$7 = { class: "monsterinsights-ecommerce-upsell-overlay__description" };
const _hoisted_8$7 = { class: "monsterinsights-ecommerce-upsell-overlay__actions" };
const _hoisted_9$6 = { class: "monsterinsights-ecommerce-upsell-overlay__coupon" };
const _hoisted_10$5 = { class: "monsterinsights-ecommerce-upsell-overlay__coupon-label" };
const _hoisted_11$5 = { class: "monsterinsights-ecommerce-upsell-overlay__coupon-code" };
const _hoisted_12$5 = {
  key: 0,
  class: "monsterinsights-ecommerce-upsell-overlay__copied-toast"
};
const _hoisted_13$4 = ["href"];
const _sfc_main$a = {
  __name: "EcommerceUpsellOverlay",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    couponCode: {
      type: String,
      default: "LITEUPGRADE"
    }
  },
  setup(__props) {
    const props = __props;
    const integrationLogos = [
      { name: "WooCommerce", src: new URL("" + new URL("../../assets/woocom-CGR3qW2E.png", import.meta.url).href, import.meta.url).href },
      { name: "Easy Digital Downloads", src: new URL("" + new URL("../../assets/easy-BvW_B_Ta.png", import.meta.url).href, import.meta.url).href },
      { name: "MemberPress", src: new URL("" + new URL("../../assets/memberpress-D3zMNxUg.png", import.meta.url).href, import.meta.url).href },
      { name: "LifterLMS", src: new URL("" + new URL("../../assets/lifterlms-a1S06NYR.png", import.meta.url).href, import.meta.url).href },
      { name: "GiveWP", src: new URL("" + new URL("../../assets/givewp-C405d0U0.png", import.meta.url).href, import.meta.url).href },
      { name: "Restrict Content Pro", src: new URL("" + new URL("../../assets/restrict-x0XNKniw.png", import.meta.url).href, import.meta.url).href },
      { name: "Charitable", src: new URL("" + new URL("../../assets/charitable-jZ8z8e4W.png", import.meta.url).href, import.meta.url).href },
      { name: "WishList", src: new URL("" + new URL("../../assets/wishlistmember-logo 1-Dtdt0jIO.png", import.meta.url).href, import.meta.url).href },
      { name: "MemberMouse", src: new URL("" + new URL("../../assets/memberhouse-BJdHvZB4.png", import.meta.url).href, import.meta.url).href }
    ];
    const upsellText = {
      title: __$1("Upgrade to MonsterInsights Pro to Unlock More Actionable Insights", "google-analytics-for-wordpress"),
      titleLine2: __$1("& Save 50% OFF!", "google-analytics-for-wordpress"),
      description: __$1("It's easy to double your traffic and sales when you know exactly how people find and use your website. MonsterInsights Pro shows you the stats that matter!", "google-analytics-for-wordpress"),
      couponLabel: __$1("SAVE 50% Coupon Code", "google-analytics-for-wordpress"),
      upgradeToPro: __$1("Upgrade to Pro", "google-analytics-for-wordpress")
    };
    const copiedLabel = __$1("Copied!", "google-analytics-for-wordpress");
    const upgradeUrl = computed(() => {
      return getUpgradeUrl("ecommerce-upsell-overlay", "overview-report", "https://www.monsterinsights.com/lite/");
    });
    const couponCopied = ref(false);
    let couponCopiedTimer = null;
    function copyCouponCode() {
      const text = props.couponCode;
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      couponCopied.value = true;
      clearTimeout(couponCopiedTimer);
      couponCopiedTimer = setTimeout(() => {
        couponCopied.value = false;
      }, 1500);
    }
    return (_ctx, _cache) => {
      return __props.show ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
        _cache[1] || (_cache[1] = createBaseVNode("div", { class: "monsterinsights-ecommerce-upsell-overlay__backdrop" }, null, -1)),
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("div", _hoisted_3$8, [
            createBaseVNode("h3", _hoisted_4$7, [
              createTextVNode(toDisplayString(upsellText.title), 1),
              _cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1)),
              createTextVNode(toDisplayString(upsellText.titleLine2), 1)
            ]),
            createBaseVNode("div", _hoisted_5$7, [
              (openBlock(), createElementBlock(Fragment, null, renderList(integrationLogos, (logo) => {
                return createBaseVNode("div", {
                  key: logo.name,
                  class: "monsterinsights-ecommerce-upsell-overlay__logo-card"
                }, [
                  createBaseVNode("img", {
                    src: logo.src,
                    alt: logo.name
                  }, null, 8, _hoisted_6$7)
                ]);
              }), 64))
            ]),
            createBaseVNode("p", _hoisted_7$7, toDisplayString(upsellText.description), 1)
          ]),
          createBaseVNode("div", _hoisted_8$7, [
            createBaseVNode("div", _hoisted_9$6, [
              createBaseVNode("span", _hoisted_10$5, toDisplayString(upsellText.couponLabel), 1),
              createBaseVNode("span", _hoisted_11$5, toDisplayString(__props.couponCode), 1),
              createBaseVNode("button", {
                type: "button",
                class: "monsterinsights-ecommerce-upsell-overlay__coupon-copy",
                onClick: copyCouponCode
              }, [
                createVNode(Icon, {
                  name: "copy",
                  size: 16
                }),
                couponCopied.value ? (openBlock(), createElementBlock("span", _hoisted_12$5, toDisplayString(unref(copiedLabel)), 1)) : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("a", {
              href: upgradeUrl.value,
              target: "_blank",
              rel: "noopener",
              class: "monsterinsights-ecommerce-upsell-overlay__btn"
            }, [
              createBaseVNode("span", null, toDisplayString(upsellText.upgradeToPro), 1),
              createVNode(Icon, {
                name: "arrow-right",
                size: 20,
                color: "#fff"
              })
            ], 8, _hoisted_13$4)
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
};
const RATE_METRICS = [
  "bounceRate",
  "engagementRate",
  "sessionKeyEventRate",
  "cartAbandonRatePercent",
  "couponUsedPercent"
];
const isRateMetric = (metricName) => RATE_METRICS.includes(metricName);
const AVG_METRICS = ["averageSessionDuration"];
const isAvgMetric = (metricName) => AVG_METRICS.includes(metricName);
const DURATION_METRICS = ["averageSessionDuration"];
const isDurationMetric = (metricName) => DURATION_METRICS.includes(metricName);
const secondsToMinutes = (seconds) => parseFloat((seconds / 60).toFixed(2));
const toPercentValue = (raw) => parseFloat((raw * 100).toFixed(2));
const OVERVIEW_METRIC_DISPLAY = {
  totalUsers: { id: "totalUsers", label: __$1("Total Users", "google-analytics-for-wordpress") },
  screenPageViews: { id: "screenPageViews", label: __$1("Page Views", "google-analytics-for-wordpress") },
  sessions: { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress") },
  bounceRate: { id: "bounceRate", label: __$1("Bounce Rate", "google-analytics-for-wordpress") },
  ecommercePurchases: { id: "ecommercePurchases", label: __$1("eCommerce Purchases", "google-analytics-for-wordpress") },
  itemsPurchased: { id: "itemsPurchased", label: __$1("Items Purchased", "google-analytics-for-wordpress") },
  averagePurchaseRevenue: { id: "averagePurchaseRevenue", label: __$1("Revenue/Sales", "google-analytics-for-wordpress") },
  newUsers: { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress") },
  engagementRate: { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress") },
  engagedSessions: { id: "engagedSessions", label: __$1("Engaged Sessions", "google-analytics-for-wordpress") },
  sessionKeyEventRate: { id: "sessionKeyEventRate", label: __$1("Key Event Rate", "google-analytics-for-wordpress") },
  totalRevenue: { id: "totalRevenue", label: __$1("Revenue", "google-analytics-for-wordpress") },
  returningUsers: { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress") },
  pageViewsPerUser: { id: "pageViewsPerUser", label: __$1("Pageviews / User", "google-analytics-for-wordpress") },
  averageSessionDuration: { id: "averageSessionDuration", label: __$1("Session Duration", "google-analytics-for-wordpress") },
  couponUsedPercent: { id: "couponUsedPercent", label: __$1("Coupon Used %", "google-analytics-for-wordpress") },
  cartAbandonRatePercent: { id: "cartAbandonRatePercent", label: __$1("Cart Abandon Rate %", "google-analytics-for-wordpress") }
};
const BASE_SERIES_COLORS = ["#228bee", "#9B51E0", "#5cc0a5", "#F2C94C", "#EB5757", "#2D9CDB"];
const DERIVED_METRICS = ["returningUsers", "pageViewsPerUser"];
const SITE_NOTE_DEFAULT_COLOR = "3a93dd";
const PREVIOUS_PERIOD_LEGEND_LABEL = __$1("Previous Period", "google-analytics-for-wordpress");
function formatDateLabel(dateStr) {
  if (!dateStr) {
    return dateStr;
  }
  let year, month, day;
  if (dateStr.length === 10 && dateStr.includes("-")) {
    [year, month, day] = dateStr.split("-");
  } else if (dateStr.length === 8) {
    year = dateStr.substring(0, 4);
    month = dateStr.substring(4, 6);
    day = dateStr.substring(6, 8);
  } else {
    return dateStr;
  }
  const date = new Date(year, parseInt(month, 10) - 1, day);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${day} ${monthNames[date.getMonth()]}`;
}
function getSiteNoteSvgNormal(color) {
  return `data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2042.4%2047.9%22%20style%3D%22enable-background%3Anew%200%200%2042.4%2047.9%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E.st0%7Bfill%3A%23${color}%3B%7D.st1%7Bfill%3A%23FFFFFF%3B%7D%3C%2Fstyle%3E%3Cg%3E%3Cg%3E%3Cpath%20class%3D%22st0%22%20d%3D%22M38.9%2C1.6H3.5c-1.1%2C0-1.9%2C0.9-1.9%2C1.9V39c0%2C1.1%2C0.9%2C1.9%2C1.9%2C1.9h12.8l4.9%2C5.1l4.9-5.1h12.8c1.1%2C0%2C1.9-0.9%2C1.9-1.9V3.6C40.9%2C2.5%2C40%2C1.6%2C38.9%2C1.6z%22%2F%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M21.2%2C46.6l-5.1-5.3H3.5c-1.3%2C0-2.3-1-2.3-2.3V3.6c0-1.3%2C1-2.3%2C2.3-2.3h35.4c1.3%2C0%2C2.3%2C1%2C2.3%2C2.3V39c0%2C1.3-1%2C2.3-2.3%2C2.3H26.3L21.2%2C46.6z%20M3.5%2C2C2.6%2C2%2C1.9%2C2.7%2C1.9%2C3.6V39c0%2C0.9%2C0.7%2C1.6%2C1.6%2C1.6h12.9l4.8%2C5l4.8-5h12.9c0.9%2C0%2C1.6-0.7%2C1.6-1.6V3.6c0-0.9-0.7-1.6-1.6-1.6H3.5z%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cg%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M33.1%2C14.6H9.3c-0.6%2C0-1.2-0.6-1.2-1.2s0.5-1.2%2C1.2-1.2h23.7c0.6%2C0%2C1.2%2C0.6%2C1.2%2C1.2S33.7%2C14.6%2C33.1%2C14.6z%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M33.1%2C22H9.3c-0.6%2C0-1.2-0.6-1.2-1.2s0.5-1.2%2C1.2-1.2h23.7c0.6%2C0%2C1.2%2C0.6%2C1.2%2C1.2S33.7%2C22%2C33.1%2C22z%22%2F%3E%3C%2Fg%3E%3Cg%3E%3Cpath%20class%3D%22st1%22%20d%3D%22M33.1%2C29.4H9.3c-0.6%2C0-1.2-0.6-1.2-1.2s0.5-1.2%2C1.2-1.2h23.7c0.6%2C0%2C1.2%2C0.6%2C1.2%2C1.2S33.7%2C29.4%2C33.1%2C29.4z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`;
}
function getSiteNoteSvgImportant(color) {
  return `data:image/svg+xml,%3C%3Fxml version="1.0" encoding="utf-8"%3F%3E%3Csvg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25 25" style="enable-background:new 0 0 25 25;" xml:space="preserve"%3E%3Cstyle type="text/css"%3E.st0%7Bfill:%23${color};%7D.st1%7Bfill:%23FFFFFF;%7D.st2%7Bfill:%23FFD74B;%7D%3C/style%3E%3Cg%3E%3Cg%3E%3Cpath class="st0" d="M22.5,0.7H2.5c-0.6,0-1.1,0.5-1.1,1v18.6c0,0.6,0.5,1,1.1,1h6.4c0.2,0,0.4,0.1,0.5,0.2l2.5,2.6 c0.3,0.3,0.8,0.3,1.1,0l2.5-2.6c0.1-0.1,0.3-0.2,0.5-0.2h6.4c0.6,0,1.1-0.5,1.1-1V1.7C23.6,1.1,23.1,0.7,22.5,0.7z"/%3E%3Cpath class="st1" d="M12.5,24.6C12.5,24.6,12.5,24.6,12.5,24.6c-0.3,0-0.6-0.1-0.8-0.3l-2.5-2.6c-0.1-0.1-0.2-0.1-0.3-0.1H2.5 c-0.8,0-1.4-0.6-1.4-1.3V1.7c0-0.7,0.6-1.3,1.4-1.3h19.9c0.8,0,1.4,0.6,1.4,1.3v18.6c0,0.7-0.6,1.3-1.4,1.3h-6.4 c-0.1,0-0.2,0-0.3,0.1l-2.5,2.6C13.1,24.5,12.8,24.6,12.5,24.6z M2.5,1C2.1,1,1.7,1.3,1.7,1.7v18.6c0,0.4,0.4,0.7,0.8,0.7h6.4 c0.3,0,0.6,0.1,0.8,0.3l2.5,2.6c0.1,0.1,0.2,0.1,0.3,0.1c0,0,0,0,0,0c0.1,0,0.2,0,0.3-0.1l2.5-2.6c0.2-0.2,0.5-0.3,0.8-0.3h6.4 c0.4,0,0.8-0.3,0.8-0.7V1.7c0-0.4-0.4-0.7-0.8-0.7H2.5z"/%3E%3C/g%3E%3Cpath class="st2" d="M13.1,4.9l1.7,3.2c0.1,0.2,0.3,0.3,0.5,0.3L19.1,9c0.6,0.1,0.8,0.7,0.4,1.1l-2.7,2.5c-0.2,0.1-0.2,0.4-0.2,0.6 l0.6,3.5c0.1,0.5-0.5,0.9-1,0.7l-3.4-1.7c-0.2-0.1-0.4-0.1-0.6,0l-3.4,1.7c-0.5,0.2-1.1-0.2-1-0.7l0.6-3.5c0-0.2,0-0.4-0.2-0.6 l-2.7-2.5C5.1,9.7,5.3,9,5.9,9l3.8-0.5c0.2,0,0.4-0.2,0.5-0.3l1.7-3.2C12.1,4.4,12.9,4.4,13.1,4.9L13.1,4.9z"/%3E%3C/g%3E%3C/svg%3E%0A`;
}
function useOverviewChartData(overviewData, overviewMetricsForChart, selectedMetrics, isCompareActive, siteNotesStore) {
  const chartRawDates = ref([]);
  const chartSeriesConfig = computed(() => {
    const metrics = overviewMetricsForChart.value || [];
    const selected = selectedMetrics.value || [];
    const DERIVED_BASE_METRICS = {
      returningUsers: ["totalUsers", "newUsers"],
      pageViewsPerUser: ["screenPageViews", "totalUsers"]
    };
    const basesOnlyForDerived = /* @__PURE__ */ new Set();
    for (const derivedKey of DERIVED_METRICS) {
      if (!selected.includes(derivedKey)) {
        continue;
      }
      const bases = DERIVED_BASE_METRICS[derivedKey] || [];
      for (const base of bases) {
        if (!selected.includes(base)) {
          basesOnlyForDerived.add(base);
        }
      }
    }
    const configs = metrics.map((metricName, index) => {
      if (basesOnlyForDerived.has(metricName)) {
        return null;
      }
      const display = OVERVIEW_METRIC_DISPLAY[metricName];
      if (!display) {
        return null;
      }
      return {
        metric: metricName,
        id: display.id,
        label: display.label,
        color: BASE_SERIES_COLORS[index % BASE_SERIES_COLORS.length],
        derived: false
      };
    }).filter(Boolean);
    const offset = configs.length;
    DERIVED_METRICS.forEach((metricName, i) => {
      if (!selected.includes(metricName)) {
        return;
      }
      if (configs.some((c) => c.metric === metricName)) {
        return;
      }
      const display = OVERVIEW_METRIC_DISPLAY[metricName];
      if (!display) {
        return;
      }
      configs.push({
        metric: metricName,
        id: display.id,
        label: display.label,
        color: BASE_SERIES_COLORS[(offset + i) % BASE_SERIES_COLORS.length],
        derived: true
      });
    });
    return configs;
  });
  const hasComparisonData = computed(() => {
    const rows = overviewData.value?.rows;
    if (!Array.isArray(rows) || rows.length === 0) {
      return false;
    }
    const m2 = rows[0]?.m;
    if (!Array.isArray(m2) || m2.length === 0) {
      return false;
    }
    const firstCell = m2[0];
    return Array.isArray(firstCell) && firstCell.length === 2;
  });
  const chartLegendsAll = computed(() => {
    const configs = chartSeriesConfig.value;
    if (!hasComparisonData.value || !isCompareActive.value) {
      return configs.map((s) => ({ id: s.metric, label: s.label, color: s.color }));
    }
    const legends = [];
    for (const s of configs) {
      legends.push({ id: s.metric, label: s.label, color: s.color });
      legends.push({ id: `${s.metric}_previous`, label: `${s.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`, color: s.color });
    }
    return legends;
  });
  const chartLegends = computed(() => chartLegendsAll.value.filter((l) => !/previous/i.test(l.label)));
  const chartColors = computed(() => chartLegendsAll.value.map((l) => l.color));
  const chartStrokeDashArray = computed(() => {
    if (!hasComparisonData.value || !isCompareActive.value) {
      return [];
    }
    const n = chartSeriesConfig.value.length * 2;
    return Array.from({ length: n }, (_, i) => i % 2 === 0 ? 0 : 5);
  });
  const siteNoteAnnotations = computed(() => {
    const notesByDate = siteNotesStore.siteNotesByDateCompact;
    const rawDates = chartRawDates.value;
    const importantOnly = siteNotesStore.importantFilter === true;
    if (!rawDates.length || !Object.keys(notesByDate).length) {
      return [];
    }
    const annotations = [];
    for (let i = 0; i < rawDates.length; i++) {
      const dateKey = rawDates[i];
      let dayNotes = notesByDate[dateKey];
      if (!dayNotes || !dayNotes.length) {
        continue;
      }
      if (importantOnly) {
        dayNotes = dayNotes.filter((n) => n.important);
        if (!dayNotes.length) {
          continue;
        }
      }
      const hasImportant = dayNotes.some((n) => n.important);
      const categoryLabel = formatDateLabel(dateKey);
      const firstWithColor = dayNotes.find((n) => n.category?.background_color);
      const rawColor = firstWithColor?.category?.background_color || `#${SITE_NOTE_DEFAULT_COLOR}`;
      const color = rawColor.replace(/^#/, "");
      const svgPath = hasImportant ? getSiteNoteSvgImportant(color) : getSiteNoteSvgNormal(color);
      annotations.push({
        x: categoryLabel,
        y: 0,
        marker: { size: 0 },
        image: { path: svgPath, width: 20, height: 20, offsetY: -10 }
      });
    }
    return annotations;
  });
  function transformRowsToChartData(rows) {
    if (!Array.isArray(rows) || rows.length === 0) {
      return { series: [], categories: [] };
    }
    const currentMetrics = overviewMetricsForChart.value;
    const first = rows[0];
    const isGroupedByDate = first?.d?.length === 1 && Array.isArray(first?.m?.[0]);
    if (isGroupedByDate) {
      let getVal = function(row, metricIdx, periodIdx) {
        const rowM = row?.m;
        if (!Array.isArray(rowM)) {
          return 0;
        }
        if (rowM.length === 1 && Array.isArray(rowM[0]) && !showComparison) {
          const val = rowM[0][metricIdx];
          return parseFloat(val) || 0;
        }
        const cell = rowM[metricIdx];
        if (Array.isArray(cell)) {
          return parseFloat(cell[periodIdx]) || 0;
        }
        return 0;
      };
      const sortedRows = [...rows].sort((a, b) => (a.d[0] || "").localeCompare(b.d[0] || ""));
      const categories2 = sortedRows.map((r) => formatDateLabel(r.d[0]));
      chartRawDates.value = sortedRows.map((r) => r.d[0]);
      const m2 = first?.m;
      const isCompareFormat = Array.isArray(m2) && m2.length >= 1 && Array.isArray(m2[0]) && m2[0].length === 2;
      const showComparison = isCompareFormat && isCompareActive.value;
      const currIdx = 1;
      const prevIdx = 0;
      const series2 = [];
      for (const seriesConfig of chartSeriesConfig.value) {
        if (seriesConfig.derived) {
          if (seriesConfig.metric === "returningUsers") {
            const totalUsersIdx = currentMetrics.indexOf("totalUsers");
            const newUsersIdx = currentMetrics.indexOf("newUsers");
            if (totalUsersIdx === -1 || newUsersIdx === -1) {
              series2.push({ name: seriesConfig.label, data: [] });
              if (showComparison) {
                series2.push({ name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`, data: [] });
              }
              continue;
            }
            series2.push({
              name: seriesConfig.label,
              data: sortedRows.map((row) => {
                const tu = getVal(row, totalUsersIdx, currIdx);
                const nu = getVal(row, newUsersIdx, currIdx);
                return Math.max(0, tu - nu);
              })
            });
            if (showComparison) {
              series2.push({
                name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`,
                data: sortedRows.map((row) => {
                  const tu = getVal(row, totalUsersIdx, prevIdx);
                  const nu = getVal(row, newUsersIdx, prevIdx);
                  return Math.max(0, tu - nu);
                })
              });
            }
            continue;
          }
          if (seriesConfig.metric === "pageViewsPerUser") {
            const screenPageViewsIdx = currentMetrics.indexOf("screenPageViews");
            const totalUsersIdx = currentMetrics.indexOf("totalUsers");
            if (screenPageViewsIdx === -1 || totalUsersIdx === -1) {
              series2.push({ name: seriesConfig.label, data: [] });
              if (showComparison) {
                series2.push({ name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`, data: [] });
              }
              continue;
            }
            series2.push({
              name: seriesConfig.label,
              data: sortedRows.map((row) => {
                const pv = getVal(row, screenPageViewsIdx, currIdx);
                const tu = getVal(row, totalUsersIdx, currIdx);
                return tu ? pv / tu : 0;
              })
            });
            if (showComparison) {
              series2.push({
                name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`,
                data: sortedRows.map((row) => {
                  const pv = getVal(row, screenPageViewsIdx, prevIdx);
                  const tu = getVal(row, totalUsersIdx, prevIdx);
                  return tu ? pv / tu : 0;
                })
              });
            }
            continue;
          }
          series2.push({ name: seriesConfig.label, data: [] });
          if (showComparison) {
            series2.push({ name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`, data: [] });
          }
          continue;
        }
        const metricIndex = currentMetrics.indexOf(seriesConfig.metric);
        if (metricIndex === -1) {
          series2.push({ name: seriesConfig.label, data: [] });
          if (showComparison) {
            series2.push({ name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`, data: [] });
          }
          continue;
        }
        series2.push({
          name: seriesConfig.label,
          data: sortedRows.map((row) => {
            const raw = getVal(row, metricIndex, currIdx);
            if (isRateMetric(seriesConfig.metric)) {
              return toPercentValue(raw);
            }
            if (isDurationMetric(seriesConfig.metric)) {
              return secondsToMinutes(raw);
            }
            return raw;
          })
        });
        if (showComparison) {
          series2.push({
            name: `${seriesConfig.label} (${PREVIOUS_PERIOD_LEGEND_LABEL})`,
            data: sortedRows.map((row) => {
              const raw = getVal(row, metricIndex, prevIdx);
              if (isRateMetric(seriesConfig.metric)) {
                return toPercentValue(raw);
              }
              if (isDurationMetric(seriesConfig.metric)) {
                return secondsToMinutes(raw);
              }
              return raw;
            })
          });
        }
      }
      return { series: series2, categories: categories2 };
    }
    const SESSIONS_INDEX = currentMetrics.indexOf("sessions");
    const BOUNCE_RATE_INDEX = currentMetrics.indexOf("bounceRate");
    const ENGAGEMENT_RATE_INDEX = currentMetrics.indexOf("engagementRate");
    function parseMetric(m2, idx) {
      const arr = Array.isArray(m2) ? m2 : [m2];
      return parseFloat(arr[idx]) || 0;
    }
    const aggregatedByDate = {};
    for (const row of rows) {
      const date = row?.d?.[0];
      if (!date) {
        continue;
      }
      const metrics = row.m;
      if (!Array.isArray(metrics)) {
        continue;
      }
      if (!aggregatedByDate[date]) {
        aggregatedByDate[date] = { sums: {}, rateWeighted: {} };
      }
      const sessions = SESSIONS_INDEX >= 0 ? parseMetric(metrics[SESSIONS_INDEX], 0) : 0;
      for (let i = 0; i < metrics.length; i++) {
        const val = parseMetric(metrics[i], 0);
        if (i === BOUNCE_RATE_INDEX || i === ENGAGEMENT_RATE_INDEX) {
          if (!aggregatedByDate[date].rateWeighted[i]) {
            aggregatedByDate[date].rateWeighted[i] = { num: 0, denom: 0 };
          }
          aggregatedByDate[date].rateWeighted[i].num += val * sessions;
          aggregatedByDate[date].rateWeighted[i].denom += sessions;
        } else {
          aggregatedByDate[date].sums[i] = (aggregatedByDate[date].sums[i] ?? 0) + val;
        }
      }
    }
    const sortedDates = Object.keys(aggregatedByDate).sort();
    const categories = sortedDates.map((d) => formatDateLabel(d));
    chartRawDates.value = sortedDates;
    function getSum(day, idx) {
      const rw = day?.rateWeighted?.[idx];
      if (rw && rw.denom > 0) {
        return rw.num / rw.denom;
      }
      return parseFloat(day?.sums?.[idx]) || 0;
    }
    const series = chartSeriesConfig.value.map((seriesConfig) => {
      if (seriesConfig.derived) {
        if (seriesConfig.metric === "returningUsers") {
          const totalUsersIdx = currentMetrics.indexOf("totalUsers");
          const newUsersIdx = currentMetrics.indexOf("newUsers");
          if (totalUsersIdx === -1 || newUsersIdx === -1) {
            return { name: seriesConfig.label, data: [] };
          }
          return {
            name: seriesConfig.label,
            data: sortedDates.map((date) => {
              const day = aggregatedByDate[date];
              if (!day) {
                return 0;
              }
              return Math.max(0, getSum(day, totalUsersIdx) - getSum(day, newUsersIdx));
            })
          };
        }
        if (seriesConfig.metric === "pageViewsPerUser") {
          const screenPageViewsIdx = currentMetrics.indexOf("screenPageViews");
          const totalUsersIdx = currentMetrics.indexOf("totalUsers");
          if (screenPageViewsIdx === -1 || totalUsersIdx === -1) {
            return { name: seriesConfig.label, data: [] };
          }
          return {
            name: seriesConfig.label,
            data: sortedDates.map((date) => {
              const day = aggregatedByDate[date];
              if (!day) {
                return 0;
              }
              const tu = getSum(day, totalUsersIdx);
              return tu ? getSum(day, screenPageViewsIdx) / tu : 0;
            })
          };
        }
        return { name: seriesConfig.label, data: [] };
      }
      const metricIndex = currentMetrics.indexOf(seriesConfig.metric);
      if (metricIndex === -1) {
        return { name: seriesConfig.label, data: [] };
      }
      return {
        name: seriesConfig.label,
        data: sortedDates.map((date) => {
          const day = aggregatedByDate[date];
          if (!day) {
            return 0;
          }
          const rw = day.rateWeighted?.[metricIndex];
          let value;
          if (rw && rw.denom > 0) {
            value = rw.num / rw.denom;
          } else {
            value = parseFloat(day.sums?.[metricIndex]) || 0;
          }
          if (isRateMetric(seriesConfig.metric)) {
            return toPercentValue(value);
          }
          if (isDurationMetric(seriesConfig.metric)) {
            return secondsToMinutes(value);
          }
          return value;
        })
      };
    });
    return { series, categories };
  }
  const chartData = computed(() => {
    if (!overviewData.value) {
      return { series: [], categories: [] };
    }
    if (overviewData.value.rows && overviewData.value.rows.length > 0) {
      return transformRowsToChartData(overviewData.value.rows);
    }
    if (overviewData.value.chart) {
      return overviewData.value.chart;
    }
    return { series: [], categories: [] };
  });
  return {
    chartData,
    chartSeriesConfig,
    chartLegends,
    chartColors,
    chartStrokeDashArray,
    chartRawDates,
    formatDateLabel,
    siteNoteAnnotations,
    hasComparisonData,
    isRateMetric,
    toPercentValue,
    OVERVIEW_METRIC_DISPLAY
  };
}
function calculateAvgOrderValue(totalRevenue, ecommercePurchases) {
  const revenue = parseFloat(totalRevenue) || 0;
  const purchases = parseFloat(ecommercePurchases) || 0;
  if (purchases <= 0 || revenue <= 0) {
    return 0;
  }
  return revenue / purchases;
}
function parseChartMetrics(chartData) {
  const rows = Array.isArray(chartData?.rows) ? chartData.rows : Array.isArray(chartData) ? chartData : [];
  if (rows.length === 0) {
    return null;
  }
  let sessions = 0, engagedSessions = 0, totalUsers = 0, newUsers = 0;
  for (const row of rows) {
    const m0 = row?.m?.[0];
    if (!Array.isArray(m0) || m0.length < 5) {
      continue;
    }
    sessions += parseFloat(m0[0]) || 0;
    engagedSessions += parseFloat(m0[1]) || 0;
    totalUsers += parseFloat(m0[2]) || 0;
    newUsers += parseFloat(m0[3]) || 0;
  }
  const engagementRate = sessions > 0 ? engagedSessions / sessions * 100 : 0;
  const returningUsers = Math.max(0, totalUsers - newUsers);
  return { sessions, engagedSessions, totalUsers, newUsers, returningUsers, engagementRate };
}
function aggregateOverviewRowsByTab(rows, metricNames, usePreviousPeriod = false) {
  if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(metricNames) || metricNames.length === 0) {
    return {};
  }
  const sums = {};
  const rateWeighted = {};
  const avgWeighted = {};
  const sessionsIdx = metricNames.indexOf("sessions");
  const firstRow = rows[0];
  const isComparisonFormat = Array.isArray(firstRow?.m?.[0]) && firstRow.m[0].length === 2 && firstRow.m?.length >= metricNames.length;
  const periodIdx = usePreviousPeriod ? 0 : 1;
  for (const row of rows) {
    let readMetricVal = function(cell) {
      if (Array.isArray(cell) && cell.length >= 2) {
        return parseFloat(cell[periodIdx]) || 0;
      }
      return parseFloat(cell) || 0;
    };
    const m0 = row?.m?.[0];
    if (!Array.isArray(m0) && !Array.isArray(row?.m)) {
      continue;
    }
    const metricsRow = isComparisonFormat ? row.m : Array.isArray(m0) ? m0 : [];
    if (metricsRow.length < metricNames.length) {
      continue;
    }
    const sessionWeight = sessionsIdx >= 0 ? readMetricVal(metricsRow[sessionsIdx]) || 0 : 1;
    for (let i = 0; i < metricNames.length; i++) {
      const name = metricNames[i];
      const val = readMetricVal(metricsRow[i]);
      if (isRateMetric(name)) {
        if (!rateWeighted[i]) {
          rateWeighted[i] = { num: 0, denom: 0 };
        }
        rateWeighted[i].num += val * sessionWeight;
        rateWeighted[i].denom += sessionWeight;
      } else if (isAvgMetric(name)) {
        if (!avgWeighted[i]) {
          avgWeighted[i] = { num: 0, denom: 0 };
        }
        avgWeighted[i].num += val * sessionWeight;
        avgWeighted[i].denom += sessionWeight;
      } else {
        sums[name] = (sums[name] ?? 0) + val;
      }
    }
  }
  const result = { ...sums };
  for (let i = 0; i < metricNames.length; i++) {
    if (isRateMetric(metricNames[i])) {
      const rw = rateWeighted[i];
      result[metricNames[i]] = rw && rw.denom > 0 ? toPercentValue(rw.num / rw.denom) : 0;
    } else if (isAvgMetric(metricNames[i])) {
      const aw = avgWeighted[i];
      result[metricNames[i]] = aw && aw.denom > 0 ? Math.round(aw.num / aw.denom) : 0;
    }
  }
  if (result.totalUsers != null && result.newUsers != null) {
    result.returningUsers = Math.max(0, (result.totalUsers ?? 0) - (result.newUsers ?? 0));
  }
  if (result.sessions != null && result.sessions > 0 && result.ecommercePurchases != null) {
    result.conversionRate = (result.ecommercePurchases ?? 0) / result.sessions * 100;
  }
  if (result.screenPageViews != null) {
    result.pageViews = result.screenPageViews;
  }
  if (result.screenPageViews != null && result.totalUsers != null && result.totalUsers > 0) {
    result.pageViewsPerUser = result.screenPageViews / result.totalUsers;
  }
  if (result.totalRevenue != null) {
    result.revenue = result.totalRevenue;
  }
  if (result.ecommercePurchases != null) {
    result.transactions = result.ecommercePurchases;
  }
  if (result.averageSessionDuration != null) {
    result.avgSessionDuration = result.averageSessionDuration;
  }
  result.avgOrderValue = result.averagePurchaseRevenue != null && result.averagePurchaseRevenue !== "" ? parseFloat(result.averagePurchaseRevenue) || 0 : calculateAvgOrderValue(result.totalRevenue, result.ecommercePurchases);
  return result;
}
const METRIC_DISPLAY_CONFIG = {
  totalUsers: { label: __$1("Total Users", "google-analytics-for-wordpress"), type: "number", key: "totalUsers" },
  newUsers: { label: __$1("New Users", "google-analytics-for-wordpress"), type: "number", key: "newUsers" },
  returningUsers: { label: __$1("Returning Users", "google-analytics-for-wordpress"), type: "number", key: "returningUsers" },
  engagementRate: { label: __$1("Engagement Rate", "google-analytics-for-wordpress"), type: "percent", key: "engagementRate" },
  pageViewsPerUser: { label: __$1("Pageviews / User", "google-analytics-for-wordpress"), type: "decimal", key: "pageViewsPerUser" },
  bounceRate: { label: __$1("Bounce Rate", "google-analytics-for-wordpress"), type: "percent", key: "bounceRate" },
  ecommercePurchases: { label: __$1("Purchases", "google-analytics-for-wordpress"), type: "number", key: "ecommercePurchases" },
  totalRevenue: { label: __$1("Revenue", "google-analytics-for-wordpress"), type: "currency", key: "totalRevenue" },
  averagePurchaseRevenue: { label: __$1("Average Order Value", "google-analytics-for-wordpress"), type: "currency", key: "averagePurchaseRevenue" },
  averageSessionDuration: { label: __$1("Session Duration", "google-analytics-for-wordpress"), type: "duration", key: "averageSessionDuration" },
  sessions: { label: __$1("Sessions", "google-analytics-for-wordpress"), type: "number", key: "sessions" },
  engagedSessions: { label: __$1("Engaged Sessions", "google-analytics-for-wordpress"), type: "number", key: "engagedSessions" },
  sessionKeyEventRate: { label: __$1("Key Event Rate", "google-analytics-for-wordpress"), type: "percent", key: "sessionKeyEventRate" },
  screenPageViews: { label: __$1("Page Views", "google-analytics-for-wordpress"), type: "number", key: "screenPageViews" },
  itemsPurchased: { label: __$1("Items Purchased", "google-analytics-for-wordpress"), type: "number", key: "ecommercePurchases" },
  couponUsedPercent: { label: __$1("Coupon Used %", "google-analytics-for-wordpress"), type: "percent", key: "couponUsedPercent" },
  cartAbandonRatePercent: { label: __$1("Cart Abandon Rate %", "google-analytics-for-wordpress"), type: "percent", key: "cartAbandonRatePercent" }
};
function getMetricsFromSelection(selectedMetrics, aggregated = {}) {
  if (!Array.isArray(selectedMetrics) || selectedMetrics.length === 0) {
    return [];
  }
  return selectedMetrics.map((metricId) => {
    const config = METRIC_DISPLAY_CONFIG[metricId];
    if (!config) {
      return null;
    }
    const value = aggregated[config.key] ?? aggregated[metricId] ?? 0;
    return { id: metricId, label: config.label, value, type: config.type };
  }).filter(Boolean);
}
function getMetricsForTab(tabId, metrics = {}) {
  const tabMetrics = {
    traffic: [
      { id: "totalUsers", label: __$1("Total Users", "google-analytics-for-wordpress"), value: metrics.totalUsers || 0, type: "number" },
      { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), value: metrics.newUsers || 0, type: "number" },
      { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress"), value: metrics.returningUsers || 0, type: "number" },
      { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), value: metrics.engagementRate || 0, type: "percent" }
    ],
    engagement: [
      { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), value: metrics.sessions || 0, type: "number" },
      { id: "pageViews", label: __$1("Page Views", "google-analytics-for-wordpress"), value: metrics.pageViews || 0, type: "number" },
      { id: "avgSessionDuration", label: __$1("Avg. Session Duration", "google-analytics-for-wordpress"), value: metrics.avgSessionDuration || 0, type: "duration" },
      { id: "bounceRate", label: __$1("Bounce Rate", "google-analytics-for-wordpress"), value: metrics.bounceRate || 0, type: "percent" }
    ],
    referrals: [
      { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), value: metrics.sessions || 0, type: "number" },
      { id: "engagedSessions", label: __$1("Engaged Sessions", "google-analytics-for-wordpress"), value: metrics.engagedSessions || 0, type: "number" },
      { id: "sessionKeyEventRate", label: __$1("Session Key Event Rate", "google-analytics-for-wordpress"), value: metrics.sessionKeyEventRate || 0, type: "percent" }
    ],
    ecommerce: [
      { id: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), value: metrics.revenue || 0, type: "currency" },
      { id: "transactions", label: __$1("Transactions", "google-analytics-for-wordpress"), value: metrics.transactions || 0, type: "number" },
      { id: "avgOrderValue", label: __$1("Avg. Order Value", "google-analytics-for-wordpress"), value: metrics.avgOrderValue || 0, type: "currency" },
      { id: "conversionRate", label: __$1("Conversion Rate", "google-analytics-for-wordpress"), value: metrics.conversionRate || 0, type: "percent" }
    ]
  };
  return tabMetrics[tabId] || tabMetrics.traffic;
}
function formatDateShort(dateStr) {
  if (!dateStr || typeof dateStr !== "string") {
    return "";
  }
  const parts = dateStr.trim().split("-");
  if (parts.length !== 3) {
    return dateStr;
  }
  const [y, m2, d] = parts;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[parseInt(m2, 10) - 1] || m2;
  const yearShort = y.length >= 2 ? y.slice(-2) : y;
  return `${month} ${parseInt(d, 10)}, ${yearShort}`;
}
function formatDateRangeLabel(start, end) {
  if (!start || !end) {
    return "";
  }
  const from = formatDateShort(start);
  const to = formatDateShort(end);
  return from && to ? `${from} - ${to}` : "";
}
function formatMetricValue(value, type) {
  if (value === null || value === void 0) {
    return "-";
  }
  switch (type) {
    case "number":
      if (value >= 1e6) {
        return `${(value / 1e6).toFixed(1)}M`;
      }
      if (value >= 1e3) {
        return `${(value / 1e3).toFixed(1)}K`;
      }
      return value.toLocaleString();
    case "decimal":
      return parseFloat(value).toFixed(1);
    case "percent":
      return `${parseFloat(value).toFixed(1)}%`;
    case "currency": {
      const currency = getMiGlobal("currency", "USD") || "USD";
      const formatter = new Intl.NumberFormat(void 0, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });
      if (value >= 1e6) {
        const symbol = formatter.formatToParts(0).find((p) => p.type === "currency")?.value || "";
        return `${symbol}${(value / 1e6).toFixed(1)}M`;
      }
      if (value >= 1e3) {
        const symbol = formatter.formatToParts(0).find((p) => p.type === "currency")?.value || "";
        return `${symbol}${(value / 1e3).toFixed(1)}K`;
      }
      return formatter.format(value);
    }
    case "duration": {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
    case "text":
      return value;
    default:
      return value;
  }
}
function useKeyMetrics(activeTab, overviewData, _tabMetricsDataUnused, chartMetricsData, overviewMetricsForChart, selectedDropdownMetrics, isCompareActive, dateRange) {
  const keyMetrics = computed(() => {
    const tabId = activeTab.value || "traffic";
    const apiMetricNames = overviewMetricsForChart.value || [];
    const dropdownIds = selectedDropdownMetrics.value || [];
    const rows = overviewData.value?.rows;
    let aggregated = {};
    if (Array.isArray(rows) && rows.length > 0 && apiMetricNames.length > 0) {
      aggregated = aggregateOverviewRowsByTab(rows, apiMetricNames);
    } else {
      const fromChart = parseChartMetrics(chartMetricsData.value) || {};
      const fromOverview = overviewData.value?.metrics || {};
      aggregated = { ...fromOverview, ...fromChart };
      if (aggregated.screenPageViews != null) {
        aggregated.pageViews = aggregated.screenPageViews;
      }
      if (aggregated.totalRevenue != null) {
        aggregated.revenue = aggregated.totalRevenue;
      }
      if (aggregated.ecommercePurchases != null) {
        aggregated.transactions = aggregated.ecommercePurchases;
      }
      if (aggregated.averageSessionDuration != null) {
        aggregated.avgSessionDuration = aggregated.averageSessionDuration;
      }
      aggregated.avgOrderValue = aggregated.averagePurchaseRevenue != null && aggregated.averagePurchaseRevenue !== "" ? parseFloat(aggregated.averagePurchaseRevenue) || 0 : calculateAvgOrderValue(aggregated.totalRevenue, aggregated.ecommercePurchases);
    }
    if (dropdownIds.length > 0) {
      const fromSelection = getMetricsFromSelection(dropdownIds, aggregated);
      if (fromSelection.length > 0) {
        return fromSelection;
      }
    }
    return getMetricsForTab(tabId, aggregated);
  });
  const keyMetricsPrevious = computed(() => {
    if (!isCompareActive.value) {
      return [];
    }
    const tabId = activeTab.value || "traffic";
    const apiMetricNames = overviewMetricsForChart.value || [];
    const dropdownIds = selectedDropdownMetrics.value || [];
    const rows = overviewData.value?.rows;
    if (!Array.isArray(rows) || rows.length === 0 || !apiMetricNames.length) {
      return [];
    }
    const firstRow = rows[0];
    const isComparisonFormat = Array.isArray(firstRow?.m?.[0]) && firstRow.m[0].length === 2 && firstRow.m?.length >= apiMetricNames.length;
    if (!isComparisonFormat) {
      return [];
    }
    const aggregated = aggregateOverviewRowsByTab(rows, apiMetricNames, true);
    if (dropdownIds.length > 0) {
      const fromSelection = getMetricsFromSelection(dropdownIds, aggregated);
      if (fromSelection.length > 0) {
        return fromSelection;
      }
    }
    return getMetricsForTab(tabId, aggregated);
  });
  const keyMetricsWithChange = computed(() => {
    const current = keyMetrics.value;
    const previous = keyMetricsPrevious.value;
    if (!Array.isArray(previous) || previous.length === 0) {
      return current;
    }
    const prevById = Object.fromEntries(previous.map((p) => [p.id, p]));
    return current.map((m2) => {
      const prev = prevById[m2.id];
      if (prev == null) {
        return { ...m2, percentChange: null };
      }
      const currVal = Number(m2.value);
      const prevVal = Number(prev.value);
      if (prevVal === 0) {
        return { ...m2, percentChange: null };
      }
      const pct = (currVal - prevVal) / prevVal * 100;
      const rounded = Math.round(pct * 10) / 10;
      return {
        ...m2,
        percentChange: rounded === 0 ? null : { value: rounded, positive: rounded > 0 }
      };
    });
  });
  const currentDateRangeLabel = computed(() => formatDateRangeLabel(dateRange?.start, dateRange?.end));
  const previousDateRangeLabel = computed(() => formatDateRangeLabel(dateRange?.compareStart, dateRange?.compareEnd));
  return {
    keyMetrics,
    keyMetricsPrevious,
    keyMetricsWithChange,
    formatMetricValue,
    currentDateRangeLabel,
    previousDateRangeLabel
  };
}
const _hoisted_1$7 = { class: "monsterinsights-overview-report-traffic-chart-section" };
const _hoisted_2$7 = { class: "monsterinsights-overview-report-traffic-chart-tabs" };
const _hoisted_3$7 = ["onClick"];
const _hoisted_4$6 = { class: "monsterinsights-overview-tab__label" };
const _hoisted_5$6 = { class: "monsterinsights-traffic-chart-key-metrics" };
const _hoisted_6$6 = { class: "monsterinsights-traffic-chart-key-metrics__row" };
const _hoisted_7$6 = { class: "monsterinsights-traffic-chart-key-metrics__container" };
const _hoisted_8$6 = { class: "monsterinsights-overview-metric__label" };
const _hoisted_9$5 = { class: "monsterinsights-overview-metric__value-wrap" };
const _hoisted_10$4 = { class: "monsterinsights-overview-metric__value" };
const _hoisted_11$4 = {
  key: 1,
  class: "monsterinsights-overview-metric__date-range"
};
const _hoisted_12$4 = {
  key: 0,
  class: "monsterinsights-traffic-chart-key-metrics__previous"
};
const _hoisted_13$3 = { class: "monsterinsights-traffic-chart-key-metrics__container monsterinsights-traffic-chart-key-metrics__container--previous" };
const _hoisted_14$3 = { class: "monsterinsights-overview-metric__label" };
const _hoisted_15$3 = { class: "monsterinsights-overview-metric__value-wrap" };
const _hoisted_16$3 = { class: "monsterinsights-overview-metric__value" };
const _hoisted_17$3 = {
  key: 0,
  class: "monsterinsights-overview-metric__date-range"
};
const _hoisted_18$3 = { class: "monsterinsights-traffic-chart-legends" };
const _hoisted_19$3 = { class: "monsterinsights-traffic-chart-legend__label" };
const _hoisted_20$3 = { class: "monsterinsights-overview-report-traffic-chart-wrapper" };
const _hoisted_21$2 = {
  key: 0,
  class: "monsterinsights-overview-chart-loading"
};
const _hoisted_22$2 = {
  key: 1,
  class: "monsterinsights-overview-chart-error"
};
const _hoisted_23$1 = { class: "monsterinsights-site-notes-toggle" };
const _hoisted_24$1 = {
  key: 1,
  class: "monsterinsights-site-notes-toggle"
};
const _sfc_main$9 = {
  __name: "OverviewTrafficChart",
  props: {
    dateRange: {
      type: Object,
      required: true,
      default: () => ({
        interval: "last30days",
        start: "",
        end: "",
        compareStart: "",
        compareEnd: "",
        compareReport: false
      })
    }
  },
  emits: ["overview-data-loaded", "overview-error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isLite = computed(() => true);
    const showProUpsell = computed(() => isLite.value && activeTab.value === "ecommerce");
    const SAMPLE_KEY_METRICS_BY_TAB = {
      traffic: [
        { id: "totalUsers", label: __$1("Total Users", "google-analytics-for-wordpress"), value: 8432, type: "number", percentChange: { value: 14.2, positive: true } },
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), value: 6218, type: "number", percentChange: { value: 11.5, positive: true } },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), value: 62.3, type: "percent", percentChange: { value: 4.8, positive: true } }
      ],
      engagement: [
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), value: 6218, type: "number", percentChange: { value: 11.5, positive: true } },
        { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress"), value: 2214, type: "number", percentChange: { value: 7.3, positive: true } },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), value: 62.3, type: "percent", percentChange: { value: 4.8, positive: true } }
      ],
      referrals: [
        { id: "totalUsers", label: __$1("Total Users", "google-analytics-for-wordpress"), value: 3150, type: "number", percentChange: { value: 9.6, positive: true } },
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), value: 2340, type: "number", percentChange: { value: 6.1, positive: true } },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), value: 58.7, type: "percent", percentChange: { value: 3.2, positive: true } }
      ],
      ecommerce: [
        { id: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), value: 12450, type: "currency", percentChange: { value: 18.4, positive: true } },
        { id: "transactions", label: __$1("Transactions", "google-analytics-for-wordpress"), value: 184, type: "number", percentChange: { value: 12.1, positive: true } },
        { id: "avgOrderValue", label: __$1("Avg. Order Value", "google-analytics-for-wordpress"), value: 67.66, type: "currency", percentChange: { value: 5.3, positive: true } },
        { id: "conversionRate", label: __$1("Conversion Rate", "google-analytics-for-wordpress"), value: 2.4, type: "percent", percentChange: { value: 8.7, positive: true } }
      ]
    };
    const overviewStore = useOverviewReportStore();
    const { activeFilters: storeActiveFilters, activeDevice: storeActiveDevice } = storeToRefs(overviewStore);
    const siteNotesStore = useSiteNotesStore();
    const loading = ref(false);
    const error = ref(null);
    const overviewData = ref(null);
    const chartMetricsData = ref(null);
    const isMetricsDropdownOpen = ref(false);
    const overviewLoadId = ref(0);
    const METRICS_OPTIONS_BY_TAB = {
      traffic: [
        { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), icon: "link" },
        { id: "engagedSessions", label: __$1("Engaged Sessions", "google-analytics-for-wordpress"), icon: "link" },
        { id: "sessionKeyEventRate", label: __$1("Key Event Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "totalUsers", label: __$1("Total Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "pageViewsPerUser", label: __$1("Pageviews / User", "google-analytics-for-wordpress"), icon: "link" },
        { id: "bounceRate", label: __$1("Bounce Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "ecommercePurchases", label: __$1("Purchases", "google-analytics-for-wordpress"), icon: "link" },
        { id: "totalRevenue", label: __$1("Revenue", "google-analytics-for-wordpress"), icon: "link" },
        { id: "averagePurchaseRevenue", label: __$1("Average Order Value", "google-analytics-for-wordpress"), icon: "link" }
      ],
      engagement: [
        { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), icon: "link" },
        { id: "engagedSessions", label: __$1("Engaged Sessions", "google-analytics-for-wordpress"), icon: "link" },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "pageViewsPerUser", label: __$1("Pageviews / User", "google-analytics-for-wordpress"), icon: "link" },
        { id: "bounceRate", label: __$1("Bounce Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "averageSessionDuration", label: __$1("Session Duration", "google-analytics-for-wordpress"), icon: "link" }
      ],
      referrals: [
        { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), icon: "link" },
        { id: "engagedSessions", label: __$1("Engaged Sessions", "google-analytics-for-wordpress"), icon: "link" },
        { id: "sessionKeyEventRate", label: __$1("Key Event Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "totalUsers", label: __$1("Total Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress"), icon: "link" },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), icon: "link" },
        { id: "pageViewsPerUser", label: __$1("Pageviews / User", "google-analytics-for-wordpress"), icon: "link" }
      ],
      ecommerce: [
        { id: "itemsPurchased", label: __$1("Items Purchased", "google-analytics-for-wordpress"), icon: "link" },
        { id: "averagePurchaseRevenue", label: __$1("Average Order Value (AOV)", "google-analytics-for-wordpress"), icon: "link" },
        { id: "couponUsedPercent", label: __$1("Coupon Used %", "google-analytics-for-wordpress"), icon: "link" },
        { id: "cartAbandonRatePercent", label: __$1("Cart Abandon Rate %", "google-analytics-for-wordpress"), icon: "link" }
      ]
    };
    const metricsOptions = computed(() => {
      const tabId = activeTab.value || "traffic";
      return METRICS_OPTIONS_BY_TAB[tabId] || METRICS_OPTIONS_BY_TAB.traffic;
    });
    const TAB_DEFAULT_OPTIONS = {
      traffic: ["sessions", "engagedSessions", "sessionKeyEventRate"],
      engagement: ["sessions", "engagedSessions", "engagementRate"],
      referrals: ["sessions", "engagedSessions", "sessionKeyEventRate"],
      ecommerce: ["itemsPurchased", "averagePurchaseRevenue"]
    };
    const TAB_DEFINITIONS = [
      { id: "traffic", label: __$1("Traffic", "google-analytics-for-wordpress"), icon: "chart-line" },
      { id: "engagement", label: __$1("Engagement", "google-analytics-for-wordpress"), icon: "users" },
      { id: "referrals", label: __$1("Referrals", "google-analytics-for-wordpress"), icon: "referrals" },
      { id: "ecommerce", label: __$1("eCommerce", "google-analytics-for-wordpress"), icon: "cart" }
    ];
    const activeTab = computed(() => overviewStore.getChartActiveTab);
    const selectedMetricsByTab = ref(
      Object.fromEntries(
        Object.entries(TAB_DEFAULT_OPTIONS).map(([tabId, optionIds]) => [tabId, [...optionIds]])
      )
    );
    const selectedMetrics = computed({
      get() {
        const tabId = activeTab.value || "traffic";
        return selectedMetricsByTab.value[tabId] || [];
      },
      set(newValue) {
        const tabId = activeTab.value || "traffic";
        selectedMetricsByTab.value = {
          ...selectedMetricsByTab.value,
          [tabId]: Array.isArray(newValue) ? [...newValue] : []
        };
      }
    });
    const selectedOverviewMetricsForQuery = computed(() => {
      const selected = selectedMetrics.value || [];
      const options = metricsOptions.value || [];
      const metrics = [];
      for (const option of options) {
        if (selected.includes(option.id)) metrics.push(option.id);
      }
      return metrics;
    });
    const overviewMetricsForChart = computed(() => {
      const selected = selectedOverviewMetricsForQuery.value;
      return getInjectedMetricNames(selected.length > 0 ? selected : null);
    });
    const isCompareActive = computed(
      () => !!(props.dateRange?.compareReport && props.dateRange?.compareStart && props.dateRange?.compareEnd)
    );
    const {
      chartData,
      chartSeriesConfig,
      chartLegends,
      chartColors,
      chartStrokeDashArray,
      chartRawDates,
      siteNoteAnnotations
    } = useOverviewChartData(overviewData, overviewMetricsForChart, selectedMetrics, isCompareActive, siteNotesStore);
    const {
      keyMetricsWithChange,
      keyMetricsPrevious,
      formatMetricValue: formatMetricValue2,
      currentDateRangeLabel,
      previousDateRangeLabel
    } = useKeyMetrics(
      activeTab,
      overviewData,
      null,
      // tabMetricsData no longer used — derived from overviewData
      chartMetricsData,
      overviewMetricsForChart,
      // API metric names (expanded) for row parsing
      selectedOverviewMetricsForQuery,
      // Dropdown IDs for display labels
      isCompareActive,
      props.dateRange
    );
    const activeTabs = computed(() => TAB_DEFINITIONS);
    let chartInstance = null;
    let singlePointPollTimer = null;
    const chartOptions = computed(() => {
      return {
        chart: {
          toolbar: { show: false },
          zoom: { enabled: false },
          events: {
            // Capture chart instance and apply initial annotations
            mounted: (chartContext) => {
              chartInstance = chartContext;
              applySiteNoteAnnotations();
              let attempts = 0;
              const pollGrid = () => {
                if (chartInstance?.w?.globals?.gridWidth != null || attempts >= 20) {
                  applySinglePointLine();
                } else {
                  attempts++;
                  singlePointPollTimer = setTimeout(pollGrid, 50);
                }
              };
              singlePointPollTimer = setTimeout(pollGrid, 50);
            },
            // Re-apply annotations after any chart redraw (e.g. resize)
            updated: () => {
              applySiteNoteAnnotations();
              applySinglePointLine();
            }
          }
        },
        stroke: {
          curve: "smooth",
          width: 2
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.05
          }
        },
        tooltip: {
          theme: "light",
          shared: true,
          custom({ series, seriesIndex, dataPointIndex, w }) {
            const categoryLabel = w.globals.categoryLabels[dataPointIndex] || w.globals.labels[dataPointIndex] || "";
            let html = '<div class="monsterinsights-chart-tooltip">';
            html += '<div class="monsterinsights-chart-tooltip__date">' + categoryLabel + "</div>";
            for (let i = 0; i < series.length; i++) {
              const seriesName = w.globals.seriesNames[i] || "";
              if (!isCompareActive.value && /previous/i.test(seriesName)) continue;
              const value = series[i][dataPointIndex];
              if (value === void 0 || value === null) continue;
              const color = w.globals.colors[i] || "#228bee";
              const baseName = seriesName.replace(/\s*\(.*\)$/, "");
              const cfg = chartSeriesConfig.value?.find((c) => c.label === baseName);
              const metricKey = cfg?.metric;
              const isRate = metricKey && isRateMetric(metricKey);
              const isDuration = metricKey && isDurationMetric(metricKey);
              let displayValue;
              if (typeof value === "number") {
                if (isRate) {
                  displayValue = value.toFixed(2) + "%";
                } else if (isDuration) {
                  displayValue = value.toFixed(2) + " min";
                } else {
                  displayValue = value.toLocaleString();
                }
              } else {
                displayValue = value;
              }
              html += '<div class="monsterinsights-chart-tooltip__row">';
              html += '<span class="monsterinsights-chart-tooltip__dot" style="background:' + color + '"></span>';
              html += '<span class="monsterinsights-chart-tooltip__label">' + seriesName + ": </span>";
              html += '<span class="monsterinsights-chart-tooltip__value">' + displayValue + "</span>";
              html += "</div>";
            }
            const rawDates = chartRawDates.value;
            const notesByDate = siteNotesStore.siteNotesByDateCompact;
            if (rawDates.length > dataPointIndex) {
              const dateKey = rawDates[dataPointIndex];
              const dayNotes = notesByDate[dateKey];
              if (dayNotes && dayNotes.length) {
                html += '<div class="monsterinsights-chart-tooltip__notes"><hr />';
                dayNotes.forEach(function(note) {
                  const escaped = ("" + (note.note_title ?? "")).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
                  html += "<span>" + escaped + "</span><br />";
                });
                html += "</div>";
              }
            }
            html += "</div>";
            return html;
          }
        }
      };
    });
    let isApplyingAnnotations = false;
    function applySiteNoteAnnotations() {
      if (isApplyingAnnotations || !chartInstance || loading.value) return;
      isApplyingAnnotations = true;
      try {
        chartInstance.clearAnnotations();
        const annotations = siteNoteAnnotations.value;
        for (const annotation of annotations) {
          chartInstance.addPointAnnotation(annotation, false);
        }
      } catch {
      } finally {
        isApplyingAnnotations = false;
      }
    }
    function applySinglePointLine() {
      if (!chartInstance?.w?.globals?.dom?.baseEl) return;
      const categories = chartData.value?.categories || [];
      if (categories.length !== 1) return;
      const g = chartInstance.w.globals;
      const baseEl = g.dom.baseEl;
      baseEl.querySelector(".monsterinsights-single-point-line")?.remove();
      const svgEl = baseEl.querySelector("svg");
      if (!svgEl || !g.gridWidth) return;
      const seriesArr = chartData.value?.series || [];
      const values = seriesArr.map((s) => s.data?.[0] ?? 0).filter((v) => !isNaN(v) && v !== null);
      if (values.length < 2) return;
      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const minYAxis = g.minY;
      const maxYAxis = g.maxY;
      const yRange = maxYAxis - minYAxis;
      if (yRange <= 0) return;
      const gridX = g.translateX;
      const gridY = g.translateY;
      const gridW = g.gridWidth;
      const gridH = g.gridHeight;
      const topY = gridY + gridH - (maxVal - minYAxis) / yRange * gridH;
      const bottomY = gridY + gridH - (minVal - minYAxis) / yRange * gridH;
      const cx = gridX + gridW / 2;
      const ns = "http://www.w3.org/2000/svg";
      const line = document.createElementNS(ns, "line");
      line.classList.add("monsterinsights-single-point-line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", topY);
      line.setAttribute("x2", cx);
      line.setAttribute("y2", bottomY);
      line.setAttribute("stroke", chartColors.value?.[0] || "#228bee");
      line.setAttribute("stroke-width", "2");
      const inner = svgEl.querySelector(".apexcharts-inner");
      if (inner) {
        svgEl.insertBefore(line, inner);
      } else {
        svgEl.appendChild(line);
      }
    }
    watch(siteNoteAnnotations, () => {
      setTimeout(() => applySiteNoteAnnotations(), 50);
    });
    async function loadOverviewData() {
      const isUpsell = showProUpsell.value;
      if (!isUpsell) {
        loading.value = true;
      }
      error.value = null;
      const currentLoadId = ++overviewLoadId.value;
      const apiFilters = buildApiFilters(storeActiveFilters.value, storeActiveDevice.value);
      try {
        const data = await fetchOverviewData(
          props.dateRange,
          apiFilters,
          selectedOverviewMetricsForQuery.value,
          activeTab.value
        );
        if (currentLoadId !== overviewLoadId.value) return;
        if (!isUpsell) {
          overviewData.value = data?.overview ?? null;
          chartMetricsData.value = data?.chart_metrics ?? null;
        }
        emit("overview-data-loaded", data);
      } catch (err) {
        if (currentLoadId !== overviewLoadId.value) return;
        if (!isUpsell) {
          error.value = err?.message || err?.title || __$1("Error loading overview data.", "google-analytics-for-wordpress");
        }
        emit("overview-error", err);
      } finally {
        if (currentLoadId === overviewLoadId.value) {
          loading.value = false;
        }
      }
    }
    function setActiveTab(tabId) {
      overviewStore.setChartActiveTab(tabId);
      loadOverviewData();
    }
    function resetMetricsFilters() {
      const tabId = activeTab.value || "traffic";
      selectedMetrics.value = [...TAB_DEFAULT_OPTIONS[tabId] || []];
      isMetricsDropdownOpen.value = false;
      loadOverviewData();
    }
    function applyMetricsFilters() {
      isMetricsDropdownOpen.value = false;
      loadOverviewData();
    }
    watch(
      [storeActiveFilters, storeActiveDevice],
      () => {
        loadOverviewData();
      },
      { deep: true }
    );
    watch(
      () => [props.dateRange?.start, props.dateRange?.end, props.dateRange?.compareReport, props.dateRange?.compareStart, props.dateRange?.compareEnd],
      () => {
        if (props.dateRange?.start && props.dateRange?.end) {
          loadOverviewData();
        }
      },
      { deep: true }
    );
    async function onSiteNotesSaved() {
      await siteNotesStore.fetchNotes(props.dateRange, true);
      loadOverviewData();
    }
    onMounted(() => {
      loadOverviewData();
      siteNotesStore.fetchNotes(props.dateRange);
      siteNotesStore.fetchCategories();
    });
    onUnmounted(() => {
      if (singlePointPollTimer) {
        clearTimeout(singlePointPollTimer);
        singlePointPollTimer = null;
      }
      chartInstance = null;
    });
    const displayKeyMetricsWithChange = computed(() => {
      if (showProUpsell.value) {
        const tabId = activeTab.value || "traffic";
        return SAMPLE_KEY_METRICS_BY_TAB[tabId] || SAMPLE_KEY_METRICS_BY_TAB.traffic;
      }
      return keyMetricsWithChange.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(activeTabs.value, (tab) => {
            return openBlock(), createElementBlock("button", {
              key: tab.id,
              type: "button",
              class: normalizeClass(["monsterinsights-overview-tab", { "monsterinsights-overview-tab--active": activeTab.value === tab.id }]),
              onClick: ($event) => setActiveTab(tab.id)
            }, [
              createVNode(Icon, {
                name: tab.icon,
                size: 20
              }, null, 8, ["name"]),
              createBaseVNode("span", _hoisted_4$6, toDisplayString(tab.label), 1)
            ], 10, _hoisted_3$7);
          }), 128))
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["monsterinsights-overview-report-traffic-chart-content", { "monsterinsights-overview-report-traffic-chart-content--has-overlay": showProUpsell.value }])
        }, [
          createBaseVNode("div", _hoisted_5$6, [
            createBaseVNode("div", _hoisted_6$6, [
              createBaseVNode("div", _hoisted_7$6, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(displayKeyMetricsWithChange.value, (metric, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: metric.id,
                    class: normalizeClass(["monsterinsights-overview-metric", { "monsterinsights-overview-metric--highlighted": index === 0 }])
                  }, [
                    createBaseVNode("span", _hoisted_8$6, toDisplayString(metric.label), 1),
                    createBaseVNode("div", _hoisted_9$5, [
                      createBaseVNode("span", _hoisted_10$4, toDisplayString(unref(formatMetricValue2)(metric.value, metric.type)), 1),
                      metric.percentChange ? (openBlock(), createElementBlock("span", {
                        key: 0,
                        class: normalizeClass(["monsterinsights-overview-metric__percent-change", metric.percentChange.positive ? "monsterinsights-overview-metric__percent-change--positive" : "monsterinsights-overview-metric__percent-change--negative"])
                      }, toDisplayString(metric.percentChange.positive ? "+" : "-") + toDisplayString(Math.abs(metric.percentChange.value)) + "%", 3)) : createCommentVNode("", true),
                      isCompareActive.value && index === 0 && unref(currentDateRangeLabel) ? (openBlock(), createElementBlock("span", _hoisted_11$4, toDisplayString(unref(currentDateRangeLabel)), 1)) : createCommentVNode("", true)
                    ])
                  ], 2);
                }), 128))
              ]),
              createVNode(_sfc_main$b, {
                open: isMetricsDropdownOpen.value,
                "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isMetricsDropdownOpen.value = $event),
                "metrics-options": metricsOptions.value,
                "selected-metrics": selectedMetrics.value,
                "onUpdate:selectedMetrics": _cache[1] || (_cache[1] = ($event) => selectedMetrics.value = $event),
                onApply: applyMetricsFilters,
                onReset: resetMetricsFilters,
                onProUpsell: _cache[2] || (_cache[2] = ($event) => unref(overviewStore).openProModal())
              }, null, 8, ["open", "metrics-options", "selected-metrics"])
            ]),
            isCompareActive.value && unref(keyMetricsPrevious).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_12$4, [
              createBaseVNode("div", _hoisted_13$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(keyMetricsPrevious), (metric, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: metric.id,
                    class: "monsterinsights-overview-metric monsterinsights-overview-metric--previous"
                  }, [
                    createBaseVNode("span", _hoisted_14$3, toDisplayString(metric.label), 1),
                    createBaseVNode("div", _hoisted_15$3, [
                      createBaseVNode("span", _hoisted_16$3, toDisplayString(unref(formatMetricValue2)(metric.value, metric.type)), 1),
                      isCompareActive.value && index === 0 && unref(previousDateRangeLabel) ? (openBlock(), createElementBlock("span", _hoisted_17$3, toDisplayString(unref(previousDateRangeLabel)), 1)) : createCommentVNode("", true)
                    ])
                  ]);
                }), 128))
              ])
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_18$3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(chartLegends), (legend) => {
              return openBlock(), createElementBlock("div", {
                class: "monsterinsights-traffic-chart-legend",
                key: legend.id
              }, [
                createBaseVNode("span", {
                  class: "monsterinsights-traffic-chart-legend__dot",
                  style: normalizeStyle({ backgroundColor: legend.color })
                }, null, 4),
                createBaseVNode("span", _hoisted_19$3, toDisplayString(legend.label), 1)
              ]);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_20$3, [
            loading.value ? (openBlock(), createElementBlock("div", _hoisted_21$2, [
              createVNode(LoadingSpinnerInline)
            ])) : error.value ? (openBlock(), createElementBlock("div", _hoisted_22$2, toDisplayString(error.value), 1)) : (openBlock(), createBlock(ApexLineChart, {
              key: `overview-chart-${activeTab.value}`,
              data: unref(chartData),
              height: 370,
              "show-legend": false,
              colors: unref(chartColors),
              "stroke-dash-array": unref(chartStrokeDashArray),
              "chart-options": chartOptions.value,
              "chart-type": "area"
            }, null, 8, ["data", "colors", "stroke-dash-array", "chart-options"]))
          ]),
          createVNode(_sfc_main$a, { show: showProUpsell.value }, null, 8, ["show"])
        ], 2),
        createBaseVNode("div", _hoisted_23$1, [
          !unref(siteNotesStore).showSiteNotes ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            class: "monsterinsights-site-notes-toggle__btn",
            onClick: _cache[3] || (_cache[3] = ($event) => unref(siteNotesStore).toggleSiteNotes())
          }, [
            createVNode(Icon, {
              name: "writing-tool",
              size: 16
            }),
            createBaseVNode("span", null, toDisplayString(unref(__$1)("Site Notes", "google-analytics-for-wordpress")), 1)
          ])) : createCommentVNode("", true)
        ]),
        unref(siteNotesStore).showSiteNotes ? (openBlock(), createBlock(_sfc_main$c, {
          key: 0,
          "date-range": __props.dateRange,
          onRefreshOverviewReport: onSiteNotesSaved
        }, null, 8, ["date-range"])) : createCommentVNode("", true),
        unref(siteNotesStore).showSiteNotes ? (openBlock(), createElementBlock("div", _hoisted_24$1, [
          createBaseVNode("button", {
            class: "monsterinsights-site-notes-toggle__btn",
            onClick: _cache[4] || (_cache[4] = withModifiers(($event) => unref(siteNotesStore).toggleSiteNotes(), ["prevent"])),
            type: "button"
          }, [
            createVNode(Icon, {
              name: "writing-tool",
              size: 16
            }),
            createBaseVNode("span", null, toDisplayString(unref(__$1)("Close Site Notes", "google-analytics-for-wordpress")), 1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$6 = { class: "monsterinsights-overview-key-metrics" };
const _hoisted_2$6 = { class: "monsterinsights-overview-key-metrics__header" };
const _hoisted_3$6 = { class: "monsterinsights-overview-key-metrics__title" };
const _hoisted_4$5 = ["href"];
const _hoisted_5$5 = { class: "monsterinsights-overview-key-metrics__container" };
const _hoisted_6$5 = { class: "monsterinsights-overview-key-metrics__item" };
const _hoisted_7$5 = { class: "monsterinsights-overview-key-metrics__label" };
const _hoisted_8$5 = { class: "monsterinsights-overview-key-metrics__value-row" };
const _hoisted_9$4 = { class: "monsterinsights-overview-key-metrics__value" };
const _sfc_main$8 = {
  __name: "OverviewKeyMetrics",
  props: {
    keyMetricsData: {
      type: [Object, Array],
      default: null
    },
    activeTab: {
      type: String,
      default: "traffic"
    },
    viewFullReportUrl: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const CHANNEL_GROUP_MAP = {
      "Organic Search": "organic",
      "Organic Shopping": "organic",
      "Organic Social": "organic",
      "Organic Video": "organic",
      Direct: "direct",
      Referral: "referral",
      Social: "social",
      "Paid Search": "paid",
      "Paid Shopping": "paid",
      "Paid Social": "paid",
      "Paid Video": "paid",
      Display: "paid",
      Email: "email"
    };
    const KEY_METRICS_BY_TAB = {
      traffic: [
        { id: "organic", label: __$1("Organic Sessions", "google-analytics-for-wordpress"), channelGroup: true },
        { id: "social", label: __$1("Social Sessions", "google-analytics-for-wordpress"), channelGroup: true },
        { id: "paid", label: __$1("Paid Media Sessions", "google-analytics-for-wordpress"), channelGroup: true },
        { id: "email", label: __$1("Email Sessions", "google-analytics-for-wordpress"), channelGroup: true },
        { id: "referral", label: __$1("Referral Sessions", "google-analytics-for-wordpress"), channelGroup: true },
        { id: "direct", label: __$1("Direct Sessions", "google-analytics-for-wordpress"), channelGroup: true }
      ],
      engagement: [
        { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), apiKey: "sessions" },
        { id: "engagementRate", label: __$1("Engagement Rate", "google-analytics-for-wordpress"), apiKey: "engagementRate", type: "percent" },
        { id: "bounceRate", label: __$1("Bounce Rate", "google-analytics-for-wordpress"), apiKey: "bounceRate", type: "percent" },
        { id: "newUsers", label: __$1("New Users", "google-analytics-for-wordpress"), apiKey: "newUsers" },
        { id: "returningUsers", label: __$1("Returning Users", "google-analytics-for-wordpress"), apiKey: "returningUsers" },
        { id: "sessionDuration", label: __$1("Session Duration", "google-analytics-for-wordpress"), apiKey: "averageSessionDuration", type: "duration" }
      ],
      referrals: [
        { id: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), apiKey: "sessions" },
        { id: "engagedSessions", label: __$1("Engaged Sessions", "google-analytics-for-wordpress"), apiKey: "engagedSessions" },
        { id: "users", label: __$1("Users", "google-analytics-for-wordpress"), apiKey: "totalUsers" }
      ],
      ecommerce: [
        { id: "transactions", label: __$1("Transactions", "google-analytics-for-wordpress"), apiKey: "ecommercePurchases" },
        { id: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), apiKey: "totalRevenue", type: "currency" },
        { id: "aov", label: __$1("AOV", "google-analytics-for-wordpress"), apiKey: "averagePurchaseRevenue", type: "currency" },
        { id: "addToCarts", label: __$1("Add to Carts", "google-analytics-for-wordpress"), apiKey: "addToCarts" },
        { id: "conversionRate", label: __$1("Conversion Rate", "google-analytics-for-wordpress"), apiKey: "conversionRate", type: "percent" },
        { id: "abandonmentRate", label: __$1("Abandonment Rate", "google-analytics-for-wordpress"), apiKey: "abandonmentRate", type: "percent" }
      ]
    };
    const RATE_METRICS2 = /* @__PURE__ */ new Set(["engagementRate", "bounceRate", "sessionKeyEventRate", "conversionRate", "abandonmentRate"]);
    const AVG_METRICS2 = /* @__PURE__ */ new Set(["averageSessionDuration", "averagePurchaseRevenue"]);
    function formatDisplayValue(val, type) {
      const n = Number(val);
      if (val == null || typeof val !== "number" && isNaN(n)) return "0";
      const num = typeof val === "number" ? val : n;
      if (type === "percent") return `${Number(num).toFixed(1)}%`;
      if (type === "currency") {
        const currency = getMiGlobal("currency", "USD") || "USD";
        return new Intl.NumberFormat(void 0, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
      }
      if (type === "duration") {
        const sec = Math.round(num);
        const m2 = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m2}:${String(s).padStart(2, "0")}`;
      }
      if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
      if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
      return Number(num).toLocaleString();
    }
    function aggregateTabMetricsRows(rows, metricNames, periodIdx = 1) {
      if (!Array.isArray(rows) || rows.length === 0 || !Array.isArray(metricNames) || !metricNames.length) return {};
      const firstRow = rows[0];
      let rawFirst = firstRow?.m ?? [];
      if (rawFirst.length === 1 && Array.isArray(rawFirst[0]) && rawFirst[0].length >= metricNames.length) {
        rawFirst = rawFirst[0];
      }
      rawFirst.length >= metricNames.length && Array.isArray(rawFirst[0]) && rawFirst[0].length === 2;
      const sessionsIdx = metricNames.indexOf("sessions");
      const sums = {};
      const rateWeighted = {};
      const avgWeighted = {};
      function read(cell) {
        if (Array.isArray(cell) && cell.length >= 2) return parseFloat(cell[periodIdx]) || 0;
        return parseFloat(cell) || 0;
      }
      for (const row of rows) {
        let metricsRow = row?.m ?? [];
        if (metricsRow.length === 1 && Array.isArray(metricsRow[0])) metricsRow = metricsRow[0];
        if (metricsRow.length < metricNames.length) continue;
        const sessionWeight = sessionsIdx >= 0 ? read(metricsRow[sessionsIdx]) || 0 : 1;
        for (let i = 0; i < metricNames.length; i++) {
          const name = metricNames[i];
          const val = read(metricsRow[i]);
          if (RATE_METRICS2.has(name)) {
            if (!rateWeighted[i]) rateWeighted[i] = { num: 0, denom: 0 };
            rateWeighted[i].num += val * sessionWeight;
            rateWeighted[i].denom += sessionWeight;
          } else if (AVG_METRICS2.has(name)) {
            if (!avgWeighted[i]) avgWeighted[i] = { num: 0, denom: 0 };
            avgWeighted[i].num += val * sessionWeight;
            avgWeighted[i].denom += sessionWeight;
          } else {
            sums[name] = (sums[name] ?? 0) + val;
          }
        }
      }
      const result = { ...sums };
      for (let i = 0; i < metricNames.length; i++) {
        const name = metricNames[i];
        if (RATE_METRICS2.has(name)) {
          const rw = rateWeighted[i];
          result[name] = rw && rw.denom > 0 ? rw.num / rw.denom * 100 : 0;
        } else if (AVG_METRICS2.has(name)) {
          const aw = avgWeighted[i];
          result[name] = aw && aw.denom > 0 ? aw.num / aw.denom : 0;
        }
      }
      if (result.totalUsers != null && result.newUsers != null) {
        result.returningUsers = Math.max(0, (result.totalUsers ?? 0) - (result.newUsers ?? 0));
      }
      if (result.sessions != null && result.sessions > 0 && result.ecommercePurchases != null) {
        result.conversionRate = (result.ecommercePurchases ?? 0) / result.sessions * 100;
      }
      if (result.addToCarts != null && result.addToCarts > 0 && result.ecommercePurchases != null) {
        result.abandonmentRate = (result.addToCarts - result.ecommercePurchases) / result.addToCarts * 100;
      }
      return result;
    }
    function aggregateRowsByChannel(data) {
      const rows = Array.isArray(data) ? data : Array.isArray(data?.rows) ? data.rows : [];
      const currentTotals = {};
      const compareTotals = {};
      const isCombinedFormat = rows.length > 0 && Array.isArray(rows[0]?.m?.[0]) && rows[0].m[0].length >= 2;
      for (const row of rows) {
        const channelGroup = row?.d?.[1] ?? "(not set)";
        const metricId = CHANNEL_GROUP_MAP[channelGroup] ?? null;
        if (!metricId) continue;
        const m0 = row?.m?.[0];
        const currentVal = Array.isArray(m0) ? parseFloat(m0[0]) || 0 : parseFloat(m0) || 0;
        const compareVal = isCombinedFormat && Array.isArray(m0) ? parseFloat(m0[1]) || 0 : 0;
        currentTotals[metricId] = (currentTotals[metricId] ?? 0) + currentVal;
        if (isCombinedFormat) compareTotals[metricId] = (compareTotals[metricId] ?? 0) + compareVal;
      }
      return { current: currentTotals, compare: compareTotals };
    }
    function calculateTrend(current, previous) {
      if (previous == null || previous === 0 || isNaN(Number(previous))) return 0;
      const curr = Number(current) || 0;
      const prev = Number(previous) || 0;
      if (prev === 0) return 0;
      return Math.round((curr - prev) / prev * 1e3) / 10;
    }
    function parseTrafficKeyMetrics(keyMetricsData) {
      if (!keyMetricsData) {
        return KEY_METRICS_BY_TAB.traffic.map(({ id, label }) => ({ id, label, value: "0", trend: null }));
      }
      const currentData = keyMetricsData?.key_metrics ?? keyMetricsData;
      const compareData = keyMetricsData?.key_metrics_compare ?? null;
      const { current: currentTotals, compare: compareFromCurrent } = aggregateRowsByChannel(currentData);
      const previousTotals = compareData != null ? aggregateRowsByChannel(compareData).current : Object.keys(compareFromCurrent).length > 0 ? compareFromCurrent : {};
      const hasCompare = Object.keys(previousTotals).length > 0 && KEY_METRICS_BY_TAB.traffic.some(({ id }) => (previousTotals[id] ?? 0) !== 0);
      return KEY_METRICS_BY_TAB.traffic.map(({ id, label }) => {
        const current = currentTotals[id] ?? 0;
        const previous = previousTotals[id] ?? 0;
        const trend = hasCompare ? calculateTrend(current, previous) : null;
        const n = Number(current);
        let value = "0";
        if (!isNaN(n)) value = n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : n.toLocaleString();
        return { id, label, value, trend: trend ?? null };
      });
    }
    function parseTabKeyMetrics(keyMetricsData, activeTab) {
      const definitions = KEY_METRICS_BY_TAB[activeTab] || KEY_METRICS_BY_TAB.traffic;
      if (definitions.some((d) => d.channelGroup)) return parseTrafficKeyMetrics(keyMetricsData);
      const tabRows = keyMetricsData?.tab_metrics?.rows ?? keyMetricsData?.tab_metrics;
      if (!Array.isArray(tabRows) || tabRows.length === 0) {
        return definitions.map(({ id, label }) => ({ id, label, value: "0", trend: null }));
      }
      const metricNames = getTabMetricsForQuery(activeTab);
      const firstRow = tabRows[0];
      const firstRowM = firstRow?.m ?? [];
      const firstCell = Array.isArray(firstRowM) && firstRowM.length > 0 ? firstRowM[0] : null;
      const isCompare = Array.isArray(firstCell) && (firstCell.length === 2 && (typeof firstCell[0] === "number" || !Number.isNaN(parseFloat(firstCell[0]))) || firstCell.length > 0 && Array.isArray(firstCell[0]) && firstCell[0].length === 2);
      const currentAgg = aggregateTabMetricsRows(tabRows, metricNames, isCompare ? 1 : 0);
      const previousAgg = isCompare ? aggregateTabMetricsRows(tabRows, metricNames, 0) : null;
      return definitions.map(({ id, label, apiKey, type }) => {
        const key = apiKey || id;
        const current = currentAgg[key] ?? 0;
        const previous = previousAgg != null ? previousAgg[key] ?? 0 : null;
        const trend = previous != null ? calculateTrend(current, previous) : null;
        return {
          id,
          label,
          value: formatDisplayValue(current, type),
          trend: trend ?? null
        };
      });
    }
    const metrics = computed(() => {
      const tab = props.activeTab || "traffic";
      const data = props.keyMetricsData;
      if (tab === "traffic") {
        return parseTrafficKeyMetrics(data);
      }
      return parseTabKeyMetrics(data, tab);
    });
    const getTrendClass = (trend) => {
      if (trend == null) return "";
      return trend >= 0 ? "monsterinsights-overview-key-metrics__trend--positive" : "monsterinsights-overview-key-metrics__trend--negative";
    };
    const formatTrend = (trend) => {
      const absValue = Math.abs(trend);
      return `${absValue}%`;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$6, [
          createBaseVNode("h2", _hoisted_3$6, toDisplayString(unref(__$1)("Key Metrics", "google-analytics-for-wordpress")), 1),
          __props.viewFullReportUrl ? (openBlock(), createElementBlock("a", {
            key: 0,
            href: __props.viewFullReportUrl,
            class: "monsterinsights-overview-key-metrics__link"
          }, [
            createBaseVNode("span", null, toDisplayString(unref(__$1)("View Full Report", "google-analytics-for-wordpress")), 1),
            createVNode(Icon, {
              name: "chevron-right",
              size: 20
            })
          ], 8, _hoisted_4$5)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_5$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(metrics.value, (metric) => {
            return openBlock(), createElementBlock("div", {
              key: metric.id,
              class: "monsterinsights-overview-key-metrics__item-wrapper"
            }, [
              createBaseVNode("div", _hoisted_6$5, [
                createBaseVNode("span", _hoisted_7$5, toDisplayString(metric.label), 1),
                createBaseVNode("div", _hoisted_8$5, [
                  createBaseVNode("span", _hoisted_9$4, toDisplayString(metric.value), 1),
                  metric.trend != null ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    class: normalizeClass(["monsterinsights-overview-key-metrics__trend", getTrendClass(metric.trend)])
                  }, [
                    createVNode(Icon, {
                      name: metric.trend >= 0 ? "trend-up" : "trend-down",
                      size: 16
                    }, null, 8, ["name"]),
                    createBaseVNode("span", null, toDisplayString(formatTrend(metric.trend)), 1)
                  ], 2)) : createCommentVNode("", true)
                ])
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
};
function toSortableValue(val) {
  if (val === void 0 || val === null) {
    return { isNumeric: false, num: 0, str: "" };
  }
  const rawStr = String(val);
  const cleaned = rawStr.replace(/[$,%]/g, "").replace(/,/g, "").trim();
  const suffixMatch = cleaned.match(/^([0-9.+-]+)\s*([KkMm]?)$/);
  if (suffixMatch) {
    const base = parseFloat(suffixMatch[1]);
    if (!Number.isNaN(base)) {
      const suffix = suffixMatch[2].toUpperCase();
      const multiplier = suffix === "K" ? 1e3 : suffix === "M" ? 1e6 : 1;
      return { isNumeric: true, num: base * multiplier, str: rawStr.toLowerCase() };
    }
  }
  const num = parseFloat(cleaned);
  if (!Number.isNaN(num)) {
    return { isNumeric: true, num, str: rawStr.toLowerCase() };
  }
  return { isNumeric: false, num: 0, str: rawStr.toLowerCase() };
}
function useSortableTable(rowsSource) {
  const sortKey = ref(null);
  const sortDirection = ref("desc");
  const sortedRows = computed(() => {
    const rows = Array.isArray(rowsSource?.value) ? [...rowsSource.value] : [];
    if (!sortKey.value) {
      return rows;
    }
    return rows.sort((a, b) => {
      const sortOverride = `_sort_${sortKey.value}`;
      const aVal = a?.[sortOverride] ?? a?.[sortKey.value];
      const bVal = b?.[sortOverride] ?? b?.[sortKey.value];
      const aSortable = toSortableValue(aVal);
      const bSortable = toSortableValue(bVal);
      let compare = 0;
      if (aSortable.isNumeric && bSortable.isNumeric) {
        compare = aSortable.num === bSortable.num ? 0 : aSortable.num > bSortable.num ? 1 : -1;
      } else {
        compare = aSortable.str.localeCompare(bSortable.str, void 0, {
          numeric: true,
          sensitivity: "base"
        });
      }
      return sortDirection.value === "asc" ? compare : -compare;
    });
  });
  function onColumnHeaderClick(column) {
    if (column.sortable === false) {
      return;
    }
    if (sortKey.value === column.key) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = column.key;
      sortDirection.value = "desc";
    }
  }
  return {
    sortKey,
    sortDirection,
    sortedRows,
    onColumnHeaderClick,
    toSortableValue
  };
}
function formatNum(n) {
  const num = Number(n);
  if (Number.isNaN(num)) {
    return "0";
  }
  return num >= 1e3 ? `${(num / 1e3).toFixed(1)}K` : num.toLocaleString();
}
function formatPct(n) {
  const num = Number(n);
  return `${(Number.isNaN(num) ? 0 : num).toFixed(1)}%`;
}
function formatCurr(n, currencyCode = null) {
  const num = Number(n);
  const value = Number.isNaN(num) ? 0 : num;
  const currency = currencyCode || getMiGlobal("currency", "USD") || "USD";
  let formatted = new Intl.NumberFormat(void 0, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
  if (currency === "USD") {
    formatted = formatted.replace("US$", "$");
  }
  return formatted;
}
const _hoisted_1$5 = {
  id: "report-table-modal-title",
  class: "monsterinsights-report-table-modal__title"
};
const _hoisted_2$5 = { class: "monsterinsights-report-table-modal__search" };
const _hoisted_3$5 = ["placeholder"];
const _hoisted_4$4 = { class: "monsterinsights-report-table-modal__table-wrapper" };
const _hoisted_5$4 = { class: "monsterinsights-report-table-modal__table-scroll" };
const _hoisted_6$4 = { class: "monsterinsights-report-table-modal__table" };
const _hoisted_7$4 = ["onClick"];
const _hoisted_8$4 = { class: "monsterinsights-report-table-modal__th-content" };
const _hoisted_9$3 = {
  key: 0,
  class: "monsterinsights-report-table-modal__cell-with-icon"
};
const _hoisted_10$3 = { key: 1 };
const _hoisted_11$3 = { key: 0 };
const _hoisted_12$3 = { class: "monsterinsights-report-table-modal__totals-row" };
const _sfc_main$7 = {
  __name: "ReportTableModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      default: () => []
    },
    /** Label for the first column in the totals row. Defaults to "Totals". */
    totalLabel: {
      type: String,
      default: ""
    },
    /** Column key used for the row gradient bar. When not set, uses sort column or first metric column. */
    barMetricKey: {
      type: String,
      default: ""
    },
    /** Whether to show the totals row in the table footer. */
    showTotals: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue", "sort"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchQuery = ref("");
    const dialogRef = ref(null);
    const rowsSource = computed(() => props.rows);
    const { sortKey, sortedRows, onColumnHeaderClick, toSortableValue: toSortableValue2 } = useSortableTable(rowsSource);
    function handleColumnHeaderClick(column) {
      onColumnHeaderClick(column);
      emit("sort", column.key);
    }
    const gradientColors = /* @__PURE__ */ (() => {
      return { c1: "#EDE5FF", c2: "#D0E8FF", c3: "#FFFFFF" };
    })();
    const filteredRows = computed(() => {
      const query = searchQuery.value.trim().toLowerCase();
      const sourceRows = sortedRows.value;
      if (!query) return sourceRows;
      return sourceRows.filter(
        (row) => props.columns.some((col) => {
          const value = row[col.key];
          return value !== void 0 && value !== null && String(value).toLowerCase().includes(query);
        })
      );
    });
    const filteredRowsWithBar = computed(() => {
      const rows = filteredRows.value;
      const columns = props.columns || [];
      const firstColKey = columns[0]?.key;
      const key = sortKey.value;
      if (rows.length === 0) return [];
      const metricKey = props.barMetricKey || (key && key !== firstColKey ? key : columns[1]?.key || null);
      if (!metricKey) {
        return rows.map((row) => ({ row, barPercent: 0 }));
      }
      const getNum = (row) => toSortableValue2(row?.[metricKey]).num;
      const values = rows.map(getNum);
      const total = values.reduce((a, b) => a + b, 0);
      if (total <= 0) {
        return rows.map((row) => ({ row, barPercent: 0 }));
      }
      return rows.map((row, i) => ({
        row,
        barPercent: Math.min(100, values[i] / total * 100)
      }));
    });
    function getRowGradientStyle(barPercent) {
      if (barPercent <= 0) return {};
      const { c1, c2, c3 } = gradientColors;
      const mid = barPercent / 2;
      return {
        background: `linear-gradient(to right, ${c1} 0%, ${c2} ${mid}%, ${c3} ${barPercent}%, ${c3} 100%)`
      };
    }
    const totals = computed(() => {
      const rows = filteredRows.value;
      const columns = props.columns;
      if (!rows || rows.length === 0 || !columns || columns.length === 0) return {};
      const parseNum = (val) => {
        if (val === void 0 || val === null) return 0;
        const str = String(val).replace(/[$,%K]/g, "").replace(/,/g, "");
        return parseFloat(str) || 0;
      };
      const result = {};
      const firstCol = columns[0];
      result[firstCol.key] = props.totalLabel || __$1("Totals", "google-analytics-for-wordpress");
      const currencyCode = getMiGlobal$1("currency", "USD") || "USD";
      const currencySample = formatCurr(0, currencyCode);
      const currencySymbol = currencySample.replace(/[\d\s.,]/g, "").trim() || "$";
      const currencySymbolEscaped = currencySymbol.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      columns.slice(1).forEach((col) => {
        if (col.excludeFromTotals) {
          result[col.key] = "";
          return;
        }
        const sampleVal = rows[0]?.[col.key] ?? "";
        const sampleStr = String(sampleVal);
        const isCurrency = sampleStr.startsWith(currencySymbol);
        const isPercent = sampleStr.endsWith("%");
        const parseCell = isCurrency ? (val) => {
          if (val === void 0 || val === null) return 0;
          const str = String(val).replace(new RegExp(currencySymbolEscaped, "g"), "").replace(/[%,K]/g, "").replace(/,/g, "");
          return parseFloat(str) || 0;
        } : parseNum;
        const values = rows.map((row) => parseCell(row[col.key]));
        if (isPercent) {
          const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
          result[col.key] = `${avg.toFixed(1)}%`;
        } else if (isCurrency) {
          const sum = values.reduce((a, b) => a + b, 0);
          result[col.key] = formatCurr(sum);
        } else {
          const sum = values.reduce((a, b) => a + b, 0);
          result[col.key] = sum.toLocaleString();
        }
      });
      return result;
    });
    function close() {
      searchQuery.value = "";
      emit("update:modelValue", false);
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
          document.body.style.overflow = "hidden";
          document.addEventListener("keydown", handleKeydown);
          setTimeout(() => {
            const focusable = dialogRef.value?.querySelector?.('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable?.focus?.();
          }, 0);
        } else {
          document.body.style.overflow = "";
          document.removeEventListener("keydown", handleKeydown);
        }
      },
      { immediate: true }
    );
    onUnmounted(() => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeydown);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        __props.modelValue ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "monsterinsights-report-table-modal-overlay",
          onClick: withModifiers(close, ["self"])
        }, [
          createBaseVNode("div", {
            class: "monsterinsights-report-table-modal",
            ref_key: "dialogRef",
            ref: dialogRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "report-table-modal-title"
          }, [
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-report-table-modal__close",
              "aria-label": "Close modal",
              onClick: close
            }, [
              createVNode(Icon, {
                name: "close",
                size: 16
              })
            ]),
            createBaseVNode("h3", _hoisted_1$5, toDisplayString(__props.title), 1),
            createBaseVNode("div", _hoisted_2$5, [
              createVNode(Icon, {
                name: "search",
                size: 16,
                class: "monsterinsights-report-table-modal__search-icon"
              }),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
                type: "text",
                class: "monsterinsights-report-table-modal__search-input",
                placeholder: unref(__$1)("Search", "google-analytics-for-wordpress")
              }, null, 8, _hoisted_3$5), [
                [vModelText, searchQuery.value]
              ])
            ]),
            createBaseVNode("div", _hoisted_4$4, [
              createBaseVNode("div", _hoisted_5$4, [
                createBaseVNode("table", _hoisted_6$4, [
                  createBaseVNode("thead", null, [
                    createBaseVNode("tr", null, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
                        return openBlock(), createElementBlock("th", {
                          key: column.key,
                          class: normalizeClass({ "monsterinsights-report-table-modal__th--sortable": column.sortable !== false }),
                          onClick: ($event) => handleColumnHeaderClick(column)
                        }, [
                          createBaseVNode("div", _hoisted_8$4, [
                            createBaseVNode("span", null, toDisplayString(column.label), 1),
                            column.sortable !== false ? (openBlock(), createBlock(Icon, {
                              key: 0,
                              name: "sort",
                              size: 12
                            })) : createCommentVNode("", true)
                          ])
                        ], 10, _hoisted_7$4);
                      }), 128))
                    ])
                  ]),
                  createBaseVNode("tbody", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(filteredRowsWithBar.value, (item, rowIndex) => {
                      return openBlock(), createElementBlock("tr", {
                        key: rowIndex,
                        style: normalizeStyle(getRowGradientStyle(item.barPercent))
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
                          return openBlock(), createElementBlock("td", {
                            key: column.key
                          }, [
                            column.iconKey && item.row[column.iconKey] ? (openBlock(), createElementBlock("div", _hoisted_9$3, [
                              createVNode(Icon, {
                                name: item.row[column.iconKey],
                                size: 20
                              }, null, 8, ["name"]),
                              createBaseVNode("span", null, toDisplayString(item.row[column.key]), 1)
                            ])) : (openBlock(), createElementBlock("span", _hoisted_10$3, toDisplayString(item.row[column.key]), 1))
                          ]);
                        }), 128))
                      ], 4);
                    }), 128))
                  ]),
                  __props.showTotals && totals.value && Object.keys(totals.value).length ? (openBlock(), createElementBlock("tfoot", _hoisted_11$3, [
                    createBaseVNode("tr", _hoisted_12$3, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
                        return openBlock(), createElementBlock("td", {
                          key: column.key
                        }, toDisplayString(totals.value[column.key] || ""), 1);
                      }), 128))
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ])
            ])
          ], 512)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1$4 = { class: "monsterinsights-overview-report-table" };
const _hoisted_2$4 = { class: "monsterinsights-overview-report-table__header" };
const _hoisted_3$4 = { class: "monsterinsights-overview-report-table__title" };
const _hoisted_4$3 = {
  key: 0,
  class: "monsterinsights-overview-report-table__demo-badge"
};
const _hoisted_5$3 = { class: "monsterinsights-overview-report-table__header-right" };
const _hoisted_6$3 = {
  key: 0,
  class: "monsterinsights-overview-report-table__tabs"
};
const _hoisted_7$3 = ["onClick"];
const _hoisted_8$3 = {
  key: 0,
  class: "monsterinsights-overview-report-table__tab-divider"
};
const _hoisted_9$2 = ["href"];
const _hoisted_10$2 = { class: "monsterinsights-overview-report-table__table-wrapper" };
const _hoisted_11$2 = { class: "monsterinsights-overview-report-table__table" };
const _hoisted_12$2 = ["onClick"];
const _hoisted_13$2 = { class: "monsterinsights-overview-report-table__th-content" };
const _hoisted_14$2 = {
  key: 0,
  class: "monsterinsights-overview-report-table__row--loading"
};
const _hoisted_15$2 = ["colspan"];
const _hoisted_16$2 = {
  key: 1,
  class: "monsterinsights-overview-report-table__row--empty"
};
const _hoisted_17$2 = ["colspan"];
const _hoisted_18$2 = {
  key: 0,
  class: "monsterinsights-overview-report-table__cell-with-icon"
};
const _hoisted_19$2 = { key: 1 };
const _hoisted_20$2 = {
  key: 0,
  class: "monsterinsights-overview-report-table__load-more"
};
const _sfc_main$6 = {
  __name: "OverviewReportTable",
  props: {
    title: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      default: () => []
    },
    /** When true, shows a loading spinner and "Loading…" in the table body. */
    loading: {
      type: Boolean,
      default: false
    },
    hasLoadMore: {
      type: Boolean,
      default: false
    },
    showViewFullReport: {
      type: Boolean,
      default: true
    },
    /** When set, "View Full Report" is rendered as a link to this URL (e.g. report detail page). When empty, it emits 'view-full-report' on click. */
    viewFullReportUrl: {
      type: String,
      default: ""
    },
    rowLimit: {
      type: Number,
      default: 10
    },
    /** Optional. Column key used for the row gradient bar (share of total). When not set, uses sort column or first metric column (index 1). Use when the first metric column is not numeric (e.g. eCommerce Data: pass "revenue"). */
    barMetricKey: {
      type: String,
      default: ""
    },
    /** Label for the first column in the modal totals row (e.g. "Total Conv. Rate"). Defaults to "Totals". */
    totalLabel: {
      type: String,
      default: ""
    },
    /** Optional default sort column key. When set, the table starts sorted by this column (descending). */
    defaultSortKey: {
      type: String,
      default: ""
    },
    /** Whether to show the totals row in the modal table footer. */
    showTotals: {
      type: Boolean,
      default: true
    },
    /** Addon slug required for this table (e.g. 'page_insights'). When set and addon is inactive, Load More shows addon modal. */
    requiredAddon: {
      type: String,
      default: ""
    },
    /** Display name for the required addon. */
    requiredAddonName: {
      type: String,
      default: ""
    }
  },
  emits: ["update:activeTab", "view-full-report", "sort"],
  setup(__props, { emit: __emit }) {
    const reportTableModalOpen = ref(false);
    const proModalOpen = ref(false);
    const isLite = computed(() => true);
    const props = __props;
    const emit = __emit;
    const rowsSource = computed(() => props.rows);
    const { sortKey, sortDirection, sortedRows, onColumnHeaderClick, toSortableValue: toSortableValue2 } = useSortableTable(rowsSource);
    if (props.defaultSortKey) {
      sortKey.value = props.defaultSortKey;
      sortDirection.value = "desc";
    }
    const needsAddonGate = computed(
      () => !!props.requiredAddon && !isAddonActive(props.requiredAddon)
    );
    function handleLoadMoreClick() {
      if (isLite.value || needsAddonGate.value) {
        proModalOpen.value = true;
      } else {
        reportTableModalOpen.value = true;
      }
    }
    function handleColumnHeaderClick(column) {
      onColumnHeaderClick(column);
      emit("sort", column.key);
    }
    const displayedRows = computed(() => {
      const baseRows = sortedRows.value;
      if (props.rowLimit != null && props.rowLimit > 0) {
        return baseRows.slice(0, props.rowLimit);
      }
      return baseRows;
    });
    const gradientColors = /* @__PURE__ */ (() => {
      return { c1: "#EDE5FF", c2: "#D0E8FF", c3: "#FFFFFF" };
    })();
    const displayedRowsWithBar = computed(() => {
      const rows = displayedRows.value;
      const columns = props.columns || [];
      const firstColKey = columns[0]?.key;
      const key = sortKey.value;
      if (rows.length === 0) return [];
      const metricKey = props.barMetricKey || (key && key !== firstColKey ? key : columns[1]?.key || null);
      if (!metricKey) {
        return rows.map((row) => ({ row, barPercent: 0 }));
      }
      const getNum = (row) => toSortableValue2(row?.[metricKey]).num;
      const values = rows.map(getNum);
      const total = values.reduce((a, b) => a + b, 0);
      if (total <= 0) {
        return rows.map((row) => ({ row, barPercent: 0 }));
      }
      return rows.map((row, i) => ({
        row,
        barPercent: Math.min(100, values[i] / total * 100)
      }));
    });
    function getRowGradientStyle(barPercent) {
      if (barPercent <= 0) return {};
      const { c1, c2, c3 } = gradientColors;
      const mid = barPercent / 2;
      return {
        background: `linear-gradient(to right, ${c1} 0%, ${c2} ${mid}%, ${c3} ${barPercent}%, ${c3} 100%)`
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("h3", _hoisted_3$4, [
            createTextVNode(toDisplayString(__props.title) + " ", 1),
            needsAddonGate.value ? (openBlock(), createElementBlock("span", _hoisted_4$3, toDisplayString(unref(__$1)("Demo Data", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_5$3, [
            __props.tabs.length ? (openBlock(), createElementBlock("div", _hoisted_6$3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tabs, (tab, index) => {
                return openBlock(), createElementBlock(Fragment, {
                  key: tab.value
                }, [
                  createBaseVNode("button", {
                    class: normalizeClass([
                      "monsterinsights-overview-report-table__tab",
                      { "monsterinsights-overview-report-table__tab--active": tab.value === __props.activeTab }
                    ]),
                    onClick: ($event) => _ctx.$emit("update:activeTab", tab.value)
                  }, toDisplayString(tab.label), 11, _hoisted_7$3),
                  index < __props.tabs.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_8$3)) : createCommentVNode("", true)
                ], 64);
              }), 128))
            ])) : createCommentVNode("", true),
            __props.showViewFullReport && __props.viewFullReportUrl ? (openBlock(), createElementBlock("a", {
              key: 1,
              href: __props.viewFullReportUrl,
              class: "monsterinsights-overview-report-table__view-link"
            }, [
              createBaseVNode("span", null, toDisplayString(unref(__$1)("View Full Report", "google-analytics-for-wordpress")), 1),
              createVNode(Icon, {
                name: "chevron-right",
                size: 20
              })
            ], 8, _hoisted_9$2)) : __props.showViewFullReport ? (openBlock(), createElementBlock("button", {
              key: 2,
              class: "monsterinsights-overview-report-table__view-link",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("view-full-report"))
            }, [
              createBaseVNode("span", null, toDisplayString(unref(__$1)("View Full Report", "google-analytics-for-wordpress")), 1),
              createVNode(Icon, {
                name: "chevron-right",
                size: 20
              })
            ])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_10$2, [
          createBaseVNode("table", _hoisted_11$2, [
            createBaseVNode("thead", null, [
              createBaseVNode("tr", null, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
                  return openBlock(), createElementBlock("th", {
                    key: column.key,
                    class: normalizeClass({ "monsterinsights-overview-report-table__th--sortable": column.sortable !== false }),
                    onClick: ($event) => handleColumnHeaderClick(column)
                  }, [
                    createBaseVNode("div", _hoisted_13$2, [
                      createBaseVNode("span", null, toDisplayString(column.label), 1),
                      column.sortable !== false ? (openBlock(), createBlock(Icon, {
                        key: 0,
                        name: "sort",
                        size: 12
                      })) : createCommentVNode("", true)
                    ])
                  ], 10, _hoisted_12$2);
                }), 128))
              ])
            ]),
            createBaseVNode("tbody", null, [
              __props.loading ? (openBlock(), createElementBlock("tr", _hoisted_14$2, [
                createBaseVNode("td", {
                  colspan: __props.columns.length,
                  class: "monsterinsights-overview-report-table__cell-loading"
                }, [
                  createVNode(LoadingSpinnerInline),
                  createBaseVNode("span", null, toDisplayString(unref(__$1)("Loading…", "google-analytics-for-wordpress")), 1)
                ], 8, _hoisted_15$2)
              ])) : displayedRowsWithBar.value.length === 0 ? (openBlock(), createElementBlock("tr", _hoisted_16$2, [
                createBaseVNode("td", {
                  colspan: __props.columns.length,
                  class: "monsterinsights-overview-report-table__cell-empty"
                }, toDisplayString(unref(__$1)("No data available", "google-analytics-for-wordpress")), 9, _hoisted_17$2)
              ])) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(displayedRowsWithBar.value, (item, rowIndex) => {
                return openBlock(), createElementBlock("tr", {
                  key: rowIndex,
                  style: normalizeStyle(getRowGradientStyle(item.barPercent))
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(__props.columns, (column) => {
                    return openBlock(), createElementBlock("td", {
                      key: column.key
                    }, [
                      column.iconKey && item.row[column.iconKey] ? (openBlock(), createElementBlock("div", _hoisted_18$2, [
                        createVNode(Icon, {
                          name: item.row[column.iconKey],
                          size: 20
                        }, null, 8, ["name"]),
                        createBaseVNode("span", null, toDisplayString(item.row[column.key]), 1)
                      ])) : (openBlock(), createElementBlock("span", _hoisted_19$2, toDisplayString(item.row[column.key]), 1))
                    ]);
                  }), 128))
                ], 4);
              }), 128))
            ])
          ]),
          __props.hasLoadMore && (__props.rows.length > __props.rowLimit || needsAddonGate.value) ? (openBlock(), createElementBlock("div", _hoisted_20$2, [
            createBaseVNode("button", {
              class: "monsterinsights-overview-report-table__load-more-btn",
              onClick: handleLoadMoreClick
            }, [
              createBaseVNode("span", null, toDisplayString(unref(__$1)("Load More", "google-analytics-for-wordpress")), 1),
              createVNode(Icon, {
                name: "load-more",
                size: 16
              })
            ])
          ])) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$7, {
          modelValue: reportTableModalOpen.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => reportTableModalOpen.value = $event),
          title: __props.title,
          columns: __props.columns,
          rows: __props.rows,
          "total-label": __props.totalLabel,
          "bar-metric-key": __props.barMetricKey,
          "show-totals": __props.showTotals
        }, null, 8, ["modelValue", "title", "columns", "rows", "total-label", "bar-metric-key", "show-totals"]),
        createVNode(OverviewProFeatureModal, {
          modelValue: proModalOpen.value,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => proModalOpen.value = $event),
          "addon-slug": needsAddonGate.value ? __props.requiredAddon : "",
          "addon-name": needsAddonGate.value ? __props.requiredAddonName : ""
        }, null, 8, ["modelValue", "addon-slug", "addon-name"])
      ]);
    };
  }
};
const OverviewReportTable = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-35a77760"]]);
const _hoisted_1$3 = { class: "monsterinsights-overview-upsell-cta__content" };
const _hoisted_2$3 = { class: "monsterinsights-overview-upsell-cta__text" };
const _hoisted_3$3 = { class: "monsterinsights-overview-upsell-cta__title" };
const _hoisted_4$2 = { class: "monsterinsights-overview-upsell-cta__description" };
const _hoisted_5$2 = ["href"];
const _hoisted_6$2 = ["src"];
const _hoisted_7$2 = { class: "monsterinsights-overview-upsell-cta__image" };
const _hoisted_8$2 = ["src"];
const _sfc_main$5 = {
  __name: "OverviewReportUpsellCTA",
  setup(__props) {
    new URL("" + new URL("../../assets/em-background-BPt0ZyG0.jpg", import.meta.url).href, import.meta.url).href;
    const ctaBackgroundStyle = {};
    const chartWithCharlieImage = new URL("" + new URL("../../assets/overview-upsell-cta-chart-with-charlie-L7ZsqcRa.png", import.meta.url).href, import.meta.url).href;
    const arrowImage = new URL("data:image/svg+xml,%3csvg%20width='101'%20height='53'%20viewBox='0%200%20101%2053'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_15653_6002)'%3e%3cpath%20d='M4.87516%2011.8474C10.7298%2010.3451%2016.5859%208.83737%2022.4405%207.33513C24.5001%206.65996%2026.5977%206.12434%2028.7188%205.71859C29.433%205.58519%2030.1591%205.89107%2030.3661%206.6579C30.5513%207.35426%2030.1366%208.18411%2029.427%208.36587C27.3711%208.89461%2025.3152%209.42336%2023.2593%209.95211C20.0344%2011.0034%2016.921%2012.396%2013.9627%2014.094C22.8624%2013.8458%2031.8239%2013.932%2040.5105%2015.8744C45.5205%2016.9947%2050.4464%2018.7711%2054.8736%2021.4145C56.0849%2022.1407%2057.2918%2022.9719%2058.4001%2023.9191C60.7722%2023.4486%2063.2657%2023.546%2065.6926%2024.0328C68.1141%2024.5183%2070.4631%2025.3504%2072.7598%2026.2516C75.1087%2027.1721%2077.4183%2028.2004%2079.6697%2029.3433C84.2016%2031.6484%2088.4803%2034.4243%2092.4829%2037.5826C93.4743%2038.3639%2094.4464%2039.1756%2095.4021%2040.0066C95.9468%2040.4836%2095.8792%2041.4505%2095.3943%2041.9557C94.848%2042.5216%2094.0483%2042.456%2093.4982%2041.9776C86.541%2035.9146%2078.4525%2031.1325%2069.7968%2028.0781C66.9455%2027.0687%2063.83%2026.1973%2060.759%2026.3453C61.8539%2027.7193%2062.7%2029.2823%2063.1467%2031.0425C64.0575%2034.65%2062.6932%2038.8828%2059.6971%2041.1015C58.187%2042.2137%2056.2082%2042.6209%2054.4191%2042.1636C52.4197%2041.6577%2050.7642%2040.1327%2049.7987%2038.303C48.8032%2036.4125%2048.4385%2034.1371%2048.9916%2032.0227C49.5458%2029.9262%2050.8287%2028.0597%2052.4771%2026.7004C53.355%2025.9787%2054.2885%2025.3951%2055.263%2024.9401C54.867%2024.6607%2054.4682%2024.3924%2054.0743%2024.1489C50.168%2021.6993%2045.8195%2020.0312%2041.3698%2018.9086C32.0261%2016.5484%2022.2604%2016.5901%2012.6573%2016.8861C12.0592%2016.9022%2011.4649%2016.9252%2010.8654%2016.9468C13.4258%2019.5431%2015.9901%2022.1463%2018.5505%2024.7426C19.7672%2025.9772%2017.8687%2027.9496%2016.6481%2026.7081C12.5232%2022.5219%208.39686%2018.3413%204.27196%2014.1551C3.58031%2013.4514%203.88362%2012.1035%204.86837%2011.8515L4.87516%2011.8474ZM57.3173%2026.9986C54.1733%2028.1122%2051.1559%2031.0091%2051.4279%2034.5691C51.5534%2036.1578%2052.3956%2037.8023%2053.642%2038.7675C54.7611%2039.6291%2056.1379%2039.8264%2057.4361%2039.2901C57.4186%2039.2914%2057.6988%2039.1577%2057.772%2039.1177C57.9334%2039.0239%2058.0908%2038.9232%2058.2443%2038.8156C58.3978%2038.7079%2058.2875%2038.8032%2058.4728%2038.6389C58.6349%2038.4982%2058.7877%2038.3491%2058.9381%2038.1876C59.3822%2037.7073%2059.7387%2037.1688%2060.0791%2036.4494C60.2431%2036.1028%2060.2724%2036.0338%2060.4058%2035.5849C60.5248%2035.1914%2060.6156%2034.7964%2060.6865%2034.3903C60.7592%2033.9552%2060.7726%2032.8446%2060.6978%2032.3832C60.3449%2030.2169%2059.1481%2028.3981%2057.6253%2026.8897C57.5254%2026.9228%2057.4201%2026.9545%2057.3187%2026.9931L57.3173%2026.9986Z'%20fill='%2310529D'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_15653_6002'%3e%3crect%20width='29'%20height='96'%20fill='white'%20transform='matrix(0.250639%20-0.968081%20-0.968081%20-0.250639%2092.9358%2052.1357)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", import.meta.url).href;
    const upgradeUrl = computed(() => {
      return getUpgradeUrl("overview-upsell-cta", "overview-report", "https://www.monsterinsights.com/lite/");
    });
    const text = {
      title: __$1("Get Better Insights. Take Action. ", "google-analytics-for-wordpress"),
      titleHighlight: __$1("Grow FASTER!", "google-analytics-for-wordpress"),
      description: __$1("Join over 3 million owners and start making data-driven decisions to grow your business.", "google-analytics-for-wordpress"),
      upgradeToPro: __$1("Upgrade to Pro", "google-analytics-for-wordpress")
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "monsterinsights-overview-upsell-cta",
        style: normalizeStyle(unref(ctaBackgroundStyle))
      }, [
        createBaseVNode("div", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$3, [
            createBaseVNode("h3", _hoisted_3$3, [
              createTextVNode(toDisplayString(text.title) + " ", 1),
              _cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1)),
              createBaseVNode("span", null, toDisplayString(text.titleHighlight), 1)
            ]),
            createBaseVNode("p", _hoisted_4$2, toDisplayString(text.description), 1)
          ]),
          createBaseVNode("a", {
            href: upgradeUrl.value,
            target: "_blank",
            rel: "noopener",
            class: "monsterinsights-overview-upsell-cta__btn"
          }, [
            createBaseVNode("span", null, toDisplayString(text.upgradeToPro), 1),
            createVNode(Icon, {
              name: "arrow-right",
              size: 20,
              color: "inherit"
            })
          ], 8, _hoisted_5$2),
          createBaseVNode("img", {
            src: unref(arrowImage),
            class: "monsterinsights-overview-upsell-cta__arrow",
            alt: ""
          }, null, 8, _hoisted_6$2)
        ]),
        createBaseVNode("div", _hoisted_7$2, [
          createBaseVNode("img", {
            src: unref(chartWithCharlieImage),
            alt: ""
          }, null, 8, _hoisted_8$2)
        ])
      ], 4);
    };
  }
};
const _sfc_main$4 = {
  __name: "OverviewCustomDimensionsSection",
  props: {
    dateRange: {
      type: Object,
      required: true
    },
    isPremium: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const CUSTOM_DIMENSIONS_PRO_ONLY_KEYS = ["purchases", "averageOrderValue", "conversionRate"];
    const hasDimensions = computed(() => isAddonActive("dimensions"));
    const overviewStore = useOverviewReportStore();
    const effectiveFilters = computed(() => {
      const filters = [...overviewStore.activeFilters];
      if (overviewStore.activeDevice) {
        filters.push({
          type: "deviceCategory",
          condition: "is",
          value: overviewStore.activeDevice
        });
      }
      return filters;
    });
    const text = {
      customDimensions: __$1("Custom Dimensions", "google-analytics-for-wordpress")
    };
    const viewFullReportUrls = {
      dimensions: "/wp-admin/admin.php?page=monsterinsights_reports#/dimensions"
    };
    const customDimensionsTabs = [
      { label: __$1("Logged In", "google-analytics-for-wordpress"), value: "loggedIn" },
      { label: __$1("Post Type", "google-analytics-for-wordpress"), value: "postType" },
      { label: __$1("Author", "google-analytics-for-wordpress"), value: "author" },
      { label: __$1("Category", "google-analytics-for-wordpress"), value: "category" },
      { label: __$1("Tags", "google-analytics-for-wordpress"), value: "tags" },
      { label: __$1("Focus Keyword", "google-analytics-for-wordpress"), value: "focusKeyword" },
      { label: __$1("Day of Week", "google-analytics-for-wordpress"), value: "dayOfWeek" },
      { label: __$1("SEO Score", "google-analytics-for-wordpress"), value: "seoScore" }
    ];
    const customDimensionsActiveTab = ref("loggedIn");
    const customDimensionsColumnLabels = {
      loggedIn: __$1("Logged In", "google-analytics-for-wordpress"),
      postType: __$1("Post Type", "google-analytics-for-wordpress"),
      author: __$1("Author", "google-analytics-for-wordpress"),
      category: __$1("Category", "google-analytics-for-wordpress"),
      tags: __$1("Tags", "google-analytics-for-wordpress"),
      focusKeyword: __$1("Focus Keyword", "google-analytics-for-wordpress"),
      dayOfWeek: __$1("Day of Week", "google-analytics-for-wordpress"),
      seoScore: __$1("SEO Score", "google-analytics-for-wordpress")
    };
    const customDimensionsColumnsBase = [
      { key: "dimensionValue", label: "" },
      { key: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress") },
      { key: "users", label: __$1("Users", "google-analytics-for-wordpress") },
      { key: "engagement", label: __$1("Engagement Rate", "google-analytics-for-wordpress") },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress") },
      { key: "purchases", label: __$1("Purchases", "google-analytics-for-wordpress") },
      { key: "averageOrderValue", label: __$1("Average Order Value (AOV)", "google-analytics-for-wordpress") },
      { key: "conversionRate", label: __$1("Conversion Rate", "google-analytics-for-wordpress") }
    ];
    const customDimensionsColumns = computed(() => {
      const label = customDimensionsColumnLabels[customDimensionsActiveTab.value] ?? customDimensionsColumnLabels.loggedIn;
      const cols = props.isPremium ? customDimensionsColumnsBase : customDimensionsColumnsBase.filter((col) => !CUSTOM_DIMENSIONS_PRO_ONLY_KEYS.includes(col.key));
      return cols.map((col, i) => i === 0 ? { ...col, label } : col);
    });
    const customDimensionsDataRef = ref(null);
    const customDimensionsLoading = ref(false);
    let customDimensionsLoadId = 0;
    function parseCustomDimensionsRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      return rows.map((row) => {
        const dimVal = row?.d?.[0];
        const name = dimVal !== void 0 && dimVal !== null && String(dimVal).trim() !== "" ? String(dimVal) : empty;
        const m0 = row?.m?.[0];
        const arr = Array.isArray(m0) ? m0 : [];
        const sessions = parseFloat(arr[0]) || 0;
        const users = parseFloat(arr[1]) || 0;
        const engagementRateDecimal = parseFloat(arr[2]) || 0;
        const engagementRatePercent = engagementRateDecimal * 100;
        const revenue = parseFloat(arr[3]) || 0;
        const purchases = parseFloat(arr[4]) || 0;
        const avgPurchaseRevenue = parseFloat(arr[5]) || 0;
        const conversionRate = sessions > 0 ? purchases / sessions * 100 : 0;
        return {
          dimensionValue: name,
          sessions: formatNum(sessions),
          users: formatNum(users),
          engagement: formatPct(engagementRatePercent),
          revenue: formatCurr(revenue),
          purchases: formatNum(purchases),
          averageOrderValue: formatCurr(avgPurchaseRevenue),
          conversionRate: formatPct(conversionRate)
        };
      });
    }
    const DAY_OF_WEEK_NAMES = [
      __$1("Sunday", "google-analytics-for-wordpress"),
      __$1("Monday", "google-analytics-for-wordpress"),
      __$1("Tuesday", "google-analytics-for-wordpress"),
      __$1("Wednesday", "google-analytics-for-wordpress"),
      __$1("Thursday", "google-analytics-for-wordpress"),
      __$1("Friday", "google-analytics-for-wordpress"),
      __$1("Saturday", "google-analytics-for-wordpress")
    ];
    const customDimensionsData = computed(() => {
      const raw = customDimensionsDataRef.value;
      if (!raw) return [];
      const tab = customDimensionsActiveTab.value;
      const filtered = filterTabbedData(raw, CUSTOM_DIMENSIONS_DIMENSION_TAB, effectiveFilters.value, CUSTOM_DIMENSIONS_TAB_TO_QUERY_ID);
      const tabData = filtered[tab];
      const rows = parseCustomDimensionsRows(tabData);
      if (tab === "dayOfWeek") {
        return rows.map((row) => {
          const idx = parseInt(row.dimensionValue, 10);
          return {
            ...row,
            dimensionValue: DAY_OF_WEEK_NAMES[idx] ?? row.dimensionValue
          };
        });
      }
      return rows;
    });
    async function loadCustomDimensionsData() {
      if (!props.dateRange.start || !props.dateRange.end) return;
      if (!hasDimensions.value) {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const sampleData = generateSampleCustomDimensionsData({ apiFilters });
        customDimensionsDataRef.value = sampleData;
        overviewStore.setCustomDimensions(sampleData);
        return;
      }
      const loadId = ++customDimensionsLoadId;
      customDimensionsLoading.value = true;
      try {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const data = await fetchCustomDimensionsData(props.dateRange, apiFilters, props.isPremium);
        if (loadId !== customDimensionsLoadId) return;
        customDimensionsDataRef.value = data;
        overviewStore.setCustomDimensions(data);
        const runDeferred = () => {
          fetchCustomDimensionsDeferredData(props.dateRange, apiFilters, props.isPremium).then((deferred) => {
            if (loadId !== customDimensionsLoadId) return;
            const current = customDimensionsDataRef.value;
            if (current && deferred) {
              const merged = { ...current, ...deferred };
              customDimensionsDataRef.value = merged;
              overviewStore.setCustomDimensions(merged);
            }
          });
        };
        if (typeof requestIdleCallback !== "undefined") {
          requestIdleCallback(runDeferred, { timeout: 500 });
        } else {
          setTimeout(runDeferred, 0);
        }
      } catch (err) {
        if (loadId === customDimensionsLoadId) {
          console.error("Error loading custom dimensions:", err);
          customDimensionsDataRef.value = null;
          overviewStore.setCustomDimensions(null);
        }
      } finally {
        customDimensionsLoading.value = false;
      }
    }
    watch(
      () => overviewStore.getChartActiveTab,
      (tab) => {
        if (tab === "engagement") {
          loadCustomDimensionsData();
        }
      },
      { immediate: true }
    );
    watch(
      () => [props.dateRange.start, props.dateRange.end],
      () => {
        if (overviewStore.getChartActiveTab === "engagement") {
          loadCustomDimensionsData();
        }
      },
      { immediate: false }
    );
    watch(effectiveFilters, () => {
      if (overviewStore.getChartActiveTab === "engagement") {
        loadCustomDimensionsData();
      }
    }, { deep: true });
    onMounted(() => {
      if (overviewStore.getChartActiveTab === "engagement") {
        loadCustomDimensionsData();
      }
    });
    return (_ctx, _cache) => {
      return unref(overviewStore).getChartActiveTab === "engagement" ? (openBlock(), createBlock(OverviewReportTable, {
        key: 0,
        title: text.customDimensions,
        tabs: customDimensionsTabs,
        "active-tab": customDimensionsActiveTab.value,
        columns: customDimensionsColumns.value,
        rows: customDimensionsData.value,
        loading: customDimensionsLoading.value,
        "has-load-more": true,
        "view-full-report-url": viewFullReportUrls.dimensions,
        "required-addon": hasDimensions.value ? "" : "dimensions",
        "required-addon-name": "Dimensions",
        "onUpdate:activeTab": _cache[0] || (_cache[0] = ($event) => customDimensionsActiveTab.value = $event)
      }, null, 8, ["title", "active-tab", "columns", "rows", "loading", "view-full-report-url", "required-addon"])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$2 = ["aria-label"];
const _hoisted_2$2 = { class: "monsterinsights-funnel-modal__header" };
const _hoisted_3$2 = {
  id: "funnel-modal-title",
  class: "monsterinsights-funnel-modal__title"
};
const _hoisted_4$1 = { class: "monsterinsights-funnel-modal__body" };
const _hoisted_5$1 = { class: "monsterinsights-funnel-modal__create-section" };
const _hoisted_6$1 = { class: "monsterinsights-funnel-modal__section-title" };
const _hoisted_7$1 = { class: "monsterinsights-funnel-modal__name-field" };
const _hoisted_8$1 = { class: "monsterinsights-funnel-modal__field-label" };
const _hoisted_9$1 = ["placeholder"];
const _hoisted_10$1 = { class: "monsterinsights-funnel-modal__steps-section" };
const _hoisted_11$1 = { class: "monsterinsights-funnel-modal__steps-label" };
const _hoisted_12$1 = { class: "monsterinsights-funnel-modal__steps-list" };
const _hoisted_13$1 = { class: "monsterinsights-funnel-modal__step-number" };
const _hoisted_14$1 = { class: "monsterinsights-funnel-modal__select-wrapper" };
const _hoisted_15$1 = ["onUpdate:modelValue"];
const _hoisted_16$1 = ["value"];
const _hoisted_17$1 = { class: "monsterinsights-funnel-modal__step-value-wrapper" };
const _hoisted_18$1 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_19$1 = ["onClick"];
const _hoisted_20$1 = { class: "monsterinsights-funnel-modal__step-actions" };
const _hoisted_21$1 = ["disabled"];
const _hoisted_22$1 = { class: "monsterinsights-funnel-modal__saved-section" };
const _hoisted_23 = { class: "monsterinsights-funnel-modal__section-title" };
const _hoisted_24 = {
  key: 0,
  class: "monsterinsights-funnel-modal__empty-state"
};
const _hoisted_25 = {
  key: 1,
  class: "monsterinsights-funnel-modal__saved-list"
};
const _hoisted_26 = ["onMouseenter"];
const _hoisted_27 = { class: "monsterinsights-funnel-modal__saved-item-header" };
const _hoisted_28 = { class: "monsterinsights-funnel-modal__saved-item-info" };
const _hoisted_29 = { class: "monsterinsights-funnel-modal__saved-item-name" };
const _hoisted_30 = { class: "monsterinsights-funnel-modal__saved-item-steps" };
const _hoisted_31 = {
  key: 0,
  class: "monsterinsights-funnel-modal__saved-item-status monsterinsights-funnel-modal__saved-item-status--applied"
};
const _hoisted_32 = ["onClick"];
const _hoisted_33 = { class: "monsterinsights-funnel-modal__saved-item-actions" };
const _hoisted_34 = {
  key: 0,
  class: "monsterinsights-funnel-modal__saved-item-status monsterinsights-funnel-modal__saved-item-status--default"
};
const _hoisted_35 = ["onClick"];
const _hoisted_36 = ["onClick"];
const _hoisted_37 = {
  key: 0,
  class: "monsterinsights-funnel-modal__saved-item-edit"
};
const _hoisted_38 = { class: "monsterinsights-funnel-modal__step-number" };
const _hoisted_39 = { class: "monsterinsights-funnel-modal__select-wrapper" };
const _hoisted_40 = ["onUpdate:modelValue"];
const _hoisted_41 = ["value"];
const _hoisted_42 = { class: "monsterinsights-funnel-modal__step-value-wrapper" };
const _hoisted_43 = ["onUpdate:modelValue", "placeholder"];
const _hoisted_44 = ["onClick"];
const _hoisted_45 = { class: "monsterinsights-funnel-modal__edit-actions" };
const _hoisted_46 = ["disabled", "onClick"];
const _sfc_main$3 = {
  __name: "FunnelModal",
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const isDefaultFunnel = (id) => id === DEFAULT_ECOMMERCE_FUNNEL.id;
    const overviewStore = useOverviewReportStore();
    const props = __props;
    const emit = __emit;
    const texts = {
      pagePathPlaceholder: __$1("Enter page path", "google-analytics-for-wordpress"),
      eventNamePlaceholder: __$1("Enter event name", "google-analytics-for-wordpress")
    };
    const funnelModalDialogRef = ref(null);
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
          setTimeout(() => {
            const focusable = funnelModalDialogRef.value?.querySelector?.('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            focusable?.focus?.();
          }, 0);
        } else {
          document.removeEventListener("keydown", handleEscapeKeydown);
        }
      },
      { immediate: true }
    );
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
    const stepTypeOptions = [
      { value: "page", label: __$1("Page", "google-analytics-for-wordpress") },
      { value: "event", label: __$1("Event", "google-analytics-for-wordpress") }
    ];
    const newFunnelName = ref("");
    const newFunnelSteps = ref([
      { type: "page", value: "" },
      { type: "page", value: "" }
    ]);
    const editingFunnelId = ref(null);
    const editFunnelSteps = ref([]);
    const isSaving = ref(false);
    const hoveredFunnelId = ref(null);
    const closeModal = () => {
      editingFunnelId.value = null;
      editFunnelSteps.value = [];
      emit("close");
    };
    const applySavedFunnel = (savedFunnel) => {
      overviewStore.setActiveFunnelId(savedFunnel.id);
    };
    const addNewStep = () => {
      newFunnelSteps.value.push({ type: "page", value: "" });
    };
    const removeNewStep = (index) => {
      if (newFunnelSteps.value.length > 2) {
        newFunnelSteps.value.splice(index, 1);
      }
    };
    const resetNewFunnelForm = () => {
      newFunnelName.value = "";
      newFunnelSteps.value = [
        { type: "page", value: "" },
        { type: "page", value: "" }
      ];
    };
    const createFunnel = () => {
      if (isSaving.value) return;
      if (!newFunnelName.value.trim()) return;
      const validSteps = newFunnelSteps.value.filter((s) => s.value.trim());
      if (validSteps.length < 2) return;
      const funnelData = {
        name: newFunnelName.value.trim(),
        steps: validSteps.map((s) => ({ type: s.type, value: s.value.trim() }))
      };
      const ajaxData = {
        action: "monsterinsights_overview_report_save_funnel_filter",
        nonce: getMiGlobal$1("nonce", ""),
        funnel: JSON.stringify(funnelData)
      };
      isSaving.value = true;
      wp.ajax.post(ajaxData).done((response) => {
        if (response && response.id) {
          overviewStore.addFunnel({
            id: response.id,
            name: response.name || funnelData.name,
            steps: response.steps || funnelData.steps
          });
          if (!overviewStore.activeFunnelId) {
            overviewStore.setActiveFunnelId(response.id);
          }
          resetNewFunnelForm();
          showSuccessToast({
            message: sprintf(
              /* translators: %s - funnel name */
              __$1('Funnel "%s" has been created successfully.', "google-analytics-for-wordpress"),
              response.name
            )
          });
        }
      }).fail(() => {
        showErrorToast({
          message: __$1("Failed to create funnel. Please try again.", "google-analytics-for-wordpress")
        });
      }).always(() => {
        isSaving.value = false;
      });
    };
    const toggleEditFunnel = (savedFunnel) => {
      if (editingFunnelId.value === savedFunnel.id) {
        editingFunnelId.value = null;
        editFunnelSteps.value = [];
      } else {
        editingFunnelId.value = savedFunnel.id;
        editFunnelSteps.value = savedFunnel.steps ? savedFunnel.steps.map((s) => ({ ...s })) : [{ type: "page", value: "" }, { type: "page", value: "" }];
      }
    };
    const addEditStep = () => {
      editFunnelSteps.value.push({ type: "page", value: "" });
    };
    const removeEditStep = (index) => {
      if (editFunnelSteps.value.length > 2) {
        editFunnelSteps.value.splice(index, 1);
      }
    };
    const saveEditFunnel = (funnelId) => {
      if (isSaving.value) return;
      const validSteps = editFunnelSteps.value.filter((s) => s.value.trim());
      if (validSteps.length < 2) return;
      const funnel = overviewStore.funnels.find((f) => f.id === funnelId);
      if (!funnel) return;
      const updatedFunnel = {
        ...funnel,
        steps: validSteps.map((s) => ({ type: s.type, value: s.value.trim() }))
      };
      const ajaxData = {
        action: "monsterinsights_overview_report_update_funnel_filter",
        nonce: getMiGlobal$1("nonce", ""),
        funnel_id: funnelId,
        funnel: JSON.stringify(updatedFunnel)
      };
      isSaving.value = true;
      wp.ajax.post(ajaxData).done(() => {
        overviewStore.updateFunnel(updatedFunnel);
        editingFunnelId.value = null;
        editFunnelSteps.value = [];
        showSuccessToast({
          message: sprintf(
            /* translators: %s - funnel name */
            __$1('Funnel "%s" has been updated successfully.', "google-analytics-for-wordpress"),
            updatedFunnel.name
          )
        });
      }).fail(() => {
        showErrorToast({
          message: __$1("Failed to update funnel. Please try again.", "google-analytics-for-wordpress")
        });
      }).always(() => {
        isSaving.value = false;
      });
    };
    const deleteFunnel = (funnelId) => {
      const ajaxData = {
        action: "monsterinsights_overview_report_delete_funnel_filter",
        nonce: getMiGlobal$1("nonce", ""),
        funnel_id: funnelId
      };
      wp.ajax.post(ajaxData).done(() => {
        overviewStore.removeFunnel(funnelId);
        if (editingFunnelId.value === funnelId) {
          editingFunnelId.value = null;
          editFunnelSteps.value = [];
        }
        showSuccessToast({
          message: __$1("Funnel deleted successfully.", "google-analytics-for-wordpress")
        });
      }).fail(() => {
        showErrorToast({
          message: __$1("Failed to delete funnel. Please try again.", "google-analytics-for-wordpress")
        });
      });
    };
    const clearForm = () => {
      resetNewFunnelForm();
      editingFunnelId.value = null;
      editFunnelSteps.value = [];
    };
    const fetchSavedFunnels = () => {
      const ajaxData = {
        action: "monsterinsights_overview_report_get_funnel_filters",
        nonce: getMiGlobal$1("nonce", "")
      };
      wp.ajax.post(ajaxData).done((response) => {
        if (response && response.funnels) {
          overviewStore.setFunnels(response.funnels);
        }
      }).fail(() => {
        overviewStore.setFunnels([]);
      });
    };
    onMounted(() => {
      fetchSavedFunnels();
    });
    return (_ctx, _cache) => {
      return __props.isOpen ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "monsterinsights-funnel-modal-overlay",
        onClick: withModifiers(closeModal, ["self"])
      }, [
        createBaseVNode("div", {
          ref_key: "funnelModalDialogRef",
          ref: funnelModalDialogRef,
          class: "monsterinsights-funnel-modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "funnel-modal-title"
        }, [
          toast.value.visible ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["monsterinsights-funnel-modal__toast", { "monsterinsights-funnel-modal__toast--error": toast.value.type === "error" }])
          }, [
            createVNode(Icon, {
              name: toast.value.type === "error" ? "warning" : "check",
              size: 16
            }, null, 8, ["name"]),
            createBaseVNode("span", null, toDisplayString(toast.value.message), 1)
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("button", {
            type: "button",
            class: "monsterinsights-funnel-modal__close",
            "aria-label": unref(__$1)("Close funnel panel", "google-analytics-for-wordpress"),
            onClick: closeModal
          }, [
            createVNode(Icon, {
              name: "close",
              size: 16
            })
          ], 8, _hoisted_1$2),
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("h2", _hoisted_3$2, toDisplayString(unref(__$1)("Manage Funnels", "google-analytics-for-wordpress")), 1),
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-funnel-modal__clear-all",
              onClick: clearForm
            }, toDisplayString(unref(__$1)("Clear All", "google-analytics-for-wordpress")), 1)
          ]),
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("h3", _hoisted_6$1, toDisplayString(unref(__$1)("Create New Funnel", "google-analytics-for-wordpress")), 1),
              createBaseVNode("div", _hoisted_7$1, [
                createBaseVNode("label", _hoisted_8$1, toDisplayString(unref(__$1)("Funnel Name", "google-analytics-for-wordpress")), 1),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newFunnelName.value = $event),
                  type: "text",
                  class: "monsterinsights-funnel-modal__name-input",
                  placeholder: unref(__$1)("e.g. Checkout Funnel", "google-analytics-for-wordpress")
                }, null, 8, _hoisted_9$1), [
                  [vModelText, newFunnelName.value]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("div", _hoisted_11$1, toDisplayString(unref(__$1)("Funnel Steps (Min 2)", "google-analytics-for-wordpress")), 1),
              createBaseVNode("div", _hoisted_12$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(newFunnelSteps.value, (step, index) => {
                  return openBlock(), createElementBlock("div", {
                    key: index,
                    class: "monsterinsights-funnel-modal__step-row"
                  }, [
                    createBaseVNode("span", _hoisted_13$1, toDisplayString(index + 1) + ".", 1),
                    createBaseVNode("div", _hoisted_14$1, [
                      withDirectives(createBaseVNode("select", {
                        "onUpdate:modelValue": ($event) => step.type = $event,
                        class: "monsterinsights-funnel-modal__select"
                      }, [
                        (openBlock(), createElementBlock(Fragment, null, renderList(stepTypeOptions, (opt) => {
                          return createBaseVNode("option", {
                            key: opt.value,
                            value: opt.value
                          }, toDisplayString(opt.label), 9, _hoisted_16$1);
                        }), 64))
                      ], 8, _hoisted_15$1), [
                        [vModelSelect, step.type]
                      ]),
                      createVNode(Icon, {
                        name: "chevron-down",
                        size: 16
                      })
                    ]),
                    createBaseVNode("div", _hoisted_17$1, [
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": ($event) => step.value = $event,
                        type: "text",
                        class: "monsterinsights-funnel-modal__step-input",
                        placeholder: step.type === "page" ? texts.pagePathPlaceholder : texts.eventNamePlaceholder
                      }, null, 8, _hoisted_18$1), [
                        [vModelText, step.value]
                      ])
                    ]),
                    createBaseVNode("button", {
                      type: "button",
                      class: "monsterinsights-funnel-modal__step-delete",
                      onClick: ($event) => removeNewStep(index)
                    }, [
                      createVNode(Icon, {
                        name: "trash",
                        size: 16
                      })
                    ], 8, _hoisted_19$1)
                  ]);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_20$1, [
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-funnel-modal__add-step-btn",
                  onClick: addNewStep
                }, [
                  createVNode(Icon, {
                    name: "plus",
                    size: 20
                  }),
                  createBaseVNode("span", null, toDisplayString(unref(__$1)("Add Step", "google-analytics-for-wordpress")), 1)
                ]),
                createBaseVNode("button", {
                  type: "button",
                  class: "monsterinsights-funnel-modal__create-btn",
                  disabled: isSaving.value,
                  onClick: createFunnel
                }, toDisplayString(isSaving.value ? unref(__$1)("Creating...", "google-analytics-for-wordpress") : unref(__$1)("Create Funnel", "google-analytics-for-wordpress")), 9, _hoisted_21$1)
              ])
            ])
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "monsterinsights-funnel-modal__divider" }, null, -1)),
          createBaseVNode("div", _hoisted_22$1, [
            createBaseVNode("h3", _hoisted_23, toDisplayString(unref(__$1)("Your Saved Funnels", "google-analytics-for-wordpress")), 1),
            unref(overviewStore).funnels.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_24, [
              createVNode(Icon, {
                name: "no-saved-filters",
                size: 64
              }),
              createBaseVNode("p", null, toDisplayString(unref(__$1)("No funnels found", "google-analytics-for-wordpress")), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_25, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(overviewStore).funnels, (savedFunnel) => {
                return openBlock(), createElementBlock("div", {
                  key: savedFunnel.id,
                  class: normalizeClass(["monsterinsights-funnel-modal__saved-item", {
                    "monsterinsights-funnel-modal__saved-item--applied": savedFunnel.id === unref(overviewStore).activeFunnelId,
                    "monsterinsights-funnel-modal__saved-item--editing": editingFunnelId.value === savedFunnel.id
                  }]),
                  onMouseenter: ($event) => hoveredFunnelId.value = savedFunnel.id,
                  onMouseleave: _cache[1] || (_cache[1] = ($event) => hoveredFunnelId.value = null)
                }, [
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      createBaseVNode("span", _hoisted_29, toDisplayString(savedFunnel.name), 1),
                      createBaseVNode("span", _hoisted_30, toDisplayString(unref(sprintf)(
                        /* translators: %d - number of steps */
                        unref(__$1)("%d Steps", "google-analytics-for-wordpress"),
                        savedFunnel.steps ? savedFunnel.steps.length : 0
                      )), 1),
                      savedFunnel.id === unref(overviewStore).activeFunnelId ? (openBlock(), createElementBlock("span", _hoisted_31, toDisplayString(unref(__$1)("Applied", "google-analytics-for-wordpress")), 1)) : hoveredFunnelId.value === savedFunnel.id && editingFunnelId.value !== savedFunnel.id ? (openBlock(), createElementBlock("span", {
                        key: 1,
                        class: "monsterinsights-funnel-modal__saved-item-status monsterinsights-funnel-modal__saved-item-status--apply",
                        onClick: ($event) => applySavedFunnel(savedFunnel)
                      }, toDisplayString(unref(__$1)("Apply", "google-analytics-for-wordpress")), 9, _hoisted_32)) : createCommentVNode("", true)
                    ]),
                    createBaseVNode("div", _hoisted_33, [
                      isDefaultFunnel(savedFunnel.id) ? (openBlock(), createElementBlock("span", _hoisted_34, toDisplayString(unref(__$1)("Default", "google-analytics-for-wordpress")), 1)) : createCommentVNode("", true),
                      !isDefaultFunnel(savedFunnel.id) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createBaseVNode("button", {
                          type: "button",
                          class: "monsterinsights-funnel-modal__saved-item-btn",
                          onClick: ($event) => toggleEditFunnel(savedFunnel)
                        }, [
                          createVNode(Icon, {
                            name: "pencil",
                            size: 16
                          })
                        ], 8, _hoisted_35),
                        createBaseVNode("button", {
                          type: "button",
                          class: "monsterinsights-funnel-modal__saved-item-btn",
                          onClick: ($event) => deleteFunnel(savedFunnel.id)
                        }, [
                          createVNode(Icon, {
                            name: "trash",
                            size: 16
                          })
                        ], 8, _hoisted_36)
                      ], 64)) : createCommentVNode("", true)
                    ])
                  ]),
                  editingFunnelId.value === savedFunnel.id ? (openBlock(), createElementBlock("div", _hoisted_37, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(editFunnelSteps.value, (editStep, editIndex) => {
                      return openBlock(), createElementBlock("div", {
                        key: editIndex,
                        class: "monsterinsights-funnel-modal__step-row"
                      }, [
                        createBaseVNode("span", _hoisted_38, toDisplayString(editIndex + 1) + ".", 1),
                        createBaseVNode("div", _hoisted_39, [
                          withDirectives(createBaseVNode("select", {
                            "onUpdate:modelValue": ($event) => editStep.type = $event,
                            class: "monsterinsights-funnel-modal__select"
                          }, [
                            (openBlock(), createElementBlock(Fragment, null, renderList(stepTypeOptions, (opt) => {
                              return createBaseVNode("option", {
                                key: opt.value,
                                value: opt.value
                              }, toDisplayString(opt.label), 9, _hoisted_41);
                            }), 64))
                          ], 8, _hoisted_40), [
                            [vModelSelect, editStep.type]
                          ]),
                          createVNode(Icon, {
                            name: "chevron-down",
                            size: 16
                          })
                        ]),
                        createBaseVNode("div", _hoisted_42, [
                          withDirectives(createBaseVNode("input", {
                            "onUpdate:modelValue": ($event) => editStep.value = $event,
                            type: "text",
                            class: "monsterinsights-funnel-modal__step-input",
                            placeholder: editStep.type === "page" ? texts.pagePathPlaceholder : texts.eventNamePlaceholder
                          }, null, 8, _hoisted_43), [
                            [vModelText, editStep.value]
                          ])
                        ]),
                        editFunnelSteps.value.length > 2 ? (openBlock(), createElementBlock("button", {
                          key: 0,
                          type: "button",
                          class: "monsterinsights-funnel-modal__step-delete",
                          onClick: ($event) => removeEditStep(editIndex)
                        }, [
                          createVNode(Icon, {
                            name: "trash",
                            size: 16
                          })
                        ], 8, _hoisted_44)) : createCommentVNode("", true)
                      ]);
                    }), 128)),
                    createBaseVNode("div", _hoisted_45, [
                      createBaseVNode("button", {
                        type: "button",
                        class: "monsterinsights-funnel-modal__add-step-btn monsterinsights-funnel-modal__add-step-btn--sm",
                        onClick: addEditStep
                      }, [
                        createVNode(Icon, {
                          name: "plus",
                          size: 20
                        }),
                        createBaseVNode("span", null, toDisplayString(unref(__$1)("Add Step", "google-analytics-for-wordpress")), 1)
                      ]),
                      createBaseVNode("button", {
                        type: "button",
                        class: "monsterinsights-funnel-modal__save-edit-btn",
                        disabled: isSaving.value,
                        onClick: ($event) => saveEditFunnel(savedFunnel.id)
                      }, toDisplayString(isSaving.value ? unref(__$1)("Saving...", "google-analytics-for-wordpress") : unref(__$1)("Save", "google-analytics-for-wordpress")), 9, _hoisted_46)
                    ])
                  ])) : createCommentVNode("", true)
                ], 42, _hoisted_26);
              }), 128))
            ]))
          ])
        ], 512)
      ])) : createCommentVNode("", true);
    };
  }
};
const _hoisted_1$1 = { class: "monsterinsights-overview-ecommerce-funnel" };
const _hoisted_2$1 = { class: "monsterinsights-overview-ecommerce-funnel__header" };
const _hoisted_3$1 = { class: "monsterinsights-overview-ecommerce-funnel__header-left" };
const _hoisted_4 = { class: "monsterinsights-overview-ecommerce-funnel__title" };
const _hoisted_5 = { class: "monsterinsights-overview-ecommerce-funnel__funnel-select-wrapper" };
const _hoisted_6 = ["disabled"];
const _hoisted_7 = { value: "" };
const _hoisted_8 = ["value"];
const _hoisted_9 = { class: "monsterinsights-overview-ecommerce-funnel__header-right" };
const _hoisted_10 = {
  href: "/wp-admin/admin.php?page=monsterinsights_reports#/ecommerce-funnel",
  class: "monsterinsights-overview-ecommerce-funnel__view-link"
};
const _hoisted_11 = {
  key: 0,
  class: "monsterinsights-overview-ecommerce-funnel__loading"
};
const _hoisted_12 = {
  key: 1,
  class: "monsterinsights-overview-ecommerce-funnel__error"
};
const _hoisted_13 = {
  key: 2,
  class: "monsterinsights-overview-ecommerce-funnel__table-wrapper"
};
const _hoisted_14 = { class: "monsterinsights-overview-ecommerce-funnel__table" };
const _hoisted_15 = { class: "monsterinsights-overview-ecommerce-funnel__th-content" };
const _hoisted_16 = { class: "monsterinsights-overview-ecommerce-funnel__th-content" };
const _hoisted_17 = { class: "monsterinsights-overview-ecommerce-funnel__th-content" };
const _hoisted_18 = { class: "monsterinsights-overview-ecommerce-funnel__th-content" };
const _hoisted_19 = { class: "monsterinsights-overview-ecommerce-funnel__th-content" };
const _hoisted_20 = { class: "monsterinsights-overview-ecommerce-funnel__th-content" };
const _hoisted_21 = {
  key: 3,
  class: "monsterinsights-overview-ecommerce-funnel__empty"
};
const _hoisted_22 = {
  key: 4,
  class: "monsterinsights-overview-ecommerce-funnel__empty"
};
const _sfc_main$2 = {
  __name: "OverviewEcommerceFunnel",
  props: {
    dateRange: {
      type: Object,
      default: () => ({ start: "", end: "" })
    }
  },
  setup(__props) {
    const props = __props;
    const overviewStore = useOverviewReportStore();
    const gradientColors = /* @__PURE__ */ (() => {
      return { c1: "#EDE5FF", c2: "#D0E8FF", c3: "#FFFFFF" };
    })();
    function getRowGradientStyle(barPercent) {
      if (barPercent <= 0) return {};
      const { c1, c2, c3 } = gradientColors;
      const mid = barPercent / 2;
      return {
        background: `linear-gradient(to right, ${c1} 0%, ${c2} ${mid}%, ${c3} ${barPercent}%, ${c3} 100%)`
      };
    }
    const funnelModalOpen = ref(false);
    const selectedFunnelId = ref("");
    const funnelDataRef = ref(null);
    const funnelLoading = ref(false);
    const funnelError = ref(null);
    watch(
      () => overviewStore.activeFunnelId,
      (newId) => {
        selectedFunnelId.value = newId || "";
      },
      { immediate: true }
    );
    const onFunnelChange = () => {
      overviewStore.setActiveFunnelId(selectedFunnelId.value || null);
    };
    const openFunnelModal = () => {
      {
        overviewStore.openProModal();
        return;
      }
    };
    const closeFunnelModal = () => {
      funnelModalOpen.value = false;
    };
    const activeFunnel = computed(() => overviewStore.activeFunnel);
    const apiFilters = computed(
      () => buildApiFilters(overviewStore.activeFilters, overviewStore.activeDevice)
    );
    function normalizeFunnelApiResponse(raw, funnelSteps = []) {
      const rows = Array.isArray(raw) ? raw : Array.isArray(raw?.funnelTable?.rows) ? raw.funnelTable.rows : Array.isArray(raw?.data) ? raw.data : Array.isArray(raw?.rows) ? raw.rows : [];
      let totalRows = rows.filter(
        (r) => r.d && Array.isArray(r.d) && r.d[1] === "RESERVED_TOTAL"
      );
      if (totalRows.length === 0 && rows.length > 0) {
        totalRows = rows.filter(
          (r) => r.d && Array.isArray(r.d) && r.m && Array.isArray(r.m)
        );
      }
      totalRows.sort((a, b) => {
        const labelA = String(a.d?.[0] ?? "");
        const labelB = String(b.d?.[0] ?? "");
        const numA = parseInt(labelA.split(".")[0], 10) || 0;
        const numB = parseInt(labelB.split(".")[0], 10) || 0;
        return numA - numB;
      });
      if (funnelSteps.length > 0 && totalRows.length < funnelSteps.length) {
        const existingByIndex = /* @__PURE__ */ new Map();
        totalRows.forEach((row) => {
          const label = String(row.d?.[0] ?? "");
          const num = parseInt(label.split(".")[0], 10);
          if (num > 0) existingByIndex.set(num, row);
        });
        const filled = funnelSteps.map((step, idx) => {
          const stepNum = idx + 1;
          if (existingByIndex.has(stepNum)) {
            return existingByIndex.get(stepNum);
          }
          return {
            d: [`${stepNum}. ${step.value}`, "RESERVED_TOTAL"],
            m: [["0", "0", "0", "0"]]
          };
        });
        totalRows = filled;
      }
      const step1Count = totalRows.length ? Number(totalRows[0].m?.[0]?.[0] ?? 0) : 0;
      const steps = totalRows.map((row) => {
        const stepName = String(row.d?.[0] ?? "").trim() || "Step";
        const activeUsers = Number(row.m?.[0]?.[0] ?? 0);
        const completionRateDecimal = Number(row.m?.[0]?.[1] ?? 0);
        const abandonments = Number(row.m?.[0]?.[2] ?? 0);
        const abandonmentRateDecimal = Number(row.m?.[0]?.[3] ?? 0);
        const completionRate = completionRateDecimal * 100;
        const abandonmentRate = abandonmentRateDecimal * 100;
        const overallConversionRate2 = step1Count > 0 ? activeUsers / step1Count * 100 : 0;
        return {
          stepName,
          activeUsers,
          completionRate,
          abandonments,
          abandonmentRate,
          overallConversionRate: overallConversionRate2
        };
      });
      return { steps };
    }
    function normalizeStepToRow(apiStep, index, stepOneCount) {
      const name = apiStep.stepName ?? apiStep.name ?? `Step ${index + 1}`;
      const count = Number(apiStep.activeUsers ?? apiStep.count ?? apiStep.users ?? 0);
      const percentOfStep1 = stepOneCount > 0 ? (count / stepOneCount * 100).toFixed(2) : "0.00";
      const completionRate = apiStep.completionRate != null ? String(apiStep.completionRate).replace(/%$/, "") : null;
      const abandonments = apiStep.abandonments != null ? Number(apiStep.abandonments) : null;
      const abandonmentRate = apiStep.abandonmentRate != null ? String(apiStep.abandonmentRate).replace(/%$/, "") : null;
      const overallConversion = apiStep.overallConversionRate != null ? String(apiStep.overallConversionRate).replace(/%$/, "") : stepOneCount > 0 ? (count / stepOneCount * 100).toFixed(1) : "0.0";
      const displayCompletion = completionRate != null ? `${Number(completionRate).toFixed(1)}%` : "—";
      const displayAbandonments = abandonments != null ? abandonments : "—";
      const displayAbandonmentRate = abandonmentRate != null ? `${Number(abandonmentRate).toFixed(1)}%` : "—";
      const displayOverall = overallConversion != null ? `${Number(overallConversion).toFixed(1)}%` : "0.0%";
      const barPercent = Math.max(10, Math.min(parseFloat(percentOfStep1) * 0.4, 100));
      return {
        stepName: name,
        activeUsers: `${count} (${percentOfStep1}%)`,
        completionRate: displayCompletion,
        abandonments: displayAbandonments,
        abandonmentRate: displayAbandonmentRate,
        overallConversionRate: displayOverall,
        barPercent
      };
    }
    const funnelTableRows = computed(() => {
      const data = funnelDataRef.value;
      if (!data || !Array.isArray(data.steps) || data.steps.length === 0) return [];
      const steps = data.steps;
      const stepOneCount = steps[0] ? Number(steps[0].activeUsers ?? steps[0].count ?? steps[0].users ?? 0) : 0;
      return steps.map(
        (apiStep, index) => normalizeStepToRow(apiStep, index, stepOneCount)
      );
    });
    const overallConversionRate = computed(() => {
      const rows = funnelTableRows.value;
      if (rows.length === 0) {
        const data = funnelDataRef.value;
        if (data && data.overallConversionRate != null) {
          const v = Number(data.overallConversionRate);
          return Number.isFinite(v) ? `${v.toFixed(1)}%` : "0.0%";
        }
        return "0.0%";
      }
      return rows[rows.length - 1].overallConversionRate;
    });
    async function loadFunnelData() {
      const funnel = activeFunnel.value;
      const start = props.dateRange?.start;
      const end = props.dateRange?.end;
      if (!funnel || !start || !end || !funnel.steps || funnel.steps.length < 2) {
        funnelDataRef.value = null;
        funnelError.value = null;
        return;
      }
      funnelLoading.value = true;
      funnelError.value = null;
      try {
        const data = await fetchFunnelData(
          { start, end },
          funnel,
          apiFilters.value
        );
        funnelDataRef.value = normalizeFunnelApiResponse(data, funnel.steps);
      } catch (err) {
        funnelDataRef.value = null;
        funnelError.value = err?.message || "Failed to load funnel data";
      } finally {
        funnelLoading.value = false;
      }
    }
    watch(
      () => [
        activeFunnel.value?.id,
        props.dateRange?.start,
        props.dateRange?.end,
        apiFilters.value
      ],
      () => loadFunnelData(),
      { immediate: true }
    );
    const fetchSavedFunnels = () => {
      const ajaxData = {
        action: "monsterinsights_overview_report_get_funnel_filters",
        nonce: getMiGlobal$1("nonce", "")
      };
      wp.ajax.post(ajaxData).done((response) => {
        if (response && response.funnels) {
          overviewStore.setFunnels(response.funnels);
        }
      }).fail(() => {
        overviewStore.setFunnels([]);
      });
    };
    onMounted(() => {
      fetchSavedFunnels();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("h2", _hoisted_4, toDisplayString(unref(__$1)("Funnels", "google-analytics-for-wordpress")), 1),
            createBaseVNode("div", _hoisted_5, [
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedFunnelId.value = $event),
                class: "monsterinsights-overview-ecommerce-funnel__funnel-select",
                disabled: funnelLoading.value,
                onChange: onFunnelChange
              }, [
                createBaseVNode("option", _hoisted_7, toDisplayString(unref(__$1)("Choose Funnel", "google-analytics-for-wordpress")), 1),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(overviewStore).funnels, (funnel) => {
                  return openBlock(), createElementBlock("option", {
                    key: funnel.id,
                    value: funnel.id
                  }, toDisplayString(funnel.name), 9, _hoisted_8);
                }), 128))
              ], 40, _hoisted_6), [
                [vModelSelect, selectedFunnelId.value]
              ]),
              createVNode(Icon, {
                name: "chevron-down",
                size: 16
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("button", {
              type: "button",
              class: "monsterinsights-overview-ecommerce-funnel__manage-btn",
              onClick: openFunnelModal
            }, [
              createBaseVNode("span", null, toDisplayString(unref(__$1)("Manage Funnels", "google-analytics-for-wordpress")), 1),
              createVNode(Icon, {
                name: "settings",
                size: 16
              })
            ]),
            createBaseVNode("a", _hoisted_10, [
              createBaseVNode("span", null, toDisplayString(unref(__$1)("View Full Report", "google-analytics-for-wordpress")), 1),
              createVNode(Icon, {
                name: "chevron-right",
                size: 20
              })
            ])
          ])
        ]),
        activeFunnel.value && funnelLoading.value ? (openBlock(), createElementBlock("div", _hoisted_11, [
          createBaseVNode("span", null, toDisplayString(unref(__$1)("Loading funnel data...", "google-analytics-for-wordpress")), 1)
        ])) : activeFunnel.value && funnelError.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
          createVNode(Icon, {
            name: "no-saved-filters",
            size: 48
          }),
          createBaseVNode("p", null, toDisplayString(funnelError.value), 1)
        ])) : activeFunnel.value && funnelTableRows.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createBaseVNode("table", _hoisted_14, [
            createBaseVNode("thead", null, [
              createBaseVNode("tr", null, [
                createBaseVNode("th", null, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("span", null, toDisplayString(unref(sprintf)(
                      /* translators: %s - funnel name */
                      unref(__$1)("%s - Steps", "google-analytics-for-wordpress"),
                      activeFunnel.value.name
                    )), 1),
                    createVNode(Icon, {
                      name: "sort",
                      size: 12
                    })
                  ])
                ]),
                createBaseVNode("th", null, [
                  createBaseVNode("div", _hoisted_16, [
                    createBaseVNode("span", null, toDisplayString(unref(__$1)("Active Users (% of Step 1)", "google-analytics-for-wordpress")), 1),
                    createVNode(Icon, {
                      name: "sort",
                      size: 12
                    })
                  ])
                ]),
                createBaseVNode("th", null, [
                  createBaseVNode("div", _hoisted_17, [
                    createBaseVNode("span", null, toDisplayString(unref(__$1)("Completion Rates", "google-analytics-for-wordpress")), 1),
                    createVNode(Icon, {
                      name: "sort",
                      size: 12
                    })
                  ])
                ]),
                createBaseVNode("th", null, [
                  createBaseVNode("div", _hoisted_18, [
                    createBaseVNode("span", null, toDisplayString(unref(__$1)("Abandonments", "google-analytics-for-wordpress")), 1),
                    createVNode(Icon, {
                      name: "sort",
                      size: 12
                    })
                  ])
                ]),
                createBaseVNode("th", null, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("span", null, toDisplayString(unref(__$1)("Abandonment Rate", "google-analytics-for-wordpress")), 1),
                    createVNode(Icon, {
                      name: "sort",
                      size: 12
                    })
                  ])
                ]),
                createBaseVNode("th", null, [
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("span", null, toDisplayString(unref(__$1)("Overall Conversion Rate", "google-analytics-for-wordpress")), 1),
                    createVNode(Icon, {
                      name: "sort",
                      size: 12
                    })
                  ])
                ])
              ])
            ]),
            createBaseVNode("tbody", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(funnelTableRows.value, (row, index) => {
                return openBlock(), createElementBlock("tr", {
                  key: index,
                  style: normalizeStyle(getRowGradientStyle(row.barPercent))
                }, [
                  createBaseVNode("td", null, toDisplayString(row.stepName), 1),
                  createBaseVNode("td", null, toDisplayString(row.activeUsers), 1),
                  createBaseVNode("td", null, toDisplayString(row.completionRate), 1),
                  createBaseVNode("td", null, toDisplayString(row.abandonments), 1),
                  createBaseVNode("td", null, toDisplayString(row.abandonmentRate), 1),
                  createBaseVNode("td", null, toDisplayString(row.overallConversionRate), 1)
                ], 4);
              }), 128))
            ]),
            createBaseVNode("tfoot", null, [
              createBaseVNode("tr", null, [
                createBaseVNode("td", null, toDisplayString(unref(sprintf)(
                  /* translators: %s - funnel name */
                  unref(__$1)("%s Conversion Rate", "google-analytics-for-wordpress"),
                  activeFunnel.value.name
                )), 1),
                _cache[1] || (_cache[1] = createBaseVNode("td", null, null, -1)),
                _cache[2] || (_cache[2] = createBaseVNode("td", null, null, -1)),
                _cache[3] || (_cache[3] = createBaseVNode("td", null, null, -1)),
                _cache[4] || (_cache[4] = createBaseVNode("td", null, null, -1)),
                createBaseVNode("td", null, toDisplayString(overallConversionRate.value), 1)
              ])
            ])
          ])
        ])) : activeFunnel.value && !funnelLoading.value && !funnelError.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
          createVNode(Icon, {
            name: "no-saved-filters",
            size: 64
          }),
          createBaseVNode("p", null, toDisplayString(unref(__$1)("No funnel data for this period", "google-analytics-for-wordpress")), 1)
        ])) : (openBlock(), createElementBlock("div", _hoisted_22, [
          createVNode(Icon, {
            name: "no-saved-filters",
            size: 64
          }),
          createBaseVNode("p", null, toDisplayString(unref(__$1)("Select a funnel to view data", "google-analytics-for-wordpress")), 1)
        ])),
        createVNode(_sfc_main$3, {
          "is-open": funnelModalOpen.value,
          onClose: closeFunnelModal
        }, null, 8, ["is-open"])
      ]);
    };
  }
};
const _sfc_main$1 = {
  __name: "OverviewPremiumReportSection",
  props: {
    dateRange: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const overviewStore = useOverviewReportStore();
    const hasForms = computed(() => isAddonActive("forms"));
    const hasEcommerce = computed(() => isAddonActive("ecommerce"));
    const isEcommerceTab = computed(() => overviewStore.getChartActiveTab === "ecommerce");
    const effectiveFilters = computed(() => {
      const filters = [...overviewStore.activeFilters];
      if (overviewStore.activeDevice) {
        filters.push({
          type: "deviceCategory",
          condition: "is",
          value: overviewStore.activeDevice
        });
      }
      return filters;
    });
    const text = {
      formSubmissions: __$1("Form Submissions", "google-analytics-for-wordpress"),
      eCommerceLog: __$1("eCommerce Log", "google-analytics-for-wordpress"),
      eCommerceData: __$1("eCommerce Data", "google-analytics-for-wordpress")
    };
    const viewFullReportUrls = {
      formSubmissions: "/wp-admin/admin.php?page=monsterinsights_reports#/forms",
      ecommerce: "/wp-admin/admin.php?page=monsterinsights_reports#/ecommerce"
    };
    const formSubmissionsDataRef = ref(null);
    const formSubmissionsLoading = ref(false);
    const ecommerceLoading = ref(false);
    async function loadFormSubmissionsData() {
      if (!props.dateRange.start || !props.dateRange.end) return;
      if (!hasForms.value) {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const sampleBundle = generateSampleBundleData({ dateRange: props.dateRange, apiFilters });
        formSubmissionsDataRef.value = sampleBundle.form_submissions;
        overviewStore.setFormSubmissions(sampleBundle.form_submissions);
        return;
      }
      formSubmissionsLoading.value = true;
      try {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const data = await fetchFormSubmissionsData(props.dateRange, apiFilters);
        formSubmissionsDataRef.value = data;
        overviewStore.setFormSubmissions(data);
      } catch (err) {
        console.error("Error loading form submissions:", err);
        formSubmissionsDataRef.value = null;
        overviewStore.setFormSubmissions(null);
      } finally {
        formSubmissionsLoading.value = false;
      }
    }
    const formSubmissionsTabs = [
      { label: __$1("Source / Medium", "google-analytics-for-wordpress"), value: "sourceMedium" },
      { label: __$1("Campaign", "google-analytics-for-wordpress"), value: "campaign" }
    ];
    const formSubmissionsActiveTab = ref("sourceMedium");
    const formSubmissionsColumnsByTab = {
      sourceMedium: [
        { key: "formSubmitDate", label: __$1("Form Submit Date", "google-analytics-for-wordpress") },
        { key: "formId", label: __$1("Form ID", "google-analytics-for-wordpress") },
        { key: "country", label: __$1("Country", "google-analytics-for-wordpress") },
        { key: "source", label: __$1("Source", "google-analytics-for-wordpress") },
        { key: "medium", label: __$1("Medium", "google-analytics-for-wordpress") }
      ],
      campaign: [
        { key: "campaign", label: __$1("Campaign", "google-analytics-for-wordpress") },
        { key: "formId", label: __$1("Form ID", "google-analytics-for-wordpress") },
        { key: "country", label: __$1("Country", "google-analytics-for-wordpress") },
        { key: "source", label: __$1("Source", "google-analytics-for-wordpress") },
        { key: "medium", label: __$1("Medium", "google-analytics-for-wordpress") }
      ]
    };
    const formSubmissionsActiveColumns = computed(() => formSubmissionsColumnsByTab[formSubmissionsActiveTab.value] || formSubmissionsColumnsByTab.sourceMedium);
    function formatDateHour(dateHourStr) {
      if (!dateHourStr) return "-";
      const s = String(dateHourStr).trim();
      if (s.length === 10) {
        const year = s.substring(0, 4);
        const month = s.substring(4, 6);
        const day = s.substring(6, 8);
        const hour = s.substring(8, 10);
        const date = new Date(year, parseInt(month, 10) - 1, day, parseInt(hour, 10));
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " · " + date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      }
      if (s.length === 8) {
        const year = s.substring(0, 4);
        const month = s.substring(4, 6);
        const day = s.substring(6, 8);
        const date = new Date(year, parseInt(month, 10) - 1, day);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      }
      return s;
    }
    function buildDimIndex(queryId) {
      const dims = QUERY_DIMENSIONS[queryId];
      if (!dims) return {};
      const sorted = getResponseDimensionOrder(dims);
      const map = {};
      sorted.forEach((dim, i) => {
        map[dim] = i;
      });
      return map;
    }
    function getDim(d, index, empty) {
      if (index === void 0) return empty;
      const v = d[index];
      return v !== void 0 && v !== null && String(v).trim() !== "" ? String(v) : empty;
    }
    function parseSourceMediumRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      const idx = buildDimIndex("form_submissions_source_medium");
      return rows.map((row) => {
        const d = row?.d ?? [];
        const dateHour = getDim(d, idx.dateHour, "");
        return {
          formSubmitDate: formatDateHour(dateHour),
          _sort_formSubmitDate: dateHour,
          formId: getDim(d, idx["customEvent:form_id"], empty),
          country: getDim(d, idx.country, empty),
          source: getDim(d, idx.sessionSource, empty),
          medium: getDim(d, idx.sessionMedium, empty)
        };
      });
    }
    function parseCampaignRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      const idx = buildDimIndex("form_submissions_campaign");
      return rows.map((row) => {
        const d = row?.d ?? [];
        return {
          campaign: getDim(d, idx.sessionCampaignName, empty),
          formId: getDim(d, idx["customEvent:form_id"], empty),
          country: getDim(d, idx.country, empty),
          source: getDim(d, idx.sessionSource, empty),
          medium: getDim(d, idx.sessionMedium, empty)
        };
      });
    }
    const formSubmissionsData = computed(() => {
      const tabbedData = formSubmissionsDataRef.value;
      if (!tabbedData) return [];
      const filtered = filterFormSubmissionsData(tabbedData, effectiveFilters.value);
      const tab = formSubmissionsActiveTab.value;
      const tabData = filtered?.[tab];
      if (!tabData) return [];
      return tab === "campaign" ? parseCampaignRows(tabData) : parseSourceMediumRows(tabData);
    });
    const eCommerceLogTabs = [
      { label: __$1("Date", "google-analytics-for-wordpress"), value: "date" },
      { label: __$1("Source / Medium", "google-analytics-for-wordpress"), value: "sourceMedium" },
      { label: __$1("Campaign", "google-analytics-for-wordpress"), value: "campaign" }
    ];
    const eCommerceLogActiveTab = ref("date");
    const eCommerceLogColumnDefs = [
      { key: "transactionDate", label: __$1("Transaction Date", "google-analytics-for-wordpress"), excludeFromTotals: true },
      { key: "transactionId", label: __$1("Transaction ID", "google-analytics-for-wordpress"), excludeFromTotals: true },
      { key: "transactionSource", label: __$1("Transaction Source", "google-analytics-for-wordpress"), excludeFromTotals: true },
      { key: "transactionMedium", label: __$1("Transaction medium", "google-analytics-for-wordpress"), excludeFromTotals: true },
      { key: "transactionCampaign", label: __$1("Transaction Campaign", "google-analytics-for-wordpress"), excludeFromTotals: true },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress") }
    ];
    const ECOMMERCE_LOG_COLUMN_ORDER = {
      date: ["transactionDate", "transactionId", "transactionSource", "transactionMedium", "transactionCampaign", "revenue"],
      sourceMedium: ["transactionSource", "transactionMedium", "transactionDate", "transactionId", "transactionCampaign", "revenue"],
      campaign: ["transactionCampaign", "transactionDate", "transactionId", "transactionSource", "transactionMedium", "revenue"]
    };
    const eCommerceLogColumns = computed(() => {
      const tab = eCommerceLogActiveTab.value;
      const order = ECOMMERCE_LOG_COLUMN_ORDER[tab] || ECOMMERCE_LOG_COLUMN_ORDER.date;
      const keyToCol = Object.fromEntries(eCommerceLogColumnDefs.map((c) => [c.key, c]));
      return order.map((key) => keyToCol[key]).filter(Boolean);
    });
    const eCommerceLogDataRef = ref(null);
    function formatRevenue(value) {
      const num = typeof value === "number" ? value : parseFloat(value);
      if (Number.isNaN(num)) return "—";
      const currency = getMiGlobal("currency", "USD") || "USD";
      return new Intl.NumberFormat(void 0, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
    }
    const ECOMMERCE_LOG_DIM_INDEX = (() => {
      const order = getResponseDimensionOrder(QUERY_DIMENSIONS.ecommerce_log_date || []);
      const idx = {};
      order.forEach((dim, i) => {
        idx[dim] = i;
      });
      return idx;
    })();
    function parseEcommerceLogRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      const idx = ECOMMERCE_LOG_DIM_INDEX;
      return rows.map((row) => {
        const d = row?.d ?? [];
        const m2 = row?.m ?? [];
        const dateHour = getDim(d, idx.dateHour, empty);
        const transactionId = getDim(d, idx.transactionId, empty);
        const source = getDim(d, idx.sessionSource, empty);
        const medium = getDim(d, idx.sessionMedium, empty);
        const campaign = getDim(d, idx.sessionCampaignName, empty);
        const revenueNum = m2[0] != null ? Number(m2[0]) : 0;
        return {
          transactionDate: formatDateHour(dateHour),
          _sort_transactionDate: dateHour,
          transactionId,
          transactionSource: source,
          transactionMedium: medium,
          transactionCampaign: campaign,
          revenue: formatRevenue(revenueNum)
        };
      });
    }
    const eCommerceLogData = computed(() => {
      const rawByTab = eCommerceLogDataRef.value;
      if (!rawByTab) return [];
      const tab = eCommerceLogActiveTab.value;
      const raw = rawByTab[tab];
      return raw ? parseEcommerceLogRows(raw) : [];
    });
    const eCommerceDataTabs = [
      { label: __$1("Coupon", "google-analytics-for-wordpress"), value: "coupon" }
    ];
    const eCommerceDataActiveTab = ref("coupon");
    const eCommerceDataColumns = [
      { key: "productName", label: __$1("Product Name", "google-analytics-for-wordpress") },
      { key: "coupon", label: __$1("Coupon", "google-analytics-for-wordpress"), excludeFromTotals: true },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress") },
      { key: "orders", label: __$1("Orders", "google-analytics-for-wordpress") },
      { key: "percentOfSales", label: __$1("% of Sales", "google-analytics-for-wordpress") }
    ];
    const eCommerceDataDataRef = ref(null);
    const ECOMMERCE_DATA_DIM_INDEX = (() => {
      const order = getResponseDimensionOrder(QUERY_DIMENSIONS.ecommerce_data || []);
      const idx = {};
      order.forEach((dim, i) => {
        idx[dim] = i;
      });
      return idx;
    })();
    function parseEcommerceDataRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      const idx = ECOMMERCE_DATA_DIM_INDEX;
      const parsed = rows.map((row) => {
        const d = row?.d ?? [];
        const m2 = row?.m ?? [];
        const productName = getDim(d, idx.itemName, empty);
        const coupon = getDim(d, idx.orderCoupon, empty);
        const m0 = Array.isArray(m2[0]) ? m2[0] : m2;
        const revenueNum = m0[0] != null ? Number(m0[0]) : 0;
        const orders = m0[1] != null ? String(m0[1]) : "0";
        return {
          productName,
          coupon,
          revenue: formatRevenue(revenueNum),
          revenueNum,
          orders
        };
      });
      const totalRevenue = parsed.reduce((sum, r) => sum + r.revenueNum, 0);
      return parsed.map((r) => {
        const percentOfSales = totalRevenue > 0 ? (r.revenueNum / totalRevenue * 100).toFixed(1) + "%" : "0%";
        return {
          productName: r.productName,
          coupon: r.coupon,
          revenue: r.revenue,
          orders: r.orders,
          percentOfSales
        };
      });
    }
    const eCommerceDataData = computed(() => {
      const raw = eCommerceDataDataRef.value;
      return raw ? parseEcommerceDataRows(raw) : [];
    });
    async function loadEcommerceOverviewData() {
      if (!props.dateRange.start || !props.dateRange.end) return;
      if (!hasEcommerce.value) {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const sampleBundle = generateSampleBundleData({ dateRange: props.dateRange, apiFilters });
        const ecom = sampleBundle.ecommerce_overview;
        eCommerceLogDataRef.value = {
          date: ecom.ecommerce_log_date,
          sourceMedium: ecom.ecommerce_log_source_medium,
          campaign: ecom.ecommerce_log_campaign
        };
        eCommerceDataDataRef.value = ecom.ecommerce_data;
        return;
      }
      ecommerceLoading.value = true;
      try {
        const {
          ecommerce_log_date,
          ecommerce_log_source_medium,
          ecommerce_log_campaign,
          ecommerce_data
        } = await fetchEcommerceOverviewData(props.dateRange, effectiveFilters.value);
        eCommerceLogDataRef.value = {
          date: ecommerce_log_date,
          sourceMedium: ecommerce_log_source_medium,
          campaign: ecommerce_log_campaign
        };
        eCommerceDataDataRef.value = ecommerce_data;
        if (typeof overviewStore.setEcommerceOverview === "function") {
          overviewStore.setEcommerceOverview({
            log: {
              date: ecommerce_log_date,
              sourceMedium: ecommerce_log_source_medium,
              campaign: ecommerce_log_campaign
            },
            data: ecommerce_data
          });
        }
      } catch (err) {
        console.error("Error loading eCommerce overview data:", err);
        eCommerceLogDataRef.value = null;
        eCommerceDataDataRef.value = null;
      } finally {
        ecommerceLoading.value = false;
      }
    }
    watch(
      () => overviewStore.getChartActiveTab,
      (tab) => {
        if (tab === "ecommerce") {
          loadEcommerceOverviewData();
        }
      },
      { immediate: true }
    );
    watch(
      () => [props.dateRange.start, props.dateRange.end],
      () => {
        loadFormSubmissionsData();
        if (overviewStore.getChartActiveTab === "ecommerce") {
          loadEcommerceOverviewData();
        }
      },
      { immediate: false }
    );
    watch(effectiveFilters, () => {
      if (overviewStore.getChartActiveTab === "ecommerce") {
        loadEcommerceOverviewData();
      }
    }, { deep: true });
    onMounted(() => {
      loadFormSubmissionsData();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(OverviewReportTable, {
          title: text.formSubmissions,
          tabs: formSubmissionsTabs,
          "active-tab": formSubmissionsActiveTab.value,
          columns: formSubmissionsActiveColumns.value,
          rows: formSubmissionsData.value,
          loading: formSubmissionsLoading.value,
          "has-load-more": true,
          "show-totals": false,
          "view-full-report-url": viewFullReportUrls.formSubmissions,
          "default-sort-key": formSubmissionsActiveTab.value === "sourceMedium" ? "formSubmitDate" : "campaign",
          "required-addon": hasForms.value ? "" : "forms",
          "required-addon-name": "Forms",
          "onUpdate:activeTab": _cache[0] || (_cache[0] = ($event) => formSubmissionsActiveTab.value = $event)
        }, null, 8, ["title", "active-tab", "columns", "rows", "loading", "view-full-report-url", "default-sort-key", "required-addon"]),
        isEcommerceTab.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createVNode(OverviewReportTable, {
            title: text.eCommerceLog,
            tabs: eCommerceLogTabs,
            "active-tab": eCommerceLogActiveTab.value,
            columns: eCommerceLogColumns.value,
            rows: eCommerceLogData.value,
            loading: ecommerceLoading.value,
            "has-load-more": true,
            "view-full-report-url": viewFullReportUrls.ecommerce,
            "default-sort-key": "transactionDate",
            "required-addon": hasEcommerce.value ? "" : "ecommerce",
            "required-addon-name": "eCommerce",
            "onUpdate:activeTab": _cache[1] || (_cache[1] = ($event) => eCommerceLogActiveTab.value = $event)
          }, null, 8, ["title", "active-tab", "columns", "rows", "loading", "view-full-report-url", "required-addon"]),
          createVNode(OverviewReportTable, {
            title: text.eCommerceData,
            tabs: eCommerceDataTabs,
            "active-tab": eCommerceDataActiveTab.value,
            columns: eCommerceDataColumns,
            rows: eCommerceDataData.value,
            loading: ecommerceLoading.value,
            "has-load-more": true,
            "view-full-report-url": viewFullReportUrls.ecommerce,
            "bar-metric-key": "revenue",
            "required-addon": hasEcommerce.value ? "" : "ecommerce",
            "required-addon-name": "eCommerce",
            "onUpdate:activeTab": _cache[2] || (_cache[2] = ($event) => eCommerceDataActiveTab.value = $event)
          }, null, 8, ["title", "active-tab", "rows", "loading", "view-full-report-url", "required-addon"]),
          hasEcommerce.value ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            "date-range": __props.dateRange
          }, null, 8, ["date-range"])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
};
const _hoisted_1 = {
  key: 0,
  class: "monsterinsights-not-authenticated-notice"
};
const _hoisted_2 = { class: "monsterinsights-settings-input monsterinsights-settings-input-authenticate" };
const _hoisted_3 = { class: "monsterinsights-overview-report-two-col" };
const _sfc_main = {
  __name: "OverviewReport",
  setup(__props) {
    const overviewStore = useOverviewReportStore();
    const { activeFilters: storeActiveFilters, activeDevice: storeActiveDevice } = storeToRefs(overviewStore);
    const dateRange = overviewStore.dateRange;
    const canViewReports = computed(() => getMiGlobal("can_view_reports", true));
    const isAuthenticated = computed(() => isAuthed());
    const needsReAuth = ref(false);
    const shouldBlur = computed(() => !isAuthenticated.value || needsReAuth.value);
    const isPremium = computed(() => isPro());
    const hasPageInsights = computed(() => isAddonActive("page_insights"));
    const effectiveFilters = computed(() => {
      const filters = [...storeActiveFilters.value];
      if (storeActiveDevice.value) {
        filters.push({
          type: "deviceCategory",
          condition: "is",
          value: storeActiveDevice.value
        });
      }
      return filters;
    });
    const text = {
      marketingCampaigns: __$1("Marketing Campaigns", "google-analytics-for-wordpress"),
      pages: __$1("Pages", "google-analytics-for-wordpress"),
      demographics: __$1("Demographics", "google-analytics-for-wordpress"),
      devices: __$1("Devices", "google-analytics-for-wordpress")
    };
    const viewFullReportUrls = {
      marketingCampaigns: "/wp-admin/admin.php?page=monsterinsights_reports#/traffic-campaign",
      pages: "/wp-admin/admin.php?page=monsterinsights_reports#/traffic-landing-pages",
      devices: "/wp-admin/admin.php?page=monsterinsights_reports#/traffic-technology"
    };
    const keyMetricsFullReportUrls = {
      traffic: "/wp-admin/admin.php?page=monsterinsights_reports#/traffic-overview",
      engagement: "/wp-admin/admin.php?page=monsterinsights_reports#/publishers",
      referrals: "/wp-admin/admin.php?page=monsterinsights_reports#/traffic-source-medium",
      ecommerce: "/wp-admin/admin.php?page=monsterinsights_reports#/ecommerce"
    };
    const keyMetricsViewFullReportUrl = computed(() => keyMetricsFullReportUrls[chartActiveTab.value] || "");
    const keyMetricsData = ref(null);
    const chartActiveTab = computed(() => overviewStore.getChartActiveTab);
    const marketingCampaignsDataRef = ref(null);
    const marketingCampaignsLoading = ref(false);
    const pagesLoading = ref(false);
    const demographicsLoading = ref(false);
    const devicesLoading = ref(false);
    function isReAuthError(err) {
      const msg = String(err?.message || err || "").toLowerCase();
      return msg.includes("invalid_grant") || msg.includes("bearer token unavailable");
    }
    function handleApiError(err) {
      if (isReAuthError(err)) {
        needsReAuth.value = true;
      }
    }
    function onOverviewError(err) {
      handleApiError(err);
    }
    function onOverviewDataLoaded(response) {
      keyMetricsData.value = {
        key_metrics: response?.key_metrics ?? null,
        key_metrics_compare: response?.key_metrics_compare ?? null,
        tab_metrics: response?.tab_metrics ?? null
      };
    }
    async function loadMarketingCampaignsData() {
      if (!dateRange.start || !dateRange.end) return;
      marketingCampaignsLoading.value = true;
      try {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const data = await fetchMarketingCampaignsData(dateRange, apiFilters, isPremium.value);
        marketingCampaignsDataRef.value = data;
        overviewStore.setMarketingCampaigns(data);
      } catch (err) {
        console.error("Error loading marketing campaigns:", err);
        handleApiError(err);
        marketingCampaignsDataRef.value = null;
        overviewStore.setMarketingCampaigns(null);
      } finally {
        marketingCampaignsLoading.value = false;
      }
    }
    const pagesDataRef = ref(null);
    async function loadPagesData() {
      if (!dateRange.start || !dateRange.end) return;
      if (!hasPageInsights.value) {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const sampleBundle = generateSampleBundleData({ dateRange, apiFilters });
        pagesDataRef.value = sampleBundle.pages;
        overviewStore.setPages(sampleBundle.pages);
        return;
      }
      pagesLoading.value = true;
      try {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const data = await fetchPagesData(dateRange, apiFilters, isPremium.value);
        pagesDataRef.value = data;
        overviewStore.setPages(data);
      } catch (err) {
        console.error("Error loading pages:", err);
        handleApiError(err);
        pagesDataRef.value = null;
        overviewStore.setPages(null);
      } finally {
        pagesLoading.value = false;
      }
    }
    const demographicsDataRef = ref(null);
    const devicesDataRef = ref(null);
    async function loadDemographicsData() {
      if (!dateRange.start || !dateRange.end) return;
      demographicsLoading.value = true;
      try {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const data = await fetchDemographicsData(dateRange, apiFilters);
        demographicsDataRef.value = data;
        overviewStore.setDemographics(data);
      } catch (err) {
        console.error("Error loading demographics:", err);
        handleApiError(err);
        demographicsDataRef.value = null;
        overviewStore.setDemographics(null);
      } finally {
        demographicsLoading.value = false;
      }
    }
    async function loadDevicesData() {
      if (!dateRange.start || !dateRange.end) return;
      devicesLoading.value = true;
      try {
        const apiFilters = buildApiFilters(effectiveFilters.value, "");
        const data = await fetchDevicesData(dateRange, apiFilters);
        devicesDataRef.value = data;
        overviewStore.setDevices(data);
      } catch (err) {
        console.error("Error loading devices:", err);
        handleApiError(err);
        devicesDataRef.value = null;
        overviewStore.setDevices(null);
      } finally {
        devicesLoading.value = false;
      }
    }
    function scheduleTableDataLoad() {
      if (!canViewReports.value || !isAuthenticated.value || needsReAuth.value) return;
      setTimeout(() => {
        loadMarketingCampaignsData();
        loadPagesData();
        loadDemographicsData();
        loadDevicesData();
      }, 0);
    }
    watch(
      () => [dateRange.start, dateRange.end],
      () => {
        scheduleTableDataLoad();
      },
      { immediate: false }
    );
    watch(
      [storeActiveFilters, storeActiveDevice],
      () => {
        scheduleTableDataLoad();
      },
      { deep: true, immediate: false }
    );
    onMounted(() => {
      scheduleTableDataLoad();
    });
    function parseMarketingCampaignsRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      return rows.map((row) => {
        const dimVal = row?.d?.[0];
        const name = dimVal !== void 0 && dimVal !== null && String(dimVal).trim() !== "" ? String(dimVal) : __$1("(not set)", "google-analytics-for-wordpress");
        const m0 = row?.m?.[0];
        const arr = Array.isArray(m0) ? m0 : [];
        const sessions = parseFloat(arr[0]) || 0;
        const users = parseFloat(arr[1]) || 0;
        const engagementRateDecimal = parseFloat(arr[2]) || 0;
        const engagementRatePercent = engagementRateDecimal * 100;
        const revenue = parseFloat(arr[3]) || 0;
        const purchases = parseFloat(arr[4]) || 0;
        const avgPurchaseRevenue = parseFloat(arr[5]) || 0;
        const conversionRate = sessions > 0 ? purchases / sessions * 100 : 0;
        return {
          campaignName: name,
          sessions: formatNum(sessions),
          users: formatNum(users),
          engagement: formatPct(engagementRatePercent),
          revenue: formatCurr(revenue),
          purchases: formatNum(purchases),
          averageOrderValue: formatCurr(avgPurchaseRevenue),
          conversionRate: formatPct(conversionRate)
        };
      });
    }
    const marketingCampaignsTabs = [
      { label: __$1("Campaign", "google-analytics-for-wordpress"), value: "campaign" },
      { label: __$1("Source", "google-analytics-for-wordpress"), value: "source" },
      { label: __$1("Medium", "google-analytics-for-wordpress"), value: "medium" },
      { label: __$1("Term", "google-analytics-for-wordpress"), value: "term" },
      { label: __$1("Content", "google-analytics-for-wordpress"), value: "content" }
    ];
    const marketingCampaignsActiveTab = ref("campaign");
    const marketingCampaignsColumnLabels = {
      campaign: __$1("Campaign Name", "google-analytics-for-wordpress"),
      source: __$1("Source", "google-analytics-for-wordpress"),
      medium: __$1("Medium", "google-analytics-for-wordpress"),
      term: __$1("Term", "google-analytics-for-wordpress"),
      content: __$1("Content", "google-analytics-for-wordpress")
    };
    const MARKETING_CAMPAIGNS_PRO_ONLY_KEYS = ["purchases", "averageOrderValue", "conversionRate"];
    const marketingCampaignsColumnsBase = [
      { key: "campaignName", label: "", sortable: true },
      { key: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), sortable: true },
      { key: "users", label: __$1("Users", "google-analytics-for-wordpress"), sortable: true },
      { key: "engagement", label: __$1("Engagement", "google-analytics-for-wordpress"), sortable: true },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), sortable: true },
      { key: "purchases", label: __$1("Purchases", "google-analytics-for-wordpress"), sortable: true },
      { key: "averageOrderValue", label: __$1("Average Order Value", "google-analytics-for-wordpress"), sortable: true },
      { key: "conversionRate", label: __$1("Conversion Rate", "google-analytics-for-wordpress"), sortable: true }
    ];
    const marketingCampaignsColumns = computed(() => {
      const label = marketingCampaignsColumnLabels[marketingCampaignsActiveTab.value] ?? marketingCampaignsColumnLabels.campaign;
      const cols = isPremium.value ? marketingCampaignsColumnsBase : marketingCampaignsColumnsBase.filter((col) => !MARKETING_CAMPAIGNS_PRO_ONLY_KEYS.includes(col.key));
      return cols.map((col, i) => i === 0 ? { ...col, label } : col);
    });
    const marketingCampaignsData = computed(() => {
      const raw = marketingCampaignsDataRef.value;
      if (!raw) return [];
      const filtered = filterTabbedData(raw, MC_DIMENSION_TAB, effectiveFilters.value, MC_TAB_TO_QUERY_ID);
      const tabData = filtered[marketingCampaignsActiveTab.value];
      return parseMarketingCampaignsRows(tabData);
    });
    const pagesTabs = [
      { label: __$1("Landing Page", "google-analytics-for-wordpress"), value: "landingPage" },
      { label: __$1("Page Location", "google-analytics-for-wordpress"), value: "pageLocation" },
      { label: __$1("Page Title", "google-analytics-for-wordpress"), value: "pageTitle" },
      { label: __$1("Query String", "google-analytics-for-wordpress"), value: "queryString" }
    ];
    const pagesActiveTab = ref("landingPage");
    const pagesColumnLabels = {
      landingPage: __$1("Landing Page", "google-analytics-for-wordpress"),
      pageLocation: __$1("Page Location", "google-analytics-for-wordpress"),
      pageTitle: __$1("Page Title", "google-analytics-for-wordpress"),
      queryString: __$1("Query String", "google-analytics-for-wordpress")
    };
    const PAGES_PRO_ONLY_KEYS = ["purchases", "averageOrderValue", "conversionRate"];
    const pagesColumnsBase = [
      { key: "landingPage", label: "", sortable: true },
      { key: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), sortable: true },
      { key: "users", label: __$1("Users", "google-analytics-for-wordpress"), sortable: true },
      { key: "engagement", label: __$1("Engagement", "google-analytics-for-wordpress"), sortable: true },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), sortable: true },
      { key: "purchases", label: __$1("Purchases", "google-analytics-for-wordpress"), sortable: true },
      { key: "averageOrderValue", label: __$1("Average Order Value", "google-analytics-for-wordpress"), sortable: true },
      { key: "conversionRate", label: __$1("Conversion Rate", "google-analytics-for-wordpress"), sortable: true }
    ];
    const pagesColumns = computed(() => {
      const label = pagesColumnLabels[pagesActiveTab.value] ?? pagesColumnLabels.landingPage;
      const cols = isPremium.value ? pagesColumnsBase : pagesColumnsBase.filter((col) => !PAGES_PRO_ONLY_KEYS.includes(col.key));
      return cols.map((col, i) => i === 0 ? { ...col, label } : col);
    });
    function parsePagesRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      return rows.map((row) => {
        const dimVal = row?.d?.[0];
        const name = dimVal !== void 0 && dimVal !== null && String(dimVal).trim() !== "" ? String(dimVal) : __$1("(not set)", "google-analytics-for-wordpress");
        const m0 = row?.m?.[0];
        const arr = Array.isArray(m0) ? m0 : [];
        const sessions = parseFloat(arr[0]) || 0;
        const users = parseFloat(arr[1]) || 0;
        const engagementRateDecimal = parseFloat(arr[2]) || 0;
        const engagementRatePercent = engagementRateDecimal * 100;
        const revenue = parseFloat(arr[3]) || 0;
        const purchases = parseFloat(arr[4]) || 0;
        const avgPurchaseRevenue = parseFloat(arr[5]) || 0;
        const conversionRate = sessions > 0 ? purchases / sessions * 100 : 0;
        return {
          landingPage: name,
          sessions: formatNum(sessions),
          users: formatNum(users),
          engagement: formatPct(engagementRatePercent),
          revenue: formatCurr(revenue),
          purchases: formatNum(purchases),
          averageOrderValue: formatCurr(avgPurchaseRevenue),
          conversionRate: formatPct(conversionRate)
        };
      });
    }
    const pagesData = computed(() => {
      const raw = pagesDataRef.value;
      if (!raw) return [];
      const filtered = filterTabbedData(raw, PAGES_DIMENSION_TAB, effectiveFilters.value, PAGES_TAB_TO_QUERY_ID);
      const tabData = filtered[pagesActiveTab.value];
      return parsePagesRows(tabData);
    });
    const demographicsTabs = [
      { label: __$1("Country", "google-analytics-for-wordpress"), value: "country" },
      { label: __$1("State", "google-analytics-for-wordpress"), value: "state" },
      { label: __$1("New vs Returning", "google-analytics-for-wordpress"), value: "newVsReturning" }
    ];
    const demographicsActiveTab = ref("country");
    const demographicsColumnLabels = {
      country: __$1("Country", "google-analytics-for-wordpress"),
      state: __$1("State", "google-analytics-for-wordpress"),
      newVsReturning: __$1("New vs Returning", "google-analytics-for-wordpress")
    };
    const demographicsColumnsBase = [
      { key: "dimensionName", label: "", sortable: true },
      { key: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), sortable: true },
      { key: "engagement", label: __$1("Engagement", "google-analytics-for-wordpress"), sortable: true },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), sortable: true }
    ];
    const demographicsColumns = computed(() => {
      const label = demographicsColumnLabels[demographicsActiveTab.value] ?? demographicsColumnLabels.country;
      return demographicsColumnsBase.map(
        (col, i) => i === 0 ? { ...col, label } : col
      );
    });
    function parseDemographicsRows(apiData) {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      return rows.map((row) => {
        const dimVal = row?.d?.[0];
        const name = dimVal !== void 0 && dimVal !== null && String(dimVal).trim() !== "" ? String(dimVal) : empty;
        const m0 = row?.m?.[0];
        const arr = Array.isArray(m0) ? m0 : [];
        const sessions = parseFloat(arr[0]) || 0;
        const revenue = parseFloat(arr[1]) || 0;
        const engagementRateDecimal = parseFloat(arr[2]) || 0;
        const engagementRatePercent = engagementRateDecimal * 100;
        return {
          dimensionName: name,
          sessions: formatNum(sessions),
          engagement: formatPct(engagementRatePercent),
          revenue: formatCurr(revenue)
        };
      });
    }
    const demographicsData = computed(() => {
      const raw = demographicsDataRef.value;
      if (!raw) return [];
      const filtered = filterTabbedData(raw, DEMOGRAPHICS_DIMENSION_TAB, effectiveFilters.value, DEMOGRAPHICS_TAB_TO_QUERY_ID);
      const tabData = filtered[demographicsActiveTab.value];
      return parseDemographicsRows(tabData);
    });
    const devicesTabs = [
      { label: __$1("Browser", "google-analytics-for-wordpress"), value: "browser" },
      { label: __$1("OS", "google-analytics-for-wordpress"), value: "os" },
      { label: __$1("Size", "google-analytics-for-wordpress"), value: "size" }
    ];
    const devicesActiveTab = ref("browser");
    const devicesColumnLabels = {
      browser: __$1("Browser", "google-analytics-for-wordpress"),
      os: __$1("OS", "google-analytics-for-wordpress"),
      size: __$1("Size", "google-analytics-for-wordpress")
    };
    const devicesColumnsBase = [
      { key: "dimensionName", label: "", iconKey: "icon", sortable: true },
      { key: "sessions", label: __$1("Sessions", "google-analytics-for-wordpress"), sortable: true },
      { key: "engagement", label: __$1("Engagement", "google-analytics-for-wordpress"), sortable: true },
      { key: "revenue", label: __$1("Revenue", "google-analytics-for-wordpress"), sortable: true }
    ];
    const devicesColumns = computed(() => {
      const label = devicesColumnLabels[devicesActiveTab.value] ?? devicesColumnLabels.browser;
      return devicesColumnsBase.map(
        (col, i) => i === 0 ? { ...col, label } : col
      );
    });
    function getDevicesRowIcon(dimensionValue, activeTab) {
      if (activeTab !== "browser" || !dimensionValue) return void 0;
      const name = String(dimensionValue).trim().toLowerCase();
      const browserIcons = {
        chrome: "browsers/chrome",
        firefox: "browsers/firefox",
        safari: "browsers/safari",
        edge: "browsers/edge",
        opera: "browsers/opera",
        brave: "browsers/brave"
      };
      return browserIcons[name] || void 0;
    }
    function parseDevicesRows(apiData, activeTab = "browser") {
      const rows = Array.isArray(apiData?.rows) ? apiData.rows : Array.isArray(apiData) ? apiData : [];
      if (rows.length === 0) return [];
      const empty = __$1("(not set)", "google-analytics-for-wordpress");
      return rows.map((row) => {
        const dimVal = row?.d?.[0];
        const name = dimVal !== void 0 && dimVal !== null && String(dimVal).trim() !== "" ? String(dimVal) : empty;
        const m0 = row?.m?.[0];
        const arr = Array.isArray(m0) ? m0 : [];
        const sessions = parseFloat(arr[0]) || 0;
        const revenue = parseFloat(arr[1]) || 0;
        const engagementRateDecimal = parseFloat(arr[2]) || 0;
        const engagementRatePercent = engagementRateDecimal * 100;
        const icon = getDevicesRowIcon(name, activeTab);
        return {
          dimensionName: name,
          icon: icon || void 0,
          sessions: formatNum(sessions),
          engagement: formatPct(engagementRatePercent),
          revenue: formatCurr(revenue)
        };
      });
    }
    const devicesData = computed(() => {
      const raw = devicesDataRef.value;
      if (!raw) return [];
      const filtered = filterTabbedData(raw, DEVICES_DIMENSION_TAB, effectiveFilters.value, DEVICES_TAB_TO_QUERY_ID);
      const tabData = filtered[devicesActiveTab.value];
      return parseDevicesRows(tabData, devicesActiveTab.value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["monsterinsights-overview-report", { "monsterinsights-blur": shouldBlur.value }])
      }, [
        !canViewReports.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
          createBaseVNode("h3", null, toDisplayString(unref(__$1)("You don't have permission to view MonsterInsights reports.", "google-analytics-for-wordpress")), 1),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("p", null, toDisplayString(unref(__$1)("Please check with your site administrator that your role is included in the MonsterInsights permissions settings.", "google-analytics-for-wordpress")), 1)
          ])
        ])) : createCommentVNode("", true),
        canViewReports.value && !isAuthenticated.value ? (openBlock(), createBlock(AuthModal, {
          key: 1,
          "is-open": true
        })) : createCommentVNode("", true),
        canViewReports.value && needsReAuth.value ? (openBlock(), createBlock(ReAuthModal, {
          key: 2,
          "is-open": true
        })) : createCommentVNode("", true),
        canViewReports.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createVNode(_sfc_main$9, {
            "date-range": unref(dateRange),
            onOverviewDataLoaded,
            onOverviewError
          }, null, 8, ["date-range"]),
          createVNode(_sfc_main$8, {
            "key-metrics-data": keyMetricsData.value,
            "active-tab": chartActiveTab.value,
            "view-full-report-url": keyMetricsViewFullReportUrl.value
          }, null, 8, ["key-metrics-data", "active-tab", "view-full-report-url"]),
          !isPremium.value ? (openBlock(), createBlock(_sfc_main$5, { key: 0 })) : createCommentVNode("", true),
          !(!isPremium.value && chartActiveTab.value === "ecommerce") ? (openBlock(), createBlock(OverviewReportTable, {
            key: 1,
            title: text.marketingCampaigns,
            tabs: marketingCampaignsTabs,
            "active-tab": marketingCampaignsActiveTab.value,
            columns: marketingCampaignsColumns.value,
            rows: marketingCampaignsData.value,
            loading: marketingCampaignsLoading.value,
            "has-load-more": true,
            "view-full-report-url": viewFullReportUrls.marketingCampaigns,
            "onUpdate:activeTab": _cache[0] || (_cache[0] = ($event) => marketingCampaignsActiveTab.value = $event)
          }, null, 8, ["title", "active-tab", "columns", "rows", "loading", "view-full-report-url"])) : createCommentVNode("", true),
          createVNode(OverviewReportTable, {
            title: text.pages,
            tabs: pagesTabs,
            "active-tab": pagesActiveTab.value,
            columns: pagesColumns.value,
            rows: pagesData.value,
            loading: pagesLoading.value,
            "has-load-more": true,
            "view-full-report-url": viewFullReportUrls.pages,
            "required-addon": hasPageInsights.value ? "" : "page_insights",
            "required-addon-name": "Page Insights",
            "onUpdate:activeTab": _cache[1] || (_cache[1] = ($event) => pagesActiveTab.value = $event)
          }, null, 8, ["title", "active-tab", "columns", "rows", "loading", "view-full-report-url", "required-addon"]),
          !(!isPremium.value && chartActiveTab.value === "ecommerce") ? (openBlock(), createBlock(_sfc_main$4, {
            key: 2,
            "date-range": unref(dateRange),
            "is-premium": isPremium.value
          }, null, 8, ["date-range", "is-premium"])) : createCommentVNode("", true),
          createVNode(_sfc_main$1, { "date-range": unref(dateRange) }, null, 8, ["date-range"]),
          createBaseVNode("div", _hoisted_3, [
            createVNode(OverviewReportTable, {
              title: text.demographics,
              tabs: demographicsTabs,
              "active-tab": demographicsActiveTab.value,
              columns: demographicsColumns.value,
              rows: demographicsData.value,
              loading: demographicsLoading.value,
              "has-load-more": true,
              "show-view-full-report": false,
              "onUpdate:activeTab": _cache[2] || (_cache[2] = ($event) => demographicsActiveTab.value = $event)
            }, null, 8, ["title", "active-tab", "columns", "rows", "loading"]),
            createVNode(OverviewReportTable, {
              title: text.devices,
              tabs: devicesTabs,
              "active-tab": devicesActiveTab.value,
              columns: devicesColumns.value,
              rows: devicesData.value,
              loading: devicesLoading.value,
              "has-load-more": true,
              "view-full-report-url": viewFullReportUrls.devices,
              "onUpdate:activeTab": _cache[3] || (_cache[3] = ($event) => devicesActiveTab.value = $event)
            }, null, 8, ["title", "active-tab", "columns", "rows", "loading", "view-full-report-url"])
          ])
        ], 64)) : createCommentVNode("", true)
      ], 2);
    };
  }
};
const OverviewReport = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc9ee503"]]);
export {
  OverviewReport as default
};
