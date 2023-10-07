
// About-slider START
let paginationBox = document.getElementById('carousel-pagination');
let activeBullet = 1;
let arrowLeft = document.getElementById('left-arrow');
let arrowRight = document.getElementById('right-arrow');
let arrowLeftDisabled = true;
let arrowRightDisabled = false;
const LEFT_ARROW = 0;
const RIGHT_ARROW = 1;


let aboutSliderPicSet = document.getElementById('carousel');
aboutSliderPicSet.style.left = '0px';

let aboutIMG = document.querySelectorAll('#carousel img')[1];

paginationBox.addEventListener('click', (e) => {

    if (e.target.dataset.bulindex == activeBullet) return;   
    scrollPictures(e.target.dataset.bulindex - activeBullet);
})

arrowLeft.addEventListener('click', () => {arrowClicked(LEFT_ARROW)});
arrowRight.addEventListener('click', () => {arrowClicked(RIGHT_ARROW)});

function scrollPictures (stepsNo) {
    let direction = stepsNo > 0 ? 1 : -1;

    for(i = 1; i <= Math.abs(stepsNo); i++) {
        let oldActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);

        oldActiveBullet.classList.toggle('active-bullet');
        oldActiveBullet.parentElement.style.cursor = "pointer"

        let imgWidth = aboutIMG.offsetWidth;

        aboutSliderPicSet.style.left = (parseInt(aboutSliderPicSet.style.left) - ((imgWidth + 25) * direction)) + "px";
        activeBullet += direction;

        let newActiveBullet = document.querySelector(`[data-bulindex="${activeBullet}"]`);

        newActiveBullet.classList.toggle('active-bullet');
        newActiveBullet.parentElement.style.cursor = "auto";
        if (activeBullet == 1) {
            arrowLeft.classList.add('arrow-disabled');
            arrowRight.classList.remove('arrow-disabled');
        } else if (activeBullet == 5) {
            arrowRight.classList.add('arrow-disabled');
            arrowLeft.classList.remove('arrow-disabled');   
        } else {
            arrowLeft.classList.remove('arrow-disabled');
            arrowRight.classList.remove('arrow-disabled');
        }
    }        
}

function arrowClicked(arrow) {
    if ((arrow == LEFT_ARROW && activeBullet == 1) || (arrow == RIGHT_ARROW && activeBullet == 5)) return;
    let stepsNo = arrow == LEFT_ARROW ? -1 : 1;
    scrollPictures(stepsNo);
}
// About-slider END

// Favourite season changer START
let favouriteRadios = document.getElementById('season-pick-radios');
let favouriteBooks = document.getElementById('favorites-items-wrapper');
let activeSeason = 'Winter';
let allSeasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
let seasonChangeInProgress = false;
let seasonChangeBreakID = 0;

let favourite1 = document.getElementById('item1');
let favourite2 = document.getElementById('item2');
let favourite3 = document.getElementById('item3');
let favourite4 = document.getElementById('item4');
let favourite5 = document.getElementById('item5');
let favourite6 = document.getElementById('item6');
let favourite7 = document.getElementById('item7');
let favourite8 = document.getElementById('item8');
let favourite9 = document.getElementById('item9');
let favourite10 = document.getElementById('item10');
let favourite11 = document.getElementById('item11');
let favourite12 = document.getElementById('item12');
let favourite13 = document.getElementById('item13');
let favourite14 = document.getElementById('item14');
let favourite15 = document.getElementById('item15');
let favourite16 = document.getElementById('item16');

let favouriteBookTitle = [
    "The Book Eaters, Sunyi Dean",
    "Dante: Poet of the Secular World, Erich Auerbach",
    "Cackle, Rachel Harrison",
    "The Last Queen, Clive Irving",
    "The Body, Stephen King",
    "Days of Distraction, Alexandra Chang",
    "Crude: A Memoir, Pablo Fajardo &amp; Sophie Tardy-Joubert",
    "The Octopus Museum: Poems, Brenda Shaughnessy",
    "Casual Conversation, Renia White",
    "Rickey: The Life and Legend, Howard Bryant",
    "Carry: A Memoir of Survival on Stolen Land, Toni Jenson",
    "Dominicana, Angie Cruz",
    "Let My People Go Surfing, Yvon Chouinard",
    "Shark Dialogues: A Novel, Kiana Davenport",
    "The Great Fire, Lou Ureneck",
    "Slug: And Other Stories, Megan Milks"
];

favouriteRadios.addEventListener('click', (e) => {
    if (e.target.textContent == activeSeason) return;
    if (e.target.tagName != 'LABEL') return;
    if (seasonChangeInProgress) clearTimeout(seasonChangeBreakID);
    seasonChange(e.target.textContent);
})

favouriteBooks.addEventListener('click', (e) => {
    if (seasonChangeInProgress) clearTimeout(seasonChangeBreakID);

    // If Buy button pressed
    if (e.target.classList.contains('favorite-button')) {
        // if user is not authorized yet, open Login popup 
        // otherwise open Buy a Library Card popup if the card is not purchased yet
        if (activeUser.firstName == '') {
            goLoginFoo(e);
        } else if (activeUser.cardPurchased === false) {
            goBuyCard(e);
        } else {
            e.target.setAttribute('disabled', 'disabled');
            e.target.textContent = 'Own';

            // Slice book number from id of wrapper div
            activeUser.bookList.push(Number((e.target.parentElement.getAttribute('id')).slice(4)));            

            activeUser.cardStats.books++
            // Update info in Library Card stats section
            libCardBookNumber.textContent = activeUser.cardStats.books;
        }
        return;
    };
    let newSeason = activeSeason == 'Autumn' ? 'Winter' : allSeasons[allSeasons.indexOf(activeSeason) + 1];
    seasonChange(newSeason);
    // let radioButtonId = newSeason.toLowerCase();
    document.getElementById(newSeason.toLowerCase()).checked = true;
    // сделать активной новую кнопку
})

function seasonChange(newSeason) {
    seasonChangeInProgress = true;
    favouriteBooks.classList.add('fade-out');
    favouriteBooks.classList.remove('fade-in');

    seasonChangeBreakID = setTimeout(() => {
        seasonBooksChange(activeSeason);
        seasonBooksChange(newSeason);
        activeSeason = newSeason;
        favouriteBooks.classList.remove('fade-out');
        favouriteBooks.classList.add('fade-in');
        seasonChangeInProgress = false;
    }, 700);
}

function seasonBooksChange(season) {
    switch(season) {
        case 'Winter':
            favourite1.classList.toggle('hidden-element');
            favourite1.classList.toggle('assignOrder1');
            favourite2.classList.toggle('hidden-element');
            favourite2.classList.toggle('assignOrder2');
            favourite3.classList.toggle('hidden-element');
            favourite3.classList.toggle('assignOrder3');
            favourite4.classList.toggle('hidden-element');
            favourite4.classList.toggle('assignOrder4');
            break;
        case 'Spring':
            favourite5.classList.toggle('hidden-element');
            favourite5.classList.toggle('assignOrder1');
            favourite6.classList.toggle('hidden-element');
            favourite6.classList.toggle('assignOrder2');
            favourite7.classList.toggle('hidden-element');
            favourite7.classList.toggle('assignOrder3');
            favourite8.classList.toggle('hidden-element');
            favourite8.classList.toggle('assignOrder4');
            break;
        case 'Summer':
            favourite9.classList.toggle('hidden-element');
            favourite9.classList.toggle('assignOrder1');
            favourite10.classList.toggle('hidden-element');
            favourite10.classList.toggle('assignOrder2');
            favourite11.classList.toggle('hidden-element');
            favourite11.classList.toggle('assignOrder3');
            favourite12.classList.toggle('hidden-element');
            favourite12.classList.toggle('assignOrder4');
            break;
        case 'Autumn':
            favourite13.classList.toggle('hidden-element');
            favourite13.classList.toggle('assignOrder1');
            favourite14.classList.toggle('hidden-element');
            favourite14.classList.toggle('assignOrder2');
            favourite15.classList.toggle('hidden-element');
            favourite15.classList.toggle('assignOrder3');
            favourite16.classList.toggle('hidden-element');
            favourite16.classList.toggle('assignOrder4');
            break;
    }
}
// Favourite season changer END

// Generate Library Card Number
function libraryCardCode() {
    let hexAlphabet = "0123456789abcdef";
    let generatedCode = '';
    for (let i = 0 ; i < 9 ; i++) {
        generatedCode += hexAlphabet[Math.floor(Math.random() * hexAlphabet.length)];
    }
    return generatedCode;
}

// Change interface when authorisation commited 
function authorisationComplete(flag) {

    if (flag === 'newReader') {
        updateLocalStorageData();
    } else {
        activeUser.cardStats.visits++;
    }

    // Show reader stats in Library Card block
    checkLibCardBTN.style.display = "none";
    libCardCardStats.classList.remove('hidden-element');
    libCardCardStats.style.display = 'flex';

    libCardReaderName.value = activeUser.firstName + ' ' + activeUser.lastName;
    libCardNumber.value = activeUser.cardCode;

    // Prevent changing library card user name and card code after authorisation
    libCardReaderName.setAttribute('readonly', true);
    libCardNumber.setAttribute('readonly', true);

    libCardVisitNumber.textContent = activeUser.cardStats.visits;
    libCardBonusNumber.textContent = activeUser.cardStats.bonuses;
    libCardBookNumber.textContent = activeUser.cardStats.books;

    for (let purchasedBook of activeUser.bookList) {
        let bookWrapper = document.getElementById(`item${purchasedBook}`);
        bookWrapper.children[3].setAttribute('disabled', 'disabled');
        bookWrapper.children[3].textContent = 'Own';

    }

    
    // change profile icon to initials
    profileIcon.classList.add('user-registered');
    profileIcon.innerHTML = activeUser.firstName[0] + activeUser.lastName[0];
    profileIcon.setAttribute('title', activeUser.firstName + ' ' + activeUser.lastName);

    profileMiniPopupTitle.style.fontSize = '13px';
    profileMiniPopupTitle.textContent = activeUser.cardCode;
    
    // enable library card check
    checkLibCardBTN.removeAttribute("disabled");

    // Change 'get-a-card' block
    getCardIntro.classList.add('hidden-element');
    getCardIntro.style.display = 'none';
    visitProfileLibCardIntro.classList.remove('hidden-element');

}

// Check if localStorage has reader with keys/values contained in keyObject
// Returns an array with object from localStore which meets keyObject keys, otherwise empty array
function checkLocalStore(keyObject) {
    let result = [];
    // There's no 'readers' key in localStorage
    if (localStorage.getItem('readers') === null) return result;

    let arrReaders = JSON.parse(localStorage.getItem('readers'));

    // search in each reader record
    for (let reader of arrReaders) {
        // True only if every reader's key meets keyObject key
        let allParametersFit = false;
        for (let parameter in keyObject) {
            allParametersFit = keyObject[parameter] == reader[parameter] ? true : false;

            // The first mismatch means this readers object doesn't fit
            if (allParametersFit == false) break;
        }

        if (allParametersFit == true) {
            result.push(reader);

            return result;
        }
    }
    return result;
}

// Update user profile data
function updateLocalStorageData() {
    let arrReaders = [];

    if (localStorage.getItem('readers') === null) {
        // There's no 'readers' key in localStorage
        arrReaders.push(activeUser);
    } else {    
        let storedReaders = JSON.parse(localStorage.getItem('readers'))

        // check each reader against activeUser
        for(reader of storedReaders) {
            if (reader.firstName == activeUser.firstName 
                && reader.lastName == activeUser.lastName
                && reader.password == activeUser.password
                && reader.cardCode == activeUser.cardCode) {
                    // Update with activeUser data
                    arrReaders.push(activeUser);
            } else {
                    arrReaders.push(reader);
            }
        }
    }
    let newReadersString = JSON.stringify(arrReaders)   
    localStorage.setItem('readers', newReadersString);
}



// console.log(`Результаты самооценки:
//     1. Вёрстка соответствует макету. Ширина экрана 768px +26
//         - расстояние от картинки до точек сделано по макету (оценка за это не снижается)

//     2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. 
//     Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12

//     3. На ширине экрана 768рх реализовано адаптивное меню +12

// `);