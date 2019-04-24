$(function() {

  // Deletes Article
  $(".deleteSavedArticleButton").on("click", function(event) {
    event.preventDefault();

    $(".articleDeleteBody").empty();

    let articleId = $(this).data("id");

    $.ajax("/api/delete/article/" + articleId, {
      type: "PUT"
    }).then(function() {
      let newText = $("<div>");
      newText.text("Article removed from favorites.");
      $(".articleDeleteBody").append(newText);
      $("#articleDeleteModal").modal("show");
    });
  });

  // Modal for removing article
  $(".deleteSavedArticleModalButton").on("click", function(event) {
    event.preventDefault();

    $.ajax("/saved", {
      type: "GET"
    }).then(function() {
      location.reload();
      console.log("saved site updated");
    });
  });

  // Creates a Note
  $(".addNoteButton").on("click", function(event) {
    event.preventDefault();

    let articleId = $(this).data("id");
    console.log(articleId);
    $(".noteModalBody").empty();
    $(".noteAlert").remove();

    $.ajax("/api/notes/" + articleId, {
      type: "GET"
    })
      .then(function(result) {
        console.log("api/notes get req", result);

        console.log(result.note);
        if (!result.note.length == 0 || !result.note === undefined) {
          title = result.note[0].title;
          body = result.note[0].body;

          console.log(result.note[0].title);
          console.log(result.note[0].body);

          // Apends note to modal
          $(".noteModalHeader").append(
            "<h2>" + title + "</h2><hr><h4>" + body + "</h4"
          );
        }

        $(".noteModalBody").append("<ul id='noteList'>");

        let newForm = $("<form>");

        // for note Title
        let titleToAppend = $('<div class="form-group">');
        let titleLabel = $('<label for="titleinput">');
        titleLabel.text("New Note Title");
        titleToAppend.append(titleLabel);
        titleToAppend.append("<input id='titleinput' name='title' >");

        // for note Body
        let noteToAppend = $('<div class="form-group">');
        let noteLabel = $('<label for=bodyinput">');
        noteLabel.text("New Note Text");
        noteToAppend.append(noteLabel);
        noteToAppend.append("<textarea id='bodyinput' name='body'></textarea>");

        $(".saveNoteButton").attr("data-id", result._id);
        newForm.append(titleToAppend);
        newForm.append(noteToAppend);

        $(".noteModalBody").append(newForm);

        $(".saveNoteButton").on("click", function(event) {
          for (let i = 0; i < result.note.length; i++) {
            console.log(result);
          }
        });
      })
      .then($("#noteModal").modal("show"));
  });

//   Modal close, removes notes from modal
  $(".modalCloseBtn").on("click", function() {
    $(".noteModalHeader").empty();
    console.log("close button clicked");
  });

//   Posts note
  $(".saveNoteButton")
    .on("click", function(event) {
      let articleId = $(this).attr("data-id");

      $.ajax("/api/create/notes/" + articleId, {
        type: "POST",
        data: {
          title: $("#titleinput").val(),
          body: $("#bodyinput").val()
        }
      }).then(function(result) {
        let noteAdded = $("<p>");
        noteAdded.addClass("noteAlert");
        noteAdded.text("Note successfully added");
        $(".alertDiv").append(noteAdded);
        $("#titleinput").val("");
        $("#bodyinput").val("");
      });
    });
});

$(".deleteNoteButton").on("click", function(event) {
  event.preventDefault();

  console.log("clicked");
});
