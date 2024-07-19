import express, { query } from "express";
import request from "supertest"

const app = express();
// app.use(express.static(__dirname + "/static"));
app.use("/static", express.static(__dirname + "/static"));

app.get('/', (req, res) => {
    res.send(`Hello Response`);
});


test("Test Query", async () => {
    const response = await request(app).get("/");
    expect(response.text).toBe("Hello Response");
});


test("Test Query", async () => {
    const response = await request(app).get("/static/contoh.txt");
    expect(response.text).toBe("This is sample text");
});