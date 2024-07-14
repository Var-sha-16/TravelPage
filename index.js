document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger");
    const navBar = document.getElementById("nav-bar");

    hamburger.addEventListener("click", function() {
        navBar.classList.toggle("active-span");
        hamburger.classList.toggle("active-span");
    });

    // Intersection Observer for initial animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const runInitialAnimations = () => {
        return new Promise(resolve => {
            const animatedElements = document.querySelectorAll('.react-1, .react-2, .girl, .girl-content');
            animatedElements.forEach(element => {
                if (element.classList.contains('react-1') || element.classList.contains('react-2') || element.classList.contains('girl')) {
                    element.classList.add('animate-slide-in');
                }
                if (element.classList.contains('girl-content')) {
                    element.classList.add('animate-slide-in-right');
                }
            });
            setTimeout(resolve, 2000); // Wait for the initial animations to complete (2s duration)
        });
    };

    const runSecondaryAnimations = () => {
        const animatedElements = document.querySelectorAll('.react-img-1, .react-img-2');
        animatedElements.forEach(element => {
            element.classList.add('animate-zoom-in');
        });
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target); // Stop observing once animated

                runInitialAnimations().then(() => {
                    runSecondaryAnimations();
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.react-1, .react-2, .girl, .girl-content, .react-img-1, .react-img-2');
    animatedElements.forEach(element => {
        observer.observe(element);
    });




    const leftDiv = document.querySelector(".top-div .left");
    const rightDiv = document.querySelector(".top-div .right");

    const observered = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === leftDiv) {
                    leftDiv.classList.add("visible");
                }
                if (entry.target === rightDiv) {
                    rightDiv.classList.add("visible");
                }
                if (leftDiv.classList.contains("visible") && rightDiv.classList.contains("visible")) {
                    observer.unobserve(leftDiv);
                    observer.unobserve(rightDiv);
                }
            }
        });
    }, { threshold: 0.5 });

    observered.observe(leftDiv);
    observered.observe(rightDiv);



});



document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel-left-img');
    const images = document.querySelectorAll('.carousel-left-img img');
    const imageCount = images.length;
    let index = 0;
    let interval;

    const updateCarouselWidth = () => {
        const imageWidth = images[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(images[0]).marginRight);
        carousel.style.width = `${(imageWidth + gap) * imageCount - gap}px`;
    };

    const moveCarousel = () => {
        const imageWidth = images[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(images[0]).marginRight);
        if (index >= imageCount) {
            index = 0;
        } else if (index < 0) {
            index = imageCount - 1;
        }
        carousel.style.transform = `translateX(${-index * (imageWidth + gap) * 0.8}px)`; // 0.8 to show part of the 6th image
    };

    const startInterval = () => {
        interval = setInterval(() => {
            index++;
            moveCarousel();
        }, 3000);
    };

    const stopInterval = () => {
        clearInterval(interval);
    };

    document.getElementById('right-arrow').addEventListener('click', () => {
        stopInterval();
        index++;
        moveCarousel();
        startInterval();
    });

    document.getElementById('left-arrow').addEventListener('click', () => {
        stopInterval();
        index--;
        moveCarousel();
        startInterval();
    });

    window.addEventListener('resize', () => {
        updateCarouselWidth();
        moveCarousel();
    });

    updateCarouselWidth();
    startInterval();
});
// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.carousel-image');
    const buttons = document.querySelectorAll('.carousel-button-layer');
    const totalImages = images.length;
    let interval;

    function showNextImage() {
        const currentImage = images[currentIndex];
        const nextIndex = (currentIndex + 1) % totalImages;
        const nextImage = images[nextIndex];

        currentImage.classList.add('exit');

        currentImage.addEventListener('transitionend', function() {
            currentImage.classList.remove('active', 'exit');
            currentIndex = nextIndex;
            nextImage.classList.add('active');
            updateButtons();
        }, { once: true });

        nextImage.classList.add('active');
    }

    function updateButtons() {
        buttons.forEach(button => button.classList.remove('active'));
        buttons[currentIndex].classList.add('active');
    }

    function startCarousel() {
        interval = setInterval(showNextImage, 4000);
    }

    function stopCarousel() {
        clearInterval(interval);
    }

    function goToImage(index) {
        if (index === currentIndex) return;

        const currentImage = images[currentIndex];
        const nextImage = images[index];

        stopCarousel();

        currentImage.classList.add('exit');

        currentImage.addEventListener('transitionend', function() {
            currentImage.classList.remove('active', 'exit');
            currentIndex = index;
            nextImage.classList.add('active');
            updateButtons();
            startCarousel();
        }, { once: true });

        nextImage.classList.add('active');
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToImage(index);
        });
    });

    images[currentIndex].classList.add('active');
    updateButtons();
    startCarousel();



    // script.js
const carousel = document.querySelector('.carousel-company');
const imagesCom = document.querySelectorAll('.carousel-company .slide-image-load');
const totalImagesCom = imagesCom.length;
const visibleImages = 4;
let currentIndexCom = 0;

function moveCarousel() {
    currentIndexCom++;
    if (currentIndexCom >= totalImagesCom / 2) {
        currentIndexCom = 0;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(0)`;
        // Allow the browser to render the changes before restarting the animation
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                carousel.style.transition = 'transform 1s linear';
                currentIndexCom++;
                carousel.style.transform = `translateX(-${currentIndexCom * (100 / visibleImages)}%)`;
            });
        });
    } else {
        carousel.style.transform = `translateX(-${currentIndexCom * (100 / visibleImages)}%)`;
    }
}

setInterval(moveCarousel, 4000);



document.getElementById('subscribe-btn').addEventListener('click', function() {
    const emailInput = document.getElementById('email');
    const messageDiv = document.getElementById('message');

    if (validateEmail(emailInput.value)) {
        messageDiv.textContent = 'Successfully subscribed!';
        messageDiv.className = 'success';
    } else {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.className = 'error';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


})

document.addEventListener('DOMContentLoaded', function() {

    const images = document.querySelectorAll('.image-tag');
    const imageUrls = [
        'url(https://alluretrails.com/wp-content/uploads/2022/10/Peru.jpg)',
        'url(https://alluretrails.com/wp-content/uploads/2022/10/Maldives.jpg)',
        'url(https://alluretrails.com/wp-content/uploads/2022/10/Fiji.jpg)'
    ];
    let currentIndex = 1;

    function animateImages() {
        const previousIndex = (currentIndex + images.length - 1) % images.length;
        const nextIndex = (currentIndex + 1) % images.length;

        // Set backgrounds
        images.forEach((div, index) => {
            div.style.background = '';
            div.style.backgroundColor = '';
        });

        images[previousIndex].style.background = imageUrls[previousIndex];
        images[currentIndex].style.background = imageUrls[currentIndex];
        images[nextIndex].style.background = imageUrls[nextIndex];

        images[previousIndex].style.backgroundRepeat = 'no-repeat';
        images[previousIndex].style.backgroundSize = '100% 100%';

        images[currentIndex].style.backgroundSize = '100% 100%';
        images[currentIndex].style.backgroundRepeat = 'no-repeat';

        images[nextIndex].style.backgroundSize = '100% 100%';
        images[nextIndex].style.backgroundRepeat = 'no-repeat';


        // Set positions and sizes
        images.forEach((img, index) => {
            img.classList.remove('small', 'large','left-small','right-small');
            img.style.left = '';
            img.style.top = '';

            const helloText = img.querySelector('.hello-text');
            if (helloText) {
                helloText.remove(); // Remove existing hello text
            }
        });

        images[previousIndex].classList.add('small');
        images[previousIndex].classList.add('left-small');
        images[nextIndex].classList.add('small');
        images[nextIndex].classList.add('right-small');

        const largeImage = images[currentIndex];
        largeImage.classList.add('large');

        const helloText = document.createElement('div');
        helloText.classList.add('hello-text');
        helloText.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

        const helloHeading = document.createElement('h1');
        helloHeading.innerHTML = `<div class="content">
        <p id="explore">Explore The World</p>
        <h1 class="main-head">
          <div class="headline">MAKE YOUR LIFE A</div>
          MEMORABLE SYMPHONY
          OF TRAVEL
        </h1>
        <p class="para-content">
         It’s time to elevate your travel out of the ordinary. Passionate about travel and tailor-made holidays, we use our in-depth knowledge
          to craft trips that push the boundaries beyond your imagination. We have hand-picked many breathtaking experiences for you, a
          preview of the curated journeys you will indulge in.
        </p>
        <div class="button-div">
        <button class="glow-button" id="button">Explore Our Trips</button></div>
    </div>`;
        helloText.appendChild(helloHeading); // Append h1 to helloText

        largeImage.appendChild(helloText);

        if (window.innerWidth <= 450) {
            // Adjust positions for very small screens
            images[previousIndex].style.left = '-100%';
            images[previousIndex].style.top = '15%';
            largeImage.style.left = '-100%';
            largeImage.style.top = '20%';
            images[nextIndex].style.left = '100%';
            images[nextIndex].style.top = '20%';
        } 
        else if (window.innerWidth <= 700) {
            // Adjust positions for small screens
            images[previousIndex].style.left = '-30%';
            images[previousIndex].style.top = '30%';
            largeImage.style.left = '15%';
            largeImage.style.top = '20%';
            images[nextIndex].style.left = '80%';
            images[nextIndex].style.top = '30%';
        } 
        else {
            // Adjust positions for larger screens
            images[previousIndex].style.left = '0%';
            images[previousIndex].style.top = '30%';
            largeImage.style.left = '30%';
            largeImage.style.top = '10%';
            images[nextIndex].style.left = '80%';
            images[nextIndex].style.top = '30%';
        }

        currentIndex = nextIndex;
    }

    setInterval(animateImages, 4000);
});
document.addEventListener('DOMContentLoaded', () => {
    const bgImage = document.querySelector('.background-image');

    // Function to add the animate class after a delay
    function startAnimation() {
        bgImage.classList.add('animate');
    }

    // Wait 5 seconds after the image is fully displayed to start the animation
    setTimeout(startAnimation, 5000);
});




document.addEventListener("DOMContentLoaded", function() {
    const topDiv = document.querySelector(".top-div-box");


    const topDivObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topDiv.classList.add("visible-box");
                observer.unobserve(entry.target);

                // Trigger animation for animatedDivs after the top div is visible

            }
        });
    }, { threshold: 0.5 });

    topDivObserver.observe(topDiv);
});



document.addEventListener("DOMContentLoaded", function() {

  });



  $('#small-carousel').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
  });

  function checkWidth() {
    const container = document.querySelector('.hidden-section');
    const containerBoot = document.querySelector('.contain-boot');
    if (window.innerWidth < 800) {
        container.style.display = 'flex';
        containerBoot.style.display = 'none';
        container.style.flexWrap = 'wrap';

    } else {
        container.style.display = 'none';
    }
}

// Initial check
checkWidth();

// Add event listener for window resize
window.addEventListener('resize', checkWidth);


document.addEventListener("DOMContentLoaded", function() {
    const topDiv = document.querySelector(".contain-boot");
    const topDivObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topDiv.classList.add("visible-box-bottom");
                observer.unobserve(entry.target);

                // Trigger animation for animatedDivs after the top div is visible
                setTimeout(() => {

                }, 1000); // Wait for top div animation to complete (1s)
            }
        });
    }, { threshold: 0.5 });

    topDivObserver.observe(topDiv);
});


document.addEventListener("DOMContentLoaded", function() {
    const topDiv = document.querySelector(".right-demo");
    const topDivObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topDiv.classList.add("visible-box-left");
                observer.unobserve(entry.target);

                // Trigger animation for animatedDivs after the top div is visible
                setTimeout(() => {

                }, 1000); // Wait for top div animation to complete (1s)
            }
        });
    }, { threshold: 0.5 });

    topDivObserver.observe(topDiv);
});


document.addEventListener("DOMContentLoaded", function() {
    const topDiv = document.querySelector(".trail-left-box");
    const topDivObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topDiv.classList.add("box-frm-left");
                observer.unobserve(entry.target);

                // Trigger animation for animatedDivs after the top div is visible
                setTimeout(() => {

                }, 3000); // Wait for top div animation to complete (1s)
            }
        });
    }, { threshold: 0.5 });

    topDivObserver.observe(topDiv);

});



document.addEventListener("DOMContentLoaded", function() {
    const topDiv = document.querySelector(".background-image");
    const topDivObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topDiv.classList.add("animate");
                observer.unobserve(entry.target);

                // Trigger animation for animatedDivs after the top div is visible
                setTimeout(() => {

                }, 3000); // Wait for top div animation to complete (1s)
            }
        });
    }, { threshold: 0.5 });

    topDivObserver.observe(topDiv);

});




document.addEventListener("DOMContentLoaded", function() {
    const leftDiv = document.querySelector(".top-divs .left-divs");
    const rightDiv = document.querySelector(".top-divs .right-divs");
    const buttonTop = document.querySelector(".button-top");
    const observered = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === leftDiv) {
                    leftDiv.classList.add("visible-divs");
                }
                if (entry.target === rightDiv) {
                    rightDiv.classList.add("visible-divs");
                }
                if (leftDiv.classList.contains("visible-divs") && rightDiv.classList.contains("visible-divs")) {
                    observer.unobserve(leftDiv);
                    observer.unobserve(rightDiv);
                    // Delay before showing the buttonTop for smooth transition
                    setTimeout(() => {
                        buttonTop.classList.add("button-animated");
                    }, 2000); // Adjust the delay as needed
                }
            }
        });
    }, { threshold: 0.5 });

    observered.observe(leftDiv);
    observered.observe(rightDiv);
});


document.addEventListener("DOMContentLoaded", function() {
    var div = document.getElementById('animatedDiv');


    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                div.classList.add('showedAs');
                observer.unobserve(div); // Stop observing after the animation is triggered
            }
        });
    }, { threshold: 0.1 });

    observer.observe(div);
});



document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.single-div');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });



  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.letter-table');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated-table');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.added');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated-photos');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.table-header');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anima-right');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.blog-body');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anima-left');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.run-button');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anima-right');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.leaf');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated-photos');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const singleDivs = document.querySelectorAll('.text-overlay-black-img');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rotating-image');
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        }
      });
    }, options);

    singleDivs.forEach(div => {
      observer.observe(div);
    });
  });



document.addEventListener("DOMContentLoaded", function() {
    const wedContainer = document.querySelector('.excel');
    const windowWidth = window.innerWidth;

    if (windowWidth < 1000) {


        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('custom-wrapper');

        const div = document.createElement('div');
        div.classList.add('back-head-rect');
        div.innerHTML = '<img src="./assests/Path 173green.png" alt="">';
        wrapperDiv.appendChild(div);

        const h1 = document.createElement('h1');
        h1.classList.add('blue-head', 'white-txt','white-style');
        h1.textContent = 'We Excel in';
        wrapperDiv.appendChild(h1);

        wedContainer.insertBefore(wrapperDiv, wedContainer.firstChild);
    }
});



document.addEventListener('DOMContentLoaded', function () {
    const leftDiv = document.querySelector('.all-phone');
    const rightDiv = document.querySelector('.right-phone');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === leftDiv && !leftDiv.classList.contains('anima-left')) {
            leftDiv.classList.add('anima-left');
          }
          if (entry.target === rightDiv && !rightDiv.classList.contains('anima-right')) {
            rightDiv.classList.add('anima-right');
          }
        }
      });
    }, options);

    observer.observe(leftDiv);
    observer.observe(rightDiv);
  });




document.addEventListener("DOMContentLoaded", function() {
    var div = document.getElementById('table-content');
    const boxes = document.querySelectorAll(".letter-table");

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const box = entry.target;
                setTimeout(() => {
                    box.style.animationPlayState = 'running';
                }, 3000);
                observer.unobserve(box);
            }

        });
    }, { threshold: 0.1 });

    boxes.forEach(box => {
        observer.observe(box);
    });
});


function updateBorders() {
    const horizontalBoxes = document.querySelectorAll('.box-hr');
    const verticalBoxes = document.querySelectorAll('.box-vl');
  
    if (window.innerWidth < 560) {
      horizontalBoxes.forEach(box => {
        box.style.borderBottom = 'none';
      });
      verticalBoxes.forEach(box => {
        box.style.borderLeft = 'none';
      });
    } else {
      horizontalBoxes.forEach(box => {
        box.style.borderBottom = '2px dashed #d8d8d8';
      });
      verticalBoxes.forEach(box => {
        box.style.borderLeft = '2px dashed #d8d8d8';
      });
    }
  }
  
  // Initial check
  updateBorders();
  


  
function updatePostionBorders() {
    const header = document.querySelector('.div-header');
   
    if (window.innerWidth <= 850) {
        
            header.style.position = 'static';  // or any other desired value
          } else {
            header.style.position = 'fixed';  // restore the fixed position if the screen is resized above 850px
          
    }
  }
  
  // Initial check
  updatePostionBorders();



