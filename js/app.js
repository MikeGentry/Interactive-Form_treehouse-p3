const nameField = document.querySelector('#name');
const emailLabel = document.querySelector('.email');
const emailField = document.querySelector('#mail');
const jobMenu = document.querySelector('select[name="user_title"]');
const otherTitle = document.querySelector('#other-title');
const designMenu = document.querySelector('select[name="user_design"]');
const colorDiv = document.querySelector('#colors-js-puns');
const colorMenu = document.querySelector('select[id="color"]');
const colors = colorMenu.children;
const shopList = document.querySelector('.activities');
const eachShop = shopList.children;
const activityError = document.querySelector('.selectError');
const paymentMenu = document.querySelector('select[id="payment"]');
const ccDiv = document.querySelector('.credit-card');
const ccNumField = document.querySelector('#cc-num');
const zipField = document.querySelector('#zip');
const cvvField = document.querySelector('#cvv');
const paypalDiv = document.querySelector('.paypal');
const bitcoinDiv = document.querySelector('.bitcoin');
const submit = document.querySelector('button');


//  Focus on name field when page loads
nameField.focus();

//  Hides text field unless "other" job role is selected
//  Displays text field if JavaScript is disabled
otherTitle.style.display = 'none';
jobMenu.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        otherTitle.style.display = '';
    } else {
       otherTitle.style.display = 'none'; 
    }
});

//  Hides t-shirt color menu until user picks a design
//  Color menu only displays members of a particular design that is selected
colorDiv.style.display = 'none';
designMenu.addEventListener('change', (event) => {
    colorDiv.style.display = '';
    if (event.target.value === 'js puns') {
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].className === 'puns') {
                colors[0].selected = true;
                colors[i].style.display = '';
            } else {
                colors[i].style.display = 'none';
            }
        }
    } else if (event.target.value === 'heart js') {
        for (let i = 0; i < colors.length; i++) {
            if (colors[i].className === 'heartJS') {
                colors[3].selected = true;
                colors[i].style.display = '';
            } else {
                colors[i].style.display = 'none';
            } 
        }
    } else {
        colorDiv.style.display = 'none';
    }
});

//  Arrays containing workshops occurring at the same time of day
const amClass = [];
const pmClass = [];
for (let i = 0; i < eachShop.length; i++) {
    if (eachShop[i].className === 'am') {
        amClass.push(eachShop[i].firstElementChild);
    } else if (eachShop[i].className === 'pm') {
        pmClass.push(eachShop[i].firstElementChild);
    }
}

//  Event listener to prevent user from scheduling conflicting workshops
shopList.addEventListener('change', () => {
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    if (amClass[0] === checkbox) {
        if (isChecked) {
            amClass[1].disabled = true;
        } else {
            amClass[1].disabled = false;
        }
    } else if (amClass[1] === checkbox) {
        if (isChecked) {
            amClass[0].disabled = true;
        } else {
            amClass[0].disabled = false;
        }
    }
    if (pmClass[0] === checkbox) {
        if (isChecked) {
            pmClass[1].disabled = true;
        } else {
            pmClass[1].disabled = false;
        }
    } else if (pmClass[1] === checkbox) {
        if (isChecked) {
            pmClass[0].disabled = true;
        } else {
            pmClass[0].disabled = false;
        }
    }
});

//  Function to total costs and display total line
const totalSpan = document.createElement('span');
function totalLine(mainCost, shopCost) {
    const totalDue = mainCost + shopCost;
    totalSpan.innerText = '';
    totalSpan.innerText = 'Total Due: $' + totalDue;
    shopList.appendChild(totalSpan);
}

//  Event listener to determine total cost of conference
let mainCost = 0;
let shopCost = 0;
shopList.addEventListener('change', () => {
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    for (let i = 2; i < eachShop.length; i++) {
        if (eachShop[1].firstElementChild === checkbox) {
            if (isChecked) {
                mainCost = 200;
            } else {
                mainCost = 0;
            }
        } else if (eachShop[i].firstElementChild === checkbox) {
            if (isChecked) {
                shopCost += 100;
            } else {
                shopCost -= 100;
            }
        }
    }
    totalLine(mainCost, shopCost);
});

//  Displays payment info based on payment option selected
defaultPayment();
paymentMenu.addEventListener('change', () => {
    const pay = event.target;
    if (pay.value === 'credit card') {
        ccDiv.style.display = '';
        paypalDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (pay.value === 'paypal') {
        paypalDiv.style.display = '';
        ccDiv.style.display = 'none';
        bitcoinDiv.style.display = 'none';
    } else if (pay.value === 'bitcoin') {
        bitcoinDiv.style.display = '';
        ccDiv.style.display = 'none';
        paypalDiv.style.display = 'none';
    }
});

//  Sets default payment option when page loads
function defaultPayment() {
    const choices = paymentMenu.children;
    choices[1].selected = true;
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
}

// ***************
// FORM VALIDATION
// ***************

//  When form is submitted, field values are checked
//  and error messages or indications are presented
submit.addEventListener('click', (e) => {
    const name = nameField.value;
    const email = emailField.value;
    const ccNum = ccNumField.value;
    const zip = zipField.value;
    const cvv = cvvField.value;
    if (name === '') {
        nameField.className = 'error';
        e.preventDefault();
    } else {
        nameField.className = '';
    }
    if (email === '') {
        emailField.className = 'error';
        e.preventDefault();
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        e.preventDefault();
        errorMessage(emailLabel, ' Invalid Email Format');
    } else {
        emailField.className = '';
        removeError(emailLabel);
    }
    if (mainCost + shopCost < 1) {
        e.preventDefault();
        errorMessage(activityError, 'Please select at least one activity');
    } else {
        removeError(activityError);
    }
    if (isNaN(ccNum) || ccNum.length < 13 || ccNum.length > 16) {
        e.preventDefault();
        ccNumField.className = 'error';
    } else {
        ccNumField.className = '';
    }
    if (isNaN(zip) || zip.length !== 5) {
        e.preventDefault();
        zipField.className = 'error';
    } else {
        zipField.className = '';
    }
    if (isNaN(cvv) || cvv.length !== 3) {
        e.preventDefault();
        cvvField.className = 'error';
    } else {
        cvvField.className = '';
    }
});

//  Functions to add and remove custom error messages
function errorMessage(location, message) {
    const msgSpan = document.createElement('span');
    if (location.firstElementChild) {
        location.firstElementChild.remove();
    }
    msgSpan.className = 'errorMsg';
    msgSpan.innerText = message;
    location.appendChild(msgSpan);
}

function removeError(location) {
    if (location.firstElementChild) {
        location.firstElementChild.remove();
    }
}
