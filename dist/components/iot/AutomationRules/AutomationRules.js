import { jsxs as a, jsx as l } from "react/jsx-runtime";
import h from "react";
import { Edit as C, Copy as I, Trash2 as S, ArrowRight as f } from "lucide-react";
import e from "./AutomationRules.module.css.js";
const z = ({
  icon: m,
  name: n,
  description: N,
  status: v,
  steps: d,
  meta: i,
  onToggle: b,
  onEdit: t,
  onDuplicate: o,
  onDelete: u,
  className: p = ""
}) => {
  const [s, g] = h.useState(v === "active"), w = () => {
    const c = !s;
    g(c), b?.(c);
  };
  return /* @__PURE__ */ a("div", { className: `${e.ruleCard} ${p}`, children: [
    /* @__PURE__ */ a("div", { className: e.ruleHeader, children: [
      /* @__PURE__ */ a("div", { className: e.ruleHeaderLeft, children: [
        /* @__PURE__ */ l("div", { className: e.ruleIconWrapper, children: /* @__PURE__ */ l(m, { className: e.ruleCategoryIcon }) }),
        /* @__PURE__ */ a("div", { className: e.ruleInfo, children: [
          /* @__PURE__ */ a("div", { className: e.ruleTitleRow, children: [
            /* @__PURE__ */ l("h3", { className: e.ruleName, children: n }),
            /* @__PURE__ */ l("span", { className: `${e.badge} ${s ? e.badgeSuccess : e.badgeDefault}`, children: s ? "Active" : "Inactive" })
          ] }),
          /* @__PURE__ */ l("div", { className: e.ruleDescription, children: N })
        ] })
      ] }),
      /* @__PURE__ */ a("div", { className: e.ruleActions, children: [
        t && /* @__PURE__ */ l("button", { className: e.btnIcon, onClick: t, "aria-label": "Edit rule", children: /* @__PURE__ */ l(C, { size: 16 }) }),
        o && /* @__PURE__ */ l("button", { className: e.btnIcon, onClick: o, "aria-label": "Duplicate rule", children: /* @__PURE__ */ l(I, { size: 16 }) }),
        u && /* @__PURE__ */ l("button", { className: e.btnIcon, onClick: u, "aria-label": "Delete rule", children: /* @__PURE__ */ l(S, { size: 16 }) }),
        /* @__PURE__ */ l("div", { className: e.ruleDivider }),
        /* @__PURE__ */ a("label", { className: e.switch, children: [
          /* @__PURE__ */ l(
            "input",
            {
              type: "checkbox",
              className: e.switchInput,
              checked: s,
              onChange: w,
              "aria-label": `Toggle ${n}`
            }
          ),
          /* @__PURE__ */ l("span", { className: e.switchSlider })
        ] })
      ] })
    ] }),
    i && i.length > 0 && /* @__PURE__ */ l("div", { className: e.ruleMetaGroups, children: i.map((c, r) => /* @__PURE__ */ a("div", { className: e.ruleMetaGroup, children: [
      /* @__PURE__ */ a("div", { className: e.ruleMetaLabel, children: [
        /* @__PURE__ */ l(c.icon, { className: e.iconSm }),
        /* @__PURE__ */ l("span", { children: c.label })
      ] }),
      /* @__PURE__ */ l("span", { className: e.ruleMetaValue, children: c.value })
    ] }, r)) }),
    /* @__PURE__ */ l("div", { className: e.ruleFlow, children: d.map((c, r) => /* @__PURE__ */ a(h.Fragment, { children: [
      /* @__PURE__ */ a("div", { className: e.ruleStep, children: [
        /* @__PURE__ */ l("div", { className: e.ruleStepLabel, children: c.label }),
        /* @__PURE__ */ l("div", { className: e.ruleStepContent, children: c.content })
      ] }),
      r < d.length - 1 && /* @__PURE__ */ l("div", { className: e.ruleArrow, children: /* @__PURE__ */ l(f, { size: 20 }) })
    ] }, r)) })
  ] });
};
export {
  z as AutomationRule
};
//# sourceMappingURL=AutomationRules.js.map
