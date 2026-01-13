// Lightweight image modal / lightbox - global function
(function() {
  window.initImageModal = function(options = {}) {
  const selector = options.selector || '.zoomable';
  if (window.__imageModalInit) return;
  window.__imageModalInit = true;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-backdrop" data-role="backdrop"></div>
    <div class="modal-content" role="dialog" aria-modal="true">
      <img src="" alt=""/>
      <div class="modal-actions">
        <button class="btn btn-download" type="button"><i class="fa-solid fa-download"></i>&nbsp;Download</button>
        <button class="btn btn-close" type="button">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const imgEl = modal.querySelector('img');
  const backdrop = modal.querySelector('.modal-backdrop');
  const closeBtn = modal.querySelector('.btn-close');
  const downloadBtn = modal.querySelector('.btn-download');

  function open(src, alt = '') {
    imgEl.src = src;
    imgEl.alt = alt;
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
  }

  function close() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    imgEl.src = '';
    imgEl.alt = '';
  }

  document.addEventListener('click', (e) => {
    // Try to find .zoomable image, either as the target or within the wrapper
    let target = e.target.closest(selector);
    if (!target) {
      // If click is on parent wrapper, find the zoomable img inside
      const wrapper = e.target.closest('.image-wrap');
      if (wrapper) {
        target = wrapper.querySelector(selector);
      }
    }
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    console.log('✅ Click detected on .zoomable image', target);
    const src = target.dataset.full || target.getAttribute('data-full') || target.src || target.getAttribute('href');
    const alt = target.alt || target.title || '';
    console.log('📷 Opening modal with src:', src, 'alt:', alt);
    if (src) open(src, alt);
  });

  backdrop.addEventListener('click', close);
  closeBtn.addEventListener('click', close);
  downloadBtn.addEventListener('click', () => {
    if (imgEl.src) {
      window.open(imgEl.src, '_blank');
    }
  });
  imgEl.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  };
})();
