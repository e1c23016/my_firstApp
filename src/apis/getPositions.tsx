export function getPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("この端末では位置情報が取得できません"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        let message = "";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "位置情報の利用が許可されていません";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "現在位置が取得できませんでした";
            break;
          case error.TIMEOUT:
            message = "位置情報の取得がタイムアウトしました";
            break;
          default:
            message = `その他のエラー（コード: ${error.code}）`;
            break;
        }
        reject(new Error(message));
      }
    );
  });
}
