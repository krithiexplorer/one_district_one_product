import axios from "axios";
import { atom, selector } from "recoil";

export const FetchCartProducts = atom({
    key:"FetchCartProductsAtom",
    default: selector({
        key:"FetchCartProductsSelector",
        get:async()=>{
            const res = await axios.get("http://localhost:3000/api/v1/users/viewcart",{
                headers:{
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            return res.data.products
        }
    })
})