# Product admin

Junior frontend take-home. Next.js App Router + TypeScript (strict) + Tailwind. Data from [DummyJSON products](https://dummyjson.com/docs/products) via Axios.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 (redirects to `/products`).

## Tests

```bash
npm test
```

Six Jest + React Testing Library tests. I picked **rules**, not CSS snapshots:

1. Form: empty title / extra price decimals block submit  
2. Valid create hits `POST /products/add`  
3. Failed save keeps the fields and shows the error  
4. Stock &lt; 10 is Low; “low stock only” filters **this page** of 10  
5. List error shows Retry  
6. Delete: Cancel does not call the API, Confirm does  

Those are the bits most likely to break if someone refactors.

## DummyJSON

Create, update and delete are **simulated**. The API returns success, but a refresh loads the original catalog. The UI still shows the real response (success or fail).

Search and category together: DummyJSON has no “search in category” URL, so **search wins**.

## Decisions

- **URL state** for search, category, sort, page, and low-stock so refresh / back / share keep the same view.  
- **Low stock only** filters the 10 rows already loaded, not the whole catalog (as the brief asked).  
- **Phone:** cards under 768px. A 7-column table at 360px needs sideways scroll. Desktop stays a table.  
- **Dialogs:** custom in-app modal for delete, save success, and unsaved-leave (Esc / Cancel). Closing the browser tab still uses the native leave warning — the browser does not allow replacing that.  
- **One form** for create (`/products/new`) and edit (`/products/[id]/edit`).  
- List fetch lives in a client component so the spinner/error sit on the **table**, not the whole page.

## Accessibility (what I checked)

- Tab through filters, checkboxes, title links, pagination, form, gallery thumbnails  
- Focus ring is visible  
- Skip to content

## Time (rough)

| Part | Time |
|---|---|
| Setup + API client | ~1h |
| List (filters, URL, pagination, low stock, bulk delete) | ~3h |
| Detail | ~1h |
| Create/edit form | ~1.5h |
| Loading / error / empty + light theme | ~1h |
| Responsive + a11y | ~45m |
| `REVIEW.md` | ~30m |
| Tests | ~1h |
| README | ~20m |
| **Total** | **~10h** |

## AI

Cursor was used to scaffold files, write the first versions of components, tests, and this README. I went through the brief point by point, checked the DummyJSON docs, and changed UI (light theme, delete loader, shorter `REVIEW.md`) as we went.
