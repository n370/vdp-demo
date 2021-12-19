import { Document, Page, View, Text, Path, Svg } from "@react-pdf/renderer";

export const Template = ({ data }: { data: any }) => (
  <Document>
    <Page style={{ fontFamily: "Roboto" }}>
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
          {data.translations.title}
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
    </Page>
    {Array.from({ length: 20 }).map((_, index) => (
      <Page key={index}>
        <View>
          <Text>{data.translations.title}</Text>
        </View>
      </Page>
    ))}
  </Document>
);
