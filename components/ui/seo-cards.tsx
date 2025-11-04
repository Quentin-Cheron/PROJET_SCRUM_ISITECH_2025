"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, MousePointerClick, BarChart3, Search } from "lucide-react";

export function SeoClickRateCard() {
  const clickRate = 4.7;
  const impressions = 12000;
  const clicks = 779;

  return (
    <Card className="w-full max-w-sm shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <MousePointerClick className="h-5 w-5" /> CTR (Click‑Through Rate)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-4xl font-bold">{clickRate}%</div>
        <p className="text-sm text-muted-foreground">
          {clicks} clics / {impressions} impressions
        </p>
      </CardContent>
    </Card>
  );
}

// ✅ Autres cards SEO exemples
export function SeoKeywordRankingCard() {
  const avgPosition = 8.3;
  return (
    <Card className="w-full max-w-sm shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Search className="h-5 w-5" /> Position moyenne mots‑clés
        </CardTitle>
      </CardHeader>
      <CardContent className="text-4xl font-bold">{avgPosition}</CardContent>
    </Card>
  );
}

export function SeoTrafficGrowthCard() {
  const growth = 12.5;
  return (
    <Card className="w-full max-w-sm shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <TrendingUp className="h-5 w-5" /> Croissance trafic
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-end gap-2">
        <span className="text-4xl font-bold">{growth}%</span>
        <span className="text-green-600 text-sm">+ ce mois</span>
      </CardContent>
    </Card>
  );
}

export function SeoIndexedPagesCard() {
  const indexed = 134;
  const total = 150;
  return (
    <Card className="w-full max-w-sm shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <BarChart3 className="h-5 w-5" /> Pages indexées
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-4xl font-bold">{indexed}</div>
        <p className="text-sm text-muted-foreground">sur {total} pages publiées</p>
      </CardContent>
    </Card>
  );
}

export function SeoTopKeywordsCard() {
  const keywords = [
    { word: "Acupuncture", count: 120 },
    { word: "Shiatsu", count: 95 },
    { word: "Acupression", count: 80 },
    { word: "Bien être", count: 72 },
    { word: "Gestion du stress", count: 68 },
    { word: "Équilibre énergétique", count: 60 },
    { word: "Coach thérapeute", count: 55 },
    { word: "Développement personnel", count: 50 },
  ];

  return (
    <Card className="w-full max-w-sm shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">🔝 Top mots-clés SEO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {keywords.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-6 text-xs font-bold text-gray-600 dark:text-gray-300">#{index + 1}</span>
                <span>{item.word}</span>
              </div>
              <span className="text-xs rounded-full bg-gray-200 dark:bg-gray-700 px-2 py-0.5 font-medium">{item.count}x</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
