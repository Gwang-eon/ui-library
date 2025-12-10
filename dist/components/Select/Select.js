import { jsxs as t, jsx as n } from "react/jsx-runtime";
import p, { useState as I, useRef as y, useEffect as K } from "react";
import { ChevronDown as X } from "lucide-react";
import s from "./Select.module.css.js";
const Y = p.forwardRef(
  ({
    label: f,
    name: L,
    value: b,
    defaultValue: z = "",
    placeholder: C = "Select an option...",
    options: v = [],
    groups: m = [],
    state: $ = "default",
    size: U = "md",
    disabled: i = !1,
    helperText: O,
    errorMessage: E,
    required: R = !1,
    fullWidth: V = !1,
    onChange: q,
    className: B = "",
    id: G
  }, h) => {
    const d = G || `select-${p.useId()}`, [a, c] = I(!1), [H, J] = I(b ?? z), [r, N] = I(-1), g = y(null), w = y(null), x = y(null), S = b !== void 0, k = S ? b : H, o = p.useMemo(() => {
      const e = [...v];
      return m.forEach((l) => {
        e.push(...l.options);
      }), e.filter((l) => !l.disabled);
    }, [v, m]), u = o.find((e) => e.value === k), M = (e) => {
      S || J(e);
      const l = o.find((D) => D.value === e) || null;
      q?.(e, l);
    }, P = () => {
      i || (c((e) => !e), N(-1));
    }, F = (e) => {
      e.disabled || (M(e.value), c(!1), x.current?.focus());
    };
    K(() => {
      const e = (l) => {
        g.current && !g.current.contains(l.target) && c(!1);
      };
      if (a)
        return document.addEventListener("mousedown", e), () => {
          document.removeEventListener("mousedown", e);
        };
    }, [a]);
    const Q = (e) => {
      if (!i)
        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault(), a ? r >= 0 && r < o.length && F(o[r]) : c(!0);
            break;
          case "Escape":
            e.preventDefault(), c(!1), x.current?.focus();
            break;
          case "ArrowDown":
            e.preventDefault(), a ? N(
              (l) => l < o.length - 1 ? l + 1 : l
            ) : c(!0);
            break;
          case "ArrowUp":
            e.preventDefault(), a && N((l) => l > 0 ? l - 1 : 0);
            break;
          case "Tab":
            a && c(!1);
            break;
        }
    };
    K(() => {
      if (a && r >= 0 && w.current) {
        const e = w.current.children[r];
        e && e.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }, [r, a]);
    const j = (e) => e.map((l) => {
      const D = o.indexOf(l), A = l.value === k, W = D === r;
      return /* @__PURE__ */ t(
        "div",
        {
          className: `${s["custom-select-option"]} ${A ? s.selected : ""} ${W ? s.focused : ""} ${l.disabled ? s.disabled : ""}`,
          onClick: () => F(l),
          role: "option",
          "aria-selected": A,
          "data-value": l.value,
          children: [
            l.icon && /* @__PURE__ */ n("span", { className: s["option-icon"], children: l.icon }),
            /* @__PURE__ */ n("span", { children: l.label })
          ]
        },
        l.value
      );
    }), T = () => m.length > 0 ? m.map((e) => /* @__PURE__ */ t(p.Fragment, { children: [
      /* @__PURE__ */ n("div", { className: s["custom-select-group-label"], children: e.label }),
      j(e.options)
    ] }, e.label)) : j(v);
    return /* @__PURE__ */ t(
      "div",
      {
        ref: (e) => {
          typeof h == "function" ? h(e) : h && (h.current = e), g.current = e;
        },
        className: `${s["input-group"]} ${V ? s["input-full-width"] : ""} ${B}`,
        children: [
          f && /* @__PURE__ */ t("label", { htmlFor: d, className: s["input-label"], children: [
            f,
            R && /* @__PURE__ */ n("span", { className: s.required, children: "*" })
          ] }),
          /* @__PURE__ */ t(
            "div",
            {
              className: `${s["custom-select"]} ${a ? s.open : ""} ${$ === "error" ? s.error : ""} ${i ? s.disabled : ""} ${s[`select-${U}`] || ""}`,
              children: [
                /* @__PURE__ */ t(
                  "select",
                  {
                    id: d,
                    name: L,
                    value: k,
                    onChange: () => {
                    },
                    className: s["native-select"],
                    disabled: i,
                    required: R,
                    tabIndex: -1,
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ n("option", { value: "", children: C }),
                      o.map((e) => /* @__PURE__ */ n("option", { value: e.value, children: e.label }, e.value))
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  "div",
                  {
                    ref: x,
                    className: `${s["custom-select-trigger"]} ${u ? "" : s.placeholder}`,
                    onClick: P,
                    onKeyDown: Q,
                    tabIndex: i ? -1 : 0,
                    role: "combobox",
                    "aria-expanded": a,
                    "aria-haspopup": "listbox",
                    "aria-controls": `${d}-listbox`,
                    "aria-labelledby": f ? `${d}-label` : void 0,
                    "aria-disabled": i,
                    children: [
                      /* @__PURE__ */ t("span", { className: s["trigger-content"], children: [
                        u?.icon && /* @__PURE__ */ n("span", { className: s["option-icon"], children: u.icon }),
                        u ? u.label : C
                      ] }),
                      /* @__PURE__ */ n(X, { className: s["select-icon"], size: 18 })
                    ]
                  }
                ),
                /* @__PURE__ */ n(
                  "div",
                  {
                    ref: w,
                    className: s["custom-select-dropdown"],
                    role: "listbox",
                    id: `${d}-listbox`,
                    "aria-labelledby": f ? `${d}-label` : void 0,
                    children: T()
                  }
                )
              ]
            }
          ),
          $ === "error" && E && /* @__PURE__ */ n("span", { className: `${s["input-message"]} ${s["input-error"]}`, children: E }),
          $ !== "error" && O && /* @__PURE__ */ n("span", { className: s["input-message"], children: O })
        ]
      }
    );
  }
);
Y.displayName = "Select";
export {
  Y as Select
};
//# sourceMappingURL=Select.js.map
