$(document).ready(function() {

var shopping = "category_slugs=baby, bridal, clothing, electronics, fashion-accessories, gay, gifts, home_goods, jewish, kids, kitchen, makeup, mens-clothing, movies_music_games, office_supplies, pets, product, tools, toys, womens-clothing";
var wellness = "category_slugs=beauty_health, chiropractic, dental, dermatology, eye-vision, facial, fitness, fitness_classes, gym, hair-removal, hair-salon, health-beauty, manicure-pedicure, massage, personal-training, pilates, spa, tanning, teeth-whitening, yoga";
// var activities = "category_slugs=activities-events, bars-clubs, bowling, dance-classes, city-tours, comedy-clubs, concerts, life-skills-classes, museums, outdoor_adventures, skiing, skydiving, sporting-events, theater, travel, wine-tasting, martial-arts";

var queryShopping = "https://api.discountapi.com/v2/deals?" + shopping + "&api_key=" + apiKey; 
var queryWellness = "https://api.discountapi.com/v2/deals?" + wellness + "&api_key=" + apiKey; 
var apiKey = "uFVXWRdL";
var i = -1;

function getEntertainment(i){
    var city = document.getElementById("city").value; 
$.ajax({
    url: "https://app.ticketmaster.com/discovery/v2/events.json?&city="+ city + "&size=10&apikey=TLhN2TG989Us31qJyUNOxHMCWjq9wCYp",
    method: "GET"
}).then(function(response){
    console.log(response)
    var eventId = response._embedded.events[i].id;
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events/" + eventId + "/images.json?&size=10&apikey=TLhN2TG989Us31qJyUNOxHMCWjq9wCYp",
        method: "GET",
    }).then(function(responseImg){
        console.log(responseImg)
        var eventName = response._embedded.events[i].name;
        var eventSales = response._embedded.events[i].url;
        var eventPicture = responseImg.images[i].url;
 
        // This callback sets the page content
        function displayNewDeal(){
            $(".entertainment #text").text(eventName);
            $("#img3").attr({src: eventPicture, alt: "event image"});
            $(".entertainment #link").attr("href", eventSales);
        };
        displayNewDeal();
    });
  });
};

// This click handler allows the user to get a new event. 
$(".entertainment #next").on("click", function(event){
    event.preventDefault();
    i++;
    if (i > 9){
        i = 0;
        getEntertainment(i);
    } else {
        getEntertainment(i);
    };
});

// This click event allows the user to go back one event at a time.
$(".entertainment #back").on("click", function(event){
    event.preventDefault();
    i--;
    if (i < 0){
        i = 9;
        getEntertainment(i);
    } else {
        getEntertainment(i);
    };
});


// This is the function to get wellness deals
function getWell(i){
    $.ajax({
        url: queryWellness,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(i);
        var description = response.deals[i].deal.short_title;
        var imgUrl = response.deals[i].deal.image_url;
        var dealUrl = response.deals[i].deal.url;

// This callback sets the page content
        function displayNewDeal(){
            $(".wellness #text").text(description);
            $("#img6").attr({src: imgUrl, alt: "deal image"});
            $(".wellness #link").attr("href", dealUrl);
        };
        displayNewDeal();
    });
};

// This click handler allows the user to get a new wellness deal. 
$(".wellness #next").on("click", function(event){
    event.preventDefault();
    i++;
    if (i > 19){
        i = 0;
        getWell(i);
    } else {
    getWell(i);
    };
});

// This click event allows the user to go back one deal at a time.
$(".wellness #back").on("click", function(event){
    event.preventDefault();
    i--;
    if (i < 0){
        i = 19;
        getWell(i);
    } else {
        getWell(i);
    };
});


// This is the function to get shopping deals
function getDeals(i){
    $.ajax({
        url: queryShopping,
        method: "GET"
    }).then(function(response){
        console.log(response);
        console.log(i);
        var description = response.deals[i].deal.short_title;
        var imgUrl = response.deals[i].deal.image_url;
        var dealUrl = response.deals[i].deal.url;

// This callback sets the page content
        function displayNewDeal(){
            $(".shopping #text").text(description);
            $("#img5").attr({src: imgUrl, alt: "deal image"});
            $(".shopping #link").attr("href", dealUrl);
        };
        displayNewDeal();
    });
};

// This click event allows the user to generate a new deal.
$(".shopping #next").on("click", function(event){
    event.preventDefault();
    i++;
    if (i > 19){
        i = 0;
        getDeals(i);
    } else {
    getDeals(i);
    };
});

// This click event allows the user to go back one deal at a time.
$(".shopping #back").on("click", function(event){
    event.preventDefault();
    i--;
    if (i < 0){
        i = 19;
        getDeals(i);
    } else {
        getDeals(i);
    };
});

}); //document.ready end brackets