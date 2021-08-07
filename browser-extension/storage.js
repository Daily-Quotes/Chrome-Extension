const colorButtons = [
    $('#set-red-button'),
    $('#set-orange-button'),
    $('#set-yellow-button'),
    $('#set-green-button'),
    $('#set-blue-button'),
    $('#set-purple-button')
];

function getStoredHighlightColorIndex(){
    // Get highlightColor stored
    chrome.storage.sync.get(["highlightColor"], function (data) {
        const savedColor = data["highlightColor"];
        // Set selected color to elements with class "dynamic-color"
        $(".dynamic-color").css("color", `var(--${savedColor})`);
    })
}

function getStoredHighlightColorPopup(){
// Get stored Highlight Color and set color button as active
chrome.storage.sync.get(["highlightColor"], function (data) {
    const savedColor = data["highlightColor"];

    // Set selected color to elements with class "dynamic-color"
    $(".dynamic-color").css("color", `var(--${savedColor})`);
    // Add active class to current color
    $(`#set-${savedColor}-button`).addClass("active");
})
}


const fontsNames = [
    'Source Code Pro',
    'Source Sans Pro',
    'Arial',
    'Andada Pro',
    'MonteCarlo',
    'Oswald',
    'Style Script'
];

let savedFontIndex = 0;

// Get stored Font index
function getStoredFontIndex() {
    chrome.storage.sync.get(["fontIndex"], function (data) {
        let savedFontIndex = data["fontIndex"];
        let fontName = null;

        if (savedFontIndex === undefined) {
            // Initiate font Index to 0
            chrome.storage.sync.set({fontIndex: 0}, function () {
                console.log('fontIndex is set to ' + 0);
            });

            fontName = fontsNames[0];
        } else {
            fontName = fontsNames[savedFontIndex];
        }
        console.log("Font name", fontName);

        $('.dynamic-font').css("font-family", `${fontsNames[savedFontIndex]}`);
        $('#current-font').text(fontsNames[savedFontIndex])
    })
}