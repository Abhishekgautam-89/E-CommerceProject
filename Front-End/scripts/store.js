
    if(document.ready=='loading'){
        document.addEventListener('DOMContentLoaded', ready);
    }
    else{
        ready();
    }
    
    document.addEventListener('DomContentLoaded', ready)



    const shopSectionDiv = document.getElementById('shop-section');
    const notify = document.getElementById("notification");
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const container = document.getElementById('Album-container');
    
        

   // to get products from back-end

    document.addEventListener('DOMContentLoaded',showOnScreen)     

function ready(){
    const buyButtons = document.getElementsByClassName('shop-btn')
    
    // console.log(buyButtons.length)
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
             showNotification();
        })
    }
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
        
        cartItems.appendChild(cartRow);
    }

    
    
    
    async function showOnScreen (){
        
        try{
            const jsonData =  await axios.get('http://localhost:3000/products')
            // console.log(jsonData);
            const data=jsonData.data.prods
            
                        
            for (let i=0; i<data.length; i++){
                        let productContent = `
                        <div>
                            <h3 class="item-title">${data[i].title}</h3>
                            <div class="img-cont">
                                 <img class="product-imgs" src="${data[i].imageUrl}" alt="${data[i].title}">
                            </div>
                            <div class="product-details">
                                <span class="price">$${data[i].price}</span>
                                <button class="shop-btn" onClick="addToCart(${data[i].id})" type='button'>ADD TO CART</button>
                            </div>
                        </div>                        
            `         
            container.innerHTML+=productContent;      
            }             
        }
        catch{(err)=>{
             console.log(err);
             productContent= "Something Went Wrong";
             container.innerHTML=productContent;                   
            }
        }

    }
    function addToCart(productId){
        console.log(productId)
            axios.post('http://localhost:3000/cart',{productId: productId})
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err)
            })       
    }
    

    // to show notification
    function showNotification(){
        const notification = document.createElement('div');
          notification.classList.add('toast');
          notification.innerHTML="Products has been successfully added to the cart."
          notify.appendChild(notification);
          setTimeout(()=>{
              notification.remove()
        },3000)
    }