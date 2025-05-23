import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AuthLayout } from './layouts/AuthLayout';
import { Layout } from './layouts/Layout';
import { PageLayout } from './layouts/PageLayout';
import { LoaderGate } from './modules/initialisation/LoaderGate';
import pb from './modules/pocketbase/pb';
import { logger } from './utils/logger';
import { NotFound } from './views/404';
import { LoginView } from './views/auth/LoginView';
import { RegisterOrganisationView } from './views/auth/RegisterOrganisationView';
import { RegisterView } from './views/auth/RegisterView';
import { ThemePreviewView } from './views/developer/ThemePreviewView';
import { MembersView } from './views/MembersView';
import { RolesView } from './views/RolesView';
import { ScheduleView } from './views/ScheduleView';
import { MeetingSettingsView } from './views/settings/MeetingSettingsView';
import { SettingsView } from './views/settings/SettingsView';

export const App = () => {
    useEffect(() => {
        return () => {
            logger.info('Unsubscribing from all realtime subscriptions');
            pb.realtime.unsubscribe();
        };
    });

    return (
        <BrowserRouter>
            <LoaderGate>
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
                                <Route path="/members" element={<MembersView />} />
                                <Route path="/roles" element={<RolesView />} />
                                <Route path="/settings" element={<SettingsView />} />
                                <Route path="/settings/meetings" element={<MeetingSettingsView />} />
                                <Route path="/developer/theme-preview" element={<ThemePreviewView />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </AnimatePresence>
            </LoaderGate>
        </BrowserRouter>
    );
};
