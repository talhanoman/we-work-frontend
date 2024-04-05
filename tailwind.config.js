/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // 2xl_property_display
        'display-2xl-regular': ['72px',
         {
          lineHeight: '90px',
          fontWeight: '400',
          letterSpacing: '-0.02em'
        }],
        'display-2xl-medium': ['72px', {
          lineHeight: '90px',
          fontWeight: '500',
          letterSpacing: '-0.02em'
        }],
        'display-2xl-semibold': ['72px', {
          lineHeight: '90px',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        }],
        'display-2xl-bold': ['72px', {
          lineHeight: '90px',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }],
        // xl_property_display
        'display-xl-regular': ['60px', {
          lineHeight: '72px',
          fontWeight: '400',
          letterSpacing: '-0.02em'
        }],
        'display-xl-medium': ['60px', {
          lineHeight: '72px',
          fontWeight: '500',
          letterSpacing: '-0.02em'
        }],
        'display-xl-semibold': ['60px', {
          lineHeight: '72px',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        }],
        'display-xl-bold': ['60px', {
          lineHeight: '72px',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }],
        // lg_property_display
        'display-lg-regular': ['48px', {
          lineHeight: '60px',
          fontWeight: '400',
          letterSpacing: '-0.02em'
        }],
        'display-lg-medium': ['48px', {
          lineHeight: '60px',
          fontWeight: '500',
          letterSpacing: '-0.02em'
        }],
        'display-lg-semibold': ['48px', {
          lineHeight: '60px',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        }],
        'display-lg-bold': ['48px', {
          lineHeight: '60px',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }],
        // md_propery_display
        'display-md-regular': ['36px', {
          lineHeight: '44px',
          fontWeight: '400',
          letterSpacing: '-0.02em'
        }],
        'display-md-medium': ['36px', {
          lineHeight: '44px',
          fontWeight: '500',
          letterSpacing: '-0.02em'
        }],
        'display-md-semibold': ['36px', {
          lineHeight: '44px',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        }],
        'display-md-bold': ['36px', {
          lineHeight: '44px',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }],
        // sm_property_display
        'display-sm-regular': ['30px', {
          lineHeight: '38px',
          fontWeight: '400',
        }],
        'display-sm-medium': ['30px', {
          lineHeight: '38px',
          fontWeight: '500',
        }],
        'display-sm-semibold': ['30px', {
          lineHeight: '38px',
          fontWeight: '600',
        }],
        'display-sm-bold': ['30px', {
          lineHeight: '38px',
          fontWeight: '700',
        }],
        // xs_property_display
        'display-xs-regular': ['24px', {
          lineHeight: '32px',
          fontWeight: '400',
        }],
        'display-xs-medium': ['24px', {
          lineHeight: '32px',
          fontWeight: '500',
        }],
        'display-xs-semibold': ['24px', {
          lineHeight: '32px',
          fontWeight: '600',
        }],
        'display-xs-bold': ['24px', {
          lineHeight: '32px',
          fontWeight: '700',
        }],
        // xl_propery
        'xl-regular':['20px',{
          lineHeight: '30px',
          fontWeight: '400',
        }],
        'xl-medium':['20px',{
          lineHeight: '30px',
          fontWeight: '500',
        }],
        'xl-semibold':['20px',{
          lineHeight: '30px',
          fontWeight: '600',
        }],
        'xl-bold':['20px',{
          lineHeight: '30px',
          fontWeight: '700',
        }],
        // lg_property
        'lg-regular':['18px',{
          lineHeight: '28px',
          fontWeight: '400',
        }],
        'lg-medium':['18px',{
          lineHeight: '28px',
          fontWeight: '500',
        }],
        'lg-semibold':['18px',{
          lineHeight: '28px',
          fontWeight: '600',
        }],
        'lg-bold':['18px',{
          lineHeight: '28px',
          fontWeight: '700',
        }],
        // md_property
        'md-regular':['16px',{
          lineHeight: '24px',
          fontWeight: '400',
        }],
        'md-medium':['16px',{
          lineHeight: '24px',
          fontWeight: '500',
        }],
        'md-semibold':['16px',{
          lineHeight: '24px',
          fontWeight: '600',
        }],
        'md-bold':['16px',{
          lineHeight: '24px',
          fontWeight: '700',
        }],
        // sm_property
        'sm-regular':['14px',{
          lineHeight: '20px',
          fontWeight: '400',
        }],
        'sm-medium':['14px',{
          lineHeight: '20px',
          fontWeight: '500',
        }],
        'sm-semibold':['14px',{
          lineHeight: '20px',
          fontWeight: '600',
        }],
        'sm-bold':['14px',{
          lineHeight: '20px',
          fontWeight: '700',
        }],
        // xs_property
        'xs-regular':['12px',{
          lineHeight: '18px',
          fontWeight: '400',
        }],
        'xs-medium':['12px',{
          lineHeight: '18px',
          fontWeight: '500',
        }],
        'xs-semibold':['12px',{
          lineHeight: '18px',
          fontWeight: '600',
        }],
        'xs-bold':['12px',{
          lineHeight: '18px',
          fontWeight: '700',
        }],
      },
      colors: {
        "primary-light": "#FBA553",
        "primary-regular": "#FF7F03",
        "primary-dark": "#DA6F08",

        // gray-property
        "gray-25": "#FCFCFD",
        "gray-50": "#FCFBFB",
        "gray-100": "#F2F2F2",
        "gray-200": "#E2E2E2",
        "gray-300": "#D2D2D2",
        "gray-400": "#B4B5B6",
        "gray-500": "#979798",
        "gray-600": "#7A797A",
        "gray-700": "#5D5B5C",
        "gray-800": "#403D3E",
        "gray-900": "#231F20",

        // primary-property
        "primary-25": "#F8FBFE",
        "primary-50": "#F1F6FD",
        "primary-100": "#DEEBFB",
        "primary-200": "#C5DDF8",
        "primary-300": "#9DC8F3",
        "primary-400": "#6FAAEB",
        "primary-500": "#5683DB",
        "primary-600": "#2F68D6",
        "primary-700": "#084CD0",
        "primary-800": "#0D44B3",
        "primary-900": "#284180",

        // error/red-property
        "error-25": "#FFFBFA",
        "error-50": "#FFF3F1",
        "error-100": "#FFE3DF",
        "error-200": "#FFCCC5",
        "error-300": "#FFA89D",
        "error-400": "#FF7664",
        "error-500": "#FF614C",
        "error-600": "#ED2E15",
        "error-700": "#C8230D",
        "error-800": "#A5210F",
        "error-900": "#882214",

        // warning/yellow-property
        "warning-25": "#FFFCF5",
        "warning-50": "#FEFDE8",
        "warning-100": "#FEFDC3",
        "warning-200": "#FDF78B",
        "warning-300": "#FCEA44",
        "warning-400": "#F9D916",
        "warning-500": "#E9C009",
        "warning-600": "#C99605",
        "warning-700": "#A06B08",
        "warning-800": "#84540F",
        "warning-900": "#714512",

        // success/green-property
        "success-50": "#F6FEF9",
        "success-50": "#F0FCE9",
        "success-100": "#DEF7D0",
        "success-200": "#C0F0A6",
        "success-300": "#8EE263",
        "success-400": "#75D546",
        "success-500": "#54BB27",
        "success-600": "#3F951B",
        "success-700": "#327219",
        "success-800": "#2B5A1A",
        "success-900": "#274D1A",

        // blue-gray-property
        "blue-gray-25": "#FCFCFD",
        "blue-gray-50": "#F8F9FC",
        "blue-gray-100": "#EAECF5",
        "blue-gray-200": "#D5D9EB",
        "blue-gray-300": "#AFB5D9",
        "blue-gray-400": "#717BBC",
        "blue-gray-500": "#4E5BA6",
        "blue-gray-600": "#3E4784",
        "blue-gray-700": "#363F72",
        "blue-gray-800": "#293056",
        "blue-gray-900": "#101323",

        // blue-light-property
        "blue-light-25": "#F5FBFF",
        "blue-light-50": "#F0F9FF",
        "blue-light-100": "#E0F2FE",
        "blue-light-200": "#B9E6FE",
        "blue-light-300": "#7CD4FD",
        "blue-light-400": "#36BFFA",
        "blue-light-500": "#0BA5EC",
        "blue-light-600": "#0086C9",
        "blue-light-700": "#026AA2",
        "blue-light-800": "#065986",
        "blue-light-900": "#0B4A6F",

        // blue-property
        "blue-25": "#F5FAFF",
        "blue-50": "#EFF8FF",
        "blue-100": "#D1E9FF",
        "blue-200": "#B2DDFF",
        "blue-300": "#84CAFF",
        "blue-400": "#53B1FD",
        "blue-500": "#2E90FA",
        "blue-600": "#1570EF",
        "blue-700": "#175CD3",
        "blue-800": "#1849A9",
        "blue-900": "#194185",
        
        // indigo-property
        "indigo-25": "#F5F8FF",
        "indigo-50": "#EEF4FF",
        "indigo-100": "#E0EAFF",
        "indigo-200": "#C7D7FE",
        "indigo-300": "#A4BCFD",
        "indigo-400": "#8098F9",
        "indigo-500": "#6172F3",
        "indigo-600": "#444CE7",
        "indigo-700": "#3538CD",
        "indigo-800": "#2D31A6",
        "indigo-900": "#2D3282",
        
        // purple-property
        "purple-25": "#FAFAFF",
        "purple-50": "#F4F3FF",
        "purple-100": "#EBE9FE",
        "purple-200": "#D9D6FE",
        "purple-300": "#BDB4FE",
        "purple-400": "#9B8AFB",
        "purple-500": "#7A5AF8",
        "purple-600": "#6938EF",
        "purple-700": "#5925DC",
        "purple-800": "#4A1FB8",
        "purple-900": "#3E1C96",
        
        // pink-property
        "pink-25": "#FEF6FB",
        "pink-50": "#FDF2FA",
        "pink-100": "#FCE7F6",
        "pink-200": "#FCCEEE",
        "pink-300": "#FAA7E0",
        "pink-400": "#F670C7",
        "pink-500": "#EE46BC",
        "pink-600": "#DD2590",
        "pink-700": "#C11574",
        "pink-800": "#9E165F",
        "pink-900": "#851651",
        
        // rose-property
        "rose-25": "#FFF5F6",
        "rose-50": "#FFF1F3",
        "rose-100": "#FFE4E8",
        "rose-200": "#FECDD6",
        "rose-300": "#FEA3B4",
        "rose-400": "#FD6F8E",
        "rose-500": "#F63D68",
        "rose-600": "#E31B54",
        "rose-700": "#C01048",
        "rose-800": "#A11043",
        "rose-900": "#89123E",
        
        // orange-property
        "orange-25": "#FFFAF5",
        "orange-50": "#FFF6ED",
        "orange-100": "#FFEAD5",
        "orange-200": "#FDDCAB",
        "orange-300": "#FEB273",
        "orange-400": "#FD853A",
        "orange-500": "#FB6514",
        "orange-600": "#EC4A0A",
        "orange-700": "#C4320A",
        "orange-800": "#9C2A10",
        "orange-900": "#7E2410",
      },
      backgroundImage: {
        // Add your custom gradient here
        "custom-gradient":
          "conic-gradient(from 259.08deg at 50% 50%, #FF7F03 0deg, rgba(255, 127, 3, 0) 360deg)",
        "gray-gradient-600":
          "conic-gradient(from 259.08deg at 50% 50%, #574A4D 0deg, rgba(87, 74, 77, 0) 360deg)",
        "gray-gradient-600-500":
          "linear-gradient(90deg, #574A4D 0%, #6E5E63 100%)",
        "gray-gradient-700-600":
          "linear-gradient(45deg, #483D40 0%, #574A4D 99.99%, #574A4D 100%)",
        "gray-gradient-800-600":
          "linear-gradient(45deg, #3B3435 0%, #574A4D 100%)",
        "gray-gradient-800-600":
          "linear-gradient(63.44deg, #3B3435 16.72%, #574A4D 83.39%)",
        "gray-gradient-800-700":
          "linear-gradient(26.57deg, #3B3435 8.33%, #483D40 91.67%)",
        "gray-gradient-900-600":
          " linear-gradient(45deg, #231F20 0%, #574A4D 100%)",
        // primary gradients_properties
        "primary-gradients-600":
          "conic-gradient(from 259.08deg at 50% 50%, #FF7F03 0deg, rgba(255, 127, 3, 0) 360deg);",
        "gray-gradient-600-500":
          "linear-gradient(90deg, #FF7F03 0%, #FBA553 100%);",
        "gray-gradient-700-600":
          " linear-gradient(45deg, #DA6F08 0%, #FF7F03 100%)",
        "gray-gradient-800-600":
          " linear-gradient(45deg, #A1460B 0%, #FF7F03 100%)",
        "gray-gradient-800-600":
          " linear-gradient(63.44deg, #A1460B 16.72%, #FF7F03 83.39%)",
        "gray-gradient-800-700":
          " linear-gradient(26.57deg, #A1460B 8.33%, #DA6F08 91.67%)",
        "gray-gradient-900-600":
          " linear-gradient(45deg, #A1460B 0%, #FF7F03 100%)",
      },
      boxShadow: {
        xs: "0px 1px 2px rgba(16, 24, 40, 0.05)",
        sm: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
        md: "0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)",
        lg: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
        xl: "0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        "2xl": "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
        "3xl": "0px 32px 64px -12px rgba(16, 24, 40, 0.14)",
        primary: "0px 1px 2px rgba(35, 31, 32, 0.05), 0px 0px 0px 4px #FFF4D3",
        green: "0px 0px 0px 4px #DEF7D0",
        blue: "0px 0px 0px 4px #DFF1FF, 0px 1px 2px 0px #231F200D",
        pink: "0px 0px 0px 4px #FCCEEE, 0px 1px 2px 0px #231F200D",
        "xs-focused-primary-100": "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #DEEBFB"
      },
      blur: {
        // light
        "sm-light": "4px",
        "md-light": "8px",
        "lg-light": "12px",
        "xl-light": "20px",
        // dark
        "sm-dark": "4px",
        "md-dark": "8px",
        "lg-dark": "12px",
        "xl-dark": "20px",
      },
      screens: {
        "2xl": "1440px",
        "3xl": "1536px",
        "custom-height-mq": {
          raw: "((min-width: 1024px) and (max-height: 740px))",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
