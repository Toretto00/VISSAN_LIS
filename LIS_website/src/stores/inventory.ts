import UseApi from "@/libs/useApi";
import UseClientApi from "@/libs/useClientApi";

export async function fetches(date: string) {
    return await UseApi({url: `/inventories?date=${date}` })
}

export async function InventoryDetail(id: number) {
  return await UseApi({url: `/inventories/${id}` })
}

export async function fetchesClient(date: string) {
  return await UseClientApi({url: `/inventories?date=${date}` })
}

export async function excelExport(date: string | undefined, id: number) {
    return await UseClientApi({method:"POST", url: `/Inventories/ExportExcel?date=${date}&id=${id}` })
}

export async function deleteInventoryItem(data: any) {
  return await UseClientApi({method:"DELETE", url: `/Inventories`, body: data })
}
