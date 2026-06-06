#!/usr/bin/env node

/**
 * SEO Audit Script for EduPrajna
 * 
 * This script performs a comprehensive SEO audit of the built application
 * and generates a report with recommendations.
 */

const fs = require('fs');
const path = require('path');

console.log(' Starting SEO Audit for EduPrajna...\n');

// Check if build exists
const buildPath = path.join(__dirname, '../dist');
if (!fs.existsSync(buildPath)) {
  console.error(' Build directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Read the built HTML
const indexPath = path.join(buildPath, 'index.html');
const htmlContent = fs.readFileSync(indexPath, 'utf8');

// SEO Audit Checks
const auditResults = {
  meta: {
    title: checkTitle(htmlContent),
    description: checkDescription(htmlContent),
    keywords: checkKeywords(htmlContent),
    canonical: checkCanonical(htmlContent),
    robots: checkRobots(htmlContent),
    viewport: checkViewport(htmlContent),
    themeColor: checkThemeColor(htmlContent)
  },
  openGraph: {
    title: checkOGTitle(htmlContent),
    description: checkOGDescription(htmlContent),
    image: checkOGImage(htmlContent),
    type: checkOGType(htmlContent),
    url: checkOGUrl(htmlContent)
  },
  twitter: {
    card: checkTwitterCard(htmlContent),
    title: checkTwitterTitle(htmlContent),
    description: checkTwitterDescription(htmlContent),
    image: checkTwitterImage(htmlContent)
  },
  structured: {
    jsonLd: checkStructuredData(htmlContent)
  },
  files: {
    sitemap: checkSitemap(),
    robots: checkRobotsTxt()
  },
  performance: {
    cssSize: checkCSSSize(),
    jsSize: checkJSSize()
  }
};

// Helper Functions
function checkTitle(html) {
  const match = html.match(/<title>(.*?)<\/title>/);
  return {
    exists: !!match,
    content: match ? match[1] : null,
    length: match ? match[1].length : 0,
    optimal: match ? match[1].length >= 30 && match[1].length <= 60 : false
  };
}

function checkDescription(html) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null,
    length: match ? match[1].length : 0,
    optimal: match ? match[1].length >= 120 && match[1].length <= 160 : false
  };
}

function checkKeywords(html) {
  const match = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkCanonical(html) {
  const match = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    url: match ? match[1] : null
  };
}

function checkRobots(html) {
  const match = html.match(/<meta\s+name="robots"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkViewport(html) {
  const match = html.match(/<meta\s+name="viewport"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkThemeColor(html) {
  const match = html.match(/<meta\s+name="theme-color"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    color: match ? match[1] : null
  };
}

function checkOGTitle(html) {
  const match = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkOGDescription(html) {
  const match = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkOGImage(html) {
  const match = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    url: match ? match[1] : null
  };
}

function checkOGType(html) {
  const match = html.match(/<meta\s+property="og:type"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    type: match ? match[1] : null
  };
}

function checkOGUrl(html) {
  const match = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    url: match ? match[1] : null
  };
}

function checkTwitterCard(html) {
  const match = html.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    type: match ? match[1] : null
  };
}

function checkTwitterTitle(html) {
  const match = html.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkTwitterDescription(html) {
  const match = html.match(/<meta\s+name="twitter:description"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    content: match ? match[1] : null
  };
}

function checkTwitterImage(html) {
  const match = html.match(/<meta\s+name="twitter:image"\s+content="([^"]*)"[^>]*>/);
  return {
    exists: !!match,
    url: match ? match[1] : null
  };
}

function checkStructuredData(html) {
  const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  let valid = false;
  if (match) {
    try {
      JSON.parse(match[1].trim());
      valid = true;
    } catch (e) {
      valid = false;
    }
  }
  return {
    exists: !!match,
    valid: valid
  };
}

function checkSitemap() {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  return {
    exists: fs.existsSync(sitemapPath)
  };
}

function checkRobotsTxt() {
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  return {
    exists: fs.existsSync(robotsPath)
  };
}

function checkCSSSize() {
  const assetsPath = path.join(buildPath, 'assets');
  const cssFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith('.css'));
  let totalSize = 0;
  cssFiles.forEach(file => {
    const stats = fs.statSync(path.join(assetsPath, file));
    totalSize += stats.size;
  });
  return {
    files: cssFiles.length,
    totalSize: totalSize,
    totalSizeKB: Math.round(totalSize / 1024)
  };
}

function checkJSSize() {
  const assetsPath = path.join(buildPath, 'assets');
  const jsFiles = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));
  let totalSize = 0;
  jsFiles.forEach(file => {
    const stats = fs.statSync(path.join(assetsPath, file));
    totalSize += stats.size;
  });
  return {
    files: jsFiles.length,
    totalSize: totalSize,
    totalSizeKB: Math.round(totalSize / 1024)
  };
}

// Generate Report
console.log(' SEO AUDIT REPORT\n');
console.log('=' .repeat(60));

// Meta Tags
console.log('\n META TAGS');
console.log('-'.repeat(30));
console.log(`Title: ${auditResults.meta.title.exists ? '' : ''} ${auditResults.meta.title.content}`);
console.log(`  Length: ${auditResults.meta.title.length} chars ${auditResults.meta.title.optimal ? '' : ''}`);
console.log(`Description: ${auditResults.meta.description.exists ? '' : ''}`);
console.log(`  Length: ${auditResults.meta.description.length} chars ${auditResults.meta.description.optimal ? '' : ''}`);
console.log(`Keywords: ${auditResults.meta.keywords.exists ? '' : ''}`);
console.log(`Canonical: ${auditResults.meta.canonical.exists ? '' : ''}`);
console.log(`Robots: ${auditResults.meta.robots.exists ? '' : ''}`);
console.log(`Viewport: ${auditResults.meta.viewport.exists ? '' : ''}`);
console.log(`Theme Color: ${auditResults.meta.themeColor.exists ? '' : ''}`);

// Open Graph
console.log('\n OPEN GRAPH');
console.log('-'.repeat(30));
console.log(`OG Title: ${auditResults.openGraph.title.exists ? '' : ''}`);
console.log(`OG Description: ${auditResults.openGraph.description.exists ? '' : ''}`);
console.log(`OG Image: ${auditResults.openGraph.image.exists ? '' : ''}`);
console.log(`OG Type: ${auditResults.openGraph.type.exists ? '' : ''}`);
console.log(`OG URL: ${auditResults.openGraph.url.exists ? '' : ''}`);

// Twitter
console.log('\n TWITTER CARDS');
console.log('-'.repeat(30));
console.log(`Twitter Card: ${auditResults.twitter.card.exists ? '' : ''}`);
console.log(`Twitter Title: ${auditResults.twitter.title.exists ? '' : ''}`);
console.log(`Twitter Description: ${auditResults.twitter.description.exists ? '' : ''}`);
console.log(`Twitter Image: ${auditResults.twitter.image.exists ? '' : ''}`);

// Structured Data
console.log('\n STRUCTURED DATA');
console.log('-'.repeat(30));
console.log(`JSON-LD: ${auditResults.structured.jsonLd.exists ? '' : ''}`);
console.log(`Valid JSON: ${auditResults.structured.jsonLd.valid ? '' : ''}`);

// Files
console.log('\n SEO FILES');
console.log('-'.repeat(30));
console.log(`Sitemap.xml: ${auditResults.files.sitemap.exists ? '' : ''}`);
console.log(`Robots.txt: ${auditResults.files.robots.exists ? '' : ''}`);

// Performance
console.log('\n PERFORMANCE');
console.log('-'.repeat(30));
console.log(`CSS Size: ${auditResults.performance.cssSize.totalSizeKB}KB ${auditResults.performance.cssSize.totalSizeKB < 100 ? '' : ''}`);
console.log(`JS Size: ${auditResults.performance.jsSize.totalSizeKB}KB ${auditResults.performance.jsSize.totalSizeKB < 500 ? '' : ''}`);

// Final Score
let score = 0;
let total = 0;

// Count successful checks
Object.values(auditResults.meta).forEach(check => {
  if (typeof check === 'object' && check.exists) score++;
  total++;
});

Object.values(auditResults.openGraph).forEach(check => {
  if (check.exists) score++;
  total++;
});

Object.values(auditResults.twitter).forEach(check => {
  if (check.exists) score++;
  total++;
});

if (auditResults.structured.jsonLd.exists && auditResults.structured.jsonLd.valid) score++;
total++;

if (auditResults.files.sitemap.exists) score++;
total++;

if (auditResults.files.robots.exists) score++;
total++;

const percentage = Math.round((score / total) * 100);

console.log('\n SEO SCORE');
console.log('='.repeat(30));
console.log(`${score}/${total} checks passed (${percentage}%)`);

if (percentage >= 90) {
  console.log(' EXCELLENT! Your SEO is ready for production.');
} else if (percentage >= 80) {
  console.log(' GOOD! Minor improvements recommended.');
} else if (percentage >= 70) {
  console.log('  FAIR! Several improvements needed.');
} else {
  console.log(' POOR! Major SEO improvements required.');
}

console.log('\n Audit completed!\n');