import { useEffect, useState } from "react";
import { visualTokenStreamingSpeed } from "../const/prefs";

export function useTextStream(textToDisplay: string, enabled: boolean) {
  const [displayedText, setDisplayedText] = useState(
    enabled ? "" : textToDisplay,
  );
  useEffect(() => {
    if (!enabled) {
      setDisplayedText(textToDisplay);
      return;
    }

    setDisplayedText("");
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < textToDisplay.length) {
        setDisplayedText(textToDisplay.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, visualTokenStreamingSpeed);
    return () => clearInterval(interval);
  }, [enabled, textToDisplay]);
  return {
    displayText: displayedText,
    done: displayedText === textToDisplay,
  };
}
