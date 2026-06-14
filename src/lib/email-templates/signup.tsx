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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandName}>{siteName}</Text>
          <div style={accentBar} />
        </Section>
        <Heading style={h1}>Confirm your email</Heading>
        <Text style={text}>
          Thanks for signing up for{' '}
          <Link href={siteUrl} style={link}>
            <strong>{siteName}</strong>
          </Link>
          !
        </Text>
        <Text style={text}>
          Please confirm your email address (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ) by clicking the button below:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Verify Email
        </Button>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

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