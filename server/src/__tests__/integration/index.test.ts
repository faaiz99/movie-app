import request from "supertest";
import app from "../../app";
describe("GET - Movie api - 200 OK", ()=>{
	let token: string;
	beforeAll(async()=>{
		const response = await request(app).post("/api/login").send({
			email:"test@gmail.com",
			password:"123"
		});
		token = response.body.token;
	});
	it("should return 200 OK", async()=>{
		const response = await request(app).get("/api").set("authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.text).toEqual("Movie API");
	});
});