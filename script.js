/* ==============================
   LANGUAGE DATA
============================== */

const noImages = [
    "public/images/no1.gif",
    "public/images/no2.gif",
    "public/images/no3.gif",
    "public/images/no4.gif",
    "public/images/no5.gif"
];

const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Think again?",
        "Please give me a chance!",
        "Ok... let's start over.."
    ],
    french: [
        "Non",
        "Tu es sûr ?",
        "Réfléchis encore?",
        "Donne-moi une chance!",
        "D'accord, recommençons.."
    ],
    thai: [
        "ไม่อ่ะ",
        "แน่ใจจริงๆหรอ?",
        "ลองคิดดูอีกทีสิ",
        "ขอโอกาสหน่อยนะ",
        "โอเค เริ่มใหม่ก็ได้"
    ]
};

const answers_yes = {
    english: "Yes",
    french: "Oui",
    thai: "เย่"
};

/* ==============================
   GLOBAL VARIABLES
============================== */

let language = "english";
let noIndex = 0;
let yesSize = 50;

const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");
const banner = document.getElementById("bannerImage");

/* ==============================
   NO BUTTON LOGIC
============================== */

noButton.addEventListener("click", () => {

    // ✅ Change banner image EVERY click (RANDOM)
    const randomImage = noImages[Math.floor(Math.random() * noImages.length)];
    banner.src = randomImage;
    refreshBanner();

    // ✅ Enlarge YES button randomly
    const growSizes = [30, 40, 50];
    const randomGrow = growSizes[Math.floor(Math.random() * growSizes.length)];
    yesSize += randomGrow;

    yesButton.style.height = yesSize + "px";
    yesButton.style.width = yesSize + "px";

    // ✅ Change NO text
    const total = answers_no[language].length;

    if (noIndex < total - 1) {
        noIndex++;
        noButton.innerHTML = answers_no[language][noIndex];
    } else {
        resetButtons();
    }
});

/* ==============================
   YES BUTTON LOGIC
============================== */

yesButton.addEventListener("click", () => {

    banner.src = "public/images/yes.gif";
    refreshBanner();

    document.querySelector(".buttons").style.display = "none";

    // Show scenario selection
    showMainChoices();
});

/* ==============================
   CATEGORY BANNERS
============================== */




/* ==============================
   SCENARIO FLOW
============================== */
function showMainChoices() {

    const container = document.querySelector(".container");

    const scenarioHTML = `
        <div id="step-1">
            <h2>Choose our romantic plan 💕</h2>

            <button class="scenario-btn" onclick="chooseMain('dinner')">
                Romantic Dinner 🍽️
            </button>

            <button class="scenario-btn" onclick="chooseMain('movie')">
                Movie Night 🎬
            </button>

            <button class="scenario-btn" onclick="chooseMain('travel')">
                Travel Together ✈️
            </button>
        </div>

        <div id="step-2" style="display:none;"></div>

        <div id="final-message" style="display:none;">
            <h2 id="final-text"></h2>
        </div>
    `;

    container.insertAdjacentHTML("beforeend", scenarioHTML);
}




function chooseMain(type) {

    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");

    step1.remove();
    step2.style.display = "block";
    step2.innerHTML = "";

    if (type === "dinner") {
        step2.innerHTML = `
            <h3>What should we eat for our romantic dinner? 🍽️</h3>

            <button class="scenario-btn"
                onclick="finalChoice('Jollibee Chickenjoy Date ❤️', 'public/images/dinner1.gif')">
                Jollibee 🍗
            </button>

            <button class="scenario-btn"
                onclick="finalChoice('McDo Burger & Fries Date 🍟', 'public/images/dinner2.gif')">
                McDo 🍔
            </button>

            <button class="scenario-btn"
                onclick="finalChoice('Mang Inasal Unli Rice Date 🍚', 'public/images/dinner3.gif')">
                Mang Inasal 🍗🍚
            </button>
        `;
    }

    else if (type === "movie") {
        step2.innerHTML = `
            <h3>What movie should we watch? 🎬</h3>

            <button class="scenario-btn"
                onclick="finalChoice('Watching The Notebook 💕', 'public/images/movie1.gif')">
                The Notebook 💕
            </button>

            <button class="scenario-btn"
                onclick="finalChoice('Watching Titanic 🚢', 'public/images/movie2.gif')">
                Titanic 🚢
            </button>

            <button class="scenario-btn"
                onclick="finalChoice('Watching Your Name 🎌', 'public/images/movie3.gif')">
                Your Name 🎌
            </button>
        `;
    }

    else if (type === "travel") {
        step2.innerHTML = `
            <h3>Where should we travel? ✈️</h3>

            <button class="scenario-btn"
                onclick="finalChoice('Maglalakad sa Baguio', 'public/images/travel1.gif')">
                Lakad sa Baguio
            </button>

            <button class="scenario-btn"
                onclick="finalChoice('Iikot sa SM', 'public/images/travel2.gif')">
                Iikot sa SM Urdaneta
            </button>

            <button class="scenario-btn"
                onclick="finalChoice('Window Shooping sa SM rosales haha', 'public/images/travel3.gif')">
                kunwari shopping sa SM Rosales
            </button>
        `;
    }
}



/* ==============================
   RESET FUNCTION
============================== */

function resetButtons() {
    noIndex = 0;
    yesSize = 50;

    noButton.innerHTML = answers_no[language][0];
    yesButton.innerHTML = answers_yes[language];

    yesButton.style.height = "50px";
    yesButton.style.width = "50px";
}

function finalChoice(choice, imagePath) {

    const step2 = document.getElementById("step-2");
    const finalMessage = document.getElementById("final-message");
    const finalText = document.getElementById("final-text");

    // 🔥 Set specific banner based on clicked choice
    banner.src = imagePath;
    refreshBanner();

    step2.style.display = "none";
    finalMessage.style.display = "block";

    finalText.innerHTML = `
        It's a date! 🥰 <br><br>
        Our Valentine plan:<br>
        <strong>${choice}</strong><br><br>
        I can't wait to see you 💕
    `;
}


/* ==============================
   LANGUAGE SWITCHER
============================== */

function changeLanguage() {

    language = document.getElementById("language-select").value;

    const questionHeading = document.getElementById("question-heading");

    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin ?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    resetButtons();
}

/* ==============================
   FORCE GIF REFRESH
============================== */

function refreshBanner() {
    const src = banner.src;
    banner.src = "";
    banner.src = src;
}
