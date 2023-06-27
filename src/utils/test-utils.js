/* eslint-disable import/no-extraneous-dependencies */
import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@store/configureStore";
const store = configureStore({});
const AllTheProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <Provider store={store}>{children}</Provider>;
    </MemoryRouter>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

export default customRender;
