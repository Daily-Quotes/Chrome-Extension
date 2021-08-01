const colorButtons = [
    $('#set-red-button'),
    $('#set-orange-button'),
    $('#set-yellow-button'),
    $('#set-green-button'),
    $('#set-blue-button'),
    $('#set-purple-button')
];

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

// Get stored Highlight Color and set color button as active
chrome.storage.sync.get(["highlightColor"], function (data) {
    const savedColor = data["highlightColor"];

    // Set selected color to elements with class "dynamic-color"
    $(".dynamic-color").css("color", `var(--${savedColor})`);
    // Add active class to current color
    $(`#set-${savedColor}-button`).addClass("active");
})

colorButtons.map(colorButton => {
    colorButton.click(handleColorClick);
})