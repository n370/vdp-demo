import { FC } from "react";
import { Font, Document, Text, Image, Page, View } from "@react-pdf/renderer";
import { join } from "path";
import styles from "./styles";

interface TemplateProps {
    //
}

export const Template: FC<TemplateProps> = ({}) => {
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

    return (
        <Document>
            <Page style={{ ...styles.page, fontFamily: "Roboto" }}>
                <View>
                    {/* <Image src={""} /> */}
                    <Text>Hello World</Text>
                </View>
            </Page>
        </Document>
    );
};
