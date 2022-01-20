const { createWriteStream } = require("fs");
const { renderTemplate } = require("./dist");
const mock = require("./mock.json");

renderTemplate(mock).then((pdfBuffer) => {
    pdfBuffer
        .pipe(createWriteStream("cv.pdf"))
        .on("close", () => console.log("done"));
});
