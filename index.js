var quizData;

var mainContainer = $("#main-container");
var quizContainer = $("#quiz-container");

$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (response) {
    quizData = response;
    quizQuestion(quizData);
})

function quizQuestion(quizData) {
    var quizForm = $("<form>");
    quizForm.addClass("quizForm");
    quizContainer.append(quizForm);
    for (var i = 0; i < quizData.length; i++) {
        var questionContainer = $("<div>");
        questionContainer.addClass("question-container")
        quizForm.append(questionContainer);

        var question = $("<h3>").text("Q" + quizData[i].id + "." + " " + quizData[i].question);
        question.addClass("question");
        questionContainer.append(question);

        var answerContainer = $("<div>");
        answerContainer.addClass("answer-container");
        questionContainer.append(answerContainer);
        var quizOptions = quizData[i].options;
        for (var j = 0; j < quizOptions.length; j++) {
            var answerOption = $("<div>");
            answerOption.addClass("answer-option").addClass('a'+i);
            answerContainer.append(answerOption);

            var radioLabel = $("<label>").addClass('answer-label');
            answerOption.append(radioLabel);

            var radioInput = $("<input>");
            radioInput.prop({
                type: 'radio',
                name: i,
                value: quizOptions[j]
            })
            var radioInputText = $("<span>").html(quizOptions[j]);
            radioLabel.append(radioInput, radioInputText);
        }
        var questionBorder = $("<div>")
        questionBorder.addClass("question-border");
        quizForm.append(questionBorder);
    }

    var submitContainer = $("<div>").addClass('submit-container')
    var formSubmit = $("<button>").text("Submit");
    formSubmit.addClass("form-submit");
    submitContainer.append(formSubmit);
    quizForm.append(submitContainer);

    formSubmit.click(function (e) {
        var userAnswer = [];
        for (var k = 0; k < quizData.length; k++) {
            var answer = document.getElementsByName(k);
            for (var l = 0; l < quizOptions.length; l++) {
                if (answer[l].checked === true) {
                    userAnswer.push(l + 1);
                }
            }
        }
        //checkResults(userAnswer);
        e.preventDefault();

        console.log(userAnswer.length)
        if(userAnswer.length !== 5){
            alert("Please answer all questions")
        }
        else{
            showResults(userAnswer)
        }

    })
}

function showResults(userAnswer){
    $('.form-submit').attr('disabled','true')
    var ansContainer = $('.answer-container');

        for (var x = 0; x < ansContainer.length; x++) {
            var ansOption = document.getElementsByName(x)
            var answerId = document.getElementsByClassName('a'+x);
                for (var y = 0; y < ansOption.length; y++) {
                    if(ansOption[y].checked){
                        var z=y+1;
                        var ans=quizData[x].answer
                        if(z === ans){
                            var spanText = $('<i>').addClass('fas fa-check tickMark')
                            answerId[y].append(spanText[0]);
                        }else{
                            var spanText = $('<i>').addClass('fas fa-times crossMark')
                            answerId[y].append(spanText[0]);
                            var spanText = $('<i>').addClass('fas fa-check tickMark')
                            answerId[ans-1].append(spanText[0]);
                        }
                    }
            }
        }

    var realAnswer = quizData;
    var score = 0;
    for (var i = 0; i < quizData.length; i++) {
        if (quizData[i].answer === userAnswer[i]) {
            score += 1;
        }
    }
    score = score+'/5'
    var scoreArea = $("<div>").css({"color":"white","margin-top":"16px"}).text('Your Score - '+score);
    $('.submit-container').append(scoreArea);

    var reloadBtn = $("<button>").addClass('form-submit').text('Restart');
    $('.submit-container').append(reloadBtn);

    reloadBtn.addEventListener('click',function(){
        location.reload()
    })
}
