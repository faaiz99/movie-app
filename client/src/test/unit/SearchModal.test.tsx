import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../../components/movie-search/Modal";

describe("Modal component", () => {
  it("renders the search input field", () => {
    render(<Modal show={true} onClose={() => {}} />);
    const searchInput = screen.getByPlaceholderText("Search your favourite movies...");
    expect(searchInput).toBeInTheDocument();
  });

  it("calls the onClose function when closed", () => {
    const onCloseMock = vitest.fn();
    render(<Modal show={true} onClose={onCloseMock} />);
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("displays error message when there is an error", () => {
    const errorMessage = "An error occurred";
    render(<Modal show={true} onClose={() => {}} />);
    const errorDiv = screen.getByText(errorMessage);
    expect(errorDiv).toBeInTheDocument();
  });
});