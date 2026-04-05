// Patch ComprehensiveDashboard.tsx and YieldPrediction.tsx for localization
import { readFileSync, writeFileSync } from 'fs';

// ─────────────────────────────────────────────────────────────────────────────
// ComprehensiveDashboard.tsx
// ─────────────────────────────────────────────────────────────────────────────
let cdPath = './src/pages/ComprehensiveDashboard.tsx';
let cd = readFileSync(cdPath, 'utf8');

// 1. "Kharif Season 2025"
cd = cd.replace(
  /<p className="text-muted-foreground">Kharif Season 2025<\/p>/g,
  `<p className="text-muted-foreground">{t('yield.kharifSeason')}</p>`
);

// 2. tons/ha in badge
cd = cd.replace(
  /\+ ' tons\/ha'/g,
  `+ ' ' + t('yield.tonsPerHa')`
);
cd = cd.replace(
  /\+ " tons\/ha"/g,
  `+ ' ' + t('yield.tonsPerHa')`
);

// 3. "Confidence Range:"
cd = cd.replace(
  /<span>Confidence Range:<\/span>/g,
  `<span>{t('yield.confidenceRange')}:</span>`
);

// 4. tons/ha in text spans (standalone string)
cd = cd.replace(
  /} tons\/ha\n/g,
  `} {t('yield.tonsPerHa')}\n`
);
cd = cd.replace(
  /\.toFixed\(1\)\} tons\/ha/g,
  `.toFixed(1)} {t('yield.tonsPerHa')}`
);

// 5. "5-Year Average:"
cd = cd.replace(
  /<span>5-Year Average:<\/span>/g,
  `<span>{t('yield.fiveYearAvg')}:</span>`
);

// 6. "Trend:"
cd = cd.replace(
  /<span>Trend:<\/span>/g,
  `<span>{t('yield.trend')}:</span>`
);

// 7. "Regional Performance:"
cd = cd.replace(
  /<span>Regional Performance:<\/span>/g,
  `<span>{t('yield.regionalPerformance')}:</span>`
);

writeFileSync(cdPath, cd, 'utf8');
console.log('✅ ComprehensiveDashboard.tsx patched');

// ─────────────────────────────────────────────────────────────────────────────
// YieldPrediction.tsx
// ─────────────────────────────────────────────────────────────────────────────
let ypPath = './src/pages/YieldPrediction.tsx';
let yp = readFileSync(ypPath, 'utf8');

// 1. SelectItem ginger hardcoded
yp = yp.replace(
  /<SelectItem value="ginger">Ginger<\/SelectItem>/g,
  `<SelectItem value="ginger">{t('common.crops.ginger')}</SelectItem>`
);

// 2. <span className="text-xl text-muted-foreground ml-2">Tons</span>
yp = yp.replace(
  /<span className="text-xl text-muted-foreground ml-2">Tons<\/span>/g,
  `<span className="text-xl text-muted-foreground ml-2">{t('yield.tonsUnit')}</span>`
);

// 3. Toast: "Prediction Successful"
yp = yp.replace(
  /title: "Prediction Successful",/g,
  `title: t('yield.predictionSuccess'),`
);

// 4. Toast description with hardcoded "Tons"
yp = yp.replace(
  /description: `Estimated Production: \${totalProduction\.toFixed\(2\)} Tons`,/g,
  `description: \`\${t('yield.estimatedProduction')}: \${totalProduction.toFixed(2)} \${t('yield.tonsUnit')}\`,`
);

// 5. Toast Error title
yp = yp.replace(
  /variant: "destructive",\s*\n\s*title: "Error",/g,
  `variant: "destructive",\n                    title: t('common.error'),`
);

// 6. Hardcoded "from X Acres (Y Ha)" line
yp = yp.replace(
  /from \{result\.areaInAcres\} Acres \(\{result\.areaInHectares\.toFixed\(2\)\} Ha\)/g,
  `{result.areaInAcres} {t('yield.acres')} ({result.areaInHectares.toFixed(2)} {t('yield.ha')})`
);

// 7. Still hardcoded ginger in supported crops display
yp = yp.replace(
  /{t\('common\.crops\.rice'\)}, {t\('common\.crops\.maize'\)}, ginger/g,
  `{t('common.crops.rice')}, {t('common.crops.maize')}, {t('common.crops.ginger')}`
);

writeFileSync(ypPath, yp, 'utf8');
console.log('✅ YieldPrediction.tsx patched');
