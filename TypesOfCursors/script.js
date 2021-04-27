function click_position(obj) {
  change_position(obj.value)
}

function change_position(val) {
  var s = "demoDIV";
  document.getElementById(s).style.cursor = val;
  var x = "cursor:<span id='enlargecssprop'>" + val + "</span>";
  var y = "###CSSPROP###;<br>";
  var z = y.replace("###CSSPROP###", x);
  document.getElementById("styleDIV").innerHTML = "div {\n&nbsp;&nbsp;&nbsp;&nbsp;" + z + "}";
}

if (!String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}