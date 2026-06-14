import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
} from '@react-email/components'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandName}>{siteName}</Text>
          <div style={accentBar} />
        </Section>
        <Heading style={h1}>Confirm your email change</Heading>
        <Text style={text}>
          You requested to change your email address for {siteName} from{' '}
          <Link href={`mailto:${oldEmail}`} style={link}>
            {oldEmail}
          </Link>{' '}
          to{' '}
          <Link href={`mailto:${newEmail}`} style={link}>
            {newEmail}
          </Link>
          .
        </Text>
        <Text style={text}>
          Click the button below to confirm this change:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Confirm Email Change
        </Button>
        <Text style={footer}>
          If you didn't request this change, please secure your account
          immediately.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

const main = { backgroundColor: '#ffffff', fontFamily: '"Hind", Arial, sans-serif' }
const container = { padding: '0', maxWidth: '580px' }
const header = { padding: '24px 25px 0' }
const brandName = {
  fontFamily: '"Montserrat", Arial, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  color: '#1c1c1c',
  margin: '0 0 12px',
  letterSpacing: '-0.01em',
}
const accentBar = {
  height: '3px',
  width: '60px',
  backgroundColor: '#18b26f',
}
const h1 = {
  fontFamily: '"Montserrat", Arial, sans-serif',
  fontSize: '22px',
  fontWeight: 700,
  color: '#1c1c1c',
  margin: '24px 0 20px',
  padding: '0 25px',
}
const text = {
  fontSize: '14px',
  color: '#5e5e5e',
  lineHeight: '1.6',
  margin: '0 0 20px',
  padding: '0 25px',
}
const link = { color: '#18b26f', textDecoration: 'underline' }
const button = {
  backgroundColor: '#18b26f',
  color: '#ffffff',
  fontFamily: '"Montserrat", Arial, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  borderRadius: '4px',
  padding: '12px 24px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '0 25px 20px',
}
const footer = {
  fontSize: '12px',
  color: '#999999',
  margin: '20px 0 24px',
  padding: '0 25px',
}