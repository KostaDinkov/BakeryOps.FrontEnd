import {useEffect,useState} from 'react';
import * as clientsService from '../../API/clientsService';

export default function useClientDiscount () {
    const [discount,setDiscount] = useState(0);

    useEffect(() => {
        (async ()=>{
            const client = await clientsService.getClientAsync(1);
            setDiscount(client.discountPercent);
        })();

    },[])
    return discount;
}