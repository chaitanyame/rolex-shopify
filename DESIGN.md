---
version: alpha
name: Shopify Rolex
description: Shopify-inspired e-commerce design for luxury Rolex watches.
colors:
  primary: "#121212"
  secondary: "#555555"
  accent: "#127358"
  accentHover: "#0a5c46"
  neutral: "#fafafa"
  surface: "#ffffff"
  muted: "#6b7177"
  border: "#e0e0e0"
typography:
  display:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  h1:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 500
    lineHeight: 1.3
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.05em"
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  pill: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  xxl: 120px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: 14px 32px
  button-primary-hover:
    backgroundColor: "{colors.accentHover}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 14px 32px
  card-product:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
  badge:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
    padding: 4px 10px
---

## Overview

Shopify-inspired luxury e-commerce design for Rolex watches. Clean, product-forward layout with generous whitespace, dark typography, and a restrained green accent (`#127358`) drawn from Shopify's brand identity. Every element serves the product — the watch is the hero.

## Colors

- **Primary (#121212):** Near-black for headings and body text. Authoritative and premium.
- **Secondary (#555555):** Muted dark gray for secondary text and metadata.
- **Accent (#127358):** Shopify green — reserved for CTAs, links, and interactive elements.
- **Accent Hover (#0a5c46):** Darker green for hover states on primary buttons.
- **Neutral (#fafafa):** Off-white page background. Warm enough to avoid clinical sterility.
- **Surface (#ffffff):** Pure white for cards and content panels.
- **Muted (#6b7177):** Gray for tertiary text, footer links, and subtle labels.
- **Border (#e0e0e0):** Light gray for dividers and card outlines.

## Typography

Inter for everything. Display headlines at 600 weight with tight tracking; body at 400 with comfortable line-height. Uppercase captions at 500 weight with 0.05em tracking for labels and badges.

## Components

`button-primary` is the only high-emphasis action element — Shopify green pill button. `button-outline` for secondary actions. Product cards use white surface with subtle hover lift. The badge component (dark background, white text) labels collections.

## Do's and Don'ts

- Do use generous whitespace — luxury products need room to breathe
- Do use Inter at weight 600 for headlines, 400 for body
- Do reserve Shopify green exclusively for CTAs and interactive elements
- Do use pill-shaped buttons (9999px radius) for all CTAs
- Don't use multiple accent colors — one green does everything
- Don't overcrowd — maximum 3 products per row on desktop
- Don't use heavy shadows — subtle box-shadow only on hover
