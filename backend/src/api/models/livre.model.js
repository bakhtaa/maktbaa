module.exports = mongoose => {
    const Schema = mongoose.Schema;

    let LivreSchema = new Schema({
        titre: { type: String, required: true },
        description: { type: String, required: true },
        prix: { type: Number },
        datePublication: { type: String },
        disponible: { type: Boolean, default: true },
        image: {
            type: String
        },

        auteur: {
            type: Schema.Types.ObjectId,
            ref: 'Auteur',
            required: true
        }

    }, {
        timestamps: true
    });

    LivreSchema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Livre = mongoose.model('Livre', LivreSchema);
    return Livre;
};