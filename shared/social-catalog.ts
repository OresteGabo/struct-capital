import clearer from '../social-content/posts/clearer-picture.json' with { type: 'json' }
import calendar from '../social-content/posts/income-calendar.json' with { type: 'json' }
import kigali from '../social-content/posts/kigali-editorial.json' with { type: 'json' }
import concept from '../social-content/posts/education-concept.json' with { type: 'json' }
import myth from '../social-content/posts/education-myth-fact.json' with { type: 'json' }
import didYouKnow from '../social-content/posts/education-did-you-know.json' with { type: 'json' }
import terminology from '../social-content/posts/education-terminology.json' with { type: 'json' }
import bond from '../social-content/posts/treasury-bond-explainer.json' with { type: 'json' }
import showcase from '../social-content/posts/product-showcase.json' with { type: 'json' }
import typography from '../social-content/posts/brand-statement-typography.json' with { type: 'json' }
import photography from '../social-content/posts/brand-statement-photography.json' with { type: 'json' }
import guide from '../social-content/posts/three-step-guide.json' with { type: 'json' }
import { parseSocialPost } from './social.ts'

export const socialCatalog = [
  { id: 'kigali', label: 'Kigali Editorial', description: 'Editorial copy and a real city photo. Photo required.', drafts: [kigali] },
  { id: 'education', label: 'Investor Education', description: 'Concept, myth/fact, did you know, or terminology.', drafts: [concept, myth, didYouKnow, terminology] },
  { id: 'treasury-bond', label: 'Treasury Bond Explainer', description: 'Editable illustrative principal/coupon/maturity timeline.', drafts: [bond] },
  { id: 'product-showcase', label: 'Product Showcase', description: 'Four authentic screenshot views and SC geometry.', drafts: [showcase] },
  { id: 'brand-statement', label: 'Brand Statement', description: 'Typography and photo variants. Photo variant needs an asset.', drafts: [typography, photography] },
  { id: 'three-step-guide', label: 'Three-Step Guide', description: 'Three editable stages with monogram-derived markers.', drafts: [guide] },
  { id: 'editorial', label: 'Foundation editorial', description: 'Preserved Phase 01 symbol/calendar composition.', drafts: [clearer, calendar] },
].map(template => ({ ...template, drafts: template.drafts.map(parseSocialPost) }))

export const socialDrafts = socialCatalog.flatMap(template => template.drafts)
