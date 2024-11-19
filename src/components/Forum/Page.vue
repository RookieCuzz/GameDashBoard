<template>
  <div class="pagination-container">
    <div class="pagination">
      <!-- Previous Button -->
      <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)">
        上一页
      </button>

      <!-- Page Numbers -->
      <span
          v-if="currentPage > 2"
          class="page-number"
          @click="goToPage(1)">
        1
      </span>

      <span v-if="currentPage > 3" class="ellipsis">...</span>

      <span
          v-for="page in displayedPages"
          :key="page"
          :class="['page-number', { active: page === currentPage }]"
          @click="goToPage(page)">
        {{ page }}
      </span>

      <span v-if="currentPage < totalPages - 2" class="ellipsis">...</span>

      <span
          v-if="currentPage < totalPages - 1"
          class="page-number"
          @click="goToPage(totalPages)">
        {{ totalPages }}
      </span>

      <!-- Next Button -->
      <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)">
        下一页
      </button>

      <!-- Jump to page input -->
      <input
          v-model="jumpPage"
          type="number"
          min="1"
          :max="totalPages"
          placeholder="Go to page"
          class="jump-input"
      />
      <button
          class="pagination-btn"
          @click="goToPage(jumpPage)"
          :disabled="jumpPage < 1 || jumpPage > totalPages"
      >
        跳转
      </button>
    </div>

    <!-- Current Page Data Display -->
    <div class="data-list">
      <ul>
        <li v-for="item in data" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

export default {
  name: 'Pagination',
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    pageSize: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const currentPage = ref(1);
    const totalPages = ref(0);
    const data = ref([]);
    const totalItems = ref(0);
    const jumpPage = ref(1);  // For storing the input value of the page to jump to

    // Simulating fake data for testing pagination
    const fetchData = async () => {
      try {
        // Fake data instead of API call
        const response = {
          total: 10,
          data: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
            { id: 4, name: "Item 4" },
            { id: 5, name: "Item 5" },
            { id: 6, name: "Item 6" },
            { id: 7, name: "Item 7" },
            { id: 8, name: "Item 8" },
            { id: 9, name: "Item 9" },
            { id: 10, name: "Item 10" }
          ]
        };

        totalItems.value = response.total;
        data.value = response.data.slice((currentPage.value - 1) * props.pageSize, currentPage.value * props.pageSize);
        totalPages.value = Math.ceil(totalItems.value / props.pageSize);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Handle page change
    const goToPage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
      jumpPage.value = page;  // Update the input field when jumping
      fetchData(); // Trigger data update when page changes
    };

    // Dynamically calculate pages to display
    const getDisplayedPages = () => {
      let pages = [];
      const total = totalPages.value;
      const current = currentPage.value;

      // Show 1, the current page and the last page, along with pages around the current page
      if (total <= 7) {
        // If the total pages are less than or equal to 7, show all pages
        pages = Array.from({ length: total }, (_, index) => index + 1);
      } else {
        // Always show first 1, the last page and current page surrounding pages
        pages = [current - 1, current, current + 1].filter(page => page > 0 && page <= total);

        if (current > 3) {
          pages.unshift(current - 2); // Show first page if we're more than 3 pages in
        }

        if (current < total - 2) {
          pages.push(current + 2); // Show last page if we're less than 3 pages from the end
        }

        // Ensure the last item is not the current page + 1 when it's out of bounds
        if (pages[pages.length - 1] === total && pages[pages.length - 2] !== total - 1) {
          pages.splice(pages.length - 1, 1);
        }
      }

      return pages;
    };

    // Watch for page change to update displayed pages
    const displayedPages = ref([]);
    watch(currentPage, () => {
      displayedPages.value = getDisplayedPages();
    });

    // Initial data fetch when the component is mounted
    onMounted(() => {
      fetchData();
      displayedPages.value = getDisplayedPages();
    });

    return {
      currentPage,
      totalPages,
      data,
      jumpPage,  // Add the page input field model
      goToPage,
      displayedPages
    };
  }
};
</script>

<style scoped>
.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 200px;
}

.pagination-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

.pagination-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.page-number {
  padding: 10px;
  cursor: pointer;
  margin: 0 5px;
  font-size: 14px;
  color: #ff0000;
  border-style: solid;
}

.page-number.active {
  font-weight: bold;
  color: #3498db;
}

.page-number:hover {
  text-decoration: underline;
}

.ellipsis {
  padding: 10px;
  font-size: 14px;
}

.jump-input {
  width: 60px;
  padding: 0 5px;
  margin: 0 10px 0 10px;
  font-size: 14px;
}

.data-list {
  margin-top: 20px;
  color: #00a676;
}

.data-list ul {
  list-style: none;
  padding: 0;
}

.data-list li {
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
</style>
