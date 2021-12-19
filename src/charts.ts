const { createCanvas, Image } = require("canvas");
import { JSDOM } from "jsdom";
import * as d3 from "d3";

export async function drawChart(cb: any) {
  const { window } = new JSDOM();

  const svg = d3.select(window.document.body).append("svg");

  cb(svg);

  const canvas = createCanvas(1000, 1000);

  const ctx = canvas.getContext("2d");

  const svgString = window.document.querySelector("svg").outerHTML;

  const image = await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src =
      "data:image/svg+xml;base64," + Buffer.from(svgString).toString("base64");
  });

  ctx.drawImage(image, 0, 0);

  return canvas.toBuffer("image/png");
}
