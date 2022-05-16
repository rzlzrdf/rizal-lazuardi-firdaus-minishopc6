import { render, screen } from "@testing-library/react";
import Footer from "../Layout/Footer"

test("tes 1", () => {
    render(<Footer />);
    const linkElement = screen.getByText(/Minishop/i);
    expect(linkElement).toBeInTheDocument();
});