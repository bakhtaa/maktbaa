const db = require('../../database/db.config');
const Auteur = db.auteurs;

// validation simple
function isEmpty(value) {
    return !value || value.trim() === "";
}

exports.create = (req, res) => {

    if (isEmpty(req.body.nom)) {
        return res.status(400).send({
            message: "Author name is required"
        });
    }

    if (req.body.nom.length < 3) {
        return res.status(400).send({
            message: "Author name must contain at least 3 characters"
        });
    }

    const auteur = new Auteur({
        nom: req.body.nom,
        nationalite: req.body.nationalite,
        biographie: req.body.biographie
    });

    auteur.save()
        .then(() => {
            res.status(200).send({
                message: "Author successfully created"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error creating author"
            });
        });
};

exports.findAll = (req, res) => {
    Auteur.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({
            message: err.message
        }));
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Auteur.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Author not found"
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

    if (isEmpty(req.body.nom)) {
        return res.status(400).send({
            message: "Author name is required"
        });
    }

    Auteur.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Author not found"
                });
            }
            res.status(200).send({
                message: "Author updated successfully"
            });
        })
        .catch(err => res.status(500).send({
            message: err.message
        }));
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Auteur.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Author not found"
                });
            }
            res.status(200).send({
                message: "Author deleted successfully"
            });
        })
        .catch(err => res.status(500).send({
            message: err.message
        }));
};