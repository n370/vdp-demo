import { Style } from "@react-pdf/types";

const styles: Record<string, Style> = {
    page: {
        fontFamily: "RedHatDisplay",
        padding: "1.5cm",
    },
    header: {
        margin: "0 0 0.75cm 0",
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    textSeparator: {
        margin: "0 5pt",
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
};

export default styles;
