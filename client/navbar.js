// ALL OF THIS CODE HAS BEEN TAKEN DIRECTLY FROM https://gist.github.com/mpetroff/4666657beeb85754611f

// Navbar and dropdowns
const toggle = document.getElementsByClassName('navbar-toggler')[0];
    const collapse = document.getElementsByClassName('navbar-collapse')[0];
    const dropdowns = document.getElementsByClassName('dropdown'); ;

// Toggle if navbar menu is open or closed
function toggleMenu () {
    collapse.classList.toggle('collapse');
    collapse.classList.toggle('in');
}

// Close all dropdown menus
function closeMenus () {
    for (let j = 0; j < dropdowns.length; j++) {
        dropdowns[j].getElementsByClassName('dropdown-toggle')[0].classList.remove('dropdown-open');
        dropdowns[j].classList.remove('open');
    }
}

// Add click handling to dropdowns
for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('click', function () {
        if (document.body.clientWidth < 768) {
            const open = this.classList.contains('open');
            closeMenus();
            if (!open) {
                this.getElementsByClassName('dropdown-toggle')[0].classList.toggle('dropdown-open');
                this.classList.toggle('open');
            }
        }
    });
}

// Close dropdowns when screen becomes big enough to switch to open by hover
function closeMenusOnResize () {
    if (document.body.clientWidth >= 768) {
        closeMenus();
        collapse.classList.add('collapse');
        collapse.classList.remove('in');
    }
}

// Event listeners
window.addEventListener('resize', closeMenusOnResize, false);
toggle.addEventListener('click', toggleMenu, false);
