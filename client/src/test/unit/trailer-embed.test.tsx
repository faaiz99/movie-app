import { render, screen } from "@testing-library/react";
import { TrailerEmbed } from "../../components/trailer_embed/trailer-embed";

describe("TrailerEmbed component", () => {
  const mockLink = "abcdefg"; // Only the video ID
  const mockTitle = "Movie Trailer";

  it("renders the iframe element with correct src", () => {
    render(<TrailerEmbed link={mockLink} title={mockTitle} />);
    const iframeElement = screen.getByTitle(mockTitle);
    expect(iframeElement).toHaveAttribute("src");
  });
  it("renders the iframe element with correct title", () => {
    render(<TrailerEmbed link={mockLink} title={mockTitle} />);
    const iframeElement = screen.getByTitle(mockTitle);
    expect(iframeElement).toBeVisible();
  });

  it("renders the iframe element with correct className", () => {
    render(<TrailerEmbed link={mockLink} title={mockTitle} />);
    const iframeElement = screen.getByTitle(mockTitle);
    expect(iframeElement).toHaveClass(
      "h-[65vh] w-full bg-gray-50 px-5 py-5 dark:bg-gray-900 lg:w-6/12",
    );
  });

  it("renders the iframe element with correct allow attribute", () => {
    render(<TrailerEmbed link={mockLink} title={mockTitle} />);
    const iframeElement = screen.getByTitle(mockTitle);
    expect(iframeElement).toHaveAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    );
  });

  it("renders the iframe element with allowFullScreen attribute", () => {
    render(<TrailerEmbed link={mockLink} title={mockTitle} />);
    const iframeElement = screen.getByTitle(mockTitle);
    expect(iframeElement).toHaveAttribute("allowFullScreen");
  });
});
