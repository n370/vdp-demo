import { Style } from "@react-pdf/types";

const styles: Record<string, Style> = {
    page: {
        fontFamily: "RedHatDisplay",
        padding: "1.5cm",
    },
    header: {
        margin: "0 0 0.5cm 0",
    },
    footer: {
        position: "absolute",
        fontSize: "10pt",
        bottom: "1cm",
        left: "1.5cm",
        right: "1.5cm",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    spaceBetween: {
        justifyContent: "space-between",
    },
    pipe: {
        margin: "0 5pt",
    },
    emDash: {
        margin: "0 5pt",
    },
    comma: {
        margin: "0 3pt 0 0",
    },
    textSmall: {
        fontSize: "10pt",
    },
    textMedium: {
        fontSize: "12pt",
    },
    textLarge: {
        fontSize: "14pt",
    },
    textItalic: {
        fontStyle: "italic",
    },
    textBold: {
        fontWeight: 700,
    },
    heading1: {
        margin: "0.5cm 0 0.25cm 0",
    },
    paragraph: {
        margin: "0.15cm 0",
    },
    indentedTextBlock: {
        padding: "0 0 0 0.5cm",
    },
};

export default styles;
