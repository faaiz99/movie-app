import { render, screen } from "@testing-library/react"
import { Navbar } from "../../components/navbar/Navbar";
import { checkUserAuth } from '../../utils/checkAuthentication';
import { Mock } from "vitest";

vitest.mock('../../utils/checkAuthentication');

describe('Navbar component', () => {
  it('renders the navbar', () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole('navbar');
    expect(navbarElement).toBeVisible();
  });

  it('renders the brand', () => {
    render(<Navbar />);
    const brandElement = screen.getByRole('link', { name: /movie night/i });
    expect(brandElement).toBeVisible();
  });

  it('renders the authenticated component when user is authenticated', () => {
    (checkUserAuth as Mock).mockReturnValue(true);
    render(<Navbar />);
    const authenticatedElement = screen.getByTestId('authenticated');
    expect(authenticatedElement).toBeVisible();
  });

  it('renders the unauthenticated component when user is not authenticated', () => {
    (checkUserAuth as Mock).mockReturnValue(false);
    render(<Navbar />);
    const unauthenticatedElement = screen.getByTestId('unauthenticated');
    expect(unauthenticatedElement).toBeVisible();
  });
});