# Addis Eats

A routed restaurant menu and ordering app built with React, Vite, and React Router. It fetches a live menu from a backend, lets customers browse by category, view a dish's own page, add dishes to a shared cart, and reach a guarded checkout screen.

Progress so far:

- **Day 1:** Vite + React setup, JSX, `Header` and `Dish` components, list rendering with `map` and keys
- **Day 2:** props validation, default props, conditional rendering, a `children` wrapper, filtering and an empty state
- **Day 3:** state, a controlled category filter, a running order total, a validated TeleBirr delivery form
- **Day 4:** fetching the menu from a real API, loading/error states, request cancellation
- **Day 5:** a reusable `useFetch` hook, a cart built on `useReducer`, the cart shared through context, memoized to avoid unnecessary re-renders
- **Day 6:** real routes with `react-router-dom` — a shared layout, a dish detail page, the category filter living in the URL, and a checkout page guarded behind a sign-in stand-in

## What it shows

- A `Layout` (header with a `CartBadge`, page content, footer) shared across every screen via nested routes and `Outlet`
- A `Menu` page that fetches dishes once (via `DishesProvider`, shared with other pages), filters by category, and keeps that filter in the URL's query string
- A `DishDetail` page reached by clicking any dish, reading the dish's id from the URL
- A shared cart (`CartProvider` + `cartReducer`) readable from any component through context, without prop drilling
- A `checkout` route guarded by `RequireAuth`, redirecting to `/signin` if the user isn't "signed in," and returning them to their original destination after they are
- A controlled `OrderForm` with a validated TeleBirr phone number

## Tech

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [prop-types](https://www.npmjs.com/package/prop-types)

## How to run it

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd addis-eats
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal (usually http://localhost:5173).

## Routes

| Path | Shows | Notes |
|---|---|---|
| `/` | `Menu` | Index route inside `Layout` |
| `/?category=Main` | `Menu`, filtered | Category lives in the URL via `useSearchParams` |
| `/menu/:id` | `DishDetail` | `id` is a string like `menu-1`, read via `useParams` |
| `/signin` | `SignIn` | Sets a placeholder "signed in" flag |
| `/checkout` | `Checkout` | Guarded by `RequireAuth`; redirects to `/signin` if not signed in |
| `*` | `NotFound` | Catch-all for anything else |

## Project structure

```
addis-eats/
├── README.md
├── index.html
├── package.json
└── src/
    ├── main.jsx              # entry point: BrowserRouter > DishesProvider > CartProvider > App
    ├── App.jsx                # the route table
    ├── Layout/
    │   └── Layout.jsx         # Header, Outlet, Footer — rendered once, shared by every page
    ├── hooks/
    │   └── useFetch.js        # reusable fetch hook: data, loading, error, abort
    ├── dishes/
    │   └── DishesProvider.jsx # fetches the menu once, shares it via context (Menu + DishDetail)
    ├── cart/
    │   ├── cartReducer.js     # pure reducer: add, remove, clear
    │   └── CartProvider.jsx   # useReducer + context, exposes items/dispatch/total
    ├── Api/
    │   └── api.js             # loadDish: fetches and reshapes the menu
    ├── auth/
    │   └── RequireAuth.jsx    # guard component for protected routes
    ├── SignIn/
    │   └── SignIn.jsx         # placeholder sign-in, sets localStorage flag
    ├── Checkout/
    │   └── Checkout.jsx       # placeholder checkout screen
    ├── DishDetail/
    │   └── DishDetail.jsx     # single dish page, reads :id from the URL
    ├── NotFound/
    │   └── NotFound.jsx       # catch-all page
    ├── Header/
    │   └── Header.jsx         # restaurant name + CartBadge
    ├── Menu/
    │   └── Menu.jsx           # reads dishes from context, filters by category (in the URL)
    ├── CategoryBar/
    │   └── CategoryBar.jsx    # stateless category chips
    ├── OrderForm/
    │   └── OrderForm.jsx      # controlled delivery form with TeleBirr validation
    ├── Card/
    │   └── Card.jsx           # wrapper that renders children
    └── Dish/
        └── Dish.jsx           # name, price, currency, spice badge, add-to-cart, links to its detail page
```

## Data shape

Each dish from the backend looks like this — note `id` is a **string**, not a number:

```js
{
  id: "menu-1",
  slug: "kitfo",
  nameEn: "Kitfo",
  nameAm: "ክትፎ",
  category: "Main",
  priceETB: 300,
  spiceLevel: 2,
  isFasting: false,
  isSpecial: true,
  description: "...",
  ingredients: ["..."]
}
```

Each cart item is a dish plus a `quantity`, tracked by `cartReducer`.

## What I learned

- Nested routes and `Outlet`, and the difference between an `index` route and a sibling route
- `useParams` for reading a dynamic URL segment, and why it's always a string
- `useSearchParams` for state that should live in the URL and survive refresh/navigation
- Sharing fetched data across sibling routes with its own context, separate from the cart's context
- `Navigate`, `useLocation` and `useNavigate` for guarding a route and returning the user to where they meant to go
- Never assume a field's type — log it and check, the way `spiceLevel` and this project's dish `id`s both turned out different from what was assumed
- Debugging habit: when something is silently broken, check that a value is read from the exact same key/name it was written to (a `localStorage` key, a dispatched action's field, a prop name)

## Known open items

- `Menu`'s loading/error/empty states still replace the whole screen instead of just the list area (a `DishList` extraction would fix this, keeping the category bar and order form mounted)
- Dish image path and `spiceLevel`'s exact real-world values are still unconfirmed against the live backend

## Next

Day 7 moves the cart into a Zustand store, replacing the reducer/context pair with narrow selectors.
