export default class ObjectUtils {
  static getImgFromBytes(imageBytes) {
    if (imageBytes) {
      imageBytes = imageBytes.split("base64,")[1]?.trim() ?? imageBytes;
      return "data:image/jpeg;base64," + imageBytes;
    }
    else {
      return this.getImgBlank();
    }
  };
  static getImgBlank() {
    return "img/img-user-blank.png";
  }
  static getEvent(event) {
    return (event !== undefined) ? event : "";
  }
  static encode(input) {
    let a, b, c, d;

    a = input.substring(0, 20);
    b = input.substring(20, 40);
    c = input.substring(40);
    d = c + a + b;
    return d.split('').reverse().join('');
  }
  static onlyNum(event, defaultNum) {
    let numbers = /^[0-9]+$/;
    if (!event.toString().match(numbers)) {
      event = defaultNum
    }
    return event;
  }
}
