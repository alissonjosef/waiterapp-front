import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Headers } from "./components/Header";
import { Orders } from "./components/Orders";

export function App() {
  return (
    <>
      <GlobalStyles />
      <Headers/>
      <Orders/>
      <ToastContainer position="bottom-center" />
    </>
  );
}
