
type FetchCall = () => Promise<any>;


export async function handleApiResponse(fetchCall: FetchCall) {
    const fetchResponse = await fetchCall();
    if (fetchResponse.error) {
      throw new Error(fetchResponse.error);
    }
  
    return fetchResponse.data;
  }