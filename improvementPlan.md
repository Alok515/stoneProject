# Stone Preview Pagination

CREATE function useStonePaginationStore(typeKey)

    RETURN defineStore("stonePagination-" + typeKey, () => {

        ---------------- STATE ----------------

        SET currentPage = 1
        SET pageSize = 10

        GET reference to mainStore (useStoneStore)


        ---------------- DATA SOURCE ----------------

        DEFINE sourceList AS:
            IF typeKey == "diamond"
                RETURN mainStore.diamonds
            ELSE
                RETURN mainStore.gemstones


        ---------------- COMPUTED VALUES ----------------

        DEFINE totalItems AS:
            RETURN length of sourceList

        DEFINE totalPages AS:
            RETURN ceil(totalItems / pageSize)

        DEFINE paginatedData AS:

            start = (currentPage - 1) * pageSize
            end = start + pageSize

            IF start >= totalItems
                SET currentPage = 1
                RETURN first page slice

            RETURN sourceList sliced from start to end


        ---------------- METHODS ----------------

        FUNCTION next():
            IF currentPage < totalPages
                INCREMENT currentPage
                CALL persist()

        FUNCTION prev():
            IF currentPage > 1
                DECREMENT currentPage
                CALL persist()


        ---------------- PERSISTENCE ----------------

        FUNCTION persist():
            IF running in browser
                SAVE to localStorage with key:
                    "stone-pagination-" + typeKey
                STORE:
                    currentPage
                    pageSize

        FUNCTION hydrate():
            IF NOT running in browser
                EXIT

            READ localStorage using:
                "stone-pagination-" + typeKey

            IF no stored value
                EXIT

            TRY:
                PARSE stored value
                SET currentPage
                SET pageSize
            CATCH:
                RESET to defaults


        RETURN:
            currentPage
            pageSize
            totalPages
            paginatedData
            next()
            prev()
            hydrate()

    })


DEFINE props:
    type: "diamond" | "gemstone"

CREATE paginationStore using:
    useStonePaginationStore(props.type)

EXTRACT:
    currentPage
    totalPages
    paginatedData
    next()
    prev()
    hydrate()

ON component mounted:
    CALL hydrate()


<template>
  <section class="preview-section">

    <!-- Stone List -->
    <main
      v-for="item in paginatedData"
      :key="item.id"
      class="stone-card"
    >
      <p>Type: {{ item.stoneType }}</p>
      <p>Qty: {{ item.quantity }}</p>
      <p>Carat: {{ item.carat }}</p>
      <p>Shape: {{ item.shape }}</p>
    </main>

    <!-- Pagination Controls -->
    <footer class="pagination-footer">

      <p>
        Page {{ currentPage }} of {{ totalPages }}
      </p>

      <button
        :disabled="currentPage === 1"
        @click="prev"
      >
        Prev
      </button>

      <button
        :disabled="currentPage === totalPages"
        @click="next"
      >
        Next
      </button>

    </footer>

  </section>
</template>

Preview Page

<script setup lang="ts">
const types = ["diamond", "gemstone"] as const
</script>

```
<template>
  <StonePreviewSection
    v-for="type in types"
    :key="type"
    :type="type"
  />
</template>