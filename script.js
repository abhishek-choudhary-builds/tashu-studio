/* Tashu Studio Salon & Aesthetics — interactions */
(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile navigation
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Enquiry form → opens WhatsApp with a composed message (nothing is sent silently)
  var form = document.getElementById("enquiryForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("fName").value || "").trim();
      var service = document.getElementById("fService").value;
      var date = document.getElementById("fDate").value;
      var msg = (document.getElementById("fMsg").value || "").trim();

      if (!name) {
        document.getElementById("fName").focus();
        if (note) note.textContent = "Please add your name so the studio knows who to greet.";
        return;
      }

      var lines = [
        "Hello Tashu Studio,",
        "I'd like to book a consultation.",
        "",
        "Name: " + name,
        "Interested in: " + service
      ];
      if (date) lines.push("Preferred date: " + date);
      if (msg) lines.push("Note: " + msg);

      var url = "https://wa.me/919123038218?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      if (note) {
        note.textContent =
          "WhatsApp should now be open with your message ready — press send there to reach the studio. Not working? Call +91 91230 38218.";
      }
    });
  }
})();
