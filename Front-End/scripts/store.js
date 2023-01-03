
    // if(document.ready=='loading'){
    //     document.addEventListener('DOMContentLoaded', ready);
    // }
    // else{
    //     ready();
    // }
    
    // document.addEventListener('DomContentLoaded', ready)
    
    // async function ready(){
    //     const buyButtons = document.getElementsByClassName('shop-btn')
        
    //     // console.log(buyButtons.length)
    //     for (var i= 0; i<buyButtons.length; i++){
    //         const buyButton = buyButtons[i];
            
    //         buyButton.addEventListener("click", (e)=>{
                
    //              const addItem = e.target;
    //              const itemDetails = addItem.parentElement.parentElement;
    //              const title = itemDetails.getElementsByClassName('item-title')[0].innerText;
    //              const price = itemDetails.getElementsByClassName('price')[0].innerText;
    //              const imgSrc = itemDetails.getElementsByClassName('product-imgs')[0].src;
    //              addItemToCart(title, price, imgSrc);
    //              // to show notification
    //              showNotification();
    //         })
    //     }    
    // } 
    



    const shopSectionDiv = document.getElementById('shop-section');
    const notify = document.getElementById("notification");
    const cartItems = document.getElementsByClassName('cart-items')[0];
    const container = document.getElementById('Album-container');
    const cartBtn = document.querySelectorAll('.cart')
    const closeBtn = document.getElementById('close-btn');
    const pagePagination = document.getElementById('page-pagination');
    const cartPagination = document.getElementById('cart-pagination');
        

   // to get products from back-end

    window.addEventListener('DOMContentLoaded',()=>{
        const page = 1;
        getProducts(page)
    }
    );     

    window.addEventListener('DOMContentLoaded',()=>{
        const page = 1;
        getCart(page)
    }
    );     

    // for (var i=0; i<cartBtn.length; i++){
    //     cartBtn[i].addEventListener('click', getCart)
    // }

    closeBtn.addEventListener('click', ()=>{        
        cartItems.innerHTML='';
    })

    function addItemToCart(title, price, imgSrc, quantity){
        const cartRow = document.createElement('div')
        
        // cartRow.innerHTML="";
        cartRow.classList.add("cart-row");
        const cartContent = `
        <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-item-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input type="number" class="cart-quantity-input" value="${quantity}">
        <button class="btn btn-danger" type="button">Remove</button>
        </div>
        `
        cartRow.innerHTML=cartContent
        
        cartItems.appendChild(cartRow);        
    }

    
    
    
    async function getProducts(page){        
        try{
            const jsonData =  await axios.get(`http://localhost:3000/products/?page=${page}`)    
            
            const data=jsonData.data.prods.products  
            // console.log(jsonData.data.prods);                      
            listProducts(data);
            pagePaging(jsonData.data.prods)
        }
        catch{(err)=>{
             console.log(err);
             productContent= "Something Went Wrong";
             container.innerHTML=productContent;                   
            }
        }

    }
     function addToCart(productId, title){
        // console.log(productId)
            axios.post('http://localhost:3000/cart',{productId: productId})
            .then(res=>{
                // console.log(res); 
                showNotification(title);              
            })
            .catch(err=>{
                console.log(err)
            })       
            
    }
    

    // to show notification
    function showNotification(title){
        const notification = document.createElement('div');
          notification.classList.add('toast');
          notification.innerHTML=`${title} has been successfully added to the cart.`
          notify.appendChild(notification);
          setTimeout(()=>{
              notification.remove()
        },3000)
    }

    function listProducts(data){
        container.innerHTML="";
        for (let i=0; i<data.length; i++){
            let productContent = `
            <div>
                <h3 class="item-title">${data[i].title}</h3>
                <div class="img-cont">
                     <img class="product-imgs" src="${data[i].imageUrl}" alt="${data[i].title}">
                </div>
                <div class="product-details">
                    <span class="price">$${data[i].price}</span>
                    <button class="shop-btn" onClick="addToCart('${data[i].id}', '${data[i].title}')" type='button'>ADD TO CART</button>
                </div>
            </div>                        
`         
            container.innerHTML+=productContent;      
        }
    }

    async function getCart(page){
        
        try {
            cartItems.innerHTML="";
            const cartData = await axios.get(`http://localhost:3000/cart/?page=${page}`)
            const cartItem=cartData.data.prods.products;
            // console.log(cartData.data.prods);
            for (var i=0; i<cartItem.length; i++){
                addItemToCart(cartItem[i].title,cartItem[i].price, cartItem[i].imageUrl, cartItem[i].cartItem.quantity)
                
            }
            cartPaging(cartData.data.prods)
        }
        catch{
    
        }
    }

    function pagePaging(data){
         pagePagination.innerHTML="";            
        //  console.log(data.currentPage);
        if(data.hasPreviousPage){
            const previousButton = document.createElement('button');
            previousButton.innerHTML=data.previousPage;
            previousButton.addEventListener('click',()=> getProducts(data.previousPage));
            pagePagination.appendChild(previousButton);
        }

        const currentButton = document.createElement('button');
        currentButton.innerHTML=`<h3>${data.currentPage}</h3>`;
        currentButton.addEventListener('click',()=>getProducts(data.currentPage));
        pagePagination.appendChild(currentButton);

        if(data.hasNextPage){
            const nextButton = document.createElement('button');
            nextButton.innerHTML=data.nextPage;
            nextButton.addEventListener('click',()=> getProducts(data.nextPage));
            pagePagination.appendChild(nextButton);
        }        
    } 

    function cartPaging(data){
       
            cartPagination.innerHTML="";                
            // console.log(data.currentPage);
        if(data.hasPreviousPage){
            const previousButton = document.createElement('button');
            previousButton.innerHTML=data.previousPage;
            previousButton.addEventListener('click',()=> getCart(data.previousPage));
            cartPagination.appendChild(previousButton);
        }

        const currentButton = document.createElement('button');
        currentButton.innerHTML=`<h3>${data.currentPage}</h3>`;
        currentButton.addEventListener('click',()=>getCart(data.currentPage));
        cartPagination.appendChild(currentButton);

        if(data.hasNextPage){
            const nextButton = document.createElement('button');
            nextButton.innerHTML=data.nextPage;
            nextButton.addEventListener('click',()=> getCart(data.nextPage));
            cartPagination.appendChild(nextButton);
        }        
    } 

    