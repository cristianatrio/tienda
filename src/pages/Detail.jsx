import { ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { availableToAdd } from "../cart.js";
import { Notice } from "../components/Notice.jsx";
import { ProductImage } from "../components/ProductImage.jsx";
import { QuantityStepper } from "../components/QuantityStepper.jsx";
import { TransitionLink } from "../components/TransitionLink.jsx";
import { localizedDescription } from "../data.js";
import { useI18n } from "../i18n.jsx";
import { flyToCart, viewTransitionName } from "../motion.js";
import { usePointerVars } from "../usePointerVars.js";
import { isDemo } from "../services.js";
import { usePageTitle } from "../usePageTitle.js";

export function Detail({ products, add, cart }) {
  const { t, lang, money } = useI18n();
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const pointer = usePointerVars();
  const image = useRef(null);
  usePageTitle(product?.nombre ?? t.product.missingTitle);
  if (!product)
    return (
      <Notice title={t.product.missingTitle}>
        <p>{t.product.missingText}</p>
      </Notice>
    );
  const available = availableToAdd(cart, product);
  return (
    <section className="detail">
      <TransitionLink className="back" to="/">
        <ArrowLeft aria-hidden="true" size={18} />
        {t.product.back}
      </TransitionLink>
      <div className="detail-grid">
        <div
          ref={image}
          className={`detail-image tone-${product.tipo}`}
          style={{ "--vt-name": viewTransitionName(product.id) }}
          {...pointer}
        >
          <ProductImage product={product} />
        </div>
        <div className="detail-copy enter">
          <p className="product-category">
            {t.categories[product.tipo] || product.tipo}
          </p>
          <h1>{product.nombre}</h1>
          <p className="detail-description">
            {localizedDescription(product, lang)}
          </p>
          <strong className="price">{money(product.precio)}</strong>
          <p className="stock">
            {available ? t.product.available(available) : t.product.none}
          </p>
          <div className="buy-row">
            <QuantityStepper
              value={quantity}
              max={available}
              onChange={setQuantity}
              lessLabel={t.product.less}
              moreLabel={t.product.more}
              valueLabel={t.product.quantity}
            />
            <button
              type="button"
              className="button"
              disabled={!available || quantity > available}
              onClick={() => {
                flyToCart(image.current);
                add(id, quantity);
                setAdded(true);
                setQuantity(1);
              }}
            >
              {t.product.add}
            </button>
          </div>
          {added && (
            <p role="status" className="added">
              {t.product.added}{" "}
              <TransitionLink to="/cart">{t.product.viewCart}</TransitionLink>
            </p>
          )}
          <p className="fine">
            {isDemo ? t.product.demoPrice : t.product.livePrice}
          </p>
        </div>
      </div>
    </section>
  );
}
