import { jsxs as l, jsx as a } from "react/jsx-runtime";
import { useState as u } from "react";
import { ChevronDown as y } from "lucide-react";
import e from "./DeviceControlPanel.module.css.js";
const V = ({
  icon: t,
  label: c,
  type: n,
  value: d = n === "switch" ? !1 : 0,
  min: i = 0,
  max: s = 100,
  step: m = 1,
  onChange: N,
  disabled: r = !1,
  className: S = ""
}) => {
  const [p, g] = u(d), v = (h) => {
    g(h), N?.(h);
  };
  return /* @__PURE__ */ l("div", { className: `${e.controlItem} ${S}`, children: [
    /* @__PURE__ */ l("div", { className: e.controlLabel, children: [
      t && /* @__PURE__ */ a(t, { size: 20 }),
      /* @__PURE__ */ a("span", { children: c })
    ] }),
    n === "switch" ? /* @__PURE__ */ l("label", { className: e.switch, children: [
      /* @__PURE__ */ a(
        "input",
        {
          type: "checkbox",
          className: e.switchInput,
          checked: p,
          onChange: (h) => v(h.target.checked),
          disabled: r
        }
      ),
      /* @__PURE__ */ a("span", { className: e.switchSlider })
    ] }) : /* @__PURE__ */ a(
      "input",
      {
        type: "range",
        className: e.slider,
        min: i,
        max: s,
        step: m,
        value: p,
        onChange: (h) => v(Number(h.target.value)),
        disabled: r
      }
    )
  ] });
}, z = ({
  icon: t,
  iconVariant: c = "primary",
  name: n,
  deviceId: d,
  switchLabel: i,
  sliderLabel: s,
  switchValue: m = !1,
  sliderValue: N = 50,
  sliderMin: r = 0,
  sliderMax: S = 100,
  sliderStep: p = 1,
  onSwitchChange: g,
  onSliderChange: v,
  loading: h = !1,
  className: b = ""
}) => {
  const [C, $] = u(m), [f, k] = u(N), I = (o) => {
    $(o), g?.(o);
  }, w = (o) => {
    k(o), v?.(o);
  };
  return h ? /* @__PURE__ */ l("div", { className: `${e.deviceControlCard} ${e.loading} ${b}`, children: [
    /* @__PURE__ */ l("div", { className: e.deviceHeader, children: [
      /* @__PURE__ */ a("div", { className: e.iconSkeleton }),
      /* @__PURE__ */ l("div", { className: e.deviceInfo, children: [
        /* @__PURE__ */ a("div", { className: e.nameSkeleton }),
        /* @__PURE__ */ a("div", { className: e.idSkeleton })
      ] }),
      /* @__PURE__ */ a("div", { className: e.toggleSkeleton })
    ] }),
    /* @__PURE__ */ a("div", { className: e.sliderSkeleton })
  ] }) : /* @__PURE__ */ l("div", { className: `${e.deviceControlCard} ${b}`, children: [
    /* @__PURE__ */ l("div", { className: e.deviceHeader, children: [
      /* @__PURE__ */ a("div", { className: `${e.deviceIconCircle} ${e[`iconVariant-${c}`]}`, children: /* @__PURE__ */ a(t, { size: 24 }) }),
      /* @__PURE__ */ l("div", { className: e.deviceInfo, children: [
        /* @__PURE__ */ a("h4", { className: e.deviceName, children: n }),
        /* @__PURE__ */ a("p", { className: e.deviceId, children: d })
      ] }),
      /* @__PURE__ */ l("label", { className: e.switch, "aria-label": i, children: [
        /* @__PURE__ */ a(
          "input",
          {
            type: "checkbox",
            className: e.switchInput,
            checked: C,
            onChange: (o) => I(o.target.checked)
          }
        ),
        /* @__PURE__ */ a("span", { className: e.switchSlider })
      ] })
    ] }),
    /* @__PURE__ */ l("div", { className: e.controlSliderWrapper, children: [
      /* @__PURE__ */ a("span", { className: e.controlSliderLabel, children: s }),
      /* @__PURE__ */ a(
        "input",
        {
          type: "range",
          className: e.slider,
          min: r,
          max: S,
          step: p,
          value: f,
          onChange: (o) => w(Number(o.target.value)),
          disabled: !C
        }
      )
    ] })
  ] });
}, j = ({
  label: t,
  modes: c,
  selectedMode: n,
  onModeChange: d,
  className: i = ""
}) => /* @__PURE__ */ l("div", { className: `${e.modeSelection} ${i}`, children: [
  /* @__PURE__ */ a("label", { className: e.modeLabel, children: t }),
  /* @__PURE__ */ a("div", { className: e.btnGroup, role: "group", children: c.map((s) => /* @__PURE__ */ a(
    "button",
    {
      className: `${e.btn} ${e.btnSm} ${e.btnGhost} ${n === s ? e.active : ""}`,
      onClick: () => d(s),
      children: s
    },
    s
  )) })
] }), G = ({
  label: t,
  value: c,
  min: n = 16,
  max: d = 30,
  unit: i = "°C",
  onChange: s,
  className: m = ""
}) => /* @__PURE__ */ l("div", { className: `${e.modeSelection} ${m}`, children: [
  /* @__PURE__ */ l("div", { className: e.temperatureDisplay, children: [
    /* @__PURE__ */ a("span", { className: e.modeLabel, children: t }),
    /* @__PURE__ */ l("span", { className: e.temperatureValue, children: [
      c,
      i
    ] })
  ] }),
  /* @__PURE__ */ a(
    "input",
    {
      type: "range",
      className: e.slider,
      min: n,
      max: d,
      value: c,
      onChange: (N) => s(Number(N.target.value))
    }
  ),
  /* @__PURE__ */ l("div", { className: e.sliderRange, children: [
    /* @__PURE__ */ l("span", { children: [
      n,
      i
    ] }),
    /* @__PURE__ */ l("span", { children: [
      d,
      i
    ] })
  ] })
] }), H = ({
  label: t,
  value: c,
  options: n,
  onChange: d,
  className: i = ""
}) => {
  const [s, m] = u(!1), N = (r) => {
    d(r), m(!1);
  };
  return /* @__PURE__ */ l("div", { className: `${e.modeSelection} ${i}`, children: [
    /* @__PURE__ */ a("label", { className: e.modeLabel, children: t }),
    /* @__PURE__ */ l("div", { className: e.customSelect, children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: e.customSelectTrigger,
          onClick: () => m(!s),
          role: "button",
          tabIndex: 0,
          children: [
            /* @__PURE__ */ a("span", { className: e.customSelectValue, children: c }),
            /* @__PURE__ */ a(y, { className: e.selectIcon, size: 16 })
          ]
        }
      ),
      s && /* @__PURE__ */ a("div", { className: e.customSelectDropdown, children: n.map((r) => /* @__PURE__ */ a(
        "div",
        {
          className: `${e.customSelectOption} ${r === c ? e.selected : ""}`,
          onClick: () => N(r),
          children: r
        },
        r
      )) })
    ] })
  ] });
};
export {
  V as ControlItem,
  z as DeviceControlCard,
  H as FanSpeedSelect,
  j as ModeSelection,
  G as TemperatureControl
};
//# sourceMappingURL=DeviceControlPanel.js.map
