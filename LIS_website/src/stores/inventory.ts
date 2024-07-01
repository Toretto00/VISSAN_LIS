import UseApi from "@/libs/useApi";
import UseClientApi from "@/libs/useClientApi";

export async function fetches(date: string) {
    return await UseApi({url: `/inventories` })
}

export async function fetchesClient(date: string) {
  return await UseClientApi({url: `/inventories?date=${date}` })
}
