import {
  __toESM,
  require_jsx_dev_runtime,
  useLoaderData
} from "/build/_shared/chunk-JRKOYVL2.js";

// app/routes/$duckId.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function duckId_default() {
  const { duck } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      "duck id: ",
      duck.id
    ] }, void 0, true, {
      fileName: "app/routes/$duckId.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      "duck name: ",
      duck.name
    ] }, void 0, true, {
      fileName: "app/routes/$duckId.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/$duckId.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
export {
  duckId_default as default
};
//# sourceMappingURL=/build/routes/$duckId-DPZNOD63.js.map
