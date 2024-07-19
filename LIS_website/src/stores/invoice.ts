import UseApi from "@/libs/useApi";
import UseClientApi from "@/libs/useClientApi";

export async function getInvoice(storeid: string, from: string, to: string, status: string) {
    return await UseApi({url: '/Invoices?' + (storeid === "" ? "" : `storeid=${storeid}`) + (from === "" ? "" : `&from=${from}`) + `&to=${to}` + (status === "" ? "" : `&status=${status}`) })
}

export async function getInvoiceClient(storeid: string, from: string, to: string, status: string) {
  return await UseClientApi({url: '/Invoices?' + (storeid === "" ? "" : `storeid=${storeid}`) + (from === "" ? "" : `&from=${from}`) + `&to=${to}` + (status === "" ? "" : `&status=${status}`) })
}

export async function getInvoiceDetail(id: number) {
  return await UseApi({url: `/Invoices/${id}` })
}

// export async function InventoryDetail(id: number) {
//   return await UseApi({url: `/inventories/${id}` })
// }

// export async function fetchesClient(date: string) {
//   return await UseClientApi({url: `/inventories?date=${date}` })
// }

// export async function GetStoreInventories(storeid: string, startDate: string, endDate: string) {
//   return await UseClientApi({url: '/Inventories/StoreInventories?' +(storeid===""?"":`storeid=`+storeid) + (startDate===""?"":`&from=${startDate}`)+ (endDate===""?"":`&to=${endDate}`) })
// }

// export async function excelExport(from: string, to: string, id: number) {  
//   return await UseClientApi({method:"POST", url: `/Inventories/ExportExcel?`+(from===""?"":`from=`+from) + (to===""?"":`&to=${to}`)+ (id===0?"&id=0":`id=${id}`),body:'' })
// }

export async function putInvoice(id: number, data: any) {
  return await UseClientApi({method:"PUT", url: `/Invoices/${id}`, body: data })
}

export async function deleteInvoice(id: number) {
  return await UseClientApi({method:"DELETE", url: `/Invoices/${id}`, body: "" })
}

export async function postInvoice(data: any, user: number, storeid: string ) {
  return await UseClientApi({method:"POST", url: `/Invoices?user=${user}&storeid=${storeid}`, body: data })
}
