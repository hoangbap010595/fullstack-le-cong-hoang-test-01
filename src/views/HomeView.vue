<script setup>
import footballLive from "@/components/footballLive.vue"
import { useHead } from "@unhead/vue"

useHead({
	title: "Trực tiếp bóng đá",
})
</script>

<template>
	<div class="min-h-screen bg-gray-100">
		<div class="container px-4 py-8 mx-auto">
      <footballLive />
		</div>
	</div>
</template>
