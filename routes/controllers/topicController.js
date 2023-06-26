import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const addTopicValidation = {
    name: [validasaur.minLength(1), validasaur.required],
};

const getTopicData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {name: params.get("name"),};
};

const addTopic = async ({request, response, render, user}) => {
    if (user.admin) {    
        const data = await getTopicData(request);
        const [passes, errors] = await validasaur.validate(data, addTopicValidation);
        
        if (!passes) {
            data.topics =  await topicService.listAllTopics();
            data.admin = user.admin;
            data.errors = errors;
            render("topics.eta", data);
        } else {
            await topicService.addTopic(user.id, data.name);
            
            response.redirect("/topics");
        };
    } else {
        response.body = "You don't have the permission to add new topics."
    };
};

const deleteTopic = async ({params, response, user}) => {
    if (user.admin) {
        await topicService.deleteTopic(params.id);

        response.redirect("/topics");
    } else {
        response.body = "You don't have the permission to delete topics."
    }
}

const listAllTopics = async ({render, user}) => {
    const data = {topics: await topicService.listAllTopics(), name: '',};
    data.admin = user.admin;
    render("topics.eta", data);
};

const addQuestionValidation = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {question_text: params.get("question_text"),};
};

const addQuestion = async({request, response, render, params, user}) => {
    const data = await getQuestionData(request);
    const [passes, errors] = await validasaur.validate(data, addQuestionValidation);
    
    let topic = await topicService.listOneTopic(params.id);
    if (!(topic.length > 0)) return;
    topic = topic[0];
    data.name = topic.name;
    data.id = topic.id;
    data.questions = await questionService.listQuestionsOfTopic(topic.id);

    if (!passes) {
        data.errors = errors;
        render("topic.eta", data);
        return;
    } else {
        await questionService.addQuestionForTopic(user.id, data.id, data.question_text);

        response.redirect(`/topics/${data.id}`);
    };
};

const listQuestions = async({render, params}) => {
    let topic = await topicService.listOneTopic(params.id);
    if (!(topic.length > 0)) return;
    topic = topic[0];
    const data = {
        name: topic.name,
        id: topic.id,
        questions: await questionService.listQuestionsOfTopic(topic.id),
        question_text: "",
    };

    render("topic.eta", data);
};

export{ addTopic, deleteTopic, listAllTopics, addQuestion, listQuestions };