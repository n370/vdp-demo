import ReactPDF from "@react-pdf/renderer";
import {
    TemplateProps as PosterTemplateProps,
    Template as PosterTemplate,
} from "./templates/poster/template";
import {
    TemplateProps as InvoiceTemplateProps,
    Template as InvoiceTemplate,
} from "./templates/invoice/template";
import {
    TemplateProps as CvTemplateProps,
    Template as CvTemplate,
} from "./templates/cv/template";

export async function renderPosterTemplate(
    input: PosterTemplateProps["input"]
) {
    return ReactPDF.renderToStream(<PosterTemplate input={input} />);
}

export async function renderInvoiceTemplate(
    input: InvoiceTemplateProps["input"]
) {
    return ReactPDF.renderToStream(<InvoiceTemplate input={input} />);
}

export async function renderCvTemplate(input: CvTemplateProps["input"]) {
    return ReactPDF.renderToStream(<CvTemplate input={input} />);
}
