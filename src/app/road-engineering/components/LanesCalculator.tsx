'use client';
import React, { useState, useEffect } from 'react';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
}

export default function LanesCalculator({ inputMode, mapLength }: Props) {
  const [aadt, setAadt] = useState<string>('15000');
  const [laneCapacity, setLaneCapacity] = useState<string>('2000');
  const [zLevel, setZLevel] = useState<string>('');
  const [numLanes, setNumLanes] = useState<number | null>(null);

  useEffect(() => {
    const aadtVal = parseFloat(aadt);
    const capVal = parseFloat(laneCapacity);
    if (!isNaN(aadtVal) && !isNaN(capVal) && capVal > 0) {
      setNumLanes(Math.ceil(aadtVal / capVal));
    } else {
      setNumLanes(null);
    }
  }, [aadt, laneCapacity]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        🚗 عدد المسارات (Lanes)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">
            AADT — الحجم اليومي للمرور
          </label>
          <input
            type="number"
            value={aadt}
            onChange={(e) => setAadt(e.target.value)}
            className="input-field"
            placeholder="مثال: 15000"
            min="0"
          />
          <p className="helper-text">عدد المركبات في اليوم الواحد</p>
        </div>
        <div>
          <label className="label-text">
            طاقة المسار (Lane Capacity) — مركبة/ساعة
          </label>
          <input
            type="number"
            value={laneCapacity}
            onChange={(e) => setLaneCapacity(e.target.value)}
            className="input-field"
            placeholder="الافتراضي: 2000"
            min="1"
          />
          <p className="helper-text">القيمة الافتراضية 2000 مركبة/ساعة</p>
        </div>
        <div>
          <label className="label-text">
            المنسوب (Z-Level) — م فوق مستوى البحر
          </label>
          <input
            type="number"
            value={zLevel}
            onChange={(e) => setZLevel(e.target.value)}
            className="input-field"
            placeholder="أدخل المنسوب يدوياً"
          />
          <p className="helper-text">يُدخل يدوياً دائماً — غير محسوب من الخريطة</p>
        </div>
        {inputMode === 'map' && mapLength !== null && (
          <div className="bg-muted rounded-md px-3 py-2 text-sm text-muted-foreground">
            طول المسار من الخريطة: <strong className="text-foreground">{mapLength.toFixed(2)} م</strong>
          </div>
        )}
      </div>
      {/* Result */}
      <div className="mt-4 border-t border-border pt-3 flex items-center justify-between">
        <span className="result-label">عدد المسارات المطلوبة</span>
        <span className="result-value">
          {numLanes !== null ? `${numLanes} مسار` : '—'}
        </span>
      </div>
      {numLanes !== null && (
        <p className="text-xs text-muted-foreground mt-1">
          المعادلة: ⌈{aadt} ÷ {laneCapacity}⌉ = {numLanes}
        </p>
      )}
    </div>
  );
}