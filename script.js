const form = document.querySelector('.form-container'); //form container selected - customer will select pancake type and toppings
const checkboxes = document.querySelectorAll('input[type="checkbox"]'); //all checkboxes in whole form selected
const typeSelect = document.querySelector('#type'); // for dropdown menu of pancake type
const totalPriceElement = document.querySelector('#totalPrice'); // total price element inside price banner is selected here


let total = 0; // total price set to zero

// function made to calculate the total price of pancake type and toppings
const pancakePriceCalc = () => {
    total = parseInt(typeSelect.value) || 0; // value from dropdown converted into number using parseInt

    checkToppings(); // called the function

    totalPriceElement.textContent = `${total.toFixed(0)}€`; // this will update the total price displayed - € is also added here

    const priceBanner = document.querySelector('.price-banner'); // price banner selected for animation changes

    //animation of price banner upon change in price
    priceBanner.animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' }, // this will increase the banner size slightly for animation effect
            { transform: 'scale(1)' },
        ],
        {
            duration: 100, // time duration of animation in ms
            iterations: 1, // number of times animation runs
        }
    );
};



//Function is made to change total price based on checkboxes from toppings and extras selection
const checkToppings = () => {
    for (const item of checkboxes) {
        if (item.checked) {
            const itemPrice = parseInt(item.value) || 0;
            total += itemPrice;
        }// this will run - if checkbox was checked - it adds price of selected items to total
    } // for of loop used 
};

form.addEventListener('change', pancakePriceCalc); // event listner added to the whole form, so the total price function `pancakePriceCalc` changes when anything in form is changed

pancakePriceCalc(); // calls the function 
