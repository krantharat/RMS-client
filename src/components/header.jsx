import React from "react"
import propTypes from 'prop-types'

function Header({ title }) {
  return (
    <>
    <div className="h-20 border-b-4 border-zinc-400 m-5 content-center">
        <h1 className="text-5xl text-black text-left font-bold ">{title}</h1>
    </div>
    </>
  )
}

Header.propTypes = {
  title: propTypes.string
}

export default Header
