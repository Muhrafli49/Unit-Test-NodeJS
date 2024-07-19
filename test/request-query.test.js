import express, { query } from "express";
import request from "supertest"

const app = express();


app.get('/', (req, res) => {
    res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});


test("Test Query", async () => {
    const response = await request(app)
    .get("/")
    .query({firstName: "Muh", lastName: "Rapl"});
    expect(response.text).toBe("Hello Muh Rapl");
})