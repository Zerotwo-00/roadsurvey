'use client';
import React, { useState } from 'react';
import { useMapStore } from '@/store/mapStore';
import EarthworksSection from './EarthworksSection';
import AsphaltSection from './AsphaltSection';
import ConcreteSection from './ConcreteSection';
import SteelSection from './SteelSection';
import SidewalksSection from './SidewalksSection';
import CostSummary from './CostSummary';
import EngineeringConversions from './EngineeringConversions';

export interface CostItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

export default function QuantityCostClient() {
  const [inputMode, setInputMode] = useState<'manual' | 'map'>('manual');
  const { routeLength, polygonArea, transferred } = useMapStore();

  const mapLength = transferred && routeLength !== null ? routeLength : null;
  const mapArea = transferred && polygonArea !== null ? polygonArea : null;

  const [costItems, setCostItems] = useState<CostItem[]>([]);

  const upsertCostItem = (item: CostItem) => {
    setCostItems((prev) => {
      const idx = prev.findIndex((c) => c.id === item.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = item;
        return updated;
      }
      return [...prev, item];
    });
  };

  return (
    <div className="px-4 py-5 max-w-screen-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-foreground">حساب الكميات والتكلفة</h1>
        <p className="text-sm text-muted-foreground mt-1">احتساب كميات المواد وتقدير التكاليف بالدينار الأردني</p>
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
              إدخال الأبعاد يدوياً
            </button>
            <button
              onClick={() => setInputMode('map')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                inputMode === 'map' ? 'mode-btn-active' : 'mode-btn-inactive'
              }`}
            >
              جلب الأطوال والمساحات من الخريطة
            </button>
          </div>
          {inputMode === 'map' && (
            <div className={`text-sm px-3 py-1.5 rounded-md ${
              mapLength !== null || mapArea !== null
                ? 'bg-green-50 text-green-700 border border-green-200' :'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {mapLength !== null || mapArea !== null
                ? `✓ ${mapLength !== null ? `الطول: ${mapLength.toFixed(2)} م` : ''}${mapLength !== null && mapArea !== null ? ' | ' : ''}${mapArea !== null ? `المساحة: ${mapArea.toFixed(2)} م²` : ''}`
                : '⚠ لا توجد بيانات من الخريطة — ارسم في التبويب الأول أولاً'}
            </div>
          )}
        </div>
      </div>

      {/* Quantity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-5 mb-5">
        <EarthworksSection inputMode={inputMode} mapLength={mapLength} mapArea={mapArea} onUpdate={upsertCostItem} />
        <AsphaltSection inputMode={inputMode} mapLength={mapLength} onUpdate={upsertCostItem} />
        <ConcreteSection inputMode={inputMode} mapLength={mapLength} onUpdate={upsertCostItem} />
        <SteelSection inputMode={inputMode} mapLength={mapLength} onUpdate={upsertCostItem} />
        <SidewalksSection inputMode={inputMode} mapLength={mapLength} onUpdate={upsertCostItem} />
      </div>

      {/* Cost Summary */}
      <CostSummary costItems={costItems} />

      {/* Divider */}
      <div className="border-t border-border my-8"></div>

      {/* Engineering Conversions - Tab 4 embedded */}
      <EngineeringConversions />
    </div>
  );
}