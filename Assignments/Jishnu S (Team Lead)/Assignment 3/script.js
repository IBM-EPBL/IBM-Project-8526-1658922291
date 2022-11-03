console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const previousCardE2 = cardsContainerEl.querySelector(".previous--card--1");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");
	const nextCardE2 = cardsContainerEl.querySelector(".next--card--1");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const previousBgImageE2 = appBgContainerEl.querySelector(".previous--image--1");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");
	const nextBgImageE2 = appBgContainerEl.querySelector(".next--image--1");

	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		previousCardE2.classList.remove("previous--card--1");
		nextCardEl.classList.remove("next--card");
		nextCardE2.classList.remove("next--card--1");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		previousBgImageE2.classList.remove("previous--image--1");
		nextBgImageEl.classList.remove("next--image");
		nextBgImageE2.classList.remove("next--image--1");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			previousCardE2.style.zIndex = "25";
			nextCardEl.style.zIndex = "30";
			nextCardE2.style.zIndex = "35";

			nextBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("previous--card");
			previousCardEl.classList.add("previous--card--1");
			previousCardE2.classList.add("next--card");
			nextCardEl.classList.add("next--card--1");
			nextCardE2.classList.add("current--card");

			currentBgImageEl.classList.add("previous--image");
			previousBgImageE2.classList.add("previous--image--1");
			previousBgImageEl.classList.add("next--image");
			nextBgImageEl.classList.add("next--image--1");
			nextBgImageE2.classList.add("current--image");


		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			previousCardE2.style.zIndex = "35";
			nextCardEl.style.zIndex = "20";
			nextCardE2.style.zIndex = "25";

			previousBgImageEl.style.zIndex = "-1";

			currentCardEl.classList.add("next--card");
			previousCardE2.classList.add("previous--card");
			previousCardEl.classList.add("current--card");
			nextCardEl.classList.add("next--card--1");
			nextCardE2.classList.add("previous--card--1");

			currentBgImageEl.classList.add("next--image");
			previousBgImageE2.classList.add("previous--image");
			previousBgImageEl.classList.add("current--image");
			nextBgImageEl.classList.add("next--image--1");
			nextBgImageE2.classList.add("previous--image--1");
		
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let previousInfoE2 = cardInfosContainerEl.querySelector(".previous--info--1");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");
	let nextInfoE2 = cardInfosContainerEl.querySelector(".next--info--1");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? (nextInfoEl.querySelectorAll(".text") && nextInfoE2.querySelectorAll(".text"))
		: (previousInfoEl.querySelectorAll(".text") && previousInfoE2.querySelectorAll(".text")) ,
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		previousInfoE2.classList.remove("previous--info--1");
		nextInfoEl.classList.remove("next--info");
		nextInfoE2.classList.remove("next--info--1");

		if (direction === "right") {
			currentInfoEl.classList.add("previous--info");
			nextInfoEl.classList.add("current--info");
			nextInfoE2.classList.add("next--info");
			previousInfoEl.classList.add("previous--info--1");
			previousInfoE2.classList.add("next--info--1");
		} else if (direction === "left") {
			currentInfoEl.classList.add("next--info");
			nextInfoEl.classList.add("next--info--1");
			nextInfoE2.classList.add("previous--info--1");
			previousInfoEl.classList.add("current--info");
			previousInfoE2.classList.add("previous--info");
		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0.8,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


