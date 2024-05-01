import type { Config } from 'tailwindcss'
const { addDynamicIconSelectors } = require('@iconify/tailwind')

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),addDynamicIconSelectors()],
  daisyui: {
    lightTheme:'nord',
    darkTheme: "night", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: "html", // The element that receives theme color CSS variables
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--bg-base-bg": "#0071eb",
          ".color-logo": {
            "color": "#fff",
          },
          ".color-logo::hover": {
            color: "blue"
          }
        },
        dark:{
          ...require("daisyui/src/theming/themes")["dark"],
          "--bg-base-bg": "#0071eb",
        },
        cupcake:{
          ...require("daisyui/src/theming/themes")["cupcake"],
          "--bg-base-bg": "#c67299",
        },
        bumblebee:{
          ...require("daisyui/src/theming/themes")["bumblebee"],
          "--bg-base-bg": "#d6782c",
        },
        emerald:{
          ...require("daisyui/src/theming/themes")["emerald"],
          "--bg-base-bg": "#6d7fd2",
        },
        corporate:{
          ...require("daisyui/src/theming/themes")["corporate"],
          "--bg-base-bg": "#267ab6",
        },
        synthwave:{
          ...require("daisyui/src/theming/themes")["synthwave"],
          "--bg-base-bg": "#ffa5bf",
        },
        retro:{
          ...require("daisyui/src/theming/themes")["retro"],
          "--bg-base-bg": "#b57e6a",
        },
        cyberpunk:{
          ...require("daisyui/src/theming/themes")["cyberpunk"],
          "--bg-base-bg": "#8779d5",
        },
        valentine:{
          ...require("daisyui/src/theming/themes")["valentine"],
          "--bg-base-bg": "#c178ba",
        },
        halloween:{
          ...require("daisyui/src/theming/themes")["halloween"],
          "--bg-base-bg": "#a75200",
        },
        garden:{
          ...require("daisyui/src/theming/themes")["garden"],
          "--bg-base-bg": "#8b4a2a",
        },
        forest:{
          ...require("daisyui/src/theming/themes")["forest"],
          "--bg-base-bg": "#029672",
        },
        aqua:{
          ...require("daisyui/src/theming/themes")["aqua"],
          "--bg-base-bg": "#36bbf4",
        },
        lofi:{
          ...require("daisyui/src/theming/themes")["lofi"],
          "--bg-base-bg": "#161515",
        },
        pastel:{
          ...require("daisyui/src/theming/themes")["pastel"],
          "--bg-base-bg": "#bbc7e9",
          ".color-logo": {
            "color": "#000",
          }
        },
        fantasy:{
          ...require("daisyui/src/theming/themes")["fantasy"],
          "--bg-base-bg": "#6d4ca0",
        },
        wireframe:{
          ...require("daisyui/src/theming/themes")["wireframe"],
          "--bg-base-bg": "#c5c5c5",
          ".color-logo": {
            "color": "#000",
          }
        },
        black:{
          ...require("daisyui/src/theming/themes")["black"],
          "--bg-base-bg": "#373737",
        },
        luxury:{
          ...require("daisyui/src/theming/themes")["luxury"],
          "--bg-base-bg": "#70525f",
        },
        dracula:{
          ...require("daisyui/src/theming/themes")["dracula"],
          "--bg-base-bg": "#c272b0",
        },
        cmyk:{
          ...require("daisyui/src/theming/themes")["cmyk"],
          "--bg-base-bg": "#d3638a",
        },
        autumn:{
          ...require("daisyui/src/theming/themes")["autumn"],
          "--bg-base-bg": "#b05f46",
        },
        business:{
          ...require("daisyui/src/theming/themes")["business"],
          "--bg-base-bg": "#456490",
        },
        acid:{
          ...require("daisyui/src/theming/themes")["acid"],
          "--bg-base-bg": "#ff0066",
        },
        lemonade:{
          ...require("daisyui/src/theming/themes")["lemonade"],
          "--bg-base-bg": "#889400",
        },
        night:{
          ...require("daisyui/src/theming/themes")["night"],
          "--bg-base-bg": "#6e7cc8",
        },
        coffee:{
          ...require("daisyui/src/theming/themes")["coffee"],
          "--bg-base-bg": "#1f506d",
        },
        winter:{
          ...require("daisyui/src/theming/themes")["winter"],
          "--bg-base-bg": "#5141a3",
        },
        dim:{
          ...require("daisyui/src/theming/themes")["dim"],
          "--bg-base-bg": "#c272ac",
        },
        nord:{
          ...require("daisyui/src/theming/themes")["nord"],
          "--bg-base-bg": "#6b8dab",
        },
        sunset:{
          ...require("daisyui/src/theming/themes")["sunset"],
          "--bg-base-bg": "#b562a5",
        }
      }
    ]
  }
} satisfies Config

