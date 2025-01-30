import style from "./styles/App.module.scss";
import { SideNav } from "./components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Members, MembersDetails, MembersList } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className={style.main_container}>
        <SideNav />
        <section className={style.main_content}>
          <Routes>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />}>
              <Route index element={<MembersList />} />
              <Route path=":id" element={<MembersDetails />} />
            </Route>
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
