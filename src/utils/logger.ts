export type DebugLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';
import { Chalk } from 'chalk';

const chalk = new Chalk({ level: 3 });

type LoggerFunction = (...messages: any[]) => void;

export interface Logger {
    trace: LoggerFunction;
    debug: LoggerFunction;
    info: LoggerFunction;
    warn: LoggerFunction;
    error: LoggerFunction;
    setLevel: (level: DebugLevel) => void;
}

let currentLevel: DebugLevel = (import.meta.env.VITE_LOG_LEVEL ?? import.meta.env.DEV) ? 'debug' : 'info';

export const logger: Logger = {
    trace: (...messages: any[]) => log('trace', undefined, messages),
    debug: (...messages: any[]) => log('debug', undefined, messages),
    info: (...messages: any[]) => log('info', undefined, messages),
    warn: (...messages: any[]) => log('warn', undefined, messages),
    error: (...messages: any[]) => log('error', undefined, messages),
    setLevel,
};

export function createScopedLogger(scope: string): Logger {
    return {
        trace: (...messages: any[]) => log('trace', scope, messages),
        debug: (...messages: any[]) => log('debug', scope, messages),
        info: (...messages: any[]) => log('info', scope, messages),
        warn: (...messages: any[]) => log('warn', scope, messages),
        error: (...messages: any[]) => log('error', scope, messages),
        setLevel,
    };
}

function setLevel(level: DebugLevel) {
    if ((level === 'trace' || level === 'debug') && import.meta.env.PROD) {
        return;
    }

    currentLevel = level;
}

function log(level: DebugLevel, scope: string | undefined, messages: unknown[]): void {
    const levelOrder: DebugLevel[] = ['trace', 'debug', 'info', 'warn', 'error'];

    if (levelOrder.indexOf(level) < levelOrder.indexOf(currentLevel)) {
        return;
    }

    const labelBackgroundColor = getColorForLevel(level);
    const labelTextColor = level === 'warn' ? '#000000' : '#FFFFFF';

    const labelStyles = getLabelStyles(labelBackgroundColor, labelTextColor);
    const scopeStyles = getLabelStyles('#77828D', 'white');

    const parts: string[] = [];
    const styles: string[] = [];

    parts.push(`%c ${level.toUpperCase()} `);
    styles.push(labelStyles);

    if (scope) {
        parts.push(`%c ${scope} `);
        styles.push(scopeStyles);
    }

    if (typeof window !== 'undefined') {
        console.log(parts.join(' '), ...styles, ...messages);
    } else {
        const prefix = scope
            ? `${formatText(` ${level.toUpperCase()} `, labelTextColor, labelBackgroundColor)} ${formatText(` ${scope} `, '#FFFFFF', '#77828D')}`
            : `${formatText(` ${level.toUpperCase()} `, labelTextColor, labelBackgroundColor)}`;
        console.log(prefix, ...messages);
    }
}

function formatText(text: string, color: string, bg: string) {
    return chalk.bgHex(bg)(chalk.hex(color)(text));
}

function getLabelStyles(color: string, textColor: string) {
    return `background-color: ${color}; color: white; border: 4px solid ${color}; color: ${textColor};`;
}

function getColorForLevel(level: DebugLevel): string {
    switch (level) {
        case 'trace':
        case 'debug': {
            return '#77828D';
        }
        case 'info': {
            return '#1389FD';
        }
        case 'warn': {
            return '#FFDB6C';
        }
        case 'error': {
            return '#EE4744';
        }
        default: {
            return '#000000';
        }
    }
}

export const renderLogger = createScopedLogger('Render');
