import { test, expect } from '@playwright/test';

// ──────────────────────────────────────────────
// PAGE LOAD & METADATA
// ──────────────────────────────────────────────
test.describe('Page Load & Metadata', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Rolex — Timeless Luxury Watches');
  });

  test('viewport meta tag is present for responsiveness', async ({ page }) => {
    await page.goto('/');
    const meta = page.locator('meta[name="viewport"]');
    await expect(meta).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
  });

  test('meta description is present for SEO', async ({ page }) => {
    await page.goto('/');
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute('content', /Rolex/i);
  });
});

// ──────────────────────────────────────────────
// HEADER & NAVIGATION
// ──────────────────────────────────────────────
test.describe('Header & Navigation', () => {
  test('header has Rolex brand logo', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('.header .logo').first();
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Rolex');
  });

  test('desktop navigation links are visible', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('.nav');
    await expect(nav).toBeVisible();
    await expect(nav.locator('a')).toHaveCount(5);
    await expect(nav.locator('a').first()).toContainText('Watches');
  });

  test('announcement bar is visible', async ({ page }) => {
    await page.goto('/');
    const bar = page.locator('.announcement');
    await expect(bar).toBeVisible();
    await expect(bar).toContainText('shipping');
  });

  test('cart icon is visible in header', async ({ page }) => {
    await page.goto('/');
    const cartBtn = page.locator('#cart-btn');
    await expect(cartBtn).toBeVisible();
  });

  test('mobile menu button is hidden on desktop, visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.mobile-menu-btn')).not.toBeVisible();
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('.mobile-menu-btn')).toBeVisible();
  });

  test('mobile nav opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.locator('.mobile-menu-btn').click();
    await expect(page.locator('#mobile-nav')).toHaveClass(/open/);
    await page.locator('#mobile-nav .close-btn').click();
    await expect(page.locator('#mobile-nav')).not.toHaveClass(/open/);
  });
});

// ──────────────────────────────────────────────
// HERO SECTION
// ──────────────────────────────────────────────
test.describe('Hero Section', () => {
  test('hero headline is visible', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('.hero');
    await expect(hero.locator('h1')).toBeVisible();
    await expect(hero.locator('h1')).toContainText('perfection');
  });

  test('hero has Shop Watches CTA button', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.hero .btn-primary');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Shop Watches');
  });

  test('hero has Explore Collections secondary CTA', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.hero .btn-outline-light');
    await expect(cta).toBeVisible();
    await expect(cta).toContainText('Explore');
  });

  test('hero badge is visible', async ({ page }) => {
    await page.goto('/');
    const badge = page.locator('.hero-badge');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('2026');
  });
});

// ──────────────────────────────────────────────
// TRUST BAR
// ──────────────────────────────────────────────
test.describe('Trust Bar', () => {
  test('trust bar has 5 items', async ({ page }) => {
    await page.goto('/');
    const items = page.locator('.trust-item');
    await expect(items).toHaveCount(5);
    await expect(items.first()).toContainText('Swiss Made');
  });
});

// ──────────────────────────────────────────────
// PRODUCT GRID
// ──────────────────────────────────────────────
test.describe('Product Grid', () => {
  test('product grid has 6 watches', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.product-card');
    await expect(cards).toHaveCount(6);
  });

  test('each product card has a name and price', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.product-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.product-name')).toBeVisible();
      await expect(cards.nth(i).locator('.product-price')).toBeVisible();
    }
  });

  test('each product has Add to Cart button', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('.product-card .btn-primary');
    await expect(buttons).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(buttons.nth(i)).toContainText('Add to Cart');
    }
  });

  test('product tags are visible on tagged products', async ({ page }) => {
    await page.goto('/');
    const tags = page.locator('.product-tag');
    await expect(tags).toHaveCount(3); // Bestseller, Limited, New
  });

  test('Submariner is the first product', async ({ page }) => {
    await page.goto('/');
    const firstCard = page.locator('.product-card').first();
    await expect(firstCard.locator('.product-collection')).toContainText('Submariner');
    await expect(firstCard.locator('.product-name')).toContainText('Submariner Date');
  });

  test('Daytona is present with correct reference', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.product-grid')).toContainText('Cosmograph Daytona');
    await expect(page.locator('.product-grid')).toContainText('116500LN');
  });

  test('Day-Date 40 shows correct price of $38,500', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.product-grid')).toContainText('$38,500');
  });
});

// ──────────────────────────────────────────────
// CART FUNCTIONALITY
// ──────────────────────────────────────────────
test.describe('Cart Functionality', () => {
  test('cart count starts hidden', async ({ page }) => {
    await page.goto('/');
    const count = page.locator('#cart-count');
    await expect(count).not.toBeVisible();
  });

  test('adding to cart updates count', async ({ page }) => {
    await page.goto('/');
    // Add first product
    await page.locator('.product-card .btn-primary').first().click();
    const count = page.locator('#cart-count');
    await expect(count).toBeVisible();
    await expect(count).toHaveText('1');

    // Add second product
    await page.locator('.product-card .btn-primary').nth(1).click();
    await expect(count).toHaveText('2');
  });

  test('Add to Cart shows "Added!" feedback', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('.product-card .btn-primary').first();
    await btn.click();
    await expect(btn).toContainText('Added!');
  });

  test('cart drawer opens and shows items', async ({ page }) => {
    await page.goto('/');
    // Add 2 items first
    await page.locator('.product-card .btn-primary').first().click();
    await page.locator('.product-card .btn-primary').nth(1).click();

    // Open cart
    await page.locator('#cart-btn').click();
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toHaveClass(/open/);
    await expect(drawer.locator('#cart-subtotal')).toBeVisible();
  });

  test('cart drawer closes via overlay click', async ({ page }) => {
    await page.goto('/');
    // Add item
    await page.locator('.product-card .btn-primary').first().click();
    // Open cart
    await page.locator('#cart-btn').click();
    await expect(page.locator('#cart-drawer')).toHaveClass(/open/);
    // Close via overlay
    await page.locator('#cart-overlay').click();
    await expect(page.locator('#cart-drawer')).not.toHaveClass(/open/);
  });

  test('cart drawer shows empty state', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cart-btn').click();
    const drawer = page.locator('#cart-drawer');
    await expect(drawer).toContainText('Your cart is empty');
  });

  test('cart items can be removed', async ({ page }) => {
    await page.goto('/');
    await page.locator('.product-card .btn-primary').first().click();
    await page.locator('#cart-btn').click();
    const drawerItems = page.locator('#cart-items');
    await expect(drawerItems).not.toContainText('empty');
    // Click × to remove
    await drawerItems.locator('button').first().click();
    await expect(page.locator('#cart-count')).not.toBeVisible();
  });
});

// ──────────────────────────────────────────────
// COLLECTION FEATURE SECTION
// ──────────────────────────────────────────────
test.describe('Collection Feature', () => {
  test('collection section has headline', async ({ page }) => {
    await page.goto('/');
    const collection = page.locator('.collection');
    await expect(collection).toBeVisible();
    await expect(collection.locator('h3')).toContainText('legacy');
  });

  test('collection has a CTA button', async ({ page }) => {
    await page.goto('/');
    const collection = page.locator('.collection');
    await expect(collection.locator('.btn-outline')).toBeVisible();
    await expect(collection.locator('.btn-outline')).toContainText('Discover');
  });
});

// ──────────────────────────────────────────────
// FEATURES SECTION
// ──────────────────────────────────────────────
test.describe('Features Section', () => {
  test('features grid has 6 feature cards', async ({ page }) => {
    await page.goto('/');
    const features = page.locator('.feature-card');
    await expect(features).toHaveCount(6);
  });

  test('features include key Rolex attributes', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#about');
    await expect(section).toContainText('In-House Movement');
    await expect(section).toContainText('904L Oystersteel');
    await expect(section).toContainText('Superlative Chronometer');
  });
});

// ──────────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────────
test.describe('Testimonials', () => {
  test('testimonials section has 3 reviews', async ({ page }) => {
    await page.goto('/');
    const testimonials = page.locator('.testimonial-card');
    await expect(testimonials).toHaveCount(3);
  });

  test('each testimonial has star rating and author', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.testimonial-card');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator('.testimonial-stars')).toBeVisible();
      await expect(cards.nth(i).locator('.testimonial-author')).toBeVisible();
    }
  });
});

// ──────────────────────────────────────────────
// CTA SECTION
// ──────────────────────────────────────────────
test.describe('Bottom CTA', () => {
  test('bottom CTA section has a heading and button', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('.cta-section');
    await expect(cta.locator('h2')).toBeVisible();
    await expect(cta.locator('.btn-primary')).toBeVisible();
    await expect(cta.locator('.btn-primary')).toContainText('Shop');
  });
});

// ──────────────────────────────────────────────
// FOOTER
// ──────────────────────────────────────────────
test.describe('Footer', () => {
  test('footer has Rolex brand', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('.footer');
    await expect(footer.locator('.logo')).toBeVisible();
    await expect(footer.locator('.logo')).toContainText('Rolex');
  });

  test('footer has links in multiple columns', async ({ page }) => {
    await page.goto('/');
    const cols = page.locator('.footer-col');
    await expect(cols).toHaveCount(4);
    await expect(cols.nth(0)).toContainText('Shop');
    await expect(cols.nth(1)).toContainText('Company');
    await expect(cols.nth(2)).toContainText('Support');
    await expect(cols.nth(3)).toContainText('Legal');
  });

  test('footer bottom has copyright', async ({ page }) => {
    await page.goto('/');
    const bottom = page.locator('.footer-bottom');
    await expect(bottom).toContainText('2026');
    await expect(bottom).toContainText('Rolex');
  });
});

// ──────────────────────────────────────────────
// ANCHOR LINKS
// ──────────────────────────────────────────────
test.describe('Anchor Links', () => {
  test('Shop Watches CTA scrolls to watches section', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hero .btn-primary').click();
    await page.waitForTimeout(500);
    // The URL should have #watches or we should be scrolled
    const url = page.url();
    expect(url).toContain('#watches');
  });

  test('nav link scrolls to collections', async ({ page }) => {
    await page.goto('/');
    await page.locator('.nav a').nth(1).click();
    await page.waitForTimeout(500);
    expect(page.url()).toContain('#collections');
  });
});

// ──────────────────────────────────────────────
// RESPONSIVE DESIGN
// ──────────────────────────────────────────────
test.describe('Responsive Design', () => {
  test('desktop: 3-column product grid', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.product-card');
    const firstCard = cards.nth(0);
    const thirdCard = cards.nth(2);
    const firstBox = await firstCard.boundingBox();
    const thirdBox = await thirdCard.boundingBox();
    // On desktop, third card should be to the right (3 columns)
    expect(thirdBox!.x).toBeGreaterThan(firstBox!.x);
  });

  test('mobile viewport does not break layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    // Everything should be visible without horizontal scroll
    const body = page.locator('body');
    const box = await body.boundingBox();
    expect(box!.width).toBeLessThanOrEqual(375);
  });
});

// ──────────────────────────────────────────────
// NO EXTERNAL DEPENDENCIES (zero JS frameworks)
// ──────────────────────────────────────────────
test.describe('No External Dependencies', () => {
  test('page loads with zero script src references', async ({ page }) => {
    await page.goto('/');
    const externalScripts = await page.locator('script[src]').count();
    expect(externalScripts).toBe(0);
  });

  test('no CSS framework class patterns detected', async ({ page }) => {
    await page.goto('/');
    // No Bootstrap, Tailwind, or other framework classes
    const content = await page.content();
    expect(content).not.toContain('bootstrap');
    expect(content).not.toContain('tailwind');
  });

  test('only Google Fonts is an external resource', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('link[rel="stylesheet"][href]');
    const count = await links.count();
    // Only Google Fonts CDN should be external
    let externalCSS = 0;
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && !href.includes('fonts.googleapis.com')) {
        externalCSS++;
      }
    }
    expect(externalCSS).toBe(0);
  });
});

// ──────────────────────────────────────────────
// ACCESSIBILITY BASICS
// ──────────────────────────────────────────────
test.describe('Accessibility', () => {
  test('images have alt text (emoji placeholders pass)', async ({ page }) => {
    await page.goto('/');
    // Our page uses emoji icons, not <img> tags, so this is valid
    const imgs = page.locator('img');
    const count = await imgs.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const alt = await imgs.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  test('buttons have accessible labels', async ({ page }) => {
    await page.goto('/');
    const iconBtns = page.locator('.icon-btn');
    const count = await iconBtns.count();
    for (let i = 0; i < count; i++) {
      const hasAria = await iconBtns.nth(i).getAttribute('aria-label');
      const hasText = await iconBtns.nth(i).textContent();
      expect(hasAria || hasText?.trim()).toBeTruthy();
    }
  });
});
