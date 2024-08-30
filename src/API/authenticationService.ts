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
