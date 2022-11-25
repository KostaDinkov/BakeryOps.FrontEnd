
const hostName = "http://localhost:5257"

export const ordersApi =  {
    getOrders: async ()=>{
        try{
            let response = await (await fetch(`${hostName}/api/orders`));
            return await response.json();
    
        }
        catch(error){
            throw ("API error: getOrders", error)
        }
    },
    getOrder: async (id)=>{
        try{
            let response = await fetch(`${hostName}/api/orders/${id}`)
            if(response.status===404){
                return null
            }
    
            return await response.json();
    
        }
        catch(error){
            throw ("API error: getOrders", error)
        }
    },
    getOrdersForDate: async (date)=>{
        try{
            let response = await fetch(`${hostName}/api/orders/forDate/${date}`);
            return await response.json();
        }
        catch(error){
            throw ("API error: getOrdersForDate")
        }
    }
}




