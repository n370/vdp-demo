const { createWriteStream } = require("fs");
const { renderTemplate } = require("./dist");

renderTemplate({
    data: {
        translations: {
            title: "My CV",
        },
    },
  }).then((pdfBuffer) => {
    pdfBuffer.pipe(createWriteStream("cv.pdf")).on("close", () => console.log("done"));
});
