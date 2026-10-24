import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { categories, money, restoreCart } from "./data.js";
import { isDemo, loadCatalog, placeOrder } from "./services.js";

function ProductImage({ product, ...props }) {
  return product.imagen ? (
    <img
      src={`/images/${product.imagen}`}
      alt={`Pijama ${product.nombre}`}
      {...props}
    />
  ) : (
    <div className="image-placeholder">Imagen no disponible</div>
  );
}
function Notice({ title, children }) {
  return (
    <section className="notice">
      <h1>{title}</h1>
      {children}
      <Link className="button" to="/">
        Explorar la colección
      </Link>
    </section>
  );
}
function Catalog({ products }) {
  const { categoryId, tipo } = useParams();
  const category = categoryId || tipo;
  const [search, setSearch] = useState(""),
    [sort, setSort] = useState("featured");
  const filtered = products
    .filter(
      (p) =>
        (!category || p.tipo === category) &&
        p.nombre
          .toLocaleLowerCase("es")
          .includes(search.toLocaleLowerCase("es")),
    )
    .sort((a, b) =>
      sort === "low"
        ? a.precio - b.precio
        : sort === "high"
          ? b.precio - a.precio
          : a.nombre.localeCompare(b.nombre),
    );
  return (
    <>
      {!category && (
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span aria-hidden="true">✦</span> PARA PEQUEÑOS GRANDES SOÑADORES
            </span>
            <h1>
              El día termina.
              <br />
              La aventura
              <br />
              <em>sigue.</em>
            </h1>
            <p>
              Sus personajes favoritos también se van a dormir. Encontrá el
              pijama para la próxima historia.
            </p>
            <a className="button" href="#coleccion">
              Descubrí los pijamas <span aria-hidden="true">↗</span>
            </a>
            <div className="hero-note">
              <span aria-hidden="true">☾</span> El uniforme oficial de los cinco
              minutitos más.
            </div>
          </div>
          <div className="hero-photo">
            <img
              src="/images/airkids-bedroom.png"
              alt="Una cama con luz cálida, un osito y ropa de descanso azul"
              fetchpriority="high"
              width="1536"
              height="1024"
            />
            <span className="photo-stamp">
              Pequeños
              <br />
              rituales.
              <br />
              <strong>Grandes sueños.</strong>
            </span>
            <span className="scene-note">
              Universo AirKids · imagen de ambiente
            </span>
          </div>
        </section>
      )}
      {!category && (
        <div className="mood-bar" aria-label="La colección">
          <span>PERSONAJES FAVORITOS</span>
          <span aria-hidden="true">✦</span>
          <span>NOCHES CON HISTORIA</span>
          <span aria-hidden="true">✦</span>
          <span>DOMINGOS EN PIJAMA</span>
        </div>
      )}{" "}
      <section id="coleccion" className="collection">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EL CLUB DEL PIJAMA</span>
            <h1>
              {category
                ? categories.find((c) => c.id === category)?.name ||
                  "Categoría no encontrada"
                : "Elegí su próxima aventura"}
            </h1>
          </div>
          <span>{filtered.length} diseños</span>
        </div>
        <div className="filters">
          <div className="chips">
            <NavLink end to="/">
              Todos
            </NavLink>
            {categories.map((c) => (
              <NavLink key={c.id} to={`/categories/${c.id}`}>
                {c.name}
              </NavLink>
            ))}
          </div>
          <div className="search-sort">
            <label>
              Buscar
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tu personaje favorito"
              />
            </label>
            <label>
              Ordenar
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="featured">Nombre</option>
                <option value="low">Menor precio</option>
                <option value="high">Mayor precio</option>
              </select>
            </label>
          </div>
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <article className="product-card" key={p.id}>
                <Link
                  to={`/item/${p.id}`}
                  className={`product-photo tone-${p.tipo}`}
                >
                  <ProductImage product={p} loading="lazy" />
                  <span>
                    {categories.find((c) => c.id === p.tipo)?.name || p.tipo}
                  </span>
                </Link>
                <div className="product-meta">
                  <div>
                    <h2>
                      <Link to={`/item/${p.id}`}>{p.nombre}</Link>
                    </h2>
                    <p>{p.cantidad ? "Conjunto de dos piezas" : "Sin stock"}</p>
                  </div>
                  <strong>{money(p.precio)}</strong>
                </div>
                <Link className="card-action" to={`/item/${p.id}`}>
                  Ver pijama <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty" role="status">
            No encontramos productos. Probá otra búsqueda o categoría.
          </p>
        )}
      </section>
      <section className="story-strip">
        <span aria-hidden="true">☾</span>
        <div>
          <h2>Menos pantallas. Más historias.</h2>
          <p>
            Un cuento más, un abrazo largo y ese pijama que no se quiere sacar.
          </p>
        </div>
        <Link to="/nosotros">Conocé el proyecto →</Link>
      </section>
    </>
  );
}
function Detail({ products, add, cart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  if (!product)
    return (
      <Notice title="Este producto no existe">
        <p>Volvé a la colección para encontrar otro favorito.</p>
      </Notice>
    );
  const available = Math.max(
    0,
    Math.min(99, product.cantidad) -
      (cart.find((x) => x.id === id)?.quantity || 0),
  );
  return (
    <section className="detail">
      <Link className="back" to="/">
        ← Volver a la colección
      </Link>
      <div className="detail-grid">
        <div className="detail-image">
          <ProductImage product={product} />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {categories.find((c) => c.id === product.tipo)?.name}
          </span>
          <h1>{product.nombre}</h1>
          <p>{product.descripcion}</p>
          <strong className="price">{money(product.precio)}</strong>
          <p>
            {available
              ? `${available} unidades disponibles`
              : "No quedan unidades disponibles para agregar"}
          </p>
          <div className="quantity">
            <button
              aria-label="Restar una unidad"
              disabled={quantity <= 1}
              onClick={() => setQuantity((q) => q - 1)}
            >
              −
            </button>
            <output aria-label="Cantidad">{quantity}</output>
            <button
              aria-label="Sumar una unidad"
              disabled={quantity >= available}
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <button
            className="button"
            disabled={!available || quantity > available}
            onClick={() => {
              add(id, quantity);
              setAdded(true);
              setQuantity(1);
            }}
          >
            Agregar al carrito
          </button>
          {added && (
            <p role="status">
              Agregado. <Link to="/cart">Ver mi carrito →</Link>
            </p>
          )}
          <p className="fine">
            {isDemo
              ? "Precio ilustrativo del catálogo original. Esta demo no realiza cobros."
              : "El precio y el stock se verifican al confirmar el pedido."}
          </p>
        </div>
      </div>
    </section>
  );
}
export function Checkout({ rows, total, onSuccess }) {
  const [error, setError] = useState(""),
    [sending, setSending] = useState(false);
  const busy = useRef(false),
    requestId = useRef(crypto.randomUUID());
  async function submit(e) {
    e.preventDefault();
    if (busy.current) return;
    const form = new FormData(e.currentTarget),
      buyer = Object.fromEntries(
        ["nombre", "apellido", "email", "telefono"].map((k) => [
          k,
          String(form.get(k) || "").trim(),
        ]),
      );
    if (
      Object.values(buyer).some((v) => !v) ||
      buyer.email !== String(form.get("confirm") || "").trim()
    ) {
      setError(
        "Completá todos los campos y verificá que los emails coincidan.",
      );
      return;
    }
    busy.current = true;
    setSending(true);
    setError("");
    try {
      const result = await placeOrder(
        buyer,
        rows.map((x) => ({ id: x.id, quantity: x.quantity })),
        requestId.current,
      );
      onSuccess(result.id);
    } catch {
      setError(
        "No pudimos confirmar el pedido. Tu carrito se conserva. Revisá la conexión e intentá nuevamente.",
      );
    } finally {
      busy.current = false;
      setSending(false);
    }
  }
  return (
    <form className="checkout" onSubmit={submit}>
      <span className="eyebrow">ÚLTIMO PASO</span>
      <h2>{isDemo ? "Probá el checkout" : "Datos del comprador"}</h2>
      <p>
        {isDemo
          ? "Usá datos ficticios. No se guardan ni se envían a ningún servidor."
          : "Usamos estos datos únicamente para registrar tu pedido."}
      </p>
      <fieldset disabled={sending}>
        <legend className="sr-only">Datos del comprador</legend>
        {[
          { name: "nombre", label: "Nombre", auto: "given-name" },
          { name: "apellido", label: "Apellido", auto: "family-name" },
          { name: "telefono", label: "Teléfono", type: "tel", auto: "tel" },
          { name: "email", label: "Email", type: "email", auto: "email" },
          {
            name: "confirm",
            label: "Repetir email",
            type: "email",
            auto: "off",
          },
        ].map((f) => (
          <label key={f.name} htmlFor={f.name}>
            {f.label}
            <input
              id={f.name}
              name={f.name}
              type={f.type || "text"}
              autoComplete={f.auto}
              required
              maxLength={f.type === "email" ? 254 : 100}
            />
          </label>
        ))}
        <button
          className="button"
          type="submit"
          disabled={sending || !rows.length}
          aria-busy={sending}
        >
          {sending
            ? "Confirmando…"
            : isDemo
              ? "Simular pedido"
              : "Confirmar pedido"}{" "}
          · {money(total)}
        </button>
      </fieldset>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <p className="fine">No se solicitan tarjetas ni se procesan pagos.</p>
    </form>
  );
}
function Cart({ products, cart, setCart }) {
  const [order, setOrder] = useState("");
  const rows = cart.map((x) => ({
    ...x,
    product: products.find((p) => p.id === x.id),
  }));
  const valid = rows.every(
    (x) => x.product && x.quantity <= x.product.cantidad,
  );
  const total = rows.reduce(
    (sum, x) => sum + (x.product?.precio || 0) * x.quantity,
    0,
  );
  if (order)
    return (
      <Notice title={isDemo ? "¡Demo completada!" : "¡Pedido registrado!"}>
        <p role="status">
          Tu número de pedido: <strong>{order}</strong>
        </p>
        <p>
          {isDemo
            ? "No se realizó ninguna compra ni se guardaron datos personales."
            : "Guardá este número como referencia. No se realizó ningún cobro."}
        </p>
      </Notice>
    );
  if (!cart.length)
    return (
      <Notice title="Tu carrito está esperando una historia">
        <p>Elegí un pijama y empezá tu próximo plan de descanso.</p>
      </Notice>
    );
  return (
    <section className="cart-page">
      <span className="eyebrow">TUS FAVORITOS</span>
      <h1>Mi carrito</h1>
      <div className="cart-layout">
        <div>
          <ul className="cart-list">
            {rows.map((x) => (
              <li key={x.id}>
                {x.product && <ProductImage product={x.product} />}
                <div>
                  <h2>{x.product?.nombre || "Producto no disponible"}</h2>
                  <p>
                    {x.quantity} × {money(x.product?.precio || 0)}
                  </p>
                  <button
                    className="text-button"
                    onClick={() =>
                      setCart((c) => c.filter((row) => row.id !== x.id))
                    }
                    aria-label={`Eliminar ${x.product?.nombre || "producto"}`}
                  >
                    Eliminar
                  </button>
                </div>
                <strong>{money((x.product?.precio || 0) * x.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
          <button className="text-button" onClick={() => setCart([])}>
            Vaciar carrito
          </button>
          <p>
            <Link to="/">← Seguir explorando</Link>
          </p>
        </div>
        {valid ? (
          <Checkout
            rows={rows}
            total={total}
            onSuccess={(id) => {
              setOrder(id);
              setCart([]);
            }}
          />
        ) : (
          <p role="alert">
            El stock cambió. Eliminá los productos no disponibles y volvé a
            agregarlos desde el catálogo.
          </p>
        )}
      </div>
    </section>
  );
}
export default function App() {
  const [state, setState] = useState({ loading: true, products: [] }),
    [attempt, setAttempt] = useState(0),
    [cart, setCart] = useState(() => {
      try {
        return restoreCart(localStorage.getItem("airkids-cart-v1"));
      } catch {
        return [];
      }
    });
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const main = useRef(null),
    firstRoute = useRef(true);
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
  useEffect(() => {
    try {
      localStorage.setItem("airkids-cart-v1", JSON.stringify(cart));
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
  }, [cart]);
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    main.current?.focus();
    window.scrollTo(0, 0);
  }, [location.pathname]);
  function add(id, quantity) {
    setCart((current) => {
      const old = current.find((x) => x.id === id),
        p = state.products.find((x) => x.id === id);
      if (
        !p ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity + (old?.quantity || 0) > Math.min(p.cantidad, 99) ||
        (!old && current.length >= 10)
      )
        return current;
      return old
        ? current.map((x) =>
            x.id === id ? { ...x, quantity: x.quantity + quantity } : x,
          )
        : [...current, { id, quantity }];
    });
  }
  return (
    <>
      <a className="skip" href="#main">
        Saltar al contenido
      </a>
      <div
        className="announcement"
        role="region"
        aria-label="Modo de la tienda"
      >
        {isDemo
          ? "DEMO INTERACTIVA · Sin cobros ni pedidos reales"
          : "AIRKIDS · Elegí tu próximo descanso"}
      </div>
      <header>
        <Link className="brand" to="/" aria-label="AirKids, inicio">
          airkids<span aria-hidden="true">☾</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          Menú
        </button>
        <nav
          id="navigation"
          className={menu ? "open" : ""}
          aria-label="Navegación principal"
        >
          <NavLink onClick={() => setMenu(false)} to="/" end>
            Colección
          </NavLink>
          <NavLink onClick={() => setMenu(false)} to="/nosotros">
            Nuestra historia
          </NavLink>
          <NavLink onClick={() => setMenu(false)} to="/cart">
            Carrito{" "}
            <span className="cart-badge">
              {cart.reduce((sum, x) => sum + x.quantity, 0)}
            </span>
          </NavLink>
        </nav>
      </header>
      <main id="main" tabIndex={-1} ref={main}>
        {state.loading ? (
          <p role="status" className="notice">
            Preparando la colección…
          </p>
        ) : state.error ? (
          <section className="notice">
            <h1>No pudimos cargar la colección</h1>
            <p role="alert">
              Revisá tu conexión o la configuración del catálogo.
            </p>
            <button
              className="button"
              onClick={() => {
                setState({ loading: true, products: [] });
                setAttempt((x) => x + 1);
              }}
            >
              Volver a intentar
            </button>
          </section>
        ) : (
          <Routes>
            <Route path="/" element={<Catalog products={state.products} />} />
            {["/productos", "/categories/:categoryId", "/tipo/:tipo"].map(
              (path) => (
                <Route
                  key={path}
                  path={path}
                  element={<Catalog products={state.products} />}
                />
              ),
            )}
            {["/item/:id", "/producto/:id"].map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <Detail
                    key={location.pathname}
                    products={state.products}
                    add={add}
                    cart={cart}
                  />
                }
              />
            ))}
            {["/cart", "/checkout"].map((path) => (
              <Route
                key={path}
                path={path}
                element={
                  <Cart
                    products={state.products}
                    cart={cart}
                    setCart={setCart}
                  />
                }
              />
            ))}
            <Route
              path="/nosotros"
              element={
                <section className="about">
                  <span className="eyebrow">
                    DE UN PROYECTO A UNA EXPERIENCIA
                  </span>
                  <h1>
                    Hecho para aprender.
                    <br />
                    <em>Diseñado para soñar.</em>
                  </h1>
                  <p>
                    AirKids nació como un proyecto de React para Coderhouse,
                    creado por Cristian Atrio. Una tienda de pijamas que reúne
                    catálogo, categorías, carrito y checkout en una experiencia
                    simple y cuidada.
                  </p>
                  <p>
                    Esta versión conserva los tres diseños del catálogo original
                    y sus precios ilustrativos. El modo demo permite recorrer el
                    flujo completo sin realizar una compra.
                  </p>
                  <a
                    className="button"
                    href="https://github.com/cristianatrio/tienda"
                  >
                    Ver el proyecto en GitHub ↗
                  </a>
                </section>
              }
            />
            <Route
              path="*"
              element={
                <Notice title="Esta página se fue a dormir">
                  <p>No encontramos la dirección que buscabas.</p>
                </Notice>
              }
            />
          </Routes>
        )}
      </main>
      <footer>
        <Link className="brand" to="/">
          airkids<span aria-hidden="true">☾</span>
        </Link>
        <p>Pequeñas aventuras. Grandes sueños.</p>
        <div>
          <span>Proyecto de Cristian Atrio · React</span>
          <a href="https://github.com/cristianatrio/tienda">
            Código y documentación ↗
          </a>
        </div>
      </footer>
    </>
  );
}

