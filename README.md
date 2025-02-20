# Bakery Ops Frontend

## Start the project
- `npm install` to install dependencies
- `npm start` to start the project
- `npm run test` to run tests
- `npm run build` to build the project
- `npm run updateApi` to update the API client

## Important notes
- if backend API changes, run `npm run updateApi`

## Architecture notes

This project is based on react router v.6 and tanstack/react-query for data fetching.

- routes arr defined in `src/system/browserRouter.ts`
- the `Routes` folder should contain all the route entry points
- Each route folder should contain an `index.tsx` file that exports the route component
- `index.tsx` is used to provide navigation and fetched data to the child components
- components should be placed in the `components` folder
- components should be testable, meaning they should be able to be rendered in isolation, and all the data they need should be passed as props

### Forms
- we use generic forms based on react-hook-form
- there are two main generic forms: `GenericForm` and `FormWithData`
- do not use `GenericForm` directly, instead use `FormWithData`, which uses `GenericForm` internally
- `FormWithData` should be used as a child of `FormDataProvider`
- `FormDataProvider` is used to provide endpoints for create / update operations and handles navigation on success and cancel, as well as additional data that a form might need (like a list of options for a select input)
