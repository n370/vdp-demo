const typescript = require("@rollup/plugin-typescript");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const copy = require("rollup-plugin-copy");

module.exports = {
    input: "src/index.tsx",
    output: {
        file: "dist/index.js",
        format: "cjs",
    },
    plugins: [
        copy({
            targets: [
                { src: "./src/templates/**/fonts/*", dest: "./dist/fonts" },
                { src: "./src/templates/**/images/*", dest: "./dist/images" },
            ],
        }),
        nodeResolve({ modulesOnly: true, resolveOnly: [/d3/, /internmap/] }),
        commonjs(),
        typescript(),
    ],
};
