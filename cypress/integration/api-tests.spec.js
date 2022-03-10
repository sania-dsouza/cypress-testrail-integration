

describe('Test API endpoints', function() {

    // before(function(){
    //     cy.addTestRun(1,1);  // add run for proj_id = 1 and suite_id=1
    //     }
    // )

    afterEach(function() {
        cy.log('test is complete');

        cy.addResult(9, getTest(Cypress.currentTest.title), getStatus(this.currentTest.state), "passed from the aftereach; test")
        
    })

    after(function() {
        cy.closeRun(9);
    })


    it('C1 Test case 1', function() {
        // ... test code ... 
        expect(1).to.eq(1);
    })

    it('C2 Test case 2', function() {
        // ... test code ... 
        expect(1).to.eq(1);
    })

    it('C3 Test case 3 fails', function() {
        // ... test code ... 
        expect(1).to.eq(1);
    })

    
})

function getTest(test_desc){
    var temp, test; 
    temp = test_desc.split(" ")[0];
    test = temp.substring(1,);
    return test
}

function getStatus(state) {
    var temp;
    if (state == "passed") temp = 1;
    else if (state == "failed") temp = 5;
    return temp;
}