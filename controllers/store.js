const Product = require("../schemas/productSchema")
const User = require("../schemas/userSchema")
const { nanoid } = require("nanoid")


//main page
const store = async (req, res) => {
    var products = await Product.find({})
    products = JSON.parse(JSON.stringify(products))

    res.render("store/store", { user: req.user, products: await NewtestArray(products) })
}

//each item view
const store_item_view = async (req, res) => {
    const product = await Product.findOne({ productId: req.params.id })
    res.render("store/store_item", { user: req.user, product })
}

// cart mechanism [BROKEN TO FIX!]
const store_item_buy = async (req, res) => {
    const product = await Product.findOne({ productId: req.params.id })
    const user = await User.findOne({ _id: req.user._id })
    if (product.quantity > 0) {
        if (user.cart.length > 0) {
            for (var i = 0; i < user.cart.length; i++) {
                if (user.cart[i].prodid === product.productId) {
                    user.cart[i].quan = parseInt(user.cart[i].quan)+parseInt(req.body.qty);
                    user.save()
                    return res.send({ success: true, msg: "Product added to cart" })
                }
                if (i === user.cart.length - 1 && user.cart[i].productId !== product.productId) {
                    user.cart.push({ prodid: product.productId, quan: req.body.qty });
                    await user.save()
                    return res.send({ success: true, msg: "Product added to cart" })
                }
            }
        } else {
            user.cart.push({ prodid: product.productId, quan: req.body.qty });
            await user.save()
            res.send({ success: true, msg: "Product added to cart" })
        }
    }
    else {
        res.send({ msg: "Product out of stock" })
    }
}

// admin page
const store_admin = async (req, res) => {
    const products = await Product.find({})
    res.render('store/store_admin', { user: req.user, products: await NewtestArray(products) })
}

// admin make product
const store_admin_create = (req, res) => {
    const { name, quantity, type, description, price, image } = req.body
    var errors = [];
    if (!name || !quantity || !type || !description || !price || !image) {
        errors.push({ msg: "Please fill in all fields" })
    }
    Product.findOne({ name: name }).then(product => {
        if (product) {
            errors.push({ msg: "Product already exists" })

        }
    })
    if (errors.length > 0) {
        console.log(errors)
        return res.send(errors)
    }
    const productId = nanoid()
    const newProduct = new Product({
        name,
        quantity,
        type,
        description,
        productId,
        price,
        image
    })
    newProduct.save().then(() => {
        res.send({ sucess: true, msg: "Product created, Redirecting in 1 min!", productId })
    })
}

// edit product page
const store_admin_get_product = async (req, res) => {
    const product = await Product.findOne({ productId: req.params.id })
    res.render("store/store_admin_product", { user: req.user, product })
}

// edit product post
const store_admin_post_product = async (req, res) => {
    const { name, quantity, type, description, price, image } = req.body
    var errors = [];
    if (!name || !quantity || !type || !description || !price || !image) {
        errors.push({ msg: "Please fill in all fields" })
    }
    Product.findOne({ productId: req.params.id }).then(product => {
        if (!product) {
            errors.push({ msg: "Product Doesn't exist" })
        }
    })
    if (errors.length > 0) {
        console.log(errors)
        return res.send(errors)
    }
    const product = await Product.findOneAndUpdate({ productId: req.params.id }, {
        name,
        quantity,
        type,
        description,
        price,
        image
    })
    product.save().then(async () => {
        res.redirect('/store/admin')
    })
}

// delete product post
const store_admin_delete_product = async (req, res) => {
    const products = await Product.findOne({})
    await Product.deleteOne({ productId: req.params.id }).then(() => {
        res.redirect('/store/admin');
    })
}

// helper function to make array of products
async function NewtestArray(products) {
    var testArray = []
    var prodLen = products.length
    var i = 0

    var NewtestArray = await new Promise((resolve, reject) => {
        while (i < prodLen) {
            i += 2
            testArray.push(products.splice(0, 3))

            if (i >= prodLen - 1) {
                resolve(testArray)
            }
            else {
                resolve(testArray)
            }
        }
    }).then(res => { return res })
    return NewtestArray
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