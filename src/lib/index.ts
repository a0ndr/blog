import { writable } from "svelte/store";

// https://tailwindcss.com/docs/customizing-colors
export const Theme = writable({
    PrimaryColor: "cyan-300",
    AccentColor: "cyan-200"
})
