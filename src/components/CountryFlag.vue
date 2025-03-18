<script setup>
const props = defineProps({
  country: {
    type: String,
    required: true
  }
});

const getFlagSvg = (country) => {
  const flags = {
    'India': `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" fill="#FF9933"/>
      <rect width="36" height="12" y="6" fill="#FFFFFF"/>
      <circle cx="18" cy="12" r="4" fill="#000080"/>
      <circle cx="18" cy="12" r="3.5" fill="#FFFFFF"/>
      <circle cx="18" cy="12" r="2.5" fill="#000080"/>
      <g stroke="#000080" stroke-width="1">
        <path d="M18 8.5 L18 15.5"/>
        <path d="M14.5 12 L21.5 12"/>
      </g>
    </svg>`,
    'Poland': `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" fill="#FFFFFF"/>
      <rect width="36" height="12" y="12" fill="#DC143C"/>
    </svg>`,
    'Pakistan': `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" fill="#FFFFFF"/>
      <rect width="36" height="24" fill="#006400" opacity="0.2"/>
      <path d="M0 0 L36 24 M36 0 L0 24" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="18" cy="12" r="6" fill="#FFFFFF"/>
      <circle cx="18" cy="12" r="5" fill="#006400"/>
      <path d="M18 7 L18 17 M13 12 L23 12" stroke="#FFFFFF" stroke-width="1.5"/>
    </svg>`,
    'Saudi Arabia': `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" fill="#006C35"/>
      <path d="M18 6 L18 18 M12 12 L24 12" stroke="#FFFFFF" stroke-width="2"/>
      <path d="M18 6 C18 6 15 9 15 12 C15 15 18 18 18 18" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    </svg>`,
    'Algeria': `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="24" fill="#FFFFFF"/>
      <rect width="18" height="24" fill="#006233"/>
      <path d="M9 12 L9 18 L15 12 L9 6 Z" fill="#FFFFFF"/>
      <path d="M9 12 L9 18 L15 12 L9 6 Z" fill="#D21034"/>
    </svg>`,
    'Romania': `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="24" fill="#002B7F"/>
      <rect width="12" height="24" x="12" fill="#FCD116"/>
      <rect width="12" height="24" x="24" fill="#CE1126"/>
    </svg>`
  };
  return flags[country] || `<svg viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="24" fill="#FFFFFF"/>
    <path d="M0 0 L36 24 M36 0 L0 24" stroke="#CCCCCC" stroke-width="1"/>
  </svg>`;
};
</script>

<template>
  <div class="flag-svg" v-html="getFlagSvg(country)"></div>
</template>

<style scoped>
.flag-svg {
  width: 24px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
}

.flag-svg :deep(svg) {
  width: 100%;
  height: 100%;
}
</style> 