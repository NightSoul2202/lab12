'use strict';

let words = [
    { word: "Apple", translation: "Яблуко" },
    { word: "Banana", translation: "Банан" },
    { word: "Carrot", translation: "Морква" }
];

let wordsMedium = [
    { word: "Apple", translation: "Яблуко" },
    { word: "Banana", translation: "Банан" },
    { word: "Carrot", translation: "Морква" },
    { word: "Orange", translation: "Апельсин" },
    { word: "Grape", translation: "Виноград" },
    { word: "Strawberry", translation: "Полуниця" }
];

let wordsHard = [
    { word: "Apple", translation: "Яблуко" },
    { word: "Banana", translation: "Банан" },
    { word: "Carrot", translation: "Морква" },
    { word: "Orange", translation: "Апельсин" },
    { word: "Grape", translation: "Виноград" },
    { word: "Strawberry", translation: "Полуниця" },
    { word: "Plum", translation: "Слива" },
    { word: "Watermelon", translation: "Кавун" },
    { word: "Melon", translation: "Диня" },
    { word: "Pomegranate", translation: "Гранат" },
    { word: "Lemon", translation: "Лимон" },
    { word: "Apricot", translation: "Абрикос" }
];

let currentDifficult = "easy";
let currentWords = words;

let usedIndexes = [];

let currentIndex = 0;
let indexWord = 0;
let correctCount = 0;
let incorrectCount = 0;

function resetGame() {
    usedIndexes = [];
    currentIndex = 0;
    indexWord = 1;
    correctCount = 0;
    incorrectCount = 0;
    $("#correct-count").text("0");
    $("#incorrect-count").text("0");
    $("#CardBox").text(currentWords[currentIndex].word);
    $('#MainH').text('DuoRoma - Крок ' + indexWord + '/' + currentWords.length);
}

function changeWords(currentDifficult)
{
    if(currentDifficult == "medium") currentWords = wordsMedium;
    else if(currentDifficult == "hard") currentWords = wordsHard;
    else currentWords = words;
}

$(document).ready(function () {

    $('input[type="radio"]').on('change', function() {
        currentDifficult = $('input[name="radioButton"]:checked').attr("id").replace("Button", "").toLowerCase();
        changeWords(currentDifficult);
        resetGame();
    });

    $("#ButtonOk").on("click", function () {
        let inputNickValue = $("#InputNick").val();
        if (inputNickValue === "") {
            alert("Рядок з нікнеймом не може бути пустим!");
        } else {
            $("#Modal").css("display", "none");
            $("#UserName").text(inputNickValue);
        }
    });

    $("#ButtonRestart").on("click", function (){
        $("#WinnerWindow").css("display", "none");
        resetGame();
    });

    function getRandomWord() {
        return currentWords[Math.floor(Math.random() * currentWords.length)];
    }

    function showNextWord() {
        let wordObject = getRandomWord();
        
        let newIndex = currentWords.indexOf(wordObject);
        while (usedIndexes.includes(newIndex)) {
            wordObject = getRandomWord();
            newIndex = currentWords.indexOf(wordObject);
        }

        $('#CardBox').text(wordObject.word);
        $('#AnswerInput').val('');

        usedIndexes.push(newIndex);
        currentIndex = newIndex;
        indexWord++;
        
        $('#MainH').text('DuoRoma - Крок ' + indexWord + '/' + currentWords.length);
    }
    
    showNextWord();

    $('#CardBox').on('click', function () {
        let userAnswer = $('#Answer').val().trim().toLowerCase();
        let correctAnswer = currentWords[currentIndex].translation.toLowerCase();

        console.log(currentIndex);

        console.log(correctAnswer);

        if(userAnswer == "")
        {
            alert("Надайте відповідь");
            return;
        }

        if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            incorrectCount++;
        }

        $('#correct-count').text(correctCount);
        $('#incorrect-count').text(incorrectCount);

        $('#Answer').val('');

        if (indexWord < currentWords.length) {
            showNextWord();
        } else {
            $("#WinnerWindow").css("display", "flex");
            $("#LabelWinner").text('Рівень знань мови: ' + ((correctCount / currentWords.length) * 100).toFixed(2) + '%');
        }
    });
});

    