/* =========================================================
   ECOCITY AI
   app.js - Smart City Intelligence Platform (v2.0)
   Multilingual + Live Data + AI Assistant + Waste Segregation +
   Solar Degradation Calculator + EV Smart Nudges + Smart City Roadmap
========================================================= */

const API_BASE = "https://ecocityai.onrender.com";

let currentData = null;
let currentLanguage = "en";

let mainMap = null;
let evMap = null;
let mainLocationMarker = null;
let evLocationMarker = null;
let mainMarkersLayer = null;
let evMarkersLayer = null;
let pollutantChartInstance = null;
let weatherTrendChartInstance = null;
let simulationChartInstance = null;
let currentScannerImageB64 = "";
let currentHazardData = null;

/* =========================================================
   MULTILINGUAL TRANSLATION DICTIONARY
========================================================= */

const TRANSLATIONS = {
    en: {
        brandSubtitle: "Smart City Intelligence Platform",
        noLocation: "Location not selected",
        navExplore: "EXPLORE",
        navSmartCity: "Smart City",
        navWaste: "Waste",
        navRecycling: "Recycling",
        navEnergy: "Energy & Solar",
        navEV: "EV & Mobility",
        navTransport: "Public Transport",
        navWeather: "Weather & Air",
        navAssistant: "AI Assistant",
        navSources: "Sources & Method",
        noteTitle: "REAL-TIME DATA",
        noteDesc: "EcoCity AI connects live weather, real air quality, solar radiation, and OpenStreetMap infrastructure.",
        heroEyebrow: "LOCATION-FIRST CITY INTELLIGENCE",
        heroTitle1: "Understand your city.",
        heroTitle2: "See what could improve.",
        heroDesc: "Search any location worldwide or use your live GPS to view real weather, air quality, waste, recycling, EV networks, and solar energy insights.",
        searchPlaceholder: "Enter city, area, PIN code...",
        btnExplore: "Explore Location",
        btnUseLocation: "Use My Location",
        quickSelect: "Quick Select:",
        selectedAreaLabel: "SELECTED AREA",
        dashEyebrow: "CITY SNAPSHOT",
        dashTitle: "Your city, at a glance.",
        dashDesc: "A single real-time view of the systems that shape urban life.",
        metricWaste: "WASTE GENERATED",
        metricWasteNote: "daily footprint",
        metricRecycling: "RECYCLING RATE",
        metricRecycleNote: "recovery share",
        metricEV: "EV CHARGERS",
        metricEVNote: "active stations",
        metricSolar: "SOLAR CAPACITY",
        metricSolarNote: "estimated potential",
        mapTitle: "City Intelligence Map",
        mapDesc: "Real-world location and municipal infrastructure.",
        legLocation: "Location",
        legEV: "EV Chargers",
        legRecycle: "Recycling",
        insightsTitle: "What deserves attention?",
        insightsDesc: "Context-aware city insights powered by live feeds.",
        loadingInsights: "Analysing selected location...",
        planEyebrow: "SMART CITY PLANNER",
        planTitle: "From city data to smarter action.",
        planBadge: "AI ANALYSIS",
        step1Title: "SEE",
        step1Desc: "Understand real-time environmental and infrastructure conditions.",
        step2Title: "ANALYSE",
        step2Desc: "Combine weather, air quality, solar potential, and mobility data.",
        step3Title: "IDENTIFY",
        step3Desc: "Pinpoint environmental bottlenecks, energy gaps, and transit needs.",
        step4Title: "ACT",
        step4Desc: "Deploy targeted interventions with measurable municipal impact.",
        smartCityPlanTitle: "How to Transform Your City into a Smart City",
        smartCityPlanDesc: "A 5-pillar master strategy integrating IoT sensors, clean energy, circular waste, and zero-emission mobility.",
        pillar1Title: "Smart Waste & Circularity",
        pillar1Desc: "IoT ultrasonic bin fill sensors, dynamic route dispatch, automated MRF sorting, and zero-landfill organic composting.",
        pillar2Title: "Zero-Emission Mobility",
        pillar2Desc: "Dedicated EV fast-charging corridors, 100% electrified municipal bus fleets, and integrated multimodal transit cards.",
        pillar3Title: "Decentralized Clean Energy",
        pillar3Desc: "Mandatory rooftop solar on municipal and commercial roofs, smart microgrids, and battery energy storage (BESS).",
        pillar4Title: "Air & Climate Resilience",
        pillar4Desc: "Hyper-local optical AQI sensor grid with automated mist cannons, urban green buffers, and sponge-city rainwater retention.",
        pillar5Title: "Citizen Eco-Nudges & AI",
        pillar5Desc: "Gamified waste segregation rewards, open municipal data APIs, and AI-assisted predictive urban maintenance.",
        wasteEyebrow: "WASTE INTELLIGENCE",
        wasteTitle: "Where does the city's waste go?",
        wasteDesc: "Understand waste generation, composition, and disposal pathways.",
        wasteDaily: "DAILY WASTE",
        wasteDailyNote: "estimated volume",
        wasteOrganic: "ORGANIC SHARE",
        wasteOrganicNote: "compostable fraction",
        wastePlastic: "PLASTIC SHARE",
        wastePlasticNote: "recyclable polymer",
        wasteLandfill: "LANDFILLED",
        wasteLandfillNote: "divertible residual",
        wasteInfoTitle: "Understanding the Waste Stream",
        wasteInfoDesc: "EcoCity AI correlates municipal solid waste with weather conditions to recommend optimal collection scheduling and divert organic waste from open landfills.",
        wasteBoxTitle: "Evidence-Based Strategy:",
        wasteBoxDesc: "Decentralized bio-methanation and segregated plastic recovery can reduce landfill burden by over 40%.",
        recEyebrow: "RECYCLING + E-WASTE",
        recTitle: "Turn waste into a recovery opportunity.",
        recDesc: "Explore material recovery, circularity, and verified recycling infrastructure.",
        recRate: "RECYCLING RATE",
        recPlastic: "PLASTIC RECOVERY",
        recPaper: "PAPER & FIBER",
        recFacilities: "NEARBY CENTRES",
        recFacNote: "OSM verified points",
        segAssistantTitle: "Interactive Waste Segregation Assistant",
        segAssistantDesc: "Instant bin categorization, contamination prevention, and decomposition timelines.",
        segItemPlaceholder: "Check item (e.g., Plastic bottle, Battery, Cardboard, Leftovers...)",
        btnCheckItem: "Check Segregation",
        quickItems: "Common Items:",
        recMatTitle: "Material Recovery Flow",
        recMatDesc: "Separate tracking of plastics, paper, metals, electronics, and compostable organic waste ensures higher circular yield.",
        recFacTitle: "Circular Facility Network",
        recFacDesc: "Verified drop-off points and automated recovery hubs indexed directly from OpenStreetMap geospatial layers.",
        energyEyebrow: "ENERGY INTELLIGENCE",
        energyTitle: "Can the city use energy more intelligently?",
        energyDesc: "Explore live solar irradiance, area-based photovoltaic types, and degradation schedules.",
        energySolar: "SOLAR CAPACITY",
        energyIrradiance: "SOLAR IRRADIANCE",
        energyIrrNote: "live measurement",
        energySunshine: "SUNSHINE HOURS",
        energySunNote: "daily estimate",
        energyStatus: "GRID STATUS",
        energyOpt: "OPTIMIZED",
        energyWeatherSync: "weather-synced",
        solarTypeTitle: "Area-Based Solar Recommendation Guide",
        solarTypeDesc: "Choose the optimal photovoltaic technology suited for your space and architecture.",
        st1Badge: "Compact Roofs (<400 sq ft)",
        st1Title: "Monocrystalline PERC",
        st1Desc: "Highest efficiency (21-23%). Maximizes energy generation on limited terrace area.",
        st1Deg: "Degradation: ~0.5%/year | 25-yr efficiency: 84%",
        st2Badge: "Medium / Large Terraces (400-1500 sq ft)",
        st2Title: "Bifacial Monocrystalline",
        st2Desc: "Generates power from both front sunlight and reflected ground albedo (+12-15% extra yield).",
        st2Deg: "Degradation: ~0.45%/year | 25-yr efficiency: 86%",
        st3Badge: "High-Rise Buildings & Facades",
        st3Title: "BIPV (Building-Integrated PV)",
        st3Desc: "Replaces window glazing and vertical facade cladding with power-generating photovoltaic glass.",
        st3Deg: "Degradation: ~0.6%/year | 25-yr efficiency: 82%",
        st4Badge: "Parking Lots & Walkways",
        st4Title: "Solar Canopies & Pergolas",
        st4Desc: "Dual-benefit shade canopy for parked vehicles with direct grid-tie / EV charger integration.",
        st4Deg: "Degradation: ~0.55%/year | 25-yr efficiency: 83%",
        solarCalcTitle: "Solar Capacity, ROI & Degradation Calculator",
        solarCalcDesc: "Estimate system capacity, monthly units, 25-year efficiency degradation, and climate cleaning schedules.",
        btnCalcSolar: "Calculate Solar Yield",
        evEyebrow: "ELECTRIC MOBILITY",
        evTitle: "Cleaner mobility needs better visibility.",
        evDesc: "Connect live EV charging stations, transport nodes, and clean mobility routes.",
        evMetricChargers: "EV CHARGERS",
        evMetricNote: "active stations",
        evMetricTransit: "TRANSIT INDEX",
        evTransitNote: "connectivity score",
        evMetricAir: "AIR QUALITY IMPACT",
        evAirNote: "emissions offset",
        evMetricNetwork: "NETWORK STATUS",
        evActive: "EXPANDING",
        evNudgeTitle: "Smart EV Adoption Nudges & Cost Calculator",
        evNudgeDesc: "Compare running costs against petrol/diesel, offset CO₂, and optimize battery lifespan.",
        btnCalcEV: "Calculate EV Savings",
        nudgeSolarTitle: "Solar-Sync Charging Window",
        nudgeSolarDesc: "Charge between 11:00 AM – 3:00 PM to power your vehicle directly with zero-carbon solar generation.",
        nudgeBatteryTitle: "20% – 80% Battery Preservation Rule",
        nudgeBatteryDesc: "Keeping daily charge between 20% and 80% extends Lithium battery service life past 8+ years.",
        nudgeTempTitle: "Ambient Temperature Nudge",
        nudgeTempDesc: "Pre-cool vehicle cabin while plugged into AC charger to preserve 12-18% extra driving range in hot summer conditions.",
        evMapTitle: "EV Infrastructure Map",
        evWeatherTitle: "Weather-Aware Mobility Context",
        evWeatherDesc: "Ambient temperatures, extreme heat, and rainfall patterns influence battery efficiency and charging demand.",
        evWeatherLoading: "Loading mobility context...",
        transitEyebrow: "URBAN MOBILITY",
        transitTitle: "Move people, not just vehicles.",
        transitDesc: "Understand public transport connectivity, bus networks, and multimodal transit hubs.",
        transitMetricIndex: "TRANSIT INDEX",
        transitMetricEV: "EV INTEGRATION",
        transitActive: "ACTIVE",
        transitMetricStops: "TRANSIT STOPS",
        transitStopsNote: "OSM mapped",
        transitMetricSync: "REAL-TIME SYNC",
        transitLive: "LIVE",
        transitCardTitle: "Connected Smart Transit",
        transitCardDesc: "EcoCity AI combines geospatial transit stops, EV charging hubs, and weather conditions to identify commute gaps and improve clean transit access.",
        weatherEyebrow: "WEATHER & AIR QUALITY",
        weatherTitle: "Atmospheric conditions shape the city.",
        weatherDesc: "Live meteorological feeds and air quality indices directly integrated into city intelligence.",
        weatherCurrentLabel: "CURRENT CONDITIONS",
        weatherHumidityLabel: "HUMIDITY",
        weatherWindLabel: "WIND SPEED",
        weatherAQILabel: "AIR QUALITY (AQI)",
        forecastTitle: "5-Day Weather & Rain Outlook",
        aiEyebrow: "ECOCITY AI ASSISTANT",
        aiTitle: "Ask your city a question.",
        aiDesc: "Ask about live weather, air quality, waste optimization, EV charging hubs, or solar potential.",
        aiWelcome: "Hello! I am connected to real-time city data. Ask me any question about the current location's weather, air pollution (AQI), waste management, EV charging points, or solar energy potential.",
        aiInputPlaceholder: "Example: How could today's weather affect waste management?",
        btnAskAI: "Ask EcoCity AI",
        tryAsking: "TRY ASKING",
        sug1: "What is the weather and air quality here?",
        sug2: "How to segregate household waste?",
        sug3: "What type of solar panel should I use?",
        sug4: "How to make this city a smart city?",
        srcEyebrow: "TRANSPARENCY & DATA SOURCES",
        srcTitle: "Know where the answers come from.",
        srcDesc: "Trust and real-world verifiability are built directly into the system architecture.",
        src1Title: "Location & Geocoding",
        src1Desc: "Dual-engine geocoding powered by Open-Meteo and OpenStreetMap Nominatim for global accuracy.",
        src2Title: "Weather & Solar Radiation",
        src2Desc: "Open-Meteo High-Resolution Forecast & Solar Radiation APIs provide current and 5-day predictive atmospheric models.",
        src3Title: "Air Quality & Pollution",
        src3Desc: "Real-time PM2.5, PM10, NO2, CO, and US/European AQI data from Open-Meteo Air Quality atmospheric models.",
        src4Title: "Municipal & OSM Infrastructure",
        src4Desc: "Live Overpass queries extract EV chargers, recycling centres, and public transport stops directly from OpenStreetMap.",
        navResourceSaving: "Resource Saving & Reuse",
        resEyebrow: "RESOURCE EFFICIENCY & CIRCULAR ECONOMY",
        resTitle: "Save Resources. Reuse Materials. Eliminate Waste.",
        resDesc: "Practical circular workflows and dynamic calculators designed for everyday households as well as commercial enterprises and heavy industries.",
        selectViewMode: "SELECT PERSPECTIVE:",
        modeCitizen: "Citizen & Household",
        modeIndustry: "Commercial & Industrial",
        upcycleTitle: "Circular Item Reuse & Upcycling Assistant",
        upcycleDesc: "Search any household item to discover step-by-step upcycling methods, zero-waste repurposing, and avoid buying new products.",
        upcycleSearchPlaceholder: "Search item (e.g. Old T-shirt, Glass Jar, Delivery Box, Tires, Coffee grounds...)",
        btnSearchReuse: "Find Reuse Plan",
        popularItems: "POPULAR:",
        upcycleHow: "How to Reuse & Upcycle:",
        upcycleImpact: "Environmental & Financial Benefit:",
        hhCalcTitle: "Household Resource & Water/Energy Savings Calculator",
        hhCalcDesc: "Calculate your family's annual rainwater harvesting yield, water conservation, electricity savings from phantom load elimination, and organic compost production.",
        hhMembersLabel: "Household Members:",
        hhRoofAreaLabel: "Rooftop Catchment Area (sq ft):",
        hhAeratorLabel: "Low-Flow Aerators & Eco Taps:",
        optYesInstalled: "Installed (40% Water Saved)",
        optNoStandard: "Standard High-Flow Taps",
        hhPhantomLabel: "Vampire/Phantom Power Cutoff:",
        optYesSmartStrips: "Yes (Smart Power Strips Used)",
        optNoStandby: "No (Appliances on Standby)",
        hhCompostLabel: "Home Organic Waste Composting:",
        optYesComposting: "Yes (Home Aerobic/Pot Composting)",
        optNoTrash: "No (Thrown in General Waste)",
        resRainYield: "RAIN HARVESTING",
        resRainNote: "Filtered groundwater recharge",
        resWaterSaved: "WATER SAVED",
        resWaterNote: "Via aeration & greywater reuse",
        resPowerSaved: "ENERGY SAVED",
        resPowerNote: "Standby & lighting optimization",
        resCompostYield: "ORGANIC COMPOST",
        resCompostNote: "100% natural garden manure",
        resCO2Saved: "CARBON OFFSET",
        resCO2Note: "Direct GHG emissions avoided",
        resMoneySaved: "ANNUAL BILL SAVINGS",
        resMoneyNote: "Estimated utility savings",
        hhPillar1Title: "Solar Thermal Water Heating",
        hhPillar1Desc: "Replacing standard 2kW electric geysers with evacuated tube solar water heaters saves ~1,200 kWh/year and pays back within 24–30 months.",
        hhPillar2Title: "Subsurface Greywater Reuse",
        hhPillar2Desc: "Rerouting washing machine and RO discharge water to garden root-zones or toilet flushing cuts domestic freshwater demand by up to 35%.",
        hhPillar3Title: "Phantom Power & Smart Strips",
        hhPillar3Desc: "Standby electronics (microwaves, TVs, chargers) consume 8–10% of idle household power. Master switch surge strips completely stop phantom drain.",
        symbiosisTitle: "Industrial Symbiosis & Byproduct Exchange Directory",
        symbiosisDesc: "Industrial symbiosis turns one industry's waste stream into another enterprise's valuable raw material, cutting disposal costs and raw material extraction.",
        indCalcTitle: "Industrial Resource, Water (ZLD) & ESG Carbon Audit Calculator",
        indCalcDesc: "Evaluate plant water recycling (ZLD), captive renewable cogeneration, waste heat recovery savings, and Scope 1 & 2 greenhouse gas reduction.",
        indSectorLabel: "Industry Sector:",
        optSectorTextile: "Textile & Dyeing Unit",
        optSectorChemical: "Chemical & Pharmaceutical",
        optSectorFood: "Food, Beverage & Brewery",
        optSectorEngineering: "Auto & Heavy Engineering",
        optSectorMetal: "Foundry, Steel & Metallurgy",
        optSectorPaper: "Pulp, Paper & Packaging",
        indWaterLabel: "Daily Water Usage (kL / m³ per day):",
        indRecycleLabel: "ETP / RO / ZLD Water Recovery Rate (%):",
        indPowerLabel: "Monthly Grid Electricity (MWh/month):",
        indWHRSLabel: "Waste Heat Recovery (WHRS) / ORC:",
        optWHRSYes: "Implemented (18% Thermal Power Recovered)",
        optWHRSNo: "None (Flue Gas Vented)",
        indSolarLabel: "Captive Industrial Solar (kWp):",
        indWaterRecLabel: "WATER RECOVERED",
        indWaterRecNote: "Circular process recycling",
        indCleanPowerLabel: "CLEAN POWER GENERATED",
        indCleanPowerNote: "Solar + WHRS captive yield",
        indCarbonScopeLabel: "SCOPE 1 & 2 CO2 REDUCTION",
        indCarbonScopeNote: "Certified emissions avoided",
        indFinancialLabel: "ANNUAL RESOURCE SAVINGS",
        indFinancialNote: "Water, fuel & power offset",
        indISOLabel: "CIRCULAR READINESS",
        indISONote: "ISO 50001 & ZWTL benchmark",
        indPillar1Title: "Zero Liquid Discharge (ZLD)",
        indPillar1Desc: "Combining high-recovery Reverse Osmosis with Mechanical Vapor Recompression (MVR) evaporators recycles 95%+ of industrial wastewater for boiler and cooling tower feed.",
        indPillar2Title: "Specific Energy Consumption (SEC)",
        indPillar2Desc: "Deploying IE4 super-premium efficiency motors, variable frequency drives (VFDs) on pumps/blowers, and IoT energy sub-metering cuts factory electricity by 12–20%.",
        indPillar3Title: "Zero Waste to Landfill (ZWTL)",
        indPillar3Desc: "Co-processing non-recyclable high-calorific hazardous wastes in cement kilns as Refuse Derived Fuel (RDF) achieves true 100% landfill diversion certification.",
        navCarbonFootprint: "Carbon Footprint",
        wasteGapsTitle: "Critical Gaps Holding the City Back from Being a \"Smart City\"",
        wasteGapsDesc: "Smart cities achieve >85% landfill diversion and zero dumpsite fires. Here are the primary structural bottlenecks preventing this municipality from reaching smart zero-waste status:",
        wasteGap1Title: "Heavy Landfill Dependency & Dumpsite Fires",
        wasteGap1Desc: "Over 45%+ of daily solid waste is dumped unsegregated in legacy landfills. Anaerobic decomposition traps methane pockets, causing frequent spontaneous toxic surface fires.",
        wasteGap2Title: "Absence of Source Segregation & MRFs",
        wasteGap2Desc: "When organic wet waste mixes with plastics and paper at the household level, paper and polymers lose 70% of recyclable value and cannot be mechanically separated easily.",
        wasteGap3Title: "Lack of IoT Smart Bins & Dynamic Dispatch",
        wasteGap3Desc: "Municipal tippers follow static routes regardless of bin levels, causing overflowing roadside garbage bins in commercial zones while wasting diesel on half-empty residential bins.",
        wasteGap4Title: "Aquifer Leachate & Poisonous Smog",
        wasteGap4Desc: "Rainwater percolating through unlined garbage dumps leaches heavy metals and carcinogens into the city's drinking water table, permanently degrading local aquifers.",
        transitCalcTitle: "Public Transit Clean Air & Global Warming Impact Calculator",
        transitCalcDesc: "See exactly how much you clean the city's air, cut global warming emissions, and save money by switching your commute to public transit.",
        transitKmLabel: "Daily Roundtrip Distance (km):",
        transitPrivateLabel: "Your Current Private Vehicle:",
        optPetrolCar: "Petrol Car (140g CO2/km)",
        optDieselCar: "Diesel SUV/Car (170g CO2/km)",
        optBike: "Petrol 2-Wheeler (45g CO2/km)",
        transitAltLabel: "Public Transit Mode:",
        optMetro: "Metro / Subway Train (Clean Grid)",
        optEBus: "Zero-Emission Electric Bus",
        optCNGBus: "City CNG / Hybrid Bus",
        transitDaysLabel: "Days Used per Week:",
        transitCO2Reduced: "CO2 AVOIDED",
        transitCO2Note: "Direct greenhouse gas cut",
        transitSmogAvoided: "SMOG / PM2.5 PREVENTED",
        transitSmogNote: "Toxic roadside tailpipe smog",
        transitTrafficSaved: "TRAFFIC TIME SAVED",
        transitTrafficNote: "Peak-hour gridlock avoided",
        transitMoneySaved: "ANNUAL COMMUTE SAVINGS",
        transitMoneyNote: "Fuel, parking & upkeep savings",
        transitPillar1Title: "82% Lower Carbon per Passenger",
        transitPillar1Desc: "Electric metro trains and high-capacity electric buses produce only 18% of the greenhouse emissions generated by single-occupant private cars per kilometre travelled.",
        transitPillar2Title: "Eliminating Roadside PM2.5 & NO2",
        transitPillar2Desc: "One standard bus removes up to 40 cars from urban corridors, dramatically lowering street-level nitrogen dioxide and ultrafine brake-dust particulate matter that children breathe.",
        transitPillar3Title: "Cooling the Urban Heat Island",
        transitPillar3Desc: "Private car engines, tailpipe heat, and vast parking asphalt bake cities. Expanding transit allows converting hot parking lots into cool green urban micro-parks.",
        cfEyebrow: "CLIMATE IMPACT & EMISSIONS TRACKER",
        cfTitle: "Calculate & Cut Your Carbon Footprint",
        cfDesc: "Measure your annual greenhouse gas footprint across transport, home energy, food, and waste, and discover high-impact reduction steps.",
        cfCalcTitle: "Comprehensive Personal & Household Carbon Calculator",
        cfCalcDesc: "Real-time emissions modeling based on IPCC emission factors and regional energy grid carbon intensity.",
        cfCommuteLabel: "Daily Commute Distance (km):",
        cfTransportModeLabel: "Primary Travel Mode:",
        optCFPetrolCar: "Petrol Car (Medium/Sedan)",
        optCFDieselCar: "Diesel SUV / Car",
        optCFBike: "Motorcycle / Scooter",
        optCFEV: "Electric Vehicle (EV)",
        optCFPublic: "Metro Train / Electric Bus",
        optCFBicycle: "Bicycle / Walking (Zero-Emission)",
        cfPowerLabel: "Monthly Grid Electricity (kWh / Units):",
        cfGasLabel: "Monthly LPG Cylinders (14.2kg):",
        cfDietLabel: "Diet & Food Habits:",
        optCFVegan: "Plant-Based / Vegan (Lowest Footprint)",
        optCFVegetarian: "Vegetarian (Dairy, Grains, Produce)",
        optCFMixed: "Balanced Mixed (Occasional Poultry/Fish)",
        optCFHighMeat: "High Meat / Heavy Poultry & Mutton",
        cfWasteLabel: "Household Waste Segregation:",
        optCFZeroWaste: "100% Segregated & Home Composted",
        optCFModerate: "Moderate (Recycle Bottles/Paper Only)",
        optCFNone: "None (All Waste Sent to Landfill)",
        cfFlightsLabel: "Annual Flight Hours (Domestic/Intl):",
        cfTotalLabel: "YOUR ANNUAL FOOTPRINT",
        cfTotalNote: "Gross annual greenhouse emissions",
        cfStatusLabel: "BENCHMARK RATING",
        cfBenchmarkNote: "India: ~1.9T | Global: ~4.7T",
        cfTreesLabel: "TREES TO OFFSET",
        cfTreesNote: "Mature trees absorbing for 1 yr",
        cfPotentialLabel: "MAX REDUCTION POTENTIAL",
        cfPotentialNote: "Achievable with eco-habits",
        cfPlanTitle: "Your Top 3 High-Impact Steps to Cut Carbon by 40–60%:",
                diagHeaderTitle: "Visual Air Pollutants vs WHO Safety Limits",
        diagHeaderDesc: "Live real-time sensor measurements compared directly against World Health Organization 24-hr safe thresholds.",
        pollutantChartTitle: "Pollutant Concentration vs WHO Safe Limit (x-Ratio)",
        atmDynTitle: "Atmospheric Dynamics & Smog Interaction",
        atmDynDesc: "Visualizing how local meteorological factors trap pollutants or clear the urban air.",
        dyn1Title: "Solar & Heat Reaction",
        dyn1Desc: "Sunlight and high heat convert vehicle exhaust (NOx) into harmful ground-level ozone.",
        dyn2Title: "Wind & Stagnation Layer",
        dyn2Desc: "Slow winds trap toxic smoke and dust close to the ground, preventing it from blowing away.",
        dyn3Title: "Humidity & Haze Growth",
        dyn3Desc: "High moisture in the air binds with dust and chemicals, creating dense winter smog.",
        healthMapTitle: "Human Body & Biological Exposure Pathway",
        healthMapDesc: "Direct visual map of how specific pollutants affect organs and environment.",
        organLungsTitle: "Lungs & Alveoli (PM2.5)",
        organLungsDesc: "Micro-particles enter deep into lung air sacs, causing breathing difficulty and chronic bronchitis.",
        organHeartTitle: "Heart & Bloodstream",
        organHeartDesc: "Pollutants enter the blood, increasing arterial inflammation and heart strain by 20–35%.",
        organChildTitle: "Children & Vulnerable",
        organChildDesc: "Triggers asthma attacks in children and permanently reduces growing lung capacity.",
        organCropsTitle: "Crops & Farming",
        organCropsDesc: "Ozone damages plant leaves, reducing wheat and rice farming yields by 15–25%.",
        mitigationPipelineTitle: "4-Stage Scientific Clean Air Action Plan",
        mitigationPipelineDesc: "Visual workflow of practical and engineering steps to clean the city's air.",
        pipe1Title: "Mist Cannons & Sweeping",
        pipe1Desc: "Water mist guns and vacuum trucks clean road dust before it rises into the air.",
        pipe1Tag: "Dust Suppression",
        pipe2Title: "100% EV City Buses",
        pipe2Desc: "Replacing diesel buses with electric models eliminates toxic street-level NO2 smoke.",
        pipe2Tag: "Zero Tailpipe",
        pipe3Title: "Factory Smokestack Filters",
        pipe3Desc: "Industrial wet scrubbers and 24/7 sensor monitoring capture sulfur and toxic chemicals.",
        pipe3Tag: "Industrial Scrubbers",
        pipe4Title: "Green Tree Canopies",
        pipe4Desc: "Planting dense Neem and Peepal tree borders along roads naturally filters dust particles.",
        pipe4Tag: "Bio-Filter Shield",
        forecastChartDesc: "Interactive multi-day curve of temperature, rain probability, and estimated air stability.",
        areaWasteTitle: "Hyper-Local Area Waste Management Planner",
        areaWasteDesc: "Model decentralized on-site waste processing, composting yield, polymer recovery value, and smart IoT bin requirements for this specific locality.",
        lblAreaArchetype: "Area Archetype / Land Use:",
        optResidential: "Dense Residential Colony (0.45 kg/capita)",
        optCommercial: "Commercial Market / CBD (0.75 kg/unit)",
        optIndustrial: "Industrial Corridor / Estate (1.20 kg/worker)",
        optInstitutional: "Campus / Tech Park (0.35 kg/person)",
        lblAreaPop: "Local Population / Units in Ward:",
        lblAreaSeg: "Target Source Segregation Rate (%):",
        areaBlueprintTitle: "5-Pillar Actionable Waste Management Blueprint for This Locality",
        areaPillar1Title: "Doorstep RFID Segregation",
        areaPillar1Desc: "Mandatory 2-bin-1-bag segregation at every doorstep, verified with digital RFID scanner tags on waste collection carts.",
        areaPillar2Title: "<500m Decentralized Bio-Methanation",
        areaPillar2Desc: "Process wet organic waste on-site within 500m using in-vessel composters and mini-biogas plants, eliminating 90% of transport diesel.",
        areaPillar3Title: "IoT Ultrasonic Level Bins",
        areaPillar3Desc: "Install solar-powered ultrasonic fill sensors in neighborhood bins. Real-time alerts dispatch collection tippers only when bins hit 80% capacity.",
        areaPillar4Title: "Ward-Level MRF & Polymer Baling",
        areaPillar4Desc: "Dedicated secondary sorting center for high-value PET, HDPE, cardboard, and aluminum, selling directly to recyclers for circular revenue.",
        areaPillar5Title: "E-Waste & Hazardous Kiosks",
        areaPillar5Desc: "Secure drop-off points for batteries, discarded electronics, and chemicals with citizen reward points and property tax rebates.",
        btnExportReport: "Download City Report",
        btnVoiceGuide: "Voice Guide",
        navSimulation: "What-If Simulator",
        navScanner: "AI Civic & Waste Scanner",
        healthIndexLabel: "CITY HEALTH INDEX",
        healthScoreSub: "Live multi-system composite",
        advisoryTitle: "Real-Time Citizen Health Advisory & Activity Guidance",
        btnListenAdvisory: "Listen",
        simEyebrow: "POLICY & CLIMATE SIMULATOR",
        simTitle: "\"What-If\" Urban Policy & Climate Sandbox",
        simDesc: "Model the real-world impact of clean energy mandates, EV fleet transition, and zero-waste policies grounded in live city baseline data.",
        simBadge: "INTERACTIVE PHYSICS MODEL",
        simControlsTitle: "Simulate Municipal Interventions",
        simControlsDesc: "Adjust the policy levers below to project environmental offsets, AQI drop, and municipal budget savings.",
        btnResetSim: "Reset to Baseline",
        lever1Title: "☀️ Solar Mandate Expansion (+MW)",
        lever1Note: "Mandatory rooftop solar on all commercial and institutional terraces.",
        lever2Title: "⚡ Municipal & Bus Fleet EV Transition (%)",
        lever2Note: "Replacing diesel municipal tippers, buses, and autorickshaws with electric powertrains.",
        lever3Title: "♻️ Source Segregation & Biomethanation (%)",
        lever3Note: "Enforced 2-bin-1-bag doorstep segregation diverting organics from open dumps.",
        lever4Title: "🌳 Urban Tree Canopy & Roadside Buffers (+%)",
        lever4Note: "Native Peepal & Neem bio-shields along arterial roads to absorb particulate dust.",
        simCO2Saved: "PROJECTED CO₂ OFFSET",
        simCO2Note: "Clean power + zero tailpipes",
        simAQIImprove: "PROJECTED AQI IMPROVEMENT",
        simLandfillDivert: "LANDFILL DIVERSION",
        simLandfillNote: "Dumpsite fires prevented",
        simFinSavings: "MUNICIPAL ANNUAL SAVINGS",
        simFinNote: "Fuel, grid & tipping fees",
        simChartTitle: "Environmental Impact Projection (Baseline vs. Simulated Policy)",
        scanEyebrow: "AI COMPUTER VISION",
        scanTitle: "Multimodal Citizen Waste & Civic Hazard Scanner",
        scanDesc: "Upload or capture photos of household waste, road damage, or overflow points. Get instant material classification and log verified reports on the city map.",
        scanBadge: "GEMINI VISION AI",
        scanDropzoneTitle: "Upload or Snap Photo",
        scanDropzoneDesc: "Select an image from your device or camera to analyze waste composition or report civic defects.",
        dropzonePrompt: "Drag & drop photo here or click to browse",
        dropzoneFormats: "Supports JPG, PNG, WEBP (Camera capture supported)",
        btnSelectPhoto: "Select Photo",
        btnAnalyzeAI: "Analyze with Vision AI",
        btnClearPhoto: "Clear",
        samplePhotos: "Quick Test Samples:",
        scanResultTitle: "AI Diagnostic & Actionable Guidance",
        scanResultDesc: "Instant material classification, hazard index, and municipal action routing.",
        scannerAwaiting: "Awaiting Photo Input",
        scannerAwaitingDesc: "Select or capture a photo on the left to see instant segregation advice and earn Green Civic Points.",
        btnPinMap: "Geotag & Pin on Map",
        footerText: "Real data first. Multilingual intelligence. No guessing.",
        footerBadge: "Zero Hallucination • Real Data First",
        footerMission: "Autonomous smart city intelligence platform transforming real-time atmospheric, GIS, and municipal telemetry into hyper-local climate and sustainability actions.",
        footerLiveStatus: "Live Telemetry Feeds Active (Open-Meteo & OSM)",
        footerColModules: "Intelligence Modules",
        footerColData: "Verified Telemetry",
        footerColGov: "Accessibility & Voice",
        footerVoiceNote: "Full dual-language text-to-speech audio guides available across all diagnostic modules in both English and हिन्दी.",
        footerCopyText: "Municipal Environmental Intelligence & Decision System",
        aiActiveStatus: "Live AI Intelligence",
        btnClearChat: "Clear chat history and start a new conversation",
        btnClearChatText: "New Chat"
    },
    hi: {
        brandSubtitle: "स्मार्ट सिटी इंटेलिजेंस प्लेटफॉर्म",
        noLocation: "स्थान नहीं चुना गया",
        navExplore: "एक्सप्लोर करें",
        navSmartCity: "स्मार्ट शहर",
        navWaste: "कचरा प्रबंधन",
        navRecycling: "पुनर्चक्रण",
        navEnergy: "ऊर्जा एवं सौर",
        navEV: "ईवी एवं गतिशीलता",
        navTransport: "सार्वजनिक परिवहन",
        navWeather: "मौसम एवं वायु",
        navAssistant: "एआई सहायक",
        navSources: "स्रोत एवं विधि",
        noteTitle: "रीयल-टाइम डेटा",
        noteDesc: "इकोसिटी एआई लाइव मौसम, वायु गुणवत्ता, सौर ऊर्जा और ओपनस्ट्रीटमैप बुनियादी ढांचे को जोड़ता है।",
        heroEyebrow: "स्थान-प्रथम शहर बुद्धिमत्ता",
        heroTitle1: "अपने शहर को समझें।",
        heroTitle2: "जानें क्या सुधार संभव है।",
        heroDesc: "दुनिया भर में कोई भी स्थान खोजें या लाइव जीपीएस से वास्तविक मौसम, वायु प्रदूषण (AQI), कचरा, रीसाइक्लिंग और ईवी चार्जिंग डेटा देखें।",
        searchPlaceholder: "शहर, इलाका या पिन कोड दर्ज करें...",
        btnExplore: "स्थान देखें",
        btnUseLocation: "मेरा स्थान उपयोग करें",
        quickSelect: "त्वरित शहर चयन:",
        selectedAreaLabel: "चयनित क्षेत्र",
        dashEyebrow: "शहर का संक्षिप्त विवरण",
        dashTitle: "आपका शहर, एक नज़र में।",
        dashDesc: "शहरी जीवन को आकार देने वाली प्रणालियों का एकल रीयल-टाइम दृश्य।",
        metricWaste: "दैनिक कचरा",
        metricWasteNote: "दैनिक उत्पादन",
        metricRecycling: "पुनर्चक्रण दर",
        metricRecycleNote: "सामग्री पुनर्प्राप्ति",
        metricEV: "ईवी चार्जर्स",
        metricEVNote: "सक्रिय चार्जिंग पॉइंट",
        metricSolar: "सौर ऊर्जा क्षमता",
        metricSolarNote: "अनुमानित क्षमता",
        mapTitle: "शहर बुद्धिमत्ता मानचित्र",
        mapDesc: "वास्तविक स्थान और नगरपालिका अवसंरचना।",
        legLocation: "स्थान",
        legEV: "ईवी चार्जर्स",
        legRecycle: "पुनर्चक्रण",
        insightsTitle: "कहाँ ध्यान देने की आवश्यकता है?",
        insightsDesc: "लाइव डेटा द्वारा संचालित संदर्भ-जागरूक शहर अंतर्दृष्टि।",
        loadingInsights: "चयनित स्थान का विश्लेषण किया जा रहा है...",
        planEyebrow: "स्मार्ट सिटी योजनाकार",
        planTitle: "शहर के डेटा से स्मार्ट कार्रवाई तक।",
        planBadge: "एआई विश्लेषण",
        step1Title: "देखें",
        step1Desc: "वास्तविक समय की पर्यावरणीय और बुनियादी ढांचा स्थितियों को समझें।",
        step2Title: "विश्लेषण करें",
        step2Desc: "मौसम, वायु गुणवत्ता, सौर क्षमता और आवागमन डेटा को संयोजित करें।",
        step3Title: "पहचानें",
        step3Desc: "पर्यावरणीय समस्याओं, ऊर्जा अंतराल और पारगमन आवश्यकताओं को इंगित करें।",
        step4Title: "कार्रवाई करें",
        step4Desc: "मापने योग्य नगरपालिका प्रभाव के साथ लक्षित हस्तक्षेप लागू करें।",
        smartCityPlanTitle: "शहर को स्मार्ट सिटी कैसे बनाएं (5 मुख्य स्तंभ)",
        smartCityPlanDesc: "IoT सेंसर, स्वच्छ ऊर्जा, चक्रीय अपशिष्ट प्रबंधन और शून्य-उत्सर्जन गतिशीलता को एकीकृत करने वाली मास्टर रणनीति।",
        pillar1Title: "स्मार्ट कचरा और पुनर्चक्रण",
        pillar1Desc: "IoT डस्टबिन सेंसर, स्वचालित कचरा पृथक्करण संयंत्र (MRF) और 100% जैविक खाद निर्माण।",
        pillar2Title: "शून्य-उत्सर्जन गतिशीलता",
        pillar2Desc: "समर्पित ईवी फास्ट-चार्जिंग कॉरिडोर, 100% इलेक्ट्रिक बसें और एकीकृत सार्वजनिक परिवहन कार्ड।",
        pillar3Title: "विकेन्द्रीकृत स्वच्छ ऊर्जा",
        pillar3Desc: "सरकारी व वाणिज्यिक भवनों पर अनिवार्य रूफटॉप सोलर, स्मार्ट माइक्रोग्रिड और बैटरी ऊर्जा भंडारण।",
        pillar4Title: "वायु और जलवायु लचीलापन",
        pillar4Desc: "सटीक AQI सेंसर नेटवर्क, स्वचालित मिस्ट तोपें, शहरी हरित पट्टिका और स्पंज सिटी जल संचयन।",
        pillar5Title: "नागरिक भागीदारी और एआई",
        pillar5Desc: "कचरा पृथक्करण पर रिवॉर्ड पॉइंट्स, खुला नगरपालिका डेटा और एआई-सक्षम शहर रखरखाव।",
        wasteEyebrow: "अपशिष्ट बुद्धिमत्ता",
        wasteTitle: "शहर का कचरा कहाँ जाता है?",
        wasteDesc: "अपशिष्ट उत्पादन, संरचना और निपटान मार्गों को समझें।",
        wasteDaily: "दैनिक कचरा",
        wasteDailyNote: "अनुमानित मात्रा",
        wasteOrganic: "जैविक कचरा",
        wasteOrganicNote: "खाद योग्य हिस्सा",
        wastePlastic: "प्लास्टिक हिस्सा",
        wastePlasticNote: "पुनर्चक्रण योग्य",
        wasteLandfill: "लैंडफिल में",
        wasteLandfillNote: "डंपिंग यार्ड",
        wasteInfoTitle: "अपशिष्ट प्रवाह को समझना",
        wasteInfoDesc: "इकोसिटी एआई मौसम की स्थिति के साथ कचरा संग्रह को अनुकूलित करने और लैंडफिल भार को कम करने की सिफारिश करता है।",
        wasteBoxTitle: "प्रमाण-आधारित रणनीति:",
        wasteBoxDesc: "विकेन्द्रीकृत कंपोस्टिंग और प्लास्टिक रीसाइक्लिंग से लैंडफिल कचरे को 40% से अधिक कम किया जा सकता है।",
        recEyebrow: "पुनर्चक्रण और ई-कचरा",
        recTitle: "कचरे को पुनर्प्राप्ति के अवसर में बदलें।",
        recDesc: "सामग्री पुनर्प्राप्ति और सत्यापित रीसाइक्लिंग बुनियादी ढांचे का अन्वेषण करें।",
        recRate: "पुनर्चक्रण दर",
        recPlastic: "प्लास्टिक पुनर्प्राप्ति",
        recPaper: "कागज और फाइबर",
        recFacilities: "निकटवर्ती केंद्र",
        recFacNote: "OSM सत्यापित केंद्र",
        segAssistantTitle: "इंटरैक्टिव कचरा पृथक्करण सहायक",
        segAssistantDesc: "डस्टबिन रंग कोड, अपघटन समय और उचित निपटान निर्देश तुरंत जानें।",
        segItemPlaceholder: "वस्तु जांचें (जैसे प्लास्टिक बोतल, बैटरी, गत्ता, बचा खाना...)",
        btnCheckItem: "पृथक्करण जांचें",
        quickItems: "सामान्य वस्तुएं:",
        recMatTitle: "सामग्री पुनर्प्राप्ति प्रवाह",
        recMatDesc: "प्लास्टिक, कागज, धातु, इलेक्ट्रॉनिक्स और जैविक कचरे की अलग-अलग ट्रैकिंग उच्च वसूली सुनिश्चित करती है।",
        recFacTitle: "सर्कुलर फैसिलिटी नेटवर्क",
        recFacDesc: "ओपनस्ट्रीटमैप भू-स्थानिक परतों से सीधे अनुक्रमित ड्रॉप-ऑफ पॉइंट और संग्रह केंद्र।",
        energyEyebrow: "ऊर्जा बुद्धिमत्ता",
        energyTitle: "क्या शहर ऊर्जा का अधिक समझदारी से उपयोग कर सकता है?",
        energyDesc: "लाइव सौर विकिरण, नवीकरणीय क्षमता और पीक लोड कमी का अन्वेषण करें।",
        energySolar: "सौर क्षमता",
        energyIrradiance: "सौर विकिरण",
        energyIrrNote: "लाइव माप",
        energySunshine: "धूप के घंटे",
        energySunNote: "दैनिक अनुमान",
        energyStatus: "ग्रिड स्थिति",
        energyOpt: "अनुकूलित",
        energyWeatherSync: "मौसम-समन्वित",
        solarTypeTitle: "क्षेत्र-आधारित सौर पैनल चयन गाइड",
        solarTypeDesc: "अपनी छत के क्षेत्रफल और भवन संरचना के अनुसार सही सोलर पैनल तकनीक चुनें।",
        st1Badge: "छोटी छतें (<400 वर्ग फुट)",
        st1Title: "मोनोक्रिस्टलाइन PERC (Monocrystalline)",
        st1Desc: "सर्वोच्च दक्षता (21-23%)। कम जगह में अधिकतम बिजली उत्पादन प्रदान करता है।",
        st1Deg: "क्षरण (Degradation): ~0.5%/वर्ष | 25 वर्ष दक्षता: 84%",
        st2Badge: "मध्यम / बड़ी छतें (400-1500 वर्ग फुट)",
        st2Title: "बाइफेशियल मोनोक्रिस्टलाइन (Bifacial)",
        st2Desc: "सामने और पीछे दोनों तरफ से परावर्तित रोशनी से बिजली बनाता है (+12-15% अतिरिक्त लाभ)।",
        st2Deg: "क्षरण: ~0.45%/वर्ष | 25 वर्ष दक्षता: 86%",
        st3Badge: "ऊंची इमारतें व अग्रभाग (Facades)",
        st3Title: "BIPV (भवन-एकीकृत सोलर ग्लास)",
        st3Desc: "खिड़कियों और बाहरी दीवारों को बिजली उत्पादक सौर ग्लास से बदलता है।",
        st3Deg: "क्षरण: ~0.6%/वर्ष | 25 वर्ष दक्षता: 82%",
        st4Badge: "पार्किंग व वॉकवे",
        st4Title: "सोलर कैनोपी व परगोला",
        st4Desc: "वाहनों के लिए छाया और साथ में सीधे ईवी चार्जिंग हेतु स्वच्छ सौर ऊर्जा।",
        st4Deg: "क्षरण: ~0.55%/वर्ष | 25 वर्ष दक्षता: 83%",
        solarCalcTitle: "सौर क्षमता, बचत और लाइफ/क्षरण कैलकुलेटर",
        solarCalcDesc: "छत के क्षेत्रफल के अनुसार किलोवाट क्षमता, मासिक यूनिट, 25-वर्षीय दक्षता और सफाई का समय जानें।",
        btnCalcSolar: "सौर क्षमता की गणना करें",
        evEyebrow: "इलेक्ट्रिक मोबिलिटी",
        evTitle: "स्वच्छ आवागमन के लिए बेहतर दृश्यता।",
        evDesc: "लाइव ईवी चार्जिंग स्टेशनों, परिवहन नोड्स और स्वच्छ आवागमन मार्गों को जोड़ें।",
        evMetricChargers: "ईवी चार्जर्स",
        evMetricNote: "सक्रिय स्टेशन",
        evMetricTransit: "पारगमन सूचकांक",
        evTransitNote: "कनेक्टिविटी स्कोर",
        evMetricAir: "वायु गुणवत्ता प्रभाव",
        evAirNote: "उत्सर्जन में कमी",
        evMetricNetwork: "नेटवर्क स्थिति",
        evActive: "विस्तार हो रहा है",
        evNudgeTitle: "स्मार्ट ईवी नजिस और बचत कैलकुलेटर",
        evNudgeDesc: "पेट्रोल/डीजल के मुकाबले बचत, CO₂ कटौती और बैटरी लाइफ बढ़ाने के उपाय।",
        btnCalcEV: "ईवी बचत की गणना करें",
        nudgeSolarTitle: "सोलर-सिंक चार्जिंग समय",
        nudgeSolarDesc: "सुबह 11:00 बजे से दोपहर 3:00 बजे के बीच चार्ज करें ताकि सीधे सोलर बिजली का उपयोग हो।",
        nudgeBatteryTitle: "20% - 80% बैटरी संरक्षण नियम",
        nudgeBatteryDesc: "बैटरी को 20% से 80% के बीच रखने से लिथियम बैटरी की लाइफ 8+ वर्षों तक सुरक्षित रहती है।",
        nudgeTempTitle: "तापमान नज़ (Range Preservation)",
        nudgeTempDesc: "गर्मियों में एसी चार्जिंग पर लगे रहते हुए केबिन को पहले से ठंडा (Pre-cool) कर लें।",
        evMapTitle: "ईवी इन्फ्रास्ट्रक्चर मैप",
        evWeatherTitle: "मौसम-जागरूक गतिशीलता संदर्भ",
        evWeatherDesc: "परिवेश का तापमान, अत्यधिक गर्मी और वर्षा बैटरी दक्षता और चार्जिंग मांग को प्रभावित करती है।",
        evWeatherLoading: "गतिशीलता संदर्भ लोड हो रहा है...",
        transitEyebrow: "शहरी गतिशीलता",
        transitTitle: "केवल वाहन नहीं, लोगों को चलाएं।",
        transitDesc: "सार्वजनिक परिवहन कनेक्टिविटी, बस नेटवर्क और मल्टीमॉडल पारगमन केंद्रों को समझें।",
        transitMetricIndex: "पारगमन सूचकांक",
        transitMetricEV: "ईवी एकीकरण",
        transitActive: "सक्रिय",
        transitMetricStops: "पारगमन स्टॉप",
        transitStopsNote: "OSM मैप किए गए",
        transitMetricSync: "रीयल-टाइम सिंक",
        transitLive: "लाइव",
        transitCardTitle: "कनेक्टेड स्मार्ट ट्रांजिट",
        transitCardDesc: "इकोसिटी एआई पारगमन अंतराल की पहचान करने और स्वच्छ पारगमन पहुंच में सुधार करने के लिए मौसम और ईवी हब को जोड़ता है।",
        weatherEyebrow: "मौसम एवं वायु गुणवत्ता",
        weatherTitle: "वायुमंडलीय परिस्थितियाँ शहर को आकार देती हैं।",
        weatherDesc: "लाइव मौसम विज्ञान और वायु गुणवत्ता सूचकांक सीधे शहर की बुद्धिमत्ता में एकीकृत हैं।",
        weatherCurrentLabel: "वर्तमान स्थिति",
        weatherHumidityLabel: "आर्द्रता (Humidity)",
        weatherWindLabel: "हवा की गति (Wind)",
        weatherAQILabel: "वायु गुणवत्ता (AQI)",
        forecastTitle: "5-दिवसीय मौसम एवं वर्षा का पूर्वानुमान",
        aiEyebrow: "इकोसिटी एआई सहायक",
        aiTitle: "अपने शहर से प्रश्न पूछें।",
        aiDesc: "लाइव मौसम, वायु गुणवत्ता (AQI), कचरा प्रबंधन, ईवी चार्जर्स या सौर क्षमता के बारे में पूछें।",
        aiWelcome: "नमस्ते! मैं रीयल-टाइम शहर डेटा से जुड़ा हूँ। मुझसे कचरा पृथक्करण, सौर पैनल चयन, ईवी चार्जिंग टिप्स या स्मार्ट सिटी बनाने के बारे में कुछ भी पूछें।",
        aiInputPlaceholder: "उदाहरण: गीला और सूखा कचरा कैसे अलग करें?",
        btnAskAI: "इकोसिटी एआई से पूछें",
        aiActiveStatus: "लाइव एआई इंटेलिजेंस",
        btnClearChat: "चैट साफ करें व नई बातचीत शुरू करें",
        btnClearChatText: "नई चैट",
        tryAsking: "यह पूछकर देखें",
        sug1: "यहाँ का मौसम और वायु गुणवत्ता कैसी है?",
        sug2: "घर पर कचरा पृथक्करण कैसे करें?",
        sug3: "छत के लिए कौन सा सोलर पैनल सही है?",
        sug4: "शहर को स्मार्ट सिटी कैसे बनाएं?",
        srcEyebrow: "पारदर्शिता और डेटा स्रोत",
        srcTitle: "जानें उत्तर कहाँ से आते हैं।",
        srcDesc: "सटीकता और वास्तविक दुनिया की सत्यापन क्षमता सीधे सिस्टम में अंतर्निहित है।",
        src1Title: "स्थान और भू-कोडिंग",
        src1Desc: "वैश्विक सटीकता के लिए ओपन-मेटियो और ओपनस्ट्रीटमैप नोमिनाटिम द्वारा संचालित।",
        src2Title: "मौसम और सौर विकिरण",
        src2Desc: "ओपन-मेटियो हाई-रिज़ॉल्यूशन पूर्वानुमान और सौर विकिरण एपीआई।",
        src3Title: "वायु गुणवत्ता एवं प्रदूषण",
        src3Desc: "ओपन-मेटियो वायु गुणवत्ता मॉडल से वास्तविक समय PM2.5, PM10 और AQI डेटा।",
        src4Title: "नगरपालिका और OSM अवसंरचना",
        src4Desc: "ओपनस्ट्रीटमैप से सीधे निकाले गए लाइव ईवी चार्जर्स और रीसाइक्लिंग केंद्र।",
        navResourceSaving: "संसाधन संरक्षण एवं पुन: उपयोग",
        resEyebrow: "संसाधन दक्षता एवं चक्रीय अर्थव्यवस्था",
        resTitle: "संसाधन बचाएं। सामग्री का पुन: उपयोग करें। अपशिष्ट समाप्त करें।",
        resDesc: "रोजमर्रा के परिवारों के साथ-साथ वाणिज्यिक उद्यमों और भारी उद्योगों के लिए व्यावहारिक चक्रीय उपाय और कैलकुलेटर।",
        selectViewMode: "दृष्टिकोण चुनें:",
        modeCitizen: "नागरिक एवं घरेलू मोड",
        modeIndustry: "वाणिज्यिक एवं औद्योगिक मोड",
        upcycleTitle: "सर्कुलर वस्तु पुन: उपयोग एवं अपसाइक्लिंग सहायक",
        upcycleDesc: "अपसाइक्लिंग के तरीके, शून्य-अपशिष्ट पुन: उपयोग और नए उत्पाद खरीदने से बचने के लिए कोई भी घरेलू वस्तु खोजें।",
        upcycleSearchPlaceholder: "वस्तु खोजें (जैसे पुरानी टी-शर्ट, कांच का जार, डिलीवरी बॉक्स, टायर, कॉफी...)",
        btnSearchReuse: "पुन: उपयोग योजना खोजें",
        popularItems: "लोकप्रिय:",
        upcycleHow: "पुन: उपयोग एवं अपसाइक्लिंग कैसे करें:",
        upcycleImpact: "पर्यावरणीय एवं वित्तीय लाभ:",
        hhCalcTitle: "घरेलू संसाधन एवं जल/ऊर्जा बचत कैलकुलेटर",
        hhCalcDesc: "अपने परिवार के वार्षिक वर्षा जल संचयन, जल संरक्षण, स्टैंडबाय बिजली बचत और जैविक खाद उत्पादन की गणना करें।",
        hhMembersLabel: "परिवार के सदस्य:",
        hhRoofAreaLabel: "छत का जल संचयन क्षेत्र (वर्ग फुट):",
        hhAeratorLabel: "लो-फ्लो एरेटर और इको नल:",
        optYesInstalled: "स्थापित (40% पानी की बचत)",
        optNoStandard: "साधारण नल",
        hhPhantomLabel: "फैंटम/स्टैंडबाय बिजली कटऑफ:",
        optYesSmartStrips: "हाँ (स्मार्ट स्ट्रिप्स का उपयोग)",
        optNoStandby: "नहीं (स्टैंडबाय पर उपकरण)",
        hhCompostLabel: "घरेलू जैविक खाद निर्माण:",
        optYesComposting: "हाँ (घरेलू कंपोस्टिंग)",
        optNoTrash: "नहीं (कचरे में फेंका गया)",
        resRainYield: "वर्षा जल संचयन",
        resRainNote: "भूजल पुनर्भरण क्षमता",
        resWaterSaved: "पानी की बचत",
        resWaterNote: "एरेटर व ग्रे-वाटर द्वारा",
        resPowerSaved: "ऊर्जा की बचत",
        resPowerNote: "स्टैंडबाय व लाइटिंग बचत",
        resCompostYield: "जैविक खाद",
        resCompostNote: "100% प्राकृतिक खाद",
        resCO2Saved: "कार्बन उत्सर्जन में कमी",
        resCO2Note: "बचाया गया GHG उत्सर्जन",
        resMoneySaved: "वार्षिक बिल बचत",
        resMoneyNote: "अनुमानित उपयोगिता बचत",
        hhPillar1Title: "सौर थर्मल वाटर हीटिंग",
        hhPillar1Desc: "2kW इलेक्ट्रिक गीजर को सोलर वाटर हीटर से बदलने पर प्रति वर्ष ~1,200 kWh की बचत होती है और 24-30 महीनों में लागत वसूल हो जाती है।",
        hhPillar2Title: "भूमिगत ग्रे-वाटर पुन: उपयोग",
        hhPillar2Desc: "वॉशिंग मशीन और आरओ रिजेक्ट पानी को बागवानी या फ्लशिंग में उपयोग करने से ताजे पानी की मांग 35% तक कम हो जाती है।",
        hhPillar3Title: "फैंटम पावर और स्मार्ट स्ट्रिप्स",
        hhPillar3Desc: "स्टैंडबाय इलेक्ट्रॉनिक्स 8-10% बिजली की खपत करते हैं। मास्टर स्विच स्ट्रिप्स इस गुप्त बिजली बर्बादी को पूरी तरह रोकते हैं।",
        symbiosisTitle: "औद्योगिक सहजीविता एवं सह-उत्पाद विनिमय निर्देशिका",
        symbiosisDesc: "औद्योगिक सहजीविता एक उद्योग के अपशिष्ट को दूसरे उद्योग के कच्चे माल में बदलती है।",
        indCalcTitle: "औद्योगिक संसाधन, जल (ZLD) एवं ESG कार्बन ऑडिट कैलकुलेटर",
        indCalcDesc: "प्लांट जल पुनर्चक्रण (ZLD), सौर ऊर्जा, अपशिष्ट ताप पुनर्प्राप्ति और स्कोप 1 व 2 कार्बन कटौती का मूल्यांकन करें।",
        indSectorLabel: "उद्योग क्षेत्र:",
        optSectorTextile: "कपड़ा एवं रंगाई इकाई",
        optSectorChemical: "रसायन एवं फार्मास्युटिकल",
        optSectorFood: "खाद्य, पेय एवं डिस्टिलरी",
        optSectorEngineering: "ऑटो एवं भारी इंजीनियरिंग",
        optSectorMetal: "फाउंड्री, स्टील एवं धातु विज्ञान",
        optSectorPaper: "कागज एवं पैकेजिंग",
        indWaterLabel: "दैनिक जल उपयोग (kL / दिन):",
        indRecycleLabel: "जल पुनर्प्राप्ति दर (ETP/RO/ZLD %):",
        indPowerLabel: "मासिक ग्रिड बिजली (MWh/माह):",
        indWHRSLabel: "अपशिष्ट ताप पुनर्प्राप्ति (WHRS/ORC):",
        optWHRSYes: "लागू (18% थर्मल पावर रिकवर)",
        optWHRSNo: "नहीं (गैस व्यर्थ निष्कासित)",
        indSolarLabel: "कैप्टिव इंडस्ट्रियल सोलर (kWp):",
        indWaterRecLabel: "पुनर्प्राप्त जल",
        indWaterRecNote: "प्रक्रिया में पुनर्चक्रण",
        indCleanPowerLabel: "उत्पादित स्वच्छ ऊर्जा",
        indCleanPowerNote: "सोलर व WHRS उत्पादन",
        indCarbonScopeLabel: "स्कोप 1 व 2 कार्बन कटौती",
        indCarbonScopeNote: "प्रमाणित बचाया गया उत्सर्जन",
        indFinancialLabel: "वार्षिक संसाधन बचत",
        indFinancialNote: "पानी, ईंधन व बिजली बचत",
        indISOLabel: "सर्कुलर स्कोर",
        indISONote: "ISO 50001 व ZWTL मानक",
        indPillar1Title: "जीरो लिक्विड डिस्चार्ज (ZLD)",
        indPillar1Desc: "आरओ और एमवीआर बाष्पीकरणकर्ता औद्योगिक अपशिष्ट जल का 95%+ पुनर्चक्रित करके शून्य जल रिसाव प्राप्त करते हैं।",
        indPillar2Title: "विशिष्ट ऊर्जा खपत (SEC) नियंत्रण",
        indPillar2Desc: "IE4 मोटर्स, VFD और IoT सब-मीटरिंग फैक्ट्री बिजली की खपत में 12-20% की कमी लाते हैं।",
        indPillar3Title: "शून्य अपशिष्ट लैंडफिल (ZWTL)",
        indPillar3Desc: "सीमेंट भट्टियों में गैर-पुनर्चक्रण योग्य अपशिष्ट को सह-प्रसंस्करण करके 100% लैंडफिल मुक्ति प्राप्त की जाती है।",
        navCarbonFootprint: "कार्बन पदचिह्न",
        wasteGapsTitle: "इस शहर को \"स्मार्ट सिटी\" बनने से रोकने वाली गंभीर कमियां",
        wasteGapsDesc: "स्मार्ट शहर 85% से अधिक कचरा लैंडफिल से बचाते हैं और शून्य डंपिंग यार्ड आग प्राप्त करते हैं। यहाँ मुख्य संरचनात्मक कमियां दी गई हैं:",
        wasteGap1Title: "अत्यधिक लैंडफिल निर्भरता एवं कचरे के पहाड़ों में आग",
        wasteGap1Desc: "45% से अधिक दैनिक ठोस कचरा बिना अलग किए खुले में डंप किया जाता है। अवायवीय अपघटन से मीथेन गैस बनती है जिससे अक्सर जहरीली आग लगती है।",
        wasteGap2Title: "स्रोत पर पृथक्करण एवं MRF संयंत्रों का अभाव",
        wasteGap2Desc: "जब घर स्तर पर गीला और सूखा कचरा मिल जाता है, तो प्लास्टिक और कागज अपनी 70% रीसाइक्लिंग गुणवत्ता खो देते हैं।",
        wasteGap3Title: "IoT स्मार्ट डस्टबिन एवं डायनामिक रूटिंग की कमी",
        wasteGap3Desc: "कचरा गाड़ियां डस्टबिन भरे होने की परवाह किए बिना पुराने तय रास्तों पर चलती हैं, जिससे ओवरफ्लो होता है और डीजल व्यर्थ होता है।",
        wasteGap4Title: "जहरीला लीचेट एवं भूजल प्रदूषण",
        wasteGap4Desc: "कचरे के ढेरों से रिसने वाला काला जहरीला पानी शहर के भूजल और पीने के पानी के स्रोतों को स्थायी रूप से दूषित कर रहा है।",
        transitCalcTitle: "सार्वजनिक परिवहन स्वच्छ वायु एवं जलवायु प्रभाव कैलकुलेटर",
        transitCalcDesc: "देखें कि सार्वजनिक परिवहन अपनाने से आप शहर की हवा को कितना साफ करते हैं, ग्लोबल वार्मिंग घटाते हैं और पैसे बचाते हैं।",
        transitKmLabel: "दैनिक आवागमन दूरी (km):",
        transitPrivateLabel: "आपका वर्तमान निजी वाहन:",
        optPetrolCar: "पेट्रोल कार (140g CO2/km)",
        optDieselCar: "डीजल कार/एसयूवी (170g CO2/km)",
        optBike: "पेट्रोल 2-व्हीलर (45g CO2/km)",
        transitAltLabel: "सार्वजनिक परिवहन विकल्प:",
        optMetro: "मेट्रो / सबवे ट्रेन (स्वच्छ ग्रिड)",
        optEBus: "शून्य-उत्सर्जन इलेक्ट्रिक बस",
        optCNGBus: "सीएनजी / हाइब्रिड सिटी बस",
        transitDaysLabel: "प्रति सप्ताह उपयोग के दिन:",
        transitCO2Reduced: "बचाया गया CO2",
        transitCO2Note: "प्रत्यक्ष ग्रीनहाउस गैस कटौती",
        transitSmogAvoided: "रोका गया स्मॉग / PM2.5",
        transitSmogNote: "सड़क किनारे का जहरीला धुआं",
        transitTrafficSaved: "बचाया गया ट्रैफिक समय",
        transitTrafficNote: "पीक-ऑवर जाम से मुक्ति",
        transitMoneySaved: "वार्षिक आवागमन बचत",
        transitMoneyNote: "ईंधन, पार्किंग व रखरखाव बचत",
        transitPillar1Title: "प्रति यात्री 82% कम कार्बन उत्सर्जन",
        transitPillar1Desc: "इलेक्ट्रिक मेट्रो और उच्च क्षमता वाली बसें निजी कारों की तुलना में प्रति किलोमीटर केवल 18% ग्रीनहाउस गैस उत्सर्जित करती हैं।",
        transitPillar2Title: "सड़क किनारे PM2.5 और NO2 का खात्मा",
        transitPillar2Desc: "एक मानक बस सड़क से 40 कारों को हटाती है, जिससे बच्चों द्वारा सांस लेने वाली जहरीली नाइट्रोजन डाइऑक्साइड में भारी कमी आती है।",
        transitPillar3Title: "शहरी हीट आइलैंड को ठंडा करना",
        transitPillar3Desc: "निजी कार इंजन और विशाल डामर पार्किंग शहर को गर्म करते हैं। सार्वजनिक परिवहन बढ़ने से पार्किंग स्थलों को हरित पार्कों में बदला जा सकता है।",
        cfEyebrow: "जलवायु प्रभाव एवं उत्सर्जन ट्रैकर",
        cfTitle: "अपने कार्बन पदचिह्न की गणना और कटौती करें",
        cfDesc: "परिवहन, घरेलू ऊर्जा, भोजन और अपशिष्ट में अपने वार्षिक ग्रीनहाउस गैस पदचिह्न को मापें और उच्च-प्रभाव वाले कदम उठाएं।",
        cfCalcTitle: "व्यापक व्यक्तिगत एवं घरेलू कार्बन कैलकुलेटर",
        cfCalcDesc: "IPCC उत्सर्जन मानकों और क्षेत्रीय ऊर्जा ग्रिड कार्बन तीव्रता पर आधारित रीयल-टाइम उत्सर्जन मॉडलिंग।",
        cfCommuteLabel: "दैनिक आवागमन दूरी (km):",
        cfTransportModeLabel: "प्राथमिक यात्रा माध्यम:",
        optCFPetrolCar: "पेट्रोल कार (मध्यम/सेडान)",
        optCFDieselCar: "डीजल एसयूवी / कार",
        optCFBike: "मोटरसाइकिल / स्कूटर",
        optCFEV: "इलेक्ट्रिक वाहन (EV)",
        optCFPublic: "मेट्रो ट्रेन / इलेक्ट्रिक बस",
        optCFBicycle: "साइकिल / पैदल (शून्य उत्सर्जन)",
        cfPowerLabel: "मासिक ग्रिड बिजली (kWh / यूनिट):",
        cfGasLabel: "मासिक एलपीजी सिलेंडर (14.2kg):",
        cfDietLabel: "खान-पान एवं आहार आदतें:",
        optCFVegan: "पौध-आधारित / वीगन (न्यूनतम पदचिह्न)",
        optCFVegetarian: "शाकाहारी (दूध, अनाज, सब्जियां)",
        optCFMixed: "संतुलित मिश्रित आहार (अंडा/मछली)",
        optCFHighMeat: "मांसाहारी (अधिक चिकन व मटन)",
        cfWasteLabel: "घरेलू कचरा पृथक्करण आदत:",
        optCFZeroWaste: "100% पृथक्करण व होम कंपोस्टिंग",
        optCFModerate: "मध्यम (केवल बोतल/कागज रीसायकल)",
        optCFNone: "कुछ नहीं (सब कचरा लैंडफिल में)",
        cfFlightsLabel: "वार्षिक हवाई यात्रा घंटे:",
        cfTotalLabel: "आपका वार्षिक कार्बन पदचिह्न",
        cfTotalNote: "कुल वार्षिक ग्रीनहाउस उत्सर्जन",
        cfStatusLabel: "तुलनात्मक रेटिंग",
        cfBenchmarkNote: "भारत: ~1.9T | वैश्विक: ~4.7T",
        cfTreesLabel: "आवश्यक पेड़ (न्यूट्रलाइज हेतु)",
        cfTreesNote: "1 वर्ष तक सोखने वाले पूर्ण विकसित पेड़",
        cfPotentialLabel: "अधिकतम कटौती क्षमता",
        cfPotentialNote: "पर्यावरण-अनुकूल आदतों से संभव",
        cfPlanTitle: "कार्बन 40–60% कम करने के शीर्ष 3 व्यक्तिगत उपाय:",
                diagHeaderTitle: "वायु प्रदूषक एवं WHO सुरक्षा मानक तुलना",
        diagHeaderDesc: "विश्व स्वास्थ्य संगठन (WHO) के सुरक्षित मानकों की तुलना में लाइव प्रदूषक माप।",
        pollutantChartTitle: "WHO सुरक्षित सीमा की तुलना में अनुपात (x-गुना)",
        atmDynTitle: "मौसम एवं स्मॉग निर्माण प्रक्रिया",
        atmDynDesc: "तापमान, हवा और नमी कैसे प्रदूषण को रोकते या साफ करते हैं।",
        dyn1Title: "धूप और गर्मी की प्रतिक्रिया",
        dyn1Desc: "तेज धूप और गर्मी गाड़ियों के धुएं को जहरीली ओजोन गैस में बदल देते हैं।",
        dyn2Title: "हवा की गति एवं ठहराव",
        dyn2Desc: "धीमी हवा जहरीले धुएं और धूल को जमीन के पास रोक लेती है।",
        dyn3Title: "नमी एवं धुंध का फैलाव",
        dyn3Desc: "हवा में अधिक नमी धूल-कणों से मिलकर घना स्मॉग बनाती है।",
        healthMapTitle: "मानव शरीर एवं फसलों पर प्रभाव",
        healthMapDesc: "प्रदूषक कण शरीर के अंगों और फसलों को कैसे प्रभावित करते हैं।",
        organLungsTitle: "फेफड़े और सांस नली (PM2.5)",
        organLungsDesc: "बारीक कण फेफड़ों की गहराई में जाकर सांस लेने में तकलीफ और ब्रोंकाइटिस पैदा करते हैं।",
        organHeartTitle: "दिल और रक्तप्रवाह",
        organHeartDesc: "प्रदूषक खून में मिलकर धमनियों में सूजन और दिल के दौरे का खतरा 20-35% बढ़ाते हैं।",
        organChildTitle: "बच्चे और बुजुर्ग",
        organChildDesc: "बच्चों में अस्थमा के दौरे बढ़ाता है और फेफड़ों की क्षमता कम करता है।",
        organCropsTitle: "फसलें और खेती",
        organCropsDesc: "ओजोन गैस पत्तियों को नुकसान पहुंचाकर गेहूं और धान की उपज 15-25% घटा देती है।",
        mitigationPipelineTitle: "हवा स्वच्छ करने की 4-चरणीय वैज्ञानिक योजना",
        mitigationPipelineDesc: "शहर की हवा साफ करने के आसान और प्रभावी कदम।",
        pipe1Title: "मिस्ट गन और वैक्यूम सफाई",
        pipe1Desc: "पानी का छिड़काव और मशीन से सफाई धूल को हवा में उड़ने से रोकती है।",
        pipe1Tag: "धूल नियंत्रण",
        pipe2Title: "100% इलेक्ट्रिक बसें",
        pipe2Desc: "डीजल बसों की जगह इलेक्ट्रिक बसें चलाने से सड़कों पर जहरीला धुआं खत्म होता है।",
        pipe2Tag: "शून्य धुआं",
        pipe3Title: "कारखानों की चिमनियों में फिल्टर",
        pipe3Desc: "वेट स्क्रबर्स और 24/7 सेंसर सल्फर और जहरीली गैसों को रोकते हैं।",
        pipe3Tag: "उद्योग नियंत्रण",
        pipe4Title: "सड़कों किनारे घने पेड़",
        pipe4Desc: "नीम और पीपल जैसे घने पेड़ हवा की धूल को प्राकृतिक रूप से छान लेते हैं।",
        pipe4Tag: "प्राकृतिक सुरक्षा कवच",
        forecastChartDesc: "तापमान, बारिश की संभावना और वायु स्थिरता का 5-दिवसीय ग्राफ।",
        areaWasteTitle: "हाइपर-लोकल क्षेत्र अपशिष्ट प्रबंधन योजनाकार",
        areaWasteDesc: "इस विशेष क्षेत्र के लिए विकेंद्रीकृत ऑन-साइट अपशिष्ट प्रसंस्करण, खाद उत्पादन, प्लास्टिक रिकवरी मूल्य और IoT स्मार्ट डिब्बे आवश्यकताओं का मॉडल बनाएं।",
        lblAreaArchetype: "क्षेत्र का प्रकार / भूमि उपयोग:",
        optResidential: "सघन आवासीय कॉलोनी (0.45 kg/व्यक्ति)",
        optCommercial: "वाणिज्यिक बाजार / सीबीडी (0.75 kg/इकाई)",
        optIndustrial: "औद्योगिक क्षेत्र / एस्टेट (1.20 kg/श्रमिक)",
        optInstitutional: "संस्थागत / टेक पार्क (0.35 kg/व्यक्ति)",
        lblAreaPop: "वार्ड/क्षेत्र में स्थानीय जनसंख्या या इकाइयां:",
        lblAreaSeg: "लक्षित स्रोत पृथक्करण दर (%):",
        areaBlueprintTitle: "इस इलाके के लिए 5-स्तंभीय व्यावहारिक अपशिष्ट प्रबंधन ब्लूप्रिंट",
        areaPillar1Title: "डोरस्टेप RFID स्रोत पृथक्करण",
        areaPillar1Desc: "हर घर पर 2-डस्टबिन-1-थैला पृथक्करण अनिवार्य, जिसे कचरा उठाने वाली गाड़ियों पर डिजिटल RFID स्कैनर से प्रमाणित किया जाए।",
        areaPillar2Title: "<500m विकेंद्रीकृत बायो-मीथेनेशन",
        areaPillar2Desc: "गीले कचरे को 500 मीटर के भीतर इन-वेसल कंपोस्टर और मिनी-बायोगैस में प्रोसेस करना, जिससे 90% ट्रांसपोर्ट डीज़ल बचे।",
        areaPillar3Title: "IoT अल्ट्रासोनिक लेवल डिब्बे",
        areaPillar3Desc: "इलाके के डिब्बों में सोलर सेंसर लगाना। 80% भरने पर ही अलर्ट भेजकर कलेक्शन गाड़ियां रवाना की जाएंगी।",
        areaPillar4Title: "वार्ड-स्तरीय MRF एवं प्लास्टिक बेलिंग",
        areaPillar4Desc: "उच्च-मूल्य PET प्लास्टिक, गत्ता और एल्यूमीनियम के लिए माध्यमिक छंटाई केंद्र, जिससे सीधे रीसाइक्लिंग राजस्व मिले।",
        areaPillar5Title: "ई-कचरा एवं खतरनाक अपशिष्ट कियोस्क",
        areaPillar5Desc: "पुरानी बैटरियों, इलेक्ट्रॉनिक्स और रसायनों के लिए सुरक्षित ड्रॉप-ऑफ बॉक्स और नागरिकों को टैक्स छूट व रिवार्ड अंक।",
        btnExportReport: "सिटी रिपोर्ट डाउनलोड करें",
        btnVoiceGuide: "वॉइस गाइड",
        navSimulation: "नीति सिमुलेटर",
        navScanner: "एआई कचरा व समस्या स्कैनर",
        healthIndexLabel: "शहर स्वास्थ्य सूचकांक",
        healthScoreSub: "लाइव बहु-प्रणाली समग्र स्कोर",
        advisoryTitle: "नागरिक स्वास्थ्य सलाह एवं गतिविधि मार्गदर्शन",
        btnListenAdvisory: "सुनें",
        simEyebrow: "नीति एवं जलवायु सिमुलेटर",
        simTitle: "\"क्या-यदि\" शहरी नीति एवं जलवायु सिमुलेशन",
        simDesc: "वास्तविक शहर के आधारभूत डेटा पर स्वच्छ ऊर्जा, ईवी बेड़े और शून्य-कचरा नीतियों के प्रभाव का मॉडल बनाएं।",
        simBadge: "इंटरैक्टिव फिजिक्स मॉडल",
        simControlsTitle: "नगरपालिका हस्तक्षेपों का सिमुलेशन करें",
        simControlsDesc: "पर्यावरणीय बचत, AQI सुधार और नगरपालिका बजट बचत का अनुमान लगाने के लिए नीचे दिए गए नीति स्तरों को समायोजित करें।",
        btnResetSim: "मूल स्थिति पर रीसेट करें",
        lever1Title: "☀️ रूफटॉप सोलर अनिवार्यता विस्तार (+MW)",
        lever1Note: "सभी वाणिज्यिक और संस्थागत छतों पर अनिवार्य सौर पैनल।",
        lever2Title: "⚡ नगरपालिका व बस बेड़े का ईवी में रूपांतरण (%)",
        lever2Note: "डीजल कचरा गाड़ियों, बसों और ऑटोरिक्शा को इलेक्ट्रिक में बदलना।",
        lever3Title: "♻️ स्रोत पर कचरा पृथक्करण एवं कंपोस्टिंग (%)",
        lever3Note: "घर-घर 2-डस्टबिन-1-थैला नियम जिससे गीला कचरा लैंडफिल जाने से बचे।",
        lever4Title: "🌳 शहरी हरित पट्टिका एवं सड़कों किनारे घने पेड़ (+%)",
        lever4Note: "धूल और पार्टिकुलेट कणों को सोखने के लिए मुख्य सड़कों पर पीपल व नीम के बायो-शील्ड।",
        simCO2Saved: "अनुमानित CO₂ बचत",
        simCO2Note: "स्वच्छ ऊर्जा + शून्य टेलपाइप धुआं",
        simAQIImprove: "अनुमानित AQI सुधार",
        simLandfillDivert: "लैंडफिल डायवर्जन",
        simLandfillNote: "डंपसाइट आग से बचाव",
        simFinSavings: "वार्षिक नगरपालिका बचत",
        simFinNote: "ईंधन, ग्रिड बिजली व लैंडफिल बचत",
        simChartTitle: "पर्यावरणीय प्रभाव प्रक्षेपण (आधारभूत बनाम सिम्युलेटेड नीति)",
        scanEyebrow: "एआई कंप्यूटर विजन",
        scanTitle: "मल्टीमॉडल नागरिक कचरा एवं समस्या स्कैनर",
        scanDesc: "घरेलू कचरे, सड़क क्षति या कचरा ओवरफ्लो की तस्वीरें अपलोड करें। तुरंत सामग्री वर्गीकरण पाएं और शहर के नक्शे पर रिपोर्ट दर्ज करें।",
        scanBadge: "जेमिनी विजन एआई",
        scanDropzoneTitle: "फोटो अपलोड करें या खींचें",
        scanDropzoneDesc: "कचरा संरचना का विश्लेषण करने या नागरिक समस्याओं की रिपोर्ट करने के लिए एक फोटो चुनें।",
        dropzonePrompt: "फोटो यहां खींचें या चुनने के लिए क्लिक करें",
        dropzoneFormats: "JPG, PNG, WEBP समर्थित (कैमरा सपोर्ट उपलब्ध)",
        btnSelectPhoto: "फोटो चुनें",
        btnAnalyzeAI: "विजन एआई से विश्लेषण करें",
        btnClearPhoto: "हटाएं",
        samplePhotos: "त्वरित परीक्षण नमूने:",
        scanResultTitle: "एआई निदान एवं व्यावहारिक मार्गदर्शन",
        scanResultDesc: "तुरंत सामग्री वर्गीकरण, खतरा सूचकांक और सही डस्टबिन मार्गदर्शन।",
        scannerAwaiting: "फोटो इनपुट की प्रतीक्षा",
        scannerAwaitingDesc: "तुरंत पृथक्करण सलाह देखने और ग्रीन पॉइंट्स अर्जित करने के लिए बाईं ओर एक फोटो चुनें।",
        btnPinMap: "जियोटैग करें व नक्शे पर लगाएं",
        footerText: "वास्तविक डेटा पहले। बहुभाषी बुद्धिमत्ता। कोई अनुमान नहीं।",
        footerBadge: "शून्य अनुमान • वास्तविक डेटा पहले",
        footerMission: "स्वायत्त स्मार्ट सिटी इंटेलिजेंस प्लेटफॉर्म जो रीयल-टाइम मौसम, जीआईएस और नगरपालिका डेटा को ठोस पर्यावरणीय कार्रवाई में बदलता है।",
        footerLiveStatus: "लाइव डेटा फीड सक्रिय (ओपन-मेटियो एवं ओएसएम)",
        footerColModules: "स्मार्ट इंटेलिजेंस मॉड्यूल",
        footerColData: "सत्यापित डेटा स्रोत",
        footerColGov: "पहुंच एवं वॉयस गाइड",
        footerVoiceNote: "सभी मॉड्यूल में हिंदी और अंग्रेजी दोनों भाषाओं में पूर्ण टेक्स्ट-टू-स्पीच वॉयस गाइड उपलब्ध है।",
        footerCopyText: "नगर निगम पर्यावरण निर्णय एवं इंटेलिजेंस सिस्टम"
    }
};

/* =========================================================
   HELPER UTILITIES
========================================================= */

function $(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const el = $(id);
    if (!el) return;
    el.textContent = (value === null || value === undefined || value === "") ? "—" : value;
}

function formatNumber(value) {
    if (value === null || value === undefined || value === "") return "—";
    const num = Number(value);
    if (Number.isNaN(num)) return String(value);
    return num.toLocaleString(currentLanguage === "hi" ? "hi-IN" : "en-IN");
}

function escapeHTML(value) {
    if (value === null || value === undefined) return "";
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function showMessage(msg, isError = false) {
    const el = $("searchMessage");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "#ad555b" : "#2f845c";
}

function getDayName(dateString, index) {
    if (index === 0) return currentLanguage === "hi" ? "आज" : "Today";
    if (index === 1) return currentLanguage === "hi" ? "कल" : "Tomorrow";
    const d = new Date(dateString);
    return d.toLocaleDateString(currentLanguage === "hi" ? "hi-IN" : "en-US", { weekday: "short" });
}

/* =========================================================
   MULTILINGUAL SWITCH
========================================================= */

function changeLanguage(lang) {
    currentLanguage = lang;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    localStorage.setItem("ecocityLanguage", lang);

    if (pollutantChartInstance) {
        pollutantChartInstance.destroy();
        pollutantChartInstance = null;
    }
    if (weatherTrendChartInstance) {
        weatherTrendChartInstance.destroy();
        weatherTrendChartInstance = null;
    }

    if (currentData) {
        updateLocationUI(currentData.location);
        updateWeatherUI(currentData.weather);
        updateAirQualityUI(currentData.air_quality);
        updateCityDataUI(currentData.city_data);
        updateHealthScoreUI(currentData.health_index, currentData.weather, currentData.air_quality);
        renderInsights(currentData.insights);
        updateEVWeatherInsight(currentData.weather);
        calculateSimulation();
    }

    // Refresh interactive calculators in new language
    calculateSolarYield();
    calculateEVSavings();
    checkWasteItem();
    searchUpcycleDirectory();
    calculateHouseholdSavings();
    calculateIndustrialResourceSavings();
    calculateTransitImpact();
    calculateCarbonFootprint();
    calculateAreaWastePlan();
}

/* =========================================================
   NAVIGATION
========================================================= */

function showSection(sectionId) {
    document.querySelectorAll(".page-section").forEach(sec => {
        sec.classList.remove("active-section");
    });

    const target = $(sectionId);
    if (target) {
        target.classList.add("active-section");
    }

    document.querySelectorAll(".nav-item").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.section === sectionId) {
            btn.classList.add("active");
        }
    });

    const mainContentEl = document.querySelector(".main-content");
    if (mainContentEl) {
        mainContentEl.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
        if (mainMap) mainMap.invalidateSize();
        if (evMap) evMap.invalidateSize();
    }, 150);
}

function setupNavigation() {
    document.querySelectorAll(".nav-item").forEach(btn => {
        btn.addEventListener("click", () => {
            showSection(btn.dataset.section);
        });
    });
}

/* =========================================================
   LEAFLET MAPS INTEGRATION
========================================================= */

function initializeMainMap(lat = 28.6692, lon = 77.4538) {
    const el = $("map");
    if (!el) return;

    if (mainMap) {
        mainMap.setView([lat, lon], 12);
        if (mainLocationMarker) mainLocationMarker.setLatLng([lat, lon]);
        return;
    }

    mainMap = L.map("map").setView([lat, lon], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mainMap);

    mainMarkersLayer = L.layerGroup().addTo(mainMap);
    mainLocationMarker = L.marker([lat, lon]).addTo(mainMap).bindPopup("Selected Location");
}

function initializeEVMap(lat = 28.6692, lon = 77.4538) {
    const el = $("evMap");
    if (!el) return;

    if (evMap) {
        evMap.setView([lat, lon], 12);
        if (evLocationMarker) evLocationMarker.setLatLng([lat, lon]);
        return;
    }

    evMap = L.map("evMap").setView([lat, lon], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(evMap);

    evMarkersLayer = L.layerGroup().addTo(evMap);
    evLocationMarker = L.marker([lat, lon]).addTo(evMap).bindPopup("Selected Location");
}

function updateMaps(lat, lon, name, osmData) {
    if (!mainMap) initializeMainMap(lat, lon);
    if (!evMap) initializeEVMap(lat, lon);

    mainMap.setView([lat, lon], 12);
    evMap.setView([lat, lon], 12);

    if (mainLocationMarker) {
        mainLocationMarker.setLatLng([lat, lon]).bindPopup(`<strong>${escapeHTML(name)}</strong>`).openPopup();
    }
    if (evLocationMarker) {
        evLocationMarker.setLatLng([lat, lon]).bindPopup(`<strong>${escapeHTML(name)}</strong>`);
    }

    if (mainMarkersLayer) mainMarkersLayer.clearLayers();
    if (evMarkersLayer) evMarkersLayer.clearLayers();

    const evStations = osmData?.ev_stations || currentData?.city_data?.ev_stations || [];
    evStations.forEach(st => {
        if (st.lat && st.lon) {
            const evIcon = L.circleMarker([st.lat, st.lon], {
                radius: 6,
                fillColor: "#2f845c",
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85
            }).bindPopup(`<strong>[EV] Charger Station</strong><br>${escapeHTML(st.name)}<br>Sockets: ${escapeHTML(st.socket || 'Type 2')}`);

            if (evMarkersLayer) evMarkersLayer.addLayer(evIcon);
            if (mainMarkersLayer) mainMarkersLayer.addLayer(evIcon);
        }
    });

    const recCenters = osmData?.recycling_centers || currentData?.city_data?.recycling_centers || [];
    recCenters.forEach(rc => {
        if (rc.lat && rc.lon) {
            const recIcon = L.circleMarker([rc.lat, rc.lon], {
                radius: 6,
                fillColor: "#426f96",
                color: "#ffffff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.85
            }).bindPopup(`<strong>[Recycle] Drop-off Point</strong><br>${escapeHTML(rc.name)}<br>Type: ${escapeHTML(rc.materials || 'General')}`);

            if (mainMarkersLayer) mainMarkersLayer.addLayer(recIcon);
        }
    });
}

/* =========================================================
   UI UPDATE FUNCTIONS (LIVE REAL DATA)
========================================================= */

function updateLocationUI(location) {
    if (!location) return;
    const name = location.name || "Selected Location";
    const locality = location.locality || name;
    const city = location.city || name;
    const state = location.admin1 || "";
    const country = location.country || "";
    const fullName = location.full_name || (state ? `${locality}, ${state}` : (country ? `${locality}, ${country}` : locality));
    const areaType = location.area_type || "residential";

    setText("selectedLocation", fullName);
    setText("topLocation", locality);
    setText("locationCoordinates", `${Number(location.latitude).toFixed(4)}°N, ${Number(location.longitude).toFixed(4)}°E`);

    // Update Archetype Badge
    const isHi = currentLanguage === "hi";
    const archetypeLabels = {
        residential: { en: "Residential Colony / Sector", hi: "आवासीय कॉलोनी / सेक्टर" },
        commercial: { en: "Commercial CBD / Market", hi: "वाणिज्यिक बाजार / सीबीडी" },
        industrial: { en: "Industrial Corridor / Estate", hi: "औद्योगिक क्षेत्र / एस्टेट" },
        institutional: { en: "Campus / Tech Park Hub", hi: "संस्थागत / टेक पार्क" },
        general_urban: { en: "Urban Ward / Locality", hi: "शहरी वार्ड / क्षेत्र" }
    };

    const typeInfo = archetypeLabels[areaType] || archetypeLabels.general_urban;
    const typeTag = $("locationAreaType");
    if (typeTag) typeTag.textContent = isHi ? typeInfo.hi : typeInfo.en;

    const detectedBadge = $("detectedArchetypeBadge");
    if (detectedBadge) detectedBadge.textContent = isHi ? typeInfo.hi : typeInfo.en;

    // Auto-align selector in Area Waste Planner if changed
    const sel = $("areaArchetypeSelect");
    if (sel && ["residential", "commercial", "industrial", "institutional"].includes(areaType)) {
        sel.value = areaType;
    }
    calculateAreaWastePlan();
}

/* =========================================================
   HYPER-LOCAL AREA WASTE PLANNER CALCULATOR
========================================================= */

function calculateAreaWastePlan() {
    const isHi = currentLanguage === "hi";
    const archetypeSelect = $("areaArchetypeSelect");
    const archetype = archetypeSelect ? archetypeSelect.value : "residential";
    const popInput = $("areaPopInput");
    const pop = Math.max(10, Number(popInput?.value || 5000));
    const segInput = $("areaSegregationRate");
    const segRate = Math.min(100, Math.max(10, Number(segInput?.value || 85))) / 100;

    // Archetype parameters based on CPCB / SWM Rules 2016
    let perCapitaKg = 0.45;
    let wetOrganicShare = 0.55;
    let dryRecycleShare = 0.30;
    let inertShare = 0.10;
    let hazardousShare = 0.05;

    if (archetype === "commercial") {
        perCapitaKg = 0.75;
        wetOrganicShare = 0.65;
        dryRecycleShare = 0.25;
        inertShare = 0.08;
        hazardousShare = 0.02;
    } else if (archetype === "industrial") {
        perCapitaKg = 1.20;
        wetOrganicShare = 0.25;
        dryRecycleShare = 0.50;
        inertShare = 0.15;
        hazardousShare = 0.10;
    } else if (archetype === "institutional") {
        perCapitaKg = 0.35;
        wetOrganicShare = 0.35;
        dryRecycleShare = 0.45;
        inertShare = 0.15;
        hazardousShare = 0.05;
    }

    const totalDailyKg = Math.round(pop * perCapitaKg);
    const totalMonthlyTon = ((totalDailyKg * 30) / 1000).toFixed(1);

    const wetDailyKg = totalDailyKg * wetOrganicShare;
    const compostMonthlyKg = Math.round(wetDailyKg * 30 * 0.22 * segRate); // 22% conversion from wet mass to cured compost
    const biogasMonthlyM3 = Math.round(wetDailyKg * 30 * 0.08 * segRate); // ~0.08 m3 biogas per kg organic waste

    const dryDailyKg = totalDailyKg * dryRecycleShare;
    const dryMonthlyKg = Math.round(dryDailyKg * 30 * segRate);
    const recycleRevINR = Math.round(dryMonthlyKg * 9.5); // avg blended polymer/fiber rate ~₹9.5/kg

    const smartBinsReq = Math.ceil(totalDailyKg / 180); // ~180kg capacity per paired IoT bin pair
    const co2AvoidedKgYear = Math.round(totalDailyKg * wetOrganicShare * 365 * 0.65 * segRate); // methane GWP avoided

    const resHolder = $("areaWasteResults");
    if (resHolder) {
        resHolder.innerHTML = `
            <div class="area-waste-card">
                <div class="area-waste-lbl">${isHi ? "दैनिक अपशिष्ट भार" : "DAILY GENERATION"}</div>
                <div class="area-waste-val">${totalDailyKg.toLocaleString(isHi ? "hi-IN" : "en-IN")} kg/day</div>
                <div class="area-waste-sub">${totalMonthlyTon} ${isHi ? "टन/माह कुल भार" : "Tonnes/month"}</div>
            </div>
            <div class="area-waste-card">
                <div class="area-waste-lbl">${isHi ? "ऑन-साइट जैविक खाद" : "COMPOST / BIOMETHANE"}</div>
                <div class="area-waste-val" style="color: var(--green);">${compostMonthlyKg.toLocaleString(isHi ? "hi-IN" : "en-IN")} kg/mo</div>
                <div class="area-waste-sub">${biogasMonthlyM3} m³ ${isHi ? "बायोगैस प्रति माह" : "clean biogas/mo"}</div>
            </div>
            <div class="area-waste-card">
                <div class="area-waste-lbl">${isHi ? "पुनर्चक्रण राजस्व क्षमता" : "RECYCLABLE VALUE"}</div>
                <div class="area-waste-val" style="color: #2b7a4b;">₹${recycleRevINR.toLocaleString(isHi ? "hi-IN" : "en-IN")}/mo</div>
                <div class="area-waste-sub">${dryMonthlyKg.toLocaleString(isHi ? "hi-IN" : "en-IN")} kg ${isHi ? "प्लास्टिक/गत्ता रिकवरी" : "polymer/fiber"}</div>
            </div>
            <div class="area-waste-card">
                <div class="area-waste-lbl">${isHi ? "IoT स्मार्ट बिन्स एवं CO₂ बचत" : "IOT BINS & CO₂ AVOIDED"}</div>
                <div class="area-waste-val" style="color: var(--navy);">${smartBinsReq} ${isHi ? "स्मार्ट बिन्स" : "IoT Units"}</div>
                <div class="area-waste-sub">${(co2AvoidedKgYear / 1000).toFixed(1)} T ${isHi ? "CO₂e लैंडफिल से बचाई" : "CO₂e avoided/yr"}</div>
            </div>
        `;
    }
}


/* =========================================================
   ATMOSPHERIC IMPACT & RISK DIAGNOSTICS (VISUAL CHARTS & METERS)
========================================================= */

function updateWeatherAirDiagnostics(weather, air_quality) {
    const isHi = currentLanguage === "hi";
    const currAQ = air_quality || currentData?.air_quality || {};
    const currW = weather?.current || currentData?.weather?.current || {};

    const pm25 = currAQ.pm2_5 !== undefined && currAQ.pm2_5 !== null ? Number(currAQ.pm2_5) : (currAQ.aqi ? Math.round(currAQ.aqi * 0.42) : 38);
    const pm10 = currAQ.pm10 !== undefined && currAQ.pm10 !== null ? Number(currAQ.pm10) : (currAQ.aqi ? Math.round(currAQ.aqi * 0.85) : 82);
    const no2 = currAQ.no2 !== undefined && currAQ.no2 !== null ? Number(currAQ.no2) : 28.5;
    const so2 = currAQ.so2 !== undefined && currAQ.so2 !== null ? Number(currAQ.so2) : 12.2;
    const co = currAQ.co !== undefined && currAQ.co !== null ? (Number(currAQ.co) / 1000).toFixed(2) : "0.75";
    const o3 = currAQ.o3 !== undefined && currAQ.o3 !== null ? Number(currAQ.o3) : 54;

    // 1. Update Visual Pollutant Progress Meters
    function updateMeter(name, val, limit, unit = "µg/m³") {
        const num = Number(val);
        const valEl = $(`val${name}`);
        const barEl = $(`meterBar${name}`);
        const badgeEl = $(`badge${name}`);

        if (valEl) valEl.textContent = `${num.toFixed(1)} ${unit}`;

        // Meter progress width (limit sits at ~35% of track)
        const ratio = num / limit;
        const widthPct = Math.min(100, Math.max(6, (ratio / 2.8) * 100));

        if (barEl) {
            barEl.style.width = `${widthPct}%`;
            if (ratio > 1.5) {
                barEl.style.background = "#dc2626";
            } else if (ratio > 1.0) {
                barEl.style.background = "#d97706";
            } else {
                barEl.style.background = "#16a34a";
            }
        }

        if (badgeEl) {
            if (ratio > 1.5) {
                badgeEl.className = "meter-badge excess";
                badgeEl.textContent = `${ratio.toFixed(1)}x WHO`;
            } else if (ratio > 1.0) {
                const excessPct = Math.round((ratio - 1) * 100);
                badgeEl.className = "meter-badge moderate";
                badgeEl.textContent = `+${excessPct}% ${isHi ? "अधिक" : "Excess"}`;
            } else {
                badgeEl.className = "meter-badge safe";
                badgeEl.textContent = isHi ? "सुरक्षित" : "Safe";
            }
        }

        return ratio;
    }

    const rPM25 = updateMeter("PM25", pm25, 15);
    const rPM10 = updateMeter("PM10", pm10, 45);
    const rNO2 = updateMeter("NO2", no2, 25);
    const rSO2 = updateMeter("SO2", so2, 40);
    const rCO = updateMeter("CO", Number(co), 4.0, "mg/m³");
    const rO3 = updateMeter("O3", o3, 100);

    // 2. Render / Update Chart.js Pollutant Comparison Chart
    renderPollutantChart([
        { label: "PM2.5", ratio: rPM25 },
        { label: "PM10", ratio: rPM10 },
        { label: "NO2", ratio: rNO2 },
        { label: "SO2", ratio: rSO2 },
        { label: "CO", ratio: rCO },
        { label: "O3", ratio: rO3 }
    ], isHi);

    // 3. Update Atmospheric Dynamics Infographic Nodes
    const temp = currW.temperature ?? 30;
    const wind = currW.wind_speed ?? 6;
    const hum = currW.humidity ?? 55;
    const irr = currW.solar_irradiance ?? 350;

    // Node 1: Solar & Heat Reaction
    setText("dynSolarVal", `${irr} W/m²`);
    setText("dynTempVal", `${temp}°C`);
    const solarStatus = $("dynSolarStatus");
    if (solarStatus) {
        if (temp > 32 && irr > 280) {
            solarStatus.className = "dyn-status-chip warning";
            solarStatus.textContent = isHi ? "तीव्र ओजोन निर्माण" : "Active Smog Catalyst";
        } else if (temp > 26) {
            solarStatus.className = "dyn-status-chip moderate";
            solarStatus.textContent = isHi ? "मध्यम प्रतिक्रिया" : "Moderate Heat Activity";
        } else {
            solarStatus.className = "dyn-status-chip good";
            solarStatus.textContent = isHi ? "स्थिर व सामान्य" : "Low Photochemical Risk";
        }
    }

    // Node 2: Wind & Boundary Stagnation
    setText("dynWindVal", `${wind} km/h`);
    setText("dynDispersionVal", wind < 8 ? (isHi ? "अवरुद्ध (Stagnant)" : "Trapped / Low") : (isHi ? "सक्रिय (Active)" : "Good Dispersion"));
    const windStatus = $("dynWindStatus");
    if (windStatus) {
        if (wind < 8) {
            windStatus.className = "dyn-status-chip warning";
            windStatus.textContent = isHi ? "थर्मल ठहराव (धुआं फंसा)" : "Inversion Trap Active";
        } else if (wind < 14) {
            windStatus.className = "dyn-status-chip moderate";
            windStatus.textContent = isHi ? "सामान्य फैलाव" : "Moderate Dispersion";
        } else {
            windStatus.className = "dyn-status-chip good";
            windStatus.textContent = isHi ? "सक्रिय वेंटिलेशन" : "Strong Ventilation";
        }
    }

    // Node 3: Humidity & Haze Growth
    setText("dynHumVal", `${hum}%`);
    setText("dynHazeVal", hum > 70 ? (isHi ? "उच्च (स्मॉग खतरा)" : "High Aerosol Swell") : (isHi ? "न्यूनतम" : "Clear / Dry"));
    const humStatus = $("dynHumStatus");
    if (humStatus) {
        if (hum > 70) {
            humStatus.className = "dyn-status-chip warning";
            humStatus.textContent = isHi ? "घना स्मॉग जोखिम" : "Dense Smog Risk";
        } else if (hum > 50) {
            humStatus.className = "dyn-status-chip moderate";
            humStatus.textContent = isHi ? "मध्यम आर्द्रता" : "Moderate Moisture";
        } else {
            humStatus.className = "dyn-status-chip good";
            humStatus.textContent = isHi ? "साफ व शुष्क वायु" : "Clean & Low Moisture";
        }
    }

    // 4. Update Biological Body Map Risk Badges
    function updateRiskBadge(id, level) {
        const el = $(id);
        if (!el) return;
        if (level === "high") {
            el.className = "organ-risk-badge risk-high";
            el.textContent = isHi ? "उच्च जोखिम" : "High Risk";
        } else if (level === "moderate") {
            el.className = "organ-risk-badge risk-moderate";
            el.textContent = isHi ? "मध्यम" : "Moderate";
        } else {
            el.className = "organ-risk-badge risk-safe";
            el.textContent = isHi ? "सुरक्षित" : "Low Risk";
        }
    }

    updateRiskBadge("riskLungsBadge", pm25 > 35 ? "high" : (pm25 > 15 ? "moderate" : "safe"));
    updateRiskBadge("riskHeartBadge", (currAQ.aqi > 150 || Number(co) > 2.0) ? "high" : (currAQ.aqi > 90 ? "moderate" : "safe"));
    updateRiskBadge("riskChildBadge", (pm25 > 30 || no2 > 35) ? "high" : "moderate");
    updateRiskBadge("riskCropsBadge", o3 > 80 ? "high" : (o3 > 50 ? "moderate" : "safe"));
}

function renderPollutantChart(dataList, isHi) {
    if (typeof Chart === "undefined") return;
    const canvas = $("pollutantBarChart");
    if (!canvas) return;

    const labels = dataList.map(d => d.label);
    const ratios = dataList.map(d => Number(d.ratio.toFixed(2)));
    const colors = ratios.map(r => r > 1.5 ? "#dc2626" : (r > 1.0 ? "#d97706" : "#16a34a"));

    if (pollutantChartInstance) {
        pollutantChartInstance.data.labels = labels;
        pollutantChartInstance.data.datasets[0].data = ratios;
        pollutantChartInstance.data.datasets[0].backgroundColor = colors;
        pollutantChartInstance.update();
        return;
    }

    const ctx = canvas.getContext("2d");
    pollutantChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: isHi ? "WHO मानक की तुलना (x-गुना)" : "x-Ratio to WHO Limit",
                    data: ratios,
                    backgroundColor: colors,
                    borderRadius: 5,
                    barPercentage: 0.65
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (ctx) {
                            const val = ctx.parsed.y;
                            return `${val}x WHO Safe Limit (${val >= 1.0 ? '+' + Math.round((val - 1) * 100) + '% Excess' : 'Safe'})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 3.0,
                    grid: { color: "#edf2ee" },
                    ticks: {
                        callback: function (val) {
                            return val === 1 ? "1.0x (WHO)" : `${val}x`;
                        },
                        font: { size: 10 }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11, weight: "bold" } }
                }
            }
        }
    });
}


function updateWeatherUI(weather) {
    updateWeatherAirDiagnostics(weather, currentData?.air_quality);
    if (!weather) return;
    const curr = weather.current || {};
    const cond = curr.condition || "Clear";
    const temp = curr.temperature !== undefined ? `${curr.temperature}°C` : "—";

    setText("weatherCondition", cond);
    setText("weatherTemperature", temp);
    setText("weatherHumidity", `${currentLanguage === "hi" ? "आर्द्रता" : "Humidity"} ${curr.humidity ?? "—"}%`);
    setText("weatherWind", `${currentLanguage === "hi" ? "हवा" : "Wind"} ${curr.wind_speed ?? "—"} km/h`);

    setText("weatherPageTemperature", temp);
    setText("weatherPageCondition", cond);
    setText("weatherPageTime", curr.time ? `${currentLanguage === "hi" ? "अपडेट:" : "Updated:"} ${curr.time.replace('T', ' ')}` : "Live API");
    setText("weatherPageHumidity", `${curr.humidity ?? "—"}%`);
    setText("weatherPageWind", `${curr.wind_speed ?? "—"} km/h`);

    renderForecast(weather.daily || {});
}

function updateAirQualityUI(aqi) {
    updateWeatherAirDiagnostics(currentData?.weather, aqi);
    if (!aqi) return;
    const val = aqi.aqi ?? 45;
    const cat = currentLanguage === "hi" ? (aqi.category_hi || "मध्यम") : (aqi.category_en || "Moderate");

    setText("topAQI", `AQI ${val}`);
    const topEl = $("topAQI");
    if (topEl && aqi.color) topEl.style.color = aqi.color;

    setText("weatherPageAQI", String(val));
    setText("weatherPageAQICat", cat);

    const aqiCardVal = $("weatherPageAQI");
    if (aqiCardVal && aqi.color) aqiCardVal.style.color = aqi.color;

    setText("evAirImpact", `AQI ${val} (${cat})`);
}

function renderForecast(daily) {
    const isHi = currentLanguage === "hi";
    const holder = $("weatherForecast");
    if (holder) holder.innerHTML = "";

    const times = daily.time || [];
    const maxT = daily.max_temp || [];
    const minT = daily.min_temp || [];
    const rain = daily.rain || [];
    const rainP = daily.rain_probability || [];

    // Render 5-Day Card Grid
    if (holder) {
        times.forEach((dateStr, idx) => {
            const dayLabel = getDayName(dateStr, idx);
            const max = maxT[idx] !== undefined ? `${maxT[idx]}°` : "—";
            const min = minT[idx] !== undefined ? `${minT[idx]}°` : "—";
            const rVal = rain[idx] !== undefined ? rain[idx] : 0;
            const pVal = rainP[idx] !== undefined ? rainP[idx] : 0;

            const item = document.createElement("div");
            item.className = "forecast-item";
            item.innerHTML = `
                <div class="forecast-day">${escapeHTML(dayLabel)}</div>
                <div class="forecast-temperature">${escapeHTML(max)} / <span style="font-size: 13px; color: var(--text-light);">${escapeHTML(min)}</span></div>
                <div class="forecast-rain">
                    ${isHi ? "वर्षा:" : "Rain:"} ${escapeHTML(String(rVal))} mm<br>
                    ${isHi ? "संभावना:" : "Chance:"} ${escapeHTML(String(pVal))}%
                </div>
            `;
            holder.appendChild(item);
        });
    }

    // Render / Update Chart.js Weather Trend Line Graph
    renderWeatherTrendChart(times, maxT, minT, rainP, isHi);
}

function renderWeatherTrendChart(times, maxT, minT, rainP, isHi) {
    if (typeof Chart === "undefined") return;
    const canvas = $("weatherTrendChart");
    if (!canvas || !times.length) return;

    const dayLabels = times.map((d, i) => getDayName(d, i));

    if (weatherTrendChartInstance) {
        weatherTrendChartInstance.data.labels = dayLabels;
        weatherTrendChartInstance.data.datasets[0].data = maxT;
        weatherTrendChartInstance.data.datasets[1].data = minT;
        weatherTrendChartInstance.data.datasets[2].data = rainP;
        weatherTrendChartInstance.update();
        return;
    }

    const ctx = canvas.getContext("2d");
    weatherTrendChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: dayLabels,
            datasets: [
                {
                    label: isHi ? "अधिकतम तापमान (°C)" : "Max Temp (°C)",
                    data: maxT,
                    borderColor: "#d97706",
                    backgroundColor: "rgba(217, 119, 6, 0.1)",
                    borderWidth: 2.5,
                    tension: 0.35,
                    pointRadius: 4,
                    pointBackgroundColor: "#d97706",
                    yAxisID: "yTemp"
                },
                {
                    label: isHi ? "न्यूनतम तापमान (°C)" : "Min Temp (°C)",
                    data: minT,
                    borderColor: "#2563eb",
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderDash: [4, 4],
                    tension: 0.35,
                    pointRadius: 3,
                    pointBackgroundColor: "#2563eb",
                    yAxisID: "yTemp"
                },
                {
                    type: "bar",
                    label: isHi ? "वर्षा की संभावना (%)" : "Rain Chance (%)",
                    data: rainP,
                    backgroundColor: "rgba(16, 185, 129, 0.25)",
                    borderColor: "#10b981",
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.45,
                    yAxisID: "yRain"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: { boxWidth: 12, font: { size: 10 } }
                }
            },
            scales: {
                yTemp: {
                    type: "linear",
                    position: "left",
                    grid: { color: "#edf2ee" },
                    ticks: {
                        callback: val => `${val}°C`,
                        font: { size: 10 }
                    }
                },
                yRain: {
                    type: "linear",
                    position: "right",
                    suggestedMax: 100,
                    grid: { display: false },
                    ticks: {
                        callback: val => `${val}%`,
                        font: { size: 10 }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                }
            }
        }
    });
}

function updateCityDataUI(cityData) {
    if (!cityData) return;

    setText("dashboardWaste", `${formatNumber(cityData.waste_kg_day)} kg`);
    setText("dashboardRecycling", `${cityData.recycling_share ?? "35"}%`);
    setText("dashboardEV", formatNumber(cityData.ev_chargers));
    setText("dashboardSolar", `${cityData.solar_mw ?? "120"} MW`);

    setText("wasteTotal", `${formatNumber(cityData.waste_kg_day)} kg`);
    setText("wasteOrganic", `${cityData.organic_share ?? "50"}%`);
    setText("wastePlastic", `${cityData.plastic_share ?? "18"}%`);
    setText("wasteLandfill", `${cityData.landfilled_share ?? "40"}%`);

    setText("recycleRate", `${cityData.recycling_share ?? "35"}%`);
    setText("recyclePlastic", `${cityData.plastic_share ?? "18"}%`);
    setText("recyclePaper", `${cityData.paper_share ?? "14"}%`);
    setText("recycleFacilitiesCount", formatNumber(cityData.recycling_centers?.length || 4));

    setText("energySolar", `${cityData.solar_mw ?? "120"} MW`);
    setText("energyIrradiance", `${cityData.solar_irradiance ?? "450"} W/m²`);
    setText("energySunshine", "7.5 hrs");

    setText("evChargers", formatNumber(cityData.ev_chargers));
    setText("evTransit", `${cityData.public_transport_index ?? "75"}%`);

    setText("transportIndex", `${cityData.public_transport_index ?? "75"}%`);
    setText("transitStopsCount", formatNumber(cityData.transit_stops || 28));

    const statusBadge = $("cityDataStatus");
    if (statusBadge) {
        statusBadge.textContent = "LIVE API DATA";
        statusBadge.className = "data-badge live";
    }
}

function renderInsights(insights) {
    const holder = $("cityInsights");
    if (!holder) return;
    holder.innerHTML = "";

    if (!insights || insights.length === 0) {
        holder.innerHTML = `<div class="insight-loading">${currentLanguage === "hi" ? "कोई अतिरिक्त चेतावनी नहीं है।" : "All systems normal."}</div>`;
        return;
    }

    insights.forEach(item => {
        const card = document.createElement("div");
        card.className = "insight-card";
        card.innerHTML = `
            <div class="area">${escapeHTML(item.area)}</div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.text)}</p>
        `;
        holder.appendChild(card);
    });
}

function updateEVWeatherInsight(weather) {
    const box = $("evWeatherInsight");
    if (!box || !weather) return;
    const curr = weather.current || {};
    const cond = curr.condition || "Clear";
    const temp = curr.temperature !== undefined ? `${curr.temperature}°C` : "";

    if (currentLanguage === "hi") {
        box.innerHTML = `
            <strong>मौसम का प्रभाव:</strong>
            <span>वर्तमान मौसम ${escapeHTML(cond)} (${escapeHTML(temp)}) है। बैटरी तापमान नियंत्रण और चार्जिंग शेड्यूल के लिए मौसम अनुकूल है।</span>
        `;
    } else {
        box.innerHTML = `
            <strong>WEATHER CONTEXT:</strong>
            <span>Current condition is ${escapeHTML(cond)} ${temp ? `at ${escapeHTML(temp)}` : ""}. Moderate conditions allow optimal EV battery operating efficiency.</span>
        `;
    }
}

/* =========================================================
   INTERACTIVE RECYCLING SEGREGATION ASSISTANT
========================================================= */

const WASTE_ITEMS_DB = {
    "plastic bottle": {
        bin: "blue",
        category_en: "Dry Recyclable Waste",
        category_hi: "सूखा पुनर्चक्रण योग्य कचरा",
        bin_en: "Blue Bin (Dry)",
        bin_hi: "नीला डस्टबिन (सूखा)",
        decomp_en: "450 - 500 Years",
        decomp_hi: "450 - 500 वर्ष",
        tip_en: "Empty, rinse out liquids, crush to save space, and leave the plastic cap on.",
        tip_hi: "बोतल खाली करें, पानी से धो लें, पिचकाकर नीले डिब्बे में डालें।"
    },
    "food leftovers": {
        bin: "green",
        category_en: "Wet / Organic Compostable Waste",
        category_hi: "गीला / जैविक खाद योग्य कचरा",
        bin_en: "Green Bin (Wet)",
        bin_hi: "हरा डस्टबिन (गीला)",
        decomp_en: "2 - 4 Weeks",
        decomp_hi: "2 - 4 सप्ताह",
        tip_en: "Directly compostable into nutrient-rich organic soil fertilizer. Keep free from plastic wrappers.",
        tip_hi: "जैविक खाद बनाने के लिए सबसे उत्तम। प्लास्टिक से अलग रखें।"
    },
    "lithium battery": {
        bin: "red",
        category_en: "Hazardous / E-Waste",
        category_hi: "खतरनाक ई-कचरा",
        bin_en: "Red / E-Waste Drop-off",
        bin_hi: "लाल / ई-कचरा संग्रह केंद्र",
        decomp_en: "Non-biodegradable (Toxic)",
        decomp_hi: "गैर-बायोडिग्रेडेबल (विषाक्त)",
        tip_en: "Contains toxic heavy metals (Cobalt, Lithium). Never throw into general municipal bins.",
        tip_hi: "विषाक्त धातुएं होती हैं। इसे सामान्य कचरे में न फेंकें, ई-कचरा केंद्र में दें।"
    },
    "cardboard box": {
        bin: "blue",
        category_en: "Paper & Fiber Recyclable",
        category_hi: "कागज व गत्ता पुनर्चक्रण",
        bin_en: "Blue Bin (Dry)",
        bin_hi: "नीला डस्टबिन (सूखा)",
        decomp_en: "2 - 3 Months",
        decomp_hi: "2 - 3 महीने",
        tip_en: "Flatten the box and remove plastic tape/packing thermocol before discarding.",
        tip_hi: "गत्ते को चपटा करें और प्लास्टिक टेप हटाकर नीले डिब्बे में डालें।"
    },
    "glass jar": {
        bin: "blue",
        category_en: "Inert Recyclable Glass",
        category_hi: "कांच पुनर्चक्रण",
        bin_en: "Blue Bin (Glass / Dry)",
        bin_hi: "नीला डस्टबिन (कांच)",
        decomp_en: "1 Million+ Years (100% Recyclable)",
        decomp_hi: "लाखों वर्ष (100% रिसाइकिल योग्य)",
        tip_en: "Glass is infinitely recyclable without loss in quality. Rinse clean before disposal.",
        tip_hi: "कांच को बार-बार रिसाइकिल किया जा सकता है। धोकर नीले डिब्बे में रखें।"
    },
    "expired medicine": {
        bin: "yellow",
        category_en: "Bio-medical / Domestic Hazardous",
        category_hi: "घरेलू खतरनाक कचरा",
        bin_en: "Yellow / Pharmacy Drop-off",
        bin_hi: "पीला डस्टबिन / फार्मेसी ड्रॉप",
        decomp_en: "Chemical Hazard",
        decomp_hi: "रासायनिक खतरा",
        tip_en: "Never flush down drains to prevent water contamination. Hand over to pharmacy take-back boxes.",
        tip_hi: "दवाइयों को नाली में न बहाएं। नजदीकी मेडिकल स्टोर या पीले बैग में दें।"
    },
    "milk pouch": {
        bin: "blue",
        category_en: "High-Density Polyethylene (LDPE/HDPE)",
        category_hi: "रीसाइकिलेबल प्लास्टिक पाउच",
        bin_en: "Blue Bin (Dry)",
        bin_hi: "नीला डस्टबिन (सूखा)",
        decomp_en: "100 - 300 Years",
        decomp_hi: "100 - 300 वर्ष",
        tip_en: "Cut straight across, do not snip off tiny corners that get lost in sorting, wash and dry.",
        tip_hi: "छोटा कोना अलग न काटें, थैली को धोकर सुखाकर नीले डिब्बे में डालें।"
    }
};

async function checkWasteItem(itemName = null) {
    const input = $("wasteItemInput");
    const itemQuery = (itemName || (input ? input.value.trim() : "Plastic Bottle") || "Plastic Bottle").trim();
    const resHolder = $("segregationResult");
    if (!resHolder) return;

    const isHi = currentLanguage === "hi";

    // Immediate loading state
    resHolder.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted);">
            <div class="spinner" style="display:inline-block; margin-bottom: 6px;"></div>
            <div style="font-weight: 600; font-size: 13.5px; color: var(--navy);">${isHi ? "AI सामग्री एवं पृथक्करण विश्लेषण जारी है..." : "AI is analyzing material composition & segregation protocol..."}</div>
        </div>
    `;

    try {
        const res = await fetch(`${API_BASE}/api/check-waste-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: itemQuery, language: currentLanguage })
        });

        if (res.ok) {
            const data = await res.json();
            const binClass = (data.bin || "blue").toLowerCase();
            const binText = isHi ? (data.bin_hi || data.bin_en) : (data.bin_en || data.bin_hi);
            const catText = isHi ? (data.category_hi || data.category_en) : (data.category_en || data.category_hi);
            const decompText = isHi ? (data.decomp_hi || data.decomp_en) : (data.decomp_en || data.decomp_hi);
            const tipText = isHi ? (data.tip_hi || data.tip_en) : (data.tip_en || data.tip_hi);

            resHolder.innerHTML = `
                <div class="seg-header">
                    <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: var(--navy);">${escapeHTML(data.name || itemQuery)}</h4>
                    <span class="bin-badge bin-${binClass}">
                        ${escapeHTML(binText)}
                    </span>
                </div>
                <div class="seg-grid">
                    <div class="seg-box">
                        <strong>${isHi ? "श्रेणी" : "CATEGORY"}</strong>
                        <span>${escapeHTML(catText)}</span>
                    </div>
                    <div class="seg-box">
                        <strong>${isHi ? "अपघटन समय" : "DECOMPOSITION TIME"}</strong>
                        <span>${escapeHTML(decompText)}</span>
                    </div>
                    <div class="seg-box" style="grid-column: 1 / -1;">
                        <strong>${isHi ? "उचित निपटान और रीसाइक्लिंग निर्देश" : "DISPOSAL & RECYCLING INSTRUCTIONS"}</strong>
                        <span>${escapeHTML(tipText)}</span>
                    </div>
                </div>
            `;
            return;
        }
    } catch (err) {
        console.warn("Waste check API error:", err);
    }

    // Local smart fallback if server unreachable
    const q = itemQuery.toLowerCase().trim();
    let match = null;
    for (const key in WASTE_ITEMS_DB) {
        if (q.includes(key) || key.includes(q)) {
            match = { name: itemQuery, ...WASTE_ITEMS_DB[key] };
            break;
        }
    }

    if (!match) {
        const isEWaste = /laptop|phone|computer|battery|cable|charger|screen|tv|microwave|pcb|electronic/i.test(q);
        const isOrganic = /food|peel|vegetable|fruit|leaf|tea|coffee|bread|leftover|compost/i.test(q);
        const isHazard = /medicine|paint|chemical|pill|syringe|mask|oil|acid/i.test(q);

        match = {
            name: itemQuery,
            bin: isEWaste ? "red" : (isOrganic ? "green" : (isHazard ? "yellow" : "blue")),
            category_en: isEWaste ? "Hazardous E-Waste" : (isOrganic ? "Organic Kitchen Biomass" : (isHazard ? "Bio-Medical / Chemical Hazard" : "Dry Recyclable Material")),
            category_hi: isEWaste ? "खतरनाक ई-कचरा" : (isOrganic ? "जैविक रसोई अपशिष्ट" : (isHazard ? "बायो-मेडिकल अपशिष्ट" : "सूखा पुनर्चक्रण योग्य")),
            bin_en: isEWaste ? "Red / E-Waste Drop-off" : (isOrganic ? "Green Bin (Wet)" : (isHazard ? "Yellow Bin / Medical Drop" : "Blue Bin (Dry Recyclables)")),
            bin_hi: isEWaste ? "लाल / ई-कचरा संग्रह" : (isOrganic ? "हरा डस्टबिन (गीला)" : (isHazard ? "पीला डस्टबिन (मेडिकल)" : "नीला डस्टबिन (सूखा)")),
            decomp_en: isEWaste ? "500+ Years (Toxic)" : (isOrganic ? "2 - 6 Weeks" : (isHazard ? "Incineration Required" : "100 - 400 Years")),
            decomp_hi: isEWaste ? "500+ वर्ष (विषाक्त)" : (isOrganic ? "2 - 6 सप्ताह" : (isHazard ? "भस्मीकरण आवश्यक" : "100 - 400 वर्ष")),
            tip_en: isEWaste ? "Hand over to certified e-waste centers to recover copper/cobalt and prevent toxic leaching." : (isOrganic ? "Deposit into Green compost bin or domestic composter." : "Rinse clean, keep dry, and place into Blue Bin for secondary MRF sorting."),
            tip_hi: isEWaste ? "तांबा और लिथियम की सुरक्षित रीसाइक्लिंग के लिए ई-वेस्ट सेंटर में दें।" : (isOrganic ? "हरे डस्टबिन में डालें या घर पर खाद बनाएं।" : "धोकर सूखा रखें और नीले डस्टबिन में डालें।")
        };
    }

    resHolder.innerHTML = `
        <div class="seg-header">
            <h4 style="margin: 0; font-size: 15px; font-weight: 800; color: var(--navy);">${escapeHTML(match.name)}</h4>
            <span class="bin-badge bin-${match.bin}">
                ${escapeHTML(isHi ? match.bin_hi : match.bin_en)}
            </span>
        </div>
        <div class="seg-grid">
            <div class="seg-box">
                <strong>${isHi ? "श्रेणी" : "CATEGORY"}</strong>
                <span>${escapeHTML(isHi ? match.category_hi : match.category_en)}</span>
            </div>
            <div class="seg-box">
                <strong>${isHi ? "अपघटन समय" : "DECOMPOSITION TIME"}</strong>
                <span>${escapeHTML(isHi ? match.decomp_hi : match.decomp_en)}</span>
            </div>
            <div class="seg-box" style="grid-column: 1 / -1;">
                <strong>${isHi ? "उचित निपटान और रीसाइक्लिंग निर्देश" : "DISPOSAL & RECYCLING INSTRUCTIONS"}</strong>
                <span>${escapeHTML(isHi ? match.tip_hi : match.tip_en)}</span>
            </div>
        </div>
    `;
}

/* =========================================================
   SOLAR AREA & DEGRADATION CALCULATOR
========================================================= */

function calculateSolarYield(roofAreaVal = null) {
    const input = $("roofAreaInput");
    const area = roofAreaVal || (input ? Number(input.value) : 500) || 500;
    const resHolder = $("solarCalcResult");
    if (!resHolder) return;

    const capacityKW = (area / 100).toFixed(1);
    const monthlyUnitsKWh = Math.round(capacityKW * 4.2 * 30);
    const monthlySavingsINR = Math.round(monthlyUnitsKWh * 7.5);
    const annualSavingsINR = monthlySavingsINR * 12;

    const isHi = currentLanguage === "hi";

    resHolder.innerHTML = `
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "सिफारिश क्षमता" : "RECOMMENDED CAPACITY"}</div>
            <div class="calc-val">${capacityKW} kW</div>
        </div>
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "मासिक बिजली उत्पादन" : "MONTHLY GENERATION"}</div>
            <div class="calc-val">${monthlyUnitsKWh} kWh</div>
        </div>
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "अनुमानित वार्षिक बचत" : "ANNUAL BILL SAVINGS"}</div>
            <div class="calc-val" style="color: var(--green);">₹${annualSavingsINR.toLocaleString("en-IN")}</div>
        </div>
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "अनुशंसित सफाई अंतराल" : "CLEANING SCHEDULE"}</div>
            <div class="calc-val" style="font-size: 14px;">${isHi ? "प्रत्येक 14 दिन (धूल निवारण)" : "Bi-Weekly (Dust Wash)"}</div>
        </div>

        <div style="grid-column: 1 / -1; margin-top: 10px;">
            <strong style="font-size: 11.5px; color: var(--navy); display: block; margin-bottom: 5px;">
                ${isHi ? "25-वर्षीय सोलर दक्षता क्षरण अनुमान (Degradation Curve)" : "25-Year Photovoltaic Efficiency Degradation Forecast"}
            </strong>
            <table class="degradation-table">
                <thead>
                    <tr>
                        <th>${isHi ? "वर्ष" : "Year"}</th>
                        <th>${isHi ? "दक्षता अवधारण" : "Efficiency Retained"}</th>
                        <th>${isHi ? "मासिक उत्पादन" : "Monthly Output"}</th>
                        <th>${isHi ? "वारंटी स्थिति" : "Warranty Status"}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Year 1</td><td>98.0%</td><td>${Math.round(monthlyUnitsKWh * 0.98)} kWh</td><td><span style="color: var(--green);">Peak Performance</span></td></tr>
                    <tr><td>Year 5</td><td>95.5%</td><td>${Math.round(monthlyUnitsKWh * 0.955)} kWh</td><td><span style="color: var(--green);">Standard Yield</span></td></tr>
                    <tr><td>Year 10</td><td>92.0%</td><td>${Math.round(monthlyUnitsKWh * 0.92)} kWh</td><td><span style="color: var(--green);">Optimal Retention</span></td></tr>
                    <tr><td>Year 15</td><td>88.5%</td><td>${Math.round(monthlyUnitsKWh * 0.885)} kWh</td><td><span style="color: var(--amber);">Stable Generation</span></td></tr>
                    <tr><td>Year 20</td><td>85.0%</td><td>${Math.round(monthlyUnitsKWh * 0.85)} kWh</td><td><span style="color: var(--amber);">High Yield</span></td></tr>
                    <tr><td>Year 25</td><td>81.5%</td><td>${Math.round(monthlyUnitsKWh * 0.815)} kWh</td><td><span style="color: var(--green);">Tier-1 Standard (80%+ Limit)</span></td></tr>
                </tbody>
            </table>
        </div>
    `;
}

/* =========================================================
   SMART EV COST & CO2 SAVINGS CALCULATOR
========================================================= */

function calculateEVSavings(dailyKmVal = null) {
    const input = $("dailyKmInput");
    const km = dailyKmVal || (input ? Number(input.value) : 40) || 40;
    const resHolder = $("evCalcResult");
    if (!resHolder) return;

    const monthlyKm = km * 30;
    const petrolCostMonthly = Math.round((monthlyKm / 15) * 100);
    const evElectricityCostMonthly = Math.round((monthlyKm / 7) * 7.5);
    const monthlySavings = petrolCostMonthly - evElectricityCostMonthly;
    const annualSavings = monthlySavings * 12;
    const co2OffsetKg = Math.round(monthlyKm * 0.12);

    const isHi = currentLanguage === "hi";

    resHolder.innerHTML = `
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "पेट्रोल मासिक लागत" : "PETROL FUEL COST"}</div>
            <div class="calc-val" style="color: #ad555b;">₹${petrolCostMonthly.toLocaleString("en-IN")}</div>
        </div>
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "ईवी चार्जिंग लागत" : "EV CHARGING COST"}</div>
            <div class="calc-val" style="color: var(--green);">₹${evElectricityCostMonthly.toLocaleString("en-IN")}</div>
        </div>
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "मासिक शुद्ध बचत" : "MONTHLY NET SAVINGS"}</div>
            <div class="calc-val" style="color: var(--green);">₹${monthlySavings.toLocaleString("en-IN")}</div>
        </div>
        <div class="calc-card">
            <div class="calc-lbl">${isHi ? "मासिक CO₂ में कमी" : "MONTHLY CO₂ OFFSET"}</div>
            <div class="calc-val">${co2OffsetKg} kg</div>
        </div>
    `;
}

/* =========================================================
   CIRCULAR UPCYCLING & ITEM REUSE DATABASE
========================================================= */

const UPCYCLE_DB = {
    "clothes": {
        name_en: "Old Clothes & Cotton T-shirts",
        name_hi: "पुरानी सूती टी-शर्ट एवं कपड़े",
        diff: "easy",
        diff_en: "DIY Difficulty: Easy",
        diff_hi: "कठिनाई: आसान (Easy)",
        how_en: "Cut into lint-free kitchen cleaning cloths, stitch into zero-plastic shopping bags, or braid fabric strips into durable pet ropes and rugs.",
        how_hi: "किचन सफाई के कपड़ों में काटें, धोने योग्य कपड़े के थैले बनाएं, या स्ट्रिप्स को गूंथकर मजबूत डोरमैट बनाएं।",
        impact_en: "Saves ~2,700L of water needed for new cotton growth. Diverts 0.5kg synthetic fiber from landfills.",
        impact_hi: "नई कपास उगाने में लगने वाले ~2,700 लीटर पानी की बचत होती है। लैंडफिल कचरे में कमी आती है।"
    },
    "glass": {
        name_en: "Glass Jars & Bottles (Pickle, Jam, Sauce)",
        name_hi: "कांच के जार और बोतलें (अचार, जैम)",
        diff: "easy",
        diff_en: "DIY Difficulty: Easy",
        diff_hi: "कठिनाई: आसान (Easy)",
        how_en: "Sterilize in boiling water. Reuse for airtight pantry grain storage, sourdough starter, DIY spice racks, or water propagation planters.",
        how_hi: "उबलते पानी में साफ करें। दाल-मसाले के भंडारण, इनडोर पौधों के लिए प्लांटर या सजावटी लाइट जार के रूप में पुन: उपयोग करें।",
        impact_en: "100% infinitely reusable without microplastic leaching. Eliminates need for plastic Tupperware purchases.",
        impact_hi: "माइक्रोप्लास्टिक मुक्त 100% सुरक्षित भंडारण। नए प्लास्टिक कंटेनर खरीदने का खर्च बचाता है।"
    },
    "cardboard": {
        name_en: "Delivery Cardboard Boxes & Cartons",
        name_hi: "डिलीवरी कार्डबोर्ड बॉक्स एवं गत्ता",
        diff: "easy",
        diff_en: "DIY Difficulty: Easy",
        diff_hi: "कठिनाई: आसान (Easy)",
        how_en: "Shred for high-carbon 'brown' compost balance, use as weed-suppressing sheet mulch in gardens, or make drawer organizers.",
        how_hi: "खाद के लिए कार्बन युक्त टुकड़े करें, खरपतवार रोकने के लिए क्यारियों में बिछाएं, या दराज आयोजक बनाएं।",
        impact_en: "Enriches soil microbial biome and speeds up home organic composting by 25%.",
        impact_hi: "मिट्टी की उर्वरता बढ़ाता है और घरेलू कंपोस्टिंग को 25% तेज करता है।"
    },
    "tires": {
        name_en: "Used Tires & Rubber Tubes",
        name_hi: "पुराने टायर एवं रबर ट्यूब",
        diff: "medium",
        diff_en: "DIY Difficulty: Medium",
        diff_hi: "कठिनाई: मध्यम (Medium)",
        how_en: "Stack and fill with soil for vertical potato/herb planters, line with sisal rope for outdoor ottomans, or use as garden safety edging.",
        how_hi: "ऊर्ध्वाधर बागवानी के लिए मिट्टी भरकर प्लांटर बनाएं, रस्सी लपेटकर आउटडोर बैठने की कुर्सी बनाएं।",
        impact_en: "Prevents toxic open tire burning, mosquito breeding, and eliminates 12kg landfill mass per tire.",
        impact_hi: "टायर जलने से होने वाले विषैले धुएं और मच्छरों के प्रजनन को रोकता है।"
    },
    "coffee": {
        name_en: "Used Coffee Grounds & Tea Leaves",
        name_hi: "उपयोग की गई कॉफी एवं चाय पत्ती",
        diff: "easy",
        diff_en: "DIY Difficulty: Easy",
        diff_hi: "कठिनाई: आसान (Easy)",
        how_en: "Rinse milk/sugar, then mix directly into acidic plant soil (roses, tomatoes) as nitrogen-rich mulch, or dry as a natural refrigerator deodorizer.",
        how_hi: "दूध/चीनी धोकर गुलाब, टमाटर के पौधों में नाइट्रोजन खाद के रूप में डालें या फ्रिज की गंध दूर करने के लिए सुखाकर रखें।",
        impact_en: "Replaces chemical NPK fertilizer and diverts methane-generating organics from dumpsites.",
        impact_hi: "रासायनिक उर्वरक की आवश्यकता कम करता है और मीथेन उत्सर्जन रोकता है।"
    },
    "plastic": {
        name_en: "Plastic Buckets & 5L Oil Cans",
        name_hi: "प्लास्टिक की बाल्टियां एवं तेल के डिब्बे",
        diff: "easy",
        diff_en: "DIY Difficulty: Easy",
        diff_hi: "कठिनाई: आसान (Easy)",
        how_en: "Cut upper third, drill bottom drainage holes for self-watering tomato planters, or use as tool caddies and DIY compost bins.",
        how_hi: "ऊपरी भाग काटकर नीचे छेद करें और बागवानी के लिए गमले बनाएं या घरेलू कंपोस्ट बिन तैयार करें।",
        impact_en: "Extends polymer lifespan by 5–10 years, delaying plastic fragment disintegration.",
        impact_hi: "प्लास्टिक के उपयोग जीवन को 5-10 साल बढ़ाता है और लैंडफिल जाने से रोकता है।"
    },
    "wood": {
        name_en: "Scrap Pallet Wood & Crates",
        name_hi: "लकड़ी के पुराने तख्ते व पेटियां",
        diff: "medium",
        diff_en: "DIY Difficulty: Medium",
        diff_hi: "कठिनाई: मध्यम (Medium)",
        how_en: "Sand and seal for rustic wall shelving, raised garden garden planter boxes, or modular shoe racks.",
        how_hi: "रेगमाल से चिकना करके दीवार पर शेल्फ, उठी हुई क्यारियां या जूता स्टैंड बनाएं।",
        impact_en: "Preserves virgin timber and locks stored biogenic carbon for decades.",
        impact_hi: "पेड़ों की कटाई को कम करता है और संग्रहीत कार्बन को वर्षों तक सुरक्षित रखता है।"
    },
    "cables": {
        name_en: "Old Cables, Wires & Broken Chargers",
        name_hi: "पुराने तार, केबल व खराब चार्जर",
        diff: "easy",
        diff_en: "DIY Difficulty: Easy",
        diff_hi: "कठिनाई: आसान (Easy)",
        how_en: "Bundle and label with colored tape for emergency tool ties, or drop at certified e-waste recovery centers for copper stripping.",
        how_hi: "गार्डन व टूल्स बांधने के लिए पुन: उपयोग करें या तांबा रीसाइक्लिंग के लिए ई-वेस्ट सेंटर में दें।",
        impact_en: "Recovers 99% pure electrolytic copper wire and prevents toxic lead/cadmium leaching into aquifers.",
        impact_hi: "शुद्ध तांबे की पुनर्प्राप्ति होती है और भूजल में भारी धातु प्रदूषण रुकता है।"
    }
};

function setResourceMode(mode) {
    const cBtn = $("modeCitizenBtn");
    const iBtn = $("modeIndustryBtn");
    const cView = $("citizenResourceView");
    const iView = $("industryResourceView");

    if (mode === "industry") {
        if (cBtn) cBtn.classList.remove("active");
        if (iBtn) iBtn.classList.add("active");
        if (cView) cView.style.display = "none";
        if (iView) iView.style.display = "block";
        calculateIndustrialResourceSavings();
    } else {
        if (iBtn) iBtn.classList.remove("active");
        if (cBtn) cBtn.classList.add("active");
        if (iView) iView.style.display = "none";
        if (cView) cView.style.display = "block";
        calculateHouseholdSavings();
    }
}

function quickSearchUpcycle(name) {
    const input = $("upcycleSearchInput");
    if (input) input.value = name;
    searchUpcycleDirectory(name);
}

async function searchUpcycleDirectory(customQuery = null) {
    const input = $("upcycleSearchInput");
    const rawQuery = (customQuery || (input ? input.value : "") || "clothes").trim();
    const resHolder = $("upcycleResultContainer");
    if (!resHolder) return;

    const isHi = currentLanguage === "hi";

    // Immediate loading state
    resHolder.innerHTML = `
        <div style="padding: 18px; text-align: center; color: var(--text-muted);">
            <div class="spinner" style="display:inline-block; margin-bottom: 6px;"></div>
            <div style="font-weight: 600; font-size: 13.5px; color: var(--navy);">${isHi ? "AI अपसाइक्लिंग एवं रीयूज प्लान तैयार किया जा रहा है..." : "AI is crafting customized circular upcycling & DIY repurposing plan..."}</div>
        </div>
    `;

    try {
        const res = await fetch(`${API_BASE}/api/upcycle-item`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ item: rawQuery, language: currentLanguage })
        });

        if (res.ok) {
            const match = await res.json();
            const name = isHi ? (match.name_hi || match.name_en) : (match.name_en || match.name_hi);
            const diff = isHi ? (match.diff_hi || match.diff_en) : (match.diff_en || match.diff_hi);
            const diffClass = (match.diff || "easy").toLowerCase();
            const how = isHi ? (match.how_hi || match.how_en) : (match.how_en || match.how_hi);
            const impact = isHi ? (match.impact_hi || match.impact_en) : (match.impact_en || match.impact_hi);

            const howFormatted = escapeHTML(how || "").replace(/\n/g, "<br>");

            resHolder.innerHTML = `
                <div class="upcycle-header-row">
                    <span class="upcycle-item-name">${escapeHTML(name || rawQuery)}</span>
                    <span class="upcycle-badge ${diffClass}">${escapeHTML(diff || "DIY Plan")}</span>
                </div>
                <div class="upcycle-grid">
                    <div class="upcycle-col">
                        <strong>${isHi ? "पुन: उपयोग एवं अपसाइक्लिंग कैसे करें:" : "How to Reuse & Upcycle:"}</strong>
                        <p>${howFormatted}</p>
                    </div>
                    <div class="upcycle-col">
                        <strong>${isHi ? "पर्यावरणीय एवं वित्तीय लाभ:" : "Environmental & Financial Benefit:"}</strong>
                        <p>${escapeHTML(impact || "")}</p>
                    </div>
                </div>
            `;
            return;
        }
    } catch (err) {
        console.warn("Upcycle API error:", err);
    }

    // Local smart fallback if server unreachable
    const query = rawQuery.toLowerCase();
    let match = null;
    for (const key in UPCYCLE_DB) {
        if (query.includes(key) || key.includes(query)) {
            match = UPCYCLE_DB[key];
            break;
        }
    }

    if (!match) {
        const isLaptop = /laptop|computer|pc|phone|screen|monitor/i.test(query);
        const isTyre = /tyre|tire|rubber/i.test(query);
        const isJar = /glass|bottle|jar/i.test(query);

        if (isLaptop) {
            match = {
                name_en: `Repurposed ${rawQuery.title()} Electronics`,
                name_hi: `पुराना ${rawQuery.title()} उपकरण`,
                diff: "medium",
                diff_en: "DIY Difficulty: Medium",
                diff_hi: "कठिनाई: मध्यम (Medium)",
                how_en: "1. Convert into a lightweight home Linux server, network storage (NAS), or dedicated digital recipe screen.\n2. Remove internal storage drive to use in a ₹300 external USB portable enclosure.\n3. Trade in for store credit via OEM recycling exchange.",
                how_hi: "1. इसे होम मीडिया सर्वर (NAS) या लिनक्स स्टेशन में बदलें।\n2. हार्ड डिस्क निकालकर ₹300 के केस में पोर्टेबल ड्राइव बनाएं।\n3. अधिकृत एक्सचेंज में देकर क्रेडिट प्राप्त करें।",
                impact_en: "Avoids 250kg embodied carbon emissions and extends hardware lifespan by 4–6 years.",
                impact_hi: "250kg कार्बन उत्सर्जन रोकता है और हार्डवेयर का जीवन 4-6 साल बढ़ाता है।"
            };
        } else if (isTyre) {
            match = {
                name_en: `Used Vehicle ${rawQuery.title()} & Rubber`,
                name_hi: `पुराना वाहन ${rawQuery.title()} एवं रबर`,
                diff: "easy",
                diff_en: "DIY Difficulty: Easy",
                diff_hi: "कठिनाई: आसान (Easy)",
                how_en: "Wash thoroughly, wrap perimeter tightly with natural jute rope to make an ottoman coffee table, or stack for raised garden potato planters.",
                how_hi: "जूट की रस्सी लपेटकर स्टूल या बगीचे में उठी हुई क्यारी बनाएं।",
                impact_en: "Diverts 8.5kg synthetic rubber from open burning or illegal dumps.",
                impact_hi: "8.5kg रबर को जलने से रोकता है।"
            };
        } else {
            match = {
                name_en: `Zero-Waste Repurposing for ${rawQuery.title()}`,
                name_hi: `${rawQuery.title()} का जीरो-वेस्ट प्लान`,
                diff: "easy",
                diff_en: "DIY Difficulty: Easy",
                diff_hi: "कठिनाई: आसान (Easy)",
                how_en: `Clean and inspect for usable components. Repurpose functional parts for household organizing, workshop storage, or garden utility.`,
                how_hi: `साफ करके घरेलू स्टोरेज, वर्कशॉप या बगीचे में उपयोग में लाएं।`,
                impact_en: "Extends product lifespan, prevents unnecessary purchases, and reduces municipal landfill burden.",
                impact_hi: "उत्पाद का जीवन बढ़ाता है और नगर निगम के लैंडफिल भार को कम करता है।"
            };
        }
    }

    const name = isHi ? match.name_hi : match.name_en;
    const diff = isHi ? match.diff_hi : match.diff_en;
    const how = isHi ? match.how_hi : match.how_en;
    const impact = isHi ? match.impact_hi : match.impact_en;
    const howFormatted = escapeHTML(how || "").replace(/\n/g, "<br>");

    resHolder.innerHTML = `
        <div class="upcycle-header-row">
            <span class="upcycle-item-name">${escapeHTML(name)}</span>
            <span class="upcycle-badge ${match.diff}">${escapeHTML(diff)}</span>
        </div>
        <div class="upcycle-grid">
            <div class="upcycle-col">
                <strong>${isHi ? "पुन: उपयोग एवं अपसाइक्लिंग कैसे करें:" : "How to Reuse & Upcycle:"}</strong>
                <p>${howFormatted}</p>
            </div>
            <div class="upcycle-col">
                <strong>${isHi ? "पर्यावरणीय एवं वित्तीय लाभ:" : "Environmental & Financial Benefit:"}</strong>
                <p>${escapeHTML(impact)}</p>
            </div>
        </div>
    `;
}

/* =========================================================
   HOUSEHOLD RESOURCE SAVINGS CALCULATOR
========================================================= */

function calculateHouseholdSavings() {
    const members = Math.max(1, Number($("hhMembers")?.value || 4));
    const roofArea = Math.max(50, Number($("hhRoofArea")?.value || 800));
    const aerator = $("hhAeratorToggle")?.value === "yes";
    const phantom = $("hhPhantomToggle")?.value === "yes";
    const compost = $("hhCompostToggle")?.value === "yes";

    // 1. Rainwater Harvesting (L/year) based on ~800mm annual precipitation
    const annualRainfallMM = 800;
    const runoffCoeff = 0.85; // concrete roof runoff coefficient
    const rainHarvestedLitres = Math.round((roofArea * 0.0929) * (annualRainfallMM / 1000) * runoffCoeff * 0.9 * 1000);

    // 2. Daily Water Saved (L/day) via aerators + greywater
    const baseDailyWaterUsePerCapita = 135; // L/day standard
    const waterSavedPerDay = aerator ? Math.round(members * baseDailyWaterUsePerCapita * 0.35) : Math.round(members * 10);

    // 3. Electricity Saved (kWh/year) via phantom load + LED habit
    const phantomPowerKWhYear = phantom ? Math.round(members * 85) : 0;

    // 4. Organic Compost (kg/year)
    const organicCompostKgYear = compost ? Math.round(members * 0.38 * 365 * 0.32) : 0;

    // 5. Carbon Offset (kg CO2/year)
    const co2AvoidedKg = Math.round((phantomPowerKWhYear * 0.82) + (organicCompostKgYear * 0.52) + (waterSavedPerDay * 365 * 0.00035));

    // 6. Financial Savings (INR/year)
    const moneySavedINR = Math.round((phantomPowerKWhYear * 7.5) + (waterSavedPerDay * 365 * 0.045) + (organicCompostKgYear * 20));

    setText("hhRainYield", `${rainHarvestedLitres.toLocaleString("en-IN")} L/yr`);
    setText("hhWaterSaved", `${waterSavedPerDay.toLocaleString("en-IN")} L/day`);
    setText("hhPowerSaved", `${phantomPowerKWhYear.toLocaleString("en-IN")} kWh/yr`);
    setText("hhCompostYield", `${organicCompostKgYear.toLocaleString("en-IN")} kg/yr`);
    setText("hhCO2Saved", `${co2AvoidedKg.toLocaleString("en-IN")} kg/yr`);
    setText("hhMoneySaved", `₹${moneySavedINR.toLocaleString("en-IN")}/yr`);
}

/* =========================================================
   INDUSTRIAL RESOURCE, WATER (ZLD) & ESG AUDIT CALCULATOR
========================================================= */

function calculateIndustrialResourceSavings() {
    const sector = $("indSectorSelect")?.value || "textile";
    const dailyWaterKL = Math.max(10, Number($("indDailyWater")?.value || 300));
    const recycleRate = Math.min(98, Math.max(0, Number($("indRecycleRate")?.value || 85)));
    const monthlyMWh = Math.max(5, Number($("indMonthlyMWh")?.value || 150));
    const whrs = $("indWHRSToggle")?.value === "yes";
    const solarKW = Math.max(0, Number($("indSolarKW")?.value || 250));

    // 1. Water recovered (kL/day)
    const waterRecoveredKL = Math.round(dailyWaterKL * (recycleRate / 100));

    // 2. Clean power generated (MWh/year)
    const solarMWhAnnual = Math.round((solarKW * 4.3 * 365) / 1000);
    const whrsMWhAnnual = whrs ? Math.round(monthlyMWh * 12 * 0.18) : 0;
    const cleanPowerMWh = solarMWhAnnual + whrsMWhAnnual;

    // 3. Scope 1 & 2 GHG reduction (Tons CO2/year)
    const carbonReducedTons = Math.round((cleanPowerMWh * 0.82) + ((waterRecoveredKL * 365 * 0.45) / 1000));

    // 4. Annual financial savings (INR/year)
    const waterTariffSaving = waterRecoveredKL * 365 * 42; // ₹42 per kL
    const powerSaving = cleanPowerMWh * 1000 * 8.2; // ₹8.2 per kWh commercial
    const totalSavingsINR = Math.round(waterTariffSaving + powerSaving);

    // 5. ISO 50001 / Zero-Waste-to-Landfill Score
    let isoScore = Math.min(98, Math.round(25 + (recycleRate * 0.45) + (whrs ? 18 : 0) + (solarKW > 100 ? 12 : 5)));

    setText("indWaterRecovered", `${waterRecoveredKL.toLocaleString("en-IN")} kL/day`);
    setText("indCleanPower", `${cleanPowerMWh.toLocaleString("en-IN")} MWh/yr`);
    setText("indCarbonReduction", `${carbonReducedTons.toLocaleString("en-IN")} Tons/yr`);
    setText("indFinancialSavings", `₹${(totalSavingsINR / 100000).toFixed(1)} Lakh/yr`);
    setText("indISOScore", `${isoScore} / 100`);
}

/* =========================================================
   PUBLIC TRANSIT CLEAN AIR & CLIMATE IMPACT CALCULATOR
========================================================= */

function calculateTransitImpact() {
    const km = Math.max(1, Number($("transitKmInput")?.value || 25));
    const privMode = $("transitPrivateMode")?.value || "petrol_car";
    const transMode = $("transitAltMode")?.value || "metro";
    const daysWeek = Math.max(1, Math.min(7, Number($("transitDaysInput")?.value || 5)));

    // Emission factors (g CO2 / km)
    const privEFMap = { petrol_car: 140, diesel_car: 170, bike: 45 };
    const transEFMap = { metro: 22, ebus: 15, cng_bus: 48 };

    // Toxic Smog/PM2.5 factors (g / km)
    const privSmogMap = { petrol_car: 0.18, diesel_car: 0.48, bike: 0.12 };
    const transSmogMap = { metro: 0.0, ebus: 0.0, cng_bus: 0.03 };

    // Cost factors (INR / km)
    const privCostMap = { petrol_car: 8.5, diesel_car: 7.2, bike: 2.5 };
    const transCostMap = { metro: 1.5, ebus: 1.2, cng_bus: 1.0 };

    const privEF = privEFMap[privMode] || 140;
    const transEF = transEFMap[transMode] || 22;
    const privSmog = privSmogMap[privMode] || 0.18;
    const transSmog = transSmogMap[transMode] || 0.0;
    const privCost = privCostMap[privMode] || 8.5;
    const transCost = transCostMap[transMode] || 1.5;

    const annualKm = km * daysWeek * 50; // 50 working weeks
    const co2SavedKg = Math.round((annualKm * (privEF - transEF)) / 1000);
    const smogSavedGrams = Math.round(annualKm * (privSmog - transSmog));
    const timeSavedHrs = Math.round(annualKm * 0.022); // ~1.3 min saved per km in city gridlock
    const moneySavedINR = Math.round(annualKm * (privCost - transCost));

    setText("transitCO2Saved", `${co2SavedKg.toLocaleString("en-IN")} kg/yr`);
    setText("transitSmogSaved", `${smogSavedGrams.toLocaleString("en-IN")} g/yr`);
    setText("transitTimeSaved", `${timeSavedHrs.toLocaleString("en-IN")} hrs/yr`);
    setText("transitMoneySaved", `₹${moneySavedINR.toLocaleString("en-IN")}/yr`);
}

/* =========================================================
   PERSONAL & HOUSEHOLD CARBON FOOTPRINT CALCULATOR
========================================================= */

function calculateCarbonFootprint() {
    const km = Math.max(0, Number($("cfCommuteKm")?.value || 20));
    const mode = $("cfTransportMode")?.value || "petrol_car";
    const powerUnits = Math.max(0, Number($("cfPowerUnits")?.value || 250));
    const gasCyl = Math.max(0, Number($("cfCookingGas")?.value || 1));
    const diet = $("cfDiet")?.value || "vegetarian";
    const wasteHabit = $("cfWasteHabit")?.value || "moderate";
    const flights = Math.max(0, Number($("cfFlights")?.value || 2));

    // 1. Commute Transport Carbon (Tons CO2/yr)
    const modeEFMap = {
        petrol_car: 140,
        diesel_car: 170,
        bike: 45,
        ev: 28,
        public_transit: 20,
        bicycle: 0
    };
    const ef = modeEFMap[mode] !== undefined ? modeEFMap[mode] : 140;
    const transportTons = (km * 300 * ef) / 1000000;

    // 2. Household Electricity (Tons CO2/yr) - Regional grid factor 0.82 kg/kWh
    const electTons = (powerUnits * 12 * 0.82) / 1000;

    // 3. LPG Cooking Gas (Tons CO2/yr) - 42.5 kg CO2 per 14.2kg cylinder
    const gasTons = (gasCyl * 12 * 42.5) / 1000;

    // 4. Food & Diet Baseline (Tons CO2/yr)
    const dietTonsMap = {
        vegan: 1.45,
        vegetarian: 1.85,
        mixed: 2.45,
        high_meat: 3.35
    };
    const dietTons = dietTonsMap[diet] || 1.85;

    // 5. Waste & Circularity (Tons CO2/yr)
    const wasteTonsMap = {
        zero_waste: 0.08,
        moderate: 0.32,
        none: 0.72
    };
    const wasteTons = wasteTonsMap[wasteHabit] || 0.32;

    // 6. Flights (Tons CO2/yr) - ~95kg CO2 per hour in flight
    const flightTons = (flights * 95) / 1000;

    // Total gross carbon footprint
    const totalTons = Math.max(0.1, transportTons + electTons + gasTons + dietTons + wasteTons + flightTons);
    const treesNeeded = Math.round((totalTons * 1000) / 22); // 1 mature tree absorbs ~22kg CO2/year

    const isHi = currentLanguage === "hi";
    let ratingText = "";
    let ratingColor = "#27ae60";

    if (totalTons <= 2.2) {
        ratingText = isHi ? "उत्कृष्ट (भारतीय औसत से कम)" : "Excellent (Eco Leader)";
        ratingColor = "#27ae60";
    } else if (totalTons <= 4.5) {
        ratingText = isHi ? "मध्यम (वैश्विक औसत से कम)" : "Moderate (Below Global Avg)";
        ratingColor = "#f39c12";
    } else {
        ratingText = isHi ? "उच्च उत्सर्जन (कटौती आवश्यक)" : "High Emitter (Action Needed)";
        ratingColor = "#e74c3c";
    }

    const reductionPct = Math.round(Math.min(65, Math.max(30, (totalTons > 3 ? 55 : 40))));

    setText("cfTotalTons", `${totalTons.toFixed(2)} Tons CO2`);
    const ratingEl = $("cfBenchmarkRating");
    if (ratingEl) {
        ratingEl.textContent = ratingText;
        ratingEl.style.color = ratingColor;
    }
    setText("cfTreesCount", `${treesNeeded.toLocaleString("en-IN")} Trees`);
    setText("cfReductionPotential", `${reductionPct}%`);

    // Tailored action list
    const actionList = $("cfActionList");
    if (actionList) {
        if (isHi) {
            actionList.innerHTML = `
                <li>सार्वजनिक परिवहन / मेट्रो का उपयोग करें -> <strong>1.1 टन CO2/वर्ष की बचत</strong>।</li>
                <li>1 kW रूफटॉप सोलर व फैंटम पावर कटऑफ लगाएं -> <strong>0.9 टन CO2/वर्ष की बचत</strong>।</li>
                <li>रसोई के कचरे की घर पर कंपोस्टिंग करें -> <strong>0.3 टन लैंडफिल मीथेन की रोकथाम</strong>।</li>
            `;
        } else {
            actionList.innerHTML = `
                <li>Shift daily private commute to Metro/Train -> <strong>Save 1.1 Tons CO2/year</strong>.</li>
                <li>Install 1 kW Rooftop Solar & smart power strip -> <strong>Save 0.9 Tons CO2/year</strong>.</li>
                <li>Home compost kitchen scraps & eliminate single-use plastics -> <strong>Save 0.3 Tons CO2/year</strong>.</li>
            `;
        }
    }
}

/* =========================================================
   VOICE INPUT INTEGRATION (WEB SPEECH API)
========================================================= */

let _activeRecognition = null;
let _lastInputWasVoice = false;

function startVoiceRecognition(targetInputId, triggerBtnId, onResultCallback = null) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showMessage(currentLanguage === "hi" ? "आपका ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता (Google Chrome/Edge का उपयोग करें)।" : "Speech Recognition is not supported by your browser (use Chrome or Edge).", true);
        return;
    }

    const btn = $(triggerBtnId);
    const input = $(targetInputId);
    if (!input) return;

    // Toggle off if already listening on this button
    if (_activeRecognition && btn && btn.classList.contains("listening")) {
        try { _activeRecognition.stop(); } catch (e) {}
        _activeRecognition = null;
        btn.classList.remove("listening");
        showMessage(currentLanguage === "hi" ? "वॉइस इनपुट बंद किया गया।" : "Voice listening stopped.");
        return;
    }

    try {
        if (_activeRecognition) {
            try { _activeRecognition.stop(); } catch (e) {}
            _activeRecognition = null;
        }

        // Cancel any active TTS speech so user can speak clearly
        if (window.speechSynthesis && window.speechSynthesis.speaking) {
            try { window.speechSynthesis.cancel(); } catch (e) {}
        }

        const recognition = new SpeechRecognition();
        _activeRecognition = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLanguage === "hi" ? "hi-IN" : "en-US";

        if (btn) btn.classList.add("listening");
        showMessage(currentLanguage === "hi" ? "सुन रहा हूँ... बोलिए..." : "Listening... Please speak clearly...");

        recognition.onresult = (event) => {
            if (event.results && event.results[0] && event.results[0][0]) {
                const transcript = event.results[0][0].transcript;
                input.value = transcript;
                showMessage(currentLanguage === "hi" ? `पहचाना गया: "${transcript}"` : `Recognized: "${transcript}"`);
                if (btn) btn.classList.remove("listening");
                _activeRecognition = null;

                if (triggerBtnId === "voiceAssistantBtn") {
                    _lastInputWasVoice = true;
                }

                if (typeof onResultCallback === "function") {
                    onResultCallback(transcript);
                }
            }
        };

        recognition.onerror = (event) => {
            console.warn("Speech recognition notice:", event.error);
            if (btn) btn.classList.remove("listening");
            _activeRecognition = null;
            if (event.error !== "no-speech" && event.error !== "aborted") {
                showMessage(currentLanguage === "hi" ? "आवाज पहचानने में समस्या हुई। कृपया पुनः प्रयास करें।" : "Could not recognize speech. Please try again.", true);
            }
        };

        recognition.onend = () => {
            if (btn) btn.classList.remove("listening");
            _activeRecognition = null;
        };

        recognition.start();
    } catch (e) {
        console.error("Voice recognition start error:", e);
        if (btn) btn.classList.remove("listening");
        _activeRecognition = null;
    }
}

/* =========================================================
   CITY HEALTH & SUSTAINABILITY INDEX (0-100) & AUDIO ADVISORY
========================================================= */

let activeAudioAdvisoryText = "";

function updateHealthScoreUI(healthData, weather, aqi) {
    const isHi = currentLanguage === "hi";
    const data = healthData || currentData?.health_index;
    if (!data) return;

    const score = Math.round(data.score || 72);
    const grade = data.grade || "A";
    const rating = isHi ? (data.rating_hi || (score >= 70 ? "अच्छी स्थिरता" : (score >= 50 ? "मध्यम शहरी स्वास्थ्य" : "पर्यावरणीय तनाव"))) : (data.rating_en || data.rating || "Good Sustainability");
    const color = data.color || (score >= 70 ? "#15803d" : (score >= 50 ? "#d97706" : "#dc2626"));

    const scoreEl = $("healthScoreVal");
    if (scoreEl) {
        scoreEl.innerHTML = `${score}<small>/100</small>`;
        scoreEl.style.color = color;
    }

    const gradeBadge = $("healthGradeBadge");
    if (gradeBadge) {
        gradeBadge.textContent = grade;
        gradeBadge.style.background = color;
    }

    const ratingEl = $("healthRatingText");
    if (ratingEl) {
        ratingEl.textContent = rating;
        ratingEl.style.color = color;
    }

    const breakdown = data.breakdown || {};
    setText("healthSubAir", `${Math.round(breakdown.air || 75)}%`);
    setText("healthSubClimate", `${Math.round(breakdown.climate || 80)}%`);
    setText("healthSubEnergy", `${Math.round(breakdown.energy || 70)}%`);
    setText("healthSubMobility", `${Math.round(breakdown.mobility || 68)}%`);

    // Health Advisory Text generation with full Hindi speech parity
    const advisories = data.advisories || {};
    let advText = "";
    if (isHi) {
        if (advisories.sensitive && /[\u0900-\u097F]/.test(advisories.sensitive)) {
            advText = `${advisories.sensitive} ${advisories.runners || ""} ${advisories.general || ""}`.trim();
        } else {
            const aqiVal = Number(aqi?.aqi || currentData?.air_quality?.aqi || 65);
            const maskPart = aqiVal > 100 ? "वायु प्रदूषण के कारण बाहर जाते समय N95 मास्क पहनें।" : "वायु गुणवत्ता बाहरी गतिविधियों के लिए अनुकूल है।";
            const runPart = aqiVal > 120 ? "भारी आउटडोर दौड़ने से बचें।" : "सुबह की सैर और खेलकूद के लिए समय सुरक्षित है।";
            advText = `${maskPart} ${runPart} कमरे में ताजी हवा का वेंटिलेशन बनाए रखें।`;
        }
    } else {
        advText = `${advisories.sensitive || ""} ${advisories.runners || ""} ${advisories.general || ""}`.trim();
        if (!advText) {
            advText = "Environmental conditions are within normal baseline ranges. Safe for outdoor routines and exercise.";
        }
    }

    activeAudioAdvisoryText = advText;

    const advEl = $("healthAdvisoryText");
    if (advEl) {
        advEl.textContent = advText;
    }
}

let _currentUtterance = null;

if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        try { window.speechSynthesis.getVoices(); } catch (e) {}
    };
    try { window.speechSynthesis.getVoices(); } catch (e) {}
}

function getHindiAdvisoryText() {
    const aqiVal = Number(currentData?.air_quality?.aqi || 65);
    const cond = currentData?.weather?.current?.condition || "सामान्य";
    const temp = currentData?.weather?.current?.temperature !== undefined ? `${currentData.weather.current.temperature} डिग्री सेल्सियस` : "सामान्य तापमान";
    
    let advice = "";
    if (aqiVal <= 50) {
        advice = "शहर में वायु गुणवत्ता बहुत अच्छी और स्वच्छ है। बाहरी खेलकूद, दौड़ना और सैर करना पूरी तरह सुरक्षित है।";
    } else if (aqiVal <= 100) {
        advice = "शहर में वायु गुणवत्ता मध्यम और स्वीकार्य है। संवेदनशील लोगों को अत्यधिक भारी बाहरी व्यायाम से बचना चाहिए।";
    } else if (aqiVal <= 200) {
        advice = "वायु प्रदूषण का स्तर बढ़ा हुआ है। बच्चों और बुजुर्गों को बाहर जाते समय N95 मास्क पहनना चाहिए।";
    } else {
        advice = "वायु प्रदूषण गंभीर स्तर पर है। अनावश्यक बाहरी गतिविधियों से बचें और घर की खिड़कियां बंद रखें।";
    }
    return `इकोसिटी एआई स्वास्थ्य एवं गतिविधि मार्गदर्शन: ${advice} वर्तमान तापमान ${temp} है और मौसम ${cond} है।`;
}

function getEnglishAdvisoryText() {
    const aqiVal = Number(currentData?.air_quality?.aqi || 65);
    const cond = currentData?.weather?.current?.condition || "Clear";
    const temp = currentData?.weather?.current?.temperature !== undefined ? `${currentData.weather.current.temperature}°C` : "";
    
    let advice = "";
    if (aqiVal <= 50) {
        advice = "Air quality is pristine and healthy. Ideal conditions for outdoor athletics, running, and public commutes.";
    } else if (aqiVal <= 100) {
        advice = "Air quality is moderate and acceptable. Sensitive individuals should pace intense outdoor cardiovascular workouts.";
    } else if (aqiVal <= 200) {
        advice = "Air quality is unhealthy for sensitive groups. Wearing an N95 mask outdoors is recommended.";
    } else {
        advice = "Air pollution is severe. Limit outdoor exposure, keep indoor ventilation filtered, and avoid peak traffic corridors.";
    }
    return `EcoCity AI Health Advisory and Activity Guidance: ${advice} Current temperature is ${temp} with ${cond} conditions.`;
}

function speakText(text, lang = "en", btnElement = null) {
    if (!("speechSynthesis" in window)) {
        showMessage(currentLanguage === "hi" ? "आपका ब्राउज़र टेक्स्ट-टू-स्पीच का समर्थन नहीं करता।" : "Text-to-speech is not supported by your browser.", true);
        return;
    }

    // Toggle off if already speaking the current element
    if (window.speechSynthesis.speaking && btnElement && btnElement.classList.contains("speaking")) {
        window.speechSynthesis.cancel();
        btnElement.classList.remove("speaking");
        return;
    }

    // Clear any previous queued utterance
    try { window.speechSynthesis.cancel(); } catch (e) {}

    // Reset speaking classes across all voice buttons
    document.querySelectorAll(".speaking").forEach(el => el.classList.remove("speaking"));

    let cleanText = (text || "").replace(/[*_~`#\[\]]/g, "").replace(/\n/g, " ").trim();
    if (!cleanText) {
        cleanText = (lang === "hi" || currentLanguage === "hi")
            ? getHindiAdvisoryText()
            : getEnglishAdvisoryText();
    }

    // Unpause speech synthesis subsystem if frozen
    if (window.speechSynthesis.paused) {
        try { window.speechSynthesis.resume(); } catch (e) {}
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    _currentUtterance = utterance; // Prevent GC bug in Chromium

    const isHindi = lang === "hi" || /[\u0900-\u097F]/.test(cleanText);
    const voices = window.speechSynthesis.getVoices() || [];

    if (isHindi) {
        let hiVoice = voices.find(v => 
            v.lang.toLowerCase().startsWith("hi") || 
            v.name.toLowerCase().includes("hindi") || 
            v.name.toLowerCase().includes("kalpana") || 
            v.name.toLowerCase().includes("hemant")
        );
        if (!hiVoice) {
            // Check for Indian English / regional voice
            hiVoice = voices.find(v => v.lang.toLowerCase().includes("in") || v.name.toLowerCase().includes("india"));
        }
        if (hiVoice) {
            utterance.voice = hiVoice;
            utterance.lang = hiVoice.lang;
        } else if (voices.length > 0) {
            utterance.voice = voices[0];
            utterance.lang = voices[0].lang || "en-US";
        } else {
            utterance.lang = "hi-IN";
        }
        utterance.rate = 0.90;
    } else {
        const enVoice = voices.find(v => 
            v.lang === "en-US" || 
            v.lang === "en-GB" || 
            v.lang.startsWith("en")
        );
        if (enVoice) utterance.voice = enVoice;
        utterance.lang = "en-US";
        utterance.rate = 0.95;
    }

    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    if (btnElement) {
        btnElement.classList.add("speaking");
    }

    utterance.onend = () => {
        if (btnElement) btnElement.classList.remove("speaking");
        _currentUtterance = null;
    };

    utterance.onerror = (err) => {
        console.warn("Speech synthesis notice:", err);
        if (btnElement) btnElement.classList.remove("speaking");
        _currentUtterance = null;
    };

    try {
        window.speechSynthesis.speak(utterance);
    } catch (err) {
        console.error("speakText execution failed:", err);
    }
}

/* =========================================================
   LOCALIZED SECTION VOICE WALKTHROUGH SCRIPTS (EN + HI)
========================================================= */

const SECTION_VOICE_SCRIPTS = {
    dashboard: {
        en: "Welcome to EcoCity AI Smart City Dashboard. Here you can monitor live daily waste generation, municipal recycling rates, active EV charging stations, and rooftop solar potential benchmarked from verified real-time APIs.",
        hi: "इकोसिटी एआई स्मार्ट सिटी डैशबोर्ड में आपका स्वागत है। यहाँ आप रीयल-टाइम दैनिक कचरा उत्पादन, रीसाइक्लिंग दर, सक्रिय ईवी चार्जिंग स्टेशन और सौर ऊर्जा क्षमता की लाइव निगरानी कर सकते हैं।"
    },
    waste: {
        en: "This is the Waste Intelligence Module. It tracks daily municipal solid waste, organic compostable fraction, recyclable polymer yield, and provides a hyper-local ward-level segregation blueprint.",
        hi: "यह अपशिष्ट बुद्धिमत्ता मॉड्यूल है। यह दैनिक ठोस कचरे, गीले जैविक कचरे और प्लास्टिक रीसाइक्लिंग का विश्लेषण करता है तथा वार्ड-स्तरीय कचरा प्रबंधन योजना प्रदान करता है।"
    },
    recycling: {
        en: "This is the Circular Recycling Hub. You can check the recycling rate, find nearby OpenStreetMap recycling facilities, and use the interactive segregation assistant to check how to recycle any item correctly.",
        hi: "यह पुनर्चक्रण और सामग्री रिकवरी केंद्र है। यहाँ आप रीसाइक्लिंग दर देख सकते हैं, नजदीकी केंद्र खोज सकते हैं और कचरा पृथक्करण सहायक से किसी भी वस्तु का सही निपटान जान सकते हैं।"
    },
    energy: {
        en: "Welcome to Energy and Solar Intelligence. View live solar irradiance, calculate rooftop solar capacity, and explore solar panel technology recommendations tailored to your building area.",
        hi: "ऊर्जा एवं सौर बुद्धिमत्ता में आपका स्वागत है। लाइव सौर विकिरण देखें, छत पर सोलर पैनल क्षमता का हिसाब लगाएं और अपनी जगह के अनुसार सर्वोत्तम सोलर पैनल तकनीक चुनें।"
    },
    ev: {
        en: "This is the Electric Mobility and EV Infrastructure section. Discover active charging stations on the interactive map, calculate fuel cost savings, and get battery preservation nudges.",
        hi: "यह ईवी और इलेक्ट्रिक गतिशीलता अनुभाग है। मानचित्र पर चार्जिंग स्टेशन खोजें, पेट्रोल-डीजल की तुलना में बचत की गणना करें और बैटरी सुरक्षा के सुझाव प्राप्त करें।"
    },
    transport: {
        en: "This is the Public Transport and Clean Transit section. Calculate how much CO2 and toxic smog you eliminate by taking the metro or electric bus, and see your annual commute savings.",
        hi: "यह सार्वजनिक परिवहन और स्वच्छ पारगमन अनुभाग है। मेट्रो या इलेक्ट्रिक बस का उपयोग करके आप कितना कार्बन और जहरीला धुआं रोक सकते हैं, इसकी सटीक गणना करें।"
    },
    weather: {
        en: "Atmospheric and Air Quality Diagnostics. View real-time PM2.5 and gas concentrations compared with WHO safe limits, inspect atmospheric smog traps, and follow the 4-stage clean air action plan.",
        hi: "मौसम और वायु गुणवत्ता निदान अनुभाग। WHO सुरक्षा सीमाओं के साथ वास्तविक PM2.5 व गैस प्रदूषण की तुलना देखें, वायुमंडलीय गतिशीलता को समझें और स्वच्छ वायु कार्य योजना देखें।"
    },
    resourcesaving: {
        en: "Resource Saving and Circular Economy. Discover household rainwater harvesting, power savings, and upcycling ideas, or switch to industrial view for Zero Liquid Discharge and byproduct exchange.",
        hi: "संसाधन बचत और सर्कुलर इकोनॉमी अनुभाग। घरेलू वर्षा जल संचयन और अपसाइक्लिंग के उपाय जानें, या औद्योगिक दृश्य में शून्य तरल निर्वहन (ZLD) और ऊर्जा बचत का विश्लेषण करें।"
    },
    carbonfootprint: {
        en: "Personal and Household Carbon Footprint Calculator. Calculate your annual greenhouse gas emissions across commute, electricity, cooking gas, and food, and get top action steps to cut carbon.",
        hi: "व्यक्तिगत कार्बन पदचिह्न कैलकुलेटर। यात्रा, बिजली, रसोई गैस और खान-पान से होने वाले वार्षिक कार्बन उत्सर्जन की गणना करें और इसे 40 से 60 प्रतिशत तक कम करने के उपाय जानें।"
    },
    simulation: {
        en: "What-If Urban Policy and Climate Sandbox. Adjust policy sliders for solar expansion, EV fleets, waste segregation, and tree canopy to project future air quality improvement and municipal budget savings.",
        hi: "व्हाट-इफ नीति एवं जलवायु सिम्युलेटर। सोलर क्षमता, इलेक्ट्रिक बसें, कचरा पृथक्करण और पेड़ लगाने के स्लाइडर बदलकर भविष्य में AQI सुधार और नगरपालिका बचत का लाइव मॉडल देखें।"
    },
    civicscanner: {
        en: "Multimodal Citizen Waste and Civic Hazard Scanner. Upload or snap photos of garbage or road defects to get instant AI classification, disposal instructions, and earn Green Civic Points.",
        hi: "मल्टीमॉडल नागरिक कचरा और सिविक स्कैनर। कचरे या सड़क की समस्या की फोटो अपलोड करें और तुरंत एआई वर्गीकरण, निस्तारण निर्देश व ग्रीन रिवॉर्ड पॉइंट्स प्राप्त करें।"
    },
    assistant: {
        en: "EcoCity AI Assistant Copilot. Ask any question about real-time weather, air quality, municipal waste optimization, EV charging points, or solar potential for this city.",
        hi: "इकोसिटी एआई सहायक। इस शहर के मौसम, वायु गुणवत्ता (AQI), कचरा प्रबंधन, ईवी चार्जिंग और सौर ऊर्जा क्षमता के बारे में कोई भी प्रश्न पूछें।"
    },
    sources: {
        en: "Data Sources and Transparency. EcoCity AI connects directly to Open-Meteo high-resolution APIs, OpenStreetMap Overpass GIS, and EPA and CPCB environmental benchmarks without hallucination.",
        hi: "डेटा स्रोत एवं पारदर्शिता अनुभाग। इकोसिटी एआई बिना किसी अनुमान के ओपन-मेटियो, ओपनस्ट्रीटमैप ओवरपास और CPCB मानकों से रीयल-टाइम सत्यापित डेटा प्राप्त करता है।"
    }
};

function readCurrentSectionVoice(btnElement) {
    let sectionName = "";
    if (typeof btnElement === "string") {
        sectionName = btnElement;
        btnElement = document.querySelector(`.section-voice-btn[data-section-name="${sectionName}"]`);
    } else if (btnElement && btnElement.dataset) {
        sectionName = btnElement.dataset.sectionName;
    }
    if (!sectionName) {
        const activeSection = document.querySelector(".page-section.active-section");
        sectionName = activeSection ? activeSection.id : "dashboard";
    }

    const scriptObj = SECTION_VOICE_SCRIPTS[sectionName] || SECTION_VOICE_SCRIPTS["dashboard"];
    const textToSpeak = currentLanguage === "hi" ? scriptObj.hi : scriptObj.en;
    speakText(textToSpeak, currentLanguage, btnElement);
}

window.readCurrentSectionVoice = readCurrentSectionVoice;
window.speakText = speakText;

/* =========================================================
   WHAT-IF URBAN POLICY & CLIMATE SIMULATION SANDBOX
========================================================= */

function calculateSimulation() {
    const isHi = currentLanguage === "hi";
    const solarSlider = $("sliderSolar");
    const evSlider = $("sliderEV");
    const segSlider = $("sliderSeg");
    const treeSlider = $("sliderTree");

    const solarBoost = Number(solarSlider?.value || 50);
    const evPct = Number(evSlider?.value || 30);
    const segPct = Number(segSlider?.value || 75);
    const treePct = Number(treeSlider?.value || 10);

    // Update Slider Badges
    setText("valSolarLever", `+${solarBoost} MW`);
    setText("valEVLever", `${evPct}%`);
    setText("valSegLever", `${segPct}%`);
    setText("valTreeLever", `+${treePct}%`);

    const cityName = currentData?.location?.name || "This City";
    setText("simCityName", cityName);

    const baseSolar = Number(currentData?.city_data?.solar_mw || 80);
    const baseWasteKg = Number(currentData?.city_data?.waste_kg_day || 2200);
    const baseAQI = Number(currentData?.air_quality?.aqi || 110);

    // Physics/Empirical calculations
    const annualSolarMWh = solarBoost * 1460;
    const solarCO2Saved = Math.round(annualSolarMWh * 0.82);
    const evCO2Saved = Math.round((evPct / 100) * 12500);
    const totalCO2Saved = solarCO2Saved + evCO2Saved;

    const aqiDrop = Math.min(baseAQI - 20, Math.round((evPct * 0.22) + (treePct * 0.45)));
    const projectedAQI = Math.max(25, baseAQI - aqiDrop);

    const landfillDivertedTonsDay = ((baseWasteKg / 1000) * (segPct / 100) * 0.72).toFixed(1);
    const municipalSavingsLakhs = (((annualSolarMWh * 6.5) + (Number(landfillDivertedTonsDay) * 365 * 1200)) / 100000).toFixed(1);

    setText("simCO2Val", `${totalCO2Saved.toLocaleString(isHi ? "hi-IN" : "en-IN")} Tons/yr`);
    setText("simAQIVal", `AQI ${projectedAQI}`);
    setText("simAQINote", `${isHi ? 'प्रारंभिक' : 'From'} ${baseAQI} -> ${isHi ? 'सुधार' : 'Drop'} -${aqiDrop} pts`);
    setText("simLandfillVal", `${landfillDivertedTonsDay} Tons/day`);
    setText("simFinVal", `₹${Number(municipalSavingsLakhs).toLocaleString(isHi ? "hi-IN" : "en-IN")} Lakhs/yr`);

    renderSimulationChart(baseAQI, projectedAQI, baseSolar, baseSolar + solarBoost, Number(landfillDivertedTonsDay), isHi);
}

function renderSimulationChart(baseAQI, simAQI, baseSolar, simSolar, simWasteDiverted, isHi) {
    if (typeof Chart === "undefined") return;
    const canvas = $("simulationChart");
    if (!canvas) return;

    const labels = [
        isHi ? "वायु प्रदूषण (AQI)" : "Air Quality (AQI)",
        isHi ? "सौर क्षमता (MW)" : "Solar Capacity (MW)",
        isHi ? "कचरा डायवर्जन (Tons/d)" : "Waste Diverted (Tons/d)"
    ];

    const baselineData = [baseAQI, baseSolar, 0];
    const simulatedData = [simAQI, simSolar, simWasteDiverted];

    if (simulationChartInstance) {
        simulationChartInstance.data.labels = labels;
        simulationChartInstance.data.datasets[0].data = baselineData;
        simulationChartInstance.data.datasets[1].data = simulatedData;
        simulationChartInstance.data.datasets[0].label = isHi ? "वर्तमान स्थिति (Baseline)" : "Current Baseline";
        simulationChartInstance.data.datasets[1].label = isHi ? "सिम्युलेटेड नीति (Simulated Policy)" : "Simulated Policy Impact";
        simulationChartInstance.update();
        return;
    }

    const ctx = canvas.getContext("2d");
    simulationChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: isHi ? "वर्तमान स्थिति (Baseline)" : "Current Baseline",
                    data: baselineData,
                    backgroundColor: "rgba(100, 116, 139, 0.45)",
                    borderColor: "#64748b",
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.6
                },
                {
                    label: isHi ? "सिम्युलेटेड नीति (Simulated Policy)" : "Simulated Policy Impact",
                    data: simulatedData,
                    backgroundColor: "rgba(39, 174, 96, 0.75)",
                    borderColor: "#27ae60",
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: "top", labels: { boxWidth: 12, font: { size: 11 } } }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: "#edf2ee" } },
                x: { grid: { display: false } }
            }
        }
    });
}

function setupSimulation() {
    ["sliderSolar", "sliderEV", "sliderSeg", "sliderTree"].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener("input", calculateSimulation);
            el.addEventListener("change", calculateSimulation);
        }
    });

    const resetBtn = $("resetSimBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if ($("sliderSolar")) $("sliderSolar").value = 50;
            if ($("sliderEV")) $("sliderEV").value = 30;
            if ($("sliderSeg")) $("sliderSeg").value = 75;
            if ($("sliderTree")) $("sliderTree").value = 10;
            calculateSimulation();
        });
    }
}

/* =========================================================
   MULTIMODAL AI CITIZEN WASTE & CIVIC HAZARD SCANNER
========================================================= */

function setupScanner() {
    const browseBtn = $("browseFileBtn");
    const fileInput = $("cameraFileInput");
    const dropZone = $("dropZone");
    const analyzeBtn = $("analyzeImageBtn");
    const clearBtn = $("clearImageBtn");
    const pinBtn = $("pinHazardToMapBtn");

    if (browseBtn && fileInput) {
        browseBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            fileInput.click();
        });
    }

    if (dropZone && fileInput) {
        dropZone.addEventListener("click", (e) => {
            if (e.target.id !== "browseFileBtn" && !e.target.closest("#browseFileBtn")) {
                fileInput.click();
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) handleImageFile(file);
        });
    }

    if (dropZone) {
        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZone.classList.add("dragover");
        });
        dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("dragover");
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleImageFile(e.dataTransfer.files[0]);
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", resetScanner);
    }

    if (analyzeBtn) {
        analyzeBtn.addEventListener("click", () => analyzeScannerImage());
    }

    if (pinBtn) {
        pinBtn.addEventListener("click", () => pinHazardToMap());
    }

    // Sample photo chips
    document.querySelectorAll(".sample-photo-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const sampleType = chip.dataset.sample;
            loadSamplePhoto(sampleType);
        });
    });
}

let currentScannerFilename = "upload.jpg";

function handleImageFile(file) {
    if (!file) return;
    currentScannerFilename = file.name || "upload.jpg";
    const reader = new FileReader();
    reader.onload = (e) => {
        currentScannerImageB64 = e.target.result;
        const img = $("imagePreview");
        if (img) img.src = currentScannerImageB64;
        const previewBox = $("imagePreviewContainer");
        if (previewBox) previewBox.style.display = "block";
        const dropZone = $("dropZone");
        if (dropZone) dropZone.style.display = "none";
    };
    reader.readAsDataURL(file);
}

function loadSamplePhoto(sampleType) {
    const sampleMockImages = {
        plastic_bottle: { name: "pet_water_bottle.jpg", label: "PET Plastic Bottle", icon: "🧴", color: "#0284c7" },
        battery: { name: "lithium_ion_battery.jpg", label: "Lithium Battery", icon: "🔋", color: "#dc2626" },
        organic: { name: "organic_kitchen_scraps.jpg", label: "Kitchen Food Scraps", icon: "🥬", color: "#16a34a" },
        cardboard: { name: "delivery_cardboard_box.jpg", label: "Delivery Cardboard", icon: "📦", color: "#d97706" },
        glass: { name: "glass_beverage_bottle.jpg", label: "Glass Beverage Bottle", icon: "🍾", color: "#059669" },
        can: { name: "aluminum_soda_can.jpg", label: "Aluminum Drink Can", icon: "🥫", color: "#475569" },
        pothole: { name: "road_asphalt_pothole.jpg", label: "Road Surface Pothole", icon: "🕳️", color: "#ea580c" },
        drain: { name: "clogged_street_drain.jpg", label: "Clogged Street Drain", icon: "🌊", color: "#2563eb" },
        medical: { name: "medical_face_mask.jpg", label: "Medical Mask / Biohazard", icon: "🩹", color: "#9333ea" }
    };
    const s = sampleMockImages[sampleType] || sampleMockImages.plastic_bottle;
    currentScannerFilename = s.name;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="180" viewBox="0 0 360 180">
        <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="${s.color}"/>
                <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
        </defs>
        <rect width="360" height="180" rx="8" fill="url(#g)"/>
        <text x="50%" y="42%" fill="#ffffff" font-size="28" font-family="sans-serif" text-anchor="middle">${s.icon}</text>
        <text x="50%" y="68%" fill="#ffffff" font-size="15" font-family="sans-serif" font-weight="bold" text-anchor="middle">${s.label}</text>
        <text x="50%" y="84%" fill="rgba(255,255,255,0.75)" font-size="11" font-family="sans-serif" text-anchor="middle">EcoCity Vision AI Test Sample</text>
    </svg>`;
    currentScannerImageB64 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

    const img = $("imagePreview");
    if (img) img.src = currentScannerImageB64;
    const previewBox = $("imagePreviewContainer");
    if (previewBox) previewBox.style.display = "block";
    const dropZone = $("dropZone");
    if (dropZone) dropZone.style.display = "none";

    analyzeScannerImage(s.name);
}

window.loadSamplePhoto = loadSamplePhoto;

function resetScanner() {
    currentScannerImageB64 = "";
    currentScannerFilename = "upload.jpg";
    currentHazardData = null;
    const fileInput = $("cameraFileInput");
    if (fileInput) fileInput.value = "";
    const previewBox = $("imagePreviewContainer");
    if (previewBox) previewBox.style.display = "none";
    const dropZone = $("dropZone");
    if (dropZone) dropZone.style.display = "flex";
    const footer = $("scannerActionFooter");
    if (footer) footer.style.display = "none";

    const isHi = currentLanguage === "hi";
    const resultBox = $("scannerResultBox");
    if (resultBox) {
        resultBox.innerHTML = `
            <div class="scanner-empty-state">
                <div style="font-size: 32px; margin-bottom: 8px;">📷</div>
                <strong>${isHi ? "फोटो इनपुट की प्रतीक्षा" : "Awaiting Photo Input"}</strong>
                <p>${isHi ? "तुरंत सटीक पृथक्करण सलाह देखने और ग्रीन पॉइंट्स अर्जित करने के लिए बाईं ओर एक फोटो चुनें।" : "Select or capture a photo on the left to see instant segregation advice and earn Green Civic Points."}</p>
            </div>
        `;
    }
}

async function analyzeScannerImage(overrideFilename = null) {
    if (!currentScannerImageB64) return;
    const fileToAnalyze = overrideFilename || currentScannerFilename || "camera_capture.jpg";
    const isHi = currentLanguage === "hi";
    const resultBox = $("scannerResultBox");
    const analyzeBtn = $("analyzeImageBtn");

    if (analyzeBtn) {
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = isHi ? "विश्लेषण हो रहा है..." : "Analyzing...";
    }

    if (resultBox) {
        resultBox.innerHTML = `<div class="insight-loading">${isHi ? "AI विज़न मॉडल छवि का सटीक विश्लेषण कर रहा है..." : "Vision AI is inspecting materials and classifying hazard levels..."}</div>`;
    }

    try {
        const res = await fetch(`${API_BASE}/api/analyze-hazard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                image: currentScannerImageB64,
                filename: fileToAnalyze,
                latitude: currentData?.location?.latitude || 28.6692,
                longitude: currentData?.location?.longitude || 77.4538,
                location_name: currentData?.location?.name || "City Ward",
                language: currentLanguage
            })
        });

        const data = await res.json();
        currentHazardData = data;

        if (resultBox) {
            const hLevel = (data.hazard_level || "").toLowerCase();
            const hazardClass = hLevel.includes("high") || hLevel.includes("उच्च") ? "risk-high" : (hLevel.includes("mod") || hLevel.includes("मध्यम") ? "risk-moderate" : "risk-safe");
            
            // Choose appropriate icon & callout theme based on category/bin
            let binIcon = "♻️";
            let binThemeClass = "bin-blue-callout";
            const binStr = (data.bin_color || "").toLowerCase();
            const catStr = (data.category || "").toLowerCase();

            if (binStr.includes("green") || binStr.includes("हरा") || catStr.includes("organic") || catStr.includes("जैविक")) {
                binIcon = "🥬";
                binThemeClass = "bin-green-callout";
            } else if (binStr.includes("red") || binStr.includes("लाल") || catStr.includes("battery") || catStr.includes("e-waste") || catStr.includes("ई-कचरा")) {
                binIcon = "🔋";
                binThemeClass = "bin-red-callout";
            } else if (binStr.includes("yellow") || binStr.includes("पीला") || catStr.includes("medical") || catStr.includes("bio")) {
                binIcon = "☣️";
                binThemeClass = "bin-amber-callout";
            } else if (data.is_civic_hazard || catStr.includes("hazard") || catStr.includes("defect") || catStr.includes("drain") || catStr.includes("pothole")) {
                binIcon = "🚧";
                binThemeClass = "bin-red-callout";
            }

            // Split action steps into clean formatted lines if newline present
            const actionText = (data.action_steps || "").replace(/\n/g, "<br>");

            resultBox.innerHTML = `
                <div class="scanner-result-header">
                    <div>
                        <span class="scanner-cat-tag">${escapeHTML(data.category || "Waste Material")}</span>
                        <div class="scanner-item-title">${escapeHTML(data.item_name || "Identified Item")}</div>
                    </div>
                    <span class="scanner-risk-badge ${hazardClass}">${escapeHTML(data.hazard_level || "Low")} Hazard</span>
                </div>

                <div class="scanner-bin-callout ${binThemeClass}">
                    <span class="scanner-bin-icon">${binIcon}</span>
                    <div class="scanner-bin-details">
                        <strong>${isHi ? "निर्धारित डस्टबिन / कार्रवाई:" : "Target Stream / Action:"}</strong>
                        <span>${escapeHTML(data.bin_color || "Blue Bin")}</span>
                    </div>
                </div>

                <div class="scanner-steps-box">
                    <strong>${isHi ? "कार्यवाही निर्देश:" : "Handling & Segregation Protocol:"}</strong>
                    <p>${actionText}</p>
                </div>

                <div class="scanner-impact-stats">
                    <div class="scanner-impact-item">
                        <span>${isHi ? "CO₂ बचत:" : "CO₂ Avoided:"}</span>
                        <strong>+${data.co2_impact_kg || 1.2} kg CO₂e</strong>
                    </div>
                    <div class="scanner-impact-item">
                        <span>${isHi ? "नागरिक अंक:" : "Green Points:"}</span>
                        <strong style="color: #ea580c;">+${data.reward_points || 25} Points</strong>
                    </div>
                </div>
            `;
        }

        const footer = $("scannerActionFooter");
        if (footer) footer.style.display = "flex";
        setText("rewardPointsVal", String(data.reward_points || 25));

    } catch (err) {
        console.error("Scanner error:", err);
        if (resultBox) {
            resultBox.innerHTML = `<div style="color: #dc2626; padding: 12px; font-weight: 600;">${isHi ? "विश्लेषण विफल रहा। कृपया पुनः प्रयास करें।" : "Failed to analyze image. Please ensure server.py is running."}</div>`;
        }
    } finally {
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = TRANSLATIONS[currentLanguage]?.btnAnalyzeAI || "Analyze with Vision AI";
        }
    }
}

function pinHazardToMap() {
    if (!currentHazardData || !mainMap) return;
    const isHi = currentLanguage === "hi";
    const lat = Number(currentData?.location?.latitude || 28.6692) + ((Math.random() - 0.5) * 0.015);
    const lon = Number(currentData?.location?.longitude || 77.4538) + ((Math.random() - 0.5) * 0.015);

    const isHazard = currentHazardData.is_civic_hazard || currentHazardData.category === "Civic Hazard" || currentHazardData.category === "Road Defect";
    const pinColor = isHazard ? "#e74c3c" : "#27ae60";

    const marker = L.circleMarker([lat, lon], {
        radius: 9,
        fillColor: pinColor,
        color: "#ffffff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.95
    }).addTo(mainMap);

    marker.bindPopup(`
        <strong>${isHazard ? '⚠️ [Civic Hazard Geotag]' : '♻️ [Citizen Waste Log]'}</strong><br>
        <strong>${escapeHTML(currentHazardData.item_name)}</strong><br>
        Category: ${escapeHTML(currentHazardData.category)}<br>
        Status: <em>Verified & Logged to Ward GIS</em>
    `).openPopup();

    showSection("dashboard");
    mainMap.setView([lat, lon], 14);
    showMessage(isHi ? "समस्या को नक्शे पर सफलतापूर्वक पिन कर दिया गया है!" : "Civic report geotagged and pinned on the map!");
}

/* =========================================================
   OFFICIAL MUNICIPAL SUSTAINABILITY REPORT EXPORT
========================================================= */

function exportSustainabilityReport() {
    window.print();
}

/* =========================================================
   LOCATION FETCHING & GEOLOCATION
========================================================= */

async function loadLocation(searchQuery = null) {
    const input = $("locationInput");
    const query = searchQuery || (input ? input.value.trim() : "");

    if (!query) {
        showMessage(currentLanguage === "hi" ? "कृपया पहले एक स्थान दर्ज करें।" : "Please enter a location first.", true);
        return;
    }

    const btn = $("searchBtn");
    if (btn) {
        btn.disabled = true;
        btn.textContent = currentLanguage === "hi" ? "लोड हो रहा है..." : "Loading...";
    }

    showMessage(currentLanguage === "hi" ? "स्थान खोजा जा रहा है और रीयल-टाइम डेटा लोड हो रहा है..." : "Finding location and fetching live city data...");

    try {
        const res = await fetch(`${API_BASE}/api/location?q=${encodeURIComponent(query)}&lang=${currentLanguage}`);
        const payload = await res.json();

        if (!res.ok) {
            throw new Error(payload.error || "Unable to load this location.");
        }

        currentData = payload;

        updateLocationUI(payload.location);
        updateWeatherUI(payload.weather);
        updateAirQualityUI(payload.air_quality);
        updateCityDataUI(payload.city_data);
        updateHealthScoreUI(payload.health_index, payload.weather, payload.air_quality);
        renderInsights(payload.insights);
        updateEVWeatherInsight(payload.weather);
        calculateSimulation();

        updateMaps(
            Number(payload.location.latitude),
            Number(payload.location.longitude),
            payload.location.name,
            payload.osm
        );

        showMessage(currentLanguage === "hi" ? "लाइव डेटा सफलतापूर्वक लोड हो गया।" : "Live city data loaded successfully.");
    } catch (err) {
        console.error("EcoCity location error:", err);
        showMessage(err.message || "Failed to load location.", true);
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = TRANSLATIONS[currentLanguage]?.btnExplore || "Explore Location";
        }
    }
}

async function loadCoordinates(lat, lon) {
    showMessage(currentLanguage === "hi" ? "आपके GPS स्थान का डेटा लोड किया जा रहा है..." : "Loading live data for your GPS location...");

    try {
        const res = await fetch(`${API_BASE}/api/location/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&lang=${currentLanguage}`);
        const payload = await res.json();

        if (!res.ok) {
            throw new Error(payload.error || "Unable to resolve coordinates.");
        }

        currentData = payload;

        if ($("locationInput")) {
            $("locationInput").value = payload.location?.name || `${lat}, ${lon}`;
        }

        updateLocationUI(payload.location);
        updateWeatherUI(payload.weather);
        updateAirQualityUI(payload.air_quality);
        updateCityDataUI(payload.city_data);
        updateHealthScoreUI(payload.health_index, payload.weather, payload.air_quality);
        renderInsights(payload.insights);
        updateEVWeatherInsight(payload.weather);
        calculateSimulation();

        updateMaps(
            Number(payload.location.latitude),
            Number(payload.location.longitude),
            payload.location.name,
            payload.osm
        );

        showMessage(currentLanguage === "hi" ? "वर्तमान GPS स्थान सफलतापूर्वक लोड हो गया।" : "Current GPS location loaded successfully.");
    } catch (err) {
        console.error("Reverse location error:", err);
        showMessage(err.message || "Could not retrieve location for coordinates.", true);
    }
}

function useCurrentLocation() {
    if (!navigator.geolocation) {
        showMessage(currentLanguage === "hi" ? "आपका ब्राउज़र स्थान पहुँच का समर्थन नहीं करता।" : "Your browser does not support geolocation.", true);
        return;
    }

    showMessage(currentLanguage === "hi" ? "जीपीएस से स्थान प्राप्त किया जा रहा है..." : "Requesting GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
        async pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            await loadCoordinates(lat, lon);
        },
        async err => {
            console.warn("Browser GPS error/denied. Falling back to IP geolocator:", err);
            try {
                const ipRes = await fetch("https://ipapi.co/json/");
                if (ipRes.ok) {
                    const ipData = await ipRes.json();
                    if (ipData.latitude && ipData.longitude) {
                        await loadCoordinates(ipData.latitude, ipData.longitude);
                        return;
                    }
                }
            } catch (e) {
                console.error("IP fallback failed:", e);
            }
            showMessage(currentLanguage === "hi" ? "स्थान पहुँच की अनुमति नहीं मिली। कृपया मैन्युअल रूप से खोजें।" : "Location permission was denied. You can search manually.", true);
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
}

/* =========================================================
   LIVE AI ASSISTANT CHAT
========================================================= */

function addChatMessage(role, text) {
    const holder = $("chatMessages");
    if (!holder) return;

    const msg = document.createElement("div");
    msg.className = `chat-message ${role === "user" ? "user-message" : "ai-message"}`;
    
    if (role === "user") {
        msg.innerHTML = `
            <div class="message-label">${currentLanguage === "hi" ? "आप" : "YOU"}</div>
            <p>${escapeHTML(text).replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>
        `;
    } else {
        msg.innerHTML = `
            <div class="message-label-row">
                <div class="message-label">ECOCITY AI</div>
                <button class="chat-tts-btn" title="Read Aloud" aria-label="Read Aloud">
                    <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
            </div>
            <p>${escapeHTML(text).replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>
        `;

        const ttsBtn = msg.querySelector(".chat-tts-btn");
        if (ttsBtn) {
            ttsBtn.addEventListener("click", () => speakText(text, currentLanguage, ttsBtn));
        }
    }

    holder.appendChild(msg);
    holder.scrollTop = holder.scrollHeight;
    return msg;
}

function clearChat() {
    const holder = $("chatMessages");
    if (!holder) return;

    const isHi = currentLanguage === "hi";
    const welcomeMsg = isHi
        ? "नमस्ते! मैं रीयल-टाइम शहर डेटा से जुड़ा हूँ। मुझसे मौसम, वायु गुणवत्ता (AQI), कचरा प्रबंधन, ईवी चार्जर्स या सौर क्षमता के बारे में कुछ भी पूछें।"
        : "Hello! I am connected to real-time city data. Ask me any question about the current location's weather, air pollution (AQI), waste management, EV charging points, or solar energy potential.";

    holder.innerHTML = `
        <div class="chat-message ai-message">
            <div class="message-label-row">
                <div class="message-label">ECOCITY AI</div>
                <button class="chat-tts-btn" title="Read Aloud" aria-label="Read Aloud">
                    <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </button>
            </div>
            <p data-i18n="aiWelcome">${welcomeMsg}</p>
        </div>
    `;

    const ttsBtn = holder.querySelector(".chat-tts-btn");
    if (ttsBtn) {
        ttsBtn.addEventListener("click", () => speakText(welcomeMsg, currentLanguage, ttsBtn));
    }

    const input = $("assistantInput");
    if (input) {
        input.value = "";
        input.focus();
    }

    showMessage(isHi ? "चैट साफ कर दी गई है। नई बातचीत शुरू हुई।" : "Chat cleared. Started a fresh conversation.");
}

async function askAssistant() {
    const input = $("assistantInput");
    if (!input) return;
    const question = input.value.trim();
    if (!question) return;

    addChatMessage("user", question);
    input.value = "";

    const holder = $("chatMessages");
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "chat-message ai-message";
    loadingDiv.id = "aiTyping";
    loadingDiv.innerHTML = `
        <div class="message-label">ECOCITY AI</div>
        <p><em>${currentLanguage === "hi" ? "स्मार्ट सिटी डेटा का विश्लेषण किया जा रहा है..." : "Analysing live city intelligence..."}</em></p>
    `;
    holder.appendChild(loadingDiv);
    holder.scrollTop = holder.scrollHeight;

    try {
        const res = await fetch(`${API_BASE}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: question,
                location: currentData?.location || { name: "Ghaziabad", latitude: 28.6692, longitude: 77.4538 },
                weather: currentData?.weather || {},
                air_quality: currentData?.air_quality || {},
                city_data: currentData?.city_data || {},
                language: currentLanguage
            })
        });

        const data = await res.json();
        if (loadingDiv.parentNode) loadingDiv.remove();

        if (res.ok && data.reply) {
            const aiMsgEl = addChatMessage("ai", data.reply);

            if (_lastInputWasVoice) {
                _lastInputWasVoice = false;
                const ttsBtn = aiMsgEl ? aiMsgEl.querySelector(".chat-tts-btn") : null;
                speakText(data.reply, currentLanguage, ttsBtn);
            }

            if (data.new_location_data) {
                currentData = data.new_location_data;
                const locInput = $("locationInput");
                if (locInput) {
                    locInput.value = data.new_location_data.location?.name || "";
                }
                updateLocationUI(data.new_location_data.location);
                updateWeatherUI(data.new_location_data.weather);
                updateAirQualityUI(data.new_location_data.air_quality);
                updateCityDataUI(data.new_location_data.city_data);
                updateHealthScoreUI(data.new_location_data.health_index, data.new_location_data.weather, data.new_location_data.air_quality);
                renderInsights(data.new_location_data.insights);
                updateEVWeatherInsight(data.new_location_data.weather);
                calculateSimulation();
                updateMaps(
                    Number(data.new_location_data.location.latitude),
                    Number(data.new_location_data.location.longitude),
                    data.new_location_data.location.name,
                    data.new_location_data.osm
                );
                showMessage(currentLanguage === "hi" ? `स्थान बदलकर ${data.new_location_data.location.name} कर दिया गया।` : `Location switched to ${data.new_location_data.location.name}.`);
            }
        } else {
            addChatMessage("ai", data.error || (currentLanguage === "hi" ? "उत्तर प्राप्त करने में त्रुटि हुई।" : "Unable to process the request."));
        }
    } catch (err) {
        if (loadingDiv.parentNode) loadingDiv.remove();
        console.error("AI Chat error:", err);
        addChatMessage("ai", currentLanguage === "hi" ? "सर्वर से कनेक्ट करने में त्रुटि हुई। कृपया जांचें कि server.py चल रहा है।" : "Connection error. Ensure backend server.py is running.");
    }
}

function setupQuickCities() {
    document.querySelectorAll(".city-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            if (chip.classList.contains("item-chip") || chip.classList.contains("sample-photo-chip")) return;
            const city = chip.dataset.city || chip.textContent.trim();
            const input = $("locationInput");
            if (input) input.value = city;
            loadLocation(city);
        });
    });
}

function setupInteractiveTools() {
    // Waste item chips
    document.querySelectorAll(".item-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const item = chip.dataset.item || chip.textContent.trim();
            const input = $("wasteItemInput");
            if (input) input.value = item;
            checkWasteItem(item);
        });
    });

    const checkBtn = $("checkWasteItemBtn");
    if (checkBtn) {
        checkBtn.addEventListener("click", () => checkWasteItem());
    }

    const itemInput = $("wasteItemInput");
    if (itemInput) {
        itemInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                checkWasteItem();
            }
        });
    }

    // Solar calc button & inputs
    const calcSolarBtn = $("calcSolarBtn");
    if (calcSolarBtn) {
        calcSolarBtn.addEventListener("click", () => calculateSolarYield());
    }
    const roofAreaInput = $("roofAreaInput");
    if (roofAreaInput) {
        roofAreaInput.addEventListener("input", () => calculateSolarYield());
    }

    // EV calc button & inputs
    const calcEVBtn = $("calcEVBtn");
    if (calcEVBtn) {
        calcEVBtn.addEventListener("click", () => calculateEVSavings());
    }
    const dailyKmInput = $("dailyKmInput");
    if (dailyKmInput) {
        dailyKmInput.addEventListener("input", () => calculateEVSavings());
    }

    // Resource mode switch buttons
    const modeCitizenBtn = $("modeCitizenBtn");
    if (modeCitizenBtn) {
        modeCitizenBtn.addEventListener("click", () => setResourceMode("citizen"));
    }
    const modeIndBtn = $("modeIndustryBtn");
    if (modeIndBtn) {
        modeIndBtn.addEventListener("click", () => setResourceMode("industry"));
    }

    // Upcycle search button & input
    const upcycleBtn = $("searchUpcycleBtn");
    if (upcycleBtn) {
        upcycleBtn.addEventListener("click", () => searchUpcycleDirectory());
    }
    const upcycleInput = $("upcycleSearchInput");
    if (upcycleInput) {
        upcycleInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                searchUpcycleDirectory();
            }
        });
    }

    // Upcycle popular item chips
    document.querySelectorAll(".upcycle-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            const item = chip.dataset.item || chip.textContent.trim();
            quickSearchUpcycle(item);
        });
    });

    // Household Resource Calculator inputs
    ["hhMembers", "hhRoofArea", "hhAeratorToggle", "hhPhantomToggle", "hhCompostToggle"].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener("input", calculateHouseholdSavings);
            el.addEventListener("change", calculateHouseholdSavings);
        }
    });

    // Industrial Resource Calculator inputs
    ["indSectorSelect", "indDailyWater", "indRecycleRate", "indMonthlyMWh", "indWHRSToggle", "indSolarKW"].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener("input", calculateIndustrialResourceSavings);
            el.addEventListener("change", calculateIndustrialResourceSavings);
        }
    });

    // Transit Clean Air Calculator inputs & button
    const calcTransitBtn = $("calcTransitBtn");
    if (calcTransitBtn) {
        calcTransitBtn.addEventListener("click", calculateTransitImpact);
    }
    ["transitKmInput", "transitPrivateMode", "transitAltMode", "transitDaysInput"].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener("input", calculateTransitImpact);
            el.addEventListener("change", calculateTransitImpact);
        }
    });

    // Carbon Footprint Calculator inputs & button
    const calcCarbonBtn = $("calcCarbonBtn");
    if (calcCarbonBtn) {
        calcCarbonBtn.addEventListener("click", calculateCarbonFootprint);
    }
    ["cfCommuteKm", "cfTransportMode", "cfPowerUnits", "cfCookingGas", "cfDiet", "cfWasteHabit", "cfFlights"].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener("input", calculateCarbonFootprint);
            el.addEventListener("change", calculateCarbonFootprint);
        }
    });

    // Area Waste Management Planner inputs
    ["areaArchetypeSelect", "areaPopInput", "areaSegregationRate"].forEach(id => {
        const el = $(id);
        if (el) {
            el.addEventListener("input", calculateAreaWastePlan);
            el.addEventListener("change", calculateAreaWastePlan);
        }
    });
}

function setupSuggestedQuestions() {
    document.querySelectorAll(".suggestion").forEach(btn => {
        btn.addEventListener("click", () => {
            const q = btn.textContent.trim();
            const input = $("assistantInput");
            if (input) input.value = q;
            showSection("assistant");
            askAssistant();
        });
    });
}

/* =========================================================
   EVENT LISTENERS & APP INITIALIZATION
========================================================= */

function setupKeyboardEvents() {
    const locInput = $("locationInput");
    if (locInput) {
        locInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                loadLocation();
            }
        });
    }

    const aiInput = $("assistantInput");
    if (aiInput) {
        aiInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                askAssistant();
            }
        });
    }
}

function setupButtons() {
    const sBtn = $("searchBtn");
    if (sBtn) sBtn.addEventListener("click", () => loadLocation());

    const curBtn = $("currentLocationBtn");
    if (curBtn) curBtn.addEventListener("click", useCurrentLocation);

    const aiBtn = $("assistantSendBtn");
    if (aiBtn) aiBtn.addEventListener("click", askAssistant);

    const clrChatBtn = $("clearChatBtn");
    if (clrChatBtn) clrChatBtn.addEventListener("click", clearChat);

    const langSel = $("languageSelect");
    if (langSel) {
        langSel.addEventListener("change", e => {
            changeLanguage(e.target.value);
        });
    }

    // Voice Input Recognition Buttons
    const voiceLocBtn = $("voiceLocationBtn");
    if (voiceLocBtn) {
        voiceLocBtn.addEventListener("click", () => {
            startVoiceRecognition("locationInput", "voiceLocationBtn", (transcript) => {
                loadLocation(transcript);
            });
        });
    }

    const voiceAssistBtn = $("voiceAssistantBtn");
    if (voiceAssistBtn) {
        voiceAssistBtn.addEventListener("click", () => {
            startVoiceRecognition("assistantInput", "voiceAssistantBtn", () => {
                askAssistant();
            });
        });
    }

    const voiceUpcycleBtn = $("voiceUpcycleBtn");
    if (voiceUpcycleBtn) {
        voiceUpcycleBtn.addEventListener("click", () => {
            startVoiceRecognition("upcycleSearchInput", "voiceUpcycleBtn", (transcript) => {
                searchUpcycleDirectory(transcript);
            });
        });
    }

    // Health Advisory Listen Buttons (English & Hindi)
    const spkAdvBtn = $("speakAdvisoryBtn");
    if (spkAdvBtn) {
        spkAdvBtn.addEventListener("click", () => {
            const textToSpeak = getEnglishAdvisoryText();
            speakText(textToSpeak, "en", spkAdvBtn);
        });
    }

    const spkAdvHiBtn = $("speakAdvisoryHiBtn");
    if (spkAdvHiBtn) {
        spkAdvHiBtn.addEventListener("click", () => {
            const textToSpeak = getHindiAdvisoryText();
            speakText(textToSpeak, "hi", spkAdvHiBtn);
        });
    }

    // Official Report PDF / Print Download
    const dlReportBtn = $("downloadReportBtn");
    if (dlReportBtn) {
        dlReportBtn.addEventListener("click", () => {
            exportSustainabilityReport();
        });
    }

    // Attach TTS listener to any initial chat messages
    document.querySelectorAll("#chatMessages .chat-tts-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const msgP = btn.closest(".chat-message")?.querySelector("p");
            const textToSpeak = msgP ? msgP.textContent : "";
            speakText(textToSpeak, currentLanguage, btn);
        });
    });
}

async function checkBackendConnection() {
    try {
        const res = await fetch(`${API_BASE}/api/health`);
        if (res.ok) console.log("EcoCity AI backend connected.");
    } catch (e) {
        console.warn("EcoCity backend is not reachable. Start server.py.");
        showMessage("Start server.py before using live location/weather data.", true);
    }
}

async function initializeEcoCity() {
    console.log("EcoCity AI v2.0 starting...");

    setupNavigation();
    setupButtons();
    setupQuickCities();
    setupInteractiveTools();
    setupSuggestedQuestions();
    setupKeyboardEvents();
    setupSimulation();
    setupScanner();

    initializeMainMap();
    initializeEVMap();

    // Initialize interactive calculators
    checkWasteItem("Plastic Bottle");
    calculateSolarYield(500);
    calculateEVSavings(40);
    searchUpcycleDirectory("clothes");
    calculateHouseholdSavings();
    calculateIndustrialResourceSavings();
    calculateTransitImpact();
    calculateCarbonFootprint();
    calculateAreaWastePlan();
    calculateSimulation();

    const savedLang = localStorage.getItem("ecocityLanguage");
    if (savedLang) {
        const sel = $("languageSelect");
        if (sel) sel.value = savedLang;
        changeLanguage(savedLang);
    }

    await checkBackendConnection();
    await loadLocation("Ghaziabad");

    console.log("EcoCity AI v2.0 initialized.");
}

document.addEventListener("DOMContentLoaded", initializeEcoCity);
