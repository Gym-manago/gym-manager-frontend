import logo from "/logo.jpeg";
import style from "./styles/App.module.scss";
import { SideNav } from "./components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className={style.main_container}>
        <SideNav />
        <section className={style.main_content}>
          <Routes>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <img src={logo} className={style.img} />
                  <h1>Hello Ma!!</h1>
                </>
              }
            />
            <Route
              path="/members"
              element={
                <>
                  <img src={logo} className={style.img} />
                  <h1>Hello Pa!!</h1>
                </>
              }
            />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
