'use client';
import React, { useState, useEffect } from 'react';
import { CostItem } from './QuantityCostClient';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
  onUpdate: (item: CostItem) => void;
}

export default function SidewalksSection({ inputMode, mapLength, onUpdate }: Props) {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('1.5');
  const [unitPriceSidewalk, setUnitPriceSidewalk] = useState<string>('35');
  const [unitPricePaint, setUnitPricePaint] = useState<string>('8');

  useEffect(() => {
    if (inputMode === 'map' && mapLength !== null) {
      setLength(mapLength.toFixed(2));
    }
  }, [inputMode, mapLength]);

  const L = parseFloat(length);
  const W = parseFloat(width);
  const UPS = parseFloat(unitPriceSidewalk);
  const UPP = parseFloat(unitPricePaint);

  const area = !isNaN(L) && !isNaN(W) ? L * W : null;
  const sidewalkCost = area !== null && !isNaN(UPS) ? area * UPS : null;
  const paintCost = area !== null && !isNaN(UPP) ? area * UPP : null;

  useEffect(() => {
    if (sidewalkCost !== null) {
      onUpdate({ id: 'sidewalks', name: 'الأرصفة', quantity: area!, unit: 'م²', unitPrice: UPS, total: sidewalkCost });
    }
    if (paintCost !== null) {
      onUpdate({ id: 'paint', name: 'الدهانات والتخطيط', quantity: area!, unit: 'م²', unitPrice: UPP, total: paintCost });
    }
  }, [sidewalkCost, paintCost]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        🚶 الأرصفة والدهانات (Sidewalks & Paint)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">الطول (م)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" placeholder="الطول" min="0" />
          {inputMode === 'map' && mapLength !== null && <p className="helper-text text-green-700">✓ من الخريطة</p>}
        </div>
        <div>
          <label className="label-text">عرض الرصيف (م)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" placeholder="مثال: 1.5" min="0" step="0.1" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label-text">سعر الرصيف (دينار/م²)</label>
            <input type="number" value={unitPriceSidewalk} onChange={(e) => setUnitPriceSidewalk(e.target.value)} className="input-field" min="0" />
          </div>
          <div>
            <label className="label-text">سعر الدهان (دينار/م²)</label>
            <input type="number" value={unitPricePaint} onChange={(e) => setUnitPricePaint(e.target.value)} className="input-field" min="0" />
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">المساحة</span>
          <span className="result-value text-base">{area !== null ? `${area.toFixed(2)} م²` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">تكلفة الأرصفة</span>
          <span className="result-value text-base">{sidewalkCost !== null ? `${sidewalkCost.toFixed(2)} دينار` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">تكلفة الدهانات</span>
          <span className="result-value text-base">{paintCost !== null ? `${paintCost.toFixed(2)} دينار` : '—'}</span>
        </div>
        {area !== null && (
          <p className="text-xs text-muted-foreground">
            المساحة = {length} × {width} = {area.toFixed(2)} م²
          </p>
        )}
      </div>
    </div>
  );
}