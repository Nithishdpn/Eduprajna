<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  exclude-result-prefixes="sitemap">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>XML Sitemap | EduPrajna</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
        <style>
          :root {
            --primary: #7CB342;
            --primary-dark: #689F38;
            --primary-light: #DCEDC8;
            --bg: #F9FBE7;
            --text-dark: #33691E;
            --text-muted: #558B2F;
            --border: #E8F5E9;
            --card-bg: #FFFFFF;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Outfit', sans-serif;
            background: linear-gradient(135deg, #F9FBE7 0%, #F1F8E9 100%);
            color: #212121;
            line-height: 1.6;
            padding: 40px 20px;
            min-height: 100vh;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          header {
            text-align: center;
            margin-bottom: 40px;
          }

          .logo-area {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }

          .logo-dot {
            width: 16px;
            height: 16px;
            background-color: var(--primary);
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 15px rgba(124, 179, 66, 0.6);
          }

          h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--text-dark);
            letter-spacing: -0.5px;
          }

          p.subtitle {
            font-size: 1.1rem;
            color: var(--text-muted);
            margin-top: 8px;
          }

          /* Stats cards dashboard */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          }

          .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(124, 179, 66, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .stat-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(124, 179, 66, 0.1);
          }

          .stat-label {
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }

          .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: var(--text-dark);
          }

          /* Main sitemap table */
          .table-container {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 45px rgba(124, 179, 66, 0.06);
            margin-bottom: 40px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }

          th {
            background-color: #F1F8E9;
            color: var(--text-dark);
            font-weight: 700;
            padding: 18px 24px;
            border-bottom: 2px solid var(--border);
            font-size: 0.95rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          td {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            font-size: 0.95rem;
            vertical-align: middle;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background-color: #F9FBE7;
          }

          /* URL Links styling */
          .sitemap-link {
            color: #1B5E20;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
            display: inline-block;
            word-break: break-all;
          }

          .sitemap-link:hover {
            color: var(--primary);
            text-decoration: underline;
          }

          /* Badges */
          .badge {
            display: inline-flex;
            align-items: center;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: capitalize;
          }

          .badge-freq {
            background-color: var(--primary-light);
            color: var(--text-dark);
          }

          /* Priority Visualizer */
          .priority-container {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .priority-bar-bg {
            width: 60px;
            height: 6px;
            background-color: #EEEEEE;
            border-radius: 3px;
            overflow: hidden;
          }

          .priority-bar-fill {
            height: 100%;
            border-radius: 3px;
          }

          .priority-bar-high {
            background-color: var(--primary);
          }

          .priority-bar-med {
            background-color: #81C784;
          }

          .priority-bar-low {
            background-color: #A5D6A7;
          }

          .priority-text {
            font-weight: 700;
            font-size: 0.9rem;
            min-width: 24px;
          }

          .text-high { color: var(--text-dark); }
          .text-med { color: #558B2F; }
          .text-low { color: #669933; }

          /* Footer */
          footer {
            text-align: center;
            padding: 20px 0;
            color: var(--text-muted);
            font-size: 0.9rem;
            border-top: 1px dashed var(--primary-light);
            margin-top: 40px;
          }

          @media (max-width: 768px) {
            body {
              padding: 20px 10px;
            }
            th, td {
              padding: 12px 16px;
            }
            .hide-mobile {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="logo-area">
              <span class="logo-dot"></span>
              <h1>EduPrajna</h1>
            </div>
            <h2>XML Sitemap</h2>
            <p class="subtitle">Generated dynamically for search engine optimization.</p>
          </header>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Indexed URLs</div>
              <div class="stat-value">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">High Priority Pages (≥ 0.8)</div>
              <div class="stat-value">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.8])"/>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Primary Target Links</div>
              <div class="stat-value">6 Pages</div>
            </div>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>URL Path</th>
                  <th class="hide-mobile">Priority</th>
                  <th class="hide-mobile">Change Frequency</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" data-type="number" order="descending"/>
                  <tr>
                    <td>
                      <a href="{sitemap:loc}" class="sitemap-link" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td class="hide-mobile">
                      <div class="priority-container">
                        <div class="priority-bar-bg">
                          <xsl:choose>
                            <xsl:when test="sitemap:priority >= 0.9">
                              <div class="priority-bar-fill priority-bar-high" style="width: {sitemap:priority * 100}%;"/>
                            </xsl:when>
                            <xsl:when test="sitemap:priority >= 0.7">
                              <div class="priority-bar-fill priority-bar-med" style="width: {sitemap:priority * 100}%;"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <div class="priority-bar-fill priority-bar-low" style="width: {sitemap:priority * 100}%;"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </div>
                        <span class="priority-text">
                          <xsl:choose>
                            <xsl:when test="sitemap:priority >= 0.9">
                              <span class="text-high"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:when test="sitemap:priority >= 0.7">
                              <span class="text-med"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:otherwise>
                              <span class="text-low"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:otherwise>
                          </xsl:choose>
                        </span>
                      </div>
                    </td>
                    <td class="hide-mobile">
                      <span class="badge badge-freq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer>
            &amp;copy; 2026 EduPrajna. Handcrafted with precision.
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
