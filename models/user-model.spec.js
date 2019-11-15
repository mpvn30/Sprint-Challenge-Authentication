const db = require("../database/dbConfig.js");
const request = require('supertest');
const server = require('../api/server.js')

describe('user model', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })
    it('should register new user', async () => {
        const user = await request(server).post('/api/auth/register').send({ username: 'register', password: 'register' })
        expect(user.body.username).toMatch(/register/)
    })

    it('should check logged in user', async () => {
        const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'test' })

        const login = await request(server).post('/api/auth/login').send({username: 'test', password: 'test'})
        expect(response.body.username).toMatch(/test/)
    })

    it('should return status 200 on login', async() => {

        //register
        const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'test' })

        //login
        const login = await request(server).post('/api/auth/login').send({username: 'test', password: 'test'})
        expect(login.status).toBe(200)
    })
})

describe('jokes', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })
    it('allow authenticated users to view api/jokes', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: "admin", password: "admin" })

        const login = await request(server).post('/api/auth/login')
        .send({ username: "admin", password: "admin" })
        .expect('Content-Type', /json/)
        const jokes = await request(server).get('/api/jokes')
        .auth('admin', 'admin')
        .set('authorization', login.body.token)
        .expect('Content-type', /json/)
    })
})
