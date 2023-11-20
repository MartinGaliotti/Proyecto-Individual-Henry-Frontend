import { describe, afterEach, it, expect } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Landing from "../src/views/Landing/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import pathName from "../src/helpers/PATHNAME.routes";

describe("Landing page", () => {
  afterEach(cleanup);

  const landing = (
    <BrowserRouter>
      <Routes>
        <Route path={pathName.LANDING} element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
  it("should render", () => {
    render(landing);
  });

  it("should render button", async () => {
    render(landing);
    const homeButton = screen.getByRole("button");
    expect(homeButton).toBeDefined();
  });
  it("the button contains the string 'INICIO'", async () => {
    render(landing);
    const homeButton = screen.getByRole("button");
    expect(homeButton.innerHTML).toBe("INICIO");
  });
  it("When HOME button is clicked, it redirects to home", async () => {
    render(landing);
    const homeButton = screen.getByRole("button");
    expect(window.location.pathname).toBe(pathName.LANDING);
    homeButton.click();
    expect(window.location.pathname).toBe(pathName.HOME);
  });
});
