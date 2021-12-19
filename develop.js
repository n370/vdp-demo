const { createWriteStream } = require("fs");
const { renderTemplate } = require("./dist");
const data = require("./mock.json");

renderTemplate({ data }).then((pdfBuffer) => {
  pdfBuffer
    .pipe(createWriteStream("cv.pdf"))
    .on("close", () => console.log("done"));
});
