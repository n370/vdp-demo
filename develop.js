const { createWriteStream } = require("fs");
const { renderTemplate } = require("./dist");
const mock = require("./mock.json");

renderTemplate({
    translations: mock.translations["en_US"],
    // translations: mock.translations["pt_BR"],
    data: mock.data,
}).then((pdfBuffer) => {
    pdfBuffer
        .pipe(createWriteStream("cv.pdf"))
        .on("close", () => console.log("done"));
});
