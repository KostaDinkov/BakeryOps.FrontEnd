
const host = "http://localhost:5257"

const ApiEndpoints =  {
    get:{
        orders:()=>`${host}/api/orders`
    },
    put:{
        orders:(id)=>`${host}/api/orders/${id}`
    }
}

export default ApiEndpoints;