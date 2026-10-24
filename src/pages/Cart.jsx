import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MAX_UNITS_PER_LINE } from "../cart.js";
import { Notice } from "../components/Notice.jsx";
import { ProductImage } from "../components/ProductImage.jsx";
import { QuantityStepper } from "../components/QuantityStepper.jsx";
import { useI18n } from "../i18n.jsx";
import { isDemo } from "../services.js";
import { usePageTitle } from "../usePageTitle.js";
import { Checkout } from "./Checkout.jsx";

function CartLine({ row, setQuantity, remove }) {
  const { t, money } = useI18n();
  const { product, quantity } = row;
  const name = product?.nombre || t.cart.unavailable;
  const price = product?.precio || 0;
  return (
    <li>
      <div className={`cart-thumb tone-${product?.tipo || "none"}`}>
        {product && <ProductImage product={product} />}
      </div>
      <div className="cart-line">
        <h2>{name}</h2>
        <p>{t.cart.linePrice(quantity, money(price))}</p>
        <div className="cart-line-actions">
          {product && (
            <QuantityStepper
              compact
              value={quantity}
              max={Math.min(MAX_UNITS_PER_LINE, product.cantidad)}
              onChange={(next) => setQuantity(row.id, next)}
              lessLabel={t.cart.less(name)}
              moreLabel={t.cart.more(name)}
              valueLabel={t.product.quantity}
            />
          )}
          <button
            type="button"
            className="text-button"
            onClick={() => remove(row.id)}
            aria-label={t.cart.removeLabel(name)}
          >
            {t.cart.remove}
          </button>
        </div>
      </div>
      <strong>{money(price * quantity)}</strong>
    </li>
  );
}

function OrderDone({ order }) {
  const { t } = useI18n();
  return (
    <Notice title={isDemo ? t.cart.doneDemo : t.cart.doneLive}>
      <p role="status">
        {t.cart.orderNumber} <strong className="order-id">{order}</strong>
      </p>
      <p>{isDemo ? t.cart.doneDemoText : t.cart.doneLiveText}</p>
    </Notice>
  );
}

export function Cart({ products, cart, setQuantity, remove, clear }) {
  const { t, money } = useI18n();
  const [order, setOrder] = useState("");
  usePageTitle(t.cart.title);
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
  if (order) return <OrderDone order={order} />;
  if (!cart.length)
    return (
      <Notice title={t.cart.emptyTitle}>
        <p>{t.cart.emptyText}</p>
      </Notice>
    );
  return (
    <section className="cart-page">
      <h1>{t.cart.title}</h1>
      <div className="cart-layout">
        <div>
          <ul className="cart-list">
            {rows.map((row) => (
              <CartLine key={row.id} {...{ row, setQuantity, remove }} />
            ))}
          </ul>
          <div className="cart-total">
            <span>{t.cart.total}</span>
            <strong>{money(total)}</strong>
          </div>
          <div className="cart-footer">
            <Link className="back" to="/">
              <ArrowLeft aria-hidden="true" size={18} />
              {t.cart.keepBrowsing}
            </Link>
            <button type="button" className="text-button" onClick={clear}>
              {t.cart.empty}
            </button>
          </div>
        </div>
        {valid ? (
          <Checkout
            rows={rows}
            total={total}
            onSuccess={(id) => {
              setOrder(id);
              clear();
            }}
          />
        ) : (
          <p role="alert" className="stock-alert">
            {t.cart.stockChanged}
          </p>
        )}
      </div>
    </section>
  );
}
