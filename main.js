import './style.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

document.querySelector('#app').innerHTML = `
  <!-- Phase 2: MacBook Hero Section -->
  <div id="hero-section" class="relative w-full bg-space-black">
    <div class="hero-text pt-32 pb-64 px-8 z-10 transition-opacity duration-300">
      <h1 class="text-5xl md:text-7xl font-bold bg-clip-text text-transparent gradient-aqua mb-6 leading-tight tracking-tight">
        Next-Gen Spatial Intelligence.
      </h1>
      <p class="text-xl text-gray-400 max-w-2xl mx-auto font-light">
        Monitor real-time incident data, weather anomalies, and asset status. Building the future in Space and Aqua.
      </p>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
         <span class="text-xs tracking-widest uppercase font-semibold text-aqua-muted">Scroll to Interface</span>
         <svg class="w-5 h-5 text-aqua-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </div>
    
    <!-- The Scroll-Triggered MacBook Container -->
    <div class="macbook-container">
      <div class="macbook-frame">
        <div class="macbook-screen" id="macbook-screen">
          <!-- The dashboard mockup that transforms -->
          <div id="dashboard-mockup" class="w-full h-full relative overflow-hidden flex flex-col pointer-events-none bg-space-black">
             <!-- Mockup inner elements -->
             <div class="h-8 border-b border-aqua-neon/20 flex items-center px-4 shrink-0 bg-space-dark">
                <div class="w-16 h-2 rounded gradient-aqua opacity-50"></div>
             </div>
             <div class="flex flex-1 overflow-hidden">
                <div class="w-1/4 h-full border-r border-white/5 p-4 bg-space-dark/40">
                   <div class="w-full h-full flex flex-col gap-3">
                      <div class="h-6 rounded bg-white/5 animate-pulse w-1/2"></div>
                      <div class="h-20 rounded bg-white/5 animate-pulse"></div>
                      <div class="h-20 rounded bg-white/5 animate-pulse"></div>
                   </div>
                </div>
                <div class="w-3/4 h-full relative overflow-hidden bg-[#0A0C11]">
                   <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-aqua-glow to-transparent opacity-10"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Phase 3: Interactive Dashboard UI (Hidden initially) -->
  <div id="interactive-dashboard" class="fixed inset-0 z-20 dashboard-hidden flex flex-col h-screen w-screen overflow-hidden text-white transition-opacity duration-500 bg-space-black">
    
    <!-- Top Nav -->
    <header class="h-16 glass-panel-glow border-b border-aqua-neon/20 flex items-center justify-between px-6 z-30 relative shrink-0">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full gradient-aqua shadow-[0_0_15px_rgba(102,252,241,0.5)]"></div>
        <span class="font-bold text-lg tracking-wider">AEROSPATIAL</span>
      </div>
      <div class="flex-1 max-w-xl mx-8">
        <input type="text" placeholder="Search incidents, locations..." class="w-full bg-space-black/50 border border-white/10 rounded-full px-5 py-2 text-sm text-gray-200 focus:outline-none focus:border-aqua-neon/50 focus:ring-1 focus:ring-aqua-neon/50 transition-all placeholder:text-gray-500">
      </div>
      <div class="flex items-center gap-4">
        <button class="text-sm px-5 py-2 rounded-full border border-aqua-muted text-aqua-muted hover:bg-aqua-muted/10 transition-colors font-medium">Filters</button>
        <button class="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
          <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <div class="flex-1 flex relative overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-[340px] glass-panel border-r border-aqua-neon/10 flex flex-col z-30 shrink-0 h-full max-h-full overflow-y-auto">
            <!-- Phase 4 Trigger -->
            <div class="p-5 border-b border-light/5">
                <button id="analysis-trigger" class="w-full p-4 rounded-xl relative overflow-hidden group cursor-pointer border border-aqua-neon/30 bg-space-dark/80 hover:bg-aqua-neon/5 transition-all outline-none hidden">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-aqua-neon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative z-10 flex flex-col gap-2pointer-events-none text-left">
                        <div class="flex items-center justify-between pointer-events-none mb-1">
                          <span class="text-[10px] font-bold text-aqua-neon tracking-[0.2em] uppercase">Run Analysis</span>
                          <svg class="w-4 h-4 text-aqua-muted pointer-events-none transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold pointer-events-none">Predict Flood Impact</h3>
                        <p class="text-[11px] text-gray-400 pointer-events-none mt-1 leading-relaxed text-aqua-neon">Region constraints mapped. Click to compute.</p>
                    </div>
                </button>
                <div id="draw-prompt" class="w-full p-6 rounded-xl border border-white/5 bg-white/5 text-gray-400 text-sm text-center">
                    <svg class="w-6 h-6 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                    Draw a polygon to select analysis region.
                </div>
            </div>
            
            <div class="p-5 flex flex-col gap-7">
                <!-- Section 1 -->
                <div>
                   <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Incident Details</h4>
                   <div class="space-y-3">
                      <div class="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                         <div class="w-2 h-2 rounded-full bg-red-400 mt-1.5 shadow-[0_0_8px_rgba(248,113,113,0.6)]"></div>
                         <div>
                            <div class="text-sm font-medium">Critical Thermal Anomaly</div>
                            <div class="text-[11px] text-gray-400 mt-1">Sector 7G • 2 mins ago</div>
                         </div>
                      </div>
                      <div class="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 hover:bg-white/10 transition-colors cursor-pointer">
                         <div class="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                         <div>
                            <div class="text-sm font-medium">Pressure Variance Detected</div>
                            <div class="text-[11px] text-gray-400 mt-1">Northern Ridge • 15 mins ago</div>
                         </div>
                      </div>
                   </div>
                </div>
                <!-- Section 2 -->
                <div>
                   <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Weather Context</h4>
                   <div class="grid grid-cols-2 gap-3">
                      <div class="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div class="absolute right-0 bottom-0 text-7xl text-white/5 pointer-events-none group-hover:scale-110 transition-transform origin-bottom-right">☀</div>
                        <div class="text-[10px] text-aqua-muted/80 tracking-wide uppercase mb-1">Temp</div>
                        <div class="text-2xl font-bold tracking-tighter">18°<span class="text-sm text-gray-400 font-normal">C</span></div>
                      </div>
                      <div class="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div class="absolute right-2 bottom-0 text-5xl text-white/5 pointer-events-none group-hover:scale-110 transition-transform origin-bottom-right">☴</div>
                        <div class="text-[10px] text-aqua-muted/80 tracking-wide uppercase mb-1">Wind</div>
                        <div class="text-2xl font-bold tracking-tighter">42<span class="text-sm text-gray-400 font-normal">km/h</span></div>
                      </div>
                   </div>
                </div>
                <!-- Section 3 -->
                <div>
                   <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Real-time Status</h4>
                   <div class="p-5 rounded-2xl glass-panel-glow border border-aqua-neon/20 relative overflow-hidden group hover:border-aqua-neon/40 transition-colors">
                      <div class="absolute top-0 right-0 w-20 h-20 bg-aqua-neon/10 rounded-bl-full blur-2xl group-hover:bg-aqua-neon/20 transition-colors"></div>
                      <div class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">System Efficiency</div>
                      <div class="text-4xl font-light tracking-tighter mb-4">98.4<span class="text-lg text-aqua-muted ml-1">%</span></div>
                      <div class="w-full h-1.5 bg-space-black rounded-full overflow-hidden">
                          <div class="h-full gradient-aqua w-[98%] rounded-full shadow-[0_0_10px_#66FCF1]"></div>
                      </div>
                   </div>
                </div>
            </div>
        </aside>

        <!-- Map Container -->
        <div class="flex-1 relative bg-[#0B0C10]">
            <div id="map" class="map-container"></div>
            <!-- Overlay controls -->
            <div class="absolute bottom-8 right-8 flex flex-col gap-3 z-10">
                <button class="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors text-white shadow-xl hover:scale-105 transform active:scale-95 duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
                <button class="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors text-white shadow-xl hover:scale-105 transform active:scale-95 duration-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                </button>
            </div>
            
            <div class="absolute top-6 left-6 z-10 transition-all pointer-events-none">
                <div class="px-4 py-2 rounded-full glass-panel text-xs tracking-widest uppercase font-semibold text-aqua-neon shadow-lg border border-aqua-neon/30 flex items-center gap-2">
                   <div class="w-2 h-2 rounded-full bg-aqua-neon animate-pulse shadow-[0_0_8px_#66FCF1]"></div>
                   Live Sync Active
                </div>
            </div>
        </div>
    </div>
  </div>

  <!-- Phase 4: Analysis View Modal (iPad Style) -->
  <div id="analysis-modal" class="analysis-view fixed inset-0 z-50 flex items-center justify-center bg-space-black/80 backdrop-blur-md pointer-events-none opacity-0 scale-95 translate-y-10">
      <div class="w-[95vw] max-w-6xl h-[85vh] bg-space-dark border border-white/10 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col pointer-events-auto">
          <!-- Modal Header -->
          <div class="h-20 border-b border-light/5 flex items-center justify-between px-8 shrink-0 relative">
             <div class="absolute inset-0 bg-gradient-to-r from-aqua-neon/5 to-transparent opacity-50"></div>
             <h2 class="text-2xl font-medium tracking-wide relative z-10 stagger-item">Analysis <span class="text-aqua-muted/70 font-light">| Global Impact Explorer</span></h2>
             <button id="close-analysis" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors relative z-10 stagger-item hover:rotate-90 duration-300 border border-transparent hover:border-white/10">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
          </div>
          <!-- Modal Body -->
          <div class="flex-1 p-8 md:p-12 overflow-y-auto flex flex-col md:flex-row gap-10">
              <div class="w-full md:w-1/3 flex flex-col justify-center gap-10 stagger-item">
                 <div>
                    <div class="text-xs text-aqua-muted uppercase tracking-[0.2em] mb-3 font-semibold flex items-center gap-2">
                       <span class="w-4 h-[1px] bg-aqua-muted"></span> Overall Health
                    </div>
                    <div class="text-6xl font-light mb-4">Optimal</div>
                    <p class="text-[13px] text-gray-400 leading-relaxed font-light">All primary systems are running within expected parameters. Global telemetry signals display nominal deviation. No immediate critical actions required at this timestamp.</p>
                 </div>
                 
                 <div class="grid grid-cols-2 gap-4">
                    <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                       <div class="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Network Load</div>
                       <div class="text-2xl font-light text-white mb-1">32<span class="text-sm text-gray-500 ml-1">TB/s</span></div>
                       <div class="text-[10px] text-green-400 space-x-1">↑ 2.4% vs last hr</div>
                    </div>
                    <div class="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                       <div class="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Active Assets</div>
                       <div class="text-2xl font-light text-white mb-1">11,048</div>
                       <div class="text-[10px] text-aqua-muted space-x-1">100% Online</div>
                    </div>
                 </div>

                 <div class="p-6 rounded-2xl bg-space-black/50 border border-white/5 shadow-inner">
                    <div class="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-bold flex justify-between">
                        <span>Key Metrics</span>
                        <span class="text-aqua-neon">Live</span>
                    </div>
                    <div class="space-y-5">
                       <div>
                          <div class="flex justify-between text-[11px] mb-2 font-medium tracking-wide">
                             <span class="text-gray-300">Latency Core</span><span class="text-white">12ms</span>
                          </div>
                          <div class="w-full h-1.5 bg-space-dark rounded-full overflow-hidden"><div class="w-[20%] h-full bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div></div>
                       </div>
                       <div>
                          <div class="flex justify-between text-[11px] mb-2 font-medium tracking-wide">
                             <span class="text-gray-300">Global Coverage</span><span class="text-white">94%</span>
                          </div>
                          <div class="w-full h-1.5 bg-space-dark rounded-full overflow-hidden"><div class="w-[94%] h-full gradient-aqua rounded-full shadow-[0_0_8px_#66FCF1]"></div></div>
                       </div>
                    </div>
                 </div>
              </div>
              
              <!-- Visualization Area -->
              <div class="flex-1 rounded-3xl bg-[#030304] border border-white/5 relative overflow-hidden stagger-item flex flex-col items-center justify-center p-8" id="analysis-viz">
                 <!-- Grid background overlay -->
                 <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                 <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#030304_70%)]"></div>
                 
                 <div class="relative z-10 text-center flex flex-col items-center" id="analysis-placeholder">
                    <div class="relative flex items-center justify-center mb-8">
                        <div class="absolute w-48 h-48 rounded-full border border-aqua-neon/10 animate-ping animation-delay-200"></div>
                        <div class="absolute w-32 h-32 rounded-full border border-aqua-neon/20 animate-ping"></div>
                        <div class="w-24 h-24 rounded-full border-4 border-space-dark border-t-aqua-neon border-r-aqua-muted animate-spin shadow-[0_0_30px_#66FCF1]"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-2 h-2 rounded-full bg-aqua-neon shadow-[0_0_10px_#66FCF1]"></div>
                        </div>
                    </div>
                    <div class="text-2xl font-light mb-3 text-white">Computing FloodEYE Segmentation...</div>
                    <p class="text-sm text-gray-500 max-w-sm mx-auto font-light">Analyzing geographical constraints and rendering high-contrast FloodEYE masks.</p>
                 </div>

                 <!-- Dynamic Slider Container (Hidden initially) -->
                 <div id="dynamic-slider-wrapper" class="hidden w-full h-full relative z-20 flex flex-col items-center justify-center">
                     <div class="w-full flex justify-between items-end mb-4 px-2">
                         <div>
                             <h4 class="text-lg font-medium text-white mb-1">FloodEYE Segmentation</h4>
                             <p class="text-xs text-gray-400">AI-generated flood mask overlay</p>
                         </div>
                         <div class="text-right">
                             <div class="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total Impact Area</div>
                             <div class="text-xl text-aqua-neon font-light" id="api-flooded-area">-- sq km</div>
                         </div>
                     </div>
                     <div class="slider-container" id="slider-container">
                         <img id="slider-original" class="slider-img original-img" src="" alt="Original Satellite">
                         <img id="slider-mask" class="slider-img mask-img" src="" alt="AI Mask">
                         <div class="slider-line-indicator" id="slider-line"></div>
                         <div class="slider-handle-circle" id="slider-handle">
                             <div class="w-1 h-3 rounded bg-aqua-neon/50"></div>
                             <div class="w-1 h-3 rounded bg-aqua-neon/50 ml-1"></div>
                         </div>
                         <input type="range" min="0" max="100" value="50" class="slider-control" id="slider-control">
                     </div>
                 </div>
              </div>
          </div>
      </div>
  </div>

  <!-- Toast Container -->
  <div id="toast-container"></div>
`;

// Logic handling

document.addEventListener('DOMContentLoaded', () => {
    // Phase 1: Initial Load Logic
    const loadingScreen = document.getElementById('loading-screen');
    const heroText = document.querySelector('.hero-text');
    
    // Simulate loading time, then hide screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden-phase');
        document.body.style.overflow = 'auto'; // ensure scroll is enabled after load
        setTimeout(() => {
            heroText.style.opacity = '1';
        }, 300);
    }, 2400); // 2.4s total load sequence
    
    // Prevent scrolling and hide hero text while loading
    document.body.style.overflow = 'hidden';
    heroText.style.opacity = '0';

    // Phase 2: Scroll MacBook Transition Logic
    const macbookScreen = document.getElementById('macbook-screen');
    const heroSection = document.getElementById('hero-section');
    const interactiveDashboard = document.getElementById('interactive-dashboard');
    const scrollIndicator = document.querySelector('.animate-bounce');
    
    let isDashboardActive = false;

    const handleScroll = () => {
        if (isDashboardActive) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        let progress = scrollY / windowHeight;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // Ensure scaling reaches full screen size
        const startScale = 0.6;
        const endScale = 1.35;
        const currentScale = startScale + (progress * (endScale - startScale));
        
        const startY = 20; // vh
        const currentY = startY - (progress * startY);
        
        if (macbookScreen) {
            macbookScreen.style.transform = `scale(${currentScale}) translateY(${currentY}vh)`;
            // Fade out the physical border as it fills the screen
            const currentBorderOpacity = 1 - progress;
            macbookScreen.style.borderColor = `rgba(26, 26, 26, ${currentBorderOpacity})`;
            macbookScreen.style.borderRadius = `${12 * (1 - progress)}px`;
        }
        
        if (heroText) heroText.style.opacity = 1 - (progress * 2.5);
        if (scrollIndicator) scrollIndicator.style.opacity = 1 - (progress * 5);

        if (progress >= 0.98 && !isDashboardActive) {
            activateDashboard();
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Phase 3: Dashboard Activation & Map Initialization
    let mapInitialized = false;
    
    function activateDashboard() {
        isDashboardActive = true;
        
        // Hide Hero Section seamlessly
        heroSection.style.display = 'none';
        window.scrollTo(0, 0); // Reset scroll to top
        
        // Show Interactive Dashboard
        interactiveDashboard.classList.remove('dashboard-hidden');
        // A tiny delay to ensure display reflows
        requestAnimationFrame(() => {
            interactiveDashboard.style.opacity = '1';
            interactiveDashboard.style.pointerEvents = 'auto';
        });
        
        // Ensure scroll is locked to app limits
        document.body.style.overflow = 'hidden';

        if (!mapInitialized) {
            initMap();
        }
    }

    function initMap() {
        mapInitialized = true;
        console.log("Initializing Mapbox GL instance with OSM Fallback...");
        
        // Use a dummy token as we are bypassing Mapbox's vector tile servers
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2xkdW1teXRva2VuMTIzNDU2Nzg5MGFiYyJ9.dummy_token_12345';
        
        const map = new mapboxgl.Map({
            container: 'map',
            style: {
                'version': 8,
                'sources': {
                    'osm': {
                        'type': 'raster',
                        'tiles': [
                            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        ],
                        'tileSize': 256,
                        'attribution': '&copy; OpenStreetMap Contributors'
                    }
                },
                'layers': [
                    {
                        'id': 'osm-tiles',
                        'type': 'raster',
                        'source': 'osm',
                        'minzoom': 0,
                        'maxzoom': 19
                    }
                ]
            },
            center: [78.9629, 20.5937],
            zoom: 3.5,
            pitch: 30,
            attributionControl: true,
            interactive: true,
            preserveDrawingBuffer: true,
            maxPitch: 85
        });

        // Add a class that CSS will use to invert and style OSM to dark mode
        map.getContainer().classList.add('map-dark-filter');

        map.on('load', () => {
             console.log("OSM Mapbox Map loaded successfully.");
             
             // Add a glowing point to match aesthetics
             map.addSource('glow-point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [72.8777, 19.0760] // Mumbai
                        }
                    }]
                }
             });

             map.addLayer({
                'id': 'glow-point-core',
                'type': 'circle',
                'source': 'glow-point',
                'paint': {
                    'circle-radius': 6,
                    'circle-color': '#66FCF1',
                    'circle-blur': 0.2
                }
             });
             
             map.addLayer({
                'id': 'glow-point-halo',
                'type': 'circle',
                'source': 'glow-point',
                'paint': {
                    'circle-radius': 24,
                    'circle-color': '#66FCF1',
                    'circle-opacity': 0.2,
                    'circle-blur': 1
                }
             });
        });
    }

    // Toast Notification System
    function showToast(message, isError = false) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${isError ? 'toast-error' : ''}`;
        
        toast.innerHTML = `
            ${isError ? '<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
                      : '<svg class="w-4 h-4 text-aqua-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'}
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Phase 4: Analysis View (iPad style interaction) & Phase 6 API Fetch
    const analysisTrigger = document.getElementById('analysis-trigger');
    const analysisModal = document.getElementById('analysis-modal');
    const closeAnalysis = document.getElementById('close-analysis');
    let mapInstance = null; // To store map reference

    // Overwrite initMap to capture mapInstance
    const originalInitMap = initMap;
    initMap = function() {
        mapInitialized = true;
        mapboxgl.accessToken = 'pk.eyJ1IjoiZHVtbXkiLCJhIjoiY2xkdW1teXRva2VuMTIzNDU2Nzg5MGFiYyJ9.dummy_token_12345';
        mapInstance = new mapboxgl.Map({
            container: 'map',
            style: {
                'version': 8,
                'sources': {
                    'osm': {
                        'type': 'raster',
                        'tiles': [
                            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        ],
                        'tileSize': 256,
                        'attribution': '&copy; OpenStreetMap Contributors'
                    }
                },
                'layers': [
                    {
                        'id': 'osm-tiles',
                        'type': 'raster',
                        'source': 'osm',
                        'minzoom': 0,
                        'maxzoom': 19
                    }
                ]
            },
            center: [78.9629, 20.5937],
            zoom: 3.5,
            pitch: 30,
            attributionControl: true,
            interactive: true,
            preserveDrawingBuffer: true,
            maxPitch: 85
        });
        
        mapInstance.getContainer().classList.add('map-dark-filter');
        
         mapInstance.on('load', () => {
             mapInstance.addSource('glow-point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{ 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [72.8777, 19.0760] } }]
                }
             });
             mapInstance.addLayer({'id': 'glow-point-core', 'type': 'circle', 'source': 'glow-point', 'paint': {'circle-radius': 6, 'circle-color': '#66FCF1', 'circle-blur': 0.2}});
             mapInstance.addLayer({'id': 'glow-point-halo', 'type': 'circle', 'source': 'glow-point', 'paint': {'circle-radius': 24, 'circle-color': '#66FCF1', 'circle-opacity': 0.2, 'circle-blur': 1}});
             
             // Mapbox Draw Integration
             const draw = new MapboxDraw({
                 displayControlsDefault: false,
                 controls: {
                     polygon: true,
                     trash: true
                 },
                 defaultMode: 'draw_polygon'
             });
             mapInstance.addControl(draw);

             mapInstance.on('draw.create', updateArea);
             mapInstance.on('draw.delete', updateArea);
             mapInstance.on('draw.update', updateArea);

             function updateArea(e) {
                 const data = draw.getAll();
                 const analysisTrigger = document.getElementById('analysis-trigger');
                 const drawPrompt = document.getElementById('draw-prompt');
                 
                 if (data.features.length > 0) {
                     // Get bounding box coordinates from Polygon
                     const coordinates = data.features[0].geometry.coordinates[0];
                     const lons = coordinates.map(c => c[0]);
                     const lats = coordinates.map(c => c[1]);
                     const min_lon = Math.min(...lons);
                     const max_lon = Math.max(...lons);
                     const min_lat = Math.min(...lats);
                     const max_lat = Math.max(...lats);
                     
                     window.selectedBounds = { min_lon, max_lon, min_lat, max_lat };
                     
                     analysisTrigger.classList.remove('hidden');
                     drawPrompt.classList.add('hidden');
                 } else {
                     window.selectedBounds = null;
                     analysisTrigger.classList.add('hidden');
                     drawPrompt.classList.remove('hidden');
                 }
             }
        });
    };

    analysisTrigger.addEventListener('click', async () => {
        analysisModal.classList.remove('opacity-0', 'scale-95', 'translate-y-10', 'pointer-events-none');
        analysisModal.classList.add('active', 'opacity-100', 'scale-100', 'translate-y-0', 'pointer-events-auto');

        // Phase 6: Fetch Backend Data
        try {
            if (!mapInstance) throw new Error("Map not loaded yet.");
            
            // Capture the MapLibre canvas
            const canvas = mapInstance.getCanvas();
            const base64Image = canvas.toDataURL('image/png');
            
            showToast("Transmitting telemetry to FloodEYE...");

            // Make POST request to the local FastAPI ngrok backend (Placeholder URL)
            const apiUrl = 'http://localhost:8000/analyze'; // Updated to /analyze endpoint
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_base64: base64Image, bounds: window.selectedBounds })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || 'Prediction failed');
            }

            const data = await response.json();
            
            // Phase 6 & 7: Update UI
            document.getElementById('analysis-placeholder').classList.add('hidden');
            const sliderWrapper = document.getElementById('dynamic-slider-wrapper');
            sliderWrapper.classList.remove('hidden');

            document.getElementById('slider-original').src = base64Image;
            document.getElementById('slider-mask').src = data.mask_image_base64; // updated key
            document.getElementById('api-flooded-area').innerText = `${data.metrics.flooded_area_sqkm} sq km`; // nested in metrics
            
            // Populate extra metrics dynamically
            // You can also target existing HTML metric nodes here like System Efficiency, Active Assets if desired
            // Or add a new severity badge:
            showToast(`Analysis complete! Severity Index: ${data.metrics.severity_index}/100`);

            // Initialize CSS Clip-Path Slider logic
            const slider = document.getElementById('slider-control');
            const container = document.getElementById('slider-container');
            const line = document.getElementById('slider-line');
            const handle = document.getElementById('slider-handle');

            slider.addEventListener('input', (e) => {
                const val = e.target.value;
                container.style.setProperty('--clip', `${val}%`);
            });

        } catch (error) {
            console.error("Analysis Error:", error);
            showToast(`Analysis Error: ${error.message}`, true);
        }
    });

    closeAnalysis.addEventListener('click', () => {
        analysisModal.classList.remove('active', 'opacity-100', 'scale-100', 'translate-y-0', 'pointer-events-auto');
        analysisModal.classList.add('opacity-0', 'scale-95', 'translate-y-10', 'pointer-events-none');
    });
});
