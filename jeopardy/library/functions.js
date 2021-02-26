/**
 * This function can be used to return four random categories for Jeopardy.
 * Input: n/a
 * Output: [{
 *              id: integer,
 *              title: string,
 *              clues_count: integer
 *         }]
 */

function fetchCategories(number) {
    const offset = Math.random() * 1000;

    var request = new XMLHttpRequest();
    request.open("GET", `https://jservice.io/api/categories?count=${number}&offset=${offset}`, false);
    request.send(null);

    if (request.status == 200) {
        return JSON.parse(request.responseText);
    };
};

/**
 * This function can be used to return four questions for any category identifier.
 * Input: category
 * Output: [{
 *              category_id: string,
 *              question: string,
 *              answer: string,
 *         }]
 */
function fetchQuestions(category) {
    var request = new XMLHttpRequest();
    request.open("GET", `https://jservice.io/api/category?id=${category.id}`, false);
    request.send(null);

    if (request.status == 200) {
        return JSON.parse(request.responseText).clues.splice(0, 5);
    };
};

/**
 * This function is used to add the data regarding the category and questions
 * to the game.
 * 
 * Input: Category
 *        Array of questions retrieved from fetchQuestions function.
 * Output: n/a
 */
function addToGame(category, questions) {
    game.addData(category, questions);
    game.initGame();
}

exercise();