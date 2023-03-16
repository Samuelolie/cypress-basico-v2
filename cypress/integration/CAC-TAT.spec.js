/// <reference types = 'Cypress'/>

describe('Central de Atendimento ao Cliente TAT', () => {
    const tres_segundos = 3000

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', () => {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').contains('Mensagem enviada com sucesso.').should('be.visible')

        cy.tick(tres_segundos)

        cy.get('.success').contains('Mensagem enviada com sucesso.').should('not.be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()

        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobreNome')
        cy.get('#email').type('email#gmail.com')
        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')

        cy.tick(tres_segundos)

        cy.get('.error').contains('Valide os campos obrigatórios!').should('not.be.visible')
    });

    it('digita número telefônico inválido', () => {
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('nome').should('be.empty')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()

        cy.get('#firstName').type('nome')
        cy.get('#lastName').type('sobreNome')
        cy.get('#email').type('email@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Obrigado Pela Ajuda Walmyr')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')

        cy.tick(tres_segundos)

        cy.get('.error').contains('Valide os campos obrigatórios!').should('not.be.visible')
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
        cy.clock()

        cy.contains('button', 'Enviar').click()
        cy.get('.error').contains('Valide os campos obrigatórios!').should('be.visible')
        cy.tick(tres_segundos)

        cy.get('.error').contains('Valide os campos obrigatórios!').should('not.be.visible')
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

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function (input) {
                expect(input[0].files[0].name).to.be.equal('example.json')
            })

    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: "drag-drop" })
            .should(function (input) {
                expect(input[0].files[0].name).to.be.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a')
            .should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#title')
            .should('contain', 'CAC TAT - Política de privacidade')
        cy.contains('Talking About Testing')
            .should('be.visible')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click()
        cy.get('#title')
            .should('contain', 'CAC TAT - Política de privacidade')
        cy.contains('Talking About Testing')
            .should('be.visible')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const textolongo = Cypress._.repeat('12345678', 20)

        cy.get('#open-text-area')
            .invoke('val', textolongo)
            .should('have.value', textolongo)
    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (response) {
                const { status, statusText, body } = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })

    });
    it('Encontra o gato escondido', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu ❤️ Gatos!')
    });
})
