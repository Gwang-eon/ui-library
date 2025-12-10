import { jsxs as s, jsx as a, Fragment as g } from "react/jsx-runtime";
import { Cpu as h, Settings as u, RefreshCw as N, BarChart2 as p, MoreVertical as v } from "lucide-react";
import e from "./DeviceList.module.css.js";
const $ = ({ device: t, onClick: i }) => {
  const c = t.icon || h, r = t.iconGradient ? e[`gradient${t.iconGradient.charAt(0).toUpperCase()}${t.iconGradient.slice(1)}`] : e.gradientPrimary;
  return /* @__PURE__ */ s(
    "div",
    {
      className: e.deviceCard,
      onClick: () => i?.(t),
      role: i ? "button" : void 0,
      tabIndex: i ? 0 : void 0,
      onKeyDown: (l) => {
        i && (l.key === "Enter" || l.key === " ") && (l.preventDefault(), i(t));
      },
      children: [
        /* @__PURE__ */ s("div", { className: e.deviceCardHeader, children: [
          /* @__PURE__ */ s("div", { className: e.deviceCardHeaderLeft, children: [
            /* @__PURE__ */ a("div", { className: `${e.deviceIcon} ${r}`, children: /* @__PURE__ */ a(c, { size: 24 }) }),
            /* @__PURE__ */ s("div", { className: e.deviceInfo, children: [
              /* @__PURE__ */ a("div", { className: e.deviceName, children: t.name }),
              /* @__PURE__ */ a("div", { className: e.deviceType, children: t.type })
            ] })
          ] }),
          /* @__PURE__ */ a("span", { className: `${e.statusBadge} ${e[`status${t.status.charAt(0).toUpperCase()}${t.status.slice(1)}`]}`, children: t.status.charAt(0).toUpperCase() + t.status.slice(1) })
        ] }),
        t.stats && t.stats.length > 0 && /* @__PURE__ */ a("div", { className: e.deviceStats, children: t.stats.map((l, d) => /* @__PURE__ */ s("div", { className: e.deviceStat, children: [
          /* @__PURE__ */ a("div", { className: e.deviceStatLabel, children: l.label }),
          /* @__PURE__ */ a("div", { className: e.deviceStatValue, children: l.value })
        ] }, d)) })
      ]
    }
  );
}, k = ({
  device: t,
  onPrimaryAction: i,
  primaryActionLabel: c = "Configure",
  onSecondaryAction: r,
  secondaryActionLabel: l = "View"
}) => {
  const d = t.icon || h, o = t.iconGradient ? e[`gradient${t.iconGradient.charAt(0).toUpperCase()}${t.iconGradient.slice(1)}`] : e.gradientPrimary;
  return /* @__PURE__ */ s("div", { className: e.listItem, children: [
    /* @__PURE__ */ a("div", { className: `${e.listItemIcon} ${o}`, children: /* @__PURE__ */ a(d, { size: 20 }) }),
    /* @__PURE__ */ s("div", { className: e.listItemContent, children: [
      /* @__PURE__ */ s("div", { className: e.listItemHeader, children: [
        /* @__PURE__ */ a("div", { className: e.listItemTitle, children: t.name }),
        /* @__PURE__ */ a("span", { className: `${e.statusBadge} ${e[`status${t.status.charAt(0).toUpperCase()}${t.status.slice(1)}`]}`, children: t.status.charAt(0).toUpperCase() + t.status.slice(1) })
      ] }),
      t.meta && t.meta.length > 0 && /* @__PURE__ */ a("div", { className: e.listItemMeta, children: t.meta.map((n, m) => /* @__PURE__ */ s("div", { className: e.listItemMetaItem, children: [
        n.icon && /* @__PURE__ */ a(n.icon, { size: 14 }),
        /* @__PURE__ */ a("span", { children: n.label })
      ] }, m)) })
    ] }),
    /* @__PURE__ */ s("div", { className: e.listItemActions, children: [
      i && /* @__PURE__ */ s(
        "button",
        {
          className: e.actionButton,
          onClick: (n) => {
            n.stopPropagation(), i(t);
          },
          children: [
            /* @__PURE__ */ a(u, { size: 16 }),
            /* @__PURE__ */ a("span", { children: c })
          ]
        }
      ),
      r && /* @__PURE__ */ s(
        "button",
        {
          className: e.actionButton,
          onClick: (n) => {
            n.stopPropagation(), r(t);
          },
          children: [
            t.status === "offline" ? /* @__PURE__ */ a(N, { size: 16 }) : /* @__PURE__ */ a(p, { size: 16 }),
            /* @__PURE__ */ a("span", { children: t.status === "offline" ? "Reconnect" : l })
          ]
        }
      )
    ] })
  ] });
}, w = ({ device: t, onMoreActions: i }) => {
  const c = t.icon || h, r = t.iconGradient ? e[`gradient${t.iconGradient.charAt(0).toUpperCase()}${t.iconGradient.slice(1)}`] : e.gradientPrimary, l = () => {
    switch (t.status) {
      case "online":
        return e.badgeSuccess;
      case "offline":
        return e.badgeError;
      case "warning":
        return e.badgeWarning;
      case "error":
        return e.badgeError;
      default:
        return e.badgeSuccess;
    }
  }, d = () => {
    switch (t.status) {
      case "online":
        return "Active";
      case "offline":
        return "Offline";
      case "warning":
        return "Warning";
      case "error":
        return "Error";
      default:
        return t.status;
    }
  }, o = () => t.meta && t.meta.length > 0 ? t.meta[0].label : "";
  return /* @__PURE__ */ s("div", { className: e.compactCard, children: [
    /* @__PURE__ */ a("div", { className: `${e.compactIcon} ${r}`, children: /* @__PURE__ */ a(c, { size: 16 }) }),
    /* @__PURE__ */ s("div", { className: e.compactContent, children: [
      /* @__PURE__ */ a("div", { className: e.compactName, children: t.name }),
      /* @__PURE__ */ s("div", { className: e.compactStatus, children: [
        /* @__PURE__ */ a("span", { className: `${e.badge} ${l()}`, children: d() }),
        o() && /* @__PURE__ */ s(g, { children: [
          /* @__PURE__ */ a("span", { className: e.separator, children: "·" }),
          /* @__PURE__ */ a("span", { children: o() })
        ] })
      ] })
    ] }),
    i && /* @__PURE__ */ a(
      "button",
      {
        className: e.compactActionButton,
        onClick: (n) => {
          n.stopPropagation(), i(t);
        },
        "aria-label": "More actions",
        children: /* @__PURE__ */ a(v, { size: 16 })
      }
    )
  ] });
}, I = () => /* @__PURE__ */ s("div", { className: e.deviceCard, children: [
  /* @__PURE__ */ s("div", { className: e.deviceCardHeader, children: [
    /* @__PURE__ */ s("div", { className: e.deviceCardHeaderLeft, children: [
      /* @__PURE__ */ a("div", { className: `${e.skeleton} ${e.skeletonCircle}`, style: { width: 48, height: 48 } }),
      /* @__PURE__ */ s("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 16, width: "70%", marginBottom: 8 } }),
        /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 14, width: "50%" } })
      ] })
    ] }),
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 24, width: 60, borderRadius: "var(--radius-full)" } })
  ] }),
  /* @__PURE__ */ s("div", { className: e.deviceStats, children: [
    /* @__PURE__ */ s("div", { className: e.deviceStat, children: [
      /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 14, width: "70%", margin: "0 auto 6px" } }),
      /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 20, width: "50%", margin: "0 auto" } })
    ] }),
    /* @__PURE__ */ s("div", { className: e.deviceStat, children: [
      /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 14, width: "60%", margin: "0 auto 6px" } }),
      /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 20, width: "40%", margin: "0 auto" } })
    ] })
  ] })
] }), b = () => /* @__PURE__ */ s("div", { className: e.listItem, children: [
  /* @__PURE__ */ a("div", { className: `${e.skeleton} ${e.skeletonCircle}`, style: { width: 40, height: 40 } }),
  /* @__PURE__ */ s("div", { className: e.listItemContent, style: { flex: 1 }, children: [
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 16, width: "40%", marginBottom: 8 } }),
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 14, width: "60%" } })
  ] }),
  /* @__PURE__ */ s("div", { style: { display: "flex", gap: 8 }, children: [
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 32, width: 100 } }),
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 32, width: 80 } })
  ] })
] }), S = () => /* @__PURE__ */ s("div", { className: e.compactCard, children: [
  /* @__PURE__ */ a("div", { className: `${e.skeleton} ${e.skeletonCircle}`, style: { width: 32, height: 32 } }),
  /* @__PURE__ */ s("div", { style: { flex: 1 }, children: [
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 14, width: "60%", marginBottom: 6 } }),
    /* @__PURE__ */ a("div", { className: e.skeleton, style: { height: 12, width: "40%" } })
  ] }),
  /* @__PURE__ */ a("div", { className: e.skeleton, style: { width: 32, height: 32, borderRadius: "var(--radius-md)" } })
] });
export {
  w as CompactCard,
  S as CompactLoadingSkeleton,
  $ as GridCard,
  k as ListItem,
  b as ListLoadingSkeleton,
  I as LoadingSkeleton
};
//# sourceMappingURL=DeviceList.js.map
