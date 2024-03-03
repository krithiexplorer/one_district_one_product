import { selector } from "recoil";
import { FilterAtom } from "../atoms/FilterAtom";
import { ProductsAtom } from "../atoms/ProductAtom";
import { FilterSelector } from '../store/selectors/FilterSelector'

export const FilterSelector = selector({
    key:"FilterSelector",
    get:({get})=>{
        const filter = get(FilterAtom);
        const products = get(ProductsAtom);
        return products.filter((product)=>{
            const productName = products.name.split(" ");
            const productDistrict = product.district.split(" ");
            const productDealer = product.dealer.split(" ");
            return productName.includes(filter) || productDistrict.includes(filter) || productDealer.includes(filter);
        })
    }
})