const Product = require("../models/product");
const Cart = require("../models/cart");
const cartList= require('../models/cart-item')

const itemsPerPage = 2;
exports.getProducts = (req, res, next) => {
  let pageNumber = req.query.page;
  let totalProducts;
  Product.count()
    .then(numberOfProducts=>{
      totalProducts = numberOfProducts;
      return Product.findAll({
        offset: (pageNumber-1)*itemsPerPage,
        limit:itemsPerPage 
      })
                            
    })     
    .then((products) => {
      // console.log(products);
      const productData={
        products: products,
        totalProducts: totalProducts,
        hasNextPage: (itemsPerPage*pageNumber)<totalProducts,
        hasPreviousPage: pageNumber>1,
        nextPage: parseInt(pageNumber) + 1,
        currentPage: parseInt(pageNumber),
        previousPage: parseInt(pageNumber)-1,
        lastPage: Math.ceil(totalProducts/itemsPerPage),
        firstPage:1
      }
      res.status(200).json({ prods: productData});
      // res.render('shop/product-list', {
      //   prods: products,
      //   pageTitle: 'All Products',
      //   path: '/products'
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  const pageNumber=req.query.page;
  let totalNumber;
  req.user.getCart()
  .then((cart) => {
    cartList.count()
      .then(numberOfProducts=>{
        totalNumber=numberOfProducts
        return cart.getProducts({
          offset: (pageNumber-1)*itemsPerPage,
          limit:itemsPerPage
        })
      })    
      .then((products) => {
        const dataOfProducts={
          products: products,
          totalNumber: totalNumber,

          hasNextPage: (itemsPerPage*pageNumber)<totalNumber,
          hasPreviousPage: pageNumber>1,

          nextPage:  parseInt(pageNumber)+1,
          currentPage: parseInt(pageNumber),
          previousPage: parseInt(pageNumber)-1,

          lastPage: Math.ceil(totalNumber/itemsPerPage)
        }
        res.status(201).json({prods : dataOfProducts });
      })
      .catch((err) => console.log(err));
  })
  .catch(err=>console.log(err))
};

exports.postCart = (req, res, next) => {  
  const prodId = req.body.productId;  
  let fetchedCart;
  let newQuantity=1;
  req.user
    .getCart()
      .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts({where: {id: prodId}})
      })
      .then(products=>{
        let product;
        if(products.length>0){
          product=products[0];
        }
        if (product) {
          const oldQuantity = product.cartItem.quantity;
          newQuantity = oldQuantity + 1;
          return product;
        }
        return Product.findByPk(prodId);
      })
      .then(product => {
        return fetchedCart.addProduct(product, {
          through: { quantity: newQuantity }
        });
      })
      .then(() => {
        res.status(200).json({success:true, message: "Product added successfully"})
      })
      .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
