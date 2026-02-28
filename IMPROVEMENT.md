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

SET paginatedData = empty list

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


-----------------------
CORE LOGIC
-----------------------

FUNCTION loadData():
    IF type is "diamond"
        sourceList = mainStore.diamonds
    ELSE
        sourceList = mainStore.gemstones

    startIndex = (currentPage - 1) * pageSize
    endIndex = startIndex + pageSize

    paginatedData = slice of sourceList from startIndex to endIndex


FUNCTION next():
    IF currentPage < totalPages
        INCREMENT currentPage
        CALL persist()
        CALL loadData()


FUNCTION prev():
    IF currentPage > 1
        DECREMENT currentPage
        CALL persist()
        CALL loadData()


FUNCTION setType(newType):
    SET type = newType
    SET currentPage = 1
    CALL loadData()


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

    IF nothing found
        CALL loadData()
        EXIT

    TRY:
        PARSE stored data
        SET currentPage = stored.currentPage OR 1
        SET pageSize = stored.pageSize OR 10
    CATCH error:
        SET currentPage = 1
        SET pageSize = 10

    CALL loadData()


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
    loadData()
    hydrate()