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
                src: join(__dirname, "..", "fonts", "Roboto", "Roboto-Black.ttf"),
                fontWeight: "bold",
            },
        ],
    });

    const chart = drawChart((svg: any) => {
        svg
            .attr('width', 1000)
            .attr('height', 1000)
            .append("circle")
            .attr("cx", 500)
            .attr("cy", 500)
            .attr("r", 40)
            .style("fill", "blue");
    })

    return ReactPDF.renderToStream(<Template {...{ ...props, image: chart }} />);
}
