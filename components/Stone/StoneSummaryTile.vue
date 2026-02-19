<script setup lang="ts">
import type { StoneItem } from "~/types/stone";

const props = defineProps<{
  stone: StoneItem;
  type: "diamond" | "gemstone";
}>();

const store = useStoneStore();

const remove = () => {
  store.removeStone(props.type, props.stone.id);
};

const edit = () => {
  store.setEditing(props.type, props.stone.id);
};
</script>

<template>
  <div class="border rounded-xl p-4 flex justify-between items-center hover:cursor-pointer bg-white" @click.stop="edit">
    <div class="text-sm text-gray-700 font-semibold">
      {{ stone.stoneType }}, {{ stone.quantity }}qty, {{ stone.shape }}, {{ stone.carat }}ct
    </div>

    <button class="text-xs px-3 py-1 rounded-full text-gray-400 hover:text-black" @click.stop="remove">
      <!-- cross icon -->
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 2.5L17.5 17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.5 17.5L17.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

  </div>
</template>