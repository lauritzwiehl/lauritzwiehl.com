const video = document.getElementById('HOMEPAGE_VIDEO');
const header = document.getElementById('HEADER_TEXT');
const footer = document.querySelector('.FOOTER_TEXT');

function updateVisuals() {
  const scrollY = window.scrollY;
  const screenH = window.innerHeight;
  const progress = Math.min(1, scrollY / screenH);

  video.style.filter = `invert(${progress * 100}%) brightness(${100 + progress * 200}%) contrast(${100 + progress * 100}%)`;
  video.style.opacity = 1 - progress * 0.2;

  const value = Math.round(255 * (1 - progress));
  const color = `rgb(${value}, ${value}, ${value})`;
  header.style.color = color;
  footer.style.color = color;
}

window.addEventListener('scroll', updateVisuals);
window.addEventListener('load', () => {
  updateVisuals();
  video.style.opacity = '1';
  video.style.filter = 'brightness(0.5)';
  video.play().catch(e => console.warn("Video konnte nicht automatisch abgespielt werden:", e));
});

// EXPAND ON CLICK — use overlay, but keep existing header/footer for text
document.querySelectorAll('.project .rectangle').forEach(rect => {
  rect.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.classList.add('fullscreen-overlay');

    const clone = rect.cloneNode(true);
    clone.classList.add('expanded-rectangle');

    overlay.appendChild(clone);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.remove());
  });
});
