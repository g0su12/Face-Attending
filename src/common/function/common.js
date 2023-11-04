import { getDatabase, ref, set } from "firebase/database";

export const writeUserData = (userId, id, email, role) => {
  const db = getDatabase();
  set(ref(db, 'Users/' + userId), {
    id: id,
    email: email,
    role: role,
    userId: userId
  }).then(r => {});
}


export const writeStudentData = (userData) => {
  const db = getDatabase();
  set(ref(db, 'Students/' + userData.id), userData).then(r => {});
}

export const writeTeacherData = (teacherData) => {
  const db = getDatabase();
  set(ref(db, 'Teachers/' + teacherData.id), teacherData).then(r => {});
}

