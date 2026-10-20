(() => {
  'use strict';

  /* ---------- Email: assembled at runtime so scrapers can't read it ---------- */
  document.querySelectorAll('[data-mail]').forEach((a) => {
    try {
      const addr = atob(a.dataset.mail).split('').reverse().join('');
      a.href = `mailto:${addr}`;
      a.textContent = addr;
    } catch { /* leave the fallback label */ }
  });

  /* ---------- Private sections ----------
     Content is AES-GCM encrypted; the key comes from the password via PBKDF2,
     so neither the password nor the content is readable in the source. */
  const vault = window.CAREER_VAULT;
  const forms = [...document.querySelectorAll('.vault__lock')];
  if (!vault || !forms.length) return;

  const FR = { err: 'Mot de passe incorrect. Réessayez.', busy: 'Vérification…', btn: 'Déverrouiller', nosupport: 'Ce navigateur ne peut pas déverrouiller cette section (HTTPS requis).' };
  const EN = { err: 'Wrong password. Try again.', busy: 'Checking…', btn: 'Unlock', nosupport: 'This browser cannot unlock this section (HTTPS required).' };
  const t = (k) => (document.documentElement.lang === 'fr' ? FR : EN)[k];
  const b64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  const decrypt = async (password) => {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: b64(vault.salt), iterations: vault.iter, hash: 'SHA-256' },
      base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
    );
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(vault.iv) }, key, b64(vault.data));
    return JSON.parse(new TextDecoder().decode(plain));
  };

  // Unlocking any one section opens all of them
  const reveal = ({ parts, fr }) => {
    const added = [];
    document.querySelectorAll('[data-vault]').forEach((slot) => {
      const html = parts[slot.dataset.vault];
      if (html == null) return;
      const tpl = document.createElement('template');
      tpl.innerHTML = html;
      const el = tpl.content.firstElementChild;
      slot.replaceWith(el);
      added.push(el);
    });
    if (window.siteI18n) window.siteI18n.add(added, fr);
    added.forEach((root) => {
      const items = root.matches('.reveal') ? [root, ...root.querySelectorAll('.reveal')] : [...root.querySelectorAll('.reveal')];
      items.forEach((el, i) => {
        el.style.setProperty('--delay', `${i * 0.06}s`);
        requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
      });
    });
  };

  forms.forEach((form) => {
    const input = form.querySelector('input');
    const err = form.querySelector('.vault__err');
    const btn = form.querySelector('button');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pw = input.value.trim();
      if (!pw) { input.focus(); return; }
      if (!window.crypto || !crypto.subtle) { err.textContent = t('nosupport'); return; }
      btn.disabled = true;
      btn.textContent = t('busy');
      err.textContent = '';
      try {
        reveal(await decrypt(pw));
      } catch {
        err.textContent = t('err');
        form.classList.remove('is-shake'); void form.offsetWidth; form.classList.add('is-shake');
        input.select();
        btn.disabled = false;
        btn.textContent = t('btn');
      }
    });
  });
})();
