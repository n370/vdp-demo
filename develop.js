const { createWriteStream } = require("fs");
const { renderTemplate } = require("./dist");
const mock = require("./mock.json");

renderTemplate(mock).then((pdfBuffer) => {
    pdfBuffer
        .pipe(createWriteStream("document.pdf"))
        .on("close", () => console.log("done"));
});
