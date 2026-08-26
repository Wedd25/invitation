/* ================= SCREEN NAVIGATION ================= */

const screens = document.querySelectorAll(".screen");


function goTo(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    document
        .getElementById(id)
        .classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (id === "reveal") {

        setTimeout(() => {

            setupScratch();

        }, 100);

    }

}


/* ================= OPEN INVITATION ================= */

function openInvitation() {

    const hero =
        document.getElementById("home");


    hero.classList.add("opened");


    setTimeout(() => {

        goTo("reveal");

    }, 1050);

}


/* ================= SCRATCH CARD ================= */

let scratchReady = false;

let revealed = false;


function setupScratch() {

    const canvas =
        document.getElementById("scratchCanvas");


    if (!canvas || scratchReady) {

        return;

    }


    const rect =
        canvas.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    const ctx =
        canvas.getContext("2d");


    ctx.scale(dpr, dpr);


    /* Scratch layer */

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );


    gradient.addColorStop(
        0,
        "#c99a55"
    );


    gradient.addColorStop(
        .5,
        "#f0c981"
    );


    gradient.addColorStop(
        1,
        "#a8753b"
    );


    ctx.fillStyle = gradient;


    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );


    /* Golden lines */

    ctx.fillStyle =
        "rgba(255,255,255,.35)";


    for (
        let i = -rect.height;
        i < rect.width + rect.height;
        i += 16
    ) {

        ctx.save();

        ctx.translate(i, 0);

        ctx.rotate(-0.6);

        ctx.fillRect(
            0,
            0,
            7,
            rect.height * 2
        );

        ctx.restore();

    }


    /* Text */

    ctx.fillStyle = "#fff7eb";

    ctx.textAlign = "center";


    ctx.font =
        "600 11px Montserrat";


    ctx.fillText(
        "SCRATCH HERE",
        rect.width / 2,
        rect.height / 2 - 3
    );


    ctx.font =
        "9px Montserrat";


    ctx.fillText(
        "✦ 26 SEPTEMBER 2026 ✦",
        rect.width / 2,
        rect.height / 2 + 16
    );


    let drawing = false;


    function scratch(e) {

        if (!drawing || revealed) {

            return;

        }


        const r =
            canvas.getBoundingClientRect();


        const x =
            e.clientX - r.left;


        const y =
            e.clientY - r.top;


        ctx.globalCompositeOperation =
            "destination-out";


        ctx.beginPath();


        ctx.arc(
            x,
            y,
            22,
            0,
            Math.PI * 2
        );


        ctx.fill();


        checkReveal();

    }


    canvas.addEventListener(
        "pointerdown",
        e => {

            drawing = true;

            scratch(e);

        }
    );


    canvas.addEventListener(
        "pointermove",
        scratch
    );


    window.addEventListener(
        "pointerup",
        () => {

            drawing = false;

        }
    );


    scratchReady = true;

}


/* ================= CHECK SCRATCH ================= */

function checkReveal() {

    const canvas =
        document.getElementById(
            "scratchCanvas"
        );


    const ctx =
        canvas.getContext("2d");


    const data =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;


    let transparent = 0;


    for (
        let i = 3;
        i < data.length;
        i += 16
    ) {

        if (data[i] < 40) {

            transparent++;

        }

    }


    const ratio =
        transparent /
        (data.length / 16);


    if (
        ratio > .48 &&
        !revealed
    ) {

        revealed = true;


        document
            .getElementById(
                "marriedMessage"
            )
            .classList.add("show");


        canvas.style.transition =
            "opacity .7s";


        canvas.style.opacity = "0";

    }

}


/* ================= SOUND ================= */

function toggleSound() {

    const music = document.getElementById("weddingMusic");

    if (music.paused) {

        music.play();

        document.querySelectorAll(".sound-btn").forEach(button => {
            button.textContent = "♫";
        });

    } else {

        music.pause();

        document.querySelectorAll(".sound-btn").forEach(button => {
            button.textContent = "🔇";
        });

    }

}



/* ================= TOAST ================= */

function showToast(text) {

    const toast =
        document.getElementById("toast");


    toast.textContent = text;


    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2800);

}