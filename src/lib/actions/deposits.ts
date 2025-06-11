"use server"

import { sql } from '@/lib/db'
import { revalidatePath } from "next/cache"

export interface Deposits {
    Date: string
    Amount: number
}

export interface DepositsStats {
    totalDeposits: number
    averageDepositsPerDay: number
    averageAmount: number
}

export interface ChartData {
    Date: string
    Deposits: number
    Amount: number
}

export interface DateFilter {
    startDate?: string 
    endDate? : string 
}

export async function getDepositStats(filters?: DateFilter): Promise<DepositsStats> {
    try{
        let dateCondition = ""
        const params: any[] = []

        if (filters?.startDate && filters?.endDate) {
        dateCondition = "WHERE deposit_date >= $1 AND deposit_date <= $2"
        params.push(filters.startDate, filters.endDate)
        } else if (filters?.startDate) {
        dateCondition = "WHERE deposit_date >= $1"
        params.push(filters.startDate)
        } else if (filters?.endDate) {
        dateCondition = "WHERE deposit_date <= $1"
        params.push(filters.endDate)
        }

        const totalResult = await sql `
        SELECT COUNT(*) as total FROM transactions ${sql.unsafe(dateCondition)}
        `
        const totalDeposits = Number(totalResult[0].total)

        const avgPerDay = await sql `
        WITH CountPerDay AS (
        SELECT COUNT(*) as countPerDay, "DATE" FROM transactions GROUP BY "DATE" ORDER BY "DATE" DESC
        ${sql.unsafe(dateCondition)}
        )
        
        SELECT AVG(countPerDay) as avg FROM CountPerDay
        `
        const averageDepositsPerDay = Number(avgPerDay[0].avg)
        
        const avgAmount = await sql `
        SELECT AVG("Amount") as avg FROM transactions ${sql.unsafe(dateCondition)}
        `

        const averageAmount = Number(avgAmount[0].avg)
        return {
            totalDeposits,
            averageDepositsPerDay,
            averageAmount
        }
    } catch(error){
        console.log("Error fetching transaction stats: ", error);
        throw new Error("Error fetching transaction stats")
    }
}

export async function getTransactionsRecord(filters?: DateFilter): Promise<ChartData[]>{
    try{
        const result = await sql `
        SELECT 
        "DATE",
        COUNT(*) AS deposits,
        AVG("Amount") as amount
        FROM transactions
        GROUP BY "DATE"
        ORDER BY "DATE" DESC
        `
        return result.map((row) => ({
            Date: row.DATE as string,
            Deposits: Number(row.deposits),
            Amount: Number(row.amount),
    }))
    }catch(error){
        console.error("Error fetching chart data:", error)
        throw new Error("Failed to fetch chart data")
    }
}
