import { render, screen } from "@testing-library/react";
import { Error } from "../../pages/error";

describe("Error component", () => {
  it("renders the correct error message", () => {
    render(<Error />);
    const errorMessage = screen.getByText(/Something went wrong!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the correct error code", () => {
    render(<Error />);
    const errorCode = screen.getByText(/500/i);
    expect(errorCode).toBeInTheDocument();
  });

  it("renders the correct error description", () => {
    render(<Error />);
    const errorDescription = screen.getByText(/Sorry, for the inconvenience/i);
    expect(errorDescription).toBeInTheDocument();
  });
});
