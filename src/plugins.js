import './styles.scss';

import { Modal } from 'bootstrap';
import Section from './components/Section';
import Table from './components/Table';
import { dataObjects, DataTable } from './utils/constants';
import { setToolsTable } from './utils/helpers';

let section = new Section('.modal-dialog');

setToolsTable('Plugins');

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-link')) {
    if (document.querySelector('.modal-body').hasChildNodes()) {
      section.removeTable();
    }
    const table = new Table('#modal-table', dataObjects[e.target.id]);

    const tableElement = table.renderTable();

    section.appendTable(tableElement, `Plugin: ${e.target.id}`);

    table.aggregateDataToTable(DataTable);
  }
});
