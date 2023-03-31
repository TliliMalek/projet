const review = require("../model/review");
module.exports.postRating = async (req, res) => {
  try {
    const newReview = new review({
      ...req.body,
      product: req.params.idprod,
    });
    await newReview.save();
    res.send({ review: newReview });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
module.exports.getprodreviews = async (req, res) => {
  try {
    const reviews = await review.find({ product: req.params.idprod });

    res.send({ reviews });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports.deletereview = async (req, res) => {
  try {
    const { idprod } = req.params;
    const deleteReview = await review.findByIdAndRemove(idprod);
    res.send({ msg: "product deleted successfully" });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.editreview = async (req, res) => {
  try {
    const { idprod } = req.params;
    const newreview = await review.findByIdAndUpdate(
      idprod,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send({ review: newreview });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
