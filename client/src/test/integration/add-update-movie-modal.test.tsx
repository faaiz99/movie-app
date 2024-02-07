import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AddUpdateMovieModal } from "../../components/movie_details/add-update-movie-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

describe("AddUpdateMovieModal component", () => {
  const mockMovie = {
    title: "Sample Movie",
    description: "This is a sample movie description",
    poster: "https://example.com/poster.jpg",
    trailer: "https://www.youtube.com/watch?v=1234",
    userId: "1234",
    id: "1234",
  };

  const mockOperation = "Create";
  const handleShowAddUpdateModal = vi.fn();
  const handleAddUpdateMovie = vi.fn();

  it("calls createMutation.mutate with the correct arguments and navigates to the home page on success", () => {
    const mockCreateMutation = {
      mutate: vi.fn(),
    };

    const mockNavigate = vi.fn();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AddUpdateMovieModal
            movie={mockMovie}
            operation={mockOperation}
            show={true}
            handleShowAddUpdateModal={handleShowAddUpdateModal}
          />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    handleAddUpdateMovie(mockMovie, mockOperation);

    expect(mockCreateMutation.mutate).toHaveBeenCalledWith(mockMovie, {
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });

    mockCreateMutation.mutate.mock.calls[0][1].onSuccess();

    expect(screen.getByText("Movie added successfully")).toBeInTheDocument();

    expect(handleShowAddUpdateModal).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/");

    mockCreateMutation.mutate.mockReset();
    mockNavigate.mockReset();
  });

  it("calls updateMutation.mutate with the correct arguments and navigates to the home page on success", () => {
    const mockUpdateMutation = {
      mutate: vi.fn(),
    };

    const mockNavigate = vi.fn();

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AddUpdateMovieModal
            movie={mockMovie}
            operation={"Update"}
            show={true}
            handleShowAddUpdateModal={handleShowAddUpdateModal}
          />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    handleAddUpdateMovie(mockMovie, "Update");

    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith(mockMovie, {
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });

    mockUpdateMutation.mutate.mock.calls[0][1].onSuccess();
    expect(screen.getByText("Movie updated successfully")).toBeInTheDocument();
    expect(handleShowAddUpdateModal).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    mockUpdateMutation.mutate.mockReset();
    mockNavigate.mockReset();
  });
});
