<script setup lang="ts">
defineProps<{
  disabled?: boolean;
}>();
defineEmits(["click"]);
</script>

<template>
  <button
    class="bg-[#222] text-white px-5 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
    @click="$emit('click')"
    :disabled="disabled"
  >
    <slot>Save</slot>
  </button>
</template>