/* ====== mobile menu ========*/
$(document).ready(function () {
	$("#toggle-button").click(function () {
		$("nav").toggleClass('nav-open');
		$("#toggle-menu").toggleClass('-translate-y-[200%] ');
	});
});
/*============card mobile slider==================*/
// Select all slider containers
        document.querySelectorAll(".card-inner-slider").forEach((sliderEl, index) => {
            // Find the pagination inside this slider
            const paginationEl = sliderEl.querySelector(".swiper-pagination");

            // Create a new Swiper instance for each
            const swiper = new Swiper(sliderEl, {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                centeredSlides: true,
                draggable: true,
                pagination: {
                    el: paginationEl,
                    clickable: true,
                },
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    767: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    1124: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                },
            });

            // Start/stop autoplay on hover
            swiper.autoplay.stop();

            sliderEl.addEventListener("mouseenter", () => {
                swiper.autoplay.start();
            });

            sliderEl.addEventListener("mouseleave", () => {
                swiper.autoplay.stop();
            });
        });
  
/*=============date picker mobile===============*/
  flatpickr(".datemobile", {
  dateFormat: "Y-m-d",
  disableMobile: true, // forces custom UI on mobile instead of native picker
});
/* ============= Tabs =========*/
document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".tablink");
  const tabContents = document.querySelectorAll(".tabcontent");
  tabLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      // Remove active class from all links and reset indicators
      tabLinks.forEach((l) => {
        l.classList.remove("active", "text-orange");
        l.classList.add("text-gray-500");
        const span = l.querySelector(".tab-indicator");
        if (span) {
          span.style.width = "0";
        }
      });
      // Hide all tab contents
      tabContents.forEach((content) => {
        content.classList.add("hidden");
      });
      // Activate current tab link
      this.classList.add("active", "text-orange");
      this.classList.remove("text-gray-500");
      // Show the current tab content
      const activeTab = document.getElementById(tabId);
      if (activeTab) {
        activeTab.classList.remove("hidden");
      }
      // Animate tab indicator
      const indicator = this.querySelector(".tab-indicator");
      if (indicator) {
        indicator.style.width = "40px"; // same as initial tab
      }
    });
  });
  // Trigger click on the initially active tab
  const initialTab = document.querySelector(".tablink.active");
  if (initialTab) {
    initialTab.click();
  }
});


/* ============= Custom Select Picker=========*/
$(document).ready(function () {
	'use strict';
	$("select").each(function () {
		'use strict';
		var $this = $(this),
			numberOfOptions = $(this).children("option").length;

		$this.addClass("select-hidden");
		$this.wrap('<div class="select"></div>');
		$this.after('<div class="select-styled"></div>');

		var $styledSelect = $this.next("div.select-styled");
		$styledSelect.text(
			$this
			.children("option")
			.eq(0)
			.text()
		);

		var $list = $("<ul />", {
			class: "select-options"
		}).insertAfter($styledSelect);

		for (var i = 0; i < numberOfOptions; i++) {
			$("<li />", {
				text: $this
					.children("option")
					.eq(i)
					.text(),
				rel: $this
					.children("option")
					.eq(i)
					.val()
			}).appendTo($list);
		}

		var $listItems = $list.children("li");

		$styledSelect.on('click' , function (e) {
			e.stopPropagation();
			$("div.select-styled.active")
				.not(this)
				.each(function () {
					$(this)
						.removeClass("active")
						.next("ul.select-options")
						.hide();
				});
			$(this)
				.toggleClass("active")
				.next("ul.select-options")
				.toggle();
		});

		$listItems.on('click' , function (e) {
			e.stopPropagation();
			$styledSelect.text($(this).text()).removeClass("active");
			$this.val($(this).attr("rel"));
			$list.hide();
			//console.log($this.val());
		});

		$(document).on('click' , function () {
			$styledSelect.removeClass("active");
			$list.hide();
		});
	});
});

/*==============show more paragraph==============*/
$(document).ready(function() {
  $('.see-more').on('click', function(e) {
    e.preventDefault(); // prevent any default anchor behavior
    $(this).closest('div').find('.more').slideDown(); // show the hidden paragraph
    $(this).hide(); // hide the "See more" link
  });
});

  $('.toggle-btn').on('click', function () {
  const targetClass = $(this).data('target'); // get the class from data-target
  const $targetList = $('.toggle-list.' + targetClass); // select the list

  if ($targetList.is(':visible')) {
    $targetList.slideUp();
  
  } else {
    $targetList.slideDown();
  }
});

/*=========== accordion================*/
document.addEventListener('DOMContentLoaded', () => {
    const defaultAccordionGroups = document.querySelectorAll('.accordion-group[data-accordion="default-accordion"]');
    const alwaysOpenAccordionGroup = document.querySelector('.accordion-group[data-accordion="always-open-accordion"]');
  
    if (defaultAccordionGroups) {
        defaultAccordion(defaultAccordionGroups);
    }
    if (alwaysOpenAccordionGroup) {
        alwaysOpenAccordion(alwaysOpenAccordionGroup);
    }
  
  });
  
  
  function defaultAccordion(defaultAccordionGroups) {
    defaultAccordionGroups.forEach(defaultAccordionGroup => {
        const accordionButtons = defaultAccordionGroup.querySelectorAll('.accordion-toggle');
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const accordion = button.parentElement;
                const content = button.nextElementSibling;
                const isOpen = content.style.maxHeight !== '';
  
                if (isOpen) {
                    close(button);
                    content.style.maxHeight = '';
                    accordion.classList.remove('active');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    accordion.classList.add('active');
                    accordionButtons.forEach(otherButton => {
                        if (otherButton !== button) {
                            const otherAccordion = otherButton.parentElement;
                            otherAccordion.classList.remove('active');
                            close(otherButton);
                        }
                    });
                }
            });
        });
    });
  }
  
  function close(element, accordion) {
    const content = element.nextElementSibling;
    content.style.maxHeight = '';
  }
  function alwaysOpenAccordion(alwaysOpenAccordionGroup) {
    const accordionButtons = alwaysOpenAccordionGroup.querySelectorAll('.accordion-toggle');
    console.log(accordionButtons.length);
    // var acc = document.getElementsByClassName("acc");
    var i;
  
    for (i = 0; i < accordionButtons.length; i++) {
        accordionButtons[i].addEventListener("click", function () {
            this.parentElement.classList.toggle("active");
            var acc_panel = this.nextElementSibling;
  
            if (acc_panel.style.maxHeight) {
                acc_panel.style.maxHeight = '';
            } else {
                acc_panel.style.maxHeight = acc_panel.scrollHeight + "px";
            }
        });
    }
  }
 
/*==================Modal=====================*/
const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modalTrigger");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const CloseButtons = document.querySelectorAll(".close-btn");
const overlay = document.querySelector(".overlay-modal");

modalTriggerButtons.forEach(elem => {
    elem.addEventListener("click", event => {
        const targetModalId = event.currentTarget.getAttribute("data-modal-target");

        // Close all modals before opening the target modal
        modals.forEach(modal => {
            if (modal.id !== targetModalId) {
                closeModal(modal.id, false); // Close without hiding the overlay
            }
        });

        toggleModal(targetModalId);

        // Show the overlay
        overlay.style.opacity = "1";
        overlay.style.zIndex = "200";
        overlay.style.visibility = "visible";
        overlay.style.transition = "opacity 0.3s ease";
    });
});

modalCloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals();
    });
});

CloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals();
    });
});

modals.forEach(elem => {
    elem.addEventListener("click", event => {
        if (event.currentTarget === event.target) closeModal(event.currentTarget.id, true);
    });
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" || event.keyCode === 27) {
        closeAllModals();
    }
});

// Toggle modal with animation
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    const isMobile = window.innerWidth <= 768;

    if (getComputedStyle(modal).display === "flex") {
        closeModal(modalId, true);
    } else {
        modal.style.display = "flex";
        modal.classList.remove("modal-hide", "modal-fade-in", "modal-slide-up");

        if (isMobile) {
            modal.classList.add("modal-slide-up");
        } else {
            modal.classList.add("modal-fade-in");
        }
    }
}

// Close modal
function closeModal(modalId, hideOverlay = true) {
    const modal = document.getElementById(modalId);
    const isMobile = window.innerWidth <= 768;

    if (modal) {
        modal.classList.remove("modal-fade-in", "modal-slide-up");

        if (isMobile) {
            modal.classList.add("modal-slide-down");
        } else {
            modal.classList.add("modal-hide");
        }

        setTimeout(() => {
            modal.classList.remove("modal-show", "modal-hide", "modal-slide-down");
            modal.style.display = "none";
        }, 300); // Match CSS animation duration
    }

    if (hideOverlay) {
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
        overlay.style.visibility = "hidden";
        overlay.style.transition = "opacity 0.3s ease";
    }
}

// Close all modals
function closeAllModals() {
    modals.forEach(modal => closeModal(modal.id, true));
}

/*============increment / decrement ============*/
 function increaseValue(button, limit) {
  const numberInput = button.parentElement.querySelector('.number');
  var value = parseInt(numberInput.innerHTML, 10);
  if(isNaN(value)) value = 0;
  if(limit && value >= limit) return;
  numberInput.innerHTML = value+1;
}


function decreaseValue(button) {
  const numberInput = button.parentElement.querySelector('.number');
  var value = parseInt(numberInput.innerHTML, 10);
  if(isNaN(value)) value = 0;  
  if(value < 1) return;
  numberInput.innerHTML = value-1;
}

/*=========hero mobile slider===========*/
 var swiper = new Swiper(".hero-mobile-slider", {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      draggable: true,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
      },
      breakpoints: {
        767: {
          slidesPerView: 1,
          spaceBetween: 10,
        },

        1124: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });

/*==========more exp mobile slider==========*/        
 var swiper = new Swiper(".mob-more-exp", {
      slidesPerView: "auto",
      spaceBetween: 14,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});
/*==========city top sight slider==========*/        
 var swiper = new Swiper(".city-top-sight", {
      slidesPerView: "auto",
      spaceBetween: 14,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});

/*==========discover slider==========*/        
 var swiper = new Swiper(".discover-type-slider", {
      slidesPerView: "auto",
      spaceBetween: 14,
     
});
/*==============mobile review slider================*/
  var swiper = new Swiper(".mob-review", {
      slidesPerView: "auto",
      spaceBetween: 14,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});
/*==============mobile big card city slider================*/

  var swiper = new Swiper(".big-card-slider", {
      slidesPerView: "auto",
      spaceBetween: 20,
     
});

  /*==============home tour guide slider================*/
  var swiper = new Swiper(".tour-home-globe", {
      slidesPerView: "auto",
      spaceBetween: 24,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    /*==============home tour feature slider================*/  
  var swiper = new Swiper(".tour-hero-feature", {
      slidesPerView: "auto",
      spaceBetween: 26,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
     /*==============cart tour expert mobile slider================*/  
       var swiper = new Swiper(".tour-expert-mobile", {
      slidesPerView: "auto",
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
     /*==============tour hero mobile slider================*/  
      var swiper = new Swiper(".tour-hero-mobile", {
      slidesPerView: "auto",
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
/*===================dropdown===================*/
$(document).ready(function () {
  $('.dropdown-toggle').on('click', function (e) {
    e.stopPropagation();
    const $menu = $(this).siblings('.dropdown-menu');
    const $menuprofile = $(this).siblings('.profile-dropdown-menu');
    const $closebtn = $(this).siblings('.close-profile-menu');

    $menu.toggle();
    $menuprofile.toggleClass('active');
  });

  $('.dropdown-menu').on('click', function (e) {
    e.stopPropagation();
  });

  $('.close-profile-menu').on('click', function (e) {
    $(this).closest('.profile-dropdown-menu').removeClass('active');
  });

  $(document).on('click', function () {
    // Re-select all profile dropdowns and deactivate
    $('.profile-dropdown-menu').removeClass('active');
    $('.dropdown-menu').hide();
  });
});


/*=====================sidebar==================*/
 $(document).ready(function() {
      const $sidebar = $('#sidebar');
      const overlay = document.querySelector('.overlay-modal');

      $('#openSidebar').on('click', function () {
        $sidebar.removeClass('translate-x-full');

        // Show the overlay using JS style
        overlay.style.opacity = "1";
        overlay.style.zIndex = "500";
        overlay.style.visibility = "visible";
        overlay.style.transition = "opacity 0.3s ease";
      });

      $('#closeSidebar, .overlay-modal').on('click', function () {
        $sidebar.addClass('translate-x-full');

        // Hide the overlay using JS style
        overlay.style.opacity = "0";
        overlay.style.zIndex = "200";
        overlay.style.visibility = "hidden";
      });
    });

 /*========date picker==============*/
 $(document).ready(function () {
  let fpInstances = {};

  function formatDate(fp, date) {
    return fp.formatDate(date, "F d, Y");
  }

  $(".form-date").each(function (index) {
    $(this).attr("data-index", index); // tag each input
  });

  $(".form-date").on("click", function (e) {
    e.stopPropagation();
    const $input = $(this);
    const index = $input.data("index");
    const $wrapper = $input.siblings(".custom-flatpickr-wrapper");

    const offset = $input.offset();
    $wrapper.css({
      display: "block",
      top: offset.top + $input.outerHeight(),
      left: offset.left,
      zIndex: 9999
    });

    const pickerEl = $wrapper.find(".inline-flatpickr")[0];

    // Use index as a unique key
    if (!fpInstances[index]) {
      const fp = flatpickr(pickerEl, {
        inline: true,
        mode: "range",
        showMonths: 2,
        dateFormat: "F d, Y",
        onChange: function (selectedDates) {
          if (selectedDates.length === 2) {
            const rangeStr = `${formatDate(fp, selectedDates[0])} to ${formatDate(fp, selectedDates[1])}`;
            $input.val(rangeStr);
            $wrapper.hide();
          }
        }
      });
      fpInstances[index] = fp;
    }

    // Hide on outside click
    $(document).off("mousedown.customPicker").on("mousedown.customPicker", function (e) {
      if (!$(e.target).closest(".custom-flatpickr-wrapper, .form-date").length) {
        $(".custom-flatpickr-wrapper").hide();
        $(document).off("mousedown.customPicker");
      }
    });
  });
});


/*=========hero modal image gallery ============*/
var swiper = new Swiper(".Provider-thumb", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 8,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".Provider-big-slider", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });

     var swiper = new Swiper(".Traveler-thumb", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 8,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".Traveler-big-slider", {
        loop: true,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });

   /*========search ==========*/
   $(document).ready(function() {
    $('#searchInput').on('input', function() {
        const inputValue = $(this).val().trim();
        if (inputValue.length > 0) {
            $('.results').removeClass('hidden');
        } else {
            $('.results').addClass('hidden');
        }
    });

    // Optional: Hide results when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#searchInput, .results').length) {
            $('.results').addClass('hidden');
        }
    });
}); 