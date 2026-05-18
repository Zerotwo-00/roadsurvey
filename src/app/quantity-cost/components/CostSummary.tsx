'use client';
import React from 'react';
import { CostItem } from './QuantityCostClient';

interface Props {
  costItems: CostItem[];
}

export default function CostSummary({ costItems }: Props) {
  const grandTotal = costItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="card">
      <h2 className="section-title border-b border-border pb-2 mb-4">
        💰 ملخص التكاليف الإجمالية
      </h2>
      {costItems.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-sm">أدخل الأبعاد وأسعار الوحدات في الأقسام أعلاه لعرض ملخص التكاليف</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-muted-foreground text-xs uppercase tracking-wide">
                  <th className="px-3 py-2 text-right font-medium">البند</th>
                  <th className="px-3 py-2 text-right font-medium">الكمية</th>
                  <th className="px-3 py-2 text-right font-medium">الوحدة</th>
                  <th className="px-3 py-2 text-right font-medium">سعر الوحدة</th>
                  <th className="px-3 py-2 text-right font-medium">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {costItems.map((item) => (
                  <tr key={item.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-3 py-2.5 font-medium text-foreground">{item.name}</td>
                    <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{item.quantity.toFixed(2)}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{item.unit}</td>
                    <td className="px-3 py-2.5 tabular-nums text-muted-foreground">{item.unitPrice.toFixed(2)} دينار</td>
                    <td className="px-3 py-2.5 tabular-nums font-semibold text-foreground">{item.total.toFixed(2)} دينار</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 border-t-2 border-primary pt-4 flex items-center justify-between">
            <span className="text-base font-semibold text-foreground">المجموع الكلي</span>
            <span className="text-2xl font-bold text-primary tabular-nums">
              {grandTotal.toFixed(2)} دينار
            </span>
          </div>
        </>
      )}
    </div>
  );
}