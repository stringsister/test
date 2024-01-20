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
            <span class="reviewer-name">${review.author_name}</span>
            <span class="star-rating">&#9733; ${review.rating}</span>
          </div>
          <p class="review-text">${review.text}</p>
        </div>`;
    });

    reviewsContainer.innerHTML = reviewsHTML;
  }

  // Update reviews every 30 minutes (adjust as needed)
  setInterval(getGoogleReviews, 1800000);

  // Call the function to fetch and display reviews on page load
  getGoogleReviews();
});
