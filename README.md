# QuizUP App
## Deplyed Here: https://quizup-edu.netlify.app/

## Backend Deployed: https://kahoot.up.railway.app/
## Backend Resp: https://github.com/AhindraD/QuizUp---Backend

## Description
An application that follows the blended learning techniques. This application will be used in live physical and online sessions. The target of this application is to transform the normal bored sessions into interactive one. This will enable the presenter to interact with his audience in a funny yet systematic way during the session. There are two types of users: 

- Presenter (For instance, teacher)
- Audience (For instance, students)  

# User Stories for every user:

## Teacher:

- Sign Up - The teacher should be able to sign in or sign up as shown in the following screens: 
![Signup Scene](./images/SIGNUP.PNG)

- Templates - The teacher can view all the quiz templates that has been created by him as shown in the following screens:
![Quizzes Scene](https://github.com/AhindraD/QuizUP---FrontEnd/blob/master/images/Home-subs.PNG?raw=true)

- The teacher can create a quiz by adding two types of questions, 'Choice Question' and 'True/False Question'. The teacher can add the 'question text', 'image', 'choices text' and 'mark the correct answer'. The teacher can control the order of the questions that will appear to the audience, or delete them from question preview side bar.

![Choices Scene](./images/choices.png)
![True/False Scene](./images/true-false.png)

- From this point, the teacher's screen is projected physcally on front of the students if it is a physical session or screen shared if it is an online session. In this requirement, the teacher can chose any template and click the start button. When the teacher starts the session, a game screen will be shown along with unique numeric number that can identify the game session easily. This numeric pin will be used by the students to join the session. Moreover, there is a QR Code generated for every session so that the students can scan the QR Code instead of entering the game pin. 

![Game Scene 1](./images/start-1.PNG)
![Game Scene 2](./images/start-2.PNG)

- When the teacher presses 'Start', the questions will be shown with a timer and each one of the student can see the teacher's screen and can choose the choices from their own device (Phone or Laptop). The question screen will show the 'question text', 'image', 'choices text', 'live statistics about the current chosen choices', and 'timer'. The question screen should appear as follows.

![Question 1 Scene](./images/ques-1.PNG)


- After the game session, there will be a dashboard screen showing the attendees with their scoring and they are sorted based on their ranks, and if their ranks are equal, then they are sorted in an alpapetical order as shown in the following screen.

![Dashboard Scene](./images/dashboard.png)


# Students Screens

- Students screens are only for the ones within game session will enter the link for the app and actually write their own pin within the box as shown in the folllowing screen.

![Login Scene](./images/student-join.PNG)

- While the question is shown, the answer can be shown as follows.

![Choices Scene](./images/choices-mobile.png)

- If the student has made a choice and the timer didn't finish, this screen should appear to the student.


![Waiting Scene](./images/waiting.png)

- When the teacher's timer is finished, there is a review that should be shown to the student till the teacher goes to the next question.

![Review Scene](./images/question-review.png)

- When the session finishes, there should be a final feedback screen that is shown on the student's screen to explain his rank that is shown on the teacher's screen.

![Dashboard Scene](./images/dashboard-mobile.png)

https://kahoot.it/

