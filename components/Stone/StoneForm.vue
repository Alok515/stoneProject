
<script setup lang="ts">
const props = defineProps<{ type: "diamond" | "gemstone"; editData?: any }>()
const emit = defineEmits(["save", "cancel"])

const { schema, loadError } = useStoneGuard(props.type);

const form = reactive<Record<string, any>>({});
const { errors, validate } = useStoneValidation(schema, form);

watchEffect(() => {
  if (schema.value.length > 0) {
    schema.value.forEach((f) => {
      if (form[f.key] === undefined) {
        form[f.key] = props.editData?.[f.key] ?? (f as any).default ?? "";
      }
    });
  }
});

function submit() {
  if (validate()) {
    emit("save", { ...form });
  }
}
</script>

<template>
  <div
    class="bg-white border border-[#D9D9D9]
           rounded-2xl p-8 space-y-6 max-w-[425px]"
  >
    <div v-if="loadError" class="text-red-500 text-sm">
      {{ loadError }}
    </div>
    <div v-else-if="schema.length === 0" class="text-gray-500 text-sm">
      Loading...
    </div>

    <div v-else class="space-y-4">
      <LazyUIDynamicField
        v-for="field in schema"
        :key="field.key"
        :field="field"
        v-model.trim="form[field.key]"
        :error="errors[field.key]"
      />
    </div>

    <div class="flex gap-4 pt-4">
      <LazyUIAddButton
        @click="submit"
        :disabled="schema.length === 0"
      />

      <button @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </div>
</template>