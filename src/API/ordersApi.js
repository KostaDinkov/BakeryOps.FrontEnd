export async function getOrders(){
    try{
        let data = await (await fetch("http://localhost:5257/api/orders")).json();
        return data;

    }
    catch(error){
        console.log ("API error: getOrders", error)
    }
    
}
export async function getOrder(id){
    try{
        let response = await fetch(`http://localhost:5257/api/orders/${id}`)
        if(response.status===404){
            return null
        }

        return await response.json();

    }
    catch(error){
        console.log ("API error: getOrders", error)
    }
    
}