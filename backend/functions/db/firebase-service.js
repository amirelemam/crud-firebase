const db = require("./index");

async function updateData(collection, docId, data) {
  try {
    await db.collection(collection).doc(docId).update(data);
    return {
      id: docId,
      ...data
    }
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

async function pushData(collection, data) {
  try {
    const docRef = await db.collection(collection).add(data);
    return {
      id: docRef.id,
      ...data
    }
  } catch (error) {
    console.error("Error pushing data:", error);
    throw error;
  }
}

async function readDataOnce(collection, docId = null) {
  try {
    if (docId) {
      // Read single document
      const doc = await db.collection(collection).doc(docId).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } else {
      // Read all documents in collection
      const snapshot = await db.collection(collection).get();
      const data = {};
      snapshot.forEach(doc => {
        data[doc.id] = { id: doc.id, ...doc.data() };
      });
      return data;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    throw error;
  }
}

async function deleteData(collection, docId) {
  try {
    await db.collection(collection).doc(docId).delete();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

module.exports = {
  updateData,
  pushData,
  readDataOnce,
  deleteData
};