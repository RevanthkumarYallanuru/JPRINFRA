import { useEffect } from "react";
import useScrollAnimations from "@/hooks/useScrollAnimations";

export default function ScrollAnimator() {
  // initialize the hook when this component is mounted
  useScrollAnimations();

  // component renders nothing
  return null;
}
