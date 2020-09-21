$(document).ready(function() {

// var queryUrl = "https://developers.zomato.com/api/v2.1/collections?city_id=280&apikey=278895572b867605262933245620ff46";

// I also noticed that sometimes it takes a long time to load when you click the "new deal" button or ocassionally
// a restaurant has no "featured_image" to use so its just empty. 

var queryUrl = "https://developers.zomato.com/api/v2.1/location_details?entity_id=520&entity_type=city&apikey=278895572b867605262933245620ff46";
var i = 0;

function getDeals(i){
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
                var resName = response.best_rated_restaurant[i].restaurant.name;
                var imgUrl = response.best_rated_restaurant[i].restaurant.featured_image;
                var menuUrl = response.best_rated_restaurant[i].restaurant.menu_url;
                var resRating = response.best_rated_restaurant[i].restaurant.user_rating.aggregate_rating;
                // This callback sets the page content
                function displayNewDeal(){
                    $("#test h3").text(resName);
                    $("#rating h4").text("Rating: " + resRating + " out of 5");
                    // $("#expiration").text("Expires on: " + expiration);
                    // $("#percent").text(percentOff + "% off!");
                    $("#image").attr({src: imgUrl, alt: "deal image"});
                    $("#product-url").attr("href", menuUrl);
                    
                };
                displayNewDeal();
            });
        };
    getDeals(i);
        
        // This click event allows the user to generate a new deal, up to 10 max. 
        // need to make a reset to first offer. eliminate the "dead end"
        $("#page3").on("click", function(event){
            i++;   
            console.log(i);
            getDeals(i);
        });

    });