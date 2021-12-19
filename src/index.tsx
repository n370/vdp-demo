import ReactPDF, { Font } from "@react-pdf/renderer";
import { Template } from "./template";
import { join } from "path";

export async function renderTemplate(props: any) {
  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: join(__dirname, "..", "fonts", "Roboto", "Roboto-Black.ttf"),
        fontWeight: "bold",
      },
    ],
  });

  return ReactPDF.renderToStream(<Template {...props} />);
}
