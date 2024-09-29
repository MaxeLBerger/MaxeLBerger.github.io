function slideLeft() {
    for (var e of document.getElementsByClassName("slide")) {
        e.classList.add("slideAnimation");
    }

    document.getElementById("home").classList.add("left");
    document.getElementById("projects").classList.add("show");
    document.getElementById("wrapper").classList.add("split");
    document.getElementById("name").innerHTML += "";
}