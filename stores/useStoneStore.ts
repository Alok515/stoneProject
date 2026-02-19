import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { StoneItem } from "~/types/stone";

export const useStoneStore = defineStore("stone", () => {

  const diamonds = ref<StoneItem[]>([]);
  const gemstones = ref<StoneItem[]>([]);

  const editing = ref<{
    type: null | "diamond" | "gemstone";
    id: null | string;
  }>({
    type: null,
    id: null
  });

  function addStone(type: "diamond" | "gemstone", stone: StoneItem) {
    if (type === "diamond") {
      diamonds.value.push(stone);
    } else {
      gemstones.value.push(stone);
    }
  }

  function removeStone(type: "diamond" | "gemstone", id: string) {
    const list =
      type === "diamond"
        ? diamonds.value
        : gemstones.value;

    const index = list.findIndex(s => s.id === id);

    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  function setEditing(type: "diamond" | "gemstone", id: string) {
    editing.value = { type, id };
  }

  function updateStone(stone: StoneItem) {
    const { type, id } = editing.value;
    if (!type || !id) return;

    const list =
      type === "diamond"
        ? diamonds.value
        : gemstones.value;

    const index = list.findIndex(s => s.id === id);

    if (index !== -1) {
      list[index] = {
        ...stone,
        id
      };
    }

    clearEditing();
  }

  function clearEditing() {
    editing.value = {
      type: null,
      id: null
    };
  }

  const dimondTotalQty = computed(() =>
    diamonds.value.reduce(
      (acc, curr) => acc + Number(curr.quantity ?? 0),
      0
    )
  );

  const gemStoneTotalQty = computed(() =>
    gemstones.value.reduce(
      (acc, curr) => acc + Number(curr.quantity ?? 0),
      0
    )
  );

  const editingStone = computed(() => {
    const { type, id } = editing.value;
    if (!type || !id) return null;

    const list =
      type === "diamond"
        ? diamonds.value
        : gemstones.value;

    return list.find(s => s.id === id) ?? null;
  });

  return {
    diamonds,
    gemstones,
    editing,

    addStone,
    removeStone,
    setEditing,
    updateStone,
    clearEditing,

    dimondTotalQty,
    gemStoneTotalQty,
    editingStone
  };
});
