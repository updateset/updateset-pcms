import type { WidgetServerProps } from 'payload'

export default async function UserStatsWidget({ req }: WidgetServerProps) {
  const { payload } = req

  // Fetch data server-side
  const userCount = await payload.count({ collection: 'users' })

  return (
    <div className="card">
      <h3>Total Users</h3>
      <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{userCount.totalDocs}</p>
    </div>
  )
}
