import React from 'react'
import { useRouter } from "next/router";
import redirectHandler from "../utils/redirectHandler";

const Index = () => {
  const router = useRouter()
  redirectHandler(router)
  

  return (
    <div>
      Loading page
    </div>
  )
}

export default Index