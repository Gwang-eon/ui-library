import { jsx as s, jsxs as d } from "react/jsx-runtime";
import { Inbox as p } from "lucide-react";
import e from "./List.module.css.js";
const y = ({
  children: a,
  interactive: m = !1,
  onClick: t,
  href: i,
  className: l = ""
}) => {
  const n = [
    e.listItem,
    m && e.listItemInteractive,
    l
  ].filter(Boolean).join(" "), r = (o) => {
    t && (o.key === "Enter" || o.key === " ") && (o.preventDefault(), t());
  };
  return i ? /* @__PURE__ */ s(
    "a",
    {
      href: i,
      className: n,
      onClick: t,
      onKeyDown: r,
      children: a
    }
  ) : t ? /* @__PURE__ */ s(
    "div",
    {
      className: n,
      onClick: t,
      onKeyDown: r,
      role: "button",
      tabIndex: 0,
      children: a
    }
  ) : /* @__PURE__ */ s("div", { className: n, children: a });
}, v = ({
  icon: a = /* @__PURE__ */ s(p, { size: 48 }),
  title: m,
  description: t,
  action: i,
  className: l = ""
}) => /* @__PURE__ */ d("div", { className: `${e.emptyState} ${l}`, children: [
  /* @__PURE__ */ s("div", { className: e.emptyStateIcon, children: a }),
  /* @__PURE__ */ s("div", { className: e.emptyStateTitle, children: m }),
  t && /* @__PURE__ */ s("div", { className: e.emptyStateDescription, children: t }),
  i && /* @__PURE__ */ s("div", { className: e.emptyStateAction, children: i })
] }), c = ({ children: a, variant: m = "default", className: t = "" }) => {
  const i = [
    e.list,
    m === "compact" && e.listCompact,
    m === "divided" && e.listDivided,
    t
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ s("div", { className: i, children: a });
};
c.Item = y;
c.EmptyState = v;
export {
  c as List
};
//# sourceMappingURL=List.js.map
