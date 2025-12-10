import { jsxs as s, jsx as a } from "react/jsx-runtime";
import { X as u, MapPin as v } from "lucide-react";
import e from "./MapView.module.css.js";
const f = ({
  icon: c,
  status: p,
  position: l,
  onClick: n,
  className: r = ""
}) => /* @__PURE__ */ a(
  "div",
  {
    className: `${e.mapMarker} ${e[`markerStatus${p.charAt(0).toUpperCase() + p.slice(1)}`]} ${r}`,
    style: { top: l.top, left: l.left },
    onClick: n,
    children: /* @__PURE__ */ a(c, { className: e.markerIcon })
  }
), L = ({
  deviceId: c,
  deviceName: p,
  status: l,
  location: n,
  info: r = [],
  onViewDetails: i,
  onClose: d,
  position: m,
  className: t = ""
}) => {
  const h = {
    online: "Online",
    warning: "Warning",
    offline: "Offline"
  };
  return /* @__PURE__ */ s(
    "div",
    {
      className: `${e.devicePopup} ${t}`,
      style: m,
      children: [
        /* @__PURE__ */ s("div", { className: e.popupHeader, children: [
          /* @__PURE__ */ s("div", { className: e.popupHeaderLeft, children: [
            /* @__PURE__ */ a("h4", { className: e.popupTitle, children: c }),
            /* @__PURE__ */ a("p", { className: e.popupSubtitle, children: p })
          ] }),
          /* @__PURE__ */ s("div", { className: e.popupHeaderRight, children: [
            /* @__PURE__ */ a("span", { className: `${e.popupBadge} ${e[`badge${l.charAt(0).toUpperCase() + l.slice(1)}`]}`, children: h[l] }),
            d && /* @__PURE__ */ a(
              "button",
              {
                className: e.popupClose,
                onClick: d,
                "aria-label": "Close",
                children: /* @__PURE__ */ a(u, { size: 14 })
              }
            )
          ] })
        ] }),
        r.length > 0 && /* @__PURE__ */ a("div", { className: e.popupInfo, children: r.map((o, N) => /* @__PURE__ */ s("div", { className: e.popupInfoItem, children: [
          /* @__PURE__ */ a("p", { className: e.popupInfoLabel, children: o.label }),
          /* @__PURE__ */ a("p", { className: e.popupInfoValue, children: o.value })
        ] }, N)) }),
        n && /* @__PURE__ */ s("div", { className: e.popupLocation, children: [
          /* @__PURE__ */ a(v, { size: 12 }),
          /* @__PURE__ */ a("span", { children: n })
        ] }),
        i && /* @__PURE__ */ a("button", { className: e.popupButton, onClick: i, children: "View Details" })
      ]
    }
  );
}, M = ({
  items: c,
  className: p = ""
}) => /* @__PURE__ */ a("div", { className: `${e.mapLegend} ${p}`, children: c.map((l, n) => /* @__PURE__ */ s("div", { className: e.legendItem, children: [
  /* @__PURE__ */ a(
    "div",
    {
      className: e.legendDot,
      style: { backgroundColor: l.color }
    }
  ),
  /* @__PURE__ */ a("span", { className: e.legendLabel, children: l.label })
] }, n)) }), C = ({
  title: c,
  minLabel: p,
  maxLabel: l,
  gradient: n,
  className: r = ""
}) => /* @__PURE__ */ s("div", { className: `${e.heatmapLegend} ${r}`, children: [
  /* @__PURE__ */ a("p", { className: e.heatmapTitle, children: c }),
  /* @__PURE__ */ s("div", { className: e.heatmapScale, children: [
    /* @__PURE__ */ a(
      "div",
      {
        className: e.heatmapGradient,
        style: { background: n }
      }
    ),
    /* @__PURE__ */ s("div", { className: e.heatmapLabels, children: [
      /* @__PURE__ */ a("span", { children: l }),
      /* @__PURE__ */ a("span", { children: p })
    ] })
  ] })
] }), k = ({
  title: c,
  height: p = "400px",
  controls: l,
  footer: n,
  children: r,
  className: i = ""
}) => /* @__PURE__ */ s("div", { className: `${e.mapContainer} ${i}`, children: [
  c && /* @__PURE__ */ s("div", { className: e.mapHeader, children: [
    /* @__PURE__ */ a("h3", { className: e.mapTitle, children: c }),
    l && /* @__PURE__ */ a("div", { className: e.mapControls, children: l })
  ] }),
  /* @__PURE__ */ a("div", { className: e.mapBody, style: { height: p }, children: r }),
  n && /* @__PURE__ */ a("div", { className: e.mapFooter, children: n })
] }), y = ({
  icon: c,
  message: p = "Map integration with Leaflet, Google Maps, or Mapbox",
  gradient: l = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  className: n = "",
  children: r
}) => /* @__PURE__ */ s(
  "div",
  {
    className: `${e.mapPlaceholder} ${n}`,
    style: { background: l },
    children: [
      /* @__PURE__ */ s("div", { className: e.placeholderContent, children: [
        c && /* @__PURE__ */ a(c, { className: e.placeholderIcon }),
        /* @__PURE__ */ a("p", { className: e.placeholderMessage, children: p })
      ] }),
      r
    ]
  }
);
export {
  L as DeviceInfoPopup,
  C as HeatmapLegend,
  k as MapContainer,
  M as MapLegend,
  f as MapMarker,
  y as MapPlaceholder
};
//# sourceMappingURL=MapView.js.map
