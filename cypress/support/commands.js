Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const longText = 'teste ,teste, teste ,teste , teste ,teste , teste ,teste , teste ,teste , teste ,teste , teste ,teste , teste ,teste , teste ,teste , teste ,teste'
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobreNome')
    cy.get('#email').type('email@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
})