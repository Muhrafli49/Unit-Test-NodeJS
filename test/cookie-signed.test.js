import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser('COOKIESECRET'));
app.use(express.json());

app.get('/', (req, res) => {
    const name = req.signedCookies["name"];
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie('name', name, { path: "/", signed: true });
    res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
    // Menulis cookie yang ditandatangani untuk pengujian
    const loginResponse = await request(app).post("/login").send({ name: "Rapl" });
    const cookie = loginResponse.headers['set-cookie'][0].split(';')[0];

    const response = await request(app).get("/")
        .set("Cookie", cookie);
    expect(response.text).toBe("Hello Rapl");
});

test("Test Cookie Write", async () => {
    const response = await request(app).post("/login")
        .send({ name: "Rapl" });
    expect(response.get("Set-Cookie").toString()).toContain("name=s%3ARapl");
    expect(response.text).toBe("Hello Rapl");
});
