let run_id;

//Add a run 
Cypress.Commands.add('addTestRun', (proj_id, suite_id) => { 
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'_'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();    

    cy.request({
        method : 'POST', 
        url: Cypress.env('TR_LINK') + 'api/v2/add_run/' + Cypress.env('proj_id'), 
        headers : {
            "content-type": "application/json; charset=utf-8",
        },
        auth: {
            username: Cypress.env('TR_USER'),
            password: Cypress.env('TR_PASS')
        },
        body : {
            suite_id: Cypress.env('suite_id'),
            name: "Test run_" + date
        }
    }).then((resp) => {
            expect(resp.status).to.eq(200);  // true
            cy.task('set_run_id', resp.body.id); // setting run_id for the test
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
    }).then((resp) => {
            expect(resp.status).to.eq(200) // true
          }
    )
 })

 // Send attachments to test results  
Cypress.Commands.add('addAttachment', (result_id) => { 

    // cy.fixture('ua.png', 'binary').then(Cypress.Blob.base64StringToBlob).then((file) => {
    const formData = new FormData()
    var base64;

    cy.readFile("/Users/dsouzas/Personal/cypress-TR/test.png", 'base64').then((logo) => {
        cy.log(logo);

        formData.set('attachment', Cypress.Blob.base64StringToBlob(logo), 'test.png')  // get the base64 value programmatically

        cy.request({
            method : 'POST', 
            url: Cypress.env('TR_LINK') + '/api/v2/add_attachment_to_result/' + result_id, 
            headers : {
                "content-type": "multipart/form-data",
            },
            auth: {
                username: Cypress.env('TR_USER'),
                password: Cypress.env('TR_PASS')
            },
            body : formData
        }).then((resp) => {
                expect(resp.status).to.eq(200) // true
                }
        )

    })
        
    });

// Close run 
Cypress.Commands.add('closeRun', () => { 
    
    // test get run_id
    cy.task('get_run_id').then((id) => {
        cy.log(id);
        
        cy.request({
            method : 'POST', 
            url: Cypress.env('TR_LINK') + '/api/v2/close_run/' + id, 
            headers : {
                "content-type": "application/json; charset=utf-8",
            },
            auth: {
                username: Cypress.env('TR_USER'),
                password: Cypress.env('TR_PASS')
            }
        }).then((resp) => {
                expect(resp.status).to.eq(200) // true
              }
        )
     });
 })


