export function initCodeInteractions() {
  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      let codeToCopy = btn.getAttribute('data-code');
      if (!codeToCopy) {
        const parent = btn.closest('.mb-6') || btn.closest('.mb-4')?.parentElement;
        if (parent) {
          const activeTab = parent.querySelector('.code-content:not(.hidden) code') || parent.querySelector('.code-content code');
          if (activeTab) codeToCopy = activeTab.textContent;
        }
      }
      if (codeToCopy) {
        try {
          await navigator.clipboard.writeText(codeToCopy);
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Copiado!`;
          btn.classList.add('bg-[var(--dm-green)]/20', 'text-[var(--dm-green)]');
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('bg-[var(--dm-green)]/20', 'text-[var(--dm-green)]');
          }, 2000);
        } catch (err) {
          console.error('Error copying:', err);
        }
      }
    });
  });

  document.querySelectorAll('.code-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const group = tab.getAttribute('data-group') || 'default';
      const groupId = tab.getAttribute('data-group');
      const tabs = document.querySelectorAll(`.code-tab[data-group="${groupId}"]`);
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      const contents = document.querySelectorAll(`.code-content[data-group="${groupId}"]`);
      contents.forEach((content) => {
        content.classList.toggle('hidden', content.getAttribute('data-tab') !== tabId);
      });
    });
  });
}
