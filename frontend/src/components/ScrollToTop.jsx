// import { useState, useEffect } from "react"
// // import { FaArrowAltCircleUp } from "react-icons/fa"

// function ScrollToTopButton() {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY
//       if (currentScrollY > 0) {
//         setIsVisible(true)
//       } else {
//         setIsVisible(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => {
//       window.removeEventListener("scroll", handleScroll)
//     }
//   }, [])

//   const handleClick = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     })
//   }

//   return (
//     <div className="scroll-to-top-button">
//       {isVisible && (
//         // <FaArrowAltCircleUp
//         //   className="fa fa-chevron-up"
//         //   onClick={handleClick}
//         // />
//       )}
//     </div>
//   )
// }

// export default ScrollToTopButton
