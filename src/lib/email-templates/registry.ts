import type { ComponentType } from 'react'
import { template as contactInquiryTemplate } from './contact-inquiry'
import { template as estimateRequestTemplate } from './estimate-request'
import { template as estimateConfirmationTemplate } from './estimate-confirmation'
import { template as assetErrorAlertTemplate } from './asset-error-alert'
import { template as gscCoverageReportTemplate } from './gsc-coverage-report'

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
  'asset-error-alert': assetErrorAlertTemplate,
  'gsc-coverage-report': gscCoverageReportTemplate,
}
