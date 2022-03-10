// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//Add a run 
Cypress.Commands.add('addTestRun', (proj_id, suite_id) => { 
    cy.request({
        method : 'POST', 
        url: Cypress.env('TR_LINK') + 'api/v2/add_run/1', 
        headers : {
            "content-type": "application/json; charset=utf-8",
        },
        auth: {
            username: Cypress.env('TR_USER'),
            password: Cypress.env('TR_PASS')
        },
        body : {
            suite_id: 1,
            name: "This is created programmatically from a custom command"
        }
    }).then((resp) => {
            expect(resp.status).to.eq(200) // true
          }
    )
 })


 // Send test results for test  
Cypress.Commands.add('addResult', (run_id, case_id, status, comment) => { 
    cy.request({
        method : 'POST', 
        url: Cypress.env('TR_LINK') + '/api/v2/add_result_for_case/' + run_id + '/' + case_id, 
        headers : {
            "content-type": "application/json; charset=utf-8",
        },
        auth: {
            username: Cypress.env('TR_USER'),
            password: Cypress.env('TR_PASS')
        },
        body : {
            "status_id" : status,
            "comment" : comment
        }
        // body : {
        //     suite_id: 1,
        //     name: "This is created programmatically from a custom command"
        // }
    }).then((resp) => {
            expect(resp.status).to.eq(200) // true
          }
    )
 })

// Close run 
Cypress.Commands.add('closeRun', (run_id) => { 
    cy.request({
        method : 'POST', 
        url: Cypress.env('TR_LINK') + '/api/v2/close_run/' + run_id, 
        headers : {
            "content-type": "application/json; charset=utf-8",
        },
        auth: {
            username: Cypress.env('TR_USER'),
            password: Cypress.env('TR_PASS')
        }
        // body : {
        //     suite_id: 1,
        //     name: "This is created programmatically from a custom command"
        // }
    }).then((resp) => {
            expect(resp.status).to.eq(200) // true
          }
    )
 })


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
