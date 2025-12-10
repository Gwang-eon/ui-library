import { jsxs as r, jsx as s, Fragment as k } from "react/jsx-runtime";
import { useState as y, useRef as L, useCallback as z, useEffect as K } from "react";
import { X as Z, Loader2 as _, Search as ee, SearchX as te } from "lucide-react";
import a from "./Autocomplete.module.css.js";
const ae = (i, v) => {
  const p = v.toLowerCase();
  return i.label.toLowerCase().includes(p) || i.value.toLowerCase().includes(p) || (i.description?.toLowerCase().includes(p) ?? !1);
}, le = ({
  options: i,
  value: v,
  defaultValue: p,
  onChange: b,
  placeholder: V = "Search...",
  loading: N = !1,
  disabled: x = !1,
  size: $ = "md",
  multiple: n = !1,
  emptyMessage: H = "No results found",
  minChars: M = 0,
  filterFn: W = ae,
  className: X = "",
  "aria-label": Q = "Autocomplete"
}) => {
  const h = v !== void 0, [q, E] = y(
    p || (n ? [] : "")
  ), o = h ? v : q, [g, O] = y(""), [w, u] = y(!1), [c, f] = y(-1), A = L(null), S = L(null), C = L(null), m = g.length >= M ? i.filter((e) => W(e, g)) : i, I = {};
  m.forEach((e) => {
    const t = e.category || "";
    I[t] || (I[t] = []), I[t].push(e);
  });
  const F = Array.isArray(o) ? o : o ? [o] : [], R = z((e) => {
    if (e.disabled) return;
    let t;
    if (n) {
      const l = Array.isArray(o) ? o : [];
      l.includes(e.value) ? t = l.filter((d) => d !== e.value) : t = [...l, e.value];
    } else
      t = e.value, O(""), u(!1);
    h || E(t), b?.(t);
  }, [o, n, h, b]), B = z((e) => {
    if (!n) return;
    const l = (Array.isArray(o) ? o : []).filter((d) => d !== e);
    h || E(l), b?.(l);
  }, [o, n, h, b]), T = (e) => {
    const t = e.target.value;
    O(t), u(!0), f(-1);
  }, j = () => {
    x || u(!0);
  }, U = (e) => {
    if (!w && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      u(!0), e.preventDefault();
      return;
    }
    if (w)
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(), f(
            (t) => t < m.length - 1 ? t + 1 : t
          );
          break;
        case "ArrowUp":
          e.preventDefault(), f((t) => t > 0 ? t - 1 : 0);
          break;
        case "Enter":
          e.preventDefault(), c >= 0 && c < m.length && R(m[c]);
          break;
        case "Escape":
          e.preventDefault(), u(!1), f(-1);
          break;
        case "Tab":
          u(!1);
          break;
      }
  };
  K(() => {
    const e = (t) => {
      A.current && !A.current.contains(t.target) && u(!1);
    };
    return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
  }, []), K(() => {
    if (c >= 0 && C.current) {
      const e = C.current.children[c];
      e && e.scrollIntoView && e.scrollIntoView({ block: "nearest" });
    }
  }, [c]);
  const D = i.filter((e) => F.includes(e.value)), G = $ !== "md" ? a[`autocomplete${$.charAt(0).toUpperCase() + $.slice(1)}`] : "", J = n ? a.autocompleteMultiple : "";
  return /* @__PURE__ */ r(
    "div",
    {
      ref: A,
      className: `${a.autocomplete} ${G} ${J} ${X}`,
      role: "combobox",
      "aria-expanded": w,
      "aria-haspopup": "listbox",
      "aria-owns": "autocomplete-listbox",
      "aria-label": Q,
      children: [
        /* @__PURE__ */ r("div", { className: `${a.autocompleteInputWrapper} ${N ? a.autocompleteLoading : ""}`, children: [
          n && D.length > 0 && /* @__PURE__ */ r("div", { className: a.autocompleteTags, children: [
            D.map((e) => /* @__PURE__ */ r("span", { className: "tag tag-sm tag-primary", children: [
              e.label,
              /* @__PURE__ */ s(
                "button",
                {
                  type: "button",
                  className: "tag-remove",
                  onClick: () => B(e.value),
                  "aria-label": `Remove ${e.label}`,
                  children: /* @__PURE__ */ s(Z, { size: 14 })
                }
              )
            ] }, e.value)),
            /* @__PURE__ */ s(
              "input",
              {
                ref: S,
                type: "text",
                className: `${a.autocompleteInput} ${a.autocompleteInputInline}`,
                value: g,
                onChange: T,
                onFocus: j,
                onKeyDown: U,
                placeholder: D.length > 0 ? "Add more..." : V,
                disabled: x,
                "aria-autocomplete": "list",
                "aria-controls": "autocomplete-listbox",
                "aria-activedescendant": c >= 0 ? `autocomplete-option-${c}` : void 0
              }
            )
          ] }),
          !n && /* @__PURE__ */ r(k, { children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: S,
                type: "text",
                className: a.autocompleteInput,
                value: g,
                onChange: T,
                onFocus: j,
                onKeyDown: U,
                placeholder: V,
                disabled: x,
                "aria-autocomplete": "list",
                "aria-controls": "autocomplete-listbox",
                "aria-activedescendant": c >= 0 ? `autocomplete-option-${c}` : void 0
              }
            ),
            N ? /* @__PURE__ */ s(_, { className: a.autocompleteSpinner, size: 20 }) : /* @__PURE__ */ s(ee, { className: a.autocompleteIcon, size: 20 })
          ] })
        ] }),
        w && /* @__PURE__ */ s(
          "div",
          {
            ref: C,
            className: a.autocompleteDropdown,
            role: "listbox",
            id: "autocomplete-listbox",
            "aria-label": "Suggestions",
            children: N ? /* @__PURE__ */ s("div", { className: a.autocompleteLoadingText, children: "Loading results..." }) : m.length === 0 ? /* @__PURE__ */ r("div", { className: a.autocompleteEmpty, children: [
              /* @__PURE__ */ s(te, { size: 48 }),
              /* @__PURE__ */ s("p", { children: H }),
              /* @__PURE__ */ s("span", { children: "Try adjusting your search terms" })
            ] }) : Object.entries(I).map(([e, t]) => /* @__PURE__ */ r("div", { children: [
              e && /* @__PURE__ */ s("div", { className: a.autocompleteCategory, children: e }),
              t.map((l) => {
                const d = m.indexOf(l), P = d === c, Y = F.includes(l.value);
                return /* @__PURE__ */ s(
                  "div",
                  {
                    id: `autocomplete-option-${d}`,
                    role: "option",
                    "aria-selected": Y,
                    "aria-disabled": l.disabled,
                    className: `${a.autocompleteItem} ${l.description ? a.autocompleteItemWithDesc : ""} ${P ? a.autocompleteItemActive : ""} ${l.disabled ? a.autocompleteItemDisabled : ""}`,
                    onClick: () => R(l),
                    onMouseEnter: () => f(d),
                    children: l.description ? /* @__PURE__ */ r(k, { children: [
                      l.icon && /* @__PURE__ */ s("div", { className: a.autocompleteItemIcon, children: l.icon }),
                      /* @__PURE__ */ r("div", { className: a.autocompleteItemContent, children: [
                        /* @__PURE__ */ s("div", { className: a.autocompleteItemTitle, children: l.label }),
                        /* @__PURE__ */ s("div", { className: a.autocompleteItemDescription, children: l.description })
                      ] })
                    ] }) : /* @__PURE__ */ r(k, { children: [
                      l.icon,
                      /* @__PURE__ */ s("span", { children: l.label })
                    ] })
                  },
                  l.value
                );
              })
            ] }, e))
          }
        )
      ]
    }
  );
};
le.displayName = "Autocomplete";
export {
  le as Autocomplete
};
//# sourceMappingURL=Autocomplete.js.map
