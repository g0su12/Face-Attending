import { getDatabase, ref, set, update, remove } from "firebase/database";

const db = getDatabase();

export const writeUserData = (userId, id, email, role) => {
  set(ref(db, 'Users/' + userId), {
    id: id,
    email: email,
    role: role,
    userId: userId
  }).then(r => {});
}

export const writeStudentData = (userData) => {
  set(ref(db, 'Students/' + userData.id), userData).then(r => {});
}

export const writeTeacherData = (teacherData) => {
  set(ref(db, 'Teachers/' + teacherData.id), teacherData).then(r => {});
}

export const deleteUserByUid = (uid, id, role) => {
  remove(ref(db, 'Users/' + uid)).then(r => {});
  if (role === "student"){
    remove(ref(db, 'Students/' + id)).then(r => {});
  }else {
    remove(ref(db, 'Teachers/' + id)).then(r => {});
  }
};

export const rejectFaceRequest = (id) => {
  remove(ref(db, 'FaceRequests/' + id)).then(r => {});
}

export const approveFaceRequest = (fr, student) => {
  update(ref(db, `Students/` + student.id), {
    allVectors: fr.allVectors,
    kMeanVectors: fr.kMeanVectors,
    currentFace: fr.currentFace,
  }).then(r => {});

  // remove face request after approve
  rejectFaceRequest(student.id);
}

