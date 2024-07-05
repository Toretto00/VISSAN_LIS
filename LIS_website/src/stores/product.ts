import UseApi from "@/libs/useApi";

export async function getProduct () {
    return await UseApi({url:"/Products"})
}
