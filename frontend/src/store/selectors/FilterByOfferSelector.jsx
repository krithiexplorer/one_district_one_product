import { selector } from "recoil";
import { ProductsAtom } from "../atoms/ProductAtom";

export const FilterByOfferSelector = selector({
    key:"FilterByOfferSelector",
    get:({get})=>{
        const products = get(ProductsAtom);
        return products.filter((product) => product.offer === "true");
    }
})