import { jsx as l, jsxs as c } from "react/jsx-runtime";
import { useState as x } from "react";
import a from "./Segmented.module.css.js";
const y = ({
  options: t,
  value: s,
  defaultValue: i,
  onChange: g,
  size: n = "md",
  block: u = !1,
  iconOnly: d = !1,
  disabled: m = !1,
  "aria-label": v,
  className: b
}) => {
  const [h, o] = x(
    i || t[0]?.value || ""
  ), f = s !== void 0 ? s : h, S = (e) => {
    s === void 0 && o(e), g?.(e);
  }, I = [
    a.segmented,
    n === "sm" && a.segmentedSm,
    n === "lg" && a.segmentedLg,
    u && a.segmentedBlock,
    d && a.segmentedIconOnly,
    m && a.segmentedDisabled,
    b
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("div", { className: I, role: "radiogroup", "aria-label": v, children: t.map((e) => {
    const N = f === e.value, j = m || e.disabled, r = `segmented-${e.value}-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ c("div", { children: [
      /* @__PURE__ */ l(
        "input",
        {
          type: "radio",
          id: r,
          name: "segmented",
          value: e.value,
          checked: N,
          disabled: j,
          onChange: () => S(e.value),
          hidden: !0
        }
      ),
      /* @__PURE__ */ c(
        "label",
        {
          htmlFor: r,
          className: a.segmentedItem,
          "aria-label": d && typeof e.label == "string" ? e.label : void 0,
          children: [
            e.icon && /* @__PURE__ */ l("span", { className: a.segmentedItemIcon, children: e.icon }),
            !d && e.label && /* @__PURE__ */ l("span", { children: e.label })
          ]
        }
      )
    ] }, e.value);
  }) });
};
y.displayName = "Segmented";
export {
  y as Segmented
};
//# sourceMappingURL=Segmented.js.map
