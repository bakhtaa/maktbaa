module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  let AuteurSchema = new Schema(
    {
      nom: { type: String, required: true },
      nationalite: { type: String },
      biographie: { type: String }
    },
    {
      timestamps: true,
    }
  );

  AuteurSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Auteur = mongoose.model("Auteur", AuteurSchema);
  return Auteur;
};