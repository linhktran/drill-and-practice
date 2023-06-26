import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionsService from "../../services/optionService.js";

const listAllTopics = async ({render}) => {
    const data = {topics: await topicService.listAllTopics(),};
    render("quiz.eta", data);
};

const randomQuestion = async ({render, params, response}) => {
    const questions = await questionService.listQuestionsOfTopic(params.id);
    if (questions.length === 0) {
        render("quiz_question.eta", {text: "There are no available quiz for the topic."});
        return;
    } else {
        const random = questions[Math.floor(Math.random() * questions.length)];

        response.redirect(`/quiz/${random.topic_id}/questions/${random.id}`);
    };
};

const randomQuiz = async ({render, params}) => {
    let question = await questionService.listOneQuestion(params.qId);
    if (!(question.length > 0)) return;
    question = question[0];

    const data = {
        id: question.id,
        topic: question.topic_id,
        question_text: question.question_text,
        options: await optionsService.listOptions(question.id),
    }; 

    render("quiz_question.eta", data);
};

const addAnswer = async ({response, params, user}) => {
    await optionsService.addQuestionAnswer(user.id, params.qId, params.oId);

    let solution = await optionsService.findOptionById(params.oId);
    if (!(solution.length > 0)) return;
    solution = solution[0].is_correct;

    if (solution) {
        response.redirect(`/quiz/${params.id}/questions/${params.qId}/options/${params.oId}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/questions/${params.qId}/options/${params.oId}/incorrect`);
    };
};

const correctAnswer = async ({render, params}) => {
    const check = await optionsService.findOptionById(params.oId);
    if (!check[0].is_correct) return;

    render("check.eta", {correct: true, topic: params.id,});
};

const incorrectAnswer = async ({render, params}) => {
    const check = await optionsService.findOptionById(params.oId);
    if (check[0].is_correct) return;

    const answers = await optionsService.listCorrectOptions(params.qId);
    if (!(answers.length > 0)) return;
    
    render("check.eta", {answers: answers, topic: params.id,});
};
 
export { listAllTopics, randomQuestion, randomQuiz, addAnswer, correctAnswer, incorrectAnswer }