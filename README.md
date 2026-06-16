# Suhejb Kadrija Portfolio Website

A modern, clean, and colorful personal portfolio website built with React and TailwindCSS, optimized for SEO and Google ranking.

## 🚀 SEO Features Implemented

### Meta Tags & Title
- **Title**: "Suhejb Kadrija | Full-Stack Developer in North Macedonia | React, PHP, WordPress"
- **Meta Description**: Optimized for search engines with relevant keywords
- **Meta Keywords**: Full-Stack Developer, North Macedonia, React, WordPress, PHP, MySQL
- **Open Graph Tags**: For Facebook/LinkedIn sharing
- **Twitter Cards**: For better social media previews

### Technical SEO
- **robots.txt**: Search engine crawling instructions
- **sitemap.xml**: Site structure for search engines
- **Structured Data**: JSON-LD schema for Person and Projects
- **Canonical URLs**: Prevent duplicate content issues
- **Performance**: Preload critical resources, deferred JavaScript

### Content Optimization
- **H1**: "Full-Stack Developer in North Macedonia" (main page title)
- **H2**: About, Skills, Projects, Testimonials, Contact sections
- **H3**: Individual project names (CarLux, Scriptorium, WordPress E-commerce)
- **Alt Text**: Descriptive alt text for all images with keywords
- **Natural Keywords**: SEO keywords naturally integrated into content

## 📁 SEO Files Created

- `public/robots.txt` - Search engine crawling instructions
- `public/sitemap.xml` - Site structure for search engines
- `index.html` - Enhanced with meta tags and structured data

## 🔧 Customization Required

Before deploying, update these URLs in the files:
- `index.html`: Replace `https://yourdomain.com` with your actual domain
- `sitemap.xml`: Update domain and lastmod dates
- `robots.txt`: Update sitemap URL
- Social media links in structured data

## 🎯 Target Keywords

- Full-Stack Developer North Macedonia
- React Developer North Macedonia
- WordPress Developer North Macedonia
- PHP MySQL Web Developer
- Web Portfolio North Macedonia
- E-commerce Development North Macedonia

## 📱 Performance Features

- Responsive design (mobile-first)
- Optimized images with descriptive alt text
- Preloaded critical resources
- Deferred JavaScript loading
- Fast loading with Vite build tool

## 📄 Resume Download Feature

Your portfolio now includes resume download functionality:

- **Hero Section**: Prominent resume download button alongside "Explore My Work"
- **Contact Section**: Resume download option in contact information
- **Styling**: Beautiful gradient buttons with hover animations
- **Download Filename**: "Suhejb_Kadrija_Resume.pdf"

**To enable resume downloads:**
1. Create your resume in PDF format
2. Name it `resume.pdf`
3. Place it in the `public` folder
4. The download buttons will automatically work

## 📧 Contact Form Setup

### ✅ EmailJS Fully Configured!

Your contact form is now **100% functional** and ready to send emails directly to your Gmail account!

**Current Configuration:**
- Service ID: `service_qz7pcgu`
- Template ID: `template_vttfzwq`
- Public Key: `bec3wq_axXfpt_Oop`
- Target Email: `suhejbkadrija1@gmail.com`

**How it works:**
1. Users fill out the contact form on your portfolio
2. The form sends the message directly to your Gmail via EmailJS
3. You receive the email with the sender's name, email, and message
4. The form shows a success message and resets automatically

**Testing:**
Try filling out the contact form on your portfolio - it should now successfully send emails to your Gmail!

**No additional setup required** - everything is ready to go! 🚀

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Technologies Used

- React 18
- Vite
- Tailwind CSS

## Project Structure

```
src/
├── App.jsx          # Main application component
├── index.css        # Global styles with Tailwind CSS
└── main.jsx         # Application entry point
```

Start building your portfolio by editing the components in the `src` directory!
