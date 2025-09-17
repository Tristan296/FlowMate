import './globals.css'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'FlowMate - Workflow Automation',
  description: 'Automate your business workflows with FlowMate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
}