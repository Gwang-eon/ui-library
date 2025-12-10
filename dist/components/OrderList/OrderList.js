import { jsxs as l, jsx as n } from "react/jsx-runtime";
import { useState as g, useRef as H } from "react";
import { GripVertical as U, ChevronUp as E, ChevronDown as T } from "lucide-react";
import r from "./OrderList.module.css.js";
const f = (c) => null;
f.displayName = "OrderList.Item";
const N = ({
  title: c,
  actions: u,
  children: i,
  draggable: o = !1,
  selectable: D = !1,
  compact: C = !1,
  onReorder: b,
  className: y
}) => {
  const h = Array.isArray(i) ? i : i ? [i] : [], [k, O] = g(h), [d, p] = g(null), L = H(null), m = h.length > 0 ? h : k, w = [
    r.orderList,
    o && r.orderListDraggable,
    D && r.orderListSelectable,
    C && r.orderListCompact,
    y
  ].filter(Boolean).join(" "), v = (t, e) => {
    if (e < 0 || e >= m.length) return;
    const s = [...m], [I] = s.splice(t, 1);
    s.splice(e, 0, I), O(s), b?.(s);
  }, B = (t) => {
    v(t, t - 1);
  }, S = (t) => {
    v(t, t + 1);
  }, A = (t, e) => {
    p(e), t.currentTarget.classList.add(r.orderListItemDragging);
  }, M = (t) => {
    t.currentTarget.classList.remove(r.orderListItemDragging), p(null), L.current = null;
  }, $ = (t, e) => {
    t.preventDefault(), !(d === null || d === e) && (L.current = e);
  }, j = (t, e) => {
    t.preventDefault(), d !== null && (v(d, e), p(null), L.current = null);
  };
  return /* @__PURE__ */ l("div", { className: w, children: [
    (c || u) && /* @__PURE__ */ l("div", { className: r.orderListHeader, children: [
      c && /* @__PURE__ */ n("h3", { children: c }),
      u && /* @__PURE__ */ n("div", { className: r.orderListHeaderActions, children: u })
    ] }),
    /* @__PURE__ */ n("ul", { className: r.orderListItems, children: m.map((t, e) => {
      const s = t?.props || {}, I = e === 0, z = e === m.length - 1;
      return /* @__PURE__ */ l(
        "li",
        {
          className: r.orderListItem,
          "data-index": e,
          draggable: o,
          onDragStart: o ? (a) => A(a, e) : void 0,
          onDragEnd: o ? M : void 0,
          onDragOver: o ? (a) => $(a, e) : void 0,
          onDrop: o ? (a) => j(a, e) : void 0,
          children: [
            o && /* @__PURE__ */ n("div", { className: r.orderListItemDragHandle, children: /* @__PURE__ */ n(U, { size: 16 }) }),
            D && /* @__PURE__ */ n("label", { className: r.orderListItemCheckbox, children: /* @__PURE__ */ n(
              "input",
              {
                type: "checkbox",
                className: "checkbox",
                checked: s.selected || !1,
                onChange: (a) => s.onSelect?.(a.target.checked)
              }
            ) }),
            /* @__PURE__ */ l("div", { className: r.orderListItemContent, children: [
              s.icon && /* @__PURE__ */ n("span", { className: r.orderListItemIcon, children: s.icon }),
              /* @__PURE__ */ n("span", { children: s.children }),
              s.badge && s.badge
            ] }),
            /* @__PURE__ */ l("div", { className: r.orderListItemControls, children: [
              /* @__PURE__ */ n(
                "button",
                {
                  className: `${r.orderListBtn} ${r.orderListBtnUp}`,
                  onClick: () => B(e),
                  disabled: I,
                  "aria-label": "Move up",
                  type: "button",
                  children: /* @__PURE__ */ n(E, { size: 16 })
                }
              ),
              /* @__PURE__ */ n(
                "button",
                {
                  className: `${r.orderListBtn} ${r.orderListBtnDown}`,
                  onClick: () => S(e),
                  disabled: z,
                  "aria-label": "Move down",
                  type: "button",
                  children: /* @__PURE__ */ n(T, { size: 16 })
                }
              )
            ] })
          ]
        },
        s.id || e
      );
    }) })
  ] });
};
N.displayName = "OrderList";
N.Item = f;
export {
  N as OrderList,
  f as OrderListItem
};
//# sourceMappingURL=OrderList.js.map
