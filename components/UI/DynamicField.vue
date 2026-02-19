<script setup lang="ts">
defineProps<{
  field: any;
  modelValue: any;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event, type?: string) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  if (type === 'integer' || type === 'float' || type === 'number') {
    target.value = target.value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(/^0+(\d)/, "$1")
      .replace(/^\./, "0.");
  };
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-6">
      <label class="w-[130px] text-sm font-medium">
        {{ field.label }}<span v-if="field.required"> *</span>
      </label>

      <select v-if="field.type === 'select'" :value="modelValue" @change="updateValue" :disabled="field.disabled"
        class="flex-1 border rounded px-3 py-2 w-full bg-white" :class="{ 'border-red-500': error }">
        <option v-if="field.placeholder" value="" disabled selected>
          {{ field.placeholder }}
        </option>
        <option v-for="opt in field.options" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>

      <input v-else :type="field.type" :disabled="field.disabled" :value="modelValue"
        @input="(e) => updateValue(e, field?.validation || 'integer')"
        class="flex-1 border rounded px-3 py-2 w-full bg-white" :class="{ 'border-red-500': error }"
        :placeholder="field.placeholder" />
    </div>
    <span v-if="error" class="text-xs text-red-500 text-left block">
      {{ error }}
    </span>
  </div>
</template>