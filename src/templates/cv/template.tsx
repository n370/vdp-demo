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
            skills: Array<string>
            education: Array<{
                title: string;
                grade: string;
                institution: string;
                location: string;
                start: string;
                end: string | null
            }>
        };
    };
}

export const Template: FC<TemplateProps> = ({ input }) => {
    // Font.register({
    //     family: "DMSans",
    //     fonts: [
    //         {
    //             src: join(
    //                 __dirname,
    //                 "..",
    //                 "fonts",
    //                 "DM_Sans",
    //                 "DMSans-Medium.ttf"
    //             ),
    //             fontWeight: "normal",
    //         },
    //     ],
    // });

    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text>{input.data.header.fullName}</Text>
                    <Text>{input.data.header.phoneNumber}</Text>
                    <Text>{input.data.header.emailAddress}</Text>
                    <Text>{input.data.header.fiscalAddress}</Text>
                    <Text>{input.data.header.webpageUrl}</Text>
                    <View>
                        {input.data.header.socialNetworkProfiles.map(
                            (social, i) => (
                                <Link key={i} src={social.url}>
                                    {social.name}
                                </Link>
                            )
                        )}
                    </View>
                </View>
                <View>
                    <Text>Skills and Qualifications</Text>
                    {input.data.skillsAndQualifications.map((skill, i) => (
                        <Text key={i}>{skill}</Text>
                    ))}
                </View>
                <View>
                    <Text>Spoken Languages</Text>
                    {input.data.spokenLanguages.map((language) => (
                        <View key={language.name}>
                            <Text>{language.name}</Text>
                            <Text>{language.level}</Text>
                        </View>
                    ))}
                </View>
                <View>
                    <Text>Employment History</Text>
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
                    <Text>Skills</Text>
                    {input.data.skills.map((skill, i) => (
                        <Text key={i}>{skill}</Text>
                    ))}
                </View>
                <View>
                    <Text>Education</Text>
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
            </Page>
        </Document>
    );
};
