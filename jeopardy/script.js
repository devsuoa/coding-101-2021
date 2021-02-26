class TriviaGameShow {
   constructor(element, options={}) {
      
      // Which categories we should use (or use default is nothing provided)
      this.useCategoryIds = options.useCategoryIds || [ 1892, 4483, 88, 218]; 
      /*
         Default Categories pulled from https://jservice.io/search:
         ---
         1892: Video Games
         4483: Three Letter Animals
         88: Geography
         218: Science and Nature
      */      

      // Database
      this.categories = [];
      this.clues = {};
      
      // State
      this.currentClue = null;
      this.score = 0;
      this.categoryIndex = 0;
      
      // Elements
      this.boardElement = element.querySelector(".board");
      this.scoreCountElement = element.querySelector(".score-count");
      this.formElement = element.querySelector("form");
      this.inputElement = element.querySelector("input[name=user-answer]");
      this.modalElement = element.querySelector(".card-modal");
      this.clueTextElement = element.querySelector(".clue-text");
      this.resultElement = element.querySelector(".result");
      this.resultTextElement = element.querySelector(".result_correct-answer-text");
      this.successTextElement = element.querySelector(".result_success");
      this.failTextElement = element.querySelector(".result_fail");
   }

   initGame() {
      // Bind event handlers
      this.boardElement.addEventListener("click", event => {
         if (event.target.dataset.clueId) {
            this.handleClueClick(event);
         }
      });
      this.formElement.addEventListener("submit", event => {
         this.handleFormSubmit(event);
      });
      
      // Render initial state of score
      this.updateScore(0);
   }

   addData(rawCategory, questionArray) {

      var category = {
         title: rawCategory.title,
         clues: []
      };

      console.log("category");

      questionArray.forEach((question, index) => {
         const clueIdentifier = this.categoryIndex + "-" + index;
         category.clues.push(clueIdentifier);

         this.clues[clueIdentifier] = {
            question: question.question,
            answer: question.answer,
            value: (index + 1) * 100
         };
      });

      this.categories.push(category);
      this.renderCategory(category);
      this.categoryIndex++;
  }

   renderCategory(category) {      
      let column = document.createElement("div");
      column.classList.add("column");
      column.innerHTML = (
         `<header>${category.title}</header>
         <ul>
         </ul>`
      ).trim();
      
      var ul = column.querySelector("ul");
      category.clues.forEach(clueId => {
         var clue = this.clues[clueId];
         ul.innerHTML += `<li><button data-clue-id=${clueId}>${clue.value}</button></li>`
      })
      
      // Add to DOM
      this.boardElement.appendChild(column);
   }

   updateScore(change) {
      this.score += change;
      this.scoreCountElement.textContent = this.score;
   }

   handleClueClick(event) {
      var clue = this.clues[event.target.dataset.clueId];

      // Mark this button as used
      event.target.classList.add("used");
      
      // Clear out the input field
      this.inputElement.value = "";
      
      // Update current clue
      this.currentClue = clue;

      // Update the text
      this.clueTextElement.textContent = this.currentClue.question;
      this.resultTextElement.textContent = this.currentClue.answer;

      // Hide the result
      this.modalElement.classList.remove("showing-result");
      
      // Show the modal
      this.modalElement.classList.add("visible");
      this.inputElement.focus();
   }

   // Handle an answer from user
   handleFormSubmit(event) {
      event.preventDefault();
      
      var isCorrect = this.cleanseAnswer(this.inputElement.value) === this.cleanseAnswer(this.currentClue.answer);
      if (isCorrect) {
         this.updateScore(this.currentClue.value);
      }
      
      // Show answer
      this.revealAnswer(isCorrect);
   }
   
   // Standardize an answer string so we can compare and accept variations
   cleanseAnswer(input="") {
      var friendlyAnswer = input.toLowerCase();
      friendlyAnswer = friendlyAnswer.replace("<i>", "");
      friendlyAnswer = friendlyAnswer.replace("</i>", "");
      friendlyAnswer = friendlyAnswer.replace(/ /g, "");
      friendlyAnswer = friendlyAnswer.replace(/"/g, "");
      friendlyAnswer = friendlyAnswer.replace(/^a /, "");
      friendlyAnswer = friendlyAnswer.replace(/^an /, "");      
      return friendlyAnswer.trim();
   }
   
   
   revealAnswer(isCorrect) {
      
      // Show the individual success/fail case
      this.successTextElement.style.display = isCorrect ? "block" : "none";
      this.failTextElement.style.display = !isCorrect ? "block" : "none";
      
      // Show the whole result container
      this.modalElement.classList.add("showing-result");
      
      // Disappear after a short bit
      setTimeout(() => {
         this.modalElement.classList.remove("visible");
      }, 3000);
   }
   
}

function shuffle(a) {
   var j, x, i;
   for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
   }
   return a;
}
 
 //-------------------------------------------
 
 const game = new TriviaGameShow( document.querySelector(".app"), {});
 game.initGame();