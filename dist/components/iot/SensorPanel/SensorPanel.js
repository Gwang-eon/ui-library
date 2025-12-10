import { jsx as s, jsxs as t } from "react/jsx-runtime";
import { Activity as o } from "lucide-react";
import e from "./SensorPanel.module.css.js";
const c = ({ variant: i = "basic", className: a }) => i === "compact" ? /* @__PURE__ */ t("div", { className: `${e.compactCard} ${a || ""}`, children: [
  /* @__PURE__ */ t("div", { className: e.compactHeader, children: [
    /* @__PURE__ */ s("div", { className: `${e.skeleton} ${e.skeletonIcon}`, style: { width: 20, height: 20, borderRadius: 4 } }),
    /* @__PURE__ */ s("div", { className: `${e.skeleton} ${e.skeletonBadge}` })
  ] }),
  /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 14, width: "60%", marginBottom: 8 } }),
  /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 28, width: "40%" } })
] }) : i === "detailed" ? /* @__PURE__ */ t("div", { className: `${e.detailedCard} ${a || ""}`, children: [
  /* @__PURE__ */ t("div", { className: e.cardHeader, children: [
    /* @__PURE__ */ t("div", { className: e.detailedSensorHeader, children: [
      /* @__PURE__ */ s("div", { className: `${e.skeleton}`, style: { width: 40, height: 40, borderRadius: "var(--radius-lg)" } }),
      /* @__PURE__ */ t("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 18, width: "50%", marginBottom: 8 } }),
        /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 14, width: "30%" } })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: `${e.skeleton} ${e.skeletonBadge}` })
  ] }),
  /* @__PURE__ */ t("div", { className: e.cardBody, children: [
    /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 40, width: "60%", marginBottom: 24 } }),
    /* @__PURE__ */ s("div", { className: e.sensorStatsBox, children: [1, 2, 3].map((l) => /* @__PURE__ */ t("div", { className: e.statRow, children: [
      /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 14, width: "40%" } }),
      /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 14, width: "30%" } })
    ] }, l)) })
  ] })
] }) : /* @__PURE__ */ t("div", { className: `${e.basicCard} ${a || ""}`, children: [
  /* @__PURE__ */ t("div", { className: e.sensorHeader, children: [
    /* @__PURE__ */ s("div", { className: `${e.skeleton}`, style: { width: 56, height: 56, borderRadius: "var(--radius-lg)" } }),
    /* @__PURE__ */ t("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 14, width: "60%", marginBottom: 8 } }),
      /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 28, width: "40%" } })
    ] }),
    /* @__PURE__ */ s("div", { className: `${e.skeleton} ${e.skeletonBadge}` })
  ] }),
  /* @__PURE__ */ s("div", { className: e.skeleton, style: { height: 13, width: "70%", marginTop: 16 } })
] }), m = ({ children: i, variant: a = "basic", className: l }) => {
  const d = a === "compact" ? e.compactSensorGrid : e.sensorCardGrid;
  return /* @__PURE__ */ s("div", { className: `${d} ${l || ""}`, children: i });
}, h = ({
  title: i = "No Sensor Data",
  description: a = "No sensors are currently connected. Connect sensors to start monitoring real-time data.",
  actionLabel: l = "Add Sensor",
  onAction: d,
  icon: n = o,
  className: r
}) => /* @__PURE__ */ t("div", { className: `${e.emptyState} ${r || ""}`, children: [
  /* @__PURE__ */ s("div", { className: e.emptyStateIcon, children: /* @__PURE__ */ s(n, { size: 64 }) }),
  /* @__PURE__ */ s("h3", { className: e.emptyStateTitle, children: i }),
  /* @__PURE__ */ s("p", { className: e.emptyStateDescription, children: a }),
  d && /* @__PURE__ */ s("button", { className: e.emptyStateButton, onClick: d, children: l })
] });
m.displayName = "SensorPanel.Grid";
h.displayName = "SensorPanel.EmptyState";
c.displayName = "SensorPanel.Skeleton";
export {
  h as SensorPanelEmptyState,
  m as SensorPanelGrid,
  c as SensorPanelSkeleton
};
//# sourceMappingURL=SensorPanel.js.map
