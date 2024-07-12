import UseApi from "@/libs/useApi";
import UseClientApi from "@/libs/useClientApi";

export async function fetches(date: string) {
    return await UseApi({url: `/inventories?date=${date}` })
}

export async function getInventory(storeid: string) {
  return await UseApi({url: `/Inventories/StoreInventories?storeid=${storeid}` })
}

export async function InventoryDetail(id: number) {
  return await UseApi({url: `/inventories/${id}` })
}

export async function fetchesClient(date: string) {
  return await UseClientApi({url: `/inventories?date=${date}` })
}

export async function GetStoreInventories(storeid: string, startDate: string, endDate: string) {
  return await UseClientApi({url: '/Inventories/StoreInventories?' +(storeid===""?"":`storeid=`+storeid) + (startDate===""?"":`&from=${startDate}`)+ (endDate===""?"":`&to=${endDate}`) })
}

export async function excelExport(from: string, to: string, id: number) {  
  return await UseClientApi({method:"POST", url: `/Inventories/ExportExcel?`+(from===""?"":`from=`+from) + (to===""?"":`&to=${to}`)+ (id===0?"&id=0":`id=${id}`),body:'' })
}

export async function deleteInventoryItem(data: any) {
  return await UseClientApi({method:"DELETE", url: `/Inventories`, body: data })
}

export async function newInventory(data: any, location: string) {
  return await UseClientApi({method:"POST", url: `/Inventories?location=${location}`, body: data })
}
