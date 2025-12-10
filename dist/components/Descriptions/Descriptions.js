import { jsxs as t, jsx as r } from "react/jsx-runtime";
import s from "./Descriptions.module.css.js";
const a = ({
  label: o,
  children: e,
  span: i,
  className: c
}) => {
  const n = [
    s.descriptionsItem,
    i && s.descriptionsItemSpan,
    c
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ t("div", { className: n, children: [
    /* @__PURE__ */ r("span", { className: s.descriptionsLabel, children: o }),
    /* @__PURE__ */ r("span", { className: s.descriptionsContent, children: e })
  ] });
};
a.displayName = "Descriptions.Item";
const l = ({
  children: o,
  title: e,
  extra: i,
  bordered: c = !1,
  column: n = 1,
  size: d = "md",
  vertical: p = !1,
  className: m
}) => {
  const N = [
    s.descriptions,
    c && s.descriptionsBordered,
    n === 2 && s.descriptionsCol2,
    n === 3 && s.descriptionsCol3,
    d === "sm" && s.descriptionsSm,
    d === "lg" && s.descriptionsLg,
    p && s.descriptionsVertical,
    m
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ t("div", { className: N, children: [
    (e || i) && /* @__PURE__ */ t("div", { className: s.descriptionsHeader, children: [
      e && /* @__PURE__ */ r("h3", { className: s.descriptionsTitle, children: e }),
      i && /* @__PURE__ */ r("div", { children: i })
    ] }),
    o
  ] });
};
l.displayName = "Descriptions";
l.Item = a;
export {
  l as Descriptions,
  a as DescriptionsItem
};
//# sourceMappingURL=Descriptions.js.map
