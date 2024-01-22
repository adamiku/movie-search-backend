# Movie search application

Simple ExpressJS backend to proxy and cache for 2 minutes the responses from [TMDB](https://www.themoviedb.org/), available here: https://movie-search-6z7r.onrender.com

Simple React frontend application for searching movies from the TMDB, frontend available here: https://movie-search-frontend.onrender.com/

## Development

- For data fetching I used axios
- The caching is inmemory as it should live only for 2 minutes, so there is no issue if it losts
- Deployed to Render
- Used githooks with husky to automate processes like linting, testing, conventional commit forcing

## Improvements for the codebase

- as a next step for a more advanced version Serverless architecture could be used e.g. with AWS Lambda and a managed Redis as an inmemory key-value database for storing the cache
- implement proper queryparam and data validation
- create Swagger for document API endpoints
- increase testing coverage and check coverage after each commit, write integration tests
- create a Contribute.md to highlight how someone can contribute to the project
- add proper CI/CD (e.g.: github actions)
- implement proper logging and monitoring system

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname
  }
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
