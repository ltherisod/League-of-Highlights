const express = require("express")
const router = express.Router()
const passport = require("passport")
const championsControllers = require("../controllers/championsControllers")
const iconsControllers = require("../controllers/iconsControllers")
const usersControllers = require("../controllers/usersControllers")
const ranksControllers = require("../controllers/ranksControllers")

const validator = require("../controllers/validator")

// CHAMPIONS ROUTES

router
  .route("/champions", championsControllers)
  .get(championsControllers.getChampions)
  .post(championsControllers.addChampion)

router
  .route("/champion/:name", championsControllers)
  .get(championsControllers.getChampionByName)
  .put(championsControllers.updateChampionByName)
// .delete(championsControllers.deleteChampionByName)

router
  .route("/championsKeys")
  .post(championsControllers.getChampionsByKeysArray)

// ROLES ROUTES

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

// USER ROUTES

router.route("/signup").post(validator, usersControllers.signUp)

router.route("/login").post(usersControllers.logIn)

router
  .route("/verifyToken")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersControllers.verifyToken
  )

// ICONS ROUTES

router.route("/icon/:key").get(iconsControllers.getIconByKey)

router.route("/icons/:page").get(iconsControllers.getIconsByPageNumber)

router.route("/user/:id").put(usersControllers.updateUser)

// RANKS ROUTES

router
  .route("/rank")
  .get(ranksControllers.getRanks)
  .post(ranksControllers.addRank)

module.exports = router
