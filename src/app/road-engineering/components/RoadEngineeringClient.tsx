'use client';
import React, { useState } from 'react';
import { useMapStore } from '@/store/mapStore';
import LanesCalculator from './LanesCalculator';
import HorizontalCurve from './HorizontalCurve';
import VerticalCurve from './VerticalCurve';
import CrossSlope from './CrossSlope';

export default function RoadEngineeringClient() {
  const [inputMode, setInputMode] = useState<'manual' | 'map'>('manual');
  const { routeLength, transferred } = useMapStore();

  const mapLength = transferred && routeLength !== null ? routeLength : null;

  return (
    <div className="px-4 py-5 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">هندسة الطرق</h1>
        <p className="text-sm text-muted-foreground mt-1">حساب المعاملات الهندسية للطرق والمنحنيات الأفقية والرأسية</p>
      </div>
      {/* Mode Toggle */}
      <div className="card mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-foreground">وضع الإدخال:</span>
          <div className="flex rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setInputMode('manual')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                inputMode === 'manual' ? 'mode-btn-active' : 'mode-btn-inactive'
              }`}
            >
              إدخال يدوي
            </button>
            <button
              onClick={() => setInputMode('map')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                inputMode === 'map' ? 'mode-btn-active' : 'mode-btn-inactive'
              }`}
            >
              جلب من الخريطة
            </button>
          </div>
          {inputMode === 'map' && (
            <div className={`text-sm px-3 py-1.5 rounded-md ${
              mapLength !== null
                ? 'bg-green-50 text-green-700 border border-green-200' :'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {mapLength !== null
                ? `✓ طول المسار: ${mapLength?.toFixed(2)} م`
                : '⚠ لا توجد بيانات من الخريطة — ارسم مساراً في التبويب الأول أولاً'}
            </div>
          )}
        </div>
      </div>
      {/* Note: Z-Level */}
      <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-2.5 mb-5 text-sm text-blue-700">
        <strong>ملاحظة:</strong> المنسوب (Z) يُدخل يدوياً دائماً — لا يمكن حسابه تلقائياً من خريطة ثنائية الأبعاد.
      </div>
      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-5">
        <LanesCalculator inputMode={inputMode} mapLength={mapLength} />
        <HorizontalCurve inputMode={inputMode} mapLength={mapLength} />
        <VerticalCurve inputMode={inputMode} mapLength={mapLength} />
        <CrossSlope />
      </div>
    </div>
  );
}