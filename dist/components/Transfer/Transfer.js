import { jsxs as c, jsx as n } from "react/jsx-runtime";
import { useState as u, useMemo as z } from "react";
import { ChevronRight as ae, ChevronsRight as le, ChevronLeft as ce, ChevronsLeft as oe, Search as ie, Inbox as he } from "lucide-react";
import { Button as p } from "../Button/Button.js";
import r from "./Transfer.module.css.js";
const Se = ({
  dataSource: T,
  targetKeys: y,
  defaultTargetKeys: $ = [],
  onChange: M,
  sourceTitle: O = "Source",
  targetTitle: E = "Target",
  showSearch: j = !1,
  sourceSearchPlaceholder: B = "Search...",
  targetSearchPlaceholder: F = "Search...",
  showSelectAll: k = !1,
  compact: I = !1,
  disabled: a = !1,
  emptyText: P = "No items",
  className: R = "",
  render: x
}) => {
  const [q, H] = u($), [C, U] = u(""), [N, D] = u(""), [o, f] = u(/* @__PURE__ */ new Set()), [i, d] = u(/* @__PURE__ */ new Set()), h = y !== void 0 ? y : q, { sourceItems: w, targetItems: b } = z(() => {
    const t = [], e = [];
    return T.forEach((s) => {
      h.includes(s.key) ? e.push(s) : t.push(s);
    }), { sourceItems: t, targetItems: e };
  }, [T, h]), L = (t, e) => {
    if (!e) return t;
    const s = e.toLowerCase();
    return t.filter(
      (v) => v.label.toLowerCase().includes(s) || v.description?.toLowerCase().includes(s)
    );
  }, m = z(
    () => L(w, C),
    [w, C]
  ), g = z(
    () => L(b, N),
    [b, N]
  ), S = (t, e, s) => {
    y === void 0 && H(t), M?.(t, e, s);
  }, G = () => {
    if (a || o.size === 0) return;
    const t = Array.from(o), e = [...h, ...t];
    S(e, "right", t), f(/* @__PURE__ */ new Set());
  }, J = () => {
    if (a || i.size === 0) return;
    const t = Array.from(i), e = h.filter((s) => !t.includes(s));
    S(e, "left", t), d(/* @__PURE__ */ new Set());
  }, V = () => {
    if (a || m.length === 0) return;
    const t = m.filter((s) => !s.disabled).map((s) => s.key), e = [...h, ...t];
    S(e, "right", t), f(/* @__PURE__ */ new Set());
  }, W = () => {
    if (a || g.length === 0) return;
    const t = g.filter((s) => !s.disabled).map((s) => s.key), e = h.filter((s) => !t.includes(s));
    S(e, "left", t), d(/* @__PURE__ */ new Set());
  }, X = (t) => {
    if (a) return;
    const e = new Set(o);
    e.has(t) ? e.delete(t) : e.add(t), f(e);
  }, Y = (t) => {
    if (a) return;
    const e = new Set(i);
    e.has(t) ? e.delete(t) : e.add(t), d(e);
  }, Z = () => {
    if (a) return;
    const t = m.filter((e) => !e.disabled).map((e) => e.key);
    o.size === t.length ? f(/* @__PURE__ */ new Set()) : f(new Set(t));
  }, _ = () => {
    if (a) return;
    const t = g.filter((e) => !e.disabled).map((e) => e.key);
    i.size === t.length ? d(/* @__PURE__ */ new Set()) : d(new Set(t));
  }, A = (t, e, s, v, Q, ee, te, re, se) => {
    const K = e.filter((l) => !l.disabled), ne = K.length > 0 && s.size === K.length;
    return /* @__PURE__ */ c("div", { className: r.transferPanel, children: [
      /* @__PURE__ */ c("div", { className: r.transferHeader, children: [
        /* @__PURE__ */ n("h3", { className: r.transferTitle, children: ee }),
        /* @__PURE__ */ c("span", { className: r.transferCount, children: [
          t.length,
          " ",
          t.length === 1 ? "item" : "items"
        ] })
      ] }),
      j && /* @__PURE__ */ c("div", { className: r.transferSearch, children: [
        /* @__PURE__ */ n(ie, { className: r.transferSearchIcon, size: 16 }),
        /* @__PURE__ */ n(
          "input",
          {
            type: "text",
            className: r.transferSearchInput,
            placeholder: se,
            value: te,
            onChange: (l) => re(l.target.value),
            disabled: a
          }
        )
      ] }),
      k && /* @__PURE__ */ n("div", { className: r.transferSelectAll, children: /* @__PURE__ */ c("label", { className: r.transferSelectAllLabel, children: [
        /* @__PURE__ */ n(
          "input",
          {
            type: "checkbox",
            className: r.transferCheckbox,
            checked: ne,
            onChange: Q,
            disabled: a || e.length === 0
          }
        ),
        /* @__PURE__ */ n("span", { children: "Select All" })
      ] }) }),
      /* @__PURE__ */ n("div", { className: r.transferBody, children: e.length === 0 ? /* @__PURE__ */ n("div", { className: `${r.transferList} ${r.transferListEmpty}`, children: /* @__PURE__ */ c("div", { className: r.transferEmpty, children: [
        /* @__PURE__ */ n(he, { size: 32, style: { opacity: 0.3 } }),
        /* @__PURE__ */ n("p", { children: P })
      ] }) }) : /* @__PURE__ */ n("div", { className: r.transferList, children: e.map((l) => /* @__PURE__ */ c(
        "label",
        {
          className: `${r.transferItem} ${l.disabled ? r.disabled : ""}`,
          children: [
            /* @__PURE__ */ n(
              "input",
              {
                type: "checkbox",
                className: r.transferCheckbox,
                checked: s.has(l.key),
                onChange: () => v(l.key),
                disabled: a || l.disabled
              }
            ),
            /* @__PURE__ */ n("span", { className: r.transferItemLabel, children: x ? x(l) : l.label })
          ]
        },
        l.key
      )) }) }),
      k && /* @__PURE__ */ n("div", { className: r.transferFooter, children: /* @__PURE__ */ c("span", { className: r.transferFooterText, children: [
        s.size,
        " of ",
        e.length,
        " selected"
      ] }) })
    ] });
  };
  return /* @__PURE__ */ c("div", { className: `${r.transfer} ${I ? r.transferCompact : ""} ${R}`, children: [
    A(
      w,
      m,
      o,
      X,
      Z,
      O,
      C,
      U,
      B
    ),
    /* @__PURE__ */ c("div", { className: `${r.transferControls} ${I ? r.transferControlsCompact : ""}`, children: [
      /* @__PURE__ */ n(
        p,
        {
          variant: "primary",
          size: "sm",
          onClick: G,
          disabled: a || o.size === 0,
          "aria-label": "Move selected to target",
          iconOnly: !0,
          children: /* @__PURE__ */ n(ae, { size: 16 })
        }
      ),
      /* @__PURE__ */ n(
        p,
        {
          variant: "ghost",
          size: "sm",
          onClick: V,
          disabled: a || m.length === 0,
          "aria-label": "Move all to target",
          iconOnly: !0,
          children: /* @__PURE__ */ n(le, { size: 16 })
        }
      ),
      /* @__PURE__ */ n(
        p,
        {
          variant: "primary",
          size: "sm",
          onClick: J,
          disabled: a || i.size === 0,
          "aria-label": "Move selected to source",
          iconOnly: !0,
          children: /* @__PURE__ */ n(ce, { size: 16 })
        }
      ),
      /* @__PURE__ */ n(
        p,
        {
          variant: "ghost",
          size: "sm",
          onClick: W,
          disabled: a || g.length === 0,
          "aria-label": "Move all to source",
          iconOnly: !0,
          children: /* @__PURE__ */ n(oe, { size: 16 })
        }
      )
    ] }),
    A(
      b,
      g,
      i,
      Y,
      _,
      E,
      N,
      D,
      F
    )
  ] });
};
export {
  Se as Transfer
};
//# sourceMappingURL=Transfer.js.map
