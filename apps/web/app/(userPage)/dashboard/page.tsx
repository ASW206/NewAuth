"use client";
import {useSession} from 'next-auth/react'
export default function GET(){
    const session = useSession()
    const s = JSON.stringify(session)
    return(
        <div>
            {s}
        </div>
    )
}