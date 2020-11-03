module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      domain: {
        type: String,
        required: true,
        unique: true
      },
      proxystring: {
        type: String, 
        required: true
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    // eslint-disable-next-line no-unused-vars
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Exception = mongoose.model("exception", schema);
  return Exception;
};