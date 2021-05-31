window.onload = function () {

    sessionStorage.clear(); // clears sessionStorage, to offer new chat to user

    let input = document.getElementById("input");
    let btn = document.getElementById("btn"); 

    function inputQuestion() {

        let inputReturn = document.getElementById("input").value;
        return inputReturn;
    } //Function to get input value
     

    input.addEventListener("keyup", function() {
        
        if(inputQuestion().length > 0) {
            btn.style.visibility = "visible";

            let remove = document.getElementById("questionBtns");
            remove.innerHTML = ""; //removes suggested question buttons defined below

        } else {
            btn.style.visibility = "hidden";
        }
    }) //when user enters something in the inpt field, the button shows up

    function questionAnswer() {
        const questionsArray = [
            ["1","2","3"],
            ["11", "22", "33"]
        ];
    
        const answersArray = [
            ["1a", "2a", "3a"],
            ["11a", "22a", "33a"]
        ]; 
        
        let answer;
        let proposedQuestion;
        let questions;
        let btns;
        let answerFound = false; //same as questionFound, in the if else statements, if conditions are true these variables are true, then the if (answerFound || questionFound) stops the for loop
        let questionFound = false;
        

        for (let i = 0; i < questionsArray.length; i++) { //get inside nested array
            for (let j = 0; j < questionsArray[i].length; j++) { //choose a value from the sub array

                if (questionsArray[i][j] == inputQuestion()) { //compare to input value

                    let answers = answersArray[i];
                    answer = answers[Math.floor(Math.random() * answers.length)]; //give one of answers in corresponding sub array
                    
                    document.getElementById("chatHistory").innerHTML += inputQuestion() + "<br>"

                    setTimeout(function() {
                        document.getElementById("chatHistory").innerHTML += answer + "<br>";
                    }, 2000); //Bots answer comes 2 secs later

                    answerFound = true;
                    
                    break; //Stops if input matches questionsArray
                } else {
                        questions = questionsArray[i];

                        proposedQuestion = questions[Math.floor(Math.random() * questions.length)];

                        
                        btns = document.createElement("BUTTON");
                        btns.classList.add("suggestedQuestions");
                        
                        btns.innerHTML = proposedQuestion; //feeds in question text from array to button
                        document.getElementById("questionBtns").appendChild(btns);

                        questionFound = true;


                        btns.addEventListener("click", function() { //if user does not type in existing question, then chatbot suggests a question, the user can ask
                            
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