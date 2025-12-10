import { jsx as s, jsxs as j } from "react/jsx-runtime";
import { useState as D } from "react";
import { ChevronDown as T, ChevronRight as y } from "lucide-react";
import r from "./Tree.module.css.js";
const L = ({
  node: t,
  level: m,
  selectable: a,
  compact: E,
  expandedNodes: o,
  selectedNodes: C,
  onToggle: x,
  onCheck: u,
  onNodeClick: g
}) => {
  const h = t.children && t.children.length > 0, i = o.has(t.id), b = C.has(t.id), k = !h, v = (e) => {
    e.stopPropagation(), h && x(t.id);
  }, S = (e) => {
    e.stopPropagation(), u(t.id, e.target.checked);
  }, n = () => {
    !a && !t.disabled && g(t.id);
  }, d = [
    r.treeNode,
    k && r.treeNodeLeaf,
    t.disabled && r.treeNodeDisabled,
    b && !a && r.treeNodeSelected
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ j("div", { className: d, children: [
    /* @__PURE__ */ j(
      "div",
      {
        className: r.treeNodeContent,
        onClick: n,
        role: a ? void 0 : "button",
        tabIndex: !a && !t.disabled ? 0 : void 0,
        children: [
          h ? /* @__PURE__ */ s(
            "button",
            {
              className: `${r.treeExpandBtn} ${i ? r.treeExpandBtnExpanded : r.treeExpandBtnCollapsed}`,
              onClick: v,
              "aria-expanded": i,
              "aria-label": i ? "Collapse" : "Expand",
              children: i ? /* @__PURE__ */ s(T, { size: 16 }) : /* @__PURE__ */ s(y, { size: 16 })
            }
          ) : /* @__PURE__ */ s("span", { className: r.treeIndent }),
          a && /* @__PURE__ */ s(
            "input",
            {
              type: "checkbox",
              className: r.treeCheckbox,
              checked: b,
              onChange: S,
              disabled: t.disabled,
              onClick: (e) => e.stopPropagation()
            }
          ),
          t.icon && /* @__PURE__ */ s("span", { className: r.treeIcon, children: t.icon }),
          /* @__PURE__ */ s("span", { className: r.treeLabel, children: /* @__PURE__ */ s("span", { className: r.treeLabelText, children: t.label }) }),
          t.badge && /* @__PURE__ */ s("span", { className: r.treeBadge, children: t.badge })
        ]
      }
    ),
    h && i && /* @__PURE__ */ s("div", { className: r.treeChildren, children: t.children.map((e) => /* @__PURE__ */ s(
      L,
      {
        node: e,
        level: m + 1,
        selectable: a,
        compact: E,
        expandedNodes: o,
        selectedNodes: C,
        onToggle: x,
        onCheck: u,
        onNodeClick: g
      },
      e.id
    )) })
  ] });
}, R = ({
  data: t,
  selectable: m = !1,
  compact: a = !1,
  defaultExpandAll: E = !1,
  onSelect: o,
  className: C = ""
}) => {
  const x = () => {
    if (!E) return /* @__PURE__ */ new Set();
    const n = /* @__PURE__ */ new Set(), d = (e) => {
      e.forEach((l) => {
        l.children && l.children.length > 0 && (n.add(l.id), d(l.children));
      });
    };
    return d(t), n;
  }, [u, g] = D(x()), [h, i] = D(/* @__PURE__ */ new Set()), b = (n) => {
    g((d) => {
      const e = new Set(d);
      return e.has(n) ? e.delete(n) : e.add(n), e;
    });
  }, k = (n, d) => {
    const e = new Set(h), l = (f) => {
      let p = [];
      return f.forEach((c) => {
        p.push(c.id), c.children && (p = p.concat(l(c.children)));
      }), p;
    }, w = (f, p) => {
      for (const c of f) {
        if (c.id === p) return c;
        if (c.children) {
          const B = w(c.children, p);
          if (B) return B;
        }
      }
      return null;
    }, N = w(t, n);
    N && (d ? (e.add(n), N.children && l(N.children).forEach((f) => e.add(f))) : (e.delete(n), N.children && l(N.children).forEach((f) => e.delete(f))), i(e), o && o(Array.from(e)));
  }, v = (n) => {
    i(/* @__PURE__ */ new Set([n])), o && o([n]);
  }, S = [
    r.tree,
    m && r.treeSelectable,
    a && r.treeCompact,
    C
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ s("div", { className: S, children: t.map((n) => /* @__PURE__ */ s(
    L,
    {
      node: n,
      level: 0,
      selectable: m,
      compact: a,
      expandedNodes: u,
      selectedNodes: h,
      onToggle: b,
      onCheck: k,
      onNodeClick: v
    },
    n.id
  )) });
};
export {
  R as Tree
};
//# sourceMappingURL=Tree.js.map
