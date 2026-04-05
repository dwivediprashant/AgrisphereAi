const fs = require('fs');

const en = JSON.parse(fs.readFileSync('en_block.json', 'utf8'));
const t = en.translation;

if (!t.digitalTwin) t.digitalTwin = {};

t.digitalTwin.title = "GIS Smart Farm Digital Twin";
t.digitalTwin.subtitle = "Create a complete digital replica of your farm with advanced GIS mapping, multi-layer visualization, and real-time monitoring for precision agriculture.";
t.digitalTwin.featuring = "✨ Featuring: Farm Boundaries • Soil Zones • Irrigation Planning • Pest Risk Maps • NDVI Crop Health • Weather Analysis";
t.digitalTwin.generateBtn = "Generate Digital Twin";
t.digitalTwin.update = "Update Digital Twin";
t.digitalTwin.quickDemo = "Quick Demo";
t.digitalTwin.drawMap = "Draw on Map";
t.digitalTwin.drawDesc = "Pinpoint your location and trace the exact shape of your land.";
t.digitalTwin.setupTitle = "Farm Setup";
t.digitalTwin.setupDesc = "Enter your farm details or coordinates to generate your digital twin.";
t.digitalTwin.farmName = "Farm Name";
t.digitalTwin.ownerName = "Owner Name";
t.digitalTwin.state = "State";
t.digitalTwin.district = "District";
t.digitalTwin.town = "Town/Village";
t.digitalTwin.coordinates = "Coordinates";
t.digitalTwin.latitude = "Latitude";
t.digitalTwin.longitude = "Longitude";
t.digitalTwin.useCurrent = "Use Current Location";
t.digitalTwin.size = "Farm Size (Acres)";
t.digitalTwin.generating = "Generating Digital Twin...";
t.digitalTwin.capabilities = "Digital Twin Capabilities";
t.digitalTwin.visualization = "Multi-Layer GIS Visualization";
t.digitalTwin.interactiveMap = "Interactive GIS Map: {{name}}";
t.digitalTwin.exploreNote = "Explore {{owner}}'s farm with multi-layer GIS visualization. Click on zones for detailed information.";
t.digitalTwin.liveData = "Live Farm Intelligence";
t.digitalTwin.area = "Farm Area";
t.digitalTwin.hectares = "Hectares";
t.digitalTwin.stopBtn = "Stop";
t.digitalTwin.explainBtn = "Explain Farm Status";
t.digitalTwin.initializing = {
  status: "Initializing Digital Twin Engine...",
  mapping: "Mapping boundaries for",
  soil: "Analyzing soil sensor data layers...",
  irrigation: "Designing irrigation grid for",
  pests: "Calculating historical pest risk zones..."
};

t.digitalTwin.features = {
  soil: {
    title: "Soil Zone Classification",
    desc: "Multi-layer soil analysis with texture, pH, and nutrient mapping",
    f1: "Soil Texture", f2: "pH Zones", f3: "Nutrient Maps", f4: "Fertility Index"
  },
  irrigation: {
    title: "Irrigation Zone Planning",
    desc: "Smart irrigation zone design based on crop needs and soil conditions",
    f1: "Water Zones", f2: "Drip Planning", f3: "Sprinkler Layout", f4: "Efficiency Maps"
  },
  pest: {
    title: "Pest-Prone Area Detection",
    desc: "Historical pest data analysis to identify high-risk zones",
    f1: "Risk Zones", f2: "Pest History", f3: "Prevention Areas", f4: "Treatment Maps"
  },
  growth: {
    title: "Crop Growth Staging",
    desc: "Real-time crop growth stage monitoring across different field zones",
    f1: "Growth Stages", f2: "Maturity Maps", f3: "Harvest Zones", f4: "Yield Prediction"
  },
  weather: {
    title: "Weather Microclimate",
    desc: "Field-specific microclimate analysis and weather pattern mapping",
    f1: "Temperature Zones", f2: "Humidity Maps", f3: "Wind Patterns", f4: "Frost Risk"
  }
};

t.digitalTwin.layers = {
  satellite: "Satellite Imagery",
  soilHealth: "Soil Health",
  cropHealth: "Crop Health",
  weather: "Weather Data",
  pests: "Pest Alerts",
  base: "Base Layer",
  analysis: "Analysis Layer",
  monitoring: "Monitoring Layer",
  environmental: "Environmental Layer",
  alert: "Alert Layer",
  daily: "Daily",
  weekly: "Weekly",
  realtime: "Real-time",
  hourly: "Hourly",
  asneeded: "As needed"
};

t.digitalTwin.insights = {
  mappedZones: "Mapped Soil Zones",
  activeZones: "Active Irrigation Zones",
  growthStages: "Avg Growth Stage",
  health: "Health Score"
};

t.digitalTwin.summary = {
  prefix: "Farm Status Report for {{area}} hectares.",
  zones: "We have identified {{soil}} distinct soil zones and {{irrigation}} irrigation zones.",
  health: "Overall crop health is {{health}}%.",
  pestWarning: "Warning: High pest risk detected. Immediate action recommended.",
  pestLow: "Pest risk is currently low."
};

fs.writeFileSync('en_block.json', JSON.stringify(en, null, 2));
console.log('en_block.json patched with Digital Twin keys!');
