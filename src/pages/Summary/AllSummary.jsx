import Header from '/2/projectWebpro/RMS-client/src/components/header'
import React from "react"

function Summary() {
  return (
    <>
    <div>
        <Header title="Summary" />
        <h1 className='text-6xl text-black text-left font-bold ml-20 mt-20'>06 JUNE, 2024</h1>
        {/* sale total boxes */}
        <div className='flex justify-start space-x-10 mt-20 ml-20'>
          <div className='p-6 bg-white rounded-xl shadow-lg flex items-center h-40 w-64'>
            <div>
              <div className="text-3xl font-bold text-black">Sales total</div>
              <p className="text-slate-500 text-6xl font-bold ml-15 mt-5">1234 ฿</p>
            </div>
          </div>
          <div className='p-6 bg-white rounded-xl shadow-lg flex items-center h-40 w-64'>
            <div>
              <div className="text-3xl font-bold text-black">Cost</div>
              <p className="text-slate-500 text-6xl font-bold ml-15 mt-5">5678 ฿</p>
            </div>
          </div>
          <div className='p-6 bg-white rounded-xl shadow-lg flex items-center h-40 w-64'>
            <div>
              <div className="text-3xl font-bold text-black">Profit</div>
              <p className="text-slate-500 text-6xl font-bold ml-15 mt-5">5678 ฿</p>
            </div>
          </div>
        </div>
        <div>
          

<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 rounded-s-lg">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">
                    1
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    1
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                   1
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
                <th scope="row" className="px-6 py-3 text-base">Total</th>
                <td className="px-6 py-3">3</td>
                <td className="px-6 py-3">21,000</td>
            </tr>
        </tfoot>
    </table>
</div>

        </div>
      </div>
    </>
  )
}

export default Summary

