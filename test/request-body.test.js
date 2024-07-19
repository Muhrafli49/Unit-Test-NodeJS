import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";
import path from "path";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressFileUpload());

// Membuat folder upload jika belum ada
const uploadDir = path.join(__dirname, "upload");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.post('/json', (req, res) => {
    const name = req.body.name;
    res.json({
        hello: `Hello ${name}`
    });
});

app.post('/form', (req, res) => {
    const name = req.body.name;
    res.json({
        hello: `Hello ${name}`
    });
});

app.post("/file", async (req, res) => {
    const file = req.files.file;
    await file.mv(path.join(__dirname, "upload", file.name));
    res.send(`Hello ${req.body.name}, you uploaded ${file.name}`);
});

test("Test Request JSON", async () => {
    const response = await request(app)
        .post("/json")
        .set("Content-Type", "application/json")
        .send({ name: "World" });

    expect(response.body).toEqual({
        hello: "Hello World"
    });
});

test("Test Request Form", async () => {
    const response = await request(app)
        .post("/form")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send("name=World");

    expect(response.body).toEqual({
        hello: "Hello World"
    });
});

test("Test Request File Upload", async () => {
    const response = await request(app)
        .post("/file")
        .set("Content-Type", "multipart/form-data")
        .field("name", "Rapl")
        .attach("file", path.join(__dirname, "contoh.txt"));

    expect(response.text).toBe("Hello Rapl, you uploaded contoh.txt");
});
