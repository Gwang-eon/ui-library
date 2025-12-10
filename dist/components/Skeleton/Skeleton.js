import { jsx as c } from "react/jsx-runtime";
import o from "./Skeleton.module.css.js";
const i = ({
  variant: t = "line",
  width: e,
  height: s,
  animation: l = "shimmer",
  className: n = "",
  style: r = {}
}) => {
  const p = [
    o.skeleton,
    o[`skeleton${t.charAt(0).toUpperCase()}${t.slice(1)}`],
    l === "pulse" && o.skeletonPulse,
    n
  ].filter(Boolean).join(" "), m = {
    ...r,
    width: typeof e == "number" ? `${e}px` : e,
    height: typeof s == "number" ? `${s}px` : s
  };
  return /* @__PURE__ */ c("div", { className: p, style: m });
};
export {
  i as Skeleton
};
//# sourceMappingURL=Skeleton.js.map
