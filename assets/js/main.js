!function(l){var e=l(window),n=l("body"),o=l("#header"),c=l("#banner");breakpoints({xlarge:["1281px","1680px"],large:["981px","1280px"],medium:["737px","980px"],small:["481px","736px"],xsmall:["361px","480px"],xxsmall:[null,"360px"]}),e.on("load",function(){window.setTimeout(function(){n.removeClass("is-preload")},100)}),l(".scrolly").scrolly({offset:function(){return o.height()}}),0<c.length&&o.hasClass("alt")&&(e.on("resize",function(){e.trigger("scroll")}),c.scrollex({bottom:o.outerHeight(),terminate:function(){o.removeClass("alt")},enter:function(){o.addClass("alt")},leave:function(){o.removeClass("alt")}})),c=l("#banner"),function(){var e,o,i,n={images:{"images/slides/1.webp":"60% 30%","images/slides/2.webp":"80% 30%","images/slides/3.webp":"80% 30%","images/slides/4.webp":"5% 50%","images/slides/5.webp":"60% 5%"},delay:6e3},s=0,t=[],a=l('<div class="bg" />').appendTo(c);for(i in n.images)(o=l("<div />")).css("background-image",'url("'+i+'")'),o.css("background-position",n.images[i]),o.appendTo(a),t.push(o);t[s].addClass("visible"),t[s].addClass("top"),1!=t.length&&setInterval(function(){e=s,++s>=t.length&&(s=0),t[e].removeClass("top"),t[s].addClass("visible"),t[s].addClass("top"),setTimeout(function(){t[e].removeClass("visible")},n.delay/2)},n.delay)}(),l(".gallery").on("click","a",function(e){var o=l(this),i=o.parents(".gallery").children(".modal"),n=i.find("img"),o=o.attr("href");o.match(/\.(jpg|gif|png|mp4)$/)&&(e.preventDefault(),e.stopPropagation(),i[0]._locked||(i[0]._locked=!0,n.attr("src",o),i.addClass("visible"),i.focus(),setTimeout(function(){i[0]._locked=!1},600)))}).on("click",".modal",function(e){var o=l(this),i=o.find("img");o[0]._locked||o.hasClass("visible")&&(e.stopPropagation(),o[0]._locked=!0,o.removeClass("loaded"),setTimeout(function(){o.removeClass("visible"),setTimeout(function(){i.attr("src",""),o[0]._locked=!1,n.focus()},475)},125))}).on("keypress",".modal",function(e){var o=l(this);27==e.keyCode&&o.trigger("click")}).on("mouseup mousedown mousemove",".modal",function(e){e.stopPropagation()}).prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>').find("img").on("load",function(e){var o=l(this).parents(".modal");setTimeout(function(){o.hasClass("visible")&&o.addClass("loaded")},275)});var i=l("#menu");i._locked=!1,i._lock=function(){return!i._locked&&(i._locked=!0,window.setTimeout(function(){i._locked=!1},350),!0)},i._show=function(){i._lock()&&n.addClass("is-menu-visible")},i._hide=function(){i._lock()&&n.removeClass("is-menu-visible")},i._toggle=function(){i._lock()&&n.toggleClass("is-menu-visible")},i.appendTo(n).on("click",function(e){e.stopPropagation(),i._hide()}).find(".inner").on("click",".close",function(e){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),i._hide()}).on("click",function(e){e.stopPropagation()}).on("click","a",function(e){var o=l(this).attr("href");e.preventDefault(),e.stopPropagation(),i._hide(),window.setTimeout(function(){window.location.href=o},350)}),n.on("click",'a[href="#menu"]',function(e){e.stopPropagation(),e.preventDefault(),i._toggle()}).on("keydown",function(e){27==e.keyCode&&i._hide()}),l(".tabs").selectorr({titleSelector:"h3",delay:250})}(jQuery);




document.addEventListener('DOMContentLoaded', (event) => {
    const apiKey = 'AIzaSyBWyfZTApDj2-IU-qAyIYVRQLVtRwq_cjI';
    const placeId = 'ChIJc_dVAcckZ2gR54d2HZTTKrQ';

    function fetchReviews() {
        const service = new google.maps.places.PlacesService(document.createElement('div'));
        const request = {
            placeId: placeId,
            fields: ['reviews']
        };

        service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                displayReviews(place.reviews);
            }
        });
    }

    function displayReviews(reviews) {
        const reviewsContainer = document.getElementById('reviews-container');
        reviews.forEach((review, index) => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('carousel-item');
            if (index === 0) reviewItem.classList.add('active');
            reviewItem.innerHTML = `<p>${review.text}</p><p><strong>- ${review.author_name}</strong></p>`;
            reviewsContainer.appendChild(reviewItem);
        });
        startCarousel();
    }

    function startCarousel() {
        const carouselInner = document.querySelector('.carousel-inner');
        const items = carouselInner.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.carousel-control-prev');
        const nextBtn = document.querySelector('.carousel-control-next');
        
        let currentIndex = 0;
        const intervalTime = 3000;

        function showItem(index) {
            carouselInner.style.transform = `translateX(-${index * 100}%)`;
        }

        function showNextItem() {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }

        function showPrevItem() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        }

        nextBtn.addEventListener('click', showNextItem);
        prevBtn.addEventListener('click', showPrevItem);

        let autoSlide = setInterval(showNextItem, intervalTime);

        document.querySelector('.carousel').addEventListener('mouseover', () => {
            clearInterval(autoSlide);
        });

        document.querySelector('.carousel').addEventListener('mouseout', () => {
            autoSlide = setInterval(showNextItem, intervalTime);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                showPrevItem();
            } else if (event.key === 'ArrowRight') {
                showNextItem();
            }
        });
    }

    fetchReviews();
});