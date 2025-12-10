import { jsx as n, jsxs as c } from "react/jsx-runtime";
import e from "./EventTimeline.module.css.js";
const N = ({
  children: t,
  compact: a = !1,
  className: s = ""
}) => /* @__PURE__ */ n("div", { className: `${e.eventTimeline} ${a ? e.eventTimelineCompact : ""} ${s}`, children: t }), $ = ({
  type: t,
  title: a,
  description: s,
  time: l,
  meta: i,
  icon: r,
  onClick: v,
  className: d = ""
}) => /* @__PURE__ */ c("div", { className: `${e.eventItem} ${e[`eventItem${t.charAt(0).toUpperCase() + t.slice(1)}`]} ${d}`, onClick: v, children: [
  r ? /* @__PURE__ */ n("div", { className: `${e.eventMarker} ${e.eventMarkerIcon}`, children: /* @__PURE__ */ n(r, { className: e.eventIcon }) }) : /* @__PURE__ */ n("div", { className: e.eventMarker }),
  /* @__PURE__ */ n("div", { className: e.eventLine }),
  /* @__PURE__ */ c("div", { className: e.eventContent, children: [
    /* @__PURE__ */ c("div", { className: e.eventHeader, children: [
      /* @__PURE__ */ n("h4", { className: e.eventTitle, children: a }),
      /* @__PURE__ */ n("span", { className: e.eventTime, children: l })
    ] }),
    s && /* @__PURE__ */ n("p", { className: e.eventDescription, children: s }),
    i && i.length > 0 && /* @__PURE__ */ n("div", { className: e.eventMeta, children: i.map((m, o) => /* @__PURE__ */ c("span", { className: e.eventMetaItem, children: [
      /* @__PURE__ */ n(m.icon, {}),
      /* @__PURE__ */ n("span", { children: m.text })
    ] }, o)) })
  ] })
] }), C = ({
  type: t,
  title: a,
  time: s,
  onClick: l,
  className: i = ""
}) => /* @__PURE__ */ c(
  "div",
  {
    className: `${e.eventItemCompact} ${e[`eventItemCompact${t.charAt(0).toUpperCase() + t.slice(1)}`]} ${i}`,
    onClick: l,
    children: [
      /* @__PURE__ */ n("div", { className: e.eventMarkerCompact }),
      /* @__PURE__ */ n("div", { className: e.eventLineCompact }),
      /* @__PURE__ */ c("div", { className: e.eventContentCompact, children: [
        /* @__PURE__ */ n("h5", { className: e.eventTitleCompact, children: a }),
        /* @__PURE__ */ n("p", { className: e.eventTimeCompact, children: s })
      ] })
    ]
  }
), I = ({
  title: t,
  className: a = ""
}) => /* @__PURE__ */ n("div", { className: `${e.eventGroupHeader} ${a}`, children: t });
export {
  I as EventGroupHeader,
  $ as EventItem,
  C as EventItemCompact,
  N as EventTimeline
};
//# sourceMappingURL=EventTimeline.js.map
