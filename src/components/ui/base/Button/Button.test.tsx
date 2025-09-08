// import { render, screen, fireEvent } from "@testing-library/react";
// import { Button } from "./Button";
// import jest from "jest";

// describe("Button", () => {
//     it("renders with default props", () => {
//         render(<Button>Click me</Button>);
//         expect(screen.getByText("Click me")).toBeInTheDocument();
//     });

//     it("calls onClick when clicked", () => {
//         const mockClick = jest.fn();
//         render(<Button onClick={mockClick}>Click</Button>);
//         fireEvent.click(screen.getByText("Click"));
//         expect(mockClick).toHaveBeenCalled();
//     });

//     it("shows loading spinner when loading", () => {
//         render(<Button loading>Loading</Button>);
//         expect(screen.getByRole("status")).toBeInTheDocument();
//     });

//     it("is disabled when disabled", () => {
//         render(<Button disabled>Disabled</Button>);
//         expect(screen.getByText("Disabled")).toBeDisabled();
//     });

//     it("shows left icon", () => {
//         render(<Button leftIcon={ArrowRight}>Left Icon</Button>);
//         expect(screen.getByTestId("button")).toContainElement(
//             screen.getByTestId("lucide-icon-arrow-right")
//         );
//     });
// });
