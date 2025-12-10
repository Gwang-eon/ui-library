import { jsx as r } from "react/jsx-runtime";
import a from "./Badge.module.css.js";
const l = ({
  variant: s = "default",
  size: e = "md",
  children: d,
  className: o = "",
  style: t
}) => {
  const m = [
    a.badge,
    a[`badge-${s}`],
    e !== "md" && a[`badge-${e}`],
    o
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ r("span", { className: m, style: t, children: d });
};
l.displayName = "Badge";
export {
  l as Badge
};
//# sourceMappingURL=Badge.js.map
