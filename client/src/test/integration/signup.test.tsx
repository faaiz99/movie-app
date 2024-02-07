import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Signup } from "../../pages/signup";
import { BrowserRouter } from "react-router-dom";

describe("Signup component", () => {
  const alert = vi.spyOn(window, "alert").mockImplementation(() => {});
  it("renders the form elements", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    expect(emailInput).toBeVisible();
    expect(firstNameInput).toBeVisible();
    expect(lastNameInput).toBeVisible();
    expect(passwordInput).toBeVisible();
    expect(confirmPasswordInput).toBeVisible();
    expect(submitButton).toBeVisible();
  });

  it("validates required fields", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailError = screen.getByText("Email is required");
      const firstNameError = screen.getByText("First Name is required");
      const lastNameError = screen.getByText("Last Name is required");
      const passwordError = screen.getByText("Password is required");
      const confirmPasswordError = screen.getByText(
        "Confirm Password is required",
      );

      expect(emailError).toBeVisible();
      expect(firstNameError).toBeVisible();
      expect(lastNameError).toBeVisible();
      expect(passwordError).toBeVisible();
      expect(confirmPasswordError).toBeVisible();
    });
  });

  it("submits the form with valid data", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    expect(alert).toHaveBeenCalledWith("Registered Successfully");
  });

  it("displays an error message if registration fails", async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    const emailInput = screen.getByLabelText("Email");
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith("Error occured");
    });
  });
});
