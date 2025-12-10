import { jsx as a, jsxs as s } from "react/jsx-runtime";
import { Search as i } from "lucide-react";
import t from "./Toolbar.module.css.js";
const d = ({
  children: r,
  size: o = "default",
  bulk: e = !1,
  className: l = ""
}) => {
  const c = o === "compact" ? t.toolbarCompact : o === "comfortable" ? t.toolbarComfortable : "", n = e ? t.toolbarBulk : "";
  return /* @__PURE__ */ a("div", { className: `${t.toolbar} ${c} ${n} ${l}`, children: r });
}, $ = ({ children: r, className: o = "" }) => /* @__PURE__ */ a("div", { className: `${t.toolbarSection} ${o}`, children: r }), p = () => /* @__PURE__ */ a("div", { className: t.toolbarDivider }), h = ({
  placeholder: r = "Search...",
  value: o,
  onChange: e,
  className: l = ""
}) => /* @__PURE__ */ s("div", { className: `${t.toolbarSearch} ${l}`, children: [
  /* @__PURE__ */ a(i, { size: 20, strokeWidth: 2 }),
  /* @__PURE__ */ a(
    "input",
    {
      type: "text",
      className: t.toolbarSearchInput,
      placeholder: r,
      value: o,
      onChange: e
    }
  )
] }), S = ({
  children: r,
  value: o,
  onChange: e,
  className: l = ""
}) => /* @__PURE__ */ a(
  "select",
  {
    className: `${t.toolbarSelect} ${l}`,
    value: o,
    onChange: e,
    children: r
  }
), f = ({
  count: r,
  label: o = "items selected",
  className: e = ""
}) => /* @__PURE__ */ s("span", { className: `${t.toolbarBulkCount} ${e}`, children: [
  /* @__PURE__ */ a("strong", { children: r }),
  " ",
  o
] });
export {
  d as Toolbar,
  f as ToolbarBulkCount,
  p as ToolbarDivider,
  h as ToolbarSearch,
  $ as ToolbarSection,
  S as ToolbarSelect
};
//# sourceMappingURL=Toolbar.js.map
