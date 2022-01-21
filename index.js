const { renderInvoiceTemplate, renderPosterTemplate } = require("./dist");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getInvoice = (req, res) => {
    renderInvoiceTemplate(req.body, req.query.locale).then((stream) => {
        res.type("pdf");
        res.status(200);
        stream
            .pipe(res)
            .on("close", () => console.log("Document generated successfully"));
    });
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getPoster = (req, res) => {
    renderPosterTemplate().then((stream) => {
        res.type("pdf");
        res.status(200);
        stream
            .pipe(res)
            .on("close", () => console.log("Document generated successfully"));
    });
};
