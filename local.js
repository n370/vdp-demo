const { createWriteStream } = require("fs");
const { pipeline } = require("stream/promises");
const dist = require("./dist");

const templateFolderName = process.argv[2];

if (!templateFolderName) {
    throw new Error("Please specify a template folder name.");
}

const config = (name) => ({
    name,
    input: require(`./src/templates/${name}/mock.json`),
    ...{
        poster: { renderFunction: "renderPosterTemplate" },
        invoice: { renderFunction: "renderInvoiceTemplate" },
        cv: { renderFunction: "renderCvTemplate" },
    }[name],
});

main(config(templateFolderName)).catch(console.error);

async function main({ input, renderFunction, name }) {
    const stream = await dist[renderFunction](input);
    await pipeline(stream, createWriteStream(`${name}.pdf`));
    console.log(`\nLocal file ./${name}.pdf successfully generated\n`);
}
