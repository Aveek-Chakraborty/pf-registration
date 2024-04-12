"use client"

import React from 'react'
import Participate from '@/components/Participate'
import Girlsparticipate from '@/components/Girlsparticipate'
import Walkparticipate from '@/components/Walkparticipate'
import Qrscanner from '@/components/Qrscanner'

const page = () => {
  return (
    <div>
      <Participate/>
      <Girlsparticipate/>
      <Walkparticipate/>
      <Qrscanner/>
    </div>
  )
}

export default page
