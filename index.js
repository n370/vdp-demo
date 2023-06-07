const {
    renderInvoiceTemplate,
    renderPosterTemplate,
    renderCvTemplate,
} = require("./dist");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getInvoice = (req, res) => {
    renderInvoiceTemplate({ data: req.body, locale: req.query.locale }).then(
        (stream) => {
            res.type("pdf");
            res.status(200);
            stream
                .pipe(res)
                .on("close", () =>
                    console.log("Document generated successfully")
                );
        }
    );
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getPoster = (req, res) => {
    renderPosterTemplate({ dynamic: true }).then((stream) => {
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
exports.getCv = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    if (req.method === "OPTIONS") {
        // Send response to OPTIONS requests
        res.set("Access-Control-Allow-Methods", "GET");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        res.status(204).send("");
    }

    if (req.method === "POST") {
        renderCvTemplate(req.body).then((stream) => {
            res.type("pdf");
            res.status(200);
            stream
                .pipe(res)
                .on("close", () =>
                    console.log("Document generated successfully")
                );
        });
    }
};
