import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
    const data = {
        topic: await statisticsService.topic_count(),
        question: await statisticsService.question_count(),
        answer: await statisticsService.answer_count(),
    }
    render("main.eta", data);
};

export { showMain };