import { join } from "path";
import { FC } from "react";
import {
    Font,
    Document,
    Text,
    Image,
    Page,
    View,
    Link,
} from "@react-pdf/renderer";
import styles from "./styles";
import { generateQR, getDynamicImage, getStaticImage } from "../../utils";
import { format } from "date-fns";
import { networkInterfaces } from "os";

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

    Font.register({
        family: "DMSans",
        fonts: [
            {
                src: join(
                    __dirname,
                    "..",
                    "fonts",
                    "DM_Sans",
                    "DMSans-Medium.ttf"
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
                        fontFamily: "DMSans",
                        padding: 12.5,
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
                                fontSize: 135,
                                lineHeight: 1,
                            }}
                        >
                            {`This\nArtwork\nDoes Not\nExist`}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View
                            style={{
                                flexBasis: `32%`,
                            }}
                        >
                            <View style={{ fontSize: 16, lineHeight: 1.2 }}>
                                <Text>ONLINE EXHIBITION</Text>
                                <Text>{format(Date.now(), "E Do MMM y")}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexBasis: `58%`,
                            }}
                        >
                            <View style={{ fontSize: 16, lineHeight: 1.2 }}>
                                <Text>Based on Phil Wang's original work</Text>
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "#000",
                                    }}
                                    src="https://thispersondoesnotexist.com/"
                                >
                                    https://thispersondoesnotexist.com/
                                </Link>
                            </View>
                        </View>
                        <View
                            style={{
                                flexBasis: `10%`,
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Image
                                style={{ width: 78 }}
                                src={async () => ({
                                    data: await generateQR(
                                        process.env.SELF || "EMPTY",
                                        { color: { light: "#00000000" } }
                                    ),
                                    format: "png",
                                })}
                            />
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
