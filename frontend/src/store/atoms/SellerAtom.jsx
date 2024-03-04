import { atom } from "recoil";

export const SellerAtom = atom({
    key:"SellerAtom",
    default:{
        userName:"",
        firstName:"",
        lastName:"",
        password:"",
        registeredId:"",
        district:""
    }
})