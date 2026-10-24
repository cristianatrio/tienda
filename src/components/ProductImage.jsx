import { useI18n } from "../i18n.jsx";

export function ProductImage({ product, ...props }) {
  const { t } = useI18n();
  return product.imagen ? (
    <img
      src={`/images/${product.imagen}`}
      alt={t.product.alt(product.nombre)}
      {...props}
    />
  ) : (
    <div className="image-placeholder">{t.product.noImage}</div>
  );
}
