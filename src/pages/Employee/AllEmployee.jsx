import React from "react"
import Header from "../../components/header"

function Employee() {
  return (
    <>
    <div className="flex flex-col w-full">
      <Header title="Employee" />
      <div>
        <form className="flex justify-end">
          <input 
            type="text" 
            placeholder="Search employee by ID" 
            className="border-0 rounded-3xl p-2" />
          <button type="submit" className="w-20 bg-yellow-500 font-medium capitalize border-0 rounded-3xl ml-5 p-2">create</button>
        </form>
      </div>
      <div>
        <h1>Content part</h1>
      </div>
    </div>
    </>
  )
}

export default Employee
