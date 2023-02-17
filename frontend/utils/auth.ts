
export function isTolkenExpired(tolken){
  const payload = JSON.parse(Buffer
  .from(tolken.split(".")[1], "base64")
  .toString("utf8"));
    // console.log(payload);

  const clockTimestamp = Math.floor(Date.now()/1000);
  return clockTimestamp > payload.exp;
}