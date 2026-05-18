'use client';
import React, { useState, useEffect } from 'react';
import { CostItem } from './QuantityCostClient';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
  onUpdate: (item: CostItem) => void;
}

export default function AsphaltSection({ inputMode, mapLength, onUpdate }: Props) {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('7.5');
  const [thickness, setThickness] = useState<string>('0.1');
  const [unitPrice, setUnitPrice] = useState<string>('120');

  useEffect(() => {
    if (inputMode === 'map' && mapLength !== null) {
      setLength(mapLength.toFixed(2));
    }
  }, [inputMode, mapLength]);

  const L = parseFloat(length);
  const W = parseFloat(width);
  const T = parseFloat(thickness);
  const UP = parseFloat(unitPrice);

  const volume = !isNaN(L) && !isNaN(W) && !isNaN(T) ? L * W * T : null;
  const cost = volume !== null && !isNaN(UP) ? volume * UP : null;

  useEffect(() => {
    if (cost !== null) {
      onUpdate({ id: 'asphalt', name: 'طبقة الأسفلت', quantity: volume!, unit: 'م³', unitPrice: UP, total: cost });
    }
  }, [cost]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        🛣 طبقة الأسفلت (Asphalt)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">الطول (م)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" placeholder="الطول" min="0" />
          {inputMode === 'map' && mapLength !== null && <p className="helper-text text-green-700">✓ من الخريطة</p>}
        </div>
        <div>
          <label className="label-text">العرض (م)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" placeholder="مثال: 7.5" min="0" />
        </div>
        <div>
          <label className="label-text">السماكة (م)</label>
          <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-field" placeholder="مثال: 0.10" min="0" step="0.01" />
          <p className="helper-text">مثال: 0.05 م = 5 سم</p>
        </div>
        <div>
          <label className="label-text">سعر الوحدة (دينار/م³)</label>
          <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="input-field" min="0" />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">الحجم</span>
          <span className="result-value text-base">{volume !== null ? `${volume.toFixed(3)} م³` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">التكلفة</span>
          <span className="result-value">{cost !== null ? `${cost.toFixed(2)} دينار` : '—'}</span>
        </div>
        {volume !== null && (
          <p className="text-xs text-muted-foreground">
            الحجم = {length} × {width} × {thickness} = {volume.toFixed(3)} م³
          </p>
        )}
      </div>
    </div>
  );
}