import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonSize, ButtonProps, ButtonType } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass",
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test button component", () => {
  test("default button ", () => {
    const wrapper = render(<Button {...defaultProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("different props button", () => {
    const wrapper = render(<Button {...testProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg klass");
  });
  it("link and href is provided button", () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="https://www.baidu.com/">
        link
      </Button>
    );
    const element = wrapper.getByText("link") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn-link");
  });
  it("disabled button", () => {
    const wrapper = render(<Button {...disabledProps}>nice</Button>);
    const element = wrapper.getByText("nice") as HTMLButtonElement;
    expect(element.disabled).toBeTruthy();
  });
});
