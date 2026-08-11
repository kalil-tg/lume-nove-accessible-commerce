import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

async function expectNoAutomatedViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze()
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
}

test('controlled legacy fixture exposes the expected automated baseline failures', async ({ page }) => {
  const fixture = await readFile(new URL('../audit/fixtures/legacy-checkout.html', import.meta.url), 'utf8')
  await page.setContent(fixture)

  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze()
  const violationIds = results.violations.map((violation) => violation.id)

  expect(violationIds).toEqual(expect.arrayContaining([
    'button-name',
    'color-contrast',
    'image-alt',
    'link-name',
    'select-name',
  ]))
})

test('storefront has a clean automated WCAG scan and working filters', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Light, shaped for everyday rituals.' })).toBeVisible()
  await expect(page.getByText('4 products', { exact: true })).toBeVisible()
  await expectNoAutomatedViolations(page)

  await page.getByRole('button', { name: 'Filter products' }).click()
  await expect(page.getByRole('dialog', { name: 'Filter products' })).toBeVisible()
  await page.getByRole('checkbox', { name: 'Floor lamp' }).check()
  await page.getByRole('button', { name: 'Show products' }).click()

  await expect(page.getByText('1 product', { exact: true })).toBeVisible()
  await expect(page.getByRole('article').filter({ hasText: 'Arco 01' })).toBeVisible()
})

test('skip link is the first keyboard stop and moves focus to products', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')

  const skipLink = page.getByRole('link', { name: 'Skip to products' })
  await expect(skipLink).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#products')).toBeFocused()
})

test('product drawer announces success, manages focus, and continues to checkout', async ({ page }) => {
  await page.goto('/products/arco-01')
  await expectNoAutomatedViolations(page)

  const addButton = page.getByRole('button', { name: 'Add to bag — €590' })
  await addButton.click()

  const drawer = page.getByRole('dialog', { name: 'Added to your bag' })
  await expect(drawer).toBeVisible()
  await expect(drawer.getByText('Arco 01 was added.')).toBeVisible()
  await expect(drawer.getByRole('button', { name: 'Close bag' })).toBeFocused()
  await expectNoAutomatedViolations(page)

  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect(addButton).toBeFocused()

  await addButton.click()
  await drawer.getByRole('link', { name: 'Checkout securely' }).click()
  await expect(page).toHaveURL('/checkout')
  await expect(page.getByRole('heading', { name: 'Delivery details' })).toBeVisible()
})

test('checkout error summary and inline error are programmatically connected', async ({ page }) => {
  await page.goto('/checkout')
  await expectNoAutomatedViolations(page)

  const postalCode = page.getByRole('textbox', { name: 'Postal code' })
  await postalCode.fill('123')
  await page.getByRole('button', { name: 'Continue to payment' }).click()

  const summary = page.getByRole('alert')
  await expect(summary).toBeFocused()
  await expect(summary).toContainText('Enter a valid 5-digit postal code.')
  await expect(postalCode).toHaveAttribute('aria-invalid', 'true')
  await expect(page.locator('#postal-error')).toHaveText('Enter a valid 5-digit postal code.')

  await summary.getByRole('button', { name: 'Postal code — Enter a valid 5-digit postal code.' }).click()
  await expect(postalCode).toBeFocused()

  await postalCode.fill('20121')
  await page.getByRole('button', { name: 'Continue to payment' }).click()
  await expect(page.getByRole('heading', { name: 'Delivery details saved.' })).toBeVisible()
})

test('mobile storefront has no horizontal overflow and keeps named controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.getByRole('link', { name: 'Bag, 0 items' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Search' })).toBeVisible()
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(hasOverflow).toBe(false)
  await expectNoAutomatedViolations(page)
})
