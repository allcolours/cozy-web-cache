import * as React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from "@react-email/components";

interface ReauthenticationEmailProps {
  token: string;
  siteName?: string;
}

export const ReauthenticationEmail = ({
  token,
  siteName = "All Colours Painting",
}: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code for {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brandName}>{siteName}</Text>
          <div style={accentBar} />
        </Section>
        <Heading style={h1}>Confirm reauthentication</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can safely ignore this
          email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ReauthenticationEmail;

const main = { backgroundColor: "#ffffff", fontFamily: '"Hind", Arial, sans-serif' };
const container = { padding: "0", maxWidth: "580px" };
const header = { padding: "24px 25px 0" };
const brandName = {
  fontFamily: '"Montserrat", Arial, sans-serif',
  fontSize: "18px",
  fontWeight: 700,
  color: "#1c1c1c",
  margin: "0 0 12px",
  letterSpacing: "-0.01em",
};
const accentBar = {
  height: "3px",
  width: "60px",
  backgroundColor: "#18b26f",
};
const h1 = {
  fontFamily: '"Montserrat", Arial, sans-serif',
  fontSize: "22px",
  fontWeight: 700,
  color: "#1c1c1c",
  margin: "24px 0 20px",
  padding: "0 25px",
};
const text = {
  fontSize: "14px",
  color: "#5e5e5e",
  lineHeight: "1.6",
  margin: "0 0 20px",
  padding: "0 25px",
};
const codeStyle = {
  fontFamily: '"Courier New", Courier, monospace',
  fontSize: "28px",
  fontWeight: 700,
  color: "#1c1c1c",
  letterSpacing: "0.15em",
  margin: "0 25px 30px",
  padding: "16px 20px",
  backgroundColor: "#f7f7f7",
  borderRadius: "4px",
  display: "inline-block",
};
const footer = {
  fontSize: "12px",
  color: "#999999",
  margin: "20px 0 24px",
  padding: "0 25px",
};
