import express, { query } from "express";
import request from "supertest"

const app = express();


app.get('/', (req, res) => {
    const type = req.get("accept");
    res.send(`Hello ${type}`);
});


test("Test Header", async () => {
    const response = await request(app).get("/")
    .set("Accept", "text/plan" )
    expect(response.text).toBe("Hello text/plan");
})