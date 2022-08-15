class Navigation {
    get logout() {
        return cy.get('a[role="button "]');
    }
}

export const navigation = new Navigation();