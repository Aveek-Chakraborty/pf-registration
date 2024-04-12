"use client"

import React from 'react'
import Participate from '@/components/Participate'
import Girlsparticipate from '@/components/Girlsparticipate'
import Walkparticipate from '@/components/Walkparticipate'
import Qrscanner from '@/components/Qrscanner'
import Topboys from '@/components/Topboys'
import Topgirls from '@/components/Topgirls'
import Topwalks from '@/components/Topwalks'

const page = () => {
  return (
    <div>
      <Participate/>
      <Girlsparticipate/>
      <Walkparticipate/>
      <Qrscanner/>
      <Topboys/>
      <Topgirls/>
      <Topwalks/>
    </div>
  )
}

export default page
