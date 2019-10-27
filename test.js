const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "879750377002-sj5g0pq3k0kvu4n9ebljh8qchcq2l50s.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
let token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhhNjNmZTcxZTUzMDY3NTI0Y2JiYzZhM2E1ODQ2M2IzODY0YzA3ODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4Nzk3NTAzNzcwMDItc2o1ZzBwcTNrMGt2dTRuOWVibGpoOHFjaGNxMmw1MHMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4Nzk3NTAzNzcwMDItc2o1ZzBwcTNrMGt2dTRuOWVibGpoOHFjaGNxMmw1MHMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE0MTk3ODM4NzAwMjAyOTY1MjgiLCJlbWFpbCI6InBlcmV0ei5pdGF5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiN2VhQzlYR3JqSC03TTFpeHUxTzhhdyIsIm5hbWUiOiJpdGF5IHBlcmV0eiIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWUtLUlzOGZwbXRvL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmU2VGR0alI2YnlxZnM4aEwzMHJ0c21xalNXbUEvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6Iml0YXkiLCJmYW1pbHlfbmFtZSI6InBlcmV0eiIsImxvY2FsZSI6ImhlIiwiaWF0IjoxNTcyMTU0Nzc3LCJleHAiOjE1NzIxNTgzNzd9.QAm_lI0fPJ3amchWosZj6q5_lQEaGuyCuDw6njY9LTNHuFE2UhjnpZLAk7WBRV0XZHHXc86nmg7O2aBqzr3YWnAPW6jR5uolCKkv6sy1v6IYB4UaoEpY1rh1LWZTKd6ivuSLD12hRygrx9Jge1YkTU2NYq43ZoExNKd962u7v1fNf1UutiAzC0fym5foVLN2FP7xTGboxh31PBTbHuYSSHJ5mt5bgI_FNAI2M3Qsq1vg8q7LfpWeaH8DtHscH6zEDqlTxFU9LvzwqYdL5u61_8tJ7YqqXKFrpQy_w0xeShYzy_5e7vmJujWPNmHyI8CoZra4j84-PUCrgqZ00kyNug";
async function verify() {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
  console.log(payload.exp / 1000 / 60 / 60 / 24);
  var current_time = Date.now() / 1000;
  if (payload.exp < current_time) {
    /* expired */ console.log("expierd");
  }
}
verify().catch(console.error);
