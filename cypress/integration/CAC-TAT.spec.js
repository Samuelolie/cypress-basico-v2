/// <reference types = 'Cypress'/>

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    //EX 1
    it('Verifica o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //EX 1 Extra
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')
    });


    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobreNome')
        cy.get('#email').type('email#gmail.com')
        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });
    it('digita número telefônico inválido', () => {
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('nome').should('be.empty')
    });
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobreNome')
        cy.get('#email').type('email@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('nome').should('have.value', 'nome')
        cy.get('#firstName').clear().should('have.value', '')

        cy.get('#lastName').type('sobreNome').should('have.value', 'sobreNome')
        cy.get('#lastName').clear().should('have.value', '')

        cy.get('#email').type('email@gmail.com').should('have.value', 'email@gmail.com')
        cy.get('#email').clear().should('have.value', '')

        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('16992430279').should('have.value', '16992430279')
        cy.get('#phone').clear().should('have.value', '')

        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr').should('have.value', 'Obrigado Pela Ajuda Walmyr')
        cy.get('#open-text-area').clear().should('have.value', '')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    });
})
