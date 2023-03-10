import { defineConfig } from 'astro/config';
import compress from "astro-compress";

// https://astro.build/config
export default { integrations: [compress()] };
