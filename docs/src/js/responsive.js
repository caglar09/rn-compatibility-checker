/* Meta viewport tag for responsive design */
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0';
document.head.appendChild(metaViewport);

/* Add touch detection */
document.documentElement.className += (('ontouchstart' in document.documentElement) ? ' touch' : ' no-touch');

/* Improve table responsiveness */
document.addEventListener('DOMContentLoaded', function() {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    if (!table.parentElement.classList.contains('table-responsive')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-responsive';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });

  /* Add aria-labels to platform badges for accessibility */
  const platformBadges = document.querySelectorAll('.platform-badge');
  platformBadges.forEach(badge => {
    if (!badge.hasAttribute('aria-label')) {
      const platform = badge.textContent.trim();
      badge.setAttribute('aria-label', `${platform} platform`);
    }
  });

  /* Improve code block accessibility */
  const codeBlocks = document.querySelectorAll('pre');
  codeBlocks.forEach((block, index) => {
    block.setAttribute('tabindex', '0');
    block.setAttribute('aria-label', `Code example ${index + 1}`);
  });

  /* Add skip to content link for keyboard users */
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  /* Add CSS for skip link */
  const style = document.createElement('style');
  style.textContent = `
    .skip-to-content {
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--ifm-color-primary);
      color: white;
      padding: 8px;
      z-index: 100;
      transition: top 0.2s;
    }
    .skip-to-content:focus {
      top: 0;
    }
  `;
  document.head.appendChild(style);

  /* Add intersection observer for lazy loading */
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img:not([loading])');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      const src = img.src;
      img.setAttribute('data-src', src);
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      observer.observe(img);
    });
  }
});

/* Add resize listener for responsive adjustments */
window.addEventListener('resize', function() {
  /* Adjust sidebar width on resize */
  const sidebar = document.querySelector('.theme-doc-sidebar-container');
  if (sidebar && window.innerWidth < 996) {
    sidebar.style.width = '100%';
  } else if (sidebar) {
    sidebar.style.width = '';
  }
});

/* Improve performance with passive event listeners */
document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });
document.addEventListener('wheel', function() {}, { passive: true });
