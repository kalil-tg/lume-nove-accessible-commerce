import { chromium } from '@playwright/test'
import { mkdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const portfolio = resolve(here, '..', '..')
const output = resolve(portfolio, 'covers')

const projects = [
  {
    file: '01-lume-nove-cover.png',
    image: resolve(portfolio, 'lume-nove-accessibility', 'screenshots', '01-storefront-desktop.png'),
    eyebrow: 'ACCESSIBLE COMMERCE',
    title: 'LUME NOVE',
    statement: 'A premium checkout rebuilt for keyboard flow and clear recovery.',
    meta: ['React', 'WCAG 2.2', 'axe-core'],
    palette: ['#f5efe3', '#244733', '#b7472e', '#11100d'],
  },
  {
    file: '02-cairn-cover.png',
    image: resolve(portfolio, 'cairn', 'screenshots', '03-product-desktop.png'),
    eyebrow: 'ACCESSIBLE B2B SAAS',
    title: 'CAIRN',
    statement: 'Dense revenue workflows without interaction debt.',
    meta: ['React', 'Complex UI', 'Regression tests'],
    palette: ['#ef5b2a', '#11110f', '#f7f3e8', '#11110f'],
  },
  {
    file: '03-civerra-cover.png',
    image: resolve(portfolio, 'civerra', 'screenshots', '01-dashboard-desktop.png'),
    eyebrow: 'ACCESSIBLE PUBLIC SERVICES',
    title: 'CIVERRA',
    statement: 'High-stakes forms with clear errors, progress, and evidence.',
    meta: ['React', 'Form UX', 'WCAG 2.2'],
    palette: ['#e9f0ff', '#102a56', '#185ad7', '#101b33'],
  },
  {
    file: '04-sereva-cover.png',
    image: resolve(portfolio, 'sereva-health', 'screenshots', '01-dashboard-desktop.png'),
    eyebrow: 'ACCESSIBLE HEALTHCARE',
    title: 'SEREVA',
    statement: 'Results, refills, and status communicated beyond color.',
    meta: ['React', 'Patient portal', 'Inclusive UX'],
    palette: ['#f3eee7', '#104c32', '#6b244a', '#15251d'],
  },
]

const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true })

for (const project of projects) {
  const screenshot = await readFile(project.image)
  const src = `data:image/png;base64,${screenshot.toString('base64')}`
  const [background, accent, signal, ink] = project.palette
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 })

  await page.setContent(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; }
          html, body { width: 1600px; height: 1200px; margin: 0; overflow: hidden; }
          body {
            background: ${background};
            color: ${ink};
            font-family: Arial, Helvetica, sans-serif;
            padding: 82px 88px 0;
            position: relative;
          }
          body::before {
            content: '';
            position: absolute;
            width: 520px;
            height: 520px;
            border-radius: 50%;
            right: -180px;
            top: -260px;
            background: ${signal};
            opacity: .12;
          }
          .top { display: grid; grid-template-columns: 1fr 630px; gap: 80px; align-items: end; }
          .eyebrow { font-size: 22px; line-height: 1; font-weight: 700; letter-spacing: .18em; color: ${accent}; }
          h1 { margin: 24px 0 22px; font-size: 104px; line-height: .9; letter-spacing: -.055em; }
          .statement { margin: 0; max-width: 720px; font-size: 34px; line-height: 1.25; letter-spacing: -.025em; }
          .meta { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 14px; padding-bottom: 8px; }
          .meta span { border: 2px solid ${accent}; border-radius: 999px; padding: 12px 20px; font-size: 20px; font-weight: 700; color: ${accent}; }
          .frame {
            position: absolute;
            left: 88px;
            right: 88px;
            bottom: -72px;
            height: 690px;
            border: 10px solid ${ink};
            border-radius: 32px 32px 0 0;
            background: white;
            box-shadow: 0 36px 80px rgba(0,0,0,.18);
            overflow: hidden;
          }
          .bar { height: 46px; background: ${ink}; display: flex; align-items: center; gap: 10px; padding: 0 18px; }
          .dot { width: 12px; height: 12px; border-radius: 50%; background: ${background}; opacity: .85; }
          .frame img { display: block; width: 100%; height: calc(100% - 46px); object-fit: cover; object-position: top center; }
        </style>
      </head>
      <body>
        <div class="top">
          <div>
            <div class="eyebrow">${escape(project.eyebrow)}</div>
            <h1>${escape(project.title)}</h1>
            <p class="statement">${escape(project.statement)}</p>
          </div>
          <div class="meta">${project.meta.map((item) => `<span>${escape(item)}</span>`).join('')}</div>
        </div>
        <div class="frame">
          <div class="bar"><i class="dot"></i><i class="dot"></i><i class="dot"></i></div>
          <img src="${src}" alt="">
        </div>
      </body>
    </html>
  `, { waitUntil: 'load' })

  await page.screenshot({ path: resolve(output, project.file) })
  await page.close()
}

const profileSources = await Promise.all(projects.map(async (project) => {
  const bytes = await readFile(project.image)
  return `data:image/png;base64,${bytes.toString('base64')}`
}))
const profilePage = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 })
await profilePage.setContent(`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <style>
        * { box-sizing: border-box; }
        html, body { width: 1600px; height: 1200px; margin: 0; overflow: hidden; }
        body {
          background: #0d1010;
          color: #f5f1e8;
          font-family: Arial, Helvetica, sans-serif;
          padding: 84px 88px;
          position: relative;
        }
        body::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 86% 10%, rgba(239,91,42,.22), transparent 32%), radial-gradient(circle at 10% 90%, rgba(38,91,215,.18), transparent 34%); }
        .content { position: relative; z-index: 1; }
        .label { color: #ef5b2a; font-size: 22px; font-weight: 700; letter-spacing: .18em; }
        h1 { max-width: 1160px; margin: 26px 0 28px; font-size: 82px; line-height: .96; letter-spacing: -.052em; }
        .sub { max-width: 930px; margin: 0; color: #cfd4cf; font-size: 30px; line-height: 1.35; }
        .proof { display: flex; gap: 16px; margin-top: 34px; }
        .proof span { border: 1px solid #59615e; border-radius: 999px; padding: 11px 18px; font-size: 18px; font-weight: 700; }
        .grid { position: absolute; left: 88px; right: 88px; bottom: -55px; height: 565px; display: grid; grid-template-columns: 1.05fr .95fr; grid-template-rows: 1fr 1fr; gap: 18px; transform: perspective(1500px) rotateX(1deg); }
        .card { border: 7px solid #2a302e; border-radius: 24px; overflow: hidden; background: #fff; box-shadow: 0 26px 52px rgba(0,0,0,.38); }
        .card:first-child { grid-row: 1 / 3; }
        .card img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        .card:nth-child(2) img { object-position: center top; }
        .card:nth-child(3) img { object-position: center top; }
      </style>
    </head>
    <body>
      <main class="content">
        <div class="label">ACCESSIBILITY ENGINEERING · REACT & NEXT.JS</div>
        <h1>Complex interfaces, repaired with evidence.</h1>
        <p class="sub">WCAG-oriented audits, code-level remediation, and regression tests for dashboards, portals, checkout flows, and design systems.</p>
        <div class="proof"><span>Keyboard & focus</span><span>Semantic UI</span><span>Playwright + axe</span><span>Async delivery</span></div>
      </main>
      <section class="grid">
        <div class="card"><img src="${profileSources[1]}" alt=""></div>
        <div class="card"><img src="${profileSources[2]}" alt=""></div>
        <div class="card"><img src="${profileSources[3]}" alt=""></div>
      </section>
    </body>
  </html>
`, { waitUntil: 'load' })
await profilePage.screenshot({ path: resolve(output, '00-profile-cover.png') })
await profilePage.close()

await browser.close()
