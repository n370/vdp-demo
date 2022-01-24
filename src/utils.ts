import { join } from "path";
import { promises } from "fs";
import axios from "axios";

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
