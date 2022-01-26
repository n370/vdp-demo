import { join } from "path";
import { promises } from "fs";
import axios from "axios";

const { createCanvas, Image } = require("canvas");
const { toDataURL } = require("qrcode");

export function sumWorkItemsTotal(workItems: any[]): number {
    return workItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
}

export async function getDynamicImage() {
    const response = await axios({
        url: "https://thisartworkdoesnotexist.com/",
        method: "get",
        responseType: "arraybuffer",
        timeout: 3000,
    });

    return response.data;
}

export async function getStaticImage(filename: string) {
    return promises.readFile(join(__dirname, "..", "images", filename));
}

export async function generateQR(data: string, opts: any = {}) {
    opts.width = opts.width || 200
    opts.height = opts.height || opts.width

    const canvas = createCanvas(opts.width, opts.height);

    const ctx = canvas.getContext("2d");

    const dataURL = await toDataURL(data, {
        margin: 0,
        ...opts
    });

    const image = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = dataURL;
    });

    ctx.drawImage(image, 0, 0);

    return canvas.toBuffer("image/png");
}
