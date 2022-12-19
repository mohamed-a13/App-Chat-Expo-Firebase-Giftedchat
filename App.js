import React from "react";
import Navigation from "./src/navigation";
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "Warning: Async Storage has been extracted from react-native core",
]);

const App = () => {
  return <Navigation />;
};

export default App;
