const nameField = document.querySelector('#name');
const jobMenu = document.querySelector('select[name="user_title"]');
const otherTitle = document.querySelector('#other-title');
const designMenu = document.querySelector('select[name="user_design"]');
const colorDiv = document.querySelector('#colors-js-puns');
const colorMenu = document.querySelector('select[id="color"]');
const colors = colorMenu.children;
const shopList = document.querySelector('.activities');
const eachShop = shopList.children;

//  TODO: Add Comments

nameField.focus();

otherTitle.style.display = 'none';
jobMenu.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        otherTitle.style.display = '';
    } else {
       otherTitle.style.display = 'none'; 
    }
});

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

const amClass = [];
const pmClass = [];
for (let i = 0; i < eachShop.length; i++) {
    if (eachShop[i].className === 'am') {
        amClass.push(eachShop[i].firstElementChild);
    } else if (eachShop[i].className === 'pm') {
        pmClass.push(eachShop[i].firstElementChild);
    }
}

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