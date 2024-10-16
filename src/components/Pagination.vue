<template>
  <div class="pagination">
    <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="page-button"
    >
      Prev
    </button>

    <span
        v-for="page in pageNumbers"
        :key="page"
        @click="goToPage(page)"
        :class="['page-item', { active: currentPage === page, ellipsis: page === '...' }]"
    >
      {{ page }}
    </span>

    <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="page-button"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  modelValue: {
    type: Number,
    default: 1,
  }
});

const emit = defineEmits(['update:modelValue']);

const currentPage = ref(props.modelValue);

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize));

watch(
    () => props.modelValue,
    (newVal) => {
      currentPage.value = newVal;
    }
);

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    emit('update:modelValue', currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit('update:modelValue', currentPage.value);
  }
};

const goToPage = (page) => {
  if (page !== '...') {
    currentPage.value = page;
    emit('update:modelValue', currentPage.value);
  }
};

const pageNumbers = computed(() => {
  let pages = [];
  const current = currentPage.value;
  const total = totalPages.value;

  if (total <= 7) {
    pages = Array.from({ length: total }, (_, i) => i + 1);
  } else {
    if (current <= 4) {
      pages = [1, 2, 3, 4, 5, '...', total];
    } else if (current >= total - 3) {
      pages = [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    } else {
      pages = [1, '...', current - 1, current, current + 1, '...', total];
    }
  }

  return pages;
});
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

.page-button {
  cursor: pointer;
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
}

.page-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.page-item {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  color: #333;
}

.page-item.active {
  background-color: orange;
  color: white;
}

.page-item.ellipsis {
  pointer-events: none;
  cursor: default;
}
</style>
