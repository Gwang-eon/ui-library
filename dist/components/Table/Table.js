import { jsx as l, jsxs as y, Fragment as E } from "react/jsx-runtime";
import { createContext as g, useContext as k, useState as S } from "react";
import { ChevronRight as B } from "lucide-react";
import e from "./Table.module.css.js";
const b = g({}), R = () => k(b), h = ({
  children: t,
  className: a = ""
}) => /* @__PURE__ */ l("div", { className: `${e.tableContainer} ${a}`, children: t }), C = ({
  children: t,
  className: a = ""
}) => /* @__PURE__ */ l("div", { className: `${e.tableWrapper} ${a}`, children: t }), r = ({
  children: t,
  striped: a = !1,
  compact: n = !1,
  stickyHeader: s = !1,
  loading: d = !1,
  className: c = ""
}) => {
  const o = [
    e.table,
    a && e.tableStriped,
    n && e.tableCompact,
    s && e.tableSticky,
    d && e.tableLoading,
    c
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ l(b.Provider, { value: { striped: a, compact: n, stickyHeader: s, loading: d }, children: /* @__PURE__ */ l("table", { className: o, children: t }) });
}, N = ({ children: t, className: a = "" }) => /* @__PURE__ */ l("thead", { className: a, children: t }), f = ({ children: t, className: a = "" }) => {
  const { loading: n } = R();
  return n ? /* @__PURE__ */ l("tbody", { className: a, children: Array.from({ length: 5 }).map((s, d) => /* @__PURE__ */ l("tr", { children: Array.from({ length: 5 }).map((c, o) => /* @__PURE__ */ l("td", { children: /* @__PURE__ */ l("div", { className: e.skeleton, children: /* @__PURE__ */ l("div", { className: e.skeletonText }) }) }, o)) }, d)) }) : /* @__PURE__ */ l("tbody", { className: a, children: t });
}, x = ({
  children: t,
  selected: a = !1,
  onClick: n,
  className: s = ""
}) => {
  const d = [e.row, a && e.selected, s].filter(Boolean).join(" ");
  return /* @__PURE__ */ l("tr", { className: d, onClick: n, children: t });
}, T = ({
  children: t,
  width: a,
  align: n = "left",
  className: s = ""
}) => /* @__PURE__ */ l("td", { className: s, style: {
  width: a,
  textAlign: n
}, children: t }), u = ({
  children: t,
  sortable: a = !1,
  sortDirection: n = null,
  onSort: s,
  width: d,
  align: c = "left",
  className: o = ""
}) => {
  const p = n === "asc" ? e.asc : n === "desc" ? e.desc : "", i = [
    a && e.sortable,
    p,
    o
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ l(
    "th",
    {
      className: i,
      style: {
        width: d,
        textAlign: c
      },
      onClick: () => {
        a && s && s();
      },
      onKeyDown: (m) => {
        a && s && (m.key === "Enter" || m.key === " ") && (m.preventDefault(), s());
      },
      tabIndex: a ? 0 : void 0,
      role: a ? "button" : void 0,
      "aria-sort": n === "asc" ? "ascending" : n === "desc" ? "descending" : void 0,
      children: t
    }
  );
}, v = ({
  children: t,
  expandedContent: a,
  defaultExpanded: n = !1,
  className: s = ""
}) => {
  const [d, c] = S(n), o = () => {
    c(!d);
  }, p = (i) => {
    (i.key === "Enter" || i.key === " ") && (i.preventDefault(), o());
  };
  return /* @__PURE__ */ y(E, { children: [
    /* @__PURE__ */ y("tr", { className: `${e.expandableRow} ${s}`, children: [
      /* @__PURE__ */ l("td", { className: e.expandBtnCell, children: /* @__PURE__ */ l(
        "button",
        {
          className: e.expandBtn,
          onClick: o,
          onKeyDown: p,
          "aria-label": d ? "Collapse row" : "Expand row",
          "aria-expanded": d,
          children: /* @__PURE__ */ l(B, { size: 16, className: e.chevronIcon })
        }
      ) }),
      t
    ] }),
    d && /* @__PURE__ */ l("tr", { className: e.expandedContent, children: /* @__PURE__ */ l("td", { colSpan: 100, children: /* @__PURE__ */ l("div", { className: e.expandedDetails, children: a }) }) })
  ] });
}, w = ({ icon: t, title: a, description: n, action: s }) => /* @__PURE__ */ l("div", { className: e.tableEmptyState, children: /* @__PURE__ */ y("div", { className: e.emptyStateContent, children: [
  t && /* @__PURE__ */ l("div", { className: e.emptyStateIcon, children: t }),
  /* @__PURE__ */ l("h3", { className: e.emptyStateTitle, children: a }),
  n && /* @__PURE__ */ l("p", { className: e.emptyStateDescription, children: n }),
  s && /* @__PURE__ */ l("div", { className: e.emptyStateAction, children: s })
] }) });
r.Container = h;
r.Wrapper = C;
r.Head = N;
r.Body = f;
r.Row = x;
r.Cell = T;
r.HeaderCell = u;
r.ExpandableRow = v;
r.EmptyState = w;
r.displayName = "Table";
h.displayName = "Table.Container";
C.displayName = "Table.Wrapper";
N.displayName = "Table.Head";
f.displayName = "Table.Body";
x.displayName = "Table.Row";
T.displayName = "Table.Cell";
u.displayName = "Table.HeaderCell";
v.displayName = "Table.ExpandableRow";
w.displayName = "Table.EmptyState";
export {
  r as Table
};
//# sourceMappingURL=Table.js.map
