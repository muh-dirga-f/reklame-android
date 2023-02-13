// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh5bxTEPhyg4A2S5B8tnMmlMd5Pd3aEXo",
  authDomain: "reklame-b464e.firebaseapp.com",
  projectId: "reklame-b464e",
  storageBucket: "reklame-b464e.appspot.com",
  messagingSenderId: "467274470459",
  appId: "1:467274470459:web:737ce00c9b18461fb7781e",
  measurementId: "G-SX20GKY45C",
  databaseURL:
    "https://reklame-b464e-default-rtdb.asia-southeast1.firebasedatabase.app",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//? sistem login
//* fungsi register
async function registrasi(data) {
  //cek email terdaftar
  let status = true;
  let pesan = "Registrasi berhasil. silahkan login!";
  await firebase
    .database()
    .ref("/users/")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((v, i) => {
        if (v.val().email == data.email) {
          pesan = "E-mail telah terdaftar!";
          status = false;
        }
        if (v.val().username == data.username) {
          pesan = "Username telah terdaftar!";
          status = false;
        }
      });
    });
  if (status) {
    firebase.database().ref("users").push().set(data);
  }
  return {
    status: status,
    pesan: pesan,
  };
}

//* fungsi login-user
async function loginUser(data) {
  let status = false;
  let pesan = "Member belum terdaftar!";
  let dataLogin = "";
  let dataIdLogin = "";
  await firebase
    .database()
    .ref("/users/")
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((v, i) => {
        if (
          v.val().username == data.username &&
          v.val().password == data.password &&
          v.val().role == "member"
        ) {
          status = true;
          pesan = "login berhasil";
          dataLogin = v.val();
          dataIdLogin = v.key;
          return true;
        } else {
          pesan = "username / password salah!";
          status = false;
        }
      });
    });
  return {
    status: status,
    pesan: pesan,
    data: dataLogin,
    dataid: dataIdLogin,
  };
}

//* upload gambar
async function uploadFile(file, metadata, folderName) {
  let status = false;
  let pesan = "";
  let url = "";
  let extFile =
    "." + file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
  // Push to child path.
  await firebase
    .storage()
    .ref()
    .child(folderName + "/" + Date.now() + extFile)
    .put(file, metadata)
    .then(function (snapshot) {
      pesan = "Uploaded " + snapshot.totalBytes + " bytes.";
      status = true;
      // console.log('File metadata:', snapshot.metadata);
      // Let's get a download URL for the file.
      return (url = new Promise((resolve) => {
        snapshot.ref.getDownloadURL().then((dataUrl) => {
          resolve(dataUrl);
        });
      }));
    })
    .catch(function (error) {
      pesan = "Upload failed: " + error;
    });

  return {
    status: status,
    url: url,
    pesan: pesan,
  };
}
//hapus file yang di upload
function hapusFile(url) {
  firebase
    .storage()
    .refFromURL(url)
    .delete()
    .then(() => {
      console.log("data di store terhapus");
      // File deleted successfully
    })
    .catch((error) => {
      console.log("data di store gagal terhapus", error);
      // Uh-oh, an error occurred!
    });
}

// !!!!!!!!!!!!!!!!!!!!!!!!!! //
// TODO:
//* 1. buat form daftar barang -> crud tambah barang untuk di lelang
//tambah data
async function tambahData(namaDB, data) {
  let pesan = "";
  let status = false;
  await firebase
    .database()
    .ref(namaDB)
    .push()
    .set(data, function (error) {
      if (error) {
        pesan = "Data tidak dapat disimpan." + error;
      } else {
        pesan = "Data berhasil tersimpan.";
        status = true;
      }
    });
  return {
    status: status,
    pesan: pesan,
  };
}
//hapus data
async function hapusData(namaDB) {
  let pesan = "";
  let status = false;
  await firebase
    .database()
    .ref(namaDB)
    .remove()
    .then(function () {
      pesan = "Data berhasil dihapus.";
      status = true;
    })
    .catch(function (error) {
      pesan = "Data gagal dihapus." + error;
    });
  return {
    status: status,
    pesan: pesan,
  };
}
//select data
async function getData(namaDB) {
  let data = "";
  await firebase
    .database()
    .ref(namaDB)
    .once("value")
    .then((snapshot) => {
      data = snapshot.val();
    });
  return {
    data: data,
  };
}
//update data
async function updateData(namaDB, data) {
  let pesan = "";
  await firebase
    .database()
    .ref(namaDB)
    .update(data, function (error) {
      if (error) {
        pesan = "Data tidak dapat disimpan." + error;
      } else {
        pesan = "Data berhasil tersimpan.";
      }
    });
  return {
    pesan: pesan,
  };
}
