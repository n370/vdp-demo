const chokidar = require("chokidar");
const { execSync } = require("child_process");

const templateFolderName = process.argv[2];

if (!templateFolderName) {
    throw new Error("Please specify a template folder name.");
}

const watcher = chokidar.watch([
    `./src/*.*`,
    `./src/templates/${templateFolderName}/**/*.*`,
]);

main(templateFolderName);

for (event of ["change"]) {
    watcher.on(event, (path) => {
        console.log("\nTEMPLATE -> ", `${event}:${path}`);
        main(templateFolderName)
    });
}

function main(templateFolderName) {
    execSync("npm run bundle", {
        stdio: "inherit",
    });
    execSync(`node ./local.js ${templateFolderName}`, {
        stdio: "inherit",
    });
}
