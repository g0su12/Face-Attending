import {get, getDatabase, ref, remove, set, update} from "firebase/database";

const db = getDatabase();

export const writeUserData = (userId, id, email, role) => {
  set(ref(db, 'Users/' + userId), {
    id: id, email: email, role: role, uid: userId
  }).then(r => {
  });
}

export const writeStudentData = (userData) => {
  set(ref(db, 'Students/' + userData.id), userData).then(r => {
  });
}

export const writeTeacherData = (teacherData) => {
  set(ref(db, 'Teachers/' + teacherData.id), teacherData).then(r => {
  });
}

export const deleteUserByUid = (uid, id, role) => {
  remove(ref(db, 'Users/' + uid)).then(r => {
  });
  if (role === "student") {
    remove(ref(db, 'Students/' + id)).then(r => {
    });
  } else {
    remove(ref(db, 'Teachers/' + id)).then(r => {
    });
  }
};

export const deleteStudentCourses = (studentId, courseId) => {
  remove(ref(db, 'Courses/' + courseId + "/students/" + studentId)).then(r => {
  });
};

export const deleteStudentSession = (date, id, studentId) => {
  get(ref(db, 'Sessions/' + date + "/" + id + "/students")).then(r => {
    const removeProperty = (propKey, {[propKey]: propValue, ...rest}) => rest;
    const updates = removeProperty(studentId, r.val());
    update(ref(db, 'Sessions/' + date + "/" + id + "/students"), updates).then(r => {
    })
  })
};

export const deleteStudentAttendance = (studentId) => {
  get(ref(db, 'Attendance/')).then(r => {
    for (const sessionId in r.val()) {
      remove(ref(db, 'Attendance/' + sessionId + "/" + studentId)).then(r => {
      });
    }
  })
};

export const rejectFaceRequest = (id) => {
  remove(ref(db, 'FaceRequests/' + id)).then(r => {
  });
}

export const approveFaceRequest = (fr, student) => {
  update(ref(db, `Students/` + student.id), {
    allVectors: fr.allVectors, kMeanVectors: fr.kMeanVectors, currentFace: fr.currentFace,
  }).then(r => {
    // remove face request after approve
    rejectFaceRequest(student.id);
  });
}

export const writeCourseData = (courseData) => {
  set(ref(db, 'Courses/' + courseData.id), courseData).then(r => {
  });
}

export const insertCourseToStudent = (studentId, courseName) => {
  const updates = {};
  updates[courseName] = true;
  update(ref(db, 'Students/' + studentId + '/courses'), updates).then(r => {
  });
}

export const insertStudentToCourse = (courseId, studentId, studentPhoto, studentName) => {
  const updates = {};
  updates[studentId] = {
    id: studentId, name: studentName, photo: studentPhoto,
  };
  update(ref(db, 'Courses/' + courseId + '/students'), updates).then(r => {
  });
}

export const writeSessionData = (sessionData) => {
  update(ref(db, 'Sessions/' + sessionData.date + '/' + sessionData.id), sessionData).then(r => {
  });
  const updates = {};
  updates[sessionData.id] = true;
  update(ref(db, 'Courses/' + sessionData.courseId + '/sessions/' + sessionData.date), updates).then(r => {
  });
}

export const insertStudentToSession = (sessionDate, sessionId, studentId) => {
  const updates = {};
  updates[studentId] = "";
  update(ref(db, 'Sessions/' + sessionDate + '/' + sessionId + "/students"), updates).then(r => {
  });
}

export const insertTeacherToCourse = (courseId, teacherId) => {
  const updates = {};
  updates["teacherId"] = teacherId;
  update(ref(db, 'Courses/' + courseId), updates).then(r => {
  });
}

export const insertTeacherToSession = (sessionDate, sessionId, teacherId, teacherName) => {
  const updates = {};
  updates["teacherId"] = teacherId;
  updates["teacherName"] = teacherName;
  update(ref(db, 'Sessions/' + sessionDate + '/' + sessionId), updates).then(r => {
  });
}





