'use client';
import React, { useState, useEffect } from 'react';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
}

interface VCResult {
  A: number;
  x: number;
}

export default function VerticalCurve({ inputMode, mapLength }: Props) {
  const [g1, setG1] = useState<string>('3');
  const [g2, setG2] = useState<string>('-2');
  const [L, setL] = useState<string>('');
  const [result, setResult] = useState<VCResult | null>(null);

  // When map mode and mapLength available, auto-fill L
  useEffect(() => {
    if (inputMode === 'map' && mapLength !== null) {
      setL(mapLength.toFixed(2));
    }
  }, [inputMode, mapLength]);

  useEffect(() => {
    const g1Val = parseFloat(g1);
    const g2Val = parseFloat(g2);
    const LVal = parseFloat(L);
    if (!isNaN(g1Val) && !isNaN(g2Val) && !isNaN(LVal) && LVal > 0) {
      const diff = g1Val - g2Val;
      if (Math.abs(diff) < 0.0001) {
        setResult(null);
        return;
      }
      const A = Math.abs(diff);
      const x = (Math.abs(g1Val) * LVal) / Math.abs(diff);
      setResult({ A, x });
    } else {
      setResult(null);
    }
  }, [g1, g2, L]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        ⬆ المنحنى الرأسي (Vertical Curve)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">
            الميل الأول g1 (%)
          </label>
          <input
            type="number"
            value={g1}
            onChange={(e) => setG1(e.target.value)}
            className="input-field"
            placeholder="مثال: 3 أو -3"
          />
          <p className="helper-text">قيمة موجبة = صاعد، سالبة = هابط</p>
        </div>
        <div>
          <label className="label-text">
            الميل الثاني g2 (%)
          </label>
          <input
            type="number"
            value={g2}
            onChange={(e) => setG2(e.target.value)}
            className="input-field"
            placeholder="مثال: -2"
          />
        </div>
        <div>
          <label className="label-text">
            طول المنحنى L (م)
          </label>
          <input
            type="number"
            value={L}
            onChange={(e) => setL(e.target.value)}
            className="input-field"
            placeholder={inputMode === 'map' && mapLength !== null ? `${mapLength.toFixed(2)} (من الخريطة)` : 'أدخل الطول'}
            min="0.1"
          />
          {inputMode === 'map' && mapLength !== null && (
            <p className="helper-text text-green-700">✓ تم جلبه من الخريطة تلقائياً</p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-4 border-t border-border pt-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-md p-3 text-center">
            <div className="result-label mb-1">فرق الميل A</div>
            <div className="result-value">
              {result ? `${result.A.toFixed(3)}%` : '—'}
            </div>
          </div>
          <div className="bg-muted rounded-md p-3 text-center">
            <div className="result-label mb-1">موضع القمة/القاع x</div>
            <div className="result-value">
              {result ? `${result.x.toFixed(2)} م` : '—'}
            </div>
          </div>
        </div>
        {result && (
          <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
            <div>A = |{g1} − {g2}| = {result.A.toFixed(3)}%</div>
            <div>x = (|{g1}| × {L}) / |{g1} − {g2}| = {result.x.toFixed(3)} م</div>
          </div>
        )}
        {g1 !== '' && g2 !== '' && parseFloat(g1) === parseFloat(g2) && (
          <p className="text-xs text-red-600 mt-2">⚠ g1 يساوي g2 — لا يمكن حساب المنحنى الرأسي (فرق الميل = 0)</p>
        )}
      </div>
    </div>
  );
}