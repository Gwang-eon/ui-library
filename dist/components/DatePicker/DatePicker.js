import { jsxs as S, jsx as l } from "react/jsx-runtime";
import { forwardRef as v, useRef as M, useState as T, useImperativeHandle as b } from "react";
import B from "react-datepicker";
import { Calendar as H } from "lucide-react";
import e from "./DatePicker.module.css.js";
const q = v(
  ({
    size: r = "md",
    error: s = !1,
    disabled: a = !1,
    value: c,
    onChange: n,
    placeholder: i = "Select date",
    className: p = "",
    dateFormat: o = "yyyy-MM-dd",
    minDate: d,
    maxDate: m,
    showTimeSelect: f,
    timeFormat: k,
    timeIntervals: u,
    isClearable: C,
    showMonthDropdown: g,
    showYearDropdown: y,
    dropdownMode: N,
    filterDate: h,
    inline: w,
    monthsShown: x
  }, O) => {
    const R = M(null), [j, t] = T(!1);
    b(O, () => R.current);
    const D = [
      e["date-picker"],
      r === "sm" && e["date-picker-sm"],
      r === "lg" && e["date-picker-lg"],
      s && e["date-picker-error"],
      a && e["date-picker-disabled"],
      p
    ].filter(Boolean).join(" "), I = () => {
      a || t(!0);
    };
    return /* @__PURE__ */ S("div", { className: D, children: [
      /* @__PURE__ */ l(
        B,
        {
          selected: c,
          onChange: (P) => n?.(P),
          disabled: a,
          placeholderText: i,
          className: e["date-picker-input"],
          calendarClassName: e["date-picker-calendar"],
          wrapperClassName: e["date-picker-wrapper"],
          dateFormat: o,
          minDate: d,
          maxDate: m,
          showTimeSelect: f,
          timeFormat: k,
          timeIntervals: u,
          isClearable: C,
          showMonthDropdown: g,
          showYearDropdown: y,
          dropdownMode: N,
          filterDate: h,
          inline: w,
          monthsShown: x,
          open: j,
          onInputClick: () => t(!0),
          onClickOutside: () => t(!1),
          onSelect: () => t(!1)
        }
      ),
      /* @__PURE__ */ l(
        "button",
        {
          className: e["date-picker-trigger"],
          onClick: I,
          disabled: a,
          type: "button",
          "aria-label": "Open calendar",
          children: /* @__PURE__ */ l(H, { size: r === "sm" ? 16 : r === "lg" ? 20 : 18 })
        }
      )
    ] });
  }
);
q.displayName = "DatePicker";
export {
  q as DatePicker
};
//# sourceMappingURL=DatePicker.js.map
