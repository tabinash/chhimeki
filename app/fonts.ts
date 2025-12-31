import localFont from 'next/font/local'          // For self-hosted custom fonts (Gilroy)
import { Noto_Sans_Devanagari } from 'next/font/google' // Google font for Nepali (Devanagari)

// --------------------
// Nepali Font (Free)
// --------------------
export const notoDevanagari = Noto_Sans_Devanagari({
    subsets: ['devanagari'],        // Load only Devanagari characters (smaller size)
    variable: '--font-noto',        // CSS variable name to use in styles
    display: 'swap',                // Show fallback font until loaded (better UX)
})

// --------------------
// Gilroy Font (Local)
// --------------------
export const gilroy = localFont({
    src: [
        {
            path: '../fonts/Gilroy-Light.ttf', // Light font file
            weight: '300',                     // Used when font-weight: 300
            style: 'normal',                   // Normal (not italic)
        },
        {
            path: '../fonts/Gilroy-Regular.ttf', // Regular font file
            weight: '400',                       // Default body text weight
            style: 'normal',                     // Normal style
        },
        {
            path: '../fonts/Gilroy-Medium.ttf',  // Medium font file
            weight: '500',                       // Used for buttons, usernames, UI emphasis
            style: 'normal',                     // Normal style
        },
        {
            path: '../fonts/Gilroy-Bold.ttf',    // Bold font file
            weight: '700',                       // Used for headings
            style: 'normal',                     // Normal style
        },
        {
            path: '../fonts/Gilroy-Heavy.ttf',   // Heavy font file
            weight: '900',                       // Very bold (use sparingly)
            style: 'normal',                     // Normal style
        },
    ],
    variable: '--font-gilroy',        // CSS variable name for Gilroy
})
