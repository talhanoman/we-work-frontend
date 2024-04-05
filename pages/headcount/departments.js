import React from 'react'
import TabsLayout from '../../components/headcount/TabsLayout'
import { useRouter } from 'next/router'
export default function Departments() {
    return (
        <div>
            <TabsLayout tab={'Departments'} />
        </div>
    )
}
