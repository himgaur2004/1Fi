import { useEffect, useState } from "react";
import { fetchProducts } from "../api/client";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchProducts()
      .then((data) => {
        if (cancelled) return;
        setProducts(data || []);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, status };
}
