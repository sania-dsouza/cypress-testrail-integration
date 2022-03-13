describe('Start test run in TR', function() {

    it('Start test run in TR', function(){
        cy.addTestRun(Cypress.env('proj_id'), Cypress.env('suite_id'));  
        }
    )

})