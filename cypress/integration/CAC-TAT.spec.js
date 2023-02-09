/// <reference types = 'Cypress'/>

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.fillMandatoryFieldsAndSubmit()
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Samuel')
        cy.get('#lastName').type('de Oliveira')
        cy.get('#email').type('samuoliveira1711#gmail.com')
        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
        cy.get('.button').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });
    it('digita número telefônico inválido', () => {
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('samuel').should('be.empty')
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Samuel')
        cy.get('#lastName').type('de Oliveira')
        cy.get('#email').type('samuoliveira1711#gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
        cy.get('.button').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Samuel').should('have.value', 'Samuel')
        cy.get('#firstName').clear().should('have.value', '')

        cy.get('#lastName').type('de Oliveira').should('have.value', 'de Oliveira')
        cy.get('#lastName').clear().should('have.value', '')

        cy.get('#email').type('samuoliveira1711@gmail.com').should('have.value', 'samuoliveira1711@gmail.com')
        cy.get('#email').clear().should('have.value', '')

        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('16992430279').should('have.value', '16992430279')
        cy.get('#phone').clear().should('have.value', '')

        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr').should('have.value', 'Obrigado Pela Ajuda Walmyr')
        cy.get('#open-text-area').clear().should('have.value', '')
        cy.get('.button').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('.button').click()
        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });
})
