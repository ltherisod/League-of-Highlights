const express = require("express")
const router = express.Router()
const championsControllers = require("../controllers/championsControllers")
const iconsControllers = require("../controllers/iconsControllers")
const usersControllers = require("../controllers/usersControllers")
const validator = require("../controllers/validator")
router
  .route("/champions", championsControllers)
  .get(championsControllers.getChampions)
  .post(championsControllers.addChampion)

router
  .route("/champions/:name", championsControllers)
  .get(championsControllers.getChampionByName)
  .put(championsControllers.updateChampionByName)
  .delete(championsControllers.deleteChampionByName)

router
  .route("/roles")
  .get(championsControllers.getRoles)
  .post(championsControllers.addRole)

router.route("/role/:name").put(championsControllers.updateRoles)

router
  .route("/icons")
  .get(iconsControllers.getIcons)
  .post(iconsControllers.addIcon)
//   .delete(iconsControllers.deleteIcons)
router
  .route("/signup")
    .post(validator, usersControllers.singUp)

router
  .route("/login")
    .post(usersControllers.logIn)

router.route("/icon/:key").get(iconsControllers.getIconByKey)

router.route("/icons/:page").get(iconsControllers.getIconsByPageNumber)

module.exports = router
