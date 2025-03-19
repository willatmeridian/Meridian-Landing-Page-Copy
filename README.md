# Meridian Website

A static website for Meridian, showcasing pallet and packaging procurement services.

## Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize your project:
```bash
firebase init
```

4. Build the website:
- Copy the contents of the src directory to the public directory
- Ensure all assets (images, CSS, JS) are properly linked

5. Deploy:
```bash
firebase deploy
```

## Development

The website uses:
- HTML5
- CSS3 with custom properties
- Vanilla JavaScript
- Firebase Hosting
- HubSpot Forms Integration

### Structure
```
/src
  /css
    styles.css
  /js
    main.js
    hubspot-form.js
  /images
    - Logo files
  index.html
  products-services.html
  contact.html
```

## Brand Colors
- Primary: #0d1b2a
- Secondary: #1b263b
- Support Colors: #415a77, #778da9
- Accent: #e1c16e
- Neutrals: #e0e1dd, #f4e5c3, #ffffff, #000000

## Typography
Font: Quiet Sans (Adobe Fonts)
Weights: ExtraLight, Light, SemiBold, Bold, ExtraBold
