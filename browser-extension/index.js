// Should only be triggered on first page load

// Get Quote
fetch("http://localhost:3030/quotes/random",
    {
        method: 'GET',
    })
    .then(res => res.json())
    .then(data => data[0])
    .then(quoteData => {
        $('#quote-text').text(quoteData.text);
        $('#quote-author').text('- ' + quoteData.author);
        $('#quote-likes').text(quoteData.likes);
    })

$(function () {
    $('#search-form').on("submit", function (e) {
        e.preventDefault(); // cancel the actual submit
        const searchInput = $('#search-input').val()
        if (searchInput) {
            window.open('https://google.com/search?q=' + searchInput)
        }
    });
});
