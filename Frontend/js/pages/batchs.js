$(document).ready(function () {
    const tableRenderColumns = [
      "name",
      "status",
      "quantity",
    ]
    const BatchTable = initDataTable('#BatchTable', { ajaxUrl: API_ENDPOINT.BATCH.LIST_BATCH }, tableRenderColumns);
});