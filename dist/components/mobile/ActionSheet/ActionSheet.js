import { jsxs as l, Fragment as S, jsx as a } from "react/jsx-runtime";
import { useEffect as v } from "react";
import e from "./ActionSheet.module.css.js";
const k = ({
  open: c,
  onClose: n,
  actions: s,
  title: i,
  description: o,
  cancelLabel: d = "Cancel",
  showBackdrop: m = !0,
  className: h = ""
}) => {
  v(() => (c ? document.body.style.overflow = "hidden" : document.body.style.overflow = "", () => {
    document.body.style.overflow = "";
  }), [c]);
  const u = (t) => {
    t.disabled || (t.onAction(), n());
  }, b = `
    ${e.actionSheet}
    ${c ? e.open : ""}
    ${h}
  `.trim(), f = `
    ${e.actionSheetBackdrop}
    ${c ? e.show : ""}
  `.trim();
  return c ? /* @__PURE__ */ l(S, { children: [
    m && /* @__PURE__ */ a(
      "div",
      {
        className: f,
        onClick: n,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ l("div", { className: b, role: "dialog", "aria-modal": "true", "aria-labelledby": i ? "action-sheet-title" : void 0, children: [
      /* @__PURE__ */ l("div", { className: e.actionSheetContent, children: [
        (i || o) && /* @__PURE__ */ l("div", { className: e.actionSheetHeader, children: [
          i && /* @__PURE__ */ a("h3", { id: "action-sheet-title", className: e.actionSheetTitle, children: i }),
          o && /* @__PURE__ */ a("p", { className: e.actionSheetDescription, children: o })
        ] }),
        s.map((t, N) => {
          const r = t.icon;
          return /* @__PURE__ */ l(
            "button",
            {
              className: `
                  ${e.actionSheetItem}
                  ${t.danger ? e.danger : ""}
                `.trim(),
              onClick: () => u(t),
              disabled: t.disabled,
              children: [
                r && /* @__PURE__ */ a(r, { className: e.actionIcon }),
                /* @__PURE__ */ a("span", { children: t.label })
              ]
            },
            N
          );
        })
      ] }),
      /* @__PURE__ */ a("button", { className: e.actionSheetCancel, onClick: n, children: d })
    ] })
  ] }) : null;
};
export {
  k as ActionSheet,
  k as default
};
//# sourceMappingURL=ActionSheet.js.map
