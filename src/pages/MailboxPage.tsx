import React from 'react'
import { SiteHeader } from '@/components/site-header'
import { Mailbox } from '@/components/Mailbox'

export const MailboxPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1 overflow-hidden">
        <Mailbox />
      </main>
    </div>
  )
}

