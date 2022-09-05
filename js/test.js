/*
 *		Lambton College
 *		CSD 2103 - Front End Web Development II
 *		Term project
 *		Hugo Beltran Escarraga - C0845680
 *		Juan Luis Casanova Romero - C0851175
 */
 
var totalRules = 20;
var totalSigns = 20;
var arrayRules = [];
var arraySigns = [];
var checkRandom;
var checkEmail;
var jsonRules;
var jsonSigns;
var currentRules = 0;
var currentSigns = 0;
var currentQuestion;
var isCorrectAnswer = false;
var ansRight = 0;
var ansWrong = 0;
var correctRules = 0;
var correctSigns = 0;

async function loadJSON() {
  let responseRules = await fetch('../data/rules-questions.json');
  jsonRules = await responseRules.json();
  let responseSigns = await fetch('../data/signs-questions.json');
  jsonSigns = await responseSigns.json();

  if (jsonRules && jsonSigns) {
    init();
  };
}

function init() {
    getRulesList(Number(getCookie("rules-questions")));
    getSignsList(Number(getCookie("signs-questions")));
    checkRandom = getCookie("random") == "1" ? true : false;
    checkEmail = getCookie("send-email") == "1" ? true : false;
    randomIndex = [0, 1, 2, 3];
    displayQuestion();
    addListeners();
};

function addListeners() {
    var radios = document.getElementsByClassName("answer-radio");
    for (let item = 0; item < radios.length; item++) {
        radios[item].addEventListener("click", getAnswer);
    }
    document.getElementById("submit-btn").addEventListener("click", submitAction);
    document.getElementById("skip-btn").addEventListener("click", skipQuestion);
}

function setCookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
            {
                c_end=document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function getRulesList(numberRules) {
    let totalArrayRules = [];
    for(let i = 1; i<=totalRules; i++) {
        totalArrayRules.push(i);
    }
    for(let i = totalArrayRules.length - 1; i >= 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = totalArrayRules[j];
        totalArrayRules[j] = totalArrayRules[i];
        totalArrayRules[i] = temp;
    }
    for(let i = 0; i < numberRules; i++) {
        arrayRules.push(totalArrayRules[i]);
    }
}

function getSignsList(numberSigns) {
    let totalArraySigns = [];
    for(let i = 1; i<=totalSigns; i++) {
        totalArraySigns.push(i);
    }
    for(let i = totalArraySigns.length - 1; i >= 1; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = totalArraySigns[j];
        totalArraySigns[j] = totalArraySigns[i];
        totalArraySigns[i] = temp;
    }
    for(let i = 0; i < numberSigns; i++) {
        arraySigns.push(totalArraySigns[i]);
    }
}

function submitAction() {
    var submitBtn = document.getElementById("submit-btn");
    switch(submitBtn.value) {
        case "Submit Answer":
            checkAnswer();
            displayExplanation();
            submitBtn.value = "Next Question";
            if (currentRules == arrayRules.length && currentSigns == arraySigns.length) {
                submitBtn.value = "View Results";
            }
            break;
        case "Next Question":
            removeAnswerStyle();
            removeExplanationStyle();
            displayQuestion();
            submitBtn.value = "Submit Answer";
            break;
        case "View Results":
            setCookie("correct-rules", correctRules, 365);
            setCookie("correct-signs", correctSigns, 365);
            document.location = "result.html";
            break;
    }
}

function displayExplanation() {
    var radios = document.getElementsByClassName("answer-radio");
    for (let item = 0; item < radios.length; item++) {
        radios[item].disabled = true;
    }
    button = document.querySelector("#skip-btn");
    button.style.display = "none";
    document.getElementById("explanation").innerText = currentQuestion.explanation;
    explanation = document.querySelector(".answer-explanation");
    explanation.style.display = "block";
    if (isCorrectAnswer) {
        ansRight++;
        if (document.getElementById("category").innerText == "RULES") {
            correctRules++;
        }
        if (document.getElementById("category").innerText == "SIGNS") {
            correctSigns++;
        }
    }
    else {
        ansWrong++;
    }
    document.getElementById("correct").innerHTML = "Correct: " + ansRight;
    document.getElementById("incorrect").innerHTML = "Incorrect: " + ansWrong;
}

function displayQuestion() {
    button = document.querySelector(".submit-button");
    button.style.display = "none";
    var radios = document.getElementsByClassName("answer-radio");
    for (let item = 0; item < radios.length; item++) {
        radios[item].disabled = false;
        radios[item].checked = false;
    }
    explanation = document.querySelector(".answer-explanation");
    explanation.style.display = "none";
    button = document.querySelector("#skip-btn");
    button.style.display = "block";
	if (currentRules < arrayRules.length) {
		currentQuestion = jsonRules.questions[arrayRules[currentRules]];
		document.getElementById("category").innerText = "RULES";
		document.getElementById("text").innerText = jsonRules.questions[arrayRules[currentRules]].text;
		hideImage();
		shuffleIndexes();
		document.getElementById("answer-a-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[randomIndex[0]].text;
		document.getElementById("answer-b-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[randomIndex[1]].text;
		document.getElementById("answer-c-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[randomIndex[2]].text;
		document.getElementById("answer-d-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[randomIndex[3]].text;
		currentRules++;
		if (currentRules == arrayRules.length) {
			button.style.display = "none";
		}
	}
	else {
		if (currentSigns < arraySigns.length) {
			currentQuestion = jsonSigns.questions[arraySigns[currentSigns]];
			document.getElementById("category").innerText = "SIGNS";
			document.getElementById("text").innerText = jsonSigns.questions[arraySigns[currentSigns]].text;
			showImage(jsonSigns.questions[arraySigns[currentSigns]].reference);
			shuffleIndexes();
			document.getElementById("answer-a-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[randomIndex[0]].text;
			document.getElementById("answer-b-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[randomIndex[1]].text;
			document.getElementById("answer-c-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[randomIndex[2]].text;
			document.getElementById("answer-d-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[randomIndex[3]].text;
			currentSigns++;
			if (currentSigns == arraySigns.length) {
				button.style.display = "none";
			}
		}
	}
}

function shuffleIndexes() {
    for (let i = randomIndex.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = randomIndex[i];
        randomIndex[i] = randomIndex[j];
        randomIndex[j] = temp;
    }
    return randomIndex;
}

function skipQuestion() {
    button = document.querySelector(".submit-button");
    button.style.display = "none";
    var radios = document.getElementsByClassName("answer-radio");
    for (let item = 0; item < radios.length; item++) {
        radios[item].checked = false;
    }
    if (currentRules < arrayRules.length) {
        currentRules--;
        arrayRules.push(arrayRules[currentRules]);
        arrayRules.splice(currentRules, 1);
        currentQuestion = jsonRules.questions[arrayRules[currentRules]];
        document.getElementById("category").innerText = "RULES";
        document.getElementById("text").innerText = jsonRules.questions[arrayRules[currentRules]].text;
        hideImage();
        document.getElementById("answer-a-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[0].text;
        document.getElementById("answer-b-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[1].text;
        document.getElementById("answer-c-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[2].text;
        document.getElementById("answer-d-text").innerText = jsonRules.questions[arrayRules[currentRules]].answers[3].text;
        currentRules++;
    }
    else {
        if (currentSigns < arraySigns.length) {
            currentSigns--;
            arraySigns.push(arraySigns[currentSigns]);
            arraySigns.splice(currentSigns, 1);
            currentQuestion = jsonSigns.questions[arraySigns[currentSigns]];
            document.getElementById("category").innerText = "SIGNS";
            document.getElementById("text").innerText = jsonSigns.questions[arraySigns[currentSigns]].text;
            showImage(jsonSigns.questions[arraySigns[currentSigns]].reference);
            document.getElementById("answer-a-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[0].text;
            document.getElementById("answer-b-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[1].text;
            document.getElementById("answer-c-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[2].text;
            document.getElementById("answer-d-text").innerText = jsonSigns.questions[arraySigns[currentSigns]].answers[3].text;
            currentSigns++;
        }
    }
}

function getAnswer() {
    button = document.querySelector(".submit-button");
    button.style.display = "block";
}

function showImage(imageURL) {
    const imageContainer = document.querySelector(".image");
    const image = imageContainer.firstElementChild;
    image.src = imageURL;
    imageContainer.style.display = "block";
}

function hideImage() {
    const imageContainer = document.querySelector(".image");
    const image = imageContainer.firstElementChild;
    image.src = "";
    imageContainer.style.display = "none";
}

// Check Answer
function checkAnswer() {
    let selectedAnswer;
    const radios = document.getElementsByClassName("answer-radio");
    for (let item = 0; item < radios.length; item++) {
        if (radios[item].checked) {
            selectedAnswer = document.getElementById(`${radios[item].id}-text`);
            break;
        }
    }

    if (checkIsCorrect(selectedAnswer.innerText)) {
        addAnswerStyle(selectedAnswer.id, "success");
        addExplanationStyle("success");
    } else {
        addAnswerStyle(selectedAnswer.id, "danger");
        addExplanationStyle("danger");
    }
}

function checkIsCorrect(selectedAnswer) {
    let correctAnswer = currentQuestion.answers[0].text;
    isCorrectAnswer = selectedAnswer === correctAnswer ? true : false;
    return isCorrectAnswer;
}

// Answers and Explanation
function addAnswerStyle(answerLabel, answerStyle) {
    let answer = document.getElementById(answerLabel);
    answer.classList.add(answerStyle);
    addAnswerMark(answer, answerStyle);
}

function addExplanationStyle(ExplanationStyle) {
    let explanation = document.querySelector(".answer-explanation");
    explanation.classList.add(ExplanationStyle);
}

function removeAnswerStyle() {
    var answerLabels = document.getElementsByClassName("answer-label");
    for (let item = 0; item < answerLabels.length; item++) {
        if (answerLabels[item].classList.contains("danger")) {
            answerLabels[item].classList.remove("danger");
            removeAnswerMark(answerLabels[item]);
        }
        if (answerLabels[item].classList.contains("success")) {
            answerLabels[item].classList.remove("success");
            removeAnswerMark(answerLabels[item]);		
        }
    }
}

function removeExplanationStyle() {
    let answerExplanation = document.querySelector(".answer-explanation");

    if (answerExplanation.classList.contains("danger")) {
        answerExplanation.classList.remove("danger");
    }
    if (answerExplanation.classList.contains("success")) {
        answerExplanation.classList.remove("success");
    }
}

function addAnswerMark(answer, answerStyle) {
    let markContainer = document.createElement('div');
    if (answerStyle === "success") {
        markContainer.classList.add("success");
    }
    if (answerStyle === "danger") {
        markContainer.classList.add("danger");
    }
    answer.parentNode.insertBefore(markContainer, answer.nextSibling);
}

function removeAnswerMark(answer) {
    answer.parentNode.removeChild(answer.parentNode.lastElementChild);
}

window.onload = loadJSON();