import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { apolloClientAiApps, devTarget } from '@apollo/client-ai-apps/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { mcpInspector } from '@mcpjam/inspector/vite';

const target = devTarget(process.env.TARGET);

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    watch: process.argv.includes('--watch')
      ? { exclude: ['.application-manifest.json'] }
      : undefined
  },
  plugins: [
    apolloClientAiApps({
      targets: ['mcp', 'openai'],
      devTarget: target,
      appsOutDir: '../../apps',
      schema: '../../schema.graphql'
    }),
    react(),
    mcpInspector({
      server: {
        name: 'Flyby MCP Server',
        url: `http://localhost:8000/mcp?app=flyby&appTarget=${target}`
      },
      defaultTab: 'app-builder',
      cspMode: 'permissive'
    }),
    viteSingleFile()
  ]
});
