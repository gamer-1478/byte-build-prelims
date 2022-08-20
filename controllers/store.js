const Product = require("../schemas/productSchema")
const { nanoid } = require("nanoid")


// const store = (req, res)=>{
//     res.render("store")
// }

const store_admin = async (req, res)=>{
    const products = await Product.find({})
    console.log(products)
    res.render('store/store_admin', {products})
}
const store_admin_create = (req, res)=>{
    const {name, quantity, type, description} = req.body
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
                productId
            })
            newProduct.save().then(()=>{
                res.redirect('/store/admin')
            })
        }
    })
}

const store_admin_get_product = async (req, res)=>{
    const product = await Product.findOne({id: req.params.id})
    res.render("store/store_admin_product", {product})
}

const store_admin_post_product = async (req, res)=>{
    const {name, quantity, type, description} = req.body
    const products = await Product.findOne({})
    const product = await Product.findOneAndUpdate({id: req.params.id}, {
        name,
        quantity,
        type,
        description,
    })
    product.save().then(()=>{
        res.render('store/admin', {products})
    })
}

const store_admin_delete_product = async (req, res) => {
    const products = await Product.findOne({})
    await Product.deleteOne({id: req.params.id}).then(()=>{
        res.render('store/store_admin', {products})
    })
}

module.exports = {store_admin, store_admin_create, store_admin_get_product, store_admin_post_product, store_admin_delete_product}