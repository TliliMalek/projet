const express = require("express");
const {
  postRating,
  getprodreviews,
  deletereview,
  editreview,
} = require("../controllers/reviewcontrollers");
const router = express.Router();
/**
 * @route POST /review/add/:idprod
 * @description add new review
 * @access public
 */

router.post("/add/:idprod", postRating);
/**
 * @route get /review/:idprod
 * @description get product reviews
 * @access public
 */
router.get("/:idprod", getprodreviews);

/**
 * @route delete /:idprod
 * @description delete product review
 * @access public
 */

router.delete("/:idprod", deletereview);

/**
 * @route edit /:idprod
 * @description edit product review
 * @access public
 */

router.patch("/:idprod", editreview); 
module.exports = router;
