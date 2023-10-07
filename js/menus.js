let activePopUp = {};
activePopUp.name = '';
activePopUp.obj = {};
activePopUp.validationRule = []; // validationRule = [[field1 ID, field1 Label, field1 pattern], ...]

let readers = [{}];

let activeUser = {};
activeUser.firstName = '';
activeUser.lastName = '';
activeUser.cardCode = 0;
activeUser.cardPurchased = false;
activeUser.password = '';
activeUser.bookList = [];
activeUser.cardStats = {visits: 0, bonuses: 0, books: 0};

const anyWhere = document.querySelector('body');

// Check if body element has a scroll bar
let anyWhereHasScrollBar = true;

const mainWrapper = document.getElementById('main-wrapper');
const profileIcon = document.getElementById('profile');
const powerLayer = document.getElementById('power-layer');

const loginIniPopUp = document.getElementById('login-ini-popup');
const loginIniBTN = document.getElementById('login-btn');
const registerIniBTN = document.getElementById('register-btn');

const loginPopUp = document.getElementById('login-popup');

const goRegister = document.getElementById('go-to-register');
const goLogin = document.getElementById('go-to-login');

const registerPopUp = document.getElementById('register-popup');

const profileMiniPopup = document.getElementById('profile-mini-popup');
const profileMiniPopupTitle = document.getElementById('profile-minipopup-title');

const signUpBTN = document.getElementById('sign-up-btn');
const logInBTN = document.getElementById('log-in-btn');
const checkLibCardBTN = document.getElementById('check-the-card-btn');
const visitProfileLibCardIntroBTN = document.getElementById('visit-your-profile-btn');

const myProfileBTN = document.getElementById('my-profile-btn');
const myProfilePopUp = document.getElementById('my-profile-popup');
const myProfileVisitNumber = document.getElementById('my-profile-visits-value');
const myProfileBonusNumber = document.getElementById('my-profile-bonuses-value');
const myProfileBookNumber = document.getElementById('my-profile-books-value');

const buyCardPopUp = document.getElementById('buy-a-card-popup');

const creditCardData = document.getElementById('carddata');

const creditCardSubmitBTN = document.getElementById('credit-card-submit-btn');

const logOutBTN = document.getElementById('log-out-btn');


anyWhere.addEventListener('resize', () => {
    anyWhereHasScrollBar = div.scrollHeight < div.clientHeight; 
})

anyWhere.addEventListener('click', (event) => {
    if (activePopUp.name == '') return;

    if (activePopUp.name == 'burgerMenu') {
        menuShowHide();
    } else {
        // if clicked inside popup and not close-window-btn, skip it
        if (event.target == activePopUp.obj ||
             ((event.target.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement.parentElement == activePopUp.obj ||
                event.target.parentElement.parentElement.parentElement.parentElement == activePopUp.obj ||
                ((activePopUp.obj == myProfilePopUp && event.target != powerLayer) && event.target.parentElement.parentElement.parentElement.parentElement.parentElement == myProfilePopUp)
                ) &&
             !event.target.classList.contains('close-window-btn')) ||
             ( event.target == errorMessage || event.target.parentElement == errorMessage)
        ) {
            return;
        } else {
            powerLayer.classList.add('hidden-popup');
            if (activePopUp.name == 'buyCardPopUp') {
                buyCardPopUp.style.display = 'none';
                clearFields();
            }
            if (activePopUp.name == 'myProfilePopUp') myProfilePopUp.style.display = 'none';
            closeModalWindow(activePopUp.obj);
        }
    }        
})

function closeModalWindow(modalWindow) {
    powerLayer.classList.add('hidden-popup');
    modalWindow.classList.add('hidden-popup');
    anyWhere.style.overflow = "visible";
    anyWhere.style.paddingRight = "0px";
    activePopUp.name = '';
    activePopUp.obj = {};
}

function openModalWindow(modal, name) {
    // Compensate scrollbar disappearance when overflow hidden on
    let compensateScrollBarWidth = (window.innerWidth - document.documentElement.clientWidth) + 'px';

    modal.classList.remove('hidden-popup');
    // Hide overflow to prevent window scroll down
    anyWhere.style.overflow = "hidden";
    // Add padding to compensate scroll bar removing when overflow is hidden
    anyWhere.style.paddingRight = compensateScrollBarWidth;

    activePopUp.name = name;
    activePopUp.obj = modal;
}


// Burger menu START
const burgerButton = document.querySelector('.burger-button');
const navBurgerMenu = document.querySelector('.nav-ul');

navBurgerMenu.classList.add('nav-burger-menu-invisible');

burgerButton.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    menuShowHide();
})

navBurgerMenu.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    menuShowHide();
})

function menuShowHide() {
    if (burgerButton.classList.contains('cross-button')) {
        activePopUp.name = '';
        activePopUp.obj = {};
    } else {
        if (activePopUp.name != '') closeModalWindow(activePopUp.obj);
        activePopUp.obj = {};
        activePopUp.name = 'burgerMenu';
    }

    burgerButton.classList.toggle('burger-button');
    burgerButton.classList.toggle('cross-button');
    navBurgerMenu.classList.toggle('nav-burger-menu-visible');
    navBurgerMenu.classList.toggle('nav-burger-menu-invisible');

}
// Burger menu END

// Modal windows START
let userIsRegistered = false;


profileIcon.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
    if (activePopUp.name == 'burgerMenu') menuShowHide();
    if (activePopUp.name != '') {
        closeModalWindow(activePopUp.obj);
        return;
    }

    // Check if user logged in or registered
    if (activeUser.firstName == '') {  
        // Open Profile LogIn/Register popup
        openModalWindow(loginIniPopUp, 'loginIniPopUp');
        // Open Profile MyProfile/LogOut popup
    } else openModalWindow(profileMiniPopup, 'profileMiniPopup');
})

loginIniBTN.addEventListener('click', (e) => {goLoginFoo(e)}, true);
goLogin.addEventListener('click', (e) => {goLoginFoo(e)}, true);

registerIniBTN.addEventListener('click', (e) => {
    if (activeUser.firstName !== '') return;
    goRegisterFoo(e)}, true);

goRegister.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

signUpBTN.addEventListener('click', (e) => {goRegisterFoo(e)}, true);

logInBTN.addEventListener('click', (e) => {goLoginFoo(e)}, true);

logOutBTN.addEventListener('click', (e) => {loOutFoo(e)}, true);

myProfileBTN.addEventListener('click', (e) => {goMyProfileFoo(e)}, true);

visitProfileLibCardIntroBTN.addEventListener('click', (e) => {goMyProfileFoo(e)});


creditCardData.addEventListener('input', (event) => {
    event.stopImmediatePropagation();
    let creditCardNumber = document.getElementById('credit-card-number');
    let expCode = document.getElementById('exp-code');
    let expCodeExt = document.getElementById('exp-code-ext');
    let cvc = document.getElementById('cvc');
    let holderName = document.getElementById('holder-name');
    let postalCode = document.getElementById('postal');
    let city = document.getElementById('city');

    if (creditCardNumber.value !== '' &&
        expCode.value !== '' &&
        expCodeExt.value !== '' &&
        cvc.value !== '' &&
        holderName.value !== '' &&
        postalCode.value !== '' &&
        city.value !== '') {
            creditCardSubmitBTN.removeAttribute("disabled");
        } else {
            creditCardSubmitBTN.setAttribute("disabled", "disabled");
        }
})


function goRegisterFoo(event) {
    event.stopImmediatePropagation();
    // Check if Sign Up button in Library Card section is clicked
    if (event.target !== signUpBTN) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }
    clearFields();
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(registerPopUp, 'registerPopUp');
}

function goLoginFoo(event) {
    event.stopImmediatePropagation();
    // Check if Log In button in Library Card section is clicked
    if (event.target !== logInBTN && !event.target.classList.contains("favorite-button")) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }
    clearFields();
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(loginPopUp, 'loginPopUp');
}

function goBuyCard(event) {
    event.stopImmediatePropagation();
    
    document.documentElement.scrollTop = '0px';
    buyCardPopUp.style.display = 'flex';
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(buyCardPopUp, 'buyCardPopUp');
}




function goMyProfileFoo(event) {
    event.stopImmediatePropagation();

    if (event.target !== visitProfileLibCardIntroBTN) {
        closeModalWindow(activePopUp.obj);
    } else {
        document.documentElement.scrollTop = '0px';
    }

    const profileInitials = document.getElementById('id-box');
    profileInitials.textContent = activeUser.firstName[0] + activeUser.lastName[0];
    const profileName = document.getElementById('name-box');

    profileName.textContent = activeUser.firstName + ' ' + activeUser.lastName;
    if (activeUser.firstName.length + activeUser.lastName.length > 10) {
        profileName.style.height = 'auto';
        profileName.style.padding = '5px';
    }

    let profileBookList = document.getElementById('my-profile-ul');
    const bookList = document.getElementById('rented-books-list');

    profileBookList.innerHTML = activeUser.bookList.map((book) => {
        // fill the list of purchased books with activeUser data
        return `<li>${favouriteBookTitle[book]}</li>`}).join('\n');
    
    profileBookList.classList.add('add-overflow');        

    myProfileVisitNumber.textContent = activeUser.cardStats.visits;
    myProfileBonusNumber.textContent = activeUser.cardStats.bonuses;
    myProfileBookNumber.textContent = activeUser.cardStats.books;

    const cardCode = document.getElementById('card-number-code');
    
    cardCode.textContent = activeUser.cardCode;

    const cardCodeCopy = document.getElementById('card-number-copy');
    const copyToClipboard = (text) => navigator.clipboard.writeText(text);

    cardCodeCopy.onclick = copyToClipboard(activeUser.cardCode);

    myProfilePopUp.style.display = 'flex';
    powerLayer.classList.remove('hidden-popup');
    openModalWindow(myProfilePopUp, 'myProfilePopUp');
}

function clearFields() {
    let fieldArray = activePopUp.validationRule;
    for (let i = 0; i < fieldArray.length; i++ ) {
        document.getElementById(`${fieldArray[i][0]}`).value = null;
    }
}

const copyToClipboard = (text) => navigator.clipboard.writeText(text);
// Modal windows END

function loOutFoo(event) {
    event.stopImmediatePropagation();

    updateLocalStorageData();
    location.reload ();
    // activePopUp.obj = {};
}



