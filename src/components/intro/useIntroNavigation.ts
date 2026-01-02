import { useRef } from "react";
import { introExperienceContent } from "@/consts/introExperience.const";
import { NavigationDirection } from "@/enums/navigation-direction.enum";

type IntroNavigationParams = {
  canGoDown: () => boolean;
  onDown: () => void;
  onUp: () => void;
  onInvalid: () => void;
};

const useIntroNavigation = ({ canGoDown, onDown, onUp, onInvalid }: IntroNavigationParams) => {
  const lastNavRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const canNavigate = () => {
    const now = Date.now();
    if (now - lastNavRef.current < introExperienceContent.navigation.throttleMs) return false;
    lastNavRef.current = now;
    return true;
  };

  const navigate = (direction: NavigationDirection) => {
    if (!canNavigate()) return;
    if (direction === NavigationDirection.Down) {
      if (!canGoDown()) {
        onInvalid();
        return;
      }
      onDown();
      return;
    }
    onUp();
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) < 10) return;
    navigate(event.deltaY > 0 ? NavigationDirection.Down : NavigationDirection.Up);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      navigate(NavigationDirection.Down);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      navigate(NavigationDirection.Up);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startY = touchStartYRef.current;
    if (startY === null) return;
    const endY = event.changedTouches[0]?.clientY ?? startY;
    const delta = startY - endY;
    if (Math.abs(delta) < introExperienceContent.navigation.swipeThreshold) return;
    navigate(delta > 0 ? NavigationDirection.Down : NavigationDirection.Up);
    touchStartYRef.current = null;
  };

  return { handleWheel, handleKeyDown, handleTouchStart, handleTouchEnd };
};

export default useIntroNavigation;
