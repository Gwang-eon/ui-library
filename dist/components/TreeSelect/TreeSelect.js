import { jsxs as i, jsx as r } from "react/jsx-runtime";
import { useState as f, useRef as H, useEffect as J } from "react";
import { X as K, ChevronDown as I, Search as M, ChevronRight as W } from "lucide-react";
import t from "./TreeSelect.module.css.js";
const V = ({
  data: g,
  value: p,
  defaultValue: L = null,
  onChange: k,
  multiple: o = !1,
  showSearch: A = !1,
  searchPlaceholder: z = "Search...",
  placeholder: D = "Select...",
  disabled: d = !1,
  className: O = "",
  clearable: T = !1
}) => {
  const [j, B] = f(
    L
  ), [h, m] = f(!1), [x, R] = f(""), [Q, S] = f(/* @__PURE__ */ new Set()), v = H(null), a = p !== void 0 ? p : j;
  J(() => {
    if (!h) return;
    const e = (s) => {
      v.current && !v.current.contains(s.target) && m(!1);
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, [h]);
  const N = (e) => {
    p === void 0 && B(e), k?.(e);
  }, $ = (e) => {
    if (!d)
      if (o) {
        const s = Array.isArray(a) ? a : a ? [a] : [], c = s.includes(e) ? s.filter((n) => n !== e) : [...s, e];
        N(c);
      } else
        N(e), m(!1);
  }, P = (e) => {
    S((s) => {
      const c = new Set(s);
      return c.has(e) ? c.delete(e) : c.add(e), c;
    });
  }, U = () => {
    if (!a) return "";
    const e = Array.isArray(a) ? a : [a], s = [], c = (n) => {
      n.forEach((l) => {
        e.includes(l.value) && s.push(l.label), l.children && c(l.children);
      });
    };
    return c(g), s.join(", ");
  }, y = (e, s) => {
    if (!s) return e;
    const c = s.toLowerCase(), n = [];
    return e.forEach((l) => {
      const b = l.label.toLowerCase().includes(c), u = l.children ? y(l.children, s) : [];
      (b || u.length > 0) && (n.push({
        ...l,
        children: u.length > 0 ? u : l.children
      }), u.length > 0 && S((G) => new Set(G).add(l.value)));
    }), n;
  }, w = y(g, x), E = (e, s = 0) => {
    const c = e.children && e.children.length > 0, n = Q.has(e.value), l = o ? Array.isArray(a) && a.includes(e.value) : a === e.value;
    return /* @__PURE__ */ i("div", { className: t.treeNode, children: [
      /* @__PURE__ */ i(
        "div",
        {
          className: `${t.treeNodeContent} ${l ? t.treeNodeSelected : ""} ${e.disabled ? t.treeNodeDisabled : ""}`,
          style: { paddingLeft: `${s * 20 + 8}px` },
          children: [
            c ? /* @__PURE__ */ r(
              "button",
              {
                className: t.treeExpandBtn,
                onClick: () => P(e.value),
                "aria-label": n ? "Collapse" : "Expand",
                children: n ? /* @__PURE__ */ r(I, { size: 16 }) : /* @__PURE__ */ r(W, { size: 16 })
              }
            ) : /* @__PURE__ */ r("span", { className: t.treeIndent }),
            o && /* @__PURE__ */ r(
              "input",
              {
                type: "checkbox",
                className: t.treeCheckbox,
                checked: l,
                onChange: () => $(e.value),
                disabled: d || e.disabled
              }
            ),
            /* @__PURE__ */ i(
              "div",
              {
                className: t.treeLabel,
                onClick: () => !o && $(e.value),
                role: o ? void 0 : "button",
                children: [
                  e.icon && /* @__PURE__ */ r("span", { className: t.treeIcon, children: e.icon }),
                  /* @__PURE__ */ r("span", { children: e.label })
                ]
              }
            )
          ]
        }
      ),
      c && n && /* @__PURE__ */ r("div", { className: t.treeChildren, children: e.children.map((b) => E(b, s + 1)) })
    ] }, e.value);
  }, X = (e) => {
    e.stopPropagation(), N(o ? [] : "");
  }, C = U(), F = T && !d && C;
  return /* @__PURE__ */ i("div", { className: `${t.treeselect} ${O}`, ref: v, children: [
    /* @__PURE__ */ i(
      "div",
      {
        className: `${t.treeselectTrigger} ${d ? t.disabled : ""}`,
        onClick: () => !d && m(!h),
        role: "combobox",
        "aria-expanded": h,
        "aria-haspopup": "tree",
        tabIndex: d ? -1 : 0,
        children: [
          /* @__PURE__ */ r("span", { className: `${t.treeselectValue} ${C ? "" : t.placeholder}`, children: C || D }),
          /* @__PURE__ */ i("div", { className: t.treeselectIcons, children: [
            F && /* @__PURE__ */ r(
              "button",
              {
                className: t.treeselectClearBtn,
                onClick: X,
                "aria-label": "Clear selection",
                children: /* @__PURE__ */ r(K, { size: 16 })
              }
            ),
            /* @__PURE__ */ r(
              I,
              {
                className: `${t.treeselectIcon} ${h ? t.treeselectIconOpen : ""}`,
                size: 16
              }
            )
          ] })
        ]
      }
    ),
    h && /* @__PURE__ */ i("div", { className: t.treeselectDropdown, children: [
      A && /* @__PURE__ */ i("div", { className: t.treeselectSearch, children: [
        /* @__PURE__ */ r(M, { className: t.treeselectSearchIcon, size: 16 }),
        /* @__PURE__ */ r(
          "input",
          {
            type: "text",
            className: t.treeselectSearchInput,
            placeholder: z,
            value: x,
            onChange: (e) => R(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ r("div", { className: t.treeselectTree, children: w.length === 0 ? /* @__PURE__ */ r("div", { className: t.treeselectEmpty, children: "No results found" }) : w.map((e) => E(e)) })
    ] })
  ] });
};
export {
  V as TreeSelect
};
//# sourceMappingURL=TreeSelect.js.map
