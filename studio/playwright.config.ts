import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'e2e',timeout:120000,workers:1,use:{baseURL:'http://127.0.0.1:4175',viewport:{width:1500,height:1000}},webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4175 --strictPort',url:'http://127.0.0.1:4175',reuseExistingServer:!process.env.CI,timeout:120000},reporter:'list'});

