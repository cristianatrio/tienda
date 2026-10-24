import { Sparkles } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { useMotion } from "../motionPreference.jsx";

/** Turns the full motion layer on or off; off keeps calm fades. Starts from the system setting. */
export function MotionSwitch() {
  const { t } = useI18n();
  const { motion, toggleMotion } = useMotion();
  return (
    <button
      type="button"
      className="motion-switch"
      aria-pressed={motion === "full"}
      onClick={toggleMotion}
    >
      <Sparkles aria-hidden="true" size={16} />
      {t.nav.motion}
      <span className="switch-track" aria-hidden="true" />
    </button>
  );
}
