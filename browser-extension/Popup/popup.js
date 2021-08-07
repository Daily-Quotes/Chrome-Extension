//
//------- Color Buttons --------
//

getStoredHighlightColorPopup()

const handleColorClick = (e) => {
    const selectedColor = e.target.value;

    // Restore all buttons
    colorButtons.map(colorButton => {
        if (colorButton.hasClass("active")) {
            colorButton.removeClass("active")
        }
    })

    // Check if selectedColor isn't the current color
    if ($(`#set-${selectedColor}-button`).hasClass("active") !== true) {
        // If not, set as current color
        $(`#set-${selectedColor}-button`).addClass("active");

        // Set selected color to elements with class "dynamic-color"
        $(".dynamic-color").css("color", `var(--${selectedColor})`);

        // Save new color to storage
        chrome.storage.sync.set({highlightColor: selectedColor}, function () {
            console.log('highlightColor is set to ' + selectedColor);
        });
    }
}

colorButtons.map(colorButton => {
    colorButton.click(handleColorClick);
})

//
//------- Font Change --------
//
getStoredFontIndex();

$(function handleNextFontClick () {
    $('#next-font').on('click', () => {
        // Check if savedFontIndex is not the last element if so, reset to 0
        if (savedFontIndex < fontsNames.length - 1){
            savedFontIndex++;
        }else{
            savedFontIndex = 0
        }

        // Save savedFontIndex into chrome
        chrome.storage.sync.set({fontIndex: savedFontIndex}, function () {
            console.log('fontIndex is set to ' + savedFontIndex);
        });

        const currentFontElement = $("#current-font")
        currentFontElement.css("font-family", `${fontsNames[savedFontIndex]}`);
        currentFontElement.text(fontsNames[savedFontIndex])
    })
})

$(function handlePrevFontClick () {
    $('#prev-font').on('click', () => {
        // Check if savedFontIndex is not the last element if so, reset to 0
        if (savedFontIndex > 0){
            savedFontIndex--;
        }else{
            savedFontIndex = fontsNames.length - 1;
        }

        // Save savedFontIndex into chrome
        chrome.storage.sync.set({fontIndex: savedFontIndex}, function () {
            console.log('fontIndex is set to ' + savedFontIndex);
        });

        const currentFontElement = $("#current-font")
        currentFontElement.css("font-family", `${fontsNames[savedFontIndex]}`);
        currentFontElement.text(fontsNames[savedFontIndex])
    })
})

