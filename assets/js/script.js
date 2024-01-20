document.addEventListener("DOMContentLoaded", function () {
  const placeId = 'ChIJc_dVAcckZ2gR54d2HZTTKrQ';
  const reviewsContainer = document.getElementById('google-reviews');

  function getGoogleReviews() {
    const service = new google.maps.places.PlacesService(reviewsContainer);
    service.getDetails({ placeId: placeId }, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        displayReviews(place.reviews);
      }
    });
  }

  function displayReviews(reviews) {
    let reviewsHTML = '';
    reviews.forEach(function (review) {
      reviewsHTML += `





        <div class="review-bubble">
          <div class="review-header">
         
            
          </div>


          <p class="review-text">${review.text}</p>
<span class="star-rating"> &#9733;&#9733;&#9733;&#9733;&#9733;</span> <br>
<span class="reviewer-name">- ${review.author_name} </span> 
        </div>`;
    });

    reviewsContainer.innerHTML = reviewsHTML;
  }


  // Call the function to fetch and display reviews on page load
  getGoogleReviews();
});
