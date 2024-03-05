import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";

export const FetchWishlistedProducts = atomFamily({
    key:"FetchWishlistedProductsAtom",
    default: selectorFamily({
        key:"FetchWishlistedProductsSelector",
        get:(id)=>async()=>{
            const res = await axios.get(`http://localhost:3000/api/v1/users/wishlist/:${id}`);
            return res.data.products
        }
    })
})