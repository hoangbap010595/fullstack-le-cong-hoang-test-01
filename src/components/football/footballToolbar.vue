<script setup>
import { ref } from 'vue'
import { Search, Radio } from 'lucide-vue-next'

const emit = defineEmits(['filter-change', 'search', 'sort-change'])

const activeFilter = ref('live')
const searchQuery = ref('')

const filters = [
  { id: 'all', label: 'Tất cả' },
  { id: 'live', label: 'Trực tiếp' },
  { id: 'finished', label: 'Đã kết thúc' }
]

const handleFilterChange = (filterId) => {
  activeFilter.value = filterId
  emit('filter-change', filterId)
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="flex items-center justify-between py-3 bg-white border-b" :data-testid="`football-toolbar`">
    <!-- Left side - Filter buttons -->
    <div class="flex gap-2">
      <button v-for="filter in filters" :key="filter.id" :class="[
        'px-4 py-2 rounded-md text-md font-medium transition-colors flex items-center gap-2',
        activeFilter === filter.id
          ? 'bg-red-700 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      ]" @click="handleFilterChange(filter.id)">
        <Radio v-if="filter.id === 'live'" class="ml-2" size="16" />
        {{ filter.label }}
      </button>
    </div>

    <!-- Right side - Search and Sort -->
    <div class="flex items-center gap-3">
      <div class="relative">
        <input v-model="searchQuery" type="text" placeholder="Tìm kiếm..."
          class="py-2 pr-4 text-sm bg-gray-100 rounded-full pl-9 focus:outline-none focus:ring-2 focus:ring-red-500"
          @input="handleSearch">
        <Search class="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size="16" />
      </div>

      <select
        class="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        @change="$emit('sort-change', $event.target.value)">
        <option value="all">Tất cả</option>
        <option value="time">Thời gian</option>
        <option value="league">Giải đấu</option>
      </select>
    </div>
  </div>
</template>