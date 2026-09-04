import { useEffect, useState } from "react";
import { fetchProductBySlug } from "../api/client";

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchProductBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus("notfound");
        } else {
          setProduct(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { product, status };
}
