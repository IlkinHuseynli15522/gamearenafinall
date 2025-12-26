// src/utils/toast.js

export function toast(type, message, opts = {}) {
  try {
    window.dispatchEvent(
      new CustomEvent('ga:toast', {
        detail: { type, message, opts },
      })
    );
  } catch (e) {
    // no-op
  }
}

export default { toast };
