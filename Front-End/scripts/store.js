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