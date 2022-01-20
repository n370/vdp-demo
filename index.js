const { renderTemplate } = require("./dist");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getInvoice = (req, res) => {
    renderTemplate(req.body, req.query.locale).then((pdfBuffer) => {
        res.type("pdf");
        res.status(200);
        pdfBuffer.pipe(res).on("close", () => console.log("done"));
    });
};
