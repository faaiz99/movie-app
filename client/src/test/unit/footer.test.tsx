import { render, fireEvent, screen } from "@testing-library/react";
import { Footer } from "../../components/footer/footer";
import { createMemoryHistory } from "history";
import { BrowserRouter } from "react-router-dom";

describe("Footer component", () => {
  it("renders the footer", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeVisible();
  });

  it("navigates to home page when Movies link is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const moviesLink = screen.getByText("Movies");
    fireEvent.click(moviesLink);
    expect(history.location.pathname).toBe("/");
  });

  it("navigates to sign up page when Sign up link is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/sign-up"] });
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const signUpLink = screen.getByText("Sign up");
    fireEvent.click(signUpLink);
    expect(history.location.pathname).toBe("/sign-up");
  });

  it("navigates to login page when Login link is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/login"] });
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    const loginLink = screen.getByText("Login");
    fireEvent.click(loginLink);
    expect(history.location.pathname).toBe("/login");
  });
});
