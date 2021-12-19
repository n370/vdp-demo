const { renderTemplate } = require("./dist");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getCV = (req, res) => {
  renderTemplate({
    data: {
        translations: {
            title: "Hello World",
        },
    },
  }).then((pdfBuffer) => {
    res.status(200);
    pdfBuffer.pipe(res).on("close", () => console.log("done"));
  });
};
