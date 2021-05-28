window.onload = function () {

    sessionStorage.clear();

    let input = document.getElementById("input");
    let btn = document.getElementById("btn"); 

    function inputQuestion() {

        let inputReturn = document.getElementById("input").value;

        return inputReturn;
    }
     

    input.addEventListener("keyup", function() {
        
        if(inputQuestion().length > 0) {
            btn.style.visibility = "visible";

            let remove = document.getElementById("questionBtns");
            remove.innerHTML = "";

        } else {

            btn.style.visibility = "hidden";
        }
    })

    function questionAnswer() {
        let questionsArray = [
            ["question 1", "question 2", "question 3"],
            ["1question 1", "1question 2", "1question 3"]
        ];
    
        let answersArray = [
            ["answer 1", "answer 2", "answer 3"],
            ["1answer 1", "1answer 2", "1answer 3"]
        ]; 
        
        let answer;

        let proposedQuestion;

        let questions;
        let btns;

        let answerFound = false;
        let questionFound = false;

        for (let i = 0; i < questionsArray.length; i++) {
            for (let j = 0; j < questionsArray[i].length; j++) {
                if (questionsArray[i][j] == inputQuestion()) {

                    let answers = answersArray[i];
                    answer = answers[Math.floor(Math.random() * answers.length)];

                    answerFound = true;
                    document.getElementById("chatHistory").innerHTML += inputQuestion() + "<br>"


                    setTimeout(function() {
                        document.getElementById("chatHistory").innerHTML += answer + "<br>";
                    }, 2000);


                    
                    break; //Stops if input matches questionsArray
                } else {
                    
                        questions = questionsArray[i];
                        // i++;

                        proposedQuestion = questions[Math.floor(Math.random() * questions.length)];

                        questionFound = true;
                        btns = document.createElement("BUTTON");
                        btns.classList.add("suggestedQuestions");
                        
                        btns.innerHTML = proposedQuestion;
                        document.getElementById("questionBtns").appendChild(btns);



                        btns.addEventListener("click", function() {
                            
                            document.getElementById("chatHistory").innerHTML += proposedQuestion + "<br>"

                            let remove = document.getElementById("questionBtns");
                            remove.innerHTML = "";

                            let btnAnswers = answersArray[i];
                            btnAnswer = btnAnswers[Math.floor(Math.random() * btnAnswers.length)];

                            

                            setTimeout(function() {
                                document.getElementById("chatHistory").innerHTML += btnAnswer + "<br>";
                            }, 2000);

                        })

                
                    break;                
                }
                
            }
            if (answerFound || questionFound) {
                // Stop outer loop when reply is found instead of interating through the entire array
                break;
              }
        }
        

        // return answer;
    }

    btn.addEventListener("click", function() {

        btn.style.visibility = "hidden";

        if(sessionStorage.length == 0) {
            // USER IDENTIFIED (SAVED TO sessionsStorage)
            let user = document.getElementById("input").value;
            window.sessionStorage.setItem("userName", user);
            let name = sessionStorage.getItem("userName");

            document.getElementById("chatHistory").innerHTML += "Hello, " + name + ", I'm Monty!<br>";
            document.getElementById("input").value = "";

            // Placeholder text values and getting a random array value assigned
            let placeholderValue = ["Type a new Question", "Next Question", "Feel free to ask!", "Got another one?"];
            let randomPlaceholder = placeholderValue[Math.floor(Math.random() * placeholderValue.length)];

            //placeholder text change updated in input field
            document.getElementsByName("inputField")[0].placeholder = randomPlaceholder;
            
            
            
            
            // console.log(remove);

        } else {

            

            questionAnswer();

             // Placeholder text values and getting a random array value assigned
             let placeholderValue = ["Type a new Question", "Next Question", "Feel free to ask!", "Got another one?"];
             let randomPlaceholder = placeholderValue[Math.floor(Math.random() * placeholderValue.length)];
 
             //clear input field and placeholder text change updated in input field
             document.getElementById("input").value = "";
             document.getElementsByName("inputField").placeholder = randomPlaceholder;
             
             
        }
            
    })

}