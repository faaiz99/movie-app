import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../../components/movie_search/modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
describe("Modal component", () => {
  it("renders the search input field", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Modal show={true} onClose={() => {}} />
      </QueryClientProvider>,
    );
    const searchInput = screen.getByText(/Search your favourite movies.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it("calls the onClose function when closed", () => {
    const onCloseMock = vitest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <Modal show={true} onClose={onCloseMock} />
      </QueryClientProvider>,
    );
    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("displays error message when there is an error", () => {
    const errorMessage = "An error occurred";
    render(
      <QueryClientProvider client={queryClient}>
        <Modal show={true} onClose={() => {}} />
      </QueryClientProvider>,
    );
    const errorDiv = screen.getByText(errorMessage);
    expect(errorDiv).toBeInTheDocument();
  });
});
