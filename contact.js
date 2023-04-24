
function validateForm() {
    const x = document.forms["myForm"]["fname"].value;
    if (x == "" || x == null) {
      alert("Name must be filled out");
      return false;
    }
    const z = document.forms["myForm"]["femail"].value;
    if (z == "" || z == null) {
      alert("Email must be filled out");
      return false;
    }
  }
  