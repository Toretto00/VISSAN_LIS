import { getCurrentUser } from "@/libs/session"

interface UseFetchOptions {
  method?: string
  url: string
  body?: string
  token?: string
}

async function useApi({ method = 'GET', url, body = ''}: UseFetchOptions) { 
  try {
    const user = await getCurrentUser()

    const accessToken = user?.token

    if (method === 'GET') {
      return await fetch(`${process.env.API_URL}/api${url}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        cache: 'no-store'
      })
    }else{
      return await fetch(`${process.env.API_URL}/api/${url}`, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: body,
      })
    }

  } catch (error) {    
    throw new Error("Failed to fetch data", { cause: error })
  }
}

export default useApi
