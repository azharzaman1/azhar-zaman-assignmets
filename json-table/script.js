console.log("connected");

// targets
const table = document.getElementById("table");
const tableHeaderRow = document.getElementById("table-header-row");
const tableHeaderRow2 = document.getElementById("table-header-row2");
const tableBody = document.getElementById("table-body");

let tableData;
let loadingData = true;

const fetchData = async () => {
  fetch("./db.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tableData = data;
      loadingData = false;
      populateTable();
    });
};

fetchData();

const populateTable = () => {
  // populating table header
  [...tableData[0], "energy_grouped_header", "idlegrouped_header"].forEach(
    (th, i) => {
      // adding grouped entries [energy and idle] header
      if (!String(th).startsWith("idle_") && !String(th).includes("y_energy")) {
        // to divide header into grouped entry header
        // excluding grouped entries from header
        const thNode = document.createElement("th");
        thNode.classList.add(`table-header-row-item`);
        thNode.classList.add(`${th}`);

        // to create grouped header entries modifying th attributes
        if (th === "energy_grouped_header" || th === "idlegrouped_header") {
          thNode.colSpan = 3;
        } else {
          thNode.rowSpan = 2;
        }

        thNode.textContent = getLabelFromID(th);
        tableHeaderRow.appendChild(thNode);
      } else {
        const thNode = document.createElement("th");
        thNode.scope = "col";
        thNode.classList.add(`table-header-row-item`);
        thNode.classList.add(`${th}`);
        thNode.textContent = getLabelFromID(th);
        console.log(thNode);
        tableHeaderRow2.appendChild(thNode);
      }
    }
  );

  const tableContent = [...tableData].slice(1);
  tableContent.forEach((tableRow, i) => {
    console.log(tableRow);
    const rowID = tableRow[1]; // table id exists at index 1 of row
    const trNode = document.createElement("tr");
    trNode.classList.add("table-body-row");
    trNode.id = rowID;
    tableBody.appendChild(trNode);
    tableRow.forEach((trd, i) => {
      const tdNode = document.createElement("td");
      tdNode.classList.add(`table-body-row-item`);
      tdNode.textContent = trd;
      document.getElementById(rowID)?.appendChild(tdNode);
    });
  });
};

const getLabelFromID = (id) => {
  switch (id) {
    case "machine_name":
      return "MACHINE NAME";

    case "machine_id":
      return "MACHINE ID";

    case "current":
      return "CURRENT (Amps)";

    case "voltage":
      return "VOLTAGE (Volts)";

    case "power_factor":
      return "POWER FACTOR";

    case "active_power":
      return "Active Power (MV)";

    case "apparent_power":
      return "Aparent Power (MVA)";

    case "reactive_power":
      return "Reactive Power (MVAr)";

    case "daily_energy":
      return "Today";

    case "monthly_energy":
      return "MTD";

    case "yearly_energy":
      return "YTD";

    case "idle_daily":
      return "Today";

    case "idle_monthly":
      return "MTD";

    case "idle_yearly":
      return "YTD";

    case "energy_grouped_header":
      return "ENERGY CONSUMED (kWh)";

    case "idlegrouped_header":
      return "IDLE TIME";

    default:
      return id;
  }
};
