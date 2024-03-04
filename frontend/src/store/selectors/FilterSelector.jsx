import { selector } from "recoil";
import { FilterAtom } from "../atoms/FilterAtom";
import { ProductsAtom } from "../atoms/ProductAtom";

export const FilterSelector = selector({
    key:"FilterSelector",
    get:({get})=>{
        const filter = get(FilterAtom);
        const products = get(ProductsAtom);
        return products.filter((product)=>{
            const productName = product.name ? product.name.split(" ") : [];
            const productDistrict = product.district ? product.district.split(" ") : [];
            const productDealer = product.dealer ? product.dealer.split(" ") : [];
            return productName.includes(filter) || productDistrict.includes(filter) || productDealer.includes(filter);
        })
    }
})