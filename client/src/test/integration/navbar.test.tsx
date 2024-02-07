import { render, screen } from "@testing-library/react";
import { Navbar } from "../../components/navbar/navbar";
import { checkUserAuth } from "../../hooks/useAuth";

import { Mock } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
const queryClient = new QueryClient();
vitest.mock("../../utils/checkAuthentication");

describe("Navbar component", () => {
  it("renders the navbar", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    const navbarElement = screen.getByRole("navbar");
    expect(navbarElement).toBeVisible();
  });

  it("renders the brand", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    const brandElement = screen.getByRole("link", { name: /movie night/i });
    expect(brandElement).toBeVisible();
  });

  it("renders the authenticated component when user is authenticated", () => {
    (checkUserAuth as Mock).mockReturnValue(true);
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    const authenticatedElement = screen.getByText(/Open main menu/i);
    expect(authenticatedElement).toBeVisible();
  });

  it("renders the unauthenticated component when user is not authenticated", () => {
    (checkUserAuth as Mock).mockReturnValue(false);
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Navbar />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    const unauthenticatedElement = screen.getByText(/Open main menu/i);
    expect(unauthenticatedElement).toBeVisible();
  });
});
