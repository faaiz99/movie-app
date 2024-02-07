import request from "supertest";

import app from "../../app";
describe("GET - Movie api - 200 OK", () => {
	let token: string;
	const testUser = {
		email: "test@gmail.com",
		firstName: "test",
		lastName: "test",
		password: "123",
	};
	beforeAll(async () => {
		const registerTestUser = await request(app)
			.post("/api/register")
			.send(testUser);
		const loginTestUser = await request(app).post("/api/login").send({
			email: testUser.email,
			password: testUser.password,
		});
		token = loginTestUser.body.token;
	});
	afterAll(async () => {
		await request(app).delete(`/api/user/${testUser.email}`);
	});
	it("should return 200 OK", async () => {
		const response = await request(app)
			.get("/api")
			.set("authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.text).toEqual("Movie API");
	});
});
