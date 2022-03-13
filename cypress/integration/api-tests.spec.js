describe('Test API endpoints', function() {


    afterEach(function() {
        cy.log('test is complete');

        cy.addResult(50, getTest(Cypress.currentTest.title), getStatus(this.currentTest.state), "passed from the aftereach; test")
        
        cy.log('result is now added');
    })


    it('C1 Test case 1', function() {
        // ... test code ... 
        expect(1).to.eq(1);

        // get corresponding result_id 
        // 449 is the result_id (and not the test_id ) and this is needs a command to be added to make it dynamic 

        cy.addAttachment(449);   // cy.addAttachment(result_id);
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