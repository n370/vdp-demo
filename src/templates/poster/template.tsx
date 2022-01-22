import { join } from "path";
import { FC } from "react";
import { Font, Document, Text, Image, Page, View } from "@react-pdf/renderer";
import styles from "./styles";
import { getCoverPhoto, getStaticCoverPhoto } from "../../utils";

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
                                ? await getCoverPhoto()
                                : await getStaticCoverPhoto(),
                            format: "jpg",
                        })}
                    />
                </View>
                <View
                    style={{
                        height: "100%",
                        position: "absolute",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}
                >
                    <View style={{ width: "80%" }}>
                        <Text
                            hyphenationCallback={(word) => [word]}
                            style={{
                                fontFamily: "FingerPaint",
                                fontSize: 120,
                                lineHeight: 1,
                            }}
                        >
                            This Person Does Not Exist
                        </Text>
                    </View>
                    <View>
                        <View>
                            <Text>An art exhibition</Text>
                        </View>
                        <View>
                            <Text>Sponsored by</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
