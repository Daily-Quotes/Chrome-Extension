// Should only be triggered on first page load

//------- Color Buttons --------
getStoredHighlightColorIndex()
//------- Font Change --------
getStoredFontIndex();


// Get/Set tabsOpened store
chrome.storage.sync.get(["tabsOpened"], function (data) {
    const tabsOpened = data["tabsOpened"]

    if (tabsOpened === 0 || tabsOpened === undefined) {
        // Init tabsOpened to 1
        chrome.storage.sync.set({tabsOpened: 1}, function () {
        });
    } else {
        // Check if visit no. 20
        if (tabsOpened % 20 === 0) {
            $('#popup').removeClass('hide');
            $('#quotes-seen-amount').text(tabsOpened)
        }
        // Save tabsOpened to storage
        chrome.storage.sync.set({tabsOpened: tabsOpened + 1}, function () {
        });
    }
})

// Close Popup
$(function handleClosePopup() {
    $('#close-popup').on('click', () => {
        $('#popup').addClass('hide')
    })
})

// Fetch a random Quote from API
const fetchRandomQuote = () => {
    fetch("https://murmuring-plateau-84095.herokuapp.com/quotes/random",
        {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => data[0])
        .then(quoteData => {
            // Set author and handles click
            const quoteAuthorElement = $('#quote-author');
            quoteAuthorElement.text('- ' + quoteData.author);
            quoteAuthorElement.on("click", () => {
                window.open('https://google.com/search?q=' + quoteData.author)
            })

            // Set quote
            $('#quote-text').text(quoteData.text);


            /* Set current quote's likes
            currentLikes = quoteData.likes;
            $('#quote-likes').text(currentLikes);
            */
        })
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const showDate = () => {
    let date = new Date()
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = "PM";
    }
    if (hour === 0) {
        hour = 12;
        am_pm = "AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    // Set Day
    let currentDate = `${weekDays[date.getDay()]} ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    $('#date-day').text(currentDate);

    // Set Hour
    let currentTime = `${hour}:${min}`;
    $('#date-hour').text(currentTime);
    $('#date-seconds').text(':' + sec);
    $('#date-am_pm').text(am_pm)
}

/*
const changeLikeIcon = () => {
    if (likesQuote) {
        if ($('#liked-icon').hasClass("hide")) $('#liked-icon').removeClass("hide");
        $('#unliked-icon').addClass("hide")

    } else {
        if ($('#unliked-icon').hasClass("hide")) $('#unliked-icon').removeClass("hide");
        $('#liked-icon').addClass("hide")

    }
}
*/

/*
$(function handleSearchInputChange() {
    $('#search-input').on("input", function (e) {
        console.log(e.target.value);

    })
})
*/

$(function handleDateClick() {
    $('#date-day').on("click", function () {
        const searchTerm = $('#date-day').text().split(' ').slice(1,3) // Ex. [19, august]
        window.open('https://www.onthisday.com/day/' + `${searchTerm[1]}/${searchTerm[0]}`)
    })
})

$(function handleSubmit() {
    $('#search-form').on("submit", function (e) {
        e.preventDefault(); // cancel the actual submit
        const searchInput = $('#search-input').val()
        if (searchInput) {
            window.open('https://google.com/search?q=' + searchInput)
        }
    });
});

/*
$(function handleLikeClick() {
    $('#like-button').on('click', function (e) {
        likesQuote = !likesQuote;
        changeLikeIcon()
    })
})


let likesQuote = false
let currentLikes = 0
*/

// Set init Date
showDate();
// Updates date every second
setInterval(showDate, 1000);
// Get random quote
fetchRandomQuote()

// TODO: Check if user has account
// TODO: Check if current user likes quote by fetch
