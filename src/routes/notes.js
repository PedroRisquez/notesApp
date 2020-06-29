const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const { isAuthenticated } = require('../helpers/auth');

router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new_note");
});

router.post("/notes/new_note", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a title" });
  }
  if (!description) {
    errors.push({ text: "Please write a description" });
  }
  if (errors.length > 0) {
    res.render("notes/new_note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Note added successfully');
    res.redirect("/notes");
  }
});

/* router.get('/notes', async (req,res) =>{
    const notes = await Note.find();
    res.render('notes');
}); */
router.get("/notes", isAuthenticated, async (req, res) => {
  await Note.find({user: req.user.id}).sort({date: 'desc'}).then((documentos) => {
    const contexto = {
      notes: documentos.map((documento) => {
        return {
          _id: documento.id,
          title: documento.title,
          description: documento.description,
        };
      }),
    };
    res.render("notes/all_notes", {
      notes: contexto.notes,
    });
  });
});

router.get('/notes/edit/:id', isAuthenticated, async (req,res) =>{
  /* const note = await Note.findById(req.params.id);
  res.render('notes/edit_note', {note}); */

  await Note.findById(req.params.id).then((nota) => {
    const note = {
      _id: nota.id,
      title: nota.title,
      description: nota.description
    };
    /* console.log(note); */
    res.render("notes/edit_note", {
      note
    });
  });
});

router.put('/notes/edit_note/:id', isAuthenticated, async (req, res) =>{
  const {title, description} = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg','Note updated successfully');
  res.redirect("/notes");
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) =>{
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Note deleted successfully');
  res.redirect("/notes");
});

module.exports = router;
