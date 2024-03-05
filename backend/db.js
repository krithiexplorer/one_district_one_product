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
  
})

const productSchema = new mongoose.Schema({
    name : String,
    price: String,
    seller: String,
    image : String,
    description : String,
    offer: String,
    category: String,
    district: String
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

const Users = mongoose.model('Users',userSchema);
const Products = mongoose.model('Products',productSchema);
const Sellers = mongoose.model('Sellers',sellerSchema);

module.exports = {
    Users, 
    Products,
    Sellers
};