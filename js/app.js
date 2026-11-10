/**
 * Freightliner FleetOps Knowledge Base - Core Application
 * Minimal & Clean Edition
 */

const STORAGE_KEY = 'freightliner_fleetops_db_v5';

const AppState = {
  db: {
    categories: [],
    issues: []
  },
  serverMode: false,
  selectedCategory: 'all',
  selectedUrgency: 'all',
  searchQuery: '',
  currentIssue: null
};

// Attachment & Media helper functions (Images, PDFs, Word, Excel, CSV, ZIP, etc.)
function getAttachmentUrl(item) {
  if (!item) return '';
  let url = typeof item === 'string' ? item : (item.url || '');
  if (url.startsWith('/uploads/')) url = url.substring(1);
  if (url.startsWith('/assets/')) url = url.substring(1);
  return url;
}
const getImageUrl = getAttachmentUrl;

const KNOWN_CAPTIONS = {
  '01_Tractor_Truck_Parts_Diagram_1.png': 'Diagram 1: Tractor Front & Cab Anatomy (Exterior Cab, Hood, Bumper, Mirrors)',
  '02_Tractor_Truck_Parts_Diagram_2.png': 'Diagram 2: Chassis & Powertrain Nomenclature (Chassis, Tanks, DPF, Fifth Wheel)',
  '03_Tractor_Truck_Parts_Diagram_3.png': 'Diagram 3: Drive Axles, Suspension & Air Brakes (Tandem Axles, Brakes, Tires)',
  '04_Reset_AC_and_HVAC_Cascadia.png': 'Freightliner Cascadia AC & HVAC Control Panel Reset (A/C + Recirculation Buttons)',
  '05_Freightliner_Coolant_OAT.png': 'Freightliner Approved Coolant / Antifreeze: ELC OAT 50/50 Premix (Red/Pink)',
  '06_Freightliner_Oil_Rotella_T5.png': 'Freightliner Approved Engine Oil: Shell Rotella T5 10W-30 Synthetic Blend',
  '07_PreTrip_Tire_Air_Gauge.png': 'Pre-Trip Inspection: Professional Tire Pressure Air Gauge Tool',
  '08_PreTrip_Tire_Gauge_Measurement.png': 'Pre-Trip Inspection: Valve Stem PSI Pressure Measurement (Target Cold 100-115 PSI)',
  '09_PT30_ELD_Cable.png': 'PT30 ELD Diagnostic Cable for RP1226 Diagnostic Port',
  '10_Samsara_Device_Gateway.png': 'Samsara Vehicle Gateway (VG54 / VG55 Telematics Device)',
  '11_Prepass_Transponder.png': 'PrePass Weigh Station & Toll Bypass Transponder',
  '12_Samsara_Dashcam.png': 'Samsara Dual-Facing AI Dash Cam (CM31 / CM32)',
  '13_Freightliner_Dashboard_Cluster.png': 'Freightliner Cascadia Digital Instrument Dashboard Cluster',
  '14_Message_Fuel_Level_Example.png': 'Rental Sub Unit Drop/Pickup Fuel Level Reporting Example',
  '15_ABA_Carriers_Red_Decals.pdf': 'Official ABA Carriers Red Door Decals Document'
};

function formatImageTitle(rawName) {
  if (!rawName) return 'Photo Attachment';
  const clean = String(rawName).split('?')[0].split('#')[0];
  const parts = clean.split('/');
  const filename = decodeURIComponent(parts[parts.length - 1] || '');
  if (!filename) return 'Photo Attachment';
  if (KNOWN_CAPTIONS[filename]) return KNOWN_CAPTIONS[filename];
  
  // Strip extension
  let base = filename.replace(/\.[^/.]+$/, '');
  // Remove leading numbers/underscores (e.g. 01_ or 123_)
  base = base.replace(/^\d+[\s_-]*/, '');
  // Replace underscores and hyphens with spaces
  base = base.replace(/[_-]+/g, ' ').trim();
  if (!base) return 'Photo Attachment';
  // Capitalize words
  return base.split(' ').map(w => w ? (w.charAt(0).toUpperCase() + w.slice(1)) : '').join(' ');
}

function getAttachmentCaption(item) {
  if (!item) return '';
  if (typeof item === 'object' && item.caption && String(item.caption).trim()) {
    return String(item.caption).trim();
  }
  const raw = typeof item === 'object' ? (item.name || item.url || '') : item;
  return formatImageTitle(raw);
}
const getImageCaption = getAttachmentCaption;

function getAttachmentName(item) {
  if (!item) return 'Attachment';
  if (typeof item === 'object' && item.name) return item.name;
  const url = getAttachmentUrl(item);
  if (!url) return 'Attachment';
  if (url.startsWith('data:')) {
    const mime = url.substring(5, url.indexOf(';') > 0 ? url.indexOf(';') : 25);
    if (mime.includes('pdf')) return 'Document.pdf';
    if (mime.includes('image')) return 'Image.png';
    return 'File';
  }
  const clean = url.split('?')[0].split('#')[0];
  const parts = clean.split('/');
  const last = parts[parts.length - 1];
  return last ? decodeURIComponent(last) : 'Attachment';
}

function getFileType(item) {
  if (item && item.type) return item.type;
  const url = getAttachmentUrl(item);
  const name = getAttachmentName(item);
  const target = (name + ' ' + url).toLowerCase();

  if (target.includes('.pdf') || url.startsWith('data:application/pdf')) return 'pdf';
  if (target.includes('.doc') || target.includes('.docx') || target.includes('.rtf') || target.includes('.txt')) return 'doc';
  if (target.includes('.xls') || target.includes('.xlsx') || target.includes('.csv')) return 'sheet';
  if (target.includes('.zip') || target.includes('.rar') || target.includes('.7z') || target.includes('.tar') || target.includes('.gz')) return 'archive';
  if (target.includes('.png') || target.includes('.jpg') || target.includes('.jpeg') || target.includes('.webp') || target.includes('.svg') || target.includes('.gif') || url.startsWith('data:image/')) return 'image';

  return 'file';
}

function isImageAttachment(item) {
  return getFileType(item) === 'image';
}

function formatFileSize(bytes) {
  if (!bytes || isNaN(bytes) || bytes <= 0) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function getFileBadgeInfo(type) {
  switch (type) {
    case 'pdf':
      return { label: 'PDF', colorClass: 'badge-pdf', icon: '📄', ext: 'PDF' };
    case 'doc':
      return { label: 'DOC', colorClass: 'badge-doc', icon: '📝', ext: 'DOC' };
    case 'sheet':
      return { label: 'SHEET', colorClass: 'badge-sheet', icon: '📊', ext: 'XLS' };
    case 'archive':
      return { label: 'ZIP', colorClass: 'badge-archive', icon: '📦', ext: 'ZIP' };
    default:
      return { label: 'FILE', colorClass: 'badge-file', icon: '📎', ext: 'FILE' };
  }
}

function getAttachmentObj(item) {
  if (!item) return { url: '', name: '', size: 0, type: 'file', caption: '' };
  if (typeof item === 'string') {
    const name = getAttachmentName(item);
    return {
      url: item,
      name: name,
      size: 0,
      type: getFileType(item),
      caption: getAttachmentCaption(item)
    };
  }
  const name = item.name || getAttachmentName(item);
  return {
    url: item.url || '',
    name: name,
    size: item.size || 0,
    type: item.type || getFileType(item),
    caption: (item.caption && String(item.caption).trim()) ? String(item.caption).trim() : getAttachmentCaption(item)
  };
}
const getImageObj = getAttachmentObj;

const blobUrlCache = new Map();

function dataUrlToBlob(dataUrl, defaultMime = 'application/pdf') {
  if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) return null;
  try {
    const parts = dataUrl.split(',');
    if (parts.length < 2) return null;
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : defaultMime;
    const isBase64 = parts[0].indexOf(';base64') !== -1;
    let byteCharacters;
    if (isBase64) {
      byteCharacters = atob(parts[1]);
    } else {
      byteCharacters = decodeURIComponent(parts[1]);
    }
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  } catch (err) {
    console.error('Error converting data URL to Blob:', err);
    return null;
  }
}

function getSafeFileUrl(url, mime = 'application/pdf') {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('data:')) {
    if (blobUrlCache.has(url)) {
      return blobUrlCache.get(url);
    }
    const blob = dataUrlToBlob(url, mime);
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      blobUrlCache.set(url, blobUrl);
      return blobUrl;
    }
    return url;
  }
  // If running from file:// protocol and url has leading slash
  if (url.startsWith('/') && window.location.protocol === 'file:') {
    return '.' + url;
  }
  return url;
}

function downloadFile(url, filename = 'download') {
  if (!url) return;
  const safeUrl = getSafeFileUrl(url);
  const a = document.createElement('a');
  a.href = safeUrl;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    try { document.body.removeChild(a); } catch (e) {}
  }, 150);
}

function openAttachmentFile(item) {
  const doc = getAttachmentObj(item);
  if (!doc || !doc.url) return;
  openMediaLightbox(doc);
}

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initIcons();
  await checkServerAndLoadData();
  setupEventListeners();
  renderApp();
});

// Theme Management (Light / Dark)
function initTheme() {
  const savedTheme = localStorage.getItem('freightliner_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  updateThemeToggleIcon();
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('light-theme');
  const currentTheme = isLight ? 'light' : 'dark';
  localStorage.setItem('freightliner_theme', currentTheme);
  updateThemeToggleIcon();
  showToast(isLight ? 'Switched to White / Light Theme' : 'Switched to Dark Theme', 'info');
}

function updateThemeToggleIcon() {
  const iconContainer = document.getElementById('themeToggleIcon');
  const btn = document.getElementById('themeToggleBtn');
  if (!iconContainer || !btn) return;

  const isLight = document.body.classList.contains('light-theme');
  if (isLight) {
    iconContainer.innerHTML = Icons.moon || '🌙';
    btn.title = 'Switch to Dark Theme';
    btn.setAttribute('aria-label', 'Switch to Dark Theme');
  } else {
    iconContainer.innerHTML = Icons.sun || '☀️';
    btn.title = 'Switch to White / Light Theme';
    btn.setAttribute('aria-label', 'Switch to White / Light Theme');
  }
}

// Check if running via local server or standalone
async function checkServerAndLoadData() {
  updateConnectionStatus('checking', 'Connecting...', 'Checking connection to local server...');
  
  try {
    const res = await fetch('/api/status', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.mode === 'local_server') {
        AppState.serverMode = true;
        updateConnectionStatus('server', 'Auto-Sync Active', 'Local Server Active: All edits, categories & files auto-saved to project folder');
        await loadFromServer();
        return;
      }
    }
  } catch (e) {
    // Local server not running, use browser storage / local file fallback
  }

  // Fallback to IndexedDB / localStorage
  AppState.serverMode = false;
  updateConnectionStatus('offline', 'Standalone', 'Standalone Mode: Launch open_app.bat to auto-sync changes to project folder');
  await loadFromLocal();
}

function updateConnectionStatus(type, text, tooltip) {
  const badge = document.getElementById('connectionStatus');
  if (!badge) return;
  badge.className = 'connection-status ' + (type === 'server' ? '' : 'offline-mode');
  if (tooltip) {
    badge.title = tooltip;
  }
  badge.innerHTML = `<span class="status-dot"></span><span>${text}</span>`;
}

// Merge offline cached data from browser IndexedDB into server DB
function mergeOfflineCachedData(serverDb, cached) {
  if (!cached || !Array.isArray(cached.issues) || !serverDb || !Array.isArray(serverDb.issues)) return;
  
  cached.issues.forEach(cachedIssue => {
    const serverIssue = serverDb.issues.find(si => si.id === cachedIssue.id);
    if (serverIssue) {
      if (Array.isArray(cachedIssue.images) && cachedIssue.images.length > 0) {
        if (!serverIssue.images || serverIssue.images.length === 0) {
          serverIssue.images = JSON.parse(JSON.stringify(cachedIssue.images));
        } else {
          cachedIssue.images.forEach(cImg => {
            const cUrl = getAttachmentUrl(cImg);
            const exists = serverIssue.images.some(sImg => getAttachmentUrl(sImg) === cUrl);
            if (!exists) {
              serverIssue.images.push(cImg);
            }
          });
        }
      }
      if (cachedIssue.updatedAt && (!serverIssue.updatedAt || new Date(cachedIssue.updatedAt) > new Date(serverIssue.updatedAt))) {
        if (cachedIssue.driverSteps) serverIssue.driverSteps = cachedIssue.driverSteps;
        if (cachedIssue.symptoms) serverIssue.symptoms = cachedIssue.symptoms;
        if (cachedIssue.notes) serverIssue.notes = cachedIssue.notes;
        if (cachedIssue.shopUrgency) serverIssue.shopUrgency = cachedIssue.shopUrgency;
        if (cachedIssue.title) serverIssue.title = cachedIssue.title;
      }
    } else {
      serverDb.issues.push(cachedIssue);
    }
  });
}

// Automatically convert & save any pasted Base64 images directly into project "uploads/" folder
async function syncBase64ImagesToDisk() {
  if (!AppState.serverMode || !AppState.db || !Array.isArray(AppState.db.issues)) return 0;
  let syncedCount = 0;

  for (const issue of AppState.db.issues) {
    if (!issue.images || !Array.isArray(issue.images)) continue;

    for (let i = 0; i < issue.images.length; i++) {
      const item = issue.images[i];
      const isObj = typeof item === 'object' && item !== null;
      const url = isObj ? item.url : item;

      if (url && typeof url === 'string' && url.startsWith('data:')) {
        const rawName = (isObj && item.name) ? item.name : `pasted_${issue.id}_${i}.png`;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: rawName,
              base64: url
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (isObj) {
              item.url = data.url;
            } else {
              issue.images[i] = data.url;
            }
            syncedCount++;
          }
        } catch (e) {
          console.warn('Could not sync base64 image to server', e);
        }
      }
    }
  }

  if (syncedCount > 0) {
    await persistDatabase();
    if (AppState.currentIssue) {
      const fresh = AppState.db.issues.find(x => x.id === AppState.currentIssue.id);
      if (fresh) {
        AppState.currentIssue = fresh;
        openIssueDetail(fresh.id);
      }
    }
    renderIssuesList();
    showToast(`Saved ${syncedCount} photo${syncedCount > 1 ? 's' : ''} directly into project "uploads/" folder!`, 'success');
  }
  return syncedCount;
}

// Load from server
async function loadFromServer() {
  try {
    const res = await fetch('/api/database', { cache: 'no-store' });
    if (res.ok) {
      const serverDb = await res.json();

      // Merge any offline images or edits cached in browser's IndexedDB
      try {
        const cached = await getFromIndexedDB();
        if (cached && Array.isArray(cached.issues)) {
          mergeOfflineCachedData(serverDb, cached);
        }
      } catch (e) {
        console.warn('Could not check offline cached data', e);
      }

      AppState.db = serverDb;
      saveToIndexedDB(AppState.db);

      // Automatically convert & save any pasted base64 data to project uploads/ folder
      await syncBase64ImagesToDisk();
    }
  } catch (err) {
    console.warn('Could not load from server API, using local backup', err);
    await loadFromLocal();
  }
}

// Load from local IndexedDB or bundled fallback
async function loadFromLocal() {
  const cached = await getFromIndexedDB();
  if (cached && cached.categories && cached.issues && cached.issues.length > 0) {
    AppState.db = cached;
  } else {
    try {
      const res = await fetch('data/fleet_database.json');
      if (res.ok) {
        AppState.db = await res.json();
        saveToIndexedDB(AppState.db);
        return;
      }
    } catch (e) {}
    
    if (typeof INITIAL_DATABASE !== 'undefined') {
      AppState.db = JSON.parse(JSON.stringify(INITIAL_DATABASE));
      saveToIndexedDB(AppState.db);
    }
  }

  // Automatic Migration: Separate "Truck Anatomy" and "Fleet Instructions"
  if (AppState.db && Array.isArray(AppState.db.categories)) {
    let needsPersist = false;

    // Check if legacy fleet_tips exists
    const fleetTipsCat = AppState.db.categories.find(c => c.id === 'fleet_tips');
    if (fleetTipsCat) {
      fleetTipsCat.id = 'fleet_instructions';
      fleetTipsCat.name = 'Fleet Instructions';
      fleetTipsCat.icon = 'clipboard';
      fleetTipsCat.color = 'amber';
      fleetTipsCat.description = 'Unit swap protocols, PTI walkaround SOP, Samsara ELD setup, DVIR & winter operations';
      needsPersist = true;
    }

    // Ensure truck_anatomy exists
    if (!AppState.db.categories.some(c => c.id === 'truck_anatomy')) {
      AppState.db.categories.unshift({
        id: 'truck_anatomy',
        name: 'Truck Anatomy',
        icon: 'truck',
        color: 'cyan',
        description: 'Truck parts nomenclature, Freightliner Cascadia diagrams, schematics & component photos'
      });
      needsPersist = true;
    }

    // Ensure fleet_instructions exists
    if (!AppState.db.categories.some(c => c.id === 'fleet_instructions')) {
      AppState.db.categories.splice(1, 0, {
        id: 'fleet_instructions',
        name: 'Fleet Instructions',
        icon: 'clipboard',
        color: 'amber',
        description: 'Unit swap protocols, PTI walkaround SOP, Samsara ELD setup, DVIR & winter operations'
      });
      needsPersist = true;
    }

    // Ensure accidents category exists
    if (!AppState.db.categories.some(c => c.id === 'accidents')) {
      const fiIdx = AppState.db.categories.findIndex(c => c.id === 'fleet_instructions');
      const accidentCat = {
        id: 'accidents',
        name: 'Accidents',
        icon: 'alertTriangle',
        color: 'red',
        description: 'Collision protocol, 911 police/EMS, 360° photo checklist, DOT drug & alcohol testing and towing'
      };
      if (fiIdx >= 0) {
        AppState.db.categories.splice(fiIdx + 1, 0, accidentCat);
      } else {
        AppState.db.categories.push(accidentCat);
      }
      needsPersist = true;
    }

    // Update issues category mapping and shopUrgency
    if (Array.isArray(AppState.db.issues)) {
      AppState.db.issues.forEach(issue => {
        if (issue.id === 'parts-anatomy-guide') {
          if (issue.categoryId !== 'truck_anatomy') {
            issue.categoryId = 'truck_anatomy';
            needsPersist = true;
          }
        } else if (issue.categoryId === 'fleet_tips') {
          issue.categoryId = 'fleet_instructions';
          needsPersist = true;
        } else if (issue.id === 'sop-accident-emergency-protocol' || issue.id === 'sop-roadside-towing') {
          if (issue.categoryId !== 'accidents') {
            issue.categoryId = 'accidents';
            needsPersist = true;
          }
          if (issue.shopUrgency !== 'towing_accident') {
            issue.shopUrgency = 'towing_accident';
            needsPersist = true;
          }
        }

        if (issue.shopUrgency === 'not_mentioned') {
          issue.shopUrgency = '';
          needsPersist = true;
        }

        if (issue.categoryId === 'accidents' && (!issue.shopUrgency || issue.shopUrgency === 'urgent_shop')) {
          issue.shopUrgency = 'towing_accident';
          needsPersist = true;
        }


      });

      // Ensure sop-accident-emergency-protocol exists
      if (!AppState.db.issues.some(i => i.id === 'sop-accident-emergency-protocol')) {
        const accidentSeed = (typeof INITIAL_DATABASE !== 'undefined' && Array.isArray(INITIAL_DATABASE.issues))
          ? INITIAL_DATABASE.issues.find(si => si.id === 'sop-accident-emergency-protocol')
          : null;
        if (accidentSeed) {
          const wIdx = AppState.db.issues.findIndex(i => i.id === 'sop-winter-anti-gel');
          if (wIdx >= 0) {
            AppState.db.issues.splice(wIdx + 1, 0, JSON.parse(JSON.stringify(accidentSeed)));
          } else {
            AppState.db.issues.push(JSON.parse(JSON.stringify(accidentSeed)));
          }
          needsPersist = true;
        }
      }
    }

    if (AppState.selectedCategory === 'fleet_tips') {
      AppState.selectedCategory = 'fleet_instructions';
    }

    if (needsPersist) {
      saveToIndexedDB(AppState.db);
    }
  }
}

// Save Database
async function persistDatabase() {
  saveToIndexedDB(AppState.db);

  if (AppState.serverMode) {
    try {
      const res = await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(AppState.db, null, 2)
      });
      if (res.ok) {
        showToast('Saved to data/fleet_database.json', 'success');
        return;
      }
    } catch (err) {
      console.error('Server save error', err);
    }
  }
  showToast('Saved to local storage', 'success');
}

// IndexedDB Helper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FreightlinerFleetDB_v5', 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('store')) {
        db.createObjectStore('store');
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveToIndexedDB(data) {
  try {
    const db = await openDB();
    const tx = db.transaction('store', 'readwrite');
    tx.objectStore('store').put(data, STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY + '_timestamp', Date.now().toString());
  } catch (e) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (lsErr) {}
  }
}

async function getFromIndexedDB() {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('store', 'readonly');
      const req = tx.objectStore('store').get(STORAGE_KEY);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    try {
      const ls = localStorage.getItem(STORAGE_KEY);
      return ls ? JSON.parse(ls) : null;
    } catch (lsErr) {
      return null;
    }
  }
}

// Urgency & Shop Action Definitions
const URGENCY_CONFIG = {
  urgent_shop: {
    key: 'urgent_shop',
    label: 'Urgent: Go to Shop',
    badgeClass: 'urgency-urgent-shop',
    pillClass: 'pill-urgent',
    icon: '🚨',
    title: 'CRITICAL: GROUND VEHICLE & DISPATCH TO SHOP IMMEDIATELY',
    desc: 'Do not continue driving under load. Severe risk of catastrophic powertrain failure, sudden air brake loss, or immediate DOT Out-of-Service (OOS) violation. Notify dispatch immediately and route to nearest Freightliner authorized dealer or emergency mobile tech.',
    alertClass: 'alert-urgent-shop'
  },
  towing_accident: {
    key: 'towing_accident',
    label: 'Towing / Accident',
    badgeClass: 'urgency-towing',
    pillClass: 'pill-towing',
    icon: '🚨',
    title: 'EMERGENCY: VEHICLE DISABLED / TOWING & ACCIDENT RESPONSE PROTOCOL',
    desc: 'Commercial motor vehicle is disabled, involved in an accident, or unsafe to move under its own power. Secure scene, set parking brakes and 3 reflective orange triangles (10ft / 100ft / 200ft), call 911 if needed, notify 24/7 safety hotline, and dispatch heavy-duty wrecker. (For Detroit DT12 transmissions, ensure both rear drive axle half-shafts are removed before towing).',
    alertClass: 'alert-towing'
  },
  scheduled_shop: {
    key: 'scheduled_shop',
    label: 'Schedule Shop Visit',
    badgeClass: 'urgency-scheduled-shop',
    pillClass: 'pill-scheduled',
    icon: '⚠️',
    title: 'ATTENTION: SCHEDULE TERMINAL SHOP PM / REPAIR',
    desc: 'Truck is safe and legally drivable for current load and dispatch. However, this component requires diagnostic inspection and repair at the next terminal or scheduled PM maintenance visit.',
    alertClass: 'alert-scheduled-shop'
  },
  driver_fix: {
    key: 'driver_fix',
    label: 'Driver Roadside Fix',
    badgeClass: 'urgency-driver-fix',
    pillClass: 'pill-driver',
    icon: '🔧',
    title: 'DRIVER ROADSIDE RESOLUTION (NO DISPATCH NEEDED)',
    desc: 'This issue is self-resolvable roadside by following the standard driver instructions below. Does not require shop dispatch or commercial road service if resolved.',
    alertClass: 'alert-driver-fix'
  },
  routine_sop: {
    key: 'routine_sop',
    label: 'Fleet SOP',
    badgeClass: 'urgency-routine-sop',
    pillClass: 'pill-sop',
    icon: '📋',
    title: 'FLEET STANDARD OPERATING PROCEDURE & COMPLIANCE',
    desc: 'Official company operating procedure and DOT inspection guidelines. Follow each numbered step to ensure FMCSA regulatory compliance and driver safety.',
    alertClass: 'alert-routine-sop'
  }
};

function issueMatchesCategory(issue, catId) {
  if (!issue) return false;
  if (issue.categoryId === catId) return true;
  // Allow Freightliner Oil and Coolant to appear under both Truck Anatomy and Engine
  if ((issue.id === 'issue-1794148523580' || issue.id === 'issue-1794148785452') && (catId === 'truck_anatomy' || catId === 'engine')) return true;
  return false;
}

// Render Master Interface
function renderApp() {
  renderCategoryCards();
  renderUrgencyPills();
  renderIssuesList();
  updateTrashBadge();
}

function initIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const iconName = el.getAttribute('data-icon');
    if (Icons[iconName]) {
      el.innerHTML = Icons[iconName];
    }
  });
}

// Render Quick Urgency Filter Pills Bar
function renderUrgencyPills() {
  const bar = document.getElementById('urgencyFilterBar');
  if (!bar) return;

  // Base list filtered by category and search query
  let baseList = AppState.db.issues || [];
  if (AppState.selectedCategory !== 'all') {
    baseList = baseList.filter(i => issueMatchesCategory(i, AppState.selectedCategory));
  }
  if (AppState.searchQuery.trim()) {
    const q = AppState.searchQuery.toLowerCase().trim();
    baseList = baseList.filter(i => {
      const urg = URGENCY_CONFIG[i.shopUrgency];
      const urgKeywords = urg ? `${urg.label} ${urg.title} ${urg.key}`.toLowerCase() : '';
      return (
        (i.title && i.title.toLowerCase().includes(q)) ||
        (i.dashCodes && i.dashCodes.toLowerCase().includes(q)) ||
        (i.symptoms && i.symptoms.some(s => s.toLowerCase().includes(q))) ||
        (i.driverSteps && i.driverSteps.some(st => st.toLowerCase().includes(q))) ||
        (i.notes && i.notes.toLowerCase().includes(q)) ||
        (i.images && i.images.some(img => {
          const c = getImageCaption(img).toLowerCase();
          const n = getAttachmentName(img).toLowerCase();
          return c.includes(q) || n.includes(q);
        })) ||
        urgKeywords.includes(q)
      );
    });
  }

  const counts = {
    all: baseList.length,
    urgent_shop: baseList.filter(i => (i.shopUrgency || (i.categoryId === 'accidents' ? 'towing_accident' : (i.categoryId === 'fleet_instructions' || i.categoryId === 'truck_anatomy' ? 'routine_sop' : 'urgent_shop'))) === 'urgent_shop').length,
    towing_accident: baseList.filter(i => (i.shopUrgency || (i.categoryId === 'accidents' ? 'towing_accident' : '')) === 'towing_accident').length,
    scheduled_shop: baseList.filter(i => i.shopUrgency === 'scheduled_shop').length,
    driver_fix: baseList.filter(i => i.shopUrgency === 'driver_fix').length,
    routine_sop: baseList.filter(i => (i.shopUrgency || (i.categoryId === 'fleet_instructions' || i.categoryId === 'truck_anatomy' ? 'routine_sop' : '')) === 'routine_sop').length
  };

  const pills = [
    { key: 'all', label: 'All Issues', icon: '📑', count: counts.all, pillClass: '' },
    { key: 'urgent_shop', label: 'Urgent: Go to Shop', icon: '🚨', count: counts.urgent_shop, pillClass: 'pill-urgent' },
    { key: 'towing_accident', label: 'Towing / Accident', icon: '🚨', count: counts.towing_accident, pillClass: 'pill-towing' },
    { key: 'scheduled_shop', label: 'Schedule Shop', icon: '⚠️', count: counts.scheduled_shop, pillClass: 'pill-scheduled' },
    { key: 'driver_fix', label: 'Driver Fix', icon: '🔧', count: counts.driver_fix, pillClass: 'pill-driver' },
    { key: 'routine_sop', label: 'Fleet SOPs', icon: '📋', count: counts.routine_sop, pillClass: 'pill-sop' }
  ];

  bar.innerHTML = pills.map(p => {
    const isActive = AppState.selectedUrgency === p.key;
    return `
      <button type="button" class="urgency-pill ${p.pillClass} ${isActive ? 'active' : ''}" onclick="setUrgencyFilter('${p.key}')">
        <span>${p.icon}</span>
        <span>${p.label}</span>
        <span class="urgency-pill-count">${p.count}</span>
      </button>
    `;
  }).join('');
}

function setUrgencyFilter(urgencyKey) {
  if (AppState.selectedUrgency === urgencyKey && urgencyKey !== 'all') {
    AppState.selectedUrgency = 'all';
  } else {
    AppState.selectedUrgency = urgencyKey;
  }
  renderUrgencyPills();
  renderIssuesList();
}

// Render Category Cards
function renderCategoryCards() {
  const container = document.getElementById('categoryGrid');
  if (!container) return;

  const cardsHtml = AppState.db.categories.map(cat => {
    const count = AppState.db.issues.filter(i => issueMatchesCategory(i, cat.id)).length;
    const isSelected = AppState.selectedCategory === cat.id;
    const iconHtml = Icons[cat.icon] || Icons.truck;

    return `
      <div class="category-card ${isSelected ? 'selected' : ''}" onclick="selectCategory('${cat.id}')" style="--cat-accent: var(--freightliner-${cat.color || 'blue'});">
        <div class="category-header">
          <div class="category-icon-wrapper" style="color: var(--freightliner-${cat.color || 'blue'});">
            ${iconHtml}
          </div>
          <span class="category-count">${count} ${count === 1 ? 'issue' : 'issues'}</span>
        </div>
        <div class="category-name">${escapeHtml(cat.name)}</div>
        <div class="category-desc">${escapeHtml(cat.description || '')}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

// Select category filter
function selectCategory(catId) {
  if (AppState.selectedCategory === catId) {
    AppState.selectedCategory = 'all'; // toggle off
  } else {
    AppState.selectedCategory = catId;
  }
  renderCategoryCards();
  renderUrgencyPills();
  renderIssuesList();

  const issuesSection = document.getElementById('issuesSectionHeader');
  if (issuesSection) {
    issuesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Filter and Render Issues
function renderIssuesList() {
  const container = document.getElementById('issuesGrid');
  const countBadge = document.getElementById('issuesCountBadge');
  const currentFilterTitle = document.getElementById('currentFilterTitle');
  if (!container) return;

  let filtered = AppState.db.issues.slice();

  // Toggle Categories Section ("middle components") visibility when searching
  const isSearching = !!AppState.searchQuery.trim();
  const catSection = document.getElementById('categoriesSection') || document.querySelector('.categories-section');
  if (catSection) {
    catSection.style.display = isSearching ? 'none' : '';
  }

  // Category filter
  if (AppState.selectedCategory !== 'all') {
    filtered = filtered.filter(i => issueMatchesCategory(i, AppState.selectedCategory));
    const cat = AppState.db.categories.find(c => c.id === AppState.selectedCategory);
    if (currentFilterTitle && cat) {
      currentFilterTitle.textContent = isSearching ? `${cat.name} (Search)` : cat.name;
    }
  } else {
    if (currentFilterTitle) currentFilterTitle.textContent = isSearching ? 'Search Results' : 'All Issues & SOPs';
  }

  // Search query filter
  if (AppState.searchQuery.trim()) {
    const q = AppState.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(i => {
      const urg = URGENCY_CONFIG[i.shopUrgency];
      const urgKeywords = urg ? `${urg.label} ${urg.title} ${urg.key}`.toLowerCase() : '';
      return (
        (i.title && i.title.toLowerCase().includes(q)) ||
        (i.dashCodes && i.dashCodes.toLowerCase().includes(q)) ||
        (i.symptoms && i.symptoms.some(s => s.toLowerCase().includes(q))) ||
        (i.driverSteps && i.driverSteps.some(st => st.toLowerCase().includes(q))) ||
        (i.notes && i.notes.toLowerCase().includes(q)) ||
        (i.images && i.images.some(img => {
          const c = getImageCaption(img).toLowerCase();
          const n = getAttachmentName(img).toLowerCase();
          return c.includes(q) || n.includes(q);
        })) ||
        urgKeywords.includes(q)
      );
    });
  }

  // Urgency filter
  if (AppState.selectedUrgency && AppState.selectedUrgency !== 'all') {
    filtered = filtered.filter(i => {
      const itemUrg = i.shopUrgency || (i.categoryId === 'accidents' ? 'towing_accident' : (i.categoryId === 'fleet_instructions' || i.categoryId === 'truck_anatomy' ? 'routine_sop' : 'urgent_shop'));
      return itemUrg === AppState.selectedUrgency;
    });
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} found`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 48px 20px; background: var(--bg-card); border-radius: 14px; border: 1px dashed var(--border-color); box-shadow: var(--shadow-sm);">
        <div style="color: var(--text-muted); margin-bottom: 12px;">${Icons.search}</div>
        <h3 style="font-size: 1.1rem; margin-bottom: 8px; color: var(--text-main);">No issues found</h3>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 16px;">Try adjusting your search terms or urgency filter.</p>
        <button class="btn btn-secondary btn-sm" onclick="resetFilters()">Show All Issues</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(issue => {
    const category = AppState.db.categories.find(c => c.id === issue.categoryId) || { name: 'General', color: 'blue' };

    let thumbHtml = '';
    if (issue.images && issue.images.length > 0) {
      const allAtts = issue.images.map(getAttachmentObj);
      const imgAtts = allAtts.filter(isImageAttachment);
      const docAtts = allAtts.filter(a => !isImageAttachment(a));

      let thumbs = '';
      if (imgAtts.length > 0) {
        thumbs = imgAtts.slice(0, 4).map((img, idx) => {
          const url = img.url;
          const caption = img.caption;
          return `
            <img src="${url}" class="issue-thumb" onclick="event.stopPropagation(); openLightbox('${issue.id}', ${idx})" alt="${escapeHtml(caption || 'Preview')}" title="${escapeHtml(caption ? caption + ' (Click to enlarge)' : 'Click to enlarge')}" />
          `;
        }).join('');
      }

      let docThumbs = '';
      if (docAtts.length > 0) {
        docThumbs = docAtts.slice(0, 4).map(doc => {
          const badge = getFileBadgeInfo(doc.type);
          const originalIdx = issue.images.findIndex(x => getAttachmentUrl(x) === doc.url);
          const idxToUse = originalIdx !== -1 ? originalIdx : 0;
          return `
            <div class="issue-thumb issue-thumb-file ${badge.colorClass}" onclick="event.stopPropagation(); viewAttachmentDoc('${issue.id}', ${idxToUse})" title="${escapeHtml(doc.name || 'Document')} (Click to view)">
              <span class="thumb-file-icon">${badge.icon}</span>
              <span class="thumb-file-ext">${badge.ext}</span>
            </div>
          `;
        }).join('');
      }

      if (thumbs || docThumbs) {
        thumbHtml = `
          <div class="issue-thumb-gallery">
            ${thumbs}
            ${docThumbs}
          </div>
        `;
      }
    }

    let highlightsHtml = '';
    if (issue.symptoms && issue.symptoms.length > 0) {
      highlightsHtml = `
        <div class="issue-highlights">
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            ${issue.symptoms.slice(0, 2).map(s => `
              <li style="display: flex; gap: 6px; margin-bottom: 4px; font-size: 0.86rem; color: var(--text-muted); line-height: 1.45;">
                <span style="color: #38bdf8; flex-shrink: 0;">•</span>
                <span>${escapeHtml(s)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    } else if (hasInstructions(issue.driverSteps)) {
      const text = getInstructionsText(issue.driverSteps);
      const lines = text.split(/\r?\n/).map(l => cleanInstructionLine(l)).filter(Boolean).slice(0, 3);
      highlightsHtml = `
        <div class="issue-highlights">
          <ul style="list-style-type: none; padding-left: 0; margin: 0;">
            ${lines.map(l => `
              <li style="display: flex; gap: 6px; margin-bottom: 4px; font-size: 0.86rem; color: var(--text-muted); line-height: 1.45;">
                <span style="color: #38bdf8; flex-shrink: 0;">•</span>
                <span style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${escapeHtml(l)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    } else if (issue.notes && issue.notes.trim()) {
      highlightsHtml = `
        <div class="issue-highlights">
          <p style="margin: 0; font-size: 0.86rem; color: var(--text-muted); line-height: 1.45; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
            ${escapeHtml(issue.notes.trim())}
          </p>
        </div>
      `;
    }

    const stepsBadgeText = hasInstructions(issue.driverSteps)
      ? 'Driver Instructions' 
      : (issue.images && issue.images.length > 0 ? 'Visual Schematic' : 'Reference SOP');

    return `
      <div class="issue-card" onclick="openIssueDetail('${issue.id}')">
        <div class="issue-top-bar">
          <span class="issue-cat-badge" style="color: var(--freightliner-${category.color || 'blue'});">
            ${escapeHtml(category.name)}
          </span>
          ${issue.dashCodes ? `<span class="dash-code-tag">${escapeHtml(issue.dashCodes)}</span>` : ''}
        </div>

        <h3 class="issue-title">${escapeHtml(issue.title)}</h3>

        ${highlightsHtml}
        ${thumbHtml}

        <div class="issue-actions">
          <span style="font-size: 0.75rem; color: #64748b;">${stepsBadgeText}</span>
          <div style="display: flex; gap: 6px; margin-left: auto;">
            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); openEditModal('${issue.id}')" title="Edit">
              ${Icons.edit}
            </button>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); openIssueDetail('${issue.id}')">
              View Guide →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Reset all search & filters
function resetFilters() {
  AppState.selectedCategory = 'all';
  AppState.selectedUrgency = 'all';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
  const catSection = document.getElementById('categoriesSection') || document.querySelector('.categories-section');
  if (catSection) catSection.style.display = '';
  renderCategoryCards();
  renderUrgencyPills();
  renderIssuesList();
}

// Open Issue Detail Modal
function openIssueDetail(issueId) {
  const issue = AppState.db.issues.find(i => i.id === issueId);
  if (!issue) return;

  AppState.currentIssue = issue;

  const modal = document.getElementById('detailModal');
  const modalContent = document.getElementById('detailModalContent');
  if (!modal || !modalContent) return;

  const category = AppState.db.categories.find(c => c.id === issue.categoryId) || { name: 'General', color: 'blue' };
  const urg = (issue.shopUrgency && issue.shopUrgency !== 'not_mentioned') ? URGENCY_CONFIG[issue.shopUrgency] : null;

  modalContent.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 4px;">
      <span style="font-size: 0.85rem; color: #94a3b8; font-weight: 600;">
        Category: <strong style="color: var(--freightliner-${category.color || 'blue'});">${escapeHtml(category.name)}</strong>
      </span>
    </div>

    <div>
      <h1 style="font-size: 1.45rem; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">${escapeHtml(issue.title)}</h1>
    </div>

    ${issue.dashCodes ? `
      <div class="detail-fault-codes-box">
        <span style="color: #f59e0b; font-size: 1.25rem;">⚠️</span>
        <div>
          <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Dashboard Fault Code / Warning Light:</div>
          <div style="font-family: var(--font-mono); font-size: 0.95rem; color: #0284c7; font-weight: 600;">${escapeHtml(issue.dashCodes)}</div>
        </div>
      </div>
    ` : ''}

    <!-- Driver Instructions -->
    ${hasInstructions(issue.driverSteps) ? `
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
            <span>📋</span> Driver Instructions:
          </h3>
          <button class="btn btn-secondary btn-sm" onclick="copyInstructions('${issue.id}')" title="Copy instructions to clipboard">
            ${Icons.copy} Copy Instructions
          </button>
        </div>

        <div class="instructions-text-box">${escapeHtml(getInstructionsText(issue.driverSteps))}</div>
      </div>
    ` : ''}

    <!-- Observed Symptoms -->
    ${(issue.symptoms && issue.symptoms.length > 0) ? `
      <div class="detail-symptoms-box">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
          🔍 Observed Symptoms:
        </div>
        <ul style="padding-left: 18px; margin: 0; color: var(--text-main); font-size: 0.9rem; line-height: 1.6;">
          ${issue.symptoms.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    <!-- Additional Notes & Specifications -->
    ${(issue.notes && issue.notes.trim().length > 0) ? `
      <div class="detail-symptoms-box">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <span>📝</span> Additional Notes & Technical Specs:
        </div>
        <div style="white-space: pre-wrap; color: var(--text-main); font-size: 0.92rem; line-height: 1.6;">${escapeHtml(issue.notes)}</div>
      </div>
    ` : ''}

    <!-- Photos & Files -->
    <div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; display: flex; align-items: center; gap: 8px;">
          <span>🖼️</span> Photos & Files (${(issue.images && issue.images.length) || 0})
        </h3>
        <button class="btn btn-secondary btn-sm" id="detailAttachToggleBtn" onclick="toggleDetailDropzone()" title="Attach photos or files">
          ${Icons.image} + Photos & Files
        </button>
      </div>

      <!-- Drag & Drop / Paste Dropzone -->
      <div id="detailDropzoneWrap" style="${(!issue.images || issue.images.length === 0) ? 'display: block;' : 'display: none;'} margin-bottom: 14px;">
        <div id="detailImageDropzone" class="image-dropzone" tabindex="0" title="Click to browse or drag & drop files here (Ctrl+V to paste)">
          <div style="color: #38bdf8; margin-bottom: 6px;">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div style="font-weight: 600; font-size: 0.95rem; color: var(--text-main);">Drag & drop photos or files here, or click to browse</div>
          <div style="color: var(--text-muted); font-size: 0.78rem; margin-top: 5px;">Supports PDF, Word, Excel, CSV, Text, ZIP, JPG, PNG, WEBP, SVG and instant paste (Ctrl+V)</div>
          <input type="file" id="detailFileInput" accept="*/*" multiple style="display: none;" />
        </div>
      </div>

      ${(() => {
        if (!issue.images || issue.images.length === 0) {
          return '';
        }

        const allAtts = issue.images.map(getAttachmentObj);
        const imgAtts = allAtts.filter(isImageAttachment);
        const docAtts = allAtts.filter(a => !isImageAttachment(a));

        let html = '';

        if (imgAtts.length > 0) {
          html += `
            <div class="detail-photo-grid" style="margin-bottom: ${docAtts.length > 0 ? '14px' : '0'};">
              ${imgAtts.map((img, idx) => {
                const url = img.url;
                const caption = img.caption || getAttachmentCaption(img) || 'Photo Attachment';
                return `
                  <div class="detail-photo-card" onclick="openLightbox('${issue.id}', ${idx})" title="${escapeHtml(caption + ' (Click to enlarge)')}">
                    <div class="detail-photo-thumb">
                      <img src="${url}" alt="${escapeHtml(caption)}" />
                    </div>
                    <div class="detail-photo-caption">
                      <span class="detail-caption-text">${escapeHtml(caption)}</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        }

        if (docAtts.length > 0) {
          html += `
            <div class="detail-doc-list">
              ${docAtts.map(doc => {
                const badge = getFileBadgeInfo(doc.type);
                const sizeText = formatFileSize(doc.size);
                const originalIdx = issue.images.findIndex(x => getAttachmentUrl(x) === doc.url);
                return `
                  <div class="detail-file-card" onclick="viewAttachmentDoc('${issue.id}', ${originalIdx})" title="Click to view file">
                    <div class="file-card-icon-badge ${badge.colorClass}">
                      <span class="file-icon-symbol">${badge.icon}</span>
                      <span class="file-ext-tag">${badge.ext}</span>
                    </div>
                    <div class="detail-file-info">
                      <div class="detail-file-title" title="${escapeHtml(doc.name)}">${escapeHtml(doc.name)}</div>
                      ${doc.caption ? `<div class="detail-file-caption">${escapeHtml(doc.caption)}</div>` : ''}
                      <div class="detail-file-meta">${sizeText ? sizeText : (badge.label + ' File')}</div>
                    </div>
                    <div class="detail-file-actions">
                      <button type="button" class="btn btn-primary btn-sm" title="View document in full preview" onclick="event.stopPropagation(); viewAttachmentDoc('${issue.id}', ${originalIdx})">
                        View 👁️
                      </button>
                      <button type="button" class="btn btn-secondary btn-sm" title="Open document in new browser tab" onclick="event.stopPropagation(); openDocInNewTab('${issue.id}', ${originalIdx})">
                        New Tab ↗
                      </button>
                      <button type="button" class="btn btn-secondary btn-sm" title="Download file to device" onclick="event.stopPropagation(); downloadAttachmentDoc('${issue.id}', ${originalIdx})">
                        Download ⬇
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        }

        return html;
      })()}
    </div>
  `;

  // Update Footer buttons
  const modalFooter = document.getElementById('detailModalFooter');
  if (modalFooter) {
    modalFooter.innerHTML = `
      <button class="btn btn-outline-danger btn-sm" onclick="deleteIssue('${issue.id}')" style="margin-right: auto;">
        ${Icons.trash} Delete
      </button>
      <button class="btn btn-secondary btn-sm" onclick="openEditModal('${issue.id}')">
        ${Icons.edit} Edit Issue
      </button>
      <button class="btn btn-primary btn-sm" onclick="closeModal('detailModal')">
        Close
      </button>
    `;
  }

  openModal('detailModal');
  initDetailDropzone();
}

function copyInstructions(issueId) {
  const issue = AppState.db.issues.find(i => i.id === issueId);
  if (!issue || !issue.driverSteps) return;
  const text = getInstructionsText(issue.driverSteps);
  copyTextToClipboard(text);
}

function copyTextToClipboard(text) {
  if (!text) {
    showToast('Text is empty', 'error');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied to clipboard!', 'success');
  });
}

// Add / Edit Modal Logic & Dynamic Field Management
const FORM_FIELD_CONFIG = [
  { id: 'shopUrgency', name: 'Shop Urgency / Action Level', icon: '🚨', wrapperId: 'fieldWrapper_shopUrgency', inputId: 'editShopUrgency' },
  { id: 'dashCodes', name: 'Dashboard Fault Code', icon: '⚠️', wrapperId: 'fieldWrapper_dashCodes', inputId: 'editDashCodes' },
  { id: 'driverSteps', name: 'Driver Instructions', icon: '📋', wrapperId: 'fieldWrapper_driverSteps', inputId: 'editDriverSteps' },
  { id: 'symptoms', name: 'Observed Symptoms', icon: '🔍', wrapperId: 'fieldWrapper_symptoms', inputId: 'editSymptoms' },
  { id: 'notes', name: 'Additional Notes & Specs', icon: '📝', wrapperId: 'fieldWrapper_notes', inputId: 'editNotes' },
  { id: 'images', name: 'Photos & Files', icon: '🖼️', wrapperId: 'fieldWrapper_images' }
];

let activeFormFields = new Set(['dashCodes', 'driverSteps', 'symptoms', 'images']);

function syncFormFieldsVisibility() {
  FORM_FIELD_CONFIG.forEach(field => {
    const wrapper = document.getElementById(field.wrapperId);
    const chk = document.getElementById(`chkField_${field.id}`);
    const isActive = activeFormFields.has(field.id);

    if (wrapper) {
      if (isActive) {
        wrapper.classList.remove('is-hidden');
      } else {
        wrapper.classList.add('is-hidden');
      }
    }

    if (chk) {
      chk.checked = isActive;
    }
  });

  // Render "+ Add Field" dropdown options (only for inactive fields)
  const addDropdown = document.getElementById('addFieldDropdownMenu');
  if (addDropdown) {
    const inactiveFields = FORM_FIELD_CONFIG.filter(f => !activeFormFields.has(f.id));
    if (inactiveFields.length === 0) {
      addDropdown.innerHTML = `
        <div style="padding: 10px 14px; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
          All standard fields are currently active.
        </div>
      `;
    } else {
      addDropdown.innerHTML = `
        <div class="customizer-title">Add Section to Issue</div>
        ${inactiveFields.map(f => `
          <button type="button" class="add-field-option-btn" onclick="addFormField('${f.id}')">
            <span>${f.icon}</span>
            <span>${escapeHtml(f.name)}</span>
          </button>
        `).join('')}
      `;
    }
  }
}

function removeFormField(fieldId) {
  activeFormFields.delete(fieldId);

  // Clear value when removing
  const config = FORM_FIELD_CONFIG.find(f => f.id === fieldId);
  if (config && config.inputId) {
    const el = document.getElementById(config.inputId);
    if (el) el.value = '';
  }
  if (fieldId === 'images') {
    currentEditImages = [];
    renderEditImagePreviews();
  }

  syncFormFieldsVisibility();
  showToast(`${config ? config.name : 'Field'} removed`, 'info');
}

function addFormField(fieldId) {
  activeFormFields.add(fieldId);
  syncFormFieldsVisibility();
  closeFieldDropdowns();

  // Auto focus input and smoothly scroll modal-body to show the new field
  const config = FORM_FIELD_CONFIG.find(f => f.id === fieldId);
  if (config && config.inputId) {
    setTimeout(() => {
      const el = document.getElementById(config.inputId);
      const modalBody = document.querySelector('#editModal .modal-body');
      if (el) {
        try {
          el.focus({ preventScroll: true });
        } catch (err) {
          el.focus();
        }
      }
      if (modalBody) {
        modalBody.scrollTo({
          top: modalBody.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 60);
  }

  showToast(`${config ? config.name : 'Field'} added`, 'success');
}

let isCustomizeMode = false;

function toggleCustomizeMode() {
  isCustomizeMode = !isCustomizeMode;
  const modal = document.getElementById('editModal');
  const btn = document.getElementById('btnCustomizeFields');

  if (modal) {
    if (isCustomizeMode) {
      modal.classList.add('customize-mode-active');
    } else {
      modal.classList.remove('customize-mode-active');
    }
  }

  if (btn) {
    if (isCustomizeMode) {
      btn.className = 'btn btn-primary btn-sm';
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
        <span>Done Customizing</span>
      `;
      btn.title = 'Finish customizing form fields';
    } else {
      btn.className = 'btn btn-secondary btn-sm';
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        <span>Customize Fields</span>
      `;
      btn.title = 'Customize which fields are shown in this form';
    }
  }

  if (!isCustomizeMode) {
    closeFieldDropdowns();
  }
}

function resetCustomizeMode() {
  isCustomizeMode = false;
  const modal = document.getElementById('editModal');
  if (modal) modal.classList.remove('customize-mode-active');
  const btn = document.getElementById('btnCustomizeFields');
  if (btn) {
    btn.className = 'btn btn-secondary btn-sm';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      <span>Customize Fields</span>
    `;
    btn.title = 'Customize which fields are shown in this form';
  }
  closeFieldDropdowns();
}

function toggleAddFieldDropdown(e) {
  if (e) e.stopPropagation();
  const addDropdown = document.getElementById('addFieldDropdownMenu');
  if (addDropdown) {
    addDropdown.style.display = addDropdown.style.display === 'none' ? 'block' : 'none';
  }
}

function closeFieldDropdowns() {
  const addDropdown = document.getElementById('addFieldDropdownMenu');
  if (addDropdown) addDropdown.style.display = 'none';
}

// Click outside listener for dropdowns
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown-wrapper')) {
    closeFieldDropdowns();
  }
});

let currentEditImages = [];

function openAddModal(preselectedCatId = null) {
  resetCustomizeMode();
  currentEditImages = [];
  document.getElementById('editModalTitle').textContent = 'Add New Issue';
  document.getElementById('editIssueId').value = '';
  document.getElementById('editTitle').value = '';
  document.getElementById('editDashCodes').value = '';
  document.getElementById('editSymptoms').value = '';
  document.getElementById('editDriverSteps').value = '';
  const notesEl = document.getElementById('editNotes');
  if (notesEl) notesEl.value = '';
  const targetCatId = preselectedCatId || (AppState.selectedCategory !== 'all' ? AppState.selectedCategory : 'engine');
  const shopUrgEl = document.getElementById('editShopUrgency');
  if (shopUrgEl) {
    if (targetCatId === 'accidents') {
      shopUrgEl.value = 'towing_accident';
    } else if (targetCatId === 'fleet_instructions' || targetCatId === 'truck_anatomy') {
      shopUrgEl.value = 'routine_sop';
    } else {
      shopUrgEl.value = 'urgent_shop';
    }
  }

  activeFormFields = new Set(['dashCodes', 'driverSteps', 'symptoms', 'images']);
  syncFormFieldsVisibility();

  populateCategorySelect(targetCatId);
  renderEditImagePreviews();

  openModal('editModal');
}

function openEditModal(issueId) {
  const issue = AppState.db.issues.find(i => i.id === issueId);
  if (!issue) return;

  resetCustomizeMode();
  closeModal('detailModal');
  currentEditImages = issue.images ? issue.images.map(img => getImageObj(img)) : [];

  document.getElementById('editModalTitle').textContent = 'Edit Issue';
  document.getElementById('editIssueId').value = issue.id;
  document.getElementById('editTitle').value = issue.title || '';
  document.getElementById('editDashCodes').value = issue.dashCodes || '';
  document.getElementById('editSymptoms').value = (issue.symptoms || []).join('\n');
  document.getElementById('editDriverSteps').value = getInstructionsText(issue.driverSteps);
  const notesEl = document.getElementById('editNotes');
  if (notesEl) notesEl.value = issue.notes || '';
  const shopUrgEl = document.getElementById('editShopUrgency');
  if (shopUrgEl) {
    shopUrgEl.value = (issue.shopUrgency && issue.shopUrgency !== 'not_mentioned')
      ? issue.shopUrgency
      : (issue.categoryId === 'accidents' ? 'towing_accident' : (issue.categoryId === 'fleet_instructions' || issue.categoryId === 'truck_anatomy' ? 'routine_sop' : 'urgent_shop'));
  }

  activeFormFields = new Set();
  if (issue.shopUrgency && issue.shopUrgency !== 'not_mentioned') {
    activeFormFields.add('shopUrgency');
  }
  if (issue.dashCodes && issue.dashCodes.trim()) {
    activeFormFields.add('dashCodes');
  }
  if (hasInstructions(issue.driverSteps)) {
    activeFormFields.add('driverSteps');
  }
  if (issue.symptoms && issue.symptoms.length > 0) {
    activeFormFields.add('symptoms');
  }
  if (issue.images && issue.images.length > 0) {
    activeFormFields.add('images');
  }
  if (issue.notes && issue.notes.trim()) {
    activeFormFields.add('notes');
  }

  if (activeFormFields.size === 0) {
    activeFormFields.add('shopUrgency');
    activeFormFields.add('driverSteps');
    activeFormFields.add('images');
  }

  syncFormFieldsVisibility();

  populateCategorySelect(issue.categoryId);
  renderEditImagePreviews();

  openModal('editModal');
}

function populateCategorySelect(selectedId) {
  const sel = document.getElementById('editCategorySelect');
  if (!sel) return;
  sel.innerHTML = AppState.db.categories.map(c => `
    <option value="${c.id}" ${c.id === selectedId ? 'selected' : ''}>${escapeHtml(c.name)}</option>
  `).join('');
}

function renderEditImagePreviews() {
  const container = document.getElementById('editImagePreviewGrid');
  if (!container) return;

  if (currentEditImages.length === 0) {
    container.innerHTML = '<span style="color: #64748b; font-size: 0.8rem; grid-column: 1/-1;">No photos or documents attached yet. Drag & drop files, browse, or press Ctrl+V to paste.</span>';
    return;
  }

  container.innerHTML = currentEditImages.map((img, idx) => {
    const item = getAttachmentObj(img);
    const url = item.url;
    const caption = item.caption;
    const isImg = isImageAttachment(item);

    if (isImg) {
      return `
        <div class="image-preview-card" data-idx="${idx}">
          <div class="image-preview-thumb-wrap">
            <img src="${url}" alt="Preview" onclick="openLightbox(currentEditImages, ${idx})" title="Click to view large" />
            <button type="button" class="remove-img-btn" onclick="removeEditImage(${idx})" title="Remove image">×</button>
          </div>
          <div class="image-preview-caption-wrap">
            <label class="image-preview-caption-label" for="imgCaptionInput_${idx}">
              Caption:
            </label>
            <input 
              type="text" 
              id="imgCaptionInput_${idx}"
              class="form-input form-input-sm image-caption-input" 
              placeholder="e.g. Samsara RP1226 Cable" 
              value="${escapeHtml(caption)}" 
              oninput="updateImageCaption(${idx}, this.value)"
              title="What is depicted in this photo"
            />
          </div>
        </div>
      `;
    } else {
      const badge = getFileBadgeInfo(item.type);
      const sizeText = formatFileSize(item.size);
      return `
        <div class="file-preview-card" data-idx="${idx}">
          <button type="button" class="remove-img-btn" onclick="removeEditImage(${idx})" title="Remove file">×</button>
          <div class="file-card-main" onclick="openAttachmentFile('${url}')" title="Click to open / view file (new tab)">
            <div class="file-card-icon-badge ${badge.colorClass}">
              <span class="file-icon-symbol">${badge.icon}</span>
              <span class="file-ext-tag">${badge.ext}</span>
            </div>
            <div class="file-card-meta">
              <div class="file-card-filename" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
              <div class="file-card-filesize">${sizeText ? sizeText : badge.label + ' File'}</div>
            </div>
          </div>
          <div class="image-preview-caption-wrap">
            <label class="image-preview-caption-label" for="imgCaptionInput_${idx}">
              Caption:
            </label>
            <input 
              type="text" 
              id="imgCaptionInput_${idx}"
              class="form-input form-input-sm image-caption-input" 
              placeholder="e.g. Factory Service Manual / Wiring Diagram" 
              value="${escapeHtml(caption)}" 
              oninput="updateImageCaption(${idx}, this.value)"
              title="Description / purpose of this document"
            />
          </div>
        </div>
      `;
    }
  }).join('');
}

function updateImageCaption(idx, value) {
  if (currentEditImages[idx]) {
    currentEditImages[idx].caption = value;
  }
}

function removeEditImage(idx) {
  currentEditImages.splice(idx, 1);
  renderEditImagePreviews();
}

// Handle Attachments (Images, PDFs, Documents, Spreadsheets, etc.) & Clipboard Paste
async function processImageFile(file) {
  if (!file) return;

  const fileName = file.name || (file.type && file.type.startsWith('image/') ? 'clipboard.png' : 'document.bin');
  const detectedType = getFileType({ name: fileName, url: '' });

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;
    let fileUrl = base64;

    if (AppState.serverMode) {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: fileName,
            base64: base64
          })
        });
        if (res.ok) {
          const data = await res.json();
          fileUrl = data.url;
        }
      } catch (err) {
        console.warn('Server upload failed, storing base64', err);
      }
    }

    currentEditImages.push({
      url: fileUrl,
      name: fileName,
      size: file.size || 0,
      type: detectedType,
      caption: ''
    });

    renderEditImagePreviews();
    if (AppState.serverMode) {
      showToast(isImageAttachment({ type: detectedType }) ? 'Photo uploaded to project uploads/ folder!' : `Attached "${fileName}"`, 'success');
    } else {
      showToast(`Attached to browser. Run open_app.bat to auto-sync to project folder.`, 'warning');
    }
  };
  reader.readAsDataURL(file);
}

// Global Paste Event (Ctrl+V)
window.addEventListener('paste', async (e) => {
  const files = e.clipboardData && e.clipboardData.files;
  const items = e.clipboardData && e.clipboardData.items;
  if (!files && !items) return;

  const fileList = [];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      fileList.push(files[i]);
    }
  } else if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile();
        if (file) fileList.push(file);
      }
    }
  }

  if (fileList.length === 0) return; // Pure text paste, let browser handle normally

  const editModal = document.getElementById('editModal');
  const detailModal = document.getElementById('detailModal');

  if (editModal && editModal.classList.contains('active')) {
    e.preventDefault();
    if (!activeFormFields.has('images')) {
      activeFormFields.add('images');
      syncFormFieldsVisibility();
    }
    for (const file of fileList) {
      processImageFile(file);
    }
  } else if (detailModal && detailModal.classList.contains('active') && AppState.currentIssue) {
    e.preventDefault();
    await processFilesAndSaveToCurrent(fileList);
  } else if (!editModal?.classList.contains('active') && !detailModal?.classList.contains('active')) {
    openAddModal();
    setTimeout(() => {
      for (const file of fileList) {
        processImageFile(file);
      }
    }, 200);
  }
});

function initDetailDropzone() {
  const dropzone = document.getElementById('detailImageDropzone');
  const fileInput = document.getElementById('detailFileInput');
  if (!dropzone || !fileInput) return;

  dropzone.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFilesAndSaveToCurrent(e.target.files);
    }
  };

  dropzone.ondragenter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add('dragover');
  };

  dropzone.ondragover = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.add('dragover');
  };

  dropzone.ondragleave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove('dragover');
  };

  dropzone.ondrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFilesAndSaveToCurrent(e.dataTransfer.files);
    }
  };

  dropzone.onpaste = (e) => {
    const files = e.clipboardData && e.clipboardData.files;
    const items = e.clipboardData && e.clipboardData.items;
    const fileList = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) fileList.push(files[i]);
    } else if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const f = items[i].getAsFile();
          if (f) fileList.push(f);
        }
      }
    }
    if (fileList.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      processFilesAndSaveToCurrent(fileList);
    }
  };

  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.ondragover = (e) => {
      e.preventDefault();
      const wrap = document.getElementById('detailDropzoneWrap');
      if (wrap && wrap.style.display === 'none') {
        wrap.style.display = 'block';
        const btn = document.getElementById('detailAttachToggleBtn');
        if (btn) btn.innerHTML = `${Icons.image} − Close Upload`;
      }
    };
  }
}

function toggleDetailDropzone() {
  const wrap = document.getElementById('detailDropzoneWrap');
  const dropzone = document.getElementById('detailImageDropzone');
  const btn = document.getElementById('detailAttachToggleBtn');
  if (!wrap) return;

  const isHidden = wrap.style.display === 'none';
  if (isHidden) {
    wrap.style.display = 'block';
    dropzone?.focus();
    if (btn) btn.innerHTML = `${Icons.image} − Close Upload`;
    wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    const hasAttachments = AppState.currentIssue && AppState.currentIssue.images && AppState.currentIssue.images.length > 0;
    if (hasAttachments) {
      wrap.style.display = 'none';
      if (btn) btn.innerHTML = `${Icons.image} + Photos & Files`;
    } else {
      const fileInput = document.getElementById('detailFileInput');
      if (fileInput) fileInput.click();
    }
  }
}

async function processFilesAndSaveToCurrent(files) {
  if (!AppState.currentIssue) return;
  const fileArray = Array.from(files).filter(f => f);
  if (fileArray.length === 0) return;

  for (const file of fileArray) {
    const isImg = file.type && file.type.startsWith('image/');
    const fileName = file.name || (isImg ? `pasted_${Date.now()}.png` : 'document.bin');
    const detectedType = getFileType({ name: fileName, url: '' });

    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });

    if (!base64) continue;

    let fileUrl = base64;
    if (AppState.serverMode) {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: fileName, base64: base64 })
        });
        if (res.ok) {
          const data = await res.json();
          fileUrl = data.url;
        }
      } catch (err) {
        console.warn('Server upload failed, using data URL fallback', err);
      }
    }

    if (!AppState.currentIssue.images) AppState.currentIssue.images = [];
    AppState.currentIssue.images.push({
      url: fileUrl,
      name: fileName,
      size: file.size || 0,
      type: detectedType,
      caption: ''
    });
  }

  const idx = AppState.db.issues.findIndex(i => i.id === AppState.currentIssue.id);
  if (idx !== -1) {
    AppState.db.issues[idx] = AppState.currentIssue;
  }

  await persistDatabase();
  openIssueDetail(AppState.currentIssue.id);
  renderIssuesList();
  const count = fileArray.length;
  if (AppState.serverMode) {
    showToast(count === 1 ? 'File saved into project uploads/ folder!' : `Saved ${count} files into project uploads/ folder!`, 'success');
  } else {
    showToast('Saved to browser. Launch open_app.bat to auto-sync files into project folder.', 'warning');
  }
}

async function processImageFileAndSaveToCurrent(file) {
  return processFilesAndSaveToCurrent([file]);
}

function triggerAttachPhoto(issueId) {
  toggleDetailDropzone();
}

// Save Add/Edit Form
async function handleSaveIssue(e) {
  e.preventDefault();

  const id = document.getElementById('editIssueId').value.trim() || ('issue-' + Date.now());
  const categoryId = document.getElementById('editCategorySelect').value;
  const title = document.getElementById('editTitle').value.trim();

  if (!title) {
    showToast('Please enter an issue title', 'error');
    return;
  }

  // Only read values from fields that are currently active
  const shopUrgency = activeFormFields.has('shopUrgency') 
    ? (document.getElementById('editShopUrgency')?.value || '') 
    : '';
  const dashCodes = activeFormFields.has('dashCodes') ? document.getElementById('editDashCodes').value.trim() : '';
  const rawDriverSteps = activeFormFields.has('driverSteps') ? document.getElementById('editDriverSteps').value.trim() : '';
  const driverSteps = rawDriverSteps ? rawDriverSteps.split(/\r?\n/) : [];
  const symptoms = activeFormFields.has('symptoms') ? document.getElementById('editSymptoms').value.split('\n').map(s => s.trim()).filter(Boolean) : [];
  const images = activeFormFields.has('images') 
    ? currentEditImages.map(img => {
        const item = getAttachmentObj(img);
        const u = item.url;
        const c = (item.caption || '').trim();
        const n = item.name || '';
        const s = item.size || 0;
        const t = item.type || getFileType(item);
        
        // If it's a document/file (PDF, doc, sheet, zip, etc.), preserve full metadata
        if (t !== 'image') {
          return { url: u, name: n, size: s, type: t, caption: c };
        }
        // For images: preserve caption if present
        if (c) {
          return { url: u, caption: c, name: n, type: 'image' };
        }
        return u;
      })
    : [];
  const notesEl = document.getElementById('editNotes');
  const notes = activeFormFields.has('notes') && notesEl ? notesEl.value.trim() : '';

  const existingIdx = AppState.db.issues.findIndex(i => i.id === id);

  const issueData = {
    id,
    categoryId,
    title,
    shopUrgency,
    dashCodes,
    symptoms,
    driverSteps,
    images,
    notes,
    updatedAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    AppState.db.issues[existingIdx] = { ...AppState.db.issues[existingIdx], ...issueData };
    showToast('Issue updated successfully', 'success');
  } else {
    AppState.db.issues.unshift(issueData);
    showToast('New issue added to library!', 'success');
  }

  await persistDatabase();
  closeModal('editModal');
  renderCategoryCards();
  renderUrgencyPills();
  renderIssuesList();

  if (AppState.currentIssue && AppState.currentIssue.id === id) {
    openIssueDetail(id);
  }
}

// Trash / Recycle Bin Management
function getTrashList() {
  try {
    const raw = localStorage.getItem('freightliner_trash');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  if (Array.isArray(AppState.db.trash)) return AppState.db.trash;
  return [];
}

function saveTrashList(list) {
  try {
    localStorage.setItem('freightliner_trash', JSON.stringify(list));
  } catch (e) {}
  AppState.db.trash = list;
  updateTrashBadge();
}

function updateTrashBadge() {
  const badge = document.getElementById('trashCountBadge');
  if (!badge) return;
  const count = getTrashList().length;
  if (count > 0) {
    badge.textContent = count > 99 ? '99+' : count;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

// Delete Issue (Soft-delete to Trash)
async function deleteIssue(issueId) {
  const issueToDelete = AppState.db.issues.find(i => i.id === issueId);
  if (!issueToDelete) return;

  if (!confirm(`Are you sure you want to move "${issueToDelete.title}" to the Trash? You can restore it anytime.`)) return;

  // Add to trash list (most recent first)
  const trash = getTrashList().filter(t => t.id !== issueId);
  trash.unshift({
    ...issueToDelete,
    deletedAt: new Date().toISOString()
  });
  saveTrashList(trash);

  // Remove from active issues
  AppState.db.issues = AppState.db.issues.filter(i => i.id !== issueId);
  await persistDatabase();

  closeModal('detailModal');
  renderCategoryCards();
  renderUrgencyPills();
  renderIssuesList();
  showToast('Issue moved to Trash. Click 🗑️ to restore.', 'info');
}

function openTrashModal() {
  renderTrashList();
  openModal('trashModal');
}

function renderTrashList() {
  const container = document.getElementById('trashItemsList');
  const emptyState = document.getElementById('trashEmptyState');
  const emptyTrashBtn = document.getElementById('btnEmptyTrash');
  if (!container) return;

  const trash = getTrashList();

  if (trash.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (emptyTrashBtn) emptyTrashBtn.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (emptyTrashBtn) emptyTrashBtn.style.display = 'inline-flex';

  container.innerHTML = trash.map(item => {
    const category = AppState.db.categories.find(c => c.id === item.categoryId) || { name: 'General', color: 'blue' };
    const dateStr = item.deletedAt ? formatDeletedDate(item.deletedAt) : 'Recently';

    return `
      <div class="trash-item-card">
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
            <span class="issue-cat-badge" style="color: var(--freightliner-${category.color || 'blue'}); font-size: 0.72rem;">
              ${escapeHtml(category.name)}
            </span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(dateStr)}</span>
          </div>
          <div class="trash-item-title">${escapeHtml(item.title)}</div>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
          <button class="btn btn-secondary btn-sm" onclick="restoreIssue('${item.id}')" title="Restore this issue back to library">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            <span>Restore</span>
          </button>
          <button class="btn btn-outline-danger btn-sm" onclick="permanentlyDeleteFromTrash('${item.id}')" title="Delete permanently">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function formatDeletedDate(isoStr) {
  try {
    const d = new Date(isoStr);
    const diffMs = Date.now() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Deleted just now';
    if (diffMins < 60) return `Deleted ${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Deleted ${diffHours}h ago`;
    return `Deleted ${d.toLocaleDateString()}`;
  } catch (e) {
    return 'Deleted';
  }
}

async function restoreIssue(issueId) {
  const trash = getTrashList();
  const item = trash.find(t => t.id === issueId);
  if (!item) return;

  const updatedTrash = trash.filter(t => t.id !== issueId);
  saveTrashList(updatedTrash);

  const restoredItem = { ...item };
  delete restoredItem.deletedAt;

  const existingIdx = AppState.db.issues.findIndex(i => i.id === issueId);
  if (existingIdx >= 0) {
    AppState.db.issues[existingIdx] = restoredItem;
  } else {
    AppState.db.issues.unshift(restoredItem);
  }

  await persistDatabase();
  renderCategoryCards();
  renderUrgencyPills();
  renderIssuesList();
  renderTrashList();
  showToast(`"${restoredItem.title}" restored to library!`, 'success');
}

function permanentlyDeleteFromTrash(issueId) {
  if (!confirm('Permanently delete this issue from trash? This cannot be undone.')) return;
  const trash = getTrashList().filter(t => t.id !== issueId);
  saveTrashList(trash);
  renderTrashList();
  showToast('Issue permanently deleted', 'info');
}

function emptyTrash() {
  const trash = getTrashList();
  if (trash.length === 0) return;
  if (!confirm(`Are you sure you want to permanently delete all ${trash.length} items from the trash?`)) return;
  saveTrashList([]);
  renderTrashList();
  showToast('Trash emptied', 'info');
}

// Add New Category Modal
function openAddCategoryModal() {
  document.getElementById('newCatName').value = '';
  document.getElementById('newCatDesc').value = '';
  document.getElementById('newCatIcon').value = 'engine';
  document.getElementById('newCatColor').value = 'blue';
  openModal('categoryModal');
}

async function handleSaveCategory(e) {
  e.preventDefault();
  const name = document.getElementById('newCatName').value.trim();
  const description = document.getElementById('newCatDesc').value.trim();
  const icon = document.getElementById('newCatIcon').value;
  const color = document.getElementById('newCatColor').value;

  if (!name) {
    showToast('Please enter category name', 'error');
    return;
  }

  const id = 'cat-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  if (AppState.db.categories.some(c => c.id === id)) {
    showToast('Category with this ID already exists', 'error');
    return;
  }

  AppState.db.categories.push({
    id,
    name,
    icon,
    color,
    description
  });

  await persistDatabase();
  closeModal('categoryModal');
  renderCategoryCards();
  showToast(`Category "${name}" created!`, 'success');
}

// Backup / Export / Import
function openBackupModal() {
  openModal('backupModal');
}

function exportDatabaseJSON() {
  const jsonStr = JSON.stringify(AppState.db, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `Freightliner_FleetOps_Backup_${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Backup JSON downloaded to your computer!', 'success');
}

// 1-Click Push to GitHub from Web Dashboard
async function triggerWebGitPush() {
  const btn = document.getElementById('btnGitPush');
  const originalHtml = btn ? btn.innerHTML : '';

  if (!AppState.serverMode) {
    showToast('In Standalone Mode. Launch open_app.bat or run git_push.bat to push to GitHub.', 'warning');
    return;
  }

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="status-dot" style="background:#38bdf8;animation:pulse 1s infinite;display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;"></span> Pushing...`;
    }
    showToast('Pushing latest edits and photos to GitHub...', 'info');

    // First ensure database and offline cache are cleanly persisted to disk
    await persistDatabase();

    const res = await fetch('/api/git-push', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        showToast('✓ Successfully pushed all issues, categories & files to GitHub!', 'success');
      } else {
        showToast('Git push: ' + (data.message || 'Check terminal / token'), 'warning');
      }
    } else {
      showToast('Could not reach push server. Double-click git_push.bat to push.', 'error');
    }
  } catch (err) {
    console.error('Git push error:', err);
    showToast('Push error. Double-click git_push.bat to push manually.', 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  }
}

function importDatabaseJSON(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data && Array.isArray(data.categories) && Array.isArray(data.issues)) {
        AppState.db = data;
        await persistDatabase();
        renderCategoryCards();
        renderUrgencyPills();
        renderIssuesList();
        closeModal('backupModal');
        showToast('Database imported successfully!', 'success');
      } else {
        showToast('Invalid backup file format', 'error');
      }
    } catch (err) {
      showToast('Error parsing JSON backup file', 'error');
    }
  };
  reader.readAsText(file);
}

// Lightbox Media & Document Viewer
let lightboxImages = [];
let lightboxCurrentIndex = 0;
let currentLightboxItem = null;

function openLightbox(source, index = 0) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const pdfFrame = document.getElementById('lightboxPdfFrame');
  const newTabBtn = document.getElementById('lightboxNewTabBtn');
  const downloadBtn = document.getElementById('lightboxDownloadBtn');
  if (!modal || !img) return;

  if (Array.isArray(source)) {
    lightboxImages = source.filter(isImageAttachment);
    lightboxCurrentIndex = Math.max(0, Math.min(index, lightboxImages.length - 1));
  } else if (typeof source === 'string') {
    // Check if source matches an issue in AppState.db.issues
    const issue = AppState.db && Array.isArray(AppState.db.issues)
      ? AppState.db.issues.find(i => i.id === source)
      : null;
    if (issue && Array.isArray(issue.images) && issue.images.length > 0) {
      lightboxImages = issue.images.filter(isImageAttachment);
      lightboxCurrentIndex = Math.max(0, Math.min(index, lightboxImages.length - 1));
    } else if (AppState.currentIssue && Array.isArray(AppState.currentIssue.images) && AppState.currentIssue.images.some(img => getImageUrl(img) === source)) {
      lightboxImages = AppState.currentIssue.images.filter(isImageAttachment);
      lightboxCurrentIndex = lightboxImages.findIndex(img => getImageUrl(img) === source);
      if (lightboxCurrentIndex < 0) lightboxCurrentIndex = 0;
    } else {
      lightboxImages = [source];
      lightboxCurrentIndex = 0;
    }
  } else {
    lightboxImages = [];
    lightboxCurrentIndex = 0;
  }

  if (lightboxImages.length === 0) return;

  if (pdfFrame) {
    pdfFrame.src = 'about:blank';
    pdfFrame.style.display = 'none';
  }
  img.style.display = 'block';
  if (newTabBtn) newTabBtn.style.display = 'inline-flex';
  if (downloadBtn) downloadBtn.style.display = 'inline-flex';

  updateLightboxView();
  modal.style.display = 'flex';
}

function updateLightboxView() {
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const captionEl = document.getElementById('lightboxCaption');
  if (!img) return;

  const currentItem = lightboxImages[lightboxCurrentIndex];
  currentLightboxItem = getAttachmentObj(currentItem);
  const currentUrl = getSafeFileUrl(currentLightboxItem.url, 'image/png');
  const currentCaption = currentLightboxItem.caption || getAttachmentCaption(currentLightboxItem) || currentLightboxItem.name || 'Photo';

  img.src = currentUrl;
  img.alt = currentCaption;

  if (captionEl) {
    captionEl.textContent = currentCaption;
    captionEl.style.display = 'inline-flex';
  }

  const total = lightboxImages.length;
  if (counter) {
    if (total > 1) {
      counter.textContent = `${lightboxCurrentIndex + 1} / ${total}`;
      counter.style.display = 'inline-block';
    } else {
      counter.textContent = currentLightboxItem.name || 'Photo';
      counter.style.display = 'inline-block';
    }
  }

  if (prevBtn) {
    prevBtn.style.display = total > 1 ? 'flex' : 'none';
  }
  if (nextBtn) {
    nextBtn.style.display = total > 1 ? 'flex' : 'none';
  }
}

// Open Document (PDF, etc.) in Modal Viewer like a photo
function openMediaLightbox(item) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const pdfFrame = document.getElementById('lightboxPdfFrame');
  const counter = document.getElementById('lightboxCounter');
  const captionEl = document.getElementById('lightboxCaption');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');
  const newTabBtn = document.getElementById('lightboxNewTabBtn');
  const downloadBtn = document.getElementById('lightboxDownloadBtn');
  if (!modal) return;

  currentLightboxItem = getAttachmentObj(item);
  const isImg = isImageAttachment(currentLightboxItem);
  const safeUrl = getSafeFileUrl(currentLightboxItem.url, currentLightboxItem.type === 'pdf' ? 'application/pdf' : 'application/octet-stream');

  // Arrow buttons hidden for single document preview
  if (prevBtn) prevBtn.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  if (newTabBtn) newTabBtn.style.display = 'inline-flex';
  if (downloadBtn) downloadBtn.style.display = 'inline-flex';

  if (counter) {
    counter.textContent = currentLightboxItem.name || (isImg ? 'Photo' : 'PDF Document');
    counter.style.display = 'inline-block';
  }

  if (captionEl) {
    if (currentLightboxItem.caption) {
      captionEl.textContent = currentLightboxItem.caption;
      captionEl.style.display = 'inline-flex';
    } else {
      captionEl.style.display = 'none';
      captionEl.textContent = '';
    }
  }

  if (isImg) {
    if (pdfFrame) {
      pdfFrame.src = 'about:blank';
      pdfFrame.style.display = 'none';
    }
    if (img) {
      img.src = safeUrl;
      img.alt = currentLightboxItem.caption || currentLightboxItem.name || 'Enlarged photo';
      img.style.display = 'block';
    }
  } else if (currentLightboxItem.type === 'pdf') {
    if (img) {
      img.src = '';
      img.style.display = 'none';
    }
    if (pdfFrame) {
      pdfFrame.src = safeUrl;
      pdfFrame.style.display = 'block';
    }
  } else {
    // Non-PDF documents (Word, Excel, ZIP) that browsers cannot embed in iframe
    downloadFile(currentLightboxItem.url, currentLightboxItem.name);
    showToast(`Downloading "${currentLightboxItem.name}"...`, 'info');
    return;
  }

  modal.style.display = 'flex';
}

function openLightboxCurrentInNewTab() {
  if (!currentLightboxItem || !currentLightboxItem.url) return;
  const safeUrl = getSafeFileUrl(currentLightboxItem.url, currentLightboxItem.type === 'pdf' ? 'application/pdf' : 'application/octet-stream');
  window.open(safeUrl, '_blank');
}

function downloadLightboxCurrent() {
  if (!currentLightboxItem || !currentLightboxItem.url) return;
  downloadFile(currentLightboxItem.url, currentLightboxItem.name || 'file');
}

function viewAttachmentDoc(issueId, docIdx) {
  const issue = AppState.db && Array.isArray(AppState.db.issues)
    ? AppState.db.issues.find(i => i.id === issueId)
    : null;
  if (!issue || !issue.images || !issue.images[docIdx]) return;

  const doc = getAttachmentObj(issue.images[docIdx]);
  if (!doc || !doc.url) return;
  openMediaLightbox(doc);
}

function openDocInNewTab(issueId, docIdx) {
  const issue = AppState.db && Array.isArray(AppState.db.issues)
    ? AppState.db.issues.find(i => i.id === issueId)
    : null;
  if (!issue || !issue.images || !issue.images[docIdx]) return;

  const doc = getAttachmentObj(issue.images[docIdx]);
  if (!doc || !doc.url) return;
  const safeUrl = getSafeFileUrl(doc.url, doc.type === 'pdf' ? 'application/pdf' : 'application/octet-stream');
  window.open(safeUrl, '_blank');
}

function downloadAttachmentDoc(issueId, docIdx) {
  const issue = AppState.db && Array.isArray(AppState.db.issues)
    ? AppState.db.issues.find(i => i.id === issueId)
    : null;
  if (!issue || !issue.images || !issue.images[docIdx]) return;

  const doc = getAttachmentObj(issue.images[docIdx]);
  if (!doc || !doc.url) return;
  downloadFile(doc.url, doc.name || 'document');
}

function prevLightboxImage(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (lightboxImages.length <= 1) return;
  lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxView();
}

function nextLightboxImage(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (lightboxImages.length <= 1) return;
  lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxImages.length;
  updateLightboxView();
}

function closeLightbox(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const pdfFrame = document.getElementById('lightboxPdfFrame');
  const captionEl = document.getElementById('lightboxCaption');
  const newTabBtn = document.getElementById('lightboxNewTabBtn');
  const downloadBtn = document.getElementById('lightboxDownloadBtn');

  if (modal) modal.style.display = 'none';
  if (img) {
    img.src = '';
    img.style.display = 'block';
  }
  if (pdfFrame) {
    pdfFrame.src = 'about:blank';
    pdfFrame.style.display = 'none';
  }
  if (captionEl) {
    captionEl.style.display = 'none';
    captionEl.textContent = '';
  }
  if (newTabBtn) newTabBtn.style.display = 'none';
  if (downloadBtn) downloadBtn.style.display = 'none';

  lightboxImages = [];
  lightboxCurrentIndex = 0;
  currentLightboxItem = null;
}

// Modal open/close helpers
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;
    const body = el.querySelector('.modal-body');
    if (body) body.scrollTop = 0;
  }
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
  if (modalId === 'editModal') {
    resetCustomizeMode();
  }
  if (modalId === 'detailModal') {
    AppState.currentIssue = null;
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Setup Event Listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = AppState.searchQuery ? 'inline-flex' : 'none';
      }
      renderUrgencyPills();
      renderIssuesList();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      AppState.searchQuery = '';
      clearBtn.style.display = 'none';
      renderUrgencyPills();
      renderIssuesList();
    });
  }

  // Quick keyboard shortcut: '/' focuses the pinned search bar
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      const activeModal = document.querySelector('.modal-backdrop.active');
      if (!activeModal && searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  // Dropzone for edit modal image uploads
  const dropzone = document.getElementById('imageDropzone');
  const fileInput = document.getElementById('imageFileInput');
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        Array.from(e.dataTransfer.files).forEach(processImageFile);
      }
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        Array.from(e.target.files).forEach(processImageFile);
      }
    });
  }

  // Backup file input
  const backupInput = document.getElementById('backupFileInput');
  if (backupInput) {
    backupInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importDatabaseJSON(e.target.files[0]);
      }
    });
  }

  // Auto-adapt shop urgency when category changes
  const catSel = document.getElementById('editCategorySelect');
  if (catSel) {
    catSel.addEventListener('change', () => {
      const urgEl = document.getElementById('editShopUrgency');
      if (urgEl) {
        if (catSel.value === 'accidents') {
          urgEl.value = 'towing_accident';
        } else if (catSel.value === 'fleet_instructions' || catSel.value === 'truck_anatomy') {
          urgEl.value = 'routine_sop';
        } else if (urgEl.value === 'towing_accident' || urgEl.value === 'routine_sop') {
          urgEl.value = 'urgent_shop';
        }
      }
    });
  }

  // Close modals on backdrop click or ESC key, with dedicated lightbox handling
  window.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightboxModal');
    const isLightboxOpen = lightbox && lightbox.style.display !== 'none';

    if (e.key === 'Escape') {
      if (isLightboxOpen) {
        e.preventDefault();
        e.stopPropagation();
        closeLightbox(e);
        return; // Prevents closing underlying detail modal!
      }
      resetCustomizeMode();
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
    } else if (e.key === 'ArrowLeft') {
      if (isLightboxOpen) {
        e.preventDefault();
        prevLightboxImage(e);
      }
    } else if (e.key === 'ArrowRight') {
      if (isLightboxOpen) {
        e.preventDefault();
        nextLightboxImage(e);
      }
    }
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        resetCustomizeMode();
        backdrop.classList.remove('active');
      }
    });
  });

  // Floating Scroll to Top button listener
  initScrollToTop();
}

// Floating Scroll-to-Top Button
function initScrollToTop() {
  const btn = document.getElementById('scrollToTopBtn');
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 260) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getInstructionsText(steps) {
  if (!steps) return '';
  if (Array.isArray(steps)) {
    return steps.join('\n');
  }
  return String(steps);
}

function hasInstructions(steps) {
  if (!steps) return false;
  if (Array.isArray(steps)) return steps.length > 0;
  return String(steps).trim().length > 0;
}

function cleanInstructionLine(l) {
  if (!l) return '';
  return String(l)
    .trim()
    .replace(/^(\x28?\d+[\.\x29\:\-]+\s*|\d+\s*[\-\:]\s*|step\s*\d+[\:\.\-]?\s*|[•\-\*\>\x29]+\s*)+/i, '')
    .replace(/^[\x29\.\-:\s]+/, '')
    .trim();
}
