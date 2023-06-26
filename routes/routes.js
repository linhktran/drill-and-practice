import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";

import * as api from "./apis/question_api.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics", topicController.listAllTopics);
router.post("/topics", topicController.addTopic);

router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", topicController.listQuestions);
router.post("/topics/:id/questions", topicController.addQuestion);

router.get("/topics/:id/questions/:qId", questionController.listOptions);
router.post("/topics/:id/questions/:qId/options", questionController.addOption);

router.post("/topics/:id/questions/:qId/options/:oId/delete", questionController.deleteOption);

router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion)

router.get("/quiz", quizController.listAllTopics);
router.get("/quiz/:id", quizController.randomQuestion);
router.get("/quiz/:id/questions/:qId", quizController.randomQuiz);

router.post("/quiz/:id/questions/:qId/options/:oId", quizController.addAnswer);
router.get("/quiz/:id/questions/:qId/options/:oId/correct", quizController.correctAnswer);
router.get("/quiz/:id/questions/:qId/options/:oId/incorrect", quizController.incorrectAnswer);


router.get("/api/questions/random", api.questionApi);
router.post("/api/questions/answer", api.answerApi);

export { router };