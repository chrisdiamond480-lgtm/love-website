const noButton = document.querySelector(".no");
const yesButton = document.querySelector(".yes");

const mainContainer = document.querySelector(".container");
const videoContainer = document.querySelector(".video-container");
const loveVideo = document.querySelector("#loveVideo");

const replayButton = document.querySelector(".replay");



/* -------------------------
   NO BUTTON - MOBILE SAFE
------------------------- */

noButton.addEventListener("click", function() {

    const margin = 25;

    // Use the actual available viewport
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

    // Prepare button for movement
    noButton.style.position = "fixed";

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const yesRect = yesButton.getBoundingClientRect();

    const maxX = screenWidth - buttonWidth - margin;
    const maxY = screenHeight - buttonHeight - margin;

    let found = false;
    let x = margin;
    let y = margin;

    // Try up to 100 safe positions
    for (let i = 0; i < 100; i++) {

        const testX =
            margin + Math.random() * Math.max(0, maxX - margin);

        const testY =
            margin + Math.random() * Math.max(0, maxY - margin);

        const noRect = {
            left: testX,
            right: testX + buttonWidth,
            top: testY,
            bottom: testY + buttonHeight
        };

        const overlaps = !(
            noRect.right < yesRect.left ||
            noRect.left > yesRect.right ||
            noRect.bottom < yesRect.top ||
            noRect.top > yesRect.bottom
        );

        if (!overlaps) {
            x = testX;
            y = testY;
            found = true;
            break;
        }
    }

    // Keep the button inside the viewport regardless
    x = Math.max(margin, Math.min(x, maxX));
    y = Math.max(margin, Math.min(y, maxY));

    noButton.style.left = Math.round(x) + "px";
    noButton.style.top = Math.round(y) + "px";

});

/* -------------------------
   HEART BURST
------------------------- */

function createHeartBurst() {

    const yesRect = yesButton.getBoundingClientRect();

    const heartSymbols = [
        "❤️",
        "💗",
        "💖",
        "💕",
        "💓"
    ];

    for (let i = 0; i < 14; i++) {

        const heart = document.createElement("span");

        heart.className = "heart-burst";

        heart.textContent =
            heartSymbols[
                Math.floor(
                    Math.random() *
                    heartSymbols.length
                )
            ];


        /* Start from YES button */
        heart.style.left =
            yesRect.left +
            yesRect.width / 2 +
            "px";

        heart.style.top =
            yesRect.top +
            yesRect.height / 2 +
            "px";


        /* Random direction */
        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            70 +
            Math.random() *
            130;


        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        heart.style.setProperty(
            "--x",
            x + "px"
        );

        heart.style.setProperty(
            "--y",
            y + "px"
        );


        /* Random rotation */
        heart.style.setProperty(
            "--rotation",
            Math.random() * 120 - 60 + "deg"
        );


        /* Random size */
        heart.style.fontSize =
            18 +
            Math.random() * 16 +
            "px";


        document.body.appendChild(heart);


        setTimeout(function() {
            heart.remove();
        }, 1000);

    }
}


/* -------------------------
   YES BUTTON
------------------------- */

yesButton.addEventListener("click", function() {

    /* Heart burst */
    createHeartBurst();


    /* Fade away main screen */
    mainContainer.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    mainContainer.style.opacity = "0";

    mainContainer.style.transform =
        "scale(0.96)";


    /* Wait for fade */
    setTimeout(function() {

        videoContainer.classList.add("show");

        loveVideo.currentTime = 0;

        setTimeout(function() {

            loveVideo.play();

        }, 300);

    }, 800);

});


/* -------------------------
   VIDEO FINISHED
------------------------- */

loveVideo.addEventListener("ended", function() {

    /*
       Wait a tiny moment after the
       video ends before showing the message.
    */

    setTimeout(function() {

        videoContainer.classList.add("finished");

    }, 500);

});


/* -------------------------
   EXPERIENCE AGAIN
------------------------- */

replayButton.addEventListener("click", function() {

    videoContainer.classList.remove("finished");
    videoContainer.classList.remove("show");

    loveVideo.pause();
    loveVideo.currentTime = 0;

    // Restore the main screen
    mainContainer.style.transition = "opacity 0.8s ease";
    mainContainer.style.opacity = "1";

    // IMPORTANT: Remove transform completely
    mainContainer.style.removeProperty("transform");

    // Reset NO button positioning
    noButton.removeAttribute("style");

});