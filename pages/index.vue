<script setup lang="ts">
// import { v4 as uuid } from "uuid";

const store = useStoneStore();

const {
  diamonds,
  gemstones,
  dimondTotalQty,
  gemStoneTotalQty,
  editing,
  editingStone
} = storeToRefs(store);

const error = ref<string | null>(null);

const forms = reactive({
  diamond: false,
  gemstone: false,
});

const sections = computed(() => [
  {
    type: "diamond" as const,
    title: "Diamond",
    list: diamonds.value,
    totalQty: dimondTotalQty.value,
    isOpen: forms.diamond,
    emptyText: "Add diamond quantity & carat details.",
  },
  {
    type: "gemstone" as const,
    title: "Gemstone",
    list: gemstones.value,
    totalQty: gemStoneTotalQty.value,
    isOpen: forms.gemstone,
    emptyText: "Add gemstone details here.",
  },
]);

function openAdd(type: "diamond" | "gemstone") {
  store.clearEditing();
  forms.diamond = false;
  forms.gemstone = false;
  forms[type] = true;
  error.value = null;
}

function closeForm(type: "diamond" | "gemstone") {
  store.clearEditing();
  forms[type] = false;
}

function handleSave(data: any, type: "diamond" | "gemstone") {
  if (editing.value.type === type && editing.value.id) {
    store.updateStone(data);
    store.clearEditing();
  } else {
    data.id = crypto.randomUUID();
    store.addStone(type, data);
    forms[type] = false;
  }
}

function goPreview() {
  if (diamonds.value.length === 0 && gemstones.value.length === 0) {
    error.value = "Please add at least one stone";
    return;
  }
  error.value = null;
  navigateTo("/preview");
}
</script>

<template>
  <div class="min-h-screen bg-white pb-[140px]">

    <section class="py-[66px] flex justify-center">

      <div class="w-full max-w-[1170px] px-6">

        <div class="flex flex-col md:flex-row gap-10 items-start">

          <div class="flex flex-col items-start p-0 gap-2 w-[200px] h-[129px] flex-none order-0 grow-0">
            <div>
              <p class="font-bold text-sm">Stone *</p>
              <p class="text-xs text-gray-500">if your item has a diamond or gemstone, this is the place to define it!
              </p>
            </div>
            <div>
              <p class="font-bold text-xs text-secondary tracking-[0.01em]">Tips:</p>
              <ul class="flex flex-col gap-1">
                <li class="flex items-start gap-1 text-xs text-secondary">
                  <p class="text-gray-500">if your item has multiple stones, first define the primary stone and then the
                    secondary stone(s)</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="relative flex flex-col md:flex-row gap-5 flex-1 p-4 rounded-xl"
            :class="[error ? 'border border-red-500' : 'border border-transparent']">

            <div v-for="section in sections" :key="section.type" class="flex-1 w-full max-w-[425px] space-y-6">

              <div class="bg-white border border-[#E5E5E5]
             rounded-2xl shadow-[0_4px_20px_rgba(7,11,20,0.1)]
             p-8 space-y-5">
                <h4 class="text-lg font-bold">
                  <span v-if="section.list.length === 0 && !section.isOpen">
                    Add
                  </span>
                  {{ section.title }}
                </h4>

                <div v-if="section.list.length === 0 && !section.isOpen" class="text-sm text-gray-500">
                  {{ section.emptyText }}
                </div>

                <div v-if="section.totalQty > 0" class="text-sm font-semibold">
                  Total Qty: {{ section.totalQty }}
                </div>

                <div class="space-y-3">
                  <template v-for="item in section.list" :key="item.id">

                    <div v-if="
                      editing.type === section.type &&
                      editing.id === item.id
                    ">
                      <LazyStoneForm :type="section.type" :editData="editingStone"
                        @save="(d) => handleSave(d, section.type)" @cancel="closeForm(section.type)" />
                    </div>

                    <StoneSummaryTile v-else :stone="item" :type="section.type" />

                  </template>

                  <div v-if="section.isOpen">
                    <LazyStoneForm :type="section.type" @save="(d) => handleSave(d, section.type)"
                      @cancel="closeForm(section.type)" />
                  </div>
                </div>

                <UIAddButton v-if="!section.isOpen && editing.type !== section.type"
                  class="!bg-[#F5F5F5] !text-black !px-6 !py-2.5 !text-sm !font-bold hover:!bg-gray-200 transition"
                  @click="openAdd(section.type)">
                  + Add {{ section.title }}
                </UIAddButton>

              </div>
            </div>

            <div v-if="error" class="absolute -bottom-10 left-0">
              <UIErrorBoundary :error="error" />
            </div>

          </div>


        </div>
      </div>
    </section>

    <div class="fixed bottom-0 left-0 w-full
             bg-[#E4E4E4] h-[127px]
             flex items-center justify-end
             px-[120px] z-50
             shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <button class="bg-[#222] text-white
               px-10 py-3 rounded-full
               text-lg font-bold
               hover:opacity-90 transition" @click="goPreview">
        Submit
      </button>
    </div>

  </div>
</template>
