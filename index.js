document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#data-table', {
    ajax: 'data.json',
    // res: {
    //   dataSrc: 'group',
    // },
    columns: [
      {
        data: 'plugin_name',
      },

      {
        data: 'site_urls',

        render: function renderSiteUrls(data, type, row) {
          const siteHtml = data
            .map((site) => {
              const { site_url, p_status, p_version, p_update_version } = site;
              const tooltip = `
                              <div>Version: ${p_version}</div>
                              <div>Latest Version: ${p_update_version}</div>
                          `;
              const statusIcon = p_status === 'inactive' ? '🔴' : '🟢';
              return `
              <span class="user-select-none"
                    data-bs-html="true"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-title="${tooltip}">
                ${statusIcon} ${site_url}
              </span>
            `;
            })
            .join(', ');

          return siteHtml;
        },
      },
    ],
    drawCallback: function () {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]',
      );
      const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
      );
      console.log(tooltipTriggerList);
    },
  });
});
