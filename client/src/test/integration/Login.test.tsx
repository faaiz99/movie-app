/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../pages/Login";

describe("Login page", () => {
  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = screen.getByLabelText("Your email");
    const passwordInput = screen.getByLabelText("Password");
    const rememberCheckbox = screen.getByLabelText("Remember me");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberCheckbox).toBeInTheDocument();
  });

  it("updates the email input value correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const emailInput = screen.getByLabelText("Your email");
    const testEmail = "test@example.com";
    fireEvent.change(emailInput, { target: { value: testEmail } });
    //@ts-ignore
    expect(emailInput.value).toBe(testEmail);
  });

  it("updates the password input value correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const passwordInput = screen.getByLabelText("Password");
    const testPassword = "testpassword";
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    //@ts-ignore
    expect(passwordInput.value).toBe(testPassword);
  });

  it("updates the remember checkbox value correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const rememberCheckbox = screen.getByLabelText("Remember me");
    fireEvent.click(rememberCheckbox);
    //@ts-expect-error
    expect(rememberCheckbox.checked).toBe(true);
  });

  it("submits the form with correct data", () => {
    const onSubmit = vi.fn();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "testpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(onSubmit).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });
});
