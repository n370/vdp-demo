import ReactPDF, { Font } from "@react-pdf/renderer";
import { Template } from "./template";
import { join } from "path";
import * as translations from "./translations";

export async function renderTemplate(
    data: any,
    locale: keyof typeof translations = "en_US"
) {
    Font.register({
        family: "Roboto",
        fonts: [
            {
                src: join(
                    __dirname,
                    "..",
                    "fonts",
                    "Roboto",
                    "Roboto-Regular.ttf"
                ),
                fontWeight: "normal",
            },
            {
                src: join(
                    __dirname,
                    "..",
                    "fonts",
                    "Roboto",
                    "Roboto-Medium.ttf"
                ),
                fontWeight: "medium",
            },
            {
                src: join(
                    __dirname,
                    "..",
                    "fonts",
                    "Roboto",
                    "Roboto-Bold.ttf"
                ),
                fontWeight: "bold",
            },
        ],
    });

    return ReactPDF.renderToStream(<Template data={data} locale={locale} />);
}
