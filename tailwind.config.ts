import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    lightTheme:'nord',
    darkTheme: "night", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "background": "#0071eb",
          ".color-logo": {
            "color": "#fff",
          },
          ".color-logo::hover": {
            color: "blue"
          }
        },
        dark:{
          ...require("daisyui/src/theming/themes")["dark"],
          "background": "#0071eb",
        },
        cupcake:{
          ...require("daisyui/src/theming/themes")["cupcake"],
          "background": "#c67299",
        },
        bumblebee:{
          ...require("daisyui/src/theming/themes")["bumblebee"],
          "background": "#d6782c",
        },
        emerald:{
          ...require("daisyui/src/theming/themes")["emerald"],
          "background": "#6d7fd2",
        },
        corporate:{
          ...require("daisyui/src/theming/themes")["corporate"],
          "background": "#267ab6",
        },
        synthwave:{
          ...require("daisyui/src/theming/themes")["synthwave"],
          "background": "#ffa5bf",
        },
        retro:{
          ...require("daisyui/src/theming/themes")["retro"],
          "background": "#b57e6a",
        },
        cyberpunk:{
          ...require("daisyui/src/theming/themes")["cyberpunk"],
          "background": "#8779d5",
        },
        valentine:{
          ...require("daisyui/src/theming/themes")["valentine"],
          "background": "#c178ba",
        },
        halloween:{
          ...require("daisyui/src/theming/themes")["halloween"],
          "background": "#a75200",
        },
        garden:{
          ...require("daisyui/src/theming/themes")["garden"],
          "background": "#8b4a2a",
        },
        forest:{
          ...require("daisyui/src/theming/themes")["forest"],
          "background": "#029672",
        },
        aqua:{
          ...require("daisyui/src/theming/themes")["aqua"],
          "background": "#36bbf4",
        },
        lofi:{
          ...require("daisyui/src/theming/themes")["lofi"],
          "background": "#161515",
        },
        pastel:{
          ...require("daisyui/src/theming/themes")["pastel"],
          "background": "#bbc7e9",
          ".color-logo": {
            "color": "#000",
          }
        },
        fantasy:{
          ...require("daisyui/src/theming/themes")["fantasy"],
          "background": "#6d4ca0",
        },
        wireframe:{
          ...require("daisyui/src/theming/themes")["wireframe"],
          "background": "#c5c5c5",
          ".color-logo": {
            "color": "#000",
          }
        },
        black:{
          ...require("daisyui/src/theming/themes")["black"],
          "background": "#373737",
        },
        luxury:{
          ...require("daisyui/src/theming/themes")["luxury"],
          "background": "#70525f",
        },
        dracula:{
          ...require("daisyui/src/theming/themes")["dracula"],
          "background": "#c272b0",
        },
        cmyk:{
          ...require("daisyui/src/theming/themes")["cmyk"],
          "background": "#d3638a",
        },
        autumn:{
          ...require("daisyui/src/theming/themes")["autumn"],
          "background": "#b05f46",
        },
        business:{
          ...require("daisyui/src/theming/themes")["business"],
          "background": "#456490",
        },
        acid:{
          ...require("daisyui/src/theming/themes")["acid"],
          "background": "#ff0066",
        },
        lemonade:{
          ...require("daisyui/src/theming/themes")["lemonade"],
          "background": "#889400",
        },
        night:{
          ...require("daisyui/src/theming/themes")["night"],
          "background": "#6e7cc8",
        },
        coffee:{
          ...require("daisyui/src/theming/themes")["coffee"],
          "background": "#1f506d",
        },
        winter:{
          ...require("daisyui/src/theming/themes")["winter"],
          "background": "#5141a3",
        },
        dim:{
          ...require("daisyui/src/theming/themes")["dim"],
          "background": "#c272ac",
        },
        nord:{
          ...require("daisyui/src/theming/themes")["nord"],
          "background": "#6b8dab",
        },
        sunset:{
          ...require("daisyui/src/theming/themes")["sunset"],
          "background": "#b562a5",
        }
      }
    ]
  }
} satisfies Config

