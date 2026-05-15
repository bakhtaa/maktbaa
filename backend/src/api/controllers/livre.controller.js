const db = require('../../database/db.config');
const Livre = db.livres;

// validation
function isEmpty(value) {
    return !value || value.trim() === "";
}

exports.create = (req, res) => {

    if (
        isEmpty(req.body.titre) ||
        isEmpty(req.body.description) ||
        !req.body.auteur
    ) {
        return res.status(400).send({
            message: "All fields are required"
        });
    }

    if (req.body.titre.length < 3) {
        return res.status(400).send({
            message: "Book title must contain at least 3 characters"
        });
    }

    if (req.body.description.length < 10) {
        return res.status(400).send({
            message: "Description must contain at least 10 characters"
        });
    }

    const livre = new Livre({
        titre: req.body.titre,
        description: req.body.description,
        prix: req.body.prix,
        datePublication: req.body.datePublication,
        disponible: req.body.disponible,
        auteur: req.body.auteur,
        image: req.body.image
    });

    livre.save()
        .then(() => {
            res.status(200).send({
                message: "Book successfully created"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error creating book"
            });
        });
};

exports.findAll = (req, res) => {
    Livre.find()
        .populate('auteur')
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({
            message: err.message
        }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Livre.findById(id)
        .populate('auteur')
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Book not found"
                });
            }
            res.status(200).send(data);
        })
        .catch(err => res.status(500).send({
            message: err.message
        }));
};

exports.update = (req, res) => {
    const id = req.params.id;

    if (isEmpty(req.body.titre) || isEmpty(req.body.description)) {
        return res.status(400).send({
            message: "All fields are required"
        });
    }

    Livre.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Book not found"
                });
            }
            res.status(200).send({
                message: "Book updated successfully"
            });
        })
        .catch(err => res.status(500).send({
            message: err.message
        }));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Livre.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Book not found"
                });
            }
            res.status(200).send({
                message: "Book deleted successfully"
            });
        })
        .catch(err => res.status(500).send({
            message: err.message
        }));
};