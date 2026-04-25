# Accessibility Testing Checklist

This document provides comprehensive testing procedures for verifying WCAG 2.1 Level AA compliance.

## Automated Testing Tools

### Run Before Manual Testing

```bash
# Install tools
npm install -g pa11y axe-core

# Run automated audits
pa11y https://blockchainwire.io
axe https://blockchainwire.io
```

## Manual Testing Checklist

### 1. Keyboard Navigation (CRITICAL)

#### Test Procedure:
1. Unplug mouse / use only keyboard
2. Press `Tab` to navigate through page
3. Press `Shift+Tab` to navigate backwards

#### Verify:
- [ ] All interactive elements are reachable via Tab
- [ ] Focus order follows visual layout (left-to-right, top-to-bottom)
- [ ] Skip link appears on first Tab press
- [ ] Pressing `Enter` activates focused elements
- [ ] Mobile menu can be opened with keyboard
- [ ] Mobile menu has focus trap (Tab cycles within menu)
- [ ] `Escape` closes mobile menu and returns focus to toggle
- [ ] Focus indicators visible on all interactive elements
- [ ] Dropdowns can be operated with keyboard
- [ ] Form fields can be filled with keyboard only
- [ ] Forms can be submitted with keyboard (Enter key)

#### Known Issues to Check:
- Floating CTA button accessibility
- Pricing toggle buttons (Crypto/Media)
- Filter buttons in Newsroom
- Partner logo marquee (decorative, should be skipped)

---

### 2. Screen Reader Testing (CRITICAL)

#### Required Tools:
- **Windows:** NVDA (free) or JAWS (paid)
- **Mac:** VoiceOver (built-in)
- **iOS:** VoiceOver (built-in)
- **Android:** TalkBack (built-in)

#### Test with NVDA (Windows):

1. **Page Structure:**
   - Navigate with `H` (headings) and `Shift+H` (previous heading)
   - Verify heading hierarchy (h1 → h2 → h3)
   - Use `B` (buttons) and `Shift+B` (previous button)
   - Use `F` (form fields) and `Shift+F` (previous field)
   - Use `K` (links) and `Shift+K` (previous link)
   - Use `L` (lists) and `Shift+L` (previous list)
   - Use `I` (list items)
   - Use `D` (landmarks)

2. **Verify:**
   - [ ] Skip link is announced on page load
   - [ ] Main content heading is announced after route change
   - [ ] Navigation announces "current page" for active link
   - [ ] Buttons announce their state (pressed/unpressed)
   - [ ] Form fields have labels announced
   - [ ] Required fields are marked with asterisk
   - [ ] Error messages are announced after validation
   - [ ] Mobile menu announces expanded/collapsed state
   - [ ] Toggle buttons announce pressed state
   - [ ] Filter results count announcements (Newsroom)
   - [ ] Pause button states announced (Distribution card)

3. **Form Testing:**
   - [ ] Navigate to form with `F` keys
   - [ ] Fill out First Name field
   - [ ] Verify autocomplete suggestions appear (if applicable)
   - [ ] Submit form and verify error announcements
   - [ ] Fix errors and verify success message

#### Test with VoiceOver (Mac):

1. **Turn on VoiceOver:** `Cmd + F5`

2. **Navigation:**
   - `VO + Right/Left Arrow`: Navigate through elements
   - `VO + Shift + Down`: Interact with element
   - `VO + U`: Read from top
   - `Ctrl + Opt + Cmd + H`: Headings
   - `Ctrl + Opt + Cmd + K`: Links
   - `Ctrl + Opt + Cmd + R`: Buttons

3. **Verify:** Same as NVDA checklist above

---

### 3. Color Contrast Testing (CRITICAL)

#### Tools:
- axe DevTools extension (Chrome/Firefox)
- WAVE browser extension
- Colour Contrast Analyser (Chrome extension)

#### Test Procedure:

1. **Install axe DevTools:**
   - Chrome: `chrome://extensions/`
   - Search "axe DevTools"

2. **Run Audit:**
   - Open DevTools (F12)
   - Click "axe DevTools" tab
   - Click "Scan ALL of page"

3. **Verify:**
   - [ ] No contrast errors under "Contrast" category
   - [ ] All text meets 4.5:1 ratio (normal text)
   - [ ] All large text (18px+) meets 3:1 ratio
   - [ ] Icons meet 3:1 ratio against background
   - [ ] Focus indicators meet 3:1 ratio

4. **Manual Checks:**
   - [ ] Zoom browser to 200% (Ctrl + Plus)
   - [ ] Verify all text remains readable
   - [ ] No horizontal scroll required
   - [ ] Test with Windows High Contrast Mode

---

### 4. Text Scaling & Zoom (CRITICAL)

#### Test Procedure:

1. **Browser Zoom:**
   - Set zoom to 200% (`Ctrl + Plus` 3x or `Cmd + Plus` 3x)
   - [ ] All text remains readable
   - [ ] No horizontal scroll required (except data tables)
   - [ ] Text wraps instead of overflowing
   - [ ] Images don't overlap text
   - [ ] Containers don't break layout
   - [ ] Buttons remain clickable

2. **Text Size:**
   - Set minimum font size to "Large" in browser settings
   - [ ] All text respects user preferences
   - [ ] No fixed font sizes that don't scale

3. **Check Specific Pages:**
   - [ ] Homepage: Hero text, features, pricing
   - [ ] Forms: All field labels and text
   - [ ] Navigation: Menu items, links
   - [ ] Footer: Links, copyright text

---

### 5. Motion & Animation (IMPORTANT)

#### Test Procedure:

1. **Enable Reduce Motion:**
   - **Windows:** Settings → Ease of Access → Display → Show animations
   - **Mac:** System Preferences → Accessibility → Display → Reduce motion
   - **Linux:** Depends on desktop environment

2. **Verify:**
   - [ ] Partner logo marquee stops moving
   - [ ] Pulse glow animations on buttons stop
   - ] Terminal blinking cursor stops
   - ] Page transition animations disabled
   - ] Distribution card animation pauses
   - ] Smooth scroll disabled
   - ] Hover transitions greatly reduced speed

3. **Pause Controls (if present):**
   - [ ] Distribution card has pause/play button
   - [ ] Button state is announced to screen readers
   - [ ] Button is keyboard accessible
   - [ ] Icon indicates current state (play/pause)

---

### 6. Form Accessibility (CRITICAL)

#### Test Each Form:

1. **Affiliate Form (`/affiliate`):**
   - [ ] All fields have labels (not just placeholders)
   - [ ] Required fields marked with asterisk
   - [ ] Email field has type="email"
   - ] Phone field has type="tel"
   - [ ] Password fields have type="password"
   - [ ] Error messages appear below fields
   - [ ] Errors are associated with aria-describedby
   - [ ] Submit button is keyboard accessible
   - [ ] Form can be completed with keyboard only

2. **Auth Forms (`/auth/signup`, `/auth/login`):**
   - [ ] All fields have labels
   - [ ] Terms checkbox has fieldset/legend
   - [ ] Password confirmation errors clear
   - [ ] Success/error messages accessible

3. **Contact Form (`/company/contact`):**
   - [ ] Name, Email, Company fields labeled
   - [ ] Message field has textarea
   - ] Submit button accessible

#### Validation Testing:
- [ ] Try to submit form with required fields empty
- [ ] Verify error messages appear
- [ ] Verify errors announced by screen reader
- [ ] Fix errors and verify they clear
- [ ] Submit valid form and verify success message

---

### 7. Link & Button Accessibility (CRITICAL)

#### External Links:

- [ ] Links with `target="_blank` have warning
- [ ] Screen reader announces "(opens in new tab)"
- [ ] Visual indicator (icon) present

#### Icon-Only Buttons:

- [ ] All have aria-label or title
- [ ] Label describes button purpose
- [ ] Social media links have descriptive labels
- [ ] Mobile menu toggle has aria-label

#### Button States:

- [ ] Disabled buttons have visual indication (opacity, gray)
- [ ] Disabled buttons don't receive keyboard focus
- [ ] Toggle buttons show pressed state (aria-pressed)

---

### 8. Focus Management (CRITICAL)

#### Test:

- [ ] Focus visible on all interactive elements
- [ ] Focus ring meets 3:1 contrast ratio
- [ ] Focus order follows visual layout
- [ ] No keyboard traps (except mobile menu which should have focus trap)
- [ ] Modal/dialog focus cycles through elements
- [ ] Skip link skips to main content

#### Focus Indicators:

- [ ] Primary buttons have visible focus ring
- [ ] Links have visible focus (underline or ring)
- [ ] Form fields show focus state
- [ ] Custom components have focus-visible styles

---

### 9. Images & Alt Text (IMPORTANT)

#### Test:

1. **Run axe audit:** `axe DevTools → Scan ALL`
2. [ ] Check for "Images" category issues
3. [ ] All meaningful image
