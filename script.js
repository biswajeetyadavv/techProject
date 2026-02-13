var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

// Array of random paragraphs for different frames
const paragraphs = {
  frame1: [
    // "Every moment with you feels like a beautiful dream come true.",
    // "You are the reason my heart beats a little faster every single day.",
    // "In a world of chaos, you are my perfect peace and harmony.",
    // "Your smile lights up my entire world like nothing else can.",
    "I fall in love with you a little bit more each passing day.",
    // "You make my life infinitely more beautiful and meaningful.",
    // "With you, I found not just love, but my soulmate and best friend.",
    // "Every day spent with you is a blessing I treasure forever."
  ],
  frame2: [
    // "The way you laugh is my favorite sound in the entire world.",
    // "Your presence alone makes everything feel right and complete.",
    "I am grateful for every single moment I get to spend with you.",
    // "You are my greatest adventure and deepest love all at once.",
    // "My heart chose you before my mind even understood why.",
    // "Being with you feels like coming home to where I belong.",
    // "You are the missing piece I didn't know I was looking for.",
    "Every dream I have is better when you're in it with me."
  ],
  frame3: [
    "Time feels like it stops when I'm looking into your eyes.",
    // "You make ordinary days feel absolutely extraordinary and magical.",
    "My love for you grows stronger with each passing moment.",
    // "You are the reason I believe in true love and forever.",
    // "In your arms, I found my safe place and my forever home.",
    // "You paint my life with colors I never knew existed before.",
    // "Every word you speak touches my heart in the deepest way.",
    // "You are everything I ever wanted and so much more besides."
  ],
  frame4: [
    // "Thank you for being the light in my darkest moments.",
    // "With you, I discovered what it truly means to love someone.",
    "You are my favorite person and my greatest blessing.",
    // "My love for you is deeper than any ocean in this world.",
    // "You make me want to be a better version of myself every day.",
    // "In your smile, I see my entire future and my happiness.",
    "You changed my life in ways I never thought possible.",
    // "Every heartbeat whispers your name with pure love and devotion."
  ]
};










// Function to get a random paragraph from an array
function getRandomParagraph(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Store selected paragraphs for consistency during animation
let selectedParagraphs = {
  frame1: getRandomParagraph(paragraphs.frame1),
  frame2: getRandomParagraph(paragraphs.frame2),
  frame3: getRandomParagraph(paragraphs.frame3),
  frame4: getRandomParagraph(paragraphs.frame4)
};

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonContainer = document.getElementById("buttonContainer");

// const noButton = document.getElementById("noButton");
// const yesButton = document.getElementById("yesButton");

const modal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const loveVideo = document.getElementById("loveVideo");

/* 💔 NO button runs away */
noButton.addEventListener("mouseover", moveButton);
noButton.addEventListener("click", moveButton);

function moveButton() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (screenHeight - buttonHeight));

    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
}

/* ❤️ YES button shows video */
yesButton.addEventListener("click", () => {
    modal.style.display = "flex";
    loveVideo.play();
});

/* ❌ Close modal */
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    loveVideo.pause();
    loveVideo.currentTime = 0;
});


yesButton.addEventListener("click", () => {
  yesButton.textContent = "loading...";
  fetch('send_mail.php')
    .then(response => {
      if (response.ok) {
        yesButton.textContent = "Check Your Email 🙃";
        noButton.style.display = "none";
      } else {
        console.error('Failed to send email');
        yesButton.textContent = "Yes";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      yesButton.textContent = "Yes";
    });
});

// Move the No button away when user tries to interact with it
noButton.addEventListener("mouseover", () => {
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);
  
  noButton.style.position = "fixed";
  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";
  noButton.style.transform = "translate(-50%, -50%)";
});

noButton.addEventListener("click", (e) => {
  e.preventDefault();
  const randomX = Math.random() * (window.innerWidth - 100);
  const randomY = Math.random() * (window.innerHeight - 100);
  
  noButton.style.position = "fixed";
  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";
  noButton.style.transform = "translate(-50%, -50%)";
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

// Helper function to wrap text for mobile
function wrapText(text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + (currentLine ? " " : "") + words[i];
        const metrics = context.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines;
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); // Adjust font size based on screen width
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // glow effect
    context.shadowColor = "rgb(174, 30, 152)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    if(frameNumber < 250){

    let fadeInDuration = 125;
    let fadeOutDuration = 125;

    let localFrame = frameNumber;

    if(localFrame <= fadeInDuration){
        opacity = localFrame / fadeInDuration;  // fade in
    } else {
        opacity = 1 - ((localFrame - fadeInDuration) / fadeOutDuration); // fade out
    }

    opacity = Math.max(0, Math.min(opacity, 1));

    context.fillStyle = `rgba(174, 30, 152, ${opacity})`;
    context.fillText("first click somewhere! ❤", canvas.width/2, canvas.height/2);
}

    //fades out the text by decreasing the opacity
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;
        
        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame1, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame1, canvas.width/2, canvas.height/2);
        }
        opacity = opacity - 0.01;
    }

    //needs this if statement to reset the opacity before next statement on canvas
    if(frameNumber == 500){
        opacity = 0;
    }
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;

        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame2, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame2, canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;
        
        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame2, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame2, canvas.width/2, canvas.height/2);
        }

        opacity = opacity - 0.01;
    }

    if(frameNumber == 1000){
        opacity = 0;
    }
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;
        
        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame3, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame3, canvas.width/2, canvas.height/2);
        }
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;
        
        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame3, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame3, canvas.width/2, canvas.height/2);
        }
        opacity = opacity - 0.01;
    }

    if(frameNumber == 1500){
        opacity = 0;
    }
    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;
        
        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame4, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame4, canvas.width/2, canvas.height/2);
        }
        opacity = opacity + 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;
        
        if (window.innerWidth < 600) {
            const lines = wrapText(selectedParagraphs.frame4, canvas.width - 40);
            drawTextWithLineBreaks(lines, canvas.width / 2, canvas.height / 2 - 40, fontSize, lineHeight);
        } else {
            context.fillText(selectedParagraphs.frame4, canvas.width/2, canvas.height/2);
        }
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2000){
        opacity = 0;
    }
    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["In a universe of infinite possibilities,", "you are my favorite outcome."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("In a universe of infinite possibilities, you are my favorite outcome.", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["In a universe of infinite possibilities,", "you are my favorite outcome."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("In a universe of infinite possibilities, you are my favorite outcome.", canvas.width/2, canvas.height/2);
        }
        
        opacity = opacity - 0.01;
    }

    if(frameNumber == 2500){
        opacity = 0;
    }
    if(frameNumber > 2500 && frameNumber < 99999){
        context.fillStyle = `rgb(174, 30, 152, ${opacity})`;

        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much Pratima, more than", "all the time and space in the universe can contain"], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much Pratima, more than all the time and space in the universe can contain", canvas.width/2, canvas.height/2);
        }

        opacity = opacity + 0.01;
    }
    
    if(frameNumber >= 2750 && frameNumber < 99999){
        context.fillStyle = `rgb(174, 30, 152, ${secondOpacity})`;


        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["and I can't wait to spend all the time in", "the world to share that love with you!"], canvas.width / 2, (canvas.height/2 + 60), fontSize, lineHeight);
        } else {
            context.fillText("and I can't wait to spend all the time in the world to share that love with you!", canvas.width/2, (canvas.height/2 + 50));
        }

        secondOpacity = secondOpacity + 0.01;
    }

    if(frameNumber >= 3000 && frameNumber < 99999){
        context.fillStyle = `rgb(174, 30, 152, ${thirdOpacity})`;
        context.fillText("Will You be my Valentine?", canvas.width/2, (canvas.height/2 + 120));
        thirdOpacity = thirdOpacity + 0.01;

        buttonContainer.style.display = "flex";
    }   

     // Reset the shadow effect after drawing the text
     context.shadowColor = "transparent";
     context.shadowBlur = 0;
     context.shadowOffsetX = 0;
     context.shadowOffsetY = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);



