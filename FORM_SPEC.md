# Form Specification

## Fields
- full_name (required)
- phone (required)
- email (optional but recommended)
- postcode (required)
- service_type (required)
- budget_range (required)
- timeline (required)
- message (optional)
- photo_upload (optional)

## Validation
- phone must be UK-valid format or relaxed text pattern
- postcode minimum format sanity check
- service_type cannot be blank
- budget_range cannot be blank
- timeline cannot be blank

## Routing logic
### PAVING values
- driveway
- block paving
- resin driveway
- patio
- paving
- landscaping

### BUILDING values
- builder
- extension
- loft conversion
- renovation
- roofing
- structural work

## Lead scoring
- budget `10000_plus` = +3
- timeline `asap` = +2
- message mentions `full`, `new`, `install`, `complete` = +2
- postcode in core service radius = +2
- photo upload present = +1

## Thank-you page behaviour
Display:
- confirmation message
- realistic callback expectation
- trust reminder
- optional gallery / reviews CTA
