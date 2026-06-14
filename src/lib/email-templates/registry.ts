import type { ComponentType } from 'react'
import { template as contactInquiryTemplate } from './contact-inquiry'
import { template as estimateRequestTemplate } from './estimate-request'
import { template as estimateConfirmationTemplate } from './estimate-confirmation'

export interface TemplateEntry {
  component: ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail when set. */
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-inquiry': contactInquiryTemplate,
  'estimate-request': estimateRequestTemplate,
  'estimate-confirmation': estimateConfirmationTemplate,
}
