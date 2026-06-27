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
import { SITE } from "@/lib/site";

interface Props {
  name?: string
  estimateMin?: number
  estimateMax?: number
  description?: string
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const EstimateConfirmationEmail = ({
  name = 'there',
  estimateMin = 0,
  estimateMax = 0,
  description = '',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your estimate request — All Colours Painting</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={accent} />
        <Heading style={h1}>Thanks, {name}!</Heading>
        <Text style={subtitle}>
          We've received your estimate request and will get back to you within one working day to arrange a free on-site visit.
        </Text>

        <Section style={totalBox}>
          <Text style={totalLabel}>Your estimate range</Text>
          <Text style={totalValue}>{fmt(estimateMin)} – {fmt(estimateMax)}</Text>
          <Text style={totalNote}>Indicative only — final price confirmed on-site.</Text>
        </Section>

        {description && (
          <>
            <Heading as="h2" style={h2}>Your project</Heading>
            <Text style={messageText}>{description}</Text>
          </>
        )}

        <Heading as="h2" style={h2}>What happens next</Heading>
        <Text style={para}>
          1. We'll call or email you within one working day.<br />
          2. We arrange a free on-site visit at a time that suits you.<br />
          3. You receive a clear, written quote within 48 hours of the visit.
        </Text>

        <Hr style={hr} />
        <Text style={footer}>
          Need to reach us sooner? Call <a style={link} href={`tel:${SITE.phoneTel}`}>085 821 1870</a> or reply to this email.<br />
          — All Colours Painting Contractor Limited, Dublin
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: EstimateConfirmationEmail,
  subject: 'We received your estimate request — All Colours Painting',
  displayName: 'Estimate request (client confirmation)',
  previewData: {
    name: 'Jane',
    estimateMin: 2400,
    estimateMax: 3600,
    description: '3-bed semi, full repaint inside.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '600px', margin: '0 auto' }
const accent = { height: '4px', backgroundColor: '#16a34a', marginBottom: '24px' }
const h1 = { fontSize: '26px', fontWeight: 800 as const, color: '#1a1a1a', margin: '0 0 8px' }
const h2 = { fontSize: '14px', fontWeight: 700 as const, color: '#16a34a', margin: '28px 0 8px', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }
const subtitle = { fontSize: '15px', color: '#555', margin: '0 0 24px', lineHeight: '1.6' }
const totalBox = { backgroundColor: '#16a34a', padding: '20px 22px', margin: '20px 0' }
const totalLabel = { fontSize: '11px', color: '#ffffff', textTransform: 'uppercase' as const, letterSpacing: '0.18em', margin: '0 0 6px', fontWeight: 700 as const }
const totalValue = { fontSize: '24px', color: '#ffffff', fontWeight: 800 as const, margin: 0 }
const totalNote = { fontSize: '12px', color: '#e8f5ec', margin: '8px 0 0' }
const para = { fontSize: '14px', color: '#1a1a1a', lineHeight: '1.7', margin: '8px 0' }
const messageText = { fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const, padding: '12px 16px', backgroundColor: '#fafafa', border: '1px solid #ececec' }
const hr = { borderColor: '#ececec', margin: '28px 0 14px' }
const footer = { fontSize: '12px', color: '#888', lineHeight: '1.6' }
const link = { color: '#16a34a', textDecoration: 'none', fontWeight: 700 as const }
