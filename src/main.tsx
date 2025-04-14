import { CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import theme from './theme/theme';

createRoot(document.getElementById('root') as HTMLElement).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
);
