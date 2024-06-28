
import UseApi from "@/libs/useApi"

export async function fetches(params: any) {
  return await UseApi({ url: '/categories', body: JSON.stringify(params)})
}

export async function add(data: any) {
  return await UseApi({ url: '/categories', method: 'POST', body: data })
}

export async function update(data: any) {
  return await UseApi({ url: `/categories${data.id}`, method: 'PUT', body: data })
}

export async function destroy(id: number) {
  return await UseApi({ url: `/categories${id}`, method: 'DELETE' })
}

export async function download(params: any) {
  return await UseApi({ url: '/categories/download', body: params})
}

export async function upload(params: any) {
  return await UseApi({ url: '/categories/upload', method: 'POST', body: params})
}
