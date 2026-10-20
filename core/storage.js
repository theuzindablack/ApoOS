const ApoFS = {
  save(key, data) { localStorage.setItem(`apo_${key}`, JSON.stringify(data)); },
  load(key) { return JSON.parse(localStorage.getItem(`apo_${key}`)); }
};
