module.exports = mongoose => {
    const schema = mongoose.Schema(
      {
        network: String,
        proxystring: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      // eslint-disable-next-line no-unused-vars
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Network = mongoose.model("network", schema);
    return Network;
  };