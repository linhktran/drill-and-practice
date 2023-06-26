import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const addOptionValidation = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {option_text: params.get("option_text"),
            is_correct: params.has("is_correct"),};
};

const addOption = async({request, response, render, params}) => {
    const data = await getOptionData(request);
    const [passes, errors] = await validasaur.validate(data, addOptionValidation);
    
    let question = await questionService.listOneQuestion(params.qId);
    if (!(question.length > 0)) return;
    question = question[0];
    data.question_text = question.question_text;
    data.id = question.id;
    data.topic = question.topic_id;
    data.options = await optionService.listOptions(question.id);
    data.count = await optionService.countOptions(question.id);

    if (!passes) {
        data.errors = errors;
        render("question.eta", data);
        return;
    } else {
        await optionService.addAnswerOptionForQuestion(data.id, data.option_text, data.is_correct);

        response.redirect(`/topics/${data.topic}/questions/${data.id}`);
    };
};

const listOptions = async({render, params}) => {
    let question = await questionService.listOneQuestion(params.qId);
    if (!(question.length > 0)) return;
    question = question[0];
    const data = {
        question_text: question.question_text,
        id: question.id,
        topic: question.topic_id,
        options: await optionService.listOptions(question.id),
        count: await optionService.countOptions(question.id),
        option_text: "",
    };

    render("question.eta", data);
};

const deleteOption = async({response, params}) => {
    let question = await questionService.listOneQuestion(params.qId);
    if (!(question.length > 0)) return;
    question = question[0];

    await optionService.deleteAnswerOptionForQuestion(params.oId);

    response.redirect(`/topics/${question.topic_id}/questions/${question.id}`);
};

const deleteQuestion = async ({response, params}) => {
    let question = await questionService.listOneQuestion(params.qId);
    if (!(question.length > 0)) return;
    question = question[0];

    const count = await optionService.countOptions(question.id);
    if (count !== 0) return;

    await questionService.deleteQuestionForTopic(question.id);

    response.redirect(`/topics/${question.topic_id}`);
};

export { addOption, listOptions, deleteOption, deleteQuestion }