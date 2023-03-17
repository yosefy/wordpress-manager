import 'bootstrap/dist/css/bootstrap.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import DataTable from 'datatables.net-responsive-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';

import PluginJson from '../data.json';

import { dataObjects } from './constants';

function setToolsTable(page) {
  document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#data-table', {
      data: PluginJson.data,
      responsive: {
        details: true,
      },
      columnDefs: [{ width: '18%', targets: 0 }],
      autoWidth: false,
      columns: [
        {
          title: page,
          data: (data, type, row) => {
            console.log(data, type, row);
            return data.plugin_name;
          },
          render: function plugin(data, type, row) {
            console.log(data, type, row);
            dataObjects[data] = row;
            return `<button id=${data} type="button" class="btn btn-link text-nowrap" data-bs-toggle="modal" data-bs-target="#modal">${data}</button>`;
          },
        },
        {
          title: '# Of Users',
          data: (data, type, row) => {
            // console.log(data);
            return data.site_urls.length;
          },
        },
        {
          title: 'Outdated Versions',
          data: (data, type, row) => {
            let numberOfOutdatedVersions = 0;
            data.site_urls.forEach((item) => {
              if (item.p_update_version !== null) {
                return numberOfOutdatedVersions++;
              }
            });

            return numberOfOutdatedVersions;
          },
        },
        // {
        //   data: (data, type, row) => {
        //     return data.themes;
        //   },
        //   render: function plugin(data, type, row) {
        //     return `<button type="button" class="btn btn-link text-nowrap" data-bs-toggle="modal" data-bs-target="#modal" data-list=${JSON.stringify(
        //       row,
        //     )}>${data}</button>`;
        //   },
        // },
        // {
        //   data: 'site_urls',
        //   render: function renderSiteUrls(data, type, row) {
        //     const buttons = data
        //       .map((site) => {
        //         const { site_url, p_status, p_version, p_update_version } = site;
        //         const tooltip = `
        //                         <div>Version: ${p_version}</div>
        //                         <div>Latest Version: ${p_update_version}</div>
        //                     `;
        //         const statusIcon = p_status === 'inactive' ? '🔴' : '🟢';
        //         return `
        //         <span class="user-select-none"
        //               data-bs-html="true"
        //               data-bs-toggle="tooltip"
        //               data-bs-placement="bottom"
        //               title="${tooltip}">
        //           ${statusIcon} ${site_url}
        //         </span>
        //       `;
        //       })
        //       .join(', ');

        //     return buttons;
        //   },
        // },
      ],
    });
  });
}

export { setToolsTable };
