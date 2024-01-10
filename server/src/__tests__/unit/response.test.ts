import { handleResponse } from "../../utils/response";

describe("handleResponse", () => {
	let mockResponse: any;

	beforeEach(() => {
		mockResponse = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should set the response status and send the data as JSON", () => {
		const status = 200;
		const data = { message: "Success" };

		handleResponse(mockResponse, status, data);

		expect(mockResponse.status).toHaveBeenCalledWith(status);
		expect(mockResponse.json).toHaveBeenCalledWith(data);
	});
});
