import React from 'react'
import { FiMoreVertical, FiArrowUp } from "react-icons/fi";
import Image from "next/image";

export default function StatCard({title, count, percentage}) {
    return (
        < div className="w-full lg:w-[32.5%] p-6 shadow-sm rounded-lg border border-[#E2E2E2]" >
            <div className="flex justify-between mb-6 items-center">
                <h6 className="font-medium text-base">{title}</h6>
                {/* <FiMoreVertical role='button' className="w-5 h-5 text-[#B4B5B6]" /> */}
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <h2 className="font-semibold text-3xl">{count}</h2>
                    <div className="flex mt-4 items-center gap-x-1 text-sm">
                        <FiArrowUp className="w-4 h-4 text-[#54BB27]" />
                        <p className="text-[#327219] font-medium">{percentage}%</p>
                        <p className="text-[#979798]">vs last month</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image
                        alt="Success Chart"
                        src="/images/success_chart_dashboard.svg"
                        width={128}
                        height={64}
                        className="ml-auto"
                    />
                </div>
            </div>
        </div >
    )
}
