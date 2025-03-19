# Product Requirements Document (PRD)
## Meridian Website - Firebase Hosted

### Project Overview
**Objective:** Create a professional, responsive static website for Meridian, leveraging Windsurf for development and hosting on Firebase. The website will integrate HubSpot forms for lead capture, reflect Meridian's branding, and deliver seamless user experiences across devices.

### Technical Stack
- **Development:** Windsurf
- **Hosting:** Firebase
- **Forms:** HubSpot Integration
- **Type:** Static Website

### Functional Requirements

#### 1. Page Structure

##### Homepage
###### Header Components
- Meridian logo (Asset: "Meridian Logo two.png")
- Navigation Menu:
  - Who We Are
  - Products & Services
  - Contact Us

###### Hero Section
- **Headline:** "Efficient Pallet & Packaging Procurement"
- **Subheadline:** "Meridian simplifies pallet and packaging sourcing, offering affordability, reliability, and nationwide service."
- **CTA Button:** "Get a Free Consultation" (Links to Contact Page)

###### Main Content
- Who We Are section with concise company description
- Core Benefits section highlighting:
  1. Aggregated purchasing power
  2. Expert guidance
  3. Real-time insights
  4. Cost optimization

##### Products & Services Page
- Dedicated sections for each product category:
  1. Pallets
  2. Shrink Wrap
  3. Corrugated Boxes
  4. Pallet Consulting
  5. Lumber
  6. Logistics Support
  7. Nails
  8. Additional Packaging Materials
- **CTA Button:** "Explore Our Products" (Links to Contact Page)

##### Contact Page
- HubSpot form integration with fields:
  - Name
  - Email
  - Company
  - Phone
  - Message
- Prominent "Schedule Your Consultation" heading

### Design Specifications

#### Brand Identity

##### Logo
- Asset: "Meridian Logo two.png"

##### Color Palette
###### Primary Colors
- Dark Blue (Headings/accents): `#0d1b2a`
- Secondary Blue (Backgrounds): `#1b263b`

###### Support Colors
- Medium Blue: `#415a77`
- Light Blue: `#778da9`

###### Accent/CTA
- Gold: `#e1c16e`

###### Neutrals
- Light Gray: `#e0e1dd`
- Light Gold: `#f4e5c3`
- White: `#ffffff`
- Black: `#000000`

##### Typography
Font Family: Quiet Sans
Weights:
- ExtraLight
- Light
- SemiBold
- Bold
- ExtraBold

#### Responsive Design Requirements
- Fully responsive across devices:
  - Desktop
  - Tablet
  - Mobile
- Fluid transitions between breakpoints
- Optimized images and layouts for each viewport

#### SEO Requirements
- Clean HTML markup structure
- Proper meta tags implementation
- Alt text for all images
- Logical heading hierarchy (h1 - h6)
- Fast loading pages
- Semantic HTML elements

### Performance Requirements
- Page load time < 3 seconds
- Mobile-first approach
- Optimized assets
- Minimal dependencies

### Integration Requirements
- HubSpot form integration
- Firebase hosting setup
- Analytics tracking implementation
