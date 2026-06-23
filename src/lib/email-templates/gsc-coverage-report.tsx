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

interface SitemapRow {
  path: string
  submitted: number
  indexed: number
  warnings: number
  errors: number
  lastDownloaded?: string
  isPending?: boolean
}

interface Props {
  siteUrl?: string
  totals?: {
    submitted: number
    indexed: number
    warnings: number
    errors: number
    sitemaps: number
  }
  sitemaps?: SitemapRow[]
  generatedAt?: string
  consoleUrl?: string
}

const GscCoverageReport = ({
  siteUrl = 'https://allcolourspainter.com/',
  totals = { submitted: 0, indexed: 0, warnings: 0, errors: 0, sitemaps: 0 },
  sitemaps = [],
  generatedAt,
  consoleUrl = 'https://search.google.com/search-console',
}: Props) => {
  const coverage = totals.submitted > 0
    ? Math.round((totals.indexed / totals.submitted) * 100)
    : 0
  const hasIssues = totals.errors > 0 || totals.warnings > 0
  const accentColor = totals.errors > 0 ? '#dc2626' : totals.warnings > 0 ? '#d97706' : '#16a34a'

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Weekly Coverage: {totals.indexed}/{totals.submitted} indexed ·
        {totals.errors} errors · {totals.warnings} warnings
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={{ ...accent, backgroundColor: accentColor }} />
          <Heading style={h1}>Weekly Search Console Report</Heading>
          <Text style={subtitle}>{siteUrl}</Text>

          <Section style={statsGrid}>
            <Section style={statCard}>
              <Text style={statLabel}>Submitted</Text>
              <Text style={statValue}>{totals.submitted}</Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Indexed</Text>
              <Text style={{ ...statValue, color: '#16a34a' }}>{totals.indexed}</Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Coverage</Text>
              <Text style={statValue}>{coverage}%</Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Errors</Text>
              <Text style={{ ...statValue, color: totals.errors > 0 ? '#dc2626' : '#1a1a1a' }}>
                {totals.errors}
              </Text>
            </Section>
            <Section style={statCard}>
              <Text style={statLabel}>Warnings</Text>
              <Text style={{ ...statValue, color: totals.warnings > 0 ? '#d97706' : '#1a1a1a' }}>
                {totals.warnings}
              </Text>
            </Section>
          </Section>

          {sitemaps.length > 0 ? (
            <>
              <Heading as="h2" style={h2}>Sitemaps ({totals.sitemaps})</Heading>
              <Section style={card}>
                {sitemaps.map((s) => (
                  <Text key={s.path} style={rowText}>
                    <span style={rowValue}>{s.path}</span>
                    <br />
                    <span style={rowMeta}>
                      {s.indexed}/{s.submitted} indexed · {s.errors} errors · {s.warnings} warnings
                      {s.isPending ? ' · pending' : ''}
                    </span>
                  </Text>
                ))}
              </Section>
            </>
          ) : (
            <Section style={card}>
              <Text style={rowText}>No sitemaps reported by Google yet.</Text>
            </Section>
          )}

          <Text style={subtitle}>
            {hasIssues
              ? 'Action needed: review the issues in Search Console.'
              : totals.indexed === 0 && totals.submitted > 0
              ? 'Google has not indexed any pages yet. Initial indexing can take 1–3 weeks after submission.'
              : 'No issues detected this week.'}
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            Open Search Console: {consoleUrl}
            {generatedAt ? ` · Generated ${generatedAt}` : ''}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: GscCoverageReport,
  subject: (data: Record<string, any>) => {
    const t = data?.totals ?? {}
    const errors = t.errors ?? 0
    if (errors > 0) return `⚠️ GSC Coverage: ${errors} errors on allcolourspainter.com`
    return `GSC Weekly: ${t.indexed ?? 0}/${t.submitted ?? 0} indexed — allcolourspainter.com`
  },
  displayName: 'Google Search Console weekly coverage',
  to: 'info@allcolourspainter.com',
  previewData: {
    siteUrl: 'https://allcolourspainter.com/',
    totals: { submitted: 82, indexed: 0, warnings: 0, errors: 0, sitemaps: 1 },
    sitemaps: [
      { path: 'https://allcolourspainter.com/sitemap.xml', submitted: 82, indexed: 0, warnings: 0, errors: 0 },
    ],
    generatedAt: new Date().toLocaleString('en-IE'),
    consoleUrl: 'https://search.google.com/search-console',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px', margin: '0 auto' }
const accent = { height: '4px', marginBottom: '24px' }
const h1 = { fontSize: '24px', fontWeight: 800 as const, color: '#1a1a1a', margin: '0 0 4px', textTransform: 'uppercase' as const, letterSpacing: '0.02em' }
const h2 = { fontSize: '13px', fontWeight: 700 as const, color: '#1a1a1a', margin: '24px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }
const subtitle = { fontSize: '14px', color: '#444', margin: '0 0 16px', lineHeight: '1.5' }
const statsGrid = { margin: '20px 0' }
const statCard = { display: 'inline-block', width: '18%', padding: '10px 4px', textAlign: 'center' as const, verticalAlign: 'top' as const }
const statLabel = { fontSize: '11px', color: '#888', margin: '0 0 4px', textTransform: 'uppercase' as const, letterSpacing: '0.08em' }
const statValue = { fontSize: '22px', fontWeight: 800 as const, color: '#1a1a1a', margin: 0 }
const card = { backgroundColor: '#fafafa', padding: '16px 18px', borderLeft: '3px solid #1a1a1a' }
const rowText = { fontSize: '13px', color: '#1a1a1a', margin: '8px 0', lineHeight: '1.5' }
const rowValue = { color: '#1a1a1a', wordBreak: 'break-all' as const, fontFamily: 'Menlo, Monaco, monospace', fontSize: '12px', fontWeight: 600 as const }
const rowMeta = { color: '#666', fontSize: '12px' }
const hr = { borderColor: '#ececec', margin: '28px 0 14px' }
const footer = { fontSize: '12px', color: '#888' }
