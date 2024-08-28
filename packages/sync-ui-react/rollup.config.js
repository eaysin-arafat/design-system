const ts = require("rollup-plugin-typescript2");

module.exports = {
  input: [
    "src/index.ts",
    "src/atoms/button/index.ts",
    "src/atoms/color/index.ts",
    "src/atoms/text/index.ts",
  ],
  output: {
    dir: "lib",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [ts()],
  external: [
    "react",
    "react/jsx-runtime",
    "@sync-workspace/sync-ui/lib/button.css",
  ],
};
