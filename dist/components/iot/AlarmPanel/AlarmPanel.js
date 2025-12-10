import { jsxs as e, jsx as l } from "react/jsx-runtime";
import { Search as I } from "lucide-react";
import a from "./AlarmPanel.module.css.js";
const A = ({
  title: t = "Active Alarms",
  summary: m,
  actions: s,
  filters: d,
  children: c,
  compact: i = !1,
  viewAllLink: n,
  onViewAll: r,
  className: h = ""
}) => /* @__PURE__ */ e("div", { className: `${a.alarmPanel} ${i ? a.alarmPanelCompact : ""} ${h}`, children: [
  /* @__PURE__ */ e("div", { className: a.alarmPanelHeader, children: [
    /* @__PURE__ */ l("h3", { className: a.alarmPanelTitle, children: t }),
    m && !s && !n && /* @__PURE__ */ e("div", { className: a.alarmPanelSummary, children: [
      /* @__PURE__ */ e("span", { className: `${a.alarmCount} ${a.alarmCountCritical}`, children: [
        /* @__PURE__ */ l("span", { className: a.alarmCountBadge, children: m.critical }),
        /* @__PURE__ */ l("span", { className: a.alarmCountLabel, children: "Critical" })
      ] }),
      /* @__PURE__ */ e("span", { className: `${a.alarmCount} ${a.alarmCountWarning}`, children: [
        /* @__PURE__ */ l("span", { className: a.alarmCountBadge, children: m.warning }),
        /* @__PURE__ */ l("span", { className: a.alarmCountLabel, children: "Warning" })
      ] }),
      /* @__PURE__ */ e("span", { className: `${a.alarmCount} ${a.alarmCountInfo}`, children: [
        /* @__PURE__ */ l("span", { className: a.alarmCountBadge, children: m.info }),
        /* @__PURE__ */ l("span", { className: a.alarmCountLabel, children: "Info" })
      ] })
    ] }),
    s && /* @__PURE__ */ l("div", { className: a.alarmPanelActions, children: s }),
    n && /* @__PURE__ */ l(
      "a",
      {
        href: n,
        className: a.alarmPanelLink,
        onClick: (o) => {
          r && (o.preventDefault(), r());
        },
        children: "View All →"
      }
    )
  ] }),
  d,
  /* @__PURE__ */ l("div", { className: a.alarmPanelBody, children: c })
] }), g = ({
  filters: t,
  activeFilter: m,
  onFilterChange: s,
  searchValue: d = "",
  onSearchChange: c,
  searchPlaceholder: i = "Search alarms...",
  className: n = ""
}) => /* @__PURE__ */ e("div", { className: `${a.alarmPanelFilters} ${n}`, children: [
  /* @__PURE__ */ l("div", { className: a.alarmFilterGroup, children: t.map((r) => /* @__PURE__ */ e(
    "button",
    {
      className: `${a.alarmFilterBtn} ${m === r.severity ? a.alarmFilterActive : ""}`,
      onClick: () => s(r.severity),
      children: [
        /* @__PURE__ */ l("span", { children: r.label }),
        /* @__PURE__ */ l("span", { className: a.alarmFilterCount, children: r.count })
      ]
    },
    r.severity
  )) }),
  c && /* @__PURE__ */ e("div", { className: a.alarmSearch, children: [
    /* @__PURE__ */ l(I, { className: a.alarmSearchIcon, size: 16 }),
    /* @__PURE__ */ l(
      "input",
      {
        type: "text",
        className: a.alarmSearchInput,
        placeholder: i,
        value: d,
        onChange: (r) => c(r.target.value)
      }
    )
  ] })
] }), B = ({
  icon: t,
  severity: m,
  title: s,
  description: d,
  meta: c,
  badge: i,
  isNew: n = !1,
  isAcknowledged: r = !1,
  isResolved: h = !1,
  actions: o,
  onClick: p,
  className: C = ""
}) => {
  const u = [
    a.alarmItem,
    a[`alarmItem${m.charAt(0).toUpperCase() + m.slice(1)}`],
    n ? a.alarmItemNew : "",
    r ? a.alarmItemAcknowledged : "",
    h ? a.alarmItemResolved : "",
    C
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ e("div", { className: u, onClick: p, children: [
    /* @__PURE__ */ l("div", { className: a.alarmSeverity, children: /* @__PURE__ */ l(t, { className: a.alarmIcon }) }),
    /* @__PURE__ */ e("div", { className: a.alarmContent, children: [
      i ? /* @__PURE__ */ e("div", { className: a.alarmHeader, children: [
        /* @__PURE__ */ l("h4", { className: a.alarmTitle, children: s }),
        /* @__PURE__ */ l("span", { className: a.alarmBadge, children: i })
      ] }) : /* @__PURE__ */ l("h4", { className: a.alarmTitle, children: s }),
      /* @__PURE__ */ l("p", { className: a.alarmDescription, children: d }),
      c && c.length > 0 && /* @__PURE__ */ l("div", { className: a.alarmMeta, children: c.map((N, v) => /* @__PURE__ */ e("span", { className: a.alarmMetaItem, children: [
        /* @__PURE__ */ l(N.icon, {}),
        /* @__PURE__ */ l("span", { children: N.text })
      ] }, v)) })
    ] }),
    o && /* @__PURE__ */ l("div", { className: a.alarmActions, children: o })
  ] });
}, F = ({
  icon: t,
  severity: m,
  title: s,
  time: d,
  action: c,
  onClick: i,
  className: n = ""
}) => {
  const r = [
    a.alarmItemCompact,
    a[`alarmItemCompact${m.charAt(0).toUpperCase() + m.slice(1)}`],
    n
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ e("div", { className: r, onClick: i, children: [
    /* @__PURE__ */ e("div", { className: a.alarmCompactLeft, children: [
      /* @__PURE__ */ l(t, { className: a.alarmCompactIcon }),
      /* @__PURE__ */ e("div", { className: a.alarmCompactContent, children: [
        /* @__PURE__ */ l("h5", { className: a.alarmCompactTitle, children: s }),
        /* @__PURE__ */ l("p", { className: a.alarmCompactTime, children: d })
      ] })
    ] }),
    c
  ] });
};
export {
  B as AlarmItem,
  F as AlarmItemCompact,
  A as AlarmPanel,
  g as AlarmPanelFilters
};
//# sourceMappingURL=AlarmPanel.js.map
