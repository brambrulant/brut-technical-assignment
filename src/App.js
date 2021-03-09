import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Cases from "./Components/Cases";

export default function App() {
  return (
    <Switch>
      <Route path="/case/:caseId" component={Cases} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
