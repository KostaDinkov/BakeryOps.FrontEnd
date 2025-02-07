import { useNotifications } from "@toolpad/core/useNotifications";
import { FetchResponse } from "openapi-fetch";
import { ErrorResponse, ResponseObjectMap } from "openapi-typescript-helpers";
type FetchCall = () => Promise<FetchResponse<any, any, any>>;

type Error = {
  errors: { [key: string]: string[] };
  status: number;
  title: string;
};
export async function handleApiResponse(fetchCall: FetchCall) {
  const fetchResponse = await fetchCall();
  if (fetchResponse.error) {
    throw fetchResponse.error as ErrorResponse<ResponseObjectMap<any>, any>;
  }
  return fetchResponse.data;
}

export function useHandleApiResponse() {
  const notifications = useNotifications();

  return async function (fetchCall: FetchCall) {
    try {
      return await handleApiResponse(fetchCall);
    } catch (error) {
      notifications.show(`Грешка при запис: Статус ${error.status}`, { severity: "error" });
      throw new Error(`Грешка при запис \n${formatResponseErrors(error as Error)}`);
    }
  };
}


function formatResponseErrors(error: Error) {
  const lines: string[] = [
    error.title,
    `Status: ${error.status}`,
    ...Object.keys(error.errors).map(key => `${key}: ${error.errors[key]?.join(', ')}`),
  ];
  return lines.join("\n");
}
