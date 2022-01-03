import ReactPDF, { Font } from "@react-pdf/renderer";
import { Template } from "./template";
import { join } from "path";
import { drawChart } from "./charts";


export async function renderTemplate(props: any) {
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

    const chart = drawChart((svg: any) => {
        const width = 1000;
        const height = 1000;

        svg
            .attr('width', width)
            .attr('height', height)
            .append("circle")
            .attr("cx", width/2)
            .attr("cy", height/2)
            .attr("r", 40)
            .style("fill", "blue");

        return [width, height]
    })

    return ReactPDF.renderToStream(<Template {...{ ...props, image: chart }} />);
}
