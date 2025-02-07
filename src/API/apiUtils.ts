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

  return async function (fetchCall: FetchCall, successMessage?: string, errorMessage?: string) {
    try {
      const data = await handleApiResponse(fetchCall);
      const message = successMessage || "Успешна сървърна операция";
      notifications.show(message, { severity: "success", autoHideDuration: 5000 });
      return data;
    } catch (error) {
      const message = errorMessage || "Грешка на сървъра";
      notifications.show(
        `${message}: Статус ${(error as Error).status}`,
        { severity: "error", autoHideDuration: 5000 }
      );
      throw new Error(
        `Грешка при запис \n${formatResponseErrors(error as Error)}`
      );
    }
  };
}

function formatResponseErrors(error: Error) {
  const lines: string[] = [
    error.title,
    `Status: ${error.status}`,
    ...Object.keys(error.errors).map(
      (key) => `${key}: ${error.errors[key]?.join(", ")}`
    ),
  ];
  return lines.join("\n");
}
