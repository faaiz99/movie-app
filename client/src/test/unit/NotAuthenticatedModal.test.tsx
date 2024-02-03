import { render, screen } from "@testing-library/react";
import { NotAuthenticatedModal } from "../../components/modal/NotAuthenticatedModal";
import { BrowserRouter } from "react-router-dom";

describe('NotAuthenticatedModal component', () => {
  const mockShow = true;
  const mockMessage = "You are not authenticated.";
  it('renders the modal when show is true', () => {
    render(
      <BrowserRouter>
        <NotAuthenticatedModal show={mockShow} message={mockMessage} />
      </BrowserRouter>
    );
    const modalElement = screen.getByText(mockMessage);
    expect(modalElement).toBeVisible();
  });

  it('does not render the modal when show is false', () => {
    render(
      <BrowserRouter>
        <NotAuthenticatedModal show={false} message={mockMessage} />
      </BrowserRouter>
    );
    const modalElement = screen.queryByText(mockMessage);
    expect(modalElement).toBeNull();
  });
});