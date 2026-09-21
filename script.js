/* =========================
   BASIC NAVIGATION
========================= */

const modal = document.getElementById("modal");

function go(id){
    document.getElementById(id).scrollIntoView({
        behavior:"smooth"
    });
}


/* =========================
   YES BUTTON
========================= */

function yes(){

    document.getElementById("mt").textContent =
        "Yay, Lydia! ❤️";

    document.getElementById("mx").textContent =
        "Now just tell me which day works for you 😄";

    document.getElementById("modalBack").textContent =
        "Let's do this 😊";

    modal.style.display = "grid";

    confetti();

}


/* =========================
   PLAYFUL NO SEQUENCE
========================= */

let noCount = 0;

function maybe(){

    noCount++;

    const title =
        document.getElementById("mt");

    const message =
        document.getElementById("mx");

    const backButton =
        document.getElementById("modalBack");

    const noBtn =
        document.getElementById("noBtn");


    /* FIRST TIME */

    if(noCount === 1){

        title.textContent =
            "Wait… already? 😭";

        message.textContent =
            "You clicked convince me before I even finished my case 😂";

        backButton.textContent =
            "Okay, continue 👀";

        noBtn.textContent =
            "Still thinking... 😂";
    }


    /* SECOND TIME */

    else if(noCount === 2){

        title.textContent =
            "Lydia, hear me out 😌";

        message.textContent =
            "Good conversation, a little fresh air, and absolutely no complicated agenda. Surely that deserves a chance? 😂";

        backButton.textContent =
            "Hmm… maybe 👀";

        noBtn.textContent =
            "You are stubborn 😂";
    }


    /* THIRD TIME */

    else if(noCount === 3){

        title.textContent =
            "Final argument… 🎤😂";

        message.textContent =
            "I promise I'm not asking for anything dramatic. Just one simple hangout and a chance to finish that conversation properly.";

        backButton.textContent =
            "I'll think about it 😌";

        noBtn.textContent =
            "Last chance 👀";
    }


    /* FINAL NO */

    else{

        title.textContent =
            "Fair enough 😌";

        message.textContent =
            "No pressure at all. Take your time — the invitation stays open.";

        backButton.textContent =
            "Back";

        noBtn.textContent =
            "Maybe another time 😌";
    }


    modal.style.display = "grid";

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal(){

    modal.style.display = "none";
}


/* =========================
   MUSIC
========================= */

let ctx;
let playing = false;
let timer;

const musicButton =
    document.getElementById("music");


musicButton.onclick = () => {

    playing = !playing;

    if(!ctx){

        ctx = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    }


    if(playing){

        ctx.resume();

        music();

        musicButton.textContent =
            "♫ Playing";

    }

    else{

        ctx.suspend();

        musicButton.textContent =
            "♫ Music";

    }

};


function music(){

    if(!playing) return;


    const notes = [
        261.6,
        329.6,
        392,
        329.6,
        293.7,
        349.2,
        440,
        349.2
    ];


    const note =
        notes[Math.floor(Math.random() * notes.length)];


    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.frequency.value =
        note;

    oscillator.type =
        "sine";


    gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.035,
        ctx.currentTime + 0.12
    );


    gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 1.8
    );


    oscillator.connect(gain);

    gain.connect(ctx.destination);


    oscillator.start();

    oscillator.stop(
        ctx.currentTime + 2
    );


    timer =
        setTimeout(music,700);

}


/* =========================
   CONFETTI
========================= */

function confetti(){

    for(let i = 0; i < 55; i++){

        const piece =
            document.createElement("span");


        piece.textContent =
            Math.random() > .5
            ? "♥"
            : "✦";


        piece.style.position =
            "fixed";

        piece.style.left =
            "50%";

        piece.style.top =
            "45%";

        piece.style.zIndex =
            "120";

        piece.style.color =
            "#ff6aaa";

        piece.style.fontSize =
            `${12 + Math.random() * 14}px`;

        piece.style.pointerEvents =
            "none";


        document.body.appendChild(piece);


        const x =
            (Math.random() - .5) * 650;

        const y =
            200 + Math.random() * 500;

        const rotation =
            Math.random() * 900;


        piece.animate(

            [
                {
                    transform:
                        "translate(0,0) scale(1)",
                    opacity:1
                },

                {
                    transform:
                        `translate(${x}px,${y}px)
                         rotate(${rotation}deg)
                         scale(.3)`,

                    opacity:0
                }
            ],

            {
                duration:
                    1300 + Math.random() * 900,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"
            }

        ).onfinish = () =>
            piece.remove();

    }

}


/* =========================
   SCROLL ANIMATIONS
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold:.15
        }

    );


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================
   MODAL BACKDROP
========================= */

modal.addEventListener("click", event => {

    if(event.target === modal){

        closeModal();

    }

});
