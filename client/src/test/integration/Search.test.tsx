import { render, screen, fireEvent } from "@testing-library/react";
import { Search } from "../../components/movie-search/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
describe("Search component", () => {
  it("renders the search input field", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>,
    );
    const searchInput = screen.getByText("Search your favourite movies...");
    expect(searchInput).toBeVisible();
  });

  it("toggles the modal on click", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>,
    );
    const searchContainer = screen.getByTestId("search-container");
    fireEvent.click(searchContainer);
    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeValid();
  });
});
