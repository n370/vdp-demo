import ReactPDF from "@react-pdf/renderer";
import { Template as InvoiceTemplate } from "./templates/invoice/template";
import { Template as PosterTemplate } from "./templates/poster/template";
import * as invoiceTranslations from "./templates/invoice/translations";

export async function renderInvoiceTemplate(
    data: any,
    locale: keyof typeof invoiceTranslations = "en_US"
) {
    return ReactPDF.renderToStream(<InvoiceTemplate data={data} locale={locale} />);
}

export async function renderPosterTemplate() {
    return ReactPDF.renderToStream(<PosterTemplate />);
}
