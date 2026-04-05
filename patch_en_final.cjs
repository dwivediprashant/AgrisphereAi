const fs = require('fs');

const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8'));
const t = en.translation;

// Additional Marketplace keys
t.marketplace.demands.locationPref = "Location Preference";
t.marketplace.langEn = "English";
t.marketplace.langHi = "Hindi";
t.marketplace.langBn = "Bengali";
t.marketplace.langAs = "Assamese";
t.marketplace.langKn = "Kannada";

// Pest Summary keys
if (!t.pest.summary) t.pest.summary = {};
t.pest.summary.prediction = "Prediction: {{name}} with {{level}} risk ({{score}}%).";
t.pest.summary.recommendation = "Recommendation: {{recommendation}}";
t.pest.summary.weather = "Weather: {{temp}}°C, {{humidity}}% Humidity, {{rainfall}}mm Rain.";
t.pest.summary.crop = "Crop: {{crop}}.";

// Yield Summary keys
if (!t.yield.summary) t.yield.summary = {};
t.yield.summary.report = "Your predicted yield for {{crop}} is {{total}} tons. To maintain this efficiency of {{efficiency}} tons per hectare, ensure optimal NPK levels and timely irrigation as per the weather forecast.";

// Common
t.common.ready = "Ready";
t.common.in = "in";
t.common.unit = {
  acres: "Acres",
  hectares: "Hectares",
  tons: "Tons",
  quintals: "Quintals",
  kilograms: "kg"
};

fs.writeFileSync('en_block.json', JSON.stringify(en, null, 2));
console.log('en_block.json finalized!');
