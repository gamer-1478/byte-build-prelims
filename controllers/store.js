const Product = require("../schemas/productSchema")
const User = require("../schemas/userSchema")
const { nanoid } = require("nanoid")


const store = async (req, res)=>{
    const products = await Product.find({})
    res.render("store/store", {products})
}

const store_item_view = async (req, res)=>{
    const product = await Product.findOne({productId: req.params.id})
    console.log(product.name)
    res.render("store/store_item", {product})
}

const store_item_buy = async (req, res)=>{
    const product = await Product.findOne({productId: req.params.id})
    const user = await User.findOne({userId: req.user.userId})
    const {qty} = req.body
    if(qty*product.price > user.creds){
        res.send("Can't afford")
    }
}

const store_admin = async (req, res)=>{
    const products = await Product.find({})
    res.render('store/store_admin', {products})
}
const store_admin_create = (req, res)=>{
    const {name, quantity, type, description, price} = req.body
    Product.findOne({name:name}).then(product=>{
        if(product){
            res.send("Product already exists with same name.")
        }else{
            const productId = nanoid()
            const newProduct = new Product({
                name,
                quantity,
                type,
                description,
                productId,
                price
            })
            newProduct.save().then(()=>{
                res.redirect('/store/admin')
            })
        }
    })
}

const store_admin_get_product = async (req, res)=>{
    const product = await Product.findOne({productId: req.params.id})
    res.render("store/store_admin_product", {product})
}

const store_admin_post_product = async (req, res)=>{
    const {name, quantity, type, description, price} = req.body
    const products = await Product.findOne({})
    const product = await Product.findOneAndUpdate({productId: req.params.id}, {
        name,
        quantity,
        type,
        description,
        price
    })
    product.save().then(()=>{
        res.render('store/admin', {products})
    })
}

const store_admin_delete_product = async (req, res) => {
    const products = await Product.findOne({})
    await Product.deleteOne({productId: req.params.id}).then(()=>{
        res.render('store/store_admin', {products})
    })
}

module.exports = {
    store,
    store_admin, 
    store_admin_create, 
    store_admin_get_product, 
    store_admin_post_product, 
    store_admin_delete_product,
    store_item_view,
    store_item_buy
}