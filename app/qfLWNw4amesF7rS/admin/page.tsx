"use client";

import React from "react";
import Participate from "@/components/Participate";
import Girlsparticipate from "@/components/Girlsparticipate";
import Walkparticipate from "@/components/Walkparticipate";
import Qrscanner from "@/components/Qrscanner";
import Topboys from "@/components/Topboys";
import Topgirls from "@/components/Topgirls";
import Topwalks from "@/components/Topwalks";
import SITStudents from "@/components/SITStudents";

const page = () => {
  return (
    <div className="bg-gradient-to-br from-orange-500/35 via-blue-300 to-purple-400/40 py-20 ">
    <div className="flex flex-col justify-center items-center">
      {/* <Participate /> */}
      {/* <Girlsparticipate /> */}
      {/* <Walkparticipate /> */}
      <Qrscanner />
      <Topboys />
      <Topgirls />
      <Topwalks />
      <SITStudents />
    </div></div>
  );
};

export default page;
