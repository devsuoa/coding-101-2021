function getCategories(numberOfCategories) {
    // Getting x amount of categories from the API.
    // let allCategories = fetchCategoriesFromAPI(numberOfCategories);

    // The categories that we got from the API, we return it from this function.
    // return allCategories;

    return fetchCategoriesFromAPI(numberOfCategories);
}

// [CategoryOne, CategoryTwo, CategoryThree]
let categoriesForGame = getCategories(5);
console.log(categoriesForGame);

function getQuestions(categories) {
    // Initalizing an empty array of questions.
    let questionsArray = [];

    for (let x = 0; x < categories.length; x = x + 1) { 
        // Going through each category individually (from within the array).
        let currentCategory = categories[x];

        // Getting questions from the API for each category.
        let categoryQuestions = fetchQuestionsFromAPI(currentCategory);

        // Pushing questions to the empty array.
        questionsArray.push(categoryQuestions);
    }

    return questionsArray;
}

let questionsForGame = getQuestions(categoriesForGame);
addToGame(categoriesForGame, questionsForGame);