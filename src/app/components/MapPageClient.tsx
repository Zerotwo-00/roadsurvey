'use client';
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useMapStore } from '@/store/mapStore';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export default function MapPageClient() {
  const { routeLength, polygonArea, transferred, transferData, setTransferred } = useMapStore();
  const [mode, setMode] = useState<'line' | 'polygon' | null>(null);
  const [transferDone, setTransferDone] = useState(false);

  const handleTransfer = useCallback(() => {
    transferData();
    setTransferDone(true);
    setTimeout(() => setTransferDone(false), 3000);
  }, [transferData]);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 56px)' }}>
      {/* Toolbar */}
      <div className="bg-card border-b border-border px-4 py-2 flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">أدوات الرسم:</span>
          <button
            onClick={() => setMode(mode === 'line' ? null : 'line')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
              mode === 'line' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:bg-slate-200'
            }`}
          >
            ✏️ رسم خط (قياس المسار)
          </button>
          <button
            onClick={() => setMode(mode === 'polygon' ? null : 'polygon')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border transition-colors ${
              mode === 'polygon' ?'bg-primary text-primary-foreground border-primary' :'bg-muted text-muted-foreground border-border hover:bg-slate-200'
            }`}
          >
            ⬡ رسم مضلع (قياس المساحة)
          </button>
          <button
            onClick={() => {
              setMode(null);
              useMapStore?.getState()?.setRouteLength(null);
              useMapStore?.getState()?.setPolygonArea(null);
              useMapStore?.getState()?.setTransferred(false);
            }}
            className="btn-danger"
          >
            🗑 مسح الخريطة
          </button>
        </div>
        <div className="flex items-center gap-3">
          {/* Results inline */}
          <div className="flex items-center gap-3 bg-muted rounded-md px-3 py-1.5">
            <span className="text-xs text-muted-foreground">الطول:</span>
            <span className="text-sm font-bold text-primary tabular-nums">
              {routeLength !== null ? `${routeLength?.toFixed(2)} م` : '—'}
            </span>
            <span className="w-px h-4 bg-border"></span>
            <span className="text-xs text-muted-foreground">المساحة:</span>
            <span className="text-sm font-bold text-primary tabular-nums">
              {polygonArea !== null ? `${polygonArea?.toFixed(2)} م²` : '—'}
            </span>
          </div>
          <button
            onClick={handleTransfer}
            disabled={routeLength === null && polygonArea === null}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              routeLength === null && polygonArea === null
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : transferDone
                ? 'bg-green-600 text-white' :'btn-accent'
            }`}
          >
            {transferDone ? '✓ تم الإرسال' : '📤 إرسال البيانات للتبويبات'}
          </button>
        </div>
      </div>
      {/* Map */}
      <div className="flex-1 relative">
        <LeafletMap drawMode={mode} setDrawMode={setMode} />
      </div>
      {/* Mode hint */}
      {mode && (
        <div className="bg-blue-50 border-t border-blue-200 px-4 py-2 text-sm text-blue-700 text-center">
          {mode === 'line' ?'انقر على الخريطة لإضافة نقاط المسار. انقر مرتين لإنهاء الخط.' :'انقر على الخريطة لرسم المضلع. انقر مرتين لإغلاق المضلع.'}
        </div>
      )}
    </div>
  );
}