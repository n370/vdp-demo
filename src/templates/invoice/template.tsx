import { FC } from "react";
import { Font, Document, Image, Page, View, Text } from "@react-pdf/renderer";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { format, endOfMonth, parse } from "date-fns";
import styles from "./styles";
import { generateQR, sumWorkItemsTotal } from "../../utils";
import * as translations from "./translations";
import { draw, pieChart } from "./charts";

enum Currency {
  GBP = "GBP",
  USD = "USD",
  AUD = "AUD",
  BRL = "BRL",
}

interface TemplateProps {
  locale: keyof typeof translations;
  data: {
    metadata: {
      invoiceNumber: string;
      invoiceDate: string;
      dueDate: string;
      gratitudeMessage: string;
    };
    issuer: {
      fullName: string;
      idNumber: string;
      address: {
        line1: string;
        line2: string;
      };
      email: string;
      phoneNumber: string;
      bankDetails: {
        name: string;
        accountAddress: string;
        accountName: string;
        accountNumber: string;
        bic?: string;
        sortCode?: string;
        branchCode?: string;
        iban?: string;
        currency: Currency;
        guidelines: string;
      };
    };
    billTo: {
      name: string;
      phoneNumber: string;
      address: {
        line1: string;
        line2: string;
      };
    };
    workItems: Array<{
      description: string;
      quantity: number;
      price: number;
      currency: Currency;
    }>;
  };
}

const currencySymbols: Record<Currency, string> = {
  USD: "US$",
  GBP: "£",
  AUD: "AU$",
  BRL: "R$",
};

export const Template: FC<TemplateProps> = ({ locale, data }) => {
  const translation = translations[locale];
  const now = new Date();
  const invoiceNumber = data.metadata.invoiceNumber || uuid();
  const invoiceDate = data.metadata.invoiceDate
    ? parse(data.metadata.invoiceDate, "y-MM-dd", now)
    : now;
  const dueDate = data.metadata.dueDate
    ? parse(data.metadata.dueDate, "y-MM-dd", now)
    : endOfMonth(now);

  Font.register({
    family: "Roboto",
    fonts: [
      {
        src: join(__dirname, "..", "fonts", "Roboto", "Roboto-Regular.ttf"),
        fontWeight: "normal",
      },
      {
        src: join(__dirname, "..", "fonts", "Roboto", "Roboto-Medium.ttf"),
        fontWeight: "medium",
      },
      {
        src: join(__dirname, "..", "fonts", "Roboto", "Roboto-Bold.ttf"),
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
            <Text style={{ fontSize: 10 }}>{data.issuer.idNumber}</Text>
            <Text style={{ fontSize: 10 }}>{data.issuer.address.line1}</Text>
            <Text style={{ fontSize: 10 }}>{data.issuer.address.line2}</Text>
            <Text style={{ fontSize: 10 }}>{data.issuer.email}</Text>
            <Text style={{ fontSize: 10 }}>{data.issuer.phoneNumber}</Text>
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
              <Text style={{ fontSize: 10 }}>{invoiceNumber}</Text>
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
                {format(invoiceDate, translation.dateFormat)}
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
                {format(dueDate, translation.dateFormat)}
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
            <Text style={{ fontSize: 10 }}>{data.billTo.address.line1}</Text>
            <Text style={{ fontSize: 10 }}>{data.billTo.address.line2}</Text>

            <Text style={{ fontSize: 10 }}>{data.billTo.phoneNumber}</Text>
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
                <Text style={{ textAlign: "center" }}>{item.description}</Text>
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
                  {currencySymbols[item.currency as Currency]} {item.price}
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
                  {currencySymbols[item.currency as Currency]}{" "}
                  {(item.quantity * item.price).toFixed(2)}
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
              {data.metadata.gratitudeMessage || translation.gratitudeMessage}
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
                marginRight: 20,
              }}
            >
              {translation.balanceDue}
            </Text>
            <Text>
              {currencySymbols[data.issuer.bankDetails.currency as Currency]}{" "}
              {sumWorkItemsTotal(data.workItems).toFixed(2)}
            </Text>
          </View>
        </View>
        {/* <View style={{ margin: `10 0` }}>
                    <Image
                        src={async () => ({
                            data: await draw((svg: any) =>
                                pieChart(svg, data.workItems)
                            ),
                            format: "png",
                        })}
                    />
                </View> */}
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexBasis: "90%", fontSize: 11 }}>
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
              {data.issuer.bankDetails.guidelines ? (
                <Text>{data.issuer.bankDetails.guidelines}</Text>
              ) : (
                <Text>{translation.paymentInstructionsSubTittle}:</Text>
              )}
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexBasis: "50%", fontSize: 11 }}>
            <Text
              style={{
                fontWeight: "medium",
                textTransform: "uppercase",
              }}
            >
              {data.issuer.bankDetails.name}
            </Text>
            {[
              {
                data: data.issuer.bankDetails.accountAddress,
                label: translation.bankAccountAddress,
              },
              {
                data: data.issuer.bankDetails.accountName,
                label: translation.bankAccountName,
              },
              {
                data: data.issuer.bankDetails.accountNumber,
                label: translation.bankAccountNumber,
              },
              {
                data: data.issuer.bankDetails.bic,
                label: translation.bankAccountBIC,
              },
              {
                data: data.issuer.bankDetails.sortCode,
                label: translation.bankAccountSortCode,
              },
              {
                data: data.issuer.bankDetails.iban,
                label: translation.bankAccountIBAN,
              },
            ].map(({ data, label }) =>
              data ? (
                <View
                  key={`${label}-${data}`}
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
                    {`${label}: `}
                  </Text>
                  <Text>{data}</Text>
                </View>
              ) : null
            )}
          </View>
          {/* <View
                        style={{
                            flexBasis: "50%",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Image
                            style={{ width: 80 }}
                            src={async () => ({
                                data: await generateQR(invoiceNumber),
                                format: "png",
                            })}
                        />
                    </View> */}
        </View>
      </Page>
    </Document>
  );
};
