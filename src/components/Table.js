import $ from 'jquery';
import 'datatables.net-select-bs5/css/select.bootstrap5.min.css';
import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css';
import 'datatables.net-searchpanes-bs5/css/searchpanes.bootstrap5.min.css';
import DataTable from 'datatables.net-responsive-bs5';
import 'datatables.net-searchpanes-bs5';

import 'datatables.net-select-bs5';

export default class Table {
  constructor(templateTableSelector, data) {
    this._data = data;
    this._template = document
      .querySelector(templateTableSelector)
      .content.querySelector('table');

    this._aggregatedTable;
  }

  removeTableElement = () => {
    this._element.remove();
    this._element = null;
  };

  aggregateDataToTable = async () => {
    let table;

    await new Promise((resolve) => {
      this._aggregatedTable = new DataTable('#modal-table-el', {
        data: this._data.site_urls,
        responsive: {
          details: false,
        },
        searchPanes: {
          threshold: 0.4,
        },
        dom: 'Plfrtip',
        columnDefs: [
          {
            searchPanes: {
              threshold: 1,
            },
            targets: [1],
          },
        ],
        autoWidth: true,

        columns: [
          { data: 'site_url' },
          { data: 'p_version' },
          {
            data: 'p_update_version',
            render: (data, type, row) => {
              return row.p_update_version ? row.p_update_version : 'Up to date';
            },
          },
          { data: 'p_status' },
        ],
        initComplete: () => {
          resolve();
        },
      });
    });

    return this._aggregatedTable;
  };

  renderTable = () => {
    this._element = this._template.cloneNode(true);
    this._element.setAttribute('id', 'modal-table-el');
    return this._element;
  };
}
