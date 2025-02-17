const hostName = import.meta.env.VITE_API_SERVER_URL;

export const auth = {
    login: async (userData: { userName: string; password: string }) :Promise<Response>  => {
      let response = await fetch(`${hostName}/api/security/getToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      return response
    },
  };

  export const getPermissions = async (): Promise<string[]> => {
    let response = await fetch(`${hostName}/api/security/getPermissions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.json();
  }

  export function parseJwt (token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
