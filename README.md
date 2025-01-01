# Local Setup: UI and Backend Setup for VigyanShaala Project

## Part A: UI Setup

### 1. Update Swagger Link
- Locate all `api.ts` files in the project directory.
- Replace the current `baseURL` with the local Swagger link:
  ```javascript
  baseURL: "http://localhost:8080"; // Change to local backend URL
  ```
- Save all changes.

### 2. Verify Swagger UI
- Open a web browser and navigate to:
  ```
  http://localhost:8080/swagger-ui.html
  ```
- Ensure the Swagger UI is accessible and all APIs are functional.

---

## Part B: Running the Code

### 1. Start the UI
- Open Command Prompt.
- Navigate to the UI project folder:
  ```bash
  cd path/to/ui/folder
  ```
- Run the following command:
  ```bash
  npm start
  ```



---




# UI of Job Portal & Automated templates

This application has 2 features called Job Portal and Template Generation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
