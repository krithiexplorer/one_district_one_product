import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

export const FetchCartProducts = atomFamily({
    key:"FetchCartProductsAtom",
    default: selectorFamily({
        key:"FetchCartProductsSelector",
        get:(id)=>async()=>{
            const res = await axios.get(`http://localhost:3000/api/v1/users/cart/:${id}`);
            return res.data.products
        }
    })
})