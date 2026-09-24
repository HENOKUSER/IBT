# Addis Eats

A static restaurant menu built with React and Vite. It shows a header and a list of Ethiopian dishes with their prices in ETB.

This is Day 1 of the React course: project setup, JSX, components, props, and rendering a list with `map` and keys.

## What it shows

- A `Header` component with the restaurant name
- A reusable `Dish` component that takes `name` and `price` props
- A menu rendered from an array of dishes using `map`, with a `key` on each item

## Tech

- [React](https://react.dev/)
- [Vite](https://vite.dev/)

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
    ├── main.jsx        # entry point, renders <App />
    ├── App.jsx         # composes Header + the list of Dish components
    ├── Header/
    │   └── Header.jsx  # restaurant name
    └── Dish/
        └── Dish.jsx    # reusable card taking name and price props
```

## What I learned

- How to create a project with Vite and run it with `npm run dev`
- How JSX works and how components return it
- How to pass data to a component with props
- How to render a list with `map` and why each item needs a `key`
