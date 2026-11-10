/**
 * Freightliner FleetOps Initial Seed Database
 */
const SEED_DATABASE = {
    "categories":  [
                       {
                           "id":  "truck_anatomy",
                           "name":  "Truck Anatomy",
                           "icon":  "truck",
                           "color":  "cyan",
                           "description":  "Truck parts nomenclature, Freightliner Cascadia diagrams, schematics \u0026 component photos"
                       },
                       {
                           "id":  "fleet_instructions",
                           "name":  "Fleet Instructions",
                           "icon":  "clipboard",
                           "color":  "amber",
                           "description":  "Unit swap protocols, PTI walkaround SOP, Samsara ELD setup, DVIR \u0026 winter operations"
                       },
                       {
                           "id":  "accidents",
                           "name":  "Accidents",
                           "icon":  "alertTriangle",
                           "color":  "red",
                           "description":  "Collision protocol, 911 police/EMS, 360В° photo checklist, DOT drug \u0026 alcohol testing and towing"
                       },
                       {
                           "id":  "engine",
                           "name":  "Engine \u0026 Mechanical",
                           "icon":  "engine",
                           "color":  "orange",
                           "description":  "Cooling, belts, turbo, oil \u0026 fuel leaks, water pump, thermostat"
                       },
                       {
                           "id":  "tires",
                           "name":  "Tires \u0026 Wheels",
                           "icon":  "tire",
                           "color":  "blue",
                           "description":  "Nails in tire, blowouts, PSI drops, hub seals, tread wear \u0026 steer issues"
                       },
                       {
                           "id":  "safety_cab",
                           "name":  "Cab, Glass \u0026 Safety Sensors",
                           "icon":  "truck",
                           "color":  "cyan",
                           "description":  "Windshield DOT specs, lane departure camera, radar sensors, fifth wheel"
                       },
                       {
                           "id":  "emissions",
                           "name":  "Emissions \u0026 DEF / DPF",
                           "icon":  "exhaust",
                           "color":  "purple",
                           "description":  "Parked regen, DEF quality, doser crystallization, 5 MPH derate timer"
                       },
                       {
                           "id":  "brakes",
                           "name":  "Brakes \u0026 Air System",
                           "icon":  "brake",
                           "color":  "red",
                           "description":  "Air leaks, air dryer purge, gladhands, frozen lines, low air warning"
                       },
                       {
                           "id":  "electrical",
                           "name":  "Electrical \u0026 Batteries",
                           "icon":  "battery",
                           "color":  "yellow",
                           "description":  "Alternator charging, sleeper inverter, starter click, trailer lights, fuses"
                       },
                       {
                           "id":  "transmission",
                           "name":  "Transmission \u0026 Drivetrain",
                           "icon":  "transmission",
                           "color":  "indigo",
                           "description":  "DT12 automated manual, clutch calibration, driveline vibration, diff locks"
                       },
                       {
                           "id":  "hvac",
                           "name":  "HVAC \u0026 Cab Comfort",
                           "icon":  "snowflake",
                           "color":  "teal",
                           "description":  "Bunk heaters (Espar/Webasto), A/C compressor, cabin air filters"
                       },
                       {
                           "id":  "sops",
                           "name":  "Fleet SOPs \u0026 Procedures",
                           "icon":  "clipboard",
                           "color":  "emerald",
                           "description":  "Roadside breakdown rules, towing safety protocols, emergency dispatch"
                       },
                       {
                           "id":  "trailer",
                           "name":  "Trailer",
                           "icon":  "trailer",
                           "color":  "amber",
                           "description":  "Trailer doors, landing gear, tandem sliders, reefers, kingpin, seals \u0026 roof leaks"
                       }
                   ],
    "issues":  [
                   {
                       "id":  "issue-1794344443542",
                       "categoryId":  "sops",
                       "title":  "ABA Yard Address",
                       "shopUrgency":  "",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [

                                       ],
                       "images":  [

                                  ],
                       "notes":  "297 E S Frontage Rd Unit A, Bolingbrook, IL 60440",
                       "updatedAt":  "2026-11-10T21:00:43.542Z"
                   },
                   {
                       "id":  "issue-1794344371065",
                       "categoryId":  "sops",
                       "title":  "ABA Company Address",
                       "shopUrgency":  "",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [

                                       ],
                       "images":  [

                                  ],
                       "notes":  "Company name: ABA carriers\nAddress: 4764 FISHBURG RD SUITE D2, HUBER HEIGHTS, OH, 45424\nPhone: (502) 805-3333 ex. 105\nEmail: fleet@abacarriers.com\nrep.",
                       "updatedAt":  "2026-11-10T20:59:31.065Z"
                   },
                   {
                       "id":  "issue-1794344177698",
                       "categoryId":  "safety_cab",
                       "title":  "Windshield Crack",
                       "shopUrgency":  "",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [
                                           "If it\u0027s not bigger than a quarter coin you can apply windshield kit and prevent it from spreading"
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/img_66410183_image.png",
                                          "caption":  "Image",
                                          "name":  "image.png",
                                          "type":  "image"
                                      }
                                  ],
                       "notes":  "",
                       "updatedAt":  "2026-11-10T23:59:59.000Z"
                   },
                   {
                       "id":  "issue-1794159726250",
                       "categoryId":  "truck_anatomy",
                       "title":  "Tractor Truck Parts Definition",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [

                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/01_Tractor_Truck_Parts_Diagram_1.png",
                                          "caption":  "Diagram 1: Tractor Front \u0026 Cab Anatomy (Exterior Cab, Hood, Bumper, Mirrors)",
                                          "name":  "01_Tractor_Truck_Parts_Diagram_1.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/02_Tractor_Truck_Parts_Diagram_2.png",
                                          "caption":  "Diagram 2: Chassis \u0026 Powertrain Nomenclature (Chassis, Tanks, DPF, Fifth Wheel)",
                                          "name":  "02_Tractor_Truck_Parts_Diagram_2.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/03_Tractor_Truck_Parts_Diagram_3.png",
                                          "caption":  "Diagram 3: Drive Axles, Suspension \u0026 Air Brakes (Tandem Axles, Brakes, Tires)",
                                          "name":  "03_Tractor_Truck_Parts_Diagram_3.png",
                                          "type":  "image"
                                      }
                                  ],
                       "notes":  "",
                       "shopUrgency":  "",
                       "createdAt":  "2026-11-08T17:42:06.251Z",
                       "updatedAt":  "2026-11-10T20:51:06.452Z"
                   },
                   {
                       "id":  "issue-1794153390233",
                       "categoryId":  "hvac",
                       "title":  "How to Reset / Calibrate AC \u0026 HVAC on Freightliner New Cascadia",
                       "dashCodes":  "HVAC Actuator Calibration | Flashing AC Lights",
                       "symptoms":  [
                                        "AC blowing warm air on one side or stuck on defrost",
                                        "Bunk HVAC not responding to temperature changes",
                                        "Blend door actuator out of synchronization or clicking under dashboard"
                                    ],
                       "driverSteps":  [
                                           "1. Key ON (engine running or off).",
                                           "2. Turn temperature knob to Full Cold (Max AC).",
                                           "3. Set fan to speed 1.",
                                           "4. Press and hold switch #1 (A/C) and #2 (Recirculation) until lights flash.",
                                           "5. Wait till lights stop flashing (30-60 seconds actuator calibration). Do not turn key off or touch controls during calibration."
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/04_Reset_AC_and_HVAC_Cascadia.png",
                                          "caption":  "Freightliner Cascadia AC \u0026 HVAC Control Panel Reset (A/C + Recirculation Buttons)",
                                          "name":  "04_Reset_AC_and_HVAC_Cascadia.png",
                                          "type":  "image"
                                      }
                                  ],
                       "notes":  "This recalibrates all electric stepper motors and blend doors on the Freightliner Cascadia HVAC unit to factory zero points.",
                       "shopUrgency":  "minor",
                       "createdAt":  "2026-11-08T16:00:00.000Z",
                       "updatedAt":  "2026-11-08T16:00:00.000Z"
                   },
                   {
                       "id":  "issue-1794148523580",
                       "categoryId":  "truck_anatomy",
                       "title":  "Freightliner Oil",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [
                                           "Shell Rotella T5 Diesel Engine Oil HD Synthetic Blend 10W-30"
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/06_Freightliner_Oil_Rotella_T5.png",
                                          "caption":  "Shell Rotella T5 10W-30",
                                          "name":  "06_Freightliner_Oil_Rotella_T5.png",
                                          "type":  "image"
                                      }
                                  ],
                       "notes":  "",
                       "shopUrgency":  "",
                       "createdAt":  "2026-11-08T15:00:00.000Z",
                       "updatedAt":  "2026-11-10T21:04:41.726Z"
                   },
                   {
                       "id":  "issue-1794148785452",
                       "categoryId":  "truck_anatomy",
                       "title":  "Freightliner Coolant / Antifreeze",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [
                                           "Extended Life Coolant (ELC) contains Organic Acid Technology (OAT)"
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/05_Freightliner_Coolant_OAT.png",
                                          "caption":  "Freightliner Approved Coolant / Antifreeze: ELC OAT 50/50 Premix (Red/Pink)",
                                          "name":  "05_Freightliner_Coolant_OAT.png",
                                          "type":  "image"
                                      }
                                  ],
                       "notes":  "",
                       "shopUrgency":  "",
                       "createdAt":  "2026-11-08T15:10:00.000Z",
                       "updatedAt":  "2026-11-10T21:04:29.356Z"
                   },
                   {
                       "id":  "sop-pre-trip-inspection",
                       "categoryId":  "fleet_instructions",
                       "title":  "Pre-Trip Inspection (PTI)",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [
                                           "1. All tires on the truck and trailer",
                                           "2. Mud flaps on the truck and trailer",
                                           "3. Liquid levels (oil, coolant, windshield washer, power steering)",
                                           "4. Air lines",
                                           "5. Trailer doors and landing gears",
                                           "6. Truck and trailer pictures from all sides",
                                           "7. Truck and trailer brake pads",
                                           "8. Tires with air pressure gauge showing PSI"
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/07_PreTrip_Tire_Air_Gauge.png",
                                          "caption":  "Air Pressure Tire Gauge",
                                          "name":  "07_PreTrip_Tire_Air_Gauge.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/08_PreTrip_Tire_Gauge_Measurement.png",
                                          "caption":  "PTI example",
                                          "name":  "08_PreTrip_Tire_Gauge_Measurement.png",
                                          "type":  "image"
                                      }
                                  ],
                       "updatedAt":  "2026-11-10T20:47:21.657Z",
                       "shopUrgency":  "routine_sop",
                       "notes":  "RECOMMENDED COLD TIRE PRESSURES (Class 8 / 295/75R22.5):\n\nSteer Axle Tires: 115 PSI (Cold) [Acceptable range: 110 - 120 PSI]\nDrive Tandem Duals: 100 PSI (Cold) [Acceptable range: 95 - 105 PSI]\nTrailer Tandem Duals: 100 PSI (Cold) [Acceptable range: 95 - 105 PSI]"
                   },
                   {
                       "id":  "sop-ryder-swap",
                       "categoryId":  "fleet_instructions",
                       "title":  "Ryder Unit Swap Procedure",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [
                                           "1) Need to make sure driver retrieve everything prepass, samsara, samsara dashcam, pt30, trip folder, fridge, microwave, straps, chains.(request photo proofs)",
                                           "2) Need to install everything on the sub",
                                           "3) Make sure driver will send good pictures of SUB from all sides including fuel level at the moment of pickup/drop (if any external damages will be found make sure driver will mention it)",
                                           "4) Need to print out company decals, annual inspection and registration for the sub unit right after driver will start driving the sub. Company decals needs to be stick on both sides of the doors. AI and registration can be requested from the same Ryder you are getting the sub or any other Ryder",
                                           "5) Copy the picture of SUB fuel level send it to “ABA fleet” tagging all the accounting with the date of drop/pickup and transponder# (prepass)",
                                           "6) Get Ryder email and send pictures of the pickup/drop THE SAME DAY. Example of the email (0101shop@ryder.com)"
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/09_PT30_ELD_Cable.png",
                                          "caption":  "PT30 ELD Diagnostic Cable for RP1226 Diagnostic Port",
                                          "name":  "09_PT30_ELD_Cable.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/10_Samsara_Device_Gateway.png",
                                          "caption":  "Samsara Vehicle Gateway (VG54 / VG55 Telematics Device)",
                                          "name":  "10_Samsara_Device_Gateway.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/11_Prepass_Transponder.png",
                                          "caption":  "PrePass Weigh Station \u0026 Toll Bypass Transponder",
                                          "name":  "11_Prepass_Transponder.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/12_Samsara_Dashcam.png",
                                          "caption":  "Samsara Dual-Facing AI Dash Cam (CM31 / CM32)",
                                          "name":  "12_Samsara_Dashcam.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/13_Freightliner_Dashboard_Cluster.png",
                                          "caption":  "Dashboard",
                                          "name":  "13_Freightliner_Dashboard_Cluster.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/14_Message_Fuel_Level_Example.png",
                                          "caption":  "Message example",
                                          "name":  "14_Message_Fuel_Level_Example.png",
                                          "type":  "image"
                                      },
                                      {
                                          "url":  "uploads/15_ABA_Carriers_Red_Decals.pdf",
                                          "name":  "15_ABA_Carriers_Red_Decals.pdf",
                                          "size":  0,
                                          "type":  "pdf",
                                          "caption":  "Official ABA Carriers Decals"
                                      }
                                  ],
                       "updatedAt":  "2026-11-10T20:53:54.013Z",
                       "shopUrgency":  "",
                       "notes":  ""
                   },
                   {
                       "id":  "sop-accident-emergency-protocol",
                       "categoryId":  "accidents",
                       "title":  "In Case of an Accident, Always Request the Following Information:",
                       "dashCodes":  "",
                       "symptoms":  [

                                    ],
                       "driverSteps":  [
                                           "- photos of the damages to our unit",
                                           "- photos of the damages to other unit as many as possible",
                                           "- videos",
                                           "- other driver\u0027s CDL",
                                           "- other driver\u0027s insurance info",
                                           "- other vehicle\u0027s registration, MC, USDOT",
                                           "- other vehicle\u0027s plate number",
                                           "- other vehicle\u0027s insurance info"
                                       ],
                       "images":  [
                                      {
                                          "url":  "uploads/img_6a9eb706_image.png",
                                          "caption":  "TRUCK \u0026 TRL DAMAGES (Telegram Group Example)",
                                          "name":  "image.png",
                                          "type":  "image"
                                      }
                                  ],
                       "notes":  "All the damages to our unit send to this group: TRUCK \u0026 TRL DAMAGES\n\nIn case if police is asking for the video just tell that you don\u0027t have an access, permission to do it and don\u0027t provide any files",
                       "updatedAt":  "2026-11-10T21:03:18.698Z",
                       "shopUrgency":  "towing_accident"
                   },
                   {
                       "id":  "glass-cracked-windshield",
                       "categoryId":  "safety_cab",
                       "title":  "Cracked Windshield \u0026 Stone Chips (DOT 393.60 Compliance)",
                       "dashCodes":  "Visual Pre-Trip Inspection | DOT Scale Out-of-Service Risk",
                       "symptoms":  [
                                        "Stone chip, bullseye, or star crack caused by road debris",
                                        "Horizontal or vertical crack expanding across driver\u0027s field of view",
                                        "Wiper blades snagging, chattering, or tearing over glass fracture"
                                    ],
                       "driverSteps":  [
                                           "1. Check crack location and size immediately with a tape measure or coin.",
                                           "2. DOT 393.60 CRITICAL SWEEP ZONE: Cracks or chips of ANY size are strictly prohibited in the driver critical viewing area (8.5 inches wide by 11 inches high centered directly above the steering wheel rim). Any damage here is an automatic DOT citation or Out of Service.",
                                           "3. ALLOWABLE DAMAGE (OUTSIDE CRITICAL AREA): An isolated stone chip under 3/4 inch diameter (penny size), or a single crack that does NOT intersect with another crack is legally permitted outside the driver sweep area, provided it is at least 3 inches away from any other fracture.",
                                           "4. INTERSECTING CRACK BAN: If two cracks touch or cross each other (spider-web pattern), it is an automatic Out-of-Service violation regardless of where it is on the glass.",
                                           "5. TEMP REPAIR: Apply a strip of clear packing tape over the chip immediately to block road dirt, salt, and washer fluid from contaminating the resin cavity.",
                                           "6. If chip is under 1 inch and non-branching: Dispatch can route driver to a Love\u0027s, Pilot, or Safelite bay for a $65 resin injection repair before temperature changes cause it to run across the entire windshield.",
                                           "7. If crack exceeds 6 inches: Full glass replacement is required. Send clear photos holding a tape measure against the crack to dispatch."
                                       ],
                       "images":  [
                                      "assets/windshield_dot_spec.svg"
                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "sensor-lane-departure",
                       "categoryId":  "safety_cab",
                       "title":  "Lane Departure Warning / Detroit Assurance Camera Unavailable",
                       "dashCodes":  "Camera Icon Amber | \u0027Lane Departure Unavailable\u0027 | \u0027Clean Windshield\u0027",
                       "symptoms":  [
                                        "Amber camera warning icon illuminated on instrument cluster",
                                        "Lane departure warning rumble beeps disabled",
                                        "Digital dash display reads \u0027Camera View Obstructed\u0027 or \u0027Active Brake Assist Limited\u0027"
                                    ],
                       "driverSteps":  [
                                           "1. Safely pull over at the next rest area or truck stop fuel island.",
                                           "2. Step outside and inspect the upper center of the windshield where the forward optical camera pod is mounted behind the rearview mirror.",
                                           "3. Clean exterior glass directly in front of camera lens using glass cleaner and squeegee. Remove squashed bugs, frost, ice glaze, road salt crust, and oily diesel film.",
                                           "4. Inspect windshield wiper blades: If the upper wiper blade is split, skipping, or streaking directly across the camera viewing window, replace the wiper blade ($15).",
                                           "5. Turn cab HVAC defroster on HIGH heat to clear any interior windshield fogging or condensation trapped inside the camera plastic bracket.",
                                           "6. Clear dashboard top: Ensure clipboards, hats, dashboard covers, or toll transponders are not reflecting glare into the bottom of the camera lens pod.",
                                           "7. Turn ignition OFF for 2 full minutes to let the Detroit Assurance camera module power cycle, then start engine and roll above 15 MPH to verify fault clears."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "scheduled_shop"
                   },
                   {
                       "id":  "sensor-radar-obstructed",
                       "categoryId":  "safety_cab",
                       "title":  "Forward Radar Sensor Obstructed / Active Brake Assist Disabled",
                       "dashCodes":  "ABA Warning Triangle | \u0027Radar Obstructed\u0027 | Adaptive Cruise Disabled",
                       "symptoms":  [
                                        "Adaptive Cruise Control (ACC) cannot be engaged or disengages suddenly",
                                        "Active Brake Assist (ABA) disabled warning chime",
                                        "Forward vehicle distance indicator disappears from cluster"
                                    ],
                       "driverSteps":  [
                                           "1. Pull into a safe parking spot or rest area.",
                                           "2. Walk to the front center bumper where the Detroit Assurance radar sensor box is located.",
                                           "3. Check for heavy packed snow, slush, road grime, or dried mud caked over the smooth black plastic radar cover.",
                                           "4. Gently wipe the radar surface clean using washer fluid and a soft microfiber towel. DO NOT use metal tools or rigid ice scrapers, which scratch the radar lens and degrade radio frequency signals.",
                                           "5. Check bumper alignment: If the bumper was bumped against a snow bank or dock seal, even a 5-degree bend changes radar pitch and disables the system until mechanical recalibration.",
                                           "6. Check the electrical wiring harness behind the bumper bracket to confirm plug is seated firmly and not damaged by road debris.",
                                           "7. Restart engine and drive above 25 MPH on clear road for 1-2 miles. The radar automatically recalibrates and fault clears."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "driver_fix"
                   },
                   {
                       "id":  "mech-fifth-wheel-jaws",
                       "categoryId":  "safety_cab",
                       "title":  "Fifth Wheel Jaws Won\u0027t Lock / Release Handle Stuck Open",
                       "dashCodes":  "Trailer Coupling Defect | Pre-Trip Tug Test Failure",
                       "symptoms":  [
                                        "Tractor backs under trailer, but secondary safety latch does not drop into place",
                                        "Fifth wheel release handle stays pulled out",
                                        "Vertical gap visible between trailer upper coupler plate and fifth wheel top"
                                    ],
                       "driverSteps":  [
                                           "1. STOP immediately. Never pull a trailer without 100% visual kingpin jaw verification!",
                                           "2. Lower landing gear or use tractor rear air suspension dump switch so trailer apron plate rests flush on fifth wheel with ZERO vertical gap.",
                                           "3. Inspect jaws with flashlight: If jaws are in the closed/tripped position without kingpin inside, use a long screwdriver or pry bar to trip the release lever inside the throat so jaws spring open.",
                                           "4. In winter cold: Old grease solidifies like hardened wax. Spray locking mechanism generously with penetrating oil (PB Blaster, WD-40, or brake cleaner) to dissolve hardened grease.",
                                           "5. Back under trailer with positive momentum (firm 2-3 MPH contact) until jaws snap closed with a loud metallic clunk.",
                                           "6. FLASHLIGHT INSPECTION (MANDATORY): Step between tractor drive tires with flashlight. Look into the throat: verify locking jaws or slide bar wrap completely 360 degrees around the narrow shank of the trailer kingpin.",
                                           "7. Perform positive tug test in 1st gear against trailer spring brakes before raising landing gear."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "mech-steering-play",
                       "categoryId":  "safety_cab",
                       "title":  "Steering Wheel Free Play \u0026 Front-End Wander (DOT 393.209 Limit)",
                       "dashCodes":  "DOT Scale Inspection Out-of-Service Risk",
                       "symptoms":  [
                                        "Steering wheel has more than 2 inches of loose play before front steer tires turn",
                                        "Truck wanders in highway lanes requiring constant driver steering correction",
                                        "Clunking or popping noise when turning steering wheel at low speeds"
                                    ],
                       "driverSteps":  [
                                           "1. Park on flat pavement with wheels pointed straight ahead. Engine running.",
                                           "2. DOT 393.209 REGULATION: For standard 20-inch Freightliner steering wheel, free play CANNOT exceed 2.25 inches (5.7 cm). Any free play over 2.5 inches is an automatic OUT OF SERVICE violation at weigh stations.",
                                           "3. Measure free play: Turn steering wheel lightly until steer tires begin to move; measure distance traveled along the rim of the wheel.",
                                           "4. Inspect intermediate steering shaft under hood: Check upper and lower U-joints and slip joint splines for loose wiggle.",
                                           "5. Check drag link and tie rod ends: Have driver wiggle steering wheel while checking ball sockets for vertical slop.",
                                           "6. Inspect power steering fluid reservoir: Verify fluid is between MIN and MAX hot marks (Dexron III / ATF)."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "mech-mud-flap-torn",
                       "categoryId":  "safety_cab",
                       "title":  "Mud Flap Torn / Missing on Tractor or Trailer (DOT 393.86)",
                       "dashCodes":  "Visual Pre-Trip Defect | Weigh Station Level 2 Violation",
                       "symptoms":  [
                                        "Mud flap torn off by curb, tire tread debris, or trailer backing into dock",
                                        "Mud flap sailing high in the wind or dragging on pavement"
                                    ],
                       "driverSteps":  [
                                           "1. DO NOT cross state weigh stations with a missing or raggedly torn mud flap. DOT scale officers issue instant citations for spray suppressant violations.",
                                           "2. DOT LAW: Mud flap must be no more than 8 inches from the road surface and wide enough to cover the full tread width of rear dual tires.",
                                           "3. If flap is loose: Re-tighten the 4 mounting carriage bolts and spring hanger bracket.",
                                           "4. If flap is ripped in half on the road: Buy a standard replacement mud flap (24x30 or 24x36) inside the truck stop store ($18-$25).",
                                           "5. EMERGENCY TEMP REPAIR: If bolt holes ripped through rubber: Punch 4 new holes 2 inches lower in the remaining rubber using a pocketknife or screwdriver and remount flap.",
                                           "6. Ensure anti-sail metal bracket or weight is attached so flap does not sail above legal height at highway speeds."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "scheduled_shop"
                   },
                   {
                       "id":  "brake-air-dryer-purge",
                       "categoryId":  "brakes",
                       "title":  "Air Dryer Purge Valve Stuck Open / Continuous Air Hiss",
                       "dashCodes":  "Air Needles Drop Rapidly | Low Air Warning Buzzer \u003c 60 PSI",
                       "symptoms":  [
                                        "Continuous loud air rushing sound under cab behind front axle",
                                        "Air compressor runs continuously but primary/secondary needles cannot reach 120 PSI",
                                        "Air dryer purges every 5-10 seconds instead of once every few minutes"
                                    ],
                       "driverSteps":  [
                                           "1. Park truck safely, set yellow tractor brake.",
                                           "2. Step out and locate the Bendix AD-9 or AD-IS air dryer mounted on frame rail behind front driver steer tire.",
                                           "3. Listen at the bottom purge exhaust port. If air is steadily blasting out without stopping, the internal purge valve cartridge is stuck open with carbon/dirt or moisture ice.",
                                           "4. QUICK UNSTICK TRICK: Take a 1/2 inch wrench or small hammer and gently tap the aluminum body of the air dryer near the governor and purge valve 3-4 times. This often jars the spring-loaded shuttle valve back into its seat.",
                                           "5. Drain manual air tank pull-lanyards on primary and wet air tanks under battery box to dump excess oil/water sludge.",
                                           "6. In sub-freezing weather: Pour 2 ounces of Air Brake Antifreeze into compressor intake or thaw bottom purge valve heater (check 15A fuse labeled \u0027Air Dryer Heater\u0027).",
                                           "7. If air continues blasting uncontrollably: Purge valve cartridge seat is blown and needs a quick-change replacement kit ($45 part at any Loves/Pilot)."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T06:10:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "tire-nail-slow-leak",
                       "categoryId":  "tires",
                       "title":  "Nail / Screw in Drive or Trailer Tire (Slow Leak)",
                       "dashCodes":  "TPMS Warning Light | Audible hiss or visible puncture",
                       "symptoms":  [
                                        "Driver spots nail/screw during walk-around pre-trip or post-trip",
                                        "Tire gauge reads 75-85 PSI instead of normal 100 PSI",
                                        "Slow hiss or soapy bubbles around screw head"
                                    ],
                       "driverSteps":  [
                                           "1. DO NOT REMOVE THE NAIL OR SCREW! Leaving it in place acts as a plug and slows down air loss.",
                                           "2. Use tire pressure gauge to check current PSI (standard cold PSI is 100-105).",
                                           "3. If PSI is above 75 PSI: Hook up the emergency air hose to the red gladhand or cab chuck, and pump tire up to 105 PSI.",
                                           "4. Search closest truck stop (Love\u0027s, Pilot, TA, Petro) on route within 30-45 minutes.",
                                           "5. Drive at moderate speed (55-60 MPH) directly to the truck stop tire shop bay. A tire plug/patch in the shop is only $40-$65 vs $500+ roadside fee.",
                                           "6. If nail is in STEER tire: Steer tires CANNOT be plugged by DOT law. Steer must be inspected and replaced.",
                                           "7. If nail is in sidewall or shoulder: Cannot be patched legally. Tire must be replaced."
                                       ],
                       "images":  [
                                      "assets/tire_repair_zone.svg"
                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "tire-steer-worn-tread",
                       "categoryId":  "tires",
                       "title":  "Steer Tire Tread Depth \u0026 Wear Pattern",
                       "dashCodes":  "DOT Inspection Failure Risk",
                       "symptoms":  [
                                        "Cupping, river wear, or shoulder wear on steer tires",
                                        "Steering wheel wobble or pull to one side",
                                        "Tread depth approaching DOT legal minimum"
                                    ],
                       "driverSteps":  [
                                           "1. Check tread depth with tread gauge or coin in 2 adjacent major grooves.",
                                           "2. DOT LAW: Steer tires MUST have at least 4/32 inch (3.2 mm) tread depth. Drive and trailer tires must have at least 2/32 inch (1.6 mm).",
                                           "3. Check for exposed steel belts or deep cuts down to fabric (automatic Out of Service at weigh station).",
                                           "4. If steer tire is 3/32\" or lower, dispatch must schedule replacement at next terminal or Loves fleet account before crossing state line scale.",
                                           "5. Check steer air pressure - unequal pressure (e.g. 95 vs 115 PSI) causes rapid shoulder wear."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "emis-parked-regen",
                       "categoryId":  "emissions",
                       "title":  "DPF Soot Level High / Parked Regen Procedure",
                       "dashCodes":  "DPF Lamp Solid / Flashing | HEST Lamp | High Soot Code",
                       "symptoms":  [
                                        "DPF icon illuminated on Freightliner dash cluster",
                                        "Message \u0027Parked Regen Required\u0027 in digital center display",
                                        "Engine power slightly reduced"
                                    ],
                       "driverSteps":  [
                                           "1. Safely park the truck in an open outdoor paved area. DO NOT park over dry grass or trash (exhaust gets up to 1100°F!).",
                                           "2. Shift transmission into NEUTRAL (N).",
                                           "3. Set tractor and trailer PARKING BRAKES (Yellow and Red valves pulled OUT).",
                                           "4. Release foot off brake and accelerator pedals completely. Disengage cruise control switch.",
                                           "5. Engine coolant temperature must be at least 150°F (warm engine).",
                                           "6. Locate the DPF REGEN dash toggle switch. Push and HOLD the switch for 5-7 seconds until you hear engine RPM increase to 1100-1400 RPM.",
                                           "7. DO NOT touch the pedals or shift lever during the cycle! The cycle takes 30-45 minutes.",
                                           "8. When finished, engine idle will return to 600 RPM and DPF light will turn OFF."
                                       ],
                       "images":  [
                                      "assets/freightliner_dash_dpf.svg"
                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "driver_fix"
                   },
                   {
                       "id":  "emis-def-derate-timer",
                       "categoryId":  "emissions",
                       "title":  "DEF Low / 5 MPH Speed Derate Warning",
                       "dashCodes":  "SPN 5246 FMI 0 | DEF Lamp Flashing | 5 MPH Derate in XX Miles",
                       "symptoms":  [
                                        "DEF gauge empty or red warning light blinking",
                                        "Message \u0027Engine Derate in XX miles\u0027 or \u0027Speed Limited to 55 MPH / 5 MPH\u0027",
                                        "Check Engine lamp lit"
                                    ],
                       "driverSteps":  [
                                           "1. Check physical DEF level in DEF tank on driver side skirt.",
                                           "2. If DEF tank is under 1/4 full: Buy 2-3 jugs of BlueDEF or fill up at the truck stop DEF fuel island pump immediately.",
                                           "3. After adding DEF: Turn key to ON position for 60 seconds without starting to allow DEF level sensor to calibrate.",
                                           "4. Start engine and let idle for 5 minutes. The derate timer should clear.",
                                           "5. If DEF tank is already FULL but dash says empty: DEF header quality sensor failure. Do a hard master battery disconnect reset for 15 minutes."
                                       ],
                       "images":  [
                                      "assets/freightliner_dash_dpf.svg"
                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "brake-air-gladhand-leak",
                       "categoryId":  "brakes",
                       "title":  "Air Leak at Gladhands / Trailer Air Supply Loss",
                       "dashCodes":  "Low Air Buzzer \u003c 60 PSI | Air Needle Won\u0027t Build to 120 PSI",
                       "symptoms":  [
                                        "Loud hissing air sound between back of tractor cab and trailer nose",
                                        "Primary or Secondary air pressure drops rapidly when red button is pushed",
                                        "Trailer spring brakes drag or smoke from lack of release pressure"
                                    ],
                       "driverSteps":  [
                                           "1. Put tractor parking brake on (yellow knob OUT). Leave trailer charged (red knob IN) to locate leak.",
                                           "2. Step between cab and trailer. Listen for hiss at Red (Emergency/Supply) and Blue (Service) gladhands.",
                                           "3. Disconnect the gladhands by twisting upward 90 degrees.",
                                           "4. Inspect the black rubber grommet/seal inside both tractor and trailer gladhands.",
                                           "5. QUICK FIX: If seal is damaged and no spare: Pop the rubber seal out with a pocket knife or flat screwdriver, flip it around 180 degrees, and reinstall backwards (the other side is fresh and will seal tight!).",
                                           "6. Re-couple gladhands firmly until locking tabs seat.",
                                           "7. Check air dryer purge valve underneath truck behind front steer axle - if purging continuously, tap air dryer governor lightly with wrench handle to unstick shuttle valve."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "driver_fix"
                   },
                   {
                       "id":  "brake-frozen-lines-winter",
                       "categoryId":  "brakes",
                       "title":  "Frozen Air Lines \u0026 Trailer Brakes Locked in Winter",
                       "dashCodes":  "Trailer Won\u0027t Move | Wheels Dragging in Snow | Air Won\u0027t Reach Trailer",
                       "symptoms":  [
                                        "Temperatures below 20°F (-7°C)",
                                        "Red trailer air supply button pushed in, but trailer wheels stay locked and drag",
                                        "Air pressure gauges in tractor show full 120 PSI, but zero air reaches trailer"
                                    ],
                       "driverSteps":  [
                                           "1. DO NOT try to drag trailer across the parking lot - you will flat-spot and ruin all 8 trailer tires ($3,000 damage)!",
                                           "2. Buy 1 bottle of Air Brake Antifreeze (Methanol / Air Brake Conditioner) at truck stop.",
                                           "3. Disconnect RED trailer supply gladhand from tractor.",
                                           "4. Pour 3-4 ounces (half a cup) of Air Brake Antifreeze directly down the red trailer hose / gladhand opening.",
                                           "5. Also pour 2 ounces into the tractor red emergency line.",
                                           "6. Reconnect red gladhand firmly.",
                                           "7. In cab, push RED knob IN and pull OUT 4-5 times to pump alcohol vapor through the valves and melt the ice blockage.",
                                           "8. Tap trailer brake drums gently with a hammer if brake shoes are frozen to the iron drum with slush."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "driver_fix"
                   },
                   {
                       "id":  "trans-dt12-clutch-stuck",
                       "categoryId":  "transmission",
                       "title":  "Freightliner DT12 Transmission Fault / Won\u0027t Engage Gear",
                       "dashCodes":  "TRANS FAULT | Flashing \u0027N\u0027 | Transmission Malfunction",
                       "symptoms":  [
                                        "Transmission stays in \u0027N\u0027 and will not shift into Drive (D) or Reverse (R)",
                                        "Clutch actuator chatter or air hiss during shift attempt",
                                        "\u0027Transmission Service Required\u0027 message"
                                    ],
                       "driverSteps":  [
                                           "1. Check air system pressure! Detroit DT12 uses compressed air to shift gears. If primary air pressure is under 90 PSI, transmission CANNOT shift into gear. Build air to 120 PSI first.",
                                           "2. Step firmly on foot brake pedal and try shifting again.",
                                           "3. If air is 120 PSI and pedal is pressed but still stuck in N: Perform a hard ECM/TCM Power Cycle Reset.",
                                           "4. Turn ignition key completely OFF. Remove key.",
                                           "5. Exit cab, close door, lock cab.",
                                           "6. Turn off the Main Battery Disconnect switch (usually located on base of driver seat or near battery box).",
                                           "7. Wait a FULL 10 MINUTES. This allows all transmission control capacitors to drain to zero.",
                                           "8. Turn Battery Disconnect back ON. Insert key, turn to ON (do not start yet), wait 30 seconds for self-check clicks under floorboard.",
                                           "9. Start engine, hold foot brake firmly, shift to D. 80% of transient electronic glitches clear after this reset."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "urgent_shop"
                   },
                   {
                       "id":  "hvac-bunk-heater-webasto",
                       "categoryId":  "hvac",
                       "title":  "Bunk Auxiliary Heater (Webasto / Espar) Won\u0027t Start",
                       "dashCodes":  "Bunk Controller Error Code (F01, F02, E01) | Fan Blows Cold Air",
                       "symptoms":  [
                                        "Controller clicks, fan runs 30 seconds blowing cold air, then shuts off",
                                        "Error code on thermostat dial (e.g., F01 = No start, F02 = Flame out)",
                                        "Driver cold in sleeper at night"
                                    ],
                       "driverSteps":  [
                                           "1. CHECK FUEL LEVEL IN DIESEL TANKS! Auxiliary bunk heater fuel pickup straw inside the diesel tank stops at 1/4 tank! This is a safety feature so the heater never drains the tank below 25%, allowing the engine to start in the morning. If fuel is under 1/4 tank, heater will starve for fuel.",
                                           "2. Step outside truck, look underneath cab behind driver door where the small bunk heater exhaust pipe sticks out. Is the exhaust pipe packed with ice, slush, or road mud? Clear pipe with a screwdriver.",
                                           "3. PERFORM HEATER FUSE RESET:",
                                           "4. Turn thermostat dial switch to ON.",
                                           "5. Go to fuse panel (in glove box or under passenger kick panel) and pull the 20A yellow fuse labeled \u0027Aux Heater / Sleeper HVAC\u0027.",
                                           "6. Wait 10 seconds with fuse out.",
                                           "7. Turn thermostat switch OFF in sleeper.",
                                           "8. Reinsert the 20A fuse into fuse panel.",
                                           "9. Turn thermostat ON again. The unit will attempt a fresh ignition cycle."
                                       ],
                       "images":  [

                                  ],
                       "updatedAt":  "2026-11-08T05:30:00Z",
                       "shopUrgency":  "scheduled_shop"
                   }
               ],
    "trash":  [
                  {
                      "id":  "eng-coolant-leak",
                      "categoryId":  "engine",
                      "title":  "Coolant Leak / Low Coolant Level",
                      "dashCodes":  "SPN 111 FMI 1 | Red or Amber Engine Lamp | Low Coolant Light",
                      "symptoms":  [
                                       "Low Coolant warning light and chime on dashboard",
                                       "Sweet chemical smell from engine bay or AC vents",
                                       "Temperature gauge climbing above 215°F",
                                       "Pink/Red fluid dripping under front axle or bumper"
                                   ],
                      "driverSteps":  [
                                          "1. Safely pull over at the nearest truck stop or safe shoulder. Put on high-visibility vest and hazard lights.",
                                          "2. DO NOT immediately open the surge tank cap while engine is hot! Risk of severe burns from boiling coolant under pressure.",
                                          "3. Wait 15-20 minutes for engine to cool down. Use a thick towel/rag to slowly twist the cap 1/4 turn to relieve pressure.",
                                          "4. Inspect coolant level in the translucent plastic surge tank against the MIN / MAX COLD line.",
                                          "5. Visually inspect upper/lower radiator hoses, water pump weep hole, and EGR cooler lines with a flashlight for pink wet crust.",
                                          "6. If level is low without an active pouring leak: Top up with 50/50 Red Extended Life Coolant (Rotella ELC or Peak Final Charge).",
                                          "7. Ensure cap is tightened until it clicks firmly. Restart engine and verify the dash light clears."
                                      ],
                      "images":  [
                                     {
                                         "url":  "uploads/05_Freightliner_Coolant_OAT.png",
                                         "caption":  "Freightliner Approved Coolant / Antifreeze: ELC OAT 50/50 Premix (Red/Pink)",
                                         "name":  "05_Freightliner_Coolant_OAT.png",
                                         "type":  "image"
                                     },
                                     "assets/coolant_surge_tank.svg"
                                 ],
                      "updatedAt":  "2026-11-08T17:45:00Z",
                      "shopUrgency":  "urgent_shop",
                      "deletedAt":  "2026-11-10T21:06:38.107Z"
                  },
                  {
                      "id":  "eng-oil-pressure-low",
                      "categoryId":  "engine",
                      "title":  "Low Engine Oil Pressure / Red Stop Engine",
                      "dashCodes":  "SPN 100 FMI 1 | RED STOP ENGINE | Oil Can Symbol",
                      "symptoms":  [
                                       "Oil pressure gauge drops below 15 PSI at idle or below 25 PSI under load",
                                       "Red STOP ENGINE lamp illuminated with continuous alarm buzzer",
                                       "Engine knock, ticking, or mechanical clatter"
                                   ],
                      "driverSteps":  [
                                          "1. PULL OVER AND SHUT OFF ENGINE RIGHT AWAY. Running without oil pressure will destroy engine bearings in 60 seconds.",
                                          "2. Park on flat level ground. Set parking brakes, deploy emergency triangles 100 ft behind truck.",
                                          "3. Wait 10 minutes for oil to drain completely into the oil pan.",
                                          "4. Pull oil dipstick, wipe clean with rag, re-insert fully, and pull again to read oil level.",
                                          "5. Inspect underneath for blown oil filter seal, punctured oil pan, or loose drain plug.",
                                          "6. If dipstick is dry: Add 1-2 gallons of 15W-40 or 10W-30 CK-4 heavy duty engine oil before any restart attempt.",
                                          "7. If oil level is full on dipstick but dash reads 0 PSI: Oil pressure sensor or internal oil pump failure. DO NOT DRIVE."
                                      ],
                      "images":  [
                                     {
                                         "url":  "uploads/06_Freightliner_Oil_Rotella_T5.png",
                                         "caption":  "Freightliner Approved Engine Oil: Shell Rotella T5 10W-30 Synthetic Blend",
                                         "name":  "06_Freightliner_Oil_Rotella_T5.png",
                                         "type":  "image"
                                     }
                                 ],
                      "updatedAt":  "2026-11-08T17:45:00Z",
                      "shopUrgency":  "urgent_shop",
                      "deletedAt":  "2026-11-10T21:06:34.935Z"
                  }
              ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SEED_DATABASE };
}