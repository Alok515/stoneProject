<script setup lang="ts">
defineProps<{
  error?: string | null;
}>();
</script>

<template>
  <div v-if="error" class="w-full mt-4 pb-4">
    <span class="text-red-500 font-bold">{{ error }}</span>
  </div>
</template>