import { jsxs as i, jsx as a } from "react/jsx-runtime";
import { TrendingUp as g, TrendingDown as u, ArrowRight as $ } from "lucide-react";
import e from "./DeviceAnalytics.module.css.js";
const b = ({
  icon: c,
  iconGradient: d,
  label: l,
  value: n,
  change: s,
  loading: r = !1,
  className: t = ""
}) => r ? /* @__PURE__ */ i("div", { className: `${e.analyticsCard} ${e.loading} ${t}`, children: [
  /* @__PURE__ */ a("div", { className: e.iconSkeleton }),
  /* @__PURE__ */ a("div", { className: e.labelSkeleton }),
  /* @__PURE__ */ a("div", { className: e.valueSkeleton }),
  /* @__PURE__ */ a("div", { className: e.changeSkeleton })
] }) : /* @__PURE__ */ i("div", { className: `${e.analyticsCard} ${t}`, children: [
  /* @__PURE__ */ a("div", { className: e.analyticsIcon, style: { background: d }, children: /* @__PURE__ */ a(c, { size: 24 }) }),
  /* @__PURE__ */ a("div", { className: e.analyticsLabel, children: l }),
  /* @__PURE__ */ a("div", { className: e.analyticsValue, children: n }),
  s && /* @__PURE__ */ i("div", { className: `${e.analyticsChange} ${e[s.type]}`, children: [
    s.type === "positive" ? /* @__PURE__ */ a(g, { size: 16 }) : /* @__PURE__ */ a(u, { size: 16 }),
    /* @__PURE__ */ a("span", { children: s.text })
  ] })
] }), p = ({
  title: c,
  filters: d,
  chart: l,
  loading: n = !1,
  className: s = "",
  children: r
}) => n ? /* @__PURE__ */ i("div", { className: `${e.chartCard} ${e.loading} ${s}`, children: [
  /* @__PURE__ */ a("div", { className: e.chartHeader, children: /* @__PURE__ */ a("div", { className: e.titleSkeleton }) }),
  /* @__PURE__ */ a("div", { className: e.chartPlaceholder, children: /* @__PURE__ */ a("div", { className: e.chartSkeleton }) })
] }) : /* @__PURE__ */ i("div", { className: `${e.chartCard} ${s}`, children: [
  /* @__PURE__ */ i("div", { className: e.chartHeader, children: [
    /* @__PURE__ */ a("div", { className: e.chartTitle, children: c }),
    d && /* @__PURE__ */ a("div", { className: e.chartFilters, children: d })
  ] }),
  l && /* @__PURE__ */ a("div", { className: e.chartContainer, children: l }),
  !l && !r && /* @__PURE__ */ a("div", { className: e.chartPlaceholder, children: "[Chart Placeholder]" }),
  r
] }), C = ({
  name: c,
  status: d,
  healthScore: l,
  healthLevel: n,
  metrics: s,
  statusBadge: r,
  loading: t = !1,
  className: o = ""
}) => {
  const m = n || (l >= 90 ? "excellent" : l >= 75 ? "good" : l >= 60 ? "warning" : "poor");
  return t ? /* @__PURE__ */ i("div", { className: `${e.deviceHealthItem} ${e.loading} ${o}`, children: [
    /* @__PURE__ */ i("div", { className: e.deviceHealthHeader, children: [
      /* @__PURE__ */ a("div", { className: e.nameSkeleton }),
      /* @__PURE__ */ a("div", { className: e.badgeSkeleton })
    ] }),
    /* @__PURE__ */ a("div", { className: e.scoreSkeleton }),
    /* @__PURE__ */ i("div", { className: e.metricsSkeleton, children: [
      /* @__PURE__ */ a("div", { className: e.metricRowSkeleton }),
      /* @__PURE__ */ a("div", { className: e.metricRowSkeleton }),
      /* @__PURE__ */ a("div", { className: e.metricRowSkeleton })
    ] })
  ] }) : /* @__PURE__ */ i("div", { className: `${e.deviceHealthItem} ${o}`, children: [
    /* @__PURE__ */ i("div", { className: e.deviceHealthHeader, children: [
      /* @__PURE__ */ a("div", { className: e.deviceHealthName, children: c }),
      r
    ] }),
    /* @__PURE__ */ a("div", { className: `${e.healthScore} ${e[m]}`, children: l }),
    /* @__PURE__ */ a("div", { className: e.healthMetrics, children: s.map((h, N) => /* @__PURE__ */ i("div", { className: e.healthMetricRow, children: [
      /* @__PURE__ */ i("span", { children: [
        h.label,
        ":"
      ] }),
      /* @__PURE__ */ a("span", { className: e.metricValue, children: h.value })
    ] }, N)) })
  ] });
}, H = ({
  type: c,
  icon: d,
  title: l,
  description: n,
  actionText: s,
  onActionClick: r,
  loading: t = !1,
  className: o = ""
}) => {
  const v = {
    info: {
      background: "var(--color-info-100)",
      color: "var(--color-info-600)"
    },
    success: {
      background: "var(--color-success-100)",
      color: "var(--color-success-600)"
    },
    warning: {
      background: "var(--color-warning-100)",
      color: "var(--color-warning-600)"
    },
    error: {
      background: "var(--color-error-100)",
      color: "var(--color-error-600)"
    }
  };
  return t ? /* @__PURE__ */ i("div", { className: `${e.insightItem} ${e[c]} ${e.loading} ${o}`, children: [
    /* @__PURE__ */ a("div", { className: e.insightIconSkeleton }),
    /* @__PURE__ */ i("div", { className: e.insightContentSkeleton, children: [
      /* @__PURE__ */ a("div", { className: e.insightTitleSkeleton }),
      /* @__PURE__ */ a("div", { className: e.insightDescSkeleton }),
      /* @__PURE__ */ a("div", { className: e.insightActionSkeleton })
    ] })
  ] }) : /* @__PURE__ */ i("div", { className: `${e.insightItem} ${e[c]} ${o}`, children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: e.insightIcon,
        style: {
          backgroundColor: v[c].background,
          color: v[c].color
        },
        children: /* @__PURE__ */ a(d, { size: 20 })
      }
    ),
    /* @__PURE__ */ i("div", { className: e.insightContent, children: [
      /* @__PURE__ */ a("div", { className: e.insightTitle, children: l }),
      /* @__PURE__ */ a("div", { className: e.insightDescription, children: n }),
      s && /* @__PURE__ */ i(
        "div",
        {
          className: e.insightAction,
          onClick: r,
          role: r ? "button" : void 0,
          tabIndex: r ? 0 : void 0,
          children: [
            /* @__PURE__ */ a("span", { children: s }),
            /* @__PURE__ */ a($, { size: 14 })
          ]
        }
      )
    ] })
  ] });
};
export {
  b as AnalyticsCard,
  p as ChartCard,
  C as DeviceHealthItem,
  H as InsightItem
};
//# sourceMappingURL=DeviceAnalytics.js.map
