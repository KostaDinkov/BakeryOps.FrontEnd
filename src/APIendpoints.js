
const host = "http://localhost:5257"

export default {
    get:{
        orders:()=>`${host}/api/orders`
    },
    put:{
        orders:(id)=>`${host}/api/orders/${id}`
    }
}