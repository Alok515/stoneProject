export const useStoneGuard = (type: "diamond" | "gemstone") => {
  const stoneAttributesData = ref<any>(null);
  const loadError = ref<string | null>(null);

  onMounted(async () => {
    try {
      const mod = await import("~/data/stoneAttributes");
      stoneAttributesData.value = mod.stoneAttributes;
    } catch (e) {
      loadError.value = "Failed to load stone attributes configuration.";
    }
  });

  const schema = computed(() => {
    if (!stoneAttributesData.value || typeof stoneAttributesData.value !== "object") return [];
    const attr = stoneAttributesData.value[type];
    return Array.isArray(attr) ? attr : [];
  });

  return {
    schema,
    loadError,
  };
};
