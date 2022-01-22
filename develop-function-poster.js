const { spawnSync } = require("child_process");
const kill = require("kill-port");

main().catch(console.error);

async function main() {
    await kill(8080, "tcp");
    spawnSync(
        "npx",
        ["@google-cloud/functions-framework", "--target=getPoster"],
        {
            stdio: "inherit",
        }
    );
}
