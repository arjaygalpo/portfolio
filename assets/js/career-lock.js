(() => {
  'use strict';

  // Career section unlock. The content is AES-GCM encrypted; the key is derived
  // from the password with PBKDF2, so the password is never stored in the code.
  const vault = window.CAREER_VAULT;
  const form = document.getElementById('careerLock');
  const wrap = document.getElementById('careerVault');
  if (!vault || !form || !wrap) return;

  const input = document.getElementById('careerPw');
  const err = document.getElementById('careerErr');
  const btn = form.querySelector('button');
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  const t = (en, frKey) => (document.documentElement.lang === 'fr' && window.CAREER_FR && window.CAREER_FR[frKey]) || en;
  window.CAREER_FR = { err: 'Mot de passe incorrect. Réessayez.', busy: 'Vérification…', btn: 'Déverrouiller' };

  const decrypt = async (password) => {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64(vault.salt), iterations: vault.iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(vault.iv) }, key, b64(vault.data));
    return JSON.parse(new TextDecoder().decode(plain));
  };

  const reveal = ({ html, fr }) => {
    const tpl = document.createElement('template');
    tpl.innerHTML = html;
    const list = tpl.content.firstElementChild;
    wrap.replaceWith(list);
    if (window.siteI18n) window.siteI18n.add(list, fr);
    list.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.setProperty('--delay', `${i * 0.08}s`);
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = input.value.trim();
    if (!pw) { input.focus(); return; }
    if (!window.crypto || !crypto.subtle) {
      err.textContent = 'This browser cannot unlock this section (HTTPS required).';
      return;
    }
    btn.disabled = true;
    btn.textContent = t('Checking…', 'busy');
    err.textContent = '';
    try {
      reveal(await decrypt(pw));
    } catch {
      err.textContent = t('Wrong password. Try again.', 'err');
      form.classList.remove('is-shake'); void form.offsetWidth; form.classList.add('is-shake');
      input.select();
      btn.disabled = false;
      btn.textContent = t('Unlock', 'btn');
    }
  });
})();
