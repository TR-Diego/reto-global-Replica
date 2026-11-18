import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

const isLoopbackHost = (host: string) =>
  ['localhost', '127.0.0.1', '::1'].includes(host.toLowerCase().replace(/^\[|\]$/g, ''));

function localShutdownPlugin(): Plugin {
  return {
    name: 'retoglobal-local-shutdown',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__retoglobal/shutdown', (request, response) => {
        if (request.method !== 'POST') {
          response.statusCode = 405;
          response.end('Method not allowed');
          return;
        }

        const remoteAddress = request.socket.remoteAddress ?? '';
        const isLocalClient = ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remoteAddress);
        const hostHeader = request.headers.host ?? '';
        const originHeader = request.headers.origin ?? '';
        let sameLocalOrigin = false;
        try {
          const requestedHost = new URL(`http://${hostHeader}`).hostname;
          const origin = new URL(originHeader);
          sameLocalOrigin = origin.host === hostHeader && isLoopbackHost(requestedHost) && isLoopbackHost(origin.hostname);
        } catch {
          sameLocalOrigin = false;
        }

        if (!isLocalClient || !sameLocalOrigin || request.headers['sec-fetch-site'] === 'cross-site') {
          response.statusCode = 403;
          response.end('Local same-origin request required');
          return;
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.end(JSON.stringify({ stopped: true }), () => {
          setTimeout(() => {
            void server.close().finally(() => process.exit(0));
          }, 250);
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localShutdownPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
