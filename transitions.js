document.addEventListener('DOMContentLoaded', () => {
  // Screen Transitions setup
  const overlays = {
    'theme_editorial.html': document.getElementById('overlay-editorial'),
    'theme_brutalist.html': document.getElementById('overlay-brutalist'),
    'pastel_retro_desktop.html': document.getElementById('overlay-retro')
  };

  // 1. Intro Animation: Find the overlay matching the CURRENT page and un-hide it, then hide it so it animates away.
  const currentPath = window.location.pathname.split('/').pop() || 'theme_editorial.html';
  // Match current file
  let currentKey = 'theme_editorial.html';
  if (currentPath.includes('brutalist')) currentKey = 'theme_brutalist.html';
  if (currentPath.includes('pastel')) currentKey = 'pastel_retro_desktop.html';

  const currentOverlay = overlays[currentKey];
  if (currentOverlay) {
    currentOverlay.classList.remove('hidden'); // Ensure it covers immediately on load
    currentOverlay.classList.remove('active'); // It's an intro, so remove active class
    // Small delay to allow CSS to register initial state
    setTimeout(() => {
      currentOverlay.classList.add('hidden'); // Reveal screen
    }, 100);
  }

  // 2. Outro Animation: When random button clicked, pick target, show TARGET overlay.
  const themeBtn = document.getElementById('randomThemeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const themes = ['theme_editorial.html', 'theme_brutalist.html', 'pastel_retro_desktop.html'];
      const otherThemes = themes.filter(t => !window.location.href.includes(t));
      const targetThemes = otherThemes.length > 0 ? otherThemes : themes;
      const targetPath = targetThemes[Math.floor(Math.random() * targetThemes.length)];
      
      const targetOverlay = overlays[targetPath];
      if (targetOverlay) {
        targetOverlay.classList.remove('hidden'); // Play covering animation of the TARGET theme
        targetOverlay.classList.add('active'); // Trigger outro-specific animations like loading bar
      }
      
      // Wait for covering animation to finish, then navigate
      setTimeout(() => {
        window.location.href = targetPath;
      }, 1000); // 1.0s wait
    });
  }
});
