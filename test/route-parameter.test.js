import express from "express";
import request from "supertest";

const app = express();

app.get('/products/:id', (req, res) => {
    const idProduct = req.params.id;
    res.send(`Product: ${idProduct}`);
});

app.get('/categories/:id(\\d+)', (req, res) => {
    const idProduct = req.params.id;
    res.send(`Category: ${idProduct}`);
});

app.get('/seller/:idSeller/products/:idProduct', (req, res) => {
    const idSeller = req.params.idSeller;
    const idProduct = req.params.idProduct;
    res.send(`Seller: ${idSeller} Product: ${idProduct}`);
});

test("Test Route Path", async () => {
    let response = await request(app).get("/products/rapl");
    expect(response.text).toBe("Product: rapl");

    response = await request(app).get("/products/salah");
    expect(response.text).toBe("Product: salah");

    response = await request(app).get("/categories/1234");
    expect(response.text).toBe("Category: 1234");

    response = await request(app).get("/categories/salah");
    expect(response.status).toBe(404);

    response = await request(app).get("/seller/567/products/890");
    expect(response.text).toBe("Seller: 567 Product: 890");
});
