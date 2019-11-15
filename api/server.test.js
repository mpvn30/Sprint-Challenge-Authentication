const request = require("supertest");

const server = require("./server.js");

it("Check if db env is running on testing", function() {
    expect(process.env.DB_ENV).toBe("testing");
})

describe("server", function(){
    describe("GET", function(){
        it("should return 200 OK status", function(){
            return request(server)
            .get("/")
            .then(res => {
                expect(res.status).toBe(200);
            })
        })

        it("Should return JSON response", function() {
            return request(server)
            .get("/")
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
    })
})