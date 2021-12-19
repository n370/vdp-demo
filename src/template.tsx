import { Document, Image, Page, View, Text, Path, Svg } from "@react-pdf/renderer";

export const Template = ({ data, image }: { data: any, image: any }) => {
    const translations = data.translations['en_US'];

    return (
        <Document>
          <Page style={{ fontFamily: "Roboto" }}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                {translations.title}
              </Text>
              <Svg width="100" height="100">
                  <Path
                    stroke="red"
                    d="M 10,30
                  A 20,20 0,0,1 50,30
                  A 20,20 0,0,1 90,30
                  Q 90,60 50,90
                  Q 10,60 10,30 z"
                  />
                </Svg>
            </View>
            <Image src={image} />
          </Page>
        </Document>
      )
};
