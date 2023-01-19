/*Project structure: 1. Question Object 2. Quiz Object */

/*
*Question Object
*It comprises of three parameters
    1. Question Text, qText
    2. Question Options, options
    3. Correct Answer, ans
*/
function Question(qText, options, ans)
{
    this.qText=qText;
    this.options=options;
    this.ans=ans;
}

/*
*Quiz Object
*It comprises of 1 parameter 
    1. Question Object, questions
    2. Question index, qIndex
    3. Score, score
    4.Percentage, percentage
*/
function Quiz(questions)
{
    this.questions = questions;
    this.score = 0;
    this.qIndex=0;
    //this.percentage = this.score*100/this.qIndex;
}

//Array of Question object, consumed by Quiz object
let questionList = [
    new Question("1. How many cars in one F1 Team?", ["1","2","3","4"],"2"),
    new Question("2. How many mandatory pit-stops in one F1 GP?", ["1","2","3","4"],"1"),
    new Question("3. Player with most F1 WDC title?", ["HAM","VER","VET","LEC"],"HAM"),
    new Question("4. Total compounds available in a GP?", ["5","2","3","4"],"5"),
    new Question("5. How many races in current F1 calendar?", ["22","20","30","10"],"22")
]

//To check if all questions are answered, return-boolean, impl-loadAQuestion()
Quiz.prototype.quizEnd = function()
{
    return this.qIndex === this.questions.length;
}


//The final output, after Quiz finishes, impl - loadAQuestion()
function showProgress()
{
    let footerElm = document.getElementById("progress")
    footerElm.innerHTML = "Question " + (quiz.qIndex + 1) + " of " + quiz.questions.length;
}

//Initialized a quiz object
let quiz = new Quiz(questionList)

//To return the correct question text, return-String, impl-loadAQuestion()
Quiz.prototype.getQuestion = function()
{
    return this.questions[this.qIndex]
}

//To increement index and update score if answer is correct, impl=handleButtonResult
Quiz.prototype.checkAns = function(option)
{
    //if correct
    if(this.getQuestion().ans === option)
    {
        //update score
        this.score++;
    }
    //increase index
    this.qIndex++;    
}

//To check if answer clicked is correct or not, if yes then assign score, next question , impl-loadAQuestion()
function handleButtonResult(btnId,option)
{
    let btn = document.getElementById(btnId);
    btn.onclick = function()
    {
        //check the answer, update score and increase index
        quiz.checkAns(option);
        //triggering for next question from the array for updated index
        loadAQuestion();
    }
     
}

//The final score, HTML-div, impl=loadAQuestion()
function showScore()
{
    let result = "<h1>Result</h1>"
    result+="<h2 id='score'> Your score is " + quiz.score + " percentage is " + (quiz.score/quiz.questions.length * 100) + "% </h2>"

    let quizElm = document.getElementById("quiz");
   // console.log(quizElm);
    quizElm.innerHTML = result;

}

//The functionMain
function loadAQuestion()  
{
    
    //checks if Quiz has ended or not
   if(quiz.quizEnd())
   {
        //Show final score and percentage
       showScore();
   }else{
          
        //Declare the correct question
        let question = document.getElementById("question")

        //Return the String question for the correct Question Index
        question.innerHTML = quiz.getQuestion().qText;

        //storing the options for corresponding question Index
        let options = quiz.getQuestion().options;

        //storing values in the button object
        for(let i=0;i<options.length;i++)
        {
            let eachOpt = document.getElementById("choice"+ i);
            eachOpt.innerHTML= options[i];

            //checking if answer is correct or not, populating score, trigger for next question
            handleButtonResult("btn"+i,options[i])
        }
        showProgress();
   }

}
loadAQuestion();


