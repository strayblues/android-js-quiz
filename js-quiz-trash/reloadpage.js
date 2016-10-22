function reloadPage(){
window.location = window.location.href+"reload=true";}

function checkQString(){
// Get query strings and store reload qstring in variable
if (reload) {
    document.getElementById('bt_again').innerHTML = 'Try Again!';
}
