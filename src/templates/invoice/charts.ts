const { createCanvas, Image } = require("canvas");
import { JSDOM } from "jsdom";
import * as d3 from "d3";

export async function draw(cb: any) {
    const { window } = new JSDOM();

    const svg = d3.select(window.document.body).append("svg");

    const [width, height] = cb(svg);

    const canvas = createCanvas(width, height);

    const ctx = canvas.getContext("2d");

    const svgString = window.document.querySelector("svg").outerHTML;

    const image = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = `data:image/svg+xml;base64,${Buffer.from(svgString).toString(
            "base64"
        )}`;
    });

    ctx.drawImage(image, 0, 0);

    return canvas.toBuffer("image/png");
}

export function pieChart(svg: any, data: any) {
    const width = 900;
    const height = 450;
    const margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    const grp = svg.attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // set the color scale
    const color = d3.scaleOrdinal().range(d3.schemeSet2);

    // Compute the position of each group on the pie:
    const pie = d3.pie().value(function (d: any) {
        return d.quantity * d.price;
    });

    //@ts-ignore
    const data_ready = pie(data);
    // Now I know that group A goes from 0 degrees to x degrees and so on.

    // shape helper to build arcs:
    const arcGenerator = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    grp.selectAll("mySlices")
        .data(data_ready)
        .join("path")
        .attr("d", arcGenerator)
        .attr("fill", function (d: any) {
            return color(d.data);
        })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7);

    // Now add the annotation. Use the centroid method to get the best coordinates
    grp.selectAll("mySlices")
        .data(data_ready)
        .join("text")
        .text(function (d: any) {
            return d.data.description;
        })
        .attr("transform", function (d: any) {
            return `translate(${arcGenerator.centroid(d)})`;
        })
        .style("text-anchor", "start")
        .style("font-size", "21px");

    return [width, height];
}
