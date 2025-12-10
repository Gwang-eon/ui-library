import { jsxs as i, jsx as e } from "react/jsx-runtime";
import { useState as d } from "react";
import { Search as L, Filter as D, AlertCircle as I, AlertTriangle as F, Download as H, ChevronsUpDown as w, Eye as M, MoreHorizontal as j } from "lucide-react";
import r from "./EventDataTable.module.css.js";
const O = ({
  events: S,
  searchable: C = !0,
  filterable: N = !0,
  exportable: y = !0,
  selectable: f = !0,
  onSelect: h,
  onView: k,
  onExport: z,
  className: A
}) => {
  const [l, B] = d(""), [a, m] = d("all"), [u, p] = d(/* @__PURE__ */ new Set()), [o, E] = d(null), [v, g] = d("desc"), n = [...S.filter((t) => {
    const s = l === "" || t.eventType.label.toLowerCase().includes(l.toLowerCase()) || t.device.id.toLowerCase().includes(l.toLowerCase()) || t.message.toLowerCase().includes(l.toLowerCase()), c = a === "all" || t.severity === a;
    return s && c;
  })].sort((t, s) => {
    if (!o) return 0;
    if (o === "time")
      return v === "asc" ? t.time.localeCompare(s.time) : s.time.localeCompare(t.time);
    if (o === "severity") {
      const c = { critical: 3, warning: 2, info: 1 };
      return v === "asc" ? c[t.severity] - c[s.severity] : c[s.severity] - c[t.severity];
    }
    return 0;
  }), b = (t) => {
    o === t ? g(v === "asc" ? "desc" : "asc") : (E(t), g("desc"));
  }, T = (t) => {
    t ? (p(new Set(n.map((s) => s.id))), h?.(n.map((s) => s.id))) : (p(/* @__PURE__ */ new Set()), h?.([]));
  }, $ = (t, s) => {
    const c = new Set(u);
    s ? c.add(t) : c.delete(t), p(c), h?.(Array.from(c));
  }, x = (t) => {
    switch (t) {
      case "critical":
        return r.badgeError;
      case "warning":
        return r.badgeWarning;
      case "info":
        return r.badgeSuccess;
      default:
        return "";
    }
  };
  return /* @__PURE__ */ i("div", { className: `${r.eventDataTable} ${A || ""}`, children: [
    (C || N || y) && /* @__PURE__ */ i("div", { className: r.tableControls, children: [
      /* @__PURE__ */ e("div", { className: r.tableControlsLeft, children: C && /* @__PURE__ */ i("div", { className: r.searchGroup, children: [
        /* @__PURE__ */ e(L, { className: r.searchIcon, size: 16 }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            className: r.searchInput,
            placeholder: "Search events...",
            value: l,
            onChange: (t) => B(t.target.value)
          }
        )
      ] }) }),
      /* @__PURE__ */ i("div", { className: r.tableControlsRight, children: [
        N && /* @__PURE__ */ i("div", { className: r.filterGroup, children: [
          /* @__PURE__ */ i(
            "button",
            {
              className: `${r.filterBtn} ${a === "all" ? r.filterBtnActive : ""}`,
              onClick: () => m("all"),
              children: [
                /* @__PURE__ */ e(D, { size: 14 }),
                "All Events"
              ]
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              className: `${r.filterBtn} ${a === "critical" ? r.filterBtnActive : ""}`,
              onClick: () => m("critical"),
              children: [
                /* @__PURE__ */ e(I, { size: 14 }),
                "Errors"
              ]
            }
          ),
          /* @__PURE__ */ i(
            "button",
            {
              className: `${r.filterBtn} ${a === "warning" ? r.filterBtnActive : ""}`,
              onClick: () => m("warning"),
              children: [
                /* @__PURE__ */ e(F, { size: 14 }),
                "Warnings"
              ]
            }
          )
        ] }),
        y && /* @__PURE__ */ i("button", { className: r.exportBtn, onClick: z, children: [
          /* @__PURE__ */ e(H, { size: 14 }),
          "Export"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: r.tableContainer, children: /* @__PURE__ */ i("table", { className: r.table, children: [
      /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ i("tr", { children: [
        f && /* @__PURE__ */ e("th", { className: r.checkboxCell, children: /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: u.size === n.length && n.length > 0,
            onChange: (t) => T(t.target.checked)
          }
        ) }),
        /* @__PURE__ */ e("th", { className: r.sortableHeader, onClick: () => b("time"), children: /* @__PURE__ */ i("div", { className: r.headerContent, children: [
          /* @__PURE__ */ e("span", { children: "Time" }),
          /* @__PURE__ */ e(w, { size: 14 })
        ] }) }),
        /* @__PURE__ */ e("th", { className: r.sortableHeader, onClick: () => b("severity"), children: /* @__PURE__ */ i("div", { className: r.headerContent, children: [
          /* @__PURE__ */ e("span", { children: "Severity" }),
          /* @__PURE__ */ e(w, { size: 14 })
        ] }) }),
        /* @__PURE__ */ e("th", { children: "Event Type" }),
        /* @__PURE__ */ e("th", { children: "Device" }),
        /* @__PURE__ */ e("th", { children: "Message" }),
        /* @__PURE__ */ e("th", { children: "Location" }),
        /* @__PURE__ */ e("th", { className: r.actionsHeader, children: "Actions" })
      ] }) }),
      /* @__PURE__ */ e("tbody", { children: n.map((t) => /* @__PURE__ */ i("tr", { children: [
        f && /* @__PURE__ */ e("td", { className: r.checkboxCell, children: /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: u.has(t.id),
            onChange: (s) => $(t.id, s.target.checked)
          }
        ) }),
        /* @__PURE__ */ e("td", { children: t.time }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ e("span", { className: `${r.badge} ${x(t.severity)}`, children: t.severity.charAt(0).toUpperCase() + t.severity.slice(1) }) }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ i("div", { className: r.eventType, children: [
          /* @__PURE__ */ e("span", { className: r.eventIcon, children: t.eventType.icon }),
          /* @__PURE__ */ e("span", { children: t.eventType.label })
        ] }) }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ i("div", { className: r.deviceInfo, children: [
          /* @__PURE__ */ e("div", { className: r.deviceId, children: t.device.id }),
          /* @__PURE__ */ e("div", { className: r.deviceType, children: t.device.type })
        ] }) }),
        /* @__PURE__ */ e("td", { children: t.message }),
        /* @__PURE__ */ e("td", { children: t.location }),
        /* @__PURE__ */ e("td", { children: /* @__PURE__ */ i("div", { className: r.actions, children: [
          /* @__PURE__ */ e(
            "button",
            {
              className: r.actionBtn,
              onClick: () => k?.(t),
              "aria-label": "View details",
              children: /* @__PURE__ */ e(M, { size: 14 })
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              className: r.actionBtn,
              "aria-label": "More options",
              children: /* @__PURE__ */ e(j, { size: 14 })
            }
          )
        ] }) })
      ] }, t.id)) })
    ] }) })
  ] });
};
export {
  O as EventDataTable,
  O as default
};
//# sourceMappingURL=EventDataTable.js.map
