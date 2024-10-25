import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '~config': path.resolve(__dirname, './src/config'),
            '~core': path.resolve(__dirname, './src/core'),
            '~layout': path.resolve(__dirname, './src/layout'),
            '~modules': path.resolve(__dirname, './src/modules'),
            '~routers': path.resolve(__dirname, './src/routers'),

            '~css': path.resolve(__dirname, './src/shared/assets/css'),
            '~icons': path.resolve(__dirname, './src/shared/assets/icons'),
            '~components': path.resolve(__dirname, './src/shared/components'),
            '~hoc': path.resolve(__dirname, './src/shared/hoc'),

            '~view': path.resolve(__dirname, './src/view'),
        },
    },
    plugins: [react({ jsxImportSource: '@emotion/react' })],
});
