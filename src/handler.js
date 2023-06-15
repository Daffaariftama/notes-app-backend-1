const notes = require("./notes");
const {nanoid} = require('nanoid');

const addNotes = (request, h) => {
    const {title, body,tags} = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {title, body,tags, id, createdAt, updatedAt};
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess){
        const response = h.response({
            status : "success",
            message : "catatan berhasil ditambahkan",
            data : {
                noteId : id
            }
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: "error",
        message: "Catatan gagal untuk ditambahkan"
    });
    response.code(500);
    return response;


}

const getAllNotesHandler = () => ({
    status : "success",
    data : {
        notes
    }
    
});

const getAllNotesByIdHandler = (request, h) => {
    const {id} = request.params;
    const note = notes.filter((n) => n.id === id)[0];
    if (note !== undefined){
        return {
            status : "success",
            data : {
                note,
            }
        }
    }
    const response = h.response({
        status : 'fail',
        message : 'catatan tidak ditemukan',
    })
    response.code(404);
    return response;

}


const editNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }
        const response = h.response({
            status : 'success',
            message : 'catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status : 'fail',
        message : 'tidak dapat menemukan id catatan',
    
    });
    response.code(404);
    return response;
}

const deleteNoteByIdHandler = (request, h) => {
    const {id} = request.params;
    const index = notes.findIndex((note) => note.id === id);
    
    if (index !== -1){
        notes.splice(index,1);
        const response = h.response({
            status : 'success',
            message : `catatan id : ${id} berhasil dihapus`,

        });
        response.code = 200;
        return response;
    }
    const response = h.response({
        status : 'fail',
        message : `catatan gagal dihapus id tidak ditemukan`,

    });
    response.code = 404;
    return response;
}



module.exports = {getAllNotesHandler, getAllNotesByIdHandler, addNotes, editNoteByIdHandler, deleteNoteByIdHandler};