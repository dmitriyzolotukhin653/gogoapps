import React from "react";
// @ts-ignore
import { render, waitFor } from "@testing-library/react";
import App from "./App";

test("renders app with search", async () => {
  const { getByText } = render(<App />);

  await waitFor(() => {
    expect(getByText(/search/i)).toBeInTheDocument();
  });
});
