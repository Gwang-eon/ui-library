import { jsxs as d, jsx as i } from "react/jsx-runtime";
import e from "./Timeline.module.css.js";
const p = ({ children: l, mode: t = "default", className: s }) => {
  const n = [
    e.timeline,
    t === "compact" && e.timelineCompact,
    t === "alternate" && e.timelineAlternate,
    s
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ i("div", { className: n, children: l });
}, f = ({
  variant: l = "default",
  icon: t,
  time: s,
  title: n,
  description: r,
  meta: c,
  interactive: a = !1,
  onClick: m,
  className: h
}) => {
  const N = [
    e.timelineItem,
    l !== "default" && e[`timeline${l.charAt(0).toUpperCase()}${l.slice(1)}`],
    a && e.timelineInteractive,
    h
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ d("div", { className: N, ...a ? {
    role: "button",
    tabIndex: 0,
    onClick: () => {
      a && m && m();
    },
    onKeyDown: (o) => {
      a && m && (o.key === "Enter" || o.key === " ") && (o.preventDefault(), m());
    },
    "aria-label": typeof n == "string" ? n : void 0
  } : { role: "article" }, children: [
    /* @__PURE__ */ i("div", { className: e.timelineMarker, children: t }),
    /* @__PURE__ */ d("div", { className: e.timelineContent, children: [
      s && /* @__PURE__ */ i("div", { className: e.timelineTime, children: s }),
      /* @__PURE__ */ i("div", { className: e.timelineTitle, children: n }),
      r && /* @__PURE__ */ i("div", { className: e.timelineDescription, children: r }),
      c && /* @__PURE__ */ i("div", { className: e.timelineMeta, children: c })
    ] })
  ] });
};
p.Item = f;
p.displayName = "Timeline";
f.displayName = "Timeline.Item";
export {
  p as Timeline
};
//# sourceMappingURL=Timeline.js.map
