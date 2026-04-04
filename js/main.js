/* ── THEME TOGGLE & PERSISTENCE ────────────────────────────────── */
(function () {
    const btn   = document.getElementById('themeToggle');
    const label = document.getElementById('toggleLabel');
    const html  = document.documentElement;

    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    if (label) label.textContent = saved === 'dark' ? 'Light' : 'Dark';

    if (btn) {
        btn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            if (label) label.textContent = next === 'dark' ? 'Light' : 'Dark';
        });
    }
})();

/* ── HERO CANVAS — Smooth Green Interpolation ─────────────────── */
(function () {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, dots;
    let raf;

    const COLS = 20;
    const ROWS = 12;
    const SPEED = 0.15;
    let offset = 0;

    // Green RGB Values matching the new CSS accents
    const darkRGB  = { r: 34, g: 197, b: 94 };  // #22c55e
    const lightRGB = { r: 22, g: 163, b: 74 };  // #16a34a
    
    let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    let currentColor = isDark ? { ...darkRGB } : { ...lightRGB };
    let targetColor  = isDark ? { ...darkRGB } : { ...lightRGB };

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        build();
    }

    function build() {
        const xGap = W / COLS;
        const yGap = H / ROWS;
        dots = [];
        for (let r = -1; r <= ROWS + 1; r++) {
            for (let c = 0; c <= COLS; c++) {
                dots.push({
                    bx: c * xGap,
                    by: r * yGap,
                    r: Math.random() * 1.5 + 0.5 
                });
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const yGap = H / ROWS;

        // Smooth color interpolation to prevent "clunky" theme flashes
        currentColor.r += (targetColor.r - currentColor.r) * 0.06;
        currentColor.g += (targetColor.g - currentColor.g) * 0.06;
        currentColor.b += (targetColor.b - currentColor.b) * 0.06;

        const dotColor = `rgb(${Math.round(currentColor.r)}, ${Math.round(currentColor.g)}, ${Math.round(currentColor.b)})`;

        for (const d of dots) {
            let y = ((d.by + offset) % (H + yGap)) - yGap * 0.5;
            const dy = y / H - 0.5;
            const scale = 1 - Math.abs(dy) * 0.5;
            
            const currentTheme = document.documentElement.getAttribute('data-theme');
            ctx.globalAlpha = (currentTheme === 'dark') ? (0.2 + scale * 0.4) : (0.1 + scale * 0.2);
            
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(d.bx, y, d.r * scale, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
        offset = (offset + SPEED) % (H / ROWS + 1);
        raf = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();

    // Observe theme changes to trigger smooth canvas color fade
    const observer = new MutationObserver(() => {
        const theme = document.documentElement.getAttribute('data-theme');
        targetColor = (theme === 'dark') ? { ...darkRGB } : { ...lightRGB };
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();

/* ── VISITOR COUNTER ───────────────────────────────────────────── */
// UPDATED URL BELOW
const COUNTER_API_URL = 'https://moe-resume-api-2026.azurewebsites.net/api/GetResumeCounter'; 

async function getVisitorCount() {
    const countEl = document.getElementById('visitorCount');
    if (!countEl) return;

    try {
        const response = await fetch(COUNTER_API_URL);
        const data = await response.json();
        // Updated to handle the Azure Function response format
        countEl.innerText = data.count !== undefined ? data.count : "—";
    } catch (err) {
        console.error("Counter error:", err);
        countEl.innerText = "Error";
    }
}

document.addEventListener('DOMContentLoaded', getVisitorCount);