import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml')
      // Instructing the Vercel edge to cache the file
      res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600')
      // generate sitemap here
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset
            xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
      
      
      <url>
        <loc>https://genmatrix.in/</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://genmatrix.in/login</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://genmatrix.in/aboutus</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://genmatrix.in/products</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://genmatrix.in/videos</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://genmatrix.in/blogs</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://genmatrix.in/contactus</loc>
        <lastmod>2023-09-13T12:01:02+00:00</lastmod>
        <priority>0.80</priority>
      </url>
      
      
      </urlset>`
    res.end(xml)
  }