import { jsxs as r, jsx as n } from "react/jsx-runtime";
import s from "./Spin.module.css.js";
const m = ({
  size: a = "md",
  variant: e = "circle",
  inline: l = !1,
  text: i,
  className: c = "",
  "aria-label": p
}) => {
  const d = [
    s.spin,
    a !== "md" && s[`spin-${a}`],
    e !== "circle" && s[`spin-${e}`],
    l && s["spin-inline"],
    c
  ].filter(Boolean).join(" "), o = () => e === "dots" ? /* @__PURE__ */ r("div", { className: d, role: "status", "aria-label": p || "Loading", children: [
    /* @__PURE__ */ n("span", { className: s["spin-dot"] }),
    /* @__PURE__ */ n("span", { className: s["spin-dot"] }),
    /* @__PURE__ */ n("span", { className: s["spin-dot"] })
  ] }) : e === "bars" ? /* @__PURE__ */ r("div", { className: d, role: "status", "aria-label": p || "Loading", children: [
    /* @__PURE__ */ n("span", { className: s["spin-bar"] }),
    /* @__PURE__ */ n("span", { className: s["spin-bar"] }),
    /* @__PURE__ */ n("span", { className: s["spin-bar"] })
  ] }) : /* @__PURE__ */ n("div", { className: d, role: "status", "aria-label": p || "Loading" });
  return i ? /* @__PURE__ */ r("div", { className: s["spin-container"], children: [
    o(),
    /* @__PURE__ */ n("div", { className: s["spin-text"], children: i })
  ] }) : o();
}, t = ({
  size: a = "md",
  variant: e = "circle",
  text: l,
  className: i = "",
  "aria-label": c
}) => /* @__PURE__ */ r("div", { className: `${s["spin-container"]} ${i}`, children: [
  /* @__PURE__ */ n(m, { size: a, variant: e, "aria-label": c }),
  /* @__PURE__ */ n("div", { className: s["spin-text"], children: l })
] }), N = ({
  size: a = "lg",
  variant: e = "circle",
  text: l,
  className: i = ""
}) => /* @__PURE__ */ n("div", { className: `${s["spin-overlay"]} ${i}`, children: /* @__PURE__ */ n(t, { size: a, variant: e, text: l }) }), u = ({
  size: a = "lg",
  variant: e = "circle",
  text: l,
  className: i = ""
}) => /* @__PURE__ */ n("div", { className: `${s["spin-fullscreen"]} ${i}`, children: /* @__PURE__ */ n(t, { size: a, variant: e, text: l }) });
m.displayName = "Spin";
t.displayName = "SpinContainer";
N.displayName = "SpinOverlay";
u.displayName = "SpinFullscreen";
export {
  m as Spin,
  t as SpinContainer,
  u as SpinFullscreen,
  N as SpinOverlay
};
//# sourceMappingURL=Spin.js.map
