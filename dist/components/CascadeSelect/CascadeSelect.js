import { jsxs as O, jsx as f } from "react/jsx-runtime";
import { useState as p, useRef as I, useEffect as U } from "react";
import { ChevronDown as V, ChevronRight as _ } from "lucide-react";
import c from "./CascadeSelect.module.css.js";
const $ = ({
  options: u,
  value: N = [],
  onChange: j,
  placeholder: x = "Select...",
  disabled: m = !1,
  className: y = "",
  ...S
}) => {
  const [o, v] = p(!1), [d, k] = p(N), [i, h] = p([]), [P, b] = p(/* @__PURE__ */ new Map()), g = I(null);
  U(() => {
    const t = (e) => {
      g.current && !g.current.contains(e.target) && (v(!1), h([]), b(/* @__PURE__ */ new Map()));
    };
    return o && document.addEventListener("mousedown", t), () => {
      document.removeEventListener("mousedown", t);
    };
  }, [o]);
  const E = () => {
    if (d.length === 0) return x;
    const t = [];
    let e = u;
    for (const s of d) {
      const r = e.find((a) => a.value === s);
      r && (t.push(r.label), e = r.children || []);
    }
    return t.join(" / ");
  }, L = (t) => {
    if (t === 0) return u;
    const e = i.length >= t ? i : d;
    let s = u;
    for (let r = 0; r < t; r++) {
      const a = e[r];
      if (!a) return [];
      const l = s.find((n) => n.value === a);
      if (l?.children)
        s = l.children;
      else
        return [];
    }
    return s;
  }, M = () => {
    let t = 1;
    const e = i.length > 0 ? i : d;
    let s = u;
    for (const r of e) {
      const a = s.find((l) => l.value === r);
      if (a?.children && a.children.length > 0)
        t++, s = a.children;
      else
        break;
    }
    return t;
  }, R = (t, e, s) => {
    if (t.disabled) return;
    const r = [
      ...i.slice(0, e),
      t.value
    ];
    h(r), s && b((a) => {
      const l = new Map(a);
      return l.set(e, s), l;
    });
  }, T = (t, e) => {
    if (t.disabled) return;
    const s = [
      ...i.slice(0, e),
      t.value
    ];
    if (!t.children || t.children.length === 0) {
      k(s), v(!1), h([]), b(/* @__PURE__ */ new Map());
      const r = [];
      let a = u;
      for (const l of s) {
        const n = a.find((C) => C.value === l);
        n && (r.push(n.label), a = n.children || []);
      }
      j?.(s, r);
    } else
      h(s);
  }, w = (t, e) => d[e] === t, B = (t, e) => i[e] === t, H = [
    c["cascade-select"],
    o && c.open,
    m && c.disabled,
    y
  ].filter(Boolean).join(" "), z = [
    c["cascade-trigger"],
    d.length === 0 && c.placeholder
  ].filter(Boolean).join(" "), A = o ? M() : 0;
  return /* @__PURE__ */ O("div", { ref: g, className: H, ...S, children: [
    /* @__PURE__ */ O(
      "button",
      {
        type: "button",
        className: z,
        onClick: () => !m && v(!o),
        disabled: m,
        "aria-haspopup": "listbox",
        "aria-expanded": o,
        children: [
          E(),
          /* @__PURE__ */ f(V, { className: c["select-icon"], size: 18 })
        ]
      }
    ),
    o && /* @__PURE__ */ f("div", { className: c["cascade-panel"], children: Array.from({ length: A }).map((t, e) => {
      const s = L(e);
      if (s.length === 0) return null;
      const r = [
        c["cascade-subpanel"],
        e > 0 && c.nested,
        e > 0 && c.show
      ].filter(Boolean).join(" ");
      let a = 0;
      if (e > 0) {
        const n = P.get(e - 1);
        n && (a = n.offsetTop);
      }
      const l = e > 0 ? {
        position: "absolute",
        left: `${e * 100}%`,
        top: a
      } : {};
      return /* @__PURE__ */ f("div", { className: r, style: l, children: s.map((n) => {
        const C = n.children && n.children.length > 0, D = [
          c["cascade-option"],
          w(n.value, e) && c.selected,
          B(n.value, e) && c.active,
          n.disabled && c.disabled
        ].filter(Boolean).join(" ");
        return /* @__PURE__ */ O(
          "div",
          {
            className: D,
            onClick: () => T(n, e),
            onMouseEnter: (F) => R(n, e, F.currentTarget),
            role: "option",
            "aria-selected": w(n.value, e),
            "aria-disabled": n.disabled,
            children: [
              /* @__PURE__ */ f("span", { children: n.label }),
              C && /* @__PURE__ */ f(_, { className: c["option-arrow"], size: 16 })
            ]
          },
          n.value
        );
      }) }, e);
    }) })
  ] });
};
$.displayName = "CascadeSelect";
export {
  $ as CascadeSelect,
  $ as default
};
//# sourceMappingURL=CascadeSelect.js.map
