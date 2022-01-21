const { spawnSync } = require("child_process");
const kill = require("kill-port");

(async () => {
    await kill(8080, "tcp");
    spawnSync("npx", ["@google-cloud/functions-framework", "--target=getInvoice"], {
        stdio: "inherit",
    });
})().catch(console.error);
