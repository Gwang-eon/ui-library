import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { Minus as k, TrendingUp as h, TrendingDown as v } from "lucide-react";
import i from "./KpiCard.module.css.js";
const g = ({
  label: l,
  value: t,
  trend: s,
  trendValue: r,
  trendDescription: c,
  icon: o,
  iconColor: N = "var(--color-primary-500)",
  loading: y = !1,
  className: p,
  onClick: d
}) => {
  if (y)
    return /* @__PURE__ */ e(u, { className: p });
  const $ = () => !s || s === "neutral" ? /* @__PURE__ */ e(k, { size: 14 }) : s === "positive" ? r?.includes("↑") || !r?.includes("↓") && !r?.includes("-") ? /* @__PURE__ */ e(h, { size: 14 }) : /* @__PURE__ */ e(v, { size: 14 }) : s === "negative" ? r?.includes("↑") || !r?.includes("↓") && !r?.includes("-") ? /* @__PURE__ */ e(h, { size: 14 }) : /* @__PURE__ */ e(v, { size: 14 }) : null, m = r?.replace(/[↑↓→]/g, "").trim();
  return /* @__PURE__ */ a(
    "div",
    {
      className: `${i.kpiCard} ${p || ""}`,
      onClick: d,
      role: d ? "button" : void 0,
      tabIndex: d ? 0 : void 0,
      onKeyDown: (n) => {
        d && (n.key === "Enter" || n.key === " ") && (n.preventDefault(), d());
      },
      children: [
        /* @__PURE__ */ a("div", { className: i.kpiHeader, children: [
          /* @__PURE__ */ e("div", { className: i.kpiLabel, children: l }),
          o && /* @__PURE__ */ e(o, { size: 24, style: { color: N } })
        ] }),
        /* @__PURE__ */ e("div", { className: i.kpiValue, children: t }),
        (s || r) && /* @__PURE__ */ a("div", { className: `${i.kpiTrend} ${s ? i[`trend${s.charAt(0).toUpperCase()}${s.slice(1)}`] : ""}`, children: [
          /* @__PURE__ */ a("div", { className: i.trendValue, children: [
            $(),
            m && /* @__PURE__ */ e("span", { children: m })
          ] }),
          c && /* @__PURE__ */ e("span", { className: i.trendDescription, children: c })
        ] })
      ]
    }
  );
}, u = ({ className: l }) => /* @__PURE__ */ a("div", { className: `${i.kpiCard} ${l || ""}`, children: [
  /* @__PURE__ */ a("div", { className: i.kpiHeader, children: [
    /* @__PURE__ */ e("div", { className: `${i.skeleton}`, style: { height: 16, width: "50%" } }),
    /* @__PURE__ */ e("div", { className: `${i.skeleton}`, style: { width: 24, height: 24, borderRadius: 4 } })
  ] }),
  /* @__PURE__ */ e("div", { className: `${i.skeleton}`, style: { height: 40, width: "60%", marginBottom: 8 } }),
  /* @__PURE__ */ e("div", { className: `${i.skeleton}`, style: { height: 14, width: "40%" } })
] }), f = ({ children: l, columns: t = 4, className: s }) => {
  const r = {
    "--kpi-grid-columns": t
  };
  return /* @__PURE__ */ e("div", { className: `${i.kpiCardGrid} ${s || ""}`, style: r, children: l });
};
g.displayName = "KpiCard";
u.displayName = "KpiCard.Skeleton";
f.displayName = "KpiCard.Grid";
export {
  f as KpiCardGrid,
  u as KpiCardSkeleton,
  g as default
};
//# sourceMappingURL=KpiCard.js.map
