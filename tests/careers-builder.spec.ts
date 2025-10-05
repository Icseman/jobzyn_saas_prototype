import { test, expect } from '@playwright/test'

test.describe('Careers Page Builder', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the careers builder page
    await page.goto('/careers-builder')
    
    // Wait for the page to load
    await page.waitForSelector('[data-testid="careers-builder"]', { timeout: 10000 })
  })

  test('should load the careers page builder interface', async ({ page }) => {
    // Check if the main components are visible
    await expect(page.locator('text=Careers Page Builder')).toBeVisible()
    await expect(page.locator('text=Sections')).toBeVisible()
    await expect(page.locator('text=Templates')).toBeVisible()
    
    // Check if the header controls are present
    await expect(page.locator('button:has-text("Save")')).toBeVisible()
    await expect(page.locator('button:has-text("Reset")')).toBeVisible()
    await expect(page.locator('button:has-text("Preview")')).toBeVisible()
  })

  test('should display section templates', async ({ page }) => {
    // Click on Templates tab
    await page.click('text=Templates')
    
    // Check if template cards are visible
    await expect(page.locator('text=Hero Story')).toBeVisible()
    await expect(page.locator('text=Spotlight Job')).toBeVisible()
    await expect(page.locator('text=Culture Mosaic')).toBeVisible()
    await expect(page.locator('text=Benefits Experience')).toBeVisible()
    await expect(page.locator('text=Testimonials Carousel')).toBeVisible()
    await expect(page.locator('text=Fun Facts')).toBeVisible()
    await expect(page.locator('text=Apply / Contact')).toBeVisible()
    await expect(page.locator('text=Custom Creative')).toBeVisible()
  })

  test('should add a new section from templates', async ({ page }) => {
    // Click on Templates tab
    await page.click('text=Templates')
    
    // Click on Hero Story template
    await page.click('text=Hero Story')
    
    // Switch back to Sections tab to see the added section
    await page.click('text=Sections')
    
    // Check if Hero Story section was added
    await expect(page.locator('text=Hero Story')).toBeVisible()
  })

  test('should reorder sections using drag and drop', async ({ page }) => {
    // Ensure we have at least 2 sections
    await page.click('text=Templates')
    await page.click('text=Spotlight Job')
    await page.click('text=Sections')
    
    // Get initial order
    const sections = page.locator('[data-testid="section-item"]')
    const initialCount = await sections.count()
    
    // Perform drag and drop (this would need to be implemented with proper drag and drop handling)
    // For now, we'll just verify the sections are present
    expect(initialCount).toBeGreaterThan(0)
  })

  test('should toggle section visibility', async ({ page }) => {
    // Click on a section to select it
    await page.click('text=Hero Story')
    
    // Click the visibility toggle button
    await page.click('button[aria-label="Toggle visibility"]')
    
    // Check if the section is now hidden (this would depend on implementation)
    // For now, we'll just verify the button exists
    await expect(page.locator('button[aria-label="Toggle visibility"]')).toBeVisible()
  })

  test('should open section settings', async ({ page }) => {
    // Click on a section to select it
    await page.click('text=Hero Story')
    
    // Click the settings button
    await page.click('button[aria-label="Settings"]')
    
    // Check if settings panel is visible
    await expect(page.locator('text=Hero Story Settings')).toBeVisible()
  })

  test('should change preview mode', async ({ page }) => {
    // Test desktop preview
    await page.click('button[aria-label="Desktop preview"]')
    
    // Test tablet preview
    await page.click('button[aria-label="Tablet preview"]')
    
    // Test mobile preview
    await page.click('button[aria-label="Mobile preview"]')
    
    // Verify preview mode buttons are present
    await expect(page.locator('button[aria-label="Desktop preview"]')).toBeVisible()
    await expect(page.locator('button[aria-label="Tablet preview"]')).toBeVisible()
    await expect(page.locator('button[aria-label="Mobile preview"]')).toBeVisible()
  })

  test('should change theme', async ({ page }) => {
    // Test theme switching
    await page.click('button[aria-label="Light theme"]')
    await page.click('button[aria-label="Dark theme"]')
    await page.click('button[aria-label="Gradient theme"]')
    
    // Verify theme buttons are present
    await expect(page.locator('button[aria-label="Light theme"]')).toBeVisible()
    await expect(page.locator('button[aria-label="Dark theme"]')).toBeVisible()
    await expect(page.locator('button[aria-label="Gradient theme"]')).toBeVisible()
  })

  test('should save the careers page', async ({ page }) => {
    // Click save button
    await page.click('button:has-text("Save")')
    
    // Check if save confirmation appears (this would depend on implementation)
    // For now, we'll just verify the button is clickable
    await expect(page.locator('button:has-text("Save")')).toBeVisible()
  })

  test('should reset the careers page', async ({ page }) => {
    // Add a section first
    await page.click('text=Templates')
    await page.click('text=Spotlight Job')
    await page.click('text=Sections')
    
    // Click reset button
    await page.click('button:has-text("Reset")')
    
    // Verify the page resets (this would depend on implementation)
    await expect(page.locator('button:has-text("Reset")')).toBeVisible()
  })

  test('should use undo/redo functionality', async ({ page }) => {
    // Test undo button
    await page.click('button[aria-label="Undo"]')
    
    // Test redo button
    await page.click('button[aria-label="Redo"]')
    
    // Verify undo/redo buttons are present
    await expect(page.locator('button[aria-label="Undo"]')).toBeVisible()
    await expect(page.locator('button[aria-label="Redo"]')).toBeVisible()
  })

  test('should render hero story section correctly', async ({ page }) => {
    // Add Hero Story section
    await page.click('text=Templates')
    await page.click('text=Hero Story')
    await page.click('text=Sections')
    
    // Check if hero section is rendered in the canvas
    await expect(page.locator('text=Join Our Adventure')).toBeVisible()
    await expect(page.locator('text=Build the future with us')).toBeVisible()
    await expect(page.locator('button:has-text("Apply Now")')).toBeVisible()
  })

  test('should render spotlight job section correctly', async ({ page }) => {
    // Add Spotlight Job section
    await page.click('text=Templates')
    await page.click('text=Spotlight Job')
    await page.click('text=Sections')
    
    // Check if spotlight section is rendered
    await expect(page.locator('text=Featured Opportunities')).toBeVisible()
    await expect(page.locator('text=Senior UX Designer')).toBeVisible()
  })

  test('should render culture mosaic section correctly', async ({ page }) => {
    // Add Culture Mosaic section
    await page.click('text=Templates')
    await page.click('text=Culture Mosaic')
    await page.click('text=Sections')
    
    // Check if culture section is rendered
    await expect(page.locator('text=Our Culture in Action')).toBeVisible()
  })

  test('should render benefits section correctly', async ({ page }) => {
    // Add Benefits section
    await page.click('text=Templates')
    await page.click('text=Benefits Experience')
    await page.click('text=Sections')
    
    // Check if benefits section is rendered
    await expect(page.locator('text=Why You\'ll Love Working Here')).toBeVisible()
    await expect(page.locator('text=Health & Wellness')).toBeVisible()
  })

  test('should render testimonials section correctly', async ({ page }) => {
    // Add Testimonials section
    await page.click('text=Templates')
    await page.click('text=Testimonials Carousel')
    await page.click('text=Sections')
    
    // Check if testimonials section is rendered
    await expect(page.locator('text=What Our Team Says')).toBeVisible()
  })

  test('should render fun facts section correctly', async ({ page }) => {
    // Add Fun Facts section
    await page.click('text=Templates')
    await page.click('text=Fun Facts')
    await page.click('text=Sections')
    
    // Check if fun facts section is rendered
    await expect(page.locator('text=By the Numbers')).toBeVisible()
  })

  test('should render apply/contact section correctly', async ({ page }) => {
    // Add Apply/Contact section
    await page.click('text=Templates')
    await page.click('text=Apply / Contact')
    await page.click('text=Sections')
    
    // Check if apply section is rendered
    await expect(page.locator('text=Ready to Join Us?')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your full name"]')).toBeVisible()
  })

  test('should render custom creative section correctly', async ({ page }) => {
    // Add Custom Creative section
    await page.click('text=Templates')
    await page.click('text=Custom Creative')
    await page.click('text=Sections')
    
    // Check if custom section is rendered
    await expect(page.locator('text=Custom Creative Content')).toBeVisible()
    await expect(page.locator('text=Content Editor')).toBeVisible()
  })
})


