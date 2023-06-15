const {getAllNotesHandler,getAllNotesByIdHandler, addNotes, editNoteByIdHandler, deleteNoteByIdHandler} = require('./handler');

const routes = [
    {
        method : 'GET',
        path : '/notes',
        handler : getAllNotesHandler,
    },
    {
        method : 'GET',
        path : '/notes/{id}',
        handler : getAllNotesByIdHandler,
    },
    {
        method : 'POST',
        path : '/notes',
        handler : addNotes,
    },
    {
        method : 'PUT',
        path : '/notes/{id}',
        handler : editNoteByIdHandler,
    },
    {
        method : 'DELETE',
        path : '/notes/{id}',
        handler : deleteNoteByIdHandler,
    },
    
];

module.exports = routes;