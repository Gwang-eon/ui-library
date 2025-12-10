import { jsx as a, jsxs as u, Fragment as g } from "react/jsx-runtime";
import { Check as $, X as j } from "lucide-react";
import s from "./Steps.module.css.js";
const k = ({
  items: n,
  current: i = 0,
  direction: f = "horizontal",
  size: h = "default",
  clickable: l = !1,
  onChange: v,
  className: b
}) => {
  const C = [
    s.steps,
    f === "vertical" && s.stepsVertical,
    h === "small" && s.stepsSm,
    l && s.stepsClickable,
    b
  ].filter(Boolean).join(" "), m = (e, t) => {
    if (t.status)
      switch (t.status) {
        case "finish":
          return "completed";
        case "process":
          return "active";
        case "error":
          return "error";
        case "wait":
          return "wait";
      }
    return e < i ? "completed" : e === i ? "active" : t.disabled ? "disabled" : "wait";
  }, S = (e, t) => {
    !l || t.disabled || e <= i && v?.(e);
  }, N = (e, t, r) => t.icon ? t.icon : r === "completed" ? /* @__PURE__ */ a($, {}) : r === "error" ? /* @__PURE__ */ a(j, {}) : e + 1;
  return /* @__PURE__ */ a(
    "nav",
    {
      className: C,
      role: "navigation",
      "aria-label": "Step progress",
      children: n.map((e, t) => {
        const r = m(t, e), o = l && !e.disabled && t <= i, c = [
          s.step,
          s[`step-${r}`],
          o && s.stepClickable
        ].filter(Boolean).join(" "), p = /* @__PURE__ */ u(g, { children: [
          /* @__PURE__ */ a("div", { className: s.stepIcon, children: N(t, e, r) }),
          /* @__PURE__ */ u("div", { className: s.stepContent, children: [
            /* @__PURE__ */ a("div", { className: s.stepTitle, children: e.title }),
            e.description && /* @__PURE__ */ a("div", { className: s.stepDescription, children: e.description })
          ] })
        ] }), d = `Step ${t + 1} of ${n.length}: ${typeof e.title == "string" ? e.title : "Step"}, ${r}`;
        return o ? /* @__PURE__ */ a(
          "button",
          {
            className: c,
            onClick: () => S(t, e),
            "aria-label": d,
            "aria-current": r === "active" ? "step" : void 0,
            type: "button",
            children: p
          },
          t
        ) : /* @__PURE__ */ a(
          "div",
          {
            className: c,
            "aria-label": d,
            "aria-current": r === "active" ? "step" : void 0,
            children: p
          },
          t
        );
      })
    }
  );
};
k.displayName = "Steps";
export {
  k as Steps
};
//# sourceMappingURL=Steps.js.map
