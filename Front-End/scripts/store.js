const buyButtons = document.getElementsByClassName('shop-btn');
const notify = document.getElementById("notification");


// console.log(buyButtons)
    for (var i= 0; i<buyButtons.length; i++){
        const buyButton = buyButtons[i];
        buyButton.addEventListener("click", (e)=>{
            const addItem = e.target;
            const itemDetails = addItem.parentElement.parentElement;
            const title = itemDetails.getElementsByClassName('item-title')[0].innerText;
            const price = itemDetails.getElementsByClassName('price')[0].innerText;
            const imgSrc = itemDetails.getElementsByClassName('product-imgs')[0].src;
            addItemToCart(title, price, imgSrc);
            // to show notification
            const notification = document.createElement('div');
            notification.classList.add('toast');
            notification.innerHTML="Products has been successfully added to the cart."
            notify.appendChild(notification);
            setTimeout(()=>{
                notification.remove()
            },3000)
        })
    }

    function addItemToCart(title, price, imgSrc){
        const cartRow = document.createElement('div')
        cartRow.classList.add("cart-row");
        const cartContent = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-item-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input type="number" class="cart-quantity-input" value="1">
        <button class="btn btn-danger" type="button">Remove</button>
        </div>
        `
        cartRow.innerHTML=cartContent
        const cartItems = document.getElementsByClassName('cart-items')[0];
        cartItems.appendChild(cartRow);
    }

    // to get products from back-end

    window.addEventListener('DOMContentLoaded',showOnScreen)

    
    async function showOnScreen (){
        const product = document.createElement('div');
        try{
            const jsonData =  await axios.get('http://localhost:3000/products')
            // console.log(jsonData);
            const data=jsonData.data.products
                        
            for (let i=0; i<data.length; i++){
                        let productContent = `
                        <h3 class="item-title">${data[i].title}</h3>
                        <div class="img-cont">
                            <img class="product-imgs" src="${data[i].imageUrl}" alt="${data[i].title}">
                        </div>
                        <div class="product-details">
                            <span class="price">${data[i].price}</span>
                            <button class="shop-btn" type='button'>ADD TO CART</button>
                        </div>
            `
            product.innerHTML+=productContent;
            const container = document.getElementById('Album-container');
            container.appendChild(product)
            }
            
            
            
        }
        catch{(err)=>{
            console.log(err);
            productContent= "Something Went Wrong";
            product.innerHTML=productContent;
            container.appendChild(product);        
        }
        }
    }