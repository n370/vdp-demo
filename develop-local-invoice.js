const { spawnSync } = require("child_process");
const { createWriteStream } = require("fs");
const { renderInvoiceTemplate } = require("./dist");
const mock = require("./mock.json");

spawnSync("npm", ["run", "bundle"], {
    stdio: "inherit",
});

renderInvoiceTemplate(mock).then((pdfBuffer) => {
    pdfBuffer
        .pipe(createWriteStream("invoice.pdf"))
        .on("close", () => console.log("done"));
});
