import { writable } from "svelte/store";

export const postsData = writable([
    {
        title: 'code',
        content: 'SvelteKit + Superforms is Fun'
    }
])