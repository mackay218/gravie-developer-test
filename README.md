# Gravie Software Engineer Challenge

## Instructions
After completing the challenge below, please send us an email with the location of your repository. If your repository is private, be sure to add us as collaborators so we can view your code.

### Time Box
3-4 Hours

## Synopsis

For this challenge you will implement the Giant Bomb API to create an application that will allow a user to search games and "rent" them. The application should consist of at least two unique pages (`search` and `checkout`). Your view should display the game thumbnail and title, and the rest is up to you. You can use any language and or framework you'd like.

![Giant Bomb](https://upload.wikimedia.org/wikipedia/en/4/4b/Giant_Bomb_logo.png)

You can get started by signing up for an API key [here](https://www.giantbomb.com/api/).

### Resources

You can find the quickstart guide [here](https://www.giantbomb.com/forums/api-developers-3017/quick-start-guide-to-using-the-api-1427959/).

You can find a full list of API features [here](https://www.giantbomb.com/api/documentation).

### Questions

Don't hesitate to reach out with any questions. Remember we are more focused on seeing your development process than checking off a list of requirements, so be sure you are able to speak to your code and your thoughts behind it.


### Start App
After cloning:
1. Install dependencies run the command: `npm install`
2. Create a file called `.env.local` at the root of the project
3. Add a variable and set value to the giant bomb API key `REACT_APP_API_KEY=[your key here]` ("[]" brackets are not needed.)
4. Run the command `npm start`


### Continued work

In the future I would add:
    - Prices for the games
    - Error handling to communicate issues to the user
    - Form validation
    - Unit and integration testing
    - Auth for signing up and logging in
    - A server with a SQL database to preserve data such as which games a user has currently rented
    - A page for returning games
    - A payment form
    - Ability to remove games from the selected games on the checkout page
    - Persist data for better UX when navigting to another page: 
    - Pagination to API calls for viewing more games
    - Additional search fields to limit searches, such as genre, dates etc.
    - Enhanced styling and responsiveness
    - Accessibility such as ARIA 
    - Organize files into folders to separate the pages, store, addtional components etc.
