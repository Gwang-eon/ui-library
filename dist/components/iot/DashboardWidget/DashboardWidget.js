import { jsxs as l, jsx as a } from "react/jsx-runtime";
import { TrendingUp as h, TrendingDown as v } from "lucide-react";
import e from "./DashboardWidget.module.css.js";
const k = ({
  label: d,
  value: t,
  icon: i,
  iconColor: r,
  iconBackground: n,
  trend: s,
  loading: c = !1,
  className: o = ""
}) => c ? /* @__PURE__ */ l("div", { className: `${e.statWidget} ${e.loading} ${o}`, children: [
  /* @__PURE__ */ l("div", { className: e.statHeader, children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ a("div", { className: e.labelSkeleton }),
      /* @__PURE__ */ a("div", { className: e.valueSkeleton })
    ] }),
    /* @__PURE__ */ a("div", { className: e.iconSkeleton })
  ] }),
  /* @__PURE__ */ a("div", { className: e.trendSkeleton })
] }) : /* @__PURE__ */ l("div", { className: `${e.statWidget} ${o}`, children: [
  /* @__PURE__ */ l("div", { className: e.statHeader, children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ a("p", { className: e.statLabel, children: d }),
      /* @__PURE__ */ a("p", { className: e.statValue, children: t })
    ] }),
    i && /* @__PURE__ */ a(
      "div",
      {
        className: e.statIconCircle,
        style: {
          backgroundColor: n,
          color: r
        },
        children: /* @__PURE__ */ a(i, { size: 20 })
      }
    )
  ] }),
  s && /* @__PURE__ */ l("div", { className: e.statChange, children: [
    /* @__PURE__ */ l("span", { className: `${e.statTrend} ${e[s.type]}`, children: [
      s.type === "positive" ? /* @__PURE__ */ a(h, { size: 14 }) : /* @__PURE__ */ a(v, { size: 14 }),
      s.value
    ] }),
    s.period && /* @__PURE__ */ a("span", { className: e.statPeriod, children: s.period })
  ] })
] }), S = ({
  title: d,
  subtitle: t,
  stats: i = [],
  chart: r,
  headerAction: n,
  loading: s = !1,
  className: c = ""
}) => s ? /* @__PURE__ */ l("div", { className: `${e.chartWidget} ${e.loading} ${c}`, children: [
  /* @__PURE__ */ a("div", { className: e.widgetHeader, children: /* @__PURE__ */ a("div", { className: e.headerSkeleton }) }),
  /* @__PURE__ */ a("div", { className: e.widgetBody, children: /* @__PURE__ */ a("div", { className: e.chartPlaceholder, children: "Loading..." }) })
] }) : /* @__PURE__ */ l("div", { className: `${e.chartWidget} ${c}`, children: [
  /* @__PURE__ */ l("div", { className: e.widgetHeader, children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ a("h3", { className: e.widgetTitle, children: d }),
      t && /* @__PURE__ */ a("p", { className: e.widgetSubtitle, children: t })
    ] }),
    n
  ] }),
  /* @__PURE__ */ l("div", { className: e.widgetBody, children: [
    i.length > 0 && /* @__PURE__ */ a("div", { className: e.chartStats, children: i.map((o, m) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ a("p", { className: e.chartStatLabel, children: o.label }),
      /* @__PURE__ */ a("p", { className: e.chartStatValue, children: o.value })
    ] }, m)) }),
    r ? /* @__PURE__ */ a("div", { className: e.chartContainer, children: r }) : /* @__PURE__ */ a("div", { className: e.chartPlaceholder, children: "[Chart Placeholder]" })
  ] })
] }), w = ({
  title: d,
  items: t,
  headerAction: i,
  loading: r = !1,
  className: n = ""
}) => r ? /* @__PURE__ */ l("div", { className: `${e.listWidget} ${e.loading} ${n}`, children: [
  /* @__PURE__ */ a("div", { className: e.widgetHeader, children: /* @__PURE__ */ a("div", { className: e.headerSkeleton }) }),
  /* @__PURE__ */ a("div", { className: e.listContainer, children: [1, 2, 3, 4].map((s) => /* @__PURE__ */ l("div", { className: e.listItemSkeleton, children: [
    /* @__PURE__ */ a("div", { className: e.iconSkeleton }),
    /* @__PURE__ */ l("div", { className: e.contentSkeleton, children: [
      /* @__PURE__ */ a("div", { className: e.titleSkeleton }),
      /* @__PURE__ */ a("div", { className: e.metaSkeleton })
    ] })
  ] }, s)) })
] }) : /* @__PURE__ */ l("div", { className: `${e.listWidget} ${n}`, children: [
  /* @__PURE__ */ l("div", { className: e.widgetHeader, children: [
    /* @__PURE__ */ a("h3", { className: e.widgetTitle, children: d }),
    i
  ] }),
  /* @__PURE__ */ a("div", { className: e.listContainer, children: t.map((s, c) => /* @__PURE__ */ a(N, { ...s }, s.id || c)) })
] }), N = ({
  icon: d,
  iconColor: t,
  iconBackground: i,
  title: r,
  meta: n,
  badge: s,
  onClick: c
}) => {
  const o = [
    e.listItem,
    c && e.clickable
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("div", { className: o, onClick: c, children: [
    d && /* @__PURE__ */ a(
      "div",
      {
        className: e.listIconCircle,
        style: {
          backgroundColor: i,
          color: t
        },
        children: /* @__PURE__ */ a(d, { size: 18 })
      }
    ),
    /* @__PURE__ */ l("div", { className: e.listContent, children: [
      /* @__PURE__ */ a("h4", { className: e.listTitle, children: r }),
      n && /* @__PURE__ */ a("p", { className: e.listMeta, children: n })
    ] }),
    s
  ] });
}, C = ({
  title: d,
  badge: t,
  items: i,
  columns: r = 2,
  loading: n = !1,
  className: s = ""
}) => n ? /* @__PURE__ */ l("div", { className: `${e.statusWidget} ${e.loading} ${s}`, children: [
  /* @__PURE__ */ a("div", { className: e.widgetHeader, children: /* @__PURE__ */ a("div", { className: e.headerSkeleton }) }),
  /* @__PURE__ */ a(
    "div",
    {
      className: e.statusGrid,
      style: { gridTemplateColumns: `repeat(${r}, 1fr)` },
      children: [1, 2, 3, 4].map((c) => /* @__PURE__ */ l("div", { className: e.statusItemSkeleton, children: [
        /* @__PURE__ */ a("div", { className: e.statusCircleSkeleton }),
        /* @__PURE__ */ a("div", { className: e.statusLabelSkeleton })
      ] }, c))
    }
  )
] }) : /* @__PURE__ */ l("div", { className: `${e.statusWidget} ${s}`, children: [
  /* @__PURE__ */ l("div", { className: e.widgetHeader, children: [
    /* @__PURE__ */ a("h3", { className: e.widgetTitle, children: d }),
    t
  ] }),
  /* @__PURE__ */ a(
    "div",
    {
      className: e.statusGrid,
      style: { gridTemplateColumns: `repeat(${r}, 1fr)` },
      children: i.map((c, o) => /* @__PURE__ */ a(g, { ...c }, o))
    }
  )
] }), g = ({ label: d, value: t, color: i = "primary" }) => {
  const r = {
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
    },
    primary: {
      background: "var(--color-primary-100)",
      color: "var(--color-primary-600)"
    }
  };
  return /* @__PURE__ */ l("div", { className: e.statusItem, children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: e.statusValueCircle,
        style: {
          backgroundColor: r[i].background,
          color: r[i].color
        },
        children: t
      }
    ),
    /* @__PURE__ */ a("p", { className: e.statusLabel, children: d })
  ] });
};
export {
  S as ChartWidget,
  w as ListWidget,
  k as StatWidget,
  C as StatusWidget
};
//# sourceMappingURL=DashboardWidget.js.map
