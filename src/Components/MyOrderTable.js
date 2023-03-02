import React from 'react'
import { MyOrderTableData } from './MyOrderTableData'

export const MyOrderTable = ({myOrderProducts}) => {
  return myOrderProducts.map((myOrderProduct)=>(
    <MyOrderTableData key={myOrderProduct.ID} myOrderProduct={myOrderProduct} />
  ))
}
