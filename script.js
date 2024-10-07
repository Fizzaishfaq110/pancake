const form = document.querySelector('.form-container'); //form container selected - customer will select pancake type and toppings
const checkboxes = document.querySelectorAll('input[type="checkbox"]');//all checkboxes in whole form selected
const typeSelect = document.querySelector('#type'); // for dropdown menu of pancake type
const deliveryOptions = document.querySelectorAll('input[name="delivery"]'); // Delivery radio buttons
const totalPriceElement = document.querySelector('#totalPrice');// total price element inside price banner is selected here
const button = document.querySelector('button'); // check-order button

let total = 0;// variable to store total price which is set to zero
let orders = []; // array to store all orders
let selectedToppings = []; // array for storing selected toppings
let selectedExtras = []; // array for storing selected extras
let selectedDelivery = ''; // variable  made to store selected delivery option


// function made to calculate the total price of pancake type and toppings
const pancakePriceCalc = () => {
    const selectedTypeOption = typeSelect.selectedOptions[0]; // gets selected options from drop-down menu
    const basePrice = parseInt(selectedTypeOption.dataset.price) || 0; // gets the price of selected pancake's type which will be in number
    selectedPancakeType = selectedTypeOption.dataset.name; // gets the name of selected pancake's type 

    total = basePrice;

    // now the arrays for toppings, extras and delivery are reset.
    selectedToppings = [];
    selectedExtras = [];
    selectedDelivery = '';

    checkToppings(); // called the function- adds prices of toppings and extras
    checkDeliveryOptions(); // called the function- check delivery option

    totalPriceElement.textContent = `${total.toFixed(0)}€`; // this will update the total price displayed - € is also added here

    const priceBanner = document.querySelector('.price-banner'); // price banner selected for animation changes

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
    checkboxes.forEach(item => {  // for each loop
        if (item.checked) {
            const itemPrice = parseInt(item.value) || 0;
            total += itemPrice; // this will run - if checkbox was checked - it adds price of selected items to total

            if (item.dataset.category === 'toppings') {
                selectedToppings.push(item.dataset.name); // incase of topping- the name of topping is added to selectedToppings array
            } else if (item.dataset.category === 'extras') {
                selectedExtras.push(item.dataset.name); // incase of extras- the name of extras is added to selectedExtras array
            }
        }
    });
};


// this function will check selected delivery option
const checkDeliveryOptions = () => {
    selectedDelivery = [...deliveryOptions].find(option => option.checked)?.value || 'eat_in';  //find is used to find the selected delivery option 
    if (selectedDelivery === 'delivery') {
        total += 5; // total price increased by 5€ if delivery is selected
    }
};



//function will display order details 
const displayOrder = () => {
    const customerName = document.querySelector('#customerName').value || 'Guest'; // this gets name of customer from input field; if no name is provided then it uses Guest
    const orderType = document.querySelector('#order_type');
    const orderToppings = document.querySelector('#order_toppings');
    const orderExtras = document.querySelector('#order_extras');
    const orderName = document.querySelector('#order_name');
    const orderDelivery = document.querySelector('#order_delivery');
    const orderPrice = document.querySelector('#order_price');
    const displayOrder = document.querySelector('.order-summary') // this is the container for the order summary

    orderType.textContent = selectedPancakeType; // this will show pancake type
    orderToppings.textContent = selectedToppings.length ? selectedToppings.join(', ') : 'No Toppings'; // this show any toppings selected and no toppings if none are selected
    orderExtras.textContent = selectedExtras.length ? selectedExtras.join(', ') : 'No Extras'; // this show any extras selected and no extras if none are selected
    orderName.textContent = customerName; //displays name of customer
    orderDelivery.textContent = selectedDelivery.charAt(0).toUpperCase() + selectedDelivery.slice(1); //delivrey method displayed
    orderPrice.textContent = `${total.toFixed(2)}€`; // dislays total price
    displayOrder.style.display = 'block' // this will make the order summary display

    const order = {
        name: customerName,
        pancakeType: typeSelect.selectedOptions[0].text,
        toppings: selectedToppings,
        extras: selectedExtras,
        deliveryMethod: selectedDelivery,
        totalPrice: total.toFixed(2),
    }; // object called order created with full details

    orders.push(order); //order object added to order array
    console.log('Orders:', orders);
};

form.addEventListener('change', pancakePriceCalc); // event listner added to the whole form, so the total price function `pancakePriceCalc` changes when anything in form is changed

button.addEventListener('click', displayOrder); // when button is clicked the order is displayed- and for this eventlistener is added

pancakePriceCalc();// calls the function 
