/* eslint-disable react/function-component-definition */
import React from "react"

const Glitter = () => {
  const glitterStyles = [...Array(100)].map(() => ({
    // left: `${Math.random() * 99}%`,
    // top: `${Math.random() * 100}%`,
  }))

  return (
    <div className="glitter-container">
      {glitterStyles.map((style, index) => (
        // eslint-disable-next-line react/self-closing-comp, react/no-array-index-key
        <div key={index} className="glitter" style={style}></div>
      ))}
    </div>
  )
}

export default Glitter
