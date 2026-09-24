import { useSyncExternalStore } from "react";
import type { Booking } from "./catalog";

let bookings: Booking[] = [];
const listeners = new Set<() => void>();
const EMPTY: Booking[] = [];

export function addBooking(booking: Booking) {
  bookings = [booking, ...bookings];
  listeners.forEach((l) => l());
}

export function useBookings(): Booking[] {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => bookings,
    () => EMPTY,
  );
}
