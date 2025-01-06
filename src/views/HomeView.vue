<script setup>
import footballLive from "@/components/footballLive.vue"
import { useHead } from "@unhead/vue"

useHead({
	title: "Trực tiếp bóng đá",
})
</script>

<template>
	<div class="min-h-screen bg-gray-100">
		<div class="container p-1 mx-auto sm:p-4">
      <footballLive />
		</div>
	</div>
</template>
