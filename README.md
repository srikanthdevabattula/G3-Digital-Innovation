# Product admin

Next.js App Router app against DummyJSON.

## Getting Started

First, run the development server:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Responsive layout

From **360px** phones up, the list does **not** use a cramped table.

- **Below `md` (768px):** each product is a **card** (`ProductCards`). Image, title, price, stock and a checkbox stack so you do not scroll sideways.
- **`md` and up:** a **table** (`ProductTable`) is easier to scan and compare columns.

We chose cards on small screens because a 7-column table is unreadable at 360px.

## Accessibility checks

- Keyboard: Tab through filters, product links, checkboxes, pagination, form fields, gallery thumbnails (they are `<button>`s).
- Visible **focus** ring (`:focus-visible`).
- **Skip to content** link in the layout.
- Form fields have `<label>`s. Errors use `role="alert"` and `aria-describedby`.
- Load/delete errors and success use `aria-live`.
- Confirm/delete dialogs use the browser `confirm` / `alert` (keyboard works there).
- Gallery thumbnails use `aria-pressed` for the active image.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
