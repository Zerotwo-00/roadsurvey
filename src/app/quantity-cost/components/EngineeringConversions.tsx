'use client';
import React, { useState } from 'react';

// ── Angle Converter ──────────────────────────────────────────────
function AngleConverter() {
  const [degrees, setDegrees] = useState<string>('');

  const degVal = parseFloat(degrees);
  const grads = !isNaN(degVal) ? degVal * 1.11111 : null;
  const rads = !isNaN(degVal) ? (degVal * Math.PI) / 180 : null;

  return (
    <div className="card">
      <h3 className="section-title border-b border-border pb-2 mb-3">📐 تحويل الزوايا</h3>
      <div className="space-y-3">
        <div>
          <label className="label-text">الدرجات (°)</label>
          <input
            type="number"
            value={degrees}
            onChange={(e) => setDegrees(e?.target?.value)}
            className="input-field"
            placeholder="أدخل القيمة بالدرجات"
          />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">غراد (Grad)</span>
          <span className="result-value text-base tabular-nums">{grads !== null ? grads?.toFixed(5) : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">راديان (Rad)</span>
          <span className="result-value text-base tabular-nums">{rads !== null ? rads?.toFixed(6) : '—'}</span>
        </div>
        {rads !== null && (
          <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
            <div>Grad = {degrees}° × 1.11111 = {grads?.toFixed(5)}</div>
            <div>Rad = {degrees}° × π/180 = {rads?.toFixed(6)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Length Converter ─────────────────────────────────────────────
function LengthConverter() {
  const [meters, setMeters] = useState<string>('');

  const m = parseFloat(meters);
  const km = !isNaN(m) ? m / 1000 : null;
  const ft = !isNaN(m) ? m * 3.28084 : null;
  const miles = !isNaN(m) ? m / 1609.344 : null;

  return (
    <div className="card">
      <h3 className="section-title border-b border-border pb-2 mb-3">📏 تحويل الأطوال</h3>
      <div className="space-y-3">
        <div>
          <label className="label-text">الأمتار (م)</label>
          <input
            type="number"
            value={meters}
            onChange={(e) => setMeters(e?.target?.value)}
            className="input-field"
            placeholder="أدخل القيمة بالأمتار"
            min="0"
          />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">كيلومتر (كم)</span>
          <span className="result-value text-base tabular-nums">{km !== null ? km?.toFixed(4) : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">قدم (ft)</span>
          <span className="result-value text-base tabular-nums">{ft !== null ? ft?.toFixed(3) : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">ميل (mile)</span>
          <span className="result-value text-base tabular-nums">{miles !== null ? miles?.toFixed(5) : '—'}</span>
        </div>
        {ft !== null && (
          <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
            <div>كم = {meters} ÷ 1000 = {km?.toFixed(4)}</div>
            <div>قدم = {meters} × 3.28084 = {ft?.toFixed(3)}</div>
            <div>ميل = {meters} ÷ 1609.344 = {miles?.toFixed(5)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Area Converter ───────────────────────────────────────────────
function AreaConverter() {
  const [sqm, setSqm] = useState<string>('');

  const m2 = parseFloat(sqm);
  const dunums = !isNaN(m2) ? m2 / 1000 : null;
  const hectares = !isNaN(m2) ? m2 / 10000 : null;

  return (
    <div className="card">
      <h3 className="section-title border-b border-border pb-2 mb-3">🗺 تحويل المساحات</h3>
      <div className="space-y-3">
        <div>
          <label className="label-text">متر مربع (م²)</label>
          <input
            type="number"
            value={sqm}
            onChange={(e) => setSqm(e?.target?.value)}
            className="input-field"
            placeholder="أدخل القيمة بالمتر المربع"
            min="0"
          />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="result-label">دونم</span>
          <span className="result-value text-base tabular-nums">{dunums !== null ? dunums?.toFixed(4) : '—'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="result-label">هكتار</span>
          <span className="result-value text-base tabular-nums">{hectares !== null ? hectares?.toFixed(5) : '—'}</span>
        </div>
        {dunums !== null && (
          <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
            <div>دونم = {sqm} ÷ 1000 = {dunums?.toFixed(4)}</div>
            <div>هكتار = {sqm} ÷ 10000 = {hectares?.toFixed(5)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function EngineeringConversions() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground">التحويلات الهندسية</h2>
        <p className="text-sm text-muted-foreground mt-1">أداة مستقلة لتحويل الزوايا والأطوال والمساحات</p>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2.5 mb-5 text-sm text-blue-700">
        هذه الأداة مستقلة تماماً عن الخريطة — يمكن استخدامها في أي وقت دون ربط بأي بيانات أخرى.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
        <AngleConverter />
        <LengthConverter />
        <AreaConverter />
      </div>
    </div>
  );
}