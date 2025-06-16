"use server"

import { sql } from '@/lib/db'
import { lchown } from 'fs'
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
    transactions: number
}

export interface DayMonthDeposits {
    day: number
    transactions: number
}
export async function getDepositStats(startDate?: string, endDate?: string): Promise<DepositsStats> {
  console.log("Fechas: ", startDate, endDate)
  try {
    let whereClause = sql``
    
    if (startDate && endDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate} AND "DATE" <= ${endDate}`
    } else if (startDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate}`
    } else if (endDate) {
      whereClause = sql`WHERE "DATE" <= ${endDate}`
    }

    const totalResult = await sql`
      SELECT COUNT(*) as total FROM "Transactions" ${whereClause}
    `
    const totalDeposits = Number(totalResult[0].total)

    const avgPerDay = await sql`
      WITH CountPerDay AS (
        SELECT COUNT(*) as countPerDay, "DATE"
        FROM "Transactions"
        ${whereClause}
        GROUP BY "DATE"
        ORDER BY "DATE" ASC
      )
      SELECT AVG(countPerDay) as avg FROM CountPerDay
    `
    const averageDepositsPerDay = Number(avgPerDay[0].avg)

    const avgAmount = await sql`
      SELECT AVG("Amount") as avg FROM "Transactions" ${whereClause}
    `
    const averageAmount = Number(avgAmount[0].avg)

    return {
      totalDeposits,
      averageDepositsPerDay,
      averageAmount
    }
  } catch (error) {
    console.error("Error fetching transaction stats: ", error)
    throw new Error("Error fetching transaction stats")
  }
}
export async function getAvgTransactionsWeekday(startDate?: string, endDate?: string): Promise<WeekDayDeposits[]> {
  try {
    let whereClause = sql``

    if (startDate && endDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate} AND "DATE" <= ${endDate}`
    } else if (startDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate}`
    } else if (endDate) {
      whereClause = sql`WHERE "DATE" <= ${endDate}`
    }

    const result = await sql`
      WITH daily_counts AS (
        SELECT
          DATE("DATE") AS day,
          COUNT(*) AS num_transactions
        FROM "Transactions"
        ${whereClause}
        GROUP BY DATE("DATE")
      )
      SELECT
        EXTRACT(DOW FROM day) AS weekday,
        TO_CHAR(day, 'Day') AS day_name,
        ROUND(AVG(num_transactions), 2) AS avg_transactions
      FROM daily_counts
      GROUP BY weekday, day_name
      ORDER BY weekday;
    `

    return result.map((row) => ({
      dayname: row.day_name as string,
      transactions: Number(row.avg_transactions),
    }))
  } catch (error) {
    console.error("Error fetching weekday average chart data:", error)
    throw new Error("Failed to fetch weekday average chart data")
  }
}
export async function getAvgTransactionsDayMonth(startDate?: string, endDate?: string): Promise<DayMonthDeposits[]> {
  try {
    let whereClause = sql``

    if (startDate && endDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate} AND "DATE" <= ${endDate}`
    } else if (startDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate}`
    } else if (endDate) {
      whereClause = sql`WHERE "DATE" <= ${endDate}`
    }

    const result = await sql`
      WITH daily_counts AS (
        SELECT
          DATE("DATE") AS day,
          COUNT(*) AS num_transactions
        FROM "Transactions"
        ${whereClause}
        GROUP BY DATE("DATE")
      )
      SELECT
        EXTRACT(DAY FROM day) AS day_of_month,
        ROUND(AVG(num_transactions), 2) AS avg_transactions
      FROM daily_counts
      GROUP BY day_of_month
      ORDER BY day_of_month;
    `

    return result.map((row) => ({
      day: Number(row.day_of_month),
      transactions: Number(row.avg_transactions),
    }))
  } catch (error) {
    console.error("Error fetching day-of-month average chart data:", error)
    throw new Error("Failed to fetch day-of-month average chart data")
  }
}
export async function getTransactionsRecord(startDate?: string, endDate?: string): Promise<ChartData[]> {
  try {
    let whereClause = sql``

    if (startDate && endDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate} AND "DATE" <= ${endDate}`
    } else if (startDate) {
      whereClause = sql`WHERE "DATE" >= ${startDate}`
    } else if (endDate) {
      whereClause = sql`WHERE "DATE" <= ${endDate}`
    }

    const result = await sql`
      SELECT 
        "DATE",
        COUNT(*) AS deposits,
        AVG("Amount") as amount
      FROM "Transactions"
      ${whereClause}
      GROUP BY "DATE"
      ORDER BY "DATE" ASC
    `

    return result.map((row) => ({
      Date: row.DATE as string,
      Deposits: Number(row.deposits),
      Amount: Number(row.amount),
    }))
  } catch (error) {
    console.error("Error fetching transaction record:", error)
    throw new Error("Failed to fetch transaction record")
  }
}
