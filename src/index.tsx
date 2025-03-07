import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { RolesView } from "./views/RolesView";
import { ScheduleView } from "./views/ScheduleView";
import { SettingsView } from "./views/SettingsView";

createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<ScheduleView />} />
                <Route path="/schedule" element={<ScheduleView />} />
                <Route path="/roles" element={<RolesView />} />
                <Route path="/settings" element={<SettingsView />} />
            </Route>
        </Routes>
    </BrowserRouter>,
);
