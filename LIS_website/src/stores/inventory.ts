import UseApi from "@/libs/useApi";

export async function fetches(date: string) {
    return await UseApi({url: `/inventories?date=${date}` })
}