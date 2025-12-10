import { jsxs as l, jsx as a, Fragment as x } from "react/jsx-runtime";
import { ArrowUp as b, ArrowDown as g } from "lucide-react";
import e from "./MetricCard.module.css.js";
const B = ({
  label: i,
  value: d,
  icon: n,
  iconColor: v,
  change: s,
  subtext: m,
  variant: r = "default",
  progress: c,
  chart: t,
  comparative: o,
  onClick: p,
  loading: N = !1,
  className: y = "",
  style: u
}) => {
  const $ = [
    e.metricCard,
    r === "compact" && e.compact,
    r === "live" && e.live,
    r === "alert" && e.alert,
    p && e.clickable,
    N && e.loading,
    y
  ].filter(Boolean).join(" ");
  return N ? /* @__PURE__ */ l("div", { className: $, style: u, children: [
    /* @__PURE__ */ l("div", { className: e.header, children: [
      /* @__PURE__ */ a("div", { className: e.labelSkeleton }),
      /* @__PURE__ */ a("div", { className: e.iconSkeleton })
    ] }),
    /* @__PURE__ */ l("div", { className: e.body, children: [
      /* @__PURE__ */ a("div", { className: e.valueSkeleton }),
      r !== "compact" && /* @__PURE__ */ a("div", { className: e.subtextSkeleton })
    ] })
  ] }) : /* @__PURE__ */ l("div", { className: $, onClick: p, style: u, children: [
    /* @__PURE__ */ l("div", { className: e.header, children: [
      /* @__PURE__ */ a("span", { className: e.label, children: i }),
      /* @__PURE__ */ l("div", { className: e.headerRight, children: [
        r === "live" && /* @__PURE__ */ l("span", { className: `${e.statusBadge} ${e.live}`, children: [
          /* @__PURE__ */ a("span", { className: e.pulse }),
          "Live"
        ] }),
        r === "alert" && /* @__PURE__ */ l("span", { className: `${e.statusBadge} ${e.alert}`, children: [
          /* @__PURE__ */ a("span", { className: e.pulse }),
          "Alert"
        ] }),
        n && /* @__PURE__ */ a(
          n,
          {
            size: 20,
            className: e.icon,
            style: { color: v }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: e.body, children: o ? /* @__PURE__ */ a("div", { className: e.comparative, children: o.map((h, f) => /* @__PURE__ */ l("div", { className: e.comparativeItem, children: [
      /* @__PURE__ */ a("div", { className: e.comparativeLabel, children: h.label }),
      /* @__PURE__ */ a(
        "div",
        {
          className: e.comparativeValue,
          style: { color: h.color },
          children: h.value
        }
      )
    ] }, f)) }) : /* @__PURE__ */ l(x, { children: [
      /* @__PURE__ */ a("div", { className: e.value, children: d }),
      s && /* @__PURE__ */ l("div", { className: `${e.change} ${e[s.type]}`, children: [
        s.type === "positive" && /* @__PURE__ */ a(b, { size: 12 }),
        s.type === "negative" && /* @__PURE__ */ a(g, { size: 12 }),
        /* @__PURE__ */ a("span", { children: s.text })
      ] }),
      m && !s && /* @__PURE__ */ a("div", { className: e.subtext, children: m })
    ] }) }),
    c && /* @__PURE__ */ a("div", { className: e.progressContainer, children: /* @__PURE__ */ a(
      "div",
      {
        className: `${e.progressBar} ${c.color ? e[c.color] : ""}`,
        style: { width: `${c.value}%` }
      }
    ) }),
    t && /* @__PURE__ */ a("div", { className: e.chart, children: t })
  ] });
}, w = ({
  children: i,
  columns: d = 4,
  className: n = ""
}) => /* @__PURE__ */ a(
  "div",
  {
    className: `${e.grid} ${n}`,
    style: {
      gridTemplateColumns: `repeat(auto-fill, minmax(${d === 2 ? "300px" : d === 3 ? "250px" : "200px"}, 1fr))`
    },
    children: i
  }
), z = ({
  data: i,
  color: d = "primary",
  height: n = 40
}) => {
  const v = Math.max(...i), s = Math.min(...i), m = v - s, r = (c, t) => {
    const o = Math.floor((c + 1) / t * 5) * 100 + 200;
    return `var(--color-${d}-${o})`;
  };
  return /* @__PURE__ */ a(
    "div",
    {
      className: e.miniChart,
      style: { height: `${n}px` },
      role: "img",
      "aria-label": "Metric trend visualization",
      children: i.map((c, t) => {
        const o = m === 0 ? 100 : (c - s) / m * 100;
        return /* @__PURE__ */ a(
          "div",
          {
            className: e.chartBar,
            style: {
              height: `${o}%`,
              backgroundColor: r(t, i.length)
            }
          },
          t
        );
      })
    }
  );
};
export {
  B as MetricCard,
  w as MetricCardGrid,
  z as MiniChart,
  B as default
};
//# sourceMappingURL=MetricCard.js.map
