const fs = require('fs');

const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8'));
const t = en.translation;

if (!t.buyer) t.buyer = { card: {} };
if (!t.buyer.card) t.buyer.card = {};
t.buyer.card.quantity = "Quantity";
t.buyer.card.price = "Price";

if (!t.seeds) t.seeds = {};
t.seeds.qtyUnit = "kg";

if (!t.common.all) t.common.all = "All States";
if (!t.marketplace.advisory.selectDistrict) t.marketplace.advisory.selectDistrict = "Select District";

// Also add Hindi translations for these to rebuild_i18n.mjs later or just here
fs.writeFileSync('en_block.json', JSON.stringify(en, null, 2));
console.log('en_block.json extras added!');
