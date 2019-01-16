// cypress/integration/spec.ts
it('loads', () => {
  cy.visit('http://localhost:4200');
  cy.get('angular-tag-cloud').contains('weight-8');
});

it('retreives static example data', () => {
  cy.get('#staticDataBtn').click();
  cy.get('angular-tag-cloud').contains('example-1');
  cy.get('angular-tag-cloud').contains('example-2');
  cy.get('angular-tag-cloud').contains('example-3');
  cy.get('angular-tag-cloud').contains('example-4');
  cy.get('angular-tag-cloud').contains('example-5');
  cy.get('angular-tag-cloud').contains('example-6');
  cy.get('angular-tag-cloud').contains('example-7');
  cy.get('angular-tag-cloud').contains('example-8');
  cy.get('angular-tag-cloud').contains('example-9');
  cy.get('angular-tag-cloud').contains('example-10');
});
