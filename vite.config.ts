import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import svelteKitPackage from './node_modules/@sveltejs/kit/package.json' with { type: 'json' };
import flowbitesvelteiconsPackage from './node_modules/flowbite-svelte-icons/package.json' with { type: 'json' };
import flowbitesveltePackage from './node_modules/flowbite-svelte/package.json' with { type: 'json' };
import sveltePackage from './node_modules/svelte/package.json' with { type: 'json' };
import tailwindmergePackage from './node_modules/tailwind-merge/package.json' with { type: 'json' };
import tailwindcssPackage from './node_modules/tailwindcss/package.json' with { type: 'json' };
import vitePackage from './node_modules/vite/package.json' with { type: 'json' };
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  define: {
    __NAME__: JSON.stringify(pkg.name),
    __VERSION__: JSON.stringify(pkg.version),
    __GITHUBURL__: JSON.stringify(pkg.repository.url),
    __SVELTEVERSION__: JSON.stringify(sveltePackage.version),
    __SVELTEKITVERSION__: JSON.stringify(svelteKitPackage.version),
    __VITEVERSION__: JSON.stringify(vitePackage.version),
    __TAILWINDCSSVERSION__: JSON.stringify(tailwindcssPackage.version),
    __FLOWBITESVELTE__: JSON.stringify(flowbitesveltePackage.version),
    __FLOWBITESVETEICONS__: JSON.stringify(flowbitesvelteiconsPackage.version),
    __TAILWINDMERGE__: JSON.stringify(tailwindmergePackage.version)
  },
  server: {
    port: 5111,
    strictPort: false,
  }
});
