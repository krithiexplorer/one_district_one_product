const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://learning:GNO0z745ZWvgVARG@cluster0.stznz.mongodb.net/one_district_one_product");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    },
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    } ,
    lastName: {
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    address:{
        type:String,
        maxlength:50
    },
    wishlistedProducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }],
    cartProducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }]
})

const productSchema = new mongoose.Schema({
    name : String,
    price: String,
    seller: String,
    image : {
        data:Buffer,
        contentType:String
    },
    description : String,
    offer: String,
    category: String,
    district: String,
    quantity: Number
})

const sellerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    },
    firstName:{
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    } ,
    lastName: {
        type:String,
        required:true,
        lowercase:true,
        uppercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    registeredId:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    }
})

const ordersSchema = new mongoose.Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    customerId: String,
    paymentIntentId: String,
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, { timestamps: true });

const Users = mongoose.model('Users',userSchema);
const Products = mongoose.model('Products',productSchema);
const Sellers = mongoose.model('Sellers',sellerSchema);
const Orders = mongoose.model('Orders',ordersSchema);

module.exports = {
    Users, 
    Products,
    Sellers,
    Orders
};