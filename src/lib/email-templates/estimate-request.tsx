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

interface LineItem { label: string; min: number; max: number }

interface Props {
  name?: string
  email?: string
  phone?: string
  address?: string
  description?: string
  estimateMin?: number
  estimateMax?: number
  condition?: string
  mode?: string
  lineItems?: LineItem[]
  submittedAt?: string
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const EstimateRequestEmail = ({
  name = 'A visitor',
  email = '',
  phone = '',
  address = '',
  description = '',
  estimateMin = 0,
  estimateMax = 0,
  condition = '',
  mode = '',
  lineItems = [],
  submittedAt,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New estimate request from {name} — {fmt(estimateMin)}–{fmt(estimateMax)}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={accent} />
        <Heading style={h1}>New Estimate Request</Heading>
        <Text style={subtitle}>
          A visitor used the cost calculator on allcolourspainter.com and is happy with the estimate.
        </Text>

        <Section style={totalBox}>
          <Text style={totalLabel}>Estimated price range</Text>
          <Text style={totalValue}>{fmt(estimateMin)} – {fmt(estimateMax)}</Text>
        </Section>

        <Heading as="h2" style={h2}>Client</Heading>
        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone} />
          <Row label="Address" value={address} />
          {submittedAt ? <Row label="Submitted" value={submittedAt} /> : null}
        </Section>

        <Heading as="h2" style={h2}>Project description</Heading>
        <Text style={messageText}>{description || '—'}</Text>

        <Heading as="h2" style={h2}>Calculator inputs</Heading>
        <Section style={card}>
          <Row label="Surface condition" value={condition} />
          <Row label="Interior mode" value={mode} />
        </Section>

        {lineItems.length > 0 && (
          <>
            <Heading as="h2" style={h2}>Breakdown</Heading>
            <Section style={card}>
              {lineItems.map((l, i) => (
                <Text key={i} style={rowText}>
                  <span style={rowLabel}>{l.label}: </span>
                  <span style={rowValue}>{fmt(l.min)} – {fmt(l.max)}</span>
                </Text>
              ))}
            </Section>
          </>
        )}

        <Hr style={hr} />
        <Text style={footer}>
          Reply directly to this email to respond to {name}. Final price is confirmed after a free on-site visit.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={rowText}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value}</span>
  </Text>
)

export const template = {
  component: EstimateRequestEmail,
  subject: (data: Record<string, any>) =>
    `New estimate request from ${data?.name || 'website visitor'} (${fmt(data?.estimateMin || 0)}–${fmt(data?.estimateMax || 0)})`,
  displayName: 'Estimate request (admin notification)',
  to: 'info@allcolourspainter.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '085 123 4567',
    address: '12 Rathmines Road, Dublin 6',
    description: '3-bed semi, full repaint inside, walls and ceilings.',
    estimateMin: 2400,
    estimateMax: 3600,
    condition: 'Average (×1.2)',
    mode: 'By element',
    lineItems: [
      { label: 'Interior walls (2 coats)', min: 1200, max: 1800 },
      { label: 'Ceilings', min: 600, max: 900 },
      { label: 'Doors (both sides + frame)', min: 600, max: 900 },
    ],
    submittedAt: new Date().toLocaleString('en-IE'),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px', margin: '0 auto' }
const accent = { height: '4px', backgroundColor: '#16a34a', marginBottom: '24px' }
const h1 = { fontSize: '26px', fontWeight: 800 as const, color: '#1a1a1a', margin: '0 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.02em' }
const h2 = { fontSize: '14px', fontWeight: 700 as const, color: '#16a34a', margin: '28px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }
const subtitle = { fontSize: '14px', color: '#555', margin: '0 0 24px' }
const totalBox = { backgroundColor: '#16a34a', padding: '20px 22px', margin: '20px 0' }
const totalLabel = { fontSize: '11px', color: '#ffffff', textTransform: 'uppercase' as const, letterSpacing: '0.18em', margin: '0 0 6px', fontWeight: 700 as const }
const totalValue = { fontSize: '24px', color: '#ffffff', fontWeight: 800 as const, margin: 0 }
const card = { backgroundColor: '#f6f7f6', padding: '20px 22px', borderLeft: '3px solid #16a34a' }
const rowText = { fontSize: '14px', color: '#1a1a1a', margin: '6px 0', lineHeight: '1.5' }
const rowLabel = { fontWeight: 700 as const, color: '#1a1a1a' }
const rowValue = { color: '#333' }
const messageText = { fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const, padding: '12px 16px', backgroundColor: '#fafafa', border: '1px solid #ececec' }
const hr = { borderColor: '#ececec', margin: '28px 0 14px' }
const footer = { fontSize: '12px', color: '#888' }
