// fetch the quote from the API
fetch('https://type.fit/api/quotes')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let randomQuote = data[Math.floor(Math.random() * data.length)];
        document.getElementById('quote').innerHTML = randomQuote.text + ' - ' + randomQuote.author;
    }
).catch(function(error) {
    document.getElementById('quote').innerHTML = "There is always a reason to smile. Have a great day!" + ' - ' + "Me";
});
