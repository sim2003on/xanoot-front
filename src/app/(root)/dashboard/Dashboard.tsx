'use client'

import { saveTokenToStorage } from "@/services/auth/auth-token.service"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Dashboard() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const accessToken = searchParams.get('accessToken')

        if (accessToken) saveTokenToStorage(accessToken)
    }, [searchParams])

    return <div>Dashboard</div>
}