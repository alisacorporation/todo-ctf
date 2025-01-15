# ToDo-CTF

Welcome to the ToDo-CTF pet project! This repository contains a Vue.js application using Vuetify for managing to-do tasks, integrated with various tools and configurations for development.

## Setup

To set up the project, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/alisacorporation/todo-ctf
cd todo-ctf
```

2. **Install dependencies:**
Make sure you have Node.js installed. Then run:

```bash
npm install
```
3. **Configuration:**
- Check `vue.config.js`, `.eslintrc.js`, and `babel.config.js` for any custom configurations you might want to adjust based on your development environment.

## Starting the Project

1. **Run the development server:**

```bash
npm run serve
```
This command will start the Vue.js server, and you should be able to view your application by navigating to the provided local URL in your browser.

2. **Building for Production:**
When you're ready to deploy your application:

```bash
npm run build
```

This command will create a `dist` folder with all the production-ready files.

## Additional Notes

- **Linting:** To check your code for style errors, run:

```bash
npm run lint
```

- **Browser Compatibility:** The `.browserslistrc` file specifies which browsers this project should support, based on usage statistics.

- **Vuetify:** We use Vuetify for UI components. Configuration can be found in `src/plugins/vuetify.js`.

- **State Management:** Vuex is used for state management. Check `src/store` for store modules and configurations.

- **Routing:** Vue Router is implemented for navigation. See `src/router/index.js` for route definitions.

Feel free to contribute to this project by opening issues or submitting pull requests. For any questions or further information, please reach out to the maintainers or check the documentation of the technologies used.

![Screenshot](https://raw.githubusercontent.com/alisacorporation/todo-ctf/master/Screenshot_2023-08-11_14-25-27.png)
