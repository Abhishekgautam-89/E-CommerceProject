// Buttons
const topCartBtn = document.getElementById('top-cart-btn');
const bottomCartBtn = document.getElementById('bottom-cart-btn');
const xButton = document.getElementById('close-btn');
const cartContainer = document.getElementById('cart-container')

// Button Event Listeners

    topCartBtn.addEventListener('click', () => {       
        cartContainer.classList.toggle('active')        
    })


    bottomCartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('active')       
    })

    xButton.addEventListener('click', () => {
        cartContainer.classList.toggle('active');       
    })



