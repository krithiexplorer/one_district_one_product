import { atom } from "recoil"

export const ProductsAtom = atom({
    key:"ProductsAtom",
    default:[]
})

export const ProductAtom = atom({
    key:"ProductAtom",
    default:{
        name:"",
        price:0,
        quantity:0,
        district:"",
        dealer:"",
        offer:false,
        description:"",
        image:""
    }
})