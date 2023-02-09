Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Samuel')
    cy.get('#lastName').type('de Oliveira')
    cy.get('#email').type('samuoliveira1711@gmail.com')
    cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
    cy.get('.button').click()

    cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
})