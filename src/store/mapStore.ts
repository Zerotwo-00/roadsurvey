import { create } from 'zustand';

export interface MapState {
  routeLength: number | null;
  polygonArea: number | null;
  setRouteLength: (length: number | null) => void;
  setPolygonArea: (area: number | null) => void;
  transferData: () => { length: number | null; area: number | null };
  transferred: boolean;
  setTransferred: (v: boolean) => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  routeLength: null,
  polygonArea: null,
  transferred: false,
  setRouteLength: (length) => set({ routeLength: length }),
  setPolygonArea: (area) => set({ polygonArea: area }),
  setTransferred: (v) => set({ transferred: v }),
  transferData: () => {
    const { routeLength, polygonArea } = get();
    set({ transferred: true });
    return { length: routeLength, area: polygonArea };
  },
}));