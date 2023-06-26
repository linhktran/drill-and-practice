This is an application for practice with tons of questions coming from
a variety of topics. Users are free to remove or add more questions to the topics,
and add/remove options to those questions. However, only administrators can modify
the topics. Users can also answer the available questions and their answers would 
be stored to the database of the application.

All of the services require authentication to use, except for the API and registration/login. 
Unauthorised users can access `http://localhost:7777/api/questions/random` to retrieve a 
random question together with its options, and sending a POST request to 
`http://localhost:7777/api/questions/answer` using a JSON file, which includes the
attribute `optionId` - id of the option that they choose, would response whether 
their chosen answer is correct or not.

For those who want to run the application locally, all you need to do is open the
terminal and type `docker-compose up --build`, after that go to `http://localhost:7777/`
to access the main page of the application. It might take some time when first launched.
When the application is launched, an admin account would be created (email: admin@admin.com
and password: 123456), using which users can easily modify the topics.

In this folder, there are a total of 10 tests, 5 of which are end-to-end tests and 5 are unit tests. 
These two types of tests require different steps to run:

* For end-to-end tests:
* For unit tests:#   d r i l l - a n d - p r a c t i c e  
 #   d r i l l - a n d - p r a c t i c e  
 