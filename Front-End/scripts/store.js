// Buttons
const topCartBtn = document.getElementById('top-cart-btn');
const bottomCartBtn = document.getElementById('bottom-cart-btn');
const xButton = document.getElementById('close-btn');

// Button Event Listeners
{
    topCartBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

    bottomCartBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    })

    xButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    })
}

