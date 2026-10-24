import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { availableToAdd } from "../cart.js";
import { Hero } from "../components/Hero.jsx";
import { ProductTile } from "../components/ProductTile.jsx";
import { categoryIds } from "../data.js";
import { useI18n } from "../i18n.jsx";
import { usePageTitle } from "../usePageTitle.js";

const ADDED_FEEDBACK_MS = 1600;
const SORTERS = {
  featured: (a, b) => a.nombre.localeCompare(b.nombre),
  low: (a, b) => a.precio - b.precio,
  high: (a, b) => b.precio - a.precio,
};

function useAddedFeedback(add) {
  const [added, setAdded] = useState({ id: "", message: "" });
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function addOne(product, message) {
    add(product.id, 1);
    setAdded({ id: product.id, message });
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setAdded((current) => ({ ...current, id: "" })),
      ADDED_FEEDBACK_MS,
    );
  }
  return [added, addOne];
}

function Filters({ search, setSearch, sort, setSort }) {
  const { t } = useI18n();
  return (
    <div className="filters">
      <nav className="chips" aria-label={t.catalog.filters}>
        <NavLink end to="/">
          {t.catalog.all}
        </NavLink>
        {categoryIds.map((id) => (
          <NavLink key={id} to={`/categories/${id}`}>
            {t.categories[id]}
          </NavLink>
        ))}
      </nav>
      <div className="search-sort">
        <label>
          <span>{t.catalog.search}</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.catalog.searchPlaceholder}
          />
        </label>
        <label>
          <span>{t.catalog.sort}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">{t.catalog.sortName}</option>
            <option value="low">{t.catalog.sortLow}</option>
            <option value="high">{t.catalog.sortHigh}</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export function Catalog({ products, cart, add }) {
  const { t, lang } = useI18n();
  const { categoryId, tipo } = useParams();
  const category = categoryId || tipo;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [added, addOne] = useAddedFeedback(add);
  const query = search.toLocaleLowerCase(lang);
  const filtered = products
    .filter(
      (p) =>
        (!category || p.tipo === category) &&
        p.nombre.toLocaleLowerCase(lang).includes(query),
    )
    .sort(SORTERS[sort]);
  const title = category
    ? t.categories[category] || t.catalog.missingCategory
    : t.catalog.title;
  usePageTitle(category ? title : "");
  const Heading = category ? "h1" : "h2";
  return (
    <>
      {!category && <Hero />}
      <section
        id="coleccion"
        className="collection"
        aria-labelledby="collection-title"
      >
        <div className="section-heading">
          <Heading id="collection-title">{title}</Heading>
          <p className="count" aria-live="polite">
            {t.catalog.count(filtered.length)}
          </p>
        </div>
        <Filters {...{ search, setSearch, sort, setSort }} />
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductTile
                key={p.id}
                product={p}
                headingLevel={category ? "h2" : "h3"}
                canAdd={availableToAdd(cart, p) > 0}
                justAdded={added.id === p.id}
                onAdd={() => addOne(p, t.catalog.addedAnnouncement(p.nombre))}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>{t.catalog.empty}</p>
            {search && (
              <button
                type="button"
                className="button button-quiet"
                onClick={() => setSearch("")}
              >
                {t.catalog.clear}
              </button>
            )}
          </div>
        )}
        <p className="sr-only" role="status">
          {added.message}
        </p>
      </section>
      <section className="story-strip">
        <h2>{t.story.title}</h2>
        <p>{t.story.text}</p>
        <Link to="/nosotros">{t.story.link}</Link>
      </section>
    </>
  );
}
