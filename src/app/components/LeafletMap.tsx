'use client';
import React, { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMapEvents, Polyline, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapStore } from '@/store/mapStore';

// Fix Leaflet default icon in Next.js
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

function haversineDistance(a: L.LatLng, b: L.LatLng): number {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aVal = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  return R * 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
}

function polylineLength(points: L.LatLng[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineDistance(points[i - 1], points[i]);
  }
  return total;
}

function polygonArea(points: L.LatLng[]): number {
  if (points.length < 3) return 0;
  const poly = L.polygon(points);
  // Shoelace formula in lat/lng projected to meters approx
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const xi = points[i].lng * (Math.PI / 180) * 6371000 * Math.cos((points[i].lat * Math.PI) / 180);
    const yi = points[i].lat * (Math.PI / 180) * 6371000;
    const xj = points[j].lng * (Math.PI / 180) * 6371000 * Math.cos((points[j].lat * Math.PI) / 180);
    const yj = points[j].lat * (Math.PI / 180) * 6371000;
    area += xi * yj - xj * yi;
  }
  return Math.abs(area) / 2;
}

interface DrawHandlerProps {
  drawMode: 'line' | 'polygon' | null;
  points: L.LatLng[];
  setPoints: React.Dispatch<React.SetStateAction<L.LatLng[]>>;
  setDrawMode: (m: 'line' | 'polygon' | null) => void;
}

function DrawHandler({ drawMode, points, setPoints, setDrawMode }: DrawHandlerProps) {
  const { setRouteLength, setPolygonArea } = useMapStore();
  const clickCountRef = useRef(0);

  useMapEvents({
    click(e) {
      if (!drawMode) return;
      clickCountRef.current += 1;
      setPoints((prev) => [...prev, e.latlng]);
    },
    dblclick(e) {
      if (!drawMode) return;
      // Remove last point added by the click event that fires before dblclick
      setPoints((prev) => {
        const finalPoints = prev.length > 1 ? prev.slice(0, -1) : prev;
        if (drawMode === 'line') {
          const len = polylineLength(finalPoints);
          setRouteLength(len);
        } else if (drawMode === 'polygon') {
          let area = polygonArea(finalPoints);
          setPolygonArea(area);
        }
        return finalPoints;
      });
      setDrawMode(null);
      clickCountRef.current = 0;
    },
  });

  return null;
}

interface LeafletMapProps {
  drawMode: 'line' | 'polygon' | null;
  setDrawMode: (m: 'line' | 'polygon' | null) => void;
}

export default function LeafletMap({ drawMode, setDrawMode }: LeafletMapProps) {
  const [points, setPoints] = React.useState<L.LatLng[]>([]);

  // Reset points when drawMode changes to a new mode
  useEffect(() => {
    if (drawMode !== null) {
      setPoints([]);
    }
  }, [drawMode]);

  const cursorClass =
    drawMode === 'line' || drawMode === 'polygon' ? 'cursor-crosshair' : 'cursor-grab';

  return (
    <MapContainer
      center={[31.9539, 35.9106]}
      zoom={13}
      className={`w-full h-full ${cursorClass}`}
      doubleClickZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DrawHandler
        drawMode={drawMode}
        points={points}
        setPoints={setPoints}
        setDrawMode={setDrawMode}
      />
      {drawMode === 'line' && points.length >= 2 && (
        <Polyline positions={points} color="#1d4ed8" weight={3} />
      )}
      {drawMode === 'polygon' && points.length >= 2 && (
        <Polygon positions={points} color="#1d4ed8" fillColor="#1d4ed8" fillOpacity={0.15} weight={2} />
      )}
      {/* Finalized line */}
      {drawMode === null && points.length >= 2 && (
        <Polyline positions={points} color="#1d4ed8" weight={3} dashArray="6 4" />
      )}
      {drawMode === null && points.length >= 3 && (
        <Polygon positions={points} color="#1d4ed8" fillColor="#1d4ed8" fillOpacity={0.1} weight={2} dashArray="6 4" />
      )}
    </MapContainer>
  );
}