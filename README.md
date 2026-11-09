# Freightliner FleetOps • Troubleshooting & Driver SOP Library

An interactive web-based knowledge base and step-by-step troubleshooting guide for **Freightliner Trucks** (Detroit DD13/DD15/DD16, Cummins X15, DT12 automated transmissions, and Detroit Assurance).

All files, guides, and pictures are stored **100% locally** on your computer.

---

## 🚀 How to Run & Share the Application

### 📦 1-Click Launch (Recommended):
Double-click **`open_app.bat`** (or **`start_server.bat`**).
* Automatically launches the local storage backend in the background and opens `http://localhost:8080` in your browser.
* **100% Portable & Self-Contained:** Every photo you paste (Ctrl+V) or drop into the app is automatically saved directly into the project's **`uploads/`** folder and synced to **`data/fleet_database.json`** and **`js/seed_data.js`**.
* **Zip & Transfer Ready:** You can zip the entire `Dylan_FleetLibraryApp` folder anytime and send it to another PC via email, thumb drive, or network share. On the new PC, simply unzip and double-click `open_app.bat` — all photos, guides, diagrams, and notes will work identically with zero setup required.

### 🌐 Standalone Mode (Direct HTML):
You can also open **`index.html`** directly in Chrome, Edge, or Firefox.
* Loads all guides, vector diagrams, and saved uploads.
* Any photos previously saved to the folder will display seamlessly.

---

## 🚛 Pre-Loaded Truck Systems & Categories:

1. **📐 Truck Anatomy (Dedicated Category):**
   * Class 8 Tractor Anatomy Guide with Freightliner Cascadia vector diagram, component nomenclature, steer axle, tandem drive axles, suspension, and cab layout.

2. **📋 Fleet Instructions:**
   * **Pre-Trip Inspection (PTI)**: Step-by-step DOT 49 CFR § 396.13 walkaround inspection protocol.
   * **Ryder / Penske Unit Swap**: Check-in/check-out protocol, 360 damage photos, Samsara ELD transponder swap.
   * **Samsara ELD Installation**: Hardware mounting, diagnostic port harness connection, LED status lights.
   * **Post-Trip DVIR**: Daily vehicle inspection report workflow, critical safety defects reporting.
   * **Winter Operations & Fuel Anti-Gel**: Cold weather diesel treatment ratios, air tank draining, fuel filter freeze prevention.

3. **🚨 Accidents (Dedicated Category):**
   * **Commercial Vehicle Accident & Crash Emergency Response SOP**: Scene preservation, 3-triangle deployment (10ft / 100ft / 200ft), 911/EMS, 360° photo evidence, never admitting fault, mandatory DOT post-accident drug & alcohol testing flowchart (49 CFR § 382.303), and 24/7 safety hotline dispatch.
   * **Roadside Breakdown & Towing Safety Protocol**: Tow truck hookup safety, Detroit DT12 heavy towing protection (pulling rear axle half-shafts to prevent catastrophic transmission seizure).

4. **🔧 Engine & Mechanical:**
   * Coolant leak / Low Coolant warning light (with Cascadia surge tank diagram, cold check rules, MIN/MAX markings).
   * Low engine oil pressure / Red Stop Engine lamp (level ground dipstick check, bearing protection).
   * Fuel water separator (Davco filter inspection).
   * Alternator/fan serpentine belt snap and squeal.

5. **🛞 Tires & Wheels:**
   * Nail/screw in tire (instruction not to pull nail, air pump steps, driving to Love's/Pilot to save $500 roadside call).
   * DOT tire repair zone diagram (Crown vs Sidewall/Shoulder).
   * Steer tire wear patterns and DOT minimum tread depth (4/32").
   * Hub wheel seal leaks.
   * Highway tire blowout safety protocol.

6. **🪟 Cab, Glass & Safety Sensors:**
   * Detroit Assurance / Bendix radar sensor snow & ice blockage.
   * Windshield crack in wiper sweep zone (DOT out-of-service compliance).
   * Torn mud flap roadside replacement.

7. **💨 Emissions & DEF / DPF:**
   * Parked manual DPF regeneration procedure (step-by-step 35-45 min regen protocol).
   * 5 MPH speed derate countdown timer and DEF quality sensor reset.
   * Dashboard warning lamp stage guide (Solid Amber -> Flashing Amber -> Red Stop Engine).

8. **🛑 Brakes & Air System:**
   * Gladhand rubber coupling air leaks (flip grommet 180° fix without a shop visit).
   * Frozen air lines in winter & trailer brake freeze (using air brake antifreeze alcohol).
   * Caging spring brake chambers in emergency.

9. **⚡ Electrical & Batteries:**
   * Sleeper inverter continuous beeping / tripped breaker button reset.
   * Alternator low voltage (< 12V) and belt failure.
   * Starter clicks but no engine crank.

10. **⚙️ Transmission & Drivetrain:**
    * DT12 transmission fault / flashing "N" — air pressure check and 10-minute master battery disconnect reset.
    * Driveline vibration at highway speeds.

11. **❄️ HVAC & Cab Comfort:**
    * Bunk heater (Webasto / Espar) won't start — fuel straw 1/4 tank cutoff protection, 20A fuse reset.
    * A/C compressor clutch and warm air troubleshooting.

12. **📋 Fleet SOPs & Procedures:**
    * Standard fleet operational guidelines and yard procedures.

---

### 🚨 Shop Urgency & Action Level Filter:
* **🚨 Urgent: Go to Shop (11 issues)**: Ground commercial vehicle immediately (coolant leak, low oil pressure, 5 MPH derate timer, cracked windshield in wiper sweep, steer tire cord wear, DT12 clutch freeze, air dryer purge stuck).
* **🚨 Towing / Accident (2 issues)**: Vehicle disabled or involved in collision; emergency heavy-duty wrecker dispatch required (Accident Emergency Response SOP, Roadside Towing Safety Protocol).
* **⚠️ Schedule Shop Visit (3 issues)**: Drivable under load; route to next terminal or scheduled PM (lane departure camera calibration, torn mud flap, Webasto auxiliary heater).
* **🔧 Driver Roadside Fix (7 issues)**: Self-resolvable by driver without shop dispatch (gladhand seal leak, frozen air lines, manual parked DPF regen, inverter breaker reset, radar camera snow obstruction).
* **📋 Fleet SOPs (4 issues)**: Standard operating procedures, walkarounds, and compliance protocols.
* **⚪ Not mentioned**: Neutral / unassigned action level for general documentation or reference notes.

---

## 💡 Key Dispatch Features:

* **1-Click Message Copy for Drivers:**
  Each issue includes pre-formatted instructions ready to paste directly into SMS, WhatsApp, or RingCentral.
* **Instant Clipboard Paste (Ctrl+V):**
  Take a screenshot (`Win+Shift+S`) and press `Ctrl+V` anywhere in the app to instantly attach it to an issue.
* **Live Search:**
  Search instantly across fault codes (`SPN 111`, `SPN 5246`, `DPF`), parts, symptoms, or tags.
* **Floating Quick-Scroll Button:**
  One-click smooth return to top button with auto-visibility detection while scrolling.
* **Full Local Control:**
  Add new categories, create new issues, upload diagrams, and export full backups at any time.
