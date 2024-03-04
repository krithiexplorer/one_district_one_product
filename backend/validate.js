const zod = require('zod');

const userSignupObj = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6)
})

const sellerSignupObj = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(6),
    registeredId:zod.string(),
    district:zod.string()
})


const signinobj = zod.object({
    username:zod.string().email(),
    password:zod.string().min(6)
})


module.exports = {
    userSignupObj,
    sellerSignupObj,
    signinobj
}