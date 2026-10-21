// Extracted JavaScript from the supplied Via page.
// --- Vehicle Delivery Form: generator checklist if missing ---
  // ملحوظة: المشروع الأصلي كان بيستخدم هذه الـ TBODY بدون generator ظاهر.
  // هنا هنضيف صفوف افتراضية لعرض select بأسماء الكابتن.
    (function initVDChecklistSelect() {
    const tbody = document.getElementById('vd_checklist');
    if (!tbody) return;
    if (window.__vdChecklistInitDone) return;
    window.__vdChecklistInitDone = true;

    // العناصر الخاصة بكل بند في Vehicle Delivery Form
    const items = [
      'حالة السيارة الخارجية',
      'حالة الإطارات والضغط',
      'مستوى الشحن والتجهيز',
      'فرامل وتجهيزات السلامة',
      'حالة الأضواء والإشارات',
      'نظافة السيارة الداخلية والخارجيه'
    ];

    // قائمة الأسماء (من drivers أو captainsUsers) تُستخدم في ComboBox الخاص باسم الكابتن
    function getCaptainOptions() {
      const listFromCaptains = (window.captainsUsers && window.captainsUsers.length)
        ? window.captainsUsers
        : null;

      const base = Array.isArray(listFromCaptains) && listFromCaptains.length
        ? listFromCaptains
        : (window.drivers || []).map(d => ({ id: d.id, name: d.name }));

      const normalized = base
        .map(d => ({ id: d.id, name: String(d.name || '').trim() }))
        .filter(d => d.name);

      // إزالة مكررات الأسماء
      const seen = new Set();
      return normalized.filter(d => {
        if (seen.has(d.name)) return false;
        seen.add(d.name);
        return true;
      });
    }

    function renderRow(itemIndex) {
      const tr = document.createElement('tr');
      tr.className = 'border-b border-slate-100 last:border-0';

      // ملاحظة UX: select اسم الكابتن وظيفته إظهار أسماء الكابتن المتاحة.
      // لو لا تريد إظهار القائمة عند الضغط، سنعطّل select مؤقتاً.
      // (سيظل يظهر الاسم المناسب عند اختيارك/تحديده من جدول Users)
      // مفعّل حالياً: disable بالقيمة الافتراضية.
      const disableCaptainSelect = true;

      const driversOptions = (window.captainsUsers && window.captainsUsers.length)
        ? window.captainsUsers
        : (window.drivers || []).map(d => ({ id: d.id, name: d.name }));

      const captainNameList = driversOptions
        .map(d => ({ id: d.id, name: String(d.name || '').trim() }))
        .filter(d => d.name)
        .reduce((acc, d) => {
          if (!acc.some(x => x.name === d.name)) acc.push(d);
          return acc;
        }, []);

      function renderCaptainOptions() {
        return captainNameList
          .map(d => `<option value="${d.name.replace(/"/g, '"')}">${d.name}</option>`)
          .join('');
      }

      const isCleaningItem = items[itemIndex] === 'نظافة السيارة الداخلية والخارجيه';

      tr.innerHTML = `
        
        <td class="px-3 py-3">${items[itemIndex] ?? ''}</td>
          <td class="px-3 py-3" colspan="3">
          <input
            type="text"
            class="w-full bg-white border border-slate-200 rounded-xl px-2 py-3 text-xs outline-none min-h-[48px]"
            placeholder="اكتب ملاحظات"
          />
          ${isCleaningItem ? `
            <div class="mt-2">
              <input
                id="vd_cleaning_images_input"
                type="file"
                accept="image/*"
                multiple
                class="hidden"
              />
              <button
                type="button"
                class="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl px-3 py-2 text-[11px] font-bold flex items-center justify-center gap-2"
                onclick="vdPickCleaningImages();"
              >
                <i class="fa-solid fa-image"></i> إضافة صور
              </button>
              <div id="vd_cleaning_images_preview" class="mt-2 flex flex-wrap items-center gap-2"></div>
              <div class="mt-1 text-[10px] text-slate-500">مسموح صور متعددة</div>
            </div>
          ` : ''}
        </td>
        <td class="px-3 py-3">
          <select class="w-full bg-white border border-slate-200 rounded-xl px-2 py-2 text-xs outline-none">
            <option value="" selected></option>
            <option value="good">جيد</option>
            <option value="very_good">جيد جداً</option>
            <option value="excellent">ممتاز</option>
          </select>
        </td>
        <td class="px-3 py-3">
          <button type="button" class="bg-slate-900 text-white px-2 py-1 rounded-lg text-[10px] font-bold" onclick="this.disabled=true; this.innerText='تم'; window.dispatchEvent(new CustomEvent('vd-captain-confirmed', { detail: { captain: this.dataset.captain || '' } }));">تأكيد</button>
        </td>
      `;

      return tr;
    }

    // ابنِ صفوف dummy
    for (let i = 0; i < items.length; i++) {
      tbody.appendChild(renderRow(i));
    }
  })();

// ==========================================
    // قاعدة البيانات المبدئية والأساسية للنظام
    // ==========================================
    let drivers = [
      { id: 1, name: "كابتن أحمد رجب البستاني", license: "LIC-88492", expiry: "2026-12-01", connected: true, hasTrip: true, car: "ط ر ا 2514", hub: "القاهرة", battery: 85, company: "Via", vehicleType: "EV" },
      { id: 2, name: "كابتن محمود شاكر عبدالحميد", license: "LIC-99215", expiry: "2026-04-15", connected: true, hasTrip: true, car: "س ج د 9632", hub: "الإسكندرية", battery: 74, company: "Via", vehicleType: "EV" },
      { id: 3, name: "كابتن حسن علي المغازي", license: "LIC-10201", expiry: "2026-08-20", connected: true, hasTrip: false, car: "ق ر ب 7415", hub: "القاهرة", battery: 60, company: "Mina Tour", vehicleType: "EV" },
      { id: 4, name: "كابتن عمرو سلامة الشريف", license: "LIC-30454", expiry: "2026-11-02", connected: true, hasTrip: true, car: "أ ب ج 5705", hub: "القاهرة", battery: 92, company: "Mina Tour", vehicleType: "EV" }
    ];


    // قاعدة بيانات الرحلات الدوارة التلقائية
    const rotatingTripsDatabase = [
      { id: "TRIP-228015", driver: { name: "كابتن عمرو سلامة الشريف", car: "أ ب ج 5705" }, from: "التجمع الخامس (الـ 90)", to: "العاصمة الإدارية الجديدة", coordinates: [30.0074, 31.4913] },
      { id: "TRIP-409182", driver: { name: "كابتن حسن علي المغازي", car: "ق ر ب 7415" }, from: "الشيخ زايد (هايبر وان)", to: "المهندسين وجامعة الدول", coordinates: [30.0131, 31.0208] },
      { id: "TRIP-771049", driver: { name: "كابتن أحمد رجب البستاني", car: "ط ر ا 2514" }, from: "مصر الجديدة (الميرغني)", to: "مطار القاهرة الدولي", coordinates: [30.1121, 31.3439] },
      { id: "TRIP-990214", driver: { name: "كابتن محمود شاكر عبدالحميد", car: "س ج د 9632" }, from: "محطة الرمل", to: "سيدي بشر الساحلية", coordinates: [31.2001, 29.9187] }
    ];

    // مصفوفة الحالات التشغيلية المباشرة (الحد الأقصى 5 رحلات لمنع اللخبطة وتداخل الـ DOM)
    let activeTrips = [
      { id: "TRIP-228015", driver: { name: "كابتن عمرو سلامة الشريف", car: "أ ب ج 5705" }, from: "التجمع الخامس (الـ 90)", to: "العاصمة الإدارية الجديدة", coordinates: [30.0074, 31.4913] },
      { id: "TRIP-771049", driver: { name: "كابتن أحمد رجب البستاني", car: "ط ر ا 2514" }, from: "مصر الجديدة (الميرغني)", to: "مطار القاهرة الدولي", coordinates: [30.1121, 31.3439] },
      { id: "TRIP-990214", driver: { name: "كابتن محمود شاكر عبدالحميد", car: "س ج د 9632" }, from: "محطة الرمل", to: "سيدي بشر الساحلية", coordinates: [31.2001, 29.9187] }
    ];

    let selectedCell = null;
    let tickerIndex = 0;
    let tickerInterval = null;

    let currentEarnings = 4250;
    let currentExpenses = 1120;
    
    let map;
    // مجموعة الطبقات لحذف وإعادة بناء الدبابيس بشكل ذري يمنع تراكم الـ Markers القديمة
    let activeMarkersGroup; 

    function initMap() {
      map = L.map('map').setView([30.0444, 31.2357], 9);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
      
      // تهيئة الـ Layer Group المخصصة للتطهير المستمر
      activeMarkersGroup = L.layerGroup().addTo(map);
      
      renderLiveTrackingData();
    }

    // التنقل بين الصفحات
    document.querySelectorAll('#sidebarNav .nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');
        
        document.querySelectorAll('#sidebarNav .nav-link').forEach(l => {
          l.classList.remove('bg-slate-800', 'text-white', 'font-semibold');
          l.querySelector('i').classList.remove('text-orange-500');
          l.querySelector('i').classList.add('text-slate-500');
        });
        
        this.classList.add('bg-slate-800', 'text-white', 'font-semibold');
        this.querySelector('i').classList.add('text-orange-500');

        document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
        // auth gate: أي صفحة غير home/dashboard يجب تكون بعد تسجيل دخول
        // (home يظهر فقط للمسجل)
        const sess = (() => { try { return _getSession(); } catch (e) { return null; } })();
        if (!sess || !sess.userName) {
          const home = document.querySelector('[data-page-section="home"]');
          if (home) home.classList.add('hidden');
          return;
        }
        const targetSec = document.querySelector(`[data-page-section="${targetPage}"]`);

        if(targetSec) targetSec.classList.remove('hidden');

        const titles = {
          dashboard: "لوحة التحكم الرئيسية Dashboard",
          users: "إدارة المستخدمين والعملاء المقيدين بالمنظومة",
          drivers: "قاعدة بيانات الكباتن وقائدي السيارات",
          dispatchers: "غرفة موجهي ومرحلي الرحلات المعتمدين",
          vehicles: "منظومة إدارة ومتابعة المركبات الكهربائية EVs",
          hubs: "محطات المبيت الفرعية واللوجستية الرئيسية (Via Hubs)",
          assignments: "التكليفات الخارجية والرحلات المحولة للنظام",
          workforce: "جدول الورديات، الشيفتات، وتنظيم القوة العاملة (Workforce)",
          tracking: "شاشة التتبع الحي وتحليل إشارات الـ GPS المباشرة للأسطول",
          documents: "الوثائق، التقارير التشغيلية، والمستندات المالية المتكاملة"
        };
        document.getElementById('pageTitle').innerText = titles[targetPage] || "لوحة التحكم";

        if (targetPage === 'tracking') {
          setTimeout(() => { map.invalidateSize(); }, 200);
        }
      });
    });

    // ==========================================
    // محرك المزامنة الفورية المركزي - المولد الموحد
    // ==========================================
    function startTickerRotation() {
      // إرسال الإشارة الأولى فوراً عند الإقلاع لضمان التطابق المبدئي
      dispatchCentralizedTripSignal(rotatingTripsDatabase[tickerIndex], true);

      // صوت Alarm (بدون ملفات خارجية) - beep بسيط
      try {
        if (!window.__vdAlarmBeep) {
          window.__vdAlarmBeep = function() {
            // يمنع فشل التشغيل في بعض المتصفحات بسبب autoplay
            if (!window.__vdAudioCtx) {
              const AudioContext = window.AudioContext || window.webkitAudioContext;
              window.__vdAudioCtx = new AudioContext();
            }
            const ctx = window.__vdAudioCtx;
            const oscillator = ctx.createOscillator();
            const gain = ctx.createGain();
            oscillator.type = 'square';
            oscillator.frequency.value = 1200;
            oscillator.connect(gain);
            gain.connect(ctx.destination);
            const now = ctx.currentTime;

            // رفع الحجم بشكل قوي جدًا (لكن بدون تخريب/تشويه): نبضة + تذبذب صغير
            // ملاحظة: قد تمنع المتصفحات الصوت بدون تفاعل مستخدم مرة واحدة.
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.65, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

            // نبضة ثانية قصيرة لتكون أوضح (مثل صفارة)
            oscillator.start(now);
            oscillator.stop(now + 0.12);

            // غيّر لتذبذب بسيط بعد التوقف (بدون أي عنصر إضافي)
            setTimeout(() => {
              try {
                const osc2 = ctx.createOscillator();
                const g2 = ctx.createGain();
                osc2.type = 'square';
                osc2.frequency.value = 1500;
                g2.gain.value = 0.0001;
                osc2.connect(g2);
                g2.connect(ctx.destination);
                const t = ctx.currentTime;
                g2.gain.setValueAtTime(0.0001, t);
                g2.gain.exponentialRampToValueAtTime(0.55, t + 0.01);
                g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
                osc2.start(t);
                osc2.stop(t + 0.08);
              } catch (e) {}
            }, 40);
          };
        }
      } catch (e) {}
      
      tickerInterval = setInterval(() => {
        tickerIndex = (tickerIndex + 1) % rotatingTripsDatabase.length;
        dispatchCentralizedTripSignal(rotatingTripsDatabase[tickerIndex], false);
        try {
          // لو المستخدم وقف الصوت (OFF) ما نعملش beep
          if (window.__vdAlarmSoundEnabled === false) {
            // no-op
          } else {
            window.__vdAlarmBeep && window.__vdAlarmBeep();
          }
        } catch (e) {}
      }, 6000); 
    }

    // تحديث عدادات الـ Dashboard على أساس حالة المتصل/رحلة/EV
    function updateDashboardCountersOnTrip(trip) {
      if (!trip || !trip.driver) return;

      const tripDriverName = String(trip.driver.name || '').trim();
      const driver = drivers.find(d => String(d.name || '').trim() === tripDriverName);
      if (!driver) {
        // لو السائق غير موجود في drivers => ما نعملش حاجة
        return;
      }

      // تحديث حالة المتصل/الرحلة
      // ✅ حسب المطلوب: لو الكابتن يعمل غير متصل يظهر (غير متصل) بدل (متصل)
      // لو ما وصلناش قيمة connected في trip => نفترض متصل.
      const tripConnected = trip && (trip.connected === false || trip.connected === true) ? trip.connected : null;
      if (tripConnected === false) {
        driver.connected = false;
        driver.hasTrip = false;
      } else {
        driver.connected = true;
        driver.hasTrip = true;
      }


      // ✅ زيادة إجمالي الرحلات لكل كابتن بمجرد استقبال رحلة له
      // (نستخدم captainsUsers لأن فيها عمود totalTrips)
      if (Array.isArray(captainsUsers) && captainsUsers.length) {
        const cap = captainsUsers.find(c => String(c.name || '').trim() === tripDriverName);
        if (cap) {
          cap.totalTrips = Number(cap.totalTrips || 0) + 1;

          const tbody = document.getElementById('captainsUsersTableBody');
          if (tbody) {
            // تحديث سطر الكابتن فقط بدون إعادة بناء الجدول بالكامل قدر الإمكان
            const rows = tbody.querySelectorAll('tr');
            rows.forEach(row => {
              const nameCell = row.querySelector('td');
              if (!nameCell) return;
              if (String(nameCell.textContent || '').trim() !== tripDriverName) return;

              // الأعمدة في renderCaptainsUsersTable:
              // [0]=name, [1]=phone, [2]=email, [3]=totalTrips
              const cells = row.querySelectorAll('td');
              if (cells && cells[3]) {
                cells[3].textContent = String(cap.totalTrips);
              }
            });
          }
        }
      }

      // تحديث الأرقام العامة فوراً
      updateDashboardCounters();
    }

    function dispatchCentralizedTripSignal(trip, isFirstLoad) {
      // 1. تحديث شريط الإشعارات العلوي فوراً وبنفس كائن البيانات
            const tickerContent = document.getElementById('tickerContent');
      if(tickerContent) {
        const enabled = window.__vdAlarmSoundEnabled !== false;
        tickerContent.innerHTML = `
          <div class="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-[10px] shrink-0">
            <i class="fa-solid fa-circle-dot animate-ping"></i>
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs w-full">
            <span class="text-orange-400 font-bold">إشارة بث حي نشطة:</span>
            <p class="text-slate-200">
              يقود <span onclick="focusTripOnMapDynamic('${trip.id}')" class="text-amber-400 underline font-black cursor-pointer hover:text-amber-300">${trip.driver.name}</span> 
              السيارة لوحة (<span class="font-mono text-emerald-400 font-bold">${trip.driver.car}</span>) بموجب رحلة رقم <span class="font-mono text-slate-400 font-bold">[${trip.id}]</span>.
            </p>
            <span class="text-slate-300"><b>المسار:</b> من (${trip.from}) إلى (${trip.to})</span>

            <button type="button" onclick="toggleAlarmSound()" class="ml-auto flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-extrabold transition-all ${enabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}">
              <i class="fa-solid ${enabled ? 'fa-volume-high' : 'fa-volume-xmark'}"></i>
              ${enabled ? 'ON' : 'OFF'}
            </button>
          </div>
        `;
      }

      if (!isFirstLoad) {
        // 2. إطلاق التوست الجانبي متزامن تماماً
        showGlobalSideToast(trip);

        // 3. تحديث حالة الداشبورد قبل الريندر
        updateDashboardCountersOnTrip(trip);
        
        // 4. فلترة وتنظيف المصفوفة لمنع بقاء أي كابتن ببيانات قديمة أو مكررة
        activeTrips = activeTrips.filter(t => t.driver.car !== trip.driver.car);
        
        // إدراج العنصر الجديد الفوري في قمة المصفوفة (Index 0)
        activeTrips.unshift({
          id: trip.id,
          driver: { name: trip.driver.name, car: trip.driver.car },
          from: trip.from,
          to: trip.to,
          coordinates: trip.coordinates
        });
        
        // تحديد حجم المصفوفة بـ 5 عناصر كحد أقصى لضمان استقرار الريندر ومنع اللخبطة بمرور الوقت
        if (activeTrips.length > 5) {
          activeTrips.pop();
        }
        
        // 5. استدعاء ريندر إعادة البناء الشامل لكل العناصر والمؤشرات في نفس اللحظة
        renderLiveTrackingData();
      }
    }

    function showGlobalSideToast(trip) {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      toast.className = `bg-slate-900/95 border-r-4 border-r-orange-500 text-white p-4 rounded-xl shadow-2xl text-xs font-semibold flex flex-col gap-2 animate-slide-in backdrop-blur-md border border-white/10`;
      
      toast.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
          <span class="text-orange-400 font-bold flex items-center gap-1">
            <i class="fa-solid fa-signal text-xs animate-pulse"></i> إشعار تتبع متزامن
          </span>
          <button onclick="this.parentElement.parentElement.remove()" class="text-white/40 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div>
          <p class="text-slate-100 font-bold">الكابتن: <span onclick="focusTripOnMapDynamic('${trip.id}')" class="text-amber-300 font-extrabold underline cursor-pointer hover:text-amber-200">${trip.driver.name}</span></p>
          <p class="text-slate-300 text-[11px] mt-0.5">المركبة: <span class="text-emerald-400 font-bold">${trip.driver.car}</span> | كود الرحلة: ${trip.id}</p>
          <div class="text-[11px] text-slate-400 mt-1 bg-slate-800/60 p-1.5 rounded border border-slate-700/40">
            <b>المسار الحالي بالـ Telemetry:</b> ${trip.from} ➔ ${trip.to}
          </div>
        </div>
      `;
      container.insertBefore(toast, container.firstChild);
      setTimeout(() => { if(toast) toast.remove(); }, 5000);
    }

    window.focusTripOnMapDynamic = function(tripId) {
      // تأكيد وجود trip ثم التأكد أن الـ UI و الـ markers متبنية قبل التحريك
      let matchedTrip = activeTrips.find(t => t.id === tripId);
      if (!matchedTrip) return;

      document.querySelector('[data-page="tracking"]').click();

      // ضمان أن render يتم قبل محاولة رسم/فتح الـ marker المطلوب
      setTimeout(() => {
        renderLiveTrackingData();
        map.invalidateSize();
        map.setView(matchedTrip.coordinates, 12, { animate: true, duration: 1 });

        // فتح الـ popup الخاص بالرحلة كدليل بصري قوي أن العربية ظهرت فعلاً
        if (activeMarkersGroup) {
          activeMarkersGroup.eachLayer(layer => {
            // L.marker بدون reference للـ tripId، فنعتمد على نص popup
            if (layer && layer.getPopup && layer.getPopup()) {
              const popupText = layer.getPopup().getContent?.() || '';
              if (typeof popupText === 'string' && popupText.includes(`Кود: <span class="font-mono font-bold">${tripId}</span>`)) {
                layer.openPopup();
              }
            }
          });
        }
      }, 180);
    }


    // ==========================================
    // عملية الـ Rendering الذرية لمنع تداخل البيانات
    // ==========================================
    function renderLiveTrackingData() {
      const activeList = document.getElementById('active-trips-list');
      const tableBody = document.getElementById('trips-table-body');

      if(!activeList || !tableBody) return;

      // الخطوة الحاسمة 1: تفريغ واجهات الـ DOM تماماً لإجبار المتصفح على البناء النظيف من الصفر
      activeList.innerHTML = '';
      tableBody.innerHTML = '';

      // الخطوة الحاسمة 2: نسف وتطهير كافة الدبابيس الحالية على الخريطة لمنع تراكم دبابيس الكباتن السابقة
      if (activeMarkersGroup) {
        activeMarkersGroup.clearLayers();
      }

      // تحديث أرقام العدادات الفورية بالتطابق
      const currentActiveCount = activeTrips.length;
      document.getElementById('active-count').innerText = currentActiveCount;
      document.getElementById('movingDriversCount').innerText = currentActiveCount;

      // حلقة بناء الواجهات لربط كل قناة بث بالعنصر الصحيح
      activeTrips.forEach((t, idx) => {
        // تمييز العنصر رقم 0 (الأحدث وصولاً في هذه اللحظة بالثانية) بلون خفيف وتأثير حركة
        const conditionalRowStyle = idx === 0 ? 'bg-orange-50/70 border-r-4 border-r-orange-500 font-medium' : '';
        const conditionalCardStyle = idx === 0 ? 'bg-gradient-to-l from-orange-50 to-white border-orange-400 shadow-md ring-1 ring-orange-200' : 'bg-gradient-to-l from-slate-50 to-white border-slate-200';

        // أ- بناء كروت قائمة الكباتن المتحركين على الطريق الآن
        activeList.innerHTML += `
          <div class="p-3.5 border rounded-xl relative flex flex-col gap-1.5 cursor-pointer hover:bg-slate-100 transition-all ${conditionalCardStyle} animate-fade-in" onclick="focusTripOnMapDynamic('${t.id}')">
            <div class="flex justify-between font-bold text-slate-900 text-[12px]">
              <span class="text-indigo-950 font-black">${t.driver.name}</span>
              <span class="text-orange-600 font-mono font-bold tracking-wider">${t.driver.car}</span>
            </div>
            <div class="text-slate-500 text-[11px] font-semibold flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${t.from} <span class="text-slate-400 font-bold">&larr;</span> <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span> ${t.to}
            </div>
            <div class="text-[10px] text-slate-400 font-mono text-left">ID: ${t.id}</div>
          </div>
        `;

        // ب- بناء صفوف جدول الـ Telemetry Logs (مطابق 100% وبنفس الترتيب)
        tableBody.innerHTML += `
          <tr class="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer ${conditionalRowStyle}" onclick="focusTripOnMapDynamic('${t.id}')">
            <td class="px-6 py-4 font-mono font-bold text-slate-900">${t.driver.car}</td>
            <td class="px-6 py-4 font-bold text-slate-800">${t.driver.name}</td>
            <td class="px-6 py-4 text-xs text-slate-600">${t.from}</td>
            <td class="px-6 py-4 text-xs text-slate-600">${t.to}</td>
            <td class="px-6 py-4">
              <span class="text-emerald-600 text-xs font-bold flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> متزامن حي
              </span>
            </td>
          </tr>
        `;

        // جـ- زرع الدبوس الجديد على الخريطة داخل المجموعة النظيفة
        if (map && activeMarkersGroup) {
          let marker = L.marker(t.coordinates);
          
          let popupContent = `
            <div class="text-right font-sans p-1" dir="rtl">
              <h4 class="text-slate-900 font-extrabold text-sm mb-1 border-b border-slate-100 pb-1">
                <i class="fa-solid fa-user-tie text-orange-500 ml-1"></i> ${t.driver.name}
              </h4>
              <p class="text-xs text-slate-700 mb-1">
                <i class="fa-solid fa-car text-slate-400 ml-1"></i> اللوحة: <span class="font-mono font-bold text-orange-600">${t.driver.car}</span>
              </p>
              <p class="text-[11px] text-indigo-950 mb-1">
                <i class="fa-solid fa-hashtag text-slate-400 ml-1"></i> الكود: <span class="font-mono font-bold">${t.id}</span>
              </p>
              <p class="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-200/60 mt-1">
                <b>من:</b> ${t.from}<br>
                <b>إلى:</b> ${t.to}
              </p>
            </div>
          `;
          
          marker.bindPopup(popupContent);
          activeMarkersGroup.addLayer(marker);
        }
      });
    }

    // ==========================================
    // بقية محركات النظام والعدادات
    // ==========================================
    function updateDashboardCounters() {
      const total = drivers.length;
      const connected = drivers.filter(d => d.connected).length;
      const disconnected = total - connected;
      const withTrip = drivers.filter(d => d.hasTrip).length;
      const evsConnected = drivers.filter(d => d.connected && d.battery > 0).length;
      const expiringCount = drivers.filter(d => new Date(d.expiry) < new Date('2026-12-31'));

      document.getElementById('statDriversConnected').innerText = connected;
      document.getElementById('statDriversDisconnected').innerText = disconnected;
      document.getElementById('statDriversWithTrip').innerText = withTrip;
      document.getElementById('statVehiclesConnected').innerText = evsConnected;
      document.getElementById('statDriversTotal').innerText = total;
      document.getElementById('statVehiclesTotal').innerText = total;
      document.getElementById('statDriversNames').innerText = drivers.length
        ? drivers.map(driver => driver.name).join('، ')
        : 'لا يوجد سواقين';
      document.getElementById('statLicenseExpiring').innerText = expiringCount.length;
      renderActiveVehiclesShowcase();
    }

    function renderActiveVehiclesShowcase() {
      const showcase = document.getElementById('activeVehiclesShowcase');
      if (!showcase) return;

      const activeVehicles = [
        {
          driverIndex: 0,
          model: 'Volvo EV50',
          image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=85',
          accent: 'orange'
        },
        {
          driverIndex: 1,
          model: 'smart #1',
          image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=85',
          accent: 'emerald'
        }
      ];

      showcase.innerHTML = activeVehicles.map(vehicle => {
        const driver = drivers[vehicle.driverIndex];
        if (!driver) return '';

        const isMoving = driver.hasTrip;
        const statusClass = isMoving ? 'bg-emerald-400 text-slate-950' : 'bg-slate-700 text-slate-300';
        const statusText = isMoving ? 'في رحلة الآن' : 'متاحة';

        return `
          <article class="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-400/60 transition-all">
            <div class="h-48 overflow-hidden bg-slate-800">
              <img src="${vehicle.image}" alt="${vehicle.model}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute top-3 right-3 ${statusClass} px-3 py-1.5 rounded-full text-[11px] font-black flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full ${isMoving ? 'bg-slate-950 animate-ping' : 'bg-slate-400'}"></span>
                ${statusText}
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <h3 class="text-lg font-black text-white">${vehicle.model}</h3>
                  <p class="text-xs text-slate-400 mt-1">${driver.name}</p>
                </div>
                <span class="text-orange-300 font-mono font-black text-sm">${driver.car}</span>
              </div>
              <div class="mt-4 flex items-center justify-between text-xs">
                <span class="text-slate-400"><i class="fa-solid fa-location-dot text-orange-400 ml-1"></i>${driver.hub}</span>
                <span class="text-slate-300 font-bold">${driver.battery}% شحن</span>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    function renderDriversAndVehicles() {
      const tbodyDrivers = document.getElementById('driversTableBody');
      const tbodyVehicles = document.getElementById('vehiclesTableBody'); // قديم (يبقى لبعض الشاشات)
      const hubsCairoList = document.getElementById('hubsCairoList');
      const hubsAlexList = document.getElementById('hubsAlexList');

      // واجهة الهبز: لو مفيش عناصر القوائم/العدادات، نخرج بأمان
      if(!tbodyDrivers || !hubsCairoList || !hubsAlexList) return;

      // --------------------
      // Vehicles Fleet (Via/Mina)
      // --------------------
      const viaEv = document.getElementById('vehiclesTableBodyViaEV');
      const viaFuel = document.getElementById('vehiclesTableBodyViaFuel');
      const viaHayber = document.getElementById('vehiclesTableBodyViaHayber');

      const minaEv = document.getElementById('vehiclesTableBodyMinaEV');
      const minaFuel = document.getElementById('vehiclesTableBodyMinaFuel');
      const minaHayber = document.getElementById('vehiclesTableBodyMinaHayber');

      // بعض النسخ القديمة قد لا تحتوي على الـ tbody الجديدة -> نعمل فحص
      const hasFleetSection = !!(viaEv && viaFuel && viaHayber && minaEv && minaFuel && minaHayber);

      if (hasFleetSection) {
        viaEv.innerHTML = '';
        viaFuel.innerHTML = '';
        viaHayber.innerHTML = '';
        minaEv.innerHTML = '';
        minaFuel.innerHTML = '';
        minaHayber.innerHTML = '';
      }

      tbodyDrivers.innerHTML = '';
      if (tbodyVehicles) tbodyVehicles.innerHTML = '';
      hubsCairoList.innerHTML = '';
      hubsAlexList.innerHTML = '';

      let cairoCount = 0, alexCount = 0;

      drivers.forEach(d => {
        // -------- Drivers page --------
        tbodyDrivers.innerHTML += `
          <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
            <td class="px-5 py-3.5 font-bold text-slate-900">${d.name}</td>
            <td class="px-5 py-3.5 font-mono text-xs text-slate-500">${d.license}</td>
            <td class="px-5 py-3.5 text-xs font-semibold">${d.expiry}</td>
            <td class="px-5 py-3.5">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                متصل بالشبكة
              </span>
            </td>
            <td class="px-5 py-3.5 text-xs text-slate-500 font-bold">${d.hasTrip ? '<span class="text-orange-600"><i class="fa-solid fa-spinner animate-spin"></i> في رحلة نشطة</span>' : '❌ متاح حالياً'}</td>
          </tr>
        `;

        // -------- Old single table (if exists) --------
        if (tbodyVehicles) {
          tbodyVehicles.innerHTML += `
            <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
              <td class="px-6 py-4 font-bold text-slate-900 bg-slate-50/40">${d.car}</td>
              <td class="px-6 py-4 font-semibold text-slate-700">${d.name}</td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  بث GPS مستقر
                </span>
              </td>
              <td class="px-6 py-4">
                ${(() => {
                  // عند تغيير نوع العربية من EV إلى Fuel/Hayber نعرض لترات (أرقام وهمية) بدل %
                  const vt = d.vehicleType || 'EV';
                  const batteryValue = Number(d.battery) || 0;

                  if (vt !== 'EV') {
                    const liters = Math.max(0, Math.round(batteryValue));
                    const progressWidth = Math.min(100, liters);
                    return `
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm">${liters} لتر</span>
                        <div class="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div class="h-full bg-amber-500" style="width: ${progressWidth}%"></div>
                        </div>
                      </div>
                    `;
                  }

                  return `
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm">${batteryValue}%</span>
                      <div class="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-500" style="width: ${batteryValue}%"></div>
                      </div>
                    </div>
                  `;
                })()}
              </td>
              <td class="px-6 py-4 text-xs font-bold text-indigo-600"><i class="fa-solid fa-location-dot text-slate-400 ml-1"></i> محطة ${d.hub}</td>
            </tr>
          `;
        }

        // -------- Fleet Fleet (Via/Mina) --------
        if (hasFleetSection) {
          const company = d.company || 'Via';
          const vt = d.vehicleType || 'EV';

          const rowHtml = `
            <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
              <td class="px-6 py-4 font-bold text-slate-900 bg-slate-50/40">${d.car}</td>
              <td class="px-6 py-4 font-semibold text-slate-700">${d.name}</td>
              <td class="px-6 py-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  بث GPS مستقر
                </span>
              </td>
              <td class="px-6 py-4">
                ${(() => {
                  const vt = d.vehicleType || 'EV';
                  const batteryPct = Number(d.battery) || 0;

                  if (vt !== 'EV') {
                    const liters = Math.max(0, Math.round(batteryPct));
                    const progressWidth = Math.min(100, liters);
                    return `
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-sm">${liters} لتر</span>
                        <div class="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div class="h-full bg-amber-500" style="width: ${progressWidth}%"></div>
                        </div>
                      </div>
                    `;
                  }

                  return `
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-sm">${batteryPct}%</span>
                      <div class="w-12 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-500" style="width: ${batteryPct}%"></div>
                      </div>
                    </div>
                  `;
                })()}
              </td>
              <td class="px-6 py-4 text-xs font-bold text-indigo-600"><i class="fa-solid fa-location-dot text-slate-400 ml-1"></i> محطة ${d.hub}</td>
            </tr>
          `;

          const targetTbody = (() => {
            if (company === 'Via') {
              if (vt === 'EV') return viaEv;
              if (vt === 'Fuel') return viaFuel;
              if (vt === 'Hayber') return viaHayber;
              return viaEv;
            }
            if (company === 'Mina Tour') {
              if (vt === 'EV') return minaEv;
              if (vt === 'Fuel') return minaFuel;
              if (vt === 'Hayber') return minaHayber;
              return minaEv;
            }
            return viaEv;
          })();

          if (targetTbody) targetTbody.innerHTML += rowHtml;
        }

        const hubCardTemplate = `
          <div class="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center shadow-sm">
            <div class="flex items-center gap-2">
              <div class="p-1.5 bg-slate-100 rounded-md text-slate-700 font-sans text-[11px] font-bold">${d.car}</div>
              <span class="text-xs font-bold text-slate-800">${d.name}</span>
            </div>
            <span class="text-[10px] font-mono text-slate-400">البطارية: ${d.battery}%</span>
          </div>
        `;

        // ✅ فصل السيارات في كل جراج حسب hub المعتمد (القاهرة/الإسكندرية)
        if(d.hub === "القاهرة") {
          cairoCount++;
          hubsCairoList.innerHTML += hubCardTemplate;
        } else {
          alexCount++;
          hubsAlexList.innerHTML += hubCardTemplate;
        }
      });

      document.getElementById('hubsCairo').innerText = cairoCount;
      document.getElementById('hubsAlex').innerText = alexCount;

      updateDashboardCounters();
    }


    window.addDriver = function(e) {
      e.preventDefault();
      const name = document.getElementById('newDriverName').value;
      const license = document.getElementById('newDriverLicense').value;
      const expiry = document.getElementById('newDriverLicenseExpiry').value;

      drivers.push({
        id: drivers.length + 1,
        name: `كابتن ${name}`,
        license: license,
        expiry: expiry,
        connected: true,
        hasTrip: false,
        car: "ط ر ا " + Math.floor(1000 + Math.random() * 9000),
        hub: "القاهرة",
        battery: 95
      });

      document.getElementById('addDriverForm').reset();
      renderDriversAndVehicles();
      buildWorkforceShiftsGridMatrix();
      return false;
    }

    function buildWorkforceShiftsGridMatrix() {
      const grid = document.getElementById('shiftsGrid');
      if(!grid) return;
      grid.innerHTML = '';

      drivers.forEach(d => {
        let tr = document.createElement('tr');
        tr.className = "border-b border-slate-100 hover:bg-slate-50 transition";
        tr.innerHTML = `<td class="px-4 py-3.5 font-bold bg-slate-50 text-slate-900 border-l border-slate-200">${d.name}</td>`;
        
        for(let i=0; i<7; i++) {
          let td = document.createElement('td');
          td.className = "px-2 py-3 text-[11px] border-l border-slate-100 cursor-pointer text-center font-sans select-none";
          td.innerText = i === 6 ? "" : "";
          td.addEventListener('click', function() {
            if(selectedCell) selectedCell.classList.remove('bg-amber-100', 'text-amber-900');
            selectedCell = this;
            this.classList.add('bg-amber-100', 'text-amber-900');
            document.getElementById('selectedShiftLabel').innerText = `${d.name} — خلية نشطة`;
            document.getElementById('shiftInput').value = this.innerText;
          });
          tr.appendChild(td);
        }
        grid.appendChild(tr);
      });
    }

    // إضافة سائق جديد لجدول Workforce & Shifts
    window.addWorkforceDriver = function(e) {
      e.preventDefault();
      const name = document.getElementById('newWorkforceDriverName')?.value?.trim();
      if(!name) return;

      drivers.push({
        id: drivers.length + 1,
        name: `كابتن ${name}`,
        license: "LIC-NEW",
        expiry: "2027-12-31",
        connected: true,
        hasTrip: false,
        car: "ط ر ا " + Math.floor(1000 + Math.random() * 9000),
        hub: "القاهرة",
        battery: 95
      });

      document.getElementById('addWorkforceDriverForm')?.reset();
      buildWorkforceShiftsGridMatrix();
      return false;
    };


window.applySelectedShift = function() {
      if(!selectedCell) return;
      const shiftText = document.getElementById('shiftInput').value || "";

      // الحفاظ على اسم الكابتن كما هو، وتغيير نص الشيفت فقط (مطلوب: أي تعديل الشيفت لأي كابتن)
      const match = selectedCell.innerText.match(/^(.*?)(\s—\s|$)/);
      const driverName = (match && match[1]) ? match[1].trim() : selectedCell.innerText.trim();
      selectedCell.innerText = `${driverName} — ${shiftText}`;
    }

    // ==========================================
    // إدارة طلبات الإجازات (Workforce -> Dispatcher Control)
    // ==========================================
    let leaveRequests = [];

    function formatDateInputValue(val) {
      // val غالباً صيغة yyyy-mm-dd (من input type=date)
      if(!val) return '';
      return val;
    }

    function showToastOnWorkforce(message, tone) {
      const el = document.getElementById('leaveRequestToast');
      if(!el) return;
      el.innerText = message;
      el.className = `text-xs font-bold mt-2 p-2 rounded-lg border ${tone === 'ok' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : tone === 'bad' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`;
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => {
        if(el) el.innerText = '';
      }, 4500);
    }

    window.addLeaveRequest = function(e) {
      e.preventDefault();

      const driverName = document.getElementById('leaveDriverName')?.value?.trim();
      const fromDate = formatDateInputValue(document.getElementById('leaveFromDate')?.value);
      const toDate = formatDateInputValue(document.getElementById('leaveToDate')?.value);
      const reason = document.getElementById('leaveReason')?.value?.trim();
      const shiftDay = document.getElementById('leaveShiftDay')?.value?.trim();

      if(!driverName) return;
      if(!fromDate || !toDate) return;
      if(!reason) return;

      const req = {
        id: 'LEAVE-' + Math.floor(10000 + Math.random() * 90000),
        driverName,
        fromDate,
        toDate,
        reason,
        shiftDay: shiftDay || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      leaveRequests.unshift(req);

      renderLeaveRequests();
      showToastOnWorkforce('تم إرسال طلب الإجازة بنجاح ✅', 'neutral');

      // بعد الإرسال: نعرض Dispatcher Control
      document.querySelector('[data-page="dispatchers"]').click();
    };

    function renderLeaveRequests() {
      // Workforce عرض الردود/الحالة في نفس المكان
      const workforceList = document.getElementById('leaveRequestsBody');
      const dispatcherList = document.getElementById('dispatcherLeaveRequestsBody');

      if(workforceList) {
        workforceList.innerHTML = '';
        leaveRequests.forEach(r => {
          const row = document.createElement('tr');
          row.className = 'border-b border-slate-100 text-sm hover:bg-slate-50 transition cursor-pointer';

          const tone = r.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : r.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-700 border-slate-200';
          const statusLabel = r.status === 'accepted' ? 'مقبول' : r.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة';

          row.innerHTML = `
            <td class="px-4 py-3 font-bold">${r.driverName}</td>
            <td class="px-4 py-3 font-mono text-xs text-slate-600">${r.fromDate} → ${r.toDate}</td>
            <td class="px-4 py-3 text-xs text-slate-600">${r.reason}</td>
            <td class="px-4 py-3">
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border ${tone}">${statusLabel}</span>
            </td>
            <td class="px-4 py-3">
              <button type="button" class="text-xs font-bold text-orange-600 hover:text-orange-700" onclick="showLeaveDetails('${r.id}')">عرض</button>
            </td>
          `;

          workforceList.appendChild(row);
        });
      }

      if(dispatcherList) {
        dispatcherList.innerHTML = '';
        leaveRequests.filter(r => r.status === 'pending').forEach(r => {
          const tr = document.createElement('tr');
          tr.className = 'border-b border-slate-100 hover:bg-slate-50 transition text-sm';
          tr.innerHTML = `
            <td class="px-4 py-3 font-bold">${r.driverName}</td>
            <td class="px-4 py-3 font-mono text-xs text-slate-600">${r.fromDate} → ${r.toDate}</td>
            <td class="px-4 py-3 text-xs text-slate-600">${r.reason}</td>
            <td class="px-4 py-3 text-xs text-slate-600">اليوم المقترح: <b class="text-slate-900">${r.shiftDay || '—'}</b></td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold" onclick="dispatcherDecideLeave('${r.id}', 'accepted')">قبول</button>
                <button class="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold" onclick="dispatcherDecideLeave('${r.id}', 'rejected')">رفض</button>
              </div>
            </td>
          `;
          dispatcherList.appendChild(tr);
        });

        if(dispatcherList.innerHTML === '') {
          dispatcherList.innerHTML = `
            <tr>
              <td colspan="5" class="px-4 py-6 text-center text-xs text-slate-500 font-bold">لا توجد طلبات إجازة قيد المراجعة حالياً</td>
            </tr>
          `;
        }
      }
    }

    window.showLeaveDetails = function(requestId) {
      const req = leaveRequests.find(r => r.id === requestId);
      if(!req) return;

      const box = document.getElementById('leaveDetailsBox');
      const title = document.getElementById('leaveDetailsTitle');
      const dates = document.getElementById('leaveDetailsDates');
      const shift = document.getElementById('leaveDetailsShift');
      const reason = document.getElementById('leaveDetailsReason');

      if(!box || !title || !dates || !shift || !reason) return;

      title.innerText = `${req.driverName} — ${req.id}`;
      dates.innerText = `${req.fromDate} → ${req.toDate}`;
      shift.innerText = req.shiftDay ? req.shiftDay : '—';
      reason.innerText = req.reason;

      box.classList.remove('hidden');
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    window.hideLeaveDetails = function() {
      const box = document.getElementById('leaveDetailsBox');
      if(!box) return;
      box.classList.add('hidden');
    }


    function setDriverLeaveInShiftTable(driverName, dayLabel) {
      // dayLabel موجود من input: سنحاول مطابقة نص الخلية المستهدفة.
      // في حال لم نستطع (مثلاً label غير مطابق)، سنغير خلايا اليوم حسب مصفوفة أيام الجدول (تتطابق مع ترتيب الأعمدة).
      const grid = document.getElementById('shiftsGrid');
      if(!grid) return;

      // dayLabel مثال: السبت/الأحد/.../الجمعة أو صباحي/راحة.
      const dayToIndex = {
        'السبت': 0,
        'الأحد': 1,
        'الإثنين': 2,
        'الثلاثاء': 3,
        'الأربعاء': 4,
        'الخميس': 5,
        'الجمعة': 6
      };

      // لو dayLabel حرفياً غير يوم، نحاول نستخدمه كـ index عبر كلمات.
      const targetIndex = dayToIndex[dayLabel] ?? 6; // افتراضي الجمعة

      // loop rows: كل tr يحتوي على td[0]=اسم الكابتن و td[1..7]=الأيام
      [...grid.querySelectorAll('tr')].forEach(tr => {
        const tds = tr.querySelectorAll('td');
        if(!tds || tds.length < 2) return;
        const nameCell = tds[0];
        const rowDriverName = nameCell?.innerText?.trim() || '';
        if(rowDriverName !== driverName) return;

        // td index day: day 0 => i=0 => tr child تالي (td[1])
        const cell = tds[targetIndex + 1];
        if(!cell) return;

        // جعلها راحة أسبوعية/ أو نص مناسب: كابتن <br> (من ل) + سبب.
        cell.innerText = `إجازة مرضية`;
        cell.classList.remove('bg-amber-100', 'text-amber-900');
        cell.classList.add('bg-rose-50', 'text-rose-700', 'font-bold');
      });
    }

    window.dispatcherDecideLeave = function(requestId, decision) {
      const req = leaveRequests.find(r => r.id === requestId);
      if(!req || req.status !== 'pending') return;

      if(decision === 'accepted') {
        req.status = 'accepted';

        // تطبيق الإجازة على جدول الشيفتات: في يوم الإجازة المعروض
        setDriverLeaveInShiftTable(req.driverName, req.shiftDay);

        document.querySelector('[data-page="workforce"]').click();
        showToastOnWorkforce('تم قبول طلب الإجازة ✅ وتم تحديث جدول الشيفتات', 'ok');
      } else {
        req.status = 'rejected';
        document.querySelector('[data-page="workforce"]').click();
        showToastOnWorkforce('تم رفض طلب الإجازة ❌ (بدون تعديل الجدول)', 'bad');
      }

      // إبقاء الصفحة على Dispatchers مع تحديث القائمة/الستايل
      renderLeaveRequests();
    };



    // زر محاكاة يدوي فوري ومطابق للتعديل الجديد
    window.triggerManualTrip = function() {
      const tripId = "TRIP-" + Math.floor(100000 + Math.random() * 900000);
      currentEarnings += 300;
      currentExpenses += 50;
      
      const manualTrip = {
        id: tripId,
        driver: { name: "كابتن مروان طنطاوي (محاكاة)", car: "ق ر ب 7415" },
        from: "بوابة مطار القاهرة",
        to: "القرية الذكية بالكيلو 28",
        coordinates: [30.0774, 31.0208]
      };

      dispatchCentralizedTripSignal(manualTrip, false);
      
      document.getElementById('finTotalEarnings').innerText = currentEarnings.toLocaleString() + " ج.م";
      document.getElementById('finTotalExpenses').innerText = currentExpenses.toLocaleString() + " ج.م";
      document.getElementById('finNetProfits').innerText = (currentEarnings - currentExpenses).toLocaleString() + " ج.م";
    }

    function formatEGP(n) {
      const num = Number(n) || 0;
      return num.toLocaleString('ar-EG') + ' ج.م';
    }

    function renderDriversSalaryTable() {
      const tbody = document.getElementById('driversSalaryBody');
      if(!tbody) return;

      const bumpValue = Number(document.getElementById('inputBumpValue')?.value ?? 0);
      const delayValue = Number(document.getElementById('inputDelayValue')?.value ?? 0);

      const baseSalary = 10000;

      // ملاحظة: لا يوجد عندك بيانات فعلية للخبطات/التأخيرات حالياً في المشروع.
      // لذلك سنستخدم حقول إدخال بسيطة بداخل الجدول (موجودة كأعمدة رقمية) وليس من model.
      // لو تحب نربطها من Tracking/Telemetry لاحقاً بنبدّل مصدر البيانات.

      const bumpsByDriver = window.__salaryBumpsByDriver || {};
      const delaysByDriver = window.__salaryDelaysByDriver || {};

      tbody.innerHTML = '';

      drivers.forEach(d => {
        const bumps = Number(bumpsByDriver[d.name] ?? 0);
        const delays = Number(delaysByDriver[d.name] ?? 0);

        const bumpAmount = bumps * bumpValue;
        const delayDiscount = delays * delayValue;

        // حسب المطلوب:
        // - الراتب الثابت = baseSalary
        // - لا يتم خصم أي مبالغ إذا كانت الخانات = 0 (لا خبطات / لا تأخيرات)
        // - خصم التأخير يُطبق فقط عند وجود تأخيرات (>0)
        // - مبلغ الخبطات يضاف فقط عند وجود خبطات (>0)
        const totalAfterDiscount = baseSalary + (bumps > 0 ? bumpAmount : 0) - (delays > 0 ? delayDiscount : 0);


        tbody.innerHTML += `
          <tr class="border-b border-slate-100">
            <td class="px-4 py-3 font-bold text-slate-900">${d.name}</td>
            <td class="px-4 py-3 font-mono text-xs text-slate-600">${d.car}</td>
            <td class="px-4 py-3 text-xs">
              <select class="w-40 bg-white border border-slate-200 rounded-xl px-2 py-2 text-xs outline-none" onchange="onOfficeTypeChange('${d.name}', this.value)">
                <option value="captain">الكابتن</option>
                <option value="company">الشركة</option>
              </select>
            </td>
            <td class="px-4 py-3">
              <input type="number" min="0" step="1" value="${bumps}" class="w-24 bg-white border border-slate-200 rounded-xl px-2 py-2 text-xs outline-none" oninput="onDriverMetricChange('${d.name}', 'bumps', this.value)" />
            </td>
            <td class="px-4 py-3">
              <input type="number" min="0" step="1" value="${delays}" class="w-24 bg-white border border-slate-200 rounded-xl px-2 py-2 text-xs outline-none" oninput="onDriverMetricChange('${d.name}', 'delays', this.value)" />
            </td>
            <td class="px-4 py-3 text-sm font-bold">${formatEGP(delayDiscount)}</td>
            <td class="px-4 py-3 text-sm font-black text-emerald-700">${formatEGP(totalAfterDiscount)}</td>
          </tr>
        `;

        // Initialize defaults for metrics so that render is stable
        if(window.__salaryBumpsByDriver && window.__salaryDelaysByDriver) {
          // nothing
        }
      });
    }

    window.onDriverMetricChange = function(driverName, key, val) {
      window.__salaryBumpsByDriver = window.__salaryBumpsByDriver || {};
      window.__salaryDelaysByDriver = window.__salaryDelaysByDriver || {};

      const num = Number(val) || 0;
      if(key === 'bumps') window.__salaryBumpsByDriver[driverName] = num;
      if(key === 'delays') window.__salaryDelaysByDriver[driverName] = num;

      renderDriversSalaryTable();
    };

    window.onOfficeTypeChange = function(driverName, officeType) {
      // حسب طلبك: لو اخترت الشركة ميتخصمش من الكابتن حاجه من الراتب 10 الف.
      // يعني: ما نغيرش إجمالي الحساب الحالي.
      // لو لاحقاً عايزين نسبة/قانون مختلف للشركة هنضيف هنا.
      window.__salaryOfficeTypeByDriver = window.__salaryOfficeTypeByDriver || {};
      window.__salaryOfficeTypeByDriver[driverName] = officeType;

      // لا تأثير على الخصم حالياً
      renderDriversSalaryTable();
    };

    function bindSalaryInputs() {
      const bumpInput = document.getElementById('inputBumpValue');
      const delayInput = document.getElementById('inputDelayValue');
      if(bumpInput) bumpInput.addEventListener('input', renderDriversSalaryTable);
      if(delayInput) delayInput.addEventListener('input', renderDriversSalaryTable);
    }

    // ===============================
    // Users/Captains (page: users)
    // ===============================
    let captainsUsers = [
      // افتراضيًا سنملأ البيانات من drivers.
      // TotalTrips/AccountStatus يمكن تعديلهم من النموذج.
    ];

    // ===============================
    // Vehicle Delivery: اختيار كابتن من صفحة Users
    // ===============================
    window.setSelectedCaptainToVehicleDelivery = function(captainName) {
      const tbody = document.getElementById('vd_checklist');
      if(!tbody) return;

      // اكتب اسم الكابتن المختار في عمود/مدخل اسم الكابتن داخل الـ Vehicle Delivery checklist
      tbody.querySelectorAll('tr').forEach(tr => {
        const nameInput = tr.querySelector('input');
        if(nameInput) nameInput.value = captainName;
      });

      // تحديث عنوان العمود في جدول Users (في حالة وجوده في الـ DOM)
      // المطلوب: اكتابة/عرض اسم الكابتن بجانب كلمة "اسم كابتن" بدل اللون الأخضر.
      const userHeaderSpan = document.querySelector('#captainsUsersTable thead span.text-green-700');
      if (userHeaderSpan) {
        userHeaderSpan.textContent = 'اسم كابتن: ' + captainName;
      }

      // احذف علامة التمييز (اللون الأخضر) من صف المستخدم/اسم الكابتن في جدول Users
      // إزالة أي تلوين أخضر سابق من صفوف جدول Users إن وُجد
      // (ملاحظة: جدول Users في الكود الحالي لا يضيف كلاس bg-emerald-50/text-emerald-700 لِـ <tr>
      // لكن نحافظ على الكود لو تم إضافة تمييز لاحقاً.)
      document.querySelectorAll('#captainsUsersTableBody tr').forEach(tr => {
        tr.classList.remove('bg-emerald-50');
        tr.classList.remove('text-emerald-700');
      });

      // --- إصلاح مشكلة تكرار/تداخل عبارة "اسم كابتن" ---
      // لا نقوم بتعديل أي عناصر نصية خضراء داخل الصفحة لأن هذا يسبب ظهور "اسم" غير المقصود بجانب/تحت اسم الكابتن.
      // (تم حذف منطق تعديل عنوان span:text-green-700)
      
    };


    function hideAddCaptainForm() {
      const box = document.getElementById('addCaptainFormBox');
      if(box) box.classList.add('hidden');
    }

    window.showAddCaptainForm = function() {
      const box = document.getElementById('addCaptainFormBox');
      if(!box) return;
      box.classList.remove('hidden');

      // Reset سريع للحقول (بدون reset ديناميكي إذا حبيت)
      const form = document.getElementById('addCaptainForm');
      if(form) form.reset();
    };

    function initCaptainsUsersTable() {
      // لو captainsUsers فاضية => ابنيها من drivers
      if(!Array.isArray(captainsUsers) || captainsUsers.length === 0) {
        captainsUsers = drivers.map(d => ({
          id: 'CAP-' + d.id,
          name: d.name,
          phone: '010' + String(10000000 + d.id * 12345).slice(-8),
          email: (d.name.replace(/\s+/g, '').toLowerCase() + '@example.com'),
          totalTrips: d.hasTrip ? 120 : 60,
          accountStatus: 'active'
        }));
      }
    }

    function renderCaptainsUsersTable() {
      const tbody = document.getElementById('captainsUsersTableBody');
      if(!tbody) return;

      tbody.innerHTML = '';
      captainsUsers.forEach(c => {
        // عرض حالة الحساب في Users:
        // - لو accountStatus === 'active' => نشط
        // - لو الكابتن غير فاتح (غير connected في الكباتن/سائقين) => غير متصل
        // - لو accountStatus === 'disabled' => متوقف
        // - غير ذلك => قيد التفعيل
        const driver = drivers.find(d => String(d.name || '').trim() === String(c.name || '').trim());
        const isConnected = !!(driver && driver.connected);

        let statusLabel = 'قيد التفعيل';
        let statusTone = 'bg-slate-50 text-slate-700 border-slate-200';

        if (!isConnected) {
          statusLabel = 'غير متصل';
          statusTone = 'bg-rose-50 text-rose-700 border-rose-200';
        } else {
          if (c.accountStatus === 'active') {
            statusLabel = 'نشط';
            statusTone = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          } else if (c.accountStatus === 'disabled') {
            statusLabel = 'متوقف';
            statusTone = 'bg-rose-50 text-rose-700 border-rose-200';
          }
        }

        tbody.innerHTML += `
          <tr class="border-b border-slate-100 hover:bg-slate-50/80 transition">
            <td class="px-6 py-4 font-bold text-slate-900">
              ${c.name}
            </td>

            <td class="px-6 py-4 font-mono text-xs text-slate-600">${c.phone}</td>
            <td class="px-6 py-4 text-xs text-slate-600">${c.email}</td>
            <td class="px-6 py-4 text-xs text-slate-600">${c.totalTrips}</td>
            <td class="px-6 py-4">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold border ${statusTone}">${statusLabel}</span>
            </td>

            <td class="px-6 py-4">
              <button type="button" class="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-slate-900" onclick="openCaptainDetails('${c.id}')">
                <span class="text-[11px] font-bold">عرض</span>
                <i class="fa-solid fa-eye text-slate-500 text-base"></i>
              </button>

              <button type="button" class="flex flex-col items-center justify-center gap-1 text-rose-600 hover:text-rose-700" onclick="removeCaptainFromUsers('${c.id}')">
                <span class="text-[11px] font-bold">مسح</span>
                <i class="fa-solid fa-trash-can text-rose-500 text-base"></i>
              </button>
            </td>
          </tr>
        `;
      });
    }

    window.addCaptainToUsers = function(e) {

      e.preventDefault();

      const name = document.getElementById('captainNameInput')?.value?.trim();
      const phone = document.getElementById('captainPhoneInput')?.value?.trim();
      const email = document.getElementById('captainEmailInput')?.value?.trim();
      const totalTrips = Number(document.getElementById('captainTripsInput')?.value ?? 0);
      const accountStatus = document.getElementById('captainStatusInput')?.value ?? 'active';

      if(!name || !phone || !email || !Number.isFinite(totalTrips)) return;

      captainsUsers.unshift({
        id: 'CAP-' + Math.floor(100000 + Math.random() * 900000),
        name,
        phone,
        email,
        totalTrips,
        accountStatus
      });

      hideAddCaptainForm();
      renderCaptainsUsersTable();
      return false;
    };

    window.openCaptainDetails = function(captainId) {
      const captain = captainsUsers.find(c => c.id === captainId);
      if(!captain) return;

      // keep reference for delete button
      window.__selectedCaptainIdForDeletion = captainId;

      // 1) تحديث النص الأخضر داخل Vehicle Delivery header عندما يتم الضغط على أي كابتن
      const vdHeaderGreenSpan = document.querySelector('#vd_checklist thead span.text-green-700');
      const vdHeaderInput = document.getElementById('vd_header_input');
      const vdHeaderConfirmBtn = document.getElementById('vd_header_confirm_btn');
      const vdHeaderListEl = document.getElementById('vd_header_list');

      // init: make sure UI exists
      if (vdHeaderGreenSpan) {
        vdHeaderGreenSpan.textContent = 'اسم كابتن: ' + captain.name;
      }

      // allow button/input to append text next to green header without corrupting it
      if (vdHeaderInput && vdHeaderConfirmBtn && vdHeaderListEl) {
        vdHeaderConfirmBtn.onclick = function() {
          const txt = String(vdHeaderInput.value || '').trim();
          if (!txt) return;
          vdHeaderListEl.innerHTML = vdHeaderListEl.innerHTML + `<span class="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold ml-2 mt-1">${txt}</span>`;
          vdHeaderInput.value = '';
        };
      }

      // 2) Toast تفاصيل الكابتن (كما هو)
      const container = document.getElementById('toast-container');
      if(!container) return;

      const toast = document.createElement('div');
      toast.className = `bg-slate-900/95 border-r-4 border-r-orange-500 text-white p-4 rounded-xl shadow-2xl text-xs font-semibold flex flex-col gap-2 animate-slide-in backdrop-blur-md border border-white/10`;

      toast.innerHTML = `
        <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
          <span class="text-orange-400 font-bold flex items-center gap-1">
            <i class="fa-solid fa-user-tie text-xs animate-pulse"></i> تفاصيل الكابتن
          </span>
          <button onclick="this.parentElement.parentElement.remove()" class="text-white/40 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div>
          <p class="text-slate-100 font-bold">${captain.name}</p>
          <p class="text-slate-300 text-[11px] mt-0.5">📞 ${captain.phone} | ✉️ ${captain.email}</p>
          <p class="text-[11px] text-slate-400 mt-1 bg-slate-800/60 p-1.5 rounded border border-slate-700/40">
            إجمالي الرحلات: <b class="text-amber-300">${captain.totalTrips}</b>
          </p>
          <p class="text-[11px] text-slate-400 mt-1">حالة الحساب: <b class="text-emerald-300">${captain.accountStatus}</b></p>
        </div>
      `;

      container.insertBefore(toast, container.firstChild);
      setTimeout(() => { if(toast) toast.remove(); }, 5000);
    };

    window.vdHeaderConfirm = function() {
      const input = document.getElementById('vd_header_input');
      const list = document.getElementById('vd_header_list');
      if(!input || !list) return;
      const txt = String(input.value || '').trim();
      if (!txt) return;

      // عرض القيمة جنب اسم الكابتن فوراً + ترك مربع الإدخال جاهز
      const nameBlock = document.getElementById('vd_header_list');
      if(nameBlock) {
        nameBlock.innerHTML = nameBlock.innerHTML + `<span class="inline-flex items-center px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold ml-2 mt-1">${txt}</span>`;
      }

      input.value = '';
    };

    window.removeCaptainFromUsers = function(captainId) {
      if (typeof captainId === 'undefined' || captainId === null) {
        captainId = window.__selectedCaptainIdForDeletion;
      }
      if (!captainId) return;

      captainsUsers = captainsUsers.filter(c => c.id !== captainId);

      // تحديث جدول Users
      renderCaptainsUsersTable();

      // إعادة ضبط header الخاص بالـ Vehicle Delivery
      const vdHeaderGreenSpan = document.querySelector('#vd_checklist thead span.text-green-700');
      const vdHeaderInput = document.getElementById('vd_header_input');
      const vdHeaderListEl = document.getElementById('vd_header_list');
      if (vdHeaderGreenSpan) vdHeaderGreenSpan.textContent = 'اسم كابتن: —';
      if (vdHeaderInput) vdHeaderInput.value = '';
      if (vdHeaderListEl) vdHeaderListEl.innerHTML = '';

      // تنظيف مرجع الحذف
      if (window.__selectedCaptainIdForDeletion === captainId) {
        window.__selectedCaptainIdForDeletion = null;
      }
    };

    function stopCentralizedTicker() {
      try {
        // الإيقاف يعتمد على clearInterval ولكن لازم أيضاً نوقف منبّع التحديث لوحده
        if (tickerInterval) {
          clearInterval(tickerInterval);
          tickerInterval = null;
        }
      } catch (e) {}
    }

    function startCentralizedTickerIfNeeded() {
      try {
        if (tickerInterval) return;
        startTickerRotation();
      } catch (e) {}
    }

    window.vdPickCleaningImages = function() {
      const input = document.getElementById('vd_cleaning_images_input');
      if (!input) return;

      // حل مشكلة: بعض البيئات/المتصفحات لا تفتح نافذة اختيار الملفات إذا كان input مخفي (class=hidden)
      // لذلك نُظهره مؤقتاً بدون تغيير الشكل العام ثم نعمل click وهو ظاهر
      const prevClassName = input.className;
      const prevHidden = input.hidden;
      const prevDisplay = input.style.display;
      const prevVisibility = input.style.visibility;

      // إزالة hidden class
      input.classList.remove('hidden');
      input.hidden = false;
      input.style.display = 'block';
      input.style.visibility = 'visible';

      setTimeout(() => {
        try {
          input.focus();
          input.click();
        } finally {
          // رجوع الحالة الأصلية
          input.style.display = prevDisplay;
          input.style.visibility = prevVisibility;
          input.hidden = prevHidden;
          input.className = prevClassName;
        }
      }, 0);
    };

    window.vdInitCleaningImagePicker = function() {
      const input = document.getElementById('vd_cleaning_images_input');
      const preview = document.getElementById('vd_cleaning_images_preview');
      if (!input || !preview) return;

      input.addEventListener('change', () => {
        preview.innerHTML = '';
        const files = Array.from(input.files || []);
        if (!files.length) return;

        files.forEach((file) => {
          const url = URL.createObjectURL(file);
          const wrapper = document.createElement('div');
          wrapper.className = 'relative border border-slate-200 rounded-lg overflow-hidden w-24 h-16 bg-slate-50';

          const img = document.createElement('img');
          img.src = url;
          img.className = 'w-full h-full object-cover';

          const removeBtn = document.createElement('button');
          removeBtn.type = 'button';
          removeBtn.className = 'absolute top-1 right-1 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-[11px]';
          removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

          removeBtn.addEventListener('click', () => {
            // لا يمكن تعديل FileList مباشرة بشكل موثوق في كل المتصفحات؛
            // لهذا بنحذف العرض فقط.
            wrapper.remove();
          });

          wrapper.appendChild(img);
          wrapper.appendChild(removeBtn);
          preview.appendChild(wrapper);
        });
      });
    };

    window.vehicleDeliverySubmit = function() {
      // 1) إيقاف إشعارات التتبع المتزامن التي تظهر كل 6 ثواني
      stopCentralizedTicker();

      // 2) جمع بيانات النموذج (حسب الحقول الموجودة في الصفحة)
      const getVal = (id) => document.getElementById(id)?.value ?? '';
      const notesRows = Array.from(document.querySelectorAll('#vd_checklist tr'));

      const notes = notesRows.map(tr => {
        const textInput = tr.querySelector('td[colspan] input, td[colspan]') ? tr.querySelector('td[colspan] input') : tr.querySelector('input[type="text"], input, td input');
        const note = (textInput && textInput.value !== undefined) ? String(textInput.value || '') : (tr.querySelector('input')?.value ?? '');
        const statusSel = tr.querySelector('select');
        const status = statusSel ? statusSel.value : '';
        // بعض الـ tbody قد تكون فيها input التابع للتأكيد غير مصمم، فنعتمد على inputs/select فقط
        return { note, status };
      });

      const payload = {
        formNo: getVal('vd_form_no'),
        fileNo: getVal('vd_file_no'),
        deliveryDate: getVal('vd_delivery_date'),
        type: getVal('vd_type'),
        plate: getVal('vd_plate'),
        model: getVal('vd_model'),
        km: getVal('vd_km'),
        color: getVal('vd_color'),
        chassisNo: '',
        engineNo: '',
        captainHeader: document.getElementById('vd_header_input')?.value ?? '',
        captainList: document.getElementById('vd_header_list')?.innerText ?? '',
        vehicleNotes: notes,
        corp: {
          signature: getVal('vd_corp_signature'),
          name: getVal('vd_corp_name'),
          date: getVal('vd_corp_date')
        },
        emp: {
          signature: getVal('vd_emp_signature'),
          name: getVal('vd_emp_name'),
          jobNo: getVal('vd_emp_job_no')
        }
      };

      // 3) عرض إشعار ثابت فيه البيانات المدخلة (بدون تكرار)
      const container = document.getElementById('toast-container');
      if (container) {
        container.innerHTML = '';

        const toast = document.createElement('div');
        toast.className = 'bg-emerald-50 text-emerald-900 border border-emerald-200 p-4 rounded-xl shadow-2xl text-xs font-semibold flex flex-col gap-2 backdrop-blur-md';

        toast.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-emerald-800">تم حفظ Vehicle Delivery</span>
            <button id="vdToastCloseBtn" class="text-emerald-700 hover:text-emerald-900" type="button"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <div class="text-slate-700 text-[11px] leading-6">
            <b>رقم النموذج:</b> ${payload.formNo || '—'}<br>
            <b>رقم ملف السيارة:</b> ${payload.fileNo || '—'}<br>
            <b>تاريخ التسليم:</b> ${payload.deliveryDate || '—'}<br>
            <b>النوع:</b> ${payload.type || '—'}<br>
            <b>رقم اللوحة:</b> ${payload.plate || '—'}<br>
            <b>الموديل:</b> ${payload.model || '—'}<br>
            <b>العداد (كم):</b> ${payload.km || '—'}<br>
            <b>اللون:</b> ${payload.color || '—'}<br>

            <div class="mt-2"><b>ملاحظات السيارة:</b></div>
            ${payload.vehicleNotes.map((n, i) => `
              <div class="mt-1 pl-2 border-l-2 border-slate-200">
                <b>بند ${i + 1}:</b> ${n.note || '—'} | <b>الحالة:</b> ${n.status || '—'}
              </div>
            `).join('')}

            <div class="mt-2"><b>التوقيع/البيانات:</b></div>
            <b>Company:</b> ${payload.corp.name || '—'} | <b>التوقيع:</b> ${payload.corp.signature || '—'} | <b>التاريخ:</b> ${payload.corp.date || '—'}<br>
            <b>Employee:</b> ${payload.emp.name || '—'} | <b>التوقيع:</b> ${payload.emp.signature || '—'} | <b>الرقم الوظيفي:</b> ${payload.emp.jobNo || '—'}
          </div>

          <div class="mt-2 flex justify-end">
            <button type="button" id="vdToastConfirmBtn" class="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold">تم</button>
          </div>
        `;

        container.appendChild(toast);

        const closeBtn = document.getElementById('vdToastCloseBtn');
        const confirmBtn = document.getElementById('vdToastConfirmBtn');

      const resume = () => {
          try {
            container.innerHTML = '';
          } catch (e) {}
          startCentralizedTickerIfNeeded();
        };

        // لازم الإشعار يكون ظاهر + التفاعل عليه يكون سريع بدون ما يعمل غلق/فتح غير متوقع
        if (closeBtn) closeBtn.addEventListener('click', resume, { once: true });
        if (confirmBtn) confirmBtn.addEventListener('click', resume, { once: true });

        // فتح الإشعار عند الضغط على اسم كابتن اللي اتكتب في vd_header_list
        // (الكابتن header الحالي بيعمل span بداخل vd_header_list)
        const headerList = document.getElementById('vd_header_list');
        if (headerList) {
          headerList.addEventListener('click', (ev) => {
            const span = ev.target && ev.target.closest ? ev.target.closest('span') : null;
            if (!span) return;
            if (!toast || !container) return;
            if (!container.contains(toast)) return;

            const isHidden = toast.style.display === 'none' || toast.classList.contains('hidden');

            if (isHidden) {
              toast.style.display = '';
              toast.classList.remove('hidden');
              clearTimeout(window.__vdToastHideTimer);
              window.__vdToastHideTimer = setTimeout(() => {
                if (toast && container && container.contains(toast)) {
                  toast.style.display = 'none';
                }
              }, 5000);
            } else {
              toast.style.display = 'none';
            }
          });
        }
      }

      // return false to prevent any default
      return false;
    };

    function resetAddVehicleForm() {
      const form = document.getElementById('addVehicleForm');
      if(form) form.reset();
    }

    function showAddVehicleFormByUserAction() {
      const box = document.getElementById('addVehicleFormBox');
      if (!box) return;
      box.classList.remove('hidden');
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      const type = document.getElementById('fleetTypeSelect')?.value;
      const labelType = (type === 'EV') ? 'EV' : (type === 'Fuel') ? 'Fuel' : 'Hayber';

      // استخدمي innerText بدل innerHTML
      const hint = document.getElementById('fleetAddHint');
      if (hint) hint.textContent = `إضافة سيارة جديدة (${labelType})`;


      // تأكيد تحديث الواجهة عند تغيير الاختيار بدون ضغط "تم" قبل الإضافة
      try { applyFleetFilter(); } catch (e) {}


    }

    function addVehicleFromForm(e) {
      e.preventDefault();

      const captainName = document.getElementById('newVehicleCaptainName')?.value?.trim() || '';
      const plate = document.getElementById('newVehiclePlate')?.value?.trim() || '';
      const hub = document.getElementById('newVehicleHub')?.value || '';
      const battery = Number(document.getElementById('newVehicleBattery')?.value ?? 0);
      const model = document.getElementById('newVehicleModel')?.value?.trim() || '';
      const chassisNo = document.getElementById('newVehicleChassisNo')?.value?.trim() || '';

      if(!captainName || !plate || !hub || !Number.isFinite(battery)) return false;
      if(battery < 0 || battery > 100) return false;

      // حاول ربط السيارة بالكابتن الموجود في drivers بالاسم
      let existingDriver = drivers.find(d => String(d.name || '').trim() === captainName);

      const company = document.getElementById('fleetCompanySelect')?.value || 'Via';
      const vehicleType = document.getElementById('fleetTypeSelect')?.value || 'EV';

      if(existingDriver) {
        existingDriver.car = plate;
        existingDriver.hub = hub;
        existingDriver.battery = battery;
        existingDriver.company = company;
        existingDriver.vehicleType = vehicleType;
        // model/chassis no placeholders (لا تظهر في الجداول الحالية)
      } else {
        drivers.push({
          id: drivers.length + 1,
          name: captainName,
          license: 'LIC-NEW',
          expiry: '2027-12-31',
          connected: true,
          hasTrip: false,
          car: plate,
          hub: hub,
          battery: battery,
          company: company,
          vehicleType: vehicleType
        });
      }

      // ريندر
      if(typeof renderDriversAndVehicles === 'function') renderDriversAndVehicles();
      if(typeof initCaptainsUsersTable === 'function' && typeof renderCaptainsUsersTable === 'function') {
        initCaptainsUsersTable();
        renderCaptainsUsersTable();
      }
      if(typeof buildWorkforceShiftsGridMatrix === 'function') buildWorkforceShiftsGridMatrix();
      if(typeof renderDriversSalaryTable === 'function') renderDriversSalaryTable();

      // تطبيق الفلتر الحالي إن وجد
      try { applyFleetFilter(); } catch (e) {}

      resetAddVehicleForm();

      // إخفاء الفورم بعد حفظ السيارة كما هو مطلوب
      const box = document.getElementById('addVehicleFormBox');
      if (box) box.classList.add('hidden');

      return false;
    }

    function applyFleetFilter() {


      const company = document.getElementById('fleetCompanySelect')?.value;
      const vtype = document.getElementById('fleetTypeSelect')?.value;
      const label = document.getElementById('fleetFilterCurrentLabel');
      if (!company || !vtype) return;

      if (label) label.innerText = `${vtype} — ${company}`;

      const mapTbodyId = (c, t) => {
        if (c === 'Via') {
          if (t === 'EV') return 'vehiclesTableBodyViaEV';
          if (t === 'Fuel') return 'vehiclesTableBodyViaFuel';
          if (t === 'Hayber') return 'vehiclesTableBodyViaHayber';
        }
        if (c === 'Mina Tour') {
          if (t === 'EV') return 'vehiclesTableBodyMinaEV';
          if (t === 'Fuel') return 'vehiclesTableBodyMinaFuel';
          if (t === 'Hayber') return 'vehiclesTableBodyMinaHayber';
        }
        return null;
      };

      const targetTbodyId = mapTbodyId(company, vtype);
      if (!targetTbodyId) return;

      // إظهار/إخفاء مربعات الجداول (في صفحة Vehicles)
      // المطلوب: يكون الجدول كبير (صفحة كاملة) وليس box صغير فاضي.
      // لذلك نخفي/نُظهر الـ block container (grid columns) الخاصة بالـ table، وليس فقط الـ tbody.
      const allTbodyIds = [
        'vehiclesTableBodyViaEV','vehiclesTableBodyViaFuel','vehiclesTableBodyViaHayber',
        'vehiclesTableBodyMinaEV','vehiclesTableBodyMinaFuel','vehiclesTableBodyMinaHayber'
      ];

      function getTableCardForTbody(tbodyEl) {
        if (!tbodyEl) return null;
        // على صفحة Vehicles الـ <tbody> داخل div الـ card مباشرة (div class="overflow-x-auto border ... rounded-xl")
        // فبدل ما نخفي/نُظهر wrapper كبير/غير مقصود، هنخفي الـ card نفسها.
        const card = tbodyEl.closest('div.overflow-x-auto.border');
        return card || tbodyEl.parentElement;
      }

      // إخفاء/إظهار "كروت" الجداول فقط (وليس أي عناصر أخرى)
      allTbodyIds.forEach(id => {
        const tbody = document.getElementById(id);
        if (!tbody) return;
        const cardDiv = getTableCardForTbody(tbody);
        if (!cardDiv) return;
        cardDiv.classList.toggle('hidden', id !== targetTbodyId);
      });

      // تحديث كلمات العنوان والوِسْمات حسب الاختيار (Fuel/EV/Hayber + Company)
      const fleetTitle = document.getElementById('fleetFilterTitle');
      const batteryTableTitle = document.getElementById('batteryTableTitle');
      const labelType = (vtype === 'EV') ? 'EV' : (vtype === 'Fuel') ? 'Fuel' : 'Hayber';
      if (fleetTitle) fleetTitle.innerText = `منظومة إدارة ومتابعة المركبات الكهربائية ${labelType}`;
      if (batteryTableTitle) batteryTableTitle.innerText = `مستوى شحن البطارية — ${labelType}`;


      // تأكيد: داخل كل company section نخلي العنوان/العرض ظاهر على الآخر
      // (لا نفعل شيء إضافي هنا حتى لا نكسر HTML الحالي)
    }

    // ==========================
    // Local Demo Authentication
    // ==========================
    const AUTH_USERS_KEY = 'via_auth_users_v1';
    const AUTH_SESSION_KEY = 'via_auth_session_v1';

    function _getUsers() {
      try {
        return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]');
      } catch (e) {
        return [];
      }
    }
    function _setUsers(users) {
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
    }

    function _getSession() {
      try {
        return JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY) || 'null');
      } catch (e) {
        return null;
      }
    }
    function _setSession(sess) {
      if (!sess) {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        return;
      }
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sess));
    }

    async function sha256Hex(str) {
      const enc = new TextEncoder();
      const buf = enc.encode(str);
      const digest = await crypto.subtle.digest('SHA-256', buf);
      return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function authSetMessage(msg, tone) {
      const el = document.getElementById('authMessage');
      if (!el) return;
      el.classList.remove('hidden');
      const base = 'text-xs font-bold p-3 rounded-xl border';
      const toneClass = tone === 'ok'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : tone === 'bad'
          ? 'bg-rose-50 text-rose-700 border-rose-200'
          : 'bg-slate-50 text-slate-700 border-slate-200';
      el.className = base + ' ' + toneClass;
      el.innerText = msg;
    }

    function authShowTab(tab) {
      const tabs = ['login', 'signup', 'reset'];
      tabs.forEach(t => {
        const panel = document.getElementById(`authPanel${t.charAt(0).toUpperCase()}${t.slice(1)}`);
        const btn = document.getElementById(`authTab${t.charAt(0).toUpperCase()}${t.slice(1)}`);
        if (!panel || !btn) return;
        const isActive = t === tab;
        panel.classList.toggle('hidden', !isActive);
        btn.classList.toggle('bg-orange-600', t === 'login' && isActive);
        // login tab is orange, others are outline
        if (t === 'login') {
          btn.classList.toggle('bg-orange-600', isActive);
          btn.classList.toggle('text-white', isActive);
          btn.classList.toggle('bg-white', !isActive);
          btn.classList.toggle('border', !isActive);
          btn.classList.toggle('text-slate-700', !isActive);
        } else {
          btn.classList.toggle('bg-orange-600', false);
          if (isActive) {
            btn.classList.add('bg-orange-600');
            btn.classList.add('text-white');
            btn.classList.remove('border-slate-200');
          } else {
            btn.classList.add('bg-white');
            btn.classList.add('border');
            btn.classList.add('border-slate-200');
            btn.classList.add('text-slate-700');
            btn.classList.remove('bg-orange-600');
            btn.classList.remove('text-white');
          }
        }
      });

      // Reset message
      const el = document.getElementById('authMessage');
      if (el) el.classList.add('hidden');
    }

    function lockAppUI(locked) {
      const overlay = document.getElementById('auth-overlay');
      if (!overlay) return;
      overlay.classList.toggle('hidden', !locked);

      // Hide all app sections if locked, show after login.
      // Important: existing app uses .page-section and hidden classes.
      document.querySelectorAll('.page-section').forEach(sec => {
        if (!sec) return;
        if (locked) {
          sec.classList.add('hidden');
        }
      });
    }

    function goToAppDashboard() {
      goToAppPage('dashboard');
    }

    function goToAppPage(pageName) {
      const sess = _getSession();
      if (!sess || !sess.userName) return;

      document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));

      const target = document.querySelector(`[data-page-section="${pageName}"]`);
      if (target) target.classList.remove('hidden');

      const home = document.querySelector('[data-page-section="home"]');
      if (home && pageName !== 'home') home.classList.add('hidden');

      // update navbar selected state if pageName exists in sidebar
      if (pageName) {
        document.querySelectorAll('#sidebarNav .nav-link').forEach(l => {
          const p = l.getAttribute('data-page');
          const active = p === pageName;
          l.classList.toggle('bg-slate-800', active);
          l.classList.toggle('text-white', active);
          l.classList.toggle('font-semibold', active);

          const i = l.querySelector('i');
          if (i) {
            i.classList.toggle('text-orange-500', active);
            i.classList.toggle('text-slate-500', !active);
          }
        });
      }

      // map size refresh (tracking page)
      if (pageName === 'tracking') {
        setTimeout(() => {
          try { map && map.invalidateSize(); } catch (e) {}
        }, 200);
      }

      const titles = {
        dashboard: "لوحة التحكم الرئيسية Dashboard",
        users: "إدارة المستخدمين والعملاء المقيدين بالمنظومة",
        drivers: "قاعدة بيانات الكباتن وقائدي السيارات",
        dispatchers: "غرفة موجهي ومرحلي الرحلات المعتمدين",
        vehicles: "منظومة إدارة ومتابعة المركبات الكهربائية EVs",
        hubs: "محطات المبيت الفرعية واللوجستية الرئيسية (Via Hubs)",
        assignments: "التكليفات الخارجية والرحلات المحولة للنظام",
        workforce: "جدول الورديات، الشيفتات، وتنظيم القوة العاملة (Workforce)",
        tracking: "شاشة التتبع الحي وتحليل إشارات الـ GPS المباشرة للأسطول",
        documents: "الوثائق، التقارير التشغيلية، والمستندات المالية المتكاملة",
        home: "Home"
      };
      const pt = document.getElementById('pageTitle');
      if (pt) pt.innerText = titles[pageName] || 'لوحة التحكم';
    }


    function updateHomeFromSession() {
      const sess = _getSession();
      if (!sess) return;
      const u = document.getElementById('authCurrentUserName');
      const e = document.getElementById('authCurrentUserEmail');
      if (u) u.innerText = sess.userName || '—';
      if (e) e.innerText = sess.email || '—';
    }

    async function loginUser() {
      const userName = (document.getElementById('authLoginUserName')?.value || '').trim();
      const password = (document.getElementById('authLoginPassword')?.value || '');
      if (!userName || !password) {
        authSetMessage('من فضلك أدخل اسم المستخدم وكلمة المرور', 'bad');
        return;
      }

      const users = _getUsers();
      const u = users.find(x => String(x.userName || '').trim() === userName);
      if (!u) {
        authSetMessage('بيانات الدخول غير صحيحة', 'bad');
        return;
      }

      const hash = await sha256Hex(password);
      if (hash !== u.passwordHash) {
        authSetMessage('بيانات الدخول غير صحيحة', 'bad');
        return;
      }

      _setSession({ userName: u.userName, email: u.email, loginAt: Date.now() });
      updateHomeFromSession();
      lockAppUI(false);

      // فتح Home مباشرة ثم يمكنك فتح Dashboard بالزر
      document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
      const home = document.querySelector('[data-page-section="home"]');
      if (home) home.classList.remove('hidden');
    }

    async function signupUser() {
      const userName = (document.getElementById('authSignupUserName')?.value || '').trim();
      const email = (document.getElementById('authSignupEmail')?.value || '').trim();
      const p1 = (document.getElementById('authSignupPassword')?.value || '');
      const p2 = (document.getElementById('authSignupPassword2')?.value || '');

      if (!userName || !email || !p1 || !p2) {
        authSetMessage('من فضلك أكمل كل الحقول', 'bad');
        return;
      }
      if (p1 !== p2) {
        authSetMessage('كلمة المرور وتأكيدها غير متطابقين', 'bad');
        return;
      }

      const users = _getUsers();
      if (users.some(x => String(x.userName || '').trim() === userName)) {
        authSetMessage('اسم المستخدم مستخدم بالفعل', 'bad');
        return;
      }
      if (users.some(x => String(x.email || '').trim().toLowerCase() === email.toLowerCase())) {
        authSetMessage('البريد الإلكتروني مستخدم بالفعل', 'bad');
        return;
      }

      const passwordHash = await sha256Hex(p1);
      users.unshift({ userName, email, passwordHash, createdAt: new Date().toISOString() });
      _setUsers(users);

      // رجّع Login تلقائياً
      authSetMessage('تم إنشاء الحساب بنجاح ✅', 'ok');
      authShowTab('login');
      document.getElementById('authLoginUserName').value = userName;
      document.getElementById('authLoginPassword').value = '';
    }

    async function resetPassword() {
      const email = (document.getElementById('authResetEmail')?.value || '').trim();
      const newPassword = (document.getElementById('authResetNewPassword')?.value || '');

      if (!email || !newPassword) {
        authSetMessage('أدخل البريد الإلكتروني وكلمة مرور جديدة', 'bad');
        return;
      }

      const users = _getUsers();
      const u = users.find(x => String(x.email || '').trim().toLowerCase() === email.toLowerCase());
      if (!u) {
        authSetMessage('لا يوجد حساب بهذا البريد', 'bad');
        return;
      }

      u.passwordHash = await sha256Hex(newPassword);
      _setUsers(users);

      authSetMessage('تم تحديث كلمة المرور ✅', 'ok');
      authShowTab('login');

      // تعبئة اسم المستخدم من الحساب
      document.getElementById('authLoginUserName').value = u.userName;
      document.getElementById('authLoginPassword').value = '';
    }

    function logoutUser() {
      _setSession(null);
      lockAppUI(true);
      authShowTab('login');
      // Hide home
      document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
    }

    function initAuthGate() {
      const overlay = document.getElementById('auth-overlay');
      if (!overlay) return;

      const sess = _getSession();
      if (sess && sess.userName) {
        // allow access
        updateHomeFromSession();
        lockAppUI(false);
        document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));
        const home = document.querySelector('[data-page-section="home"]');
        if (home) home.classList.remove('hidden');
      } else {
        lockAppUI(true);
        authShowTab('login');
      }
    }

    window.onload = function() {
      // auth first (gate)
      try { initAuthGate(); } catch (e) {}

      // إذا كان المستخدم غير مسجل دخول: لا تشغّل أي منطق app (خاصة map) لتجنب أخطاء/بطء
      const sess = _getSession();
      if (!sess || !sess.userName) {
        // اظهر Overlay (initAuthGate يكون فعّال) وخلاص
        return;
      }

      // بعد فتح النظام، شغّل بقية app
      initMap();


      // تطبيق الفلتر الافتراضي أولاً بعد امتلاء البيانات
      setTimeout(() => applyFleetFilter(), 0);

      // افتراضياً نخلي فورم إضافة السيارة مخفي (يظهر فقط بضغط زر إضافة سيارة)
      try {
        const box = document.getElementById('addVehicleFormBox');
        if (box) box.classList.add('hidden');
      } catch (e) {}

      renderDriversAndVehicles();
      buildWorkforceShiftsGridMatrix();
      startTickerRotation();

      bindSalaryInputs();
      window.__salaryBumpsByDriver = window.__salaryBumpsByDriver || {};
      window.__salaryDelaysByDriver = window.__salaryDelaysByDriver || {};
      window.__salaryOfficeTypeByDriver = window.__salaryOfficeTypeByDriver || {};

      // Users/Captains page init
      initCaptainsUsersTable();
      renderCaptainsUsersTable();

      renderDriversSalaryTable();
    };
