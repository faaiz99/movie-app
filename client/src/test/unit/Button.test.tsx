import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "../../components";
import { describe, it, expect } from "vitest"

describe("Button component", () => {

  it("renders the button", () => {
    const title = "Button"
    render(<Button title={title} />);
    const buttonElement = screen.queryByText(/Button/i)
    expect(buttonElement).toBeVisible()
   
  });

  it("renders the button with the correct title", () => {
    const title = "Click me";
    const { getByText } = render(<Button title={title} />);
    const buttonElement = getByText(title);
    expect(buttonElement).toBeVisible();
  });

  it("calls the onClick function when clicked", () => {
    const onClickMock = vitest.fn();
    const { getByText } = render(<Button title="Click me" onClick={onClickMock} />);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });
  it('renders children', () => {
    render(<Button title="Test Button"><span>Child</span></Button>);
    const childElement = screen.getByText('Child');
    expect(childElement).toBeInTheDocument();
  });

  it('renders with custom class', () => {
    render(<Button title="Test Button" className="custom-class" />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('custom-class');
  });

});