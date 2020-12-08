/// <reference types="cypress" />


describe("Our second suite", ()=> {
    it('then and wrap methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //wrong way

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // cy.contains('nb-card', 'Basic Form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic Form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //cypress style / jQuery then <-> expect

        cy.contains('nb-card', 'Using the Grid').then( firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(firstForm).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic Form').then( secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).to.equal(passwordLabelSecond)

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            }) 
        })
    });
})