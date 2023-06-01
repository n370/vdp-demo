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

export interface TemplateProps {
    input: {
        data: {
            header: {
                fullName: string;
                role: string;
                phoneNumber: string;
                emailAddress: string;
                fiscalAddress: string;
                webpageUrl: string;
                socialNetworkProfiles: Array<{
                    name: string;
                    url: string;
                }>;
            };
            skillsAndQualifications: Array<string>;
            spokenLanguages: Array<{
                name: string;
                level: string;
            }>;
            employmentHistory: Array<{
                companyName: string;
                role: string;
                location: string;
                start: string;
                end: string | null;
                description: Array<string>;
                tools: Array<string>;
            }>;
            skills: Array<string>;
            education: Array<{
                title: string;
                grade: string;
                institution: string;
                location: string;
                start: string;
                end: string | null;
            }>;
        };
    };
}

export const Template: FC<TemplateProps> = ({ input }) => {
    Font.register({
        family: "RedHatDisplay",
        fonts: [
            {
                src: join(
                    __dirname,
                    "fonts",
                    "Red_Hat_Display",
                    "static",
                    "RedHatDisplay-Regular.ttf"
                ),
                fontStyle: "normal",
                fontWeight: 400,
            },
            {
                src: join(
                    __dirname,
                    "fonts",
                    "Red_Hat_Display",
                    "static",
                    "RedHatDisplay-Italic.ttf"
                ),
                fontStyle: "italic",
                fontWeight: 400,
            },
            {
                src: join(
                    __dirname,
                    "fonts",
                    "Red_Hat_Display",
                    "static",
                    "RedHatDisplay-Bold.ttf"
                ),
                fontStyle: "normal",
                fontWeight: 700,
            },
        ],
    });

    return (
        <Document>
            <Page style={styles.page}>
                <View fixed style={styles.header}>
                    <View>
                        <Text style={[styles.textLarge, styles.textBold]}>
                            {input.data.header.fullName}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.textSmall, styles.textItalic]}>
                            {input.data.header.role}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.textSmall}>
                            {input.data.header.phoneNumber}
                        </Text>
                        <Text style={[styles.textSmall, styles.textSeparator]}>
                            |
                        </Text>
                        <Text style={styles.textSmall}>
                            {input.data.header.emailAddress.replace(
                                " at ",
                                "@"
                            )}
                        </Text>
                        <Text style={[styles.textSmall, styles.textSeparator]}>
                            |
                        </Text>
                        <Text style={styles.textSmall}>
                            {input.data.header.fiscalAddress}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Link
                            style={styles.textSmall}
                            src={input.data.header.webpageUrl}
                        >
                            {input.data.header.webpageUrl}
                        </Link>
                        <Text style={[styles.textSmall, styles.textSeparator]}>
                            |
                        </Text>
                        {input.data.header.socialNetworkProfiles.map(
                            (social, index, input) => (
                                <>
                                    <Link
                                        key={index}
                                        style={styles.textSmall}
                                        src={social.url}
                                    >
                                        {social.name}
                                    </Link>
                                    {index != input.length - 1 && (
                                        <Text
                                            style={[
                                                styles.textSmall,
                                                styles.textSeparator,
                                            ]}
                                        >
                                            |
                                        </Text>
                                    )}
                                </>
                            )
                        )}
                    </View>
                </View>
                <View>
                    <Text style={[styles.textMedium, styles.textBold]}>
                        Skills and Qualifications
                    </Text>
                    {input.data.skillsAndQualifications.map((skill, i) => (
                        <Text key={i}>{skill}</Text>
                    ))}
                </View>
                <View>
                    <Text style={[styles.textMedium, styles.textBold]}>
                        Spoken Languages
                    </Text>
                    {input.data.spokenLanguages.map((language) => (
                        <View key={language.name}>
                            <Text>{language.name}</Text>
                            <Text>{language.level}</Text>
                        </View>
                    ))}
                </View>
                <View>
                    <Text style={[styles.textMedium, styles.textBold]}>
                        Employment History
                    </Text>
                    {input.data.employmentHistory.map((employer, i) => (
                        <View key={i}>
                            <Text>{employer.companyName}</Text>
                            <Text>{employer.role}</Text>
                            <Text>{employer.location}</Text>
                            <Text>{employer.start}</Text>
                            <Text>{employer.end || "Present"}</Text>
                            <View>
                                {employer.description.map((paragraph, i) => (
                                    <Text key={i}>{paragraph}</Text>
                                ))}
                            </View>
                            <View>
                                {employer.tools.map((tool, i) => (
                                    <Text key={i}>{tool}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                <View>
                    <Text style={[styles.textMedium, styles.textBold]}>
                        Skills
                    </Text>
                    {input.data.skills.map((skill, i) => (
                        <Text key={i}>{skill}</Text>
                    ))}
                </View>
                <View>
                    <Text style={[styles.textMedium, styles.textBold]}>
                        Education
                    </Text>
                    {input.data.education.map((site) => (
                        <View key={site.title}>
                            <Text>{site.title}</Text>
                            <Text>{site.grade}</Text>
                            <Text>{site.institution}</Text>
                            <Text>{site.location}</Text>
                            <Text>{site.start}</Text>
                            <Text>{site.end || "Present"}</Text>
                        </View>
                    ))}
                </View>
                <View
                    fixed
                    render={({ pageNumber }) => (
                        <View>
                            <Text>{pageNumber}</Text>
                        </View>
                    )}
                />
            </Page>
        </Document>
    );
};
