import { jsxs as s, jsx as a, Fragment as C } from "react/jsx-runtime";
import { ChevronRight as S } from "lucide-react";
import e from "./StatusCard.module.css.js";
const g = ({
  title: c,
  total: l,
  badge: d,
  items: t,
  variant: m = "default",
  horizontalLayout: r = !1,
  progress: n,
  footer: h,
  headerAction: p,
  onClick: N,
  loading: u = !1,
  className: f = ""
}) => {
  const v = [
    e.statusCard,
    m === "compact" && e.compact,
    m === "mini" && e.mini,
    N && e.clickable,
    u && e.loading,
    f
  ].filter(Boolean).join(" ");
  if (u)
    return /* @__PURE__ */ s("div", { className: v, children: [
      /* @__PURE__ */ s("div", { className: e.header, children: [
        /* @__PURE__ */ a("div", { className: e.titleSkeleton }),
        /* @__PURE__ */ a("div", { className: e.badgeSkeleton })
      ] }),
      /* @__PURE__ */ a("div", { className: e.body, children: [1, 2, 3].map((i) => /* @__PURE__ */ s("div", { className: e.itemSkeleton, children: [
        /* @__PURE__ */ a("div", { className: e.iconSkeleton }),
        /* @__PURE__ */ s("div", { className: e.contentSkeleton, children: [
          /* @__PURE__ */ a("div", { className: e.labelSkeleton }),
          /* @__PURE__ */ a("div", { className: e.valueSkeleton })
        ] })
      ] }, i)) })
    ] });
  if (m === "mini") {
    const i = t[0];
    if (!i) return null;
    const o = i.icon, b = [
      e.miniIcon,
      i.status && e[`icon${i.status.charAt(0).toUpperCase() + i.status.slice(1)}`]
    ].filter(Boolean).join(" ");
    return /* @__PURE__ */ s("div", { className: v, onClick: N, children: [
      o && /* @__PURE__ */ a("div", { className: b, children: /* @__PURE__ */ a(o, { size: 24 }) }),
      /* @__PURE__ */ s("div", { className: e.miniContent, children: [
        /* @__PURE__ */ a("div", { className: e.miniValue, children: i.value }),
        /* @__PURE__ */ a("div", { className: e.miniLabel, children: i.label })
      ] })
    ] });
  }
  return /* @__PURE__ */ s("div", { className: v, onClick: N, children: [
    /* @__PURE__ */ s("div", { className: e.header, children: [
      /* @__PURE__ */ a("h3", { className: e.title, children: c }),
      /* @__PURE__ */ s("div", { className: e.headerRight, children: [
        l && /* @__PURE__ */ a("span", { className: e.total, children: l }),
        d,
        p
      ] })
    ] }),
    m === "compact" && r ? /* @__PURE__ */ a("div", { className: `${e.body} ${e.horizontal}`, children: t.map((i, o) => /* @__PURE__ */ a(x, { ...i }, o)) }) : /* @__PURE__ */ a("div", { className: e.body, children: t.map((i, o) => /* @__PURE__ */ a($, { ...i }, o)) }),
    n && /* @__PURE__ */ a("div", { className: e.progressContainer, children: /* @__PURE__ */ a(
      "div",
      {
        className: `${e.progressBar} ${n.color ? e[`progress${n.color.charAt(0).toUpperCase() + n.color.slice(1)}`] : ""}`,
        style: { width: `${n.value}%` }
      }
    ) }),
    h && /* @__PURE__ */ a("div", { className: e.footer, children: h })
  ] });
}, $ = ({
  icon: c,
  label: l,
  value: d,
  percent: t,
  status: m = "info",
  onClick: r
}) => {
  const n = [
    e.item,
    e[m],
    r && e.clickable
  ].filter(Boolean).join(" "), h = /* @__PURE__ */ s(C, { children: [
    c && /* @__PURE__ */ a("div", { className: e.itemIcon, children: /* @__PURE__ */ a(c, { size: 20 }) }),
    /* @__PURE__ */ s("div", { className: e.itemContent, children: [
      /* @__PURE__ */ a("div", { className: e.itemLabel, children: l }),
      /* @__PURE__ */ a("div", { className: e.itemValue, children: d })
    ] }),
    t !== void 0 && /* @__PURE__ */ a("div", { className: e.itemPercent, children: t }),
    r && /* @__PURE__ */ a("div", { className: e.itemArrow, children: /* @__PURE__ */ a(S, { size: 16 }) })
  ] });
  return r ? /* @__PURE__ */ a("div", { className: n, onClick: r, role: "button", tabIndex: 0, children: h }) : /* @__PURE__ */ a("div", { className: n, children: h });
}, x = ({ label: c, value: l, status: d = "info" }) => {
  const t = [e.compactItem, e[d]].filter(Boolean).join(" ");
  return /* @__PURE__ */ s("div", { className: t, children: [
    /* @__PURE__ */ a("div", { className: e.compactValue, children: l }),
    /* @__PURE__ */ a("div", { className: e.compactLabel, children: c })
  ] });
}, B = ({
  children: c,
  columns: l = 4,
  className: d = ""
}) => /* @__PURE__ */ a(
  "div",
  {
    className: `${e.grid} ${d}`,
    style: {
      gridTemplateColumns: `repeat(auto-fit, minmax(${l === 2 ? "300px" : l === 3 ? "250px" : "240px"}, 1fr))`
    },
    children: c
  }
);
export {
  g as StatusCard,
  B as StatusCardGrid,
  g as default
};
//# sourceMappingURL=StatusCard.js.map
