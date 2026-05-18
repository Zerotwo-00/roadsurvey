'use client';
import React, { useState } from 'react';

export default function CrossSlope() {
  const [slope, setSlope] = useState<string>('2');
  const [width, setWidth] = useState<string>('7.5');
  const slopeVal = parseFloat(slope);
  const widthVal = parseFloat(width);
  const dropMm = !isNaN(slopeVal) && !isNaN(widthVal) ? (slopeVal / 100) * widthVal * 1000 : null;

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        📐 الميل العرضي (Cross Slope)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">
            نسبة الميل العرضي (%)
          </label>
          <input
            type="number"
            value={slope}
            onChange={(e) => setSlope(e?.target?.value)}
            className="input-field"
            placeholder="الافتراضي: 2%"
            min="0"
            max="10"
            step="0.1"
          />
          <p className="helper-text">القيمة الافتراضية 2% وفق المواصفات الأردنية</p>
        </div>
        <div>
          <label className="label-text">
            عرض الطريق (م) — لحساب الانخفاض
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e?.target?.value)}
            className="input-field"
            placeholder="مثال: 7.5"
            min="0.1"
          />
        </div>
        <div>
          <label className="label-text">
            المنسوب (Z-Level) — م فوق مستوى البحر
          </label>
          <input
            type="number"
            className="input-field"
            placeholder="أدخل المنسوب يدوياً"
          />
          <p className="helper-text">يُدخل يدوياً — غير محسوب من خريطة ثنائية الأبعاد</p>
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 flex items-center justify-between">
        <span className="result-label">انخفاض الحافة (لكل مسار)</span>
        <span className="result-value">
          {dropMm !== null ? `${dropMm?.toFixed(1)} مم` : '—'}
        </span>
      </div>
      {dropMm !== null && (
        <p className="text-xs text-muted-foreground mt-1">
          الانخفاض = ({slope}% / 100) × {width} م × 1000 = {dropMm?.toFixed(1)} مم
        </p>
      )}
      <div className="mt-3 bg-blue-50 border border-blue-200 rounded-md px-3 py-2 text-xs text-blue-700">
        الميل العرضي للطرق الحضرية: 1.5–2% — للطرق الريفية: 2–4%
      </div>
    </div>
  );
}