import { getSession } from 'next-auth/react'

interface UseFetchOptions {
  method?: string
  url: string
  body?: string
  token?: string
}

//const { data: session } = useSession()

async function useClientApi({ method = 'GET', url, body = ''}: UseFetchOptions) {
  try {
    const session = await getSession()

    const accessToken = session?.user?.token

    if (method === 'GET') {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${url}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        cache: 'no-store'
      })
    }else{
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${url}`, {
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

export default useClientApi
