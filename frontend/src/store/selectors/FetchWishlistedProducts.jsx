import axios from "axios";
import { atom, selector } from "recoil";

export const FetchWishlistedProducts = atom({
    key:"FetchWishlistedProductsAtom",
    default: selector({
        key:"FetchWishlistedProductsSelector",
        get:async()=>{
            const res = await axios.get("http://localhost:3000/api/v1/users/wishlist");
            return res.data.products
        }
    })
})