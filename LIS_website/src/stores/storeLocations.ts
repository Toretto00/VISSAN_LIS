import UseApi from "@/libs/useApi";
import UseClientApi from "@/libs/useClientApi";

export async function getStoreLocation() {
    return await UseApi({url: `/StoreLocations` })
}
