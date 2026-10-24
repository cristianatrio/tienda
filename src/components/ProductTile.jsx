import { Check, Plus } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "../i18n.jsx";
import { flyToCart, viewTransitionName } from "../motion.js";
import { usePointerVars } from "../usePointerVars.js";
import { useReveal } from "../useReveal.js";
import { ProductImage } from "./ProductImage.jsx";
import { TransitionLink } from "./TransitionLink.jsx";

const COLUMNS = 3;

export function ProductTile({
  product,
  index,
  headingLevel,
  canAdd,
  justAdded,
  onAdd,
}) {
  const { t, money } = useI18n();
  const [ref, visible] = useReveal();
  const pointer = usePointerVars();
  const photo = useRef(null);
  const Heading = headingLevel;
  const soldOut = !product.cantidad;
  const name = viewTransitionName(product.id);
  return (
    <article
      ref={ref}
      className={`product-tile${visible ? " is-visible" : ""}`}
      style={{ "--stagger": index % COLUMNS, "--tile-name": `tile-${name}` }}
      {...pointer}
    >
      <div ref={photo} className={`product-photo tone-${product.tipo}`}>
        <ProductImage product={product} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="product-category">
          {t.categories[product.tipo] || product.tipo}
        </p>
        <Heading className="product-name">
          {/* Stretched link: the whole tile opens the detail page. */}
          <TransitionLink
            to={`/item/${product.id}`}
            // Only the opened tile shares its photo with the detail page.
            onStart={() => photo.current?.style.setProperty("--vt-name", name)}
          >
            {product.nombre}
          </TransitionLink>
        </Heading>
        <p className="product-detail">
          {soldOut ? t.catalog.soldOut : t.catalog.set}
        </p>
        <div className="product-buy">
          <strong>{money(product.precio)}</strong>
          <button
            type="button"
            className={`add-button${justAdded ? " is-added" : ""}`}
            aria-label={t.catalog.addLabel(product.nombre)}
            title={canAdd || soldOut ? undefined : t.catalog.limit}
            disabled={!canAdd}
            onClick={() => {
              flyToCart(photo.current);
              onAdd();
            }}
          >
            {justAdded ? (
              <Check aria-hidden="true" size={16} />
            ) : (
              <Plus aria-hidden="true" size={16} />
            )}
            <span aria-hidden="true">
              {justAdded ? t.catalog.added : t.catalog.add}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
