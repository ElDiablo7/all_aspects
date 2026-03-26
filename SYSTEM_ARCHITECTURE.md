# System Architecture

## 1. Traffic Acquisition Layer
Sources:
- Google organic search
- Google Business Profile traffic
- direct traffic from branded searches
- paid traffic later if desired

## 2. Landing Layer
Visitors enter through:
- homepage
- service hub pages
- service + location pages
- cost / info support pages

## 3. Conversion Layer
Every page offers:
- quote form
- call CTA
- WhatsApp CTA
- GRACE-X chatbot

## 4. Qualification Layer
Form and chatbot collect:
- service intent
- location / postcode
- budget
- timeline
- project notes

## 5. Logic Layer
### Routing
- PAVING bucket
- BUILDING bucket

### Scoring
- hot / warm / cold

### Optional CRM payload
```
{
  "site": "allaspectspaving.co.uk",
  "service": "resin-driveway",
  "postcode": "CR0 2XX",
  "budget_range": "10000+",
  "timeline": "asap",
  "lead_score": 7,
  "lead_temperature": "hot"
}
```

## 6. Human Follow-up Layer
- hot leads called immediately
- warm leads same day
- cold leads email + nurture

## 7. Authority Layer
- case studies
- reviews
- before / after
- location references
- FAQ depth

## 8. Expansion Layer
Once core pages rank:
- add more towns
- add supporting guides
- add sector landing pages
- add microsites only if needed
