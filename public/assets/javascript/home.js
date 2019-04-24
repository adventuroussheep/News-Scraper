$(function() {


    // Scrape button function
  $("#scrapeArticlesButton").on("click", function(event) {
    event.preventDefault();

    $(".articlesScrapedBody").empty();

    $.ajax("/api/all", {
      type: "GET"
    }).then(function(response) {
      let currentResultsLength = response;

      $.ajax("/api/scrape", {
        type: "POST"
      }).then(function(response) {
        $.ajax("/api/reduce", {
          type: "DELETE"
        }).then(function(response) {
          let newText = $("<div>");
          let newResultsLength = response.length;

          let numberChanged =
            parseInt(newResultsLength) - parseInt(currentResultsLength);

          if (numberChanged == 0) {
            newText.text("Scraper is up to date");
            $(".articlesScrapedBody").append(newText);
            $("#scrapeArticlesModal").modal("show");
          } else {
            newText.text(numberChanged + " new articles scraped!");
            $(".articlesScrapedBody").append(newText);
            $("#scrapeArticlesModal").modal("show");
          }
        });
      });
    });
  });

  
//   Modal close button after scrape
  $("#closeScrapeButton").on("click", function(event) {
    event.preventDefault();

    $.ajax("/", {
      type: "GET"
    }).then(function() {
      location.reload();
      console.log("site updated");
    });
  });


//   Favorite button
  $(".saveArticleButton").on("click", function(event) {
    event.preventDefault();
    let articleId = $(this).data("id");

    $(".articleSavedBody").empty();

    $.ajax("/api/save/article/" + articleId, {
      type: "PUT"
    }).then(function() {
      let newText = $("<div>");
      newText.text("Article saved to favorites!");
      $(".articleSavedBody").append(newText);
      $("#articleSavedModal").modal("show");
    });
  });


// Modal close on favorite
  $("#closeArticleButton").on("click", function(event) {
    event.preventDefault();

    $.ajax("/", {
      type: "GET"
    }).then(function() {
      console.log("site updated");
      location.reload();
    });
  });
});
