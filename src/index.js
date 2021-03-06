import React from "react";
import ReactDOM from "react-dom";
import "./assets/base.scss";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckikrtqbzzng801xk4ce2fppe/master",
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
