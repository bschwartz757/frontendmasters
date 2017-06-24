// assume this data came from the database
var notesManager = function () {
    // stuff
};

	var addNote = function (note) {
		this.$notes.prepend(
			$("<a href='#'></a>")
			.addClass("note")
			.text(note)
		);
	};

	var addCurrentNote = function() {
		var current_note = this.$newNote.val();

		if (current_note) {
			notes.push(current_note);
			addNote(current_note);
			this.$newNote.val("");
		}
	};

	var showHelp = function() {
		$help.show();

		document.addEventListener("click", function __handler__(evt) {
			evt.preventDefault();
			evt.stopPropagation();
			evt.stopImmediatePropagation();

			document.removeEventListener("click", __handler__, true);
			hideHelp();
		}, true);
	};

	function hideHelp() {
		$help.hide();
	}

	function handleOpenHelp(evt) {
		if (!$help.is(":visible")) {
			evt.preventDefault();
			evt.stopPropagation();

			showHelp();
		}
	}

	function handleAddNote(evt) {
		addCurrentNote();
	}

	function handleEnter(evt) {
		if (evt.which == 13) {
			addCurrentNote();
		}
	}

	function handleDocumentClick(evt) {
		$notes.removeClass("active");
		$notes.children(".note").removeClass("highlighted");
	}

	function handleNoteClick(evt) {
		evt.preventDefault();
		evt.stopPropagation();

		$notes.addClass("active");
		$notes.children(".note").removeClass("highlighted");
		$(evt.target).addClass("highlighted");
	}

	function init(opts) {
		$notes = $(opts.notes)
		$openHelp = $(opts.openHelp)
		$addNote = $(opts.addNote)
		$newNote = $(opts.newNote)
		$help = $(opts.help)

		// build the initial list from the existing `notes` data
		var html = "";
		for (i = 0; i < notes.length; i++) {
			html += "<a href='#' class='note'>" + notes[i] + "</a>";
		}
		$notes.html(html);

		// listen to "help" button
		$openHelp.bind("click", handleOpenHelp);

		// listen to "add" button
		$addNote.bind("click", handleAddNote);

		// listen for <enter> in text box
		$newNote.bind("keypress", handleEnter);

		// listen for clicks outside the notes box
		$(document).bind("click", handleDocumentClick);

		// listen for clicks on note elements
		$notes.on("click", ".note", handleNoteClick);
	};

	function loadNotes(data) {
		notes = notes.concat(data);
	}

	var notes = [],

		$notes,
		$openHelp,
		$addNote,
		$newNote,
		$help,

	publicAPI = {
		init: init,
		loadNotes: loadNotes
	};

	return publicAPI;


notesManager.loadNotes(
	[
		"This is the first note I've taken!",
		"Now is the time for all good men to come to the aid of their country.",
		"The quick brown fox jumped over the moon."
	]
);

$(document).ready(function() {
	notesManager.init({
		notes: "#notes",
		openHelp: "#open_help",
		addNote: "#add_note",
		newNote: "#note",
		help: "#help"
	});
});