import { jsx as o } from "react/jsx-runtime";
import d from "./Card.module.css.js";
const u = ({ children: r, className: e = "" }) => /* @__PURE__ */ o("div", { className: `${d.cardHeader} ${e}`, children: r }), f = ({ children: r, className: e = "" }) => /* @__PURE__ */ o("h3", { className: `${d.cardTitle} ${e}`, children: r }), $ = ({
  children: r,
  image: e,
  alt: n = "",
  height: a = "160px",
  className: c = ""
}) => {
  const t = {
    height: typeof a == "number" ? `${a}px` : a
  };
  return /* @__PURE__ */ o("div", { className: `${d.cardMedia} ${c}`, style: t, children: e ? /* @__PURE__ */ o("img", { src: e, alt: n }) : r });
}, y = ({ children: r, className: e = "" }) => /* @__PURE__ */ o("div", { className: `${d.cardContent} ${e}`, children: r }), p = ({ children: r, className: e = "" }) => /* @__PURE__ */ o("div", { className: `${d.cardFooter} ${e}`, children: r }), s = ({
  children: r,
  variant: e = "default",
  hoverable: n = !1,
  selectable: a = !1,
  selected: c = !1,
  onClick: t,
  className: l = ""
}) => {
  const m = [
    d.card,
    e === "elevated" && d.cardElevated,
    e === "outlined" && d.cardOutlined,
    n && d.cardHoverable,
    a && d.cardSelectable,
    c && d.cardSelected,
    l
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ o(
    "div",
    {
      className: m,
      onClick: () => {
        (a || n) && t && t();
      },
      onKeyDown: (i) => {
        (a || n) && t && (i.key === "Enter" || i.key === " ") && (i.preventDefault(), t());
      },
      tabIndex: (a || n) && t ? 0 : void 0,
      role: (a || n) && t ? "button" : void 0,
      "aria-pressed": a ? c : void 0,
      children: r
    }
  );
};
s.Header = u;
s.Title = f;
s.Media = $;
s.Content = y;
s.Footer = p;
export {
  s as Card
};
//# sourceMappingURL=Card.js.map
