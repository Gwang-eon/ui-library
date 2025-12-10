import { jsxs as n, jsx as i } from "react/jsx-runtime";
import e from "./ActivityLog.module.css.js";
const h = ({
  title: a = "Recent Activity",
  icon: l,
  filters: s,
  children: t,
  maxHeight: r = 500,
  className: o = ""
}) => {
  const c = typeof r == "number" ? `${r}px` : r;
  return /* @__PURE__ */ n("div", { className: `${e.logContainer} ${o}`, children: [
    /* @__PURE__ */ n("div", { className: e.logHeader, children: [
      /* @__PURE__ */ n("div", { className: e.logTitle, children: [
        l && /* @__PURE__ */ i(l, {}),
        /* @__PURE__ */ i("span", { children: a })
      ] }),
      s && /* @__PURE__ */ i("div", { className: e.logFilters, children: s })
    ] }),
    /* @__PURE__ */ i("div", { className: e.logBody, style: { maxHeight: c }, children: t })
  ] });
}, v = ({
  icon: a,
  level: l,
  message: s,
  details: t,
  timestamp: r,
  onClick: o,
  className: c = ""
}) => /* @__PURE__ */ n("div", { className: `${e.logEntry} ${c}`, onClick: o, children: [
  /* @__PURE__ */ i("div", { className: e.logTimestamp, children: r }),
  /* @__PURE__ */ i("div", { className: `${e.logIcon} ${e[`logIcon${l.charAt(0).toUpperCase() + l.slice(1)}`]}`, children: /* @__PURE__ */ i(a, {}) }),
  /* @__PURE__ */ n("div", { className: e.logContent, children: [
    /* @__PURE__ */ i("div", { className: e.logMessage, children: s }),
    t && /* @__PURE__ */ i("div", { className: e.logDetails, children: t })
  ] })
] }), N = ({
  level: a,
  title: l,
  description: s,
  time: t,
  meta: r,
  className: o = ""
}) => /* @__PURE__ */ n("div", { className: `${e.timelineItem} ${o}`, children: [
  /* @__PURE__ */ i("div", { className: `${e.timelineMarker} ${e[`timelineMarker${a.charAt(0).toUpperCase() + a.slice(1)}`]}` }),
  /* @__PURE__ */ n("div", { className: e.timelineContent, children: [
    /* @__PURE__ */ n("div", { className: e.timelineHeader, children: [
      /* @__PURE__ */ n("div", { children: [
        /* @__PURE__ */ i("div", { className: e.timelineTitle, children: l }),
        s && /* @__PURE__ */ i("div", { className: e.timelineDescription, children: s })
      ] }),
      /* @__PURE__ */ i("div", { className: e.timelineTime, children: t })
    ] }),
    r && r.length > 0 && /* @__PURE__ */ i("div", { className: e.timelineMeta, children: r.map((c, d) => /* @__PURE__ */ n("span", { children: [
      /* @__PURE__ */ i(c.icon, {}),
      /* @__PURE__ */ i("span", { children: c.text })
    ] }, d)) })
  ] })
] }), $ = ({
  children: a,
  className: l = ""
}) => /* @__PURE__ */ i("div", { className: `${e.timelineContainer} ${l}`, children: a }), p = ({
  title: a,
  icon: l,
  badge: s,
  children: t,
  className: r = ""
}) => /* @__PURE__ */ n("div", { className: `${e.groupedLog} ${r}`, children: [
  /* @__PURE__ */ n("div", { className: e.logGroupHeader, children: [
    l && /* @__PURE__ */ i(l, {}),
    /* @__PURE__ */ i("span", { children: a }),
    s
  ] }),
  /* @__PURE__ */ i("div", { className: e.logBody, children: t })
] }), u = ({
  children: a,
  className: l = ""
}) => /* @__PURE__ */ i("div", { className: `${e.groupedLogContainer} ${l}`, children: a }), C = ({
  value: a,
  label: l,
  level: s = "info",
  className: t = ""
}) => /* @__PURE__ */ n("div", { className: `${e.logStat} ${t}`, children: [
  /* @__PURE__ */ i("div", { className: `${e.logStatValue} ${e[`logStatValue${s.charAt(0).toUpperCase() + s.slice(1)}`]}`, children: a }),
  /* @__PURE__ */ i("div", { className: e.logStatLabel, children: l })
] }), y = ({
  children: a,
  columns: l = 4,
  className: s = "",
  style: t
}) => /* @__PURE__ */ i(
  "div",
  {
    className: `${e.logStats} ${s}`,
    style: { gridTemplateColumns: `repeat(${l}, 1fr)`, ...t },
    children: a
  }
);
export {
  N as ActivityLogItem,
  u as GroupedLogContainer,
  h as LogContainer,
  v as LogEntry,
  p as LogGroup,
  C as LogStat,
  y as LogStats,
  $ as TimelineContainer
};
//# sourceMappingURL=ActivityLog.js.map
