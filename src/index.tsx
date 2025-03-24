import { ThemeProvider } from '@mui/material';
import { AnimatePresence } from 'motion/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Initialiser } from './components/Initialiser';
import { AuthLayout } from './layouts/AuthLayout';
import { Layout } from './layouts/Layout';
import { PageLayout } from './layouts/PageLayout';
import theme from './theme/theme';
import { RolesView } from './views/RolesView';
import { ScheduleView } from './views/ScheduleView';
import { MeetingSettingsView } from './views/Settings/MeetingSettingsView';
import { SettingsView } from './views/Settings/SettingsView';
import { LoginView } from './views/auth/LoginView';
import { RegisterOrganisationView } from './views/auth/RegisterOrganisationView';
import { RegisterView } from './views/auth/RegisterView';
import { ThemePreviewView } from './views/developer/ThemePreviewView';

createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Initialiser />
            <AnimatePresence mode="wait">
                <Routes>
                    <Route element={<Layout />}>
                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<LoginView />} />
                            <Route path="/register" element={<RegisterView />} />
                            <Route path="/register/organisation" element={<RegisterOrganisationView />} />
                            <Route path="/reset-password" />
                        </Route>

                        <Route element={<PageLayout />}>
                            <Route index element={<ScheduleView />} />
                            <Route path="/schedule" element={<ScheduleView />} />
                            <Route path="/roles" element={<RolesView />} />
                            <Route path="/settings" element={<SettingsView />} />
                            <Route path="/settings/meetings" element={<MeetingSettingsView />} />
                            <Route path="/developer/theme-preview" element={<ThemePreviewView />} />
                        </Route>
                    </Route>
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    </ThemeProvider>,
);
