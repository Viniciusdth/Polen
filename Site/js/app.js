(function ($) {
  AddTableRow = function () {

    var newRow = $("<tr>");
    var cols = "";

    cols += '<td>&nbsp;</td>';
    cols += '<td>&nbsp;</td>';
    cols += '<td>&nbsp;</td>';
    cols += '<td>&nbsp;</td>';
    cols += '<td>';
    cols += '<a href="#" onclick="RemoveTableRow(this)">deletar</a>';
    cols += '</td>';

    newRow.append(cols);
    $("#tabelaOngs").append(newRow);
    return false;
  };
})(jQuery);