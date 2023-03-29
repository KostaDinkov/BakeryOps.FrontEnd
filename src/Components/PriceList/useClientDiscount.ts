import {useEffect,useState} from 'react';
import ClientsService from '../../API/clientsService';

export default function useClientDiscount () {
    const [discount,setDiscount] = useState(0);

    useEffect(() => {
        (async ()=>{
            const client = await ClientsService.GetClientAsync(1);
            setDiscount(client.discountPercent);
        })();

    },[])
    return discount;
}