
<script setup lang="ts">
const { diamonds, gemstones } = useStoneStore()
</script>

<template>
  <div class="min-h-screen bg-white flex justify-center">
    <div class="w-full max-w-[1170px] px-6 py-12">

      <div class="flex gap-10">

        <div class="flex flex-col items-start p-0 gap-2 w-[200px] h-[19px] flex-none order-0 grow-0">
          <p class="font-bold text-sm">Stone Detail Summary</p>
        </div>

        <div class="w-[425px] space-y-4" v-if="diamonds.length > 0">
          <h2 class="text-xl font-bold">Diamonds</h2>

          <div
            v-for="(d, i) in diamonds"
            :key="i"
            class="border rounded-2xl p-6 space-y-2"
          >
            <p>Type: {{ d.stoneType }}</p>
            <p>Qty: {{ d.quantity }}</p>
            <p>Carat: {{ d.carat }}</p>
            <p>Shape: {{ d.shape }}</p>
          </div>
        </div>

        <div class="w-[425px] space-y-4" v-if="gemstones.length > 0">
          <h2 class="text-xl font-bold">Gemstones</h2>

          <div
            v-for="(g, i) in gemstones"
            :key="i"
            class="border rounded-2xl p-6 space-y-2"
          >
            <p>Type: {{ g.stoneType }}</p>
            <p>Qty: {{ g.quantity }}</p>
            <p>Carat: {{ g.carat }}</p>
            <p>Shape: {{ g.shape }}</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>