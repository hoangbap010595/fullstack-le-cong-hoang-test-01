<template>
  <div class="loading-container" :data-testid="`loading-container`">
    <div class="loading-spinner">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
    <p class="loading-text">Loading data...</p>
  </div>
</template>

<script setup>
defineOptions({
  name: 'LoadingSpinner'
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading-spinner {
  display: flex;
  gap: 8px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4CAF50;
  animation: bounce 0.5s ease-in-out infinite;
}

.circle:nth-child(2) {
  animation-delay: 0.1s;
  background-color: #2196F3;
}

.circle:nth-child(3) {
  animation-delay: 0.2s;
  background-color: #FF9800;
}

.loading-text {
  margin-top: 16px;
  color: #666;
  font-size: 16px;
  font-weight: 500;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-15px);
  }
}
</style>
