import { Link } from "react-router-dom";
import { useTransitionClick } from "../useTransitionClick.js";

/** Router link whose navigation plays a View Transition. Pass as={NavLink} for active styles. */
export function TransitionLink({
  as = Link,
  to,
  transition,
  onStart,
  onClick,
  ...props
}) {
  const Component = as;
  const animate = useTransitionClick(to, { type: transition, onStart });
  return (
    <Component
      to={to}
      onClick={(event) => {
        onClick?.(event);
        animate(event);
      }}
      {...props}
    />
  );
}
