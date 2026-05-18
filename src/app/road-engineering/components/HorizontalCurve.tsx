'use client';
import React, { useState, useEffect } from 'react';

interface Props {
  inputMode: 'manual' | 'map';
  mapLength: number | null;
}

interface HCResult {
  L: number;
  T: number;
  E: number;
}

export default function HorizontalCurve({ inputMode, mapLength }: Props) {
  const [R, setR] = useState<string>('300');
  const [delta, setDelta] = useState<string>('45');
  const [result, setResult] = useState<HCResult | null>(null);

  useEffect(() => {
    const rVal = parseFloat(R);
    const dVal = parseFloat(delta);
    if (!isNaN(rVal) && !isNaN(dVal) && rVal > 0 && dVal > 0 && dVal < 360) {
      const dRad = (dVal / 2) * (Math.PI / 180);
      const L = (Math.PI * rVal * dVal) / 180;
      const T = rVal * Math.tan(dRad);
      const E = rVal * (1 / Math.cos(dRad) - 1);
      setResult({ L, T, E });
    } else {
      setResult(null);
    }
  }, [R, delta]);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-3">
        ↩ المنحنى الأفقي (Horizontal Curve)
      </h2>
      <div className="space-y-3">
        <div>
          <label className="label-text">
            نصف القطر R (م)
          </label>
          <input
            type="number"
            value={R}
            onChange={(e) => setR(e.target.value)}
            className="input-field"
            placeholder="مثال: 300"
            min="1"
          />
        </div>
        <div>
          <label className="label-text">
            زاوية الانحراف Δ (درجة)
          </label>
          <input
            type="number"
            value={delta}
            onChange={(e) => setDelta(e.target.value)}
            className="input-field"
            placeholder="مثال: 45"
            min="0.1"
            max="359.9"
          />
        </div>
        {inputMode === 'map' && mapLength !== null && (
          <div className="bg-muted rounded-md px-3 py-2 text-sm text-muted-foreground">
            طول المسار من الخريطة: <strong className="text-foreground">{mapLength.toFixed(2)} م</strong>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="result-label mb-1">طول المنحنى L</div>
            <div className="result-value text-base">
              {result ? `${result.L.toFixed(2)}` : '—'}
            </div>
            <div className="text-xs text-muted-foreground">م</div>
          </div>
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="result-label mb-1">الظل T</div>
            <div className="result-value text-base">
              {result ? `${result.T.toFixed(2)}` : '—'}
            </div>
            <div className="text-xs text-muted-foreground">م</div>
          </div>
          <div className="bg-muted rounded-md p-2 text-center">
            <div className="result-label mb-1">البعد الخارجي E</div>
            <div className="result-value text-base">
              {result ? `${result.E.toFixed(2)}` : '—'}
            </div>
            <div className="text-xs text-muted-foreground">م</div>
          </div>
        </div>
        {result && (
          <div className="text-xs text-muted-foreground space-y-0.5 mt-2">
            <div>L = (π × {R} × {delta}) / 180 = {result.L.toFixed(3)} م</div>
            <div>T = {R} × tan({delta}/2°) = {result.T.toFixed(3)} م</div>
            <div>E = {R} × (1/cos({delta}/2°) − 1) = {result.E.toFixed(3)} م</div>
          </div>
        )}
      </div>
    </div>
  );
}