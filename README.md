# QuestionsAPI

The project is a RESTful API used for create, read, update, delete questions and answers, as well as allowing users to upvote both questions and answers.

## Table of Contents

- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
-  [License](#license)

## Usage

You can use this [URL](https://questionsapi-production.up.railway.app/) , followed by the HTTP endpoint , to manage questions and answers via the HTTP methods shown below. You can test it using API testing tools such as Postman.


## API Endpoints

### Questions
 - **Create a question**
	 - HTTP method : `POST`
	 - HTTP endpoint : `/questions`
	 - Body : 
		`{ "title": "Question title", 
		"description": "Question description", 
		"category": "Question category" }`
	 -  Response :  `201 Created`
	 
- **Get all questions**
	 - HTTP method : `GET`
	 - HTTP endpoint : `/questions?title=keyword1&category=keyword2`
	 - Response :  `201 Created with list of questions which match with keyword`
	 
- **Get a question by ID**
   - HTTP method : `GET`
   - HTTP endpoint : `/questions/:id`
   - Response :  `200 OK with questions which match with id`
   
 -   **Update a question**
     - HTTP method : `PUT`
     - HTTP endpoint : `/questions/:id`
	  - Body : 
		`{ "title": "Question title", 
		"description": "Question description", 
		"category": "Question category" }`
	 -  Response :  `201 Created`
	
- **Delete a question**
	- HTTP method : `DELETE`
	- HTTP endpoint : `/questions/:id`
	-  Response :  `200 OK`

- **Upvote a question**
	-  HTTP method : `POST`
	-  HTTP endpoint : `/questions/:id/upvote`
	-  Response :  `200 OK`

- **Downvote a question**
    -  HTTP method : `POST`
	-  HTTP endpoint : `/questions/:id/downvote`
	-  Response :  `200 OK`

### Answers
- **Create an answer for a question**
    - HTTP method : `POST`
    - HTTP endpoint : `/questions/:id/answers`
    - Body:  `{ "content": "Answer content" }`
    - Response :  `201 Created`
    
- **Get answers for a question**
	- HTTP method : `GET`
	- HTTP endpoint : `/questions/:id/answers`
	- Response :  `200 OK`

- **Upvote an answer**
	- HTTP method : `POST`
	- HTTP endpoint : `/answers/:id/upvote`
	- Response :  `200 OK`

- **Downvote an answer**
	- HTTP method : `POST`
	- HTTP endpoint : `/answers/:id/downvote`
	- Response :  `200 OK`

## Database

The project use cloud supabase as a cloud database. 
Database schema includes two main tables,  `questions`  and  `answers`, with additional tables for votes:

-   `questions`: Stores question details.
-   `answers`: Stores answer details.
-   `question_votes`: Tracks votes for questions.
-   `answer_votes`: Tracks votes for answers.

## License

This project is licensed under the MIT License.
