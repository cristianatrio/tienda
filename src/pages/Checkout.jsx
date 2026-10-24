import { useRef, useState } from "react";
import { useI18n } from "../i18n.jsx";
import { isDemo, placeOrder } from "../services.js";

const FIELDS = [
  { name: "nombre", auto: "given-name" },
  { name: "apellido", auto: "family-name" },
  { name: "telefono", type: "tel", auto: "tel" },
  { name: "email", type: "email", auto: "email" },
  { name: "confirm", type: "email", auto: "off" },
];
const BUYER_FIELDS = ["nombre", "apellido", "email", "telefono"];

function readBuyer(form) {
  const value = (key) => String(form.get(key) || "").trim();
  const buyer = Object.fromEntries(BUYER_FIELDS.map((k) => [k, value(k)]));
  return { buyer, confirm: value("confirm") };
}

export function Checkout({ rows, total, onSuccess }) {
  const { t, money } = useI18n();
  const [error, setError] = useState("");
  const [mismatch, setMismatch] = useState(false);
  const [sending, setSending] = useState(false);
  const busy = useRef(false);
  const requestId = useRef(crypto.randomUUID());
  async function submit(e) {
    e.preventDefault();
    if (busy.current) return;
    const { buyer, confirm } = readBuyer(new FormData(e.currentTarget));
    const emailsDiffer = Boolean(buyer.email) && buyer.email !== confirm;
    setMismatch(emailsDiffer);
    if (Object.values(buyer).some((v) => !v) || emailsDiffer) {
      setError(t.checkout.invalid);
      return;
    }
    busy.current = true;
    setSending(true);
    setError("");
    try {
      const items = rows.map((x) => ({ id: x.id, quantity: x.quantity }));
      const result = await placeOrder(buyer, items, requestId.current);
      onSuccess(result.id);
    } catch {
      setError(t.checkout.failed);
    } finally {
      busy.current = false;
      setSending(false);
    }
  }
  return (
    <form className="checkout" onSubmit={submit}>
      <h2>{isDemo ? t.checkout.titleDemo : t.checkout.titleLive}</h2>
      <p>{isDemo ? t.checkout.introDemo : t.checkout.introLive}</p>
      <fieldset disabled={sending}>
        <legend className="sr-only">{t.checkout.legend}</legend>
        <div className="field-grid">
          {FIELDS.map((f) => {
            const invalid = f.name === "confirm" && mismatch;
            return (
              <label
                key={f.name}
                htmlFor={f.name}
                className={`field-${f.name}`}
              >
                {t.checkout[f.name]}
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type || "text"}
                  autoComplete={f.auto}
                  required
                  maxLength={f.type === "email" ? 254 : 100}
                  aria-invalid={invalid || undefined}
                  aria-describedby={invalid ? "confirm-error" : undefined}
                  onChange={
                    f.type === "email" ? () => setMismatch(false) : undefined
                  }
                />
                {invalid && (
                  <span id="confirm-error" className="field-error">
                    {t.checkout.mismatch}
                  </span>
                )}
              </label>
            );
          })}
        </div>
        <button
          className="button submit"
          type="submit"
          disabled={sending || !rows.length}
          aria-busy={sending}
        >
          <span>
            {sending
              ? t.checkout.sending
              : isDemo
                ? t.checkout.submitDemo
                : t.checkout.submitLive}
          </span>
          <span>{money(total)}</span>
        </button>
      </fieldset>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <p className="fine">{t.checkout.noPayments}</p>
    </form>
  );
}
