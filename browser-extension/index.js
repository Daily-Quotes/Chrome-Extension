// Should only be triggered on first page load
console.log('ho');

$(function() {
    $('#search-form').on("submit", function(e) {
        e.preventDefault(); // cancel the actual submit
        const searchInput = $('#search-input').val()
        if (searchInput){
            window.open('https://google.com/search?q='+searchInput)
        }
    });
});
