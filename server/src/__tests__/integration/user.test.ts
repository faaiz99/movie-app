import request from "supertest";
import app from "../../app";
describe("User - Controller", () => {
	const payload = {
		email: "test6@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123"
	};
	afterAll(async () => {
		await request(app).delete(`/api/user/${payload.email}`);
	});

	describe("Registeration", () => {
		it("POST api/register should return 200 OK with valid data", async () => {
			const response = await request(app).post("/api/register").send(payload);
			expect(response.status).toBe(201);
			expect(response.body.email).toEqual(payload.email);
			expect(response.body.firstName).toEqual(payload.firstName);
			expect(response.body.lastName).toEqual(payload.lastName);
		});
		it("POST api/register should return 409 User Already Exists", async () => {
			const response = await request(app).post("/api/register").send(payload);
			expect(response.status).toBe(409);
		});

	});
	describe("Login", () => {
		it("POST api/login should return 200 OK with valid credentials", async () => { 
			const response = await request(app).post("/api/login").send({
				email: payload.email,
				password: payload.password
			});
			expect(response.status).toBe(200);
			expect(response.body.user.email).toEqual(payload.email);
			expect(response.body.user.firstName).toEqual(payload.firstName);
			expect(response.body.user.lastName).toEqual(payload.lastName);
			expect(response.body.token).toBeDefined();
		});
		it("POST api/login should return 401 Unauthorized with invalid credentials", async () => {
			const response = await request(app).post("/api/login").send({
				email: payload.email,
				password: "1234"
			});
			expect(response.status).toBe(401);
		});
	});


});