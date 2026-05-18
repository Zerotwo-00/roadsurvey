'use client';
import React, { useState, useEffect } from 'react';
import { CostItem } from './QuantityCostClient';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
  mapArea: number | null;
  onUpdate: (item: CostItem) => void;
}

export default function EarthworksSection({ inputMode, mapLength, mapArea, onUpdate }: Props) {
  const [cutArea, setCutArea] = useState<string>('');
  const [fillArea, setFillArea] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [unitPriceCut, setUnitPriceCut] = useState<string>('8');
  const [unitPriceFill, setUnitPriceFill] = useState<string>('5');

  useEffect(() => {
    if (inputMode === 'map') {
      if (mapLength !== null) setLength(mapLength.toFixed(2));
      if (mapArea !== null) {
        setCutArea(mapArea.toFixed(2));
        setFillArea(mapArea.toFixed(2));
      }
    }
  }, [inputMode, mapLength, mapArea]);

  const cutAreaVal = parseFloat(cutArea);
  const fillAreaVal = parseFloat(fillArea);
  const lengthVal = parseFloat(length);
  const upCut = parseFloat(unitPriceCut);
  const upFill = parseFloat(unitPriceFill);

  const cutVol = !isNaN(cutAreaVal) && !isNaN(lengthVal) ? cutAreaVal * lengthVal : null;
  const fillVol = !isNaN(fillAreaVal) && !isNaN(lengthVal) ? fillAreaVal * lengthVal : null;
  const cutCost = cutVol !== null && !isNaN(upCut) ? cutVol * upCut : null;
  const fillCost = fillVol !== null && !isNaN(upFill) ? fillVol * upFill : null;

  useEffect(() => {
    if (cutCost !== null) {
      onUpdate({ id: 'earthworks-cut', name: 'حفريات (قطع)', quantity: cutVol!, unit: 'م³', unitPrice: upCut, total: cutCost });
    }
    if (fillCost !== null) {
      onUpdate({ id: 'earthworks-fill', name: 'ردم (ملء)', quantity: fillVol!, unit: 'م³', unitPrice: upFill, total: fillCost });
    }
  }, [cutCost, fillCost]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        🏗 أعمال الحفر والردم (Earthworks)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">مساحة مقطع الحفر (م²)</label>
          <input type="number" value={cutArea} onChange={(e) => setCutArea(e.target.value)} className="input-field" placeholder="مساحة القطع" min="0" />
          {inputMode === 'map' && mapArea !== null && <p className="helper-text text-green-700">✓ من الخريطة</p>}
        </div>
        <div>
          <label className="label-text">مساحة مقطع الردم (م²)</label>
          <input type="number" value={fillArea} onChange={(e) => setFillArea(e.target.value)} className="input-field" placeholder="مساحة الملء" min="0" />
        </div>
        <div>
          <label className="label-text">طول المقطع (م)</label>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" placeholder="الطول" min="0" />
          {inputMode === 'map' && mapLength !== null && <p className="helper-text text-green-700">✓ من الخريطة</p>}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label-text">سعر الحفر (دينار/م³)</label>
            <input type="number" value={unitPriceCut} onChange={(e) => setUnitPriceCut(e.target.value)} className="input-field" min="0" step="0.5" />
          </div>
          <div>
            <label className="label-text">سعر الردم (دينار/م³)</label>
            <input type="number" value={unitPriceFill} onChange={(e) => setUnitPriceFill(e.target.value)} className="input-field" min="0" step="0.5" />
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">حجم الحفر</span>
          <span className="result-value text-base">{cutVol !== null ? `${cutVol.toFixed(2)} م³` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">حجم الردم</span>
          <span className="result-value text-base">{fillVol !== null ? `${fillVol.toFixed(2)} م³` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">تكلفة الحفر</span>
          <span className="result-value text-base">{cutCost !== null ? `${cutCost.toFixed(2)} دينار` : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">تكلفة الردم</span>
          <span className="result-value text-base">{fillCost !== null ? `${fillCost.toFixed(2)} دينار` : '—'}</span>
        </div>
      </div>
    </div>
  );
}