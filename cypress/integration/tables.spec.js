/// <reference types="cypress" />

describe('operation on table', ()=> {
    it("Web tables", () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 Edi one column
        cy.get('tbody').contains('tr', 'Larry').then( tableRow=> {
            cy.wrap(tableRow).find('.nb-edit').close()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })

        //2 Adding User
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Wasyl')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Mowczan')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then( tablecolumns => {
            cy.wrap(tableRow).eq(2).should('contain', 'Wasyl')
            cy.wrap(tableRow).eq(3).should('contain', 'Mowczan')
        })

        //3 Filter by age
        const age = [20,30,40,200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type('20')
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
                }
            })
        })
    });
})