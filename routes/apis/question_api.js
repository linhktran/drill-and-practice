import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";

const questionApi = async({response}) => {
    const questions = await questionService.listAllQuestions();
    if (!(questions.length > 0)) {
        response.body = {};
        return;
    };

    const random = questions[Math.floor(Math.random() * questions.length)];

    const answers = await optionService.listOptions(random.id);
    for (let i = 0; i < answers.length; i++) {
        delete answers[i].question_id;
        delete answers[i].is_correct;

        answers[i].optionId = answers[i].id;
        answers[i].optionText = answers[i].option_text;

        delete answers[i].id;
        delete answers[i].option_text;
      };

    const data = {
        questionId: random.id,
        questionText: random.question_text,
        answerOptions: answers,
    };

    response.body = data;
};

const answerApi = async ({response, request}) => {
    const body = request.body({type: "json"});
    const document = await body.value;
    const id = document.optionId;
    
    const answer = await optionService.findOptionById(id);
    if (!(answer.length > 0)) {
        response.body = "Invalid arguments";
        return;
    };

    if (answer[0].is_correct) {
        response.body = "Correct";
    } else {
        response.body = "Incorrect";
    };
};

export { questionApi, answerApi }