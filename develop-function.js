const chokidar = require("chokidar");
const { spawn } = require("child_process");
const kill = require("tree-kill");

const templateFolderName = process.argv[2];

if (!templateFolderName) {
    throw new Error("Please specify a template folder name.");
}

const config = (name) => ({
    ...{
        invoice: { target: "getInvoice", port: 8080 },
        poster: { target: "getPoster", port: 8081 },
        cv: { target: "getCv", port: 8082 },
    }[name],
});

const watcher = chokidar.watch(["./dist/index.js", "./index.js"]);

for (event of ["change"]) {
    watcher.on(event, (path) => {
        console.log("\nFUNCTION -> ", `${event}:${path}`);
        main(config(templateFolderName)).catch(console.error);
    });
}

const pidList = [];

async function main({ port, target }) {
    for (const id of pidList) {
        kill(id);
    }

    const { pid } = spawn(
        "npx",
        [
            "@google-cloud/functions-framework",
            `--target=${target}`,
            `--port=${port}`,
        ],
        {
            stdio: "inherit",
        },
    );

    pidList.push(pid);
}
