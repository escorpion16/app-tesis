const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
admin.initializeApp();

exports.createUser = functions.https.onRequest((req, res) => {
  cors()(req, res, async () => {
    const data = req.body;
    try {
      console.log(
        "Attempting to create user with data: ",
        JSON.stringify(data)
      );
      const user = await admin.auth().createUser({
        email: data.email,
        emailVerified: true,
        password: data.password,
        displayName: data.nombre,
        disabled: false,
      });

      console.log("User created: ", user);
    } catch (error) {
      throw new functions.https.HttpsError(`Failed to create a user: ${error}`);
    }

    try {
      console.log("Attempting to create firestore document");

      delete data.password;

      return admin
        .firestore()
        .collection("users")
        .doc(data?.id)
        .create({
          // id: data.id,
          // nombre: data.nombre,
          // apellidos: data.apellidos,
          // email: data.email,
          // telefono: data.telefono,
          // rol: data.rol,
          ...data,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          res.status(200).send({
            status: "success",
          });
        })
        .catch((err) => {
          console.log(err.stack);
          res.status(500).send({
            status: "error",
          });
        });
    } catch (error) {
      throw new functions.https.HttpsError(
        `Failed to create a user document: ${error}`
      );
    }
  });
});

exports.deleteUser = functions.https.onRequest((req, res) => {
  cors()(req, res, async () => {
    const data = req.body;
    try {
      console.log(
        "Attempting to delete user with data: ",
        JSON.stringify(data)
      );

      const user = await admin.auth().getUserByEmail(data.email);
      await admin.auth().deleteUser(user.uid);

      console.log("User deleted: ", user);
    } catch (error) {
      throw new functions.https.HttpsError(`Failed to delete a user: ${error}`);
    }

    try {
      console.log("Attempting to delete firestore document");

      return admin
        .firestore()
        .collection("users")
        .doc(data?.id)
        .delete()
        .then(() => {
          res.status(200).send({
            status: "success",
          });
        })
        .catch((err) => {
          console.log(err.stack);
          res.status(500).send({
            status: "error",
          });
        });
    } catch (error) {
      throw new functions.https.HttpsError(
        `Failed to delete a user document: ${error}`
      );
    }
  });
});

exports.updateUser = functions.https.onRequest((req, res) => {
  cors()(req, res, async () => {
    const data = req.body;
    try {
      console.log(
        "Attempting to update user with data: ",
        JSON.stringify(data)
      );

      const prevUser = await admin.auth().getUserByEmail(data?.email);

      let newUser = {
        email: data.email ?? null,
        password: data.password ?? null,
        displayName: data.nombre + (data?.apellidos ?? "") ?? null,
      };

      for (const key in newUser) {
        if (!newUser[key]) delete newUser[key];
      }

      console.log("Updating with:", newUser);

      const user = await admin.auth().updateUser(prevUser.uid, newUser);

      console.log("User updated: ", user);
    } catch (error) {
      throw new functions.https.HttpsError(`Failed to update a user: ${error}`);
    }

    try {
      console.log("Attempting to create firestore document");

      delete data.password;

      return admin
        .firestore()
        .collection("users")
        .doc(data?.id)
        .update({
          ...data,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          res.status(200).send({
            status: "success",
          });
        })
        .catch((err) => {
          console.log(err.stack);
          res.status(500).send({
            status: "error",
          });
        });
    } catch (error) {
      throw new functions.https.HttpsError(
        `Failed to create a user document: ${error}`
      );
    }
  });
});
