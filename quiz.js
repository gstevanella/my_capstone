
const questions = [
    {
        question: "What's the amount of greenhouse gas emissions generated annually by various social network videos",
        optionA: "40 MtCO2e",
        optionB: "56 MtCO2e",
        optionC: "59 MtCO2e",
        optionD: "29.5 MtCO2e",
        correctOption: "optionB"
    },

    {
        question: "What's the key principle of the 2022 Digital Services Act (DSA)",
        optionA: "Goods and services should be available globally via the internet",
        optionB: "Everybody should be able to stay anonymous online",
        optionC: "Large tech companies should not be allowed a monopoly on the online markets",
        optionD: "What's illegal offline should also be illegal online ",
        correctOption: "optionD"
    },

    {
        question: "In 2021, Meta was ordered to disclose records of accounts linked to attrocities in which country?",
        optionA: "The Gambia",
        optionB: "Russia",
        optionC: "Myanmar",
        optionD: "El Salvador",
        correctOption: "optionC"
    },

    {
        question: "Based on 2020 internal analysis by Meta, what % of teenage girls said Instagram contributed towards body-image concerns?",
        optionA: "8%",
        optionB: "16%",
        optionC: "24%",
        optionD: "32%",
        correctOption: "optionD"
    },

    {
        question: "What's Meta's first quarter revenue expectation for 2023?",
        optionA: "26 million",
        optionB: "29 billion",
        optionC: "26-28.5 billion",
        optionD: "30 billion",
        correctOption: "optionC"
    },

    {
        question: "Where does Instagram sit in its parent company balance sheet?",
        optionA: "Meta's Family of Apps (FoA)",
        optionB: "Meta' Reality Labs (RL)",
        optionC: "Facebook's Fence (FF)",
        optionD: "FAANGs",
        correctOption: "optionA"
    },

    {
        question: "Based on claims related to what Meta is subject to class actions?",
        optionA: "Biometrics",
        optionB: "Contents and Algorithms",
        optionC: "Consumer Protection",
        optionD: "All the Above",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] //empty array to hold randomly selected questions 

function handleQuestions() { 
    while (shuffledQuestions.length <= 3) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //question number
let playerScore = 0  //player score
let wrongAttempt = 0 //#wrong answers picked 
let indexNumber = 0 //next question

// displaying next question

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gab current q
    const currentQuestionAnswer = currentQuestion.correctOption //grab its answer
    const options = document.getElementsByName("option"); //get all the options
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //grab correct answer
            correctOption = option.labels[0].id
        }
    })

//needed to ensure user picks an option
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "#16FF00"
            playerScore++ 
            indexNumber++ //sume one to index to show next question..
            //allow time for question to load
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "#E21818"
            document.getElementById(correctOption).style.backgroundColor = "#16FF00"
            wrongAttempt++ //sum one to incorrect try
            indexNumber++
            //allow time for question to load
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when user click on next
function handleNextQuestion() {
    checkForAnswer() //has player picked the wrong option?
    unCheckRadioButtons()
    //delaying 
    setTimeout(() => {
        if (indexNumber <= 3) {
//shows next question
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//finshes the game if index number is than 3 
        }
        resetOptionBackground()
    }, 1000);
}

//reset colours
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

//unchecking the buttons
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// kicks in when all questions have been answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

// condition check for colour and related text
    if (playerScore <= 1) {
        remark = 'Do not worry, we got you covered!'
        remarkColor = "red"
    }
    else if (playerScore >= 2 && playerScore < 4) {
        remark = "Hey - this is good! Let's see if I can show you something more.."
        remarkColor = "orange"
    }
    else if (playerScore == 4) {
        remark = "Wow! You already know al lot about the dark side of socials, curious of unfolding more?"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 4) * 100

//displaying the results
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//ends score modal and resets the game 
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//closing warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}