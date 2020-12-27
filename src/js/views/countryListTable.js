import comunicator from "../logic/apiCommunicator.js";
import sort from "../logic/sorting.js";
import addDisplayFullScreen from '../logic/addDisplayOnFullScreen';
import countrySelectionHandler from '../logic/countrySelectionHandler';

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

async function makeTable() {
  try {

    const dataComunicator = await comunicator.loadGeneralData();

    let table = `<table class="global-table">
    <input class="form-control" type="text" placeholder="Search country" id="search-text">  
            <thead>    
                <tr class="th_sticky">                    
                    <th valuetype="number" class="cases_head row_active cases_th">Cases</th>
                    <th valuetype="number" class="cases_head row_hidden recovered_th">Recovered</th>
                    <th valuetype="number" class="cases_head row_hidden deaths_th">Deaths</th>
                    <th valueType="string">Country</th>
                </tr>
            </thead>`;

    for (let i = 0; i < dataComunicator.length; i++) {
      table += `<tr class="country__row" value='${dataComunicator[i].countryInfo.iso2}'>
    <td class="cases_row row_active">${numberWithDots(dataComunicator[i].cases)}</td>
    <td class="recovered_row row_hidden">${numberWithDots(dataComunicator[i].recovered)}</td>
    <td class="deaths_row row_hidden">${numberWithDots(dataComunicator[i].deaths)}</td>
    
    <td class="cell__country">
    <img src="${dataComunicator[i].countryInfo.flag}"
    width="20px">${dataComunicator[i].country}</td> 
    </tr>`;
    }

    document.querySelector(".global__country").innerHTML = table;
    sort(
      document.querySelector(".cases_head").parentElement.parentElement.parentElement,
      0,
      false,
      "number"
    );
  } catch (e) {
    document.querySelector(".global__country").innerHTML = "table";
  }  
}


function tableSearch() {
  const phrase = document.getElementById('search-text');
  const table = document.querySelector('.global-table');
  const regPhrase = new RegExp(phrase.value, 'i');
  let flag = false;
  for (let i = 1; i < table.rows.length; i++) {
    flag = false;
    for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }

  }
}


function sortingWaiting() {
  document.querySelectorAll(".global-table th").forEach((headerCell) => {
    headerCell.addEventListener("click", () => {      
      const tableElement = headerCell.parentElement.parentElement.parentElement;      
      const columnIndex = Array.prototype.indexOf.call(
        headerCell.parentElement.children,
        headerCell
      );
      const isAscending = headerCell.classList.contains("sort-asc");
      console.log(tableElement,
        columnIndex)
      sort(
        tableElement,
        columnIndex,
        !isAscending,
        headerCell.getAttribute("valueType")        
      );     
    });
  });
}


function countryChoose() {
  document.querySelectorAll('.country__row').forEach((countryRow) => {
    countryRow.addEventListener("click", () => {
      countrySelectionHandler(countryRow.getAttribute('value'))
     })
  })
}


function globalTableControls() {
  document.querySelectorAll('.global__country-controls_btn').forEach((controlButton) => {
    controlButton.addEventListener("click", () => {
      function hideRow(countryButton) {
        countryButton.classList.remove("country-controls_active")
        document.querySelectorAll('.country__row .row_active').forEach(n => {
          n.classList.remove('row_active')
          n.classList.add('row_hidden')
        })
        document.querySelectorAll('.th_sticky .cases_head').forEach(n => {
          n.classList.remove('row_active')
          n.classList.add('row_hidden')
        })
      }
      if (controlButton.getAttribute('data-type') === "recovered") {
        document.querySelectorAll('.global__country-controls_btn').forEach((countryButton) => {
          hideRow(countryButton);
          document.querySelector('.recovered_th').classList.add('row_active', 'sort-desc');
          document.querySelectorAll('.recovered_row .row_hidden').forEach(n => n.classList.remove('row_hidden'));
          document.querySelectorAll('.recovered_row').forEach(n => n.classList.add('row_active'));
        })
        controlButton.classList.add("country-controls_active");
        sort(
          document.querySelector(".cases_head").parentElement.parentElement.parentElement,
          1,
          false,
          "number"
        );
      }

      if (controlButton.getAttribute('data-type') === "deaths") {
        document.querySelectorAll('.global__country-controls_btn').forEach((countryButton) => {
          hideRow(countryButton);
          document.querySelector('.deaths_th').classList.add('row_active', 'sort-desc');
          document.querySelectorAll('.deaths_row .row_hidden').forEach(n => n.classList.remove('row_hidden'));
          document.querySelectorAll('.deaths_row').forEach(n => n.classList.add('row_active'));
        })
        controlButton.classList.add("country-controls_active")
        sort(
          document.querySelector(".cases_head").parentElement.parentElement.parentElement,
          2,
          false,
          "number"
        );
      }

      if (controlButton.getAttribute('data-type') === "global-cases") {
        document.querySelectorAll('.global__country-controls_btn').forEach((countryButton) => {
          hideRow(countryButton);
          document.querySelector('.cases_th').classList.add('row_active');
          document.querySelectorAll('.cases_row .row_hidden').forEach(n => n.classList.remove('row_hidden'));
          document.querySelectorAll('.cases_row').forEach(n => n.classList.add('row_active'));
        })
        controlButton.classList.add("country-controls_active");
        sort(
          document.querySelector(".cases_head").parentElement.parentElement.parentElement,
          0,
          false,
          "number"
        );
      }

    })
    })
}


export async function initTable() {
  await makeTable();
  sortingWaiting();
  countryChoose();
  document.querySelector(".form-control").addEventListener('keyup', tableSearch);
  globalTableControls();
  addDisplayFullScreen('.global__country--wrapper');
}
export default initTable;
