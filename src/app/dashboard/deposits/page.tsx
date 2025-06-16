import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import DepositsClient from "./client" // Mueve este a client.tsx

import { DepositStats } from "@/components/deposit-stats"

export default async function DepositsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      {/* Server Component */}
      

      {/* Client Component */}
      <DepositsClient session={session} />
    </div>
  )
}
