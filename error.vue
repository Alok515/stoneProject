<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error?.status || 500);
const statusMessage = computed(
  () => props.error?.statusMessage || "Something went wrong",
);

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-6">
    <div class="w-full max-w-xl rounded-2xl border border-[#E5E5E5] bg-white p-8 text-center shadow-sm">
      <p class="text-xs font-semibold tracking-[0.08em] text-gray-500">APPLICATION ERROR</p>
      <h1 class="mt-3 text-4xl font-bold text-black">{{ statusCode }}</h1>
      <p class="mt-2 text-base text-gray-700">{{ statusMessage }}</p>
      <p class="mt-2 text-sm text-gray-500">
        Please try again. If this keeps happening, return to the home page.
      </p>

      <button
        class="mt-6 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
        @click="handleError">
        Go to Home
      </button>
    </div>
  </div>
</template>
