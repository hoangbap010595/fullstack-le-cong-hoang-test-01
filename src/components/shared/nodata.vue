<template>
  <div class="no-data-container" :data-testid="`no-data-container`">
    <div class="no-data-content">
      <div class="icon-wrapper">
        <slot name="icon">
          <!-- Default empty box icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3.5 3.5h17v17h-17z" />
            <path d="M3.5 8.5h17" />
            <path d="M8.5 8.5v12" />
          </svg>
        </slot>
      </div>
      
      <h3 class="title">
        <slot name="title">No Data Available</slot>
      </h3>
      
      <p class="description">
        <slot name="description">There are no items to display at the moment.</slot>
      </p>

      <div v-if="$slots.action" class="action">
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'NoData'
})
</script>

<style scoped>
.no-data-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
}

.no-data-content {
  text-align: center;
  max-width: 400px;
}

.icon-wrapper {
  margin-bottom: 1.5rem;
  color: #9ca3af;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.description {
  color: #6b7280;
  font-size: 0.975rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.action {
  margin-top: 1rem;
}
</style>
