import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

import Login from "../src/pages/Login/Login";

import authReducer from "../src/redux/slices/authSlice";
import visitorReducer from "../src/redux/slices/visitorSlice";

describe("Login Page", () => {
  it("renders email, password and login button", () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        visitors: visitorReducer
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByDisplayValue("admin@example.com")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("admin123")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Login"
      })
    ).toBeInTheDocument();
  });
});