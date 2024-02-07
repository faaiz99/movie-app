import { render, screen } from "@testing-library/react";
import { Spinner } from "../../components/spinner/spinner";

describe("Spinner component", () => {
  it("renders the Spinner component", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  it("renders the Spinner component with the correct background color", () => {
    render(<Spinner />);
    const containerElement = screen.getByTestId("spinner");
    expect(containerElement).toHaveClass("bg-gray-50 dark:bg-gray-900");
  });
});
