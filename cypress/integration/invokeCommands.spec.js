/// <reference types="cypress" />


describe("Our third suite", ()=> {
    it('invoke commands', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail"]').then( label => {
            expect( label.text()).to.equal('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail"]').invoke('text').then( text => {
          expect( text).to.equal('Email address')  
        })

        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //1
            //.should('contain', 'checked')
            //2
            .then( classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it("assert property", () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 17 2020')
        })
    });
})