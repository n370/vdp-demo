import { join } from "path";
import { FC, Fragment } from "react";
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
import { format, parse } from "date-fns";

const formatDate = (date: string) =>
    format(parse(date, "yyyy-MM-dd", new Date()), "MMM, yyyy");

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
                        <Text style={[styles.textSmall, styles.pipe]}>|</Text>
                        <Text style={styles.textSmall}>
                            {input.data.header.emailAddress.replace(
                                " at ",
                                "@"
                            )}
                        </Text>
                        <Text style={[styles.textSmall, styles.pipe]}>|</Text>
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
                        <Text style={[styles.textSmall, styles.pipe]}>|</Text>
                        {input.data.header.socialNetworkProfiles.map(
                            (social, index, input) => (
                                <Fragment key={index}>
                                    <Link
                                        style={styles.textSmall}
                                        src={social.url}
                                    >
                                        {social.name}
                                    </Link>
                                    {index != input.length - 1 && (
                                        <Text
                                            style={[
                                                styles.textSmall,
                                                styles.pipe,
                                            ]}
                                        >
                                            |
                                        </Text>
                                    )}
                                </Fragment>
                            )
                        )}
                    </View>
                </View>
                <View>
                    <Text
                        style={[
                            styles.textMedium,
                            styles.textBold,
                            styles.heading1,
                        ]}
                    >
                        Skills and Qualifications
                    </Text>
                    <View style={[styles.indentedTextBlock]}>
                        {input.data.skillsAndQualifications.map((skill, i) => (
                            <Text key={i} style={styles.textSmall}>
                                {skill}
                            </Text>
                        ))}
                    </View>
                </View>
                <View>
                    <Text
                        style={[
                            styles.textMedium,
                            styles.textBold,
                            styles.heading1,
                        ]}
                    >
                        Spoken Languages
                    </Text>
                    <View style={[styles.indentedTextBlock]}>
                        {input.data.spokenLanguages.map((language, index) => (
                            <View
                                key={index}
                                style={[styles.row, styles.textSmall]}
                            >
                                <Text>{language.name}</Text>
                                <Text
                                    style={{ marginLeft: "3pt" }}
                                >{`(${language.level})`}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View>
                    <Text
                        style={[
                            styles.textMedium,
                            styles.textBold,
                            styles.heading1,
                        ]}
                    >
                        Employment History
                    </Text>
                    {input.data.employmentHistory.map(
                        (employer, index, input) => (
                            <View
                                key={index}
                                style={[
                                    {
                                        marginBottom:
                                            index !== input.length - 1
                                                ? "0.5cm"
                                                : "0",
                                    },
                                ]}
                            >
                                <View
                                    minPresenceAhead={80}
                                    style={[styles.row, styles.spaceBetween]}
                                >
                                    <View style={[styles.row]}>
                                        <Text
                                            style={[
                                                styles.textSmall,
                                                styles.textBold,
                                            ]}
                                        >
                                            {employer.role}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.textSmall,
                                                styles.comma,
                                            ]}
                                        >
                                            ,
                                        </Text>
                                        <Text style={[styles.textSmall]}>
                                            {employer.companyName}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.textSmall,
                                                styles.comma,
                                            ]}
                                        >
                                            ,
                                        </Text>
                                        <Text style={[styles.textSmall]}>
                                            {employer.location}
                                        </Text>
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.textSmall]}>
                                            {formatDate(employer.start)}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.textSmall,
                                                styles.emDash,
                                            ]}
                                        >
                                            —
                                        </Text>
                                        <Text style={[styles.textSmall]}>
                                            {employer.end
                                                ? formatDate(employer.end)
                                                : "Present"}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    {employer.description.map(
                                        (paragraph, i) => (
                                            <Text
                                                key={i}
                                                minPresenceAhead={1}
                                                style={[
                                                    styles.textSmall,
                                                    styles.paragraph,
                                                ]}
                                            >
                                                {paragraph}
                                            </Text>
                                        )
                                    )}
                                </View>
                                <View>
                                    <Text style={[styles.textSmall]}>
                                        {employer.tools.reduce(
                                            (text, tool, index, input) => {
                                                text += tool;
                                                if (
                                                    index !==
                                                    input.length - 1
                                                ) {
                                                    text += ", ";
                                                } else {
                                                    text += ".";
                                                }
                                                return text;
                                            },
                                            "Technologies used: "
                                        )}
                                    </Text>
                                </View>
                            </View>
                        )
                    )}
                </View>
                <View>
                    <Text
                        style={[
                            styles.textMedium,
                            styles.textBold,
                            styles.heading1,
                        ]}
                    >
                        Skills
                    </Text>
                    <Text style={[styles.textSmall]}>
                        {input.data.skills.reduce(
                            (text, skill, index, input) => {
                                text += skill;
                                if (index !== input.length - 1) {
                                    text += ", ";
                                } else {
                                    text += ".";
                                }
                                return text;
                            },
                            ""
                        )}
                    </Text>
                </View>
                <View>
                    <Text
                        style={[
                            styles.textMedium,
                            styles.textBold,
                            styles.heading1,
                        ]}
                    >
                        Education
                    </Text>
                    {input.data.education.map((site, index) => (
                        <View
                            key={index}
                            style={[styles.row, styles.spaceBetween]}
                        >
                            <View style={[styles.row]}>
                                <Text style={[styles.textSmall]}>
                                    {[
                                        site.title,
                                        site.grade,
                                        site.institution,
                                        site.location,
                                    ].reduce((text, datum, index, input) => {
                                        text += datum;
                                        if (index !== input.length - 1) {
                                            text += ", ";
                                        }
                                        return text;
                                    }, "")}
                                </Text>
                            </View>
                            <View style={[styles.row]}>
                                <Text
                                    style={[
                                        styles.textSmall,
                                        { textAlign: "right" },
                                    ]}
                                >
                                    {formatDate(site.start)}
                                </Text>
                                <Text style={[styles.textSmall, styles.emDash]}>
                                    —
                                </Text>
                                <Text
                                    style={[
                                        styles.textSmall,
                                        { width: "1.7cm", textAlign: "left" },
                                    ]}
                                >
                                    {site.end
                                        ? formatDate(site.end)
                                        : "Present"}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <Text
                    fixed
                    style={[styles.footer]}
                    render={({ pageNumber }) => pageNumber}
                />
            </Page>
        </Document>
    );
};
