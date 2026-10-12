"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { ItemCarrito, Producto } from "@/lib/types";
import { costoEnvio, ivaIncluido } from "@/lib/mexico";

const STORAGE_KEY = "tienda-mexicana-carrito";

interface CarritoState {
  items: ItemCarrito[];
}

type Accion =
  | { type: "AGREGAR"; producto: Producto; cantidad: number }
  | { type: "QUITAR"; productoId: string }
  | { type: "ACTUALIZAR_CANTIDAD"; productoId: string; cantidad: number }
  | { type: "VACIAR" }
  | { type: "HIDRATAR"; items: ItemCarrito[] };

function reducer(state: CarritoState, accion: Accion): CarritoState {
  switch (accion.type) {
    case "AGREGAR": {
      const existente = state.items.find(
        (i) => i.producto.id === accion.producto.id,
      );
      if (existente) {
        return {
          items: state.items.map((i) =>
            i.producto.id === accion.producto.id
              ? {
                  ...i,
                  cantidad: Math.min(
                    i.cantidad + accion.cantidad,
                    accion.producto.stock,
                  ),
                }
              : i,
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { producto: accion.producto, cantidad: accion.cantidad },
        ],
      };
    }
    case "QUITAR":
      return {
        items: state.items.filter((i) => i.producto.id !== accion.productoId),
      };
    case "ACTUALIZAR_CANTIDAD":
      return {
        items: state.items
          .map((i) =>
            i.producto.id === accion.productoId
              ? { ...i, cantidad: accion.cantidad }
              : i,
          )
          .filter((i) => i.cantidad > 0),
      };
    case "VACIAR":
      return { items: [] };
    case "HIDRATAR":
      return { items: accion.items };
    default:
      return state;
  }
}

interface CarritoContextValue {
  items: ItemCarrito[];
  totalItems: number;
  subtotal: number;
  iva: number;
  envio: number;
  total: number;
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  vaciar: () => void;
}

const CarritoContext = createContext<CarritoContextValue | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hidratar desde localStorage al montar.
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        dispatch({ type: "HIDRATAR", items: JSON.parse(guardado) });
      }
    } catch {
      // Ignorar errores de parseo.
    }
  }, []);

  // Persistir en localStorage ante cambios.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo<CarritoContextValue>(() => {
    const subtotal = state.items.reduce(
      (acc, i) => acc + i.producto.precio * i.cantidad,
      0,
    );
    const iva = state.items.reduce(
      (acc, i) => acc + ivaIncluido(i.producto.precio) * i.cantidad,
      0,
    );
    const envio = costoEnvio(subtotal);
    const totalItems = state.items.reduce((acc, i) => acc + i.cantidad, 0);

    return {
      items: state.items,
      totalItems,
      subtotal,
      iva,
      envio,
      // El precio ya incluye IVA, por eso el total es subtotal + envío.
      total: subtotal + envio,
      agregar: (producto, cantidad = 1) =>
        dispatch({ type: "AGREGAR", producto, cantidad }),
      quitar: (productoId) => dispatch({ type: "QUITAR", productoId }),
      actualizarCantidad: (productoId, cantidad) =>
        dispatch({ type: "ACTUALIZAR_CANTIDAD", productoId, cantidad }),
      vaciar: () => dispatch({ type: "VACIAR" }),
    };
  }, [state.items]);

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito(): CarritoContextValue {
  const ctx = useContext(CarritoContext);
  if (!ctx) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return ctx;
}
