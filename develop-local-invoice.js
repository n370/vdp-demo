const { spawnSync } = require("child_process");
const { createWriteStream } = require("fs");
const mock = require("./mock.json");

spawnSync("npm", ["run", "bundle"], {
    stdio: "inherit",
});

main().catch(console.error);

async function main() {
    const { renderInvoiceTemplate } = require("./dist");

    const stream = await renderInvoiceTemplate(mock);

    stream
        .pipe(createWriteStream("invoice.pdf"))
        .on("close", () => console.log("done"));
}
