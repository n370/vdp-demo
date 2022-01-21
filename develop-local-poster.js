const { spawnSync } = require("child_process");
const { createWriteStream } = require("fs");
const { renderPosterTemplate } = require("./dist");
const mock = require("./mock.json");

spawnSync("npm", ["run", "bundle"], {
    stdio: "inherit",
});

renderPosterTemplate(mock).then((pdfBuffer) => {
    pdfBuffer
        .pipe(createWriteStream("poster.pdf"))
        .on("close", () => console.log("done"));
});
