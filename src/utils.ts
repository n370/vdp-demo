export function sumWorkItemsTotal(workItems: any[]): number {
    return workItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
}
