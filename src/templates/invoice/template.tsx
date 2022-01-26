import { FC } from "react";
import { Font, Document, Image, Page, View, Text } from "@react-pdf/renderer";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { format, endOfMonth } from "date-fns";
import styles from "./styles";
import { sumWorkItemsTotal } from "../../utils";
import * as translations from "./translations";
import { draw, pieChart } from "./charts";
import { generateQR } from "./qr";

interface TemplateProps {
    locale: keyof typeof translations;
    data: any;
}

export const Template: FC<TemplateProps> = ({ locale, data }) => {
    const translation = translations[locale];

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
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 30,
                            textTransform: "uppercase",
                        }}
                    >
                        {translation.title}
                    </Text>
                </View>
                <View
                    style={{
                        ...styles.block,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flexBasis: "50%",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Text style={{ fontSize: 15, marginBottom: 5 }}>
                            {data.issuer.fullName}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.issuer.idNumber}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.issuer.address.line1}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.issuer.address.line2}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.issuer.email}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.issuer.phoneNumber}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        ...styles.block,
                        flexDirection: "row",
                    }}
                >
                    <View
                        style={{
                            flexBasis: "65%",
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    fontSize: 9,
                                }}
                            >
                                {translation.invoiceNumber}:{" "}
                            </Text>
                            <Text style={{ fontSize: 10 }}>{uuid()}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    fontSize: 9,
                                }}
                            >
                                {translation.invoiceDate}:{" "}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                {format(Date.now(), "MM/dd/yyyy")}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    textTransform: "uppercase",
                                    fontSize: 9,
                                }}
                            >
                                {translation.dueDate}:{" "}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                {format(endOfMonth(Date.now()), "MM/dd/yyyy")}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexBasis: "35%",
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                fontSize: 9,
                            }}
                        >
                            {translation.billTo}:
                        </Text>
                        <Text style={{ fontSize: 10 }}>{data.billTo.name}</Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.billTo.address.line1}
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            {data.billTo.address.line2}
                        </Text>

                        <Text style={{ fontSize: 10 }}>
                            {data.billTo.phoneNumber}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        ...styles.block,
                        border: 1,
                        padding: 5,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: 12,
                            marginBottom: 5,
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: "50%",
                            }}
                        >
                            <Text>{translation.workItemDescription}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: `${50 / 3}%`,
                            }}
                        >
                            <Text>{translation.workItemQuantity}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: `${50 / 3}%`,
                            }}
                        >
                            <Text>{translation.workItemUnitPrice}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: `${50 / 3}%`,
                            }}
                        >
                            <Text>{translation.workItemTotal}</Text>
                        </View>
                    </View>
                    {data.workItems.map((item: any, id: number) => (
                        <View
                            key={`work-item-${id}`}
                            style={{ flexDirection: "row", fontSize: 12 }}
                        >
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexBasis: "50%",
                                }}
                            >
                                <Text>{item.description}</Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexBasis: `${50 / 3}%`,
                                }}
                            >
                                <Text>{item.quantity}</Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexBasis: `${50 / 3}%`,
                                }}
                            >
                                <Text>
                                    {translation.workItemCurrencySymbol}{" "}
                                    {item.price}
                                </Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexBasis: `${50 / 3}%`,
                                }}
                            >
                                <Text>
                                    {translation.workItemCurrencySymbol}{" "}
                                    {item.quantity * item.price}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={{ ...styles.block, flexDirection: "row" }}>
                    <View
                        style={{
                            flexBasis: "60%",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontSize: 14 }}>
                            {translation.gratitudeMessage}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexBasis: "40%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            paddingRight: 20,
                        }}
                    >
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: 12,
                            }}
                        >
                            {translation.balanceDue}
                        </Text>
                        <Text>
                            {translation.workItemCurrencySymbol}{" "}
                            {sumWorkItemsTotal(data.workItems)}
                        </Text>
                    </View>
                </View>
                <View style={{ margin: `10 0` }}>
                    <Image
                        src={async () => ({
                            data: await draw((svg: any) =>
                                pieChart(svg, data.workItems)
                            ),
                            format: "png",
                        })}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexBasis: "50%", fontSize: 11 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text
                                style={{
                                    textTransform: "uppercase",
                                    fontWeight: "bold",
                                    fontSize: 12,
                                }}
                            >
                                {translation.paymentInstructionsTitle}
                            </Text>
                            <Text>
                                {translation.paymentInstructionsSubTittle}:
                            </Text>
                        </View>
                        <Text
                            style={{
                                fontWeight: "medium",
                                textTransform: "uppercase",
                            }}
                        >
                            {data.issuer.bankDetails.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "medium",
                                    textTransform: "uppercase",
                                }}
                            >
                                {translation.bankAccountBIC}:{" "}
                            </Text>
                            <Text>{data.issuer.bankDetails.bic}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "medium",
                                    textTransform: "uppercase",
                                }}
                            >
                                {translation.bankAccountName}:{" "}
                            </Text>
                            <Text>{data.issuer.bankDetails.accountName}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: "medium",
                                    textTransform: "uppercase",
                                }}
                            >
                                {translation.bankAccountNumber}:{" "}
                            </Text>
                            <Text>{data.issuer.bankDetails.accountNumber}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexBasis: "50%",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Image
                            style={{ width: 80 }}
                            src={async () => ({
                                data: await generateQR("Yep, QRs work too!"),
                                format: "png",
                            })}
                        />
                    </View>
                </View>
            </Page>
        </Document>
    );
};
