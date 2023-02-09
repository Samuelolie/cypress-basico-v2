Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobreNome')
    cy.get('#email').type('email@gmail.com')
    cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
    cy.get('.button').click()

    cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
})