import { BrowserContext, Page, expect, test } from '@playwright/test'

test.describe('Tax return form test', () => {
  let context: BrowserContext
  let page: Page

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext()
    page = await context.newPage()
  })

  test.afterEach(async () => {
    await context.close()
    await page.close()
  })

  test('should have a create application button on the screen', async () => {
    const page = await context.newPage()
    await page.goto('/umsoknir/skattframtal/')
    await page.fill('input[name="userIdentifier"]', '0102399')
    await page.click('#submitPhoneNumber')
    await expect(page).toHaveURL('/umsoknir/skattframtal/')
    await page.waitForTimeout(4000)
    await page.getByTestId('create-new-application').isVisible()
  })
})
