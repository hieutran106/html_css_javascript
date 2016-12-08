/**
 * Created by n9639799 on 8/12/2016.
 */

var button=document.getElementById("toggle-nav");
button.onclick=function () {
    toggleNav();
};


function toggleNav() {
    if ($('#site-wrapper').hasClass('show-nav')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav');
    }

}
