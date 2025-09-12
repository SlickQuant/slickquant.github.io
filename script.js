document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      menuBtn.setAttribute('aria-expanded', String(!open));
    });
  }

  const form = document.getElementById('waitlist');
  const status = document.getElementById('formStatus');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    const value = email?.value?.trim();
    if (!value || !/.+@.+\..+/.test(value)) {
      status.textContent = 'Please enter a valid email.';
      status.style.color = '#b91c1c';
      return;
    }
    // Placeholder submission. Swap this with Formspree, Beehiiv, ConvertKit, etc.
    // Example: const resp = await fetch('https://formspree.io/f/yourid',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:value})});
    await new Promise(r => setTimeout(r, 400));
    status.textContent = 'Thanks! You are on the waitlist. We will be in touch.';
    status.style.color = '#065f46';
    form.reset();
  });
});
