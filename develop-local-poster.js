const { spawnSync } = require("child_process");
const { createWriteStream } = require("fs");

spawnSync("npm", ["run", "bundle"], {
    stdio: "inherit",
});

main().catch(console.error);

async function main() {
    const { renderPosterTemplate } = require("./dist");

    const stream = await renderPosterTemplate();

    stream
        .pipe(createWriteStream("poster.pdf"))
        .on("close", () => console.log("done"));
}
