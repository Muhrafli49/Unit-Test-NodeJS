import express, { query } from "express";
import request from "supertest"
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json())

app.get('/', (req, res) => {
    const name = req.cookies['name'];
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res ) => {
    const name = req.body.name;
    res.send("Login", name, {path: "/"});
    res.send(`Hello ${name}`);
})

test("Test Cookie Read", async () => {
    const response = await request(app).get("/")
        .set("Cookie", "name=Rapl")
    expect(response.text).toBe("Hello Rapl");
});

test("Test Cookie Write", async () => {
    const response = await request(app).get("/login")
        .send({name: "Rapl"});
    expect(response.get("Set-Cookie").toString("Login=Rapl; Path=/"))
    expect(response.text).toBe("Hello Rapl");
});