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

export interface WeekDayDeposits {
    dayname: string
    Transactions: number
}

export interface DayMonthDeposits {
    day: number
    Transactions: number
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
        SELECT COUNT(*) as total FROM "Transactions" ${sql.unsafe(dateCondition)}
        `
        const totalDeposits = Number(totalResult[0].total)

        const avgPerDay = await sql `
        WITH CountPerDay AS (
        SELECT COUNT(*) as countPerDay, "DATE" FROM "Transactions" GROUP BY "DATE" ORDER BY "DATE" ASC
        ${sql.unsafe(dateCondition)}
        )
        
        SELECT AVG(countPerDay) as avg FROM CountPerDay
        `
        const averageDepositsPerDay = Number(avgPerDay[0].avg)
        
        const avgAmount = await sql `
        SELECT AVG("Amount") as avg FROM "Transactions" ${sql.unsafe(dateCondition)}
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
        FROM "Transactions"
        GROUP BY "DATE"
        ORDER BY "DATE" ASC
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

export async function getAvgTransactionsWeekday(): Promise<WeekDayDeposits[]>{
    try{
        const result = await sql `
        WITH daily_counts AS (
        SELECT
            DATE("DATE") AS day,
            COUNT(*) AS num_Transactions
        FROM
            "Transactions"
        GROUP BY
            DATE("DATE")
        )
        SELECT
        EXTRACT(DOW FROM day) AS weekday,         
        TO_CHAR(day, 'Day') AS day_name,
        ROUND(AVG(num_Transactions), 2) AS avg_Transactions
        FROM
        daily_counts
        GROUP BY
        weekday, day_name
        ORDER BY
        weekday;
        `
        return result.map((row) => ({
            dayname: row.day_name as string,
            Transactions: Number(row.avg_Transactions),
    }))
    }catch(error){
        console.error("Error fetching chart data:", error)
        throw new Error("Failed to fetch chart data")
    }
}

export async function getAvgTransactionsDayMonth(): Promise<DayMonthDeposits[]>{
    try{
        const result = await sql `
        WITH daily_counts AS (
        SELECT
            DATE("DATE") AS day,
            COUNT(*) AS num_Transactions
        FROM
            "Transactions"
        GROUP BY
            DATE("DATE")
        )
        SELECT
        EXTRACT(DAY FROM day) AS day_of_month,
        ROUND(AVG(num_Transactions), 2) AS avg_Transactions
        FROM
        daily_counts
        GROUP BY
        day_of_month
        ORDER BY
        day_of_month;
        `
        return result.map((row) => ({
            day: Number(row.day_of_month),
            Transactions: Number(row.avg_Transactions),
    }))
    }catch(error){
        console.error("Error fetching chart data:", error)
        throw new Error("Failed to fetch chart data")
    }
}
