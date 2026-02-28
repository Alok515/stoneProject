# Stone Preview Pagination

## Overview

This document outlines the pagination architecture for the **Preview Page** of the Stone Editor application.

# Architecture Overview

We separate concerns into:

1. **Main Store (`useStoneStore`)**
   - Holds domain data (diamonds, gemstones)

2. **Pagination Store (`useStonePaginationStore`)**
   - Handles slicing logic
   - Maintains page state
   - Persists page settings
   - Hydrates safely on client
---

# Pagination Store Design (Pseudo Code)

CREATE store "stonePagination"

-----------------------
STATE
-----------------------

SET type = "diamond"   // can be "diamond" or "gemstone"

SET currentPage = 1
SET pageSize = 10

GET reference to mainStore (stone store)


-----------------------
COMPUTED VALUES
-----------------------

DEFINE totalItems AS:
    IF type is "diamond"
        RETURN number of diamonds in mainStore
    ELSE
        RETURN number of gemstones in mainStore


DEFINE totalPages AS:
    RETURN ceiling(totalItems / pageSize)


DEFINE paginatedData AS:
    IF type is "diamond"
        sourceList = mainStore.diamonds
    ELSE
        sourceList = mainStore.gemstones

    startIndex = (currentPage - 1) * pageSize
    endIndex = startIndex + pageSize

    //check for data overflow
    IF startIndex > sourceList.length
        //reset values
        startIndex = 0
        endIndex = pageSize

    IF endIndex > sourceList.length
        endIndex = sourceList.length


    return slice of sourceList from startIndex to endIndex:



-----------------------
CORE LOGIC
-----------------------


FUNCTION next():
    IF currentPage < totalPages
        INCREMENT currentPage
        CALL persist()


FUNCTION prev():
    IF currentPage > 1
        DECREMENT currentPage
        CALL persist()


FUNCTION setType(newType):
    SET type = newType
    SET currentPage = 1


-----------------------
PERSISTENCE (LOCAL STORAGE)
-----------------------

FUNCTION persist():
    IF running in browser
        SAVE to localStorage using key:
            "stone-pagination-" + type

        STORE:
            currentPage
            pageSize


FUNCTION hydrate():
    IF NOT running in browser // process.client
        EXIT

    READ localStorage with key:
        "stone-pagination-" + type

    TRY:
        PARSE stored data
        SET currentPage = stored.currentPage OR 1
        SET pageSize = stored.pageSize OR 10
    CATCH error:
        SET currentPage = 1
        SET pageSize = 10


-----------------------
RETURN FROM STORE
-----------------------

Expose:
    type
    currentPage
    pageSize
    totalPages
    paginatedData
    next()
    prev()
    setType()
    hydrate()


USE IN COMPONENT
-----------------------
SETUP 

props type = "diamond" // can be "diamond" or "gemstone"

const { next, prev, setType, hydrate } = useStonePaginationStore()
//reactive Data
const { currentPage, totalPages, paginatedData } = storeToRefs(useStonePaginationStore())

CALL setType(props.type)

onMounted(() => {
    //hydrate on mount
    CALL hydrate()
})

Template UI:
<div>
    <section>
    //header
    <main v-for="item in paginatedData" :key="item.id">
        <p>Type: {{ item.stoneType }}</p>
        <p>Qty: {{ item.quantity }}</p>
        <p>Carat: {{ item.carat }}</p>
        <p>Shape: {{ item.shape }}</p>
    </main>
    <footer>
        <p>Page {{ currentPage }} of {{ totalPages }}</p>
        <button @click="prev">Prev</button>
        <button @click="next">Next</button>
    </footer>
    </section>
</div>


USE IN PREVIEW:
const types = ["diamond", "gemstone"]

<template>
    //page Header
    <PAGECOMPONENT v-for="type in types" :key="type" :type="type" />
</template