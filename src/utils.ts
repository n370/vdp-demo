import { join } from "path";
import { promises } from "fs";
import axios from "axios";

export function sumWorkItemsTotal(workItems: any[]): number {
    return workItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
}

export async function getCoverPhoto() {
    const response = await axios({
        url: "https://thispersondoesnotexist.com/image",
        method: "get",
        responseType: "arraybuffer",
        timeout: 3000,
    });

    return response.data;
}

export async function getStaticCoverPhoto() {
    return promises.readFile(join(__dirname, "..", "images", "image.jpg"));
}
