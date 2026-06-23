import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface BrokenItem {
  url: string
  count: number
}

interface Props {
  alertType?: 'new_url' | 'threshold'
  newUrls?: string[]
  totalLast24h?: number
  threshold?: number
  topBroken?: BrokenItem[]
  dashboardUrl?: string
  generatedAt?: string
}

const AssetErrorAlertEmail = ({
  alertType = 'new_url',
  newUrls = [],
  totalLast24h = 0,
  threshold = 10,
  topBroken = [],
  dashboardUrl = 'https://allcolourspainter.com/admin/asset-errors',
  generatedAt,
}: Props) => {
  const isThreshold = alertType === 'threshold'
  const title = isThreshold ? 'CDN 404 threshold reached' : 'New broken asset detected'
  const intro = isThreshold
    ? `There have been ${totalLast24h} CDN asset 404 errors in the last 24 hours (threshold: ${threshold}).`
    : `${newUrls.length} new asset URL${newUrls.length === 1 ? '' : 's'} returned 404 on allcolourspainter.com.`

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{title} — {intro}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={accent} />
          <Heading style={h1}>{title}</Heading>
          <Text style={subtitle}>{intro}</Text>

          {newUrls.length > 0 ? (
            <>
              <Heading as="h2" style={h2}>New broken URLs</Heading>
              <Section style={card}>
                {newUrls.slice(0, 20).map((u) => (
                  <Text key={u} style={urlText}>{u}</Text>
                ))}
              </Section>
            </>
          ) : null}

          {topBroken.length > 0 ? (
            <>
              <Heading as="h2" style={h2}>Top broken assets (24h)</Heading>
              <Section style={card}>
                {topBroken.slice(0, 10).map((b) => (
                  <Text key={b.url} style={rowText}>
                    <span style={rowCount}>{b.count}×</span>
                    <span style={rowValue}> {b.url}</span>
                  </Text>
                ))}
              </Section>
            </>
          ) : null}

          <Text style={subtitle}>
            Total 404s in the last 24 hours: <strong>{totalLast24h}</strong>
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            View full details in the admin dashboard: {dashboardUrl}
            {generatedAt ? ` · Generated ${generatedAt}` : ''}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AssetErrorAlertEmail,
  subject: (data: Record<string, any>) => {
    if (data?.alertType === 'threshold') {
      return `⚠️ ${data?.totalLast24h ?? 0} CDN 404s in 24h — All Colours Painting`
    }
    const n = Array.isArray(data?.newUrls) ? data.newUrls.length : 0
    return `⚠️ ${n} new broken asset${n === 1 ? '' : 's'} on allcolourspainter.com`
  },
  displayName: 'Asset 404 alert (admin notification)',
  to: 'dubdsltd@gmail.com',
  previewData: {
    alertType: 'new_url',
    newUrls: ['https://allcolourspainter.com/images/missing-hero.jpg'],
    totalLast24h: 12,
    threshold: 10,
    topBroken: [
      { url: 'https://allcolourspainter.com/images/missing-hero.jpg', count: 8 },
      { url: 'https://allcolourspainter.com/images/old-banner.webp', count: 4 },
    ],
    dashboardUrl: 'https://allcolourspainter.com/admin/asset-errors',
    generatedAt: new Date().toLocaleString('en-IE'),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px', margin: '0 auto' }
const accent = { height: '4px', backgroundColor: '#dc2626', marginBottom: '24px' }
const h1 = { fontSize: '24px', fontWeight: 800 as const, color: '#1a1a1a', margin: '0 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.02em' }
const h2 = { fontSize: '13px', fontWeight: 700 as const, color: '#dc2626', margin: '24px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }
const subtitle = { fontSize: '14px', color: '#444', margin: '0 0 16px', lineHeight: '1.5' }
const card = { backgroundColor: '#fafafa', padding: '16px 18px', borderLeft: '3px solid #dc2626' }
const urlText = { fontSize: '13px', color: '#1a1a1a', margin: '4px 0', wordBreak: 'break-all' as const, fontFamily: 'Menlo, Monaco, monospace' }
const rowText = { fontSize: '13px', color: '#1a1a1a', margin: '4px 0', lineHeight: '1.5' }
const rowCount = { fontWeight: 700 as const, color: '#dc2626', display: 'inline-block', minWidth: '36px' }
const rowValue = { color: '#333', wordBreak: 'break-all' as const, fontFamily: 'Menlo, Monaco, monospace', fontSize: '12px' }
const hr = { borderColor: '#ececec', margin: '28px 0 14px' }
const footer = { fontSize: '12px', color: '#888' }
