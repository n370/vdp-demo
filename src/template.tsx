import { Document, Image, Page, View, Text } from "@react-pdf/renderer";
import { v4 as uuid } from "uuid";
import { format, endOfMonth } from "date-fns";
import styles from "./styles";
import { sumWorkItemsTotal } from "./utils";

export const Template = ({ translations, data, image }: any) => {
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
                        {translations.title}
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
                                {translations.invoiceNumber}:{" "}
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
                                {translations.invoiceDate}:{" "}
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
                                {translations.dueDate}:{" "}
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
                            {translations.billTo}:
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
                            <Text>{translations.workItemDescription}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: `${50 / 3}%`,
                            }}
                        >
                            <Text>{translations.workItemQuantity}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: `${50 / 3}%`,
                            }}
                        >
                            <Text>{translations.workItemUnitPrice}</Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                flexBasis: `${50 / 3}%`,
                            }}
                        >
                            <Text>{translations.workItemTotal}</Text>
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
                                    {translations.workItemCurrencySymbol}{" "}
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
                                    {translations.workItemCurrencySymbol}{" "}
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
                            {translations.gratitudeMessage}
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
                            {translations.balanceDue}
                        </Text>
                        <Text>
                            {translations.workItemCurrencySymbol}{" "}
                            {sumWorkItemsTotal(data.workItems)}
                        </Text>
                    </View>
                </View>
                <View style={{ fontSize: 11 }}>
                    <View style={{ marginBottom: 5 }}>
                        <Text
                            style={{
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: 12,
                            }}
                        >
                            {translations.paymentInstructionsTitle}
                        </Text>
                        <Text>
                            {translations.paymentInstructionsSubTittle}:
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
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "medium",
                                textTransform: "uppercase",
                            }}
                        >
                            {translations.bankAccountBIC}:{" "}
                        </Text>
                        <Text>{data.issuer.bankDetails.bic}</Text>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "medium",
                                textTransform: "uppercase",
                            }}
                        >
                            {translations.bankAccountName}:{" "}
                        </Text>
                        <Text>{data.issuer.bankDetails.accountName}</Text>
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: "medium",
                                textTransform: "uppercase",
                            }}
                        >
                            {translations.bankAccountNumber}:{" "}
                        </Text>
                        <Text>{data.issuer.bankDetails.accountNumber}</Text>
                    </View>
                </View>
            </Page>
            <Page style={styles.page}>
                <Image src={image} />
            </Page>
        </Document>
    );
};
