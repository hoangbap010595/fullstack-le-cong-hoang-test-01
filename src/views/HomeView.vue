<script setup>
import footballLive from "@/components/football/footballLive.vue"
import { useHead } from "@unhead/vue"

useHead({
	title: "Trực tiếp bóng đá",
})
</script>

<template>
	<div class="min-h-screen bg-white">
		<div class="container p-1 mx-auto sm:p-4">
      <footballLive />
		</div>
	</div>
</template>
