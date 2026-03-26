# GRACE-X Master Dev Prompt

Build a dual-site local SEO and lead-generation system for:

1. `allaspectspaving.co.uk`
2. `allaspectsbuilding.co.uk`

The result must not be a brochure website. It must function as a regional Google lead engine.

## Core objectives

- Rank for high-intent local commercial queries
- Capture and qualify leads on every money page
- Route leads intelligently by service type
- Increase conversion rate through GRACE-X intake logic
- Create clear internal linking and authority hierarchy

## Non-negotiables

- No thin pages
- No copy-paste location spam
- No mixed service confusion between paving and building
- No dead-end pages without CTA
- No generic chatbot fluff
- No design drift away from a clean, modern, conversion-focused commercial build

## Site roles

### Site A: All Aspects Paving
Focus:
- driveways
- block paving
- resin driveways
- patios
- landscaping / paving-adjacent exterior work

### Site B: All Aspects Building
Focus:
- builders
- extensions
- renovations
- loft conversions
- roofing
- structural/general building

## Required architecture

### 1. Homepage
Each site homepage must:
- state the service niche clearly
- show trust quickly
- push quote action above the fold
- link into service hubs and top local pages

### 2. Service hubs
Create dedicated hub pages for each core service.
Examples:
- `/driveways/`
- `/patios/`
- `/builders/`
- `/extensions/`

### 3. Location pages
Create unique location pages under service clusters.
Examples:
- `/driveways/croydon/`
- `/resin-driveways/sutton/`
- `/builders/croydon/`
- `/extensions/surrey/`

### 4. Informational support pages
Create content that supports conversion and ranking:
- cost guides
- FAQ pages
- process pages
- planning / permission pages where relevant
- maintenance guides

## Every money page must include

1. Clear H1 with service + location intent
2. Intro with local relevance
3. Service breakdown
4. Why choose us
5. Pricing guidance or quote framing
6. FAQs
7. Review / proof block
8. Quote form embed
9. Grace chatbot CTA
10. Internal links to related service and location pages

## Lead engine layer

Implement a GRACE-X lead layer across both sites.

### Intake form
Fields:
- Full name
- Phone number
- Email
- Postcode
- Service type
- Budget range
- Timeline
- Message / project notes

### Lead routing rules
- driveway, patio, block paving, resin, paving, landscaping -> PAVING pipeline
- builder, extension, renovation, loft conversion, roofing, structural -> BUILDING pipeline

### Lead scoring
- budget 10k+ -> +3
- start ASAP -> +2
- exact target service area -> +2
- full install or full project -> +2
- uploaded photos -> +1

Output bands:
- 0-2 = Cold
- 3-5 = Warm
- 6+ = Hot

### Chatbot
The chatbot is not support-only. It is a sales qualifier.
It should:
- greet clearly
- ask short direct qualifying questions
- estimate broad range where appropriate
- encourage callback / site visit booking
- feed same routing and scoring logic as the form

## Design requirements

- mobile-first
- fast-loading
- sticky CTA on mobile
- floating call / WhatsApp / quote controls
- clear contrast and trust-heavy layout
- modern but not overdesigned

## SEO requirements

- unique title tags and meta descriptions
- JSON-LD LocalBusiness + Service schema
- FAQ schema on relevant pages
- logical breadcrumb structure
- XML sitemap
- HTML sitemap
- canonical tags
- clean URL structure

## Internal linking rules

- every page links upward to its service hub
- every page links sideways to 2-4 relevant sibling pages
- every page links to at least one conversion page
- homepage links to top priority local pages
- support content links back to money pages

## Conversion requirements

- CTA visible above fold
- quote form every key page
- trust blocks before final CTA
- urgency without spam
- thank-you page with next steps
- optional review / gallery follow-up links

## Deliverables

1. live dual-site architecture
2. first 30 SEO pages planned and templated
3. functioning intake form
4. chatbot shell and logic wiring
5. lead scoring and routing JS
6. deployment checklist

Build this cleanly, commercially, and without fluff.
