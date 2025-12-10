import { jsxs as o, jsx as e } from "react/jsx-runtime";
import t from "./EmptyState.module.css.js";
const d = ({
  icon: a,
  title: l,
  description: s,
  actions: m,
  size: c = "default",
  className: p = "",
  children: r
}) => {
  const i = [
    t.emptyState,
    c === "compact" && t.emptyStateCompact,
    p
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ o("div", { className: i, children: [
    a && /* @__PURE__ */ e("div", { className: t.emptyStateIcon, children: a }),
    /* @__PURE__ */ e("h3", { className: t.emptyStateTitle, children: l }),
    s && /* @__PURE__ */ e("p", { className: t.emptyStateDescription, children: s }),
    m && /* @__PURE__ */ e("div", { className: t.emptyStateActions, children: m }),
    r
  ] });
};
export {
  d as EmptyState
};
//# sourceMappingURL=EmptyState.js.map
