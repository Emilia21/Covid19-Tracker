$(document).ready(function () {
  let btn = $("#top");

  // show the "back to top" button
  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  // go back to the top
  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  // make navbar sticky while scrolling
  $(window).scroll(function () {
    if ($(window).scrollTop() > 8) {
      $(".navbar").addClass("sticky");
      $(".navbar")[0].style.background =
        "linear-gradient(60deg, rgba(84, 58, 183, 1) 0%, rgba(0, 172, 193, 1) 100%)";
    } else {
      $(".navbar").removeClass("sticky");
      $(".navbar")[0].style.background = "transparent";
    }
  });

  // create treatments cards
  (() => {
    let row = $("#treatment .row");
    let preventions = [
      "Resting",
      "Drink fluids",
      "Ask your doctor about medicines",
      "If you get worse, call your doctor",
    ];
    let icons = [
      "./images/resting.png",
      "./images/water-glass.png",
      "./images/medicine.png",
      "./images/emergency-call.png",
    ];
    for (let i = 0; i < preventions.length; i++) {
      let column = $("<div>", { class: "column" });
      let card = $("<div>", { class: "card" });
      let img = $("<img>", { src: icons[i], class: "zoom" });
      let description = $("<p>", { text: preventions[i] });
      card.append(img, description);
      column.append(card);
      row.append(column);
    }
  })();

  // create prevention cards
  (() => {
    let row = $("#prevention .row");
    let preventions = [
      "Wash your hands often with soap",
      "Use face mask",
      "Avoid close contact",
      "Clean and desinfect frequently",
      "Stay home",
      "Cover your sneeze with a tissue",
      "Stay informed",
      "Seek medical attention if you feel ill",
    ];
    let icons = [
      "./images/washing-hands.svg",
      "./images/face-mask.svg",
      "./images/avoid_contact.png",
      "./images/clean.svg",
      "./images/stay-home.svg",
      "./images/sneeze.svg",
      "./images/news.svg",
      "./images/call-doctor.png",
    ];
    for (let i = 0; i < preventions.length; i++) {
      let column = $("<div>", { class: "column" });
      let card = $("<div>", { class: "card" });
      let img = $("<img>", { src: icons[i], class: "zoom" });
      let description = $("<p>", { text: preventions[i] });
      card.append(img, description);
      column.append(card);
      row.append(column);
    }
  })();

  // create statistics chart
  // TODO if api response is "error"
  (() => {
    api_call("all", function (response) {
      let cases = response.cases;
      let deaths = response.deaths;
      let recovered = response.recovered;
      var ctx = document.getElementById("chart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Cases", "Deaths", "Recovered"],
          datasets: [
            {
              label: "Global statistics",
              data: [cases, deaths, recovered],
              backgroundColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    });
  })();

  // create report
  // TODO if api response is "error"
  (() => {
    api_call("countries", function (response) {
      let table = document.getElementById("table");
      response.forEach((country) => {
        let tr = document.createElement("tr");

        let country_name = document.createElement("td");
        country_name.innerHTML = country.country;
        tr.appendChild(country_name);

        let total_cases = document.createElement("td");
        total_cases.innerHTML = country.cases;
        tr.appendChild(total_cases);

        let new_cases = document.createElement("td");
        new_cases.innerHTML = country.todayCases;
        tr.appendChild(new_cases);

        let total_deaths = document.createElement("td");
        total_deaths.innerHTML = country.deaths;
        tr.appendChild(total_deaths);

        let new_deaths = document.createElement("td");
        new_deaths.innerHTML = country.todayDeaths;
        tr.appendChild(new_deaths);

        let recovered = document.createElement("td");
        recovered.innerHTML = country.recovered;
        tr.appendChild(recovered);

        table.appendChild(tr);
      });
    });
  })();
});
