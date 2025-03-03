import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { Roles } from "./views/Roles";
import { Schedule } from "./views/Schedule";

createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Schedule />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/roles" element={<Roles />} />
            </Route>
        </Routes>
    </BrowserRouter>,
);
