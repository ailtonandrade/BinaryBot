// dateUtils.js
export default class DateUtils {
    static formatToAgo(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
  
      const units = [
        { label: 'd', milliseconds: 24 * 60 * 60 * 1000 },
        { label: 'h', milliseconds: 60 * 60 * 1000 },
        { label: 'min', milliseconds: 60 * 1000 },
        { label: 's', milliseconds: 1000 }
      ];
  
      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        const unitDiff = diff / unit.milliseconds;
  
        if (unitDiff >= 1) {
          return Math.floor(unitDiff) + unit.label + ' ago';
        }
      }
  
      return 'just now';
    }

    static formatJsToApi(date){
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

      return formattedDate;
    }
  }
  