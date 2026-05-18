'use client';
import React, { useState, useEffect } from 'react';
import { CostItem } from './QuantityCostClient';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
  onUpdate: (item: CostItem) => void;
}

export default function SteelSection({ inputMode, mapLength, onUpdate }: Props) {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('7.5');
  const [thickness, setThickness] = useState<string>('0.25');
  const [steelRatio, setSteelRatio] = useState<string>('100');
  const [unitPrice, setUnitPrice] = useState<string>('1.2');

  useEffect(() => {
    if (inputMode === 'map' && mapLength !== null) {
      setLength(mapLength.toFixed(2));
    }
  }, [inputMode, mapLength]);

  const L = parseFloat(length);
  const W = parseFloat(width);
  const T = parseFloat(thickness);
  const SR = parseFloat(steelRatio);
  const UP = parseFloat(unitPrice);

  const concreteVol = !isNaN(L) && !isNaN(W) && !isNaN(T) ? L * W * T : null;
  const steelWeight = concreteVol !== null && !isNaN(SR) ? concreteVol * SR : null;
  const cost = steelWeight !== null && !isNaN(UP) ? steelWeight * UP : null;

  useEffect(() => {
    if (cost !== null) {
      onUpdate({ id: 'steel', name: 'حديد التسليح', quantity: steelWeight!, unit: 'كغ', unitPrice: UP, total: cost });
    }
  }, [cost]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        🔩 حديد التسليح (Steel)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">الطول (م)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" placeholder="الطول" min="0" />
          {inputMode === 'map' && mapLength !== null && <p className="helper-text text-green-700">✓ من الخريطة</p>}
        </div>
        <div>
          <label className="label-text">العرض (م)</label>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" min="0" />
        </div>
        <div>
          <label className="label-text">السماكة الخرسانية (م)</label>
          <input type="number" value={thickness} onChange={(e) => setThickness(e.target.value)} className="input-field" min="0" step="0.01" />
        </div>
        <div>
          <label className="label-text">نسبة التسليح (كغ/م³)</label>
          <input type="number" value={steelRatio} onChange={(e) => setSteelRatio(e.target.value)} className="input-field" min="0" />
          <p className="helper-text">الافتراضي: 100 كغ/م³</p>
        </div>
        <div>
          <label className="label-text">سعر الوحدة (دينار/كغ)</label>
          <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} className="input-field" min="0" step="0.1" />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">حجم الخرسانة</span>
          <span className="result-value text-base">{concreteVol !== null ? `${concreteVol.toFixed(3)} م³` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">وزن الحديد</span>
          <span className="result-value text-base">{steelWeight !== null ? `${steelWeight.toFixed(1)} كغ` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">التكلفة</span>
          <span className="result-value">{cost !== null ? `${cost.toFixed(2)} دينار` : '—'}</span>
        </div>
        {steelWeight !== null && (
          <p className="text-xs text-muted-foreground">
            الوزن = {concreteVol?.toFixed(3)} م³ × {steelRatio} كغ/م³ = {steelWeight.toFixed(1)} كغ
          </p>
        )}
      </div>
    </div>
  );
}