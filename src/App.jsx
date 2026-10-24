import { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Notice } from "./components/Notice.jsx";
import { I18nProvider, useI18n } from "./i18n.jsx";
import { About } from "./pages/About.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Catalog } from "./pages/Catalog.jsx";
import { Detail } from "./pages/Detail.jsx";
import { MotionProvider } from "./motionPreference.jsx";
import { loadCatalog } from "./services.js";
import { ThemeProvider } from "./theme.jsx";
import { useCart } from "./useCart.js";

const CATALOG_PATHS = [
  "/",
  "/productos",
  "/categories/:categoryId",
  "/tipo/:tipo",
];
const DETAIL_PATHS = ["/item/:id", "/producto/:id"];
const CART_PATHS = ["/cart", "/checkout"];

function useCatalog() {
  const [state, setState] = useState({ loading: true, products: [] });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    loadCatalog()
      .then((products) => {
        if (active) setState({ products, loading: false });
      })
      .catch(() => {
        if (active) setState({ products: [], loading: false, error: true });
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  const retry = () => {
    setState({ loading: true, products: [] });
    setAttempt((x) => x + 1);
  };
  return [state, retry];
}

/** Moves focus to the main region on navigation so screen readers start at the new page. */
function useRouteFocus() {
  const location = useLocation();
  const main = useRef(null);
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    main.current?.focus();
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return [main, location];
}

function LoadError({ retry }) {
  const { t } = useI18n();
  return (
    <section className="notice">
      <h1>{t.status.errorTitle}</h1>
      <p role="alert">{t.status.errorText}</p>
      <button className="button" onClick={retry}>
        {t.status.retry}
      </button>
    </section>
  );
}

function StoreRoutes({ products, cart, location }) {
  const { t } = useI18n();
  const catalog = (
    <Catalog products={products} cart={cart.cart} add={cart.add} />
  );
  return (
    <Routes>
      {CATALOG_PATHS.map((path) => (
        <Route key={path} path={path} element={catalog} />
      ))}
      {DETAIL_PATHS.map((path) => (
        <Route
          key={path}
          path={path}
          element={
            <Detail
              key={location.pathname}
              products={products}
              add={cart.add}
              cart={cart.cart}
            />
          }
        />
      ))}
      {CART_PATHS.map((path) => (
        <Route
          key={path}
          path={path}
          element={
            <Cart
              products={products}
              cart={cart.cart}
              setQuantity={cart.setQuantity}
              remove={cart.remove}
              clear={cart.clear}
            />
          }
        />
      ))}
      <Route path="/nosotros" element={<About />} />
      <Route
        path="*"
        element={
          <Notice title={t.status.notFoundTitle}>
            <p>{t.status.notFoundText}</p>
          </Notice>
        }
      />
    </Routes>
  );
}

function Store() {
  const { t } = useI18n();
  const [catalog, retry] = useCatalog();
  const cart = useCart(catalog.products);
  const [main, location] = useRouteFocus();
  return (
    <>
      <Header cartCount={cart.count} />
      <main id="main" tabIndex={-1} ref={main}>
        {catalog.loading ? (
          <p role="status" className="notice">
            {t.status.loading}
          </p>
        ) : catalog.error ? (
          <LoadError retry={retry} />
        ) : (
          <StoreRoutes
            products={catalog.products}
            cart={cart}
            location={location}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <MotionProvider>
          <Store />
        </MotionProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
