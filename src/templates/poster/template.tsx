import { join } from "path";
import { FC } from "react";
import { Font, Document, Text, Image, Page, View } from "@react-pdf/renderer";
import styles from "./styles";
import { getDynamicImage, getStaticImage } from "../../utils";

interface TemplateProps {
    dynamic: boolean;
}

export const Template: FC<TemplateProps> = ({ dynamic }) => {
    Font.register({
        family: "FingerPaint",
        fonts: [
            {
                src: join(
                    __dirname,
                    "..",
                    "fonts",
                    "Finger_Paint",
                    "FingerPaint-Regular.ttf"
                ),
                fontWeight: "normal",
            },
        ],
    });

    return (
        <Document>
            <Page style={{ position: "relative" }}>
                <View style={{ height: "100%" }}>
                    <Image
                        style={{ transform: "scale(2)" }}
                        src={async () => ({
                            data: dynamic
                                ? await getDynamicImage()
                                : await getStaticImage("cover.jpg"),
                            format: "jpg",
                        })}
                    />
                </View>
                <View
                    style={{
                        padding: 10,
                        height: "100%",
                        position: "absolute",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ width: "80%" }}>
                        <Text
                            hyphenationCallback={(word) => [word]}
                            style={{
                                transform: "rotate(-5deg) translate(20 -20)",
                                color: "#000",
                                fontFamily: "FingerPaint",
                                fontSize: 140,
                                lineHeight: 1,
                            }}
                        >
                            {`This\nArtwork\nDoes Not\nExist`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flexBasis: "50%" }}>
                            <Text>ONLINE EXHIBITION</Text>
                            <Text>26 Feb 2022</Text>
                        </View>
                        <View style={{ flexBasis: "50%" }}>
                            <Text>Based on Phil Wang's original work</Text>
                            <View>
                                <Text>https://thispersondoesnotexist.com/</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
