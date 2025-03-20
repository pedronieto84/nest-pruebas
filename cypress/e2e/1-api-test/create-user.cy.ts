/// <reference types="cypress" />

describe('Create User API Test', () => {
    let token: string;

    beforeEach(() => {
        // Call the /login endpoint to get the token
        cy.request<{ token: string }>({
            method: 'POST',
            url: 'http://localhost:3000/auth/login', // Replace with your actual login endpoint
            body: {
                email: 'alejandro-0@Santander.com', // Replace with valid credentials
                password: '123456'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // Assert that the response status is 200
            expect(response.status).to.eq(200);

            // Extract the token from the response
            token = response.body.token;
        });
    });

    it('should create a user and return the same object with status 201', () => {
        // Define the user object to send in the POST request
        const user: { name: string; email: string; password: string; compId: number } = {
            name: "Cypress-test",
            email: `cypress-${Date.now()}@test.com`,
            password: "123456",
            compId: 1
        };

        // Make the POST request
        cy.request<{ name: string; email: string }>({
            method: 'POST',
            url: 'http://localhost:3000/users', // Replace with your actual endpoint
            body: user,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` // Include the token in the Authorization header
            }
        }).then((response) => {
            // Assert that the response status is 201
            expect(response.status).to.eq(201);

            // Assert that the response body matches the user object
            expect(response.body).to.deep.include({ name: user.name, email: user.email });
        });
    });
});
