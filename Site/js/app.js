$(document).ready(function () {
  let index = window.localStorage.getItem('rowIndexes');

  if (index) {
    addRowsFromIndex(index.split(","));
  }
});

function addRowsFromIndex(index) {
  index.forEach(rowName => {
    let t = JSON.parse(window.localStorage.getItem(rowName));
    populateTable(t.nome, t.slogan, t.linkSite, t.checkbox, rowName)
  });
}

function populateTable(nome, slogan, linkSite, checkbox, rowName) {
  let newRow = $(`<tr id="${rowName}" class="simple-row ${checkbox ? "active-row" : ""}" >`);
  let cols = "";

  cols += `<td>${nome}</td>`;
  cols += `<td>${slogan}</td>`;
  cols += `<td><a class="table-link" href="${linkSite}" target="_blank">${linkSite}</a></td>`;
  cols += '<td>';
  cols += `<input type="checkbox" name="checkbox" ${checkbox ? "checked" : ""} onclick="updateLocalStorageCheckbox(this);">`;
  cols += '</td>';
  cols += '<td>';
  cols += `<a class="table-action" onclick="editTableRow(${rowName})" href="#" data-toggle="modal" data-target="#modalEditar">editar</a> | <a class="table-action" href="#" onclick="RemoveTableRow(${rowName})">deletar</a>`;
  cols += '</td>';

  newRow.append(cols);
  $("#tabelaOngs").append(newRow);
}

function AddTableRow() {
  let nome = $('#nomeUsuario').val()
  let slogan = $('#slogan').val()
  let linkSite = $('#linkSite').val()
  let checkbox = $('#modalCheckbox').is(':checked');

  // if (this.validateFields(nome, slogan, linkSite) == false) {
  //   return alert("por favor, preencha os campos")
  // };

  let rowName = this.addRowToLocalStorage(nome, linkSite, slogan, checkbox)

  let newRow = $(`<tr id="${rowName}" ${checkbox ? "class='active-row'" : ""}>`);
  let cols = "";

  cols += `<td>${nome}</td>`;
  cols += `<td>${slogan}</td>`;
  cols += `<td><a class="table-link" href="${linkSite}" target="_blank">${linkSite}</a></td>`;
  cols += '<td>';
  cols += `<input type="checkbox" name="checkbox" ${checkbox ? "checked" : ""} onclick="updateLocalStorageCheckbox(this);">`;
  cols += '</td>';
  cols += '<td>';
  cols += `<a class="table-action" onclick="editTableRow(${rowName})" href="#" data-toggle="modal" data-target="#modalEditar">editar</a> | <a class="table-action" href="#" onclick="RemoveTableRow(${rowName})">deletar</a>`;
  cols += '</td>';

  newRow.append(cols);
  $("#tabelaOngs").append(newRow);
  return this.clearModalFormFields();
}

function generateRowName() {
  return `row_${Math.round(Math.random() * 10 ** 6)}`;
}


function addRowToLocalStorage(nome, linkSite, slogan, checkbox) {
  let nomeLinha = this.generateRowName();

  let dados = {
    nome: nome,
    linkSite: linkSite,
    slogan: slogan,
    checkbox: checkbox,
  }

  window.localStorage.setItem(nomeLinha, JSON.stringify(dados));

  this.addNewRowToIndex(nomeLinha);
  return nomeLinha;
}

function addNewRowToIndex(nomeDaLinha) {
  let rowIndexes = localStorage.getItem("rowIndexes");

  rowIndexes = rowIndexes ? rowIndexes.split(',') : [];
  rowIndexes.push(nomeDaLinha);

  localStorage.setItem("rowIndexes", rowIndexes.toString());
}

function editTableRow(ref) {
  let data = JSON.parse(localStorage.getItem(ref.id));

  $('#editName').val(data.nome);
  $('#editSlogan').val(data.slogan);
  $('#editLinkSite').val(data.linkSite);
  $('#editAtivo').val(data.checkbox);
  $('#actualTableRowId').val(ref.id)

}

function updateTableRow() {
  let id = $('#actualTableRowId').val();

  let dados = {
    nome: $('#editName').val(),
    linkSite: $('#editLinkSite').val(),
    slogan: $('#editSlogan').val(),
    checkbox: $('#editAtivo').is(':checked')
  }

  window.localStorage.setItem(id, JSON.stringify(dados));
  return location.reload();
}

function RemoveTableRow(ref) {
  let rowIndexes = window.localStorage.getItem('rowIndexes').split(",");

  rowIndexes = rowIndexes.filter((id) => {
    if (id !== ref.id) {
      return id
    }
  });

  localStorage.setItem("rowIndexes", rowIndexes.toString());
  localStorage.removeItem(ref.id);

  return location.reload();
}

function clearModalFormFields() {
  $('#ModalAddForm').find('input[type=text], input[type=url], textarea').val('');
  document.getElementById('modalCheckbox').checked = false;
}

function updateLocalStorageCheckbox(ref) {
  let id = $(ref).parents('tr').attr('id');
  let data = JSON.parse(localStorage.getItem(id));

  // atualiza p o valor atual do checkbox
  data.checkbox = $(ref).is(':checked');
  //salva no localstorage
  localStorage.setItem(id, JSON.stringify(data));
  return location.reload();
}

// function validateFields(nome, slogan, link) {
//   if (nome.length < 3 ||
//     slogan.length < 4 ||
//     link.length < 8) {
//     return false;
//   }
// }
