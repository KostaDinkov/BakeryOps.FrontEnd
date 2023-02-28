import {add, formatISO, formatIso} from 'date-fns';
export const hostName = "http://localhost:5000";
export const eventHubUrl = `${hostName}/eventHub`;



export const ordersApi = {
  getOrders: async function (startDate , endDate) {
    try {     
      if(arguments.length === 0 ){
        startDate = formatISO(new Date(), {representation:"date"});
        endDate = formatISO(add(new Date(),{days:3}), {representation:"date"});
      }
      else if(arguments.length === 1){
        endDate = startDate;
      }
      
      let response = await fetch(`${hostName}/api/orders?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`API error: ${error.message}`);
    }
  },
  getOrder: async (id) => {
    try {
      let response = await fetch(`${hostName}/api/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 404) {
        return null;
      }

      return await response.json();
    } catch (error) {
      throw ("API error: getOrders", error);
    }
  },
  postOrder: async (data) => {
    try {
      const response = await fetch(`${hostName}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.log("API error " + error.message);
    }
  },
  putOrder: async (orderId, data) => {
    try {
        const response = fetch(`${hostName}/api/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        console.log("API error " + error.message);
    }
  },
  deleteOrder:async(orderId)=>{
    fetch(`${hostName}/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
  }
};

export const productsApi = {
  getProducts: async ()=>{
    const response = await  fetch(`${hostName}/api/products`);
    return await response.json();
  }
}

export const auth = {
  login: async (userData) => {
    let response =  await fetch(`${hostName}/api/security/getToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.status === 401) {
      return 401;
    }
    return await response.json();
  },
};
