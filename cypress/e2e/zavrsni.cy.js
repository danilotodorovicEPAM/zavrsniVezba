/// <reference types="Cypress" />

import { general } from '../page_objects/general';
import data from '../fixtures/data.json';
import { loginPage } from '../page_objects/login';
import { navigation } from '../page_objects/navigation'

let token;
let galleryID;

describe('Zavrsni rad', () => {
    before('Login', () => {
        cy.intercept('POST', 'https://gallery-api.vivifyideas.com/api/auth/login').as('login')
        cy.visit('/login');
        cy.url().should('contain', '/login');
        general.headerTitle.should('have.text', data.loginHeaderTitle);
        loginPage.login();
        navigation.logout.should('exist');
        cy.wait('@login').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
            token = intercept.response.body.access_token;
        })
    })

    beforeEach('Stay logged in', () => {
        window.localStorage.setItem('token', token);
    })

    it('Create gallery BE', () => {
        cy.request({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries',
            body: {
                title: data.createGallery.galleryTitle,
                description: "",
                images: [data.createGallery.image, data.createGallery.image]
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            expect(response.status).to.eq(201);
            expect(response.body.title).to.eq(data.createGallery.galleryTitle);
            galleryID = response.body.id;
            cy.writeFile('cypress/fixtures/variables.json', {galleryID : response.body.id})
        })
    })

    it('Edit gallery BE', () => {
        cy.request({
            method: 'PUT',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryID}`,
            body: {
                title: "edited title",
                description: "lele lele lele",
                images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/481px-Cat03.jpg"]
            },
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.body.description).to.eq("lele lele lele");
            console.log(response);
            expect(response.status).to.eq(200)
            expect(response.body.title).to.eq("edited title");
        })
    })

    it('Delete gallery BE', () => {
        cy.request({
            method: 'DELETE',
            url: `https://gallery-api.vivifyideas.com/api/galleries/${galleryID}`,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
})


let nesto = 123;
let nestoDrugo = `tekst${nesto}`
