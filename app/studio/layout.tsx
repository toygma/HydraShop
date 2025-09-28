import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HydraShop Backend",
  description: "Best ecommerce website Hydra-Shop",
};


const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <html lang='en'>
        <body>{children}</body>
    </html>
  )
}

export default layout