# Addis Eats

A restaurant menu and ordering app built with React and Vite. It fetches a live menu from a backend, lets customers filter by category, add dishes to a shared cart, and fill in a TeleBirr delivery form.

Progress so far:

- **Day 1:** Vite + React setup, JSX, `Header` and `Dish` components, list rendering with `map` and keys
- **Day 2:** props validation, default props, conditional rendering, a `children` wrapper, filtering and an empty state
- **Day 3:** state, a controlled category filter, a running order total, a validated TeleBirr delivery form
- **Day 4:** fetching the menu from a real API, loading/error states, request cancellation
- **Day 5:** a reusable `useFetch` hook, a cart built on `useReducer`, the cart shared through context, memoized to avoid unnecessary re-renders

## What it shows

- A `Header` with a `CartBadge` that shows the number of items in the cart, read from context
- A `Menu` that fetches dishes from a live backend, filters them by category, and shows loading, error and empty states
- A `Dish` card with name, price, category, spice level and an "Add to cart" button
- A shared cart (`CartProvider` + `cartReducer`) that any component can read or dispatch to, without passing props down manually
- A controlled `OrderForm` with a validated TeleBirr phone number

## Tech

- [React](https://react.dev/)
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

## Project structure

```
addis-eats/
├── README.md
├── index.html
├── package.json
└── src/
    ├── main.jsx             # entry point, wraps App in CartProvider
    ├── App.jsx              # composes Header + Menu
    ├── hooks/
    │   └── useFetch.js      # reusable fetch hook: data, loading, error, abort
    ├── cart/
    │   ├── cartReducer.js   # pure reducer: add, remove, clear
    │   └── CartProvider.jsx # useReducer + context, exposes items/dispatch/total
    ├── Api/
    │   └── api.js           # loadDish: fetches and reshapes the menu
    ├── Header/
    │   └── Header.jsx       # restaurant name + CartBadge
    ├── Menu/
    │   └── Menu.jsx         # fetches dishes, filters by category, renders the list
    ├── CategoryBar/
    │   └── CategoryBar.jsx  # stateless category chips
    ├── OrderForm/
    │   └── OrderForm.jsx    # controlled delivery form with TeleBirr validation
    ├── Card/
    │   └── Card.jsx         # wrapper that renders children
    └── Dish/
        └── Dish.jsx         # name, price, currency, spice badge, add-to-cart
```

## Data shape

Each dish from the backend looks like this:

```js
{
  id: 1,
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

- How PropTypes catch wrong or missing props
- Conditional rendering with `&&`, and why non-boolean values need guarding
- The `children` prop for reusable wrapper components
- Lifting state up when two components need the same data
- Controlled inputs, and updating one field of a state object without losing the others
- Fetching with `useEffect`, handling loading and error states, and cancelling stale requests with `AbortController`
- Extracting fetch logic into a reusable custom hook
- Writing a pure reducer and testing it with plain objects before touching React
- Sharing state through context so components that aren't parent and child can read the same data
- Memoizing a context value with `useMemo` so unrelated re-renders don't cascade to every consumer
- Debugging habit: when something silently doesn't work, check that both ends of a handoff (a dispatched action and a reducer case, a passed prop and a received prop) use the exact same names and shapes

## Next

Day 6 adds routing: real pages for the menu, a dish detail view, and a checkout screen guarded behind sign-in.
