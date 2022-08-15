class General {
    get headerTitle() {
        return cy.get('h1');
    }
}

export const general = new General();
