/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    height:{
      sc:'100vh',
      bsh:"50px",
      scscl:"125px",
      li:'500px'
    },
    colors:{
      aqua:'#08ffef',
      pink:"#ff3dec",
      whaqua:"rgba(230, 253, 255,0.3)",
      cc:'rgba(232, 232, 232,0.3)',
      green:'#16de00',
      black:'#000000'
    },
    borderRadius:{
      srch:"20px"
    },
    width:{
      srch:"600px",
      fill:"100%",
      content:"95%",
      img:'350px',
      li:"450px",
      prog:"400px"
    },
    scale:{
      srch:"102%"
    },
    transformOrigin:{
      srch:"0.2s"
    },
    fontFamily:{
      proteststrike:"Protest Strike",
      kanit:"Kanit"
    }
  },
  plugins: [],
}