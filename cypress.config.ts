import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    excludeSpecPattern:['**/cypress/spec.cy.ts'],
  },
  env:{
    username:'kodin',
    password:'kodin',
  },
  
});
