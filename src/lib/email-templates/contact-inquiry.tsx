import React from "react";
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
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  email?: string;
  phone?: string | null;
  postcode?: string | null;
  message?: string;
  submittedAt?: string;
  source?: string | null;
  serviceType?: string | null;
}

const ContactInquiryEmail = ({
  name = "A visitor",
  email = "",
  phone,
  postcode,
  message = "",
  submittedAt,
  source,
  serviceType,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New website lead — {source || "contact_form"} — {name}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={accent} />
        <Heading style={h1}>New Website Lead</Heading>
        <Text style={subtitle}>
          Source: <strong>{source || "contact_form"}</strong>
          {serviceType ? ` · Service: ${serviceType}` : ""}
        </Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="Email" value={email} />
          {phone ? <Row label="Phone" value={phone} /> : null}
          {postcode ? <Row label="Postcode" value={postcode} /> : null}
          <Row label="Source" value={source || "contact_form"} />
          {serviceType ? <Row label="Service" value={serviceType} /> : null}
          {submittedAt ? <Row label="Submitted" value={submittedAt} /> : null}
        </Section>

        <Heading as="h2" style={h2}>
          Project details
        </Heading>
        <Text style={messageText}>{message}</Text>

        <Hr style={hr} />
        <Text style={footer}>Reply directly to this email to respond to {name}.</Text>
      </Container>
    </Body>
  </Html>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={rowText}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value}</span>
  </Text>
);

export const template = {
  component: ContactInquiryEmail,
  subject: (data: Record<string, any>) =>
    `New website lead — ${data?.source || "contact_form"} — ${data?.name || "website visitor"}`,
  displayName: "Contact form inquiry (admin notification)",
  to: "info@allcolourspainter.com",
  previewData: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "085 123 4567",
    postcode: "D04",
    message:
      "Hi, I need a quote for painting a 3-bed semi in Rathmines. When can you come for a survey?",
    submittedAt: new Date().toLocaleString("en-IE"),
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px", margin: "0 auto" };
const accent = { height: "4px", backgroundColor: "#16a34a", marginBottom: "24px" };
const h1 = {
  fontSize: "26px",
  fontWeight: 800 as const,
  color: "#1a1a1a",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.02em",
};
const h2 = {
  fontSize: "14px",
  fontWeight: 700 as const,
  color: "#16a34a",
  margin: "28px 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
};
const subtitle = { fontSize: "14px", color: "#555", margin: "0 0 24px" };
const card = { backgroundColor: "#f6f7f6", padding: "20px 22px", borderLeft: "3px solid #16a34a" };
const rowText = { fontSize: "14px", color: "#1a1a1a", margin: "6px 0", lineHeight: "1.5" };
const rowLabel = { fontWeight: 700 as const, color: "#1a1a1a" };
const rowValue = { color: "#333" };
const messageText = {
  fontSize: "14px",
  color: "#1a1a1a",
  lineHeight: "1.6",
  whiteSpace: "pre-wrap" as const,
  padding: "12px 16px",
  backgroundColor: "#fafafa",
  border: "1px solid #ececec",
};
const hr = { borderColor: "#ececec", margin: "28px 0 14px" };
const footer = { fontSize: "12px", color: "#888" };
