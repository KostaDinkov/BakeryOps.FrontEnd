import {useNotifications} from '@toolpad/core/useNotifications';
type FetchCall = () => Promise<any>;


export async function handleApiResponse(fetchCall: FetchCall) {
    
    const fetchResponse = await fetchCall();
    if (fetchResponse.error) {
      throw fetchResponse.error;
    }
    return fetchResponse.data;
}

export function useHandleApiResponse() {
  const notifications = useNotifications();
  return async function (fetchCall: FetchCall) {
    try {
      return await handleApiResponse(fetchCall);
    } catch (error) {
      notifications.show(`Грешка при запис: ${error}`, { severity: 'error' });
    }
  };
}