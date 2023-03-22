// import DataTable from 'datatables.net-responsive-bs5';

import originalData from '../originalData.json';
import { dataObjects, DataTable } from './constants';
import { Tooltip } from 'bootstrap';

function createDataArray(data, type) {
  // Create an object to store the themes or plugins
  const items = {};

  // Loop through each site in the input data
  data.forEach((site) => {
    // Loop through each theme or plugin in the site
    const isArray = Array.isArray(site[type]);
    if (isArray) {
      site[type]?.forEach((item) => {
        // If the item is not already in the items object, add it
        if (!items[item.name]) {
          items[item.name] = {
            item_name: item.name,
            site_urls: [],
          };
        }

        // Add the site information to the item's site_urls array
        items[item.name].site_urls.push({
          site_url: site.site_url,
          path: site.path,
          container: site.container,
          server: site.server,
          p_status: item.status,
          p_version: item.version,
          p_update_version: item.update_version,
        });
      });
    } else {
      return [];
    }
  });

  // Convert the items object into an array
  const output = Object.values(items);
  console.log({ type, output });
  // Create the output object with the appropriate data
  return { data: output };
}

function setToolsTable(page) {
  let data = createDataArray(originalData, page.toLowerCase());
  document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#data-table', {
      data: data.data,
      responsive: {
        details: true,
      },
      columnDefs: [{ width: '18%', targets: 0 }],
      autoWidth: true,
      columns: [
        {
          title: page,
          data: (data, type, row) => {
            return data.item_name;
          },
          render: function plugin(data, type, row) {
            dataObjects[data] = row;
            return `<button id=${data} type="button" class="btn btn-link text-nowrap" data-bs-toggle="modal" data-bs-target="#modal">${data}</button>`;
          },
        },
        {
          title: '# Of Users',
          data: (data, type, row) => {
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
      ],
    });
  });
}

function setHomeTable() {
  document.addEventListener('DOMContentLoaded', function () {
    console.log(originalData);
    let table = new DataTable('#data-table', {
      data: originalData,
      responsive: {
        details: true,
      },
      columnDefs: [{ width: '18%', targets: 0 }],
      autoWidth: false,
      columns: [
        {
          title: 'Site',
          data: 'site_url',
          render: (data, type, row) => {
            if (!data.startsWith('https://', 0)) {
              return `${row.path} (path)`;
            }
            return data;
          },
        },
        {
          title: 'Version',
          data: 'version',
          render: (data, type, row) => {
            return data;
          },
        },
        {
          title: '# of plugins',
          data: 'plugins',
          render: (data, type, row) => {
            return Array.isArray(data) ? data.length : 'No data received';
          },
        },
        {
          title: 'Themes',
          data: 'themes',
          render: (data, type, row) => renderItems(data, type, row),
        },
        {
          title: 'Plugins',
          data: 'plugins',
          render: (data, type, row) => renderItems(data, type, row),
        },
      ],
      drawCallback: function () {
        const tooltipTriggerList = document.querySelectorAll(
          '[data-bs-toggle="tooltip"]',
        );
        const tooltipList = [...tooltipTriggerList].map(
          (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl),
        );
        console.log(tooltipTriggerList);
      },
    });
  });

  function renderItems(data, type, row) {
    console.log(data);
    if (!Array.isArray(data)) return 'No Data Received';
    const spans = data
      .map((item) => {
        const { name, status, version, update_version } = item;

        const tooltip = `
        <div>Version: ${version}</div>
        <div>Latest Version: ${update_version}</div>
        `;
        const statusIcon = status === 'inactive' ? '🔴' : '🟢';
        return `
           <span class="user-select-none"
                 data-bs-html="true"
                 data-bs-toggle="tooltip"
                 data-bs-placement="bottom"
                 title="${tooltip}">
             ${statusIcon} ${name}
           </span>
         `;
      })
      .join(', ');
    return spans;
  }
}

export { setToolsTable, setHomeTable };
