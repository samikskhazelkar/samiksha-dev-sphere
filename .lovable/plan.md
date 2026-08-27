# Contact form → your Gmail via EmailJS

Wire the existing contact form to EmailJS so each submission is emailed to your Gmail inbox, instead of opening a mail draft in the visitor's mail app.

## What changes for visitors

- They fill in Name, Email, Subject, Message and press **Send Message**.
- The button shows a "Sending…" state and is disabled while the request runs.
- On success: a confirmation message appears and the form clears.
- On failure: a clear error message with your email address as a fallback.
- Existing validation, design, colors, and layout stay exactly as they are.

## Technical details

- Add the `@emailjs/browser` package.
- In `src/components/portfolio/Contact.tsx`, replace the `mailto:` redirect in `onSubmit` with `emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, { publicKey: PUBLIC_KEY })`.
- IDs used (EmailJS public key is publishable by design, safe in client code):
  - Service ID: `service_axw1vt3`
  - Template ID: `template_4xefvpz`
  - Public key: `ppFrBeNpz8aKUfvOXMIWD`
- Payload fields sent to the template: `name`, `email`, `subject`, `message`, plus `title` and `time` aliases for common EmailJS starter templates.
- Add local component state for `status` (`idle` | `sending` | `sent` | `error`) and render it in the existing `aria-live` region, so screen readers announce the outcome.
- No backend, database, or Cloud services needed.

## After the change

Your EmailJS template must reference the variables `{{name}}`, `{{email}}`, `{{subject}}`, `{{message}}`, and its "To email" must be your Gmail address. If your template uses different variable names, tell me and I'll match them.
