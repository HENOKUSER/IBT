# Addis Eats

A restaurant menu built with React and Vite. It shows a header and a list of Ethiopian dishes with their prices in ETB, a "Spicy" badge on hot dishes, and a category filter with an empty state.

Progress so far:

- **Day 1:** Vite + React setup, JSX, `Header` and `Dish` components, list rendering with `map` and keys
- **Day 2:** props validation, default props, conditional rendering, a `children` wrapper, filtering and an empty state

## What it shows

- A `Header` component with the restaurant name
- A `Dish` component with `name`, `price`, `spicy` and `currency` props (default `"ETB"`), validated with PropTypes
- A "Spicy" badge rendered conditionally
- A reusable `Card` wrapper that renders its `children`
- A `Menu` component that filters the dishes by a `category` prop and shows a message when nothing matches
- Every list item has a stable `key` (the dish `id`)

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
    ├── main.jsx          # entry point, renders <App />
    ├── App.jsx           # composes Header + Menu
    ├── Data/
    │   └── data.js       # the menu array: id, name, price, category, spicy
    ├── Header/
    │   └── Header.jsx    # restaurant name
    ├── Menu/
    │   └── Menu.jsx      # filters by category, empty state, maps to Dish
    ├── Card/
    │   └── Card.jsx      # wrapper that renders children
    └── Dish/
        └── Dish.jsx      # name, price, currency, spicy badge + PropTypes
```

## Data shape

Each dish in `data.js` looks like this:

```js
{ id: 1, name: "Shiro Wat", price: 120, category: "Vegetarian", spicy: true }
```

Categories: `Main`, `Vegetarian`, `Breakfast`, `Side`. Passing `"All"` to `Menu` shows every dish.

## What I learned

- How PropTypes catch wrong or missing props, and why the property must be named `propTypes`
- How to set a default prop value with a default parameter
- Conditional rendering with `&&` and why non-boolean values need guarding
- How the `children` prop makes reusable wrapper components
- How `filter` returns a new array without changing the original
- Why the list `key` should be a stable `id`
- Putting logic in the component that owns it (`Menu` filters, `App` composes)

## Next

Day 3 adds state, so the category filter responds to clicks instead of being hard-coded.
