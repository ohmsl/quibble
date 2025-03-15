import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './Layout';
import theme from './theme/theme';
import { RolesView } from './views/RolesView';
import { ScheduleView } from './views/ScheduleView';
import { MeetingSettingsView } from './views/Settings/MeetingSettingsView';
import { SettingsView } from './views/Settings/SettingsView';
import { ThemePreviewView } from './views/developer/ThemePreviewView';

createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<ScheduleView />} />
                    <Route path="/schedule" element={<ScheduleView />} />
                    <Route path="/roles" element={<RolesView />} />
                    <Route path="/settings" element={<SettingsView />} />
                    <Route path="/settings/meetings" element={<MeetingSettingsView />} />
                    <Route path="/developer/theme-preview" element={<ThemePreviewView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>,
);
