<script setup lang="ts">
const props = withDefaults(defineProps<{
  error?: string | null;
  fallbackMessage?: string;
}>(), {
  fallbackMessage: "Something went wrong. Please try again.",
});

const capturedError = ref<unknown>(null);

const internalMessage = computed(() => {
  if (!capturedError.value) return null;
  if (capturedError.value instanceof Error && capturedError.value.message) {
    return capturedError.value.message;
  }
  return props.fallbackMessage;
});

const displayError = computed(() => props.error || internalMessage.value);

onErrorCaptured((err) => {
  capturedError.value = err;
  return false;
});
</script>

<template>
  <slot v-if="displayError" name="error" :error="displayError">
    <div class="w-full mt-4 pb-4">
      <span class="text-red-500 font-bold">{{ displayError }}</span>
    </div>
  </slot>
  <slot v-else />
</template>
