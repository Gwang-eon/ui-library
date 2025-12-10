const n = {
  instant: "100ms",
  // Hover, Focus
  fast: "200ms",
  // Button, Toggle
  base: "300ms",
  // Modal, Dropdown (Default)
  slow: "400ms",
  // Drawer, Complex
  slower: "600ms"
  // Page transition
}, i = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  // Most common
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  emphasized: "cubic-bezier(0.4, 0, 0, 1)",
  emphasizedIn: "cubic-bezier(0.4, 0, 0.6, 1)",
  emphasizedOut: "cubic-bezier(0.2, 0, 0, 1)",
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}, t = {
  // Button
  button: {
    hoverDuration: n.instant,
    hoverEasing: i.out
  },
  // Modal
  modal: {
    enterDuration: n.base,
    enterEasing: i.out,
    exitDuration: n.fast,
    exitEasing: i.in
  },
  // Dropdown
  dropdown: {
    enterDuration: n.fast,
    enterEasing: i.out,
    exitDuration: "150ms",
    exitEasing: i.in
  },
  // Tooltip
  tooltip: {
    enterDuration: n.fast,
    enterEasing: i.out,
    enterDelay: "100ms",
    exitDuration: "150ms",
    exitEasing: i.in
  },
  // Toast
  toast: {
    enterDuration: n.base,
    enterEasing: i.out,
    exitDuration: n.fast,
    exitEasing: i.in,
    autoDismissDuration: "5000ms"
  },
  // Drawer
  drawer: {
    enterDuration: n.slow,
    enterEasing: i.out,
    exitDuration: n.base,
    exitEasing: i.in
  },
  // Accordion
  accordion: {
    expandDuration: n.base,
    expandEasing: i.out,
    collapseDuration: "250ms",
    collapseEasing: i.in
  },
  // Tab
  tab: {
    switchDuration: n.base,
    switchEasing: i.inOut
  },
  // Loading
  loading: {
    spinnerDuration: "1000ms",
    spinnerEasing: i.linear,
    skeletonDuration: "1500ms",
    skeletonEasing: i.inOut
  }
}, a = {
  dataUpdateDuration: n.base,
  dataUpdateEasing: i.out,
  statusChangeDuration: n.slow,
  statusChangeEasing: i.out,
  liveIndicatorDuration: "2000ms",
  liveIndicatorEasing: i.inOut,
  connectionLostDuration: n.slow,
  connectionLostEasing: i.inOut,
  refreshDuration: n.slower,
  refreshEasing: i.out,
  alertPulseDuration: "1000ms",
  alertPulseEasing: i.inOut,
  chartAnimationDuration: "1000ms",
  chartAnimationEasing: i.out
}, e = {
  // Mobile Animation (optimized for 60fps)
  transitionFast: "200ms",
  transitionBase: "300ms",
  transitionSlow: "400ms",
  springEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
}, s = {
  duration: n,
  easing: i,
  componentMotion: t,
  iotMotion: a,
  mobileMotion: e
};
export {
  t as componentMotion,
  s as default,
  n as duration,
  i as easing,
  a as iotMotion,
  e as mobileMotion
};
//# sourceMappingURL=motion.js.map
