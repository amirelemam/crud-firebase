const db = require("./index");

async function updateData(path, data) {
  try {
    await db.ref(path).update(data);
    return {
      id: path.split("/").pop(),
      ...data
    }
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
}

async function pushData(path, data) {
  try {
    const newRef = await db.ref(path).push(data);
    return {
      id: newRef.key,
      ...data
    }
  } catch (error) {
    console.error("Error pushing data:", error);
  }
}

async function readDataOnce(path) {
  try {
    const snapshot = await db.ref(path).once("value");
    const data = snapshot.val();

    return data;
  } catch (error) {
    console.error("Error reading data:", error);
  }
}

async function deleteData(path) {
  try {
    await db.ref(path).remove();
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}

module.exports = {
  updateData,
  pushData,
  readDataOnce,
  deleteData
};