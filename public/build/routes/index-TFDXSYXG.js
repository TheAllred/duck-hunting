import {
  __toESM,
  require_jsx_dev_runtime,
  useLoaderData
} from "/build/_shared/chunk-JRKOYVL2.js";

// app/routes/index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
function Index() {
  const { leaderBoard } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { children: leaderBoard.map((boardEntry) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
    boardEntry.username,
    ":",
    boardEntry.count
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 29,
    columnNumber: 11
  }, this)) }, void 0, false, {
    fileName: "app/routes/index.tsx",
    lineNumber: 27,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/index.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-TFDXSYXG.js.map
