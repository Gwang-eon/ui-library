import { jsx as r } from "react/jsx-runtime";
import i from "./Divider.module.css.js";
const m = ({
  orientation: d = "horizontal",
  thickness: a,
  lineStyle: t = "solid",
  spacing: o = "md",
  children: s,
  textAlign: l = "center",
  className: c = ""
}) => {
  const e = !!s, v = [
    i.divider,
    d === "vertical" && i["divider-vertical"],
    a && i[`divider-${a}`],
    t !== "solid" && i[`divider-${t}`],
    o && i[`divider-spacing-${o}`],
    e && i["divider-with-text"],
    e && l !== "center" && i[`divider-text-${l}`],
    c
  ].filter(Boolean).join(" ");
  return e && d === "horizontal" ? /* @__PURE__ */ r("div", { className: v, role: "separator", "aria-label": "Divider with text", children: /* @__PURE__ */ r("span", { className: i["divider-text"], children: s }) }) : /* @__PURE__ */ r("div", { className: v, role: "separator", "aria-label": "Divider" });
};
m.displayName = "Divider";
export {
  m as Divider
};
//# sourceMappingURL=Divider.js.map
