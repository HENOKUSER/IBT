const CURRENCIES_TO_TRACK = ["USD", "EUR", "GBP", "KES", "AED", "CNY"];
const RATES_API_URL = "https://open.er-api.com/v6/latest/USD";
const STORAGE_KEY = "birrwatch_v1";

const state = {
  rates: null,
  ratesStatus: "loading",
  ratesError: "",
  amount: "",
  currency: "USD",
  watchlist: [],
};

const dom = {
  statusDot: document.querySelector("#status-dot"),
  ratesStatus: document.querySelector("#rates-status"),
  amountInput: document.querySelector("#amount"),
  amountError: document.querySelector("#amount-error"),
  currencySelect: document.querySelector("#currency"),
  result: document.querySelector("#result"),
  addBtn: document.querySelector("#add-watchlist"),
  watchlist: document.querySelector("#watchlist"),
};

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return;

    if (
      typeof saved.currency === "string" &&
      CURRENCIES_TO_TRACK.includes(saved.currency)
    ) {
      state.currency = saved.currency;
    }
    if (Array.isArray(saved.watchlist)) {
      state.watchlist = saved.watchlist.filter(function (code) {
        return CURRENCIES_TO_TRACK.includes(code);
      });
    }
  } catch (error) {
    console.warn(
      "Birr Watch: could not read saved data, starting fresh.",
      error,
    );
  }
}

function persistState() {
  const toSave = { currency: state.currency, watchlist: state.watchlist };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.warn("Birr Watch: could not save data.", error);
  }
}

function validateAmount(rawValue) {
  if (rawValue.trim() === "") {
    return { valid: false, empty: true, message: "Enter an amount in ETB." };
  }
  const value = Number(rawValue);
  if (Number.isNaN(value)) {
    return {
      valid: false,
      empty: false,
      message: "That doesn't look like a number.",
    };
  }
  if (value <= 0) {
    return {
      valid: false,
      empty: false,
      message: "Amount must be greater than zero.",
    };
  }
  return { valid: true, value: value };
}

function setState(updates) {
  Object.assign(state, updates);
  render();
}

async function fetchRates() {
  try {
    const response = await fetch(RATES_API_URL);
    if (!response.ok) {
      throw new Error("Server responded with " + response.status);
    }

    const data = await response.json();
    const etbPerUsd = data.rates && data.rates.ETB;
    if (!etbPerUsd) {
      throw new Error("ETB rate missing from the API response.");
    }

    const rates = {};
    CURRENCIES_TO_TRACK.forEach(function (code) {
      if (data.rates[code] == null) return;
      rates[code] = data.rates[code] / etbPerUsd;
    });

    setState({ rates: rates, ratesStatus: "ready", ratesError: "" });
  } catch (error) {
    console.warn("Birr Watch: could not load exchange rates.", error);
    setState({
      ratesStatus: "error",
      ratesError:
        "Could not load rates. Check your connection and try reloading.",
    });
  }
}

function render() {
  renderRatesStatus();
  renderCurrencyOptions();
  renderConversion();
  renderAddButton();
  renderWatchlist();
}

function renderRatesStatus() {
  dom.statusDot.className = "status-dot status-dot--" + state.ratesStatus;

  if (state.ratesStatus === "loading") {
    dom.ratesStatus.textContent = "Loading live rates\u2026";
  } else if (state.ratesStatus === "error") {
    dom.ratesStatus.textContent = state.ratesError;
  } else {
    dom.ratesStatus.textContent = "Rates are live.";
  }
}

function renderCurrencyOptions() {
  dom.currencySelect.innerHTML = CURRENCIES_TO_TRACK.map(function (code) {
    return '<option value="' + code + '">' + code + "</option>";
  }).join("");
  dom.currencySelect.value = state.currency;
}

function renderConversion() {
  const check = validateAmount(state.amount);

  if (!check.valid) {
    dom.amountError.textContent = check.empty ? "" : check.message;
    dom.result.textContent = "\u2014";
    return;
  }

  dom.amountError.textContent = "";

  if (state.ratesStatus !== "ready") {
    dom.result.textContent = "Waiting for live rates\u2026";
    return;
  }

  const rate = state.rates[state.currency];
  const converted = check.value * rate;
  dom.result.textContent =
    check.value.toFixed(2) +
    " ETB = " +
    converted.toFixed(2) +
    " " +
    state.currency;
}

function renderAddButton() {
  const alreadyAdded = state.watchlist.includes(state.currency);
  dom.addBtn.disabled = alreadyAdded;
  dom.addBtn.textContent = alreadyAdded
    ? state.currency + " is on your watchlist"
    : "Add " + state.currency + " to Watchlist";
}

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    dom.watchlist.innerHTML =
      '<li class="watchlist__empty">Your watchlist is empty. Add a currency above to start tracking it.</li>';
    return;
  }

  dom.watchlist.innerHTML = state.watchlist
    .map(function (code) {
      const hasRate =
        state.ratesStatus === "ready" && state.rates[code] != null;
      const rateText = hasRate
        ? "1 ETB = " + state.rates[code].toFixed(4) + " " + code
        : "rate unavailable";

      return (
        '<li class="watchlist__item">' +
        '<span class="watchlist__code">' +
        code +
        "</span>" +
        '<span class="watchlist__rate">' +
        rateText +
        "</span>" +
        '<button type="button" class="watchlist__remove" data-code="' +
        code +
        '" aria-label="Remove ' +
        code +
        ' from watchlist">Remove</button>' +
        "</li>"
      );
    })
    .join("");
}

function attachEvents() {
  dom.amountInput.addEventListener("input", function (event) {
    setState({ amount: event.target.value });
  });

  dom.currencySelect.addEventListener("change", function (event) {
    setState({ currency: event.target.value });
    persistState();
  });

  dom.addBtn.addEventListener("click", function () {
    if (state.watchlist.includes(state.currency)) return; // no duplicates
    setState({ watchlist: state.watchlist.concat([state.currency]) });
    persistState();
  });

  // Event delegation: the list is rebuilt on every render, so we listen on
  // the parent (which always exists) rather than on each button.
  dom.watchlist.addEventListener("click", function (event) {
    const button = event.target.closest(".watchlist__remove");
    if (!button) return;
    const code = button.dataset.code;
    setState({
      watchlist: state.watchlist.filter(function (c) {
        return c !== code;
      }),
    });
    persistState();
  });
}

function init() {
  loadSavedState();
  attachEvents();
  render();
  fetchRates();
}

init();
