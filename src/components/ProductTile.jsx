import { Check, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { ProductImage } from "./ProductImage.jsx";

export function ProductTile({
  product,
  headingLevel,
  canAdd,
  justAdded,
  onAdd,
}) {
  const { t, money } = useI18n();
  const Heading = headingLevel;
  const soldOut = !product.cantidad;
  return (
    <article className="product-tile">
      <div className={`product-photo tone-${product.tipo}`}>
        <ProductImage product={product} loading="lazy" />
      </div>
      <div className="product-info">
        <p className="product-category">
          {t.categories[product.tipo] || product.tipo}
        </p>
        <Heading className="product-name">
          {/* Stretched link: the whole tile opens the detail page. */}
          <Link to={`/item/${product.id}`}>{product.nombre}</Link>
        </Heading>
        <p className="product-detail">
          {soldOut ? t.catalog.soldOut : t.catalog.set}
        </p>
        <div className="product-buy">
          <strong>{money(product.precio)}</strong>
          <button
            type="button"
            className="add-button"
            aria-label={t.catalog.addLabel(product.nombre)}
            title={canAdd || soldOut ? undefined : t.catalog.limit}
            disabled={!canAdd}
            onClick={onAdd}
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
