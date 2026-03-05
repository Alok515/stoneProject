<script setup lang="ts">
defineProps<{
  field: any;
  modelValue: any;
  error?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event, type?: string, fieldKey?: string) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  if (type === 'integer' || type === 'float' || type === 'number') {
    target.value = target.value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(/^0+(\d)/, "$1")
      .replace(/^\./, "0.");

    if (fieldKey === "carat" && type === "float") {
      const [whole, decimal] = target.value.split(".");
      target.value = decimal !== undefined ? `${whole}.${decimal.slice(0, 2)}` : whole;
    }
  };
  emit("update:modelValue", target.value);
};

const handleFloatRange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-start gap-6">
      <label class="w-[130px] text-sm font-medium pt-2">
        {{ field.label }}<span v-if="field.required"> *</span>
      </label>

      <select v-if="field.type === 'select'" :value="modelValue" @change="updateValue" :disabled="field.disabled"
        class="flex-1 border rounded px-3 py-2 w-full bg-white min-h-[42px]" :class="{ 'border-red-500': error }">
        <option v-if="field.placeholder" value="" disabled selected>
          {{ field.placeholder }}
        </option>
        <option v-for="opt in field.options" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>

      <div v-else class="flex-1 w-full flex flex-col gap-2">
        <input :type="field.type" :disabled="field.disabled" :value="modelValue"
        @input="(e) => updateValue(e, field?.validation || 'integer', field?.key)"
        class="border rounded px-3 py-2 w-full bg-white min-h-[42px]" :class="{ 'border-red-500': error }"
        :placeholder="field.placeholder" />

      <div v-if="field?.slider" class="flex items-center gap-3">
        <input
          type="range"
          class="w-full accent-black"
          :value="modelValue || 0"
          :max="field.maxFloat || 200"
          :step="field?.validation === 'float' ? field?.step || 0.01 : 1"
          min="0"
          :disabled="field.disabled"
          @input="handleFloatRange"
        />
        <span class="w-12 text-xs text-right text-gray-500 tabular-nums">{{ modelValue || 0 }}</span>
      </div>
      </div>
    </div>
    <span v-if="error" class="text-xs text-red-500 text-left block">
      {{ error }}
    </span>
  </div>
</template>
