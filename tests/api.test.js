const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('Library API', () => {

    test('Return all books', async () => {
        const response = await request(app).get('/api/books');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3);
    });

    // Test for a book that exists
    test('Return book by ID', async () => {
    const response = await request(app).get('/api/books/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('title');
    });

    // Test for a book that does not exist
    test('Return book by ID', async () => {
        const response = await request(app).get('/api/books/999');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('Create a new book', async () => {
        const newbook = {
            title: "The Happiness Hypothesis",
            author: "Jonathan Haidt",
            genre: "Philosophy/Self-Help",
            copiesAvailable: 1
        };
        const response = await request(app)
        .post('/api/books')
        .send(newbook);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('The Happiness Hypothesis');
    });

    // Test for a book that exists    
    test('Update existing book', async () => {
        const updatedbook = {
            title: "The Book Thief",
            author: "Markus Zusak",
            genre: "Historical-Fiction",
            copiesAvailable: 9
        };
        const response = await request(app)
        .put('/api/books/1')
        .send(updatedbook);
        expect(response.status).toBe(200);
        expect(response.body.genre).toBe('Historical-Fiction');
    });
    
    // Test for a book that does not exist    
    test('Update existing book', async () => {
        const updatedbook = {
            title: "The Book Thief",
            author: "Markus Zusak",
            genre: "Historical-Fiction",
            copiesAvailable: 9
        };
        const response = await request(app)
        .put('/api/books/99')
        .send(updatedbook);
        expect(response.status).toBe(404);
    });

    // Test for a book that exists
    test('Delete existing book', async () => {
        const response = await request(app).delete('/api/books/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    // Test for a book that does not exist
    test('Delete existing book', async () => {
        const response = await request(app).delete('/api/books/42');
        expect(response.status).toBe(404);
    });

});