import { atom } from "recoil"

export const LoginAtom = atom({
    key:"LoginAtom",
    default: localStorage.getItem("token") !== null
})

export const SellerAtom = atom({
    key:"SellerAtom",
    default: localStorage.getItem("seller") === "true" 
})
