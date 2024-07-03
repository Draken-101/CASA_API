import { Signale } from "signale"

const options = {
    disabled: false,
    interactive: false,
    logLevel: 'info',
    secrets: [],
    stream: process.stdout,
    types: {
        NewUser: {
            badge: '🆕',
            color: 'cyan',
            label: 'New User',
            logLevel: 'info'
        },
        Success: {
            badge: '✅',
            color: 'green',
            label: 'Success',
            logLevel: 'info'
        },
        Error: {
            badge: '🛑',
            color: 'red',
            label: 'Error',
            logLevel: 'info'
        },
        Login: {
            badge: '🔐',
            color: 'blue',
            label: 'Login',
            logLevel: 'info'
        },
        Info: {
            badge: 'ℹ️',
            color: 'magenta',
            label: 'Login',
            logLevel: 'info'
        },
    }
}

export const customText = {
    bold: '\x1b[1m',
    removeBold: '\x1b[0m',
    colors: {
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        blanco: '\x1b[37m'
        
    },
    end: "\x1b[0m"
}

export const custom = new Signale(options);
