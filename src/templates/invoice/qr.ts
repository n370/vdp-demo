const { createCanvas, Image } = require("canvas");
const { toDataURL } = require("qrcode");

export async function generateQR(data: string) {
    const canvas = createCanvas(200, 200);

    const ctx = canvas.getContext("2d");

    const dataURL = await toDataURL(data, {
        margin: 0,
        width: 200,
    });

    const image = await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = dataURL;
    });

    ctx.drawImage(image, 0, 0);

    return canvas.toBuffer("image/png");
}
