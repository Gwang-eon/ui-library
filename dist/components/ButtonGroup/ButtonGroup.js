import { jsx as e } from "react/jsx-runtime";
import p from "./ButtonGroup.module.css.js";
const u = ({ children: o, className: r = "", ...t }) => {
  const s = [p["btn-group"], r].filter(Boolean).join(" ");
  return /* @__PURE__ */ e("div", { className: s, role: "group", ...t, children: o });
};
u.displayName = "ButtonGroup";
export {
  u as ButtonGroup,
  u as default
};
//# sourceMappingURL=ButtonGroup.js.map
