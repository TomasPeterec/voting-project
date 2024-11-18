// UseWidthUpdater.ts
import { RefObject, useEffect } from 'react';

export const UseWidthUpdater = (containerRef: RefObject<HTMLDivElement>, setWidth: (width: number) => void) => {
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    updateWidth(); // Set initial width

    // Cleanup observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, [containerRef, setWidth]);
};
