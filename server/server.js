const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const formidable = require('express-formidable')
const cloudinary = require('cloudinary')
const { v4: uuidv4 } = require('uuid');
const async = require('async')
require('dotenv').config({path: path.resolve(__dirname+'/.env')})
const app = express()
// Model
const {User} = require('./models/userModel')
const {Brand} = require('./models/brandModel')
const {Wood} = require('./models/woodModel')
const {Product} = require('./models/productModel')
const {Payment} = require('./models/paymentModel')
const {Site} = require('./models/siteMode')
//Middleware
const  {auth} = require ('./middleware/auth')
const  {admin} = require ('./middleware/admin')

const port = process.env.PORT || 3002

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true })

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// ===========================================
//                  USERS
// ===========================================

app.post('/api/users/register', (req, res, next)=>{
    const user = new User(req.body)
    user.save((err, doc)=>{
        if(err){
            return res.json({success: false, err})
        }
        res.status(200).json({success: true, userData: doc})
    })
})

app.post('/api/users/login', (req, res, next)=>{
    User.findOne({'email': req.body.email}, (err, user)=>{
        if(!user) return res.json({loginSuccess: false, message: 'Auth Failed, Email Not Found'})
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({loginSuccess: false, message: 'Wrong Password'})
            user.generateToken((err, user)=>{
                if(err) return res.status(400).send(err)
                res.cookie('w_auth', user.token).status(200).json({loginSucess: true})
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res, next)=>{
    res.status(200).json({isAdmin: req.user.role === 0 ? false : true, isAuth: true, email: req.user.email, name: req.user.name, lastname: req.user.lastname, cart: req.user.cart, history: req.user.history})
})

app.get('/api/users/logout', auth, (req, res, next)=>{
    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

app.post('/api/users/uploadImage', auth, admin, formidable(), (req, res, next)=>{
    cloudinary.uploader.upload(req.files.file.path, (result)=>{
        res.status(200).send({public_id: result.public_id, url: result.url})
    }, {
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

app.get('/api/users/removeImage', auth, admin, formidable(), (req, res, next)=>{
    let id = req.query.id
    console.log(id)
    cloudinary.uploader.destroy(id, (err, result)=>{
        if(err) res.json({success: false, err})
        res.status(200).send("OK")
    })
})

app.post('/api/users/addToCart', auth, (req, res, next)=>{
    User.findOne({_id: req.user._id}, (err, doc)=>{
        let dupliacate = false
        doc.cart.forEach(item=>{
            if(item.id == req.query.id){
                dupliacate = true
            }
        })
        if(dupliacate){
            User.findOneAndUpdate({_id: req.user._id, 'cart.id': mongoose.Types.ObjectId(req.query.id)}, 
                {$inc: {'cart.$.quantity': 1}},
                {new: true},
                (err, doc)=>{
                    if(err) return res.json({success: false, err})
                    res.status(200).json(doc.cart)
                }
            )
        }
        else{
            User.findOneAndUpdate({_id: req.user._id}, {$push: {cart: {
                id: mongoose.Types.ObjectId(req.query.id),
                quantity: 1,
                date: Date.now()
            }}},
            {new: true},
            (err, doc)=>{
                if(err) return res.json({success: false, err})
                res.status(200).json(doc.cart)
            }
            )
        }
    })
})

app.get('/api/users/removeFromCart', auth, (req, res, next)=>{
    User.findOneAndUpdate({_id: req.user._id}, {$pull: {cart: {
        id: mongoose.Types.ObjectId(req.query.id)
    }}},
    {new: true},
    (err, doc)=>{
        let cart = doc.cart
        let array = cart.map(item=>{
            return mongoose.Types.ObjectId(item.id)
        })
        Product.find({_id: {$in: array}}).populate('brand').populate('wood').exec((err, cartDetail)=>{
            return res.status(200).json({cartDetail, cart})
        })
    }
    )
})

app.post('/api/users/successBuy', auth, (req, res, next)=>{
    let history = []
    let transactionData = {}
    let randomId = uuidv4()
    req.body.cartDetail.forEach(item=>{
        history.push({
            dateOfPurchase: Date.now(),
            name: item.name,
            brand: item.brand.name,
            id: item._id,
            price: item.price,
            quantity: item.quantity,
            paymentId: randomId
        })
    })
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = {
        paymentId: randomId,
        payment: true
    }
    transactionData.product = history
    User.findOneAndUpdate({_id: req.user._id}, {$push: {history: history}, $set: {cart: []}},{new: true},(err, user)=>{
        if(err) return res.json({success: false, err})
        const payment = new Payment(transactionData)
        payment.save((err, doc)=>{
            if(err) return res.json({success: false, err})
            let products = []
            doc.product.forEach(item=>{
                products.push({id: item.id, quantity: item.quantity})
            })
            async.eachSeries(products, (item, callback)=>{
                Product.update({_id: item.id}, {$inc: {sold: item.quantity}}, {new: false}, callback)
            }, (err)=>{
                if (err) return res.json({success: false, err})
                return res.status(200).json({success: true, cart: user.cart, cartDetail: []})
            })
        })
    })
})

app.post('/api/users/updateProfile', auth, (req, res, next)=>{
    User.findOneAndUpdate({_id: req.user._id}, {$set: req.body}, {new: true}, (err, doc)=>{
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true})
    })
})

// ===========================================
//                  SITE
// ===========================================

app.get('/api/site/site_data', (req, res, next)=>{
    Site.find({}, (err, site)=>{
        if (err) return res.status(400).send(err)
        return res.status(200).send(site[0].siteInfo)
    })
})

app.post('/api/site/site_data', auth, admin, (req, res, next)=>{
    Site.findOneAndUpdate({name: "Site"}, {$set: {siteInfo: req.body}}, {new: true}, (err, doc)=>{
        if (err) return res.status(400).json({sucess: false, err})
        return res.status(200).send({success: true, siteInfo: doc.siteInfo})
    })
})

// ===========================================
//                  BRANDS
// ===========================================

app.post('/api/product/brand', auth, admin, (req, res, next)=>{
    const brand = new Brand(req.body)
    brand.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true, brand: doc})
    })
})

app.get('/api/product/getBrands', (req, res, next)=>{
    Brand.find({}, (err, brands)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).send(brands)
    })
})

// ===========================================
//                  WOODS
// ===========================================

app.post('/api/product/wood', auth, admin, (req, res, next)=>{
    const wood = new Wood(req.body)
    wood.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        res.status(200).json({success: true, wood: doc})
    })
})

app.get('/api/product/getWoods', (req, res, next)=>{
    Wood.find({}, (err, woods)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).send(woods)
    })
})

// ===========================================
//                  PRODUCTS
// ===========================================

app.post('/api/product/article', auth, admin, (req, res, next)=>{
    const product = new Product(req.body)
    product.save((err, doc)=>{
        if(err) return res.json({success: false, err})
        return res.json({success: true, article: doc})
    })
})

app.get('/api/product/get_articles_by_id', (req, res, next)=>{
    let type = req.query.type
    let items = req.query.id
    if(type === 'array'){
        let ids = req.query.id.split(',')
        items = []
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }
    Product.find({_id: {$in: items}}).populate('brand').populate('wood').exec((err, docs)=>{
        return res.status(200).json(docs)
    })
})

app.get('/api/product/get_article_by_sold', (req, res, next)=>{
    let order = req.query.order ? req.query.order: 'asc'
    let sort = req.query.sort ? req.query.sort: '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    Product.find().populate('brand').populate('wood').sort([[sort, order]]).limit(limit).exec((err, articles)=>{
        if(err) return res.status(400).send(err)
        res.send(articles)
    })
})

app.get('/api/product/get_article_by_sold', (req, res, next)=>{
    let order = req.query.order ? req.query.order: 'asc'
    let sort = req.query.sort ? req.query.sort: '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 100
    Product.find().populate('brand').populate('wood').sort([[sort, order]]).limit(limit).exec((err, articles)=>{
        if(err) return res.status(400).send(err)
        res.send(articles)
    })
})

app.post('/api/product/shop', (req, res, next)=>{
    let order = req.body.order ? req.body.order : 'desc'
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id'
    let limit = req.body.limit ? parseInt(req.body.limit): 100
    let skip = parseInt(req.body.skip)
    let findArgs = {}
    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }
            else{
                findArgs[key] = req.body.filters[key]
            }
        }
        else{

        }
    }
    findArgs['publish'] = true
    Product.find(findArgs).populate('brand').populate('wood').sort([[sortBy, order]]).limit(limit).skip(skip).exec((err, article)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({size: article.length, articles: article})
    })
})



app.listen(port, ()=>{
    console.log(`Server Running at ${port}`)
})
