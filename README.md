This is an application for practice with tons of questions coming from
a variety of topics. Users are free to remove or add more questions to the topics,
and add/remove options to those questions. However, only administrators can modify
the topics. Users can also answer the available questions and their answers would 
be stored to the database of the application.

All of the services require authentication to use, except for the API and registration/login. 
Unauthorised users can access the path `/api/questions/random` to retrieve a 
random question together with its options, and sending a POST request to 
path `/api/questions/answer` using a JSON file, which includes the
attribute `optionId` - id of the option that they choose, would response whether 
their chosen answer is correct or not.
