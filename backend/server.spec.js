import "dotenv/config";
import request from "supertest";
import { app as server } from "./src/server/app.js";

const adminTest = {
  email: process.env.ADMIN_EMAIL, // Usa la variable de entorno
  password: process.env.ADMIN_PASSWORD, // Usa la variable de entorno
  name: "admina",
};

const fakeAdminTest = {
  email: `admin${Math.random()}@gmail.com`,
  password: "admin123a",
  name: "admina",
};
const fakeProduct = {
  name: "productofalso",
  description: "descripcionfalsa",
  price: 12000,
  stock: 5,
  creationdate: "1725933777719",
  image: "imagenfalsa",
  categoryid: 1,
  gender: "falso",
};

describe("Operaciones CRUD Tienda", () => {
  test("Test - Login Status 200. ", async () => {
    const response = await request(server).post("/login").send(adminTest);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - Login Status 404. ", async () => {
    const response = await request(server).post("/login").send(fakeAdminTest);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - Register Status 409. ", async () => {
    const response = await request(server).post("/register").send(adminTest);
    expect(response.status).toBe(409);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - Register Status 201. ", async () => {
    const response = await request(server)
      .post("/register")
      .send(fakeAdminTest);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - Products post Status 201. ", async () => {
    const response = await request(server).post("/products").send(fakeProduct);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - Products post Status 409. ", async () => {
    const response = await request(server).post("/products").send({});
    expect(response.status).toBe(409);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - Products get Status 200. ", async () => {
    const response = await request(server).get("/products").send();
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  test("Test - error ", async () => {
    const response = await request(server).post("/asdasd").send();
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
  });
});
