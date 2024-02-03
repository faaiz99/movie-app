import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AddUpdateMovieModal } from "../../components/movie-details/AddUpdateMovieModal";

describe("AddUpdateMovieModal component", () => {
  const mockMovie = {
    // mock movie object
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
      <BrowserRouter >
        <AddUpdateMovieModal
          createMutation={mockCreateMutation}
          navigate={mockNavigate}
        />
      </BrowserRouter>
    );

    // Call the handleAddUpdateMovie function with the mock movie and operation
    handleAddUpdateMovie(mockMovie, mockOperation);

    // Assert that createMutation.mutate was called with the correct arguments
    expect(mockCreateMutation.mutate).toHaveBeenCalledWith(mockMovie, {
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });

    // Simulate a successful mutation
    mockCreateMutation.mutate.mock.calls[0][1].onSuccess();

    // Assert that the success alert was displayed
    expect(screen.getByText("Movie added successfully")).toBeInTheDocument();

    // Assert that handleShowAddUpdateModal was called
    expect(handleShowAddUpdateModal).toHaveBeenCalled();

    // Assert that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/");

    // Reset mock functions
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
        <AddUpdateMovieModal
          updateMutation={mockUpdateMutation}
          navigate={mockNavigate}
        />
      </BrowserRouter>
    );

    // Call the handleAddUpdateMovie function with the mock movie and operation
    handleAddUpdateMovie(mockMovie, "Update");

    // Assert that updateMutation.mutate was called with the correct arguments
    expect(mockUpdateMutation.mutate).toHaveBeenCalledWith(mockMovie, {
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });

    // Simulate a successful mutation
    mockUpdateMutation.mutate.mock.calls[0][1].onSuccess();

    // Assert that the success alert was displayed
    expect(screen.getByText("Movie updated successfully")).toBeInTheDocument();

    // Assert that handleShowAddUpdateModal was called
    expect(handleShowAddUpdateModal).toHaveBeenCalled();

    // Assert that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith("/");

    // Reset mock functions
    mockUpdateMutation.mutate.mockReset();
    mockNavigate.mockReset();
  });

  it("logs an error message for an invalid operation", () => {
    console.log = vi.fn();

    // render(
    //   <BrowserRouter>
    //     <AddUpdateMovieModal />
    //   </BrowserRouter>
    // );

    // Call the handleAddUpdateMovie function with the mock movie and an invalid operation
    handleAddUpdateMovie(mockMovie, "InvalidOperation");

    // Assert that console.log was called with the error message
    expect(console.log).toHaveBeenCalledWith("Invalid operation");

  });
});