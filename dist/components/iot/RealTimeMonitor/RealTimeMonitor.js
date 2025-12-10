import { jsxs as r, jsx as a } from "react/jsx-runtime";
import { Play as o, Pause as h, Download as N, ChevronUp as u, ChevronDown as $ } from "lucide-react";
import e from "./RealTimeMonitor.module.css.js";
const p = ({
  status: i,
  label: t,
  className: s = ""
}) => /* @__PURE__ */ r("div", { className: `${e.statusIndicator} ${s}`, children: [
  /* @__PURE__ */ a("span", { className: `${e.statusDot} ${e[`status${i.charAt(0).toUpperCase() + i.slice(1)}`]}` }),
  t && /* @__PURE__ */ a("span", { className: e.statusLabel, children: t })
] }), U = ({
  icon: i,
  label: t,
  value: s,
  unit: l,
  change: n,
  changeType: c = "neutral",
  iconColor: d = "primary",
  className: m = ""
}) => /* @__PURE__ */ r("div", { className: `${e.metricCard} ${m}`, children: [
  /* @__PURE__ */ r("div", { className: e.metricHeader, children: [
    /* @__PURE__ */ a("div", { className: `${e.metricIcon} ${e[`metricIcon${d.charAt(0).toUpperCase() + d.slice(1)}`]}`, children: /* @__PURE__ */ a(i, { className: e.icon }) }),
    /* @__PURE__ */ a("div", { className: e.metricLabel, children: t })
  ] }),
  /* @__PURE__ */ r("div", { className: e.metricContent, children: [
    /* @__PURE__ */ r("div", { className: e.metricValue, children: [
      s,
      l && /* @__PURE__ */ a("span", { className: e.metricUnit, children: l })
    ] }),
    n && /* @__PURE__ */ r("div", { className: `${e.metricChange} ${e[`metricChange${c.charAt(0).toUpperCase() + c.slice(1)}`]}`, children: [
      c === "increase" && /* @__PURE__ */ a(u, { size: 14 }),
      c === "decrease" && /* @__PURE__ */ a($, { size: 14 }),
      n
    ] })
  ] })
] }), w = ({
  data: i,
  className: t = ""
}) => /* @__PURE__ */ a("div", { className: `${e.dataStream} ${t}`, children: /* @__PURE__ */ r("table", { className: e.streamTable, children: [
  /* @__PURE__ */ a("thead", { children: /* @__PURE__ */ r("tr", { children: [
    /* @__PURE__ */ a("th", { children: "Sensor" }),
    /* @__PURE__ */ a("th", { children: "Value" }),
    /* @__PURE__ */ a("th", { children: "Status" }),
    /* @__PURE__ */ a("th", { children: "Timestamp" })
  ] }) }),
  /* @__PURE__ */ a("tbody", { children: i.map((s) => /* @__PURE__ */ r(
    "tr",
    {
      className: s.isNew ? e.streamRowNew : "",
      children: [
        /* @__PURE__ */ a("td", { children: s.sensor }),
        /* @__PURE__ */ a("td", { className: e.streamValue, children: s.value }),
        /* @__PURE__ */ a("td", { children: /* @__PURE__ */ a("span", { className: `${e.statusBadge} ${e[`statusBadge${s.status.charAt(0).toUpperCase() + s.status.slice(1)}`]}`, children: s.status }) }),
        /* @__PURE__ */ a("td", { className: e.streamTimestamp, children: s.timestamp })
      ]
    },
    s.id
  )) })
] }) }), f = ({
  title: i,
  status: t = "active",
  lastUpdate: s,
  onPause: l,
  onDownload: n,
  isPaused: c = !1,
  children: d,
  className: m = ""
}) => /* @__PURE__ */ r("div", { className: `${e.monitorContainer} ${m}`, children: [
  /* @__PURE__ */ r("div", { className: e.monitorHeader, children: [
    /* @__PURE__ */ r("div", { className: e.monitorHeaderLeft, children: [
      /* @__PURE__ */ a("h3", { className: e.monitorTitle, children: i }),
      /* @__PURE__ */ a(p, { status: t, label: t }),
      s && /* @__PURE__ */ r("span", { className: e.monitorUpdate, children: [
        "Updated ",
        s
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: e.monitorActions, children: [
      l && /* @__PURE__ */ r(
        "button",
        {
          className: e.btnMonitor,
          onClick: l,
          "aria-label": c ? "Resume monitoring" : "Pause monitoring",
          children: [
            c ? /* @__PURE__ */ a(o, { size: 16 }) : /* @__PURE__ */ a(h, { size: 16 }),
            c ? "Resume" : "Pause"
          ]
        }
      ),
      n && /* @__PURE__ */ r(
        "button",
        {
          className: e.btnMonitor,
          onClick: n,
          "aria-label": "Download data",
          children: [
            /* @__PURE__ */ a(N, { size: 16 }),
            "Download"
          ]
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ a("div", { className: e.monitorContent, children: d })
] }), z = ({
  children: i,
  columns: t = 3,
  className: s = ""
}) => /* @__PURE__ */ a(
  "div",
  {
    className: `${e.metricGrid} ${s}`,
    style: { "--metric-columns": t },
    children: i
  }
);
export {
  w as DataStreamTable,
  z as MetricGrid,
  f as MonitorContainer,
  U as RealtimeMetricCard,
  p as StatusIndicator
};
//# sourceMappingURL=RealTimeMonitor.js.map
