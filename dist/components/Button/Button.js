import { jsxs as p, jsx as d } from "react/jsx-runtime";
import u from "react";
import t from "./Button.module.css.js";
const y = u.forwardRef(
  ({
    variant: e = "primary",
    size: r = "md",
    loading: s = !1,
    icon: a,
    iconOnly: n = !1,
    children: o,
    className: l = "",
    disabled: m = !1,
    type: b = "button",
    ...f
  }, i) => {
    const c = [
      t.btn,
      t[`btn-${e}`],
      t[`btn-${r}`],
      s && t["btn-loading"],
      n && t["btn-icon"],
      l
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ p(
      "button",
      {
        ref: i,
        type: b,
        className: c,
        disabled: m || s,
        "aria-busy": s,
        ...f,
        children: [
          a && /* @__PURE__ */ d("span", { className: t.btnIconWrapper, children: a }),
          o
        ]
      }
    );
  }
);
y.displayName = "Button";
export {
  y as Button,
  y as default
};
//# sourceMappingURL=Button.js.map
