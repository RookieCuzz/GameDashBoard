<template>
    <div class="pagination-container">
        <div class="pagination">
            <!-- Previous Button -->
            <button
                class="pagination-btn"
                v-if="props.currentPage > 1"
                @click="goToPage(1)">
                <Icon icon="mingcute:arrow-to-left-fill" />

            </button>
            <button
                class="pagination-btn"
                :disabled="props.currentPage === 1"
                @click="goToPage(props.currentPage - 1)">
                <font-awesome-icon :icon="['fas', 'arrow-left']" />
            </button>
                <span
                        v-for="page in pages"
                        :key="page"
                        :class="['page-number', { active: page === props.currentPage }]"
                        @click="goToPage(page)">
        {{ page }}
      </span>
            <button
                class="pagination-btn"
                :disabled="props.currentPage === totalPages"
                @click="goToPage(props.currentPage + 1)">
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </button>
            <button
                class="pagination-btn"
                v-if="props.currentPage < totalPages"
                @click="goToPage(totalPages)">
                <Icon icon="mingcute:arrow-to-right-fill" />
            </button>
            <!-- Jump to page input -->
            <span v-if="showJumpPage === true">
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
                <Icon icon="mingcute:arrows-right-fill" />
            </button>
            </span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    showJumpPage: {
        type: Boolean,
        required: true
    },
    local_page: {
        type: Number,
        default: 1,
        required: false
    }
});
const emit = defineEmits(["page-changed"]);

const currentPage = ref(1);
const data = ref([]);
const totalItems = ref(0);
const jumpPage = ref(1);  // For storing the input value of the page to jump to
const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage);
});
// Simulating fake data for testing pagination

// Handle page change
const goToPage = (page) => {
    if (page < 1 || page > totalPages.value) return;
    if (page !== props.currentPage) {
        emit("page-changed", page);
    }
};

// Dynamically calculate pages to display
// Dynamically calculate pages to display
// 计算要显示的页码列表
const pages = computed(() => {
    const total = totalPages.value;
    let startPage = Math.max(props.currentPage - 2, 1);
    let endPage = Math.min(props.currentPage + 2, total);

    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (props.currentPage <= 3) {
        endPage = 5;
    } else if (props.currentPage + 2 >= total) {
        startPage = total - 4;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

</script>

<style scoped>
.pagination-container {
    display: flex;
    /*flex-direction: column;*/
    align-items: center;
    /*margin-top: 300px;*/
    font-family: 'Roboto', sans-serif;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 15px;
    border-radius: 100%;
    /*box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);*/

}

.pagination-btn {
    background: linear-gradient(45deg, #007bff, #1e90ff);
    color: white;
    border: none;
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s, transform 0.2s;
}

.pagination-btn:hover {
    background: linear-gradient(45deg, #0056b3, #005bb5);
    transform: translateY(-2px);
}

.pagination-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.page-number {
    padding: 10px;
    cursor: pointer;
    margin: 0 5px;
    font-size: 16px;
    color: #3498db;
    border-radius: 5px;
    transition: color 0.3s, background-color 0.3s;
    min-width: 40px;
    text-align: center;
}

.page-number:hover {
    background-color: #f0f0f0;
    color: #1e90ff;
}

.page-number.active {
    font-weight: bold;
    color: white;
    background-color: #3498db;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/*.ellipsis {*/
/*    padding: 10px;*/
/*    font-size: 16px;*/
/*    color: #888;*/
/*    min-width: 40px;*/
/*    text-align: center;*/
/*}*/

.jump-input {
    width: 70px;
    padding: 5px 10px;
    margin: 0 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s;
}

.jump-input:focus {
    outline: none;
    border-color: #3498db;
}
</style>