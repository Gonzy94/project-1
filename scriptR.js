$(document).ready(function () {
  // var queryUrl = "https://developers.zomato.com/api/v2.1/collections?city_id=280&apikey=278895572b867605262933245620ff46";

  // I also noticed that sometimes it takes a long time to load when you click the "new deal" button or ocassionally
  // a restaurant has no "featured_image" to use so its just empty.

  var queryUrl =
    "https://developers.zomato.com/api/v2.1/location_details?entity_id=281&entity_type=city&apikey=278895572b867605262933245620ff46";
  var i = -1;

  function getDinner(i) {
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var resName = response.best_rated_restaurant[i].restaurant.name;
      var imgUrl = response.best_rated_restaurant[i].restaurant.featured_image;
      var menuUrl = response.best_rated_restaurant[i].restaurant.menu_url;
      var resRating =
        response.best_rated_restaurant[i].restaurant.user_rating
          .aggregate_rating;

      // This callback sets the page content
      function displayNewDinner() {
        $(".dining #name").text(resName);
        $(".dining #rating").text("Rating: " + resRating + " out of 5");
        //  $("#image").attr({src: imgUrl, alt: "deal image"});
        //  $("#product-url").attr("href", menuUrl);
        $(".dining #link").attr("href", menuUrl);

        $("#img4").attr({ src: imgUrl, alt: "Click here for Menu!" });
      }
      displayNewDinner();
    });
  }
  getDinner(i);

  // This click event allows the user to generate a new deal, up to 10 max.

  $(".dining #next").on("click", function (event) {
    event.preventDefault();
    i++;
    if (i > 9) {
      i = 0;
      getDinner(i);
    } else {
      getDinner(i);
    }
  });
  // This click event allows the user to go back one deal at a time.
  $(".dining #back").on("click", function (event) {
    event.preventDefault();
    i--;
    if (i < 0) {
      i = 9;
      getDinner(i);
    } else {
      getDinner(i);
    }
  });
}); //document.ready end brackets
