import { useParams } from "react-router-dom"
import RHFOrderForm from "../../../Components/RHFOrderForm/RHFOrderForm";
import { useClientsQuery, useOrderQuery, useProductsQuery } from "../../../API/Queries/queryHooks";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../../API/apiClient";
import { OrderDTO } from "../../../Types/types";


export default function CreateUpdateOrder () {
    const {id} = useParams();
    
    const productsQuery = useProductsQuery();
    const clientsQuery = useClientsQuery();
    const newOrderMutation = useMutation({mutationFn:(data:OrderDTO) => apiClient.POST("/api/Orders/CreateOrder",{body:data})});
    let orderQuery= null;
    if(id){
        orderQuery = useOrderQuery({id});
    }

    if(productsQuery.isLoading || clientsQuery.isLoading || (id && orderQuery?.isLoading)){
        return <p>Loading...</p>
    }



    const submitOrder = (data:OrderDTO) => {
        newOrderMutation.mutate(data);
    }


  return(
    <RHFOrderForm products={productsQuery.data} clients={clientsQuery.data} submitOrder={submitOrder}/>
  )
}
