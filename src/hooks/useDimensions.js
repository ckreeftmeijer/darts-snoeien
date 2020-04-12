import { useState, useCallback, useEffect } from "react";

export default function useDimensions(ref) {
  const [dims, setDims] = useState({
    width: undefined,
    height: undefined
  });

  const isRef = useCallback(() => ref && ref.current && ref.current.offsetWidth, [ref]);
  const getDimensions = useCallback(() => {
    if (isRef()) {
      setDims({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      });
    }
  }, [isRef, ref]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isRef() && !dims.width) {
      setDims({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      });
    }
  });

  useEffect(() => {
    window.addEventListener("resize", getDimensions);
    setTimeout(() => getDimensions(), 1000);
    return () => window.removeEventListener("resize", getDimensions);
  }, [getDimensions, ref]);

  return dims;
}
