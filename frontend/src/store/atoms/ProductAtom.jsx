import { atom, selector } from "recoil";
import axios from "axios"

export const ProductsAtom = atom({
    key:"ProductsAtom",
    default:selector({
        key:"ProductFetch",
        get: async() => {
            var res = await axios.get("http://localhost:3000/api/v1/users/products");
            return res.data.products;
        }
    })
})

