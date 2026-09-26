# Addis Eats

A routed restaurant menu and ordering app built with React, Vite, React Router, and Zustand. It fetches a live menu from a backend, lets customers browse by category, view a dish's own page, add dishes to a cart that survives a refresh, toggle a theme, and reach a guarded checkout screen.

Progress so far:

- **Day 1:** Vite + React setup, JSX, `Header` and `Dish` components, list rendering with `map` and keys
- **Day 2:** props validation, default props, conditional rendering, a `children` wrapper, filtering and an empty state
- **Day 3:** state, a controlled category filter, a running order total, a validated TeleBirr delivery form
- **Day 4:** fetching the menu from a real API, loading/error states, request cancellation
- **Day 5:** a reusable `useFetch` hook, a cart built on `useReducer`, the cart shared through context, memoized to avoid unnecessary re-renders
- **Day 6:** real routes with `react-router-dom` — a shared layout, a dish detail page, the category filter living in the URL, and a checkout page guarded behind a sign-in stand-in
- **Day 7:** the cart moved from Context + reducer into a Zustand store with narrow selectors and persistence; auth and theme each got their own small Provider + hook, following the same shared pattern

## What it shows

- A `Layout` (header with a `CartBadge` and theme toggle, page content, footer) shared across every screen via nested routes and `Outlet`
- A `Menu` page that fetches dishes once (via `DishesProvider`, shared with other pages), filters by category, and keeps that filter in the URL's query string
- A `DishDetail` page reached by clicking any dish, reading the dish's id from the URL
- A cart (`cartStore`, built with Zustand) readable from any component via narrow selectors, persisted to `localStorage` so it survives a refresh
- A `checkout` route guarded by `RequireAuth`, backed by an `AuthProvider` context, redirecting to `/signin` if the user isn't "signed in," and returning them to their original destination after they are
- A `ThemeProvider` with a light/dark toggle in the header
- A controlled `OrderForm` with a validated TeleBirr phone number

## Tech

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
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
| `/signin` | `SignIn` | Sets a placeholder "signed in" flag via `AuthProvider` |
| `/checkout` | `Checkout` | Guarded by `RequireAuth`; redirects to `/signin` if not signed in |
| `*` | `NotFound` | Catch-all for anything else |

## Project structure

```
addis-eats/
├── README.md
├── index.html
├── package.json
└── src/
    ├── main.jsx              # entry point: BrowserRouter > ThemeProvider > AuthProvider > DishesProvider > App
    ├── App.jsx                # the route table
    ├── Layout/
    │   └── Layout.jsx         # Header, Outlet, Footer — rendered once, shared by every page
    ├── hooks/
    │   └── useFetch.js        # reusable fetch hook: data, loading, error, abort
    ├── dishes/
    │   └── DishesProvider.jsx # fetches the menu once, shares it via context (Menu + DishDetail)
    ├── cart/
    │   └── cartStore.js       # Zustand store: items, addItem, remove, clear — persisted to localStorage
    ├── Api/
    │   └── api.js             # loadDish: fetches and reshapes the menu
    ├── auth/
    │   ├── AuthProvider.jsx   # AuthContext + AuthProvider: isSignedIn, signIn, signOut
    │   ├── useAuth.js         # guard hook, throws outside AuthProvider
    │   └── RequireAuth.jsx    # guard component for protected routes
    ├── Theme/
    │   ├── ThemeProvider.jsx  # ThemeContext + ThemeProvider: theme, toggleTheme
    │   └── useTheme.js        # guard hook, throws outside ThemeProvider
    ├── SignIn/
    │   └── SignIn.jsx         # placeholder sign-in, calls signIn() from useAuth
    ├── Checkout/
    │   └── Checkout.jsx       # placeholder checkout screen
    ├── DishDetail/
    │   └── DishDetail.jsx     # single dish page, reads :id from the URL
    ├── NotFound/
    │   └── NotFound.jsx       # catch-all page
    ├── Header/
    │   └── Header.jsx         # restaurant name, theme toggle, CartBadge
    ├── Menu/
    │   └── Menu.jsx           # reads dishes from context, cart via Zustand selectors, filters by category (in the URL)
    ├── CategoryBar/
    │   └── CategoryBar.jsx    # stateless category chips
    ├── OrderForm/
    │   └── OrderForm.jsx      # controlled delivery form with TeleBirr validation
    ├── Card/
    │   └── Card.jsx           # wrapper that renders children
    ├── DishList/
    │   └── DishList.jsx       # renders the dish list or an empty state
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

Each cart item is a dish plus a `quantity`, tracked by `cartStore`.

## What I learned

- Nested routes and `Outlet`, `useParams`, `useSearchParams` for state that should live in the URL
- Sharing fetched data across sibling routes with its own context, separate from the cart's
- The Provider + guard-hook pattern (`XProvider` + `useX`), and why the same shape works for cart, auth, and theme alike
- Why reading a whole context object ties every consumer to every field in it, and how a narrow Zustand selector avoids that
- Calling a store action directly (`addItem(dish)`) versus dispatching a typed action to a reducer — same underlying logic, no matching step needed
- Persisting state to `localStorage` automatically with Zustand's `persist` middleware
- Debugging habit: when an imported name comes back `undefined` or a hook throws "must be used within a Provider," check whether the export is `default` or named, and make sure the import matches exactly

## Known open items

- `Menu`'s loading/error/empty states still replace the whole screen instead of just the list area in a couple of edge cases worth re-checking
- Dish image path and `spiceLevel`'s exact real-world values are still worth double-checking against the live backend
- The DevTools "highlight updates" verification for the Zustand selector re-render reduction is worth re-running whenever convenient

## Next

Day 8 builds out the checkout form properly: four fields in one state object, a pure `validate()` function, errors shown after blur, `aria` wiring for accessibility, a submitting state that can't double-send, and handling a failed request from the server.
