const express = require("express")
const router = express.Router()
const passport = require("passport")
const championsControllers = require("../controllers/championsControllers")
const iconsControllers = require("../controllers/iconsControllers")
const usersControllers = require("../controllers/usersControllers")
const ranksControllers = require("../controllers/ranksControllers")
const isAdmin = require("../controllers/isAdmin")

const validator = require("../controllers/validator")
const videosControllers = require("../controllers/videosControllers")

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

router
  .route("/username/:username")
  .get(usersControllers.getUserByUsername)
  .delete(usersControllers.deleteUserByUsername)

router.route("/user/reports").get(usersControllers.getReportedUsers)
router.route("/user/blacklist").get(usersControllers.getBlackList)
router
  .route("/user/report/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.reportUser
  )
router
  .route("/user/:id")
  .get(usersControllers.getUserById) // Hacer validación user logueado.
  .put(usersControllers.updateUser)
  .delete(
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    usersControllers.deleteUserById
  )

router
  .route("/dismiss/user/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.dismissUserReport
  )
router
  .route("/dismiss/video/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.dismissVideoReport
  )

router
  .route("/admin/set/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    usersControllers.setAdmin
  )

// NO USAR SALVO CASO DE EMERGENCIA
// router.route("/users/users/users").delete(usersControllers.deleteUsers)

// ICONS ROUTES

router.route("/icon/:key").get(iconsControllers.getIconByKey)

router.route("/icons/:page").get(iconsControllers.getIconsByPageNumber)

// RANKS ROUTES

router
  .route("/rank")
  .get(ranksControllers.getRanks)
  .post(ranksControllers.addRank)

// VIDEO ROUTES

router
  .route("/videos")
  .get(videosControllers.getTopVideos)
  .post(videosControllers.addVideo)
router
  .route("/video/:videoId")
  .put(videosControllers.updateVideo)
  .delete(
    passport.authenticate("jwt", { session: false }),
    videosControllers.deleteVideo
  )

router.route("/videos/:username").get(videosControllers.getUserVideos)
router.route("/video/like/:videoId").post(videosControllers.toggleLike)
router.route("/video/report/:videoId").post(videosControllers.reportVideo)
router.route("/video/reports").get(videosControllers.getReportedVideos)

router
  .route("/video/comments/:id")
  .put(
    passport.authenticate("jwt", { session: false }),
    videosControllers.manageComment
  )

module.exports = router
